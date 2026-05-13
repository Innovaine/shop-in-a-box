import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('customer can complete checkout and receive order confirmation', async ({ page }) => {
  test.setTimeout(45_000);
  
  // Setup: Create a merchant with products via API
  const createResponse = await page.request.post(`${BASE_URL}/api/merchant/create`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      shopName: 'Test Craft Shop',
      category: 'handmade',
      email: 'crafts@example.com',
      items: [
        { name: 'Handmade Mug', description: 'Ceramic coffee mug', price: 22.00 },
        { name: 'Wool Scarf', description: 'Hand-knit wool scarf', price: 45.00 }
      ]
    }
  });
  
  const merchantData = await createResponse.json();
  const merchantId = merchantData.merchantId;
  console.log(`✓ Created test merchant: ${merchantId}`);
  
  // Navigate to storefront
  await page.goto(`${BASE_URL}/shop/${merchantId}`);
  
  // Click "Buy Now" on the first product
  const buyButtons = page.locator('button:has-text("Buy"), a:has-text("Buy")');
  await buyButtons.first().click();
  
  // Should navigate to checkout page
  await expect(page).toHaveURL(new RegExp(`/checkout/${merchantId}`));
  
  // Verify product details are shown
  await expect(page.locator('text=Handmade Mug')).toBeVisible();
  await expect(page.locator('text=$22')).toBeVisible();
  
  // Fill in customer details
  await page.fill('input[name="customerName"]', 'Test Customer');
  await page.fill('input[name="customerEmail"]', 'customer@example.com');
  await page.fill('input[name="phone"]', '555-1234');
  await page.fill('textarea[name="address"]', '123 Main St, Test City');
  
  // Submit order
  const orderResponsePromise = page.waitForResponse(response => 
    response.url().includes('/api/order/create') && response.status() === 200
  );
  await page.click('button[type="submit"]:has-text("Place Order")');
  
  const orderResponse = await orderResponsePromise;
  const orderData = await orderResponse.json();
  
  // Verify order was created
  expect(orderData.success).toBe(true);
  expect(orderData.orderId).toBeTruthy();
  
  // Check for confirmation message on page
  await expect(page.locator('text=Order Confirmed, text=Thank you')).toBeVisible({ timeout: 5000 });
  
  // Take screenshot of confirmation
  await page.screenshot({ path: 'test-results/checkout-confirmation.png' });
  
  console.log(`✓ Order created: ${orderData.orderId}`);
  console.log(`✓ Checkout flow completed successfully`);
});

test('checkout validates required customer fields', async ({ page }) => {
  test.setTimeout(30_000);
  
  // Setup: Create a merchant
  const createResponse = await page.request.post(`${BASE_URL}/api/merchant/create`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      shopName: 'Validation Test Shop',
      category: 'flowers',
      email: 'validation@example.com',
      items: [{ name: 'Test Product', description: 'For validation', price: 10.00 }]
    }
  });
  
  const merchantData = await createResponse.json();
  const merchantId = merchantData.merchantId;
  
  // Navigate to checkout
  await page.goto(`${BASE_URL}/checkout/${merchantId}?product=0`);
  
  // Try to submit without filling fields
  await page.click('button[type="submit"]:has-text("Place Order")');
  
  // Browser should show HTML5 validation or custom error
  // Check if form hasn't navigated away (still on checkout page)
  await expect(page).toHaveURL(new RegExp('/checkout/'));
  
  console.log(`✓ Checkout validates required fields`);
});
