// ============================================
// TRAINING HUB - Authentication System
// Firebase Google Sign-In + Email Whitelist
// Roles: admin / leader / member
// ============================================

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

// ---- Auth State ----
let currentUser = null;
let allowedEmails = [];
let userRole = null; // 'admin' | 'leader' | 'member' | null
let accessDeniedActive = false; // Flag ngăn showLoginScreen ghi đè access denied

// ---- Computed helpers ----
function isAdmin() { return userRole === 'admin'; }
function isLeader() { return userRole === 'leader'; }
function canManageEmails() { return userRole === 'admin' || userRole === 'leader'; }

// ---- Init Firebase & Auth ----
function initAuth() {
    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK chưa được load!');
        return;
    }

    if (!FIREBASE_CONFIG.apiKey) {
        console.error('Firebase config chưa được cập nhật!');
        showLoginScreen();
        return;
    }

    if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
    }

    const auth = firebase.auth();

    // Đảm bảo persistence = LOCAL (giữ session sau khi đóng tab)
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            currentUser = user;
            
            // Xác định role
            const role = await getUserRole(user.email);
            if (!role) {
                // Email không nằm trong whitelist
                // Lưu thông tin user trước khi signOut
                const deniedUser = { displayName: user.displayName, email: user.email, photoURL: user.photoURL };
                // SignOut trước để tránh onAuthStateChanged loop
                accessDeniedActive = true;
                currentUser = null;
                userRole = null;
                await auth.signOut();
                // Hiện màn hình chờ cấp phép SAU khi đã signOut
                showAccessDeniedScreen(deniedUser);
                return;
            }
            
            userRole = role;
            hideAllScreens();
            const appLayout = document.querySelector('.app-layout');
            if (appLayout) appLayout.style.display = 'flex';
            updateTopbarUser(user);
            updateAdminNav();

            // Nạp profile của người dùng
            await loadUserProfile();

            // Tự động vẽ lại nút hoàn thành hoặc trang hồ sơ sau khi auth hoàn tất
            if (window.currentPageId) {
                const isRoadmapPage = typeof TRAINING_ROADMAP !== 'undefined' && TRAINING_ROADMAP.some(step => step.modules.some(m => m.id === window.currentPageId));
                if (isRoadmapPage && typeof renderLessonCompletionCard === 'function') {
                    renderLessonCompletionCard(window.currentPageId);
                }
                if (window.currentPageId === 'page-profile' && typeof renderProfilePage === 'function') {
                    renderProfilePage();
                }
            }

            // Nếu người dùng truy cập trang chủ hoặc trang hồ sơ cũ -> vào thẳng trang Hồ Sơ
            const currentPath = window.location.pathname.replace(/^\/+/, '');
            const relativePath = currentPath.replace(/^training-hub\/?/, '').replace(/^\/+/, '');
            if (relativePath === '' || relativePath === 'ho-so') {
                if (window.appRoutes) window.appRoutes.navigate('page-profile', false);
            }
        } else {
            currentUser = null;
            userRole = null;
            showLoginScreen();
        }
    });
}

// ---- Xác định role của user ----
async function getUserRole(email) {
    email = email.toLowerCase().trim();
    
    // Admin hardcoded
    if (email === ADMIN_EMAIL.toLowerCase()) return 'admin';

    try {
        const db = firebase.firestore();
        const doc = await db.collection('whitelist').doc(email).get();
        if (!doc.exists) return null;
        
        const data = doc.data();
        return data.role || 'member'; // Mặc định là member nếu không có field role
    } catch (error) {
        console.error('Lỗi kiểm tra role:', error);
        // Nếu Firestore lỗi, chỉ cho phép admin
        return email === ADMIN_EMAIL.toLowerCase() ? 'admin' : null;
    }
}

