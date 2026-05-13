# Day 3 — Testing (Playwright / Appetize): Shop-in-a-Box — DIY storefront for micro-merchants

- **By:** Priya (Tester)
- **Cycle:** 4
- **Saved:** 13/05/2026, 11:01:04 PM

---

## ⏹️ Stopped by user

User stopped the cycle before SSH commands ran.

## Plan
[x] p1: Pull latest code and verify service is running
[x] p2: Run storefront.spec.ts test - verify merchant products display
[ ] p3: Run checkout.spec.ts test - verify customer order flow
[ ] p4: Run merchant-upload.spec.ts test - verify shop creation UI
[ ] p5: Pull test screenshots from server to test-results/day-03/
[ ] p6: Write test-results/day-03/report.md with final verdict

## Actions
- list `/` (116 files)
- read `day-03/_plan.md` (2296B)
- read `day-03/engineering.md` (13319B)
- read `README.md` (1812B)
- read `test-results/day-02/report.md` (7508B)
- read `day-03/review.md` (9569B)
- read `tests/web/storefront.spec.ts` (2256B)
- read `tests/web/checkout.spec.ts` (3581B)
- read `tests/web/merchant-upload.spec.ts` (1784B)
- queued SSH on app: `cd ~/shop-in-a-box && git pull --ff-only && docker compose ps && curl -s http://localhost:3000/healt`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p1: Pull latest code and verify service is running
- queued SSH on app: `cd ~/shop-in-a-box && PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright t`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p2: Run storefront.spec.ts test - verify merchant products display
- queued SSH on app: `cd ~/shop-in-a-box && timeout 60 bash -c 'PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-brows`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cat /tmp/checkout-test.log`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/shop-in-a-box && curl -s -X POST http://localhost:3000/api/merchant/create -H "Content-Type: ap`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/shop-in-a-box && timeout 60 bash -c 'PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-brows`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cd ~/shop-in-a-box && ls -la test-results/ 2>/dev/null && find test-results -name "*.png" 2>/dev/nul`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/shop-in-a-box && find . -name "storefront-display.png" -o -name "checkout-*.png" -o -name "merc`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/shop-in-a-box && ls -la storefront-display.png checkout-confirmation.png 2>/dev/null || echo "N`

## SSH commands executed
1. ✓ exit 0 — cd ~/shop-in-a-box && git pull --ff-only && docker compose ps && curl -s http://
STDOUT:
Updating 511c21f..d18f1d7
Fast-forward
 checkout.html                 |   6 +-
 day-02/_index.md              |  30 ++
 day-02/test.md                | 123 +++++++
 day-03/_plan.md               |  36 ++
 day-03/engineering.md         | 317 ++++++++++++++++++
 day-03/review.md              | 236 ++++++++++++++
 server-log.md                 | 740 ++++++++++++++++++++++++++++++++++++++++++
 storefront.html               |  10 +-
 test-results/day-02/report.md | 164 ++++++++++
 tests/web/storefront.spec.ts  |  15 +-
 10 files changed, 1660 insertions(+), 17 deletions(-)
 create mode 100644 day-02/_index.md
 create mode 100644 day-02/test.md
 create mode 100644 day-03/_plan.md
 create mode 100644 day-03/engineering.md
 create mode 100644 day-03/review.md
 create mode 100644 test-results/day-02/report.md
NAME                  IMAGE               COMMAND                  SERVICE   CREATED         STATUS                     PORTS
shop-in-a-box-app-1   shop-in-a-box-app   "docker-entrypoint.s…"   app       8 minutes ago   Up 8 minutes (unhealthy)   0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp
{
  "status": "ok",
  "timestamp": "2026-05-13T19:56:10.912Z",
  "merchants": 7,
  "orders": 0
}
Full log: server-runs/2026-05-13T19-56-11-app-cd-shop-in-a-box-git-pull---ff-only-dock-1.log

2. ✓ exit 0 — cd ~/shop-in-a-box && PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-brows
STDOUT:

Running 1 test using 1 worker

✓ Created test merchant: b93195b5-ec28-47ec-879f-41e38b8a8e40
✓ Storefront displays all 3 products correctly
  ✓  1 tests/web/storefront.spec.ts:5:5 › storefront displays merchant products correctly (169ms)

  1 passed (836ms)
