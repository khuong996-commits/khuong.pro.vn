# 📓 Nhật Ký Làm Việc (Work Diary)

Tài liệu này lưu trữ nhật ký tất cả các buổi làm việc, các thay đổi, quyết định và kết quả đạt được trong quá trình phát triển dự án.

---

## 📅 Nhật ký các phiên làm việc

### 📌 Phiên ngày 18/06/2026 - 14:55
- **Mục tiêu:** Áp dụng ghi chép nhật ký làm việc cho tất cả các dự án trong workspace.
- **Nội dung thực hiện:**
  - Khởi tạo file nhật ký chung `nhat_ky.md` tại thư mục gốc của workspace.
  - Tạo thêm file nhật ký riêng `nhat_ky.md` cho dự án `khuong.pro.vn` để đồng bộ với nhật ký `nhat_ky_phong_ban.md` sẵn có của `TRAINING_HUB`.
  - Thiết lập quy trình: Từ nay về sau, mỗi khi thực hiện bất kỳ phiên làm việc nào trên bất kỳ dự án nào, tôi đều sẽ cập nhật chi tiết tiến trình vào file nhật ký tương ứng.
- **Kết quả:** Đã áp dụng quy trình ghi nhật ký cho tất cả các thư mục dự án con trong workspace.

### 📌 Phiên ngày 18/06/2026 - 15:02
- **Mục tiêu:** Tích hợp Lộ trình đào tạo 7 bước thực chiến mới từ file `quy_trinh_dao_tao.docx` vào giao diện của `khuong.pro.vn`.
- **Nội dung thực hiện:**
  - Đọc và phân tích file tài liệu `quy_trinh_dao_tao.docx` trong thư mục `Quy Trình Bán Hàng`.
  - Nâng cấp giao diện trang chủ `khuong.pro.vn/index.html` thành cấu trúc 2 Tab (Cổng liên kết & Lộ trình đào tạo).
  - Thiết kế và tích hợp Lộ trình đào tạo 7 bước chi tiết (Zalo links, các bài học quy định, sản phẩm, đăng tin, cẩm nang chăm sóc và chốt cọc).
  - Tích hợp bộ tính hoa hồng nhanh (máy tính chia 65-25-10 & 5% tư vấn bản đồ) giúp nhân viên tính toán nhanh thu nhập thực nhận.
  - Cập nhật style CSS mượt mà cho các phần tử tab, timeline, form tính toán và sơ đồ thăng tiến tại `styles.css`.
- **Kết quả:** Hoàn thành thiết kế lại giao diện portfolio/portal cao cấp, tích hợp đầy đủ lộ trình và công cụ chia hoa hồng thực tế.

### 📌 Phiên ngày 18/06/2026 - 15:20
- **Mục tiêu:** Tái cấu trúc lộ trình đào tạo, đồng bộ hóa Menu Sidebar & trang Profile cá nhân của nhân sự trong cả 2 bản Client Training Hub.
- **Nội dung thực hiện:**
  - Tái cấu trúc Menu Sidebar của `TRAINING_HUB/index.html` và `khuong.pro.vn/training-hub/index.html` theo 7 Bước đào tạo mới.
  - Cập nhật mảng `TRAINING_ROADMAP` trong `auth.js` của cả hai phiên bản để ánh xạ chính xác 7 Bước thực chiến, chia nhỏ thành các bài viết tương ứng trên trang Profile.
  - Thay đổi logic điều hướng sau khi Đăng nhập thành công và Routing Fallback trong `script.js` sang trang Hồ Sơ (`page-profile`) thay vì Lời nói đầu như trước.
  - Sửa đổi nhãn tab Profile thành "Lộ trình 7 Bước" và hiển thị bước "Bước ${week.week}" thay vì "Tuần ${week.week}".
- **Kết quả:** Đồng bộ hóa trải nghiệm đào tạo, nhân sự đăng nhập sẽ tự động mở Hồ Sơ cá nhân để theo dõi tiến độ đào tạo 7 Bước thực chiến và đánh dấu đã hoàn thành.

