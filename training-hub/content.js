// Database Nội Dung các Khóa Đào Tạo (HTML Format)
// Giao diện giống DAO_TAO_CHIEN_THUAT_LAI_KHACH.html (card grid + badge + upgrade-box)
const APP_CONTENT = {

    // ---------------------------------------------------------
    // PAGE: QUY TRÌNH TÂN BINH (3 PHẦN)
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
            <h1>Chọn Kênh Tìm Kiếm Khách Hàng</h1>
            <p class="page-subtitle">Xác định và khai thác tối ưu các kênh truyền thông thu hút khách hàng tiềm năng</p>
        </div>

        <!-- Tab control -->
        <div class="profile-tabs" style="margin-bottom: 2rem;">
            <button class="profile-tab active" onclick="switchChonKenhTab('than-quen', this)">
                <i class="fa-solid fa-users-between-lines"></i> 1. Kênh người thân quen
            </button>
            <button class="profile-tab" onclick="switchChonKenhTab('mat-phi', this)">
                <i class="fa-solid fa-credit-card"></i> 2. Kênh mất phí
            </button>
            <button class="profile-tab" onclick="switchChonKenhTab('mien-phi', this)">
                <i class="fa-solid fa-gift"></i> 3. Kênh miễn phí
            </button>
        </div>

        <!-- Tab Panels -->
        <!-- Tab 1: Kênh người thân quen -->
        <div class="profile-tab-panel active" id="tab-kenh-than-quen">
            <div style="margin-bottom: 1.5rem; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.15); border-radius: 12px; padding: 1rem;">
                <p style="color: var(--text-primary); margin: 0; font-size: 0.95rem; line-height: 1.5;">
                    <i class="fa-solid fa-circle-info" style="color: #2563eb; margin-right: 8px;"></i>
                    <strong>Lời khuyên từ Sếp Khương:</strong> Khai thác mối quan hệ sẵn có (ấm và nóng) là kênh có tỉ lệ chốt giao dịch cao nhất và chi phí thấp nhất dành cho tân binh. Hãy đọc kỹ cẩm nang dưới đây để thực hiện đúng quy trình sòng phẳng, tinh tế.
                </p>
            </div>
            <div class="iframe-container-wrapper">
                <div class="iframe-scroll-container">
                    <iframe src="/training-hub/tai_lieu_khai_thac_mqh.html" class="custom-iframe" loading="lazy"></iframe>
                </div>
            </div>
        </div>

        <!-- Tab 2: Kênh mất phí -->
        <div class="profile-tab-panel" id="tab-kenh-mat-phi">
            <div class="card-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; gap: 24px;">
                <div class="strategy-card vip" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#3b82f6; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">Kênh Quảng Cáo Facebook (FB Ads)</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Chạy quảng cáo tin nhắn / tìm kiếm khách hàng tiềm năng</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Tiếp cận hàng chục ngàn khách hàng tiềm năng xung quanh khu vực mục tiêu hoặc có sở thích đầu tư BĐS bằng ngân sách hàng ngày. Đây là kênh chủ lực giúp tạo ra lượng khách hàng quan tâm đều đặn.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.15); color: #2563eb; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-circle-play" style="font-size: 1.2rem;"></i>
                        <span>Xem chi tiết video hướng dẫn chạy quảng cáo thực tế tại mục <a href="#" onclick="window.appRoutes.navigate('page-cam-tay-chi-viec'); return false;" style="font-weight:700; color:#2563eb; text-decoration:underline;">Cầm Tay Chỉ Việc</a></span>
                    </div>
                </div>

                <div class="strategy-card safe" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#10b981; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">Đăng tin VIP có phí trên cổng thông tin</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Sử dụng Batdongsan.com.vn, Chotot.com</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Đăng tải tin rao bán đất trực tiếp lên các cổng thông tin lớn của Việt Nam. Cần chuẩn bị bài viết chuẩn SEO, tiêu đề giật tít kích thích tò mò và hình ảnh thực tế bắt mắt để tối ưu hóa lượng click.</p>
                </div>

                <div class="strategy-card warn" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#f59e0b; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">Khai thác Data / TeleSale trực tiếp</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Gom tệp số điện thoại khách hàng tiềm năng</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Gọi điện trực tiếp giới thiệu dự án dựa trên danh sách số điện thoại tiềm năng có sẵn. Đây là kênh đòi hỏi sự kiên trì cao, giọng nói truyền cảm và kịch bản xử lý từ chối sắc bén.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(245,158,11,0.05); border: 1px solid rgba(245,158,11,0.15); color: #d97706; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-phone-volume" style="font-size: 1.2rem;"></i>
                        <span>Xem kịch bản gọi điện chốt khách tại mục <a href="#" onclick="window.appRoutes.navigate('page-telesale'); return false;" style="font-weight:700; color:#d97706; text-decoration:underline;">TeleSale</a></span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab 3: Kênh miễn phí -->
        <div class="profile-tab-panel" id="tab-kenh-mien-phi">
            <div class="card-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; gap: 24px;">
                <div class="strategy-card safe" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#10b981; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">Kênh Video Ngắn (TikTok / FB Reels / YT Shorts)</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Tạo video thực địa, chia sẻ kiến thức đầu tư</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Xây dựng kênh cá nhân chia sẻ hình ảnh đất đai thực tế, nhận định thị trường hoặc các mẹo đầu tư. Video ngắn có khả năng phân phối lan truyền cực mạnh mà không tốn chi phí quảng cáo.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(16,185,129,0.05); border: 1px solid rgba(16,185,129,0.15); color: #059669; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-circle-play" style="font-size: 1.2rem;"></i>
                        <span>Xem video hướng dẫn xây kênh và đăng TikTok tại mục <a href="#" onclick="window.appRoutes.navigate('page-cam-tay-chi-viec'); return false;" style="font-weight:700; color:#059669; text-decoration:underline;">Cầm Tay Chỉ Việc</a></span>
                    </div>
                </div>

                <div class="strategy-card vip" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#3b82f6; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">Đăng tin thảo luận / Đăng tin lái khách trong Group Facebook</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Tận dụng các hội nhóm cộng đồng hàng trăm ngàn thành viên</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Đăng các bài thảo luận, bài chia sẻ ảo thu hút tương tác của các nhà đầu tư trong các Group BĐS lớn để kéo kết bạn Zalo và lái sang dự án chính.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.15); color: #2563eb; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-book-open" style="font-size: 1.2rem;"></i>
                        <span>Đọc bí quyết Đăng Tin Lái Khách tại mục <a href="#" onclick="window.appRoutes.navigate('page-cam-tay-chi-viec'); return false;" style="font-weight:700; color:#2563eb; text-decoration:underline;">Cầm Tay Chỉ Việc</a></span>
                    </div>
                </div>

                <div class="strategy-card warn" style="background: rgba(255, 255, 255, 0.65); border: 1px solid var(--border-glass); border-radius: 20px; padding: 24px; box-shadow: var(--shadow-sm);">
                    <div class="card-badge" style="background:#8b5cf6; color:#fff; font-size: 0.8rem; padding: 4px 10px; border-radius: 20px; font-weight: 700; width: max-content; margin-bottom: 15px;">Xây dựng Thương hiệu cá nhân (Facebook / Zalo cá nhân)</div>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin-bottom: 10px;">Đăng bài gieo hạt, tương tác kết nối</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">Đăng tải các câu chuyện chốt đất thực chiến, chia sẻ kiến thức đầu tư lên trang cá nhân nhằm xây dựng lòng tin lâu dài với bạn bè và đối tác cũ.</p>
                    <div class="upgrade-box" style="margin-top: 15px; background: rgba(139,92,246,0.05); border: 1px solid rgba(139,92,246,0.15); color: #7c3aed; padding: 12px 16px; border-radius: 12px; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                        <i class="fa-solid fa-graduation-cap" style="font-size: 1.2rem;"></i>
                        <span>Xem bài học xây thương hiệu tại mục <a href="#" onclick="window.appRoutes.navigate('page-chien-luoc-fb'); return false;" style="font-weight:700; color:#7c3aed; text-decoration:underline;">Chiến lược FB, Zalo</a></span>
                    </div>
                </div>
            </div>
        </div>
    `,


    // ---------------------------------------------------------
    // PAGE: LÝ DO TĂNG GIÁ BĐS (Chi tiết)
    // ---------------------------------------------------------
    'page-ly-do-tang-gia': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-chart-line"></i> Lý Do Tăng Giá Của Bất Động Sản</span>
                <a href="LY_DO_TANG_GIA_BDS.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Mở toàn màn hình
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/LY_DO_TANG_GIA_BDS.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: GIAI ĐOẠN TĂNG GIÁ BĐS (Chi tiết)
    // ---------------------------------------------------------
    'page-giai-doan-tang-gia': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-chart-line"></i> Những Giai Đoạn Tăng Giá Của Bất Động Sản</span>
                <a href="GIAI_DOAN_TANG_GIA_BDS.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Mở toàn màn hình
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/GIAI_DOAN_TANG_GIA_BDS.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: SO SÁNH CÁC KÊNH ĐẦU TƯ (Chi tiết)
    // ---------------------------------------------------------
    'page-so-sanh-kenh-dau-tu': `
        <div class="iframe-container-wrapper">
            <div class="iframe-actions-bar">
                <span class="iframe-doc-title"><i class="fa-solid fa-scale-balanced"></i> So Sánh Các Kênh Đầu Tư & Lợi Thế BĐS</span>
                <a href="SO_SANH_KENH_DAU_TU.html" target="_blank" class="iframe-btn-open">
                    <i class="fa-solid fa-up-right-from-square"></i> Mở toàn màn hình
                </a>
            </div>
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/SO_SANH_KENH_DAU_TU.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: ĐÀO TẠO KIẾN THỨC NỀN
    // ---------------------------------------------------------
    'page-kien-thuc-nen': `
        <div class="page-title-bar">
            <h1>Đào Tạo Kiến Thức Nền</h1>
            <p class="page-subtitle">Hiểu bản chất thị trường — Nền tảng vững chắc trước khi ra trận</p>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr; max-width: 900px; margin: 0 auto;">

            <div class="strategy-card safe" onclick="window.appRoutes.navigate('page-ly-do-tang-gia', true)" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 30px rgba(56,189,248,0.15)'" onmouseleave="this.style.transform=''; this.style.boxShadow=''">
                <div class="card-badge">📈 Chủ đề 1</div>
                <h3>Lý Do Tăng Giá Của Bất Động Sản</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">Phân tích sâu qua tư duy "Dòng Tiền" — Hiểu bản chất thật sự đằng sau mỗi đợt tăng giá BĐS.</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px; padding: 12px 18px; background: linear-gradient(135deg, rgba(56,189,248,0.1), rgba(167,139,250,0.1)); border-radius: 12px; font-weight: 600; color: var(--accent-blue, #38bdf8); font-size: 0.95rem;">
                    <i class="fa-solid fa-book-open-reader"></i>
                    <span>Bấm vào để xem bài phân tích chi tiết</span>
                    <i class="fa-solid fa-arrow-right" style="margin-left: auto;"></i>
                </div>
            </div>

            <div class="strategy-card vip" onclick="window.appRoutes.navigate('page-giai-doan-tang-gia', true)" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 30px rgba(167,139,250,0.15)'" onmouseleave="this.style.transform=''; this.style.boxShadow=''">
                <div class="card-badge">📊 Chủ đề 2</div>
                <h3>Những Giai Đoạn Tăng Giá Của Bất Động Sản</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">4 giai đoạn tăng giá — từ thông tin quy hoạch đến dân cư lấp đầy. Nhận diện rủi ro & cơ hội ở từng giai đoạn.</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px; padding: 12px 18px; background: linear-gradient(135deg, rgba(167,139,250,0.1), rgba(244,114,182,0.1)); border-radius: 12px; font-weight: 600; color: var(--accent-purple, #a78bfa); font-size: 0.95rem;">
                    <i class="fa-solid fa-book-open-reader"></i>
                    <span>Bấm vào để xem bài phân tích chi tiết</span>
                    <i class="fa-solid fa-arrow-right" style="margin-left: auto;"></i>
                </div>
            </div>

            <div class="strategy-card warn" onclick="window.appRoutes.navigate('page-so-sanh-kenh-dau-tu', true)" style="cursor: pointer; transition: all 0.3s ease;" onmouseenter="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 30px rgba(244,114,182,0.15)'" onmouseleave="this.style.transform=''; this.style.boxShadow=''">
                <div class="card-badge">⚖️ Chủ đề 3</div>
                <h3>So Sánh Các Kênh Đầu Tư & Lợi Thế BĐS</h3>
                <p style="color: var(--text-secondary); margin-bottom: 20px;">Chứng khoán, vàng, tiết kiệm, crypto... — Bất động sản vượt trội ở điểm nào? Phân tích ưu nhược từng loại.</p>
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px; padding: 12px 18px; background: linear-gradient(135deg, rgba(244,114,182,0.1), rgba(245,158,11,0.1)); border-radius: 12px; font-weight: 600; color: var(--accent-orange, #f59e0b); font-size: 0.95rem;">
                    <i class="fa-solid fa-book-open-reader"></i>
                    <span>Bấm vào để xem bài phân tích chi tiết</span>
                    <i class="fa-solid fa-arrow-right" style="margin-left: auto;"></i>
                </div>
            </div>

        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: THỊ TRƯỜNG ĐANG TRIỂN KHAI
    // ---------------------------------------------------------
    
    // ---------------------------------------------------------
    // PAGE: CÁC BÀI MẪU ĐĂNG TIN ẢO & NGUYÊN LÝ ẨN (Mới)
    // ---------------------------------------------------------
    'page-mau-dang-tin-ao': `
        <div class="page-title-bar">
            <h1>
                Thư Viện Bài Mẫu Đăng Tin Ảo 
                <span class="principle-trigger-btn" onclick="window.mauDangTinAo.togglePrinciple()" title="Bấm vào để xem Nguyên lý & Chiến thuật đăng tin ẩn">
                    <i class="fa-solid fa-key"></i>
                </span>
            </h1>
            <p class="page-subtitle">Nhân sự tự nghiên cứu, phân tích hình ảnh và đúc rút lý do vì sao các bài đăng này lại hiệu quả</p>
        </div>

        <div class="gallery-container">
            <div class="gallery-count-row">
                <span id="gallery-count-text">Đang hiển thị 0 / 0 bài mẫu</span>
                <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic; display: flex; align-items: center; gap: 5px;">
                    <i class="fa-solid fa-circle-info"></i> Bấm vào ảnh để phóng to xem chi tiết nội dung đăng tin
                </span>
            </div>
            
            <div class="gallery-grid" id="gallery-grid">
                <!-- Sẽ được fill động bởi JS -->
            </div>

            <div class="gallery-actions" style="text-align: center; margin-top: 30px; margin-bottom: 50px;">
                <button class="load-more-btn" id="load-more-btn" onclick="window.mauDangTinAo.loadMore()">
                    <i class="fa-solid fa-arrows-spin"></i> Xem Thêm Ảnh Mẫu Đăng Tin
                </button>
            </div>
        </div>

        <!-- MODAL NGUYÊN LÝ ĐĂNG TIN ẨN (Chỉ hiện khi bấm vào icon Chìa Khóa) -->
        <div class="principle-modal" id="principle-modal">
            <div class="principle-modal-content">
                <span class="principle-modal-close" onclick="window.mauDangTinAo.togglePrinciple()">&times;</span>
                
                <div class="principle-header">
                    <div class="principle-icon-wrapper">
                        <i class="fa-solid fa-lightbulb"></i>
                    </div>
                    <h2>Nguyên Lý & Chiến Thuật Đăng Tin Ảo Thực Chiến</h2>
                    <p>Tài liệu mật dành riêng cho Chiến binh Sales - Tuyệt đối không chia sẻ ra ngoài</p>
                </div>

                <div class="principle-scroll-body">
                    
                    <!-- Phần 1: Mục tiêu cốt lõi -->
                    <div class="principle-card goal">
                        <h3><i class="fa-solid fa-bullseye"></i> Mục Tiêu Cốt Lõi Của Tin Đăng Ảo</h3>
                        <p>Mục tiêu duy nhất của tin ảo là <strong>LẤY BẰNG ĐƯỢC LEAD (Họ tên, SĐT/Zalo của khách hàng có tiền, có nhu cầu đầu tư thật)</strong>. Tin ảo chỉ là "mồi câu". Sau khi có số khách, Sale dùng kỹ năng và sự chân thành để "bẻ lái" nhu cầu về đúng thị trường/sản phẩm mà công ty đang bán.</p>
                    </div>

                    <!-- Phần 2: 5 Nguyên lý ảnh đăng ảo -->
                    <div class="principle-section-title">5 Nguyên Lý Thiết Kế Ảnh Đăng Ảo</div>
                    <div class="principle-grid">
                        <div class="principle-mini-card">
                            <span class="p-num">1</span>
                            <h4>Thô như người thường chụp</h4>
                            <p>Ảnh phải trông giống người dân bình thường cầm điện thoại chụp mảnh đất. Cấm dùng ảnh flycam quá đẹp, ảnh render 3D hay có logo công ty. Phải tự nhiên, thô thật.</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">2</span>
                            <h4>Kẹp đất giữa sự sầm uất</h4>
                            <p>Đất trong ảnh bắt buộc phải có bối cảnh kinh doanh 2 bên: bên quán ăn đông, bên khách sạn/nhà nghỉ, tạo cảm giác khu sầm uất kinh doanh được ngay.</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">3</span>
                            <h4>Chữ trên ảnh = Báo lá cải</h4>
                            <p>Chèn chữ to, màu Đỏ hoặc Vàng nền đỏ để giật mắt khi khách lướt nhanh Facebook. Gây tò mò cực độ nhưng ẩn vị trí chính xác (ví dụ: "ĐẤT BIỂN CẮT LỖ SÂU").</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">4</span>
                            <h4>Mũi tên đỏ dẫn lối</h4>
                            <p>Vẽ mũi tên chỉ hướng đi ra các tiện ích (như bãi tắm, KCN, chợ) kèm khoảng cách cụ thể "➡ 200m ra biển". Tuyệt đối không ghi tên xã/huyện/tỉnh cụ thể.</p>
                        </div>
                        <div class="principle-mini-card">
                            <span class="p-num">5</span>
                            <h4>Kích thước = Bằng chứng thật</h4>
                            <p>Vẽ vạch đo đỏ ghi kích thước rõ ràng (ví dụ: "↔ 6m x 15m (90m²)") để tạo cảm giác chủ nhà đã đo sẵn đất, tạo niềm tin mảnh đất có thực.</p>
                        </div>
                    </div>

                    <div class="principle-card rule-box">
                        <h4><i class="fa-solid fa-triangle-exclamation"></i> Quy Tắc Vàng Ẩn Địa Danh</h4>
                        <p><strong>Tuyệt đối không bao giờ</strong> ghi tên các địa danh cụ thể (như Ninh Cơ, Hải Xuân, Hải Hậu, Nam Định) trên ảnh đăng ảo. Thay thế bằng các từ khóa chung chung kích thích nhu cầu:</p>
                        <table class="principle-table">
                            <thead>
                                <tr>
                                    <th>KHÔNG ghi địa danh cụ thể ✗</th>
                                    <th>GHI từ khóa thay thế ✓</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Đất Hải Xuân, Hải Hậu</td>
                                    <td><strong>ĐẤT DU LỊCH BIỂN</strong></td>
                                </tr>
                                <tr>
                                    <td>Ninh Cơ, Nam Định</td>
                                    <td><strong>SÁT KHU KINH TẾ BIỂN TRỌNG ĐIỂM</strong></td>
                                </tr>
                                <tr>
                                    <td>Xã Hải Xuân</td>
                                    <td><strong>KINH DOANH KHÁCH SẠN VEN BIỂN</strong></td>
                                </tr>
                                <tr>
                                    <td>Gần bãi tắm Hải Hậu</td>
                                    <td><strong>VÀI BƯỚC CHÂN RA BIỂN</strong></td>
                                </tr>
                                <tr>
                                    <td>Cạnh KCN Rạng Đông</td>
                                    <td><strong>SÁT KCN LỚN ĐANG TRIỂN KHAI</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Phần 3: Chiến thuật lái khách -->
                    <div class="principle-section-title">Chiến Thuật Bẻ Lái Khách Hàng (Tập Trung)</div>
                    
                    <div class="strategy-list">
                        <div class="strategy-item priority">
                            <div class="strat-badge">Nét Nhất</div>
                            <h5>Chiến thuật "Tập tuyển tập Lead" & Telesale gọi lại</h5>
                            <p>Đăng tin ảo nội đô cực rẻ. Khách nhắn tin/gọi điện hỏi -> Xin số điện thoại Zalo -> Bỏ lơ vài ngày. Sau đó, Telesale gọi lại chào mời bài bản: <em>"Dạ em thấy anh đang quan tâm đầu tư, lô nội đô đó tạm ngưng giao dịch nhưng bên em đang có sóng rất tốt ở thị trường đất biển tiềm năng..."</em></p>
                        </div>

                        <div class="strategy-item priority">
                            <div class="strat-badge">Nét Nhất</div>
                            <h5>Chiến thuật "Marketing đăng nhầm"</h5>
                            <p>Khi khách hỏi về lô đất ảo, nói thẳng thật thà: <em>"Dạ em xin lỗi anh, bạn thực tập lỡ tay up nhầm ảnh nội đô. Nhưng thông tin lô đất/dòng tiền rẻ là thật 100%. Em mời anh ly cà phê em tư vấn kỹ hơn về cơ hội đầu tư này..."</em></p>
                        </div>

                        <div class="strategy-item priority">
                            <div class="strat-badge">Nét Nhất</div>
                            <h5>Chiến thuật "Giọng điệu Chuyên Gia Cảnh Báo"</h5>
                            <p>Xác nhận là có lô đất đó, nhưng khuyên ngăn khách mua vì lý do xấu: <em>"Lô này rẻ thật nhưng đất cây lâu năm/dính quy hoạch nhẹ anh ạ. Em khuyên thật không nên đầu tư. Cùng tầm tiền đó anh lấy sang con này pháp lý an toàn hơn..."</em> -> Xây dựng uy tín Sale có tâm rồi lái sang hàng thật.</p>
                        </div>

                        <div class="strategy-item info">
                            <div class="strat-badge warning">An Toàn</div>
                            <h5>Chiến thuật "Bảng hàng quá khứ" làm mồi</h5>
                            <p>Đăng dự án cũ cực đẹp, giá cực tốt (đã bán hết). Khách hỏi -> Gửi bảng hàng gạch đỏ đã bán sạch, chỉ chừa 1-2 lô xấu/tì vết. Mời khách đi xem lô xấu đó. Đến ngày đi xem thì báo lô đó vừa cọc mất, tiện đường lái sang dự án thật của công ty có cùng tầm giá.</p>
                        </div>

                        <div class="strategy-item info">
                            <div class="strat-badge warning">An Toàn</div>
                            <h5>Chiến thuật "Bẫy Sương Mù Vị Trí"</h5>
                            <p>Viết mô tả tiện ích rất chi tiết nhưng tuyệt đối giấu địa danh cụ thể (chỉ ghi 200m ra biển, cạnh KCN), thả vào group địa phương. Sự cụt thông tin bắt buộc khách phải comment/inbox hỏi vị trí -> Thu thập lead tự nhiên.</p>
                        </div>
                    </div>

                    <div class="principle-card warning-box-dark">
                        <h4><i class="fa-solid fa-circle-exclamation"></i> Lời khuyên cuối cùng từ Sếp Khương</h4>
                        <p><em>"Nhớ kỹ: Ảnh chỉ là mồi nhử. Không cần ảnh đẹp lung linh, cần ảnh tạo sự tò mò và cảm giác THẬT để khách phải bấm nút nhắn tin hỏi thăm. Sự kiên trì bám đuổi và bẻ lái khéo léo sau đó mới quyết định 90% sự thành bại."</em></p>
                    </div>

                </div>
            </div>
        </div>
    `,

'page-thi-truong': `
        <div class="page-title-bar">
            <h1>Thị Trường Công Ty Đang Triển Khai</h1>
            <p class="page-subtitle">Tổng hợp tài liệu, bản đồ và video đào tạo theo từng thị trường</p>
        </div>

        <div class="card-grid" style="grid-template-columns: 1fr; max-width: 1000px; margin: 0 auto; gap: 28px;">

            <!-- Hòa Lạc -->
            <div class="strategy-card vip">
                <div class="card-badge">🏔️ Thị trường 1</div>
                <h3 style="margin-bottom: 12px;">Hoà Lạc</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Đất nền công nghệ cao, đón sóng hạ tầng và đại học quốc gia.</p>
                
                <!-- Grid Video Đào Tạo Bản Đồ Hòa Lạc -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sẻ bản đồ Hoà Lạc
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Hoà Lạc
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/jStHU1-FzpQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sơn Tây -->
            <div class="strategy-card safe">
                <div class="card-badge">🏯 Thị trường 2</div>
                <h3 style="margin-bottom: 12px;">Sơn Tây</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Phát triển mạnh về bất động sản sinh thái, nghỉ dưỡng ngoại ô Hà Nội.</p>
                
                <!-- Nút tài liệu Sơn Tây -->
                <div class="ql-resources-buttons" style="display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0 30px 0;">
                    <a href="https://xuankhanh-sales-avcdjt.netlify.app/" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-globe"></i> toàn bộ thị trường Sơn Tây
                    </a>
                </div>

                <!-- Grid Video Đào Tạo Bản Đồ Sơn Tây -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sẻ bản đồ Sơn Tây
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Sơn Tây
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/ScBckm2pBlU" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quất Lâm -->
            <div class="strategy-card warn">
                <div class="card-badge">🏖️ Thị trường 3</div>
                <h3 style="margin-bottom: 12px;">Quất Lâm</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Đón đầu quy hoạch phát triển du lịch biển, bất động sản nghỉ dưỡng tiềm năng.</p>
                <!-- 4 Nút Tài Liệu sếp gửi -->
                <div class="ql-resources-buttons" style="display: flex; flex-wrap: wrap; gap: 16px; margin: 20px 0 30px 0;">
                    <a href="https://zalo.me/g/lzmqxo830" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-image"></i> Hình ảnh – Tài liệu – Video Quất Lâm
                    </a>
                    <a href="https://docs.google.com/document/d/1SctCIsFawNmHt6_REmsonsYbDoZPrK_18dt-aB2o2NU/edit?tab=t.0" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-file-contract"></i> Tại sao nên đầu tư Quất Lâm
                    </a>
                    <a href="https://bom.so/zolvMS" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-person-chalkboard"></i> Slide đào tạo Quất Lâm
                    </a>
                    <a href="https://bom.so/OV5YDG" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.7); border: 1px solid var(--border-glass); padding: 12px 24px; border-radius: 50px; text-decoration: none; color: #0284c7; font-weight: 700; font-size: 0.95rem; box-shadow: var(--shadow-sm); transition: all 0.2s ease;">
                        <i class="fa-solid fa-camera"></i> Ảnh thật Quất Lâm
                    </a>
                </div>

                <!-- Grid Video Đào Tạo Bản Đồ -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sẻ bản đồ Quất Lâm
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <!-- Video 1 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Quất Lâm (Phần 1)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/YE-BbQ0xqnY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 2 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Quất Lâm (Phần 2)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/alBjvqprOOc" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 3 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Quất Lâm (Phần 3)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/mTdfic4HPFs" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 4 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Quất Lâm (Phần 4)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/E7S0jdGm9LY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 5 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Quất Lâm (Phần 5)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/scD4CnTU7lc" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Video 6 -->
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Quất Lâm (Phần 6)
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/VwhYhCJVSt4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ninh Cơ -->
            <div class="strategy-card danger">
                <div class="card-badge">📍 Thị trường 4</div>
                <h3 style="margin-bottom: 10px;">Ninh Cơ</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">Hệ thống bài giảng bản đồ chuyên sâu, video thực tế và tài liệu hỗ trợ bán hàng Ninh Cơ.</p>

                <!-- Grid Video 1: 2 Video đào tạo bản đồ chính -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 24px; margin-bottom: 30px;">
                    <!-- Video Sếp Huy -->
                    <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                        <div style="font-weight: 700; color: #ef4444; margin-bottom: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-circle-play" style="font-size: 1.1rem;"></i> Đào tạo bản đồ Ninh Cơ — Sếp Huy Otis
                        </div>
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <iframe src="https://www.youtube.com/embed/bfqJ0uO8l-I" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                        </div>
                    </div>

                    <!-- Video Bản đồ -->
                    <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                        <div style="font-weight: 700; color: #ef4444; margin-bottom: 12px; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                            <i class="fa-solid fa-map" style="font-size: 1.1rem;"></i> Đào tạo bản đồ Ninh Cơ (Chi tiết)
                        </div>
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                            <iframe src="https://www.youtube.com/embed/WKd_SORPVfQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>

                <!-- Grid Video 2: Chuỗi video Trần Tuyên -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 30px;">
                    <h4 style="font-size: 1.1rem; font-weight: 700; color: #1e293b; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-film" style="color: #6366f1;"></i> Chuỗi bài giảng Bản đồ Ninh Cơ — Trần Tuyên
                    </h4>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                        <!-- Tập 1 -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Phần 1</span> Bản đồ
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/ikyEAwAYxqk" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Tập 2 -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Phần 2</span> Bản đồ
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/vHy-sbt1HsA" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Tập 3 -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(99, 102, 241, 0.1); color: #6366f1; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Phần 3</span> Bản đồ
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/U6w3ezwo4mQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>

                        <!-- Short -->
                        <div style="background: rgba(255, 255, 255, 0.4); border: 1px solid rgba(0,0,0,0.05); border-radius: 12px; padding: 10px;">
                            <div style="font-weight: 600; color: #475569; margin-bottom: 8px; font-size: 0.85rem; display: flex; align-items: center; gap: 4px;">
                                <span style="background: rgba(239, 68, 68, 0.1); color: #ef4444; padding: 2px 6px; border-radius: 8px; font-size: 0.7rem; font-weight: 700;">Short</span> Video ngắn
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 8px; overflow: hidden;">
                                <iframe src="https://www.youtube.com/embed/Kwq8WG9lTys" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Banner Nhóm Zalo Ninh Cơ độc lập -->
                <a href="https://zalo.me/g/aouere171" target="_blank" style="display: flex; align-items: center; gap: 16px; background: linear-gradient(135deg, rgba(14, 165, 233, 0.08), rgba(14, 165, 233, 0.02)); border: 1px solid rgba(14, 165, 233, 0.25); border-radius: 16px; padding: 16px 20px; text-decoration: none; color: inherit; transition: all 0.2s ease; box-shadow: var(--shadow-sm); cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='rgba(14, 165, 233, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='rgba(14, 165, 233, 0.25)';">
                    <div style="background: #0ea5e9; color: white; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(14, 165, 233, 0.2);">
                        <i class="fa-solid fa-people-group" style="font-size: 1.25rem;"></i>
                    </div>
                    <div style="flex-grow: 1;">
                        <strong style="color: #0369a1; font-size: 1rem; display: block; margin-bottom: 4px;">Nhóm tài liệu Zalo — Thị trường Ninh Cơ</strong>
                        <span style="font-size: 0.85rem; color: #64748b;">Nơi cập nhật thông tin dự án, pháp lý và bản đồ quy hoạch Ninh Cơ mới nhất. Bấm để tham gia!</span>
                    </div>
                    <div style="color: #0ea5e9; font-size: 1.1rem; padding-left: 8px;">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </a>
            </div>

            <!-- Phú Thọ -->
            <div class="strategy-card safe">
                <div class="card-badge">🏔️ Thị trường 5</div>
                <h3 style="margin-bottom: 12px;">Phú Thọ</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Đất nền khu công nghiệp, tiềm năng tăng trưởng vùng trung du.</p>
                
                <!-- Grid Video Đào Tạo Bản Đồ Phú Thọ -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sẻ bản đồ Phú Thọ
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Phú Thọ
                            </div>
                            <div style="position: relative; padding-bottom: 56.25%; height: 0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                <iframe src="https://www.youtube.com/embed/w-Jw2ObEIx0" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hải Phòng -->
            <div class="strategy-card vip">
                <div class="card-badge">⚓ Thị trường 6</div>
                <h3 style="margin-bottom: 12px;">Hải Phòng</h3>
                <p style="color: var(--text-secondary); margin-bottom: 15px;">Thành phố cảng công nghiệp, bất động sản ven đô và khu công nghiệp lớn.</p>
                
                <!-- Grid Video Đào Tạo Bản Đồ Hải Phòng -->
                <div style="border-top: 1px solid rgba(0,0,0,0.08); padding-top: 24px; margin-bottom: 10px;">
                    <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-map-location-dot" style="color: var(--accent-orange, #f97316);"></i> Video chia sẻ bản đồ Hải Phòng
                    </h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                        <div style="background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; overflow: hidden; padding: 14px; box-shadow: var(--shadow-sm); transition: transform 0.2s ease;">
                            <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 12px; font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
                                <i class="fa-solid fa-circle-play" style="color: #ef4444;"></i> Video chia sẻ bản đồ Hải Phòng
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
    // PAGE: CÂU HỎI TRUY VẤN
    // ---------------------------------------------------------
    'page-telesale': `
        <div class="page-title-bar">
            <h1>TeleSale</h1>
            <p class="page-subtitle">Kỹ năng gọi điện và xử lý từ chối đỉnh cao</p>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2rem;">
            <h2 style="color: var(--accent-blue); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">1. Bài tư vấn BĐS tổng quan</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/Lu8638blARo" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
                <a href="TU_VAN_BDS_TONG_QUAN.html" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-blue); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">
                    <i class="fa-solid fa-file-lines"></i> Bấm vào đây để xem văn bản
                </a>
            </div>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-pink); margin-top: 2rem;">
            <h2 style="color: var(--accent-pink); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">2. 05 Câu Hỏi Truy Vấn</h2>
            
            <details style="margin-bottom: 2rem; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); overflow: hidden;">
                <summary style="padding: 1.2rem 1.5rem; font-weight: 700; font-size: 1.2rem; cursor: pointer; color: var(--text-primary); outline: none; list-style: none;">
                    <i class="fa-solid fa-headset" style="color: var(--accent-pink); margin-right: 10px;"></i> Đọc vị lõi khách hàng (Bấm để xem)
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid var(--border-glass); background: var(--bg-primary);">
                    <div class="core-principle" style="border-left-color: #f472b6;">
                        <h2 style="color: #f472b6;">🔎 Không Có Câu Hỏi Thừa</h2>
                        <p>Hỏi không phải để nghe trả lời cho vui. Hỏi để <strong>Quét ví tiền</strong>, <strong>Nhận diện tấm chiếu mới</strong> và <strong>Đóng khung kịch bản lái khách</strong>.</p>
                    </div>

                    <div class="grid-container single-col" style="margin-top: 1rem;">
                        <!-- Câu 1 -->
                        <div class="card vip">
                            <div class="badge">Câu 1: Đo Lường Nhu Cầu</div>
                            <h3>"Đợt này anh mua để sử dụng luôn hay đầu tư?"</h3>
                            <div class="content-group">
                                <strong>Đọc vị</strong>
                                <p><b>Mua Để Ở (An cư):</b> Cơ bản là cực khó bán đất dự án vùng ven. Trừ phi Sale đủ đẳng cấp bẻ lái tư duy khách sang "Đầu tư sinh lời trước - mai mốt dư tiền mua mảnh to đẹp mà Ở".</p>
                            </div>
                            <div class="content-group">
                                <p><b>Mua Đầu Tư:</b> Tập trung nhồi nhét quy hoạch, biên độ tăng lãi. Bỏ qua các vấn đề vụn vặt trường mầm non, chợ búa.</p>
                            </div>
                        </div>

                        <!-- Câu 2 -->
                        <div class="card safe">
                            <div class="badge">Câu 2: Khoanh Vùng Vị Trí & Đòn Bẩy</div>
                            <h3>"Tài chính hiện tại anh đang có sẵn khoảng bao nhiêu?"</h3>
                            <div class="content-group">
                                <strong>Đọc vị</strong>
                                <p><b>Ví mỏng vài trăm triệu:</b> Lái thẳng hướng về Phú Thọ, Ba Vì...</p>
                            </div>
                            <div class="content-group">
                                <p><b>Bài kích Bank đòn bẩy:</b> Khéo léo gợi ý khách vay thêm Bank để "với" tới lô siêu phẩm ở Ninh Cơ/Quốc Lộ. Nếu Không Vay → Ép hướng rổ rẻ. Nếu chịu Vay → Dẫn khu đắt tiền quy hoạch mới.</p>
                            </div>
                        </div>

                        <!-- Câu 3 -->
                        <div class="card warn">
                            <div class="badge">Câu 3: Định Hình Thợ Check Giá</div>
                            <h3>"Anh đã biết về thị trường em định chia sẻ chưa?"</h3>
                            <div class="content-group">
                                <strong>Đọc vị</strong>
                                <p><b>Khách Đã Biết:</b> Đi rào quanh tham khảo (Check giá). Chắc chắn đã có sale khác bơm vào rồi nhưng chưa ưng nên lùng thêm.</p>
                            </div>
                            <div class="content-group">
                                <p><b>Khách Chưa Biết:</b> Mảnh đất trống cho Sale quẩy. Vẽ tiềm năng quy mô vĩ mô để tẩy não.</p>
                            </div>
                        </div>

                        <!-- Câu 4 -->
                        <div class="card danger">
                            <div class="badge">Câu 4: Bộ Lọc Vùng Miền (Quan Trọng)</div>
                            <h3>"Hiện nhà anh đang sinh sống ở khu vực nào?"</h3>
                            <div class="content-group">
                                <strong>Đọc vị</strong>
                                <p style="color: #f87171;"><b>❌ [TẠCH] Khách Địa Phương:</b> Nhà ở đó không bao giờ thích bập vào đất dự án phân lô chẻ nhỏ. Tư duy họ thích mua hàng xóm ngộp, dắt tới dự án chỉ để ngắm, cơ bản tạch.</p>
                            </div>
                            <div class="content-group">
                                <p style="color: #34d399;"><b>✅ [SIÊU NÉT] Dân Vùng Sốt Phình (VD: Hòa Lạc):</b> Đã chứng kiến nhân chứng sống giá đất x10. Bắt trend cực gắt, niềm tin rất dễ xuống tiền ở khu mới.</p>
                            </div>
                            <div class="content-group">
                                <p style="color: #34d399;"><b>✅ [NÉT] Khách Hà Nội Phố:</b> Ở chật chội quen rồi, thấy đất quy hoạch phân lô thoáng rộng là ưng cái bụng chốt lẹ.</p>
                            </div>
                            <div class="content-group">
                                <p style="color: #f87171;"><b>❌ [TẠCH] Tỉnh Xa / Xã Nghèo Đất Rộng:</b> Ở quen 1 nhà mấy sào bạt ngàn. Chia lô 100m2 họ chê Ỏng chê Eo như lỗ mũi không thèm mua.</p>
                            </div>
                        </div>

                        <!-- Câu 5 -->
                        <div class="card vip">
                            <div class="badge">Câu 5: Soi Ví Tiền Ẩn</div>
                            <h3>"Hỏi thêm: Anh làm hành chính hay tự do?"</h3>
                            <div class="content-group">
                                <strong>Đọc vị</strong>
                                <p>Không phải quan tâm lịch rảnh rỗi. Quan trọng là đo lường mức độ <b>thu nhập ổn định và dòng tiền dư ra</b> hàng tháng, xem có thể bọc lót Bank hỗ trợ thanh khoản không!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-emerald); margin-top: 2rem;">
            <h2 style="color: var(--accent-emerald); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">3. Cách telesale và chăm khách nét căng</h2>
            
            <div style="background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); padding: 2rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div style="width: 80px; height: 80px; background: rgba(52, 211, 153, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                    <i class="fa-solid fa-book-open-reader" style="font-size: 2rem; color: var(--accent-emerald);"></i>
                </div>
                <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-primary);">5 Lỗ Hổng Tâm Lý Khách Hàng</h3>
                <p style="color: var(--text-secondary); margin-bottom: 1.5rem; max-width: 400px;">Tài liệu đào tạo chuyên sâu về tâm lý hành vi khách hàng, áp dụng thực chiến trong Telesale và Chăm sóc khách hàng.</p>
                
                <a href="5_lo_hong_tam_ly.html" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-emerald); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3);">
                    Đọc tài liệu toàn màn hình <i class="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
            </div>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-orange); margin-top: 2rem;">
            <h2 style="color: var(--accent-orange); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">4. Tuyệt Chiêu Lái Khách (7 Chiến Thuật)</h2>
            
            <details style="margin-bottom: 2rem; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); overflow: hidden;">
                <summary style="padding: 1.2rem 1.5rem; font-weight: 700; font-size: 1.2rem; cursor: pointer; color: var(--text-primary); outline: none; list-style: none;">
                    <i class="fa-solid fa-chess-knight" style="color: var(--accent-orange); margin-right: 10px;"></i> Bẻ lái khách hàng từ kịch bản tin đăng ảo (Bấm để xem)
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid var(--border-glass); background: var(--bg-primary);">
                    <div class="core-principle" style="border-left-color: var(--accent-orange);">
                        <h2 style="color: var(--accent-orange);">🎯 Nguyên Lý "Sự Thật Nửa Vời" (Half-Truths)</h2>
                        <p>
                            Mục tiêu tối thượng của tin đăng ảo <strong>KHÔNG PHẢI ĐỂ BÁN LÔ ĐẤT ĐÓ</strong>, mà là để <strong>LẤY LEAD (Khách có tiền và máu đầu tư)</strong>. 
                            Tuyệt chiêu đỉnh cao là giăng một cái bẫy hoàn hảo, thu hút khách vào, sau đó tự tay <em>"đập vỡ"</em> bẫy để nhập vai <strong>Người bảo vệ/Chuyên gia</strong> nhằm xây dựng lòng tin tuyệt đối. Từ đó dắt khách sang thị trường mục tiêu.
                        </p>
                    </div>

                    <div class="grid-container" style="margin-top: 1.5rem;">
                        <!-- Chiến thuật 1 -->
                        <div class="card vip">
                            <div class="badge">Nét Nhất - Chốt Cao</div>
                            <h3>1. Tư duy "Tuyển Tập Lead" & Telesale Gọi Lại</h3>
                            <div class="content-group">
                                <strong>Cách làm</strong>
                                <p>Đăng ảo 100% (Ví dụ: Nhà lọt khe siêu đẹp HN). Thu lead về CRM và BƠ KHÁCH vài ngày.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>Đóng vai Telesale gọi lại sảng khoái: "Alo anh ơi em thấy anh đang quan tâm đầu tư... Bên em đang có sóng tốt ở khu công nghiệp..."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Cú Bắc Cầu:</strong> "Anh thích lọt khe nội đô vì thanh khoản đúng không? Nhưng giờ giá kịch trần rồi, tệp khách HN của em đang rút vốn phân bổ về đất Tỉnh biên độ cao hơn nhiều. Anh xem cơ cấu dòng tiền nhịp này không em rẽ sóng?"</p>
                            </div>
                        </div>

                        <!-- Chiến thuật 3 -->
                        <div class="card vip">
                            <div class="badge">Nét Nhất - Chốt Cao</div>
                            <h3>3. Bài ngửa "Marketing Đăng Nhầm"</h3>
                            <div class="content-group">
                                <strong>Cách làm</strong>
                                <p>Cố tình ghép ảnh nội đô rất mượt vào bài Tỉnh. Lấy được số của khách xong ngửa bài luôn.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>"Em xin lỗi anh, bé thực tập bên em úp lộn bộ ảnh. Nhưng cái nội dung bài tiềm năng x2 là có thật. Em mời anh ly cafe để em tư vấn phân tích rành rọt khu này."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Đền Bù Tội Lỗi:</strong> Biến lỗi lầm thành "đặc quyền". "Phạt em cafe nhé, để đền bù em add anh vào Group kín/gửi list nội bộ hàng ngộp chưa tung cho truyền thông, anh lướt xem nhặt được căn nào không."</p>
                            </div>
                        </div>

                        <!-- Chiến thuật 6 -->
                        <div class="card vip">
                            <div class="badge">Nét Nhất - Chốt Cao</div>
                            <h3>6. Nhập vai "Chuyên Gia Cảnh Báo"</h3>
                            <div class="content-group">
                                <strong>Cách làm</strong>
                                <p>Nhận CÓ lô đất giá rẻ đó thật. Nhưng khi khách hỏi sâu thì hạ giọng.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>"Lô đó rẻ thật anh ạ, nhưng em nói chân tình: nó dính nhẹ quy hoạch cây xanh / đất vi bằng. Em khuyên anh né ra. Tầm tiền anh ráng nhỉnh xíu, lấy sang mã này của em sổ cất két ngủ cho ngon."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Tạo Vị Thế:</strong> Sẵn sàng chê nguồn hàng phễu để tôn vinh sự thật thà của bản thân. Khách thà tin một người dám chê lô rẻ, còn hơn tin đứa khen lô đó lên mây.</p>
                            </div>
                        </div>

                        <!-- Chiến thuật 5 -->
                        <div class="card safe">
                            <div class="badge">An Toàn - Thực Tế</div>
                            <h3>5. Mưu Mượn hàng đẹp làm "Chim Mồi Hạ Tầng"</h3>
                            <div class="content-group">
                                <strong>Cách làm</strong>
                                <p>Đăng khu hạ tầng cực đẹp, sát dự án công ty đang đánh. Báo đúng giá thị trường bình thường.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>Dắt khách đi thực địa khu đó thật, cố tình đưa vào các mảnh dính lỗi: Đường đâm, gần mộ, thóp hậu... Khách chê -> Rẽ vô lăng: "Tiện đây qua xem dự án tụi em, sạch tưng không tì vết."</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Mỏ Neo Kép:</strong> Đưa xem lô LỖI NHẤT để tạo đáy giá. Xong đưa lô ĐẸP NHẤT giá trên trời. Cuối cùng mới chốt lô CÔNG TY (Đẹp ngang lô 2 mà giá nhỉnh hơn lô 1). Khách thấy hời, chốt!</p>
                            </div>
                        </div>

                        <!-- Chiến thuật 7 -->
                        <div class="card safe">
                            <div class="badge">An Toàn - Thực Tế</div>
                            <h3>7. Mồi Nhử "Bảng Hàng Quá Khứ" (Tuyệt chiêu Khiêm)</h3>
                            <div class="content-group">
                                <strong>Cách làm</strong>
                                <p>Đăng khu cực đẹp, giá siêu tốt. Khách hỏi -> Check lại và gửi Bảng hàng cũ (đã gạch đỏ bán 99%).</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>Chỉ còn sót lại 1, 2 lô xấu quắc (trời sinh). Mời khách đi xem con cuối cùng này. Đến nơi khách lắc đầu -> Tiện tay dẫn luôn sang dự án cùng tệp tài chính của hệ thống công ty.</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Hiệu ứng Fomo:</strong> Cho khách thấy "hàng rẻ đẹp bay trong nốt nhạc". Kích thích sự nuối tiếc để khi đưa sang hàng thật của công ty, họ sẽ ra quyết định nhanh hơn.</p>
                            </div>
                        </div>

                        <!-- Chiến thuật 2 -->
                        <div class="card warn">
                            <div class="badge">Hên Xui - Phụ Thuộc Năng Lực</div>
                            <h3>2. Lô vừa nhận cọc & Lái bẻ ngoặt</h3>
                            <div class="content-group">
                                <strong>Cách làm</strong>
                                <p>Khách hỏi, báo ngay: "Lô đó vừa nhận cọc rồi anh ạ. Nhưng em đang còn 3 mã y hệt chưa up..."</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>"Anh quăng số Zalo em ném sổ qua luôn, FB bóp tương tác load không nổi file." Xin được Zalo là thắng bước 1.</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Giao Lộ Định Mệnh:</strong> Lấy Zalo xong mà tiếp tục gửi ẢO thì khách block tỷ lệ cao (Trở thành chiến thuật số 4). Lấy xong gửi THẬT và gọi điện bẻ tư duy thì mới có tỉ lệ sống sót.</p>
                            </div>
                        </div>

                        <!-- Chiến thuật 4 -->
                        <div class="card danger">
                            <div class="badge">Kém Nhất - Cảnh Báo</div>
                            <h3>4. Nhận Có Thật Trăm Phần Trơn Gói</h3>
                            <div class="content-group">
                                <strong>Cách làm</strong>
                                <p>Trả lời CÓ CÓ CÓ hết. Đất có, rẻ có, đẹp có. Cốt lõi lôi cổ khách lên xe đi thực địa cho bằng được.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>Tới nơi thì bẻ lái nói chủ quay xe, báo giá thách lên trên trời, hoặc dắt thẳng tới một cục mồi khác biệt hoàn toàn.</p>
                            </div>
                            <div class="upgrade-box">
                                <p><strong>Tránh Xa Tuyệt Đối:</strong> Mất tư cách, ăn chửi tại trận. Chỉ có thể dựa dẫm vào đám đông Sóng của công ty buff vào để ép khách ngộp, chốt vội. Quản lý/Sếp siêu ghét support thể loại lead lừa đảo này.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: MẪU GỬI THÔNG TIN
    // ---------------------------------------------------------
    'page-mau-gui-thong-tin': `
        <div class="page-title-bar">
            <h1>Mẫu Gửi Thông Tin</h1>
            <p class="page-subtitle">Tuyển tập các kịch bản, mẫu tin nhắn gửi thông tin dự án chuyên nghiệp cho khách hàng và cẩm nang thực chiến</p>
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
                    display: none; /* Ẩn iframe preview trên mobile/tablet */
                }
            }
        </style>

        <!-- Phần Cẩm nang PDF -->
        <div class="pdf-container">
            <div class="pdf-info">
                <div>
                    <span style="display: inline-block; background: rgba(59, 130, 246, 0.1); color: var(--accent-blue); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600; margin-bottom: 1rem; border: 1px solid rgba(59, 130, 246, 0.2);">
                        TÀI LIỆU NỔI BẬT
                    </span>
                    <h2 class="pdf-title">Cẩm Nang: Chiến Thần Gen Z - Bí Mật Bán Bất Động Sản</h2>
                    <p class="pdf-description">
                        Cuốn cẩm nang thực chiến gối đầu giường dành cho các chiến binh môi giới bất động sản thế hệ mới. 
                        Tài liệu tổng hợp các chiến thuật tiếp cận, kỹ năng xử lý từ chối, kịch bản gửi tin nhắn 
                        khiến khách hàng không thể ngó lơ và các bước chốt deal thần tốc.
                    </p>
                    <div style="margin-bottom: 2rem;">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                            <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i>
                            <span>Định dạng: PDF chất lượng cao</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; color: var(--text-secondary); font-size: 0.9rem;">
                            <i class="fa-solid fa-weight-hanging" style="color: var(--accent-blue);"></i>
                            <span>Dung lượng: ~11.4 MB</span>
                        </div>
                    </div>
                </div>
                <div class="pdf-actions">
                    <a href="assets/pdf/Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" target="_blank" class="btn-pdf btn-pdf-primary">
                        <i class="fa-solid fa-book-open"></i> Đọc Cẩm Nang Online
                    </a>
                    <a href="assets/pdf/Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" download="Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" class="btn-pdf btn-pdf-secondary">
                        <i class="fa-solid fa-download"></i> Tải Về Máy
                    </a>
                </div>
            </div>
            <div class="pdf-preview">
                <iframe src="assets/pdf/Chien_Than_Gen_Z_Bi_Mat_Ban_BDS.pdf" style="width: 100%; height: 100%; border: none;" type="application/pdf"></iframe>
            </div>
        </div>

        <!-- Phần Video Thực Chiến -->
        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2.5rem;">
            <h2 style="color: var(--accent-blue); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;">
                <i class="fa-solid fa-video" style="margin-right: 8px;"></i> Video Hướng Dẫn Thực Chiến
            </h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem;">Hãy xem kỹ các video ngắn dưới đây để nắm được tư duy và cách soạn tin nhắn gửi thông tin dự án khiến khách hàng không thể ngó lơ.</p>
            
            <div class="shorts-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/UUn45Eg1xwQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 1: Kỹ thuật gây tò mò</h3>
                    </div>
                </div>
                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/0-8mZ2ONq4k" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 2: Bố cục tin nhắn chuẩn</h3>
                    </div>
                </div>
                <!-- Video 3 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/XwFPXIULMMU" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 3: Nghệ thuật lái khách</h3>
                    </div>
                </div>
                <!-- Video 4 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 177.78%; height: 0; width: 100%;">
                        <iframe src="https://www.youtube.com/embed/qC4dU8ISSlM" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 1.2rem; text-align: center; background: rgba(255,255,255,0.03);">
                        <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Video 4: Tăng tỉ lệ phản hồi</h3>
                    </div>
                </div>
            </div>
        </div>
    `,
    // ---------------------------------------------------------
    // PAGE: CHIẾN LƯỢC FACEBOOK
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
        .fb-strategy-wrapper .phase-list li::before { content: '→'; position: absolute; left: -20px; color: var(--accent-2); }

        .fb-strategy-wrapper .highlight-text { color:var(--text-primary); font-weight: 500; }
        .fb-strategy-wrapper .important-note { background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1rem; margin-top: 1rem; color: #fbbf24; border-radius: 4px; }
    </style>
        <div class="fb-strategy-wrapper">
            <div class="container">
                
        <!-- Hero Section -->
        <div class="hero">
            <div class="hero-alert">
                <i data-lucide="shield-alert" width="18"></i> Thoát Cảnh "Đăng Bán Đất Toàn Tập" - Tuyệt Mật Internal
            </div>
            <h1>Bản Đồ "Chiếm Sóng"<br>Facebook Bất Động Sản</h1>
            <p>Trích xuất 100% từ dữ liệu thực chiến đỉnh cao của mô hình "Mẹ Mít Xinh". Không bán đất cứng nhắc, chúng ta sẽ bán <b>"Phong cách sống", "Sự vất vả đáng ngưỡng mộ"</b> và <b>"Năng lực chuyên gia"</b>.</p>
        </div>

        <!-- Section 1: Thuật toán & Tư duy -->
        <div class="glass-panel">
            <div class="section-header">
                <i data-lucide="cpu" width="32" height="32"></i>
                <h2>1. Giải Mã Thuật Toán & "Hack" Reach</h2>
            </div>
            
            <div class="grid-2">
                <div class="hack-box">
                    <h4><i data-lucide="zap"></i> Chiến thuật "Bơm Reach" Xuyên Tuần</h4>
                    <p><b>Đăng bài mồi buổi sáng (8h-9h):</b> Một tấm ảnh cá nhân (thể thao, cafe) hoặc gia đình để lấy Reach khủng đầu ngày. <br><br>
                    <b>Chốt hạ buổi chiều (14h-15h):</b> Mới bắt đầu đăng bài chuyên môn/bán hàng. Khách hàng đã tương tác bài sáng sẽ chắc chắn thấy bài buổi chiều trên Feed của họ.</p>
                </div>
                
                <div class="hack-box" style="border-left-color: var(--accent-1);">
                    <h4><i data-lucide="scan-face"></i> Định Luật Mặt Người (>300% Reach)</h4>
                    <p>Ảnh mộc mạc có Gương mặt nhân sự/Khách hàng <b>luôn đạt reach cao gấp 3 lần</b> ảnh phối cảnh dự án hay bản đồ vệt màu. Từ nay cấm đăng chỉ mỗi cái bản đồ quy hoạch trơ trọi.</p>
                </div>

                <div class="hack-box" style="border-left-color: var(--accent-3);">
                    <h4><i data-lucide="repeat"></i> Engagement Loop (Rep Rải Rác)</h4>
                    <p>Đừng bao giờ rep comment ngay lập tức một lúc. Hãy áp dụng chiến thuật <b>rep rải rác mỗi lần 1-2 comment trong ngày</b>. Mỗi lần bạn rep, bài viết lại được thuật toán đẩy "nhảy" lên đỉnh Newsfeed của người khác một lần nữa.</p>
                </div>

                <div class="hack-box" style="border-left-color: #f59e0b;">
                    <h4><i data-lucide="pen-tool"></i> Nghệ Thuật "Mềm Hóa" Từ Khóa</h4>
                    <p>Thuật toán tự động "bóp" tương tác các bài có mùi Sale. Tránh dùng: <del>Bán, Giá rẻ, Chốt lô, Mở bán</del>. Thay vào đó hãy dùng: <b>Gửi gắm, Cơ cấu tài sản, Hỗ trợ em, Hành trình tìm nhà, Cơ hội hữu duyên.</b></p>
                </div>
            </div>
        </div>

        <!-- Section 2: Công Thức 5-3-2 & "Mỏ Ý Tưởng" -->
        <div class="glass-panel">
            <div class="section-header">
                <i data-lucide="pie-chart" width="32" height="32"></i>
                <h2>2. Công Thức Content 5-3-2 (Bán Như Không Bán)</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Hãy trở thành <i>"Người kể chuyện của vùng đất đó"</i> thay vì một tay cò đất vô hồn.</p>

            <div class="grid-3" style="margin-bottom: 3rem;">
                <div class="mix-card">
                    <div class="percent-badge">50%</div>
                    <h3>Đời Sống & Nhược Điểm</h3>
                    <p>Chia sẻ sự thật trần trụi, sự vật vã của nghề, khoe gia đình hoặc lối sống healthy.<br><br><i>Mục đích: Xóa bỏ định kiến "Sale chỉ lăm lăm chốt tiền". Gây thiện cảm sâu sắc.</i></p>
                </div>
                <div class="mix-card">
                    <div class="percent-badge">30%</div>
                    <h3>Chuyên Môn Cứng</h3>
                    <p>Giải thích các thuật ngữ LUR, ONT, cách check quy hoạch ngay tại lô đất bằng 30s video bấm đt.<br><br><i>Mục đích: Thể hiện vị thế chuyên môn "Tao có những thứ mày không biết".</i></p>
                </div>
                <div class="mix-card">
                    <div class="percent-badge">20%</div>
                    <h3>Bằng Chứng (Uy Tín)</h3>
                    <p>Tin nhắn khách cám ơn, ảnh review quán bún cá sát dự án, hoặc gom mua chung lô đẹp.<br><br><i>Mục đích: Tạo lập bằng chứng thép, buff FOMO cực gắt.</i></p>
                </div>
            </div>

            <h3 style="color:var(--text-primary); margin-bottom: 1.5rem;"><i data-lucide="lightbulb" width="24" style="color: var(--accent-3); vertical-align: middle;"></i> Ý Tưởng Đăng Bằng Chuyện Đời Thực</h3>
            <div class="grid-2">
                <div class="idea-card"><span>Sự vật vả (Hustle)</span>"Ảnh lội bùn ruộng check ranh mốc cho khách tận Hà Nội. Sale đất nền là phải biết lội bùn, không phải chỉ mặc vest uống nước chè."</div>
                <div class="idea-card"><span>Lỗi sai (Vulnerability)</span>"Quên vác theo chìa khóa mở cổng đất khu biệt lập. May các bác khách dễ tính bảo 'Đẹp thế này quên anh cũng tha'. Nhớ check túi 3 lần nhé anh em!"</div>
                <div class="idea-card"><span>Sự thấu cảm</span>"Thương ông anh dồn tích cóp cả đời đi mua lô đất đầu tiên, cứ hỏi quy hoạch mãi bải cả người. Mình bảo 'Chú cứ an tâm, cháu check 3 lớp mộc mới dám gọi'."</div>
                <div class="idea-card"><span>Local Brand</span>"Dẫn khách xem đất xong phải rẽ ngang làm bát bún cá [Tên Quán] đỉnh chóp. Khách ăn xong gật gù khen đất ngon bún cũng xịn!"</div>
            </div>
        </div>

        <!-- Section 3: Trận Đánh Timeline 9 Khung Giờ -->
        <div class="glass-panel" style="border-color: rgba(59, 130, 246, 0.5); box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);">
            <div class="section-header">
                <i data-lucide="clock-9" width="32" height="32" style="color: #60a5fa;"></i>
                <h2>3. Lịch Trình 9 Khung Giờ "Domination" (5-10 Bài/Ngày)</h2>
            </div>
            <p style="color: var(--text-muted);">Sản xuất siêu tốc (Snap & Post): Đừng cầu kỳ! Thấy biển báo mới đẹp, xe cẩu đông -> Chụp post Story ngay kèm 1 dòng cảm xúc. 1 Nội dung Feed có thể bẻ ra 4 Story để duy trì hiển thị.</p>
            
            <table class="timeline-table">
                <thead>
                    <tr>
                        <th>Khung Giờ</th>
                        <th>Kênh Đăng</th>
                        <th>Nội Dung Chi Tiết</th>
                        <th>Mục Tiêu Đạt Được</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>07:30</td><td><span class="badge-feed">Feed</span> + <span class="badge-story">Story</span></td><td>Ảnh có mặt chính chủ/Năng lượng thể thao/Trà sáng.</td><td><span class="highlight-text">Bơm Reach tổng lực</span> cho ngày.</td></tr>
                    <tr><td>09:30</td><td><span class="badge-story">Story</span></td><td>Tin vắn thời sự BĐS / Chụp vội ảnh bản đồ QH.</td><td>Phẩy danh hiệu "Chuyên gia".</td></tr>
                    <tr><td>11:00</td><td><span class="badge-story">Story</span></td><td>15s Video check tọa độ địa bàn thực tế nắng nôi.</td><td>Khẳng định tính "Thực chiến".</td></tr>
                    <tr><td>13:30</td><td><span class="badge-feed">Feed (Chuyên sâu)</span></td><td>Phân tích pháp lý lô X, cơ hội đầu tư sâu sắc.</td><td><b>Ghim uy tín sâu vào lòng khách.</b></td></tr>
                    <tr><td>15:30</td><td><span class="badge-feed">Feed (Social Proof)</span></td><td>Che tên đăng Bill cọc, hoặc ảnh tin nhắn Feedback.</td><td>Chốt chặn niềm tin an toàn.</td></tr>
                    <tr><td>17:30</td><td><span class="badge-story">Story</span></td><td>Câu chuyện hậu trường đổ nát, đói meo chờ khách.</td><td>Kích hoạt Sự Đồng Cảm.</td></tr>
                    <tr><td>19:30</td><td><span class="badge-feed">Feed (Game)</span></td><td>Trò chơi hỏi đáp A/B (Chọn mảnh vuông hay mảnh xéo?).</td><td><span class="highlight-text">Kéo Tương Tác Cực Điểm.</span></td></tr>
                    <tr><td>21:00</td><td><span class="badge-story">Story</span></td><td>Góc khuất, chiêm nghiệm đời sống, đạo đức sống.</td><td>Trở thành bạn bè của khách.</td></tr>
                    <tr><td>22:30</td><td><span class="badge-story">Story</span></td><td>Úp mở: "Mai có 1 lô hoa hậu ngộp nín thở, chờ em!".</td><td>Giữ chân sự háo hức vào ngày mai.</td></tr>
                </tbody>
            </table>
            <div class="important-note">
                <i data-lucide="siren" width="18" style="vertical-align: middle;"></i> <b>KPI Nhắc nhở Team TL Land:</b> Đăng 5-10 bài không phải là làm phiền khách, mà để ép khách hàng <i>"KHÔNG TÀI NÀO QUÊN ĐƯỢC CHÚNG TA"</i> ngay khi họ nảy mầm nhu cầu mua đất!
            </div>
        </div>

        <!-- Section 4: Lộ Trình Áp Dụng 30 Ngày (Action Plan) -->
        <div class="glass-panel">
            <div class="section-header">
                <i data-lucide="map" width="32" height="32"></i>
                <h2>4. Lộ Trình Chuyển Đổi 30 Ngày "Sát Thủ Đất Nền"</h2>
            </div>
            
            <div class="roadmap">
                <div class="phase-card">
                    <div class="phase-title"><span>Ngày 1 - 10</span> Phá Băng & Hiện Diện Sống Động</div>
                    <ul class="phase-list">
                        <li><b>Mục tiêu:</b> Cho khách thấy bạn là con người bằng xương bằng thịt, không phải cái loa rao vặt.</li>
                        <li><b>Hành động:</b> Đăng bài chia sẻ trở ngại nghề, sở thích. Mở đầu bằng Câu Hỏi Mở ("Các bác nghĩ vùng ven giờ có nên xuống tiền khô máu?").</li>
                        <li><b>Nhiệm vụ:</b> Đi comment dạo "cực kỳ có tâm" vào tường của 20 Data Khách hàng Tiềm năng mỗi ngày.</li>
                    </ul>
                </div>

                <div class="phase-card">
                    <div class="phase-title"><span>Ngày 11 - 20</span> Định Vị "Cái Đầu Sỏi Chuyên Gia"</div>
                    <ul class="phase-list">
                        <li><b>Mục tiêu:</b> Khách hàng phải gật gù: "Thằng này biết nhiều thứ đất đai mà mình không rành".</li>
                        <li><b>Hành động:</b> Lên seri video 30s giải thích sự khác biệt giữa sổ đỏ thật giả, 3 dấu hiệu đất "ngợp tự tạo", check app mãnh đất ngay hiện trường.</li>
                        <li><b>Visual:</b> Hạn chế đăng đất không người. Yêu cầu Selfie kèm bản đồ, ôm giấy tờ sổ hồng mồ hôi nhễ nhại.</li>
                    </ul>
                </div>

                <div class="phase-card">
                    <div class="phase-title"><span>Ngày 21 - 30</span> Kéo Lưới, Khoe Bằng Chứng Thép</div>
                    <ul class="phase-list">
                        <li><b>Mục tiêu:</b> Gom khách hàng đang ngần ngại phải nhảy xuống thuyền. FOMO hóa.</li>
                        <li><b>Hành động:</b> Share tin nhắn khách chốt đơn qua điện thoại. Ảnh dắt khách đi công chứng (kể lại nhu cầu thực tế của khách).</li>
                        <li><b>Chiêu cuối:</b> Khởi tạo phong trào "Gom mua chung mảnh hoa hậu gãy nợ ngân hàng" để gom phễu inbox tự nhiên 10-15 leads.</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Section 5: Bản Lịch Trình Ví Dụ Thực Tế -->
        <div class="glass-panel" style="border-color: rgba(16, 185, 129, 0.3); box-shadow: 0 0 40px rgba(16, 185, 129, 0.05);">
            <div class="section-header">
                <i data-lucide="book-open-check" width="32" height="32" style="color: var(--accent-3);"></i>
                <h2>5. Lịch Trình Khung 24H (Hai Bản Ví Dụ)</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.1rem; max-width: 800px;">
                Dưới đây là 2 bản ví dụ thực tế về kịch bản đăng bài (Nam Thực Chiến và Nữ Sắc Sảo). Hệ thống yêu cầu <b>truy cập trực tiếp</b> để xem hệ thống giao diện chuẩn của lịch trình tác chiến 24h.
            </p>
            
            <div style="text-align: center; margin-top: 2rem;">
                <a href="lich_trinh_24h_bds_nam.html" target="_blank" style="display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg, #10b981, #059669); color:var(--text-primary); text-decoration: none; padding: 18px 40px; border-radius: 50px; font-weight: 800; font-family: 'Outfit', sans-serif; font-size: 1.3rem; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);">
                    <i data-lucide="arrow-up-right" width="24"></i> Bấm Vào Đây Để Xem Kịch Bản Chi Tiết
                </a>
            </div>
        </div>

            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: BÀI ĐĂNG ĐẦU TIÊN (Công Thức 5 Lớp)
    // ---------------------------------------------------------
    'page-bai-dang-dau-tien': `
        <div class="page-title-bar">
            <h1>Công Thức 5 Lớp</h1>
            <p class="page-subtitle">Blueprint bài đăng giới thiệu BĐS đầu tiên cho nhân sự mới — gieo hạt tự nhiên, không giống quảng cáo.</p>
        </div>

        <div class="core-principle" style="border-left-color: #34d399;">
            <h2 style="color: #34d399;">🌱 Mục Tiêu Bài Đăng Đầu Tiên</h2>
            <p>
                Bài đăng đầu tiên <strong>KHÔNG PHẢI ĐỂ BÁN HÀNG</strong>. Mục tiêu duy nhất là <strong>"GIEO HẠT"</strong> — cho bạn bè trên MXH biết mình đã chuyển sang làm BĐS. Khi họ có nhu cầu, họ sẽ nhớ đến mình đầu tiên.
            </p>
        </div>

        <!-- Flow Diagram -->
        <div class="glass-panel" style="border-color: rgba(56, 189, 248, 0.3); box-shadow: 0 0 40px rgba(56, 189, 248, 0.08);">
            <div class="section-header">
                <i data-lucide="layers" width="32" height="32"></i>
                <h2>Sơ Đồ 5 Lớp Chiến Lược</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Mỗi lớp có một nhiệm vụ tâm lý riêng. <strong style="color:var(--text-primary);">Thứ tự KHÔNG được đảo</strong> — nếu đảo sẽ thành quảng cáo, bạn bè lướt qua ngay.</p>

            <div style="display:flex; flex-direction:column; gap:12px; padding-left: 20px; border-left: 3px solid rgba(56,189,248,0.3);">
                <div style="padding:12px 20px; background:rgba(56,189,248,0.06); border-radius:12px; border-left:4px solid #38bdf8;">
                    <span style="color:#38bdf8; font-weight:800; font-size:1.1rem;">01</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">Background</span>
                    <span style="color:var(--text-muted); margin-left:8px;">→ Người đọc: "À bạn này giỏi mà"</span>
                </div>
                <div style="padding:12px 20px; background:rgba(167,139,250,0.06); border-radius:12px; border-left:4px solid #a78bfa;">
                    <span style="color:#a78bfa; font-weight:800; font-size:1.1rem;">02</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">Lý Do Chuyển Ngành</span>
                    <span style="color:var(--text-muted); margin-left:8px;">→ "Ừ BĐS cũng hay, mình cũng cần"</span>
                </div>
                <div style="padding:12px 20px; background:rgba(52,211,153,0.06); border-radius:12px; border-left:4px solid #34d399;">
                    <span style="color:#34d399; font-weight:800; font-size:1.1rem;">03</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">Bằng Chứng Cá Nhân</span>
                    <span style="color:var(--text-muted); margin-left:8px;">→ "Bạn này đã đầu tư rồi à"</span>
                </div>
                <div style="padding:12px 20px; background:rgba(248,113,113,0.1); border-radius:12px; border-left:4px solid #f87171; box-shadow: 0 0 20px rgba(248,113,113,0.08);">
                    <span style="color:#f87171; font-weight:800; font-size:1.1rem;">04</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">⭐ Đứng Trên Vai Người Khổng Lồ</span>
                    <span style="color:var(--text-muted); margin-left:8px;">→ "Có sếp giỏi đứng sau, yên tâm"</span>
                </div>
                <div style="padding:12px 20px; background:rgba(251,191,36,0.06); border-radius:12px; border-left:4px solid #fbbf24;">
                    <span style="color:#fbbf24; font-weight:800; font-size:1.1rem;">05</span>
                    <span style="color:var(--text-primary); font-weight:600; margin-left:12px;">Sản Phẩm + CTA Mềm</span>
                    <span style="color:var(--text-muted); margin-left:8px;">→ "OK, khi nào cần mình sẽ hỏi"</span>
                </div>
            </div>
        </div>

        <!-- 5 Layer Cards -->
        <div class="grid-container single-col">

            <!-- Layer 1 -->
            <div class="card vip">
                <div class="badge">Lớp 1: Tạo Uy Tín Ban Đầu</div>
                <h3>👤 Background — "Mình là ai, mình từng làm gì"</h3>
                <div class="content-group">
                    <strong>Nhiệm vụ tâm lý</strong>
                    <p>Chứng minh mình là người <b>có năng lực</b>, không phải vì thất bại mới đi bán đất. Thành tích cũ cho thấy mình chủ động chuyển vì <b>tham vọng</b>.</p>
                </div>
                <div class="content-group">
                    <strong>Công thức</strong>
                    <p><em>"Em chào mọi người ạ. Trước đây em làm bên [NGÀNH CŨ] được [SỐ NĂM], cũng [THÀNH TÍCH]. Nhưng em cảm thấy [LÝ DO MUỐN THAY ĐỔI]."</em></p>
                </div>
                <div class="upgrade-box">
                    <p><b>Ví dụ:</b> "Trước em làm kế toán 5 năm, thu nhập ổn nhưng thấy không có cơ hội tăng trưởng" • "Em vừa tốt nghiệp ĐH quản trị, muốn tìm hướng đi tiềm năng hơn" • "Em là giáo viên dạy Toán 3 năm, muốn thử sức lĩnh vực mới"</p>
                </div>
            </div>

            <!-- Layer 2 -->
            <div class="card safe">
                <div class="badge">Lớp 2: Tạo Sự Hợp Lý + Gieo Hạt</div>
                <h3>🔄 Lý Do Chuyển Ngành — "Tại sao BĐS?"</h3>
                <div class="content-group">
                    <strong>Nhiệm vụ tâm lý</strong>
                    <p>Thể hiện sự hứng thú <b>chân thật</b> (không phải bị ép bán). Ngầm nhắc người đọc: <b>"Bạn cũng sẽ cần BĐS đấy"</b> — mua nhà, đầu tư, thừa kế, kinh doanh...</p>
                </div>
                <div class="content-group">
                    <strong>Công thức</strong>
                    <p><em>"Sau khi tìm hiểu về BĐS thì em thấy [CẢM NHẬN TÍCH CỰC]. Em nhận ra rằng ai rồi cũng cần đến BĐS — dù là [NHU CẦU 1], [NHU CẦU 2], hay [NHU CẦU 3]."</em></p>
                </div>
            </div>

            <!-- Layer 3 -->
            <div class="card warn">
                <div class="badge">Lớp 3: Social Proof Cá Nhân</div>
                <h3>📈 Bằng Chứng Cá Nhân — "Mình đã làm và thành công"</h3>
                <div class="content-group">
                    <strong>Nhiệm vụ tâm lý</strong>
                    <p>Mình không chỉ "nói suông" — mình đã <b>bỏ tiền thật</b> hoặc có trải nghiệm thực tế. 2 keyword vàng: <b style="color:#34d399;">LỢI NHUẬN TỐT</b> + <b style="color:#34d399;">AN TOÀN</b>.</p>
                </div>
                <div class="content-group">
                    <strong>Công thức</strong>
                    <p><em>"Bản thân em cũng đã [HÀNH ĐỘNG THỰC TẾ] và thấy [KẾT QUẢ]. Đó chính là động lực để em quyết định [CAM KẾT VỚI NGÀNH]."</em></p>
                </div>
                <div class="upgrade-box">
                    <p><b>Nếu chưa từng đầu tư?</b> Chuyển thành: "Em chứng kiến người thân đầu tư thành công" hoặc "Em đi xem thực tế và nhận ra tiềm năng". Quan trọng là phải có <b>TRẢI NGHIỆM THẬT</b>, dù nhỏ.</p>
                </div>
            </div>

            <!-- Layer 4 (Critical) -->
            <div class="card danger">
                <div class="badge">⭐ Lớp 4: Quan Trọng Nhất</div>
                <h3>🏔️ Đứng Trên Vai Người Khổng Lồ</h3>
                <div class="content-group">
                    <strong>Nhiệm vụ tâm lý</strong>
                    <p style="color: #f87171;">Giải quyết nỗi lo lớn nhất: <b>"Bạn này mới vào ngành, có đáng tin không?"</b></p>
                    <p>→ Câu trả lời: <b style="color:#34d399;">"Mình mới, nhưng mình có người GIỎI dẫn dắt."</b> Uy tín được "vay mượn" từ sếp/mentor → khách yên tâm ngay lập tức.</p>
                </div>
                <div class="content-group">
                    <strong>Công thức</strong>
                    <p><em>"May mắn là em có [MỐI QUAN HỆ] — hiện đang là [VỊ TRÍ UY TÍN], có [SỐ NĂM] kinh nghiệm. Đây là lợi thế để em [LỢI ÍCH CHO KHÁCH HÀNG]."</em></p>
                </div>
                <div class="upgrade-box">
                    <p><b>"Người khổng lồ" có thể là:</b> Trưởng nhóm, sếp trực tiếp, công ty, mentor — không nhất thiết phải là người thân. Quan trọng là <b>NGƯỜI THẬT, UY TÍN THẬT</b> để khi khách hỏi sâu, có người backup.</p>
                </div>
            </div>

            <!-- Layer 5 -->
            <div class="card vip">
                <div class="badge">Lớp 5: Gieo Hạt Thành Công</div>
                <h3>🤝 Sản Phẩm + CTA Mềm — "Liên hệ khi cần"</h3>
                <div class="content-group">
                    <strong>Nhiệm vụ tâm lý</strong>
                    <p>Định vị bản thân là <b>"người tư vấn"</b>, sẵn sàng giải đáp chứ không ép mua. CTA bài đầu <b>CỐ TÌNH phải mềm</b> — chỉ cần gieo hạt, bán hàng ở những bài tiếp theo.</p>
                </div>
                <div class="content-group">
                    <strong>Công thức</strong>
                    <p><em>"Nên nếu mọi người có nhu cầu hay thắc mắc gì về BĐS, cứ inbox em nhé! Em sẵn sàng [GIÁ TRỊ CHIA SẺ]."</em></p>
                </div>
            </div>
        </div>

        <!-- Template Section -->
        <div class="glass-panel" style="margin-top: 50px; border-color: rgba(52, 211, 153, 0.3); box-shadow: 0 0 40px rgba(52, 211, 153, 0.08);">
            <div class="section-header">
                <i data-lucide="file-text" width="32" height="32" style="color: var(--accent-emerald);"></i>
                <h2 style="color:var(--text-primary);">Template Điền Nhanh</h2>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Nhân sự mới chỉ cần điền thông tin <b style="color:var(--text-primary);">THẬT</b> của mình vào các chỗ trống (màu vàng).</p>

            <div style="background: rgba(0,0,0,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 30px; font-size: 1rem; line-height: 2; color:var(--text-secondary);">
                <p>Em chào mọi người ạ ❤️</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">LỚP 1</span> Trước đây em làm bên <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NGÀNH CŨ]</span> được <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[SỐ NĂM]</span>, cũng <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[THÀNH TÍCH]</span>. Nhưng em cảm thấy <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[LÝ DO THAY ĐỔI]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">LỚP 2</span> Sau khi tìm hiểu về BĐS thì em thấy <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[CẢM NHẬN]</span>. Em nhận ra rằng ai rồi cũng cần đến BĐS — dù là <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NHU CẦU 1]</span>, <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NHU CẦU 2]</span>, hay <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[NHU CẦU 3]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">LỚP 3</span> Bản thân em cũng đã <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[TRẢI NGHIỆM VỚI BĐS]</span> và thấy <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[KẾT QUẢ]</span>. Đó chính là động lực để em quyết định <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[CAM KẾT]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">LỚP 4</span> May mắn là em được <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[AI ĐÓ]</span> — hiện đang là <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[VỊ TRÍ]</span>, có <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[SỐ NĂM]</span> kinh nghiệm — hỗ trợ và dẫn dắt. Đây là lợi thế để em <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[LỢI ÍCH CHO KHÁCH]</span>.</p>
                <br>
                <p><span style="background:rgba(248,113,113,0.2); color:#f87171; padding:2px 8px; border-radius:4px; font-size:0.75rem; font-weight:700;">LỚP 5</span> Nên nếu mọi người có nhu cầu hay thắc mắc gì về BĐS, cứ inbox em nhé! Em sẵn sàng <span style="color:#fbbf24; border-bottom:1px dashed #fbbf24;">[GIÁ TRỊ TƯ VẤN]</span> 🏡</p>
            </div>
        </div>

        <!-- Warning -->
        <div class="glass-panel" style="margin-top: 30px; border-color: rgba(248, 113, 113, 0.3);">
            <div class="section-header">
                <i data-lucide="alert-triangle" width="32" height="32" style="color: #f87171;"></i>
                <h2 style="color: #f87171;">Lưu Ý Quan Trọng</h2>
            </div>
            <div style="display:flex; flex-direction:column; gap:16px;">
                <div style="padding:16px; background:rgba(248,113,113,0.06); border-radius:12px; border-left:3px solid #f87171;">
                    <p style="color:#fca5a5;"><b>❌ Không copy y nguyên:</b> Mỗi nhân sự PHẢI customize theo background thật. Nếu nhiều người đăng giống nhau → bạn bè chung nhận ra → mất uy tín.</p>
                </div>
                <div style="padding:16px; background:rgba(251,191,36,0.06); border-radius:12px; border-left:3px solid #fbbf24;">
                    <p style="color:#fde68a;"><b>⏰ Không đăng cùng lúc:</b> Không đăng cùng ngày/giờ nếu nhân sự có bạn chung trên MXH.</p>
                </div>
                <div style="padding:16px; background:rgba(52,211,153,0.06); border-radius:12px; border-left:3px solid #34d399;">
                    <p style="color:#6ee7b7;"><b>✍️ Yêu cầu viết tay:</b> Nhân sự tự viết, trưởng nhóm sửa — bài sẽ tự nhiên hơn rất nhiều so với copy paste.</p>
                </div>
                <div style="padding:16px; background:rgba(56,189,248,0.06); border-radius:12px; border-left:3px solid #38bdf8;">
                    <p style="color:#7dd3fc;"><b>📸 Kèm hình ảnh:</b> Ảnh cá nhân chuyên nghiệp (chỉnh AI) hoặc ảnh check-in tại dự án. Text-only bị thuật toán Facebook ghìm reach.</p>
                </div>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: CẦM TAY CHỈ VIỆC
    // ---------------------------------------------------------
    'page-cam-tay-chi-viec': `
        <div class="page-title-bar">
            <h1>Cầm Tay Chỉ Việc</h1>
            <p class="page-subtitle">Hệ thống video hướng dẫn thao tác chi tiết</p>
        </div>

        <!-- PHẦN I: Cách đăng TikTok -->
        <div class="core-principle" style="border-left-color: var(--accent-orange); margin-top: 2rem;">
            <h2 style="color: var(--accent-orange); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;"><i class="fa-brands fa-tiktok" style="margin-right: 8px;"></i> I. Cách đăng TikTok</h2>
            
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

        <!-- PHẦN II: Hướng dẫn chạy QC FB -->
        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2rem;">
            <h2 style="color: var(--accent-blue); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;"><i class="fa-brands fa-facebook" style="margin-right: 8px;"></i> II. Hướng dẫn chạy quảng cáo Facebook</h2>
            
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

        <!-- PHẦN III: Đăng tin -->
        <div class="core-principle" style="border-left-color: var(--accent-emerald); margin-top: 2rem;">
            <h2 style="color: var(--accent-emerald); font-size: 1.6rem; margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase;"><i class="fa-solid fa-bullhorn" style="margin-right: 8px;"></i> III. Đăng tin</h2>
            
            <!-- Accordion Đăng Tin Lái Khách -->
            <details style="margin-bottom: 2rem; background: var(--bg-secondary); border-radius: 16px; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); overflow: hidden;">
                <summary style="padding: 1.2rem 1.5rem; font-weight: 700; font-size: 1.2rem; cursor: pointer; color: var(--text-primary); outline: none; list-style: none;">
                    <i class="fa-solid fa-chess-knight" style="color: var(--accent-blue); margin-right: 10px;"></i> Đăng Tin Lái Khách (Bấm để xem Tuyệt Kỹ)
                </summary>
                <div style="padding: 1.5rem; border-top: 1px solid var(--border-glass); background: var(--bg-primary);">
                    <div class="core-principle">
                        <h2>🎯 Nguyên Lý "Sự Thật Nửa Vời" (Half-Truths)</h2>
                        <p>
                            Mục tiêu tối thượng của tin đăng ảo <strong>KHÔNG PHẢI ĐỂ BÁN LÔ ĐẤT ĐÓ</strong>, mà là để <strong>LẤY LEAD (Khách có tiền và máu đầu tư)</strong>. 
                            Tuyệt chiêu đỉnh cao là giăng một cái bẫy hoàn hảo, thu hút khách vào, sau đó tự tay <em>"đập vỡ"</em> bẫy để xây dựng lòng tin tuyệt đối. Từ đó dắt khách sang thị trường mục tiêu.
                        </p>
                    </div>

                    <div class="grid-container" style="margin-top: 1rem;">
                        <!-- Card 1 -->
                        <div class="card vip">
                            <div class="badge">Nét Nhất - Chốt Cao</div>
                            <h3>Đăng ảo 100% cả nội dung, cả hình ảnh</h3>
                            <div class="content-group">
                                <strong>Tư duy</strong>
                                <p>Thu được nhiều lead để chăm, những lead này có tiền và có nhu cầu đầu tư.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>Chào mới về thị trường: "Anh ơi em thấy anh đang có nhu cầu đầu tư, bên em đang có khu vực sát biển và gần khu công nghiệp đẹp lắm anh ạ mà có Hơn tỷ thôi..."</p>
                            </div>
                        </div>

                        <!-- Card 2 -->
                        <div class="card vip">
                            <div class="badge">Nét Nhất - Chốt Cao</div>
                            <h3>Đăng ảo, nội dung thật</h3>
                            <div class="content-group">
                                <strong>Tư duy</strong>
                                <p>Để kiếm ra khách có nhu cầu đầu tư và mình sẽ lái khách.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>- "Em xin lỗi anh, bé nhân viên em bạn ý đăng nhầm ảnh. Nhưng cái nội dung bài tiềm năng x2 là có thật 100% anh ạ, ở đây tiềm năng đẹp lắm. Em mời anh ly cafe để em mang bản đồ, mặt bằng, sổ đỏ qua tư vấn cho anh về tiềm năng của khu này."</p>
                                <p>- Hoặc khi trao đổi với khách thì sẽ bảo là bán rồi, nhưng em còn một vài lô cũng ở vị trí này rất là đẹp luôn để em kết bạn với anh thông tin, sau đấy lại chăm sóc và mời đi như bình thường.</p>
                            </div>
                        </div>

                        <!-- Card 3 -->
                        <div class="card vip">
                            <div class="badge">Nét Nhất - Chốt Cao</div>
                            <h3>Đăng ảo, nội dung ảo</h3>
                            <div class="content-group">
                                <strong>Tư duy</strong>
                                <p>Để kiếm ra khách có nhu cầu đầu tư và mình sẽ lái khách.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>"Em có mảnh này thật anh ạ, nhưng em chia sẻ thật: nó dính nhẹ quy hoạch cây xanh / đất vi bằng. Nên nếu anh là đầu tư chuyên nghiệp thì khu vực này đầu tư rất ok, nhưng nếu anh sợ quy hoạch về sau người ta làm thì em còn nhiều mảnh có sẵn sổ đỏ, ở khu vực cực kỳ tiềm năng, em mời anh đi cà phê em qua chia sẻ thông tin."</p>
                            </div>
                        </div>

                        <!-- Card 4 -->
                        <div class="card safe">
                            <div class="badge">An Toàn - Thực Tế</div>
                            <h3>Đăng thật, nội dung thật</h3>
                            <div class="content-group">
                                <strong>Tư duy</strong>
                                <p>Mượn hàng đẹp làm "Chim Mồi Hạ Tầng", không lừa dối khách hàng, đưa khách đi xem thật nhưng sẽ chê và hướng về sản phẩm của mình.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>Khi kết bạn Zalo gửi thông tin thì gửi khu đó thật và gửi cả các sản phẩm bên mình đang có. Đến khi dắt khách đi thực địa khu đó thật, cố tình đưa vào các mảnh dính lỗi: Đường đâm, gần mộ, thóp hậu... Khách chê -> Đưa sang khu bên mình rồi bán.</p>
                            </div>
                        </div>

                        <!-- Card 5 -->
                        <div class="card danger">
                            <div class="badge">Khối lượng lớn - Tỉ lệ thấp</div>
                            <h3>Ảo toàn bộ</h3>
                            <div class="content-group">
                                <strong>Tư duy</strong>
                                <p>Mục tiêu của khách đi là được, để tận dụng sóng của công ty đông khách để bán.</p>
                            </div>
                            <div class="content-group">
                                <strong>Xử lý</strong>
                                <p>Tới nơi thì bẻ lái nói chủ quay xe, báo giá thách lên trên trời, hoặc dắt thẳng tới một cục mồi khác biệt hoàn toàn. Hoặc không nói gì đến lô đăng ảo. (Cách này thì khách rất nhiều nhưng tỉ lệ chốt thấp).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </details>
            
            <!-- III.A: Đăng thảo luận -->
            <h3 style="color: var(--text-primary); font-size: 1.3rem; margin-top: 1.5rem; margin-bottom: 1rem;"><i class="fa-solid fa-users" style="color: var(--accent-emerald); margin-right: 8px;"></i> A. Đăng thảo luận</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-bottom: 2rem;">
                <!-- Video Sếp Khương -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://drive.google.com/file/d/10wmmWCAqNkOhLb1jJ47nN8Ulj7hChNye/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        Sếp Khương hướng dẫn đăng ảo Group đơn giản
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

            <!-- III.B: Đăng market -->
            <h3 style="color: var(--text-primary); font-size: 1.3rem; margin-top: 2.5rem; margin-bottom: 1rem;"><i class="fa-solid fa-store" style="color: var(--accent-emerald); margin-right: 8px;"></i> B. Đăng market</h3>
            
            <h4 style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1rem;">1. Chạy bơm tiền</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-bottom: 2rem;">
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/wiRI-ugPz8s" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            <h4 style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 1rem;">2. Đăng free</h4>
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
    // PAGE: CHÂN DUNG KHÁCH HÀNG
    // ---------------------------------------------------------
    'page-chan-dung-khach-hang': `
        <div class="iframe-container-wrapper">
            <div class="iframe-scroll-container">
                <iframe src="/training-hub/CHAN_DUNG_KHACH_HANG_V2_1.html" class="custom-iframe" loading="lazy"></iframe>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: CÁC KHÓA HỌC
    // ---------------------------------------------------------
    'page-cac-khoa-hoc': `
        <div class="page-title-bar">
            <h1>Các Khóa Học</h1>
            <p class="page-subtitle">Hệ thống đào tạo qua video</p>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-blue); margin-top: 2rem;">
            <h2 style="color: var(--text-primary); font-size: 1.3rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-play" style="color: var(--accent-blue); margin-right: 8px;"></i> 1. Tư duy chạy marketing: Hướng dẫn làm khách của sếp Doanh</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <!-- Video 1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/kuStPMgUD8w" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        Tư duy MKT
                    </div>
                </div>

                <!-- Video 2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/vr24eW0RfcQ" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        Tư duy MKT
                    </div>
                </div>

                <!-- Video 3 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/rJW527JbOxI" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        Tư duy MKT
                    </div>
                </div>

                <!-- Video 4 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://www.youtube.com/embed/DTdYGlZFTAw" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" loading="lazy" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        Tư duy MKT
                    </div>
                </div>
            </div>
        </div>

        <div class="core-principle" style="border-left-color: var(--accent-purple); margin-top: 2rem;">
            <h2 style="color: var(--text-primary); font-size: 1.3rem; margin-bottom: 1.5rem;"><i class="fa-solid fa-robot" style="color: var(--accent-purple); margin-right: 8px;"></i> 2. Sử dụng AI vào công việc</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 24px; margin-top: 20px;">
                <!-- Video 2.1 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://drive.google.com/file/d/13rPLIQBTaelvQBn4miZiCU7GX-YI-6p-/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        2.1: Chỉnh và làm đẹp mặt bằng
                    </div>
                </div>

                <!-- Video 2.2 -->
                <div style="background: var(--bg-secondary); border-radius: 16px; overflow: hidden; border: 1px solid var(--border-glass); box-shadow: var(--shadow-sm); transition: transform 0.3s ease;">
                    <div style="position: relative; padding-bottom: 56.25%; height: 0;">
                        <iframe src="https://drive.google.com/file/d/10wmmWCAqNkOhLb1jJ47nN8Ulj7hChNye/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen></iframe>
                    </div>
                    <div style="padding: 16px; text-align: center; font-weight: 600; color: var(--text-primary); font-size: 1.1rem; border-top: 1px solid var(--border-glass);">
                        2.2: Chỉnh sổ đỏ
                    </div>
                </div>
            </div>
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: ADMIN - QUẢN LÝ TRUY CẬP (render bởi auth.js)
    // ---------------------------------------------------------
    'page-admin-emails': `
        <div class="admin-loading">
            <i class="fa-solid fa-spinner fa-spin"></i> Đang tải trang quản lý...
        </div>
    `,

    // ---------------------------------------------------------
    // PAGE: TUYỆT KỸ LÁI KHÁCH THỰC CHIẾN
    // ---------------------------------------------------------
    'page-tuyet-ky-lai-khach': `
        <div class="page-title-bar">
            <h1>Tuyệt Chiêu Lái Khách</h1>
            <p class="page-subtitle">Giáo trình đào tạo Sale BĐS: Định vị tệp khách tiềm năng từ kịch bản tin đăng ảo.</p>
        </div>

        <div class="core-principle">
            <h2>🎯 Nguyên Lý "Sự Thật Nửa Vời" (Half-Truths)</h2>
            <p>
                Mục tiêu tối thượng của tin đăng ảo <strong>KHÔNG PHẢI ĐỂ BÁN LÔ ĐẤT ĐÓ</strong>, mà là để <strong>LẤY LEAD (Khách có tiền và máu đầu tư)</strong>. 
                Tuyệt chiêu đỉnh cao là giăng một cái bẫy hoàn hảo, thu hút khách vào, sau đó tự tay <em>"đập vỡ"</em> bẫy để nhập vai <strong>Người bảo vệ/Chuyên gia</strong> nhằm xây dựng lòng tin tuyệt đối. Từ đó dắt khách sang thị trường mục tiêu.
            </p>
        </div>

        <div class="grid-container">

            <!-- Chiến thuật 1 -->
            <div class="card vip">
                <div class="badge">Nét Nhất - Chốt Cao</div>
                <h3>1. Tư duy "Tuyển Tập Lead" & Telesale Gọi Lại</h3>
                
                <div class="content-group">
                    <strong>Cách làm</strong>
                    <p>Đăng ảo 100% (Ví dụ: Nhà lọt khe siêu đẹp HN). Thu lead về CRM và BƠ KHÁCH vài ngày.</p>
                </div>
                <div class="content-group">
                    <strong>Xử lý</strong>
                    <p>Đóng vai Telesale gọi lại sảng khoái: "Alo anh ơi em thấy anh đang quan tâm đầu tư... Bên em đang có sóng tốt ở khu công nghiệp..."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Cú Bắc Cầu:</strong> "Anh thích lọt khe nội đô vì thanh khoản đúng không? Nhưng giờ giá kịch trần rồi, tệp khách HN của em đang rút vốn phân bổ về đất Tỉnh biên độ cao hơn nhiều. Anh xem cơ cấu dòng tiền nhịp này không em rẽ sóng?"</p>
                </div>
            </div>

            <!-- Chiến thuật 3 -->
            <div class="card vip">
                <div class="badge">Nét Nhất - Chốt Cao</div>
                <h3>3. Bài ngửa "Marketing Đăng Nhầm"</h3>
                
                <div class="content-group">
                    <strong>Cách làm</strong>
                    <p>Cố tình ghép ảnh nội đô rất mượt vào bài Tỉnh. Lấy được số của khách xong ngửa bài luôn.</p>
                </div>
                <div class="content-group">
                    <strong>Xử lý</strong>
                    <p>"Em xin lỗi anh, bé thực tập bên em úp lộn bộ ảnh. Nhưng cái nội dung bài tiềm năng x2 là có thật. Em mời anh ly cafe để em tư vấn phân tích rành rọt khu này."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Đền Bù Tội Lỗi:</strong> Biến lỗi lầm thành "đặc quyền". "Phạt em cafe nhé, để đền bù em add anh vào Group kín/gửi list nội bộ hàng ngộp chưa tung cho truyền thông, anh lướt xem nhặt được căn nào không."</p>
                </div>
            </div>

            <!-- Chiến thuật 6 -->
            <div class="card vip">
                <div class="badge">Nét Nhất - Chốt Cao</div>
                <h3>6. Nhập vai "Chuyên Gia Cảnh Báo"</h3>
                
                <div class="content-group">
                    <strong>Cách làm</strong>
                    <p>Nhận CÓ lô đất giá rẻ đó thật. Nhưng khi khách hỏi sâu thì hạ giọng.</p>
                </div>
                <div class="content-group">
                    <strong>Xử lý</strong>
                    <p>"Lô đó rẻ thật anh ạ, nhưng em nói chân tình: nó dính nhẹ quy hoạch cây xanh / đất vi bằng. Em khuyên anh né ra. Tầm tiền anh ráng nhỉnh xíu, lấy sang mã này của em sổ cất két ngủ cho ngon."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Tạo Vị Thế:</strong> Sẵn sàng chê nguồn hàng phễu để tôn vinh sự thật thà của bản thân. Khách thà tin một người dám chê lô rẻ, còn hơn tin đứa khen lô đó lên mây.</p>
                </div>
            </div>

            <!-- Chiến thuật 5 -->
            <div class="card safe">
                <div class="badge">An Toàn - Thực Tế</div>
                <h3>5. Mưu Mượn hàng đẹp làm "Chim Mồi Hạ Tầng"</h3>
                
                <div class="content-group">
                    <strong>Cách làm</strong>
                    <p>Đăng khu hạ tầng cực đẹp, sát dự án công ty đang đánh. Báo đúng giá thị trường bình thường.</p>
                </div>
                <div class="content-group">
                    <strong>Xử lý</strong>
                    <p>Dắt khách đi thực địa khu đó thật, cố tình đưa vào các mảnh dính lỗi: Đường đâm, gần mộ, thóp hậu... Khách chê -> Rẽ vô lăng: "Tiện đây qua xem dự án tụi em, sạch tưng không tì vết."</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Mỏ Neo Kép:</strong> Đưa xem lô LỖI NHẤT để tạo đáy giá. Xong đưa lô ĐẸP NHẤT giá trên trời. Cuối cùng mới chốt lô CÔNG TY (Đẹp ngang lô 2 mà giá nhỉnh hơn lô 1). Khách thấy hời, chốt!</p>
                </div>
            </div>

            <!-- Chiến thuật 7 -->
            <div class="card safe">
                <div class="badge">An Toàn - Thực Tế</div>
                <h3>7. Mồi Nhử "Bảng Hàng Quá Khứ" (Tuyệt chiêu Khiêm)</h3>
                
                <div class="content-group">
                    <strong>Cách làm</strong>
                    <p>Đăng khu cực đẹp, giá siêu tốt. Khách hỏi -> Check lại và gửi Bảng hàng cũ (đã gạch đỏ bán 99%).</p>
                </div>
                <div class="content-group">
                    <strong>Xử lý</strong>
                    <p>Chỉ còn sót lại 1, 2 lô xấu quắc (trời sinh). Mời khách đi xem con cuối cùng này. Đến nơi khách lắc đầu -> Tiện tay dẫn luôn sang dự án cùng tệp tài chính của hệ thống công ty.</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Hiệu ứng Fomo:</strong> Cho khách thấy "hàng rẻ đẹp bay trong nốt nhạc". Kích thích sự nuối tiếc để khi đưa sang hàng thật của công ty, họ sẽ ra quyết định nhanh hơn.</p>
                </div>
            </div>

            <!-- Chiến thuật 2 -->
            <div class="card warn">
                <div class="badge">Hên Xui - Phụ Thuộc Năng Lực</div>
                <h3>2. Lô vừa nhận cọc & Lái bẻ ngoặt</h3>
                
                <div class="content-group">
                    <strong>Cách làm</strong>
                    <p>Khách hỏi, báo ngay: "Lô đó vừa nhận cọc rồi anh ạ. Nhưng em đang còn 3 mã y hệt chưa up..."</p>
                </div>
                <div class="content-group">
                    <strong>Xử lý</strong>
                    <p>"Anh quăng số Zalo em ném sổ qua luôn, FB bóp tương tác load không nổi file." Xin được Zalo là thắng bước 1.</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Giao Lộ Định Mệnh:</strong> Lấy Zalo xong mà tiếp tục gửi ẢO thì khách block tỷ lệ cao (Trở thành chiến thuật số 4). Lấy xong gửi THẬT và gọi điện bẻ tư duy thì mới có tỉ lệ sống sót.</p>
                </div>
            </div>

            <!-- Chiến thuật 4 -->
            <div class="card danger">
                <div class="badge">Kém Nhất - Cảnh Báo</div>
                <h3>4. Nhận Có Thật Trăm Phần Trăm Trọn Gói</h3>
                
                <div class="content-group">
                    <strong>Cách làm</strong>
                    <p>Trả lời CÓ CÓ CÓ hết. Đất có, rẻ có, đẹp có. Cốt lõi lôi cổ khách lên xe đi thực địa cho bằng được.</p>
                </div>
                <div class="content-group">
                    <strong>Xử lý</strong>
                    <p>Tới nơi thì bẻ lái nói chủ quay xe, báo giá thách lên trên trời, hoặc dắt thẳng tới một cục mồi khác biệt hoàn toàn.</p>
                </div>
                <div class="upgrade-box">
                    <p><strong>Tránh Xa Tuyệt Đối:</strong> Mất tư cách, ăn chửi tại trận. Chỉ có thể dựa dẫm vào đám đông Sóng của công ty buff vào để ép khách ngộp, chốt vội. Quản lý/Sếp siêu ghét support thể loại lead lừa đảo này.</p>
                </div>
            </div>

        </div>
    `

};
