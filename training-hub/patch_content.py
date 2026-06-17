import re

with open('/Users/khuongtrinh/Downloads/antigravity/CONG_VIEC/CLONE_IDOL/KIM_ANH/team_training_facebook_strategy.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Extract inner styles and scope them:
css_block = re.search(r'<style>(.*?)</style>', html_content, re.DOTALL).group(1)

# Modify CSS block to be scoped under .fb-strategy-wrapper
css_block = css_block.replace(':root', '.fb-strategy-wrapper')
css_block = css_block.replace('body {', '.fb-strategy-wrapper {')
# Some global replacements
css_block = css_block.replace('h1, h2, h3, h4 {', '.fb-strategy-wrapper h1, .fb-strategy-wrapper h2, .fb-strategy-wrapper h3, .fb-strategy-wrapper h4 {')
css_block = css_block.replace('.container', '.fb-strategy-wrapper .container')
css_block = css_block.replace('.hero', '.fb-strategy-wrapper .hero')
css_block = css_block.replace('.hero-alert', '.fb-strategy-wrapper .hero-alert')
css_block = css_block.replace('.glass-panel', '.fb-strategy-wrapper .glass-panel')
css_block = css_block.replace('.section-header', '.fb-strategy-wrapper .section-header')
css_block = css_block.replace('.grid-3', '.fb-strategy-wrapper .grid-3')
css_block = css_block.replace('.mix-card', '.fb-strategy-wrapper .mix-card')
css_block = css_block.replace('.percent-badge', '.fb-strategy-wrapper .percent-badge')
css_block = css_block.replace('.hack-box', '.fb-strategy-wrapper .hack-box')
css_block = css_block.replace('.grid-2', '.fb-strategy-wrapper .grid-2')
css_block = css_block.replace('.idea-card', '.fb-strategy-wrapper .idea-card')
css_block = css_block.replace('.timeline-table', '.fb-strategy-wrapper .timeline-table')
css_block = css_block.replace('.badge-feed', '.fb-strategy-wrapper .badge-feed')
css_block = css_block.replace('.badge-story', '.fb-strategy-wrapper .badge-story')
css_block = css_block.replace('.roadmap', '.fb-strategy-wrapper .roadmap')
css_block = css_block.replace('.phase-card', '.fb-strategy-wrapper .phase-card')
css_block = css_block.replace('.phase-title', '.fb-strategy-wrapper .phase-title')
css_block = css_block.replace('.phase-list', '.fb-strategy-wrapper .phase-list')
css_block = css_block.replace('.highlight-text', '.fb-strategy-wrapper .highlight-text')
css_block = css_block.replace('.important-note', '.fb-strategy-wrapper .important-note')

# Extract the container HTML
container_html = re.search(r'<div class="container">(.*?)</div>\s*<script>', html_content, re.DOTALL).group(1)

# Escape backticks
css_block = css_block.replace('`', '\\`')
container_html = container_html.replace('`', '\\`')

template_string = f"""
    // ---------------------------------------------------------
    // PAGE: CHIẾN LƯỢC FACEBOOK
    // ---------------------------------------------------------
    'page-chien-luoc-fb': `
        <style>{css_block}</style>
        <div class="fb-strategy-wrapper">
            <div class="container">
                {container_html}
            </div>
        </div>
    `
"""

with open('content.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace "};" at the end with the new page appended
js_content = re.sub(r'};\s*$', f",{template_string}\n}};\n", js_content)

with open('content.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