### 📌 Phiên ngày 18/06/2026 - 15:55
- **Mục tiêu:** Thiết kế lại toàn bộ giao diện trang Profile nhân sự theo phong cách Premium Dashboard.
- **Nội dung thực hiện:**
  - Thiết kế mockup UI bố cục mới với: Hero Banner gradient tối + Progress Ring %, Horizontal 7-Step Stepper, và bố cục 2 cột (Lộ trình bên trái + Thông tin & Thống kê bên phải).
  - Viết lại toàn bộ CSS section "PROFILE PAGE" trong `styles.css` với glassmorphism, micro-animations (stepper pulse), expandable roadmap cards, và responsive 768px/900px.
  - Viết lại hoàn toàn hàm `renderProfilePage()` trong `auth.js`: loại bỏ hệ thống Tab cũ, thay bằng layout dashboard tất-cả-trong-một với SVG progress ring, horizontal stepper, roadmap accordion, sidebar stats & form.
  - Thêm hàm `toggleRoadmapStep()` để toggle expand/collapse các bước đào tạo.
  - Đồng bộ toàn bộ 4 file (auth.js, styles.css, index.html, script.js) từ `TRAINING_HUB` sang `khuong.pro.vn/training-hub`.
- **Kết quả:** Hoàn thành giao diện Profile premium mới — nhân sự đăng nhập sẽ thấy ngay tổng quan tiến độ, lộ trình đào tạo trực quan, và thông tin cá nhân gọn gàng trong 1 trang duy nhất.

### 📌 Phiên ngày 18/06/2026 - 16:02
- **Mục tiêu:** Khắc phục lỗi trang trắng khi vào trang Profile và lỗi trình duyệt cache file tĩnh khiến người dùng xem demo không thấy thay đổi.
- **Nội dung thực hiện:**
  - Khắc phục lỗi kiểm tra route trong `script.js` (hàm `navigate` chặn các trang không có trong `APP_CONTENT` tĩnh của `content.js` khiến trang `page-profile` động không thể render và bị trắng màn hình).
  - Cập nhật file `index.html` trong cả 2 thư mục `TRAINING_HUB` và `khuong.pro.vn/training-hub`.
  - Thêm/Cập nhật tham số phiên bản `?v=20260618-3` vào đường dẫn các file tĩnh (`styles.css`, `auth.js`, `content.js`, `script.js`) để bắt buộc trình duyệt tải lại các file mới đã sửa.
- **Kết quả:** Đã sửa triệt để lỗi trắng trang Profile và lỗi cache của trình duyệt, giao diện Profile dashboard mới hiển thị chuẩn xác.

### 📌 Phiên ngày 18/06/2026 - 16:21
- **Mục tiêu:** Ghim giao diện Profile Dashboard thành một mục "Trang Chủ (Tiến Độ)" cố định ở đầu Sidebar điều hướng.
- **Nội dung thực hiện:**
  - Cập nhật `index.html` trong cả 2 thư mục `TRAINING_HUB` và `khuong.pro.vn/training-hub`.
  - Thêm phần tử menu `.nav-item` mới có ID `page-profile` (Trang Chủ (Tiến Độ)) với icon ngôi nhà ngay trên đầu danh sách sidebar, phân tách bằng đường line mảnh tinh tế.
  - Cập nhật mã phiên bản cache-busting thành `?v=20260618-4` để buộc tải lại giao diện mới nhất.
- **Kết quả:** Đã ghim thành công mục Trang Chủ lên sidebar, nhân sự có thể click vào bất kỳ lúc nào để theo dõi tiến trình và thông tin tổng quan của mình.

