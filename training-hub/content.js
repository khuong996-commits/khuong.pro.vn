// Database Ná»™i Dung cÃ¡c KhÃ³a ÄÃ o Táº¡o (HTML Format)
// Giao diá»‡n giá»‘ng DAO_TAO_CHIEN_THUAT_LAI_KHACH.html (card grid + badge + upgrade-box)
const APP_CONTENT = {

    // ---------------------------------------------------------
    // PAGE: QUY TRÃŒNH TÃ‚N BINH (3 PHáº¦N)
    // ---------------------------------------------------------
    'page-tb-loi-noi-dau': `
        <div class="iframe-container-wrapper">
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/TAN_BINH_LOI_NOI_DAU.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,
    'page-tb-quy-che': `
        <div class="iframe-container-wrapper">
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/TAN_BINH_QUY_CHE.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,
    'page-tb-quy-trinh': `
        <div class="iframe-container-wrapper">
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/TAN_BINH_QUY_TRINH.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,
    'page-tinh-hoa-hong': `
        <div class="iframe-container-wrapper">
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/TINH_HOA_HONG.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,
    'page-tb-chon-kenh': `
        <div class="page-title-bar">
            <h1>Chá»n KÃªnh TÃ¬m Kiáº¿m KhÃ¡ch HÃ ng</h1>
            <p class="page-subtitle">XÃ¡c Ä‘á»‹nh vÃ  khai thÃ¡c tá»‘i Æ°u cÃ¡c kÃªnh truyá»n thÃ´ng thu hÃºt khÃ¡ch hÃ ng tiá»m nÄƒng</p>
        </div>

        <!-- Tab control -->
        <div class="profile-tabs" style="margin-bottom: 2rem;">
            <button class="profile-tab active" onclick="switchChonKenhTab('than-quen', this)">
                <i class="fa-solid fa-users-between-lines"></i> 1. KÃªnh ngÆ°á»i thÃ¢n quen
            </button>
            <button class="profile-tab" onclick="switchChonKenhTab('mat-phi', this)">
                <i class="fa-solid fa-credit-card"></i> 2. KÃªnh máº¥t phÃ­
            </button>
            <button class="profile-tab" onclick="switchChonKenhTab('mien-phi', this)">
                <i class="fa-solid fa-gift"></i> 3. KÃªnh miá»…n phÃ­
            </button>
        </div>

        <!-- Tab Panels -->
        <!-- Tab 1: KÃªnh ngÆ°á»i thÃ¢n quen -->
        <div class="profile-tab-panel active" id="tab-kenh-than-quen">
            <div style="margin-bottom: 1.5rem; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 12px; padding: 1rem;">
                <p style="color: var(--text-primary); margin: 0; font-size: 0.95rem; line-height: 1.5;">
                    <i class="fa-solid fa-circle-info" style="color: #2563eb; margin-right: 8px;"></i>
                    <strong>Lá»i khuyÃªn tá»« Sáº¿p KhÆ°Æ¡ng:</strong> Khai thÃ¡c má»‘i quan há»‡ sáºµn cÃ³ (áº¥m vÃ  nÃ³ng) lÃ  kÃªnh cÃ³ tá»‰ lá»‡ chá»‘t giao dá»‹ch cao nháº¥t vÃ  chi phÃ­ tháº¥p nháº¥t dÃ nh cho tÃ¢n binh. HÃ£y Ä‘á»c ká»¹ cáº©m nang dÆ°á»›i Ä‘Ã¢y Ä‘á»ƒ thá»±c hiá»‡n Ä‘Ãºng quy trÃ¬nh sÃ²ng pháº³ng, tinh táº¿.
                </p>
            </div>
            <div class="iframe-container-wrapper">
                <div class="iframe-scroll-container">
                    <iframe src="/training-hub/tai_lieu_khai_thac_mqh.html" class="custom-iframe" loading="lazy"></iframe>
                </div>
            </div>
        </div>

        <!-- Tab 2: KÃªnh máº¥t phÃ­ -->
        <div class="profile-tab-panel" id="tab-kenh-mat-phi">
            <div class="card-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; gap: 24px;">
                <div class="strategy-card vip" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#3b82f6; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">KÃªnh Quáº£ng CÃ¡o Facebook (FB Ads)</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Cháº¡y quáº£ng cÃ¡o tin nháº¯n / tÃ¬m kiáº¿m khÃ¡ch hÃ ng tiá»m nÄƒng</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Tiáº¿p cáº­n hÃ ng chá»¥c ngÃ n khÃ¡ch hÃ ng tiá»m nÄƒng xung quanh khu vá»±c má»¥c tiÃªu hoáº·c cÃ³ sá»Ÿ thÃ­ch Ä‘áº§u tÆ° BÄS báº±ng ngÃ¢n sÃ¡ch hÃ ng ngÃ y. ÄÃ¢y lÃ  kÃªnh chá»§ lá»±c giÃºp táº¡o ra lÆ°á»£ng khÃ¡ch hÃ ng quan tÃ¢m Ä‘á»u Ä‘áº·n.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.15); color: #2563eb; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-circle-play" style="font-size: 1.2rem;"></i>
                        <span>Xem chi tiáº¿t video hÆ°á»›ng dáº«n cháº¡y quáº£ng cÃ¡o thá»±c táº¿ táº¡i má»¥c <a href="#" onclick="window.appRoutes.navigate('page-cam-tay-chi-viec'); return false;" style="font-weight:700; color:#2563eb; text-decoration:underline;">Cáº§m Tay Chá»‰ Viá»‡c</a></span>
                    </div>
                </div>

                <div class="strategy-card safe" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#10b981; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">ÄÄƒng tin VIP cÃ³ phÃ­ trÃªn cá»•ng thÃ´ng tin</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Sá»­ dá»¥ng Batdongsan.com.vn, Chotot.com</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">ÄÄƒng táº£i tin rao bÃ¡n Ä‘áº¥t trá»±c tiáº¿p lÃªn cÃ¡c cá»•ng thÃ´ng tin lá»›n cá»§a Viá»‡t Nam. Cáº§n chuáº©n bá»‹ bÃ i viáº¿t chuáº©n SEO, tiÃªu Ä‘á» giáº­t tÃ­t kÃ­ch thÃ­ch tÃ² mÃ² vÃ  hÃ¬nh áº£nh thá»±c táº¿ báº¯t máº¯t Ä‘á»ƒ tá»‘i Æ°u hÃ³a lÆ°á»£ng click.</p>
                </div>

                <div class="strategy-card warn" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#f59e0b; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">Khai thÃ¡c Data / TeleSale trá»±c tiáº¿p</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Gom tá»‡p sá»‘ Ä‘iá»‡n thoáº¡i khÃ¡ch hÃ ng tiá»m nÄƒng</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Gá»i Ä‘iá»‡n trá»±c tiáº¿p giá»›i thiá»‡u dá»± Ã¡n dá»±a trÃªn danh sÃ¡ch sá»‘ Ä‘iá»‡n thoáº¡i tiá»m nÄƒng cÃ³ sáºµn. ÄÃ¢y lÃ  kÃªnh Ä‘Ã²i há»i sá»± kiÃªn trÃ¬ cao, giá»ng nÃ³i truyá»n cáº£m vÃ  ká»‹ch báº£n xá»­ lÃ½ tá»« chá»‘i sáº¯c bÃ©n.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(245,158,11,0.05); border: 1px solid rgba(245,158,11,0.15); color: #d97706; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-phone-volume" style="font-size: 1.2rem;"></i>
                        <span>Xem ká»‹ch báº£n gá»i Ä‘iá»‡n chá»‘t khÃ¡ch táº¡i má»¥c <a href="#" onclick="window.appRoutes.navigate('page-telesale'); return false;" style="font-weight:700; color:#d97706; text-decoration:underline;">TeleSale</a></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab 3: KÃªnh miá»…n phÃ­ -->
        <div class="profile-tab-panel" id="tab-kenh-mien-phi">
            <div class="card-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; gap: 24px;">
                <div class="strategy-card safe" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#10b981; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">KÃªnh Video Ngáº¯n (TikTok / FB Reels / YT Shorts)</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Táº¡o video thá»±c Ä‘á»‹a, chia sáº» kiáº¿n thá»©c Ä‘áº§u tÆ°</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">XÃ¢y dá»±ng kÃªnh cÃ¡ nhÃ¢n chia sáº» hÃ¬nh áº£nh Ä‘áº¥t Ä‘ai thá»±c táº¿, nháº­n Ä‘á»‹nh thá»‹ trÆ°á»ng hoáº·c cÃ¡c máº¹o Ä‘áº§u tÆ°. Video ngáº¯n cÃ³ kháº£ nÄƒng phÃ¢n phá»‘i lan truyá»n cá»±c máº¡nh mÃ  khÃ´ng tá»‘n chi phÃ­ quáº£ng cÃ¡o.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.15); color: #059669; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-circle-play" style="font-size: 1.2rem;"></i>
                        <span>Xem video hÆ°á»›ng dáº«n xÃ¢y kÃªnh vÃ  Ä‘Äƒng TikTok táº¡i má»¥c <a href="#" onclick="window.appRoutes.navigate('page-cam-tay-chi-viec'); return false;" style="font-weight:700; color:#059669; text-decoration:underline;">Cáº§m Tay Chá»‰ Viá»‡c</a></span>
                    </div>
                </div>

                <div class="strategy-card vip" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#3b82f6; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">ÄÄƒng tin tháº£o luáº­n / ÄÄƒng tin lÃ¡i khÃ¡ch trong Group Facebook</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Táº­n dá»¥ng cÃ¡c há»™i nhÃ³m cá»™ng Ä‘á»“ng hÃ ng trÄƒm ngÃ n thÃ nh viÃªn</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">ÄÄƒng cÃ¡c bÃ i tháº£o luáº­n, bÃ i chia sáº» áº£o thu hÃºt tÆ°Æ¡ng tÃ¡c cá»§a cÃ¡c nhÃ  Ä‘áº§u tÆ° trong cÃ¡c Group BÄS lá»›n Ä‘á»ƒ kÃ©o káº¿t báº¡n Zalo vÃ  lÃ¡i sang dá»± Ã¡n chÃ­nh.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.15); color: #2563eb; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-book-open" style="font-size: 1.2rem;"></i>
                        <span>Äá»c bÃ­ quyáº¿t ÄÄƒng Tin LÃ¡i KhÃ¡ch táº¡i má»¥c <a href="#" onclick="window.appRoutes.navigate('page-cam-tay-chi-viec'); return false;" style="font-weight:700; color:#2563eb; text-decoration:underline;">Cáº§m Tay Chá»‰ Viá»‡c</a></span>
                    </div>
                </div>

                <div class="strategy-card warn" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#8b5cf6; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">XÃ¢y dá»±ng ThÆ°Æ¡ng hiá»‡u cÃ¡ nhÃ¢n (Facebook / Zalo cÃ¡ nhÃ¢n)</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">ÄÄƒng bÃ i gieo háº¡t, tÆ°Æ¡ng tÃ¡c káº¿t ná»‘i</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">ÄÄƒng táº£i cÃ¡c cÃ¢u chuyá»‡n chá»‘t Ä‘áº¥t thá»±c chiáº¿n, chia sáº» kiáº¿n thá»©c Ä‘áº§u tÆ° lÃªn trang cÃ¡ nhÃ¢n nháº±m xÃ¢y dá»±ng lÃ²ng tin lÃ¢u dÃ i vá»›i báº¡n bÃ¨ vÃ  Ä‘á»‘i tÃ¡c cÅ©.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(139,92,246,0.05); border: 1px solid rgba(139,92,246,0.15); color: #7c3aed; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-graduation-cap" style="font-size: 1.2rem;"></i>
                        <span>Xem bÃ i há»c xÃ¢y thÆ°Æ¡ng hiá»‡u táº¡i má»¥c <a href="#" onclick="window.appRoutes.navigate('page-chien-luoc-fb'); return false;" style="font-weight:700; color:#7c3aed; text-decoration:underline;">Chiáº¿n lÆ°á»£c FB, Zalo</a></span>
                    </div>
                </div>
            </div>
        </div>
    `,


    // ---------------------------------------------------------
    // PAGE: LÃ DO TÄ‚NG GIÃ BÄS (Chi tiáº¿t)
    // ---------------------------------------------------------
    'page-ly-do-tang-gia': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-chart-line"></i> LÃ½ Do TÄƒng GiÃ¡ Cá»§a Báº¥t Äá»™ng Sáº£n</span>
                <a href="LY_DO_TANG_GIA_BDS.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Má»Ÿ toÃ n mÃ n hÃ¬nh
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/LY_DO_TANG_GIA_BDS.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: GIAI ÄOáº N TÄ‚NG GIÃ BÄS (Chi tiáº¿t)
    // ---------------------------------------------------------
    'page-giai-doan-tang-gia': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-chart-line"></i> Nhá»¯ng Giai Äoáº¡n TÄƒng GiÃ¡ Cá»§a Báº¥t Äá»™ng Sáº£n</span>
                <a href="GIAI_DOAN_TANG_GIA_BDS.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Má»Ÿ toÃ n mÃ n hÃ¬nh
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/GIAI_DOAN_TANG_GIA_BDS.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: SO SÃNH CÃC KÃŠNH Äáº¦U TÆ¯ (Chi tiáº¿t)
    // ---------------------------------------------------------
    'page-so-sanh-kenh-dau-tu': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-scale-balanced"></i> So SÃ¡nh CÃ¡c KÃªnh Äáº§u TÆ° & Lá»£i Tháº¿ BÄS</span>
                <a href="SO_SANH_KENH_DAU_TU.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Má»Ÿ toÃ n mÃ n hÃ¬nh
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/SO_SANH_KENH_DAU_TU.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: Báº¢NG HÃ€NG Tá»”NG Há»¢P
    // ---------------------------------------------------------
    'page-bang-hang': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-table-list"></i> Báº£ng HÃ ng Tá»•ng Há»£p</span>
                <a href="/training-hub/BANG_HANG_TL_LAND.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Má»Ÿ toÃ n mÃ n hÃ¬nh
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/BANG_HANG_TL_LAND.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: ÄÃ€O Táº O KIáº¾N THá»¨C Ná»€N
    // ---------------------------------------------------------
    'page-kien-thuc-nen': `
        <div class="page-title-bar">
            <h1>ÄÃ o Táº¡o Kiáº¿n Thá»©c Ná»n</h1>
            <p class="page-subtitle">Hiá»ƒu báº£n cháº¥t thá»‹ trÆ°á»ng â€” Ná»n táº£ng vá»¯ng cháº¯c trÆ°á»›c khi ra tráº­n</p>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto;">

            <div class="strategy-card safe" onclick="window.appRoutes.navigate('page-ly-do-tang-gia', true)" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 30px rgba(56,189,248,0.15)'" onmouseleave="this.style.transform=''; this.style.boxShadow=''">
                <div class="card-badge">ðŸ“ˆ Chá»§ Ä‘á» 1</div>
                <h3>LÃ½ Do TÄƒng GiÃ¡ Cá»§a Báº¥t Äá»™ng Sáº£n</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">PhÃ¢n tÃ­ch sÃ¢u qua tÆ° duy "DÃ²ng Tiá»n" â€” Hiá»ƒu báº£n cháº¥t tháº­t sá»± Ä‘áº±ng sau má»—i Ä‘á»£t tÄƒng giÃ¡ BÄS.</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px; padding: 12px 18px; background: linear-gradient(135deg, rgba(56,189,248,0.1), rgba(167,139,250,0.1)); border-radius: 12px; font-weight: 600; color: var(--accent-blue, #38bdf8); font-size: 0.95rem;">
                    <i class="fa-solid fa-book-open-reader"></i>
                    <span>Báº¥m vÃ o Ä‘á»ƒ xem bÃ i phÃ¢n tÃ­ch chi tiáº¿t</span>
                    <i class="fa-solid fa-arrow-right" style="margin-left: auto;"></i>
                </div>
            </div>

            <div class="strategy-card vip" onclick="window.appRoutes.navigate('page-giai-doan-tang-gia', true)" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 30px rgba(167,139,250,0.15)'" onmouseleave="this.style.transform=''; this.style.boxShadow=''">
                <div class="card-badge">ðŸ“Š Chá»§ Ä‘á» 2</div>
                <h3>Nhá»¯ng Giai Äoáº¡n TÄƒng GiÃ¡ Cá»§a Báº¥t Äá»™ng Sáº£n</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">4 giai Ä‘oáº¡n tÄƒng giÃ¡ â€” tá»« thÃ´ng tin quy hoáº¡ch Ä‘áº¿n dÃ¢n cÆ° láº¥p Ä‘áº§y. Nháº­n diá»‡n rá»§i ro & cÆ¡ há»™i á»Ÿ tá»«ng giai Ä‘oáº¡n.</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px; padding: 12px 18px; background: linear-gradient(135deg, rgba(167,139,250,0.1), rgba(244,114,182,0.1)); border-radius: 12px; font-weight: 600; color: var(--accent-purple, #a78bfa); font-size: 0.95rem;">
                    <i class="fa-solid fa-book-open-reader"></i>
                    <span>Báº¥m vÃ o Ä‘á»ƒ xem bÃ i phÃ¢n tÃ­ch chi tiáº¿t</span>
                    <i class="fa-solid fa-arrow-right" style="margin-left: auto;"></i>
                </div>
            </div>

            <div class="strategy-card warn" onclick="window.appRoutes.navigate('page-so-sanh-kenh-dau-tu', true)" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 30px rgba(244,114,182,0.15)'" onmouseleave="this.style.transform=''; this.style.boxShadow=''">
                <div class="card-badge">âš–ï¸ Chá»§ Ä‘á» 3</div>
                <h3>So SÃ¡nh CÃ¡c KÃªnh Äáº§u TÆ° & Lá»£i Tháº¿ BÄS</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">Chá»©ng khoÃ¡n, vÃ ng, tiáº¿t kiá»‡m, crypto... â€” Báº¥t Ä‘á»™ng sáº£n vÆ°á»£t trá»™i á»Ÿ Ä‘iá»ƒm nÃ o? PhÃ¢n tÃ­ch Æ°u nhÆ°á»£c tá»«ng loáº¡i.</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px; padding: 12px 18px; background: linear-gradient(135deg, rgba(244,114,182,0.1), rgba(245,158,11,0.1)); border-radius: 12px; font-weight: 600; color: var(--accent-orange, #f59e0b); font-size: 0.95rem;">
                    <i class="fa-solid fa-book-open-reader"></i>
                    <span>Báº¥m vÃ o Ä‘á»ƒ xem bÃ i phÃ¢n tÃ­ch chi tiáº¿t</span>
                    <i class="fa-solid fa-arrow-right" style="margin-left: auto;"></i>
                </div>
            </div>

        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: THá»Š TRÆ¯á»œNG ÄANG TRIá»‚N KHAI
    // ---------------------------------------------------------
    
    // ---------------------------------------------------------
    // PAGE: CÃC BÃ€I MáºªU ÄÄ‚NG TIN áº¢O & NGUYÃŠN LÃ áº¨N (Má»›i)
    // ---------------------------------------------------------
    'page-mau-dang-tin-ao': `
        <div class="page-title-bar">
            <h1>
                ThÆ° Viá»‡n BÃ i Máº«u ÄÄƒng Tin áº¢o 
                <span class="principle-trigger-btn" onclick="window.mauDangTinAo.togglePrinciple()" title="Báº¥m vÃ o Ä‘á»ƒ xem NguyÃªn lÃ½ & Chiáº¿n thuáº­t Ä‘Äƒng tin áº©n">
                    <i class="fa-solid fa-key"></i>
                </span>
            </h1>
            <p class="page-subtitle">NhÃ¢n sá»± tá»± nghiÃªn cá»©u, phÃ¢n tÃ­ch hÃ¬nh áº£nh vÃ  Ä‘Ãºc rÃºt lÃ½ do vÃ¬ sao cÃ¡c bÃ i Ä‘Äƒng nÃ y láº¡i hiá»‡u quáº£</p>
        </div>

        <div class="gallery-container">
            <div class="gallery-count-row">
                <span id="gallery-count-text">Äang hiá»ƒn thá»‹ 0 / 0 bÃ i máº«u</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic; display: flex; align-items: center; gap: 5px;">
                    <i class="fa-solid fa-circle-info"></i> Báº¥m vÃ o áº£nh Ä‘á»ƒ phÃ³ng to xem chi tiáº¿t ná»™i dung Ä‘Äƒng tin
                </span>
            </div>
            
            <div class="gallery-grid" id="gallery-grid">
                <!-- Sáº½ Ä‘Æ°á»£c fill Ä‘á»™ng bá»Ÿi JS -->
            </div>

            <div class="gallery-actions" style="text-align: center; margin-top: 30px; margin-bottom: 50px;">
                <button class="load-more-btn" id="load-more-btn" onclick="window.mauDangTinAo.loadMore()">
                    <i class="fa-solid fa-arrows-spin"></i> Xem ThÃªm áº¢nh Máº«u ÄÄƒng Tin
                </button>
            </div>
        </div>

        <!-- MODAL NGUYÃŠN LÃ ÄÄ‚NG TIN áº¨N (Chá»‰ hiá»‡n khi báº¥m vÃ o icon ChÃ¬a KhÃ³a) -->
        <div class="principle-modal" id="principle-modal">
            <div class="principle-modal-content">
                <span class="principle-modal-close" onclick="window.mauDangTinAo.togglePrinciple()">&times;</span>
                
                <div class="principle-header">
                    <div class="principle-icon-wrapper">
                        <i class="fa-solid fa-lightbulb"></i>
                    </div>
                    <h2>NguyÃªn LÃ½ & Chiáº¿n Thuáº­t ÄÄƒng Tin áº¢o Thá»±c Chiáº¿n</h2>
                    <p>TÃ i liá»‡u máº­t dÃ nh riÃªng cho Chiáº¿n binh Sales - Tuyá»‡t Ä‘á»‘i khÃ´ng chia sáº» ra ngoÃ i</p>
                </div>

                <div class="principle-scroll-body">
                    
                    <!-- Pháº§n 1: Má»¥c tiÃªu cá»‘t lÃµi -->
                    <div class="principle-card goal">
                        <h3><i class="fa-solid fa-bullseye"></i> Má»¥c TiÃªu Cá»‘t LÃµi Cá»§a Tin ÄÄƒng áº¢o</h3>
                        <p>Má»¥c tiÃªu duy nháº¥t cá»§a tin áº£o lÃ  <strong>Láº¤Y Báº°NG ÄÆ¯á»¢C LEAD (Há» tÃªn, SÄT/Zalo cá»§a khÃ¡ch hÃ ng cÃ³ tiá»n, cÃ³ nhu cáº§u Ä‘áº§u tÆ° tháº­t)</strong>. Tin áº£o chá»‰ lÃ  "má»“i cÃ¢u". Sau khi cÃ³ sá»‘ khÃ¡ch, Sale dÃ¹ng ká»¹ nÄƒng vÃ  sá»± chÃ¢n thÃ nh Ä‘á»ƒ "báº» lÃ¡i" nhu cáº§u vá» Ä‘Ãºng thá»‹ trÆ°á»ng/sáº£n pháº©m mÃ  cÃ´ng ty Ä‘ang bÃ¡n.</p>
                    </div>

                    <!-- Pháº§n 2: 5 NguyÃªn lÃ½ áº£nh Ä‘Äƒng áº£o -->
                    <div class="principle-section-title">5 NguyÃªn LÃ½ Thiáº¿t Káº¿ áº¢nh ÄÄƒng áº¢o</div>
                    <div class="principle-grid">
                        <div class="principle-mini-card">
                            <span class="p-num">1</span>
                            <h4>ThÃ´ nhÆ° ngÆ°á»i thÆ°á»ng chá»¥p</h4>
                            <p>áº¢nh pháº£i trÃ´ng giá»‘ng ngÆ°á»i dÃ¢n bÃ¬nh thÆ°á»ng cáº§m Ä‘iá»‡n thoáº¡i chá»¥p máº£nh Ä‘áº¥t. Cáº¥m dÃ¹ng áº£nh flycam quÃ¡ Ä‘áº¹p, áº£nh render 3D hay cÃ³ logo cÃ´ng ty. Pháº£i tá»± nhiÃªn, thÃ´ tháº­t.</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">2</span>
                            <h4>Káº¹p Ä‘áº¥t giá»¯a sá»± sáº§m uáº¥t</h4>
                            <p>Äáº¥t trong áº£nh báº¯t buá»™c pháº£i cÃ³ bá»‘i cáº£nh kinh doanh 2 bÃªn: bÃªn quÃ¡n Äƒn Ä‘Ã´ng, bÃªn khÃ¡ch sáº¡n/nhÃ  nghá»‰, táº¡o cáº£m giÃ¡c khu sáº§m uáº¥t kinh doanh Ä‘Æ°á»£c ngay.</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">3</span>
                            <h4>Chá»¯ trÃªn áº£nh = BÃ¡o lÃ¡ cáº£i</h4>
                            <p>ChÃ¨n chá»¯ to, mÃ u Äá» hoáº·c VÃ ng ná»n Ä‘á» Ä‘á»ƒ giáº­t máº¯t khi khÃ¡ch lÆ°á»›t nhanh Facebook. GÃ¢y tÃ² mÃ² cá»±c Ä‘á»™ nhÆ°ng áº©n vá»‹ trÃ­ chÃ­nh xÃ¡c (vÃ­ dá»¥: "Äáº¤T BIá»‚N Cáº®T Lá»– SÃ‚U").</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">4</span>
                            <h4>MÅ©i tÃªn Ä‘á» dáº«n lá»‘i</h4>
                            <p>Váº½ mÅ©i tÃªn chá»‰ hÆ°á»›ng Ä‘i ra cÃ¡c tiá»‡n Ã­ch (nhÆ° bÃ£i táº¯m, KCN, chá»£) kÃ¨m khoáº£ng cÃ¡ch cá»¥ thá»ƒ "âž¡ 200m ra biá»ƒn". Tuyá»‡t Ä‘á»‘i khÃ´ng ghi tÃªn xÃ£/huyá»‡n/tá»‰nh cá»¥ thá»ƒ.</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">5</span>
                            <h4>KÃ­ch thÆ°á»›c = Báº±ng chá»©ng tháº­t</h4>
                            <p>Váº½ váº¡ch Ä‘o Ä‘á» ghi kÃ­ch thÆ°á»›c rÃµ rÃ ng (vÃ­ dá»¥: "â†” 6m x 15m (90mÂ²)") Ä‘á»ƒ táº¡o cáº£m giÃ¡c chá»§ nhÃ  Ä‘Ã£ Ä‘o sáºµn Ä‘áº¥t, táº¡o niá»m tin máº£nh Ä‘áº¥t cÃ³ thá»±c.</p>
                        </div>
                    </div>

                    <div class="principle-card rule-box">
                        <h4><i class="fa-solid fa-triangle-exclamation"></i> Quy Táº¯c VÃ ng áº¨n Äá»‹a Danh</h4>
                        <p><strong>Tuyá»‡t Ä‘á»‘i khÃ´ng bao giá»</strong> ghi tÃªn cÃ¡c Ä‘á»‹a danh cá»¥ thá»ƒ (nhÆ° Ninh CÆ¡, Háº£i XuÃ¢n, Háº£i Háº­u, Nam Äá»‹nh) trÃªn áº£nh Ä‘Äƒng áº£o. Thay tháº¿ báº±ng cÃ¡c tá»« khÃ³a chung chung kÃ­ch thÃ­ch nhu cáº§u:</p>
                        <table class="principle-table">
                            <thead>
                                <tr>
                                    <th>KHÃ”NG ghi Ä‘á»‹a danh cá»¥ thá»ƒ âœ—</th>
                                    <th>GHI tá»« khÃ³a thay tháº¿ âœ“</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Äáº¥t Háº£i XuÃ¢n, Háº£i Háº­u</td>
                                    <td><strong>Äáº¤T DU Lá»ŠCH BIá»‚N</strong></td>
                                </tr>
                                <tr>
                                    <td>Ninh CÆ¡, Nam Äá»‹nh</td>
                                    <td><strong>SÃT KHU KINH Táº¾ BIá»‚N TRá»ŒNG ÄIá»‚M</strong></td>
                                </tr>
                                <tr>
                                    <td>XÃ£ Háº£i XuÃ¢n</td>
                                    <td><strong>KINH DOANH KHÃCH Sáº N VEN BIá»‚N</strong></td>
                                </tr>
                                <tr>
                                    <td>Gáº§n bÃ£i táº¯m Háº£i Háº­u</td>
                                    <td><strong>VÃ€I BÆ¯á»šC CHÃ‚N RA BIá»‚N</strong></td>
                                </tr>
                                <tr>
                                    <td>Cáº¡nh KCN Ráº¡ng ÄÃ´ng</td>
                                    <td><strong>SÃT KCN Lá»šN ÄANG TRIá»‚N KHAI</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pháº§n 3: Chiáº¿n thuáº­t lÃ¡i khÃ¡ch -->
                    <div class="principle-section-title">Chiáº¿n Thuáº­t Báº» LÃ¡i KhÃ¡ch HÃ ng (Táº­p Trung)</div>
                    
                    <div class="strategy-list">
                        <div class="strategy-item priority">
                            <div class="strat-badge">NÃ©t Nháº¥t</div>
                            <h5>Chiáº¿n thuáº­t "Táº­p tuyá»ƒn táº­p Lead" & Telesale gá»i láº¡i</h5>
                            <p>ÄÄƒng tin áº£o ná»™i Ä‘Ã´ cá»±c ráº». KhÃ¡ch nháº¯n tin/gá»i Ä‘iá»‡n há»i -> Xin sá»‘ Ä‘iá»‡n thoáº¡i Zalo -> Bá» lÆ¡ vÃ i ngÃ y. Sau Ä‘Ã³, Telesale gá»i láº¡i chÃ o má»i bÃ i báº£n: <em>"Dáº¡ em tháº¥y anh Ä‘ang quan tÃ¢m Ä‘áº§u tÆ°, lÃ´ ná»™i Ä‘Ã´ Ä‘Ã³ táº¡m ngÆ°ng giao dá»‹ch nhÆ°ng bÃªn em Ä‘ang cÃ³ sÃ³ng ráº¥t tá»‘t á»Ÿ thá»‹ trÆ°á»ng Ä‘áº¥t biá»ƒn tiá»m nÄƒng..."</em></p>
                        </div>

                        <div class="strategy-item priority">
                            <div class="strat-badge">NÃ©t Nháº¥t</div>
                            <h5>Chiáº¿n thuáº­t "Marketing Ä‘Äƒng nháº§m"</h5>
                            <p>Khi khÃ¡ch há»i vá» lÃ´ Ä‘áº¥t áº£o, nÃ³i tháº³ng tháº­t thÃ : <em>"Dáº¡ em xin lá»—i anh, báº¡n thá»±c táº­p lá»¡ tay up nháº§m áº£nh ná»™i Ä‘Ã´. NhÆ°ng thÃ´ng tin lÃ´ Ä‘áº¥t/dÃ²ng tiá»n ráº» lÃ  tháº­t 100%. Em má»i anh ly cÃ  phÃª em tÆ° váº¥n ká»¹ hÆ¡n vá» cÆ¡ há»™i Ä‘áº§u tÆ° nÃ y..."</em></p>
                        </div>

                        <div class="strategy-item priority">
                            <div class="strat-badge">NÃ©t Nháº¥t</div>
                            <h5>Chiáº¿n thuáº­t "Giá»ng Ä‘iá»‡u ChuyÃªn Gia Cáº£nh BÃ¡o"</h5>
                            <p>XÃ¡c nháº­n lÃ  cÃ³ lÃ´ Ä‘áº¥t Ä‘Ã³, nhÆ°ng khuyÃªn ngÄƒn khÃ¡ch mua vÃ¬ lÃ½ do xáº¥u: <em>"LÃ´ nÃ y ráº» tháº­t nhÆ°ng Ä‘áº¥t cÃ¢y lÃ¢u nÄƒm/dÃ­nh quy hoáº¡ch nháº¹ anh áº¡. Em khuyÃªn tháº­t khÃ´ng nÃªn Ä‘áº§u tÆ°. CÃ¹ng táº§m tiá»n Ä‘Ã³ anh láº¥y sang con nÃ y phÃ¡p lÃ½ an toÃ n hÆ¡n..."</em> -> XÃ¢y dá»±ng uy tÃ­n Sale cÃ³ tÃ¢m rá»“i lÃ¡i sang hÃ ng tháº­t.</p>
                        </div>

                        <div class="strategy-item info">
                            <div class="strat-badge warning">An ToÃ n</div>
                            <h5>Chiáº¿n thuáº­t "Báº£ng hÃ ng quÃ¡ khá»©" lÃ m má»“i</h5>
                            <p>ÄÄƒng dá»± Ã¡n cÅ© cá»±c Ä‘áº¹p, giÃ¡ cá»±c tá»‘t (Ä‘Ã£ bÃ¡n háº¿t). KhÃ¡ch há»i -> Gá»­i báº£ng hÃ ng gáº¡ch Ä‘á» Ä‘Ã£ bÃ¡n sáº¡ch, chá»‰ chá»«a 1-2 lÃ´ xáº¥u/tÃ¬ váº¿t. Má»i khÃ¡ch Ä‘i xem lÃ´ xáº¥u Ä‘Ã³. Äáº¿n ngÃ y Ä‘i xem thÃ¬ bÃ¡o lÃ´ Ä‘Ã³ vá»«a cá»c máº¥t, tiá»‡n Ä‘Æ°á»ng lÃ¡i sang dá»± Ã¡n tháº­t cá»§a cÃ´ng ty cÃ³ cÃ¹ng táº§m giÃ¡.</p>
                        </div>

                        <div class="strategy-item info">
                            <div class="strat-badge warning">An ToÃ n</div>
                            <h5>Chiáº¿n thuáº­t "Báº«y SÆ°Æ¡ng MÃ¹ Vá»‹ TrÃ­"</h5>
                            <p>Viáº¿t mÃ´ táº£ tiá»‡n Ã­ch ráº¥t chi tiáº¿t nhÆ°ng tuyá»‡t Ä‘á»‘i giáº¥u Ä‘á»‹a danh cá»¥ thá»ƒ (chá»‰ ghi 200m ra biá»ƒn, cáº¡nh KCN), tháº£ vÃ o group Ä‘á»‹a phÆ°Æ¡ng. Sá»± cá»¥t thÃ´ng tin báº¯t buá»™c khÃ¡ch pháº£i comment/inbox há»i vá»‹ trÃ­ -> Thu tháº­p lead tá»± nhiÃªn.</p>
                        </div>
                    </div>

                    <div class="principle-card warning-box-dark">
                        <h4><i class="fa-solid fa-circle-exclamation"></i> Lá»i khuyÃªn cuá»‘i cÃ¹ng tá»« Sáº¿p KhÆ°Æ¡ng</h4>
                        <p><em>"Nhá»› ká»¹: áº¢nh chá»‰ lÃ  má»“i nhá»­. KhÃ´ng cáº§n áº£nh Ä‘áº¹p lung linh, cáº§n áº£nh táº¡o sá»± tÃ² mÃ² vÃ  cáº£m giÃ¡c THáº¬T Ä‘á»ƒ khÃ¡ch pháº£i báº¥m nÃºt nháº¯n tin há»i thÄƒm. Sá»± kiÃªn trÃ¬ bÃ¡m Ä‘uá»•i vÃ  báº» lÃ¡i khÃ©o lÃ©o sau Ä‘Ã³ má»›i quyáº¿t Ä‘á»‹nh 90% sá»± thÃ nh báº¡i."</em></p>
                    </div>

                </div>
            </div>
        </div>
    `,

'page-thi-truong': `
        <div class="page-title-bar">
            <h1>Thá»‹ TrÆ°á»ng CÃ´ng Ty Äang Triá»ƒn Khai</h1>
            <p class="page-subtitle">Tá»•ng há»£p tÃ i liá»‡u, báº£n Ä‘á»“ vÃ  video Ä‘Ã o táº¡o theo tá»«ng thá»‹ trÆ°á»ng</p>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr; max-width: 1000px; margin: 0 auto; gap: 28px;">

            <!-- HÃ²a Láº¡c -->
            <div class="strategy-card vip">
                <div class="card-badge">ðŸ”ï¸ Thá»‹ trÆ°á»ng 1</div>
                <h3 style="margin-bottom: 12px;">HoÃ  Láº¡c</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Äáº¥t ná»n cÃ´ng nghá»‡ cao, Ä‘Ã³n sÃ³ng háº¡ táº§ng vÃ  Ä‘áº¡i há»c quá»‘c gia.</p>
                
                <!-- Grid Video ÄÃ o Táº¡o Báº£n Äá»“ HÃ²a Láº¡c -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sáº» báº£n Ä‘á»“ HoÃ  Láº¡c
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ HoÃ  Láº¡c
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/jStHU1-FzpQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SÆ¡n TÃ¢y -->
            <div class="strategy-card safe">
                <div class="card-badge">ðŸ¯ Thá»‹ trÆ°á»ng 2</div>
                <h3 style="margin-bottom: 12px;">SÆ¡n TÃ¢y</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">PhÃ¡t triá»ƒn máº¡nh vá» báº¥t Ä‘á»™ng sáº£n sinh thÃ¡i, nghá»‰ dÆ°á»¡ng ngoáº¡i Ã´ HÃ  Ná»™i.</p>
                
                <!-- NÃºt tÃ i liá»‡u SÆ¡n TÃ¢y -->
                <div class="ql-resources-buttons" style="display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0 30px 0;">
                    <a href="https://xuankhanh-sales-avcdjt.netlify.app/" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-globe"></i> toÃ n bá»™ thá»‹ trÆ°á»ng SÆ¡n TÃ¢y
                    </a>
                </div>

                <!-- Grid Video ÄÃ o Táº¡o Báº£n Äá»“ SÆ¡n TÃ¢y -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sáº» báº£n Ä‘á»“ SÆ¡n TÃ¢y
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ SÆ¡n TÃ¢y
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/ScBckm2pBlU" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quáº¥t LÃ¢m -->
            <div class="strategy-card warn">
                <div class="card-badge">ðŸ–ï¸ Thá»‹ trÆ°á»ng 3</div>
                <h3 style="margin-bottom: 12px;">Quáº¥t LÃ¢m</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">ÄÃ³n Ä‘áº§u quy hoáº¡ch phÃ¡t triá»ƒn du lá»‹ch biá»ƒn, báº¥t Ä‘á»™ng sáº£n nghá»‰ dÆ°á»¡ng tiá»m nÄƒng.</p>
                <!-- 4 NÃºt TÃ i Liá»‡u sáº¿p gá»­i -->
                <div class="ql-resources-buttons" style="display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0 30px 0;">
                    <a href="https://zalo.me/g/lzmqxo830" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-image"></i> HÃ¬nh áº£nh â€“ TÃ i liá»‡u â€“ Video Quáº¥t LÃ¢m
                    </a>
                    <a href="https://docs.google.com/document/d/1SctCIsFawNmHt6_REmsonsYbDoZPrK_18dt-aB2o2NU/edit?tab=t.0" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-file-contract"></i> Táº¡i sao nÃªn Ä‘áº§u tÆ° Quáº¥t LÃ¢m
                    </a>
                    <a href="https://bom.so/zolvMS" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-person-chalkboard"></i> Slide Ä‘Ã o táº¡o Quáº¥t LÃ¢m
                    </a>
                    <a href="https://bom.so/OV5YDG" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-camera"></i> áº¢nh tháº­t Quáº¥t LÃ¢m
                    </a>
                </div>

                <!-- Grid Video ÄÃ o Táº¡o Báº£n Äá»“ -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sáº» báº£n Ä‘á»“ Quáº¥t LÃ¢m
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <!-- Video 1 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ Quáº¥t LÃ¢m (Pháº§n 1)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/YE-BbQ0xqnY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 2 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ Quáº¥t LÃ¢m (Pháº§n 2)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/alBjvqprOOc" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 3 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ Quáº¥t LÃ¢m (Pháº§n 3)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/mTdfic4HPFs" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 4 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ Quáº¥t LÃ¢m (Pháº§n 4)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/E7S0jdGm9LY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 5 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ Quáº¥t LÃ¢m (Pháº§n 5)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/scD4CnTU7lc" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 6 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ Quáº¥t LÃ¢m (Pháº§n 6)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/VwhYhCJVSt4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ninh CÆ¡ -->
            <div class="strategy-card danger">
                <div class="card-badge">ðŸ“ Thá»‹ trÆ°á»ng 4</div>
                <h3 style="margin-bottom: 10px;">Ninh CÆ¡</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Há»‡ thá»‘ng bÃ i giáº£ng báº£n Ä‘á»“ chuyÃªn sÃ¢u, video thá»±c táº¿ vÃ  tÃ i liá»‡u há»— trá»£ bÃ¡n hÃ ng Ninh CÆ¡.</p>

                <!-- Grid Video 1: 2 Video Ä‘Ã o táº¡o báº£n Ä‘á»“ chÃ­nh -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 30px;">
                    <!-- Video Sáº¿p Huy -->
                    <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                        <div style="font-weight: 700; color: #ef4444; margin-bottom: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-circle-play" style="font-size: 1.1rem;"></i> ÄÃ o táº¡o báº£n Ä‘á»“ Ninh CÆ¡ â€” Sáº¿p Huy Otis
                        </div>
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <iframe src="https://www.youtube.com/embed/bfqJ0uO8l-I" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                        </div>
                    </div>

                    <!-- Video Báº£n Ä‘á»“ -->
                    <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                        <div style="font-weight: 700; color: #ef4444; margin-bottom: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-map" style="font-size: 1.1rem;"></i> ÄÃ o táº¡o báº£n Ä‘á»“ Ninh CÆ¡ (Chi tiáº¿t)
                        </div>
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <iframe src="https://www.youtube.com/embed/WKd_SORPVfQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <!-- Grid Video 2: Chuá»—i video Tráº§n TuyÃªn -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 30px;">
                    <h4 style="font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-film" style="color: #6366f1;"></i> Chuá»—i bÃ i giáº£ng Báº£n Ä‘á»“ Ninh CÆ¡ â€” Tráº§n TuyÃªn
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                        <!-- Táº­p 1 -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Pháº§n 1</span> Báº£n Ä‘á»“
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/ikyEAwAYxqk" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Táº­p 2 -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Pháº§n 2</span> Báº£n Ä‘á»“
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/vHy-sbt1HsA" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Táº­p 3 -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Pháº§n 3</span> Báº£n Ä‘á»“
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/U6w3ezwo4mQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Short -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Short</span> Video ngáº¯n
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/Kwq8WG9lTys" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Banner NhÃ³m Zalo Ninh CÆ¡ Ä‘á»™c láº­p -->
                <a href="https://zalo.me/g/aouere171" target="_blank" style="display: flex; align-items: center; gap: 16px; background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(14, 165, 233, 0.02)); border: 1px solid rgba(14, 165, 233, 0.25); border-radius: 16px; padding: 16px 20px; text-decoration: none; color: inherit; transition: all 0.2s ease; box-shadow: var(--shadow-sm); cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='rgba(14, 165, 233, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='rgba(14, 165, 233, 0.25)';">
                    <div style="background: #0ea5e9; color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(14, 165, 233, 0.2);">
                        <i class="fa-solid fa-people-group" style="font-size: 1.25rem;"></i>
                    </div>
                    <div style="flex-grow: 1;">
                        <strong style="color: #0369a1; font-size: 1rem; display: block; margin-bottom: 4px;">NhÃ³m tÃ i liá»‡u Zalo â€” Thá»‹ trÆ°á»ng Ninh CÆ¡</strong>
                        <span style="font-size: 0.85rem; color: #64748b;">NÆ¡i cáº­p nháº­t thÃ´ng tin dá»± Ã¡n, phÃ¡p lÃ½ vÃ  báº£n Ä‘á»“ quy hoáº¡ch Ninh CÆ¡ má»›i nháº¥t. Báº¥m Ä‘á»ƒ tham gia!</span>
                    </div>
                    <div style="color: #0ea5e9; font-size: 1.1rem; padding-left: 8px;">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </a>
            </div>

            <!-- PhÃº Thá» -->
            <div class="strategy-card safe">
                <div class="card-badge">ðŸ”ï¸ Thá»‹ trÆ°á»ng 5</div>
                <h3 style="margin-bottom: 12px;">PhÃº Thá»</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Äáº¥t ná»n khu cÃ´ng nghiá»‡p, tiá»m nÄƒng tÄƒng trÆ°á»Ÿng vÃ¹ng trung du.</p>
                
                <!-- Grid Video ÄÃ o Táº¡o Báº£n Äá»“ PhÃº Thá» -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sáº» báº£n Ä‘á»“ PhÃº Thá»
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ PhÃº Thá»
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/w-Jw2ObEIx0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Háº£i PhÃ²ng -->
            <div class="strategy-card vip">
                <div class="card-badge">âš“ Thá»‹ trÆ°á»ng 6</div>
                <h3 style="margin-bottom: 12px;">Háº£i PhÃ²ng</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">ThÃ nh phá»‘ cáº£ng cÃ´ng nghiá»‡p, báº¥t Ä‘á»™ng sáº£n ven Ä‘Ã´ vÃ  khu cÃ´ng nghiá»‡p lá»›n.</p>
                
                <!-- Grid Video ÄÃ o Táº¡o Báº£n Äá»“ Háº£i PhÃ²ng -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sáº» báº£n Ä‘á»“ Háº£i PhÃ²ng
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sáº» báº£n Ä‘á»“ Háº£i PhÃ²ng
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/kmqUoGOmXAI" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    `,


    // ---------------------------------------------------------
    // PAGE: CÃ‚U Há»ŽI TRUY Váº¤N
    // ---------------------------------------------------------
    'page-telesale': `
        <div class="page-title-bar">
            <h1>TeleSale</h1>
            <p class="page-subtitle">Ká»¹ nÄƒng gá»i Ä‘iá»‡n vÃ  xá»­ lÃ½ tá»« chá»‘i Ä‘á»‰nh cao</p>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2rem;">
            <h2 style="color: var(--accent-blue); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">1. BÃ i tÆ° váº¥n BÄS tá»•ng quan</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/Lu8638blARo" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <a href="TU_VAN_BDS_TONG_QUAN.html" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-blue); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                    <i class="fa-solid fa-file-lines"></i> Báº¥m vÃ o Ä‘Ã¢y Ä‘á»ƒ xem vÄƒn báº£n
                </a>
            </div>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-pink); margin-top: 2rem;">
            <h2 style="color: var(--accent-pink); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">2. 05 CÃ¢u Há»i Truy Váº¥n</h2>
            
            <details style="margin-bottom: 2rem; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); overflow: hidden;">
                <summary style="padding: 1.2rem 1.5rem; font-weight: 700; font-size: 1.2rem; cursor: pointer; color: var(--text-primary); outline: none; list-style: none;">
                    <i class="fa-solid fa-headset" style="color: var(--accent-pink); margin-right: 10px;"></i> Äá»c vá»‹ lÃµi khÃ¡ch hÃ ng (Báº¥m Ä‘á»ƒ xem)
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid var(--border-glass); background: var(--bg-primary);">
                    <div class="core-principle" style="border-left-color: #f472b6;">
                        <h2 style="color: #f472b6;">ðŸ”Ž KhÃ´ng CÃ³ CÃ¢u Há»i Thá»«a</h2>
                        <p>Há»i khÃ´ng pháº£i Ä‘á»ƒ nghe tráº£ lá»i cho vui. Há»i Ä‘á»ƒ <strong>QuÃ©t vÃ­ tiá»n</strong>, <strong>Nháº­n diá»‡n táº¥m chiáº¿u má»›i</strong> vÃ  <strong>ÄÃ³ng khung ká»‹ch báº£n lÃ¡i khÃ¡ch</strong>.</p>
                    </div>

                    <div class="grid-container single-col" style="margin-top: 1rem;">
                        <!-- CÃ¢u 1 -->
                        <div class="card vip">
                            <div class="badge">CÃ¢u 1: Äo LÆ°á»ng Nhu Cáº§u</div>
                            <h3>"Äá»£t nÃ y anh mua Ä‘á»ƒ sá»­ dá»¥ng luÃ´n hay Ä‘áº§u tÆ°?"</h3>
                            <div class="content-group">
                                <strong>Äá»c vá»‹</strong>
                                <p><b>Mua Äá»ƒ á»ž (An cÆ°):</b> CÆ¡ báº£n lÃ  cá»±c khÃ³ bÃ¡n Ä‘áº¥t dá»± Ã¡n vÃ¹ng ven. Trá»« phi Sale Ä‘á»§ Ä‘áº³ng cáº¥p báº» lÃ¡i tÆ° duy khÃ¡ch sang "Äáº§u tÆ° sinh lá»i trÆ°á»›c - mai má»‘t dÆ° tiá»n mua máº£nh to Ä‘áº¹p mÃ  á»ž".</p>
                            </div>
                            <div class="content-group">
                                <p><b>Mua Äáº§u TÆ°:</b> Táº­p trung nhá»“i nhÃ©t quy hoáº¡ch, biÃªn Ä‘á»™ tÄƒng lÃ£i. Bá» qua cÃ¡c váº¥n Ä‘á» vá»¥n váº·t trÆ°á»ng máº§m non, chá»£ bÃºa.</p>
                            </div>
                        </div>

                        <!-- CÃ¢u 2 -->
                        <div class="card safe">
                            <div class="badge">CÃ¢u 2: Khoanh VÃ¹ng Vá»‹ TrÃ­ & ÄÃ²n Báº©y</div>
                            <h3>"TÃ i chÃ­nh hiá»‡n táº¡i anh Ä‘ang cÃ³ sáºµn khoáº£ng bao nhiÃªu?"</h3>
                            <div class="content-group">
                                <strong>Äá»c vá»‹</strong>
                                <p><b>VÃ­ má»ng vÃ i trÄƒm triá»‡u:</b> LÃ¡i tháº³ng hÆ°á»›ng vá» PhÃº Thá», Ba VÃ¬...</p>
                            </div>
                            <div class="content-group">
                                <p><b>BÃ i kÃ­ch Bank Ä‘Ã²n báº©y:</b> KhÃ©o lÃ©o gá»£i Ã½ khÃ¡ch vay thÃªm Bank Ä‘á»ƒ "vá»›i" tá»›i lÃ´ siÃªu pháº©m á»Ÿ Ninh CÆ¡/Quá»‘c Lá»™. Náº¿u KhÃ´ng Vay â†’ Ã‰p hÆ°á»›ng rá»• ráº». Náº¿u chá»‹u Vay â†’ Dáº«n khu Ä‘áº¯t tiá»n quy hoáº¡ch má»›i.</p>
                            </div>
                        </div>

                        <!-- CÃ¢u 3 -->
                        <div class="card warn">
                            <div class="badge">CÃ¢u 3: Äá»‹nh HÃ¬nh Thá»£ Check GiÃ¡</div>
                            <h3>"Anh Ä‘Ã£ biáº¿t vá» thá»‹ trÆ°á»ng em Ä‘á»‹nh chia sáº» chÆ°a?"</h3>
                            <div class="content-group">
                                <strong>Äá»c vá»‹</strong>
                                <p><b>KhÃ¡ch ÄÃ£ Biáº¿t:</b> Äi rÃ o quanh tham kháº£o (Check giÃ¡). Cháº¯c cháº¯n Ä‘Ã£ cÃ³ sale khÃ¡c bÆ¡m vÃ o rá»“i nhÆ°ng chÆ°a Æ°ng nÃªn lÃ¹ng thÃªm.</p>
                            </div>
                            <div class="content-group">
                                <p><b>KhÃ¡ch ChÆ°a Biáº¿t:</b> Máº£nh Ä‘áº¥t trá»‘ng cho Sale quáº©y. Váº½ tiá»m nÄƒng quy mÃ´ vÄ© mÃ´ Ä‘á»ƒ táº©y nÃ£o.</p>
                            </div>
                        </div>

                        <!-- CÃ¢u 4 -->
                        <div class="card danger">
                            <div class="badge">CÃ¢u 4: Bá»™ Lá»c VÃ¹ng Miá»n (Quan Trá»ng)</div>
                            <h3>"Hiá»‡n nhÃ  anh Ä‘ang sinh sá»‘ng á»Ÿ khu vá»±c nÃ o?"</h3>
                            <div class="content-group">
                                <strong>Äá»c vá»‹</strong>
                                <p style="color: #f87171;"><b>âŒ [Táº CH] KhÃ¡ch Äá»‹a PhÆ°Æ¡ng:</b> NhÃ  á»Ÿ Ä‘Ã³ khÃ´ng bao giá» thÃ­ch báº­p vÃ o Ä‘áº¥t dá»± Ã¡n phÃ¢n lÃ´ cháº» nhá». TÆ° duy há» thÃ­ch mua hÃ ng xÃ³m ngá»™p, dáº¯t tá»›i dá»± Ã¡n chá»‰ Ä‘á»ƒ ngáº¯m, cÆ¡ báº£n táº¡ch.</p>
                            </div>
                            <div class="content-group">
                                <p style="color: #34d399;"><b>âœ… [SIÃŠU NÃ‰T] DÃ¢n VÃ¹ng Sá»‘t PhÃ¬nh (VD: HÃ²a Láº¡c):</b> ÄÃ£ chá»©ng kiáº¿n nhÃ¢n chá»©ng sá»‘ng giÃ¡ Ä‘áº¥t x10. Báº¯t trend cá»±c gáº¯t, niá»m tin ráº¥t dá»… xuá»‘ng tiá»n á»Ÿ khu má»›i.</p>
                            </div>
                            <div class="content-group">
                                <p style="color: #34d399;"><b>âœ… [NÃ‰T] KhÃ¡ch HÃ  Ná»™i Phá»‘:</b> á»ž cháº­t chá»™i quen rá»“i, tháº¥y Ä‘áº¥t quy hoáº¡ch phÃ¢n lÃ´ thoÃ¡ng rá»™ng lÃ  Æ°ng cÃ¡i bá»¥ng chá»‘t láº¹.</p>
                            </div>
                            <div class="content-group">
                                <p style="color: #f87171;"><b>âŒ [Táº CH] Tá»‰nh Xa / XÃ£ NghÃ¨o Äáº¥t Rá»™ng:</b> á»ž quen 1 nhÃ  máº¥y sÃ o báº¡t ngÃ n. Chia lÃ´ 100m2 há» chÃª á»Žng chÃª Eo nhÆ° lá»— mÅ©i khÃ´ng thÃ¨m mua.</p>
                            </div>
                        </div>

                        <!-- CÃ¢u 5 -->
                        <div class="card vip">
                            <div class="badge">CÃ¢u 5: Soi VÃ­ Tiá»n áº¨n</div>
                            <h3>"Há»i thÃªm: Anh lÃ m hÃ nh chÃ­nh hay tá»± do?"</h3>
                            <div class="content-group">
                                <strong>Äá»c vá»‹</strong>
                                <p>KhÃ´ng pháº£i quan tÃ¢m lá»‹ch ráº£nh rá»—i. Quan trá»ng lÃ  Ä‘o lÆ°á»ng má»©c Ä‘á»™ <b>thu nháº­p á»•n Ä‘á»‹nh vÃ  dÃ²ng tiá»n dÆ° ra</b> hÃ ng thÃ¡ng, xem cÃ³ thá»ƒ bá»c lÃ³t Bank há»— trá»£ thanh khoáº£n khÃ´ng!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-emerald); margin-top: 2rem;">
            <h2 style="color: var(--accent-emerald); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">3. CÃ¡ch telesale vÃ  chÄƒm khÃ¡ch nÃ©t cÄƒng</h2>
            
            <div style="background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); padding: 2rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(52, 211, 153, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                    <i class="fa-solid fa-book-open-reader" style="font-size: 2rem; color: var(--accent-emerald);"></i>
                </div>
                <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-primary);">5 Lá»— Há»•ng TÃ¢m LÃ½ KhÃ¡ch HÃ ng</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 400px;">TÃ i liá»‡u Ä‘Ã o táº¡o chuyÃªn sÃ¢u vá» tÃ¢m lÃ½ hÃ nh vi khÃ¡ch hÃ ng, Ã¡p dá»¥ng thá»±c chiáº¿n trong Telesale vÃ  ChÄƒm sÃ³c khÃ¡ch hÃ ng.</p>
                
                <a href="5_lo_hong_tam_ly.html" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-emerald); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3);">
                    Äá»c tÃ i liá»‡u toÃ n mÃ n hÃ¬nh <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-orange); margin-top: 2rem;">
            <h2 style="color: var(--accent-orange); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">4. Tuyá»‡t ChiÃªu LÃ¡i KhÃ¡ch (7 Chiáº¿n Thuáº­t)</h2>
            
            <details style="margin-bottom: 2rem; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); overflow: hidden;">
                <summary style="padding: 1.2rem 1.5rem; font-weight: 700; font-size: 1.2rem; cursor: pointer; color: var(--text-primary); outline: none; list-style: none;">
                    <i class="fa-solid fa-chess-knight" style="color: var(--accent-orange); margin-right: 10px;"></i> Báº» lÃ¡i khÃ¡ch hÃ ng tá»« ká»‹ch báº£n tin Ä‘Äƒng áº£o (Báº¥m Ä‘á»ƒ xem)
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid var(--border-glass); background: var(--bg-primary);">
                    <div class="core-principle" style="border-left-color: var(--accent-orange);">
                        <h2 style="color: var(--accent-orange);">ðŸŽ¯ NguyÃªn LÃ½ "Sá»± Tháº­t Ná»­a Vá»i" (Half-Truths)</h2>
                        <p>
                            Má»¥c tiÃªu tá»‘i thÆ°á»£ng cá»§a tin Ä‘Äƒng áº£o <strong>KHÃ”NG PHáº¢I Äá»‚ BÃN LÃ” Äáº¤T ÄÃ“</strong>, mÃ  lÃ  Ä‘á»ƒ <strong>Láº¤Y LEAD (KhÃ¡ch cÃ³ tiá»n vÃ  mÃ¡u Ä‘áº§u tÆ°)</strong>. 
                            Tuyá»‡t chiÃªu Ä‘á»‰nh cao lÃ  giÄƒng má»™t cÃ¡i báº«y hoÃ n háº£o, thu hÃºt khÃ¡ch vÃ o, sau Ä‘Ã³ tá»± tay <em>"Ä‘áº­p vá»¡"</em> báº«y Ä‘á»ƒ nháº­p vai <strong>NgÆ°á»i báº£o vá»‡/ChuyÃªn gia</strong> nháº±m xÃ¢y dá»±ng lÃ²ng tin tuyá»‡t Ä‘á»‘i. Tá»« Ä‘Ã³ dáº¯t khÃ¡ch sang thá»‹ trÆ°á»ng má»¥c tiÃªu.
                        </p>
                    </div>

                    <div class="grid-container" style="margin-top: 1.5rem;">
                        <!-- Chiáº¿n thuáº­t 1 -->
                        <div class="card vip">
                            <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                            <h3>1. TÆ° duy "Tuyá»ƒn Táº­p Lead" & Telesale Gá»i Láº¡i</h3>
                            <div class="content-group">
                                <strong>CÃ¡ch lÃ m</strong>
                                <p>ÄÄƒng áº£o 100% (VÃ­ dá»¥: NhÃ  lá»t khe siÃªu Ä‘áº¹p HN). Thu lead vá» CRM vÃ  BÆ  KHÃCH vÃ i ngÃ y.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>ÄÃ³ng vai Telesale gá»i láº¡i sáº£ng khoÃ¡i: "Alo anh Æ¡i em tháº¥y anh Ä‘ang quan tÃ¢m Ä‘áº§u tÆ°... BÃªn em Ä‘ang cÃ³ sÃ³ng tá»‘t á»Ÿ khu cÃ´ng nghiá»‡p..."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>CÃº Báº¯c Cáº§u:</strong> "Anh thÃ­ch lá»t khe ná»™i Ä‘Ã´ vÃ¬ thanh khoáº£n Ä‘Ãºng khÃ´ng? NhÆ°ng giá» giÃ¡ ká»‹ch tráº§n rá»“i, tá»‡p khÃ¡ch HN cá»§a em Ä‘ang rÃºt vá»‘n phÃ¢n bá»• vá» Ä‘áº¥t Tá»‰nh biÃªn Ä‘á»™ cao hÆ¡n nhiá»u. Anh xem cÆ¡ cáº¥u dÃ²ng tiá»n nhá»‹p nÃ y khÃ´ng em ráº½ sÃ³ng?"</p>
                            </div>
                        </div>

                        <!-- Chiáº¿n thuáº­t 3 -->
                        <div class="card vip">
                            <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                            <h3>3. BÃ i ngá»­a "Marketing ÄÄƒng Nháº§m"</h3>
                            <div class="content-group">
                                <strong>CÃ¡ch lÃ m</strong>
                                <p>Cá»‘ tÃ¬nh ghÃ©p áº£nh ná»™i Ä‘Ã´ ráº¥t mÆ°á»£t vÃ o bÃ i Tá»‰nh. Láº¥y Ä‘Æ°á»£c sá»‘ cá»§a khÃ¡ch xong ngá»­a bÃ i luÃ´n.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>"Em xin lá»—i anh, bÃ© thá»±c táº­p bÃªn em Ãºp lá»™n bá»™ áº£nh. NhÆ°ng cÃ¡i ná»™i dung bÃ i tiá»m nÄƒng x2 lÃ  cÃ³ tháº­t. Em má»i anh ly cafe Ä‘á»ƒ em tÆ° váº¥n phÃ¢n tÃ­ch rÃ nh rá»t khu nÃ y."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Äá»n BÃ¹ Tá»™i Lá»—i:</strong> Biáº¿n lá»—i láº§m thÃ nh "Ä‘áº·c quyá»n". "Pháº¡t em cafe nhÃ©, Ä‘á»ƒ Ä‘á»n bÃ¹ em add anh vÃ o Group kÃ­n/gá»­i list ná»™i bá»™ hÃ ng ngá»™p chÆ°a tung cho truyá»n thÃ´ng, anh lÆ°á»›t xem nháº·t Ä‘Æ°á»£c cÄƒn nÃ o khÃ´ng."</p>
                            </div>
                        </div>

                        <!-- Chiáº¿n thuáº­t 6 -->
                        <div class="card vip">
                            <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                            <h3>6. Nháº­p vai "ChuyÃªn Gia Cáº£nh BÃ¡o"</h3>
                            <div class="content-group">
                                <strong>CÃ¡ch lÃ m</strong>
                                <p>Nháº­n CÃ“ lÃ´ Ä‘áº¥t giÃ¡ ráº» Ä‘Ã³ tháº­t. NhÆ°ng khi khÃ¡ch há»i sÃ¢u thÃ¬ háº¡ giá»ng.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>"LÃ´ Ä‘Ã³ ráº» tháº­t anh áº¡, nhÆ°ng em nÃ³i chÃ¢n tÃ¬nh: nÃ³ dÃ­nh nháº¹ quy hoáº¡ch cÃ¢y xanh / Ä‘áº¥t vi báº±ng. Em khuyÃªn anh nÃ© ra. Táº§m tiá»n anh rÃ¡ng nhá»‰nh xÃ­u, láº¥y sang mÃ£ nÃ y cá»§a em sá»• cáº¥t kÃ©t ngá»§ cho ngon."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Táº¡o Vá»‹ Tháº¿:</strong> Sáºµn sÃ ng chÃª nguá»“n hÃ ng phá»…u Ä‘á»ƒ tÃ´n vinh sá»± tháº­t thÃ  cá»§a báº£n thÃ¢n. KhÃ¡ch thÃ  tin má»™t ngÆ°á»i dÃ¡m chÃª lÃ´ ráº», cÃ²n hÆ¡n tin Ä‘á»©a khen lÃ´ Ä‘Ã³ lÃªn mÃ¢y.</p>
                            </div>
                        </div>

                        <!-- Chiáº¿n thuáº­t 5 -->
                        <div class="card safe">
                            <div class="badge">An ToÃ n - Thá»±c Táº¿</div>
                            <h3>5. MÆ°u MÆ°á»£n hÃ ng Ä‘áº¹p lÃ m "Chim Má»“i Háº¡ Táº§ng"</h3>
                            <div class="content-group">
                                <strong>CÃ¡ch lÃ m</strong>
                                <p>ÄÄƒng khu háº¡ táº§ng cá»±c Ä‘áº¹p, sÃ¡t dá»± Ã¡n cÃ´ng ty Ä‘ang Ä‘Ã¡nh. BÃ¡o Ä‘Ãºng giÃ¡ thá»‹ trÆ°á»ng bÃ¬nh thÆ°á»ng.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>Dáº¯t khÃ¡ch Ä‘i thá»±c Ä‘á»‹a khu Ä‘Ã³ tháº­t, cá»‘ tÃ¬nh Ä‘Æ°a vÃ o cÃ¡c máº£nh dÃ­nh lá»—i: ÄÆ°á»ng Ä‘Ã¢m, gáº§n má»™, thÃ³p háº­u... KhÃ¡ch chÃª -> Ráº½ vÃ´ lÄƒng: "Tiá»‡n Ä‘Ã¢y qua xem dá»± Ã¡n tá»¥i em, sáº¡ch tÆ°ng khÃ´ng tÃ¬ váº¿t."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Má» Neo KÃ©p:</strong> ÄÆ°a xem lÃ´ Lá»–I NHáº¤T Ä‘á»ƒ táº¡o Ä‘Ã¡y giÃ¡. Xong Ä‘Æ°a lÃ´ Äáº¸P NHáº¤T giÃ¡ trÃªn trá»i. Cuá»‘i cÃ¹ng má»›i chá»‘t lÃ´ CÃ”NG TY (Äáº¹p ngang lÃ´ 2 mÃ  giÃ¡ nhá»‰nh hÆ¡n lÃ´ 1). KhÃ¡ch tháº¥y há»i, chá»‘t!</p>
                            </div>
                        </div>

                        <!-- Chiáº¿n thuáº­t 7 -->
                        <div class="card safe">
                            <div class="badge">An ToÃ n - Thá»±c Táº¿</div>
                            <h3>7. Má»“i Nhá»­ "Báº£ng HÃ ng QuÃ¡ Khá»©" (Tuyá»‡t chiÃªu KhiÃªm)</h3>
                            <div class="content-group">
                                <strong>CÃ¡ch lÃ m</strong>
                                <p>ÄÄƒng khu cá»±c Ä‘áº¹p, giÃ¡ siÃªu tá»‘t. KhÃ¡ch há»i -> Check láº¡i vÃ  gá»­i Báº£ng hÃ ng cÅ© (Ä‘Ã£ gáº¡ch Ä‘á» bÃ¡n 99%).</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>Chá»‰ cÃ²n sÃ³t láº¡i 1, 2 lÃ´ xáº¥u quáº¯c (trá»i sinh). Má»i khÃ¡ch Ä‘i xem con cuá»‘i cÃ¹ng nÃ y. Äáº¿n nÆ¡i khÃ¡ch láº¯c Ä‘áº§u -> Tiá»‡n tay dáº«n luÃ´n sang dá»± Ã¡n cÃ¹ng tá»‡p tÃ i chÃ­nh cá»§a há»‡ thá»‘ng cÃ´ng ty.</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Hiá»‡u á»©ng Fomo:</strong> Cho khÃ¡ch tháº¥y "hÃ ng ráº» Ä‘áº¹p bay trong ná»‘t nháº¡c". KÃ­ch thÃ­ch sá»± nuá»‘i tiáº¿c Ä‘á»ƒ khi Ä‘Æ°a sang hÃ ng tháº­t cá»§a cÃ´ng ty, há» sáº½ ra quyáº¿t Ä‘á»‹nh nhanh hÆ¡n.</p>
                            </div>
                        </div>

                        <!-- Chiáº¿n thuáº­t 2 -->
                        <div class="card warn">
                            <div class="badge">HÃªn Xui - Phá»¥ Thuá»™c NÄƒng Lá»±c</div>
                            <h3>2. LÃ´ vá»«a nháº­n cá»c & LÃ¡i báº» ngoáº·t</h3>
                            <div class="content-group">
                                <strong>CÃ¡ch lÃ m</strong>
                                <p>KhÃ¡ch há»i, bÃ¡o ngay: "LÃ´ Ä‘Ã³ vá»«a nháº­n cá»c rá»“i anh áº¡. NhÆ°ng em Ä‘ang cÃ²n 3 mÃ£ y há»‡t chÆ°a up..."</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>"Anh quÄƒng sá»‘ Zalo em nÃ©m sá»• qua luÃ´n, FB bÃ³p tÆ°Æ¡ng tÃ¡c load khÃ´ng ná»•i file." Xin Ä‘Æ°á»£c Zalo lÃ  tháº¯ng bÆ°á»›c 1.</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Giao Lá»™ Äá»‹nh Má»‡nh:</strong> Láº¥y Zalo xong mÃ  tiáº¿p tá»¥c gá»­i áº¢O thÃ¬ khÃ¡ch block tá»· lá»‡ cao (Trá»Ÿ thÃ nh chiáº¿n thuáº­t sá»‘ 4). Láº¥y xong gá»­i THáº¬T vÃ  gá»i Ä‘iá»‡n báº» tÆ° duy thÃ¬ má»›i cÃ³ tá»‰ lá»‡ sá»‘ng sÃ³t.</p>
                            </div>
                        </div>

                        <!-- Chiáº¿n thuáº­t 4 -->
                        <div class="card danger">
                            <div class="badge">KÃ©m Nháº¥t - Cáº£nh BÃ¡o</div>
                            <h3>4. Nháº­n CÃ³ Tháº­t TrÄƒm Pháº§n TrÆ¡n GÃ³i</h3>
                            <div class="content-group">
                                <strong>CÃ¡ch lÃ m</strong>
                                <p>Tráº£ lá»i CÃ“ CÃ“ CÃ“ háº¿t. Äáº¥t cÃ³, ráº» cÃ³, Ä‘áº¹p cÃ³. Cá»‘t lÃµi lÃ´i cá»• khÃ¡ch lÃªn xe Ä‘i thá»±c Ä‘á»‹a cho báº±ng Ä‘Æ°á»£c.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>Tá»›i nÆ¡i thÃ¬ báº» lÃ¡i nÃ³i chá»§ quay xe, bÃ¡o giÃ¡ thÃ¡ch lÃªn trÃªn trá»i, hoáº·c dáº¯t tháº³ng tá»›i má»™t cá»¥c má»“i khÃ¡c biá»‡t hoÃ n toÃ n.</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>TrÃ¡nh Xa Tuyá»‡t Äá»‘i:</strong> Máº¥t tÆ° cÃ¡ch, Äƒn chá»­i táº¡i tráº­n. Chá»‰ cÃ³ thá»ƒ dá»±a dáº«m vÃ o Ä‘Ã¡m Ä‘Ã´ng SÃ³ng cá»§a cÃ´ng ty buff vÃ o Ä‘á»ƒ Ã©p khÃ¡ch ngá»™p, chá»‘t vá»™i. Quáº£n lÃ½/Sáº¿p siÃªu ghÃ©t support thá»ƒ loáº¡i lead lá»«a Ä‘áº£o nÃ y.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: MáºªU Gá»¬I THÃ”NG TIN
    // ---------------------------------------------------------
    'page-mau-gui-thong-tin': `
        <div class="page-title-bar">
            <h1>Máº«u Gá»­i ThÃ´ng Tin</h1>
            <p class="page-subtitle">Tuyá»ƒn táº­p cÃ¡c ká»‹ch báº£n, máº«u tin nháº¯n gá»­i thÃ´ng tin dá»± Ã¡n chuyÃªn nghiá»‡p cho khÃ¡ch hÃ ng vÃ  cáº©m nang thá»±c chiáº¿n</p>
        </div>

        <style>
            .pdf-container {
                display: flex;
                gap: 24px;
                margin-top: 2rem;
                background: var(--bg-secondary);
                border: 1px solid var(--border-glass);
                border-radius: 20px;
                padding: 24px;
                box-shadow: var(--shadow-md);
            }
            .pdf-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
            .pdf-preview {
                flex: 1.2;
                height: 500px;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid var(--border-glass);
            }
            .pdf-title {
                font-size: 1.8rem;
                font-weight: 800;
                color: var(--text-primary);
                margin-bottom: 1rem;
                background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .pdf-description {
                color: var(--text-secondary);
                line-height: 1.6;
                margin-bottom: 1.5rem;
                font-size: 1rem;
            }
            .pdf-actions {
                display: flex;
                gap: 12px;
                flex-wrap: wrap;
            }
            .btn-pdf {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 20px;
                border-radius: 12px;
                font-weight: 600;
                text-decoration: none;
                transition: all 0.2s ease;
                cursor: pointer;
            }
            .btn-pdf-primary {
                background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple));
                color: white;
                box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
            }
            .btn-pdf-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
            }
            .btn-pdf-secondary {
                background: rgba(255, 255, 255, 0.05);
                color: var(--text-primary);
                border: 1px solid var(--border-glass);
            }
            .btn-pdf-secondary:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateY(-2px);
            }
            
            /* Responsive */
            @media (max-width: 992px) {
                .pdf-container {
                    flex-direction: column;
                }
                .pdf-preview {
                    display: none; /* áº¨n iframe preview trÃªn mobile/tablet */
                }
            }
        </style>

        <!-- Pháº§n Cáº©m nang PDF -->
        <div class="pdf-container">
            <div class="pdf-info">
                <div>
                    <span style="display: inline-block; background: rgba(59, 130, 246, 0.1); color: var(--accent-blue); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                        TÃ€I LIá»†U Ná»”I Báº¬T
                    </span>
                    <h2 class="pdf-title">Cáº©m Nang: Chiáº¿n Tháº§n Gen Z - BÃ­ Máº­t BÃ¡n Báº¥t Äá»™ng Sáº£n</h2>
                    <p class="pdf-description">
                        Cuá»‘n cáº©m nang thá»±c chiáº¿n gá»‘i Ä‘áº§u giÆ°á»ng dÃ nh cho cÃ¡c chiáº¿n binh mÃ´i giá»›i báº¥t Ä‘á»™ng sáº£n tháº¿ há»‡ má»›i. 
                        TÃ i liá»‡u tá»•ng há»£p cÃ¡c chiáº¿n thuáº­t tiáº¿p cáº­n, ká»¹ nÄƒng xá»­ lÃ½ tá»« chá»‘i, ká»‹ch báº£n gá»­i tin nháº¯n 
                        khiáº¿n khÃ¡ch hÃ ng khÃ´ng thá»ƒ ngÃ³ lÆ¡ vÃ  cÃ¡c bÆ°á»›c chá»‘t deal tháº§n tá»‘c.
                    </p>
                    <div style="margin-bottom: 2rem;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                            <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                            <span>Äá»‹nh dáº¡ng: PDF cháº¥t lÆ°á»£ng cao</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                            <i class="fa-solid fa-weight-hanging" style="color: var(--accent-blue);"></i>
                            <span>Dung lÆ°á»£ng: ~11.4 MB</span>
                        </div>
                    </div>
                </div>
                <div class="pdf-actions">
                    <a href="assets/pdf/Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" target="_blank" class="btn-pdf btn-pdf-primary">
                        <i class="fa-solid fa-book-open"></i> Äá»c Cáº©m Nang Online
                    </a>
                    <a href="assets/pdf/Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" download="Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" class="btn-pdf btn-pdf-secondary">
                        <i class="fa-solid fa-download"></i> Táº£i Vá» MÃ¡y
                    </a>
                </div>
            </div>
            <div class="pdf-preview">
                <iframe src="assets/pdf/Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" style="width: 100%; height: 100%; border: none;" type="application/pdf"></iframe>
            </div>
        </div>

        <!-- Pháº§n Video Thá»±c Chiáº¿n -->
        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2.5rem;">
            <h2 style="color: var(--accent-blue); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">
                <i class="fa-solid fa-video" style="margin-right: 8px;"></i> Video HÆ°á»›ng Dáº«n Thá»±c Chiáº¿n
            </h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">HÃ£y xem ká»¹ cÃ¡c video ngáº¯n dÆ°á»›i Ä‘Ã¢y Ä‘á»ƒ náº¯m Ä‘Æ°á»£c tÆ° duy vÃ  cÃ¡ch soáº¡n tin nháº¯n gá»­i thÃ´ng tin dá»± Ã¡n khiáº¿n khÃ¡ch hÃ ng khÃ´ng thá»ƒ ngÃ³ lÆ¡.</p>
            
            <div class="shorts-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/UUn45Eg1xwQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 1: Ká»¹ thuáº­t gÃ¢y tÃ² mÃ²</h3>
                    </div>
                </div>
                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/0-8mZ2ONq4k" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 2: Bá»‘ cá»¥c tin nháº¯n chuáº©n</h3>
                    </div>
                </div>
                <!-- Video 3 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/XwFPXIULMMU" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 3: Nghá»‡ thuáº­t lÃ¡i khÃ¡ch</h3>
                    </div>
                </div>
                <!-- Video 4 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/qC4dU8ISSlM" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 4: TÄƒng tá»‰ lá»‡ pháº£n há»“i</h3>
                    </div>
                </div>
            </div>
        </div>
    `,
    // ---------------------------------------------------------
    // PAGE: CHIáº¾N LÆ¯á»¢C FACEBOOK
    // ---------------------------------------------------------
    'page-chien-luoc-fb': `
        <style>
        .fb-strategy-wrapper {
            --bg-color: #f8fafc; 
            --card-bg: rgba(255, 255, 255, 0.9); 
            --text-main: #0f172a; 
            --text-muted: #475569; 
            --accent-1: #3b82f6; 
            --accent-2: #8b5cf6; 
            --accent-3: #10b981;
            --accent-gradient: linear-gradient(135deg, var(--accent-1), var(--accent-2));
            --radius-lg: 24px;
            --radius-md: 16px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .fb-strategy-wrapper {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(59, 130, 246, 0.08), transparent 25%),
                radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.08), transparent 25%);
            background-attachment: fixed;
            color: var(--text-main);
            line-height: 1.6;
            padding: 0 20px;
        }

        .fb-strategy-wrapper h1, .fb-strategy-wrapper h2, .fb-strategy-wrapper h3, .fb-strategy-wrapper h4 { font-family: 'Outfit', sans-serif; margin-bottom: 1rem; }
        
        .fb-strategy-wrapper .container { max-width: 1200px; margin: 0 auto; padding: 4rem 0; }

        /* Hero */
        .fb-strategy-wrapper .hero { text-align: center; margin-bottom: 5rem; position: relative; }
        .fb-strategy-wrapper .hero h1 { font-size: 3.5rem; font-weight: 800; background: var(--accent-gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .fb-strategy-wrapper .hero p { font-size: 1.2rem; color: var(--text-muted); max-width: 800px; margin: 0 auto; }
        .fb-strategy-wrapper .hero-alert { display: inline-flex; align-items: center; gap: 10px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #fca5a5; padding: 8px 20px; border-radius: 50px; margin-bottom: 2rem; }

        /* Panels */
        .fb-strategy-wrapper .glass-panel {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: var(--radius-lg);
            padding: 3rem;
            margin-bottom: 3rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .fb-strategy-wrapper .glass-panel:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08); border-color: rgba(0, 0, 0, 0.1); }

        .fb-strategy-wrapper .section-header { display: flex; align-items: center; gap: 15px; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 1rem; }
        .fb-strategy-wrapper .section-header i { color: var(--accent-1); }
        .fb-strategy-wrapper .section-header h2 { margin-bottom: 0; font-size: 2rem; color:var(--text-primary); }

        /* Content Mix 5-3-2 */
        .fb-strategy-wrapper .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 2rem; }
        .fb-strategy-wrapper .mix-card { background: rgba(255, 255, 255, 1); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: var(--radius-md); padding: 2.5rem 2rem; position: relative; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
        .fb-strategy-wrapper .percent-badge { position: absolute; top: 10px; right: 20px; font-family: 'Outfit'; font-size: 3rem; font-weight: 800; color: rgba(0, 0, 0, 0.03); }
        .fb-strategy-wrapper .mix-card h3 { color:var(--text-primary); font-size: 1.5rem; display: flex; align-items: center; gap: 10px; }

        /* Algorithm Hacks */
        .fb-strategy-wrapper .hack-box { background: rgba(0,0,0,0.02); border-left: 4px solid var(--accent-2); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; }
        .fb-strategy-wrapper .hack-box h4 { color:var(--text-primary); display: flex; align-items: center; gap: 10px; font-size: 1.2rem; }
        
        /* Tactical Examples Grid */
        .fb-strategy-wrapper .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        .fb-strategy-wrapper .idea-card { background: rgba(16, 185, 129, 0.05); border: 1px dashed rgba(16, 185, 129, 0.3); padding: 1.5rem; border-radius: 12px; }
        .fb-strategy-wrapper .idea-card span { font-weight: bold; color: var(--accent-3); display: block; margin-bottom: 5px; }

        /* Golden Timeline Table */
        .fb-strategy-wrapper .timeline-table { width: 100%; border-collapse: collapse; margin-top: 2rem; background: rgba(255,255,255,1); border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
        .fb-strategy-wrapper .timeline-table th { background: rgba(0,0,0,0.03); padding: 1rem; text-align: left; color: var(--accent-1); font-family: 'Outfit'; font-size: 1.1rem; }
        .fb-strategy-wrapper .timeline-table td { padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.05); color: var(--text-muted); }
        .fb-strategy-wrapper .timeline-table tr:hover { background: rgba(0,0,0,0.02); }
        .fb-strategy-wrapper .badge-feed { background: rgba(59, 130, 246, 0.2); color: #93c5fd; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; }
        .fb-strategy-wrapper .badge-story { background: rgba(168, 85, 247, 0.2); color: #d8b4fe; padding: 3px 8px; border-radius: 4px; font-size: 0.8rem; }

        /* Roadmap */
        .fb-strategy-wrapper .roadmap { display: flex; flex-direction: column; gap: 2rem; }
        .fb-strategy-wrapper .phase-card { background: rgba(255,255,255,1); border: 1px solid rgba(0,0,0,0.05); padding: 2rem; border-radius: var(--radius-md); position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
        .fb-strategy-wrapper .phase-card::before { content: ''; position: absolute; left: 0; top: 0; width: 4px; height: 100%; background: var(--accent-gradient); border-radius: 4px 0 0 4px; }
        .fb-strategy-wrapper .phase-title { color:var(--text-primary); font-size: 1.4rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
        .fb-strategy-wrapper .phase-title span { background: var(--accent-1); padding: 2px 10px; border-radius: 20px; font-size: 0.9rem; }
        .fb-strategy-wrapper .phase-list { list-style: none; padding-left: 20px; }
        .fb-strategy-wrapper .phase-list li { margin-bottom: 10px; position: relative; }
        .fb-strategy-wrapper .phase-list li::before { content: 'â†’'; position: absolute; left: -20px; color: var(--accent-2); }

        .fb-strategy-wrapper .highlight-text { color:var(--text-primary); font-weight: 500; }
        .fb-strategy-wrapper .important-note { background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1rem; margin-top: 1rem; color: #fbbf24; border-radius: 4px; }
    </style>
        <div class="fb-strategy-wrapper">
            <div class="container">
                
        <!-- Hero Section -->
        <div class="hero">
            <div class="hero-alert">
                <i data-lucide="shield-alert" width="18"></i> ThoÃ¡t Cáº£nh "ÄÄƒng BÃ¡n Äáº¥t ToÃ n Táº­p" - Tuyá»‡t Máº­t Internal
            </div>
            <h1>Báº£n Äá»“ "Chiáº¿m SÃ³ng"<br>Facebook Báº¥t Äá»™ng Sáº£n</h1>
            <p>TrÃ­ch xuáº¥t 100% tá»« dá»¯ liá»‡u thá»±c chiáº¿n Ä‘á»‰nh cao cá»§a mÃ´ hÃ¬nh "Máº¹ MÃ­t Xinh". KhÃ´ng bÃ¡n Ä‘áº¥t cá»©ng nháº¯c, chÃºng ta sáº½ bÃ¡n <b>"Phong cÃ¡ch sá»‘ng", "Sá»± váº¥t váº£ Ä‘Ã¡ng ngÆ°á»¡ng má»™"</b> vÃ  <b>"NÄƒng lá»±c chuyÃªn gia"</b>.</p>
        </div>

        <!-- Section 1: Thuáº­t toÃ¡n & TÆ° duy -->
        <div class="glass-panel">
            <div class="section-header">
                <i data-lucide="cpu" width="32" height="32"></i>
                <h2>1. Giáº£i MÃ£ Thuáº­t ToÃ¡n & "Hack" Reach</h2>
            </div>
            
            <div class="grid-2">
                <div class="hack-box">
                    <h4><i data-lucide="zap"></i> Chiáº¿n thuáº­t "BÆ¡m Reach" XuyÃªn Tuáº§n</h4>
                    <p><b>ÄÄƒng bÃ i má»“i buá»•i sÃ¡ng (8h-9h):</b> Má»™t táº¥m áº£nh cÃ¡ nhÃ¢n (thá»ƒ thao, cafe) hoáº·c gia Ä‘Ã¬nh Ä‘á»ƒ láº¥y Reach khá»§ng Ä‘áº§u ngÃ y. <br><br>
                    <b>Chá»‘t háº¡ buá»•i chiá»u (14h-15h):</b> Má»›i báº¯t Ä‘áº§u Ä‘Äƒng bÃ i chuyÃªn mÃ´n/bÃ¡n hÃ ng. KhÃ¡ch hÃ ng Ä‘Ã£ tÆ°Æ¡ng tÃ¡c bÃ i sÃ¡ng sáº½ cháº¯c cháº¯n tháº¥y bÃ i buá»•i chiá»u trÃªn Feed cá»§a há».</p>
                </div>
                
                <div class="hack-box" style="border-left-color: var(--accent-1);">
                    <h4><i data-lucide="scan-face"></i> Äá»‹nh Luáº­t Máº·t NgÆ°á»i (>300% Reach)</h4>
                    <p>áº¢nh má»™c máº¡c cÃ³ GÆ°Æ¡ng máº·t nhÃ¢n sá»±/KhÃ¡ch hÃ ng <b>luÃ´n Ä‘áº¡t reach cao gáº¥p 3 láº§n</b> áº£nh phá»‘i cáº£nh dá»± Ã¡n hay báº£n Ä‘á»“ vá»‡t mÃ u. Tá»« nay cáº¥m Ä‘Äƒng chá»‰ má»—i cÃ¡i báº£n Ä‘á»“ quy hoáº¡ch trÆ¡ trá»i.</p>
                </div>

                <div class="hack-box" style="border-left-color: var(--accent-3);">
                    <h4><i data-lucide="repeat"></i> Engagement Loop (Rep Ráº£i RÃ¡c)</h4>
                    <p>Äá»«ng bao giá» rep comment ngay láº­p tá»©c má»™t lÃºc. HÃ£y Ã¡p dá»¥ng chiáº¿n thuáº­t <b>rep ráº£i rÃ¡c má»—i láº§n 1-2 comment trong ngÃ y</b>. Má»—i láº§n báº¡n rep, bÃ i viáº¿t láº¡i Ä‘Æ°á»£c thuáº­t toÃ¡n Ä‘áº©y "nháº£y" lÃªn Ä‘á»‰nh Newsfeed cá»§a ngÆ°á»i khÃ¡c má»™t láº§n ná»¯a.</p>
                </div>

                <div class="hack-box" style="border-left-color: #f59e0b;">
                    <h4><i data-lucide="pen-tool"></i> Nghá»‡ Thuáº­t "Má»m HÃ³a" Tá»« KhÃ³a</h4>
                    <p>Thuáº­t toÃ¡n tá»± Ä‘á»™ng "bÃ³p" tÆ°Æ¡ng tÃ¡c cÃ¡c bÃ i cÃ³ mÃ¹i Sale. TrÃ¡nh dÃ¹ng: <del>BÃ¡n, GiÃ¡ ráº», Chá»‘t lÃ´, Má»Ÿ bÃ¡n</del>. Thay vÃ o Ä‘Ã³ hÃ£y dÃ¹ng: <b>Gá»­i gáº¯m, CÆ¡ cáº¥u tÃ i sáº£n, Há»— trá»£ em, HÃ nh trÃ¬nh tÃ¬m nhÃ , CÆ¡ há»™i há»¯u duyÃªn.</b></p>
                </div>
            </div>
        </div>

        <!-- Section 2: CÃ´ng Thá»©c 5-3-2 & "Má» Ã TÆ°á»Ÿng" -->
        <div class="glass-panel">
            <div class="section-header">
                <i data-lucide="pie-chart" width="32" height="32"></i>
                <h2>2. CÃ´ng Thá»©c Content 5-3-2 (BÃ¡n NhÆ° KhÃ´ng BÃ¡n)</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">HÃ£y trá»Ÿ thÃ nh <i>"NgÆ°á»i ká»ƒ chuyá»‡n cá»§a vÃ¹ng Ä‘áº¥t Ä‘Ã³"</i> thay vÃ¬ má»™t tay cÃ² Ä‘áº¥t vÃ´ há»“n.</p>

            <div class="grid-3" style="margin-bottom: 3rem;">
                <div class="mix-card">
                    <div class="percent-badge">50%</div>
                    <h3>Äá»i Sá»‘ng & NhÆ°á»£c Äiá»ƒm</h3>
                    <p>Chia sáº» sá»± tháº­t tráº§n trá»¥i, sá»± váº­t vÃ£ cá»§a nghá», khoe gia Ä‘Ã¬nh hoáº·c lá»‘i sá»‘ng healthy.<br><br><i>Má»¥c Ä‘Ã­ch: XÃ³a bá» Ä‘á»‹nh kiáº¿n "Sale chá»‰ lÄƒm lÄƒm chá»‘t tiá»n". GÃ¢y thiá»‡n cáº£m sÃ¢u sáº¯c.</i></p>
                </div>
                <div class="mix-card">
                    <div class="percent-badge">30%</div>
                    <h3>ChuyÃªn MÃ´n Cá»©ng</h3>
                    <p>Giáº£i thÃ­ch cÃ¡c thuáº­t ngá»¯ LUR, ONT, cÃ¡ch check quy hoáº¡ch ngay táº¡i lÃ´ Ä‘áº¥t báº±ng 30s video báº¥m Ä‘t.<br><br><i>Má»¥c Ä‘Ã­ch: Thá»ƒ hiá»‡n vá»‹ tháº¿ chuyÃªn mÃ´n "Tao cÃ³ nhá»¯ng thá»© mÃ y khÃ´ng biáº¿t".</i></p>
                </div>
                <div class="mix-card">
                    <div class="percent-badge">20%</div>
                    <h3>Báº±ng Chá»©ng (Uy TÃ­n)</h3>
                    <p>Tin nháº¯n khÃ¡ch cÃ¡m Æ¡n, áº£nh review quÃ¡n bÃºn cÃ¡ sÃ¡t dá»± Ã¡n, hoáº·c gom mua chung lÃ´ Ä‘áº¹p.<br><br><i>Má»¥c Ä‘Ã­ch: Táº¡o láº­p báº±ng chá»©ng thÃ©p, buff FOMO cá»±c gáº¯t.</i></p>
                </div>
            </div>

            <h3 style="color:var(--text-primary); margin-bottom: 1.5rem;"><i data-lucide="lightbulb" width="24" style="color: var(--accent-3); vertical-align: middle;"></i> Ã TÆ°á»Ÿng ÄÄƒng Báº±ng Chuyá»‡n Äá»i Thá»±c</h3>
            <div class="grid-2">
                <div class="idea-card"><span>Sá»± váº­t váº£ (Hustle)</span>"áº¢nh lá»™i bÃ¹n ruá»™ng check ranh má»‘c cho khÃ¡ch táº­n HÃ  Ná»™i. Sale Ä‘áº¥t ná»n lÃ  pháº£i biáº¿t lá»™i bÃ¹n, khÃ´ng pháº£i chá»‰ máº·c vest uá»‘ng nÆ°á»›c chÃ¨."</div>
                <div class="idea-card"><span>Lá»—i sai (Vulnerability)</span>"QuÃªn vÃ¡c theo chÃ¬a khÃ³a má»Ÿ cá»•ng Ä‘áº¥t khu biá»‡t láº­p. May cÃ¡c bÃ¡c khÃ¡ch dá»… tÃ­nh báº£o 'Äáº¹p tháº¿ nÃ y quÃªn anh cÅ©ng tha'. Nhá»› check tÃºi 3 láº§n nhÃ© anh em!"</div>
                <div class="idea-card"><span>Sá»± tháº¥u cáº£m</span>"ThÆ°Æ¡ng Ã´ng anh dá»“n tÃ­ch cÃ³p cáº£ Ä‘á»i Ä‘i mua lÃ´ Ä‘áº¥t Ä‘áº§u tiÃªn, cá»© há»i quy hoáº¡ch mÃ£i báº£i cáº£ ngÆ°á»i. MÃ¬nh báº£o 'ChÃº cá»© an tÃ¢m, chÃ¡u check 3 lá»›p má»™c má»›i dÃ¡m gá»i'."</div>
                <div class="idea-card"><span>Local Brand</span>"Dáº«n khÃ¡ch xem Ä‘áº¥t xong pháº£i ráº½ ngang lÃ m bÃ¡t bÃºn cÃ¡ [TÃªn QuÃ¡n] Ä‘á»‰nh chÃ³p. KhÃ¡ch Äƒn xong gáº­t gÃ¹ khen Ä‘áº¥t ngon bÃºn cÅ©ng xá»‹n!"</div>
            </div>
        </div>

        <!-- Section 3: Tráº­n ÄÃ¡nh Timeline 9 Khung Giá» -->
        <div class="glass-panel" style="border-color: rgba(59, 130, 246, 0.5); box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);">
            <div class="section-header">
                <i data-lucide="clock-9" width="32" height="32" style="color: #60a5fa;"></i>
                <h2>3. Lá»‹ch TrÃ¬nh 9 Khung Giá» "Domination" (5-10 BÃ i/NgÃ y)</h2>
            </div>
            <p style="color: var(--text-muted);">Sáº£n xuáº¥t siÃªu tá»‘c (Snap & Post): Äá»«ng cáº§u ká»³! Tháº¥y biá»ƒn bÃ¡o má»›i Ä‘áº¹p, xe cáº©u Ä‘Ã´ng -> Chá»¥p post Story ngay kÃ¨m 1 dÃ²ng cáº£m xÃºc. 1 Ná»™i dung Feed cÃ³ thá»ƒ báº» ra 4 Story Ä‘á»ƒ duy trÃ¬ hiá»ƒn thá»‹.</p>
            
            <table class="timeline-table">
                <thead>
                    <tr>
                        <th>Khung Giá»</th>
                        <th>KÃªnh ÄÄƒng</th>
                        <th>Ná»™i Dung Chi Tiáº¿t</th>
                        <th>Má»¥c TiÃªu Äáº¡t ÄÆ°á»£c</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>07:30</td><td><span class="badge-feed">Feed</span> + <span class="badge-story">Story</span></td><td>áº¢nh cÃ³ máº·t chÃ­nh chá»§/NÄƒng lÆ°á»£ng thá»ƒ thao/TrÃ  sÃ¡ng.</td><td><span class="highlight-text">BÆ¡m Reach tá»•ng lá»±c</span> cho ngÃ y.</td></tr>
                    <tr><td>09:30</td><td><span class="badge-story">Story</span></td><td>Tin váº¯n thá»i sá»± BÄS / Chá»¥p vá»™i áº£nh báº£n Ä‘á»“ QH.</td><td>Pháº©y danh hiá»‡u "ChuyÃªn gia".</td></tr>
                    <tr><td>11:00</td><td><span class="badge-story">Story</span></td><td>15s Video check tá»a Ä‘á»™ Ä‘á»‹a bÃ n thá»±c táº¿ náº¯ng nÃ´i.</td><td>Kháº³ng Ä‘á»‹nh tÃ­nh "Thá»±c chiáº¿n".</td></tr>
                    <tr><td>13:30</td><td><span class="badge-feed">Feed (ChuyÃªn sÃ¢u)</span></td><td>PhÃ¢n tÃ­ch phÃ¡p lÃ½ lÃ´ X, cÆ¡ há»™i Ä‘áº§u tÆ° sÃ¢u sáº¯c.</td><td><b>Ghim uy tÃ­n sÃ¢u vÃ o lÃ²ng khÃ¡ch.</b></td></tr>
                    <tr><td>15:30</td><td><span class="badge-feed">Feed (Social Proof)</span></td><td>Che tÃªn Ä‘Äƒng Bill cá»c, hoáº·c áº£nh tin nháº¯n Feedback.</td><td>Chá»‘t cháº·n niá»m tin an toÃ n.</td></tr>
                    <tr><td>17:30</td><td><span class="badge-story">Story</span></td><td>CÃ¢u chuyá»‡n háº­u trÆ°á»ng Ä‘á»• nÃ¡t, Ä‘Ã³i meo chá» khÃ¡ch.</td><td>KÃ­ch hoáº¡t Sá»± Äá»“ng Cáº£m.</td></tr>
                    <tr><td>19:30</td><td><span class="badge-feed">Feed (Game)</span></td><td>TrÃ² chÆ¡i há»i Ä‘Ã¡p A/B (Chá»n máº£nh vuÃ´ng hay máº£nh xÃ©o?).</td><td><span class="highlight-text">KÃ©o TÆ°Æ¡ng TÃ¡c Cá»±c Äiá»ƒm.</span></td></tr>
                    <tr><td>21:00</td><td><span class="badge-story">Story</span></td><td>GÃ³c khuáº¥t, chiÃªm nghiá»‡m Ä‘á»i sá»‘ng, Ä‘áº¡o Ä‘á»©c sá»‘ng.</td><td>Trá»Ÿ thÃ nh báº¡n bÃ¨ cá»§a khÃ¡ch.</td></tr>
                    <tr><td>22:30</td><td><span class="badge-story">Story</span></td><td>Ãšp má»Ÿ: "Mai cÃ³ 1 lÃ´ hoa háº­u ngá»™p nÃ­n thá»Ÿ, chá» em!".</td><td>Giá»¯ chÃ¢n sá»± hÃ¡o há»©c vÃ o ngÃ y mai.</td></tr>
                </tbody>
            </table>
            <div class="important-note">
                <i data-lucide="siren" width="18" style="vertical-align: middle;"></i> <b>KPI Nháº¯c nhá»Ÿ Team TL Land:</b> ÄÄƒng 5-10 bÃ i khÃ´ng pháº£i lÃ  lÃ m phiá»n khÃ¡ch, mÃ  Ä‘á»ƒ Ã©p khÃ¡ch hÃ ng <i>"KHÃ”NG TÃ€I NÃ€O QUÃŠN ÄÆ¯á»¢C CHÃšNG TA"</i> ngay khi há» náº£y máº§m nhu cáº§u mua Ä‘áº¥t!
            </div>
        </div>

        <!-- Section 4: Lá»™ TrÃ¬nh Ãp Dá»¥ng 30 NgÃ y (Action Plan) -->
        <div class="glass-panel">
            <div class="section-header">
                <i data-lucide="map" width="32" height="32"></i>
                <h2>4. Lá»™ TrÃ¬nh Chuyá»ƒn Äá»•i 30 NgÃ y "SÃ¡t Thá»§ Äáº¥t Ná»n"</h2>
            </div>
            
            <div class="roadmap">
                <div class="phase-card">
                    <div class="phase-title"><span>NgÃ y 1 - 10</span> PhÃ¡ BÄƒng & Hiá»‡n Diá»‡n Sá»‘ng Äá»™ng</div>
                    <ul class="phase-list">
                        <li><b>Má»¥c tiÃªu:</b> Cho khÃ¡ch tháº¥y báº¡n lÃ  con ngÆ°á»i báº±ng xÆ°Æ¡ng báº±ng thá»‹t, khÃ´ng pháº£i cÃ¡i loa rao váº·t.</li>
                        <li><b>HÃ nh Ä‘á»™ng:</b> ÄÄƒng bÃ i chia sáº» trá»Ÿ ngáº¡i nghá», sá»Ÿ thÃ­ch. Má»Ÿ Ä‘áº§u báº±ng CÃ¢u Há»i Má»Ÿ ("CÃ¡c bÃ¡c nghÄ© vÃ¹ng ven giá» cÃ³ nÃªn xuá»‘ng tiá»n khÃ´ mÃ¡u?").</li>
                        <li><b>Nhiá»‡m vá»¥:</b> Äi comment dáº¡o "cá»±c ká»³ cÃ³ tÃ¢m" vÃ o tÆ°á»ng cá»§a 20 Data KhÃ¡ch hÃ ng Tiá»m nÄƒng má»—i ngÃ y.</li>
                    </ul>
                </div>

                <div class="phase-card">
                    <div class="phase-title"><span>NgÃ y 11 - 20</span> Äá»‹nh Vá»‹ "CÃ¡i Äáº§u Sá»i ChuyÃªn Gia"</div>
                    <ul class="phase-list">
                        <li><b>Má»¥c tiÃªu:</b> KhÃ¡ch hÃ ng pháº£i gáº­t gÃ¹: "Tháº±ng nÃ y biáº¿t nhiá»u thá»© Ä‘áº¥t Ä‘ai mÃ  mÃ¬nh khÃ´ng rÃ nh".</li>
                        <li><b>HÃ nh Ä‘á»™ng:</b> LÃªn seri video 30s giáº£i thÃ­ch sá»± khÃ¡c biá»‡t giá»¯a sá»• Ä‘á» tháº­t giáº£, 3 dáº¥u hiá»‡u Ä‘áº¥t "ngá»£p tá»± táº¡o", check app mÃ£nh Ä‘áº¥t ngay hiá»‡n trÆ°á»ng.</li>
                        <li><b>Visual:</b> Háº¡n cháº¿ Ä‘Äƒng Ä‘áº¥t khÃ´ng ngÆ°á»i. YÃªu cáº§u Selfie kÃ¨m báº£n Ä‘á»“, Ã´m giáº¥y tá» sá»• há»“ng má»“ hÃ´i nhá»… nháº¡i.</li>
                    </ul>
                </div>

                <div class="phase-card">
                    <div class="phase-title"><span>NgÃ y 21 - 30</span> KÃ©o LÆ°á»›i, Khoe Báº±ng Chá»©ng ThÃ©p</div>
                    <ul class="phase-list">
                        <li><b>Má»¥c tiÃªu:</b> Gom khÃ¡ch hÃ ng Ä‘ang ngáº§n ngáº¡i pháº£i nháº£y xuá»‘ng thuyá»n. FOMO hÃ³a.</li>
                        <li><b>HÃ nh Ä‘á»™ng:</b> Share tin nháº¯n khÃ¡ch chá»‘t Ä‘Æ¡n qua Ä‘iá»‡n thoáº¡i. áº¢nh dáº¯t khÃ¡ch Ä‘i cÃ´ng chá»©ng (ká»ƒ láº¡i nhu cáº§u thá»±c táº¿ cá»§a khÃ¡ch).</li>
                        <li><b>ChiÃªu cuá»‘i:</b> Khá»Ÿi táº¡o phong trÃ o "Gom mua chung máº£nh hoa háº­u gÃ£y ná»£ ngÃ¢n hÃ ng" Ä‘á»ƒ gom phá»…u inbox tá»± nhiÃªn 10-15 leads.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Section 5: Báº£n Lá»‹ch TrÃ¬nh VÃ­ Dá»¥ Thá»±c Táº¿ -->
        <div class="glass-panel" style="border-color: rgba(16, 185, 129, 0.3); box-shadow: 0 0 40px rgba(16, 185, 129, 0.05);">
            <div class="section-header">
                <i data-lucide="book-open-check" width="32" height="32" style="color: var(--accent-3);"></i>
                <h2>5. Lá»‹ch TrÃ¬nh Khung 24H (Hai Báº£n VÃ­ Dá»¥)</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem; max-width: 800px;">
                DÆ°á»›i Ä‘Ã¢y lÃ  2 báº£n vÃ­ dá»¥ thá»±c táº¿ vá» ká»‹ch báº£n Ä‘Äƒng bÃ i (Nam Thá»±c Chiáº¿n vÃ  Ná»¯ Sáº¯c Sáº£o). Há»‡ thá»‘ng yÃªu cáº§u <b>truy cáº­p trá»±c tiáº¿p</b> Ä‘á»ƒ xem há»‡ thá»‘ng giao diá»‡n chuáº©n cá»§a lá»‹ch trÃ¬nh tÃ¡c chiáº¿n 24h.
            </p>
            
            <div style="text-align: center; margin-top: 2rem;">
                <a href="lich_trinh_24h_bds_nam.html" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #10b981, #059669); color:var(--text-primary); text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: 800; font-family: 'Outfit', sans-serif; font-size: 1.3rem; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);">
                    <i data-lucide="arrow-up-right" width="24"></i> Báº¥m VÃ o ÄÃ¢y Äá»ƒ Xem Ká»‹ch Báº£n Chi Tiáº¿t
                </a>
            </div>
        </div>

            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: BÃ€I ÄÄ‚NG Äáº¦U TIÃŠN (CÃ´ng Thá»©c 5 Lá»›p)
    // ---------------------------------------------------------
    'page-bai-dang-dau-tien': `
        <div class="page-title-bar">
            <h1>CÃ´ng Thá»©c 5 Lá»›p</h1>
            <p class="page-subtitle">Blueprint bÃ i Ä‘Äƒng giá»›i thiá»‡u BÄS Ä‘áº§u tiÃªn cho nhÃ¢n sá»± má»›i â€” gieo háº¡t tá»± nhiÃªn, khÃ´ng giá»‘ng quáº£ng cÃ¡o.</p>
        </div>

        <div class="core-principle" style="border-left-color: #34d399;">
            <h2 style="color: #34d399;">ðŸŒ± Má»¥c TiÃªu BÃ i ÄÄƒng Äáº§u TiÃªn</h2>
            <p>
                BÃ i Ä‘Äƒng Ä‘áº§u tiÃªn <strong>KHÃ”NG PHáº¢I Äá»‚ BÃN HÃ€NG</strong>. Má»¥c tiÃªu duy nháº¥t lÃ  <strong>"GIEO Háº T"</strong> â€” cho báº¡n bÃ¨ trÃªn MXH biáº¿t mÃ¬nh Ä‘Ã£ chuyá»ƒn sang lÃ m BÄS. Khi há» cÃ³ nhu cáº§u, há» sáº½ nhá»› Ä‘áº¿n mÃ¬nh Ä‘áº§u tiÃªn.
            </p>
        </div>

        <!-- Flow Diagram -->
        <div class="glass-panel" style="border-color: rgba(56, 189, 248, 0.3); box-shadow: 0 0 40px rgba(56, 189, 248, 0.08);">
            <div class="section-header">
                <i data-lucide="layers" width="32" height="32"></i>
                <h2>SÆ¡ Äá»“ 5 Lá»›p Chiáº¿n LÆ°á»£c</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Má»—i lá»›p cÃ³ má»™t nhiá»‡m vá»¥ tÃ¢m lÃ½ riÃªng. <strong style="color:var(--text-primary);">Thá»© tá»± KHÃ”NG Ä‘Æ°á»£c Ä‘áº£o</strong> â€” náº¿u Ä‘áº£o sáº½ thÃ nh quáº£ng cÃ¡o, báº¡n bÃ¨ lÆ°á»›t qua ngay.</p>

            <div style="display:flex; flex-direction:column; gap:12px; padding-left: 20px; border-left: 3px solid rgba(56,189,248,0.3);">
                <div style="padding:12px 20px; background:rgba(56,189,248,0.06); border-radius:12px; border-left:4px solid #38bdf8;">
                    <span style="color:#38bdf8; font-weight:800; font-size:1.1rem;">01</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">Background</span>
                    <span style="color:var(--text-muted); margin-left:8px;">â†’ NgÆ°á»i Ä‘á»c: "Ã€ báº¡n nÃ y giá»i mÃ "</span>
                </div>
                <div style="padding:12px 20px; background:rgba(167,139,250,0.06); border-radius:12px; border-left:4px solid #a78bfa;">
                    <span style="color:#a78bfa; font-weight:800; font-size:1.1rem;">02</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">LÃ½ Do Chuyá»ƒn NgÃ nh</span>
                    <span style="color:var(--text-muted); margin-left:8px;">â†’ "á»ª BÄS cÅ©ng hay, mÃ¬nh cÅ©ng cáº§n"</span>
                </div>
                <div style="padding:12px 20px; background:rgba(52,211,153,0.06); border-radius:12px; border-left:4px solid #34d399;">
                    <span style="color:#34d399; font-weight:800; font-size:1.1rem;">03</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">Báº±ng Chá»©ng CÃ¡ NhÃ¢n</span>
                    <span style="color:var(--text-muted); margin-left:8px;">â†’ "Báº¡n nÃ y Ä‘Ã£ Ä‘áº§u tÆ° rá»“i Ã "</span>
                </div>
                <div style="padding:12px 20px; background:rgba(248,113,113,0.1); border-radius:12px; border-left:4px solid #f87171; box-shadow: 0 0 20px rgba(248,113,113,0.08);">
                    <span style="color:#f87171; font-weight:800; font-size:1.1rem;">04</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">â­ Äá»©ng TrÃªn Vai NgÆ°á»i Khá»•ng Lá»“</span>
                    <span style="color:var(--text-muted); margin-left:8px;">â†’ "CÃ³ sáº¿p giá»i Ä‘á»©ng sau, yÃªn tÃ¢m"</span>
                </div>
                <div style="padding:12px 20px; background:rgba(251,191,36,0.06); border-radius:12px; border-left:4px solid #fbbf24;">
                    <span style="color:#fbbf24; font-weight:800; font-size:1.1rem;">05</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">Sáº£n Pháº©m + CTA Má»m</span>
                    <span style="color:var(--text-muted); margin-left:8px;">â†’ "OK, khi nÃ o cáº§n mÃ¬nh sáº½ há»i"</span>
                </div>
            </div>
        </div>

        <!-- 5 Layer Cards -->
        <div class="grid-container single-col">

            <!-- Layer 1 -->
            <div class="card vip">
                <div class="badge">Lá»›p 1: Táº¡o Uy TÃ­n Ban Äáº§u</div>
                <h3>ðŸ‘¤ Background â€” "MÃ¬nh lÃ  ai, mÃ¬nh tá»«ng lÃ m gÃ¬"</h3>
                <div class="content-group">
                    <strong>Nhiá»‡m vá»¥ tÃ¢m lÃ½</strong>
                    <p>Chá»©ng minh mÃ¬nh lÃ  ngÆ°á»i <b>cÃ³ nÄƒng lá»±c</b>, khÃ´ng pháº£i vÃ¬ tháº¥t báº¡i má»›i Ä‘i bÃ¡n Ä‘áº¥t. ThÃ nh tÃ­ch cÅ© cho tháº¥y mÃ¬nh chá»§ Ä‘á»™ng chuyá»ƒn vÃ¬ <b>tham vá»ng</b>.</p>
                </div>
                <div class="content-group">
                    <strong>CÃ´ng thá»©c</strong>
                    <p><em>"Em chÃ o má»i ngÆ°á»i áº¡. TrÆ°á»›c Ä‘Ã¢y em lÃ m bÃªn [NGÃ€NH CÅ¨] Ä‘Æ°á»£c [Sá» NÄ‚M], cÅ©ng [THÃ€NH TÃCH]. NhÆ°ng em cáº£m tháº¥y [LÃ DO MUá»N THAY Äá»”I]."</em></p>
                </div>
                <div class="upgrade-box">
                    <p><b>VÃ­ dá»¥:</b> "TrÆ°á»›c em lÃ m káº¿ toÃ¡n 5 nÄƒm, thu nháº­p á»•n nhÆ°ng tháº¥y khÃ´ng cÃ³ cÆ¡ há»™i tÄƒng trÆ°á»Ÿng" â€¢ "Em vá»«a tá»‘t nghiá»‡p ÄH quáº£n trá»‹, muá»‘n tÃ¬m hÆ°á»›ng Ä‘i tiá»m nÄƒng hÆ¡n" â€¢ "Em lÃ  giÃ¡o viÃªn dáº¡y ToÃ¡n 3 nÄƒm, muá»‘n thá»­ sá»©c lÄ©nh vá»±c má»›i"</p>
                </div>
            </div>

            <!-- Layer 2 -->
            <div class="card safe">
                <div class="badge">Lá»›p 2: Táº¡o Sá»± Há»£p LÃ½ + Gieo Háº¡t</div>
                <h3>ðŸ”„ LÃ½ Do Chuyá»ƒn NgÃ nh â€” "Táº¡i sao BÄS?"</h3>
                <div class="content-group">
                    <strong>Nhiá»‡m vá»¥ tÃ¢m lÃ½</strong>
                    <p>Thá»ƒ hiá»‡n sá»± há»©ng thÃº <b>chÃ¢n tháº­t</b> (khÃ´ng pháº£i bá»‹ Ã©p bÃ¡n). Ngáº§m nháº¯c ngÆ°á»i Ä‘á»c: <b>"Báº¡n cÅ©ng sáº½ cáº§n BÄS Ä‘áº¥y"</b> â€” mua nhÃ , Ä‘áº§u tÆ°, thá»«a káº¿, kinh doanh...</p>
                </div>
                <div class="content-group">
                    <strong>CÃ´ng thá»©c</strong>
                    <p><em>"Sau khi tÃ¬m hiá»ƒu vá» BÄS thÃ¬ em tháº¥y [Cáº¢M NHáº¬N TÃCH Cá»°C]. Em nháº­n ra ráº±ng ai rá»“i cÅ©ng cáº§n Ä‘áº¿n BÄS â€” dÃ¹ lÃ  [NHU Cáº¦U 1], [NHU Cáº¦U 2], hay [NHU Cáº¦U 3]."</em></p>
                </div>
            </div>

            <!-- Layer 3 -->
            <div class="card warn">
                <div class="badge">Lá»›p 3: Social Proof CÃ¡ NhÃ¢n</div>
                <h3>ðŸ“ˆ Báº±ng Chá»©ng CÃ¡ NhÃ¢n â€” "MÃ¬nh Ä‘Ã£ lÃ m vÃ  thÃ nh cÃ´ng"</h3>
                <div class="content-group">
                    <strong>Nhiá»‡m vá»¥ tÃ¢m lÃ½</strong>
                    <p>MÃ¬nh khÃ´ng chá»‰ "nÃ³i suÃ´ng" â€” mÃ¬nh Ä‘Ã£ <b>bá» tiá»n tháº­t</b> hoáº·c cÃ³ tráº£i nghiá»‡m thá»±c táº¿. 2 keyword vÃ ng: <b style="color:#34d399;">Lá»¢I NHUáº¬N Tá»T</b> + <b style="color:#34d399;">AN TOÃ€N</b>.</p>
                </div>
                <div class="content-group">
                    <strong>CÃ´ng thá»©c</strong>
                    <p><em>"Báº£n thÃ¢n em cÅ©ng Ä‘Ã£ [HÃ€NH Äá»˜NG THá»°C Táº¾] vÃ  tháº¥y [Káº¾T QUáº¢]. ÄÃ³ chÃ­nh lÃ  Ä‘á»™ng lá»±c Ä‘á»ƒ em quyáº¿t Ä‘á»‹nh [CAM Káº¾T Vá»šI NGÃ€NH]."</em></p>
                </div>
                <div class="upgrade-box">
                    <p><b>Náº¿u chÆ°a tá»«ng Ä‘áº§u tÆ°?</b> Chuyá»ƒn thÃ nh: "Em chá»©ng kiáº¿n ngÆ°á»i thÃ¢n Ä‘áº§u tÆ° thÃ nh cÃ´ng" hoáº·c "Em Ä‘i xem thá»±c táº¿ vÃ  nháº­n ra tiá»m nÄƒng". Quan trá»ng lÃ  pháº£i cÃ³ <b>TRáº¢I NGHIá»†M THáº¬T</b>, dÃ¹ nhá».</p>
                </div>
            </div>

            <!-- Layer 4 (Critical) -->
            <div class="card danger">
                <div class="badge">â­ Lá»›p 4: Quan Trá»ng Nháº¥t</div>
                <h3>ðŸ”ï¸ Äá»©ng TrÃªn Vai NgÆ°á»i Khá»•ng Lá»“</h3>
                <div class="content-group">
                    <strong>Nhiá»‡m vá»¥ tÃ¢m lÃ½</strong>
                    <p style="color: #f87171;">Giáº£i quyáº¿t ná»—i lo lá»›n nháº¥t: <b>"Báº¡n nÃ y má»›i vÃ o ngÃ nh, cÃ³ Ä‘Ã¡ng tin khÃ´ng?"</b></p>
                    <p>â†’ CÃ¢u tráº£ lá»i: <b style="color:#34d399;">"MÃ¬nh má»›i, nhÆ°ng mÃ¬nh cÃ³ ngÆ°á»i GIá»ŽI dáº«n dáº¯t."</b> Uy tÃ­n Ä‘Æ°á»£c "vay mÆ°á»£n" tá»« sáº¿p/mentor â†’ khÃ¡ch yÃªn tÃ¢m ngay láº­p tá»©c.</p>
                </div>
                <div class="content-group">
                    <strong>CÃ´ng thá»©c</strong>
                    <p><em>"May máº¯n lÃ  em cÃ³ [Má»I QUAN Há»†] â€” hiá»‡n Ä‘ang lÃ  [Vá»Š TRÃ UY TÃN], cÃ³ [Sá» NÄ‚M] kinh nghiá»‡m. ÄÃ¢y lÃ  lá»£i tháº¿ Ä‘á»ƒ em [Lá»¢I ÃCH CHO KHÃCH HÃ€NG]."</em></p>
                </div>
                <div class="upgrade-box">
                    <p><b>"NgÆ°á»i khá»•ng lá»“" cÃ³ thá»ƒ lÃ :</b> TrÆ°á»Ÿng nhÃ³m, sáº¿p trá»±c tiáº¿p, cÃ´ng ty, mentor â€” khÃ´ng nháº¥t thiáº¿t pháº£i lÃ  ngÆ°á»i thÃ¢n. Quan trá»ng lÃ  <b>NGÆ¯á»œI THáº¬T, UY TÃN THáº¬T</b> Ä‘á»ƒ khi khÃ¡ch há»i sÃ¢u, cÃ³ ngÆ°á»i backup.</p>
                </div>
            </div>

            <!-- Layer 5 -->
            <div class="card vip">
                <div class="badge">Lá»›p 5: Gieo Háº¡t ThÃ nh CÃ´ng</div>
                <h3>ðŸ¤ Sáº£n Pháº©m + CTA Má»m â€” "LiÃªn há»‡ khi cáº§n"</h3>
                <div class="content-group">
                    <strong>Nhiá»‡m vá»¥ tÃ¢m lÃ½</strong>
                    <p>Äá»‹nh vá»‹ báº£n thÃ¢n lÃ  <b>"ngÆ°á»i tÆ° váº¥n"</b>, sáºµn sÃ ng giáº£i Ä‘Ã¡p chá»© khÃ´ng Ã©p mua. CTA bÃ i Ä‘áº§u <b>Cá» TÃŒNH pháº£i má»m</b> â€” chá»‰ cáº§n gieo háº¡t, bÃ¡n hÃ ng á»Ÿ nhá»¯ng bÃ i tiáº¿p theo.</p>
                </div>
                <div class="content-group">
                    <strong>CÃ´ng thá»©c</strong>
                    <p><em>"NÃªn náº¿u má»i ngÆ°á»i cÃ³ nhu cáº§u hay tháº¯c máº¯c gÃ¬ vá» BÄS, cá»© inbox em nhÃ©! Em sáºµn sÃ ng [GIÃ TRá»Š CHIA Sáºº]."</em></p>
                </div>
            </div>
        </div>

        <!-- Template Section -->
        <div class="glass-panel" style="margin-top: 50px; border-color: rgba(52, 211, 153, 0.3); box-shadow: 0 0 40px rgba(52, 211, 153, 0.08);">
            <div class="section-header">
                <i data-lucide="file-text" width="32" height="32" style="color: var(--accent-emerald);"></i>
                <h2 style="color:var(--text-primary);">Template Äiá»n Nhanh</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">NhÃ¢n sá»± má»›i chá»‰ cáº§n Ä‘iá»n thÃ´ng tin <b style="color:var(--text-primary);">THáº¬T</b> cá»§a mÃ¬nh vÃ o cÃ¡c chá»— trá»‘ng (mÃ u vÃ ng).</p>

            <div style="background: rgba(0,0,0,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 30px; font-size: 1rem; line-height: 2; color:var(--text-secondary);">
                <p>Em chÃ o má»i ngÆ°á»i áº¡ â¤ï¸</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">Lá»šP 1</span> TrÆ°á»›c Ä‘Ã¢y em lÃ m bÃªn <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NGÃ€NH CÅ¨]</span> Ä‘Æ°á»£c <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[Sá» NÄ‚M]</span>, cÅ©ng <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[THÃ€NH TÃCH]</span>. NhÆ°ng em cáº£m tháº¥y <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[LÃ DO THAY Äá»”I]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">Lá»šP 2</span> Sau khi tÃ¬m hiá»ƒu vá» BÄS thÃ¬ em tháº¥y <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[Cáº¢M NHáº¬N]</span>. Em nháº­n ra ráº±ng ai rá»“i cÅ©ng cáº§n Ä‘áº¿n BÄS â€” dÃ¹ lÃ  <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NHU Cáº¦U 1]</span>, <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NHU Cáº¦U 2]</span>, hay <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NHU Cáº¦U 3]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">Lá»šP 3</span> Báº£n thÃ¢n em cÅ©ng Ä‘Ã£ <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[TRáº¢I NGHIá»†M Vá»šI BÄS]</span> vÃ  tháº¥y <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[Káº¾T QUáº¢]</span>. ÄÃ³ chÃ­nh lÃ  Ä‘á»™ng lá»±c Ä‘á»ƒ em quyáº¿t Ä‘á»‹nh <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[CAM Káº¾T]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">Lá»šP 4</span> May máº¯n lÃ  em Ä‘Æ°á»£c <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[AI ÄÃ“]</span> â€” hiá»‡n Ä‘ang lÃ  <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[Vá»Š TRÃ]</span>, cÃ³ <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[Sá» NÄ‚M]</span> kinh nghiá»‡m â€” há»— trá»£ vÃ  dáº«n dáº¯t. ÄÃ¢y lÃ  lá»£i tháº¿ Ä‘á»ƒ em <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[Lá»¢I ÃCH CHO KHÃCH]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">Lá»šP 5</span> NÃªn náº¿u má»i ngÆ°á»i cÃ³ nhu cáº§u hay tháº¯c máº¯c gÃ¬ vá» BÄS, cá»© inbox em nhÃ©! Em sáºµn sÃ ng <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[GIÃ TRá»Š TÆ¯ Váº¤N]</span> ðŸ¡</p>
            </div>
        </div>

        <!-- Warning -->
        <div class="glass-panel" style="margin-top: 30px; border-color: rgba(248, 113, 113, 0.3);">
            <div class="section-header">
                <i data-lucide="alert-triangle" width="32" height="32" style="color: #f87171;"></i>
                <h2 style="color: #f87171;">LÆ°u Ã Quan Trá»ng</h2>
            </div>
            <div style="display:flex; flex-direction:column; gap:16px;">
                <div style="padding:16px; background:rgba(248,113,113,0.06); border-radius:12px; border-left:3px solid #f87171;">
                    <p style="color:#fca5a5;"><b>âŒ KhÃ´ng copy y nguyÃªn:</b> Má»—i nhÃ¢n sá»± PHáº¢I customize theo background tháº­t. Náº¿u nhiá»u ngÆ°á»i Ä‘Äƒng giá»‘ng nhau â†’ báº¡n bÃ¨ chung nháº­n ra â†’ máº¥t uy tÃ­n.</p>
                </div>
                <div style="padding:16px; background:rgba(251,191,36,0.06); border-radius:12px; border-left:3px solid #fbbf24;">
                    <p style="color:#fde68a;"><b>â° KhÃ´ng Ä‘Äƒng cÃ¹ng lÃºc:</b> KhÃ´ng Ä‘Äƒng cÃ¹ng ngÃ y/giá» náº¿u nhÃ¢n sá»± cÃ³ báº¡n chung trÃªn MXH.</p>
                </div>
                <div style="padding:16px; background:rgba(52,211,153,0.06); border-radius:12px; border-left:3px solid #34d399;">
                    <p style="color:#6ee7b7;"><b>âœï¸ YÃªu cáº§u viáº¿t tay:</b> NhÃ¢n sá»± tá»± viáº¿t, trÆ°á»Ÿng nhÃ³m sá»­a â€” bÃ i sáº½ tá»± nhiÃªn hÆ¡n ráº¥t nhiá»u so vá»›i copy paste.</p>
                </div>
                <div style="padding:16px; background:rgba(56,189,248,0.06); border-radius:12px; border-left:3px solid #38bdf8;">
                    <p style="color:#7dd3fc;"><b>ðŸ“¸ KÃ¨m hÃ¬nh áº£nh:</b> áº¢nh cÃ¡ nhÃ¢n chuyÃªn nghiá»‡p (chá»‰nh AI) hoáº·c áº£nh check-in táº¡i dá»± Ã¡n. Text-only bá»‹ thuáº­t toÃ¡n Facebook ghÃ¬m reach.</p>
                </div>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: Cáº¦M TAY CHá»ˆ VIá»†C
    // ---------------------------------------------------------
    'page-cam-tay-chi-viec': `
        <div class="page-title-bar">
            <h1>Cáº§m Tay Chá»‰ Viá»‡c</h1>
            <p class="page-subtitle">Há»‡ thá»‘ng video hÆ°á»›ng dáº«n thao tÃ¡c chi tiáº¿t</p>
        </div>

        <!-- PHáº¦N I: CÃ¡ch Ä‘Äƒng TikTok -->
        <div class="core-principle" style="border-left-color: var(--accent-orange); margin-top: 2rem;">
            <h2 style="color: var(--accent-orange); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;"><i class="fa-brands fa-tiktok" style="margin-right: 8px;"></i> I. CÃ¡ch Ä‘Äƒng TikTok</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/94KRLYAj5_E" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/lsBhj6PtV0U" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- PHáº¦N II: HÆ°á»›ng dáº«n cháº¡y QC FB -->
        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2rem;">
            <h2 style="color: var(--accent-blue); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;"><i class="fa-brands fa-facebook" style="margin-right: 8px;"></i> II. HÆ°á»›ng dáº«n cháº¡y quáº£ng cÃ¡o Facebook</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/8s4DPW1GL10" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/JklXrJBVPC4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- PHáº¦N III: ÄÄƒng tin -->
        <div class="core-principle" style="border-left-color: var(--accent-emerald); margin-top: 2rem;">
            <h2 style="color: var(--accent-emerald); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;"><i class="fa-solid fa-bullhorn" style="margin-right: 8px;"></i> III. ÄÄƒng tin</h2>
            
            <!-- Accordion ÄÄƒng Tin LÃ¡i KhÃ¡ch -->
            <details style="margin-bottom: 2rem; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); overflow: hidden;">
                <summary style="padding: 1.2rem 1.5rem; font-weight: 700; font-size: 1.2rem; cursor: pointer; color: var(--text-primary); outline: none; list-style: none;">
                    <i class="fa-solid fa-chess-knight" style="color: var(--accent-blue); margin-right: 10px;"></i> ÄÄƒng Tin LÃ¡i KhÃ¡ch (Báº¥m Ä‘á»ƒ xem Tuyá»‡t Ká»¹)
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid var(--border-glass); background: var(--bg-primary);">
                    <div class="core-principle">
                        <h2>ðŸŽ¯ NguyÃªn LÃ½ "Sá»± Tháº­t Ná»­a Vá»i" (Half-Truths)</h2>
                        <p>
                            Má»¥c tiÃªu tá»‘i thÆ°á»£ng cá»§a tin Ä‘Äƒng áº£o <strong>KHÃ”NG PHáº¢I Äá»‚ BÃN LÃ” Äáº¤T ÄÃ“</strong>, mÃ  lÃ  Ä‘á»ƒ <strong>Láº¤Y LEAD (KhÃ¡ch cÃ³ tiá»n vÃ  mÃ¡u Ä‘áº§u tÆ°)</strong>. 
                            Tuyá»‡t chiÃªu Ä‘á»‰nh cao lÃ  giÄƒng má»™t cÃ¡i báº«y hoÃ n háº£o, thu hÃºt khÃ¡ch vÃ o, sau Ä‘Ã³ tá»± tay <em>"Ä‘áº­p vá»¡"</em> báº«y Ä‘á»ƒ xÃ¢y dá»±ng lÃ²ng tin tuyá»‡t Ä‘á»‘i. Tá»« Ä‘Ã³ dáº¯t khÃ¡ch sang thá»‹ trÆ°á»ng má»¥c tiÃªu.
                        </p>
                    </div>

                    <div class="grid-container" style="margin-top: 1rem;">
                        <!-- Card 1 -->
                        <div class="card vip">
                            <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                            <h3>ÄÄƒng áº£o 100% cáº£ ná»™i dung, cáº£ hÃ¬nh áº£nh</h3>
                            <div class="content-group">
                                <strong>TÆ° duy</strong>
                                <p>Thu Ä‘Æ°á»£c nhiá»u lead Ä‘á»ƒ chÄƒm, nhá»¯ng lead nÃ y cÃ³ tiá»n vÃ  cÃ³ nhu cáº§u Ä‘áº§u tÆ°.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>ChÃ o má»›i vá» thá»‹ trÆ°á»ng: "Anh Æ¡i em tháº¥y anh Ä‘ang cÃ³ nhu cáº§u Ä‘áº§u tÆ°, bÃªn em Ä‘ang cÃ³ khu vá»±c sÃ¡t biá»ƒn vÃ  gáº§n khu cÃ´ng nghiá»‡p Ä‘áº¹p láº¯m anh áº¡ mÃ  cÃ³ HÆ¡n tá»· thÃ´i..."</p>
                            </div>
                        </div>

                        <!-- Card 2 -->
                        <div class="card vip">
                            <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                            <h3>ÄÄƒng áº£o, ná»™i dung tháº­t</h3>
                            <div class="content-group">
                                <strong>TÆ° duy</strong>
                                <p>Äá»ƒ kiáº¿m ra khÃ¡ch cÃ³ nhu cáº§u Ä‘áº§u tÆ° vÃ  mÃ¬nh sáº½ lÃ¡i khÃ¡ch.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>- "Em xin lá»—i anh, bÃ© nhÃ¢n viÃªn em báº¡n Ã½ Ä‘Äƒng nháº§m áº£nh. NhÆ°ng cÃ¡i ná»™i dung bÃ i tiá»m nÄƒng x2 lÃ  cÃ³ tháº­t 100% anh áº¡, á»Ÿ Ä‘Ã¢y tiá»m nÄƒng Ä‘áº¹p láº¯m. Em má»i anh ly cafe Ä‘á»ƒ em mang báº£n Ä‘á»“, máº·t báº±ng, sá»• Ä‘á» qua tÆ° váº¥n cho anh vá» tiá»m nÄƒng cá»§a khu nÃ y."</p>
                                <p>- Hoáº·c khi trao Ä‘á»•i vá»›i khÃ¡ch thÃ¬ sáº½ báº£o lÃ  bÃ¡n rá»“i, nhÆ°ng em cÃ²n má»™t vÃ i lÃ´ cÅ©ng á»Ÿ vá»‹ trÃ­ nÃ y ráº¥t lÃ  Ä‘áº¹p luÃ´n Ä‘á»ƒ em káº¿t báº¡n vá»›i anh thÃ´ng tin, sau Ä‘áº¥y láº¡i chÄƒm sÃ³c vÃ  má»i Ä‘i nhÆ° bÃ¬nh thÆ°á»ng.</p>
                            </div>
                        </div>

                        <!-- Card 3 -->
                        <div class="card vip">
                            <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                            <h3>ÄÄƒng áº£o, ná»™i dung áº£o</h3>
                            <div class="content-group">
                                <strong>TÆ° duy</strong>
                                <p>Äá»ƒ kiáº¿m ra khÃ¡ch cÃ³ nhu cáº§u Ä‘áº§u tÆ° vÃ  mÃ¬nh sáº½ lÃ¡i khÃ¡ch.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>"Em cÃ³ máº£nh nÃ y tháº­t anh áº¡, nhÆ°ng em chia sáº» tháº­t: nÃ³ dÃ­nh nháº¹ quy hoáº¡ch cÃ¢y xanh / Ä‘áº¥t vi báº±ng. NÃªn náº¿u anh lÃ  Ä‘áº§u tÆ° chuyÃªn nghiá»‡p thÃ¬ khu vá»±c nÃ y Ä‘áº§u tÆ° ráº¥t ok, nhÆ°ng náº¿u anh sá»£ quy hoáº¡ch vá» sau ngÆ°á»i ta lÃ m thÃ¬ em cÃ²n nhiá»u máº£nh cÃ³ sáºµn sá»• Ä‘á», á»Ÿ khu vá»±c cá»±c ká»³ tiá»m nÄƒng, em má»i anh Ä‘i cÃ  phÃª em qua chia sáº» thÃ´ng tin."</p>
                            </div>
                        </div>

                        <!-- Card 4 -->
                        <div class="card safe">
                            <div class="badge">An ToÃ n - Thá»±c Táº¿</div>
                            <h3>ÄÄƒng tháº­t, ná»™i dung tháº­t</h3>
                            <div class="content-group">
                                <strong>TÆ° duy</strong>
                                <p>MÆ°á»£n hÃ ng Ä‘áº¹p lÃ m "Chim Má»“i Háº¡ Táº§ng", khÃ´ng lá»«a dá»‘i khÃ¡ch hÃ ng, Ä‘Æ°a khÃ¡ch Ä‘i xem tháº­t nhÆ°ng sáº½ chÃª vÃ  hÆ°á»›ng vá» sáº£n pháº©m cá»§a mÃ¬nh.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>Khi káº¿t báº¡n Zalo gá»­i thÃ´ng tin thÃ¬ gá»­i khu Ä‘Ã³ tháº­t vÃ  gá»­i cáº£ cÃ¡c sáº£n pháº©m bÃªn mÃ¬nh Ä‘ang cÃ³. Äáº¿n khi dáº¯t khÃ¡ch Ä‘i thá»±c Ä‘á»‹a khu Ä‘Ã³ tháº­t, cá»‘ tÃ¬nh Ä‘Æ°a vÃ o cÃ¡c máº£nh dÃ­nh lá»—i: ÄÆ°á»ng Ä‘Ã¢m, gáº§n má»™, thÃ³p háº­u... KhÃ¡ch chÃª -> ÄÆ°a sang khu bÃªn mÃ¬nh rá»“i bÃ¡n.</p>
                            </div>
                        </div>

                        <!-- Card 5 -->
                        <div class="card danger">
                            <div class="badge">Khá»‘i lÆ°á»£ng lá»›n - Tá»‰ lá»‡ tháº¥p</div>
                            <h3>áº¢o toÃ n bá»™</h3>
                            <div class="content-group">
                                <strong>TÆ° duy</strong>
                                <p>Má»¥c tiÃªu cá»§a khÃ¡ch Ä‘i lÃ  Ä‘Æ°á»£c, Ä‘á»ƒ táº­n dá»¥ng sÃ³ng cá»§a cÃ´ng ty Ä‘Ã´ng khÃ¡ch Ä‘á»ƒ bÃ¡n.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xá»­ lÃ½</strong>
                                <p>Tá»›i nÆ¡i thÃ¬ báº» lÃ¡i nÃ³i chá»§ quay xe, bÃ¡o giÃ¡ thÃ¡ch lÃªn trÃªn trá»i, hoáº·c dáº¯t tháº³ng tá»›i má»™t cá»¥c má»“i khÃ¡c biá»‡t hoÃ n toÃ n. Hoáº·c khÃ´ng nÃ³i gÃ¬ Ä‘áº¿n lÃ´ Ä‘Äƒng áº£o. (CÃ¡ch nÃ y thÃ¬ khÃ¡ch ráº¥t nhiá»u nhÆ°ng tá»‰ lá»‡ chá»‘t tháº¥p).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
            
            <!-- III.A: ÄÄƒng tháº£o luáº­n -->
            <h3 style="color: var(--text-primary); font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 1rem;"><i class="fa-solid fa-users" style="color: var(--accent-emerald); margin-right: 8px;"></i> A. ÄÄƒng tháº£o luáº­n</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-bottom: 2rem;">
                <!-- Video Sáº¿p KhÆ°Æ¡ng -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://drive.google.com/file/d/10wmmWCAqNkOhLb1jJ47nN8Ulj7hChNye/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        Sáº¿p KhÆ°Æ¡ng hÆ°á»›ng dáº«n Ä‘Äƒng áº£o Group Ä‘Æ¡n giáº£n
                    </div>
                </div>
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/HYNbeb_ZcO4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/RM3XFKiUjWY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
                <!-- Video 3 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/w9PZIeT4s0E" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            <!-- III.B: ÄÄƒng market -->
            <h3 style="color: var(--text-primary); font-size: 1.3rem; margin-top: 2.5rem; margin-bottom: 1rem;"><i class="fa-solid fa-store" style="color: var(--accent-emerald); margin-right: 8px;"></i> B. ÄÄƒng market</h3>
            
            <h4 style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1rem;">1. Cháº¡y bÆ¡m tiá»n</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-bottom: 2rem;">
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/wiRI-ugPz8s" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            <h4 style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1rem;">2. ÄÄƒng free</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px;">
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/xFmg2692jx0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/WoqdZBFXzzQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
                <!-- Video 3 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/KKkzLp71HX0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: CHÃ‚N DUNG KHÃCH HÃ€NG
    // ---------------------------------------------------------
    'page-chan-dung-khach-hang': `
        <style>
            .cdkh-hero {
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.12) 0%, rgba(15, 23, 42, 0) 60%);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 20px;
                padding: 2.5rem 2.5rem 2rem;
                margin-bottom: 2.5rem;
                display: flex;
                align-items: center;
                gap: 2.5rem;
                flex-wrap: wrap;
            }
            .cdkh-hero-icon {
                width: 80px; height: 80px;
                background: linear-gradient(135deg, #d4af37, #f3e5ab);
                border-radius: 20px;
                display: flex; align-items: center; justify-content: center;
                font-size: 2.2rem;
                flex-shrink: 0;
                box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
            }
            .cdkh-hero-text h1 {
                font-size: 2rem; font-weight: 800;
                background: linear-gradient(to right, #d4af37, #f3e5ab);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                margin-bottom: 0.5rem;
            }
            .cdkh-hero-text p { color: var(--text-muted); font-size: 1.05rem; margin: 0; }
            .cdkh-stats {
                display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 1.5rem;
            }
            .cdkh-stat {
                background: rgba(212, 175, 55, 0.08);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 12px; padding: 0.7rem 1.2rem;
                text-align: center;
            }
            .cdkh-stat .num { font-size: 1.6rem; font-weight: 800; color: #d4af37; }
            .cdkh-stat .lbl { font-size: 0.78rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }

            /* Slideshow */
            .cdkh-slideshow {
                position: relative;
                background: rgba(0,0,0,0.04);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-radius: 20px;
                overflow: hidden;
                margin-bottom: 2rem;
                box-shadow: 0 20px 60px rgba(0,0,0,0.15);
            }
            .cdkh-slides-track {
                display: flex;
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cdkh-slide {
                min-width: 100%;
                position: relative;
            }
            .cdkh-slide img {
                width: 100%; display: block;
                border-radius: 0;
                aspect-ratio: 16/9;
                object-fit: contain;
                background: #0f172a;
            }
            .cdkh-slide-label {
                position: absolute; bottom: 0; left: 0; right: 0;
                background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%);
                padding: 1.5rem 1.5rem 1rem;
                color: #fff;
                font-size: 0.85rem; letter-spacing: 1px;
                text-transform: uppercase; font-weight: 600;
                opacity: 0.8;
            }
            .cdkh-btn {
                position: absolute; top: 50%; transform: translateY(-50%);
                background: rgba(212, 175, 55, 0.85); border: none; border-radius: 50%;
                width: 48px; height: 48px; cursor: pointer;
                font-size: 1.2rem; color: #000; font-weight: 700;
                display: flex; align-items: center; justify-content: center;
                z-index: 10; transition: all 0.2s ease;
                backdrop-filter: blur(4px);
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            }
            .cdkh-btn:hover { background: #d4af37; transform: translateY(-50%) scale(1.1); }
            .cdkh-btn-prev { left: 16px; }
            .cdkh-btn-next { right: 16px; }
            .cdkh-counter {
                position: absolute; bottom: 16px; right: 20px;
                background: rgba(0,0,0,0.5); color: #d4af37;
                padding: 4px 12px; border-radius: 20px;
                font-size: 0.85rem; font-weight: 700;
                backdrop-filter: blur(4px);
                z-index: 10;
            }

            /* Dots */
            .cdkh-dots {
                display: flex; justify-content: center; gap: 8px;
                margin-bottom: 2rem;
                flex-wrap: wrap;
            }
            .cdkh-dot {
                width: 10px; height: 10px; border-radius: 50%;
                background: rgba(212, 175, 55, 0.25);
                border: 1px solid rgba(212, 175, 55, 0.4);
                cursor: pointer; transition: all 0.3s ease;
                padding: 0;
            }
            .cdkh-dot.active {
                background: #d4af37;
                transform: scale(1.3);
                box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
            }

            /* Thumbnails grid */
            .cdkh-thumbs-title {
                font-size: 1rem; font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 1rem;
                display: flex; align-items: center; gap: 8px;
            }
            .cdkh-thumbs {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                gap: 12px;
                margin-bottom: 2.5rem;
            }
            .cdkh-thumb {
                border-radius: 12px;
                overflow: hidden;
                border: 2px solid transparent;
                cursor: pointer;
                transition: all 0.25s ease;
                position: relative;
                background: #0f172a;
            }
            .cdkh-thumb img {
                width: 100%; aspect-ratio: 16/9;
                object-fit: contain; display: block;
            }
            .cdkh-thumb:hover { border-color: rgba(212, 175, 55, 0.6); transform: translateY(-2px); }
            .cdkh-thumb.active { border-color: #d4af37; box-shadow: 0 0 16px rgba(212, 175, 55, 0.4); }
            .cdkh-thumb-num {
                position: absolute; top: 6px; left: 8px;
                background: rgba(212, 175, 55, 0.85);
                color: #000; font-size: 0.7rem; font-weight: 800;
                padding: 2px 7px; border-radius: 6px;
            }

            /* Section index cards */
            .cdkh-index {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                gap: 14px;
                margin-bottom: 2rem;
            }
            .cdkh-index-card {
                background: var(--bg-secondary);
                border: 1px solid var(--border-glass);
                border-radius: 14px;
                padding: 1rem 1.2rem;
                cursor: pointer;
                transition: all 0.25s ease;
                display: flex; align-items: flex-start; gap: 12px;
            }
            .cdkh-index-card:hover {
                border-color: rgba(212, 175, 55, 0.5);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(212, 175, 55, 0.1);
            }
            .cdkh-index-num {
                width: 32px; height: 32px; border-radius: 8px;
                background: linear-gradient(135deg, #d4af37, #f3e5ab);
                color: #000; font-weight: 800; font-size: 0.85rem;
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
            }
            .cdkh-index-info .title { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
            .cdkh-index-info .sub { font-size: 0.78rem; color: var(--text-muted); margin-top: 2px; }

            .cdkh-tip-box {
                background: rgba(212, 175, 55, 0.06);
                border: 1px solid rgba(212, 175, 55, 0.2);
                border-left: 4px solid #d4af37;
                border-radius: 0 14px 14px 0;
                padding: 1.2rem 1.5rem;
                margin-bottom: 2rem;
                color: var(--text-secondary);
                font-size: 0.95rem;
                line-height: 1.7;
            }
            .cdkh-tip-box strong { color: #d4af37; }
            @media (max-width: 600px) {
                .cdkh-hero { flex-direction: column; gap: 1.2rem; padding: 1.5rem; }
                .cdkh-thumbs { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); }
                .cdkh-index { grid-template-columns: 1fr 1fr; }
                .cdkh-btn { width: 36px; height: 36px; font-size: 1rem; }
            }
        </style>

        <!-- HERO HEADER -->
        <div class="cdkh-hero">
            <div class="cdkh-hero-icon">ðŸŽ¯</div>
            <div class="cdkh-hero-text">
                <h1>ChÃ¢n Dung KhÃ¡ch HÃ ng Má»¥c TiÃªu</h1>
                <p>Album Ä‘Ã o táº¡o ná»™i bá»™ TL Land Â· Nháº­n diá»‡n Ä‘Ãºng khÃ¡ch â€“ Ä‘i xem Ä‘Ãºng ngÆ°á»i â€“ chá»‘t nhanh hÆ¡n</p>
                <div class="cdkh-stats">
                    <div class="cdkh-stat"><div class="num">11</div><div class="lbl">NhÃ³m khÃ¡ch</div></div>
                    <div class="cdkh-stat"><div class="num">7</div><div class="lbl">CÃ¢u há»i lá»c</div></div>
                    <div class="cdkh-stat"><div class="num">5</div><div class="lbl">Má»©c Ä‘á»™ nÃ©t</div></div>
                    <div class="cdkh-stat"><div class="num">12</div><div class="lbl">Slides</div></div>
                </div>
            </div>
        </div>

        <!-- TIP -->
        <div class="cdkh-tip-box">
            ðŸ’¡ <strong>CÃ¡ch dÃ¹ng:</strong> Xem tá»«ng slide Ä‘á»ƒ náº¯m vá»¯ng chÃ¢n dung tá»«ng nhÃ³m khÃ¡ch. Click vÃ o thumbnail bÃªn dÆ°á»›i Ä‘á»ƒ nháº£y nhanh Ä‘áº¿n slide cáº§n xem. Ãp dá»¥ng bá»™ <strong>7 cÃ¢u há»i lá»c</strong> trÆ°á»›c khi má»i khÃ¡ch Ä‘i xem thá»±c Ä‘á»‹a.
        </div>

        <!-- SLIDESHOW CHÃNH -->
        <div class="cdkh-slideshow" id="cdkhSlideshow">
            <div class="cdkh-slides-track" id="cdkhTrack">
                <div class="cdkh-slide"><img src="/training-hub/assets/01_album_khach_hang_tl_land_pro.webp" alt="Slide 01 - Tá»•ng quan" loading="eager"/><div class="cdkh-slide-label">Tá»•ng Quan Â· ChÃ¢n Dung KhÃ¡ch HÃ ng</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/02_album_khach_hang_tl_land_pro.webp" alt="Slide 02 - TÆ° duy lá»c khÃ¡ch" loading="lazy"/><div class="cdkh-slide-label">01 Â· TÆ° Duy Lá»c KhÃ¡ch</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/03_album_khach_hang_tl_land_pro.webp" alt="Slide 03 - NhÃ³m cá»‘t lÃµi" loading="lazy"/><div class="cdkh-slide-label">02 Â· NhÃ³m Cá»‘t LÃµi</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/04_album_khach_hang_tl_land_pro.webp" alt="Slide 04 - NhÃ³m tiá»m nÄƒng" loading="lazy"/><div class="cdkh-slide-label">03 Â· NhÃ³m Tiá»m NÄƒng</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/05_album_khach_hang_tl_land_pro.webp" alt="Slide 05 - NhÃ³m cáº§n chiáº¿n thuáº­t" loading="lazy"/><div class="cdkh-slide-label">04 Â· NhÃ³m Cáº§n Chiáº¿n Thuáº­t</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/06_album_khach_hang_tl_land_pro.webp" alt="Slide 06 - Loáº¡i / Kiá»ƒm chá»©ng" loading="lazy"/><div class="cdkh-slide-label">05 Â· Loáº¡i / Kiá»ƒm Chá»©ng</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/07_album_khach_hang_tl_land_pro.webp" alt="Slide 07 - Dáº¥u hiá»‡u nháº­n diá»‡n" loading="lazy"/><div class="cdkh-slide-label">06 Â· Dáº¥u Hiá»‡u Nháº­n Diá»‡n Avatar & Thiáº¿t Bá»‹</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/08_album_khach_hang_tl_land_pro.webp" alt="Slide 08 - TÃ­n hiá»‡u qua chat" loading="lazy"/><div class="cdkh-slide-label">07 Â· TÃ­n Hiá»‡u Qua Chat</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/09_album_khach_hang_tl_land_pro.webp" alt="Slide 09 - Bá»™ cÃ¢u há»i vÃ ng" loading="lazy"/><div class="cdkh-slide-label">08 Â· Bá»™ CÃ¢u Há»i VÃ ng â€“ 7 CÃ¢u Lá»c KhÃ¡ch</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/10_album_khach_hang_tl_land_pro.webp" alt="Slide 10 - Flow lá»c khÃ¡ch" loading="lazy"/><div class="cdkh-slide-label">09 Â· Flow Lá»c KhÃ¡ch â€“ Quy TrÃ¬nh 7 BÆ°á»›c</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/11_album_khach_hang_tl_land_pro.webp" alt="Slide 11 - Báº£ng Ä‘iá»ƒm" loading="lazy"/><div class="cdkh-slide-label">10 Â· Báº£ng Äiá»ƒm â€“ Chá»n Chiáº¿n Thuáº­t ChÄƒm SÃ³c</div></div>
                <div class="cdkh-slide"><img src="/training-hub/assets/12_album_khach_hang_tl_land_pro.webp" alt="Slide 12 - Sau khi cá»c" loading="lazy"/><div class="cdkh-slide-label">11 Â· Sau Khi Cá»c â€“ Giá»¯ Niá»m Tin & Táº¡o Giá»›i Thiá»‡u</div></div>
            </div>
            <button class="cdkh-btn cdkh-btn-prev" onclick="window.cdkhSlideshow.prev()" title="Slide trÆ°á»›c">&#8592;</button>
            <button class="cdkh-btn cdkh-btn-next" onclick="window.cdkhSlideshow.next()" title="Slide tiáº¿p theo">&#8594;</button>
            <div class="cdkh-counter" id="cdkhCounter">1 / 12</div>
        </div>

        <!-- DOTS -->
        <div class="cdkh-dots" id="cdkhDots">
            <button class="cdkh-dot active" onclick="window.cdkhSlideshow.goTo(0)" title="Slide 1"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(1)" title="Slide 2"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(2)" title="Slide 3"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(3)" title="Slide 4"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(4)" title="Slide 5"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(5)" title="Slide 6"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(6)" title="Slide 7"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(7)" title="Slide 8"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(8)" title="Slide 9"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(9)" title="Slide 10"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(10)" title="Slide 11"></button>
            <button class="cdkh-dot" onclick="window.cdkhSlideshow.goTo(11)" title="Slide 12"></button>
        </div>

        <!-- Má»¤C Lá»¤C NHANH -->
        <div style="margin-bottom:1.2rem;">
            <div class="cdkh-thumbs-title">
                <span style="color:#d4af37;">ðŸ“‹</span> Má»¥c Lá»¥c Nhanh â€” Báº¥m Ä‘á»ƒ nháº£y Ä‘áº¿n slide
            </div>
            <div class="cdkh-index">
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(0)"><div class="cdkh-index-num">00</div><div class="cdkh-index-info"><div class="title">Tá»•ng Quan</div><div class="sub">11 nhÃ³m Â· 7 cÃ¢u há»i Â· 5 má»©c nÃ©t</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(1)"><div class="cdkh-index-num">01</div><div class="cdkh-index-info"><div class="title">TÆ° Duy Lá»c KhÃ¡ch</div><div class="sub">5 nguyÃªn táº¯c lÃµi khi xá»­ lÃ½ khÃ¡ch</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(2)"><div class="cdkh-index-num">02</div><div class="cdkh-index-info"><div class="title">4 NhÃ³m Cá»‘t LÃµi</div><div class="sub">VP Â· KOL Â· Tiá»ƒu thÆ°Æ¡ng Â· GiÃ¡o viÃªn</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(3)"><div class="cdkh-index-num">03</div><div class="cdkh-index-info"><div class="title">4 NhÃ³m Tiá»m NÄƒng</div><div class="sub">QuÃ¢n Ä‘á»™i Â· GPMB Â· Sá»‘t Ä‘áº¥t Â· Ná»™i thÃ nh</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(4)"><div class="cdkh-index-num">04</div><div class="cdkh-index-info"><div class="title">3 NhÃ³m Cáº§n Chiáº¿n Thuáº­t</div><div class="sub">F1 Ä‘áº§u tÆ° Â· Freelance nhá» Â· F0 Ã­t vá»‘n</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(5)"><div class="cdkh-index-num">05</div><div class="cdkh-index-info"><div class="title">Loáº¡i & Kiá»ƒm Chá»©ng</div><div class="sub">Ai nÃªn loáº¡i sá»›m Â· Ai cáº§n kiá»ƒm tra thÃªm</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(6)"><div class="cdkh-index-num">06</div><div class="cdkh-index-info"><div class="title">Dáº¥u Hiá»‡u Avatar & Thiáº¿t Bá»‹</div><div class="sub">TÃ­n hiá»‡u tá»‘t vs cáº£nh bÃ¡o qua áº£nh Ä‘áº¡i diá»‡n</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(7)"><div class="cdkh-index-num">07</div><div class="cdkh-index-info"><div class="title">TÃ­n Hiá»‡u Qua Chat</div><div class="sub">PhÃ¢n biá»‡t khÃ¡ch tháº­t vs khÃ¡ch áº£o</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(8)"><div class="cdkh-index-num">08</div><div class="cdkh-index-info"><div class="title">7 CÃ¢u Há»i VÃ ng</div><div class="sub">Lá»c trÆ°á»›c khi má»i Ä‘i xem thá»±c Ä‘á»‹a</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(9)"><div class="cdkh-index-num">09</div><div class="cdkh-index-info"><div class="title">Flow 7 BÆ°á»›c Nháº­n Diá»‡n</div><div class="sub">Checklist trÆ°á»›c khi chá»‘t lá»‹ch Ä‘i thá»±c Ä‘á»‹a</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(10)"><div class="cdkh-index-num">10</div><div class="cdkh-index-info"><div class="title">Báº£ng Äiá»ƒm</div><div class="sub">Lá»­a â‰¥80 Â· Cam 50-79 Â· VÃ ng 20-49 Â· LÃ¡ 0-19</div></div></div>
                <div class="cdkh-index-card" onclick="window.cdkhSlideshow.goTo(11)"><div class="cdkh-index-num">11</div><div class="cdkh-index-info"><div class="title">ChÄƒm Sau Cá»c</div><div class="sub">NgÃ y 1 Â· 3 Â· 7 Â· 30 Ä‘á»ƒ giá»¯ niá»m tin & referral</div></div></div>
            </div>
        </div>

        <!-- THUMBNAILS -->
        <div class="cdkh-thumbs-title">
            <span style="color:#d4af37;">ðŸ–¼ï¸</span> Táº¥t Cáº£ Slides â€” Báº¥m Ä‘á»ƒ xem nhanh
        </div>
        <div class="cdkh-thumbs" id="cdkhThumbs">
            <div class="cdkh-thumb active" onclick="window.cdkhSlideshow.goTo(0)"><img src="/training-hub/assets/01_album_khach_hang_tl_land_pro.webp" alt="01" loading="lazy"/><span class="cdkh-thumb-num">01</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(1)"><img src="/training-hub/assets/02_album_khach_hang_tl_land_pro.webp" alt="02" loading="lazy"/><span class="cdkh-thumb-num">02</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(2)"><img src="/training-hub/assets/03_album_khach_hang_tl_land_pro.webp" alt="03" loading="lazy"/><span class="cdkh-thumb-num">03</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(3)"><img src="/training-hub/assets/04_album_khach_hang_tl_land_pro.webp" alt="04" loading="lazy"/><span class="cdkh-thumb-num">04</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(4)"><img src="/training-hub/assets/05_album_khach_hang_tl_land_pro.webp" alt="05" loading="lazy"/><span class="cdkh-thumb-num">05</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(5)"><img src="/training-hub/assets/06_album_khach_hang_tl_land_pro.webp" alt="06" loading="lazy"/><span class="cdkh-thumb-num">06</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(6)"><img src="/training-hub/assets/07_album_khach_hang_tl_land_pro.webp" alt="07" loading="lazy"/><span class="cdkh-thumb-num">07</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(7)"><img src="/training-hub/assets/08_album_khach_hang_tl_land_pro.webp" alt="08" loading="lazy"/><span class="cdkh-thumb-num">08</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(8)"><img src="/training-hub/assets/09_album_khach_hang_tl_land_pro.webp" alt="09" loading="lazy"/><span class="cdkh-thumb-num">09</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(9)"><img src="/training-hub/assets/10_album_khach_hang_tl_land_pro.webp" alt="10" loading="lazy"/><span class="cdkh-thumb-num">10</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(10)"><img src="/training-hub/assets/11_album_khach_hang_tl_land_pro.webp" alt="11" loading="lazy"/><span class="cdkh-thumb-num">11</span></div>
            <div class="cdkh-thumb" onclick="window.cdkhSlideshow.goTo(11)"><img src="/training-hub/assets/12_album_khach_hang_tl_land_pro.webp" alt="12" loading="lazy"/><span class="cdkh-thumb-num">12</span></div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: CÃC KHÃ“A Há»ŒC
    // ---------------------------------------------------------
    'page-cac-khoa-hoc': `
        <div class="page-title-bar">
            <h1>CÃ¡c KhÃ³a Há»c</h1>
            <p class="page-subtitle">Há»‡ thá»‘ng Ä‘Ã o táº¡o qua video</p>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2rem;">
            <h2 style="color: var(--text-primary); font-size: 1.3rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-play" style="color: var(--accent-blue); margin-right: 8px;"></i> 1. TÆ° duy cháº¡y marketing: HÆ°á»›ng dáº«n lÃ m khÃ¡ch cá»§a sáº¿p Doanh</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/kuStPMgUD8w" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        TÆ° duy MKT
                    </div>
                </div>

                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/vr24eW0RfcQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        TÆ° duy MKT
                    </div>
                </div>

                <!-- Video 3 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/rJW527JbOxI" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        TÆ° duy MKT
                    </div>
                </div>

                <!-- Video 4 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/DTdYGlZFTAw" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        TÆ° duy MKT
                    </div>
                </div>
            </div>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-purple); margin-top: 2rem;">
            <h2 style="color: var(--text-primary); font-size: 1.3rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-robot" style="color: var(--accent-purple); margin-right: 8px;"></i> 2. Sá»­ dá»¥ng AI vÃ o cÃ´ng viá»‡c</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <!-- Video 2.1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://drive.google.com/file/d/13rPLIQBTaelvQBn4miZiCU7GX-YI-6p-/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        2.1: Chá»‰nh vÃ  lÃ m Ä‘áº¹p máº·t báº±ng
                    </div>
                </div>

                <!-- Video 2.2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://drive.google.com/file/d/10wmmWCAqNkOhLb1jJ47nN8Ulj7hChNye/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        2.2: Chá»‰nh sá»• Ä‘á»
                    </div>
                </div>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: ADMIN - QUáº¢N LÃ TRUY Cáº¬P (render bá»Ÿi auth.js)
    // ---------------------------------------------------------
    'page-admin-emails': `
        <div class="admin-loading">
            <i class="fa-solid fa-spinner fa-spin"></i> Äang táº£i trang quáº£n lÃ½...
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: TUYá»†T Ká»¸ LÃI KHÃCH THá»°C CHIáº¾N
    // ---------------------------------------------------------
    'page-tuyet-ky-lai-khach': `
        <div class="page-title-bar">
            <h1>Tuyá»‡t ChiÃªu LÃ¡i KhÃ¡ch</h1>
            <p class="page-subtitle">GiÃ¡o trÃ¬nh Ä‘Ã o táº¡o Sale BÄS: Äá»‹nh vá»‹ tá»‡p khÃ¡ch tiá»m nÄƒng tá»« ká»‹ch báº£n tin Ä‘Äƒng áº£o.</p>
        </div>

        <div class="core-principle">
            <h2>ðŸŽ¯ NguyÃªn LÃ½ "Sá»± Tháº­t Ná»­a Vá»i" (Half-Truths)</h2>
            <p>
                Má»¥c tiÃªu tá»‘i thÆ°á»£ng cá»§a tin Ä‘Äƒng áº£o <strong>KHÃ”NG PHáº¢I Äá»‚ BÃN LÃ” Äáº¤T ÄÃ“</strong>, mÃ  lÃ  Ä‘á»ƒ <strong>Láº¤Y LEAD (KhÃ¡ch cÃ³ tiá»n vÃ  mÃ¡u Ä‘áº§u tÆ°)</strong>. 
                Tuyá»‡t chiÃªu Ä‘á»‰nh cao lÃ  giÄƒng má»™t cÃ¡i báº«y hoÃ n háº£o, thu hÃºt khÃ¡ch vÃ o, sau Ä‘Ã³ tá»± tay <em>"Ä‘áº­p vá»¡"</em> báº«y Ä‘á»ƒ nháº­p vai <strong>NgÆ°á»i báº£o vá»‡/ChuyÃªn gia</strong> nháº±m xÃ¢y dá»±ng lÃ²ng tin tuyá»‡t Ä‘á»‘i. Tá»« Ä‘Ã³ dáº¯t khÃ¡ch sang thá»‹ trÆ°á»ng má»¥c tiÃªu.
            </p>
        </div>

        <div class="grid-container">

            <!-- Chiáº¿n thuáº­t 1 -->
            <div class="card vip">
                <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                <h3>1. TÆ° duy "Tuyá»ƒn Táº­p Lead" & Telesale Gá»i Láº¡i</h3>
                
                <div class="content-group">
                    <strong>CÃ¡ch lÃ m</strong>
                    <p>ÄÄƒng áº£o 100% (VÃ­ dá»¥: NhÃ  lá»t khe siÃªu Ä‘áº¹p HN). Thu lead vá» CRM vÃ  BÆ  KHÃCH vÃ i ngÃ y.</p>
                </div>
                <div class="content-group">
                    <strong>Xá»­ lÃ½</strong>
                    <p>ÄÃ³ng vai Telesale gá»i láº¡i sáº£ng khoÃ¡i: "Alo anh Æ¡i em tháº¥y anh Ä‘ang quan tÃ¢m Ä‘áº§u tÆ°... BÃªn em Ä‘ang cÃ³ sÃ³ng tá»‘t á»Ÿ khu cÃ´ng nghiá»‡p..."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>CÃº Báº¯c Cáº§u:</strong> "Anh thÃ­ch lá»t khe ná»™i Ä‘Ã´ vÃ¬ thanh khoáº£n Ä‘Ãºng khÃ´ng? NhÆ°ng giá» giÃ¡ ká»‹ch tráº§n rá»“i, tá»‡p khÃ¡ch HN cá»§a em Ä‘ang rÃºt vá»‘n phÃ¢n bá»• vá» Ä‘áº¥t Tá»‰nh biÃªn Ä‘á»™ cao hÆ¡n nhiá»u. Anh xem cÆ¡ cáº¥u dÃ²ng tiá»n nhá»‹p nÃ y khÃ´ng em ráº½ sÃ³ng?"</p>
                </div>
            </div>

            <!-- Chiáº¿n thuáº­t 3 -->
            <div class="card vip">
                <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                <h3>3. BÃ i ngá»­a "Marketing ÄÄƒng Nháº§m"</h3>
                
                <div class="content-group">
                    <strong>CÃ¡ch lÃ m</strong>
                    <p>Cá»‘ tÃ¬nh ghÃ©p áº£nh ná»™i Ä‘Ã´ ráº¥t mÆ°á»£t vÃ o bÃ i Tá»‰nh. Láº¥y Ä‘Æ°á»£c sá»‘ cá»§a khÃ¡ch xong ngá»­a bÃ i luÃ´n.</p>
                </div>
                <div class="content-group">
                    <strong>Xá»­ lÃ½</strong>
                    <p>"Em xin lá»—i anh, bÃ© thá»±c táº­p bÃªn em Ãºp lá»™n bá»™ áº£nh. NhÆ°ng cÃ¡i ná»™i dung bÃ i tiá»m nÄƒng x2 lÃ  cÃ³ tháº­t. Em má»i anh ly cafe Ä‘á»ƒ em tÆ° váº¥n phÃ¢n tÃ­ch rÃ nh rá»t khu nÃ y."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Äá»n BÃ¹ Tá»™i Lá»—i:</strong> Biáº¿n lá»—i láº§m thÃ nh "Ä‘áº·c quyá»n". "Pháº¡t em cafe nhÃ©, Ä‘á»ƒ Ä‘á»n bÃ¹ em add anh vÃ o Group kÃ­n/gá»­i list ná»™i bá»™ hÃ ng ngá»™p chÆ°a tung cho truyá»n thÃ´ng, anh lÆ°á»›t xem nháº·t Ä‘Æ°á»£c cÄƒn nÃ o khÃ´ng."</p>
                </div>
            </div>

            <!-- Chiáº¿n thuáº­t 6 -->
            <div class="card vip">
                <div class="badge">NÃ©t Nháº¥t - Chá»‘t Cao</div>
                <h3>6. Nháº­p vai "ChuyÃªn Gia Cáº£nh BÃ¡o"</h3>
                
                <div class="content-group">
                    <strong>CÃ¡ch lÃ m</strong>
                    <p>Nháº­n CÃ“ lÃ´ Ä‘áº¥t giÃ¡ ráº» Ä‘Ã³ tháº­t. NhÆ°ng khi khÃ¡ch há»i sÃ¢u thÃ¬ háº¡ giá»ng.</p>
                </div>
                <div class="content-group">
                    <strong>Xá»­ lÃ½</strong>
                    <p>"LÃ´ Ä‘Ã³ ráº» tháº­t anh áº¡, nhÆ°ng em nÃ³i chÃ¢n tÃ¬nh: nÃ³ dÃ­nh nháº¹ quy hoáº¡ch cÃ¢y xanh / Ä‘áº¥t vi báº±ng. Em khuyÃªn anh nÃ© ra. Táº§m tiá»n anh rÃ¡ng nhá»‰nh xÃ­u, láº¥y sang mÃ£ nÃ y cá»§a em sá»• cáº¥t kÃ©t ngá»§ cho ngon."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Táº¡o Vá»‹ Tháº¿:</strong> Sáºµn sÃ ng chÃª nguá»“n hÃ ng phá»…u Ä‘á»ƒ tÃ´n vinh sá»± tháº­t thÃ  cá»§a báº£n thÃ¢n. KhÃ¡ch thÃ  tin má»™t ngÆ°á»i dÃ¡m chÃª lÃ´ ráº», cÃ²n hÆ¡n tin Ä‘á»©a khen lÃ´ Ä‘Ã³ lÃªn mÃ¢y.</p>
                </div>
            </div>

            <!-- Chiáº¿n thuáº­t 5 -->
            <div class="card safe">
                <div class="badge">An ToÃ n - Thá»±c Táº¿</div>
                <h3>5. MÆ°u MÆ°á»£n hÃ ng Ä‘áº¹p lÃ m "Chim Má»“i Háº¡ Táº§ng"</h3>
                
                <div class="content-group">
                    <strong>CÃ¡ch lÃ m</strong>
                    <p>ÄÄƒng khu háº¡ táº§ng cá»±c Ä‘áº¹p, sÃ¡t dá»± Ã¡n cÃ´ng ty Ä‘ang Ä‘Ã¡nh. BÃ¡o Ä‘Ãºng giÃ¡ thá»‹ trÆ°á»ng bÃ¬nh thÆ°á»ng.</p>
                </div>
                <div class="content-group">
                    <strong>Xá»­ lÃ½</strong>
                    <p>Dáº¯t khÃ¡ch Ä‘i thá»±c Ä‘á»‹a khu Ä‘Ã³ tháº­t, cá»‘ tÃ¬nh Ä‘Æ°a vÃ o cÃ¡c máº£nh dÃ­nh lá»—i: ÄÆ°á»ng Ä‘Ã¢m, gáº§n má»™, thÃ³p háº­u... KhÃ¡ch chÃª -> Ráº½ vÃ´ lÄƒng: "Tiá»‡n Ä‘Ã¢y qua xem dá»± Ã¡n tá»¥i em, sáº¡ch tÆ°ng khÃ´ng tÃ¬ váº¿t."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Má» Neo KÃ©p:</strong> ÄÆ°a xem lÃ´ Lá»–I NHáº¤T Ä‘á»ƒ táº¡o Ä‘Ã¡y giÃ¡. Xong Ä‘Æ°a lÃ´ Äáº¸P NHáº¤T giÃ¡ trÃªn trá»i. Cuá»‘i cÃ¹ng má»›i chá»‘t lÃ´ CÃ”NG TY (Äáº¹p ngang lÃ´ 2 mÃ  giÃ¡ nhá»‰nh hÆ¡n lÃ´ 1). KhÃ¡ch tháº¥y há»i, chá»‘t!</p>
                </div>
            </div>

            <!-- Chiáº¿n thuáº­t 7 -->
            <div class="card safe">
                <div class="badge">An ToÃ n - Thá»±c Táº¿</div>
                <h3>7. Má»“i Nhá»­ "Báº£ng HÃ ng QuÃ¡ Khá»©" (Tuyá»‡t chiÃªu KhiÃªm)</h3>
                
                <div class="content-group">
                    <strong>CÃ¡ch lÃ m</strong>
                    <p>ÄÄƒng khu cá»±c Ä‘áº¹p, giÃ¡ siÃªu tá»‘t. KhÃ¡ch há»i -> Check láº¡i vÃ  gá»­i Báº£ng hÃ ng cÅ© (Ä‘Ã£ gáº¡ch Ä‘á» bÃ¡n 99%).</p>
                </div>
                <div class="content-group">
                    <strong>Xá»­ lÃ½</strong>
                    <p>Chá»‰ cÃ²n sÃ³t láº¡i 1, 2 lÃ´ xáº¥u quáº¯c (trá»i sinh). Má»i khÃ¡ch Ä‘i xem con cuá»‘i cÃ¹ng nÃ y. Äáº¿n nÆ¡i khÃ¡ch láº¯c Ä‘áº§u -> Tiá»‡n tay dáº«n luÃ´n sang dá»± Ã¡n cÃ¹ng tá»‡p tÃ i chÃ­nh cá»§a há»‡ thá»‘ng cÃ´ng ty.</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Hiá»‡u á»©ng Fomo:</strong> Cho khÃ¡ch tháº¥y "hÃ ng ráº» Ä‘áº¹p bay trong ná»‘t nháº¡c". KÃ­ch thÃ­ch sá»± nuá»‘i tiáº¿c Ä‘á»ƒ khi Ä‘Æ°a sang hÃ ng tháº­t cá»§a cÃ´ng ty, há» sáº½ ra quyáº¿t Ä‘á»‹nh nhanh hÆ¡n.</p>
                </div>
            </div>

            <!-- Chiáº¿n thuáº­t 2 -->
            <div class="card warn">
                <div class="badge">HÃªn Xui - Phá»¥ Thuá»™c NÄƒng Lá»±c</div>
                <h3>2. LÃ´ vá»«a nháº­n cá»c & LÃ¡i báº» ngoáº·t</h3>
                
                <div class="content-group">
                    <strong>CÃ¡ch lÃ m</strong>
                    <p>KhÃ¡ch há»i, bÃ¡o ngay: "LÃ´ Ä‘Ã³ vá»«a nháº­n cá»c rá»“i anh áº¡. NhÆ°ng em Ä‘ang cÃ²n 3 mÃ£ y há»‡t chÆ°a up..."</p>
                </div>
                <div class="content-group">
                    <strong>Xá»­ lÃ½</strong>
                    <p>"Anh quÄƒng sá»‘ Zalo em nÃ©m sá»• qua luÃ´n, FB bÃ³p tÆ°Æ¡ng tÃ¡c load khÃ´ng ná»•i file." Xin Ä‘Æ°á»£c Zalo lÃ  tháº¯ng bÆ°á»›c 1.</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Giao Lá»™ Äá»‹nh Má»‡nh:</strong> Láº¥y Zalo xong mÃ  tiáº¿p tá»¥c gá»­i áº¢O thÃ¬ khÃ¡ch block tá»· lá»‡ cao (Trá»Ÿ thÃ nh chiáº¿n thuáº­t sá»‘ 4). Láº¥y xong gá»­i THáº¬T vÃ  gá»i Ä‘iá»‡n báº» tÆ° duy thÃ¬ má»›i cÃ³ tá»‰ lá»‡ sá»‘ng sÃ³t.</p>
                </div>
            </div>

            <!-- Chiáº¿n thuáº­t 4 -->
            <div class="card danger">
                <div class="badge">KÃ©m Nháº¥t - Cáº£nh BÃ¡o</div>
                <h3>4. Nháº­n CÃ³ Tháº­t TrÄƒm Pháº§n TrÄƒm Trá»n GÃ³i</h3>
                
                <div class="content-group">
                    <strong>CÃ¡ch lÃ m</strong>
                    <p>Tráº£ lá»i CÃ“ CÃ“ CÃ“ háº¿t. Äáº¥t cÃ³, ráº» cÃ³, Ä‘áº¹p cÃ³. Cá»‘t lÃµi lÃ´i cá»• khÃ¡ch lÃªn xe Ä‘i thá»±c Ä‘á»‹a cho báº±ng Ä‘Æ°á»£c.</p>
                </div>
                <div class="content-group">
                    <strong>Xá»­ lÃ½</strong>
                    <p>Tá»›i nÆ¡i thÃ¬ báº» lÃ¡i nÃ³i chá»§ quay xe, bÃ¡o giÃ¡ thÃ¡ch lÃªn trÃªn trá»i, hoáº·c dáº¯t tháº³ng tá»›i má»™t cá»¥c má»“i khÃ¡c biá»‡t hoÃ n toÃ n.</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>TrÃ¡nh Xa Tuyá»‡t Äá»‘i:</strong> Máº¥t tÆ° cÃ¡ch, Äƒn chá»­i táº¡i tráº­n. Chá»‰ cÃ³ thá»ƒ dá»±a dáº«m vÃ o Ä‘Ã¡m Ä‘Ã´ng SÃ³ng cá»§a cÃ´ng ty buff vÃ o Ä‘á»ƒ Ã©p khÃ¡ch ngá»™p, chá»‘t vá»™i. Quáº£n lÃ½/Sáº¿p siÃªu ghÃ©t support thá»ƒ loáº¡i lead lá»«a Ä‘áº£o nÃ y.</p>
                </div>
            </div>

        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: CHÃ‚N DUNG NHÃ‚N Sá»°
    // ---------------------------------------------------------
    'page-chan-dung-nhan-su': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-user-tie"></i> ChÃ¢n Dung NhÃ¢n Sá»± TL Land</span>
                <a href="/training-hub/CHAN_DUNG_NHAN_SU_TLLAND_ULTIMATE.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Má»Ÿ toÃ n mÃ n hÃ¬nh
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/CHAN_DUNG_NHAN_SU_TLLAND_ULTIMATE.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: Lá»˜ TRÃŒNH DáºªN KHÃCH
    // ---------------------------------------------------------
    'page-lo-trinh-dan-khach': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-route"></i> Lá»™ TrÃ¬nh Dáº«n KhÃ¡ch â€” Lá»‹ch TrÃ¬nh 24h</span>
                <a href="/training-hub/lich_trinh_24h_bds_nam.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Má»Ÿ toÃ n mÃ n hÃ¬nh
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/lich_trinh_24h_bds_nam.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `

};

