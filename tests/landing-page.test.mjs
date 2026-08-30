import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Landing page luxury real estate structure verification', () => {
    const html = fs.readFileSync('/Users/khuongtrinh/Downloads/antigravity/khuong.pro.vn/index.html', 'utf8');
    
    // 1. Phải có định vị BĐS và thương hiệu cá nhân Khương Trịnh
    assert.match(html, /KHƯƠNG TRỊNH/i, 'Phải có tên thương hiệu Khương Trịnh');
    assert.match(html, /BẤT ĐỘNG SẢN|CỐ VẤN/i, 'Phải nêu rõ định vị BĐS / Cố vấn');
    
    // 2. Phải có ảnh đại diện giao dịch thực tế
    assert.match(html, /avatar\.jpg/, 'Phải sử dụng ảnh đại diện avatar.jpg');
    
    // 3. Phải có các cổng liên kết hệ sinh thái chính
    assert.match(html, /\/training-hub/, 'Phải có link vào Training Hub');
    assert.match(html, /\/tuyendung/, 'Phải có link vào Tuyển dụng');
    assert.match(html, /\/crm/, 'Phải có link vào CRM');
    
    // 4. Phải có các thị trường trọng điểm
    assert.match(html, /Ninh Cơ/i, 'Phải có thị trường Ninh Cơ');
    assert.match(html, /Quất Lâm/i, 'Phải có thị trường Quất Lâm');
    assert.match(html, /Hòa Lạc/i, 'Phải có thị trường Hòa Lạc');

    // 5. Mobile phải có stylesheet riêng để không vỡ bố cục trên màn hình 360px
    const css = fs.readFileSync('/Users/khuongtrinh/Downloads/antigravity/khuong.pro.vn/styles.css', 'utf8');
    assert.match(css, /@media\s*\(max-width:\s*640px\)/, 'Phải có breakpoint mobile 640px');
    assert.match(css, /\.hero-actions\s*\{[^}]*flex-direction:\s*column/s, 'Nút hero phải xếp dọc trên mobile');
    assert.match(css, /\.topnav-links\s*\{[^}]*display:\s*none/s, 'Menu dài phải ẩn trên mobile');
    assert.match(css, /\.hero-portrait-frame\s+img\s*\{[^}]*aspect-ratio:/s, 'Ảnh hero phải có tỉ lệ cố định trên mobile');
});
