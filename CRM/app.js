// Firebase Config
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyB34F9CBJ4NXRIm2WCd1OtBMrT2BDr3R_o",
    authDomain: "team-khuongtrinh.firebaseapp.com",
    projectId: "team-khuongtrinh",
    storageBucket: "team-khuongtrinh.firebasestorage.app",
    messagingSenderId: "478679404729",
    appId: "1:478679404729:web:43bb541eaa6ef99575cb68"
};

// Email admin mặc định
const ADMIN_EMAIL = 'ih.khuongtrinh@gmail.com';

// Initial Mock Data (Dùng để seed nếu Firestore của user trống)
const initialClients = [
    {
        name: "Trần Minh Hoàng",
        phone: "0912345678",
        source: "Quét số",
        status: "loc",
        sales: "Bảo Nam",
        lastUpdate: "12/06/2026",
        nextAppointment: "",
        notes: [
            { author: "Hệ thống", time: "12/06/2026 08:30", content: "Dữ liệu quét từ tin rao bán đất Bến Cát." }
        ]
    },
    {
        name: "Nguyễn Thị Thu Hà",
        phone: "0987654321",
        source: "Đăng tin ảo",
        status: "loc",
        sales: "Bảo Nam",
        lastUpdate: "11/06/2026",
        nextAppointment: "",
        notes: [
            { author: "Hệ thống", time: "11/06/2026 14:15", content: "Khách gọi hỏi tin đăng căn nhà 1.5 tỷ ở Dĩ An." }
        ]
    },
    {
        name: "Lê Văn Thắng",
        phone: "0905556677",
        source: "Facebook Ads",
        status: "quan_tam",
        sales: "Phương Thảo",
        lastUpdate: "12/06/2026",
        nextAppointment: "2026-06-13",
        notes: [
            { author: "Phương Thảo", time: "11/06/2026 10:00", content: "Khách nghe máy vui vẻ, hẹn gửi thêm thông tin pháp lý." },
            { author: "Phương Thảo", time: "12/06/2026 09:45", content: "Khách quan tâm dự án đất nền trục chính. Đã gửi sơ đồ phân lô qua Zalo." }
        ]
    },
    {
        name: "Phạm Thanh Sơn",
        phone: "0934112233",
        source: "Quét số",
        status: "hen_gap",
        sales: "Bảo Nam",
        lastUpdate: "12/06/2026",
        nextAppointment: "2026-06-12", // Today
        notes: [
            { author: "Bảo Nam", time: "11/06/2026 16:30", content: "Đồng ý hẹn sáng thứ 6 đi xem đất thực tế tại dự án." }
        ]
    },
    {
        name: "Vũ Hoài Nam",
        phone: "0971998877",
        source: "Facebook Ads",
        status: "da_xem",
        sales: "Tuấn Anh",
        lastUpdate: "10/06/2026",
        nextAppointment: "",
        notes: [
            { author: "Tuấn Anh", time: "10/06/2026 15:00", content: "Đã đi xem đất lô A12. Khách thích nhưng đang phân vân về hướng Tây. Hứa phản hồi lại sau 3 ngày." }
        ]
    },
    {
        name: "Hoàng Đức Hải",
        phone: "0919223344",
        source: "Đăng tin ảo",
        status: "khong_quan_tam",
        sales: "Phương Thảo",
        lastUpdate: "09/06/2026",
        notes: [
            { author: "Phương Thảo", time: "09/06/2026 11:20", content: "Gọi điện khách báo nhầm số, không có nhu cầu đầu tư BĐS." }
        ]
    }
];

// App State
let clients = [];
let unsubscribeClients = null;

// Auth & Role State
let currentUser = null;
let userRole = null; // 'admin' | 'leader' | 'member' | null
let accessDeniedActive = false;
let currentRole = 'sales'; // Simulation role for admin ('admin' | 'sales')
let currentView = 'customers'; // 'customers' or 'dashboard'
let activeClient = null;
let currentActiveTab = 'loc'; // Active tab state

// DOM Elements
const roleSelect = document.getElementById('role-select');
const searchInput = document.getElementById('search-input');
const currentUserRole = document.getElementById('current-user-role');
const currentUserName = document.getElementById('current-user-name');
const viewMenuItems = document.querySelectorAll('.menu-item');
const viewSections = document.querySelectorAll('.view-section');
const clientsListContainer = document.getElementById('clients-list-container');
const crmTabs = document.querySelectorAll('.crm-tab');

// DOM Elements cho Import Google Sheet Modal
const importSheetModal = document.getElementById('import-sheet-modal');
const btnImportSheet = document.getElementById('btn-import-sheet');
const btnCloseImportModal = document.getElementById('btn-close-import-modal');
const btnCancelImport = document.getElementById('btn-cancel-import');
const importSheetForm = document.getElementById('import-sheet-form');
const importLoading = document.getElementById('import-loading');
const importStatusText = document.getElementById('import-status-text');
const importError = document.getElementById('import-error');
const importSuccess = document.getElementById('import-success');
const btnSubmitImport = document.getElementById('btn-submit-import');

