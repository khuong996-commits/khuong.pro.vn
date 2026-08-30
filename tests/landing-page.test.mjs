import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('Landing page minimalist structure verification', () => {
    const html = fs.readFileSync('/Users/khuongtrinh/Downloads/antigravity/khuong.pro.vn/index.html', 'utf8');
    
    // 1. Phải có 4 danh mục cốt lõi
    assert.match(html, /Về tôi/i, 'Phải có mục 1: Về tôi');
    assert.match(html, /Tham gia với chúng tôi/i, 'Phải có mục 2: Tham gia với chúng tôi');
    assert.match(html, /Đào tạo nội bộ/i, 'Phải có mục 3: Đào tạo nội bộ');
    assert.match(html, /CRM/i, 'Phải có mục 4: CRM');
    
    // 2. Phải có các liên kết tương ứng
    assert.match(html, /\/tuyendung/, 'Phải có link vào Tuyển dụng (Tham gia)');
    assert.match(html, /\/training-hub/, 'Phải có link vào Đào tạo nội bộ');
    assert.match(html, /\/crm/, 'Phải có link vào CRM');
    
    // 3. Phải có ảnh chân dung thực tế
    assert.match(html, /avatar\.jpg/, 'Phải có ảnh avatar.jpg');
});
