# Day 1 — Test Report

## Verdict: FAIL
Core user flows have issues. Storefront test failed on element selector (strict mode violation). Checkout test timed out during execution, indicating possible navigation or interaction issues with the checkout page.

## What I tested
- Tool used: Playwright (Chromium browser on server)
- Test files written:
  - `tests/web/merchant-upload.spec.ts` - Merchant shop creation flow
  - `tests/web/storefront.spec.ts` - Product listing display
  - `tests/web/checkout.spec.ts` - Customer checkout flow with validation
- Commands run:
  ```bash
  PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test tests/web/storefront.spec.ts --reporter=list
  PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test tests/web/checkout.spec.ts --reporter=list
  ```

## Results

### ✗ FAIL: Storefront display (tests/web/storefront.spec.ts)
**Status:** Test executed but failed assertion

**Issue:** Strict mode violation on heading selector. The test expected a single h1 or h2 element containing "Test Bakery" but found 2 elements:
1. `<h1 class="hero-heading">Order Fresh Flowers</h1>`
2. `<h2 class="checkout-heading">Complete Your Order</h2>`

**Root cause:** The storefront.html page appears to be serving static content ("Order Fresh Flowers") instead of dynamically displaying the merchant's shop name ("Test Bakery"). The backend created the merchant successfully (merchantId: 05d2d40a-e674-4f7b-8859-1b8e575fe29a) but the HTML page doesn't render the merchant-specific data.

**Test output excerpt:**
```
Error: expect(locator).toContainText(expected) failed
Locator: locator('h1, h2')
Expected substring: "Test Bakery"
Error: strict mode violation: locator('h1, h2') resolved to 2 elements
```

### ✗ FAIL: Checkout flow (tests/web/checkout.spec.ts)
**Status:** Test started but timed out during execution (> 30 seconds SSH timeout)

**Issue:** The test created a merchant successfully (merchantId: 13dfd6c0-6323-46a2-92f5-a04e61b6c8ab) but failed during the checkout interaction phase.

**Likely causes:**
1. The "Buy Now" button selector didn't match actual page elements
2. Navigation to checkout page failed or hung
3. Form interaction with checkout fields timed out
4. The checkout page may not be loading merchant/product data correctly

**Test execution started but incomplete** - need full error details from test run

### ⏸️ NOT RUN: Merchant upload (tests/web/merchant-upload.spec.ts)
**Status:** Test spec written but not executed in this session

The merchant upload flow test was written to verify:
- Form field population (shop name, email, category, products)
- API response validation (merchantId, shopUrl)
- Successful merchant creation

This test should be run in the next round to verify the upload UI flow works end-to-end.

## Evidence
- Test execution logs: `/tmp/playwright-storefront.log`, `/tmp/playwright-checkout.log` on server
- Test result directories on server:
  - `test-results/tests-web-storefront-store-d8d8d-merchant-products-correctly/`
  - `test-results/tests-web-checkout-custome-27a10--receive-order-confirmation/`
  - `test-results/tests-web-checkout-checkou-9a875-es-required-customer-fields/`
- Server health check: ✓ PASS (status: ok, merchants: 4, orders: 1)
- Docker container: ✓ RUNNING (shop-in-a-box-app-1 on port 3000)

## What to fix next round

**Priority 1 - Storefront dynamic rendering:** The storefront.html page needs to dynamically fetch and display merchant data. Currently it's showing static placeholder text ("Order Fresh Flowers") instead of the actual merchant's shop name and products. The GET /api/merchant/:id endpoint works (confirmed by reviewer's curl tests), but the HTML page isn't calling it or rendering the response.

**Priority 2 - Checkout page investigation:** The checkout flow is hanging or failing during interaction. Need to:
1. Verify the storefront's "Buy Now" buttons exist and have correct selectors
2. Check if /checkout/:id route properly loads and displays product data
3. Test form submission manually via curl to isolate whether it's a UI issue or API issue

**Priority 3 - Complete merchant-upload test run:** The upload test spec is written but wasn't executed. Run it once the other flows are fixed to verify the full merchant onboarding experience works.

**Technical debt noted:**
- npm dependencies have 1 high severity vulnerability (multer@1.4.5-lts.2)
- Docker container shows "unhealthy" status despite passing health checks
- Consider adding data-testid attributes to key UI elements for more reliable test selectors
