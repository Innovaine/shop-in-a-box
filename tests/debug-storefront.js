const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Listen to console messages
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  
  // Listen to page errors
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  
  // Create a test merchant first
  const response = await page.request.post('http://localhost:3000/api/merchant/create', {
    headers: { 'Content-Type': 'application/json' },
    data: {
      shopName: 'Debug Shop',
      category: 'test',
      email: 'test@example.com',
      items: [{ name: 'Item 1', description: 'Test', price: 10.00 }]
    }
  });
  
  const data = await response.json();
  const merchantId = data.merchantId;
  console.log('Created merchant:', merchantId);
  
  // Navigate to storefront
  console.log('Navigating to:', `http://localhost:3000/shop/${merchantId}`);
  await page.goto(`http://localhost:3000/shop/${merchantId}`);
  
  // Wait a bit
  await page.waitForTimeout(3000);
  
  // Get the h1 content
  const h1Text = await page.locator('h1#shop-name').textContent();
  console.log('H1 text:', h1Text);
  
  // Take screenshot
  await page.screenshot({ path: '/tmp/debug-storefront.png' });
  
  await browser.close();
})();
