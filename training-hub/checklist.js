// ============================================
// TRAINING HUB - Checklist Nhân Sự Dashboard
// Theo dõi tình hình làm việc hàng ngày
// ============================================

// ---- Firestore DB ref ----
function getChecklistDB() {
    return firebase.firestore();
}

// ---- Checklist Permission ----
// Danh sách email được quyền quản lý cài đặt checklist (ngoài admin/leader)
const CHECKLIST_MANAGERS = [
    'thangckvt@gmail.com'
];

function canManageChecklist() {
    // Admin/Leader mặc định có quyền
    if (canManageEmails()) return true;
    // Kiểm tra thêm danh sách managers riêng
    if (currentUser && CHECKLIST_MANAGERS.includes(currentUser.email.toLowerCase())) return true;
    return false;
}

// ---- Date Helpers ----
function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function formatDateDisplay(dateStr) {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}

function getDayOfWeek(dateStr) {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const date = new Date(dateStr + 'T00:00:00');
    return days[date.getDay()];
}

function getWeekDates(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
    const monday = new Date(d.setDate(diff));
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const dd = new Date(monday);
        dd.setDate(monday.getDate() + i);
        dates.push(formatDateKey(dd));
    }
    return dates;
}

function getMonthDates(year, month) {
    const dates = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        dates.push(formatDateKey(date));
    }
    return dates;
}

function getWeekLabel(date) {
    const dates = getWeekDates(date);
    return `${formatDateDisplay(dates[0])} — ${formatDateDisplay(dates[6])}`;
}

function getMonthLabel(year, month) {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
                     'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    return `${months[month]} / ${year}`;
}

// ---- Checklist State ----
let checklistViewMode = 'day'; // 'day' | 'week' | 'month'
let checklistSelectedDate = new Date();
let checklistData = {}; // { 'YYYY-MM-DD_email': {...} }
let checklistStaffList = []; // [{ email, name, role, showInChecklist, ... }]
let checklistSettingsTab = 'dashboard'; // 'dashboard' | 'settings'
let checklistSearchQuery = ''; // search filter
let checklistSettingsSearchQuery = ''; // search filter for settings tab

// ---- Load Staff List (from whitelist with showInChecklist) ----
async function loadChecklistStaff() {
    try {
        const db = getChecklistDB();
        const snapshot = await db.collection('whitelist').get();
        checklistStaffList = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.showInChecklist === true) {
                checklistStaffList.push({
                    email: doc.id,
                    name: data.name || doc.id.split('@')[0],
                    role: data.role || 'member',
                    facebook_links: data.facebook_links || [],
                    customer_sheet_url: data.customer_sheet_url || '',
                    showInChecklist: true
                });
            }
        });
        // Sort: leader first, then alphabetically
        checklistStaffList.sort((a, b) => {
            if (a.role === 'leader' && b.role !== 'leader') return -1;
            if (b.role === 'leader' && a.role !== 'leader') return 1;
            return a.name.localeCompare(b.name);
        });
    } catch (error) {
        console.error('Lỗi load danh sách nhân sự:', error);
    }
}

// ---- Load Checklist Data for date range ----
async function loadChecklistData(dates) {
    try {
        const db = getChecklistDB();
        // Build all possible doc IDs for the date range
        const docIds = [];
        for (const date of dates) {
            for (const staff of checklistStaffList) {
                docIds.push(`${date}_${staff.email}`);
            }
        }
        
        // Firestore 'in' query limited to 30 items, so batch if needed
        checklistData = {};
        const batchSize = 10; // getAll by doc refs
        for (let i = 0; i < docIds.length; i += batchSize) {
            const batch = docIds.slice(i, i + batchSize);
            const promises = batch.map(id => db.collection('checklist_daily').doc(id).get());
            const results = await Promise.all(promises);
            results.forEach(doc => {
                if (doc.exists) {
                    checklistData[doc.id] = doc.data();
                }
            });
        }
    } catch (error) {
        console.error('Lỗi load checklist data:', error);
    }
}

