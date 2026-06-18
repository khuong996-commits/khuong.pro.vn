// ---- Sidebar Accordion Toggle ----
function toggleNavSection(titleEl) {
    const section = titleEl.closest('.nav-section');
    if (section) {
        section.classList.toggle('open');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ---- DOM Elements ----
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const overlay = document.getElementById('sidebar-overlay');
    const navItems = document.querySelectorAll('.nav-item');
    const appContent = document.getElementById('app-content');
    const topbarTitle = document.getElementById('topbar-title');
    const topbarBreadcrumb = document.getElementById('topbar-breadcrumb-current');

    // ---- Routing System & Paths ----
    const routeMap = {
        'page-tb-loi-noi-dau': 'loi-noi-dau',
        'page-tb-quy-che': 'quy-che',
        'page-tb-quy-trinh': 'quy-trinh',
        'page-telesale': 'telesale',
        'page-chan-dung-khach-hang': 'chan-dung-khach-hang',
        'page-cac-khoa-hoc': 'cac-khoa-hoc',
        'page-chan-dung-nhan-su': 'chan-dung-nhan-su',
        'page-lo-trinh-dan-khach': 'lo-trinh-dan-khach',
        'page-chien-luoc-fb': 'chien-luoc-facebook',
        'page-bai-dang-dau-tien': 'bai-dang-dau-tien',
        'page-cam-tay-chi-viec': 'cam-tay-chi-viec',
        'page-tb-chon-kenh': 'chon-kenh-tim-kiem',
        'page-tinh-hoa-hong': 'tinh-hoa-hong',
        'page-ly-do-tang-gia': 'ly-do-tang-gia-bds',
        'page-giai-doan-tang-gia': 'giai-doan-tang-gia-bds',
        'page-so-sanh-kenh-dau-tu': 'so-sanh-kenh-dau-tu-bds',
        'page-mau-dang-tin-ao': 'mau-dang-tin-ao',
        'page-tuyet-ky-lai-khach': 'tuyet-chieu-lai-khach',
        'page-admin-emails': 'admin-emails',
        'page-profile': 'ho-so'
    };
    const pathMap = {};
    for (let k in routeMap) pathMap[routeMap[k]] = k;

    // ---- DOM Cache cho tốc độ tải trang ----
    const _domCache = {};
    let _currentPageId = null;

    function _getOrCreateDOM(pageId) {
        // Trang admin/profile render động, không cache
        if (pageId === 'page-admin-emails' || pageId === 'page-profile') {
            return null;
        }
        if (!_domCache[pageId]) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = APP_CONTENT[pageId];
            _domCache[pageId] = wrapper;
        }
        return _domCache[pageId];
    }

    window.appRoutes = {
        navigate: function(pageId, pushState = true) {
            window.currentPageId = pageId;
            // Check if page exists in DB (except dynamic page-profile)
            if (pageId !== 'page-profile' && !APP_CONTENT[pageId]) {
                console.error('Page not found:', pageId);
                return;
            }

            // Không navigate lại trang đang xem
            if (pageId === _currentPageId) return;
            _currentPageId = pageId;

            // Push state to URL
            if (pushState && routeMap[pageId]) {
                window.history.pushState({ pageId: pageId }, '', '/training-hub/' + routeMap[pageId]);
            }

            // Tạm dừng iframe cũ trước khi swap (giải phóng tài nguyên)
            const oldIframes = appContent.querySelectorAll('iframe');
            oldIframes.forEach(function(iframe) { iframe.src = 'about:blank'; });

            // Swap nội dung ngay lập tức (không setTimeout)
            // Trang admin xử lý riêng (render động)
            if (pageId === 'page-admin-emails' && typeof renderAdminEmailPage === 'function') {
                renderAdminEmailPage();
            } else if (pageId === 'page-profile' && typeof renderProfilePage === 'function') {
                renderProfilePage();
            } else {
                const cached = _getOrCreateDOM(pageId);
                if (cached) {
                    // Clone từ cache để không mất node gốc
                    appContent.innerHTML = '';
                    const clone = cached.cloneNode(true);
                    while (clone.firstChild) {
                        appContent.appendChild(clone.firstChild);
                    }
                } else {
                    appContent.innerHTML = APP_CONTENT[pageId];
                    
                    // Append completion card at the bottom if it's a roadmap module
                    const isRoadmapPage = typeof TRAINING_ROADMAP !== 'undefined' && TRAINING_ROADMAP.some(step => step.modules.some(m => m.id === pageId));
                    if (isRoadmapPage) {
                        const compContainer = document.createElement('div');
                        compContainer.id = 'lesson-completion-container';
                        appContent.appendChild(compContainer);
                        if (typeof renderLessonCompletionCard === 'function') {
                            renderLessonCompletionCard(pageId);
                        }
                    }
                }
            }

            // Kích hoạt animation fade-in bằng class (nhanh 120ms qua CSS)
            appContent.classList.remove('content-fade-in');
            void appContent.offsetWidth; // Force reflow để restart animation
            appContent.classList.add('content-fade-in');

            // Khởi tạo gallery nếu cần
            if (pageId === 'page-mau-dang-tin-ao') {
                if (window.mauDangTinAo && typeof window.mauDangTinAo.init === 'function') {
                    window.mauDangTinAo.init();
                }
            }
            
            if (window.lucide) {
                lucide.createIcons();
            }

            // Update Active State on Nav
            navItems.forEach(item => {
                if (item.getAttribute('data-target') === pageId) {
                    item.classList.add('active');
                    // Update Topbar
                    const titleText = item.innerText.replace('HOT', '').replace('NEW', '').trim();
                    topbarTitle.innerText = titleText;
                    topbarBreadcrumb.innerText = titleText;

                    // Tự động mở section chứa item này
                    const section = item.closest('.nav-section');
                    if (section) section.classList.add('open');
                } else {
                    item.classList.remove('active');
                }
            });

            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 900) {
                closeSidebar();
            }

            // Scroll to top
            window.scrollTo(0, 0);
        }
    };

    // ---- Sidebar Toggle Logic ----
    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    hamburgerBtn.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);

    // ---- Event Listeners for Nav ----
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.getAttribute('data-target');
            window.appRoutes.navigate(targetPage, true);
        });
    });

    // ---- Initialize App ----
    // Handle popstate (Back/Forward browser buttons)
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.pageId) {
            window.appRoutes.navigate(e.state.pageId, false);
        } else {
            const currentPath = window.location.pathname.replace(/^\/+/, '');
            const relativePath = currentPath.replace(/^training-hub\/?/, '').replace(/^\/+/, '');
            const pageId = pathMap[relativePath] || 'page-profile';
            window.appRoutes.navigate(pageId, false);
        }
    });

    // Load initial based on URL
    const initialPath = window.location.pathname.replace(/^\/+/, '');
    const relativePath = initialPath.replace(/^training-hub\/?/, '').replace(/^\/+/, '');
    const initialPageId = pathMap[relativePath] || 'page-profile';
    window.appRoutes.navigate(initialPageId, false);
});

