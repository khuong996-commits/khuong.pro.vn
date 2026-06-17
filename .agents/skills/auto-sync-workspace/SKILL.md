---
name: auto-sync-workspace
description: >-
  Tự động chạy git pull trước khi bắt đầu chỉnh sửa code và tự động commit/push lên GitHub để Vercel deploy sau khi hoàn thành công việc.
---

# Tự Động Đồng Bộ Dự Án (Auto-Sync Workspace)

## Overview
Skill này đảm bảo dự án `khuong.pro.vn` luôn được đồng bộ hóa giữa các lập trình viên/trợ lý AI khác nhau và tự động deploy lên Vercel thông qua GitHub. 

Bất cứ khi nào nhận lệnh chỉnh sửa bất kỳ tệp tin nào trong workspace này, Agent phải tuân thủ nghiêm ngặt quy trình dưới đây.

## Quick Start
Khi được yêu cầu sửa đổi code, Agent bắt buộc phải:
1. Chạy `git pull origin main` để cập nhật code mới nhất.
2. Tiến hành sửa đổi code theo yêu cầu của người dùng.
3. Chạy lệnh commit và push lên GitHub.

## Workflow

### Bước 1: Đồng bộ trước khi sửa (BẮT BUỘC)
Trước khi thực hiện bất kỳ thay đổi nào lên mã nguồn, hãy chạy lệnh sau:
```bash
git pull origin main
```
*   **Xử lý lỗi:** Nếu lệnh `git pull` thất bại do có xung đột code (conflict) cục bộ, Agent **BẮT BUỘC** phải dừng lại ngay lập tức, báo cáo chi tiết các file bị xung đột và hỏi ý kiến người dùng xem cần giữ lại phiên bản nào. Tuyệt đối không tự ý giải quyết xung đột khi chưa được phép.

### Bước 2: Thực hiện sửa code
Tiến hành chỉnh sửa, cập nhật code theo đúng yêu cầu của người dùng.

### Bước 3: Đẩy code lên để tự động deploy (BẮT BUỘC)
Sau khi hoàn thành chỉnh sửa và kiểm tra code chạy ổn định, hãy chạy lần lượt các lệnh sau để đẩy thay đổi lên GitHub:
```bash
git add -A
git commit -m "Auto sync: [Tóm tắt ngắn gọn phần code đã sửa]"
git push origin main
```
*   **Xử lý lỗi:** Nếu lệnh `git push` thất bại (ví dụ: do quyền truy cập hoặc conflict mới phát sinh), hãy thông báo chi tiết lỗi cho người dùng để được hướng dẫn xử lý.

## Common Mistakes
1. **Quên pull trước khi sửa:** Dẫn đến xung đột code không đáng có.
2. **Quên push sau khi sửa xong:** Khiến người khác không nhận được code mới và Vercel không deploy bản mới nhất.
3. **Tự ý merge conflict:** Tự ý gộp code khi có xung đột mà không hỏi ý kiến người dùng, dễ gây mất code của người khác.