// ---- Save Checklist Entry ----
async function saveChecklistEntry(dateStr, email, data) {
    try {
        const db = getChecklistDB();
        const docId = `${dateStr}_${email}`;
        await db.collection('checklist_daily').doc(docId).set({
            email: email,
            date: dateStr,
            fb_posts: parseInt(data.fb_posts) || 0,
            zalo_posts: parseInt(data.zalo_posts) || 0,
            new_customers: parseInt(data.new_customers) || 0,
            viewing_customers: parseInt(data.viewing_customers) || 0,
            notes: data.notes || '',
            updated_by: currentUser ? currentUser.email : 'unknown',
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        // Update local cache
        checklistData[docId] = {
            email, date: dateStr,
            fb_posts: parseInt(data.fb_posts) || 0,
            zalo_posts: parseInt(data.zalo_posts) || 0,
            new_customers: parseInt(data.new_customers) || 0,
            viewing_customers: parseInt(data.viewing_customers) || 0,
            notes: data.notes || '',
            updated_by: currentUser ? currentUser.email : 'unknown'
        };
        
        return true;
    } catch (error) {
        console.error('Lỗi lưu checklist:', error);
        alert('Không thể lưu dữ liệu. Vui lòng thử lại.');
        return false;
    }
}

// ---- Check if entry meets requirements ----
function isChecklistComplete(entry) {
    if (!entry) return false;
    return entry.fb_posts >= 3 && entry.zalo_posts >= 3;
}

function getChecklistStatus(entry) {
    if (!entry) return { label: 'Chưa có data', class: 'status-none', icon: 'fa-circle-minus' };
    if (entry.fb_posts >= 3 && entry.zalo_posts >= 3) {
        return { label: 'Hoàn thành', class: 'status-done', icon: 'fa-circle-check' };
    }
    return { label: 'Chưa đủ', class: 'status-warning', icon: 'fa-triangle-exclamation' };
}

// ============================================
// RENDER: Main Checklist Page
// ============================================

async function renderChecklistPage() {
    const container = document.getElementById('app-content');
    if (!container) return;

    // Show loading
    container.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; min-height:300px;">
            <div style="text-align:center;">
                <i class="fa-solid fa-spinner fa-spin" style="font-size:2rem; color: var(--accent-blue, #3b82f6); margin-bottom:12px;"></i>
                <p style="color: var(--text-secondary);">Đang tải dữ liệu checklist...</p>
            </div>
        </div>
    `;

    // Load staff list
    await loadChecklistStaff();
    
    // Load data for current view
    const dates = getViewDates();
    await loadChecklistData(dates);
    
    // Render page
    renderChecklistContent(container);
}

function getViewDates() {
    if (checklistViewMode === 'day') {
        return [formatDateKey(checklistSelectedDate)];
    } else if (checklistViewMode === 'week') {
        return getWeekDates(checklistSelectedDate);
    } else {
        return getMonthDates(checklistSelectedDate.getFullYear(), checklistSelectedDate.getMonth());
    }
}

function renderChecklistContent(container) {
    const todayStr = formatDateKey(new Date());
    const selectedStr = formatDateKey(checklistSelectedDate);
    
    container.innerHTML = `
        <div class="checklist-page">
            <!-- Page Header -->
            <div class="page-title-bar">
                <h1><i class="fa-solid fa-clipboard-check" style="margin-right:10px; color: var(--accent-blue, #3b82f6);"></i>Checklist Nhân Sự</h1>
                <p class="page-subtitle">Theo dõi tình hình làm việc hàng ngày của team Khương Trịnh</p>
            </div>

            <!-- Tabs: Dashboard / Cài đặt -->
            <div class="checklist-main-tabs">
                <button class="cl-main-tab ${checklistSettingsTab === 'dashboard' ? 'active' : ''}" onclick="switchChecklistMainTab('dashboard')">
                    <i class="fa-solid fa-chart-line"></i> Dashboard
                </button>
                <button class="cl-main-tab ${checklistSettingsTab === 'settings' ? 'active' : ''}" onclick="switchChecklistMainTab('settings')" ${canManageChecklist() ? '' : 'style="display:none;"'}>
                    <i class="fa-solid fa-gear"></i> Cài đặt nhân sự
                </button>
            </div>

            <!-- Tab Content -->
            <div id="checklist-tab-content">
                ${checklistSettingsTab === 'dashboard' ? renderDashboardTab() : renderSettingsTab()}
            </div>
        </div>
    `;
}

function switchChecklistMainTab(tab) {
    checklistSettingsTab = tab;
    const container = document.getElementById('app-content');
    renderChecklistContent(container);
}

// ============================================
// RENDER: Dashboard Tab
// ============================================

function renderDashboardTab() {
    const dates = getViewDates();
    const todayStr = formatDateKey(new Date());
    
    return `
        <!-- View Mode Selector + Date Navigation -->
        <div class="cl-controls">
            <div class="cl-view-modes">
                <button class="cl-view-btn ${checklistViewMode === 'day' ? 'active' : ''}" onclick="setChecklistView('day')">
                    <i class="fa-solid fa-calendar-day"></i> Ngày
                </button>
                <button class="cl-view-btn ${checklistViewMode === 'week' ? 'active' : ''}" onclick="setChecklistView('week')">
                    <i class="fa-solid fa-calendar-week"></i> Tuần
                </button>
                <button class="cl-view-btn ${checklistViewMode === 'month' ? 'active' : ''}" onclick="setChecklistView('month')">
                    <i class="fa-solid fa-calendar"></i> Tháng
                </button>
            </div>
            <div class="cl-date-nav">
                <button class="cl-nav-btn" onclick="navigateChecklistDate(-1)">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <span class="cl-date-label">${getDateLabel()}</span>
                <button class="cl-nav-btn" onclick="navigateChecklistDate(1)">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
                <button class="cl-today-btn" onclick="goChecklistToday()">Hôm nay</button>
            </div>
        </div>

        <!-- Search Bar -->
        <div class="cl-search-bar">
            <i class="fa-solid fa-magnifying-glass cl-search-icon"></i>
            <input type="text" class="cl-search-input" id="cl-search-input" 
                placeholder="Tìm theo tên hoặc email..." 
                value="${checklistSearchQuery}"
                oninput="onChecklistSearch(this.value)" />
            ${checklistSearchQuery ? '<button class="cl-search-clear" onclick="clearChecklistSearch()"><i class="fa-solid fa-xmark"></i></button>' : ''}
        </div>

        <!-- Overview Stats Cards -->
        ${renderOverviewCards(dates)}

        <!-- Data Table -->
        ${checklistViewMode === 'day' ? renderDayTable(dates[0]) : ''}
        ${checklistViewMode === 'week' ? renderWeekTable(dates) : ''}
        ${checklistViewMode === 'month' ? renderMonthTable(dates) : ''}

        <!-- Edit Modal (hidden) -->
        <div class="cl-modal-overlay" id="cl-modal-overlay" onclick="closeChecklistModal()"></div>
        <div class="cl-modal" id="cl-modal">
            <div class="cl-modal-header">
                <h3 id="cl-modal-title">Cập nhật Checklist</h3>
                <button class="cl-modal-close" onclick="closeChecklistModal()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="cl-modal-body" id="cl-modal-body"></div>
        </div>
    `;
}

function getDateLabel() {
    if (checklistViewMode === 'day') {
        const dateStr = formatDateKey(checklistSelectedDate);
        const dow = getDayOfWeek(dateStr);
        return `${dow}, ${formatDateDisplay(dateStr)}`;
    } else if (checklistViewMode === 'week') {
        return getWeekLabel(checklistSelectedDate);
    } else {
        return getMonthLabel(checklistSelectedDate.getFullYear(), checklistSelectedDate.getMonth());
    }
}

// ---- Navigation ----
async function setChecklistView(mode) {
    checklistViewMode = mode;
    await refreshChecklistDashboard();
}

async function navigateChecklistDate(direction) {
    if (checklistViewMode === 'day') {
        checklistSelectedDate.setDate(checklistSelectedDate.getDate() + direction);
    } else if (checklistViewMode === 'week') {
        checklistSelectedDate.setDate(checklistSelectedDate.getDate() + (direction * 7));
    } else {
        checklistSelectedDate.setMonth(checklistSelectedDate.getMonth() + direction);
    }
    await refreshChecklistDashboard();
}

async function goChecklistToday() {
    checklistSelectedDate = new Date();
    await refreshChecklistDashboard();
}

async function refreshChecklistDashboard() {
    const dates = getViewDates();
    await loadChecklistData(dates);
    const container = document.getElementById('app-content');
    if (container) renderChecklistContent(container);
}

// ============================================
// RENDER: Overview Stat Cards
// ============================================

function renderOverviewCards(dates) {
    const filteredStaff = getFilteredStaff();
    const totalStaff = filteredStaff.length;
    let completedCount = 0;
    let totalNewCustomers = 0;
    let totalViewingCustomers = 0;
    let totalFbPosts = 0;
    let totalZaloPosts = 0;

    for (const date of dates) {
        for (const staff of filteredStaff) {
            const key = `${date}_${staff.email}`;
            const entry = checklistData[key];
            if (entry) {
                if (checklistViewMode === 'day' && isChecklistComplete(entry)) completedCount++;
                totalNewCustomers += (entry.new_customers || 0);
                totalViewingCustomers += (entry.viewing_customers || 0);
                totalFbPosts += (entry.fb_posts || 0);
                totalZaloPosts += (entry.zalo_posts || 0);
            }
        }
    }

    // For week/month, count "completed" = days where all items done
    if (checklistViewMode !== 'day') {
        completedCount = 0;
        for (const staff of filteredStaff) {
            let allDone = true;
            for (const date of dates) {
                const key = `${date}_${staff.email}`;
                const entry = checklistData[key];
                if (!isChecklistComplete(entry)) { allDone = false; break; }
            }
            if (allDone) completedCount++;
        }
    }

    const completionRate = totalStaff > 0 ? Math.round((completedCount / totalStaff) * 100) : 0;
    const periodLabel = checklistViewMode === 'day' ? 'hôm nay' : checklistViewMode === 'week' ? 'tuần này' : 'tháng này';

    return `
        <div class="cl-stats-grid">
            <div class="cl-stat-card cl-stat-team">
                <div class="cl-stat-icon"><i class="fa-solid fa-users"></i></div>
                <div class="cl-stat-info">
                    <div class="cl-stat-value">${totalStaff}</div>
                    <div class="cl-stat-label">Nhân sự theo dõi</div>
                </div>
            </div>
            <div class="cl-stat-card cl-stat-done">
                <div class="cl-stat-icon"><i class="fa-solid fa-circle-check"></i></div>
                <div class="cl-stat-info">
                    <div class="cl-stat-value">${completedCount}/${totalStaff}</div>
                    <div class="cl-stat-label">Hoàn thành đủ ${periodLabel}</div>
                </div>
                <div class="cl-stat-bar">
                    <div class="cl-stat-bar-fill" style="width: ${completionRate}%"></div>
                </div>
            </div>
            <div class="cl-stat-card cl-stat-customers">
                <div class="cl-stat-icon"><i class="fa-solid fa-user-plus"></i></div>
                <div class="cl-stat-info">
                    <div class="cl-stat-value">${totalNewCustomers}</div>
                    <div class="cl-stat-label">Khách mới ${periodLabel}</div>
                </div>
            </div>
            <div class="cl-stat-card cl-stat-viewing">
                <div class="cl-stat-icon"><i class="fa-solid fa-map-location-dot"></i></div>
                <div class="cl-stat-info">
                    <div class="cl-stat-value">${totalViewingCustomers}</div>
                    <div class="cl-stat-label">Khách xem đất ${periodLabel}</div>
                </div>
            </div>
            <div class="cl-stat-card cl-stat-fb">
                <div class="cl-stat-icon"><i class="fa-brands fa-facebook"></i></div>
                <div class="cl-stat-info">
                    <div class="cl-stat-value">${totalFbPosts}</div>
                    <div class="cl-stat-label">Bài FB tổng ${periodLabel}</div>
                </div>
            </div>
            <div class="cl-stat-card cl-stat-zalo">
                <div class="cl-stat-icon" style="font-weight:800; font-size:1rem;">Z</div>
                <div class="cl-stat-info">
                    <div class="cl-stat-value">${totalZaloPosts}</div>
                    <div class="cl-stat-label">Bài Zalo tổng ${periodLabel}</div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// RENDER: Day View Table
// ============================================

function renderDayTable(dateStr) {
    const filteredStaff = getFilteredStaff();
    if (filteredStaff.length === 0) {
        if (checklistStaffList.length === 0) {
            return `
                <div class="cl-empty-state">
                    <i class="fa-solid fa-user-slash"></i>
                    <h3>Chưa có nhân sự nào được thêm vào checklist</h3>
                    <p>Vào tab <strong>Cài đặt nhân sự</strong> để bật theo dõi cho từng nhân sự.</p>
                </div>
            `;
        }
        return `
            <div class="cl-empty-state">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>Không tìm thấy nhân sự "${checklistSearchQuery}"</h3>
                <p>Thử tìm với tên hoặc email khác.</p>
            </div>
        `;
    }

    let rows = '';
    for (const staff of filteredStaff) {
        const key = `${dateStr}_${staff.email}`;
        const entry = checklistData[key] || null;
        const status = getChecklistStatus(entry);
        const fb = entry ? entry.fb_posts : '-';
        const zalo = entry ? entry.zalo_posts : '-';
        const newCust = entry ? entry.new_customers : '-';
        const viewCust = entry ? entry.viewing_customers : '-';
        const notes = entry && entry.notes ? entry.notes : '';

        const fbClass = entry ? (entry.fb_posts >= 3 ? 'cl-cell-ok' : 'cl-cell-bad') : 'cl-cell-none';
        const zaloClass = entry ? (entry.zalo_posts >= 3 ? 'cl-cell-ok' : 'cl-cell-bad') : 'cl-cell-none';
        const canEdit = canManageChecklist() || (currentUser && currentUser.email === staff.email);

        rows += `
            <tr class="cl-data-row ${canEdit ? 'cl-editable' : ''}" ${canEdit ? `onclick="openChecklistModal('${dateStr}', '${staff.email}')"` : ''}>
                <td class="cl-name-cell">
                    <div class="cl-staff-avatar">${staff.name.charAt(0).toUpperCase()}</div>
                    <div class="cl-staff-info">
                        <span class="cl-staff-name">${staff.name}</span>
                        ${staff.role === 'leader' ? '<span class="cl-role-badge cl-role-leader">Leader</span>' : ''}
                    </div>
                </td>
                <td class="${fbClass}">
                    <span class="cl-cell-value">${fb}</span>
                    <span class="cl-cell-target">/3</span>
                </td>
                <td class="${zaloClass}">
                    <span class="cl-cell-value">${zalo}</span>
                    <span class="cl-cell-target">/3</span>
                </td>
                <td class="cl-cell-neutral">
                    <span class="cl-cell-value">${newCust}</span>
                </td>
                <td class="cl-cell-neutral">
                    <span class="cl-cell-value">${viewCust}</span>
                </td>
                <td>
                    <span class="cl-status-badge ${status.class}">
                        <i class="fa-solid ${status.icon}"></i> ${status.label}
                    </span>
                </td>
                <td class="cl-notes-cell" title="${notes}">
                    ${notes ? `<i class="fa-solid fa-sticky-note" style="color: var(--accent-amber, #f59e0b); margin-right:4px;"></i>${notes.substring(0, 30)}${notes.length > 30 ? '...' : ''}` : '<span style="color:#ccc;">—</span>'}
                </td>
            </tr>
        `;
    }

    return `
        <div class="cl-table-wrapper">
            <table class="cl-table">
                <thead>
                    <tr>
                        <th class="cl-th-name">Nhân sự</th>
                        <th class="cl-th-data"><i class="fa-brands fa-facebook"></i> FB</th>
                        <th class="cl-th-data"><span style="font-weight:800;">Z</span> Zalo</th>
                        <th class="cl-th-data"><i class="fa-solid fa-user-plus"></i> Khách mới</th>
                        <th class="cl-th-data"><i class="fa-solid fa-map-location-dot"></i> Xem đất</th>
                        <th class="cl-th-status">Trạng thái</th>
                        <th class="cl-th-notes">Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
        <p class="cl-hint"><i class="fa-solid fa-hand-pointer"></i> Click vào hàng để cập nhật dữ liệu</p>
    `;
}

// ============================================
// RENDER: Week View Table
// ============================================

function renderWeekTable(dates) {
    const filteredStaff = getFilteredStaff();
    if (filteredStaff.length === 0) {
        if (checklistStaffList.length === 0) {
            return `
                <div class="cl-empty-state">
                    <i class="fa-solid fa-user-slash"></i>
                    <h3>Chưa có nhân sự nào</h3>
                    <p>Vào tab <strong>Cài đặt nhân sự</strong> để bật theo dõi.</p>
                </div>
            `;
        }
        return `
            <div class="cl-empty-state">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>Không tìm thấy nhân sự "${checklistSearchQuery}"</h3>
                <p>Thử tìm với tên hoặc email khác.</p>
            </div>
        `;
    }

    // Header row: T2 → CN
    const dayLabels = dates.map(d => {
        const dow = getDayOfWeek(d);
        const [, , day] = d.split('-');
        return `<th class="cl-th-day">${dow}<br><span class="cl-day-num">${day}</span></th>`;
    }).join('');

    let rows = '';
    for (const staff of filteredStaff) {
        let cells = '';
        let weekTotal = { fb: 0, zalo: 0, cust: 0, view: 0, daysOk: 0 };
        
        for (const date of dates) {
            const key = `${date}_${staff.email}`;
            const entry = checklistData[key];
            const status = getChecklistStatus(entry);
            const canEdit = canManageChecklist() || (currentUser && currentUser.email === staff.email);
            
            if (entry) {
                weekTotal.fb += entry.fb_posts || 0;
                weekTotal.zalo += entry.zalo_posts || 0;
                weekTotal.cust += entry.new_customers || 0;
                weekTotal.view += entry.viewing_customers || 0;
                if (isChecklistComplete(entry)) weekTotal.daysOk++;
            }

            cells += `
                <td class="cl-week-cell ${status.class}" ${canEdit ? `onclick="event.stopPropagation(); openChecklistModal('${date}', '${staff.email}')"` : ''} title="FB: ${entry ? entry.fb_posts : 0}/3 | Zalo: ${entry ? entry.zalo_posts : 0}/3 | KH mới: ${entry ? entry.new_customers : 0} | Xem: ${entry ? entry.viewing_customers : 0}">
                    <i class="fa-solid ${status.icon}"></i>
                </td>
            `;
        }

        rows += `
            <tr>
                <td class="cl-name-cell">
                    <div class="cl-staff-avatar">${staff.name.charAt(0).toUpperCase()}</div>
                    <span class="cl-staff-name-sm">${staff.name}</span>
                </td>
                ${cells}
                <td class="cl-week-summary">
                    <div class="cl-week-stat"><strong>${weekTotal.daysOk}</strong>/7 ngày</div>
                    <div class="cl-week-detail">FB: ${weekTotal.fb} | Z: ${weekTotal.zalo}</div>
                    <div class="cl-week-detail">KH: ${weekTotal.cust} | Xem: ${weekTotal.view}</div>
                </td>
            </tr>
        `;
    }

    return `
        <div class="cl-table-wrapper cl-week-view">
            <table class="cl-table cl-table-week">
                <thead>
                    <tr>
                        <th class="cl-th-name">Nhân sự</th>
                        ${dayLabels}
                        <th class="cl-th-summary">Tổng tuần</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
        <div class="cl-week-legend">
            <span class="cl-legend-item"><span class="cl-legend-dot status-done"></span> Hoàn thành</span>
            <span class="cl-legend-item"><span class="cl-legend-dot status-warning"></span> Chưa đủ</span>
            <span class="cl-legend-item"><span class="cl-legend-dot status-none"></span> Chưa có data</span>
            <span style="margin-left:auto; color: var(--text-secondary); font-size: 0.8rem;"><i class="fa-solid fa-hand-pointer"></i> Click vào ô để chỉnh sửa</span>
        </div>
    `;
}

// ============================================
// RENDER: Month View Table
// ============================================

function renderMonthTable(dates) {
    const filteredStaff = getFilteredStaff();
    if (filteredStaff.length === 0) {
        if (checklistStaffList.length === 0) {
            return `
                <div class="cl-empty-state">
                    <i class="fa-solid fa-user-slash"></i>
                    <h3>Chưa có nhân sự nào</h3>
                    <p>Vào tab <strong>Cài đặt nhân sự</strong> để bật theo dõi.</p>
                </div>
            `;
        }
        return `
            <div class="cl-empty-state">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>Không tìm thấy nhân sự "${checklistSearchQuery}"</h3>
                <p>Thử tìm với tên hoặc email khác.</p>
            </div>
        `;
    }

    let rows = '';
    for (const staff of filteredStaff) {
        let monthTotal = { fb: 0, zalo: 0, cust: 0, view: 0, daysOk: 0, daysWithData: 0 };
        
        for (const date of dates) {
            const key = `${date}_${staff.email}`;
            const entry = checklistData[key];
            if (entry) {
                monthTotal.fb += entry.fb_posts || 0;
                monthTotal.zalo += entry.zalo_posts || 0;
                monthTotal.cust += entry.new_customers || 0;
                monthTotal.view += entry.viewing_customers || 0;
                monthTotal.daysWithData++;
                if (isChecklistComplete(entry)) monthTotal.daysOk++;
            }
        }

        const completionRate = dates.length > 0 ? Math.round((monthTotal.daysOk / dates.length) * 100) : 0;

        rows += `
            <tr>
                <td class="cl-name-cell">
                    <div class="cl-staff-avatar">${staff.name.charAt(0).toUpperCase()}</div>
                    <div class="cl-staff-info">
                        <span class="cl-staff-name">${staff.name}</span>
                        ${staff.role === 'leader' ? '<span class="cl-role-badge cl-role-leader">Leader</span>' : ''}
                    </div>
                </td>
                <td class="cl-cell-neutral"><span class="cl-cell-value">${monthTotal.fb}</span></td>
                <td class="cl-cell-neutral"><span class="cl-cell-value">${monthTotal.zalo}</span></td>
                <td class="cl-cell-neutral"><span class="cl-cell-value">${monthTotal.cust}</span></td>
                <td class="cl-cell-neutral"><span class="cl-cell-value">${monthTotal.view}</span></td>
                <td>
                    <span class="cl-cell-value">${monthTotal.daysOk}/${dates.length}</span>
                    <div class="cl-mini-bar">
                        <div class="cl-mini-bar-fill" style="width: ${completionRate}%"></div>
                    </div>
                </td>
                <td class="cl-cell-neutral"><span class="cl-cell-value">${monthTotal.daysWithData}</span></td>
            </tr>
        `;
    }

    return `
        <div class="cl-table-wrapper">
            <table class="cl-table">
                <thead>
                    <tr>
                        <th class="cl-th-name">Nhân sự</th>
                        <th class="cl-th-data"><i class="fa-brands fa-facebook"></i> Tổng FB</th>
                        <th class="cl-th-data"><span style="font-weight:800;">Z</span> Tổng Zalo</th>
                        <th class="cl-th-data"><i class="fa-solid fa-user-plus"></i> Tổng KH mới</th>
                        <th class="cl-th-data"><i class="fa-solid fa-map-location-dot"></i> Tổng xem đất</th>
                        <th class="cl-th-data">Ngày hoàn thành</th>
                        <th class="cl-th-data">Ngày có data</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
}

// ============================================
// Modal: Edit Checklist Entry
// ============================================

function openChecklistModal(dateStr, email) {
    // Check permission
    const canEdit = canManageChecklist() || (currentUser && currentUser.email === email);
    if (!canEdit) return;

    const staff = checklistStaffList.find(s => s.email === email);
    if (!staff) return;

    const key = `${dateStr}_${email}`;
    const entry = checklistData[key] || {};

    const modal = document.getElementById('cl-modal');
    const overlay = document.getElementById('cl-modal-overlay');
    const title = document.getElementById('cl-modal-title');
    const body = document.getElementById('cl-modal-body');

    title.innerHTML = `<i class="fa-solid fa-pen-to-square" style="margin-right:8px; color: var(--accent-blue);"></i> ${staff.name} — ${getDayOfWeek(dateStr)} ${formatDateDisplay(dateStr)}`;
    
    body.innerHTML = `
        <form id="cl-edit-form" onsubmit="submitChecklistForm(event, '${dateStr}', '${email}')">
            <div class="cl-form-grid">
                <div class="cl-form-group">
                    <label><i class="fa-brands fa-facebook" style="color:#1877f2; margin-right:6px;"></i>Bài đăng Facebook</label>
                    <div class="cl-input-wrapper">
                        <input type="number" name="fb_posts" min="0" max="99" value="${entry.fb_posts || 0}" class="cl-input" />
                        <span class="cl-input-hint">tối thiểu 3 bài</span>
                    </div>
                </div>
                <div class="cl-form-group">
                    <label><span style="font-weight:800; color:#0068ff; margin-right:6px;">Z</span>Bài đăng Zalo</label>
                    <div class="cl-input-wrapper">
                        <input type="number" name="zalo_posts" min="0" max="99" value="${entry.zalo_posts || 0}" class="cl-input" />
                        <span class="cl-input-hint">tối thiểu 3 bài</span>
                    </div>
                </div>
                <div class="cl-form-group">
                    <label><i class="fa-solid fa-user-plus" style="color:#10b981; margin-right:6px;"></i>Khách mới</label>
                    <input type="number" name="new_customers" min="0" max="999" value="${entry.new_customers || 0}" class="cl-input" />
                </div>
                <div class="cl-form-group">
                    <label><i class="fa-solid fa-map-location-dot" style="color:#8b5cf6; margin-right:6px;"></i>Khách xem đất</label>
                    <input type="number" name="viewing_customers" min="0" max="999" value="${entry.viewing_customers || 0}" class="cl-input" />
                </div>
            </div>
            <div class="cl-form-group cl-form-full">
                <label><i class="fa-solid fa-sticky-note" style="color:#f59e0b; margin-right:6px;"></i>Ghi chú</label>
                <textarea name="notes" class="cl-textarea" rows="2" placeholder="Ghi chú thêm (không bắt buộc)...">${entry.notes || ''}</textarea>
            </div>
            <div class="cl-form-actions">
                <button type="button" class="cl-btn cl-btn-cancel" onclick="closeChecklistModal()">Hủy</button>
                <button type="submit" class="cl-btn cl-btn-save">
                    <i class="fa-solid fa-floppy-disk"></i> Lưu
                </button>
            </div>
        </form>
    `;

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeChecklistModal() {
    const modal = document.getElementById('cl-modal');
    const overlay = document.getElementById('cl-modal-overlay');
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

async function submitChecklistForm(event, dateStr, email) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    const data = {
        fb_posts: formData.get('fb_posts'),
        zalo_posts: formData.get('zalo_posts'),
        new_customers: formData.get('new_customers'),
        viewing_customers: formData.get('viewing_customers'),
        notes: formData.get('notes')
    };

    // Show saving state
    const saveBtn = form.querySelector('.cl-btn-save');
    const origHTML = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';
    saveBtn.disabled = true;

    const success = await saveChecklistEntry(dateStr, email, data);
    
    if (success) {
        closeChecklistModal();
        // Re-render dashboard
        const container = document.getElementById('app-content');
        renderChecklistContent(container);
    } else {
        saveBtn.innerHTML = origHTML;
        saveBtn.disabled = false;
    }
}

// ============================================
// RENDER: Settings Tab (Manage Staff)
// ============================================

function renderSettingsTab() {
    return `
        <div class="cl-settings">
            <div class="cl-settings-header">
                <h2><i class="fa-solid fa-users-gear" style="margin-right:8px;"></i>Quản lý nhân sự theo dõi</h2>
                <p>Bật/tắt theo dõi, thêm link Facebook và Google Sheet cho từng nhân sự.</p>
            </div>
            <div class="cl-search-bar">
                <i class="fa-solid fa-magnifying-glass cl-search-icon"></i>
                <input type="text" class="cl-search-input" id="cl-settings-search-input" 
                    placeholder="Tìm nhân sự theo tên hoặc email..." 
                    value="${checklistSettingsSearchQuery}"
                    oninput="onSettingsSearch(this.value)" />
                ${checklistSettingsSearchQuery ? '<button class="cl-search-clear" onclick="clearSettingsSearch()"><i class="fa-solid fa-xmark"></i></button>' : ''}
            </div>
            <div id="cl-settings-list">
                ${renderSettingsStaffList()}
            </div>
        </div>
    `;
}

async function renderSettingsStaffListAsync() {
    // Reload full whitelist for settings
    try {
        const db = getChecklistDB();
        const snapshot = await db.collection('whitelist').get();
        const allStaff = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            allStaff.push({
                email: doc.id,
                name: data.name || doc.id.split('@')[0],
                role: data.role || 'member',
                showInChecklist: data.showInChecklist === true,
                facebook_links: data.facebook_links || [],
                customer_sheet_url: data.customer_sheet_url || ''
            });
        });
        // Also include admin
        const adminExists = allStaff.some(s => s.email === ADMIN_EMAIL.toLowerCase());
        if (!adminExists) {
            allStaff.unshift({
                email: ADMIN_EMAIL.toLowerCase(),
                name: 'Sếp Khương',
                role: 'admin',
                showInChecklist: false,
                facebook_links: [],
                customer_sheet_url: ''
            });
        }
        allStaff.sort((a, b) => {
            const roleOrder = { admin: 0, leader: 1, member: 2 };
            if (roleOrder[a.role] !== roleOrder[b.role]) return roleOrder[a.role] - roleOrder[b.role];
            return a.name.localeCompare(b.name);
        });
        return allStaff;
    } catch (err) {
        console.error('Lỗi load settings staff:', err);
        return [];
    }
}

function renderSettingsStaffList() {
    // This renders a placeholder, then async loads
    setTimeout(async () => {
        let allStaff = await renderSettingsStaffListAsync();
        const container = document.getElementById('cl-settings-list');
        if (!container) return;

        // Filter by search query
        if (checklistSettingsSearchQuery.trim()) {
            const q = checklistSettingsSearchQuery.toLowerCase().trim();
            allStaff = allStaff.filter(s => 
                s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
            );
        }

        if (allStaff.length === 0) {
            if (checklistSettingsSearchQuery.trim()) {
                container.innerHTML = `<div class="cl-empty-state"><i class="fa-solid fa-magnifying-glass"></i><h3>Không tìm thấy "${checklistSettingsSearchQuery}"</h3><p>Thử tìm với tên hoặc email khác.</p></div>`;
            } else {
                container.innerHTML = '<p style="text-align:center; color: var(--text-secondary);">Chưa có nhân sự nào trong hệ thống.</p>';
            }
            return;
        }

        let html = '<div class="cl-settings-cards">';
        for (const staff of allStaff) {
            const fbLinksHtml = staff.facebook_links.length > 0 
                ? staff.facebook_links.map((link, idx) => `
                    <div class="cl-fb-link-item">
                        <i class="fa-brands fa-facebook" style="color:#1877f2;"></i>
                        <a href="${link}" target="_blank" rel="noopener" class="cl-fb-link-text">${link.replace('https://www.facebook.com/', '').replace('https://facebook.com/', '').substring(0, 40)}</a>
                        <button class="cl-fb-remove-btn" onclick="event.stopPropagation(); removeStaffFBLink('${staff.email}', ${idx})" title="Xóa link này">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                `).join('')
                : '<span class="cl-no-data">Chưa có link Facebook</span>';

            html += `
                <div class="cl-settings-card ${staff.showInChecklist ? 'cl-card-active' : 'cl-card-inactive'}">
                    <div class="cl-settings-card-header">
                        <div class="cl-staff-avatar ${staff.showInChecklist ? '' : 'cl-avatar-dim'}">${staff.name.charAt(0).toUpperCase()}</div>
                        <div class="cl-settings-info">
                            <div class="cl-settings-name">${staff.name}</div>
                            <div class="cl-settings-email">${staff.email}</div>
                            <span class="cl-role-badge cl-role-${staff.role}">${staff.role === 'admin' ? 'Admin' : staff.role === 'leader' ? 'Leader' : 'Member'}</span>
                        </div>
                        <label class="cl-toggle">
                            <input type="checkbox" ${staff.showInChecklist ? 'checked' : ''} onchange="toggleStaffChecklist('${staff.email}', this.checked)" />
                            <span class="cl-toggle-slider"></span>
                        </label>
                    </div>
                    <div class="cl-settings-card-body">
                        <div class="cl-settings-section">
                            <label class="cl-settings-label"><i class="fa-brands fa-facebook" style="color:#1877f2;"></i> Facebook Profiles</label>
                            <div class="cl-fb-links">${fbLinksHtml}</div>
                            <div class="cl-add-fb">
                                <input type="url" class="cl-input cl-input-sm" id="fb-input-${staff.email.replace(/[@.]/g, '_')}" placeholder="Dán link FB profile..." />
                                <button class="cl-btn cl-btn-add-sm" onclick="addStaffFBLink('${staff.email}')">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="cl-settings-section">
                            <label class="cl-settings-label"><i class="fa-solid fa-table" style="color:#34a853;"></i> Google Sheet khách hàng</label>
                            <div class="cl-sheet-input">
                                <input type="url" class="cl-input cl-input-sm" id="sheet-input-${staff.email.replace(/[@.]/g, '_')}" 
                                    value="${staff.customer_sheet_url}" 
                                    placeholder="Dán link Google Sheet..." />
                                <button class="cl-btn cl-btn-save-sm" onclick="saveStaffSheet('${staff.email}')">
                                    <i class="fa-solid fa-floppy-disk"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        html += '</div>';
        container.innerHTML = html;
    }, 0);

    return `
        <div style="display:flex; justify-content:center; padding:30px;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size:1.5rem; color: var(--accent-blue);"></i>
        </div>
    `;
}

// ---- Settings Actions ----

async function toggleStaffChecklist(email, checked) {
    try {
        const db = getChecklistDB();
        await db.collection('whitelist').doc(email).update({
            showInChecklist: checked
        });
        // Reload staff list
        await loadChecklistStaff();
    } catch (error) {
        console.error('Lỗi toggle checklist:', error);
        alert('Không thể cập nhật. Vui lòng thử lại.');
    }
}

async function addStaffFBLink(email) {
    const inputId = `fb-input-${email.replace(/[@.]/g, '_')}`;
    const input = document.getElementById(inputId);
    if (!input || !input.value.trim()) {
        alert('Vui lòng nhập link Facebook.');
        return;
    }
    
    const link = input.value.trim();
    
    try {
        const db = getChecklistDB();
        await db.collection('whitelist').doc(email).update({
            facebook_links: firebase.firestore.FieldValue.arrayUnion(link)
        });
        input.value = '';
        // Re-render settings
        const settingsContainer = document.getElementById('cl-settings-list');
        if (settingsContainer) {
            settingsContainer.innerHTML = renderSettingsStaffList();
        }
    } catch (error) {
        console.error('Lỗi thêm FB link:', error);
        alert('Không thể thêm link. Vui lòng thử lại.');
    }
}

async function removeStaffFBLink(email, index) {
    if (!confirm('Xóa link Facebook này?')) return;
    
    try {
        const db = getChecklistDB();
        const doc = await db.collection('whitelist').doc(email).get();
        if (doc.exists) {
            const links = doc.data().facebook_links || [];
            links.splice(index, 1);
            await db.collection('whitelist').doc(email).update({
                facebook_links: links
            });
            // Re-render settings
            const settingsContainer = document.getElementById('cl-settings-list');
            if (settingsContainer) {
                settingsContainer.innerHTML = renderSettingsStaffList();
            }
        }
    } catch (error) {
        console.error('Lỗi xóa FB link:', error);
        alert('Không thể xóa link. Vui lòng thử lại.');
    }
}

async function saveStaffSheet(email) {
    const inputId = `sheet-input-${email.replace(/[@.]/g, '_')}`;
    const input = document.getElementById(inputId);
    if (!input) return;
    
    const url = input.value.trim();
    
    try {
        const db = getChecklistDB();
        await db.collection('whitelist').doc(email).update({
            customer_sheet_url: url
        });
        // Show success feedback
        const btn = input.nextElementSibling;
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-check"></i>';
            btn.style.background = '#10b981';
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
                btn.style.background = '';
            }, 1500);
        }
    } catch (error) {
        console.error('Lỗi lưu Sheet URL:', error);
        alert('Không thể lưu. Vui lòng thử lại.');
    }
}

