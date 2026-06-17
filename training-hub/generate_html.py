import re

def process_text(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    
    lines = text.split('\n')
    html = []
    in_list = False
    
    for line in lines:
        line = line.strip()
        if not line:
            if in_list:
                html.append('</ul>')
                in_list = False
            continue
            
        if line.startswith('* ') or line.startswith('- ') or line.startswith('+ '):
            if not in_list:
                html.append('<ul>')
                in_list = True
            html.append(f'<li>{line[2:]}</li>')
        elif re.match(r'^\d+\.', line):
            if in_list:
                html.append('</ul>')
                in_list = False
            html.append(f'<h3>{line}</h3>')
        else:
            if in_list:
                html.append('</ul>')
                in_list = False
            if line.isupper() and len(line) < 50:
                html.append(f'<h2>{line}</h2>')
            elif line.startswith('Quy Định') or line.startswith('Lời nói đầu') or line.startswith('Quy trình'):
                html.append(f'<h1 class="section-title">{line}</h1>')
            else:
                html.append(f'<p>{line}</p>')
                
    if in_list:
        html.append('</ul>')
        
    return '\n'.join(html)

def generate_page(title, subtitle, content, out_file):
    template = f"""<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {{
            --bg-color: #f8fafc;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --accent-primary: #0284c7;
            --accent-secondary: #0ea5e9;
            --card-bg: #ffffff;
            --border-color: #e2e8f0;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: 'Inter', sans-serif;
            background-color: transparent;
            color: var(--text-main);
            line-height: 1.7;
            padding: 2rem;
        }}
        .container {{
            max-width: 900px;
            margin: 0 auto;
        }}
        .hero {{
            text-align: center;
            margin-bottom: 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, rgba(2, 132, 199, 0.1), rgba(14, 165, 233, 0.05));
            border-radius: 16px;
            border: 1px solid rgba(2, 132, 199, 0.2);
        }}
        .hero h1 {{
            font-size: 2.5rem;
            color: var(--accent-primary);
            margin-bottom: 1rem;
        }}
        .hero p {{
            color: var(--text-muted);
            font-size: 1.1rem;
        }}
        .section-card {{
            background: var(--card-bg);
            border-radius: 16px;
            padding: 2.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            border: 1px solid var(--border-color);
        }}
        .section-title {{
            font-size: 1.8rem;
            color: var(--accent-primary);
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid var(--accent-secondary);
            display: inline-block;
        }}
        h2 {{
            font-size: 1.4rem;
            color: #334155;
            margin: 2rem 0 1rem 0;
        }}
        h3 {{
            font-size: 1.2rem;
            color: #475569;
            margin: 1.5rem 0 0.8rem 0;
        }}
        p {{
            margin-bottom: 1rem;
            color: #334155;
        }}
        ul {{
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
            color: #334155;
        }}
        li {{
            margin-bottom: 0.5rem;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
        <div class="section-card">
            {content}
        </div>
    </div>
</body>
</html>
"""
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(template)

doc0_html = process_text('doc_0.txt')
doc1_html = process_text('doc_1.txt')
doc2_html = process_text('doc_2.txt')

generate_page("🤝 Lời Nói Đầu & Nhập Môn", "Hành trang khởi đầu - Tinh thần chiến binh TL Land", doc0_html, "TAN_BINH_LOI_NOI_DAU.html")
generate_page("⚖️ Quy Chế & Cơ Chế", "Luật chơi sòng phẳng - Đảm bảo quyền lợi minh bạch", doc1_html, "TAN_BINH_QUY_CHE.html")
generate_page("📝 Quy Trình Bán Hàng", "Từng bước thực chiến - Chốt sales hiệu quả", doc2_html, "TAN_BINH_QUY_TRINH.html")

print("Generated 3 HTML files")
