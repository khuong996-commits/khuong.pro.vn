import sys

file_path = '/Users/khuongtrinh/Downloads/antigravity/CONG_VIEC/Nhan_su/TRAINING_HUB/BANG_HANG_TL_LAND.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

new_css = """
:root {
    --bg: #f8fafc;
    --bg-card: #ffffff;
    --bg-card-hover: #f1f5f9;
    --border: #e2e8f0;
    --border-hover: #cbd5e1;
    --text: #0f172a;
    --text-secondary: #334155;
    --text-muted: #64748b;
    --accent-blue: #0284c7;
    --accent-purple: #7c3aed;
    --accent-emerald: #059669;
    --accent-amber: #d97706;
    --accent-red: #dc2626;
    --accent-pink: #db2777;
    --accent-cyan: #0891b2;
    --gradient-main: linear-gradient(135deg, #0284c7, #7c3aed);
    --gradient-ninh-co: linear-gradient(135deg, #0284c7, #0891b2);
    --gradient-quat-lam: linear-gradient(135deg, #7c3aed, #db2777);
    --gradient-hoa-lac: linear-gradient(135deg, #ea580c, #dc2626);
    --radius: 16px;
    --radius-sm: 10px;
    --radius-xs: 6px;
}

* { margin:0; padding:0; box-sizing:border-box; }

body {
    font-family: 'Inter', -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    min-height: 100vh;
    background-image:
        radial-gradient(ellipse 800px 600px at 10% 20%, rgba(2,132,199,0.04), transparent 60%),
        radial-gradient(ellipse 600px 500px at 90% 80%, rgba(124,58,237,0.04), transparent 60%),
        radial-gradient(ellipse 400px 300px at 50% 50%, rgba(5,150,105,0.03), transparent 60%);
    background-attachment: fixed;
}

/* === HEADER === */
.page-header {
    text-align: center;
    padding: 60px 20px 20px;
    position: relative;
}

.page-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 3px;
    background: var(--gradient-main);
    border-radius: 3px;
}

.company-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    background: rgba(2,132,199,0.08);
    border: 1px solid rgba(2,132,199,0.15);
    border-radius: 50px;
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--accent-blue);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.page-header h1 {
    font-family: 'Outfit', sans-serif;
    font-size: clamp(1.8rem, 5vw, 3rem);
    font-weight: 900;
    background: var(--gradient-main);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
    margin-bottom: 8px;
}

.page-header p {
    color: var(--text-secondary);
    font-size: 0.95rem;
    max-width: 600px;
    margin: 0 auto;
}

/* === STATS ROW === */
.stats-row {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    padding: 30px 20px 10px;
    max-width: 900px;
    margin: 0 auto;
}

.stat-chip {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 18px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 50px;
    font-size: 0.85rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.02);
    transition: all 0.3s;
}

.stat-chip:hover {
    border-color: var(--border-hover);
    background: var(--bg-card-hover);
    transform: translateY(-2px);
    box-shadow: 0 6px 10px -2px rgba(0,0,0,0.05);
}

.stat-chip .stat-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
}

.stat-chip .stat-value {
    font-weight: 800;
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem;
    color: var(--text);
    line-height: 1.1;
}

.stat-chip .stat-label {
    font-size: 0.72rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* === FILTER TABS === */
.filter-bar {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 24px 20px 10px;
    flex-wrap: wrap;
}

.filter-btn {
    padding: 8px 20px;
    border-radius: 50px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text-secondary);
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.filter-btn:hover {
    border-color: var(--border-hover);
    color: var(--text);
    background: var(--bg-card-hover);
}

.filter-btn.active {
    background: var(--gradient-main);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 12px rgba(2,132,199,0.25);
}

.filter-btn .count {
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.7rem;
    font-weight: 700;
    background: rgba(0,0,0,0.06);
}

.filter-btn.active .count {
    background: rgba(255,255,255,0.25);
}

/* === SEARCH === */
.search-wrapper {
    max-width: 500px;
    margin: 16px auto;
    padding: 0 20px;
    position: relative;
}

.search-wrapper i {
    position: absolute;
    left: 36px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
    font-size: 0.9rem;
}

.search-input {
    width: 100%;
    padding: 12px 16px 12px 44px;
    border-radius: 50px;
    border: 1px solid var(--border);
    background: var(--bg-card);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    transition: all 0.3s;
    outline: none;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}

.search-input::placeholder { color: var(--text-muted); }

.search-input:focus {
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 3px rgba(2,132,199,0.15);
}

/* === REGION SECTIONS === */
.region-section {
    max-width: 1300px;
    margin: 0 auto;
    padding: 16px 20px;
}

.region-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 32px 0 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
}

.region-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #fff;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.region-header h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.5px;
}

.region-header .region-count {
    margin-left: auto;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    background: var(--bg-card);
    color: var(--text-muted);
    border: 1px solid var(--border);
}

/* Sub-region headers */
.sub-region-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 24px 0 12px;
}

.sub-region-header::before {
    content: '';
    width: 4px;
    height: 20px;
    border-radius: 4px;
}

.sub-region-header.ninh-co::before { background: var(--gradient-ninh-co); }
.sub-region-header.quat-lam::before { background: var(--gradient-quat-lam); }
.sub-region-header.hoa-lac::before { background: var(--gradient-hoa-lac); }

.sub-region-header h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
}

/* === PRODUCT CARDS GRID === */
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    margin-bottom: 16px;
}

/* === PRODUCT CARD === */
.product-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.product-card:hover {
    transform: translateY(-4px);
    border-color: var(--border-hover);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
}

.product-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
}

.product-card.ninh-co::before { background: var(--gradient-ninh-co); }
.product-card.quat-lam::before { background: var(--gradient-quat-lam); }
.product-card.hoa-lac::before { background: var(--gradient-hoa-lac); }

.card-title {
    font-family: 'Outfit', sans-serif;
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 12px;
    color: var(--text);
    display: flex;
    align-items: flex-start;
    gap: 8px;
    line-height: 1.3;
}

.card-title .check-icon {
    color: var(--accent-emerald);
    font-size: 0.85rem;
    margin-top: 3px;
    flex-shrink: 0;
}

.card-note {
    font-size: 0.75rem;
    color: var(--accent-amber);
    font-weight: 600;
    margin-bottom: 12px;
    padding: 6px 10px;
    background: #fef3c7;
    border: 1px solid #fde68a;
    border-radius: 6px;
    display: inline-block;
    line-height: 1.4;
}

/* COMPACT GRID FOR SPECS */
.card-specs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px 8px;
}

.spec-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
}

.spec-icon {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    flex-shrink: 0;
}

.spec-icon.price { background: #d1fae5; color: var(--accent-emerald); }
.spec-icon.unit-price { background: #e0f2fe; color: var(--accent-blue); }
.spec-icon.area { background: #ede9fe; color: var(--accent-purple); }
.spec-icon.frontage { background: #fef3c7; color: var(--accent-amber); }
.spec-icon.commission { background: #fce7f3; color: var(--accent-pink); }

.spec-info {
    display: flex;
    flex-direction: column;
}

.spec-label-small {
    color: var(--text-muted);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
    margin-bottom: 2px;
}

.spec-value {
    color: var(--text);
    font-weight: 700;
    font-size: 0.85rem;
    line-height: 1.2;
}

.spec-value.highlight {
    color: var(--accent-emerald);
}

/* Commission section */
.card-commission {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid var(--border);
}

.commission-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: var(--radius-xs);
    background: #fce7f3;
    border: 1px solid #fbcfe8;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--accent-pink);
    line-height: 1.3;
}

.commission-badge i { font-size: 0.7rem; }

.commission-extra {
    margin-top: 6px;
    font-size: 0.7rem;
    color: var(--accent-amber);
    font-weight: 600;
    line-height: 1.4;
    display: flex;
    align-items: flex-start;
    gap: 4px;
}

/* Special note card */
.product-card.special {
    background: #fffbeb;
    border-color: #fde68a;
}

.product-card.special::before {
    background: linear-gradient(135deg, #d97706, #f59e0b);
}

/* === EMPTY STATE === */
.empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-muted);
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.2;
    color: var(--text-secondary);
}

.empty-state p {
    font-size: 1rem;
}

/* === LAST UPDATED === */
.update-footer {
    text-align: center;
    padding: 30px 20px 50px;
    color: var(--text-muted);
    font-size: 0.78rem;
}

.update-footer .update-time {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 50px;
    margin-top: 8px;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

/* === ANIMATIONS === */
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(15px); }
    to { opacity: 1; transform: translateY(0); }
}

.product-card {
    animation: fadeInUp 0.3s ease-out both;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
    .page-header { padding: 30px 16px 12px; }
    .page-header h1 { font-size: 1.5rem; }
    
    .products-grid { 
        grid-template-columns: 1fr; 
        gap: 10px; 
    }
    
    .product-card { 
        padding: 14px;
        border-radius: 12px;
    }
    
    .card-title {
        font-size: 0.95rem;
        margin-bottom: 10px;
    }
    
    .card-note {
        font-size: 0.7rem;
        padding: 4px 8px;
        margin-bottom: 10px;
    }
    
    .card-specs { gap: 8px; }
    
    .spec-icon { width: 24px; height: 24px; font-size: 0.65rem; }
    .spec-value { font-size: 0.8rem; }
    
    .card-commission { margin-top: 10px; padding-top: 10px; }
    .commission-badge { padding: 4px 8px; font-size: 0.7rem; }
    
    .stats-row { gap: 8px; padding-top: 20px; }
    .stat-chip { padding: 8px 12px; font-size: 0.75rem; }
    .stat-chip .stat-icon { width: 28px; height: 28px; }
    .stat-chip .stat-value { font-size: 0.95rem; }
    
    .region-header { margin: 24px 0 16px; padding-bottom: 8px; }
    .region-header h2 { font-size: 1.2rem; }
    .region-icon { width: 36px; height: 36px; font-size: 1rem; border-radius: 10px; }
    
    .filter-btn { padding: 6px 14px; font-size: 0.75rem; }
}

@media (max-width: 480px) {
    .spec-row { gap: 6px; }
    .spec-label-small { font-size: 0.6rem; }
    .spec-value { font-size: 0.75rem; }
}
"""

