import json
import os
import requests
import re
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor
from playwright.sync_api import sync_playwright

FETCH_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
}

def get_access_token():
    path = os.path.expanduser("~/.config/configstore/firebase-tools.json")
    with open(path, "r") as f:
        data = json.load(f)
    return data["tokens"]["access_token"]

def get_active_staff(token):
    url = "https://firestore.googleapis.com/v1/projects/team-khuongtrinh/databases/(default)/documents/whitelist"
    headers = {"Authorization": f"Bearer {token}"}
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        print("Error fetching whitelist:", r.text)
        return []
    
    docs = r.json().get("documents", [])
    active_staff = []
    for doc in docs:
        fields = doc.get("fields", {})
        email = doc["name"].split("/")[-1]
        
        show = fields.get("showInChecklist", {}).get("booleanValue", False)
        if show:
            name = fields.get("name", {}).get("stringValue", email.split("@")[0])
            fb_values = fields.get("facebook_links", {}).get("arrayValue", {}).get("values", [])
            fb_links = [v.get("stringValue") for v in fb_values if v.get("stringValue")]
            sheet_url = fields.get("customer_sheet_url", {}).get("stringValue", "")
            
            active_staff.append({
                "email": email,
                "name": name,
                "facebook_links": fb_links,
                "customer_sheet_url": sheet_url
            })
    return active_staff

def scrape_fb_page(url):
    if not url or len(url.strip()) <= 22:
        return ""
    print(f"Scraping Facebook: {url}...")
    try:
        # Launching Playwright inside each thread is fine as long as we use sync_playwright() context manager locally
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.set_viewport_size({"width": 1280, "height": 1000})
            page.goto(url, wait_until="networkidle", timeout=20000)
            page.wait_for_timeout(2000)
            # Minimal scroll for faster load
            page.evaluate("window.scrollTo(0, 1000)")
            page.wait_for_timeout(1500)
            
            body_text = page.locator("body").inner_text()
            browser.close()
            return body_text[:50000]
    except Exception as e:
        print(f"Error scraping Facebook page {url}: {e}")
        return ""

def parse_fb_posts_for_date(body_text, check_date, base_date):
    if not body_text:
        return 0
        
    lines = [line.strip() for line in body_text.split('\n') if line.strip()]
    post_count = 0
    check_day = check_date.day
    check_month = check_date.month
    
    for i, line in enumerate(lines):
        is_timestamp = False
        match_today = False
        
        # 1. Absolute date e.g. "4 tháng 7"
        abs_match = re.search(r'^(\d{1,2})\s+tháng\s+(\d{1,2})', line, re.IGNORECASE)
        if abs_match:
            d = int(abs_match.group(1))
            m = int(abs_match.group(2))
            if d == check_day and m == check_month:
                match_today = True
                is_timestamp = True
        
        # 2. Relative "vừa xong", "phút", "giờ"
        elif line.lower() == 'vừa xong' or 'hôm nay' in line.lower() or 'hnay' in line.lower():
            if check_date.date() == base_date.date():
                match_today = True
            is_timestamp = True
            
        elif 'phút' in line.lower():
            if check_date.date() == base_date.date():
                match_today = True
            is_timestamp = True
            
        elif 'giờ' in line.lower() and len(line) < 15:
            h_match = re.search(r'^(\d+)\s+giờ', line, re.IGNORECASE)
            if h_match:
                hours = int(h_match.group(1))
                post_time = base_date - timedelta(hours=hours)
                if post_time.date() == check_date.date():
                    match_today = True
                is_timestamp = True
                
        elif ('hôm qua' in line.lower() or 'hqua' in line.lower()) and len(line) < 15:
            yesterday = base_date - timedelta(days=1)
            if check_date.date() == yesterday.date():
                match_today = True
            is_timestamp = True
            
        elif 'ngày' in line.lower() and len(line) < 15:
            d_match = re.search(r'^(\d+)\s+ngày', line, re.IGNORECASE)
            if d_match:
                days = int(d_match.group(1))
                post_time = base_date - timedelta(days=days)
                if post_time.date() == check_date.date():
                    match_today = True
                is_timestamp = True
                
        if is_timestamp:
            has_dot = False
            start_check = max(0, i-2)
            end_check = min(len(lines), i+3)
            for idx in range(start_check, end_check):
                if idx != i and ('·' in lines[idx] or lines[idx] == '·'):
                    has_dot = True
                    break
            
            if has_dot and match_today:
                post_count += 1
                
    return post_count