// ---- Init Firebase & Auth ----
function initAuth() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK chưa được load!');
        return;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    const auth = firebase.auth();
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            
            // Xác định role từ whitelist Firestore
            const role = await getUserRole(user.email);
            if (!role) {
                const deniedUser = { displayName: user.displayName, email: user.email, photoURL: user.photoURL };
                accessDeniedActive = true;
                currentUser = null;
                userRole = null;
                if (unsubscribeClients) {
                    unsubscribeClients();
                    unsubscribeClients = null;
                }
                clients = [];
                await auth.signOut();
                showAccessDeniedScreen(deniedUser);
                return;
            }
            
            userRole = role;
            currentRole = (role === 'admin') ? roleSelect.value : 'sales';
            
            // Ẩn/hiện màn hình tương ứng
            hideAllScreens();
            document.querySelector('.app-container').style.display = 'flex';
            
            // Cập nhật giao diện topbar & sidebar
            updateUserInterface();
            
            // Bắt đầu lắng nghe Firestore thời gian thực
            setupClientsListener(user, role);
        } else {
            // Huỷ lắng nghe khi logout
            if (unsubscribeClients) {
                unsubscribeClients();
                unsubscribeClients = null;
            }
            clients = [];
            currentUser = null;
            userRole = null;
            showLoginScreen();
        }
    });
}

// ---- Xác định role của user ----
async function getUserRole(email) {
    email = email.toLowerCase().trim();
    if (email === ADMIN_EMAIL.toLowerCase()) return 'admin';

    try {
        const db = firebase.firestore();
        const doc = await db.collection('whitelist').doc(email).get();
        if (!doc.exists) return null;
        return doc.data().role || 'member';
    } catch (error) {
        console.error('Lỗi kiểm tra role:', error);
        return email === ADMIN_EMAIL.toLowerCase() ? 'admin' : null;
    }
}

// ---- Lắng nghe dữ liệu Firestore thời gian thực ----
function setupClientsListener(user, emailRole) {
    if (unsubscribeClients) {
        unsubscribeClients();
        unsubscribeClients = null;
    }

    const db = firebase.firestore();
    let query = db.collection('clients');

    // Nếu không phải admin thực tế, chỉ lấy của chính mình
    if (emailRole !== 'admin') {
        query = query.where('ownerEmail', '==', user.email.toLowerCase().trim());
    }

    unsubscribeClients = query.onSnapshot(async (snapshot) => {
        let fetchedClients = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            fetchedClients.push({
                id: doc.id,
                ...data
            });
        });

        // Sắp xếp phía client theo updatedAt (mới nhất lên đầu)
        fetchedClients.sort((a, b) => {
            const timeA = a.updatedAt || 0;
            const timeB = b.updatedAt || 0;
            return timeB - timeA;
        });

        clients = fetchedClients;

        // Seed dữ liệu mẫu nếu đây là tài khoản mới và chưa có khách hàng nào
        if (clients.length === 0) {
            console.log("Không tìm thấy khách hàng nào. Khởi tạo dữ liệu mẫu...");
            await seedMockData(user);
            return;
        }

        renderBoard();
    }, (error) => {
        console.error("Lỗi lắng nghe dữ liệu Firestore:", error);
    });
}

// ---- Tự động Seed dữ liệu mẫu cho Sales/Admin mới đăng nhập lần đầu ----
async function seedMockData(user) {
    const db = firebase.firestore();
    const batch = db.batch();
    const userEmail = user.email.toLowerCase().trim();
    const userName = user.displayName || user.email.split('@')[0];

    const mockClients = initialClients.map((c, index) => {
        const notes = c.notes.map(n => ({
            author: n.author === 'Hệ thống' ? 'Hệ thống' : userName,
            time: new Date().toLocaleString('vi-VN'),
            content: n.content
        }));

        return {
            name: c.name,
            phone: c.phone,
            source: c.source,
            status: c.status,
            sales: userName,
            ownerEmail: userEmail,
            ownerName: userName,
            lastUpdate: new Date().toLocaleDateString('vi-VN'),
            nextAppointment: c.nextAppointment,
            updatedAt: Date.now() - (6 - index) * 1000, // Đảm bảo thứ tự khi render
            notes: notes
        };
    });

    try {
        mockClients.forEach(client => {
            const docRef = db.collection('clients').doc();
            batch.set(docRef, client);
        });
        await batch.commit();
        console.log("Đã seed dữ liệu mẫu thành công lên Firestore.");
    } catch (error) {
        console.error("Lỗi seed dữ liệu mẫu:", error);
    }
}

// ---- Đăng nhập bằng Google ----
async function signInWithGoogle() {
    try {
        showLoginLoading(true);
        hideLoginError();

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        
        await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        console.error('Lỗi đăng nhập Google:', error);
        if (error.code === 'auth/popup-closed-by-user') {
            showLoginError('Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.');
        } else if (error.code === 'auth/popup-blocked') {
            showLoginError('Trình duyệt đã chặn popup. Vui lòng cho phép popup rồi thử lại.');
        } else {
            showLoginError('Lỗi đăng nhập: ' + (error.code || error.message));
        }
        showLoginLoading(false);
    }
}

// ---- Đăng xuất ----
async function logout() {
    try {
        accessDeniedActive = false;
        await firebase.auth().signOut();
        currentUser = null;
        userRole = null;
        showLoginScreen();
    } catch (error) {
        console.error('Lỗi đăng xuất:', error);
    }
}

// ---- Screen Management ----
function hideAllScreens() {
    const loginScreen = document.getElementById('login-screen');
    const deniedScreen = document.getElementById('access-denied-screen');
    const appContainer = document.querySelector('.app-container');
    if (loginScreen) { loginScreen.style.display = 'none'; loginScreen.classList.remove('active'); }
    if (deniedScreen) { deniedScreen.style.display = 'none'; deniedScreen.classList.remove('active'); }
    if (appContainer) appContainer.style.display = 'none';
}

