import os
import sys
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from pathlib import Path

def download_file(url, folder, filename):
    filepath = os.path.join(folder, filename)
    if os.path.exists(filepath):
        return True
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        os.makedirs(folder, exist_ok=True)
        with open(filepath, "wb") as f:
            f.write(resp.content)
        print(f"  [OK] {filepath}")
        return True
    except Exception as e:
        print(f"  [FAIL] {url} -> {e}")
        return False

def get_filename_from_url(url):
    path = urlparse(url).path
    name = os.path.basename(path)
    if not name or name == "/":
        name = "index.html"
    return name

def get_extension(url):
    path = urlparse(url).path.lower()
    for ext in [".css", ".js", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".woff", ".woff2", ".ttf", ".eot", ".ico", ".pdf", ".mp4", ".mp3"]:
        if ext in path:
            return ext
    return ""

def classify_asset(url):
    path = urlparse(url).path.lower()
    if any(ext in path for ext in [".css"]):
        return "css"
    elif any(ext in path for ext in [".js"]):
        return "js"
    elif any(ext in path for ext in [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico"]):
        return "image"
    elif any(ext in path for ext in [".woff", ".woff2", ".ttf", ".eot"]):
        return "font"
    elif any(ext in path for ext in [".pdf"]):
        return "public"
    elif "favicon" in path:
        return "public"
    else:
        return "other"

def main():
    if len(sys.argv) < 2:
        print("Usage: python download_assets.py <URL>")
        print("Example: python download_assets.py https://example.com")
        sys.exit(1)

    url = sys.argv[1]
    print(f"\nFetching: {url}\n")

    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
        resp = requests.get(url, headers=headers, timeout=15)
        resp.raise_for_status()
    except Exception as e:
        print(f"Failed to fetch page: {e}")
        sys.exit(1)

    soup = BeautifulSoup(resp.text, "html.parser")
    base_url = urljoin(url, "/")

    # Create folders
    for folder in ["css", "js", "image", "font", "public"]:
        os.makedirs(folder, exist_ok=True)

    downloaded = set()
    total = 0
    success = 0

    # --- CSS files ---
    print("=== CSS FILES ===")
    for tag in soup.find_all("link", rel="stylesheet"):
        href = tag.get("href")
        if not href:
            continue
        full_url = urljoin(url, href)
        if full_url in downloaded:
            continue
        downloaded.add(full_url)
        filename = get_filename_from_url(full_url)
        total += 1
        if download_file(full_url, "css", filename):
            success += 1

    # Inline Google Fonts CSS (download the actual font files)
    print("\n=== FONT FILES ===")
    for tag in soup.find_all("link", href=True):
        href = tag.get("href", "")
        if "fonts.googleapis.com/css" in href:
            try:
                font_css = requests.get(href, timeout=10).text
                for line in font_css.split("\n"):
                    if "url(" in line:
                        font_url = line.split("url(")[1].split(")")[0].strip().strip("'\"")
                        font_url = urljoin(href, font_url)
                        if font_url in downloaded:
                            continue
                        downloaded.add(font_url)
                        fname = get_filename_from_url(font_url)
                        total += 1
                        if download_file(font_url, "font", fname):
                            success += 1
            except:
                pass

    # --- JS files ---
    print("\n=== JS FILES ===")
    for tag in soup.find_all("script", src=True):
        src = tag.get("src")
        if not src:
            continue
        full_url = urljoin(url, src)
        if full_url in downloaded:
            continue
        downloaded.add(full_url)
        filename = get_filename_from_url(full_url)
        total += 1
        if download_file(full_url, "js", filename):
            success += 1

    # --- Images ---
    print("\n=== IMAGES ===")
    for tag in soup.find_all("img", src=True):
        src = tag.get("src")
        if not src or src.startswith("data:"):
            continue
        full_url = urljoin(url, src)
        if full_url in downloaded:
            continue
        downloaded.add(full_url)
        filename = get_filename_from_url(full_url)
        total += 1
        if download_file(full_url, "image", filename):
            success += 1

    # Background images in style attribute
    for tag in soup.find_all(style=True):
        style = tag.get("style", "")
        if "url(" in style:
            import re
            urls = re.findall(r'url\(["\']?(.*?)["\']?\)', style)
            for u in urls:
                if u.startswith("data:"):
                    continue
                full_url = urljoin(url, u)
                if full_url in downloaded:
                    continue
                downloaded.add(full_url)
                filename = get_filename_from_url(full_url)
                cat = classify_asset(full_url)
                total += 1
                if download_file(full_url, cat, filename):
                    success += 1

    # --- Favicon ---
    print("\n=== FAVICON ===")
    for tag in soup.find_all("link", rel=lambda x: x and "icon" in x):
        href = tag.get("href")
        if not href:
            continue
        full_url = urljoin(url, href)
        if full_url in downloaded:
            continue
        downloaded.add(full_url)
        filename = get_filename_from_url(full_url)
        total += 1
        if download_file(full_url, "public", filename):
            success += 1

    # --- Save original HTML ---
    html_name = "index.html"
    with open(html_name, "w", encoding="utf-8") as f:
        f.write(resp.text)
    print(f"\n  [OK] {html_name} (saved)")

    # --- Summary ---
    print(f"\n{'='*40}")
    print(f"TOTAL: {total} assets found")
    print(f"DOWNLOADED: {success}/{total}")
    print(f"{'='*40}")
    print("\nFolder structure created:")
    print("  css/")
    print("  js/")
    print("  image/")
    print("  font/")
    print("  public/")
    print("  index.html")

if __name__ == "__main__":
    main()