def decode_html_entities(s):
    s = s.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
    s = s.replace('&quot;', '"').replace('&#39;', "'").replace('&#x27;', "'")
    s = re.sub(r'&#(\d+);', lambda m: chr(int(m.group(1))), s)
    s = s.replace('\\/', '/').replace('\\\\', '\\').replace('\\n', '\n').replace('\\t', '\t')
    return s

def get_sheet_tabs(spreadsheet_id):
    url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/htmlview"
    res = requests.get(url, headers=FETCH_HEADERS)
    if res.status_code != 200:
        return []
    html = res.text
    names = []
    for m in re.finditer(r'name:\s*"([^"]+)",\s*pageUrl:', html):
        names.append(decode_html_entities(m.group(1).strip()))
    if not names:
        for m in re.finditer(r'"title"\s*:\s*"([^"]{1,100})"', html):
            names.append(decode_html_entities(m.group(1).strip()))
    if not names:
        for m in re.finditer(r'<a[^>]+href="#gid=\d+"[^>]*>([^<]+)</a>', html, re.IGNORECASE):
            names.append(decode_html_entities(m.group(1).strip()))
    return list(set(names))

def read_sheet(spreadsheet_id, sheet_name):
    url = f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/gviz/tq?tqx=out:json&sheet={requests.utils.quote(sheet_name)}"
    res = requests.get(url, headers=FETCH_HEADERS)
    if res.status_code != 200:
        return []
    text = res.text
    match = re.search(r'setResponse\(({[\s\S]*\})\)\s*;?\s*$', text)
    if not match:
        return []
    try:
        data = json.loads(match.group(1))
        if data.get('status') == 'error':
            return []
        table = data.get('table', {})
        rows = table.get('rows', [])
        cols = table.get('cols', [])
        num_cols = len(cols)
        if num_cols == 0:
            return []
        
        result = []
        for r in rows:
            cells = []
            row_c = r.get('c', [])
            for i in range(num_cols):
                cell = row_c[i] if i < len(row_c) else None
                if not cell:
                    cells.append('')
                else:
                    v = cell.get('v')
                    f = cell.get('f')
                    cells.append(str(f if f is not None else (v if v is not None else '')))
            result.append(cells)
        return result
    except Exception:
        return []

def parse_date(date_str):
    if not date_str:
        return None
    date_str = date_str.strip()
    match = re.search(r'(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?', date_str)
    if match:
        day = int(match.group(1))
        month = int(match.group(2))
        year = int(match.group(3)) if match.group(3) else 2026
        if year < 100:
            year += 2000
        try:
            return datetime(year, month, day)
        except ValueError:
            return None
    return None

def is_phone(val):
    digits = re.sub(r'\D', '', val)
    return len(digits) >= 9 and len(digits) <= 11

def is_viewing_land(note):
    if not note:
        return False
    keywords = ['hẹn đi xem', 'hẹn xem', 'đi xem', 'xem đất', 'xem nhà', 'gặp', 'đi coi', 'xuống xem']
    return any(kw in str(note).lower() for kw in keywords)

def extract_sheet_id(url):
    match = re.search(r'/d/([a-zA-Z0-9-_]+)', url)
    return match.group(1) if match else None

