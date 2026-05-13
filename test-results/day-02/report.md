# Day 2 — Test Report

## Verdict: FAIL
Core storefront functionality is broken. JavaScript error prevents merchant data from loading on the storefront page. While the backend API works correctly (merchant creation succeeds, data is stored), the frontend fails to fetch and display this data to customers.

## What I tested
- Tool used: Manual API testing via curl (Playwright tests timeout due to JS error loop)
- Test files available:
  - `tests/web/merchant-upload.spec.ts` - Merchant shop creation flow
  - `tests/web/storefront.spec.ts` - Product listing display (FAILS)
  - `tests/web/checkout.spec.ts` - Customer checkout flow (BLOCKED by storefront issue)
- Commands run:
  ```bash
  # Backend API test - PASSES
  curl -X POST http://localhost:3000/api/merchant/create \
    -H "Content-Type: application/json" \
    -d '{"shopName":"Day2Test","category":"bakery","email":"day2@test.com","items":[{"name":"Cake","description":"Test","price":10}]}'
  
  # Storefront page test - FAILS
  curl http://localhost:3000/shop/00ec20fd-29d6-4caf-ab62-151a16bb1b4e
  ```

## Results

### ✓ PASS: Backend API (merchant creation)
**Status:** Working correctly

The POST `/api/merchant/create` endpoint functions as expected:
- Accepts shop details and product list
- Returns success response with merchantId and shopUrl
- Data is persisted (verified by health endpoint showing merchant count increases)

**Evidence:**
```json
{
  "success": true,
  "merchantId": "00ec20fd-29d6-4caf-ab62-151a16bb1b4e",
  "shopUrl": "http://localhost:3000/shop/00ec20fd-29d6-4caf-ab62-151a16bb1b4e"
}
```

### ✗ FAIL: Storefront display (storefront.html)
**Status:** JavaScript error prevents page from loading merchant data

**Issue:** The storefront page loads with "Loading shop..." and never progresses. The page contains a JavaScript syntax error that prevents the `getMerchantId()` function from executing properly.

**Root cause (from engineer's debug log):**
```
PAGE ERROR: missing ) after argument list
H1 text: Loading shop...
```

The storefront.html file has malformed JavaScript that breaks the merchant data fetch. The page HTML is served successfully, but the client-side script fails to:
1. Extract merchantId from the URL
2. Fetch merchant data from `/api/merchant/:id`
3. Render the shop name and product list

**User impact:** CRITICAL - Merchants can create shops via the upload form, but customers cannot see the storefront. The entire customer-facing experience is broken.

**Playwright test output (from engineer's run):**
```
Error: expect(locator).toContainText(expected) failed
Locator: locator('h1, h2')
Expected substring: "Test Bakery"
Received string:    "Loading shop..."
Timeout: 5000ms
```

### ⏸️ BLOCKED: Checkout flow
**Status:** Cannot test - depends on storefront working

The checkout test cannot run because:
1. Customers must navigate from storefront to checkout
2. The "Buy Now" button on the storefront doesn't work (page JS is broken)
3. Even if navigating directly to `/checkout/:merchantId?product=0`, the checkout page likely has the same JavaScript issues

### ⏸️ BLOCKED: Merchant upload UI test
**Status:** Test spec written but not executed due to timeout issues

The `tests/web/merchant-upload.spec.ts` test is written and should verify the full UI flow (form fill, submission, confirmation). However, Playwright tests are timing out during execution (30+ seconds SSH timeout hit before browser completes). This is a test infrastructure issue, not a product bug.

**Workaround used:** Tested the underlying API directly via curl, which works correctly. The backend is functional; only the frontend has issues.

## Evidence
- Test execution logs: Engineer's day-02/engineering.md shows multiple failed test runs
- Server health check: ✓ HEALTHY (status: ok, service responding on port 3000)
- Backend API: ✓ FUNCTIONAL (merchant creation works, returns valid IDs)
- Frontend rendering: ✗ BROKEN (JavaScript syntax error, page stuck on "Loading shop...")
- Server runs referenced:
  - `server-runs/2026-05-13T19-10-44-app-cd-shop-in-a-box-PLAYWRIGHT_BROWSERS_PAT-1.log`
  - `server-runs/2026-05-13T19-11-09-app-cd-shop-in-a-box-cat-tmp-test_debug.sh-E-1.log`
  - `server-runs/2026-05-13T19-12-12-app-cd-shop-in-a-box-git-pull---ff-only-PLAY-1.log`

## What to fix next round

**PRIORITY 1 - Fix storefront.html JavaScript syntax error**

The engineer identified "missing ) after argument list" in the storefront page. This blocks the entire customer journey. Fix steps:

1. Review storefront.html lines 40-80 (where `getMerchantId()` and fetch logic live)
2. Check for:
   - Unclosed parentheses in function calls
   - Template literal syntax errors (backticks, ${} expressions)
   - Missing quotes in string concatenation
3. Test the fix by:
   - Creating a merchant via API
   - Loading `/shop/:merchantId` in a browser
   - Verifying shop name and products appear (not "Loading shop...")

**PRIORITY 2 - Verify checkout.html has same fixes applied**

The engineer's notes show both storefront.html and checkout.html were edited. Ensure checkout.html:
- Has no JavaScript syntax errors
- Correctly fetches merchant data via `/api/merchant/:id`
- Correctly fetches product data (from URL params or merchant items array)
- Renders form fields with proper data-testid attributes

**PRIORITY 3 - Re-run Playwright tests after fixes**

Once the JS errors are fixed:
```bash
cd ~/shop-in-a-box
git pull --ff-only
docker compose down && docker compose build && docker compose up -d
PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test tests/web/storefront.spec.ts --reporter=list
PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test tests/web/checkout.spec.ts --reporter=list
```

Expected outcome: All tests pass, screenshots show merchant data correctly displayed.

**PRIORITY 4 - Address Playwright timeout issue**

The SSH exec timeout (30s) is insufficient for Playwright browser launch + test execution. Options:
- Run tests in background: `nohup npx playwright test > /tmp/test.log 2>&1 &`
- Use shorter, more focused tests (one assertion per test file)
- Increase SSH timeout in runner config (if possible)

This is NOT a blocker for shipping, but makes automated testing difficult.

## Technical notes

**What works:**
- Docker container runs and stays healthy
- Node.js backend serves requests correctly
- Express routing (all endpoints respond)
- Merchant creation API (POST `/api/merchant/create`)
- Health check endpoint (GET `/health`)
- Static HTML file serving

**What's broken:**
- Client-side JavaScript in storefront.html (syntax error)
- Merchant data loading/rendering on storefront page
- Customer-facing product display (the core value proposition)

**Risk assessment:**
- **Shipping risk:** HIGH - Cannot ship in current state. Customers see a blank "Loading..." page instead of products.
- **Fix complexity:** LOW - This is a JavaScript syntax error, likely a typo in one line. Should take <30 minutes to identify and fix.
- **Regression risk:** MEDIUM - The engineer made multiple edits to storefront.html. Need to verify the fix doesn't break other parts of the page (e.g., product cards, buy buttons).

## Recommendation

**DO NOT SHIP.** The storefront page is the primary user-facing feature and it's completely broken. Fix the JavaScript syntax error, re-run tests, and re-review before considering this shippable.

Expected timeline: 1-2 hours to fix + retest. Should be ready for next round.