### 📌 Phiên ngày 18/06/2026 - 16:25
- **Mục tiêu:** Thêm nút/card đánh dấu đã hoàn thành bài học động dưới mỗi bài viết trong lộ trình đào tạo, cập nhật trực tiếp tiến độ thực tế lên Firebase và giao diện profile.
- **Nội dung thực hiện:**
  - Viết style CSS cho `.lesson-completion-card` và `.btn-toggle-lesson-complete` (có micro-animations khi hoàn thành, đổi màu nền nhẹ nhàng, nút bấm chuyển màu và hỗ trợ Dark Mode) vào cuối `styles.css`.
  - Tạo hàm `renderLessonCompletionCard` và `toggleModuleCompleteFromLesson` trong `auth.js` để kiểm tra tiến trình hiện tại và hiển thị nút Trạng thái hoàn thành tương ứng (Đã hoàn thành / Đánh dấu hoàn thành).
  - Cập nhật hàm `navigate` trong `script.js` để tự động kiểm tra xem trang hiện tại có thuộc lộ trình đào tạo không. Nếu có, tự động render container và card hoàn thành ở cuối nội dung bài học.
  - Sửa hàm `toggleModuleComplete` để nếu đang ở trang Profile thì tự động reload/re-render lại Profile dashboard để đồng bộ ngay lập tức các chỉ số tiến trình.
  - Cập nhật phiên bản cache-busting lên `?v=20260618-5` trong cả 2 thư mục `TRAINING_HUB` và `khuong.pro.vn/training-hub`.
- **Kết quả:** Nhân sự khi học xong bất kỳ bài học nào, kéo xuống cuối trang có thể click "Đánh Dấu Hoàn Thành". Hệ thống lập tức cập nhật lên Firebase và cập nhật tiến trình hiển thị trên trang chủ của họ.

### 📌 Phiên ngày 18/06/2026 - 16:33
- **Mục tiêu:** Thiết kế lại hệ thống Tab chọn kênh tại trang "Chọn Kênh Tìm Khách" thành giao diện Premium Glassmorphism, tô màu icon và hiệu ứng hover sắc nét.
- **Nội dung thực hiện:**
  - Viết lại styles cho `.profile-tabs` và `.profile-tab` trong `styles.css` (bổ sung hiệu ứng hover nâng nhẹ thẻ, hiệu ứng scale icon 1.18x và viền mờ kính).
  - Phân loại màu sắc chủ đạo cho các tab hoạt động (Active):
    - *Kênh người thân quen:* Tone xanh biển Sky Blue (`#38bdf8` / `#1d4ed8`) nhẹ nhàng, tin cậy.
    - *Kênh mất phí:* Tone đỏ hồng Rose Red (`#f43f5e` / `#be123c`) cảnh báo chi phí, chuyên nghiệp.
    - *Kênh miễn phí:* Tone xanh lục Emerald Green (`#10b981` / `#047857`) organic, màu mỡ.
  - Cập nhật phiên bản cache-busting lên `?v=20260618-6` trong cả 2 thư mục `TRAINING_HUB` và `khuong.pro.vn/training-hub`.
- **Kết quả:** Các nút Tab chọn kênh hiển thị rực rỡ, màu sắc đặc trưng rõ nét, loại bỏ hoàn toàn viền xám đen mặc định của trình duyệt.





### 📌 Phiên ngày 18/06/2026 - 16:42
- **Mục tiêu:** Sửa lỗi các mục điều hướng "Lộ Trình Dẫn Khách", "Chân Dung Nhân Sự" và "Bảng Hàng Tổng Hợp" không bấm vào được.
- **Nội dung thực hiện:**
  - Khôi phục và định nghĩa lại 3 route bị thiếu trong `APP_CONTENT` ở `content.js` của cả 2 thư mục `TRAINING_HUB` và `khuong.pro.vn/training-hub`:
    - `page-chan-dung-nhan-su`: Nạp tài liệu `CHAN_DUNG_NHAN_SU_TLLAND_ULTIMATE.html` qua iframe.
    - `page-bang-hang`: Nạp tài liệu `BANG_HANG_TL_LAND.html` qua iframe.
    - `page-lo-trinh-dan-khach`: Hiển thị giao diện cẩm nang 3 bước dẫn khách thực chiến chi tiết.
  - Sửa đổi đường dẫn nguồn iframe thành địa chỉ tuyệt đối từ root (thêm tiền tố `/training-hub/`) để tránh lỗi phân giải tương đối khi chuyển trang.
  - Cập nhật phiên bản cache-busting lên `?v=20260618-7` ở `index.html` của cả 2 thư mục để buộc trình duyệt tải lại file script mới.