// ---- Search Functions ----

function getFilteredStaff() {
    if (!checklistSearchQuery.trim()) return checklistStaffList;
    const q = checklistSearchQuery.toLowerCase().trim();
    return checklistStaffList.filter(s => 
        s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    );
}

function onChecklistSearch(value) {
    checklistSearchQuery = value;
    // Re-render chỉ phần bảng + cards, không full page để giữ focus input
    const dates = getViewDates();
    
    // Update overview cards
    const statsContainer = document.querySelector('.cl-stats-grid');
    if (statsContainer) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = renderOverviewCards(dates);
        const newStats = tempDiv.querySelector('.cl-stats-grid');
        if (newStats) statsContainer.replaceWith(newStats);
    }

    // Update table
    const tableWrapper = document.querySelector('.cl-table-wrapper');
    const weekView = document.querySelector('.cl-week-view');
    const targetWrapper = weekView || tableWrapper;
    
    if (targetWrapper) {
        let newTableHTML = '';
        if (checklistViewMode === 'day') newTableHTML = renderDayTable(dates[0]);
        else if (checklistViewMode === 'week') newTableHTML = renderWeekTable(dates);
        else newTableHTML = renderMonthTable(dates);
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = newTableHTML;
        const parent = targetWrapper.parentNode;
        // Remove old table + hint + legend
        const oldHint = parent.querySelector('.cl-hint');
        const oldLegend = parent.querySelector('.cl-week-legend');
        if (oldHint) oldHint.remove();
        if (oldLegend) oldLegend.remove();
        targetWrapper.replaceWith(...tempDiv.children);
    }

    // Update clear button visibility
    const searchBar = document.querySelector('#cl-search-input');
    if (searchBar) {
        const clearBtn = searchBar.parentNode.querySelector('.cl-search-clear');
        if (checklistSearchQuery && !clearBtn) {
            const btn = document.createElement('button');
            btn.className = 'cl-search-clear';
            btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            btn.onclick = () => clearChecklistSearch();
            searchBar.parentNode.appendChild(btn);
        } else if (!checklistSearchQuery && clearBtn) {
            clearBtn.remove();
        }
    }
}