function showLoginScreen() {
    if (accessDeniedActive) return;
    hideAllScreens();
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.style.display = 'flex';
        loginScreen.classList.add('active');
    }
    hideLoginError();
    showLoginLoading(false);
}

function showAccessDeniedScreen(user) {
    hideAllScreens();
    const deniedScreen = document.getElementById('access-denied-screen');
    const deniedUserInfo = document.getElementById('denied-user-info');
    
    if (deniedScreen) {
        deniedScreen.style.display = 'flex';
        deniedScreen.classList.add('active');
    }
    
    if (deniedUserInfo && user) {
        const displayName = user.displayName || user.email.split('@')[0];
        const photoURL = user.photoURL;
        deniedUserInfo.innerHTML = `
            <div class="denied-avatar-wrap">
                ${photoURL 
                    ? `<img class="denied-avatar" src="${photoURL}" alt="${displayName}" referrerpolicy="no-referrer" />`
                    : `<i class="fa-solid fa-circle-user denied-avatar-icon"></i>`
                }
            </div>
            <div class="denied-name">${displayName}</div>
            <div class="denied-email">${user.email}</div>
        `;
    }
}

function backToLogin() {
    accessDeniedActive = false;
    showLoginScreen();
}

function showLoginLoading(show) {
    const btnEl = document.getElementById('google-signin-btn');
    const loadingEl = document.getElementById('login-loading');
    if (show) {
        if (btnEl) btnEl.style.display = 'none';
        if (loadingEl) loadingEl.style.display = 'flex';
    } else {
        if (btnEl) btnEl.style.display = 'flex';
        if (loadingEl) loadingEl.style.display = 'none';
    }
}

function showLoginError(message) {
    const errorEl = document.getElementById('login-error');
    if (errorEl) {
        errorEl.innerHTML = message;
        errorEl.style.display = 'block';
    }
    showLoginLoading(false);
}

function hideLoginError() {
    const errorEl = document.getElementById('login-error');
    if (errorEl) errorEl.style.display = 'none';
}

// ---- UI Updates ----
function updateUserInterface() {
    if (!currentUser) return;
    
    const displayName = currentUser.displayName || currentUser.email.split('@')[0];
    const photoURL = currentUser.photoURL;
    
    if (currentUserName) currentUserName.textContent = displayName;
    if (currentUserRole) {
        currentUserRole.textContent = (userRole === 'admin') ? 'Admin' : 'Sales';
    }
    
    const userAvatarContainer = document.querySelector('.user-avatar');
    if (userAvatarContainer) {
        userAvatarContainer.innerHTML = photoURL 
            ? `<img src="${photoURL}" alt="${displayName}" referrerpolicy="no-referrer" />`
            : `<i class="fa-solid fa-circle-user"></i>`;
    }
    
    const userProfileEl = document.querySelector('.user-profile');
    if (userProfileEl) {
        userProfileEl.onclick = () => {
            window.location.href = '/training-hub/ho-so';
        };
        userProfileEl.setAttribute('title', `Xem hồ sơ của tôi (${currentUser.email})`);
    }

    const sidebarFooter = document.querySelector('.sidebar-footer');
    if (sidebarFooter) {
        if (userRole === 'admin') {
            sidebarFooter.style.display = 'block';
        } else {
            sidebarFooter.style.display = 'none';
        }
    }
    
    updateAddCustomerSalesSelect();
}

function updateAddCustomerSalesSelect() {
    const salesSelect = document.getElementById('new-cust-sales');
    if (!salesSelect || !currentUser) return;
    
    const displayName = currentUser.displayName || currentUser.email.split('@')[0];
    
    if (userRole === 'admin' && currentRole === 'admin') {
        salesSelect.disabled = false;
        
        const requiredSales = ["Bảo Nam", "Phương Thảo", "Tuấn Anh"];
        requiredSales.forEach(s => {
            if (!Array.from(salesSelect.options).some(opt => opt.value === s)) {
                const opt = document.createElement('option');
                opt.value = s;
                opt.textContent = s;
                salesSelect.appendChild(opt);
            }
        });
    } else {
        salesSelect.innerHTML = '';
        const opt = document.createElement('option');
        opt.value = displayName;
        opt.textContent = displayName;
        salesSelect.appendChild(opt);
        salesSelect.value = displayName;
        salesSelect.disabled = true;
    }
}

// Setup Role Info (For Admin's simulation)
function updateRoleView() {
    if (userRole === 'admin') {
        currentRole = roleSelect.value;
        currentUserRole.textContent = (currentRole === 'admin') ? 'Admin' : 'Sales';
        updateAddCustomerSalesSelect();
    } else {
        currentRole = 'sales';
        currentUserRole.textContent = 'Sales';
    }
    renderBoard();
}

// Helper to format telephone numbers based on Role
function formatPhone(phone, role) {
    if (role === 'admin') {
        return phone; // Admin nhìn thấy toàn bộ số điện thoại
    }
    if (phone.length >= 7) {
        return phone.slice(0, 3) + '***' + phone.slice(-3);
    }
    return '***';
}

