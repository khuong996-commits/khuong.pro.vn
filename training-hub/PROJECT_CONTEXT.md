# Bối Cảnh Dự Án: Training Hub - Thực Chiến BĐS

**MỤC ĐÍCH CỦA FILE NÀY:** Bất cứ khi nào Agent AI bắt đầu một cuộc hội thoại mới liên quan đến dự án này, hãy đọc kỹ file này để lấy lại toàn bộ ngữ cảnh, kiến trúc, và quy trình làm việc mà KHÔNG CẦN người dùng phải giải thích lại.

## 1. Tổng Quan Dự Án
- **Tên dự án:** Training Hub - Hệ Thống Đào Tạo Đăng Tin Nội Bộ (dành cho nhân sự BĐS của sếp Khương).
- **Mục tiêu:** Lưu trữ tài liệu, quy chế, lộ trình thăng tiến, kịch bản chốt sale và chiến lược marketing cho nhân sự mới và cũ.
- **Văn phong (Brand Voice):** Tiếng Việt, ngôn ngữ cực kỳ THỰC CHIẾN, thẳng thắn, không màu mè sáo rỗng. Dùng từ ngữ đúng chất dân sale BĐS (chốt lô, cắt máu, hoa hồng, đồng cấp...).

## 2. Kiến Trúc Kỹ Thuật (Tech Stack)
Dự án sử dụng công nghệ Web tĩnh thuần túy (không dùng framework như React, Vue) để đảm bảo siêu nhẹ và dễ chỉnh sửa:
- `index.html`: Chứa cấu trúc bộ khung chính, Sidebar menu (điều hướng) và Topbar.
- `styles.css`: Chứa toàn bộ Design System. Sử dụng phong cách **Premium Glassmorphism**, bóng mờ, đổ bóng (shadow), giao diện sáng (Light Theme) hiện đại, sang trọng.
- `content.js`: Nơi chứa toàn bộ **NỘI DUNG** của các trang (pages). Mỗi trang là một chuỗi HTML được định nghĩa trong object `APP_CONTENT`.
- `script.js`: File logic Javascript xử lý sự kiện click ở Sidebar và render nội dung tương ứng từ `content.js` vào div có `id="app-content"` trong `index.html`.

## 3. Quy Trình Thêm/Sửa Nội Dung
Nếu yêu cầu của người dùng là "thêm trang mới" hoặc "chỉnh sửa nội dung":
1. **Sửa cấu trúc nội dung:** Mở file `content.js`, tìm key của trang (ví dụ: `page-tb-quy-che`, `page-bai-dang-dau-tien`) và chỉnh sửa trực tiếp mã HTML bên trong.
2. **Thêm Menu mới:** Nếu cần thêm mục ở Sidebar, mở `index.html`, copy một thẻ `<div class="nav-item" data-target="...">` và thêm vào vị trí thích hợp.
3. **Cập nhật CSS:** Nếu cần tinh chỉnh giao diện, hãy mở `styles.css`. Lưu ý KHÔNG phá vỡ Design System hiện tại (các biến `--bg-primary`, `--accent-blue`, `--radius-md`...).

## 4. Quy Trình Triển Khai (Deploy)
Dự án đang được host trực tiếp trên Vercel với tên project: `team-khuongtrinh`.
Mỗi khi hoàn thành việc chỉnh sửa code, **BẮT BUỘC** phải deploy để người dùng có thể xem live:
- Chạy lệnh terminal: `vercel --prod --yes`
- Thư mục chạy lệnh: `/Users/khuongtrinh/Downloads/antigravity/CONG_VIEC/Nhan_su/TRAINING_HUB`
- Đợi đến khi có link Production thì gửi link `https://team-khuongtrinh.vercel.app` cho người dùng kiểm tra.

## 5. Nguyên Tắc Thiết Kế (UI/UX)
- Chú ý đến ĐỘ TƯƠNG PHẢN MÀU SẮC (nền sáng thì chữ tối/chữ có nền màu nổi thì phải để chữ trắng).
- Không dùng nền tối xỉn (Dark mode nửa vời). Toàn bộ form và popup phải bám theo style "Glassmorphism" (kính mờ, có viền border-glass tinh tế).
- Mọi hiệu ứng hover, transition phải mượt mà. Đảm bảo giao diện nhìn "WOW" và đẳng cấp.