Full log: server-runs/2026-05-13T19-57-20-app-cd-shop-in-a-box-PLAYWRIGHT_BROWSERS_PAT-1.log

3. ✗ fail (exit 1) — cd ~/shop-in-a-box && timeout 60 bash -c 'PLAYWRIGHT_BROWSERS_PATH=/usr/local/sh
ERROR: command exited 1

4. ✓ exit 0 — cat /tmp/checkout-test.log
STDOUT:
…fields (30.0s)


  1) tests/web/checkout.spec.ts:5:5 › customer can complete checkout and receive order confirmation 

    Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed

    Locator: locator('text=$22')
    Expected: visible
    Timeout: 5000ms
    Error: element(s) not found

    Call log:
    [2m  - Expect "toBeVisible" with timeout 5000ms[22m
    [2m  - waiting for locator('text=$22')[22m


      36 |   // Verify product details are shown
      37 |   await expect(page.locator('text=Handmade Mug')).toBeVisible();
    > 38 |   await expect(page.locator('text=$22')).toBeVisible();
         |                                          ^
      39 |   
      40 |   // Fill in customer details
      41 |   await page.fill('input[name="customerName"]', 'Test Customer');
        at /home/engineer/shop-in-a-box/tests/web/checkout.spec.ts:38:42

    Error Context: test-results/tests-web-checkout-custome-27a10--receive-order-confirmation/error-context.md

  2) tests/web/checkout.spec.ts:69:5 › checkout validates required customer fields ─────────────────

    [31mTest timeout of 30000ms exceeded.[39m

    Error: page.click: Test timeout of 30000ms exceeded.
    Call log:
    [2m  - waiting for locator('button[type="submit"]:has-text("Place Order")')[22m


      88 |   
      89 |   // Try to submit without filling fields
    > 90 |   await page.click('button[type="submit"]:has-text("Place Order")');
         |              ^
      91 |   
      92 |   // Browser should show HTML5 validation or custom error
      93 |   // Check if form hasn't navigated away (still on checkout page)
        at /home/engineer/shop-in-a-box/tests/web/checkout.spec.ts:90:14

    Error Context: test-results/tests-web-checkout-checkou-9a875-es-required-customer-fields/error-context.md

  2 failed
    tests/web/checkout.spec.ts:5:5 › customer can complete checkout and receive order confirmation ─
    tests/web/checkout.spec.ts:69:5 › checkout validates required customer fields ──────────────────
Full log: server-runs/2026-05-13T19-58-27-app-cat-tmp-checkout-test.log-1.log

5. ✓ exit 0 — cd ~/shop-in-a-box && curl -s -X POST http://localhost:3000/api/merchant/create 
STDOUT:
Created merchant: 6821561c-1088-4512-a77b-aa91fe3b95f3
          <span class="summary-label" id="product-name">Loading...</span>
          <span class="summary-value" id="total-price">$0.00</span>
      <p style="margin-top: 16px; font-size: 14px; color: #7f8c8d;">Loading product details...</p>
      document.getElementById('product-name').textContent = product.name;
      document.getElementById('total-price').textContent = `${(product.price || 0).toFixed(2)}`;
Full log: server-runs/2026-05-13T19-58-54-app-cd-shop-in-a-box-curl--s--X-POST-http-lo-1.log

6. ✗ exec-error (exit -) — cd ~/shop-in-a-box && timeout 60 bash -c 'PLAYWRIGHT_BROWSERS_PATH=/usr/local/sh
ERROR: SSH exec timeout (30000ms)

7. ✓ exit 0 — cd ~/shop-in-a-box && ls -la test-results/ 2>/dev/null && find test-results -nam
STDOUT:
total 16
drwxrwxr-x  3 tester tester 4096 May 13 19:59 .
drwxrwxr-x 13 tester tester 4096 May 13 19:59 ..
-rw-rw-r--  1 tester tester   96 May 13 19:59 .last-run.json
drwxrwxr-x  2 tester tester 4096 May 13 19:59 tests-web-merchant-upload--9f602-n-upload-shop-with-products
Full log: server-runs/2026-05-13T20-00-07-app-cd-shop-in-a-box-ls--la-test-results-2-d-1.log

8. ✓ exit 0 — cd ~/shop-in-a-box && find . -name "storefront-display.png" -o -name "checkout-*
