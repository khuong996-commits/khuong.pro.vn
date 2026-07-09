// ============================================
// TRAINING HUB - Lịch Đi Khách Team
// Weekly team appointment calendar
// ============================================

const TEAM_SCHEDULE_TYPES = {
    map_consulting: {
        label: 'Tư vấn bản đồ',
        icon: 'fa-map',
        className: 'ts-type-map'
    },
    field_trip: {
        label: 'Đón khách tại nhà',
        icon: 'fa-car-side',
        className: 'ts-type-field'
    },
    land_pickup: {
        label: 'Khách đón tại đất',
        icon: 'fa-location-dot',
        className: 'ts-type-pickup'
    }
};

const TEAM_SCHEDULE_STATUSES = {
    pending: {
        label: 'Mới thêm',
        icon: 'fa-clock',
        className: 'ts-status-pending'
    },
    canceled: {
        label: 'Khách hủy kèo',
        icon: 'fa-circle-xmark',
        className: 'ts-status-canceled'
    },
    done: {
        label: 'Đã đi',
        icon: 'fa-circle-check',
        className: 'ts-status-done'
    },
    closed: {
        label: 'Đã chốt',
        icon: 'fa-handshake',
        className: 'ts-status-closed'
    },
    considering: {
        label: 'Về cân nhắc thêm',
        icon: 'fa-scale-balanced',
        className: 'ts-status-considering'
    },
    arranging_field_trip: {
        label: 'Sắp xếp lịch đi thực địa',
        icon: 'fa-calendar-check',
        className: 'ts-status-arranging'
    },
    not_viable: {
        label: 'Khách không ăn thua',
        icon: 'fa-ban',
        className: 'ts-status-not-viable'
    }
};

const TEAM_SCHEDULE_DUE_STATUS = {
    label: 'Đến giờ hẹn',
    icon: 'fa-bell',
    className: 'ts-status-due'
};

let teamScheduleSelectedDate = new Date();
let teamScheduleEvents = [];
let teamScheduleStaffList = [];
let teamScheduleAutoRefreshTimer = null;

function getTeamScheduleDB() {
    return firebase.firestore();
}

function canManageTeamSchedule() {
    return typeof canManageEmails === 'function' && canManageEmails();
}

function canEditTeamScheduleEvent(item) {
    if (!currentUser || !item) return false;
    return canManageTeamSchedule() || item.ownerEmail === currentUser.email;
}

function tsFormatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function tsFormatDateDisplay(dateStr) {
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
}

function tsAddDaysToDateKey(dateStr, days) {
    const [year, month, day] = String(dateStr || '').split('-').map(Number);
    if (!year || !month || !day) return tsFormatDateKey(new Date());

    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);
    return tsFormatDateKey(date);
}

function tsGetDayOfWeek(dateStr) {
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const date = new Date(dateStr + 'T00:00:00');
    return days[date.getDay()];
}

function tsGetWeekDates(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const dd = new Date(monday);
        dd.setDate(monday.getDate() + i);
        dates.push(tsFormatDateKey(dd));
    }
    return dates;
}

function tsGetWeekLabel(date) {
    const dates = tsGetWeekDates(date);
    return `${tsFormatDateDisplay(dates[0])} - ${tsFormatDateDisplay(dates[6])}`;
}

function tsEscape(value) {
    const div = document.createElement('div');
    div.textContent = value == null ? '' : String(value);
    return div.innerHTML;
}

function tsSafeId(value) {
    return String(value || '').replace(/[^a-zA-Z0-9_-]/g, '_');
}

function tsGetStaffName(email) {
    const normalizedEmail = String(email || '').toLowerCase().trim();
    const staffInfo = teamScheduleStaffList.find(staff => staff.email === normalizedEmail);
    return staffInfo ? staffInfo.name : normalizedEmail;
}

function tsNormalizeParticipantNames(values) {
    return values
        .flatMap(value => String(value || '').split(/[\n,]+/))
        .map(value => value.trim())
        .filter(Boolean);
}