// ---- Đăng nhập bằng Google ----
async function signInWithGoogle() {
    try {
        showLoginLoading(true);
        hideLoginError();

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        
        // Dùng popup — auth handler được proxy qua cùng domain (vercel.json rewrite)
        // nên không bị chặn cross-origin cookies
        await firebase.auth().signInWithPopup(provider);
        // onAuthStateChanged sẽ xử lý phần còn lại
    } catch (error) {
        console.error('Lỗi đăng nhập Google:', error);
        
        if (error.code === 'auth/popup-closed-by-user') {
            showLoginError('Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.');
        } else if (error.code === 'auth/popup-blocked') {
            showLoginError('Trình duyệt đã chặn popup. Vui lòng cho phép popup rồi thử lại.');
        } else if (error.code === 'auth/network-request-failed') {
            showLoginError('Lỗi kết nối mạng. Vui lòng kiểm tra internet.');
        } else {
            showLoginError('Lỗi: ' + (error.code || error.message || 'Không xác định') + '. Vui lòng thử lại.');
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

// ============================================
// UI: Screen Management
// ============================================

function hideAllScreens() {
    const loginScreen = document.getElementById('login-screen');
    const deniedScreen = document.getElementById('access-denied-screen');
    const appLayout = document.querySelector('.app-layout');
    if (loginScreen) { loginScreen.classList.remove('active'); loginScreen.style.display = 'none'; }
    if (deniedScreen) { deniedScreen.classList.remove('active'); deniedScreen.style.display = 'none'; }
    if (appLayout) appLayout.style.display = 'none';
}

function showLoginScreen() {
    // Không ghi đè nếu đang hiện màn hình access denied
    if (accessDeniedActive) return;
    
    hideAllScreens();
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.classList.add('active');
        loginScreen.style.display = 'flex';
    }
    hideLoginError();
    showLoginLoading(false);
}

function showAccessDeniedScreen(user) {
    hideAllScreens();
    const deniedScreen = document.getElementById('access-denied-screen');
    const deniedUserInfo = document.getElementById('denied-user-info');
    
    if (deniedScreen) {
        deniedScreen.classList.add('active');
        deniedScreen.style.display = 'flex';
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

// ============================================
// UI: Topbar & Navigation
// ============================================

function updateTopbarUser(user) {
    const userInfoEl = document.getElementById('topbar-user-info');
    if (userInfoEl && user) {
        const displayName = user.displayName || user.email.split('@')[0];
        const photoURL = user.photoURL;
        
        const roleBadge = isAdmin() ? 'Admin' : isLeader() ? 'Trưởng nhóm' : '';
        
        userInfoEl.innerHTML = `
            <div class="user-profile" onclick="window.appRoutes.navigate('page-profile', true)" style="cursor: pointer;" title="Hồ sơ của tôi (${user.email})">
                ${photoURL 
                    ? `<img class="user-avatar" src="${photoURL}" alt="${displayName}" referrerpolicy="no-referrer" />`
                    : `<i class="fa-solid fa-circle-user user-avatar-icon"></i>`
                }
                <span class="user-name">${displayName}</span>
                ${roleBadge ? `<span class="user-role-badge ${isAdmin() ? 'role-admin' : 'role-leader'}">${roleBadge}</span>` : ''}
            </div>
            <button class="btn-logout" onclick="logout()" title="Đăng xuất">
                <i class="fa-solid fa-right-from-bracket"></i>
            </button>
        `;
        userInfoEl.style.display = 'flex';
    }
}

function updateAdminNav() {
    const adminNav = document.getElementById('admin-nav-item');
    if (adminNav) {
        // Admin và Leader đều thấy menu quản lý
        adminNav.style.display = canManageEmails() ? 'flex' : 'none';
    }
}

// ============================================
// Admin/Leader: Load danh sách email
// ============================================

async function loadWhitelistEmails() {
    // Chờ auth hoàn tất nếu userRole chưa set
    if (!userRole && currentUser) {
        // Auth đang xử lý, đợi tối đa 3 giây
        for (let i = 0; i < 30; i++) {
            await new Promise(r => setTimeout(r, 100));
            if (userRole) break;
        }
    }
    
    // Nếu chưa login hoặc chưa có auth, chờ onAuthStateChanged
    if (!userRole && !currentUser) {
        await new Promise(resolve => {
            const checkAuth = setInterval(() => {
                if (userRole || accessDeniedActive) {
                    clearInterval(checkAuth);
                    resolve();
                }
            }, 100);
            // Timeout sau 5 giây
            setTimeout(() => { clearInterval(checkAuth); resolve(); }, 5000);
        });
    }
    
    if (!canManageEmails()) return [];
    
    try {
        const db = firebase.firestore();
        const snapshot = await db.collection('whitelist').orderBy('addedAt', 'desc').get();
        allowedEmails = [];
        snapshot.forEach(doc => {
            allowedEmails.push({
                email: doc.id,
                role: doc.data().role || 'member',
                addedAt: doc.data().addedAt ? doc.data().addedAt.toDate() : new Date(),
                addedBy: doc.data().addedBy || 'N/A',
                leaderEmail: doc.data().leaderEmail || '',
                completedModules: doc.data().completedModules || []
            });
        });
        return allowedEmails;
    } catch (error) {
        console.error('Lỗi load whitelist:', error);
        return [];
    }
}

// ============================================
// Admin/Leader: Thêm email
// ============================================

async function addWhitelistEmail(email, role = 'member', leaderEmail = '') {
    if (!canManageEmails()) {
        alert('Bạn không có quyền thực hiện thao tác này.');
        return false;
    }

    // Leader chỉ được thêm member
    if (isLeader() && role !== 'member') {
        alert('Trưởng nhóm chỉ có thể thêm nhân viên.');
        return false;
    }

    email = email.toLowerCase().trim();
    if (!email || !email.includes('@')) {
        alert('Email không hợp lệ.');
        return false;
    }

    if (email === ADMIN_EMAIL.toLowerCase()) {
        alert('Không thể thêm email admin.');
        return false;
    }

    try {
        const db = firebase.firestore();
        const docData = {
            role: role,
            addedAt: firebase.firestore.FieldValue.serverTimestamp(),
            addedBy: currentUser.email
        };

        // Gán trưởng nhóm cho nhân sự (chỉ áp dụng cho member)
        if (role === 'member') {
            if (isLeader()) {
                docData.leaderEmail = currentUser.email.toLowerCase().trim();
            } else if (isAdmin()) {
                docData.leaderEmail = leaderEmail ? leaderEmail.toLowerCase().trim() : '';
            }
        }

        await db.collection('whitelist').doc(email).set(docData);
        return true;
    } catch (error) {
        console.error('Lỗi thêm email:', error);
        alert('Không thể thêm email. Vui lòng thử lại.');
        return false;
    }
}

// ============================================
// Admin/Leader: Xóa email
// ============================================

async function removeWhitelistEmail(email) {
    if (!canManageEmails()) {
        alert('Bạn không có quyền thực hiện thao tác này.');
        return false;
    }

    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        alert('Không thể xóa email admin!');
        return false;
    }

    // Leader không được xóa leader khác
    if (isLeader()) {
        const targetDoc = allowedEmails.find(e => e.email === email.toLowerCase());
        if (targetDoc && targetDoc.role === 'leader') {
            alert('Trưởng nhóm không thể xóa trưởng nhóm khác.');
            return false;
        }
    }

    if (!confirm(`Xác nhận xóa email: ${email}?`)) return false;

    try {
        const db = firebase.firestore();
        await db.collection('whitelist').doc(email).delete();
        return true;
    } catch (error) {
        console.error('Lỗi xóa email:', error);
        alert('Không thể xóa email. Vui lòng thử lại.');
        return false;
    }
}

// ============================================
// Render trang quản lý email (Admin + Leader)
// ============================================

let currentAdminTab = 'emails';
let currentTreeZoom = 100;

async function renderAdminEmailPage() {
    const container = document.getElementById('app-content');
    if (!container) return;

    const pageTitle = isAdmin() ? 'Quản Lý Truy Cập' : 'Quản Lý Nhân Sự';
    const pageSubtitle = isAdmin() 
        ? 'Thêm hoặc xóa email trưởng nhóm và nhân sự được phép đăng nhập.' 
        : 'Thêm email nhân sự mới để họ có thể đăng nhập vào Training Hub.';

    // Inject CSS premium
    const styleId = 'admin-management-premium-styles';
    if (!document.getElementById(styleId)) {
        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = `
            .admin-tabs {
                display: flex;
                gap: 10px;
                margin-bottom: 25px;
                border-bottom: 1px solid var(--border-glass, rgba(0,0,0,0.08));
                padding-bottom: 10px;
            }
            .admin-tab {
                background: transparent;
                border: none;
                padding: 10px 20px;
                font-size: 1rem;
                font-weight: 600;
                color: var(--text-secondary, #64748b);
                cursor: pointer;
                border-radius: 8px;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .admin-tab:hover {
                background: rgba(59, 130, 246, 0.05);
                color: var(--accent-blue, #3b82f6);
            }
            .admin-tab.active {
                background: rgba(59, 130, 246, 0.1);
                color: var(--accent-blue, #3b82f6);
            }

            .progress-filter-bar {
                background: var(--bg-secondary, rgba(255,255,255,0.6));
                backdrop-filter: blur(10px);
                border: 1px solid var(--border-glass, rgba(0,0,0,0.08));
                padding: 15px;
                border-radius: 12px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            .progress-filter-bar label {
                font-weight: 600;
                color: var(--text-primary, #1e293b);
                font-size: 0.9rem;
            }
            .progress-filter-bar select {
                padding: 8px 16px;
                border-radius: 8px;
                border: 1px solid var(--border-glass, rgba(0,0,0,0.12));
                background: var(--bg-primary, #fff);
                color: var(--text-primary, #1e293b);
                font-weight: 500;
                outline: none;
                cursor: pointer;
            }

            .progress-member-card {
                background: var(--bg-secondary, rgba(255,255,255,0.6));
                backdrop-filter: blur(10px);
                border: 1px solid var(--border-glass, rgba(0,0,0,0.08));
                border-radius: 16px;
                margin-bottom: 15px;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 15px rgba(0,0,0,0.01);
            }
            .progress-member-card:hover {
                box-shadow: 0 8px 25px rgba(0,0,0,0.03);
                border-color: rgba(59, 130, 246, 0.2);
            }
            .progress-member-header {
                padding: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: pointer;
                flex-wrap: wrap;
                gap: 15px;
            }
            .progress-member-main {
                display: flex;
                align-items: center;
                gap: 15px;
                flex: 1;
                min-width: 250px;
            }
            .progress-member-avatar-wrap {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                overflow: hidden;
                background: rgba(59, 130, 246, 0.1);
                display: flex;
                align-items: center;
                justify-content: center;
                border: 2px solid var(--border-glass, #fff);
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            }
            .progress-member-avatar {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .progress-member-placeholder {
                font-size: 2.2rem;
                color: #94a3b8;
            }
            .progress-member-info {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .progress-member-name-row {
                display: flex;
                align-items: center;
                gap: 10px;
                flex-wrap: wrap;
            }
            .progress-member-name {
                font-size: 1.05rem;
                font-weight: 700;
                color: var(--text-primary, #1e293b);
            }
            .progress-member-badge {
                font-size: 0.75rem;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 99px;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .progress-member-email {
                font-size: 0.85rem;
                color: var(--text-secondary, #64748b);
            }
            .progress-member-leader-name {
                font-size: 0.8rem;
                color: #3b82f6;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            .progress-member-leader-name.unassigned {
                color: #f59e0b;
            }

            .progress-member-stats {
                display: flex;
                align-items: center;
                gap: 20px;
                min-width: 250px;
                justify-content: flex-end;
            }
            .progress-bar-wrap {
                width: 120px;
                height: 8px;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 99px;
                overflow: hidden;
                border: 1px solid rgba(0,0,0,0.02);
            }
            .progress-bar-fill {
                height: 100%;
                border-radius: 99px;
                transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .progress-percent-text {
                font-size: 0.9rem;
                font-weight: 700;
                color: var(--text-primary, #1e293b);
                min-width: 100px;
            }
            .progress-accordion-arrow {
                font-size: 1.1rem;
                color: #64748b;
                transition: transform 0.3s ease;
            }
            .progress-member-card.open .progress-accordion-arrow {
                transform: rotate(180deg);
            }

            .progress-member-details {
                padding: 20px;
                background: rgba(255,255,255,0.4);
                border-top: 1px solid var(--border-glass, rgba(0,0,0,0.08));
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 20px;
                animation: slideDown 0.3s ease-out;
            }
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-5px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .details-week {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .details-week h5 {
                font-size: 0.9rem;
                font-weight: 800;
                color: var(--text-primary, #1e293b);
                margin: 0;
                border-bottom: 2px solid rgba(59, 130, 246, 0.15);
                padding-bottom: 6px;
                letter-spacing: 0.5px;
            }
            .details-modules {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .details-module-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 6px 10px;
                border-radius: 8px;
                background: rgba(255,255,255,0.5);
                border: 1px solid rgba(0,0,0,0.03);
                transition: all 0.2s ease;
            }
            .details-module-row:hover {
                background: rgba(255,255,255,0.9);
                border-color: rgba(59, 130, 246, 0.1);
            }
            .details-module-row.completed {
                background: rgba(52, 211, 153, 0.04);
                border-color: rgba(52, 211, 153, 0.15);
            }
            .details-checkbox-label {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                font-size: 0.85rem;
                font-weight: 600;
                color: var(--text-primary, #1e293b);
                user-select: none;
                flex: 1;
            }
            .details-checkbox-label input[type="checkbox"] {
                width: 16px;
                height: 16px;
                border-radius: 4px;
                border: 2px solid #cbd5e1;
                cursor: pointer;
                accent-color: #10b981;
            }
            .details-module-name {
                display: flex;
                align-items: center;
                gap: 6px;
            }
            .details-module-name i {
                width: 14px;
                text-align: center;
            }
            .detail-badge {
                font-size: 0.7rem;
                font-weight: 700;
                padding: 2px 6px;
                border-radius: 4px;
                white-space: nowrap;
            }
            .detail-badge.badge-approved {
                background: rgba(16, 185, 129, 0.12);
                color: #10b981;
                border: 1px solid rgba(16, 185, 129, 0.2);
            }
            .detail-badge.badge-self {
                background: rgba(59, 130, 246, 0.12);
                color: #3b82f6;
                border: 1px solid rgba(59, 130, 246, 0.2);
            }

            /* Toast */
            #admin-toast {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: rgba(30, 41, 59, 0.9);
                backdrop-filter: blur(10px);
                color: #fff;
                padding: 12px 24px;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
                font-size: 0.9rem;
                z-index: 9999;
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            #admin-toast.show {
                transform: translateY(0);
                opacity: 1;
            }
            .admin-leader-select-wrap {
                display: flex;
                flex-direction: column;
                gap: 5px;
                margin-left: 10px;
            }
            .admin-leader-select {
                padding: 8px 12px;
                border-radius: 8px;
                border: 1px solid var(--border-glass, rgba(0,0,0,0.12));
                background: var(--bg-primary, #fff);
                color: var(--text-primary, #1e293b);
                font-weight: 500;
            }

            /* Tree View Styles - Sơ đồ ngang Premium */
            .org-tree-wrapper {
                width: 100%;
                overflow-x: auto;
                padding: 30px 20px;
                background: rgba(255, 255, 255, 0.35);
                border-radius: 24px;
                border: 1px solid var(--border-glass, rgba(0,0,0,0.06));
                box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.01);
                margin-top: 10px;
                scrollbar-width: thin;
                scrollbar-color: rgba(59, 130, 246, 0.35) transparent;
                position: relative; /* để định vị nút zoom nổi */
            }
            .org-tree-wrapper::-webkit-scrollbar {
                height: 8px;
            }
            .org-tree-wrapper::-webkit-scrollbar-track {
                background: transparent;
            }
            .org-tree-wrapper::-webkit-scrollbar-thumb {
                background-color: rgba(59, 130, 246, 0.3);
                border-radius: 99px;
            }
            .org-tree-wrapper::-webkit-scrollbar-thumb:hover {
                background-color: rgba(59, 130, 246, 0.5);
            }

            /* Zoom Controls Styles */
            .tree-zoom-controls {
                position: absolute;
                top: 18px;
                right: 20px;
                background: rgba(255, 255, 255, 0.85);
                backdrop-filter: blur(12px);
                border: 1px solid var(--border-glass, rgba(0,0,0,0.08));
                padding: 6px 12px;
                border-radius: 99px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.06);
                z-index: 10;
                user-select: none;
            }
            .tree-zoom-controls button {
                background: transparent;
                border: none;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-primary);
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 0.85rem;
                padding: 0;
            }
            .tree-zoom-controls button:hover {
                background: rgba(59, 130, 246, 0.1);
                color: #2563eb;
            }
            .tree-zoom-indicator {
                font-size: 0.82rem;
                font-weight: 800;
                color: var(--text-primary);
                min-width: 42px;
                text-align: center;
            }

            .org-tree {
                display: flex;
                justify-content: center;
                min-width: max-content;
                padding: 10px 0;
            }
            .org-tree ul {
                padding-top: 25px;
                position: relative;
                transition: all 0.3s ease;
                display: flex;
                justify-content: center;
                padding-left: 0;
                margin: 0;
                list-style-type: none;
            }
            .org-tree li {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                padding: 25px 12px 0 12px;
                transition: all 0.3s ease;
            }

            /* Đường nối từ trên xuống */
            .org-tree li::before, .org-tree li::after {
                content: '';
                position: absolute;
                top: 0;
                right: 50%;
                border-top: 2px solid rgba(59, 130, 246, 0.4);
                width: 50%;
                height: 25px;
            }
            .org-tree li::after {
                right: auto;
                left: 50%;
                border-left: 2px solid rgba(59, 130, 246, 0.4);
            }

            .org-tree li:only-child::after, .org-tree li:only-child::before {
                display: none;
            }
            .org-tree li:only-child {
                padding-top: 0;
            }
            .org-tree li:first-child::before, .org-tree li:last-child::after {
                border: 0 none;
            }
            .org-tree li:last-child::before {
                border-right: 2px solid rgba(59, 130, 246, 0.4);
                border-radius: 0 8px 0 0;
            }
            .org-tree li:first-child::after {
                border-radius: 8px 0 0 0;
            }

            /* Đường đi xuống của các nhóm con */
            .org-tree ul ul::before {
                content: '';
                position: absolute;
                top: 0;
                left: 50%;
                border-left: 2px solid rgba(59, 130, 246, 0.4);
                width: 0;
                height: 25px;
            }

            .tree-node-wrapper {
                position: relative;
                z-index: 5;
            }

            /* Node Root - Sếp */
            .org-tree .tree-root-box {
                background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
                border: 2px solid #1d4ed8;
                color: #fff;
                border-radius: 18px;
                padding: 16px 24px;
                min-width: 280px;
                max-width: 340px;
                box-shadow: 0 10px 30px rgba(37, 99, 235, 0.22);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 0;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .org-tree .tree-root-box:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 35px rgba(37, 99, 235, 0.32);
            }
            .org-tree .tree-root-avatar {
                width: 52px;
                height: 52px;
                border-radius: 50%;
                border: 3px solid rgba(255,255,255,0.85);
                box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            }
            .org-tree .tree-root-info h3 {
                margin: 0;
                font-size: 1.15rem;
                font-weight: 800;
                color: #fff;
            }
            .org-tree .tree-root-badge {
                background: rgba(255, 255, 255, 0.22);
                border: 1px solid rgba(255, 255, 255, 0.35);
                color: #fff;
                font-size: 0.72rem;
                font-weight: 700;
                padding: 3px 10px;
                border-radius: 99px;
                margin-top: 5px;
                display: inline-block;
            }

            /* Node Trưởng nhóm (Leader F1) */
            .org-tree .tree-leader-box {
                background: var(--bg-secondary, rgba(255,255,255,0.85));
                border: 1.5px solid rgba(147, 51, 234, 0.3);
                border-radius: 18px;
                padding: 14px 18px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                width: 280px;
                text-align: center;
                cursor: pointer;
                box-shadow: 0 6px 20px rgba(0,0,0,0.015);
                backdrop-filter: blur(10px);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .org-tree .tree-leader-box:hover {
                border-color: rgba(147, 51, 234, 0.55);
                box-shadow: 0 8px 25px rgba(147, 51, 234, 0.08);
                transform: translateY(-2px);
            }
            .org-tree .tree-leader-main {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            .org-tree .tree-leader-avatar {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                border: 2px solid rgba(255,255,255,0.95);
                box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            }
            .org-tree .tree-leader-badge {
                background: rgba(147, 51, 234, 0.08);
                color: #9333ea;
                border: 1px solid rgba(147, 51, 234, 0.2);
                font-size: 0.68rem;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 99px;
                display: inline-flex;
                align-items: center;
                gap: 3px;
                justify-content: center;
            }

            .org-tree .tree-root-group.collapsed > ul,
            .org-tree .tree-leader-group.collapsed > ul {
                display: none;
            }
            .org-tree .tree-root-group.collapsed .tree-root-box .progress-accordion-arrow,
            .org-tree .tree-leader-group.collapsed .tree-leader-box .progress-accordion-arrow {
                transform: rotate(-90deg);
            }
            .org-tree .tree-root-box .progress-accordion-arrow,
            .org-tree .tree-leader-group .tree-leader-box .progress-accordion-arrow {
                transition: transform 0.3s ease;
            }

            /* Node Member F2 */
            .org-tree .progress-member-card {
                width: 290px;
                margin: 0;
                text-align: left;
                box-shadow: 0 4px 12px rgba(0,0,0,0.02);
            }
            .org-tree .progress-member-header {
                flex-direction: column;
                align-items: stretch;
                gap: 10px;
                padding: 14px;
            }
            .org-tree .progress-member-main {
                min-width: 0;
                gap: 10px;
            }
            .org-tree .progress-member-avatar-wrap {
                width: 40px;
                height: 40px;
                flex-shrink: 0;
            }
            .org-tree .progress-member-placeholder {
                font-size: 1.8rem;
            }
            .org-tree .progress-member-info {
                gap: 2px;
                min-width: 0;
            }
            .org-tree .progress-member-name {
                font-size: 0.95rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .org-tree .progress-member-badge {
                font-size: 0.7rem;
                padding: 1px 6px;
            }
            .org-tree .progress-member-email {
                font-size: 0.78rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .org-tree .progress-member-stats {
                width: 100%;
                min-width: 0;
                justify-content: space-between;
                gap: 10px;
            }
            .org-tree .progress-bar-wrap {
                width: 80px;
                height: 6px;
                flex-shrink: 0;
            }
            .org-tree .progress-percent-text {
                font-size: 0.8rem;
                min-width: 0;
                text-align: right;
                flex: 1;
            }
            .org-tree .progress-accordion-arrow {
                font-size: 0.95rem;
            }
            .org-tree .progress-member-details {
                grid-template-columns: 1fr;
                max-height: 250px;
                overflow-y: auto;
                padding: 12px;
                gap: 12px;
            }

            /* Nhóm tự do / chưa phân nhóm */
            .org-tree .tree-unassigned-box {
                background: linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%);
                border: 1.5px dashed rgba(245, 158, 11, 0.45);
            }
            .org-tree .tree-unassigned-box:hover {
                border-color: rgba(245, 158, 11, 0.7);
                background: rgba(245, 158, 11, 0.06);
            }
            .org-tree .tree-unassigned-badge {
                background: rgba(245, 158, 11, 0.1);
                color: #f59e0b;
                border: 1px solid rgba(245, 158, 11, 0.25);
            }
            .org-tree .tree-unassigned-group::before,
            .org-tree .tree-unassigned-group::after,
            .org-tree .tree-unassigned-group > ul::before {
                border-color: rgba(245, 158, 11, 0.35) !important;
            }
        `;
        document.head.appendChild(styleEl);
    }

    // Inject Toast Container
    if (!document.getElementById('admin-toast')) {
        const toastEl = document.createElement('div');
        toastEl.id = 'admin-toast';
        document.body.appendChild(toastEl);
    }

    // Render Tabs
    container.innerHTML = `
        <div class="page-title-bar">
            <h1>${pageTitle}</h1>
            <p class="page-subtitle">${pageSubtitle}</p>
        </div>

        <div class="admin-tabs">
            <button class="admin-tab ${currentAdminTab === 'emails' ? 'active' : ''}" onclick="switchAdminTab('emails')">
                <i class="fa-solid fa-user-lock"></i> Cấp Quyền Truy Cập
            </button>
            <button class="admin-tab ${currentAdminTab === 'progress' ? 'active' : ''}" onclick="switchAdminTab('progress')">
                <i class="fa-solid fa-chart-line"></i> Theo Dõi Tiến Độ Học Tập
            </button>
            ${isAdmin() ? `
                <button class="admin-tab ${currentAdminTab === 'access_logs' ? 'active' : ''}" onclick="switchAdminTab('access_logs')">
                    <i class="fa-solid fa-clock-rotate-left"></i> Nhật Ký Truy Cập
                </button>
            ` : ''}
        </div>

        <div id="admin-tab-content">
            <!-- Nội dung tab sẽ được render động -->
        </div>
    `;

    // Render tab ban đầu
    await renderCurrentAdminTabContent();
}

async function switchAdminTab(tabId) {
    currentAdminTab = tabId;
    // active tab button
    document.querySelectorAll('.admin-tab').forEach(btn => {
        if (btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    await renderCurrentAdminTabContent();
}

async function renderCurrentAdminTabContent() {
    const tabContentEl = document.getElementById('admin-tab-content');
    if (!tabContentEl) return;

    tabContentEl.innerHTML = `<div class="admin-loading"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải dữ liệu...</div>`;

    const emails = await loadWhitelistEmails();

    if (currentAdminTab === 'emails') {
        // --- RENDERING TAB 1: CẤP QUYỀN TRUY CẬP (Emails Whitelist) ---
        tabContentEl.innerHTML = `
            <div class="admin-panel">
                <!-- Form thêm email -->
                <div class="admin-add-form">
                    <div class="admin-form-header">
                        <i class="fa-solid fa-user-plus"></i>
                        <h3>Thêm Email Mới</h3>
                    </div>
                    <div class="admin-input-group" style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center;">
                        <input type="email" id="admin-email-input" placeholder="nhanvien@gmail.com" class="admin-input" 
                               style="flex: 1; min-width: 200px;"
                               onkeydown="if(event.key==='Enter') handleAddEmail()" />
                        ${isAdmin() ? `
                            <select id="admin-role-select" class="admin-role-select" style="padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-glass);" onchange="toggleAdminLeaderSelect(this.value)">
                                <option value="member">👤 Nhân viên</option>
                                <option value="leader">⭐ Trưởng nhóm</option>
                            </select>
                            
                            <!-- Dropdown chọn trưởng nhóm (chỉ hiện khi vai trò là member) -->
                            <div id="admin-leader-select-container" class="admin-leader-select-wrap">
                                <select id="admin-leader-select" class="admin-leader-select">
                                    <option value="">-- Chọn Trưởng Nhóm phụ trách --</option>
                                    ${emails.filter(e => e.role === 'leader').map(l => `<option value="${l.email}">${l.email.split('@')[0]} (${l.email})</option>`).join('')}
                                </select>
                            </div>
                        ` : ''}
                        <button onclick="handleAddEmail()" class="admin-btn-add">
                            <i class="fa-solid fa-plus"></i> Thêm
                        </button>
                    </div>
                    ${isAdmin() ? `
                        <div class="admin-role-hint" style="margin-top: 10px;">
                            <i class="fa-solid fa-circle-info"></i>
                            <span><strong>Trưởng nhóm</strong> có thể tự thêm nhân viên mới vào hệ thống.</span>
                        </div>
                    ` : ''}
                </div>

                <div class="admin-list-header">
                    <h3><i class="fa-solid fa-list-check"></i> Danh Sách Email Được Phép</h3>
                    <span class="admin-count" id="admin-email-count">0 email</span>
                </div>

                <div id="admin-email-list" class="admin-email-list"></div>
            </div>
        `;
        renderEmailList(emails);
    } else if (currentAdminTab === 'progress') {
        // --- RENDERING TAB 2: THEO DÕI TIẾN ĐỘ HỌC TẬP (Tree View - Sơ Đồ Cây) ---
        
        // 1. Tải tất cả các profiles để tính toán tiến độ
        const profilesMap = await loadAllProfiles();

        // Lấy danh sách Leader và Member
        const leaders = emails.filter(e => e.role === 'leader');
        const members = emails.filter(e => e.role === 'member');
        const totalModules = TRAINING_ROADMAP.reduce((sum, week) => sum + week.modules.length, 0);

        // Hàm helper render card nhân sự
        const renderMemberCard = (item) => {
            const memberEmail = item.email.toLowerCase().trim();
            const profile = profilesMap[memberEmail] || {};
            const displayName = profile.displayName || memberEmail.split('@')[0];
            const photoURL = profile.photoURL || '';

            // Tính tiến độ gộp
            const pfCompleted = profile.completedModules || [];
            const wlCompleted = item.completedModules || [];
            const mergedCompleted = Array.from(new Set([...pfCompleted, ...wlCompleted]));
            const completedCount = mergedCompleted.length;
            const progress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

            // Xác định level
            let level = { name: 'Tân Binh', icon: '🌱', color: '#38bdf8' };
            if (progress >= 100) level = { name: 'Sát Thủ Đất Nền', icon: '🔥', color: '#f59e0b' };
            else if (progress >= 70) level = { name: 'Chiến Binh', icon: '⚔️', color: '#34d399' };
            else if (progress >= 30) level = { name: 'Tân Binh Tiến Bộ', icon: '🌟', color: '#a78bfa' };

            return `
                <div class="progress-member-card" data-email="${memberEmail}">
                    <div class="progress-member-header" onclick="toggleMemberAccordion('${memberEmail}', this)">
                        <div class="progress-member-main">
                            <div class="progress-member-avatar-wrap">
                                ${photoURL 
                                    ? `<img class="progress-member-avatar" src="${photoURL}" alt="${displayName}" referrerpolicy="no-referrer" />`
                                    : `<i class="fa-solid fa-circle-user progress-member-placeholder"></i>`
                                }
                            </div>
                            <div class="progress-member-info">
                                <div class="progress-member-name-row">
                                    <span class="progress-member-name">${displayName}</span>
                                    <span class="progress-member-badge" style="background: ${level.color}">${level.icon} ${level.name}</span>
                                </div>
                                <div class="progress-member-email">${memberEmail}</div>
                            </div>
                        </div>
                        <div class="progress-member-stats">
                            <div class="progress-bar-wrap">
                                <div class="progress-bar-fill" style="width: ${progress}%; background: ${level.color}"></div>
                            </div>
                            <div class="progress-percent-text">${progress}% (${completedCount}/${totalModules} bài)</div>
                            <div class="progress-accordion-arrow"><i class="fa-solid fa-chevron-down"></i></div>
                        </div>
                    </div>
                    <!-- Accordion detail -->
                    <div class="progress-member-details" id="details-${memberEmail.replace(/[@.]/g, '_')}" style="display: none;">
                        ${renderMemberPersonalInfoHtml(memberEmail, profile)}
                        ${TRAINING_ROADMAP.map(week => `
                            <div class="details-week">
                                <h5>Tuần ${week.week}: ${week.title}</h5>
                                <div class="details-modules">
                                    ${week.modules.map(mod => {
                                        const isCompleted = mergedCompleted.includes(mod.id);
                                        const isWl = wlCompleted.includes(mod.id);
                                        const isPf = pfCompleted.includes(mod.id);
                                        
                                        let badge = '';
                                        if (isWl) {
                                            badge = `<span class="detail-badge badge-approved" title="Đã được Trưởng nhóm/Sếp duyệt hoàn thành"><i class="fa-solid fa-square-check"></i> Đã duyệt</span>`;
                                        } else if (isPf) {
                                            badge = `<span class="detail-badge badge-self" title="Nhân sự tự học và tự tick"><i class="fa-solid fa-user-check"></i> Nhân sự tick</span>`;
                                        }

                                        return `
                                            <div class="details-module-row ${isCompleted ? 'completed' : ''}">
                                                <label class="details-checkbox-label">
                                                    <input type="checkbox" 
                                                           ${isCompleted ? 'checked' : ''} 
                                                           onchange="toggleMemberModuleByLeader('${memberEmail}', '${mod.id}', this.checked)" />
                                                    <span class="details-module-name">
                                                        <i class="fa-solid ${mod.icon}"></i> ${mod.name}
                                                    </span>
                                                </label>
                                                ${badge}
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        };

        if (isAdmin()) {
            // --- SƠ ĐỒ CÂY CỦA PHÓ PHÒNG (ADMIN) ---
            
            // Xây dựng map phân nhóm
            const tree = {};
            leaders.forEach(l => {
                tree[l.email.toLowerCase()] = {
                    leaderInfo: l,
                    members: []
                };
            });

            const unassignedMembers = [];
            members.forEach(m => {
                const lEmail = m.leaderEmail ? m.leaderEmail.toLowerCase().trim() : '';
                if (lEmail && tree[lEmail]) {
                    tree[lEmail].members.push(m);
                } else {
                    unassignedMembers.push(m);
                }
            });

            // Tìm thông tin profile của Phó Phòng hiện tại (Root)
            const rootEmail = currentUser.email.toLowerCase().trim();
            const rootProfile = profilesMap[rootEmail] || {};
            const rootName = rootProfile.displayName || "Sếp Khương Trịnh";
            const rootPhoto = currentUser.photoURL || '';

            tabContentEl.innerHTML = `
                <div class="org-tree-wrapper">
                    <!-- Zoom Controls -->
                    <div class="tree-zoom-controls">
                        <button onclick="adjustTreeZoom('out')" title="Thu nhỏ (Zoom Out)"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
                        <span id="tree-zoom-indicator" class="tree-zoom-indicator">100%</span>
                        <button onclick="adjustTreeZoom('in')" title="Phóng to (Zoom In)"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
                        <button onclick="adjustTreeZoom('reset')" title="Đặt lại về 100%"><i class="fa-solid fa-rotate-left"></i></button>
                    </div>
                    <div class="org-tree">
                        <ul>
                            <li class="tree-root-group collapsed" id="root-group-main">
                                <!-- Nút Gốc (Phó Phòng) -->
                                <div class="tree-node-wrapper">
                                    <div class="tree-root-box" onclick="toggleRootGroup(this)" style="display:flex; justify-content:space-between; align-items:center; gap:20px; width:340px;">
                                        <div style="display:flex; align-items:center; gap:15px;">
                                            ${rootPhoto 
                                                ? `<img class="tree-root-avatar" src="${rootPhoto}" referrerpolicy="no-referrer" />`
                                                : `<i class="fa-solid fa-crown" style="font-size:2.5rem; color:#f59e0b; background: rgba(255,255,255,0.8); width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center;"></i>`
                                            }
                                            <div class="tree-root-info" style="text-align:left;">
                                                <h3>${rootName}</h3>
                                                <span class="tree-root-badge"><i class="fa-solid fa-crown"></i> PHÓ PHÒNG (ADMIN)</span>
                                            </div>
                                        </div>
                                        <div class="progress-accordion-arrow" style="color:#fff; font-size:1.1rem; margin-right:5px;"><i class="fa-solid fa-chevron-down"></i></div>
                                    </div>
                                </div>

                                <!-- Nhánh Trưởng nhóm F1 -->
                                <ul>
                                    ${leaders.map(l => {
                                        const lEmail = l.email.toLowerCase().trim();
                                        const lProfile = profilesMap[lEmail] || {};
                                        const lName = lProfile.displayName || lEmail.split('@')[0];
                                        const lPhoto = lProfile.photoURL || '';
                                        const lMembers = tree[lEmail] ? tree[lEmail].members : [];

                                        return `
                                            <li class="tree-leader-group collapsed" id="leader-group-${lEmail.replace(/[@.]/g, '_')}">
                                                <!-- Nút Trưởng nhóm -->
                                                <div class="tree-node-wrapper">
                                                    <div class="tree-leader-box" onclick="toggleLeaderGroup('${lEmail}', this)">
                                                        <div class="tree-leader-main">
                                                            ${lPhoto 
                                                                ? `<img class="tree-leader-avatar" src="${lPhoto}" referrerpolicy="no-referrer" />`
                                                                : `<i class="fa-solid fa-circle-user" style="font-size:2.2rem; color:#94a3b8;"></i>`
                                                            }
                                                            <div style="display:flex; flex-direction:column; gap:2px;">
                                                                <span style="font-weight:700; color:var(--text-primary); font-size:1.02rem;">
                                                                    ${lName}
                                                                </span>
                                                                <span class="tree-leader-badge"><i class="fa-solid fa-star"></i> TRƯỞNG NHÓM (F1)</span>
                                                                <span style="font-size:0.75rem; color:var(--text-secondary);">${lEmail}</span>
                                                            </div>
                                                        </div>
                                                        <div style="display:flex; align-items:center; gap:8px; margin-top:5px;">
                                                            <span style="font-size:0.75rem; font-weight:700; color:#9333ea; background:rgba(147,51,234,0.08); padding:2px 8px; border-radius:6px;">
                                                                ${lMembers.length} nhân sự
                                                            </span>
                                                            <div class="progress-accordion-arrow"><i class="fa-solid fa-chevron-down"></i></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Nhánh các F2 thuộc Leader này -->
                                                <ul>
                                                    ${lMembers.length === 0 
                                                        ? `<li>
                                                            <div class="tree-node-wrapper" style="color:var(--text-secondary); font-style:italic; font-size:0.85rem; padding: 10px; background: rgba(0,0,0,0.02); border-radius:8px; border: 1px dashed rgba(0,0,0,0.08); width: 280px; text-align: center;">
                                                                (Trống)
                                                            </div>
                                                           </li>`
                                                        : lMembers.map(m => `
                                                            <li>
                                                                <div class="tree-node-wrapper">
                                                                    ${renderMemberCard(m)}
                                                                </div>
                                                            </li>
                                                        `).join('')
                                                    }
                                                </ul>
                                            </li>
                                        `;
                                    }).join('')}

                                    <!-- Nhóm các nhân sự tự do/chưa phân nhóm -->
                                    ${unassignedMembers.length > 0 ? `
                                        <li class="tree-leader-group tree-unassigned-group collapsed" id="leader-group-unassigned">
                                            <!-- Nút chưa phân nhóm -->
                                            <div class="tree-node-wrapper">
                                                <div class="tree-leader-box tree-unassigned-box" onclick="toggleLeaderGroup('unassigned', this)">
                                                    <div class="tree-leader-main">
                                                        <i class="fa-solid fa-circle-question" style="font-size:2rem; color:#f59e0b; background:rgba(245,158,11,0.08); width:38px; height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink: 0;"></i>
                                                        <div style="display:flex; flex-direction:column; gap:2px;">
                                                            <span style="font-weight:700; color:var(--text-primary); font-size:1.02rem;">
                                                                Tự do
                                                            </span>
                                                            <span class="tree-leader-badge tree-unassigned-badge"><i class="fa-solid fa-triangle-exclamation"></i> Chưa phân nhóm</span>
                                                        </div>
                                                    </div>
                                                    <div style="display:flex; align-items:center; gap:8px; margin-top:5px;">
                                                        <span style="font-size:0.75rem; font-weight:700; color:#f59e0b; background:rgba(245,158,11,0.08); padding:2px 8px; border-radius:6px;">
                                                            ${unassignedMembers.length} nhân sự
                                                        </span>
                                                        <div class="progress-accordion-arrow"><i class="fa-solid fa-chevron-down"></i></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul>
                                                ${unassignedMembers.map(m => `
                                                    <li>
                                                        <div class="tree-node-wrapper">
                                                            ${renderMemberCard(m)}
                                                        </div>
                                                    </li>
                                                `).join('')}
                                            </ul>
                                        </li>
                                    ` : ''}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
        } else if (isLeader()) {
            // --- SƠ ĐỒ CÂY CỦA TRƯỞNG NHÓM (LEADER) ---
            const leaderEmailLower = currentUser.email.toLowerCase().trim();
            const groupMembers = members.filter(e => 
                (e.leaderEmail && e.leaderEmail.toLowerCase().trim() === leaderEmailLower) || 
                (e.addedBy && e.addedBy.toLowerCase().trim() === leaderEmailLower)
            );

            const lProfile = profilesMap[leaderEmailLower] || {};
            const lName = lProfile.displayName || currentUser.displayName || leaderEmailLower.split('@')[0];
            const lPhoto = currentUser.photoURL || '';

            tabContentEl.innerHTML = `
                <div class="org-tree-wrapper">
                    <!-- Zoom Controls -->
                    <div class="tree-zoom-controls">
                        <button onclick="adjustTreeZoom('out')" title="Thu nhỏ (Zoom Out)"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
                        <span id="tree-zoom-indicator" class="tree-zoom-indicator">100%</span>
                        <button onclick="adjustTreeZoom('in')" title="Phóng to (Zoom In)"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
                        <button onclick="adjustTreeZoom('reset')" title="Đặt lại về 100%"><i class="fa-solid fa-rotate-left"></i></button>
                    </div>
                    <div class="org-tree">
                        <ul>
                            <li>
                                <!-- Nút Gốc Nhóm (Trưởng Nhóm) -->
                                <div class="tree-node-wrapper">
                                    <div class="tree-root-box" style="background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%); border-color: #6d28d9; color: #fff; box-shadow: 0 10px 25px rgba(124, 58, 237, 0.25);">
                                        ${lPhoto 
                                            ? `<img class="tree-root-avatar" src="${lPhoto}" referrerpolicy="no-referrer" />`
                                            : `<i class="fa-solid fa-star" style="font-size:2.2rem; color:#9333ea; background: rgba(255,255,255,0.8); width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center;"></i>`
                                        }
                                        <div class="tree-root-info">
                                            <h3>${lName}</h3>
                                            <span class="tree-root-badge" style="background: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); color: #fff;"><i class="fa-solid fa-star"></i> TRƯỞNG NHÓM (F1)</span>
                                            <span style="font-size:0.75rem; color:rgba(255, 255, 255, 0.85); display:block; margin-top:5px;"><i class="fa-solid fa-user-group"></i> ${groupMembers.length} nhân sự</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Nhánh các Nhân viên con F2 -->
                                <ul>
                                    ${groupMembers.length === 0 
                                        ? `<li>
                                            <div class="tree-node-wrapper" style="text-align: center; padding: 25px 35px; background: var(--bg-secondary); border-radius: 16px; border: 1px dashed var(--border-glass); width: 280px;">
                                                <i class="fa-solid fa-users-slash" style="font-size: 2rem; color: #94a3b8; margin-bottom: 10px;"></i>
                                                <h3 style="color: var(--text-primary); font-size: 0.95rem; margin: 0 0 5px 0;">Chưa có nhân sự dưới quyền</h3>
                                                <p style="color: var(--text-secondary); margin: 0; font-size: 0.8rem;">Bạn chưa thêm nhân viên nào vào nhóm của mình.</p>
                                            </div>
                                           </li>`
                                        : groupMembers.map(m => `
                                            <li>
                                                <div class="tree-node-wrapper">
                                                    ${renderMemberCard(m)}
                                                </div>
                                            </li>
                                        `).join('')
                                    }
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            `;
        }
    } else if (currentAdminTab === 'access_logs') {
        // --- RENDERING TAB 3: NHẬT KÝ TRUY CẬP (Access Logs) ---
        const profilesMap = await loadAllProfiles();
        
        const logUsers = Object.values(profilesMap).filter(p => p.email).sort((a, b) => {
            const timeA = a.lastLogin || 0;
            const timeB = b.lastLogin || 0;
            return timeB - timeA;
        });

        tabContentEl.innerHTML = `
            <div class="admin-panel">
                <div class="admin-list-header">
                    <h3><i class="fa-solid fa-clock-rotate-left"></i> Nhật Ký Truy Cập Hệ Thống</h3>
                    <span class="admin-count" style="background: rgba(59, 130, 246, 0.1); color: var(--accent-blue); padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 0.85rem;">${logUsers.length} tài khoản</span>
                </div>
                
                <div class="access-logs-container" style="margin-top: 15px;">
                     <p class="access-logs-hint" style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
                         <i class="fa-solid fa-circle-info" style="color: var(--accent-blue); margin-right: 6px;"></i>
                         Danh sách nhân sự đã đăng nhập và học tập trên hệ thống, sắp xếp theo thời gian truy cập gần nhất.
                     </p>
                     
                     <div class="access-logs-table-wrapper" style="width: 100%; overflow-x: auto;">
                         <table class="access-logs-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem;">
                             <thead>
                                 <tr style="border-bottom: 2px solid var(--border-glass, rgba(0,0,0,0.08));">
                                     <th style="padding: 12px 16px; font-weight: 700; color: var(--text-primary);">Nhân Sự</th>
                                     <th style="padding: 12px 16px; font-weight: 700; color: var(--text-primary);">Thời Gian Truy Cập Gần Nhất</th>
                                     <th style="padding: 12px 16px; font-weight: 700; color: var(--text-primary);">Thiết Bị</th>
                                     <th style="padding: 12px 16px; font-weight: 700; color: var(--text-primary); text-align: center;">Hành Động</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 ${logUsers.map(user => {
                                     const email = user.email.toLowerCase().trim();
                                     const displayName = user.displayName || email.split('@')[0];
                                     const avatar = user.photoURL 
                                         ? `<img src="${user.photoURL}" class="access-user-avatar" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--accent-blue);" referrerpolicy="no-referrer" />` 
                                         : `<div class="access-user-avatar-text" style="width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-blue, #3b82f6), #1d4ed8); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; border: 1.5px solid var(--accent-blue);">${displayName.substring(0, 1).toUpperCase()}</div>`;
                                     
                                     let timeStr = '<span style="color: var(--text-muted); font-style: italic;">Chưa từng truy cập</span>';
                                     if (user.lastLogin) {
                                         timeStr = `<strong style="color: var(--text-primary);">${formatRelativeTime(user.lastLogin)}</strong> <span style="font-size: 0.8rem; color: var(--text-muted); display: block; margin-top: 3px;">(${formatFullTime(user.lastLogin)})</span>`;
                                     }
                                     
                                     const device = user.deviceInfo || 'Không xác định';
                                     const hasHistory = user.accessHistory && user.accessHistory.length > 0;
                                     const isMobile = device.includes('Phone') || device.includes('Thoại') || device.includes('Mobile');
                                     
                                     return `
                                         <tr style="border-bottom: 1px solid var(--border-glass, rgba(0,0,0,0.04)); transition: background 0.2s;" onmouseenter="this.style.background='rgba(59,130,246,0.02)'" onmouseleave="this.style.background=''">
                                             <td style="padding: 16px;">
                                                 <div class="access-user-info" style="display: flex; align-items: center; gap: 12px;">
                                                     ${avatar}
                                                     <div class="access-user-details" style="display: flex; flex-direction: column;">
                                                         <span class="access-user-name" style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">${displayName}</span>
                                                         <span class="access-user-email" style="font-size: 0.8rem; color: var(--text-muted);">${email}</span>
                                                     </div>
                                                 </div>
                                             </td>
                                             <td style="padding: 16px; vertical-align: middle;">${timeStr}</td>
                                             <td style="padding: 16px; vertical-align: middle;">
                                                 <span class="access-device-badge ${isMobile ? 'device-mobile' : 'device-desktop'}" 
                                                       style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; background: ${isMobile ? 'rgba(16, 185, 129, 0.08)' : 'rgba(59, 130, 246, 0.08)'}; color: ${isMobile ? '#059669' : '#2563eb'}; border: 1px solid ${isMobile ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)'};">
                                                     <i class="${isMobile ? 'fa-solid fa-mobile-screen-button' : 'fa-solid fa-desktop'}"></i>
                                                     ${device}
                                                 </span>
                                             </td>
                                             <td style="padding: 16px; text-align: center; vertical-align: middle;">
                                                 <button class="access-btn-detail" 
                                                         style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; background: rgba(59, 130, 246, 0.08); color: var(--accent-blue); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all 0.2s;"
                                                         onmouseenter="this.style.background='rgba(59,130,246,0.15)'; this.style.transform='translateY(-1px)';"
                                                         onmouseleave="this.style.background='rgba(59,130,246,0.08)'; this.style.transform='';"
                                                         onclick="showAccessDetails('${email}')" ${hasHistory ? '' : 'disabled style="opacity: 0.5; cursor: not-allowed;"'}>
                                                     <i class="fa-solid fa-eye"></i> Xem lịch sử (${user.accessHistory ? user.accessHistory.length : 0})
                                                 </button>
                                             </td>
                                         </tr>
                                     `;
                                 }).join('')}
                             </tbody>
                         </table>
                     </div>
                 </div>
             </div>
             
             <!-- Modal chi tiết lịch sử truy cập (Timeline) -->
             <div id="access-detail-modal" class="access-detail-modal" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 9999; display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease;">
                 <div class="access-modal-content" style="background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.5); width: 90%; max-width: 520px; max-height: 80vh; border-radius: 24px; padding: 28px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15); display: flex; flex-direction: column; position: relative; transform: translateY(30px); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
                     <span class="access-modal-close" style="position: absolute; top: 20px; right: 24px; font-size: 1.8rem; font-weight: 300; color: var(--text-muted); cursor: pointer; transition: all 0.2s;" onmouseenter="this.style.color='var(--text-primary)'; this.style.transform='scale(1.1)';" onmouseleave="this.style.color='var(--text-muted)'; this.style.transform='';" onclick="closeAccessDetails()">&times;</span>
                     <div class="access-modal-header" style="display: flex; align-items: center; gap: 10px; border-bottom: 1px dashed rgba(0,0,0,0.08); padding-bottom: 15px; margin-bottom: 20px;">
                         <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(59, 130, 246, 0.1); color: var(--accent-blue); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;"><i class="fa-solid fa-clock-rotate-left"></i></div>
                         <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin: 0;">Lịch Sử Chi Tiết Truy Cập</h3>
                     </div>
                     <div id="access-modal-user" class="access-modal-user-info" style="display: flex; align-items: center; gap: 12px; margin-bottom: 24px; padding: 12px 16px; background: rgba(255,255,255,0.5); border: 1px solid var(--border-glass); border-radius: 12px;"></div>
                     <div class="access-timeline-wrapper" style="overflow-y: auto; flex: 1; padding-right: 8px;">
                         <div id="access-timeline" class="access-timeline" style="position: relative; padding-left: 24px; border-left: 2px solid rgba(59, 130, 246, 0.15); margin-left: 10px; display: flex; flex-direction: column; gap: 24px;"></div>
                     </div>
                 </div>
             </div>
         `;
         
         // Bind phím Esc để đóng modal chi tiết
         window.addEventListener('keydown', function(e) {
             const md = document.getElementById('access-detail-modal');
             if (md && md.style.display === 'flex' && e.key === 'Escape') {
                 closeAccessDetails();
             }
         });
     }
}

// Ẩn/hiện chọn trưởng nhóm dựa trên role thêm
function toggleAdminLeaderSelect(role) {
    const container = document.getElementById('admin-leader-select-container');
    if (container) {
        container.style.display = (role === 'member') ? 'flex' : 'none';
    }
}

// Load danh sách profile
async function loadAllProfiles() {
    try {
        const db = firebase.firestore();
        const snapshot = await db.collection('profiles').get();
        const profiles = {};
        snapshot.forEach(doc => {
            profiles[doc.id.toLowerCase().trim()] = doc.data();
        });
        return profiles;
    } catch (error) {
        console.error("Lỗi tải danh sách profiles:", error);
        return {};
    }
}

// Hàm filter danh sách tiến trình theo leader dropdown
function filterProgressList() {
    const filterSelect = document.getElementById('progress-leader-filter');
    if (!filterSelect) return;

    const filterVal = filterSelect.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.progress-member-card');

    cards.forEach(card => {
        const cardLeader = card.getAttribute('data-leader').trim().toLowerCase();
        if (filterVal === 'all') {
            card.style.display = 'block';
        } else if (filterVal === 'unassigned') {
            card.style.display = (!cardLeader || cardLeader === '') ? 'block' : 'none';
        } else {
            card.style.display = (cardLeader === filterVal) ? 'block' : 'none';
        }
    });
}

// Mở/đóng accordion tiến trình chi tiết
function toggleMemberAccordion(memberEmail, headerEl) {
    const card = headerEl.closest('.progress-member-card');
    const emailEscaped = memberEmail.replace(/[@.]/g, '_');
    const detailsPanel = document.getElementById('details-' + emailEscaped);

    if (card && detailsPanel) {
        const isOpen = card.classList.contains('open');
        if (isOpen) {
            card.classList.remove('open');
            detailsPanel.style.display = 'none';
        } else {
            card.classList.add('open');
            detailsPanel.style.display = 'grid';
        }
    }
}

// Mở/đóng danh sách thành viên trực thuộc Trưởng nhóm trong Sơ đồ cây
function toggleLeaderGroup(leaderEmail, headerEl) {
    const group = headerEl.closest('.tree-leader-group');
    if (group) {
        group.classList.toggle('collapsed');
    }
}

// Mở/đóng danh sách Trưởng nhóm trực thuộc Phó Phòng trong Sơ đồ cây
function toggleRootGroup(headerEl) {
    const group = headerEl.closest('.tree-root-group');
    if (group) {
        group.classList.toggle('collapsed');
    }
}

// Phóng to / thu nhỏ Sơ đồ cây ngang
function adjustTreeZoom(action) {
    const tree = document.querySelector('.org-tree');
    if (!tree) return;

    if (action === 'in') {
        currentTreeZoom = Math.min(currentTreeZoom + 10, 150);
    } else if (action === 'out') {
        currentTreeZoom = Math.max(currentTreeZoom - 10, 50);
    } else {
        currentTreeZoom = 100;
    }

    // Áp dụng zoom tối ưu
    if ('zoom' in tree.style) {
        tree.style.zoom = `${currentTreeZoom}%`;
    } else {
        const scale = currentTreeZoom / 100;
        tree.style.transform = `scale(${scale})`;
        tree.style.transformOrigin = 'top center';
    }

    // Cập nhật hiển thị số phần trăm
    const indicator = document.getElementById('tree-zoom-indicator');
    if (indicator) {
        indicator.textContent = `${currentTreeZoom}%`;
    }
}

// Trưởng nhóm tick/hủy tick duyệt module của thành viên
async function toggleMemberModuleByLeader(memberEmail, moduleId, isChecked) {
    try {
        const db = firebase.firestore();
        const docRef = db.collection('whitelist').doc(memberEmail.toLowerCase().trim());
        const doc = await docRef.get();
        if (!doc.exists) {
            alert("Tài khoản nhân sự này không tồn tại trong Whitelist!");
            return;
        }

        let completed = doc.data().completedModules || [];
        if (isChecked) {
            if (!completed.includes(moduleId)) {
                completed.push(moduleId);
            }
        } else {
            completed = completed.filter(id => id !== moduleId);
        }

        await docRef.update({
            completedModules: completed
        });

        // Re-render UI tiến độ tại chỗ cho card member này
        await refreshMemberProgressUI(memberEmail);
        
        showAdminToast(isChecked ? `Đã duyệt hoàn thành bài học!` : `Đã hủy duyệt bài học!`, true);
    } catch (error) {
        console.error("Lỗi cập nhật tiến trình của leader:", error);
        showAdminToast("Lỗi cập nhật tiến độ!", false);
    }
}

// Re-render card tiến trình của 1 member cụ thể (không load lại cả trang)
async function refreshMemberProgressUI(memberEmail) {
    try {
        const db = firebase.firestore();
        const memberEmailLower = memberEmail.toLowerCase().trim();
        
        const wlDoc = await db.collection('whitelist').doc(memberEmailLower).get();
        const pfDoc = await db.collection('profiles').doc(memberEmailLower).get();
        
        if (!wlDoc.exists) return;
        const wlData = wlDoc.data();
        const pfData = pfDoc.exists ? pfDoc.data() : {};
        
        const emailEscaped = memberEmailLower.replace(/[@.]/g, '_');
        const card = document.querySelector(`.progress-member-card[data-email="${memberEmailLower}"]`);
        if (!card) return;

        // Tính toán tiến độ gộp mới
        const pfCompleted = pfData.completedModules || [];
        const wlCompleted = wlData.completedModules || [];
        const mergedCompleted = Array.from(new Set([...pfCompleted, ...wlCompleted]));
        
        const totalModules = TRAINING_ROADMAP.reduce((sum, week) => sum + week.modules.length, 0);
        const completedCount = mergedCompleted.length;
        const progress = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

        let level = { name: 'Tân Binh', icon: '🌱', color: '#38bdf8' };
        if (progress >= 100) level = { name: 'Sát Thủ Đất Nền', icon: '🔥', color: '#f59e0b' };
        else if (progress >= 70) level = { name: 'Chiến Binh', icon: '⚔️', color: '#34d399' };
        else if (progress >= 30) level = { name: 'Tân Binh Tiến Bộ', icon: '🌟', color: '#a78bfa' };

        // Cập nhật stats trên header của card
        const barFill = card.querySelector('.progress-bar-fill');
        const pctText = card.querySelector('.progress-percent-text');
        const badge = card.querySelector('.progress-member-badge');
        const nameEl = card.querySelector('.progress-member-name');
        
        if (barFill) {
            barFill.style.width = `${progress}%`;
            barFill.style.background = level.color;
        }
        if (pctText) {
            pctText.textContent = `${progress}% (${completedCount}/${totalModules} bài)`;
        }
        if (badge) {
            badge.style.background = level.color;
            badge.innerHTML = `${level.icon} ${level.name}`;
        }
        if (nameEl) {
            nameEl.textContent = pfData.displayName || memberEmailLower.split('@')[0];
        }

        // Cập nhật các hàng chi tiết checkbox bên trong
        const detailsPanel = document.getElementById('details-' + emailEscaped);
        if (detailsPanel) {
            detailsPanel.innerHTML = renderMemberPersonalInfoHtml(memberEmailLower, pfData) + TRAINING_ROADMAP.map(week => `
                <div class="details-week">
                    <h5>Tuần ${week.week}: ${week.title}</h5>
                    <div class="details-modules">
                        ${week.modules.map(mod => {
                            const isCompleted = mergedCompleted.includes(mod.id);
                            const isWl = wlCompleted.includes(mod.id);
                            const isPf = pfCompleted.includes(mod.id);
                            
                            let badgeHtml = '';
                            if (isWl) {
                                badgeHtml = `<span class="detail-badge badge-approved" title="Đã được Trưởng nhóm/Sếp duyệt hoàn thành"><i class="fa-solid fa-square-check"></i> Đã duyệt</span>`;
                            } else if (isPf) {
                                badgeHtml = `<span class="detail-badge badge-self" title="Nhân sự tự học và tự tick"><i class="fa-solid fa-user-check"></i> Nhân sự tick</span>`;
                            }

                            return `
                                <div class="details-module-row ${isCompleted ? 'completed' : ''}">
                                    <label class="details-checkbox-label">
                                        <input type="checkbox" 
                                               ${isCompleted ? 'checked' : ''} 
                                               onchange="toggleMemberModuleByLeader('${memberEmailLower}', '${mod.id}', this.checked)" />
                                        <span class="details-module-name">
                                            <i class="fa-solid ${mod.icon}"></i> ${mod.name}
                                        </span>
                                    </label>
                                    ${badgeHtml}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error("Lỗi cập nhật card tiến độ tại chỗ:", error);
    }
}

// Hiện Toast thông báo
function showAdminToast(message, isSuccess = true) {
    const toast = document.getElementById('admin-toast');
    if (!toast) return;

    toast.innerHTML = isSuccess 
        ? `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${message}`
        : `<i class="fa-solid fa-triangle-exclamation" style="color: #f43f5e;"></i> ${message}`;
        
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function renderEmailList(emails) {
    const listEl = document.getElementById('admin-email-list');
    const countEl = document.getElementById('admin-email-count');
    if (!listEl) return;

    // Admin entry luôn ở đầu
    const adminEntry = { email: ADMIN_EMAIL, role: 'admin', addedAt: new Date(), addedBy: 'Hệ thống', isAdminEntry: true };
    
    // Phân loại
    const leaders = emails.filter(e => e.role === 'leader' && e.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase());
    const members = emails.filter(e => e.role !== 'leader' && e.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase());

    const allEmails = [adminEntry, ...leaders, ...members];

    if (countEl) countEl.textContent = `${allEmails.length} email`;

    listEl.innerHTML = allEmails.map(item => {
        const itemRole = item.isAdminEntry ? 'admin' : (item.role || 'member');
        const rowClass = itemRole === 'admin' ? 'admin-row' : itemRole === 'leader' ? 'leader-row' : '';
        
        const icon = itemRole === 'admin' ? 'fa-crown' : itemRole === 'leader' ? 'fa-star' : 'fa-envelope';
        const iconColor = itemRole === 'admin' ? 'icon-admin' : itemRole === 'leader' ? 'icon-leader' : '';
        
        const badge = itemRole === 'admin' ? '<span class="admin-badge">ADMIN</span>' 
                     : itemRole === 'leader' ? '<span class="leader-badge">TRƯỞNG NHÓM</span>' 
                     : '';

        // Dropdown cho phép Admin gắn nhân sự vào Trưởng nhóm trực tiếp
        let leaderDropdown = '';
        if (itemRole === 'member') {
            if (isAdmin()) {
                const leadersList = emails.filter(e => e.role === 'leader');
                leaderDropdown = `
                    <select onchange="changeMemberLeaderByAdmin('${item.email}', this.value)" 
                            style="font-size: 0.75rem; padding: 4px 10px; border-radius: 8px; border: 1px solid var(--border-glass, rgba(0,0,0,0.12)); background: rgba(255,255,255,0.7); color: #3b82f6; font-weight: 600; margin-left: 10px; outline: none; cursor: pointer; backdrop-filter: blur(5px);">
                        <option value="">-- Chưa phân nhóm --</option>
                        ${leadersList.map(l => {
                            const isSelected = item.leaderEmail && item.leaderEmail.toLowerCase().trim() === l.email.toLowerCase().trim() ? 'selected' : '';
                            return `<option value="${l.email}" ${isSelected}>⭐ Nhóm: ${l.email.split('@')[0]}</option>`;
                        }).join('')}
                    </select>
                `;
            } else {
                leaderDropdown = item.leaderEmail 
                    ? `<span style="font-size:0.75rem; background:rgba(59,130,246,0.1); color:#3b82f6; padding:2px 8px; border-radius:4px; margin-left:8px; font-weight:600;"><i class="fa-solid fa-user-group"></i> Nhóm: ${item.leaderEmail.split('@')[0]}</span>`
                    : `<span style="font-size:0.75rem; background:rgba(245,158,11,0.1); color:#f59e0b; padding:2px 8px; border-radius:4px; margin-left:8px; font-weight:600;"><i class="fa-solid fa-triangle-exclamation"></i> Chưa phân nhóm</span>`;
            }
        }

        // Xác định ai được phép xóa
        let canRemove = false;
        if (item.isAdminEntry) {
            canRemove = false; // Không ai xóa được admin
        } else if (isAdmin()) {
            canRemove = true; // Admin xóa được tất cả
        } else if (isLeader() && itemRole === 'member') {
            canRemove = true; // Leader chỉ xóa member
        }

        return `
            <div class="admin-email-row ${rowClass}">
                <div class="admin-email-info">
                    <span class="admin-email-addr">
                        <i class="fa-solid ${icon} ${iconColor}"></i>
                        ${item.email}
                        ${badge}
                        ${leaderDropdown}
                    </span>
                    <span class="admin-email-meta">
                        Thêm bởi: ${item.addedBy || 'N/A'} — ${item.addedAt ? formatDate(item.addedAt) : 'N/A'}
                    </span>
                </div>
                ${canRemove ? `
                    <button onclick="handleRemoveEmail('${item.email}')" class="admin-btn-remove" title="Xóa email">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Admin thay đổi trưởng nhóm trực tiếp của thành viên
async function changeMemberLeaderByAdmin(memberEmail, newLeaderEmail) {
    try {
        const db = firebase.firestore();
        const docRef = db.collection('whitelist').doc(memberEmail.toLowerCase().trim());
        
        await docRef.update({
            leaderEmail: newLeaderEmail ? newLeaderEmail.toLowerCase().trim() : ''
        });

        showAdminToast(`Đã đổi trưởng nhóm thành công!`, true);
        
        // Tải lại và render lại whitelist
        const emails = await loadWhitelistEmails();
        renderEmailList(emails);
    } catch (error) {
        console.error("Lỗi đổi trưởng nhóm:", error);
        showAdminToast("Lỗi thay đổi trưởng nhóm!", false);
    }
}

// ============================================
// Event Handlers
// ============================================

async function handleAddEmail() {
    const input = document.getElementById('admin-email-input');
    const roleSelect = document.getElementById('admin-role-select');
    const leaderSelect = document.getElementById('admin-leader-select');
    if (!input) return;

    const email = input.value.trim();
    if (!email) return;

    const role = (roleSelect && isAdmin()) ? roleSelect.value : 'member';
    const leaderEmail = (leaderSelect && role === 'member') ? leaderSelect.value : '';

    const success = await addWhitelistEmail(email, role, leaderEmail);
    if (success) {
        input.value = '';
        if (roleSelect) {
            roleSelect.value = 'member';
            // Trigger thay đổi để ẩn/hiện dropdown chọn Leader
            toggleAdminLeaderSelect('member');
        }
        const emails = await loadWhitelistEmails();
        renderEmailList(emails);
    }
}

async function handleRemoveEmail(email) {
    const success = await removeWhitelistEmail(email);
    if (success) {
        const emails = await loadWhitelistEmails();
        renderEmailList(emails);
    }
}

// ============================================
// Helpers
// ============================================

function formatDate(date) {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('vi-VN', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// ============================================
// PROFILE SYSTEM
// ============================================

// Lộ trình đào tạo — mỗi module map đến 1 trang sidebar
const TRAINING_ROADMAP = [
    {
        week: 1,
        title: 'THIẾT LẬP & LIÊN KẾT',
        subtitle: 'Thiết lập nhóm hỗ trợ, sơ đồ tuyến trên, Zalo/Telegram',
        icon: 'fa-handshake',
        color: '#38bdf8',
        modules: [
            { id: 'page-tb-loi-noi-dau', name: 'Lời Nói Đầu & Nhập Môn', icon: 'fa-handshake', desc: 'Tổng quan về Team và triết lý làm việc thực chiến' },
            { id: 'page-tb-quy-che', name: 'Quy Chế & Cơ Chế', icon: 'fa-scale-balanced', desc: 'Cơ chế hoa hồng, thăng tiến và quy chế nội bộ' }
        ]
    },
    {
        week: 2,
        title: 'KIẾN THỨC NỀN TẢNG',
        subtitle: 'Lý do tăng giá, Quy hoạch, so sánh kênh đầu tư',
        icon: 'fa-book-open-reader',
        color: '#a78bfa',
        modules: [
            { id: 'page-kien-thuc-nen', name: 'Đào Tạo Kiến Thức Nền', icon: 'fa-book-open-reader', desc: 'Quy hoạch BĐS, lý do tăng giá đất nền KCN' },
            { id: 'page-thi-truong', name: 'Thị Trường Đang Triển Khai', icon: 'fa-map-location-dot', desc: 'Bản đồ, sơ đồ dự án và thị trường mục tiêu đang bán' },
            { id: 'page-chan-dung-khach-hang', name: 'Chân Dung Khách Hàng', icon: 'fa-users-viewfinder', desc: 'Phân loại, nhận diện và đọc vị khách hàng tiềm năng' },
            { id: 'page-bang-hang', name: 'Bảng Hàng Tổng Hợp', icon: 'fa-table-list', desc: 'Chi tiết sản phẩm, vị trí lô đất đang bán' }
        ]
    },
    {
        week: 3,
        title: 'KHẢO SÁT THỰC ĐỊA',
        subtitle: 'Đi xem đất thực địa và nắm quy trình giao dịch',
        icon: 'fa-route',
        color: '#34d399',
        modules: [
            { id: 'page-tb-quy-trinh', name: 'Quy Trình Bán Hàng', icon: 'fa-file-contract', desc: 'Quy trình thực địa và các bước đặt cọc, thanh toán' }
        ]
    },
    {
        week: 4,
        title: 'THƯƠNG HIỆU & KÊNH BÁN',
        subtitle: 'Đăng bài gieo hạt đầu tiên, xây dựng thương hiệu cá nhân',
        icon: 'fa-seedling',
        color: '#f59e0b',
        modules: [
            { id: 'page-bai-dang-dau-tien', name: 'Bài Đăng Đầu Tiên', icon: 'fa-seedling', desc: 'Công thức 5 lớp bài đăng gieo hạt đầu tiên trên MXH' },
            { id: 'page-tb-chon-kenh', name: 'Chọn Kênh Tìm Khách', icon: 'fa-magnifying-glass', desc: 'Chiến lược khai thác mối quan hệ, kênh mất phí và miễn phí' },
            { id: 'page-chien-luoc-fb', name: 'Chiến Lược Thương Hiệu', icon: 'fa-thumbs-up', desc: 'Chuẩn hóa trang cá nhân chuyên nghiệp, hack reach chống bóp' }
        ]
    },
    {
        week: 5,
        title: 'KỸ THUẬT ĐĂNG TIN',
        subtitle: 'Phủ tin online Group, Marketplace, trang cá nhân',
        icon: 'fa-images',
        color: '#ec4899',
        modules: [
            { id: 'page-mau-dang-tin-ao', name: 'Bài Mẫu Đăng Tin Ảo', icon: 'fa-images', desc: 'Tổng hợp hình ảnh thực tế và các bài mẫu thu hút' },
            { id: 'page-tuyet-ky-lai-khach', name: 'Tuyệt Chiêu Lái Khách', icon: 'fa-chess-knight', desc: 'Tuyệt kỹ điều hướng, lái khách quan tâm đến sản phẩm thật' },
            { id: 'page-cam-tay-chi-viec', name: 'Cầm Tay Chỉ Việc', icon: 'fa-hand-holding-hand', desc: 'Thực hành đăng tin, hack tương tác phủ sóng online' }
        ]
    },
    {
        week: 6,
        title: 'KỊCH BẢN CHĂM KHÁCH',
        subtitle: 'Kịch bản gọi điện lọc nhu cầu, gửi thông tin chuyên nghiệp',
        icon: 'fa-headset',
        color: '#6366f1',
        modules: [
            { id: 'page-telesale', name: 'TeleSale & Lọc Khách', icon: 'fa-headset', desc: 'Kịch bản telesale lọc khách, cách lưu tên danh bạ và lưu thông tin' },
            { id: 'page-mau-gui-thong-tin', name: 'Mẫu Gửi Thông Tin', icon: 'fa-paper-plane', desc: 'Các kịch bản nhắn tin và mẫu thông tin gửi dự án' },
            { id: 'page-cac-khoa-hoc', name: 'Các Khóa Học Nâng Cao', icon: 'fa-graduation-cap', desc: 'Đào tạo kỹ năng chuyên sâu BĐS từ Sếp Khương' }
        ]
    },
    {
        week: 7,
        title: 'TƯ VẤN & QUYẾT TOÁN',
        subtitle: 'Quy trình tư vấn bản đồ trực tiếp và chốt deal',
        icon: 'fa-calculator',
        color: '#14b8a6',
        modules: [
            { id: 'page-tinh-hoa-hong', name: 'Tính Hoa Hồng Giao Dịch', icon: 'fa-calculator', desc: 'Cách tính hoa hồng doanh số và thủ tục quyết toán nhận tiền' }
        ]
    }
];

let userProfile = null;

// ---- Load Profile từ Firestore ----
async function loadUserProfile() {
    if (!currentUser) return null;
    const email = currentUser.email.toLowerCase().trim();

    // 1. Đọc cache dự phòng từ localStorage trước
    const cacheKey = 'profile_' + email;
    let cachedProfile = null;
    try {
        const cached = localStorage.getItem(cacheKey);
        if (cached) cachedProfile = JSON.parse(cached);
    } catch (e) {
        console.warn('Lỗi đọc localStorage:', e);
    }

    // 2. Nếu là local mock user (không qua Firebase Auth), dùng luôn dữ liệu local
    const isLocalMock = currentUser.displayName === 'Sếp Khương (Local)';
    if (isLocalMock) {
        if (cachedProfile) {
            userProfile = cachedProfile;
        } else {
            userProfile = {
                displayName: currentUser.displayName || '',
                email: email,
                birthday: '',
                phone: '',
                joinDate: '',
                facebookUrl: '',
                zaloPhone: '',
                bio: '',
                completedModules: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            try {
                localStorage.setItem(cacheKey, JSON.stringify(userProfile));
            } catch (e) {}
        }
        return userProfile;
    }

    // 3. Nếu là user thật (hoặc online), fetch từ Firestore
    try {
        const db = firebase.firestore();
        const doc = await db.collection('profiles').doc(email).get();

        if (doc.exists) {
            userProfile = doc.data();
            // Lưu đè lại cache
            try {
                localStorage.setItem(cacheKey, JSON.stringify(userProfile));
            } catch (e) {}
        } else {
            // Tạo profile mặc định
            userProfile = {
                displayName: currentUser.displayName || '',
                email: email,
                birthday: '',
                phone: '',
                joinDate: '',
                facebookUrl: '',
                zaloPhone: '',
                bio: '',
                completedModules: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            await db.collection('profiles').doc(email).set(userProfile);
            try {
                localStorage.setItem(cacheKey, JSON.stringify(userProfile));
            } catch (e) {}
        }

        // --- ĐỒNG BỘ TIẾN TRÌNH DUYỆT TỪ WHITELIST (Leader/Sếp duyệt) ---
        try {
            const whitelistDoc = await db.collection('whitelist').doc(email).get();
            if (whitelistDoc.exists) {
                const whitelistData = whitelistDoc.data();
                const wlCompleted = whitelistData.completedModules || [];
                const pfCompleted = userProfile.completedModules || [];
                
                // Tìm những bài học có trong whitelist nhưng chưa có trong profile
                const missingInProfile = wlCompleted.filter(m => !pfCompleted.includes(m));
                if (missingInProfile.length > 0) {
                    const merged = Array.from(new Set([...pfCompleted, ...wlCompleted]));
                    userProfile.completedModules = merged;
                    await db.collection('profiles').doc(email).update({
                        completedModules: merged,
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    try {
                        localStorage.setItem(cacheKey, JSON.stringify(userProfile));
                    } catch (e) {}
                    console.log("Đã tự động đồng bộ tiến trình học từ Whitelist sang Profile cho:", email);
                }
            }
        } catch (syncErr) {
            console.error("Lỗi đồng bộ tiến độ whitelist -> profile:", syncErr);
        }

        // --- GHI NHẬN LỊCH SỬ TRUY CẬP (ACCESS LOG) ---
        try {
            const now = new Date();
            const isMobile = window.innerWidth <= 900 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const deviceType = isMobile ? "Điện thoại (Mobile)" : "Máy tính (Desktop)";
            const userAgent = navigator.userAgent;
            
            const newLog = {
                timestamp: now.getTime(),
                device: deviceType,
                userAgent: userAgent
            };
            
            let history = userProfile.accessHistory || [];
            // Giới hạn tần suất ghi log: Bỏ qua nếu cách lượt truy cập trước dưới 30 giây
            const lastLog = history[0];
            const isTooFrequent = lastLog && (now.getTime() - lastLog.timestamp < 30000);
            
            if (!isTooFrequent) {
                history = [newLog, ...history].slice(0, 20);
                userProfile.accessHistory = history;
                userProfile.lastLogin = now.getTime();
                userProfile.deviceInfo = deviceType;
                if (currentUser.photoURL) {
                    userProfile.photoURL = currentUser.photoURL;
                }
                
                await db.collection('profiles').doc(email).update({
                    accessHistory: history,
                    lastLogin: now.getTime(),
                    deviceInfo: deviceType,
                    photoURL: currentUser.photoURL || userProfile.photoURL || '',
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(userProfile));
                } catch (e) {}
                console.log("Đã ghi nhận lịch sử truy cập cho:", email);
            }
        } catch (logErr) {
            console.error("Lỗi ghi nhận lịch sử truy cập:", logErr);
        }

        return userProfile;
    } catch (error) {
        console.error('Lỗi load profile từ Firestore, chuyển sang dùng cache:', error);
        // Fallback sang cache nếu Firestore lỗi
        if (cachedProfile) {
            userProfile = cachedProfile;
        } else {
            userProfile = {
                displayName: currentUser.displayName || '',
                email: currentUser.email,
                completedModules: []
            };
        }
        return userProfile;
    }
}

// ---- Save Profile ----
async function saveUserProfile(data) {
    if (!currentUser) return false;
    const email = currentUser.email.toLowerCase().trim();
    const cacheKey = 'profile_' + email;

    // Cập nhật state trong memory
    if (userProfile) {
        Object.assign(userProfile, data);
    } else {
        userProfile = { email: email, completedModules: [], ...data };
    }

    // 1. Luôn cập nhật localStorage trước để giữ trạng thái local tức thì
    try {
        localStorage.setItem(cacheKey, JSON.stringify(userProfile));
    } catch (e) {
        console.warn('Lỗi ghi localStorage:', e);
    }

    // Nếu là mock user hoặc offline, trả về true luôn vì đã lưu local thành công
    const isLocalMock = currentUser.displayName === 'Sếp Khương (Local)';
    if (isLocalMock) {
        return true;
    }

    // 2. Ghi lên Firestore
    try {
        const db = firebase.firestore();
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection('profiles').doc(email).set(data, { merge: true });
        return true;
    } catch (error) {
        console.error('Lỗi lưu profile lên Firestore, đã lưu tạm vào bộ nhớ máy:', error);
        // Vẫn trả về true vì dữ liệu đã được lưu vào localStorage và state, giúp trải nghiệm không bị đứt quãng
        return true; 
    }
}

// ---- Toggle hoàn thành module ----
async function toggleModuleComplete(moduleId) {
    if (!userProfile) await loadUserProfile();

    const completed = userProfile.completedModules || [];
    const index = completed.indexOf(moduleId);

    if (index > -1) {
        completed.splice(index, 1);
    } else {
        completed.push(moduleId);
    }

    userProfile.completedModules = completed;
    await saveUserProfile({ completedModules: completed });

    // Re-render lộ trình
    updateRoadmapUI();
    updateHeroLevel();

    if (document.querySelector('.profile-wrapper')) {
        renderProfilePage();
    }
}

// ---- Toggle hoàn thành module từ trang bài học ----
async function toggleModuleCompleteFromLesson(moduleId) {
    await toggleModuleComplete(moduleId);
    renderLessonCompletionCard(moduleId);
}

// ---- Render thẻ hoàn thành cuối bài học ----
async function renderLessonCompletionCard(pageId) {
    const container = document.getElementById('lesson-completion-container');
    if (!container) return;

    if (!userProfile) await loadUserProfile();

    const completedModules = userProfile?.completedModules || [];
    const isCompleted = completedModules.includes(pageId);

    container.innerHTML = `
        <div class="lesson-completion-card ${isCompleted ? 'completed' : ''}">
            <div class="lesson-completion-info">
                <div class="lesson-completion-icon">
                    <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle-question'}"></i>
                </div>
                <div class="lesson-completion-text">
                    <h3>${isCompleted ? 'Bạn đã hoàn thành bài học này!' : 'Hoàn thành bài học này?'}</h3>
                    <p>${isCompleted ? 'Tiến độ học tập của bạn đã được cập nhật.' : 'Đánh dấu đã học để ghi nhận tiến độ đào tạo.'}</p>
                </div>
            </div>
            <button class="btn-toggle-lesson-complete ${isCompleted ? 'completed' : 'not-completed'}" 
                onclick="toggleModuleCompleteFromLesson('${pageId}')">
                ${isCompleted 
                    ? '<i class="fa-solid fa-circle-check"></i> Đã Hoàn Thành' 
                    : '<i class="fa-regular fa-circle"></i> Đánh Dấu Hoàn Thành'
                }
            </button>
        </div>
    `;
}

// ---- Navigate đến trang module ----
function navigateToModule(pageId) {
    if (window.appRoutes) {
        window.appRoutes.navigate(pageId, true);
    }
}

// ---- Helpers tính tiến độ ----
function getTotalModules() {
    return TRAINING_ROADMAP.reduce((sum, week) => sum + week.modules.length, 0);
}

function getCompletedCount() {
    return (userProfile?.completedModules || []).length;
}

function getProgressPercent() {
    const total = getTotalModules();
    return total > 0 ? Math.round((getCompletedCount() / total) * 100) : 0;
}

function getCurrentLevel() {
    const pct = getProgressPercent();
    if (pct >= 100) return { name: 'Sát Thủ Đất Nền', icon: '🔥', color: '#f59e0b' };
    if (pct >= 70) return { name: 'Chiến Binh', icon: '⚔️', color: '#34d399' };
    if (pct >= 30) return { name: 'Tân Binh Tiến Bộ', icon: '🌟', color: '#a78bfa' };
    return { name: 'Tân Binh', icon: '🌱', color: '#38bdf8' };
}

// ---- Render trang Profile ----
async function renderProfilePage() {
    const container = document.getElementById('app-content');
    if (!container) return;

    // 1. Nếu chưa có userProfile, show loading và đợi tải lần đầu
    if (!userProfile) {
        container.innerHTML = `<div class="profile-loading"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải hồ sơ...</div>`;
        await loadUserProfile();
    }

    // 2. Render ngay lập tức từ dữ liệu hiện tại (trong memory / cache)
    renderProfileUI(container);

    // 3. Chạy ngầm loadUserProfile() để revalidate từ Firestore (trừ khi là local mock)
    const isLocalMock = currentUser && currentUser.displayName === 'Sếp Khương (Local)';
    if (!isLocalMock && currentUser) {
        loadUserProfile().then((freshProfile) => {
            // Chỉ re-render nếu người dùng vẫn đang ở trang Hồ Sơ
            if (freshProfile && document.querySelector('.profile-wrapper')) {
                renderProfileUI(container);
            }
        }).catch(err => console.error("Lỗi cập nhật ngầm profile:", err));
    }
}

// ---- Hàm render UI đồng bộ của trang Profile ----
function renderProfileUI(container) {
    if (!container) return;

    const profile = userProfile || {};
    const user = currentUser;
    const displayName = profile.displayName || user?.displayName || '';
    const email = user?.email || '';
    const photoURL = user?.photoURL || '';
    const roleBadge = isAdmin() ? 'Admin' : isLeader() ? 'Trưởng Nhóm' : 'Nhân Viên';
    const roleClass = isAdmin() ? 'role-admin' : isLeader() ? 'role-leader' : 'role-member';
    const level = getCurrentLevel();
    const completedModules = profile.completedModules || [];
    const totalMods = getTotalModules();
    const completedCount = completedModules.length;
    const pct = totalMods > 0 ? Math.round((completedCount / totalMods) * 100) : 0;
    const remaining = totalMods - completedCount;

    // Find current step (first incomplete step)
    let currentStepIdx = TRAINING_ROADMAP.length; // default: all done
    for (let i = 0; i < TRAINING_ROADMAP.length; i++) {
        const allDone = TRAINING_ROADMAP[i].modules.every(m => completedModules.includes(m.id));
        if (!allDone) { currentStepIdx = i; break; }
    }
    const currentStepName = currentStepIdx < TRAINING_ROADMAP.length ? TRAINING_ROADMAP[currentStepIdx].title : 'Hoàn thành!';

    // Progress ring SVG values
    const radius = 44;
    const circumference = 2 * Math.PI * radius;
    const dashoffset = circumference - (circumference * pct) / 100;
    const ringColor = pct >= 100 ? '#34d399' : pct >= 50 ? '#fbbf24' : '#38bdf8';

    // Stepper labels
    const stepperLabels = ['Thiết lập', 'Kiến thức', 'Thực địa', 'Thương hiệu', 'Đăng tin', 'Chăm khách', 'Chốt deal'];

    container.innerHTML = `
        <div class="profile-wrapper">
            <!-- ===== HERO BANNER ===== -->
            <div class="profile-hero">
                <div class="profile-hero-bg"></div>
                <div class="profile-hero-content">
                    <div class="profile-avatar-wrap">
                        ${photoURL
                            ? `<img class="profile-avatar" src="${photoURL}" alt="${displayName}" referrerpolicy="no-referrer" />`
                            : `<div class="profile-avatar-placeholder"><i class="fa-solid fa-user"></i></div>`
                        }
                        <div class="profile-level-badge" id="profile-level-badge" style="background:${level.color}">
                            ${level.icon} ${level.name}
                        </div>
                    </div>
                    <div class="profile-hero-info">
                        <h1 class="profile-name">${displayName}</h1>
                        <span class="profile-role ${roleClass}">${roleBadge}</span>
                        <span class="profile-email-display"><i class="fa-solid fa-envelope"></i> ${email}</span>
                        <div class="profile-actions-row">
                            <a href="/crm" class="profile-action-btn btn-crm">
                                <i class="fa-solid fa-hotel"></i> Đi tới TL Land CRM
                            </a>
                        </div>
                    </div>
                    <!-- Progress Ring -->
                    <div class="profile-hero-progress">
                        <div class="profile-progress-ring">
                            <svg viewBox="0 0 100 100">
                                <circle class="ring-bg" cx="50" cy="50" r="${radius}"></circle>
                                <circle class="ring-fill" cx="50" cy="50" r="${radius}"
                                    stroke="${ringColor}"
                                    stroke-dasharray="${circumference}"
                                    stroke-dashoffset="${dashoffset}"></circle>
                            </svg>
                            <div class="profile-progress-center">
                                <span class="profile-progress-num">${pct}%</span>
                                <span class="profile-progress-label">Hoàn thành</span>
                            </div>
                        </div>
                        <div class="profile-progress-step">Đã học: ${completedCount}/${totalMods} bài học</div>
                    </div>
                </div>
            </div>

            <!-- ===== HORIZONTAL STEPPER ===== -->
            <div class="profile-stepper">
                ${TRAINING_ROADMAP.map((step, idx) => {
                    const stepCompleted = step.modules.every(m => completedModules.includes(m.id));
                    const isCurrent = idx === currentStepIdx;
                    const cls = stepCompleted ? 'completed' : isCurrent ? 'current' : '';
                    return `
                        <div class="stepper-step ${cls}">
                            <div class="stepper-dot">${stepCompleted ? '<i class="fa-solid fa-check" style="font-size:0.6rem"></i>' : (idx + 1)}</div>
                            <div class="stepper-label">${stepperLabels[idx] || step.title}</div>
                        </div>
                    `;
                }).join('')}
            </div>

            <!-- ===== TWO-COLUMN MAIN ===== -->
            <div class="profile-main">
                <!-- LEFT: Roadmap -->
                <div class="profile-col-left">
                    <div class="profile-section-title">
                        <i class="fa-solid fa-route"></i> Lộ Trình Đào Tạo 7 Bước
                    </div>
                    ${TRAINING_ROADMAP.map((step, idx) => {
                        const stepDone = step.modules.every(m => completedModules.includes(m.id));
                        const isCurrent = idx === currentStepIdx;
                        const stepCompletedCount = step.modules.filter(m => completedModules.includes(m.id)).length;
                        const statusCls = stepDone ? 'completed' : isCurrent ? 'current' : 'upcoming';
                        const expanded = isCurrent || stepDone ? 'expanded' : '';
                        const badgeBg = stepDone ? 'background:rgba(52,211,153,0.12);color:#34d399;' : isCurrent ? 'background:rgba(251,191,36,0.12);color:#f59e0b;' : 'background:rgba(0,0,0,0.04);color:var(--text-muted);';
                        return `
                            <div class="roadmap-step-card ${statusCls} ${expanded}" data-step-idx="${idx}">
                                <div class="roadmap-step-header" onclick="toggleRoadmapStep(this)">
                                    <div class="roadmap-step-num" style="background:${step.color}">${idx + 1}</div>
                                    <div class="roadmap-step-info">
                                        <h4>Bước ${idx + 1}: ${step.title}</h4>
                                        <p>${step.subtitle}</p>
                                    </div>
                                    <span class="roadmap-step-progress-badge" style="${badgeBg}">${stepCompletedCount}/${step.modules.length}</span>
                                    <i class="fa-solid fa-chevron-down roadmap-step-arrow"></i>
                                </div>
                                <div class="roadmap-step-modules">
                                    ${step.modules.map(mod => {
                                        const isCompleted = completedModules.includes(mod.id);
                                        return `
                                            <div class="roadmap-module ${isCompleted ? 'completed' : ''}">
                                                <div class="roadmap-module-check" onclick="toggleModuleComplete('${mod.id}')">
                                                    <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
                                                </div>
                                                <div class="roadmap-module-content" onclick="navigateToModule('${mod.id}')">
                                                    <div class="roadmap-module-icon" style="color:${step.color}">
                                                        <i class="fa-solid ${mod.icon}"></i>
                                                    </div>
                                                    <div class="roadmap-module-info">
                                                        <h4>${mod.name}</h4>
                                                        <p>${mod.desc}</p>
                                                    </div>
                                                    <div class="roadmap-module-arrow">
                                                        <i class="fa-solid fa-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>

                <!-- RIGHT: Info + Stats -->
                <div class="profile-col-right">
                    <!-- Quick Stats -->
                    <div class="profile-card">
                        <div class="profile-card-title"><i class="fa-solid fa-chart-pie"></i> Thống Kê Nhanh</div>
                        <div class="profile-stats-grid">
                            <div class="profile-stat-box">
                                <div class="profile-stat-num" style="color:#38bdf8;">${totalMods}</div>
                                <div class="profile-stat-label">Tổng bài học</div>
                            </div>
                            <div class="profile-stat-box">
                                <div class="profile-stat-num" style="color:#34d399;">${completedCount}</div>
                                <div class="profile-stat-label">Đã hoàn thành</div>
                            </div>
                            <div class="profile-stat-box">
                                <div class="profile-stat-num" style="color:#f59e0b;">${remaining}</div>
                                <div class="profile-stat-label">Còn lại</div>
                            </div>
                            <div class="profile-stat-box">
                                <div class="profile-stat-num" style="color:#a78bfa;">7</div>
                                <div class="profile-stat-label">Tổng bước</div>
                            </div>
                        </div>
                    </div>

                    <!-- Personal Info -->
                    <div class="profile-card">
                        <div class="profile-card-title"><i class="fa-solid fa-user-pen"></i> Thông Tin Cá Nhân</div>
                        <div class="profile-info-compact">
                            <div class="profile-field-compact">
                                <label><i class="fa-solid fa-user"></i> Họ tên</label>
                                <input type="text" id="pf-name" value="${profile.displayName || ''}" placeholder="Nhập họ tên..." class="profile-input" />
                            </div>
                            <div class="profile-field-compact">
                                <label><i class="fa-solid fa-phone"></i> Số điện thoại</label>
                                <input type="tel" id="pf-phone" value="${profile.phone || ''}" placeholder="0xxx xxx xxx" class="profile-input" />
                            </div>
                            <div class="profile-field-compact">
                                <label><i class="fa-solid fa-cake-candles"></i> Ngày sinh</label>
                                <input type="date" id="pf-birthday" value="${profile.birthday || ''}" class="profile-input" />
                            </div>
                            <div class="profile-field-compact">
                                <label><i class="fa-solid fa-calendar-check"></i> Ngày vào Team</label>
                                <input type="date" id="pf-joindate" value="${profile.joinDate || ''}" class="profile-input" />
                            </div>
                            <div class="profile-field-compact">
                                <label><i class="fa-brands fa-facebook"></i> Facebook</label>
                                <input type="url" id="pf-facebook" value="${profile.facebookUrl || ''}" placeholder="https://facebook.com/..." class="profile-input" />
                            </div>
                            <div class="profile-field-compact">
                                <label><i class="fa-solid fa-comment-dots"></i> Zalo</label>
                                <input type="tel" id="pf-zalo" value="${profile.zaloPhone || ''}" placeholder="Số điện thoại Zalo" class="profile-input" />
                            </div>
                            <div class="profile-field-compact">
                                <label><i class="fa-solid fa-pen-fancy"></i> Giới thiệu</label>
                                <textarea id="pf-bio" placeholder="Vài dòng về bản thân..." class="profile-input profile-textarea">${profile.bio || ''}</textarea>
                            </div>
                            <div class="profile-save-bar">
                                <button class="profile-save-btn" onclick="handleSaveProfile()">
                                    <i class="fa-solid fa-floppy-disk"></i> Lưu Thông Tin
                                </button>
                                <span class="profile-save-status" id="profile-save-status"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    window.defaultProfileTab = null;
}

// ---- Toggle expand/collapse roadmap step card ----
function toggleRoadmapStep(headerEl) {
    const card = headerEl.closest('.roadmap-step-card');
    if (card) card.classList.toggle('expanded');
}

// ---- Chuyển tab ----
function switchProfileTab(tabId, btn) {
    document.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.profile-tab-panel').forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('tab-' + tabId);
    if (panel) panel.classList.add('active');
}

// ---- Tab 1: Thông Tin Cá Nhân ----
function renderProfileInfoTab(profile) {
    return `
        <div class="profile-info-grid">
            <div class="profile-field">
                <label><i class="fa-solid fa-user"></i> Họ tên</label>
                <div class="profile-field-value">
                    <input type="text" id="pf-name" value="${profile.displayName || ''}" placeholder="Nhập họ tên..." class="profile-input" />
                </div>
            </div>
            <div class="profile-field">
                <label><i class="fa-solid fa-cake-candles"></i> Ngày sinh</label>
                <div class="profile-field-value">
                    <input type="date" id="pf-birthday" value="${profile.birthday || ''}" class="profile-input" />
                </div>
            </div>
            <div class="profile-field">
                <label><i class="fa-solid fa-phone"></i> Số điện thoại</label>
                <div class="profile-field-value">
                    <input type="tel" id="pf-phone" value="${profile.phone || ''}" placeholder="0xxx xxx xxx" class="profile-input" />
                </div>
            </div>
            <div class="profile-field">
                <label><i class="fa-solid fa-calendar-check"></i> Ngày vào Team</label>
                <div class="profile-field-value">
                    <input type="date" id="pf-joindate" value="${profile.joinDate || ''}" class="profile-input" />
                </div>
            </div>
            <div class="profile-field">
                <label><i class="fa-brands fa-facebook"></i> Facebook cá nhân</label>
                <div class="profile-field-value">
                    <input type="url" id="pf-facebook" value="${profile.facebookUrl || ''}" placeholder="https://facebook.com/..." class="profile-input" />
                </div>
            </div>
            <div class="profile-field">
                <label><i class="fa-solid fa-comment-dots"></i> Zalo</label>
                <div class="profile-field-value">
                    <input type="tel" id="pf-zalo" value="${profile.zaloPhone || ''}" placeholder="Số điện thoại Zalo" class="profile-input" />
                </div>
            </div>
            <div class="profile-field full-width">
                <label><i class="fa-solid fa-pen-fancy"></i> Giới thiệu bản thân</label>
                <div class="profile-field-value">
                    <textarea id="pf-bio" placeholder="Vài dòng về bản thân, sở trường, mục tiêu..." class="profile-input profile-textarea">${profile.bio || ''}</textarea>
                </div>
            </div>
        </div>
        <div class="profile-save-bar">
            <button class="profile-save-btn" onclick="handleSaveProfile()">
                <i class="fa-solid fa-floppy-disk"></i> Lưu Thông Tin
            </button>
            <span class="profile-save-status" id="profile-save-status"></span>
        </div>
    `;
}

// ---- Tab 2: Dashboard Tiến Độ ----
// ---- Helpers format tiền VND ----
function formatVND(num) {
    if (!num && num !== 0) return '';
    return Number(num).toLocaleString('vi-VN');
}

function parseVND(str) {
    if (!str) return 0;
    return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0;
}

// ---- Tính toán Money Model ----
function calcMoneyModel(targetIncome, period, commissionPerLot, closeRatio, interestRatio) {
    const lots = Math.ceil(targetIncome / commissionPerLot);
    const clientsViewing = lots * closeRatio;
    const totalLeads = clientsViewing * interestRatio;
    const days = period === '6months' ? 180 : 365;
    const leadsPerDay = Math.ceil(totalLeads / days);
    return { lots, clientsViewing, totalLeads, leadsPerDay, days };
}

function renderDashboardTab(profile) {
    const target = profile.targetIncome || 1000000000;
    const period = profile.targetPeriod || 'year';
    const commission = profile.commissionPerLot || 167000000;
    const closeRatio = profile.closeRatio || 5;
    const interestRatio = profile.interestRatio || 30;

    const actualIncome = profile.actualIncome || 0;
    const actualLots = profile.actualLots || 0;
    const actualViewing = profile.actualViewing || 0;
    const actualLeads = profile.actualLeads || 0;

    const result = calcMoneyModel(target, period, commission, closeRatio, interestRatio);

    setTimeout(updateProgressUI, 100); // Tự động cập nhật progress bars khi render xong

    return `
        <div class="money-model">
            <!-- TIẾN ĐỘ THỰC TẾ (LÊN ĐẦU) -->
            <div class="mm-progress-section" style="margin-bottom: 3rem;">
                <div class="mm-target-header" style="margin-bottom: 1.5rem;">
                    <i class="fa-solid fa-chart-pie" style="color: var(--accent-emerald);"></i>
                    <h2>Tổng Quan Tiến Độ</h2>
                </div>
                
                <!-- 4 Biểu đồ tròn -->
                <div id="mm-progress-circles-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 2rem;">
                    <!-- Render by JS -->
                </div>

                <!-- Form cập nhật tiến độ hàng ngày -->
                <div class="mm-daily-update-card" style="background: var(--bg-secondary); border-radius: 16px; padding: 1.5rem; border: 1px solid var(--border-glass);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem;">
                        <h3 style="font-size: 1.1rem; margin: 0;"><i class="fa-solid fa-plus-circle" style="color: #3b82f6; margin-right: 8px;"></i> Nhập số liệu hôm nay</h3>
                        <span style="font-size: 0.85rem; color: var(--text-secondary);"><i class="fa-solid fa-circle-info"></i> Sẽ được cộng dồn vào tổng</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; margin-bottom: 1.5rem;">
                        <div class="mm-adv-field">
                            <label>Khách quan tâm mới</label>
                            <input type="number" id="mm-add-leads" class="mm-adv-input" placeholder="+0" />
                        </div>
                        <div class="mm-adv-field">
                            <label>Khách đi xem mới</label>
                            <input type="number" id="mm-add-viewing" class="mm-adv-input" placeholder="+0" />
                        </div>
                        <div class="mm-adv-field">
                            <label>Lô chốt mới</label>
                            <input type="number" id="mm-add-lots" class="mm-adv-input" placeholder="+0" />
                        </div>
                        <div class="mm-adv-field">
                            <label>Doanh thu mới</label>
                            <div class="mm-adv-input-wrap">
                                <input type="text" id="mm-add-income" class="mm-adv-input" placeholder="+0" oninput="this.value = formatVND(parseVND(this.value))" />
                                <span>₫</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <button class="mm-save-btn" onclick="addDailyProgress()" style="flex: 1;"><i class="fa-solid fa-check"></i> Lưu Cập Nhật</button>
                        <span id="mm-add-status" style="font-size: 0.9rem; font-weight: 600; min-width: 150px;"></span>
                    </div>
                </div>
            </div>

            <!-- Mục tiêu nhập liệu -->
            <div class="mm-target-card">
                <div class="mm-target-header">
                    <i class="fa-solid fa-bullseye"></i>
                    <h2>Mục Tiêu Doanh Thu</h2>
                </div>
                <p class="mm-target-desc">Nhập số tiền bạn muốn kiếm được, hệ thống sẽ tính ngược ra số khách cần có mỗi ngày.</p>

                <div class="mm-input-row">
                    <div class="mm-input-wrap">
                        <span class="mm-currency">₫</span>
                        <input type="text" id="mm-target-input" class="mm-input"
                            value="${formatVND(target)}"
                            oninput="this.value = formatVND(parseVND(this.value)); handleCalcTarget()" />
                    </div>
                    <div class="mm-period-toggle">
                        <button class="mm-period-btn ${period === '6months' ? 'active' : ''}" onclick="switchPeriod('6months', this)">6 Tháng</button>
                        <button class="mm-period-btn ${period === 'year' ? 'active' : ''}" onclick="switchPeriod('year', this)">1 Năm</button>
                    </div>
                </div>
            </div>

            <!-- Kết quả phễu -->
            <div class="mm-funnel">
                <div class="mm-funnel-step mm-step-leads">
                    <div class="mm-step-icon"><i class="fa-solid fa-users"></i></div>
                    <div class="mm-step-content">
                        <div class="mm-step-num" id="mm-total-leads">${formatVND(result.totalLeads)}</div>
                        <div class="mm-step-label">Tổng khách quan tâm cần có</div>
                    </div>
                    <div class="mm-step-ratio">÷${interestRatio}</div>
                </div>

                <div class="mm-funnel-arrow"><i class="fa-solid fa-arrow-down"></i></div>

                <div class="mm-funnel-step mm-step-viewing">
                    <div class="mm-step-icon"><i class="fa-solid fa-car"></i></div>
                    <div class="mm-step-content">
                        <div class="mm-step-num" id="mm-clients-viewing">${formatVND(result.clientsViewing)}</div>
                        <div class="mm-step-label">Khách đón đi xem đất</div>
                    </div>
                    <div class="mm-step-ratio">÷${closeRatio}</div>
                </div>

                <div class="mm-funnel-arrow"><i class="fa-solid fa-arrow-down"></i></div>

                <div class="mm-funnel-step mm-step-lots">
                    <div class="mm-step-icon"><i class="fa-solid fa-handshake"></i></div>
                    <div class="mm-step-content">
                        <div class="mm-step-num" id="mm-lots">${result.lots}</div>
                        <div class="mm-step-label">Lô cần chốt</div>
                    </div>
                </div>

                <div class="mm-funnel-arrow"><i class="fa-solid fa-arrow-down"></i></div>

                <div class="mm-funnel-step mm-step-money">
                    <div class="mm-step-icon"><i class="fa-solid fa-sack-dollar"></i></div>
                    <div class="mm-step-content">
                        <div class="mm-step-num" id="mm-income">${formatVND(target)}₫</div>
                        <div class="mm-step-label">Thu nhập mục tiêu</div>
                    </div>
                </div>
            </div>

            <!-- Highlight: Số khách/ngày -->
            <div class="mm-daily-card">
                <div class="mm-daily-icon"><i class="fa-solid fa-fire"></i></div>
                <div class="mm-daily-content">
                    <div class="mm-daily-num" id="mm-leads-day">${result.leadsPerDay}</div>
                    <div class="mm-daily-label">Khách quan tâm cần có <strong>MỖI NGÀY</strong></div>
                    <div class="mm-daily-sub">trong ${result.days} ngày (${period === '6months' ? '6 tháng' : '1 năm'})</div>
                </div>
            </div>

            <!-- Tùy chỉnh nâng cao -->
            <details class="mm-advanced">
                <summary><i class="fa-solid fa-sliders"></i> Tùy chỉnh tỉ lệ chuyển đổi</summary>
                <div class="mm-advanced-grid">
                    <div class="mm-adv-field">
                        <label>Hoa hồng trung bình / lô</label>
                        <div class="mm-adv-input-wrap">
                            <input type="text" id="mm-commission" class="mm-adv-input"
                                value="${formatVND(commission)}" 
                                oninput="this.value = formatVND(parseVND(this.value)); handleCalcTarget()" />
                            <span>₫</span>
                        </div>
                    </div>
                    <div class="mm-adv-field">
                        <label>Số khách xem → 1 lô chốt</label>
                        <input type="number" id="mm-close-ratio" class="mm-adv-input"
                            value="${closeRatio}" min="1" max="100"
                            onchange="handleCalcTarget()" />
                    </div>
                    <div class="mm-adv-field">
                        <label>Số khách quan tâm → 1 khách xem</label>
                        <input type="number" id="mm-interest-ratio" class="mm-adv-input"
                            value="${interestRatio}" min="1" max="200"
                            onchange="handleCalcTarget()" />
                    </div>
                </div>
            </details>

            <!-- Nút lưu -->
            <div class="mm-save-bar">
                <button class="mm-save-btn" onclick="saveDashboardSettings()">
                    <i class="fa-solid fa-floppy-disk"></i> Lưu Mục Tiêu
                </button>
                <span class="mm-save-status" id="mm-save-status"></span>
            </div>
        </div>
    `;
}

// ---- Tính toán realtime khi nhập ----
function handleCalcTarget() {
    const target = parseVND(document.getElementById('mm-target-input')?.value);
    const commission = parseVND(document.getElementById('mm-commission')?.value) || 167000000;
    const closeRatio = parseInt(document.getElementById('mm-close-ratio')?.value) || 5;
    const interestRatio = parseInt(document.getElementById('mm-interest-ratio')?.value) || 30;

    const periodBtns = document.querySelectorAll('.mm-period-btn');
    let period = 'year';
    periodBtns.forEach(btn => { if (btn.classList.contains('active')) period = btn.dataset?.period || 'year'; });

    const result = calcMoneyModel(target, period, commission, closeRatio, interestRatio);

    const el = (id) => document.getElementById(id);
    if (el('mm-total-leads')) el('mm-total-leads').textContent = formatVND(result.totalLeads);
    if (el('mm-clients-viewing')) el('mm-clients-viewing').textContent = formatVND(result.clientsViewing);
    if (el('mm-lots')) el('mm-lots').textContent = result.lots;
    if (el('mm-income')) el('mm-income').textContent = formatVND(target) + '₫';
    if (el('mm-leads-day')) el('mm-leads-day').textContent = result.leadsPerDay;

    const dailySub = document.querySelector('.mm-daily-sub');
    if (dailySub) dailySub.textContent = `trong ${result.days} ngày (${period === '6months' ? '6 tháng' : '1 năm'})`;

    // Update ratio labels
    const ratioEls = document.querySelectorAll('.mm-step-ratio');
    if (ratioEls[0]) ratioEls[0].textContent = '÷' + interestRatio;
    if (ratioEls[1]) ratioEls[1].textContent = '÷' + closeRatio;

    updateProgressUI();
}

function updateProgressUI() {
    const target = parseVND(document.getElementById('mm-target-input')?.value) || 1;
    const commission = parseVND(document.getElementById('mm-commission')?.value) || 167000000;
    const closeRatio = parseInt(document.getElementById('mm-close-ratio')?.value) || 5;
    const interestRatio = parseInt(document.getElementById('mm-interest-ratio')?.value) || 30;

    const periodBtns = document.querySelectorAll('.mm-period-btn');
    let period = 'year';
    periodBtns.forEach(btn => { if (btn.classList.contains('active')) period = btn.dataset?.period || 'year'; });

    const result = calcMoneyModel(target, period, commission, closeRatio, interestRatio);

    const actualLeads = parseInt(userProfile.actualLeads) || 0;
    const actualViewing = parseInt(userProfile.actualViewing) || 0;
    const actualLots = parseInt(userProfile.actualLots) || 0;
    const actualIncome = parseInt(userProfile.actualIncome) || 0;

    const bars = [
        { label: 'Khách quan tâm', actual: actualLeads, target: result.totalLeads, color: '#38bdf8', icon: 'fa-users' },
        { label: 'Khách đi xem', actual: actualViewing, target: result.clientsViewing, color: '#a78bfa', icon: 'fa-car' },
        { label: 'Lô đã chốt', actual: actualLots, target: result.lots, color: '#34d399', icon: 'fa-handshake' },
        { label: 'Doanh thu (₫)', actual: actualIncome, target: target, color: '#f59e0b', icon: 'fa-sack-dollar', isMoney: true }
    ];

    const container = document.getElementById('mm-progress-circles-container');
    if (!container) return;

    container.innerHTML = bars.map(bar => {
        const pctRaw = (bar.actual / (bar.target || 1)) * 100;
        const pct = Math.min(100, Math.round(pctRaw));
        const valStr = formatVND(bar.actual);
        const targetStr = formatVND(bar.target);
        const dasharray = 251.2; // 2 * PI * 40
        const dashoffset = dasharray - (dasharray * pct) / 100;
        
        return `
            <div style="display: flex; flex-direction: column; align-items: center; text-align: center; background: var(--bg-primary, white); padding: 1.5rem 1rem; border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: 0 4px 15px rgba(0,0,0,0.02);">
                <div style="position: relative; width: 100px; height: 100px; margin-bottom: 1rem;">
                    <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-glass)" stroke-width="8"></circle>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="${bar.color}" stroke-width="8"
                                stroke-dasharray="${dasharray}" stroke-dashoffset="${dashoffset}" 
                                stroke-linecap="round" style="transition: stroke-dashoffset 1s ease-out; transform: rotate(-90deg); transform-origin: 50% 50%;"></circle>
                    </svg>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center;">
                        <i class="fa-solid ${bar.icon}" style="color: ${bar.color}; font-size: 1.2rem; margin-bottom: 2px;"></i>
                        <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-primary);">${pctRaw > 0 && pctRaw < 1 ? '<1' : pct}%</span>
                    </div>
                </div>
                <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.3;">${bar.label}</h4>
                <div style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">${valStr}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary);">Mục tiêu: ${targetStr}</div>
            </div>
        `;
    }).join('');
}

function switchPeriod(period, btn) {
    document.querySelectorAll('.mm-period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    btn.dataset.period = period;
    handleCalcTarget();
}

async function saveDashboardSettings() {
    const data = {
        targetIncome: parseVND(document.getElementById('mm-target-input')?.value),
        targetPeriod: document.querySelector('.mm-period-btn.active')?.dataset?.period || 'year',
        commissionPerLot: parseVND(document.getElementById('mm-commission')?.value) || 167000000,
        closeRatio: parseInt(document.getElementById('mm-close-ratio')?.value) || 5,
        interestRatio: parseInt(document.getElementById('mm-interest-ratio')?.value) || 30,
    };

    const statusEl = document.getElementById('mm-save-status');
    if (statusEl) statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';

    const success = await saveUserProfile(data);

    if (statusEl) {
        statusEl.innerHTML = success
            ? '<i class="fa-solid fa-check"></i> Đã lưu mục tiêu!'
            : '<i class="fa-solid fa-xmark"></i> Lỗi, thử lại';
        statusEl.className = 'mm-save-status ' + (success ? 'save-success' : 'save-error');
        setTimeout(() => { if (statusEl) statusEl.innerHTML = ''; }, 3000);
    }
}

// ---- Tab 3: Lộ Trình Đào Tạo ----
function renderRoadmapTab(profile) {
    const completedModules = profile.completedModules || [];

    return `
        <div class="roadmap-wrapper">
            ${TRAINING_ROADMAP.map(week => `
                <div class="roadmap-week">
                    <div class="roadmap-week-header">
                        <div class="roadmap-week-badge" style="background:${week.color}">
                            <i class="fa-solid ${week.icon}"></i>
                        </div>
                        <div>
                            <h3 class="roadmap-week-title">Bước ${week.week}: ${week.title}</h3>
                            <p class="roadmap-week-subtitle">${week.subtitle}</p>
                        </div>
                    </div>
                    <div class="roadmap-modules">
                        ${week.modules.map(mod => {
                            const isCompleted = completedModules.includes(mod.id);
                            const statusClass = isCompleted ? 'completed' : '';
                            return `
                                <div class="roadmap-module ${statusClass}">
                                    <div class="roadmap-module-check" onclick="toggleModuleComplete('${mod.id}')">
                                        <i class="fa-solid ${isCompleted ? 'fa-circle-check' : 'fa-circle'}"></i>
                                    </div>
                                    <div class="roadmap-module-content" onclick="navigateToModule('${mod.id}')">
                                        <div class="roadmap-module-icon" style="color:${week.color}">
                                            <i class="fa-solid ${mod.icon}"></i>
                                        </div>
                                        <div class="roadmap-module-info">
                                            <h4>${mod.name}</h4>
                                            <p>${mod.desc}</p>
                                        </div>
                                        <div class="roadmap-module-arrow">
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ---- Cập nhật UI sau khi toggle module ----
function updateRoadmapUI() {
    const panel = document.getElementById('tab-roadmap');
    if (panel && panel.classList.contains('active')) {
        panel.innerHTML = renderRoadmapTab(userProfile || {});
    }
}

function updateDashboardUI() {
    const panel = document.getElementById('tab-dashboard');
    if (panel) {
        panel.innerHTML = renderDashboardTab(userProfile || {});
    }
}

function updateHeroLevel() {
    const badge = document.getElementById('profile-level-badge');
    if (badge) {
        const level = getCurrentLevel();
        badge.style.background = level.color;
        badge.innerHTML = `${level.icon} ${level.name}`;
    }
}

// ---- Lưu thông tin cá nhân ----
async function handleSaveProfile() {
    const data = {
        displayName: document.getElementById('pf-name')?.value || '',
        birthday: document.getElementById('pf-birthday')?.value || '',
        phone: document.getElementById('pf-phone')?.value || '',
        joinDate: document.getElementById('pf-joindate')?.value || '',
        facebookUrl: document.getElementById('pf-facebook')?.value || '',
        zaloPhone: document.getElementById('pf-zalo')?.value || '',
        bio: document.getElementById('pf-bio')?.value || '',
    };

    const statusEl = document.getElementById('profile-save-status');
    if (statusEl) statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';

    const success = await saveUserProfile(data);

    if (statusEl) {
        statusEl.innerHTML = success
            ? '<i class="fa-solid fa-check"></i> Đã lưu thành công!'
            : '<i class="fa-solid fa-xmark"></i> Lỗi, vui lòng thử lại';
        statusEl.className = 'profile-save-status ' + (success ? 'save-success' : 'save-error');
        setTimeout(() => { if (statusEl) statusEl.innerHTML = ''; }, 3000);
    }
}

// ============================================
// Init on DOM Ready

// Phát hiện trình duyệt nhúng (in-app browser)
function detectInAppBrowser() {
    const ua = navigator.userAgent || navigator.vendor || '';
    
    const inAppPatterns = [
        { pattern: /Zalo/i, name: 'Zalo' },
        { pattern: /FBAV|FBAN|FB_IAB/i, name: 'Facebook' },
        { pattern: /Instagram/i, name: 'Instagram' },
        { pattern: /Messenger/i, name: 'Messenger' },
        { pattern: /LINE\//i, name: 'LINE' },
        { pattern: /Viber/i, name: 'Viber' },
        { pattern: /TikTok/i, name: 'TikTok' },
        { pattern: /Snapchat/i, name: 'Snapchat' },
        { pattern: /Twitter/i, name: 'Twitter' },
        { pattern: /LinkedInApp/i, name: 'LinkedIn' },
        { pattern: /MicroMessenger/i, name: 'WeChat' },
    ];
    
    for (const { pattern, name } of inAppPatterns) {
        if (pattern.test(ua)) return name;
    }
    
    return null;
}

function copyLinkToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const successEl = document.getElementById('inapp-copy-success');
        if (successEl) {
            successEl.style.display = 'flex';
            setTimeout(() => { successEl.style.display = 'none'; }, 4000);
        }
    }).catch(() => {
        // Fallback cho trình duyệt cũ
        const input = document.createElement('input');
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        
        const successEl = document.getElementById('inapp-copy-success');
        if (successEl) {
            successEl.style.display = 'flex';
            setTimeout(() => { successEl.style.display = 'none'; }, 4000);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const appLayout = document.querySelector('.app-layout');
    if (appLayout) appLayout.style.display = 'none';
    
    // Kiểm tra in-app browser
    const inAppSource = detectInAppBrowser();
    if (inAppSource) {
        const warningEl = document.getElementById('inapp-warning');
        const sourceEl = document.getElementById('inapp-source');
        const signinBtn = document.getElementById('google-signin-btn');
        const descEl = document.querySelector('.login-desc');
        
        if (warningEl) warningEl.style.display = 'block';
        if (sourceEl) sourceEl.textContent = inAppSource;
        if (signinBtn) signinBtn.style.display = 'none';
        if (descEl) descEl.style.display = 'none';
        return; // Không init Firebase nếu đang ở in-app browser
    }
    
    // Bypass đăng nhập khi mở dưới local (file://)
    if (window.location.protocol === 'file:' || window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
        console.log("Local development detected. Bypassing authentication...");
        currentUser = { email: ADMIN_EMAIL, displayName: 'Sếp Khương (Local)' };
        userRole = 'admin';
        hideAllScreens();
        const appLayout = document.querySelector('.app-layout');
        if (appLayout) appLayout.style.display = 'flex';
        updateTopbarUser(currentUser);
        updateAdminNav();
        return;
    }

    initAuth();
});

// ============================================
// HELPERS & MODALS FOR ACCESS LOGS (TAB 3)
// ============================================

function formatRelativeTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const sec = 1000;
    const min = 60 * sec;
    const hour = 60 * min;
    const day = 24 * hour;
    
    if (diff < 10 * sec) return 'Vừa xong';
    if (diff < min) return Math.floor(diff / sec) + ' giây trước';
    if (diff < hour) return Math.floor(diff / min) + ' phút trước';
    if (diff < day) return Math.floor(diff / hour) + ' giờ trước';
    
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today - day);
    
    const pad = (n) => n.toString().padStart(2, '0');
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    
    if (date.toDateString() === today.toDateString()) {
        return `Hôm nay lúc ${timeStr}`;
    }
    if (date.toDateString() === yesterday.toDateString()) {
        return `Hôm qua lúc ${timeStr}`;
    }
    
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} lúc ${timeStr}`;
}

function formatFullTime(timestamp) {
    const date = new Date(timestamp);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ngày ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

async function showAccessDetails(email) {
    const modal = document.getElementById('access-detail-modal');
    const modalUser = document.getElementById('access-modal-user');
    const timeline = document.getElementById('access-timeline');
    
    if (!modal || !modalUser || !timeline) return;
    
    const profilesMap = await loadAllProfiles();
    const user = profilesMap[email.toLowerCase().trim()];
    if (!user) return;
    
    const displayName = user.displayName || email.split('@')[0];
    const avatar = user.photoURL 
        ? `<img src="${user.photoURL}" style="width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--accent-blue);" referrerpolicy="no-referrer" />`
        : `<div style="width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, var(--accent-blue), #1d4ed8); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; border: 1.5px solid var(--accent-blue);">${displayName.substring(0, 1).toUpperCase()}</div>`;
        
    modalUser.innerHTML = `
        ${avatar}
        <div>
            <h4 style="font-weight: 800; color: var(--text-main); font-size: 1.05rem; margin: 0;">${displayName}</h4>
            <span style="font-size: 0.85rem; color: var(--text-muted);">${email}</span>
        </div>
    `;
    
    const history = user.accessHistory || [];
    if (history.length === 0) {
        timeline.innerHTML = `<div style="color: var(--text-muted); font-style: italic; padding: 20px 0;">Chưa có lịch sử truy cập chi tiết.</div>`;
    } else {
        timeline.innerHTML = history.map((log, idx) => {
            const timeFull = formatFullTime(log.timestamp);
            const timeRelative = formatRelativeTime(log.timestamp);
            const device = log.device || 'Thiết bị không xác định';
            const isMobile = device.includes('Phone') || device.includes('Thoại') || device.includes('Mobile');
            
            return `
                <div class="timeline-item" style="position: relative; padding-bottom: 4px;">
                    <div class="timeline-badge" style="position: absolute; left: -31px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: ${idx === 0 ? 'var(--accent-blue, #3b82f6)' : '#cbd5e1'}; border: 2px solid #fff; box-shadow: 0 0 0 3px ${idx === 0 ? 'rgba(59,130,246,0.2)' : 'rgba(0,0,0,0.02)'}; z-index: 2;"></div>
                    <div class="timeline-content" style="display: flex; flex-direction: column; gap: 4px;">
                        <span class="timeline-time" style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">
                            ${timeRelative} <span style="font-weight: 400; font-size: 0.78rem; color: var(--text-muted); margin-left: 6px;">(${timeFull})</span>
                        </span>
                        <span class="timeline-device" style="font-size: 0.8rem; color: var(--text-secondary); display: inline-flex; align-items: center; gap: 6px;">
                            <i class="${isMobile ? 'fa-solid fa-mobile-screen-button' : 'fa-solid fa-desktop'}" style="color: ${isMobile ? '#10b981' : '#3b82f6'};"></i>
                            ${device}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    modal.style.display = 'flex';
    // Trigger reflow
    modal.offsetHeight;
    modal.style.opacity = '1';
    modal.querySelector('.access-modal-content').style.transform = 'translateY(0)';
}

function closeAccessDetails() {
    const modal = document.getElementById('access-detail-modal');
    if (!modal) return;
    modal.style.opacity = '0';
    modal.querySelector('.access-modal-content').style.transform = 'translateY(30px)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// ============================================
// ADMIN/LEADER: MEMBER PERSONAL INFO MANAGEMENT
// ============================================

function renderMemberPersonalInfoHtml(memberEmail, profile) {
    profile = profile || {};
    const emailEscaped = memberEmail.replace(/[@.]/g, '_');
    
    return `
        <div class="details-personal-info" style="grid-column: 1 / -1; background: rgba(255, 255, 255, 0.45); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 18px; border-radius: 16px; border: 1px solid var(--border-glass, rgba(0,0,0,0.08)); margin-bottom: 15px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.01);">
            <h5 style="margin: 0; font-size: 0.95rem; font-weight: 800; color: var(--text-primary, #1e293b); border-bottom: 2px solid rgba(59, 130, 246, 0.15); padding-bottom: 8px; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px;">
                <i class="fa-solid fa-address-card" style="color: #3b82f6;"></i> THÔNG TIN CÁ NHÂN & LIÊN HỆ
            </h5>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary, #64748b);"><i class="fa-solid fa-user"></i> Họ tên</label>
                    <input type="text" id="pf-name-${emailEscaped}" value="${profile.displayName || ''}" class="profile-input" style="padding: 8px 12px; font-size: 0.85rem; border-radius: 8px;" placeholder="Chưa nhập họ tên..." />
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary, #64748b);"><i class="fa-solid fa-phone"></i> Số điện thoại</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="tel" id="pf-phone-${emailEscaped}" value="${profile.phone || ''}" class="profile-input" style="padding: 8px 12px; font-size: 0.85rem; border-radius: 8px; flex: 1;" placeholder="0xxx xxx xxx" />
                        ${profile.phone ? `<a href="tel:${profile.phone}" class="profile-action-btn" style="padding: 8px 12px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: #fff; border-radius: 8px; text-decoration: none;" title="Gọi điện"><i class="fa-solid fa-phone"></i></a>` : ''}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary, #64748b);"><i class="fa-solid fa-cake-candles"></i> Ngày sinh</label>
                    <input type="date" id="pf-birthday-${emailEscaped}" value="${profile.birthday || ''}" class="profile-input" style="padding: 8px 12px; font-size: 0.85rem; border-radius: 8px;" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary, #64748b);"><i class="fa-solid fa-calendar-check"></i> Ngày vào Team</label>
                    <input type="date" id="pf-joindate-${emailEscaped}" value="${profile.joinDate || ''}" class="profile-input" style="padding: 8px 12px; font-size: 0.85rem; border-radius: 8px;" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary, #64748b);"><i class="fa-brands fa-facebook"></i> Facebook</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="url" id="pf-facebook-${emailEscaped}" value="${profile.facebookUrl || ''}" class="profile-input" style="padding: 8px 12px; font-size: 0.85rem; border-radius: 8px; flex: 1;" placeholder="https://facebook.com/..." />
                        ${profile.facebookUrl ? `<a href="${profile.facebookUrl}" target="_blank" class="profile-action-btn" style="padding: 8px 12px; display: flex; align-items: center; justify-content: center; background: #1877f2; color: #fff; border-radius: 8px; text-decoration: none;" title="Mở Facebook"><i class="fa-brands fa-facebook-f"></i></a>` : ''}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary, #64748b);"><i class="fa-solid fa-comment-dots"></i> Zalo</label>
                    <div style="display: flex; gap: 8px;">
                        <input type="tel" id="pf-zalo-${emailEscaped}" value="${profile.zaloPhone || ''}" class="profile-input" style="padding: 8px 12px; font-size: 0.85rem; border-radius: 8px; flex: 1;" placeholder="Số điện thoại Zalo" />
                        ${profile.zaloPhone ? `<a href="https://zalo.me/${profile.zaloPhone.replace(/[^0-9]/g, '')}" target="_blank" class="profile-action-btn" style="padding: 8px 12px; display: flex; align-items: center; justify-content: center; background: #0068ff; color: #fff; border-radius: 8px; text-decoration: none;" title="Nhắn Zalo"><i class="fa-solid fa-comment-dots"></i></a>` : ''}
                    </div>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-secondary, #64748b);"><i class="fa-solid fa-pen-fancy"></i> Giới thiệu bản thân</label>
                <textarea id="pf-bio-${emailEscaped}" class="profile-input" style="padding: 8px 12px; font-size: 0.85rem; border-radius: 8px; height: 50px; resize: vertical;" placeholder="Giới thiệu bản thân, mục tiêu...">${profile.bio || ''}</textarea>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 5px;">
                <button onclick="handleSaveMemberProfileByLeader('${memberEmail}')" class="profile-save-btn" style="padding: 8px 16px; font-size: 0.8rem; border-radius: 8px; background: linear-gradient(135deg, #3b82f6, #2563eb); color: #fff; display: flex; align-items: center; gap: 6px; cursor: pointer; border: none; font-weight: 700; transition: all 0.3s ease;">
                    <i class="fa-solid fa-floppy-disk"></i> Lưu Thông Tin Nhân Sự
                </button>
                <span id="pf-save-status-${emailEscaped}" class="profile-save-status" style="font-size: 0.85rem; font-weight: 600;"></span>
            </div>
        </div>
    `;
}

async function saveMemberProfileByLeader(memberEmail, data) {
    try {
        const db = firebase.firestore();
        data.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await db.collection('profiles').doc(memberEmail.toLowerCase().trim()).set(data, { merge: true });
        
        // Cập nhật bộ nhớ cục bộ (localStorage) nếu trùng với user hiện tại
        if (currentUser && currentUser.email.toLowerCase().trim() === memberEmail.toLowerCase().trim()) {
            const cacheKey = 'profile_' + memberEmail.toLowerCase().trim();
            if (userProfile) Object.assign(userProfile, data);
            try {
                localStorage.setItem(cacheKey, JSON.stringify(userProfile));
            } catch (e) {}
        }
        return true;
    } catch (error) {
        console.error('Lỗi lưu profile nhân viên:', error);
        return false;
    }
}

async function handleSaveMemberProfileByLeader(memberEmail) {
    const emailEscaped = memberEmail.replace(/[@.]/g, '_');
    const panel = document.getElementById('details-' + emailEscaped);
    if (!panel) return;

    const data = {
        displayName: panel.querySelector('#pf-name-' + emailEscaped)?.value || '',
        phone: panel.querySelector('#pf-phone-' + emailEscaped)?.value || '',
        birthday: panel.querySelector('#pf-birthday-' + emailEscaped)?.value || '',
        joinDate: panel.querySelector('#pf-joindate-' + emailEscaped)?.value || '',
        facebookUrl: panel.querySelector('#pf-facebook-' + emailEscaped)?.value || '',
        zaloPhone: panel.querySelector('#pf-zalo-' + emailEscaped)?.value || '',
        bio: panel.querySelector('#pf-bio-' + emailEscaped)?.value || '',
    };

    const statusEl = panel.querySelector('#pf-save-status-' + emailEscaped);
    if (statusEl) statusEl.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...';

    const success = await saveMemberProfileByLeader(memberEmail, data);

    if (statusEl) {
        statusEl.innerHTML = success
            ? '<i class="fa-solid fa-check"></i> Đã lưu thành công!'
            : '<i class="fa-solid fa-xmark"></i> Lỗi, thử lại';
        statusEl.className = 'profile-save-status ' + (success ? 'save-success' : 'save-error');
        setTimeout(() => { if (statusEl) statusEl.innerHTML = ''; }, 3000);
    }
    
    // Refresh lại card hiển thị thông tin học tập của nhân viên để đồng bộ họ tên mới
    await refreshMemberProgressUI(memberEmail);
}
