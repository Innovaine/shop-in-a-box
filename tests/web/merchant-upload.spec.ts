import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('merchant can upload shop with products', async ({ page }) => {
  test.setTimeout(30_000);
  
  // Navigate to upload page
  await page.goto(`${BASE_URL}/upload`);
  
  // Fill in shop details
  await page.fill('input[name="shopName"]', 'Test Flower Shop');
  await page.fill('input[name="email"]', 'testshop@example.com');
  await page.selectOption('select[name="category"]', 'flowers');
  
  // Add first product
  await page.fill('input[name="productName"]', 'Red Roses');
  await page.fill('textarea[name="productDescription"]', 'Beautiful fresh red roses');
  await page.fill('input[name="productPrice"]', '29.99');
  await page.click('button:has-text("Add Product")');
  
  // Add second product
  await page.fill('input[name="productName"]', 'White Tulips');
  await page.fill('textarea[name="productDescription"]', 'Elegant white tulips');
  await page.fill('input[name="productPrice"]', '24.99');
  await page.click('button:has-text("Add Product")');
  
  // Submit the form
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/merchant/create') && response.status() === 200
  );
  await page.click('button[type="submit"]:has-text("Create Shop")');
  
  const response = await responsePromise;
  const data = await response.json();
  
  // Verify response contains merchantId and shopUrl
  expect(data.success).toBe(true);
  expect(data.merchantId).toBeTruthy();
  expect(data.shopUrl).toContain('/shop/');
  
  // Take screenshot of confirmation
  await page.screenshot({ path: 'test-results/merchant-upload-success.png' });
  
  console.log(`✓ Merchant created: ${data.merchantId}`);
  console.log(`✓ Shop URL: ${data.shopUrl}`);
});
