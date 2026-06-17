import requests
import re

urls = ["https://bom.so/UBdsCc", "https://bom.so/e0C4Ni", "https://bom.so/It4ZsE"]

for i, u in enumerate(urls):
    r = requests.head(u, allow_redirects=True)
    if "/d/" in r.url:
        doc_id = r.url.split("/d/")[1].split("/")[0]
        export_url = f"https://docs.google.com/document/d/{doc_id}/export?format=html"
        res = requests.get(export_url)
        with open(f"doc_{i}.html", "w", encoding="utf-8") as f:
            f.write(res.text)
        print(f"Saved {u} to doc_{i}.html")
    else:
        print(f"Could not resolve {u}")