// Global helper for switching tabs in "Chọn Kênh Tìm Kiếm"
function switchChonKenhTab(tabId, btn) {
    // Remove active class from all sibling tabs
    const tabContainer = btn.closest('.profile-tabs');
    if (tabContainer) {
        tabContainer.querySelectorAll('.profile-tab').forEach(t => t.classList.remove('active'));
    }
    btn.classList.add('active');

    // Hide all panels under this page
    const pageContainer = btn.closest('.main-content');
    if (pageContainer) {
        pageContainer.querySelectorAll('.profile-tab-panel').forEach(p => p.classList.remove('active'));
        const panel = pageContainer.querySelector('#tab-kenh-' + tabId);
        if (panel) panel.classList.add('active');
    }
}


// ---- LOGIC TRANG BÀI MẪU ĐĂNG TIN ẢO & NGUYÊN LÝ ẨN ----
window.mauDangTinAo = {
    images: [
    "z6996800141960_af5150eefa2535c1c88c4fac39c854d3.jpg",
    "z6996800174836_0175150f386d7ee7794281b04ac852e9.jpg",
    "z6996800207814_3e3ba2dfcc4acef7f2c34bc1570e2e8b.jpg",
    "z6996800238633_9032c595d74424c68c2bb0c09142e02a.jpg",
    "z6996800238666_38662d583ed89ed35acc618b2deb1b8f.jpg",
    "z6996800238667_e6e0aad6fdeccb1b0596bcce4ba5188e.jpg",
    "z6996800253345_bdf938f658bee7e367633a9d3d47f4c4.jpg",
    "z6996800253346_005_9b0643b2b4c48edbbb825a941d55eea7.jpg",
    "z6996800253346_006_f37491219d9a3f455cbe883188fa4923.jpg",
    "z6996800253346_007_50903ac9a1322eb46accfaa966845528.jpg",
    "z6996800253346_008_845dc96ddbe6630875ff4755fa783207.jpg",
    "z6996800253346_7109f1f9c889c81d15b3ac299cb15491.jpg",
    "z7017635913547_002_13514940dd8745d306c8903c138ffa6b.jpg",
    "z7017635913547_003_8c69467aaf357f61183318e063e32db1.jpg",
    "z7111185544295_000_dbe5081fe973f47501c02480734c0455.jpg",
    "z7117909174251_addd8f2321c2246a069ca213a124b752.jpg",
    "z7117965154695_000_a38bec372384a73a25da3a6170470eb2.jpg",
    "z7117965154695_001_1f75aeb5babb22ee8e4b23cddd369bd8.jpg",
    "z7117965154695_002_47f23fa6af56707129a8a0f378fd6b05.jpg",
    "z7117965154695_003_8ceda6ca6ba55a7773aef7a712dd91fb.jpg",
    "z7117965154695_004_f12ecd2e6577918939b399be2310d63b.jpg",
    "z7117965154695_005_649e4ee8a1bed343cc0f444305f9f69d.jpg",
    "z7270598315190_d265127264a31a4913b06c154a485104.jpg",
    "z7275937123786_8dbd3399beb4c6b75ab45c87d72a38fe.jpg",
    "z7295802420435_104ab9dcdacc808990662289d0b90fbf.jpg",
    "z7297376271070_58060bc4336ebdd91e57f917f760aee5.jpg",
    "z7297376272166_085ee037fa2ddfe899f20c70c7ea0af5.jpg",
    "z7372624259403_53ce5ef28a59e066effeff77527d6341.jpg",
    "z7401334589597_0dfc39407e8d66d065f6967097f4f695.jpg",
    "z7435340285259_a5c5b75170e27a2f0fe6fe6053976dd6.jpg",
    "z7435340287855_ce4c8afda4e49bda8bab7034b276aec3.jpg",
    "z7446144873351_b288e0e08bdfb36d0c1ac3877fcc3c2d.jpg",
    "z7446396000688_b47d8dc496bf2ce2bbb3d4bd978e6774.jpg",
    "z7446535446083_c8049e41dfe2563e22e6d156aca950a2.jpg",
    "z7489712159418_401abedc5ff4f03b7a38fa6ac9e29f9a.jpg",
    "z7636275180446_bc28dc0df18b68f0012008fbe2e5545c.jpg",
    "z7636275186131_633f6d9c78e0fe95800bebc23e3d0c46.jpg",
    "z7636275192914_d32cdb3d5c33eaa9d890ace5126689ae.jpg",
    "z7636275197739_09db8126b56d9cabe4ede2426c303876.jpg",
    "z7636275204530_1061fdc172ad9e7240862a514f03aae1.jpg",
    "z7636275210863_7a94fd7ba59f7fdc43b026e5b140b56d.jpg",
    "z7636275216003_9814dbc6938feb58a1fadb2aa68d22f8.jpg",
    "z7636275223123_01fa8f6b02efea106153d373b215720a.jpg",
    "z7636275229094_a3a5f52730394ddf14a5b7a6bfa5d1cb.jpg",
    "z7636275236026_87bec92e326e8a698ded2c7a3c54fe64.jpg",
    "z7636275240189_e1774b4f8d057b2419b6fefa57ed6a92.jpg",
    "z7636275248034_8c5a0f430346e5cf204a2cfa2f40ea1c.jpg",
    "z7636275254301_40c45833c4434de6fd90aa7f768012a0.jpg",
    "z7636275257970_4bef2002eb3661d6bdf552be2f1e8574.jpg",
    "z7636275264973_4146f052c929ad57ae6d6481ee5d4ec7.jpg",
    "z7636275273546_d72b3615fd9df176e750daefe4ae316b.jpg",
    "z7636275278609_8e28253161d2aacd1bea3d370c3cfa39.jpg",
    "z7636275284821_ad2362bf29ba8f416d6c0f778ad2b954.jpg",
    "z7636275290328_68979dbdcc64df0c5eb55c51c9e2b937.jpg",
    "z7636275296534_0fee5ffc3bd117a6310c667d6b560c14.jpg",
    "z7636275301753_df6b57c35b5c9932c98c9ec465fbe1b8.jpg",
    "z7636275308815_002b57dee8233ddb12c0a20fd15518ef.jpg",
    "z7636275313459_9bd9e98ae77abcce5ae2ae388ea69da0.jpg",
    "z7636275318494_c4be893f1429623090497ae3436c7260.jpg",
    "z7636275325444_0e02ef02e8ab1aca559fa9f70f6ec5f1.jpg",
    "z7636275332462_a6082c5796a782dcf6c25c31782b4f68.jpg",
    "z7636275335438_e88c14bb1903fdfb536b672f661bdb26.jpg",
    "z7636275347042_a4bda2f88b39453da156de60eec0ebc2.jpg",
    "z7636275350371_a68e06fa336d291243499d51fc8529be.jpg",
    "z7636275357840_dee87c5164b0573cf1dbb27a8c96cf5a.jpg",
    "z7636275363817_c85aa73c633d6715cd63a657457184fd.jpg",
    "z7636275367939_8b9aff45f4c17373cc319e852cf79969.jpg",
    "z7636275374420_b2fbb5b8cba86255824170208a12f7a9.jpg",
    "z7636275381162_cc78ab51dfd6dbf1841278a66ac7ecc2.jpg",
    "z7636275388723_91b3c62d720ba414d4d6da34e7964cf4.jpg",
    "z7636275393168_348446723e0a143bc842cd22f46c8259.jpg",
    "z7636275400617_8cfcdd7a1f1c2f0e79dde7fd1c795de6.jpg",
    "z7636275407635_6f88756de210daa18969edca12b9904e.jpg",
    "z7636275413095_8ec687ab50d967a9352ccf5615a2e46a.jpg",
    "z7636275417045_e052db9fd6df317d1b538cb79a0044dd.jpg",
    "z7636275425971_1538b963484958ee1e50ae36ed2d30a3.jpg",
    "z7636275430763_8ab93b125a4f935f014cabf1cd5336b4.jpg",
    "z7636275438220_fc60937c03ce75fcadce74dc49376987.jpg",
    "z7636275445380_2c34857062c746acb1f42a7db755930b.jpg",
    "z7636275450147_30f0ad0e4fc2ffd6bb0cd34a49e5224f.jpg",
    "z7636276196866_4fecab9f02b798a92f774ed9d3c65551.jpg",
    "z7636276201393_e3f856684303d45c3661936f02c22db8.jpg",
    "z7636276207246_24b37cd1057b043ab20287bbc34e541a.jpg",
    "z7636276213275_42d482429d5a36f282d7ee310a0cd438.jpg",
    "z7636276448678_22daf4acd8f0e56f094a28f670de2999.jpg",
    "z7636276456303_cbe3fe4764b2daa17c918e5f56623878.jpg",
    "z7636276461611_0bf05adfb824310bea4529dff1db3ac8.jpg",
    "z7636276472567_7f711b8c5ef0cd556beee144d0f30c33.jpg",
    "z7636276475153_91c6d657104e12bb5e013860fb5b78ab.jpg",
    "z7636276481478_ca114aa63890456d3723e3de081be06a.jpg",
    "z7636276488086_96dcf23c922799321bded4a6cea0629d.jpg",
    "z7636276493423_677f6b613478edc78681c9532484e706.jpg",
    "z7636276499103_0c08161953823d33f1feb31ff2c7c74f.jpg",
    "z7636276506188_3bd6a560b2c69ffc485ac87453e4f336.jpg",
    "z7636276512752_d2bf6ee3f6c339e3df08969e165729e0.jpg",
    "z7636276518827_017d9cdc1f3c7dddcc2cf9c973b3888d.jpg",
    "z7636276523563_d4ce79f50c8902c8db8f76e269f5d170.jpg",
    "z7636276530952_e14311a1aef0bba32553b64bc1d53ace.jpg",
    "z7636276536620_dd89630ba10722bf58ad0197ad3cf093.jpg",
    "z7636276542469_a06f2a2e6b1e3fe771d417f3adf1dece.jpg",
    "z7636276547437_1500104ea203d107df3aadf619d3ecab.jpg",
    "z7636276554997_71d9a842dbdff2ad707030ed324a49b6.jpg",
    "z7636276561509_ff42155aecc6d21fc1511b9bb7792743.jpg",
    "z7636276565863_2b5976822c0ec4fdda4ebf5acdee891c.jpg",
    "z7636276571379_61989464d053073adf318c1585a8e083.jpg",
    "z7636276578942_72a67d6c6b44d224a27322c0f06e0731.jpg",
    "z7636276586546_17cba83edb16d39059d9cc01049c6738.jpg",
    "z7636276593046_64919e10015b3ecd046f9a62fd23eb8a.jpg",
    "z7636276598861_f6998c7fcf2c19e95c5114a5aacfc4f3.jpg",
    "z7636276605045_f94d68d0622615d35a4b6db9e2e28985.jpg",
    "z7636276610307_c5faa4f48c1926d39b0739e5ee83929b.jpg",
    "z7636276614776_5f07b418873760d03d5396df0712c636.jpg",
    "z7636276621701_d9a5907a03e621f1b73e03f8fe59d4b0.jpg",
    "z7636276629178_56f298b9e1be859208ee62ed114ff293.jpg",
    "z7636276774016_0bf05adfb824310bea4529dff1db3ac8.jpg",
    "z7636276779078_0c08161953823d33f1feb31ff2c7c74f.jpg",
    "z7636276787243_ca114aa63890456d3723e3de081be06a.jpg",
    "z7636276791133_cbe3fe4764b2daa17c918e5f56623878.jpg",
    "z7636276798439_3bd6a560b2c69ffc485ac87453e4f336.jpg",
    "z7636276803485_7f711b8c5ef0cd556beee144d0f30c33.jpg",
    "z7636276812765_22daf4acd8f0e56f094a28f670de2999.jpg",
    "z7636276817741_d2bf6ee3f6c339e3df08969e165729e0.jpg",
    "z7636276823089_dd89630ba10722bf58ad0197ad3cf093.jpg",
    "z7636276831165_a06f2a2e6b1e3fe771d417f3adf1dece.jpg",
    "z7636276836214_91c6d657104e12bb5e013860fb5b78ab.jpg",
    "z7636276841791_e14311a1aef0bba32553b64bc1d53ace.jpg",
    "z7636276848085_d4ce79f50c8902c8db8f76e269f5d170.jpg",
    "z7636276853591_677f6b613478edc78681c9532484e706.jpg",
    "z7636276857525_f94d68d0622615d35a4b6db9e2e28985.jpg",
    "z7636276865328_72a67d6c6b44d224a27322c0f06e0731.jpg",
    "z7636276870649_1500104ea203d107df3aadf619d3ecab.jpg",
    "z7636276877603_71d9a842dbdff2ad707030ed324a49b6.jpg",
    "z7636276884999_17cba83edb16d39059d9cc01049c6738.jpg",
    "z7636276893510_56f298b9e1be859208ee62ed114ff293.jpg",
    "z7636276895378_d9a5907a03e621f1b73e03f8fe59d4b0.jpg",
    "z7636276902035_c5faa4f48c1926d39b0739e5ee83929b.jpg",
    "z7636276908543_5f07b418873760d03d5396df0712c636.jpg",
    "z7636276914343_61989464d053073adf318c1585a8e083.jpg",
    "z7636276920555_017d9cdc1f3c7dddcc2cf9c973b3888d.jpg",
    "z7636276926817_96dcf23c922799321bded4a6cea0629d.jpg",
    "z7636276932447_2b5976822c0ec4fdda4ebf5acdee891c.jpg",
    "z7636276940538_64919e10015b3ecd046f9a62fd23eb8a.jpg",
    "z7636276946913_f6998c7fcf2c19e95c5114a5aacfc4f3.jpg",
    "z7636276951946_ff42155aecc6d21fc1511b9bb7792743.jpg",
    "z7699405900747_8074dafbc92d6826563d78041d15f07c.jpg",
    "z7699405908003_51fa5b18091abbb229b8cc0fca27dcbb.jpg",
    "z7699405916408_7609bd334d877f0c57de18af23cdf1a1.jpg",
    "z7699405925022_28cd2071ed3ac1aa23056a8cb5e297ad.jpg",
    "z7699405930911_c8f5ba5758e6f5b00954a2bbfeafe133.jpg",
    "z7699405937123_31d2771ede3f4764997800b6d1b6d097.jpg",
    "z7699405944173_4c3ac0cffd8e29b6fb10f0c85c0f20d1.jpg",
    "z7699405952864_435cb9ee086d56099d8d7e477fdf26fd.jpg",
    "z7699406622272_3b48de1736e11e3b0ec0ce0fd15c66c1.jpg",
    "z7699406630248_45993da81e8b9337ee7aba7dd6b67ee4.jpg",
    "z7699406857297_b1ec860f3e1f97fb26cca8866ca0394f.jpg",
    "z7699406868775_c56fa4bd0da10c33d492a7ea66539961.jpg",
    "z7699406873232_89f01d88535bb11e2b733558acbc7872.jpg"
],
    loadedCount: 0,
    pageSize: 12,
    lightboxIndex: 0,
    init: function() {
        this.loadedCount = 0;
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;
        grid.innerHTML = '';
        this.loadMore();
        
        // Thiết lập lightbox nếu chưa có
        if (!document.getElementById('gallery-lightbox')) {
            const lightbox = document.createElement('div');
            lightbox.id = 'gallery-lightbox';
            lightbox.className = 'gallery-lightbox';
            lightbox.innerHTML = `
                <span class="lightbox-close" onclick="window.mauDangTinAo.closeLightbox()">&times;</span>
                <span class="lightbox-prev" onclick="window.mauDangTinAo.prevImage()"><i class="fa-solid fa-chevron-left"></i></span>
                <span class="lightbox-next" onclick="window.mauDangTinAo.nextImage()"><i class="fa-solid fa-chevron-right"></i></span>
                <img class="lightbox-content" id="lightbox-img">
                <div class="lightbox-caption" id="lightbox-caption"></div>
                <a class="lightbox-download" id="lightbox-download" download href=""><i class="fa-solid fa-download"></i> Tải ảnh này</a>
            `;
            document.body.appendChild(lightbox);
            
            // Đóng khi click ngoài ảnh
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    window.mauDangTinAo.closeLightbox();
                }
            });

            // Lắng nghe sự kiện bàn phím (trái/phải/esc)
            window.addEventListener('keydown', function(e) {
                const lb = document.getElementById('gallery-lightbox');
                if (lb && lb.classList.contains('active')) {
                    if (e.key === 'ArrowLeft') {
                        window.mauDangTinAo.prevImage();
                    } else if (e.key === 'ArrowRight') {
                        window.mauDangTinAo.nextImage();
                    } else if (e.key === 'Escape') {
                        window.mauDangTinAo.closeLightbox();
                    }
                }
            });
        }
    },
    loadMore: function() {
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;
        
        const start = this.loadedCount;
        const end = Math.min(start + this.pageSize, this.images.length);
        
        for (let i = start; i < end; i++) {
            const fileName = this.images[i];
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.onclick = (function(index) {
                return function() { window.mauDangTinAo.openLightbox(index); }
            })(i);
            
            card.innerHTML = `
                <div class="gallery-image-wrapper">
                    <img src="assets/anh_khach_ao/${fileName}" loading="lazy" alt="Ảnh mẫu đăng tin">
                </div>
                <div class="gallery-info">
                    <span class="gallery-number">Mẫu đăng tin số ${i + 1}</span>
                    <span class="gallery-tag">Tin Đăng Ảo</span>
                </div>
            `;
            grid.appendChild(card);
        }
        
        this.loadedCount = end;
        
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            if (this.loadedCount >= this.images.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }
        
        const countText = document.getElementById('gallery-count-text');
        if (countText) {
            countText.innerText = `Đang hiển thị ${this.loadedCount} / ${this.images.length} ảnh mẫu thu thập`;
        }
    },
    openLightbox: function(idx) {
        this.lightboxIndex = idx;
        const lightbox = document.getElementById('gallery-lightbox');
        const img = document.getElementById('lightbox-img');
        const caption = document.getElementById('lightbox-caption');
        const download = document.getElementById('lightbox-download');
        if (lightbox && img && caption && download) {
            const fileName = this.images[idx];
            const src = 'assets/anh_khach_ao/' + fileName;
            img.src = src;
            caption.innerText = `Mẫu số ${idx + 1} / ${this.images.length} (Tên ảnh gốc: ${fileName})`;
            download.href = src;
            lightbox.classList.add('active');
        }
    },
    closeLightbox: function() {
        const lightbox = document.getElementById('gallery-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    },
    prevImage: function() {
        let newIdx = this.lightboxIndex - 1;
        if (newIdx < 0) {
            newIdx = this.images.length - 1; // vòng về cuối
        }
        this.openLightbox(newIdx);
    },
    nextImage: function() {
        let newIdx = this.lightboxIndex + 1;
        if (newIdx >= this.images.length) {
            newIdx = 0; // vòng về đầu
        }
        this.openLightbox(newIdx);
    },
    togglePrinciple: function() {
        const modal = document.getElementById('principle-modal');
        if (modal) {
            modal.classList.toggle('active');
        }
    }
};
