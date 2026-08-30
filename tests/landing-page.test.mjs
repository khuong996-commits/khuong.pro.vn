import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Landing page minimalist structure verification', () => {
    const html = fs.readFileSync('/Users/khuongtrinh/Downloads/antigravity/khuong.pro.vn/index.html', 'utf8');
    
    // 1. Phải có đúng 4 danh mục cốt lõi
    assert.match(html, /Về tôi/i, 'Phải có mục 1: Về tôi');
    assert.match(html, /Tham gia với chúng tôi/i, 'Phải có mục 2: Tham gia với chúng tôi');
    assert.match(html, /Đào tạo nội bộ/i, 'Phải có mục 3: Đào tạo nội bộ');
    assert.match(html, /CRM/i, 'Phải có mục 4: CRM');
    
    // 2. Không liệt kê chi tiết thị trường
    assert.doesNotMatch(html, /Ninh Cơ/i, 'Không liệt kê Ninh Cơ');
    assert.doesNotMatch(html, /Quất Lâm/i, 'Không liệt kê Quất Lâm');
    
    // 3. Phải có các liên kết tương ứng
    assert.match(html, /\/tuyendung/, 'Phải có link vào Tuyển dụng (Tham gia)');
    assert.match(html, /\/training-hub/, 'Phải có link vào Đào tạo nội bộ');
    assert.match(html, /\/crm/, 'Phải có link vào CRM');
    
    // 4. Phải có ảnh avatar
    assert.match(html, /avatar\.jpg/, 'Phải có ảnh avatar.jpg');

    // 5. Phải dùng phông nền luxury navy-gold do anh cung cấp
    const css = fs.readFileSync('/Users/khuongtrinh/Downloads/antigravity/khuong.pro.vn/styles.css', 'utf8');
    assert.match(css, /luxury-background\.jpg/, 'Phải dùng ảnh phông nền luxury navy-gold');
    assert.match(css, /background-blend-mode:/, 'Phải hòa trộn nền để chữ dễ đọc');
});