- **Kết quả:** Người dùng có thể click thành công vào tất cả các mục trên thanh Sidebar, các iframe và tài liệu tương ứng hiển thị đầy đủ và chính xác.

### 📌 Phiên ngày 18/06/2026 - 16:50
- **Mục tiêu:** Khắc phục triệt để lỗi bấm hoàn thành bài học không lưu và không cập nhật lên khi F5 hoặc chuyển trang.
- **Nội dung thực hiện:**
  - Khắc phục lỗi chạy đua dữ liệu (Race Condition) bằng cách tái cấu trúc `renderProfilePage` sang mô hình **SWR (Stale-While-Revalidate)**: hiển thị UI lập tức bằng dữ liệu bộ nhớ/cục bộ và đồng bộ ngầm với Firestore để tránh ghi đè dữ liệu cũ.
  - Giải quyết lỗi bất đồng bộ khi khởi động (Async Auth Init): lưu trang hiện tại vào `window.currentPageId` và tự động re-render các thẻ hoàn thành (`renderLessonCompletionCard`) hoặc trang Hồ Sơ sau khi trạng thái xác thực Firebase (`onAuthStateChanged`) được thiết lập.
  - Cập nhật phiên bản cache-busting lên `?v=20260618-8` trong file `index.html` của cả 2 thư mục.
- **Kết quả:** Tiến độ hoàn thành bài học cập nhật tức thì 100%, đồng bộ ổn định và không bị mất sau khi tải lại trang.

### 📌 Phiên ngày 18/06/2026 - 17:06
- **Mục tiêu:** Sửa lỗi mất ô tích/thẻ hoàn thành ở cuối bài học khi sử dụng chức năng DOM Cache mới tải từ origin.
- **Nội dung thực hiện:**
  - Di chuyển logic chèn thẻ hoàn thành (`renderLessonCompletionCard`) ra ngoài khối lệnh điều kiện kiểm tra cache (`if (cached)`) trong `script.js`.
  - Đảm bảo thẻ hoàn thành luôn được chèn động vào cuối trang bất kể trang được tải lần đầu hay tải từ bộ nhớ đệm (clone từ DOM Cache).
  - Đồng bộ lại toàn bộ file sửa sang thư mục `TRAINING_HUB/` để đồng nhất với `khuong.pro.vn/training-hub/`.
- **Kết quả:** Ô tích hoàn thành hiển thị chính xác và ổn định ở cuối tất cả các bài học.

### 📌 Phiên ngày 20/06/2026 - 15:55
- **Mục tiêu:** Khôi phục cấu trúc Sidebar cũ (không chia theo Bước 1-7) và cập nhật nhãn tiến độ góc trên bên phải banner trang Hồ Sơ.
- **Nội dung thực hiện:**
  - Cập nhật file `index.html` trong cả 2 thư mục `TRAINING_HUB` và `khuong.pro.vn/training-hub/` để khôi phục cấu trúc Sidebar cũ gồm 4 nhóm lớn: *Quy Trình Tân Binh*, *Danh Mục Bảng Hàng*, *Danh Mục Đào Tạo*, và *DÀNH CHO SẾP*.
  - Sắp xếp bài học mới **"Tuyệt Chiêu Lái Khách"** (`page-tuyet-ky-lai-khach`) vào nhóm *Danh Mục Đào Tạo* trên Sidebar.
  - Giữ mục **Trang Chủ (Tiến Độ)** trên đầu Sidebar và dải phân cách.
  - Cập nhật hàm `renderProfileUI` trong `auth.js` để đổi nhãn tiến độ ở góc banner từ `Bước X/7 — [Tên bước]` thành `Đã học: \${completedCount}/\${totalMods} bài học`.
  - Thay đổi phiên bản cache-busting trong `index.html` lên `?v=20260620-1`.
- **Kết quả:** Sidebar phục hồi gọn gàng đúng thiết kế cũ của sếp, trang Hồ Sơ cập nhật nhãn tiến độ mới rõ ràng và chính xác.