start_css = content.find(':root {')
end_css = content.find('</style>')
if start_css != -1 and end_css != -1:
    content = content[:start_css] + new_css.strip() + '\n    ' + content[end_css:]


old_js = """        if (product.totalPrice) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon price"><i class="fa-solid fa-tag"></i></div>
                    <span class="spec-label">Tổng giá</span>
                    <span class="spec-value highlight">${product.totalPrice}</span>
                </div>`;
        }

        if (product.unitPrice) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon unit-price"><i class="fa-solid fa-calculator"></i></div>
                    <span class="spec-label">Đơn giá</span>
                    <span class="spec-value">${product.unitPrice}</span>
                </div>`;
        }

        if (product.area) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon area"><i class="fa-solid fa-ruler-combined"></i></div>
                    <span class="spec-label">Diện tích</span>
                    <span class="spec-value">${product.area}</span>
                </div>`;
        }

        if (product.frontage) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon frontage"><i class="fa-solid fa-arrows-left-right"></i></div>
                    <span class="spec-label">Mặt tiền</span>
                    <span class="spec-value">${product.frontage}</span>
                </div>`;
        }"""

new_js = """        if (product.totalPrice) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon price"><i class="fa-solid fa-tag"></i></div>
                    <div class="spec-info">
                        <span class="spec-label-small">Tổng giá</span>
                        <span class="spec-value highlight">${product.totalPrice}</span>
                    </div>
                </div>`;
        }

        if (product.unitPrice) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon unit-price"><i class="fa-solid fa-calculator"></i></div>
                    <div class="spec-info">
                        <span class="spec-label-small">Đơn giá</span>
                        <span class="spec-value">${product.unitPrice}</span>
                    </div>
                </div>`;
        }

        if (product.area) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon area"><i class="fa-solid fa-ruler-combined"></i></div>
                    <div class="spec-info">
                        <span class="spec-label-small">Diện tích</span>
                        <span class="spec-value">${product.area}</span>
                    </div>
                </div>`;
        }

        if (product.frontage) {
            specsHtml += `
                <div class="spec-row">
                    <div class="spec-icon frontage"><i class="fa-solid fa-arrows-left-right"></i></div>
                    <div class="spec-info">
                        <span class="spec-label-small">Mặt tiền</span>
                        <span class="spec-value">${product.frontage}</span>
                    </div>
                </div>`;
        }"""

content = content.replace(old_js, new_js)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated BANG_HANG_TL_LAND.html successfully.")
