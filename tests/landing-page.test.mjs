import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');

assert.match(html, /class="topbar"/, 'phải có topbar điều hướng');
assert.match(html, /class="hero-copy"/, 'phải có hero rõ thông điệp');
assert.match(html, /class="proof-strip"/, 'phải có dải bằng chứng năng lực');
assert.match(html, /class="portal-grid"/, 'phải có khu cổng truy cập');
assert.match(html, /href="\/training-hub"/);
assert.match(html, /href="\/crm"/);
assert.match(html, /href="\/tuyendung"/);
assert.match(html, /avatar\.jpg/);
assert.match(css, /@media\(max-width:720px\)/, 'phải tối ưu mobile');
assert.doesNotMatch(html, /corner-ornament/, 'bỏ họa tiết rườm rà cũ');
assert.doesNotMatch(html, /Antigravity AI/, 'bỏ credit kỹ thuật khỏi giao diện công khai');
console.log('Landing structure OK');