function clearChecklistSearch() {
    checklistSearchQuery = '';
    const input = document.getElementById('cl-search-input');
    if (input) { input.value = ''; input.focus(); }
    onChecklistSearch('');
}

function onSettingsSearch(value) {
    checklistSettingsSearchQuery = value;
    // Re-render settings list
    const container = document.getElementById('cl-settings-list');
    if (container) {
        container.innerHTML = renderSettingsStaffList();
    }
    // Update clear button
    const searchBar = document.getElementById('cl-settings-search-input');
    if (searchBar) {
        const clearBtn = searchBar.parentNode.querySelector('.cl-search-clear');
        if (checklistSettingsSearchQuery && !clearBtn) {
            const btn = document.createElement('button');
            btn.className = 'cl-search-clear';
            btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            btn.onclick = () => clearSettingsSearch();
            searchBar.parentNode.appendChild(btn);
        } else if (!checklistSettingsSearchQuery && clearBtn) {
            clearBtn.remove();
        }
    }
}

function clearSettingsSearch() {
    checklistSettingsSearchQuery = '';
    const input = document.getElementById('cl-settings-search-input');
    if (input) { input.value = ''; input.focus(); }
    onSettingsSearch('');
}

// ---- Init: Called when Training Hub is loaded ----
document.addEventListener('DOMContentLoaded', () => {
    // Sẽ được gọi bởi script.js khi navigate tới trang checklist
});