// Render Board & Update Counters
function renderBoard() {
    const counts = { loc: 0, quan_tam: 0, hen_gap: 0, da_xem: 0, khong_quan_tam: 0 };
    const salesName = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : 'Bảo Nam';
    
    clients.forEach(client => {
        const matchesRole = (userRole === 'admin') 
            ? (currentRole === 'admin' || client.sales === salesName)
            : true; // Sales thường thì luôn khớp vì Firestore đã lọc sẵn
            
        if (!matchesRole) return;
        
        if (counts[client.status] !== undefined) {
            counts[client.status]++;
        }
    });
    
    // Update Badges on Tabs
    Object.keys(counts).forEach(status => {
        const badge = document.getElementById(`tab-badge-${status}`);
        const countStat = document.getElementById(`count-${status}`);
        if (badge) badge.textContent = counts[status];
        if (countStat) countStat.textContent = counts[status];
    });

    clientsListContainer.innerHTML = '';
    const searchQuery = searchInput.value.toLowerCase().trim();
    
    const filteredClients = clients.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery) || client.phone.includes(searchQuery);
        const matchesStatus = client.status === currentActiveTab;
        const matchesRole = (userRole === 'admin')
            ? (currentRole === 'admin' || client.sales === salesName)
            : true;
        return matchesSearch && matchesStatus && matchesRole;
    });
    
    if (filteredClients.length === 0) {
        clientsListContainer.innerHTML = `
            <div class="card-note-item" style="text-align: center; padding: 40px; color: var(--text-muted); background-color: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border-color);">
                <i class="fa-solid fa-folder-open" style="font-size: 32px; margin-bottom: 12px; color: var(--accent-color);"></i>
                <p>Không tìm thấy khách hàng nào trong trạng thái [${getStatusLabel(currentActiveTab)}].</p>
            </div>
        `;
        return;
    }
    
    filteredClients.forEach(client => {
        const card = document.createElement('div');
        card.className = 'client-card';
        card.setAttribute('data-id', client.id);
        
        const todayStr = new Date().toISOString().split('T')[0];
        if (client.nextAppointment === todayStr) {
            card.classList.add('appointment-today');
        }
        
        const dispPhone = formatPhone(client.phone, currentRole);
        
        const notesHtml = (client.notes || []).map(n => `
            <div class="card-note-item">
                <div class="card-note-meta-row">
                    <span class="card-note-author">${n.author}</span>
                    <span class="card-note-time">${n.time}</span>
                </div>
                <div class="card-note-text">${n.content}</div>
            </div>
        `).join('');
        
        card.innerHTML = `
            <!-- Cột 1: Thông tin liên hệ -->
            <div class="card-info-col">
                <div class="card-info-header">
                    <h4>${client.name}</h4>
                    <span class="source-tag">${client.source}</span>
                </div>
                <div class="card-info-body">
                    <span class="card-info-phone"><i class="fa-solid fa-phone-flip"></i> ${dispPhone}</span>
                    <span><i class="fa-solid fa-user-shield"></i> Sales: ${client.sales}</span>
                    ${client.nextAppointment ? `<span style="color: var(--color-hen_gap); font-weight: 600;"><i class="fa-solid fa-calendar-check"></i> Hẹn: ${client.nextAppointment}</span>` : ''}
                </div>
                <button class="btn btn-sm btn-outline btn-call" onclick="event.stopPropagation(); triggerCall('${client.id}')">
                    <i class="fa-solid fa-phone"></i> Gọi điện
                </button>
                <div class="card-info-footer">
                    <span class="time-tag">Lần cuối: ${client.lastUpdate}</span>
                </div>
            </div>
            
            <!-- Cột 2: Ghi chú timeline chăm sóc -->
            <div class="card-notes-col">
                <h5>Nhật ký chăm sóc</h5>
                <div class="card-notes-list">
                    ${notesHtml || '<div style="color: var(--text-muted); font-size: 12px; padding: 10px;">Chưa có lịch sử chăm sóc.</div>'}
                </div>
            </div>
            
            <!-- Cột 3: Hành động nhanh -->
            <div class="card-actions-col" onclick="event.stopPropagation();">
                <h5>Hành động nhanh</h5>
                <div class="card-quick-note-form">
                    <input type="text" placeholder="Nhập ghi chú và nhấn Enter..." class="quick-note-input" data-id="${client.id}">
                    <button class="btn-quick-note-save" data-id="${client.id}"><i class="fa-solid fa-paper-plane"></i></button>
                </div>
                <div class="quick-status-selector">
                    <label>Chuyển trạng thái:</label>
                    <select class="card-status-select" data-id="${client.id}">
                        <option value="loc" ${client.status === 'loc' ? 'selected' : ''}>Lọc Nguồn</option>
                        <option value="quan_tam" ${client.status === 'quan_tam' ? 'selected' : ''}>Quan Tâm</option>
                        <option value="hen_gap" ${client.status === 'hen_gap' ? 'selected' : ''}>Hẹn Gặp / Xem Đất</option>
                        <option value="da_xem" ${client.status === 'da_xem' ? 'selected' : ''}>Đã Xem</option>
                        <option value="khong_quan_tam" ${client.status === 'khong_quan_tam' ? 'selected' : ''}>Không Quan Tâm</option>
                    </select>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => openCustomerModal(client.id));
        clientsListContainer.appendChild(card);
    });
    
    // Quick Note Save Listeners
    const quickNoteInputs = document.querySelectorAll('.quick-note-input');
    quickNoteInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const clientId = this.getAttribute('data-id');
                const text = this.value.trim();
                if (text) {
                    saveQuickNote(clientId, text);
                }
            }
        });
    });

    const quickNoteSaveBtns = document.querySelectorAll('.btn-quick-note-save');
    quickNoteSaveBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const clientId = this.getAttribute('data-id');
            const input = document.querySelector(`.quick-note-input[data-id="${clientId}"]`);
            const text = input.value.trim();
            if (text) {
                saveQuickNote(clientId, text);
            }
        });
    });

    // Quick Status Dropdown Change Listeners
    const statusSelects = document.querySelectorAll('.card-status-select');
    statusSelects.forEach(select => {
        select.addEventListener('change', function() {
            const clientId = this.getAttribute('data-id');
            const newStatus = this.value;
            changeClientStatus(clientId, newStatus);
        });
    });
}

function getStatusLabel(status) {
    const labels = {
        loc: "Lọc Nguồn",
        quan_tam: "Quan Tâm",
        hen_gap: "Hẹn Gặp / Xem Đất",
        da_xem: "Đã Xem",
        khong_quan_tam: "Không Quan Tâm"
    };
    return labels[status] || status;
}

// Action Logic - Save Quick Note lên Firestore
async function saveQuickNote(clientId, text) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const noteAuthor = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Hệ thống";
    const newNote = {
        author: noteAuthor,
        time: new Date().toLocaleString('vi-VN'),
        content: text
    };

    const db = firebase.firestore();
    try {
        await db.collection('clients').doc(clientId).update({
            notes: firebase.firestore.FieldValue.arrayUnion(newNote),
            lastUpdate: new Date().toLocaleDateString('vi-VN'),
            updatedAt: Date.now()
        });
    } catch (error) {
        console.error("Lỗi lưu ghi chú nhanh:", error);
        alert("Không thể lưu ghi chú: " + error.message);
    }
}

// Action Logic - Change Client Status lên Firestore
async function changeClientStatus(clientId, newStatus) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const oldStatus = client.status;
    if (oldStatus === newStatus) return;
    
    const noteAuthor = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Hệ thống";
    const newNote = {
        author: noteAuthor,
        time: new Date().toLocaleString('vi-VN'),
        content: `Chuyển trạng thái từ [${getStatusLabel(oldStatus)}] sang [${getStatusLabel(newStatus)}].`
    };

    const db = firebase.firestore();
    try {
        await db.collection('clients').doc(clientId).update({
            status: newStatus,
            notes: firebase.firestore.FieldValue.arrayUnion(newNote),
            lastUpdate: new Date().toLocaleDateString('vi-VN'),
            updatedAt: Date.now()
        });
    } catch (error) {
        console.error("Lỗi đổi trạng thái:", error);
        alert("Không thể đổi trạng thái: " + error.message);
    }
}

// Simulation Call action
function triggerCall(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    alert(`Đang gọi điện tới khách hàng: ${client.name} (${client.phone})...\n(Mô phỏng tích hợp tổng đài gọi VoIP tự động).`);
    
    const input = document.querySelector(`.quick-note-input[data-id="${clientId}"]`);
    if (input) {
        input.value = `[Gọi điện lúc ${new Date().toLocaleTimeString('vi-VN')}] `;
        input.focus();
    }
}

// Modal Operations
const customerModal = document.getElementById('customer-modal');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnSaveNote = document.getElementById('btn-save-note');
const noteInput = document.getElementById('note-input');
const nextAppointmentInput = document.getElementById('cust-next-appointment');

function openCustomerModal(id) {
    const client = clients.find(c => c.id === id);
    if (!client) return;
    activeClient = client;
    
    document.getElementById('cust-name').textContent = client.name;
    document.getElementById('cust-source').innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> Nguồn: ${client.source}`;
    document.getElementById('cust-phone').textContent = formatPhone(client.phone, currentRole);
    document.getElementById('cust-sales').textContent = client.sales;
    document.getElementById('cust-last-update').textContent = client.lastUpdate;
    nextAppointmentInput.value = client.nextAppointment || '';
    
    const statusBtns = document.querySelectorAll('.status-btn');
    statusBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-status') === client.status) {
            btn.classList.add('active');
        }
    });
    
    renderTimeline();
    customerModal.classList.add('active');
}