def parse_sheet_data_for_date(spreadsheet_id, check_date):
    tabs = get_sheet_tabs(spreadsheet_id)
    new_leads = 0
    viewing_leads = 0
    
    for tab in tabs:
        tab_lower = tab.lower()
        if any(kw in tab_lower for kw in ['bỏ', 'loại', 'dead', 'hủy', 'ko qtam', 'ko quan tâm']):
            continue
            
        rows = read_sheet(spreadsheet_id, tab)
        if not rows:
            continue
            
        col_phone = -1
        col_date = -1
        col_note = -1
        
        # Detect columns
        for r_idx in range(min(5, len(rows))):
            row = [str(c).lower().strip() for c in rows[r_idx]]
            for i, val in enumerate(row):
                if any(k in val for k in ['sđt', 'số điện thoại', 'điện thoại', 'phone']):
                    col_phone = i
                if any(k in val for k in ['ngày', 'date']):
                    col_date = i
                if any(k in val for k in ['note', 'ghi chú', 'nhận xét', 'nội dung', 'tương tác', 'tình trạng']):
                    col_note = i
                    
        # Fallbacks
        if col_phone == -1:
            for i in range(len(rows[0]) if rows else 0):
                phone_hits = sum(1 for r in rows[1:15] if i < len(r) and is_phone(r[i]))
                if phone_hits >= 2:
                    col_phone = i
                    break
        if col_date == -1:
            for i in range(len(rows[0]) if rows else 0):
                date_hits = sum(1 for r in rows[1:15] if i < len(r) and parse_date(r[i]))
                if date_hits >= 2:
                    col_date = i
                    break
        if col_note == -1:
            for i in range(len(rows[0]) if rows else 0):
                for r in rows[1:10]:
                    if i < len(r) and len(str(r[i])) > 30:
                        col_note = i
                        break
            if col_note == -1:
                col_note = len(rows[0]) - 1 if rows else -1
                
        if col_phone == -1 or col_date == -1:
            continue
            
        for idx, row in enumerate(rows):
            if idx == 0:
                continue
            if len(row) <= max(col_phone, col_date):
                continue
                
            phone_val = row[col_phone].strip()
            date_val = row[col_date].strip()
            note_val = row[col_note].strip() if col_note < len(row) else ''
            
            if not phone_val or not date_val:
                continue
                
            lead_date = parse_date(date_val)
            if lead_date and lead_date.date() == check_date.date():
                new_leads += 1
                if is_viewing_land(note_val):
                    viewing_leads += 1
            elif is_viewing_land(note_val):
                note_dates = []
                for m in re.finditer(r'(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?', note_val):
                    day = int(m.group(1))
                    month = int(m.group(2))
                    year = int(m.group(3)) if m.group(3) else 2026
                    if year < 100:
                        year += 2000
                    try:
                        note_dates.append(datetime(year, month, day))
                    except ValueError:
                        pass
                if any(kw in note_val.lower() for kw in ['hôm nay', 'hnay', 'sáng nay', 'chiều nay', 'tối nay']):
                    note_dates.append(check_date)
                    
                if any(d.date() == check_date.date() for d in note_dates):
                    viewing_leads += 1
                    
    return new_leads, viewing_leads

def update_firestore_daily(token, date_str, email, data):
    doc_id = f"{date_str}_{email}"
    url = f"https://firestore.googleapis.com/v1/projects/team-khuongtrinh/databases/(default)/documents/checklist_daily/{doc_id}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    existing_fb = 0
    existing_zalo = 0
    existing_new_cust = 0
    existing_view_cust = 0
    existing_notes = ""
    
    r = requests.get(url, headers=headers)
    if r.status_code == 200:
        doc_data = r.json()
        fields = doc_data.get("fields", {})
        existing_fb = int(fields.get("fb_posts", {}).get("integerValue", 0))
        existing_zalo = int(fields.get("zalo_posts", {}).get("integerValue", 0))
        existing_new_cust = int(fields.get("new_customers", {}).get("integerValue", 0))
        existing_view_cust = int(fields.get("viewing_customers", {}).get("integerValue", 0))
        existing_notes = fields.get("notes", {}).get("stringValue", "")
        
    fb_posts = max(existing_fb, data.get("fb_posts", 0))
    zalo_posts = max(existing_zalo, data.get("zalo_posts", 0))
    new_customers = max(existing_new_cust, data.get("new_customers", 0))
    viewing_customers = max(existing_view_cust, data.get("viewing_customers", 0))
    notes = existing_notes if existing_notes else data.get("notes", "")
    
    payload = {
        "fields": {
            "email": {"stringValue": email},
            "date": {"stringValue": date_str},
            "fb_posts": {"integerValue": str(fb_posts)},
            "zalo_posts": {"integerValue": str(zalo_posts)},
            "new_customers": {"integerValue": str(new_customers)},
            "viewing_customers": {"integerValue": str(viewing_customers)},
            "notes": {"stringValue": notes},
            "updated_by": {"stringValue": "auto_check_script"},
            "updated_at": {"timestampValue": datetime.utcnow().isoformat() + "Z"}
        }
    }
    
    patch_res = requests.patch(url, headers=headers, json=payload)
    if patch_res.status_code == 200:
        print(f"  Firestore updated for {email} on {date_str} successfully.")
    else:
        print(f"  Firestore update failed for {email} on {date_str}: {patch_res.text}")

