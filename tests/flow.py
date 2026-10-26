# Playwright (python) e2e: reading -> result flow against the mocked model (port 4102), unavailable state (4101), Attio page.
import json, sys
from playwright.sync_api import sync_playwright
OUT = '/workspace/boundset-ceo/seo-aeo/previews/teardown-'
MODE = sys.argv[1]  # 'mock' (server built with TEARDOWN_MOCK=1) or 'off' (no model env)
PORT = 4102 if MODE == 'mock' else 4101
res = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    for w, h, tag in [(1440, 900, '1440'), (390, 844, '390')]:
        ctx = b.new_context(viewport={'width': w, 'height': h}, device_scale_factor=2 if w == 390 else 1, extra_http_headers={'x-forwarded-for': f'10.9.{w % 250}.1'})
        if MODE == 'off':
            pg2 = ctx.new_page(); pg2.goto(f'http://localhost:{PORT}/teardown'); pg2.wait_for_load_state('networkidle')
            res[tag] = {'unavailable_line': pg2.locator('text=TEARDOWN UNAVAILABLE LINE NEEDED').count(), 'submit_disabled': pg2.get_attribute('button[type=submit]', 'aria-disabled')}
            pg2.screenshot(path=f'{OUT}unavailable-{tag}.png', full_page=True); ctx.close(); continue
        pg = ctx.new_page(); errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto('http://localhost:4102/teardown'); pg.wait_for_load_state('networkidle')
        pg.screenshot(path=f'{OUT}idle-{tag}.png', full_page=True)
        # client-side rejection shakes the field, no request
        pg.fill('input[name=url]', 'localhost:3000'); pg.click('button[type=submit]')
        pg.wait_for_selector('[data-bad]', timeout=1000)
        pg.wait_for_timeout(1600)
        pg.fill('input[name=url]', f'example-{tag}.com'); pg.click('button[type=submit]')
        pg.wait_for_selector('text=Welcome to agentic revenue.')
        pg.wait_for_timeout(500); pg.screenshot(path=f'{OUT}reading-{tag}.png', full_page=True)
        pg.wait_for_selector('text=Book a 15-minute call', timeout=15000)
        pg.hover('li:has-text("The best line sits in an H3")')
        hit = pg.locator('mark', has_text='Speed to lead, every time.').count()
        pg.screenshot(path=f'{OUT}result-{tag}.png', full_page=True)
        href = pg.get_attribute('a:has-text("Book a 15-minute call")', 'href')
        email_form = pg.locator('text=Send this to my inbox').count()
        res[tag] = {'pageerrors': errs, 'hover_highlight': hit, 'book_href': href, 'email_form_shown': email_form}
        pg3 = ctx.new_page(); pg3.goto('http://localhost:4102/teardowns/attio'); pg3.wait_for_load_state('networkidle')
        pg3.screenshot(path=f'{OUT}attio-{tag}.png', full_page=True)
        lds = [json.loads(x) for x in pg3.locator('script[type="application/ld+json"]').all_inner_texts()]
        flat = [d for x in lds for d in (x if isinstance(x, list) else [x])]
        res[tag]['ld_types'] = sorted({d['@type'] for d in flat})
        res[tag]['robots'] = pg3.get_attribute('meta[name=robots]', 'content')
        ctx.close()
    b.close()
print(json.dumps(res, indent=1))