function closeCustomerModal() {
    customerModal.classList.remove('active');
    noteInput.value = '';
    activeClient = null;
    renderBoard();
}

btnCloseModal.addEventListener('click', closeCustomerModal);

window.addEventListener('click', (e) => {
    if (e.target === customerModal) {
        closeCustomerModal();
    }
});

function renderTimeline() {
    const timeline = document.getElementById('notes-timeline');
    timeline.innerHTML = '';
    
    if (!activeClient || !activeClient.notes || activeClient.notes.length === 0) {
        timeline.innerHTML = '<p class="subtitle">Chưa có ghi chú lịch sử chăm sóc.</p>';
        return;
    }
    
    [...activeClient.notes].reverse().forEach(note => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-header">
                <span class="note-author">${note.author}</span>
                <span class="note-time">${note.time}</span>
            </div>
            <div class="timeline-body">
                ${note.content}
            </div>
        `;
        timeline.appendChild(item);
    });
}

// Save detailed note từ Modal lên Firestore
btnSaveNote.addEventListener('click', async () => {
    const text = noteInput.value.trim();
    if (!text || !activeClient) return;
    
    const noteAuthor = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Hệ thống";
    const newNote = {
        author: noteAuthor,
        time: new Date().toLocaleString('vi-VN'),
        content: text
    };

    const db = firebase.firestore();
    try {
        btnSaveNote.disabled = true;
        await db.collection('clients').doc(activeClient.id).update({
            notes: firebase.firestore.FieldValue.arrayUnion(newNote),
            lastUpdate: new Date().toLocaleDateString('vi-VN'),
            updatedAt: Date.now()
        });
        
        activeClient.notes.push(newNote);
        activeClient.lastUpdate = new Date().toLocaleDateString('vi-VN');
        noteInput.value = '';
        renderTimeline();
    } catch (error) {
        console.error("Lỗi lưu ghi chú:", error);
        alert("Không thể lưu ghi chú: " + error.message);
    } finally {
        btnSaveNote.disabled = false;
    }
});

// Modal status button click handlers
const statusBtns = document.querySelectorAll('.status-btn');
statusBtns.forEach(btn => {
    btn.addEventListener('click', async function() {
        if (!activeClient) return;
        const newStatus = this.getAttribute('data-status');
        
        if (activeClient.status !== newStatus) {
            const oldStatus = activeClient.status;
            const noteAuthor = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Hệ thống";
            const newNote = {
                author: noteAuthor,
                time: new Date().toLocaleString('vi-VN'),
                content: `Đổi trạng thái chăm sóc từ [${getStatusLabel(oldStatus)}] sang [${getStatusLabel(newStatus)}].`
            };

            const db = firebase.firestore();
            try {
                await db.collection('clients').doc(activeClient.id).update({
                    status: newStatus,
                    notes: firebase.firestore.FieldValue.arrayUnion(newNote),
                    lastUpdate: new Date().toLocaleDateString('vi-VN'),
                    updatedAt: Date.now()
                });
                
                activeClient.status = newStatus;
                activeClient.lastUpdate = new Date().toLocaleDateString('vi-VN');
                activeClient.notes.push(newNote);
                
                statusBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderTimeline();
            } catch (error) {
                console.error("Lỗi đổi trạng thái:", error);
                alert("Không thể đổi trạng thái: " + error.message);
            }
        }
    });
});

// Lịch hẹn thay đổi
nextAppointmentInput.addEventListener('change', async function() {
    if (!activeClient) return;
    const val = this.value;
    const noteAuthor = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : "Hệ thống";
    const newNote = {
        author: noteAuthor,
        time: new Date().toLocaleString('vi-VN'),
        content: `Cập nhật lịch hẹn tương tác tiếp theo: ${val || 'Đã hủy lịch hẹn'}.`
    };

    const db = firebase.firestore();
    try {
        await db.collection('clients').doc(activeClient.id).update({
            nextAppointment: val,
            notes: firebase.firestore.FieldValue.arrayUnion(newNote),
            lastUpdate: new Date().toLocaleDateString('vi-VN'),
            updatedAt: Date.now()
        });
        
        activeClient.nextAppointment = val;
        activeClient.lastUpdate = new Date().toLocaleDateString('vi-VN');
        activeClient.notes.push(newNote);
        renderTimeline();
    } catch (error) {
        console.error("Lỗi cập nhật lịch hẹn:", error);
        alert("Không thể cập nhật lịch hẹn: " + error.message);
    }
});

document.getElementById('btn-call-mock').addEventListener('click', () => {
    if (activeClient) {
        triggerCall(activeClient.id);
        closeCustomerModal();
    }
});

// Thêm khách hàng mới Modal Actions
const addCustomerModal = document.getElementById('add-customer-modal');
const btnAddCustomer = document.getElementById('btn-add-customer');
const btnCloseAddModal = document.getElementById('btn-close-add-modal');
const btnCancelAdd = document.getElementById('btn-cancel-add');
const addCustomerForm = document.getElementById('add-customer-form');

btnAddCustomer.addEventListener('click', () => {
    addCustomerModal.classList.add('active');
});

function closeAddModal() {
    addCustomerModal.classList.remove('active');
    addCustomerForm.reset();
}

btnCloseAddModal.addEventListener('click', closeAddModal);
btnCancelAdd.addEventListener('click', closeAddModal);

addCustomerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('new-cust-name').value.trim();
    const phone = document.getElementById('new-cust-phone').value.trim();
    const source = document.getElementById('new-cust-source').value;
    const sales = document.getElementById('new-cust-sales').value;
    
    if (!name || !phone) return;

    // Lọc trùng số điện thoại trong tập clients hiện có
    const isDuplicate = clients.some(c => c.phone.trim() === phone.trim());
    if (isDuplicate) {
        alert(`Số điện thoại ${phone} đã tồn tại trong hệ thống chăm sóc khách hàng của bạn!`);
        return;
    }

    const ownerEmail = currentUser ? currentUser.email.toLowerCase().trim() : '';
    const ownerName = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : 'Hệ thống';

    const newClient = {
        name: name,
        phone: phone,
        source: source,
        status: "loc", // Bắt đầu ở Lọc Nguồn
        sales: sales,
        ownerEmail: ownerEmail,
        ownerName: ownerName,
        lastUpdate: new Date().toLocaleDateString('vi-VN'),
        nextAppointment: "",
        updatedAt: Date.now(),
        notes: [
            { author: "Hệ thống", time: new Date().toLocaleString('vi-VN'), content: `Khởi tạo thông tin khách hàng từ nguồn [${source}], phân cho [${sales}] chăm sóc.` }
        ]
    };

    const db = firebase.firestore();
    try {
        const submitBtn = addCustomerForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        
        await db.collection('clients').add(newClient);
        closeAddModal();
    } catch (error) {
        console.error("Lỗi thêm khách hàng:", error);
        alert("Lỗi thêm khách hàng: " + error.message);
    } finally {
        const submitBtn = addCustomerForm.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = false;
    }
});

// View Switcher (Khách hàng vs Báo cáo)
viewMenuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        viewMenuItems.forEach(mi => mi.classList.remove('active'));
        this.classList.add('active');
        
        const targetView = this.getAttribute('data-view');
        currentView = targetView;
        
        viewSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === `${targetView}-view`) {
                section.classList.add('active');
            }
        });
    });
});

// Tab Click Switches
crmTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        crmTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        currentActiveTab = this.getAttribute('data-tab');
        renderBoard();
    });
});

// ---- Xử lý Import từ Google Sheet ----
function extractSpreadsheetId(url) {
    const regExp = /\/d\/([a-zA-Z0-9-_]+)/;
    const matches = url.match(regExp);
    return matches ? matches[1] : null;
}

// Bộ parse CSV client-side an toàn
function parseCSV(text) {
    let lines = [];
    let row = [""];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        let c = text[i];
        let next = text[i + 1];

        if (c === '"') {
            if (inQuotes && next === '"') {
                row[row.length - 1] += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (c === ',') {
            if (inQuotes) {
                row[row.length - 1] += c;
            } else {
                row.push("");
            }
        } else if (c === '\r' || c === '\n') {
            if (inQuotes) {
                row[row.length - 1] += c;
            } else {
                if (c === '\r' && next === '\n') {
                    i++;
                }
                lines.push(row);
                row = [""];
            }
        } else {
            row[row.length - 1] += c;
        }
    }
    if (row.length > 1 || row[0] !== "") {
        lines.push(row);
    }
    return lines;
}

// Ánh xạ cột tự động (Fuzzy Matching)
function findColumnIndices(headers) {
    const indices = { name: -1, phone: -1, source: -1, status: -1, notes: -1 };
    
    const keywords = {
        name: ['name', 'tên', 'họ tên', 'ho ten', 'khách hàng', 'khach hang', 'full name', 'fullname'],
        phone: ['phone', 'sđt', 'sdt', 'số điện thoại', 'so dien thoai', 'điện thoại', 'dien thoai', 'tel', 'mobile'],
        source: ['source', 'nguồn', 'nguon', 'nguồn khách', 'nguon khach'],
        status: ['status', 'trạng thái', 'trang thai'],
        notes: ['note', 'ghi chú', 'ghi chu', 'nhật ký', 'nội dung', 'comment', 'description', 'nội dung chăm sóc', 'noi dung']
    };

    headers.forEach((header, index) => {
        const h = header.toLowerCase().trim();
        for (const [key, list] of Object.entries(keywords)) {
            if (indices[key] === -1) {
                const match = list.some(k => h === k || h.includes(k));
                if (match) {
                    indices[key] = index;
                }
            }
        }
    });

    return indices;
}

// Chuẩn hóa trạng thái từ Sheet
function normalizeStatus(val) {
    if (!val) return 'loc';
    const v = val.toLowerCase().trim();
    if (v.includes('lọc') || v.includes('loc') || v === 'mới' || v === 'moi') return 'loc';
    if (v.includes('quan tâm') || v.includes('quan tam')) return 'quan_tam';
    if (v.includes('hẹn') || v.includes('hen') || v.includes('gặp') || v.includes('gap') || v.includes('xem')) return 'hen_gap';
    if (v.includes('đã xem') || v.includes('da xem') || v.includes('mua') || v.includes('chốt') || v.includes('chot')) return 'da_xem';
    if (v.includes('không') || v.includes('khong') || v.includes('từ chối') || v.includes('tu choi')) return 'khong_quan_tam';
    
    const validKeys = ['loc', 'quan_tam', 'hen_gap', 'da_xem', 'khong_quan_tam'];
    if (validKeys.includes(v)) return v;
    
    return 'loc';
}

// Đăng ký sự kiện mở modal Google Sheet import
btnImportSheet.addEventListener('click', () => {
    importSheetForm.reset();
    importLoading.style.display = 'none';
    importError.style.display = 'none';
    importSuccess.style.display = 'none';
    btnSubmitImport.disabled = false;
    importSheetModal.classList.add('active');
});

// Đóng modal import
function closeImportModal() {
    importSheetModal.classList.remove('active');
}

btnCloseImportModal.addEventListener('click', closeImportModal);
btnCancelImport.addEventListener('click', closeImportModal);

// Submit form import Google Sheet
importSheetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('sheet-url').value.trim();
    if (!url) return;

    importError.style.display = 'none';
    importSuccess.style.display = 'none';
    importLoading.style.display = 'flex';
    importStatusText.textContent = "Đang trích xuất mã bảng tính...";
    btnSubmitImport.disabled = true;

    const spreadsheetId = extractSpreadsheetId(url);
    if (!spreadsheetId) {
        showImportError("Đường dẫn Google Sheet không đúng định dạng. Vui lòng kiểm tra lại.");
        return;
    }

    const exportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
    
    try {
        importStatusText.textContent = "Đang kết nối và tải dữ liệu từ Google Sheet...";
        const response = await fetch(exportUrl);
        if (!response.ok) {
            throw new Error("Không thể truy cập tệp Google Sheet. Vui lòng đảm bảo tệp đã được chia sẻ ở chế độ 'Người có liên kết có quyền xem'!");
        }

        const csvText = await response.text();
        importStatusText.textContent = "Đang phân tích dữ liệu CSV...";
        const rows = parseCSV(csvText);

        if (rows.length < 2) {
            throw new Error("Tệp Google Sheet không chứa dữ liệu hoặc thiếu tiêu đề cột.");
        }

        const headers = rows[0];
        const indices = findColumnIndices(headers);

        if (indices.name === -1) {
            throw new Error("Không tìm thấy cột Họ và Tên (ví dụ: 'Tên', 'Họ tên', 'Name'). Vui lòng cấu hình lại tiêu đề cột.");
        }
        if (indices.phone === -1) {
            throw new Error("Không tìm thấy cột Số điện thoại (ví dụ: 'SĐT', 'Số điện thoại', 'Phone'). Vui lòng cấu hình lại tiêu đề cột.");
        }

        importStatusText.textContent = "Đang xử lý và lọc trùng dữ liệu...";
        const dataRows = rows.slice(1);
        
        const ownerEmail = currentUser ? currentUser.email.toLowerCase().trim() : '';
        const ownerName = currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : 'Hệ thống';
        const defaultSales = ownerName;

        let clientsToImport = [];
        let duplicateCount = 0;
        let localPhones = new Set();

        const existingPhones = new Set(clients.map(c => c.phone.trim()));

        dataRows.forEach(row => {
            if (row.length <= Math.max(indices.name, indices.phone)) return;

            const name = row[indices.name]?.trim();
            const rawPhone = row[indices.phone]?.trim();
            
            if (!name || !rawPhone) return;

            const phone = rawPhone.replace(/[^0-9+]/g, '');
            if (!phone) return;

            if (existingPhones.has(phone) || localPhones.has(phone)) {
                duplicateCount++;
                return;
            }

            localPhones.add(phone);

            const source = indices.source !== -1 && row[indices.source] 
                ? row[indices.source].trim() 
                : "Google Sheet Import";
                
            const rawStatus = indices.status !== -1 && row[indices.status] 
                ? row[indices.status].trim() 
                : "loc";
            const status = normalizeStatus(rawStatus);

            const noteContent = indices.notes !== -1 && row[indices.notes] 
                ? row[indices.notes].trim() 
                : "";

            const notes = [
                {
                    author: "Hệ thống",
                    time: new Date().toLocaleString('vi-VN'),
                    content: `Nhập tự động từ Google Sheet. Nguồn ban đầu: [${source}].`
                }
            ];

            if (noteContent) {
                notes.push({
                    author: ownerName,
                    time: new Date().toLocaleString('vi-VN'),
                    content: `Ghi chú từ Sheet: ${noteContent}`
                });
            }

            clientsToImport.push({
                name: name,
                phone: phone,
                source: source,
                status: status,
                sales: defaultSales,
                ownerEmail: ownerEmail,
                ownerName: ownerName,
                lastUpdate: new Date().toLocaleDateString('vi-VN'),
                nextAppointment: "",
                updatedAt: Date.now(),
                notes: notes
            });
        });

        if (clientsToImport.length === 0) {
            importLoading.style.display = 'none';
            btnSubmitImport.disabled = false;
            importSuccess.style.display = 'block';
            importSuccess.style.background = 'rgba(239, 68, 68, 0.1)';
            importSuccess.style.border = '1px solid rgba(239, 68, 68, 0.25)';
            importSuccess.style.color = '#dc2626';
            importSuccess.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Không có khách hàng mới nào để nhập.<br><span style="font-size:12px; font-weight:normal;">(Phát hiện ${duplicateCount} số điện thoại đã tồn tại trong CRM hoặc bị trùng trong Sheet).</span>`;
            return;
        }

        // Tiến hành ghi Batch Firestore
        importStatusText.textContent = `Đang nạp ${clientsToImport.length} khách hàng lên hệ thống...`;
        
        const db = firebase.firestore();
        const batchLimit = 500;
        let batch = db.batch();
        let currentBatchCount = 0;
        let totalProcessed = 0;

        for (let i = 0; i < clientsToImport.length; i++) {
            const clientData = clientsToImport[i];
            const docRef = db.collection('clients').doc();
            batch.set(docRef, clientData);
            currentBatchCount++;

            if (currentBatchCount === batchLimit || i === clientsToImport.length - 1) {
                importStatusText.textContent = `Đang đồng bộ lô dữ liệu (${totalProcessed + 1} - ${totalProcessed + currentBatchCount})...`;
                await batch.commit();
                totalProcessed += currentBatchCount;
                batch = db.batch();
                currentBatchCount = 0;
            }
        }

        // Thông báo nhập thành công
        importLoading.style.display = 'none';
        importSuccess.style.display = 'block';
        importSuccess.style.background = 'rgba(16, 185, 129, 0.1)';
        importSuccess.style.border = '1px solid rgba(16, 185, 129, 0.25)';
        importSuccess.style.color = '#059669';
        importSuccess.innerHTML = `<i class="fa-solid fa-circle-check"></i> Đã nhập thành công <strong>${totalProcessed}</strong> khách hàng!<br><span style="font-size:12px; font-weight:normal;">(Bỏ qua ${duplicateCount} khách trùng lặp số điện thoại).</span>`;
        
        setTimeout(() => {
            closeImportModal();
        }, 2500);

    } catch (error) {
        console.error("Lỗi import Google Sheet:", error);
        showImportError(error.message);
    }
});

function showImportError(message) {
    importLoading.style.display = 'none';
    btnSubmitImport.disabled = false;
    importError.textContent = message;
    importError.style.display = 'block';
}

// Core Event Listeners
roleSelect.addEventListener('change', updateRoleView);
searchInput.addEventListener('input', renderBoard);

// Initialize App
initAuth();
