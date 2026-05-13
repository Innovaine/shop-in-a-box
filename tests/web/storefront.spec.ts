import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test('storefront displays merchant products correctly', async ({ page }) => {
  test.setTimeout(30_000);
  
  // First create a merchant via API
  const createResponse = await page.request.post(`${BASE_URL}/api/merchant/create`, {
    headers: { 'Content-Type': 'application/json' },
    data: {
      shopName: 'Test Bakery',
      category: 'bakery',
      email: 'bakery@example.com',
      items: [
        { name: 'Chocolate Cake', description: 'Rich chocolate layer cake', price: 35.00 },
        { name: 'Croissant', description: 'Buttery French croissant', price: 3.50 },
        { name: 'Sourdough Bread', description: 'Artisan sourdough loaf', price: 8.00 }
      ]
    }
  });
  
  const merchantData = await createResponse.json();
  expect(merchantData.success).toBe(true);
  
  const merchantId = merchantData.merchantId;
  console.log(`✓ Created test merchant: ${merchantId}`);
  
  // Navigate to storefront
  await page.goto(`${BASE_URL}/shop/${merchantId}`);
  
  // Check page title/header displays shop name
  await expect(page.locator('h1, h2')).toContainText('Test Bakery');
  
  // Verify all three products are displayed
  const productCards = page.locator('[data-testid="product-card"], .product-item, .product');
  
  // Check first product
  await expect(page.locator('[data-testid="product-name"]').filter({ hasText: 'Chocolate Cake' })).toBeVisible();
  await expect(page.locator('[data-testid="product-price"]').filter({ hasText: '35.00' })).toBeVisible();
  
  // Check second product
  await expect(page.locator('[data-testid="product-name"]').filter({ hasText: 'Croissant' })).toBeVisible();
  await expect(page.locator('[data-testid="product-price"]').filter({ hasText: '3.50' })).toBeVisible();
  
  // Check third product
  await expect(page.locator('[data-testid="product-name"]').filter({ hasText: 'Sourdough Bread' })).toBeVisible();
  await expect(page.locator('[data-testid="product-price"]').filter({ hasText: '8.00' })).toBeVisible();
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/storefront-display.png', fullPage: true });
  
  console.log(`✓ Storefront displays all 3 products correctly`);
});