function tsUniqueValues(values) {
    const seen = new Set();
    return values.filter(value => {
        const key = String(value || '').toLowerCase().trim();
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function tsParseScheduleDateTime(item) {
    const [year, month, day] = String(item?.date || '').split('-').map(Number);
    const [hour, minute] = String(item?.startTime || '').split(':').map(Number);

    if (!year || !month || !day || Number.isNaN(hour) || Number.isNaN(minute)) {
        return null;
    }

    return new Date(year, month - 1, day, hour, minute, 0, 0);
}

function tsIsScheduleDue(item) {
    if ((item?.status || 'pending') !== 'pending') return false;

    const scheduleDateTime = tsParseScheduleDateTime(item);
    if (!scheduleDateTime) return false;

    return Date.now() >= scheduleDateTime.getTime();
}

function tsGetVisualScheduleStatus(item) {
    if (tsIsScheduleDue(item)) return TEAM_SCHEDULE_DUE_STATUS;
    return TEAM_SCHEDULE_STATUSES[item?.status || 'pending'] || TEAM_SCHEDULE_STATUSES.pending;
}

function tsGetScheduleParticipants(item) {
    const emailNames = Array.isArray(item?.participantEmails)
        ? item.participantEmails.map(tsGetStaffName)
        : [];
    const savedNames = Array.isArray(item?.participantNames) ? item.participantNames : [];
    const fallbackOwner = item?.ownerName || item?.ownerEmail || '';

    return tsUniqueValues([...emailNames, ...savedNames, fallbackOwner]);
}

function tsGetScheduleSupporters(item) {
    if (Array.isArray(item?.supportLabels) && item.supportLabels.length) {
        return tsUniqueValues(item.supportLabels);
    }

    const emailNames = Array.isArray(item?.supportEmails)
        ? item.supportEmails.map(tsGetStaffName)
        : [];
    const savedNames = Array.isArray(item?.supportNames) ? item.supportNames : [];
    const extraNames = Array.isArray(item?.supportExtraNames)
        ? item.supportExtraNames
        : tsNormalizeParticipantNames([item?.supportExtra]);
    const legacyExtraNames = Array.isArray(item?.participantExtraNames)
        ? item.participantExtraNames
        : tsNormalizeParticipantNames([item?.participantExtra]);

    return tsUniqueValues([...emailNames, ...savedNames, ...extraNames, ...legacyExtraNames]);
}

function renderTeamScheduleParticipants(item, className) {
    const participants = tsGetScheduleParticipants(item);
    if (!participants.length) return '';

    return `
        <div class="${className}">
            <i class="fa-solid fa-people-group"></i>
            <span>${participants.map(tsEscape).join(', ')}</span>
        </div>
    `;
}

function renderTeamScheduleSupporters(item, className) {
    const supporters = tsGetScheduleSupporters(item);
    if (!supporters.length) return '';

    return `
        <div class="${className}">
            <i class="fa-solid fa-handshake-angle"></i>
            <span><strong>Người hỗ trợ:</strong> ${supporters.map(tsEscape).join(', ')}</span>
        </div>
    `;
}

async function loadTeamScheduleStaff() {
    const staffByEmail = new Map();

    try {
        const db = getTeamScheduleDB();
        const snapshot = await db.collection('whitelist').get();
        snapshot.forEach(doc => {
            const data = doc.data();
            const email = doc.id.toLowerCase();
            staffByEmail.set(email, {
                email,
                name: data.displayName || data.name || email.split('@')[0],
                role: data.role || 'member'
            });
        });
    } catch (error) {
        console.error('Lỗi load nhân sự cho lịch:', error);
    }

    if (currentUser && !staffByEmail.has(currentUser.email.toLowerCase())) {
        staffByEmail.set(currentUser.email.toLowerCase(), {
            email: currentUser.email.toLowerCase(),
            name: currentUser.displayName || currentUser.email.split('@')[0],
            role: userRole || 'member'
        });
    }

    teamScheduleStaffList = Array.from(staffByEmail.values()).sort((a, b) => {
        const roleOrder = { admin: 0, leader: 1, member: 2 };
        const roleDiff = (roleOrder[a.role] ?? 3) - (roleOrder[b.role] ?? 3);
        if (roleDiff !== 0) return roleDiff;
        return a.name.localeCompare(b.name);
    });
}

async function loadTeamScheduleEvents(dates) {
    try {
        const db = getTeamScheduleDB();
        const snapshot = await db.collection('team_schedule')
            .where('date', 'in', dates)
            .get();

        teamScheduleEvents = [];
        snapshot.forEach(doc => {
            teamScheduleEvents.push({ id: doc.id, ...doc.data() });
        });

        teamScheduleEvents.sort((a, b) => {
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            return (a.startTime || '').localeCompare(b.startTime || '');
        });
    } catch (error) {
        console.error('Lỗi load lịch đi khách:', error);
        teamScheduleEvents = [];
    }
}

async function renderTeamSchedulePage() {
    const container = document.getElementById('app-content');
    if (!container) return;

    container.innerHTML = `
        <div class="ts-loading">
            <i class="fa-solid fa-spinner fa-spin"></i>
            <p>Đang tải lịch đi khách team...</p>
        </div>
    `;

    await loadTeamScheduleStaff();
    await loadTeamScheduleEvents(tsGetWeekDates(teamScheduleSelectedDate));
    renderTeamScheduleContent(container);
    startTeamScheduleAutoRefresh();
}

function startTeamScheduleAutoRefresh() {
    if (teamScheduleAutoRefreshTimer) return;

    teamScheduleAutoRefreshTimer = window.setInterval(() => {
        const container = document.getElementById('app-content');
        const schedulePage = container?.querySelector('.team-schedule-page');
        const modal = document.getElementById('ts-modal');

        if (!container || !schedulePage) {
            window.clearInterval(teamScheduleAutoRefreshTimer);
            teamScheduleAutoRefreshTimer = null;
            return;
        }

        if (modal?.classList.contains('active')) return;
        renderTeamScheduleContent(container);
    }, 30000);
}

function renderTeamScheduleContent(container) {
    const dates = tsGetWeekDates(teamScheduleSelectedDate);
    const today = tsFormatDateKey(new Date());

    container.innerHTML = `
        <div class="team-schedule-page">
            <div class="page-title-bar ts-title-bar">
                <div>
                    <h1><i class="fa-solid fa-calendar-days"></i> Lịch Đi Khách Team</h1>
                    <p class="page-subtitle">Theo dõi lịch tư vấn bản đồ, đón khách tại nhà và khách đón tại đất trong tuần.</p>
                </div>
                <button class="ts-primary-btn" onclick="openTeamScheduleModal('create', '${today}')">
                    <i class="fa-solid fa-plus"></i> Thêm lịch
                </button>
            </div>

            <div class="ts-controls">
                <div class="ts-date-nav">
                    <button class="cl-nav-btn" onclick="navigateTeamScheduleWeek(-1)" title="Tuần trước">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                    <span class="ts-week-label">${tsGetWeekLabel(teamScheduleSelectedDate)}</span>
                    <button class="cl-nav-btn" onclick="navigateTeamScheduleWeek(1)" title="Tuần sau">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <button class="cl-today-btn" onclick="goTeamScheduleToday()">Tuần này</button>
                </div>
                <div class="ts-permission-note">
                    <i class="fa-solid fa-lock"></i>
                    ${canManageTeamSchedule() ? 'Admin, trợ lý và trưởng nhóm có thể chỉnh toàn bộ lịch.' : 'Bạn chỉ thêm, sửa, xóa được lịch của chính mình.'}
                </div>
            </div>

            ${renderTeamScheduleWeek(dates)}

            <div class="ts-modal-overlay" id="ts-modal-overlay" onclick="closeTeamScheduleModal()"></div>
            <div class="ts-modal" id="ts-modal">
                <div class="ts-modal-header">
                    <h3 id="ts-modal-title">Thêm lịch</h3>
                    <button class="cl-modal-close" onclick="closeTeamScheduleModal()">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="ts-modal-body" id="ts-modal-body"></div>
            </div>
        </div>
    `;
}

function renderTeamScheduleStats(dates) {
    const events = teamScheduleEvents.filter(item => dates.includes(item.date));
    const activeStaff = new Set(events.map(item => item.ownerEmail)).size;
    const typeTotals = events.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
    }, {});

    return `
        <div class="ts-stats-grid">
            <div class="ts-stat-card">
                <div class="ts-stat-icon ts-total"><i class="fa-solid fa-calendar-check"></i></div>
                <div>
                    <div class="ts-stat-value">${events.length}</div>
                    <div class="ts-stat-label">Tổng lịch tuần</div>
                </div>
            </div>
            <div class="ts-stat-card">
                <div class="ts-stat-icon ts-map"><i class="fa-solid fa-map"></i></div>
                <div>
                    <div class="ts-stat-value">${typeTotals.map_consulting || 0}</div>
                    <div class="ts-stat-label">Tư vấn bản đồ</div>
                </div>
            </div>
            <div class="ts-stat-card">
                <div class="ts-stat-icon ts-field"><i class="fa-solid fa-car-side"></i></div>
                <div>
                    <div class="ts-stat-value">${typeTotals.field_trip || 0}</div>
                    <div class="ts-stat-label">Đón khách tại nhà</div>
                </div>
            </div>
            <div class="ts-stat-card">
                <div class="ts-stat-icon ts-pickup"><i class="fa-solid fa-location-dot"></i></div>
                <div>
                    <div class="ts-stat-value">${typeTotals.land_pickup || 0}</div>
                    <div class="ts-stat-label">Khách đón tại đất</div>
                </div>
            </div>
            <div class="ts-stat-card">
                <div class="ts-stat-icon ts-staff"><i class="fa-solid fa-users"></i></div>
                <div>
                    <div class="ts-stat-value">${activeStaff}</div>
                    <div class="ts-stat-label">Nhân sự có lịch</div>
                </div>
            </div>
        </div>
    `;
}

function renderTeamScheduleWeek(dates) {
    const events = teamScheduleEvents.filter(item => dates.includes(item.date));
    const activeStaff = new Set(events.map(item => item.ownerEmail)).size;
    const typeTotals = events.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
    }, {});
    const nextEvent = events.find(item => item.date >= tsFormatDateKey(new Date())) || events[0] || null;
    const statusTotals = events.reduce((acc, item) => {
        const status = item.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    return `
        <div class="ts-executive-calendar">
            <aside class="ts-exec-summary">
                <div class="ts-exec-summary-head">
                    <span>Lịch tuần</span>
                    <strong>${tsGetWeekLabel(teamScheduleSelectedDate)}</strong>
                </div>
                <div class="ts-exec-metrics">
                    <div class="ts-exec-metric">
                        <span>Tổng lịch</span>
                        <strong>${events.length}</strong>
                    </div>
                    <div class="ts-exec-metric">
                        <span>Tư vấn bản đồ</span>
                        <strong>${typeTotals.map_consulting || 0}</strong>
                    </div>
                    <div class="ts-exec-metric">
                        <span>Đón khách tại nhà</span>
                        <strong>${typeTotals.field_trip || 0}</strong>
                    </div>
                    <div class="ts-exec-metric">
                        <span>Khách đón tại đất</span>
                        <strong>${typeTotals.land_pickup || 0}</strong>
                    </div>
                    <div class="ts-exec-metric">
                        <span>Nhân sự có lịch</span>
                        <strong>${activeStaff}</strong>
                    </div>
                    <div class="ts-exec-metric ts-exec-metric-status">
                        <span>Mới thêm</span>
                        <strong>${statusTotals.pending || 0}</strong>
                    </div>
                    <div class="ts-exec-metric ts-exec-metric-status">
                        <span>Khách hủy</span>
                        <strong>${statusTotals.canceled || 0}</strong>
                    </div>
                    <div class="ts-exec-metric ts-exec-metric-status">
                        <span>Đã đi</span>
                        <strong>${statusTotals.done || 0}</strong>
                    </div>
                </div>
                <div class="ts-next-box">
                    <span>Lịch gần nhất</span>
                    ${nextEvent ? `
                        <strong>${tsGetDayOfWeek(nextEvent.date)} ${tsFormatDateDisplay(nextEvent.date)} - ${tsEscape(nextEvent.startTime || '--:--')}</strong>
                        <p>${tsEscape(nextEvent.customerName || 'Khách chưa đặt tên')}</p>
                    ` : '<p>Tuần này chưa có lịch.</p>'}
                </div>
            </aside>
            <section class="ts-exec-list-panel">
                <div class="ts-exec-list-head">
                    <div>
                        <h2>Danh sách lịch hẹn</h2>
                        <p>Sắp xếp theo ngày và giờ, dễ đọc hơn bảng dày chữ.</p>
                    </div>
                    <button class="ts-primary-btn ts-primary-btn-sm" onclick="openTeamScheduleModal('create', '${tsFormatDateKey(new Date())}')">
                        <i class="fa-solid fa-plus"></i> Thêm lịch
                    </button>
                </div>
                ${events.length ? `
                    <div class="ts-exec-list">
                        ${events.map(renderTeamScheduleExecutiveRow).join('')}
                    </div>
                ` : renderTeamScheduleEmptyExecutive(dates)}
            </section>
        </div>
    `;
}

function getTeamSchedulePeriod(item) {
    const hour = parseInt(String(item.startTime || '00:00').split(':')[0], 10);
    return hour < 12 ? 'morning' : 'afternoon';
}

function renderTeamScheduleSlot(dateStr, period) {
    const events = teamScheduleEvents.filter(item => item.date === dateStr && getTeamSchedulePeriod(item) === period);
    return `
        <div class="ts-sheet-slot ${events.length ? 'has-events' : ''}" onclick="${events.length ? '' : `openTeamScheduleModal('create', '${dateStr}')`}">
            ${events.length ? events.map(renderTeamScheduleCard).join('') : '<span class="ts-slot-empty">Chưa có lịch</span>'}
        </div>
    `;
}

function renderTeamScheduleMobileDay(dateStr, today) {
    return `
        <section class="ts-mobile-day ${dateStr === today ? 'today' : ''}">
            <div class="ts-mobile-day-head">
                <div>
                    <span>${tsGetDayOfWeek(dateStr)}</span>
                    <strong>${tsFormatDateDisplay(dateStr)}</strong>
                </div>
                <button class="ts-add-day-btn" onclick="openTeamScheduleModal('create', '${dateStr}')" title="Thêm lịch ngày này">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="ts-mobile-period">
                <div class="ts-mobile-period-label">Sáng</div>
                ${renderTeamScheduleSlot(dateStr, 'morning')}
            </div>
            <div class="ts-mobile-period">
                <div class="ts-mobile-period-label">Chiều</div>
                ${renderTeamScheduleSlot(dateStr, 'afternoon')}
            </div>
        </section>
    `;
}

function renderTeamScheduleCard(item) {
    const typeInfo = TEAM_SCHEDULE_TYPES[item.type] || TEAM_SCHEDULE_TYPES.map_consulting;
    const statusInfo = tsGetVisualScheduleStatus(item);
    const canEdit = canEditTeamScheduleEvent(item);
    const safeCustomer = tsEscape(item.customerName || 'Khách chưa đặt tên');
    const staffInfo = teamScheduleStaffList.find(s => s.email === (item.ownerEmail || '').toLowerCase().trim());
    const safeOwner = tsEscape(staffInfo ? staffInfo.name : (item.ownerName || item.ownerEmail || 'Nhân sự'));
    const safeNotes = tsEscape(item.notes || '');

    return `
        <article class="ts-event-card ${typeInfo.className} ${statusInfo.className}">
            <div class="ts-event-top">
                <span class="ts-time"><i class="fa-regular fa-clock"></i> ${tsEscape(item.startTime || '--:--')}</span>
                <span class="ts-type-pill"><i class="fa-solid ${typeInfo.icon}"></i> ${typeInfo.label}</span>
            </div>
            <div class="ts-status-pill"><i class="fa-solid ${statusInfo.icon}"></i> ${statusInfo.label}</div>
            <div class="ts-customer-label">Khách hẹn</div>
            <h3>${safeCustomer}</h3>
            <div class="ts-owner" title="${safeOwner}"><i class="fa-solid fa-user-tie"></i><span>${safeOwner}</span></div>
            ${renderTeamScheduleParticipants(item, 'ts-participants')}
            ${renderTeamScheduleSupporters(item, 'ts-supporters')}
            ${safeNotes ? `<p class="ts-notes">${safeNotes}</p>` : ''}
            ${canEdit ? `
                <div class="ts-card-actions">
                    <button onclick="openTeamScheduleModal('edit', '${tsEscape(item.date)}', '${tsEscape(item.id)}')" title="Sửa lịch">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="danger" onclick="deleteTeamScheduleEvent('${tsEscape(item.id)}')" title="Xóa lịch">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            ` : ''}
        </article>
    `;
}

function renderTeamScheduleExecutiveRow(item) {
    const typeInfo = TEAM_SCHEDULE_TYPES[item.type] || TEAM_SCHEDULE_TYPES.map_consulting;
    const statusInfo = tsGetVisualScheduleStatus(item);
    const canEdit = canEditTeamScheduleEvent(item);
    const safeCustomer = tsEscape(item.customerName || 'Khách chưa đặt tên');
    const staffInfo = teamScheduleStaffList.find(s => s.email === (item.ownerEmail || '').toLowerCase().trim());
    const safeOwner = tsEscape(staffInfo ? staffInfo.name : (item.ownerName || item.ownerEmail || 'Nhân sự'));
    const safeNotes = tsEscape(item.notes || '');

    return `
        <article class="ts-exec-row ${typeInfo.className} ${statusInfo.className}">
            <div class="ts-exec-time">
                <strong>${tsEscape(item.startTime || '--:--')}</strong>
                <span>${tsGetDayOfWeek(item.date)} ${tsFormatDateDisplay(item.date)}</span>
            </div>
            <div class="ts-exec-main">
                <div class="ts-exec-tags">
                    <span class="ts-exec-status">
                        <i class="fa-solid ${statusInfo.icon}"></i>
                        ${statusInfo.label}
                    </span>
                    <span class="ts-exec-type">
                        <i class="fa-solid ${typeInfo.icon}"></i>
                        ${typeInfo.label}
                    </span>
                </div>
                <h3>${safeCustomer}</h3>
                <div class="ts-exec-owner" title="${safeOwner}">
                    <i class="fa-solid fa-user-tie"></i>
                    <span>${safeOwner}</span>
                </div>
                ${renderTeamScheduleParticipants(item, 'ts-exec-participants')}
                ${renderTeamScheduleSupporters(item, 'ts-exec-supporters')}
                ${safeNotes ? `<p class="ts-exec-notes">${safeNotes}</p>` : ''}
            </div>
            <div class="ts-exec-actions">
                ${canEdit ? `
                    <button onclick="openTeamScheduleModal('edit', '${tsEscape(item.date)}', '${tsEscape(item.id)}')" title="Sửa lịch">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="danger" onclick="deleteTeamScheduleEvent('${tsEscape(item.id)}')" title="Xóa lịch">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                ` : '<span class="ts-readonly">Chỉ xem</span>'}
            </div>
        </article>
    `;
}

function renderTeamScheduleEmptyExecutive(dates) {
    return `
        <div class="ts-exec-empty">
            <i class="fa-regular fa-calendar"></i>
            <h3>Tuần này chưa có lịch đi khách</h3>
            <p>Bấm thêm lịch để ghi lịch tư vấn bản đồ, đón khách tại nhà hoặc khách đón tại đất.</p>
            <div class="ts-empty-days">
                ${dates.map(dateStr => `
                    <button onclick="openTeamScheduleModal('create', '${dateStr}')">
                        ${tsGetDayOfWeek(dateStr)} ${tsFormatDateDisplay(dateStr)}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

async function navigateTeamScheduleWeek(direction) {
    teamScheduleSelectedDate.setDate(teamScheduleSelectedDate.getDate() + (direction * 7));
    await refreshTeamSchedule();
}

async function goTeamScheduleToday() {
    teamScheduleSelectedDate = new Date();
    await refreshTeamSchedule();
}

async function refreshTeamSchedule() {
    await loadTeamScheduleEvents(tsGetWeekDates(teamScheduleSelectedDate));
    const container = document.getElementById('app-content');
    if (container) renderTeamScheduleContent(container);
}

function getTeamScheduleEvent(id) {
    return teamScheduleEvents.find(item => item.id === id) || null;
}

function toggleTeamScheduleFollowUp(checkbox) {
    const panel = checkbox?.closest('.ts-follow-up-panel');
    if (panel) panel.classList.toggle('active', checkbox.checked);
}

function openTeamScheduleModal(mode, dateStr, eventId = '') {
    if (!currentUser) return;

    const modal = document.getElementById('ts-modal');
    const overlay = document.getElementById('ts-modal-overlay');
    const title = document.getElementById('ts-modal-title');
    const body = document.getElementById('ts-modal-body');
    if (!modal || !overlay || !title || !body) return;

    const existing = mode === 'edit' ? getTeamScheduleEvent(eventId) : null;
    if (mode === 'edit' && !canEditTeamScheduleEvent(existing)) return;

    const staffOptions = teamScheduleStaffList.map(staff => `
        <option value="${tsEscape(staff.email)}" ${(existing?.ownerEmail || currentUser.email).toLowerCase() === staff.email ? 'selected' : ''}>
            ${tsEscape(staff.name)} (${tsEscape(staff.email)})
        </option>
    `).join('');
    const selectedParticipantEmails = Array.isArray(existing?.participantEmails) && existing.participantEmails.length
        ? existing.participantEmails.map(email => String(email).toLowerCase().trim())
        : [String(existing?.ownerEmail || currentUser.email).toLowerCase().trim()];
    const participantOptions = teamScheduleStaffList.map(staff => `
        <option value="${tsEscape(staff.email)}" ${selectedParticipantEmails.includes(staff.email) ? 'selected' : ''}>
            ${tsEscape(staff.name)} (${tsEscape(staff.email)})
        </option>
    `).join('');
    const selectedSupportEmails = Array.isArray(existing?.supportEmails)
        ? existing.supportEmails.map(email => String(email).toLowerCase().trim())
        : [];
    const supportOptions = teamScheduleStaffList.map(staff => `
        <option value="${tsEscape(staff.email)}" ${selectedSupportEmails.includes(staff.email) ? 'selected' : ''}>
            ${tsEscape(staff.name)} (${tsEscape(staff.email)})
        </option>
    `).join('');

    const selectedType = existing?.type || 'map_consulting';
    const selectedStatus = existing?.status || 'pending';
    const selectedSupportExtra = Array.isArray(existing?.supportExtraNames)
        ? existing.supportExtraNames.join(', ')
        : (Array.isArray(existing?.participantExtraNames)
            ? existing.participantExtraNames.join(', ')
            : (existing?.supportExtra || existing?.participantExtra || ''));
    const selectedDate = existing?.date || dateStr || tsFormatDateKey(new Date());
    const selectedTime = existing?.startTime || '08:30';
    const canCreateFieldTripFollowUp = mode === 'edit' && existing?.type === 'map_consulting';
    const followUpDate = tsAddDaysToDateKey(selectedDate, 1);
    const followUpTime = selectedTime;

    title.innerHTML = mode === 'edit'
        ? '<i class="fa-solid fa-pen-to-square"></i> Sửa lịch đi khách'
        : '<i class="fa-solid fa-plus"></i> Thêm lịch đi khách';

    body.innerHTML = `
        <form id="ts-form" onsubmit="submitTeamScheduleForm(event, '${mode}', '${tsEscape(eventId)}')">
            <div class="ts-form-grid">
                <div class="cl-form-group">
                    <label><i class="fa-solid fa-user"></i> Khách của nhân sự</label>
                    ${canManageTeamSchedule() ? `
                        <select name="ownerEmail" class="cl-input">${staffOptions}</select>
                    ` : `
                        <input type="text" class="cl-input" value="${(() => {
                            const staffInfo = teamScheduleStaffList.find(s => s.email === currentUser.email.toLowerCase());
                            return tsEscape(staffInfo ? staffInfo.name : (currentUser.displayName || currentUser.email));
                        })()}" disabled />
                        <input type="hidden" name="ownerEmail" value="${tsEscape(currentUser.email)}" />
                    `}
                </div>
                <div class="cl-form-group">
                    <label><i class="fa-solid fa-user-group"></i> Tên khách</label>
                    <input type="text" name="customerName" class="cl-input" value="${tsEscape(existing?.customerName || '')}" placeholder="VD: Anh Minh - Bình Dương" required />
                </div>
                <div class="cl-form-group">
                    <label><i class="fa-solid fa-calendar-day"></i> Ngày hẹn</label>
                    <input type="date" name="date" class="cl-input" value="${tsEscape(selectedDate)}" required />
                </div>
                <div class="cl-form-group">
                    <label><i class="fa-regular fa-clock"></i> Thời gian</label>
                    <input type="time" name="startTime" class="cl-input" value="${tsEscape(selectedTime)}" required />
                </div>
                <div class="cl-form-group ts-form-full">
                    <label><i class="fa-solid fa-route"></i> Loại lịch hẹn</label>
                    <select name="type" class="cl-input" required>
                        ${Object.entries(TEAM_SCHEDULE_TYPES).map(([value, item]) => `
                            <option value="${value}" ${selectedType === value ? 'selected' : ''}>${item.label}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="cl-form-group ts-form-full">
                    <label><i class="fa-solid fa-signal"></i> Tình trạng</label>
                    <select name="status" class="cl-input" required>
                        ${Object.entries(TEAM_SCHEDULE_STATUSES).map(([value, item]) => `
                            <option value="${value}" ${selectedStatus === value ? 'selected' : ''}>${item.label}</option>
                        `).join('')}
                    </select>
                </div>
                <div class="cl-form-group ts-form-full">
                    <label><i class="fa-solid fa-people-group"></i> Người đi tư vấn/đi khách</label>
                    <select name="participantEmails" class="cl-input ts-staff-multiselect" multiple size="6">
                        ${participantOptions}
                    </select>
                    <div class="ts-helper-text">Giữ Cmd/Ctrl để chọn nhiều người trong danh sách.</div>
                </div>
                <div class="cl-form-group ts-form-full">
                    <label><i class="fa-solid fa-handshake-angle"></i> Người hỗ trợ trong danh sách</label>
                    <select name="supportEmails" class="cl-input ts-staff-multiselect" multiple size="6">
                        ${supportOptions}
                    </select>
                    <div class="ts-helper-text">Chọn nhiều người hỗ trợ trong danh sách nếu có.</div>
                </div>
                <div class="cl-form-group ts-form-full">
                    <label><i class="fa-solid fa-user-plus"></i> Người hỗ trợ nhập tay</label>
                    <input type="text" name="supportExtra" class="cl-input" value="${tsEscape(selectedSupportExtra)}" placeholder="VD: Khương, Ly" />
                    <div class="ts-helper-text">Có thể điền tay nhiều người hỗ trợ, ngăn cách bằng dấu phẩy.</div>
                </div>
                <div class="cl-form-group ts-form-full">
                    <label><i class="fa-solid fa-note-sticky"></i> Ghi chú</label>
                    <textarea name="notes" class="cl-textarea" rows="3" placeholder="Điểm hẹn, nhu cầu khách, người phụ trách hỗ trợ...">${tsEscape(existing?.notes || '')}</textarea>
                </div>
                ${canCreateFieldTripFollowUp ? `
                    <div class="cl-form-group ts-form-full">
                        <div class="ts-follow-up-panel">
                            <label class="ts-follow-up-check">
                                <input type="checkbox" name="createFieldTripFollowUp" value="1" onchange="toggleTeamScheduleFollowUp(this)" />
                                <span>
                                    <strong>Tạo thêm lịch đón khách tại nhà</strong>
                                    <small>Lịch tư vấn bản đồ hiện tại sẽ được giữ lại và tự chuyển sang Đã đi.</small>
                                </span>
                            </label>
                            <div class="ts-follow-up-fields">
                                <div class="cl-form-group">
                                    <label><i class="fa-solid fa-calendar-plus"></i> Ngày đón khách tại nhà</label>
                                    <input type="date" name="followUpDate" class="cl-input" value="${tsEscape(followUpDate)}" />
                                </div>
                                <div class="cl-form-group">
                                    <label><i class="fa-regular fa-clock"></i> Giờ đón khách tại nhà</label>
                                    <input type="time" name="followUpTime" class="cl-input" value="${tsEscape(followUpTime)}" />
                                </div>
                            </div>
                            <div class="ts-helper-text">Nếu tư vấn xong mà khách không phù hợp, chỉ chọn Tình trạng = Đã đi và không tick mục này.</div>
                        </div>
                    </div>
                ` : ''}
            </div>
            <div class="cl-form-actions">
                <button type="button" class="cl-btn cl-btn-cancel" onclick="closeTeamScheduleModal()">Hủy</button>
                <button type="submit" class="cl-btn cl-btn-save">
                    <i class="fa-solid fa-floppy-disk"></i> Lưu lịch
                </button>
            </div>
        </form>
    `;

    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeTeamScheduleModal() {
    const modal = document.getElementById('ts-modal');
    const overlay = document.getElementById('ts-modal-overlay');
    if (modal) modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

async function submitTeamScheduleForm(event, mode, eventId) {
    event.preventDefault();
    if (!currentUser) return;

    const form = event.target;
    const formData = new FormData(form);
    const ownerEmail = String(formData.get('ownerEmail') || currentUser.email).toLowerCase();
    const staff = teamScheduleStaffList.find(item => item.email === ownerEmail);
    const ownerName = staff ? staff.name : ownerEmail.split('@')[0];
    const customerName = String(formData.get('customerName') || '').trim();
    const participantEmails = tsUniqueValues(
        formData.getAll('participantEmails')
            .map(email => String(email || '').toLowerCase().trim())
            .filter(Boolean)
    );
    const participantNames = participantEmails.map(tsGetStaffName).filter(Boolean);
    const participantLabels = tsUniqueValues(participantNames);
    const supportEmails = tsUniqueValues(
        formData.getAll('supportEmails')
            .map(email => String(email || '').toLowerCase().trim())
            .filter(Boolean)
    );
    const supportNames = supportEmails.map(tsGetStaffName).filter(Boolean);
    const supportExtraNames = tsNormalizeParticipantNames([formData.get('supportExtra')]);
    const supportLabels = tsUniqueValues([...supportNames, ...supportExtraNames]);

    if (!customerName) {
        alert('Vui lòng nhập tên khách.');
        return;
    }

    if (!canManageTeamSchedule() && ownerEmail !== currentUser.email.toLowerCase()) {
        alert('Bạn chỉ được thêm lịch của chính mình.');
        return;
    }

    const shouldCreateFieldTripFollowUp = mode === 'edit'
        && eventId
        && formData.get('createFieldTripFollowUp') === '1';
    const followUpDate = String(formData.get('followUpDate') || '').trim();
    const followUpTime = String(formData.get('followUpTime') || '').trim();

    if (shouldCreateFieldTripFollowUp && (!followUpDate || !followUpTime)) {
        alert('Vui lòng chọn ngày và giờ đón khách tại nhà.');
        return;
    }

    const saveBtn = form.querySelector('.cl-btn-save');
    const originalHTML = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';
    saveBtn.disabled = true;

    try {
        const db = getTeamScheduleDB();
        const payload = {
            ownerEmail,
            ownerName,
            customerName,
            date: String(formData.get('date')),
            startTime: String(formData.get('startTime')),
            type: shouldCreateFieldTripFollowUp ? 'map_consulting' : String(formData.get('type')),
            status: shouldCreateFieldTripFollowUp ? 'done' : String(formData.get('status') || 'pending'),
            participantEmails,
            participantNames,
            participantExtra: '',
            participantExtraNames: [],
            participantLabels,
            supportEmails,
            supportNames,
            supportExtra: supportExtraNames.join(', '),
            supportExtraNames,
            supportLabels,
            notes: String(formData.get('notes') || '').trim(),
            updatedBy: currentUser.email,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (mode === 'edit' && eventId) {
            const existing = getTeamScheduleEvent(eventId);
            if (!canEditTeamScheduleEvent(existing)) throw new Error('permission-denied');

            if (shouldCreateFieldTripFollowUp && existing?.type === 'map_consulting') {
                const batch = db.batch();
                const currentRef = db.collection('team_schedule').doc(eventId);
                const followUpRef = db.collection('team_schedule').doc();
                const followUpPayload = {
                    ...payload,
                    date: followUpDate,
                    startTime: followUpTime,
                    type: 'field_trip',
                    status: 'pending',
                    sourceConsultingId: eventId,
                    sourceConsultingDate: payload.date,
                    sourceConsultingTime: payload.startTime,
                    sourceConsultingCustomer: payload.customerName,
                    createdBy: currentUser.email,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };

                batch.set(currentRef, {
                    ...payload,
                    latestFieldTripId: followUpRef.id,
                    latestFieldTripDate: followUpDate,
                    latestFieldTripTime: followUpTime
                }, { merge: true });
                batch.set(followUpRef, followUpPayload);
                await batch.commit();
            } else {
                await db.collection('team_schedule').doc(eventId).set(payload, { merge: true });
            }
        } else {
            await db.collection('team_schedule').add({
                ...payload,
                createdBy: currentUser.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        closeTeamScheduleModal();
        await refreshTeamSchedule();
    } catch (error) {
        console.error('Lỗi lưu lịch đi khách:', error);
        alert('Không thể lưu lịch. Vui lòng thử lại.');
        saveBtn.innerHTML = originalHTML;
        saveBtn.disabled = false;
    }
}

async function deleteTeamScheduleEvent(eventId) {
    const item = getTeamScheduleEvent(eventId);
    if (!canEditTeamScheduleEvent(item)) return;
    if (!confirm('Xóa lịch này?')) return;

    try {
        const db = getTeamScheduleDB();
        await db.collection('team_schedule').doc(eventId).delete();
        await refreshTeamSchedule();
    } catch (error) {
        console.error('Lỗi xóa lịch đi khách:', error);
        alert('Không thể xóa lịch. Vui lòng thử lại.');
    }
}