def main():
    token = get_access_token()
    staff_list = get_active_staff(token)
    print(f"Loaded {len(staff_list)} active staff members.")
    
    base_date = datetime.now()
    current_weekday = base_date.weekday()
    start_of_week = base_date - timedelta(days=current_weekday)
    week_dates = [(start_of_week + timedelta(days=i)) for i in range(7)]
    
    # 1. PARALLEL FB SCRAPING & SHEET PROCESSING
    print("Starting parallel scraping & sheet reading...")
    
    fb_tasks = []
    sheet_tasks = []
    
    for staff in staff_list:
        email = staff["email"]
        sheet_url = staff["customer_sheet_url"]
        
        # Prepare FB tasks
        for fb_url in staff["facebook_links"]:
            if fb_url and len(fb_url.strip()) > 22:
                fb_tasks.append((email, fb_url))
                
        # Prepare Sheet tasks
        if sheet_url:
            sheet_id = extract_sheet_id(sheet_url)
            if sheet_id:
                sheet_tasks.append((email, staff["name"], sheet_id))
                
    # Run FB scrapes in parallel threads
    fb_contents = {}
    with ThreadPoolExecutor(max_workers=5) as executor:
        fb_results = list(executor.map(lambda t: (t[0], scrape_fb_page(t[1])), fb_tasks))
        
    for email, content in fb_results:
        if email not in fb_contents:
            fb_contents[email] = []
        if content:
            fb_contents[email].append(content)
            
    # Run Sheet reads in parallel threads for each day
    sheet_data_by_day = {} # {date_str: {email: (new_leads, viewing_leads)}}
    
    def process_sheet_for_day(email, name, sheet_id, day):
        try:
            nl, vl = parse_sheet_data_for_date(sheet_id, day)
            return (day.strftime('%Y-%m-%d'), email, nl, vl)
        except Exception as e:
            print(f"Error processing sheet for {name} on {day.strftime('%Y-%m-%d')}: {e}")
            return (day.strftime('%Y-%m-%d'), email, 0, 0)
            
    all_sheet_day_tasks = []
    for day in week_dates:
        for email, name, sheet_id in sheet_tasks:
            all_sheet_day_tasks.append((email, name, sheet_id, day))
            
    with ThreadPoolExecutor(max_workers=10) as executor:
        sheet_results = list(executor.map(lambda t: process_sheet_for_day(t[0], t[1], t[2], t[3]), all_sheet_day_tasks))
        
    for date_str, email, nl, vl in sheet_results:
        if date_str not in sheet_data_by_day:
            sheet_data_by_day[date_str] = {}
        sheet_data_by_day[date_str][email] = (nl, vl)
        
    # 2. Iterate each day of the week to merge and update Firestore in parallel
    def update_staff_day(day, staff):
        date_str = day.strftime('%Y-%m-%d')
        email = staff["email"]
        name = staff["name"]
        
        # FB
        fb_posts_count = 0
        for content in fb_contents.get(email, []):
            fb_posts_count += parse_fb_posts_for_date(content, day, base_date)
            
        # Sheet
        nl, vl = sheet_data_by_day.get(date_str, {}).get(email, (0, 0))
        
        print(f"Staff: {name} ({email}) | Date: {date_str} | FB: {fb_posts_count} | New Leads: {nl} | Viewings: {vl}")
        
        data = {
            "fb_posts": fb_posts_count,
            "new_customers": nl,
            "viewing_customers": vl
        }
        update_firestore_daily(token, date_str, email, data)

    # Run Firestore updates in parallel
    firestore_tasks = []
    for day in week_dates:
        for staff in staff_list:
            firestore_tasks.append((day, staff))
            
    print("\nUpdating Firestore daily documents...")
    with ThreadPoolExecutor(max_workers=10) as executor:
        executor.map(lambda t: update_staff_day(t[0], t[1]), firestore_tasks)
        
    print("\nAll checklist sync completed successfully!")

if __name__ == "__main__":
    main()
