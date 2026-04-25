"""
Captures all 7 CorporateMoments app screens cleanly (no Emergent badge)
and merges them into a single PDF for client deliverable.
"""
import os
import time
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image

URL = "https://snap-reserve-10.preview.emergentagent.com"
OUT = Path("/app/shots")
OUT.mkdir(exist_ok=True)

# Viewport optimized for the app's 480px max-width mobile design
VW, VH = 480, 900

# CSS to forcibly hide any Emergent badge / overlay injected into the preview
HIDE_BADGE_CSS = """
[id*="emergent" i], [class*="emergent" i],
[id*="badge" i], [class*="badge" i][style*="position:fixed" i],
iframe[src*="emergent" i],
a[href*="emergent" i][target="_blank"],
div[style*="z-index: 9999"][style*="position: fixed"],
#__emergent_badge, .emergent-badge, .made-with-emergent {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
"""

def hide_badge(page):
    page.add_style_tag(content=HIDE_BADGE_CSS)
    # Also try to remove any fixed-position element in the bottom-right corner that mentions emergent
    page.evaluate("""
        () => {
          document.querySelectorAll('a, div, button, span').forEach(el => {
            const t = (el.textContent || '').toLowerCase();
            const href = (el.getAttribute && el.getAttribute('href') || '').toLowerCase();
            if (t.includes('made with emergent') || t.includes('emergent') && el.tagName === 'A' || href.includes('emergent.sh') || href.includes('emergentagent')) {
              el.style.display = 'none';
              el.remove();
            }
          });
        }
    """)

def shot(page, name):
    hide_badge(page)
    time.sleep(0.6)
    path = OUT / f"{name}.png"
    page.screenshot(path=str(path), full_page=False)
    print(f"Captured {path}")
    return path

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": VW, "height": VH}, device_scale_factor=2)
        page = ctx.new_page()

        # 1. Login (phone) — clear localStorage first
        page.goto(URL + "/login", wait_until="networkidle")
        page.evaluate("() => localStorage.clear()")
        page.goto(URL + "/login", wait_until="networkidle")
        time.sleep(1.2)
        shot(page, "01_login_phone")

        # 2. OTP — fill phone, click Send code
        page.fill("input[inputmode='numeric']", "9876543210")
        time.sleep(0.3)
        page.get_by_text("Send code", exact=False).first.click()
        time.sleep(1.4)
        # fill OTP partially so screen looks engaged but not auto-advancing
        otp_inputs = page.locator("input[maxlength='1']")
        for i, d in enumerate("1234"):
            try:
                otp_inputs.nth(i).fill(d)
            except Exception:
                pass
        time.sleep(0.6)
        shot(page, "02_login_otp")

        # 3. Onboarding — set phone via localStorage, navigate
        page.evaluate("() => { localStorage.setItem('cm_phone','9876543210'); }")
        page.goto(URL + "/onboarding", wait_until="networkidle")
        time.sleep(1.2)
        # type a name to make the screen feel real
        try:
            page.locator("input").first.fill("Aarav")
        except Exception:
            pass
        time.sleep(0.5)
        shot(page, "03_onboarding")

        # 4. Home
        page.evaluate("() => { localStorage.setItem('cm_name','Aarav'); }")
        page.goto(URL + "/", wait_until="networkidle")
        time.sleep(1.5)
        shot(page, "04_home")

        # 5. Booking — advance to next month and pick a clearly future date + time slot
        page.goto(URL + "/booking", wait_until="networkidle")
        time.sleep(1.6)
        try:
            # Click the "next month" chevron (right arrow). It's the 2nd ChevronRight area in the calendar header.
            chevs = page.locator("button:has(svg.lucide-chevron-right)")
            if chevs.count() > 0:
                chevs.first.click()
                time.sleep(0.5)
            # Now click a mid-month date (15) that should be enabled in next month
            page.locator("button", has_text="15").first.click()
            time.sleep(0.4)
            page.locator("button", has_text="11:00 AM").first.click()
        except Exception as e:
            print("booking interaction skipped:", e)
        time.sleep(0.6)
        shot(page, "05_booking")

        # 6. Payment — seed cm_booking so page renders properly
        booking_seed = {
            "package": {
                "id": "w2",
                "name": "Candid & Traditional Combo",
                "photographer": "Studio Moments by Raj",
                "image": "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&q=80",
                "basePrice": 65000,
                "originalPrice": 85000,
                "duration": "10 hrs",
                "location": "On-location · Delhi NCR",
            },
            "date": "2026-03-15T00:00:00.000Z",
            "time": "11:00 AM",
            "total": 65000,
        }
        import json as _json
        page.evaluate(f"() => {{ localStorage.setItem('cm_booking', {_json.dumps(_json.dumps(booking_seed))}); }}")
        page.goto(URL + "/payment", wait_until="networkidle")
        time.sleep(1.6)
        shot(page, "06_payment")

        # 7. Confirmation — seed cm_last_booking with full payload matching Payment.jsx
        gst = round(booking_seed["total"] * 0.18)
        platform_fee = 99
        grand_total = booking_seed["total"] + gst + platform_fee
        last_booking = {
            **booking_seed,
            "ref": "CM2026X8K3F",
            "grandTotal": grand_total,
            "paymentMode": "online",
            "paymentMethod": "upi",
            "paidAt": "2026-03-08T09:34:00.000Z",
        }
        page.evaluate(f"() => {{ localStorage.setItem('cm_last_booking', {_json.dumps(_json.dumps(last_booking))}); }}")
        page.goto(URL + "/confirmation", wait_until="networkidle")
        time.sleep(2.0)  # confirmation has a 600ms loading state
        shot(page, "07_confirmation")

        browser.close()

    # Merge to PDF using img2pdf (PNG-friendly, no JPEG dep needed)
    import img2pdf
    files = sorted(OUT.glob("*.png"))
    print(f"Merging {len(files)} screens to PDF...")
    out_pdf = "/app/CorporateMoments_Screens.pdf"
    with open(out_pdf, "wb") as f:
        f.write(img2pdf.convert([str(p) for p in files]))
    size_kb = os.path.getsize(out_pdf) / 1024
    print(f"PDF saved: {out_pdf} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    main()
