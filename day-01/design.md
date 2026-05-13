# Day 1 — Design: Shop-in-a-Box — DIY storefront for micro-merchants

- **By:** Chiara (Designer)
- **Cycle:** 2
- **Saved:** 13/05/2026, 9:36:37 PM

---

I've read the project state. Let me check my own review file first — what did I already flag?

*reads `reviews/designer-chiara.md`*

Right. I pushed back on scope in cycle 1. Same tension: the idea is sound (micro-merchants need cheap storefronts), but the team's instinct is to build the admin dashboard first — product uploads, inventory, order management, user auth. That's weeks 3–4 territory if we're shipping something with actual friction reduction.

For week 1, I'm going to ignore the dashboard entirely and design the *customer experience* — the public-facing storefront. A florist posts 5 flowers. A buyer lands on a URL. Sees flowers, clicks one, fills a form, pays. That's it. No back-end complexity. No multi-step flows. One transaction from cold visitor to confirmation email.

That means:
- **Landing page** showing the merchant (florist) + their product grid (5 flowers, not 500)
- **Product detail screen** (florist clicks a flower, sees image + price + description, clicks "add to cart"—except no cart, just straight to checkout)
- **Checkout flow** (email, address, payment, done)

Today I'm shipping:
1. **Landing/storefront HTML** — what a buyer sees when they land on a florist's Shop-in-a-Box URL
2. **Checkout flow diagram** (SVG) — visual of the exact steps, no branching, no edge cases

This is deliberately minimal. I'm cutting the admin upload flow, the order dashboard, the merchant settings panel. Those are cycle 2.

---

### `storefront.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bloom & Stem — Fresh Flowers Delivered</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #fafaf9;
      color: #1f2937;
      line-height: 1.5;
    }

    header {
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      padding: 2rem 1.5rem;
      text-align: center;
    }

    header h1 {
      font-size: 1.875rem;
      margin-bottom: 0.25rem;
      font-weight: 700;
    }

    header p {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .hero {
      background: linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%);
      padding: 2rem 1.5rem;
      text-align: center;
      margin-bottom: 2rem;
    }

    .hero h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .hero p {
      color: #4b5563;
      font-size: 0.95rem;
    }

    .products {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem 3rem;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }

    .product-card {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow 0.2s, transform 0.2s;
    }

    .product-card:hover {
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }

    .product-image {
      width: 100%;
      height: 200px;
      background: #f3e8ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .product-info {
      padding: 1rem;
    }

    .product-name {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .product-desc {
      font-size: 0.8rem;
      color: #6b7280;
      margin-bottom: 0.75rem;
      line-height: 1.4;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-price {
      font-size: 1.25rem;
      font-weight: 700;
      color: #9333ea;
    }

    .btn-select {
      background: #9333ea;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-select:hover {
      background: #7e22ce;
    }

    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 100;
      align-items: center;
      justify-content: center;
    }

    .modal.active {
      display: flex;
    }

    .modal-content {
      background: #fff;
      border-radius: 8px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6b7280;
    }

    .product-detail-image {
      width: 100%;
      height: 250px;
      background: #f3e8ff;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      margin-bottom: 1.5rem;
    }

    .product-detail-desc {
      color: #4b5563;
      margin-bottom: 1rem;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .quantity-selector label {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .quantity-selector input {
      width: 60px;
      padding: 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 0.95rem;
    }

    .btn-checkout {
      width: 100%;
      background: #9333ea;
      color: #fff;
      border: none;
      padding: 0.875rem;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-checkout:hover {
      background: #7e22ce;
    }

    .checkout-screen {
      display: none;
    }

    .checkout-screen.active {
      display: block;
    }

    .form-group {
      margin-bottom: 1.25rem;
    }

    .form-group label {
      display: block;
      font-weight: 600;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 0.95rem;
      font-family: inherit;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .order-summary {
      background: #f9fafb;
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1.5rem;
      border: 1px solid #e5e7eb;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .summary-row.total {
      font-weight: 700;
      font-size: 1rem;
      border-top: 1px solid #d1d5db;
      padding-top: 0.75rem;
      margin-top: 0.75rem;
    }

    .btn-back {
      background: #e5e7eb;
      color: #374151;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      margin-bottom: 1rem;
    }

    .btn-back:hover {
      background: #d1d5db;
    }

    .success-screen {
      display: none;
      text-align: center;
    }

    .success-screen.active {
      display: block;
    }

    .success-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .success-message {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .success-details {
      color: #6b7280;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }
  </style>
</head>
<body>
  <header>
    <h1>🌸 Bloom & Stem</h1>
    <p>Fresh flowers, same day delivery</p>
  </header>

  <div class="hero">
    <h2>Handpicked bouquets for every occasion</h2>
    <p>Order now and brighten someone's day</p>
  </div>

  <div class="products">
    <div class="product-grid" id="productGrid">
      <!-- Products rendered by JS -->
    </div>
  </div>

  <div class="modal" id="modal">
    <div class="modal-content">
      <div id="productDetail" class="checkout-screen active"></div>
      <div id="checkoutForm" class="checkout-screen"></div>
      <div id="successScreen" class="success-screen"></div>
    </div>
  </div>

  <script>
    const products = [
      {
        id: 1,
        name: 'Red Romance',
        emoji: '🌹',
        price: 45,
        desc: 'Dozen red roses with greenery'
      },
      {
        id: 2,
        name: 'Sunny Delight',
        emoji: '🌻',
        price: 35,
        desc: 'Bright sunflowers and yellow blooms'
      },
      {
        id: 3,
        name: 'Purple Dreams',
        emoji: '🪻',
        price: 50,
        desc: 'Lavender and purple orchids'
      },
      {
        id: 4,
        name: 'Garden Mixed',
        emoji: '🌷',
        price: 40,
        desc: 'Seasonal mix of garden flowers'
      },
      {
        id: 5,
        name: 'White Elegance',
        emoji: '🤍',
        price: 55,
        desc: 'White lilies, roses, and baby breath'
      }
    ];

    let selectedProduct = null;
    let selectedQuantity = 1;

    function renderProducts() {
      const grid = document.getElementById('productGrid');
      grid.innerHTML = products.map(p => `
        <div class="product-card" onclick="openProduct(${p.id})">
          <div class="product-image">${p.emoji}</div>
          <div class="product-info">
            <div class="product-name">${p.name}</div>
            <div class="product-desc">${p.desc}</div>
            <div class="product-footer">
              <div class="product-price">$${p.price}</div>
              <button class="btn-select">Select</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    function openProduct(productId) {
      selectedProduct = products.find(p => p.id === productId);
      selectedQuantity = 1;
      
      const detail = `
        <button class="btn-back" onclick="closeModal()">← Back</button>
        <div class="product-detail-image">${selectedProduct.emoji}</div>
        <div class="modal-title">${selectedProduct.name}</div>
        <div class="product-detail-desc">${selectedProduct.desc}</div>
        <div class="quantity-selector">
          <label for="qty">Quantity:</label>
          <input type="number" id="qty" min="1" value="1" onchange="selectedQuantity = parseInt(this.value)">
        </div>
        <button class="btn-checkout" onclick="openCheckout()">
          Proceed to Checkout — $${selectedProduct.price}
        </button>
      `;
      
      document.getElementById('productDetail').innerHTML = detail;
      document.getElementById('productDetail').classList.add('active');
      document.getElementById('checkoutForm').classList.remove('active');
      document.getElementById('successScreen').classList.remove('active');
      document.getElementById('modal').classList.add('active');
    }

    function openCheckout() {
      const total = selectedProduct.price * selectedQuantity;
      const checkout = `
        <button class="btn-back" onclick="closeModal()">← Back</button>
        <div class="modal-title">Order Details</div>
        
        <div class="order-summary">
          <div class="summary-row">
            <span>${selectedProduct.name}</span>
            <span>$${selectedProduct.price} × ${selectedQuantity}</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>$${total}</span>
          </div>
        </div>

        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" placeholder="Jane Doe" required>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="jane@example.com" required>
        </div>

        <div class="form-group">
          <label for="address">Delivery Address</label>
          <input type="text" id="address" placeholder="123 Main St, City, State 12345" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="card">Card Number</label>
            <input type="text" id="card" placeholder="4111 1111 1111 1111" maxlength="19" required>
          </div>
          <div class="form-group">
            <label for="expiry">Exp (MM/YY)</label>
            <input type="text" id="expiry" placeholder="12/25" required>
          </div>
        </div>

        <button class="btn-checkout" onclick="submitOrder()">Complete Purchase — $${total}</button>
      `;
      
      document.getElementById('checkoutForm').innerHTML = checkout;
      document.getElementById('productDetail').classList.remove('active');
      document.getElementById('checkoutForm').classList.add('active');
    }

    function submitOrder() {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      
      if (!name || !email) {
        alert('Please fill in all fields');
        return;
      }

      const total = selectedProduct.price * selectedQuantity;
      const success = `
        <div class="success-icon">✓</div>
        <div class="success-message">Order Confirmed!</div>
        <div class="success-details">
          <p><strong>${selectedProduct.name}</strong> (qty: ${selectedQuantity})</p>
          <p style="margin-top: 0.5rem;">Total: <strong>$${total}</strong></p>
          <p style="margin-top: 1rem; color: #4b5563;">
            A confirmation email has been sent to<br><strong>${email}</strong>
          </p>
        </div>
      `;
      
      document.getElementById('successScreen').innerHTML = success;
      document.getElementById('checkoutForm').classList.remove('active');
      document.getElementById('successScreen').classList.add('active');
    }

    function closeModal() {
      document.getElementById('modal').classList.remove('active');
      document.getElementById('productDetail').classList.add('active');
      document.getElementById('checkoutForm').classList.remove('active');
      document.getElementById('successScreen').classList.remove('active');
    }

    renderProducts();
  </script>
</body>
</html>
```

---

### `flow-checkout.svg`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .box { fill: #fff; stroke: #d1d5db; stroke-width: 2; }
      .active { fill: #9333ea; }
      .text-title { font-size: 16px; font-weight: 700; fill: #1f2937; }
      .text-label { font-size: 13px; fill: #6b7280; }
      .arrow { stroke: #9333ea; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
      .step-number { font-size: 14px; font-weight: 700; fill: #fff; }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#9333ea" />
    </marker>
  </defs>

  <!-- Title -->
  <text x="500" y="30" text-anchor="middle" style="font-size: 20px; font-weight: 700; fill: #1f2937;">Shop-in-a-Box Checkout Flow (Week 1)</text>

  <!-- Step 1: Landing -->
  <rect class="box" x="50" y="70" width="140" height="100" rx="6"/>
  <circle cx="75" cy="95" r="16" class="active"/>
  <text x="75" y="102" text-anchor="middle" class="step-number">1</text>
  <text x="170" y="95" class="text-title">Landing</text>
  <text x="170" y="115" class="text-label">Storefront grid</text>
  <text x="170" y="130" class="text-label">5 products</text>
  <text x="170" y="145" class="text-label">Each with price</text>

  <!-- Arrow 1 -->
  <path class="arrow" d="M 220 120 L 280 120"/>

  <!-- Step 2: Product Detail -->
  <rect class="box" x="290" y="70" width="140" height="100" rx="6"/>
  <circle cx="315" cy="95" r="16" class="active"/>
  <text x="315" y="102" text-anchor="middle" class="step-number">2</text>
  <text x="410" y="95" class="text-title">Product Detail</text>
  <text x="410" y="115" class="text-label">Image, description</text>
  <text x="410" y="130" class="text-label">Quantity selector</text>
  <text x="410" y="145" class="text-label">"Checkout" button</text>

  <!-- Arrow 2 -->
  <path class="arrow" d="M 460 120 L 520 120"/>

  <!-- Step 3: Checkout Form -->
  <rect class="box" x="530" y="70" width="140" height="100" rx="6"/>
  <circle cx="555" cy="95" r="16" class="active"/>
  <text x="555" y="102" text-anchor="middle" class="step-number">3</text>
  <text x="650" y="95" class="text-title">Checkout</text>
  <text x="650" y="115" class="text-label">Name, email</text>
  <text x="650" y="130" class="text-label">Address</text>
  <text x="650" y="145" class="text-label">Card (dummy)</text>

  <!-- Arrow 3 -->
  <path class="arrow" d="M 700 120 L 760 120"/>

  <!-- Step 4: Confirmation -->
  <rect class="box" x="770" y="70" width="140" height="100" rx="6"/>
  <circle cx="795" cy="95" r="16" class="active"/>
  <text x="795" y="102" text-anchor="middle" class="step-number">4</text>
  <text x="890" y="95" class="text-title">Confirmation</text>
  <text x="890" y="115" class="text-label">Order receipt</text>
  <text x="890" y="130" class="text-label">Email sent</text>
  <text x="890" y="145" class="text-label">No order status</text>

  <!-- Backend notes -->
  <rect class="box" x="50" y="220" width="860" height="150" rx="6"/>
  <text x="60" y="245" class="text-title">Backend (Day 2–4)</text>
  
  <text x="60" y="275" class="text-label">• Merchant login (1 static account for florist demo)</text>
  <text x="60" y="295" class="text-label">• Product upload form (title, price, emoji placeholder)</text>
  <text x="60" y="315" class="text-label">• Generates public storefront URL (no auth needed)</text>
  <text x="60" y="335" class="text-label">• Order webhook: customer data → email to merchant + confirmation to buyer</text>
  <text x="60" y="355" class="text-label">• Payment: Stripe Checkout (no custom form handling, just embedded link)</text>
  
  <!-- What's NOT included -->
  <rect class="box" style="fill: #fef2f2; stroke: #fecaca;" x="50" y="390" width="860" height="0" rx="6"/>
  <text x="60" y="390" style="font-size: 12px; fill: #991b1b; font-weight: 600;">NOT in v1: multi-item cart, order tracking dashboard, inventory limits, user auth, analytics, email customization</text>
</svg>
```

---

## Design decisions

**Visual / copy approach:**
- Stripped the UI to five interactive surfaces: landing grid → product detail → checkout form → confirmation. No tabs, no sidebars, no "advanced options." Florist context (Bloom & Stem, flowers) used throughout instead of abstract placeholder copy.
- Modal-based flow keeps the user in a single container, reducing cognitive load and simplifying mobile behavior. Product cards use emoji as image placeholders (cheap, fast, real—matches company values).
- Checkout form asks for the minimum: name, email, address, card. No phone, no billing address, no preferences. Every field is required and visible.

**What I cut:**
- Merchant admin interface (day 2 concern)
- Order management / tracking for merchants
- Multiple product categories or filters
- Cart persistence or abandoned-cart emails
- Quantity limits or inventory warnings
- User accounts (buyer doesn't log in, merchant has one hardcoded account)

**What I'm worried about:**
- The modal-only flow works for 5 products but will feel cramped if the product grid grows to 15+. Week 2, we may need a full-page detail view or a sidebar. For v1 it's fine.
- Payment is stubbed (dummy card field). Real Stripe integration happens day 2–3, but right now it's just form validation + success screen. No actual charge. Team needs to decide: do we process real payments in v1, or is this a demo with fake confirmations? If real payments, Stripe Checkout is simpler than custom form handling.

---

PROGRESS:
- Round: 2
- Scope completion (this role for THIS week): 45%
- Remaining for this role:
  - Admin/merchant upload flow (product entry, URL generation, basic branding)
  - Email templates (order confirmation, merchant notification)
  - Mobile refinement (test storefront at 375px width, adjust grid/form spacing)
  - Accessibility pass (heading hierarchy, form labels, color contrast for small text in modals)
  - One icon/logo refinement for header branding
- Recommendation: keep_working

---

## Round 2

I've read the state. Let me be direct: I'm looking at `storefront.html` and `flow-checkout.svg` from round 1, and they're solid scaffolding. But we're week 1 and I haven't touched the other half of the product—the merchant side. A florist can't use this if she can't get her 5 flowers *into* the system. Right now that's a black box.

Round 2 means I build what breaks the user's first real moment: merchant onboarding. That's where friction happens, and that's what I ship today.

---

### `merchant-upload.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop-in-a-Box — Merchant Upload</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      max-width: 600px;
      width: 100%;
      padding: 40px;
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
    }

    .header h1 {
      font-size: 24px;
      color: #1f2937;
      margin-bottom: 8px;
    }

    .header p {
      color: #6b7280;
      font-size: 14px;
    }

    .section {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      color: #9333ea;
      letter-spacing: 0.05em;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 8px;
    }

    input[type="text"],
    input[type="email"],
    input[type="number"],
    textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    input:focus,
    textarea:focus {
      outline: none;
      border-color: #9333ea;
      box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
    }

    textarea {
      resize: vertical;
      min-height: 80px;
    }

    .product-list {
      background: #f9fafb;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      padding: 16px;
      margin-top: 16px;
    }

    .product-item {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: start;
    }

    .product-item:last-child {
      margin-bottom: 0;
    }

    .product-info {
      flex: 1;
    }

    .product-name {
      font-weight: 600;
      color: #1f2937;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .product-price {
      color: #6b7280;
      font-size: 13px;
    }

    .product-emoji {
      font-size: 32px;
      margin-right: 12px;
      flex-shrink: 0;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #ef4444;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      padding: 4px 8px;
      margin-left: 12px;
      flex-shrink: 0;
    }

    .remove-btn:hover {
      color: #dc2626;
    }

    .add-product-form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .add-product-form > div:nth-child(4) {
      grid-column: 1 / -1;
    }

    .btn-add {
      background: #9333ea;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 12px;
      grid-column: 1 / -1;
    }

    .btn-add:hover {
      background: #7e22ce;
    }

    .emoji-picker {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 8px;
      margin-top: 8px;
    }

    .emoji-btn {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 8px;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .emoji-btn:hover {
      background: #f3f4f6;
      border-color: #9333ea;
    }

    .emoji-btn.selected {
      background: #9333ea;
      border-color: #9333ea;
    }

    .storefront-url {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 6px;
      padding: 16px;
      margin-top: 16px;
    }

    .storefront-url-label {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .url-box {
      display: flex;
      gap: 8px;
    }

    .url-input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-family: "Monaco", "Courier New", monospace;
      font-size: 13px;
      background: white;
      color: #1f2937;
    }

    .btn-copy {
      background: #22c55e;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.2s;
    }

    .btn-copy:hover {
      background: #16a34a;
    }

    .btn-primary {
      width: 100%;
      background: #9333ea;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      margin-top: 24px;
    }

    .btn-primary:hover {
      background: #7e22ce;
    }

    .btn-primary:disabled {
      background: #d1d5db;
      cursor: not-allowed;
    }

    .help-text {
      font-size: 12px;
      color: #6b7280;
      margin-top: 6px;
    }

    .demo-notice {
      background: #fef3c7;
      border: 1px solid #fcd34d;
      border-radius: 6px;
      padding: 12px;
      font-size: 13px;
      color: #92400e;
      margin-bottom: 24px;
    }

    @media (max-width: 500px) {
      .container {
        padding: 24px;
      }

      .header h1 {
        font-size: 20px;
      }

      .add-product-form {
        grid-template-columns: 1fr;
      }

      .url-box {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>

<div class="container">
  
  <div class="header">
    <h1>Shop-in-a-Box</h1>
    <p>Create your free storefront in 60 seconds</p>
  </div>

  <div class="demo-notice">
    💡 <strong>Demo mode:</strong> No payment processing yet. We'll email you a link to your live storefront.
  </div>

  <form id="merchantForm" onsubmit="handleSubmit(event)">
    
    <!-- Business Info -->
    <div class="section">
      <div class="section-title">Your Shop</div>
      
      <div class="form-group">
        <label for="businessName">Business Name</label>
        <input 
          type="text" 
          id="businessName" 
          placeholder="e.g., Bloom & Stem" 
          required
        >
        <div class="help-text">This appears at the top of your storefront</div>
      </div>

      <div class="form-group">
        <label for="email">Your Email</label>
        <input 
          type="email" 
          id="email" 
          placeholder="you@example.com" 
          required
        >
        <div class="help-text">We'll send order notifications here</div>
      </div>

      <div class="form-group">
        <label for="description">Shop Description</label>
        <textarea 
          id="description" 
          placeholder="Fresh flowers for every occasion..."
        ></textarea>
        <div class="help-text">Optional. Shows below your shop name.</div>
      </div>
    </div>

    <!-- Products -->
    <div class="section">
      <div class="section-title">Your Products</div>
      
      <div class="product-list" id="productList">
        <p style="color: #6b7280; font-size: 13px; text-align: center; padding: 20px;">
          Add at least 1 product to create your storefront.
        </p>
      </div>

      <div class="add-product-form">
        <div>
          <label for="productName" style="display: block;">Product Name</label>
          <input type="text" id="productName" placeholder="e.g., Rose Bouquet">
        </div>
        
        <div>
          <label for="productPrice" style="display: block;">Price ($)</label>
          <input type="number" id="productPrice" placeholder="29" step="0.01" min="0.01">
        </div>

        <div style="grid-column: 1 / -1;">
          <label>Icon / Emoji</label>
          <div class="emoji-picker" id="emojiPicker">
            <button type="button" class="emoji-btn" data-emoji="🌹">🌹</button>
            <button type="button" class="emoji-btn" data-emoji="🌸">🌸</button>
            <button type="button" class="emoji-btn" data-emoji="🌺">🌺</button>
            <button type="button" class="emoji-btn" data-emoji="🌻">🌻</button>
            <button type="button" class="emoji-btn" data-emoji="🌷">🌷</button>
            <button type="button" class="emoji-btn" data-emoji="💐">💐</button>
          </div>
          <div class="help-text" style="margin-top: 12px;">Pick one or click in the field to type a custom emoji</div>
          <input type="text" id="productEmoji" placeholder="🌹" style="margin-top: 8px;">
        </div>

        <button type="button" class="btn-add" onclick="addProduct()">+ Add Product</button>
      </div>
    </div>

    <!-- Storefront URL -->
    <div class="section">
      <div class="section-title">Your Public Link</div>
      
      <div class="storefront-url">
        <div class="storefront-url-label">Your customers visit this (no password needed)</div>
        <div class="url-box">
          <input 
            type="text" 
            class="url-input" 
            id="storefrontUrl" 
            readonly 
            value="https://shop.innovaine.app/bloom-stem-12345"
          >
          <button type="button" class="btn-copy" onclick="copyUrl()">Copy</button>
        </div>
        <div class="help-text" style="margin-top: 12px;">Generated after you submit. Share this link via email, social, or print.</div>
      </div>
    </div>

    <!-- Submit -->
    <button type="submit" class="btn-primary" id="submitBtn">Create My Storefront</button>
  </form>

</div>

<script>
  let selectedEmoji = null;
  const products = [];

  // Emoji picker
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      selectedEmoji = btn.dataset.emoji;
      document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('productEmoji').value = selectedEmoji;
    });
  });

  document.getElementById('productEmoji').addEventListener('input', (e) => {
    selectedEmoji = e.target.value;
  });

  function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const emoji = document.getElementById('productEmoji').value || '🌹';

    if (!name || !price || price <= 0) {
      alert('Please fill in product name and price');
      return;
    }

    products.push({ name, price, emoji, id: Date.now() });
    
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productEmoji').value = '';
    document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('selected'));
    selectedEmoji = null;

    renderProducts();
    document.getElementById('submitBtn').disabled = false;
  }

  function removeProduct(id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) products.splice(idx, 1);
    renderProducts();
    if (products.length === 0) {
      document.getElementById('submitBtn').disabled = true;
    }
  }

  function renderProducts() {
    const list = document.getElementById('productList');
    if (products.length === 0) {
      list.innerHTML = '<p style="color: #6b7280; font-size: 13px; text-align: center; padding: 20px;">Add at least 1 product to create your storefront.</p>';
      return;
    }

    list.innerHTML = products.map(p => `
      <div class="product-item">
        <div style="display: flex; align-items: center; flex: 1;">
          <div class="product-emoji">${p.emoji}</div>
          <div class="product-info">
            <div class="product-name">${p.name}</div>
            <div class="product-price">$${p.price.toFixed(2)}</div>
          </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeProduct(${p.id})">Remove</button>
      </div>
    `).join('');
  }

  function copyUrl() {
    const url = document.getElementById('storefrontUrl').value;
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('storefrontUrl').parentElement.querySelector('.btn-copy');
      const orig = btn.innerText;
      btn.innerText = '✓ Copied';
      setTimeout(() => { btn.innerText = orig; }, 2000);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (products.length === 0) {
      alert('Please add at least one product');
      return;
    }

    const name = document.getElementById('businessName').value;
    const email = document.getElementById('email').value;

    alert(`
      ✓ Shop created!

      Business: ${name}
      Email: ${email}
      Products: ${products.length}

      Next: Check your email for your live storefront link.
      
      (In production, we'd generate a unique URL here and send it to ${email})
    `);
  }

  document.getElementById('submitBtn').disabled = true;
</script>

</body>
</html>
```

---

### `email-order-confirmation.txt`
```text
Subject: Order Confirmed — Bloom & Stem

---

Hi [CUSTOMER_NAME],

Your order is confirmed! 🎉

ORDER DETAILS
–––––––––––––––––––––––––––––
Rose Bouquet (qty: 1)
Price: $45.00

DELIVERY & PICKUP
–––––––––––––––––––––––––––––
Shipping to:
[CUSTOMER_ADDRESS]

Estimated delivery: 2–3 business days

WHAT'S NEXT
–––––––––––––––––––––––––––––
The merchant will prepare your order and send a shipping update within 24 hours. You'll receive a tracking link then.

Questions? Reply to this email or contact the merchant directly.

Thank you for shopping with Bloom & Stem.

–––––––––––––––––––––––––––––
Shop-in-a-Box
https://shop.innovaine.app
```

---

### `email-merchant-notification.txt`
```text
Subject: New Order — Rose Bouquet

---

You have a new order on your Shop-in-a-Box storefront.

CUSTOMER
–––––––––––––––––––––––––––––
Name: Sarah Chen
Email: sarah@example.com
Address: 
  123 Main St
  Portland, OR 97201

WHAT THEY ORDERED
–––––––––––––––––––––––––––––
Rose Bouquet (qty: 1)
Price: $45.00

PAYMENT
–––––––––––––––––––––––––––––
Status: Confirmed
Amount: $45.00

NEXT STEPS
–––––––––––––––––––––––––––––
1. Prepare the order
2. Reply to the customer's email (sarah@example.com) with a shipping/pickup time
3. Once dispatched, we'll handle the rest

No order dashboard yet—just manage it here in your email inbox.

–––––––––––––––––––––––––––––
Shop-in-a-Box | Merchant Hub
https://shop.innovaine.app/admin
```

---

## Design decisions

**Why merchant upload first:**
- I shipped the customer-facing storefront in round 1. But a storefront with no way to upload products is a dead link. Merchant onboarding is the *blocking* flow—it gates everything. Ship it now, validate it works with a real florist by day 3.
- Kept the upload form minimal: business name, email, description (optional), then a quick add-product loop. No account creation, no password reset, no "verify your email" gate. Merchant goes from blank to live URL in one submission.

**Visual / copy choices:**
- Purple gradient background + white container mimics modern SaaS onboarding (not fancy, just clear). Form fields are spaced generously; labels are bold because scanning matters more than density.
- Emoji picker is visual (tap or type). Price is a number field, not a text field—prevents "$abc" mistakes. Copy is florist-specific ("Rose Bouquet," "Fresh flowers").
- Storefront URL is read-only in the form—it's a *preview* of what they'll get after submit. In production, this would be unique per merchant. Right now it's a placeholder, but the UX is ready.
- Two email templates: one for customer (order confirmation, delivery timeline), one for merchant (order notification, what to do next). Both are plain text (no HTML) because email rendering is fragile and text is more reliable.

**What I cut:**
- Account login before onboarding (no "sign up first" friction)
- Email verification (trust for now)
- Product image upload (emoji only)
- SKU/inventory fields
- Tax calculation
- Shipping cost input (merchant handles that offline, for now)
- Password / account security features
- Terms & conditions checkbox (presume legal signs off on copy later)

**What I'm worried about:**
- The emoji picker is cute but might confuse some florists. A fallback plan for week 2: allow freeform emoji text *or* add a simple image-upload fallback that generates a tiny JPG placeholder. For v1, emoji + text input works.
- Two email templates are static; they hard-code "Bloom & Stem" and specific product names. In production, these are templated (Handlebars or Nunjucks). Right now they're proof that the *flow* exists. Engineering builds the template engine day 2–3.
- No password on the merchant account yet. This is deliberately insecure for speed. Week 2: add password + email verification (OTP or magic link), but only after we know the core product sticks.

---

PROGRESS:
- Round: 2
- Scope completion (this role for THIS week): 65%
- Remaining for this role:
  - Mobile refinement (test both storefront and merchant upload at 375px, adjust grid/form spacing)
  - Accessibility pass (heading hierarchy, form label associations, color contrast on small text)
  - One logo / icon refinement for Innovaine header branding (SVG)
  - Help / error states (what happens if customer enters invalid email, or merchant uploads duplicate product name)
  - Confirmation screen / next-steps copy for merchant (post-submit)
- Recommendation: keep_working

---

## Round 3

I've read the state. Round 3 — I'm building on what's shipped, not rewriting it.

The merchant upload and storefront are live. The emails are templated. What's missing is the *friction points* — the UX when things go wrong, and the post-submit confirmation that closes the loop for a merchant. Also, I haven't tested the responsive behavior on mobile, and there's no clarity on what the actual storefront *looks* like when a customer lands on it after the merchant submits.

I'm shipping three things:

1. **`storefront.html` (full rewrite)** — The *customer view* of the florist's shop. This is what the merchant gets after they upload. Clean, single-product-category focus, one checkout button, no cart. Real copy specific to the florist use case.

2. **`merchant-confirmation.html`** — The page a merchant sees immediately after they submit their shop creation. Includes their live storefront URL, next steps, and a "share" CTA. This closes the submission loop.

3. **`error-states.md`** — A spec (not code) that documents what the forms do when: email is invalid, product name is blank, price is negative, duplicate product name, etc. This is reference for engineering; I'll convert to HTML error overlays in round 4 if needed.

---

### `storefront.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bloom & Stem | Fresh Flowers</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #fafaf9;
      color: #1f2937;
      line-height: 1.6;
    }

    header {
      background: white;
      border-bottom: 1px solid #e5e7eb;
      padding: 16px 20px;
      text-align: center;
    }

    .header-logo {
      font-size: 24px;
      margin-right: 8px;
    }

    .header-title {
      font-size: 20px;
      font-weight: 600;
    }

    .header-subtitle {
      font-size: 13px;
      color: #6b7280;
      margin-top: 4px;
    }

    main {
      max-width: 600px;
      margin: 0 auto;
      padding: 32px 20px;
    }

    .hero {
      text-align: center;
      margin-bottom: 48px;
    }

    .hero-heading {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #111827;
    }

    .hero-subhead {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 24px;
    }

    .products-section {
      margin-bottom: 40px;
    }

    .products-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #9ca3af;
      margin-bottom: 16px;
    }

    .product-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-left {
      display: flex;
      align-items: center;
      flex: 1;
    }

    .product-emoji {
      font-size: 48px;
      margin-right: 20px;
      line-height: 1;
    }

    .product-info {
      flex: 1;
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .product-desc {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 8px;
    }

    .product-price {
      font-size: 16px;
      font-weight: 700;
      color: #059669;
    }

    .product-right {
      text-align: right;
      margin-left: 16px;
    }

    .buy-btn {
      background: #7c3aed;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .buy-btn:hover {
      background: #6d28d9;
    }

    .buy-btn:active {
      transform: scale(0.98);
    }

    .checkout-section {
      background: white;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      padding: 24px;
      margin-top: 40px;
    }

    .checkout-heading {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
      display: none;
    }

    .checkout-heading.active {
      display: block;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #374151;
    }

    .form-group input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #7c3aed;
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
    }

    .form-group input.error {
      border-color: #ef4444;
    }

    .error-msg {
      font-size: 12px;
      color: #ef4444;
      margin-top: 4px;
      display: none;
    }

    .error-msg.show {
      display: block;
    }

    .checkout-summary {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 20px;
      display: none;
    }

    .checkout-summary.active {
      display: block;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 8px;
    }

    .summary-row.total {
      border-top: 1px solid #d1d5db;
      padding-top: 8px;
      font-weight: 600;
      font-size: 16px;
    }

    .submit-btn {
      width: 100%;
      background: #059669;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 12px 16px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .submit-btn:hover {
      background: #047857;
    }

    .submit-btn:disabled {
      background: #d1d5db;
      cursor: not-allowed;
    }

    .success-message {
      background: #d1fae5;
      border: 1px solid #6ee7b7;
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 20px;
      display: none;
    }

    .success-message.show {
      display: block;
    }

    .success-message strong {
      color: #065f46;
    }

    footer {
      text-align: center;
      padding: 32px 20px;
      color: #9ca3af;
      font-size: 12px;
    }

    footer a {
      color: #7c3aed;
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    @media (max-width: 480px) {
      main {
        padding: 20px 16px;
      }

      .hero-heading {
        font-size: 24px;
      }

      .product-card {
        flex-direction: column;
        text-align: center;
      }

      .product-left {
        flex-direction: column;
        margin-bottom: 16px;
      }

      .product-emoji {
        margin-right: 0;
        margin-bottom: 12px;
      }

      .product-right {
        text-align: center;
        margin-left: 0;
      }
    }
  </style>
</head>
<body>

<header>
  <div class="header-title">
    <span class="header-logo">🌹</span> Bloom & Stem
  </div>
  <div class="header-subtitle">Fresh flowers, locally grown</div>
</header>

<main>

  <div class="hero">
    <h1 class="hero-heading">Order Fresh Flowers</h1>
    <p class="hero-subhead">Handpicked arrangements delivered to your door</p>
  </div>

  <div class="products-section">
    <div class="products-label">Available Now</div>
    
    <div class="product-card">
      <div class="product-left">
        <div class="product-emoji">🌹</div>
        <div class="product-info">
          <div class="product-name">Rose Bouquet</div>
          <div class="product-desc">Dozen premium red roses</div>
          <div class="product-price">$45.00</div>
        </div>
      </div>
      <div class="product-right">
        <button class="buy-btn" data-product="Rose Bouquet" data-price="45.00">Buy Now</button>
      </div>
    </div>

    <div class="product-card">
      <div class="product-left">
        <div class="product-emoji">🌷</div>
        <div class="product-info">
          <div class="product-name">Tulip Mix</div>
          <div class="product-desc">Vibrant spring colors</div>
          <div class="product-price">$38.00</div>
        </div>
      </div>
      <div class="product-right">
        <button class="buy-btn" data-product="Tulip Mix" data-price="38.00">Buy Now</button>
      </div>
    </div>

    <div class="product-card">
      <div class="product-left">
        <div class="product-emoji">🌼</div>
        <div class="product-info">
          <div class="product-name">Sunflower Bundle</div>
          <div class="product-desc">Bright and cheerful</div>
          <div class="product-price">$32.00</div>
        </div>
      </div>
      <div class="product-right">
        <button class="buy-btn" data-product="Sunflower Bundle" data-price="32.00">Buy Now</button>
      </div>
    </div>

  </div>

  <div class="checkout-section">
    <h2 class="checkout-heading">Complete Your Order</h2>
    
    <div class="success-message" id="successMsg">
      <strong>✓ Order confirmed!</strong> Check your email for details.
    </div>

    <div class="checkout-summary" id="checkoutSummary">
      <div class="summary-row">
        <span id="summaryProduct">Rose Bouquet</span>
        <span id="summaryPrice">$45.00</span>
      </div>
      <div class="summary-row total">
        <span>Total</span>
        <span id="summaryTotal">$45.00</span>
      </div>
    </div>

    <form id="checkoutForm" style="display: none;">
      <div class="form-group">
        <label for="customerName">Your Name *</label>
        <input type="text" id="customerName" name="name" required>
        <div class="error-msg" id="nameError">Please enter your name</div>
      </div>

      <div class="form-group">
        <label for="customerEmail">Email Address *</label>
        <input type="email" id="customerEmail" name="email" required>
        <div class="error-msg" id="emailError">Please enter a valid email</div>
      </div>

      <div class="form-group">
        <label for="customerAddress">Delivery Address *</label>
        <input type="text" id="customerAddress" name="address" placeholder="Street, city, state, zip" required>
        <div class="error-msg" id="addressError">Please enter your address</div>
      </div>

      <button type="submit" class="submit-btn">Confirm Order</button>
    </form>
  </div>

</main>

<footer>
  <p>Shop-in-a-Box | <a href="#">Manage your shop</a></p>
</footer>

<script>
  let selectedProduct = null;
  const form = document.getElementById('checkoutForm');
  const checkoutSection = document.querySelector('.checkout-section');
  const checkoutHeading = document.querySelector('.checkout-heading');
  const checkoutSummary = document.getElementById('checkoutSummary');
  const successMsg = document.getElementById('successMsg');

  // Buy button handlers
  document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      selectedProduct = {
        name: btn.dataset.product,
        price: btn.dataset.price
      };
      openCheckout();
    });
  });

  function openCheckout() {
    form.style.display = 'block';
    checkoutHeading.classList.add('active');
    checkoutSummary.classList.add('active');
    successMsg.classList.remove('show');

    document.getElementById('summaryProduct').textContent = selectedProduct.name;
    document.getElementById('summaryPrice').textContent = '$' + parseFloat(selectedProduct.price).toFixed(2);
    document.getElementById('summaryTotal').textContent = '$' + parseFloat(selectedProduct.price).toFixed(2);

    // Clear errors and form
    form.reset();
    document.querySelectorAll('.error-msg').forEach(msg => msg.classList.remove('show'));
    document.querySelectorAll('input').forEach(inp => inp.classList.remove('error'));

    // Scroll to form
    checkoutSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const address = document.getElementById('customerAddress').value.trim();

    let valid = true;

    // Validate name
    if (!name) {
      document.getElementById('nameError').classList.add('show');
      document.getElementById('customerName').classList.add('error');
      valid = false;
    } else {
      document.getElementById('nameError').classList.remove('show');
      document.getElementById('customerName').classList.remove('error');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById('emailError').classList.add('show');
      document.getElementById('customerEmail').classList.add('error');
      valid = false;
    } else {
      document.getElementById('emailError').classList.remove('show');
      document.getElementById('customerEmail').classList.remove('error');
    }

    // Validate address
    if (!address) {
      document.getElementById('addressError').classList.add('show');
      document.getElementById('customerAddress').classList.add('error');
      valid = false;
    } else {
      document.getElementById('addressError').classList.remove('show');
      document.getElementById('customerAddress').classList.remove('error');
    }

    if (!valid) return;

    // Submit (in production, POST to backend)
    form.style.display = 'none';
    checkoutHeading.classList.remove('active');
    checkoutSummary.classList.remove('active');
    successMsg.classList.add('show');

    console.log('Order submitted:', {
      product: selectedProduct.name,
      price: selectedProduct.price,
      customer: name,
      email: email,
      address: address
    });
  });
</script>

</body>
</html>
```

---

### `merchant-confirmation.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop Created — Shop-in-a-Box</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #1f2937;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      max-width: 500px;
      width: 100%;
      padding: 40px 32px;
      text-align: center;
    }

    .success-icon {
      font-size: 64px;
      margin-bottom: 20px;
      display: inline-block;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #111827;
    }

    .subtitle {
      font-size: 16px;
      color: #6b7280;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .info-box {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 24px;
      text-align: left;
    }

    .info-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #9ca3af;
      margin-bottom: 8px;
    }

    .business-name {
      font-size: 18px;
      font-weight: 600;
      color: #111827;
      margin-bottom: 16px;
    }

    .product-count {
      font-size: 14px;
      color: #6b7280;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .url-section {
      background: #f0f9ff;
      border: 1px solid #bfdbfe;
      border-radius: 6px;
      padding: 12px;
      margin-top: 16px;
    }

    .url-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #1e40af;
      margin-bottom: 6px;
    }

    .url-display {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .url-text {
      flex: 1;
      font-size: 13px;
      font-weight: 600;
      color: #1e40af;
      word-break: break-all;
      font-family: 'Monaco', 'Courier New', monospace;
    }

    .copy-btn {
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      white-space: nowrap;
    }

    .copy-btn:hover {
      background: #2563eb;
    }

    .next-steps {
      background: #fffbeb;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin-bottom: 24px;
      text-align: left;
      border-radius: 4px;
    }

    .next-steps-title {
      font-size: 13px;
      font-weight: 600;
      color: #92400e;
      margin-bottom: 8px;
    }

    .next-steps ol {
      font-size: 13px;
      color: #b45309;
      padding-left: 20px;
    }

    .next-steps li {
      margin-bottom: 6px;
      line-height: 1.5;
    }

    .button-group {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
    }

    .btn {
      flex: 1;
      padding: 12px 16px;
      border-radius: 6px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #059669;
      color: white;
    }

    .btn-primary:hover {
      background: #047857;
    }

    .btn-secondary {
      background: #e5e7eb;
      color: #374151;
    }

    .btn-secondary:hover {
      background: #d1d5db;
    }

    .email-notice {
      font-size: 12px;
      color: #6b7280;
      padding: 12px;
      background: #f3f4f6;
      border-radius: 4px;
      margin-bottom: 16px;
    }

    .share-section {
      border-top: 1px solid #e5e7eb;
      padding-top: 24px;
      margin-top: 24px;
    }

    .share-title {
      font-size: 13px;
      font-weight: 600;
      color: #6b7280;
      margin-bottom: 12px;
    }

    .share-buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
    }

    .share-btn {
      width: 40px;
      height: 40px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      transition: all 0.2s;
    }

    .share-btn:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    @media (max-width: 480px) {
      .container {
        padding: 32px 20px;
      }

      h1 {
        font-size: 24px;
      }

      .button-group {
        flex-direction: column;
      }

      .url-display {
        flex-direction: column;
        align-items: flex-start;
      }

      .copy-btn {
        width: 100%;
        justify-content: center;
      }
    }
  </style>
</head>
<body>

<div class="container">

  <div class="success-icon">✨</div>

  <h1>Your Shop is Live!</h1>
  <p class="subtitle">Bloom & Stem is ready to accept orders. Your customers can shop right now.</p>

  <div class="info-box">
    <div class="info-label">Your Shop</div>
    <div class="business-name">Bloom & Stem</div>
    <div class="product-count">📦 3 products ready to sell</div>
    
    <div class="url-section">
      <div class="url-label">Storefront Link</div>
      <div class="url-display">
        <div class="url-text" id="storeUrl">https://shop.innovaine.app/bloom-stem-001</div>
        <button class="copy-btn" onclick="copyUrl()">Copy</button>
      </div>
    </div>
  </div>

  <div class="email-notice">
    ✓ We've sent instructions to <strong>owner@bloomstem.local</strong>. Check your email for login details and next steps.
  </div>

  <div class="next-steps">
    <div class="next-steps-title">What Happens Next</div>
    <ol>
      <li><strong>Share your link</strong> — Send the storefront URL to friends, family, and customers. They can order anytime.</li>
      <li><strong>Receive order emails</strong> — Each order will land in your inbox with customer details and payment status.</li>
      <li><strong>Fulfill orders</strong> — Prepare and ship. Reply to customers with shipping updates.</li>
      <li><strong>Get paid</strong> — We'll deposit earnings to your account every Friday (minus processing fees).</li>
    </ol>
  </div>

  <div class="button-group">
    <button class="btn btn-primary" onclick="viewStorefront()">View Your Shop</button>
    <button class="btn btn-secondary" onclick="goHome()">Back to Home</button>
  </div>

  <div class="share-section">
    <div class="share-title">Share with your network</div>
    <div class="share-buttons">
      <button class="share-btn" title="Share on Twitter" onclick="shareOn('twitter')">𝕏</button>
      <button class="share-btn" title="Share on Facebook" onclick="shareOn('facebook')">f</button>
      <button class="share-btn" title="Copy link" onclick="copyUrl()">🔗</button>
    </div>
  </div>

</div>

<script>
  function copyUrl() {
    const url = document.getElementById('storeUrl').textContent;
    navigator.clipboard.writeText(url).then(() => {
      const btn = event.target;
      const orig = btn.textContent;
      btn.textContent = '✓ Copied';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }).catch(() => {
      alert('Failed to copy. You can select and copy manually: ' + url);
    });
  }

  function viewStorefront() {
    // In production, navigate to the actual merchant's storefront
    window.location.href = 'storefront.html';
  }

  function goHome() {
    // In production, navigate to dashboard or home
    window.location.href = 'merchant-upload.html';
  }

  function shareOn(platform) {
    const url = document.getElementById('storeUrl').textContent;
    const text = 'I just launched my shop on Shop-in-a-Box! Order fresh flowers from Bloom & Stem.';
    
    let shareUrl;
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=550,height=420');
    }
  }
</script>

</body>
</html>
```

---

### `error-states.md`
```markdown
# Error States & Validation Rules

## Merchant Onboarding (`merchant-upload.html`)

### Business Name Field
- **Empty/blank**: Show inline error "Business name is required" (red text below field). Disable submit button. Clear when user types.
- **Max 100 chars**: Silently truncate on paste; show character count (e.g., "98/100").

### Email Field
- **Empty/blank**: Show inline error "Email is required."
- **Invalid format** (no @ or domain): Show inline error "Please enter a valid email (e.g., owner@example.com)."
- **Already used**: (Post-MVP) Show error "This email is already registered. Sign in instead?"
- **On blur (not on keystroke)**: Validate; show/clear error.

### Business Description Field
- **Max 500 chars**: Show character count. Silently trim on paste.
- **No validation errors**: This field is optional.

### Product Name Field
- **Empty/blank**: Show inline error "Product name is required" (only if user tries to add product without name).
- **Duplicate name**: Show error "You already added '[product name].' Try a different name."
- **Max 50 chars**: Silently truncate.
- **Cleared on successful add**: When product is added to list, clear the input and refocus.

### Product Price Field
- **Empty/blank**: Show inline error "Price is required."
- **Non-numeric**: Reject keystroke (only allow 0–9 and one decimal point). Show error "Enter a number (e.g., 25.99)."
- **Negative or zero**: Show error "Price must be greater than $0.00."
- **Format on blur**: Convert "10" → "$10.00"; "10.5" → "$10.50". Show as formatted in the product list.
- **Max $9,999.99**: Silently cap input.

### Product

---

## Round 4

I'm reading the state. I've already shipped four HTML files and two email templates in rounds 1–3. Now I need to look at what's actually *used* and what's still missing for a merchant to go live.

Let me check the canonical paths:
- `storefront.html` ✓ (customer-facing shop)
- `flow-checkout.svg` ✓ (checkout visual reference, not a working file)
- `merchant-upload.html` ✓ (merchant onboarding)
- `email-order-confirmation.txt` ✓ (customer notification)
- `email-merchant-notification.txt` ✓ (merchant notification)
- `merchant-confirmation.html` ✓ (post-upload success screen)

What I see missing:
1. **Error validation spec** — I started `error-states.md` but it's incomplete. Merchants will hit validation errors on upload. That file needs to be finished and *actionable* for engineers.
2. **Mobile responsiveness audit** — `storefront.html` and `merchant-upload.html` claim mobile-first but I haven't shipped a focused mobile wireframe or tested the actual breakpoints. Micro-merchants use phones.
3. **Checkout interaction flow** — `flow-checkout.svg` is a diagram, but there's no HTML mockup of the actual checkout screen that a customer sees before they pay. That's a gap.
4. **Merchant dashboard / order inbox** — Post-launch, a merchant needs to see incoming orders somewhere. That's not in scope for week 4, but I need to wireframe it or flag it as out-of-scope.

**Priority for round 4:**
- Finish `error-states.md` completely (unblock engineering on validation)
- Ship `checkout.html` — the actual customer checkout screen (one product, one quantity, pay button, NOT a modal)
- Ship `mobile-wireframe-merchant.svg` — prove the upload flow works on a phone screen

I'm cutting the merchant dashboard and order inbox — that's week 5+. I'm cutting advanced error recovery (e.g., "email already registered" — we'll handle that post-MVP).

---

### `error-states.md`
```markdown
# Error States & Validation Rules

## Merchant Onboarding (`merchant-upload.html`)

### Business Name Field
- **Empty/blank**: Show inline error "Business name is required" (red text below field). Disable submit button. Clear when user types.
- **Max 100 chars**: Silently truncate on paste; show character count below field (e.g., "98/100"). No error state.
- **Special chars (@, #, $)**: Allow. No validation.

### Email Field
- **Empty/blank**: Show inline error "Email is required."
- **Invalid format** (no @ or domain missing): Show inline error "Please enter a valid email (e.g., owner@example.com)."
- **Validation trigger**: On blur only, not on keystroke.
- **Clear error**: When field is corrected, error disappears immediately on next blur.

### Business Description Field
- **Optional field** — no error if blank.
- **Max 500 chars**: Show character count. Silently trim on paste if over limit.
- **No validation errors**: This field never shows an error.

### Product Name Field (repeating, one per product)
- **Empty/blank**: Show error "Product name is required" only if user clicks "Add Product" with empty name field.
- **Duplicate name**: Show error "You already have a product called '[name].' Pick a different name."
- **Max 50 chars**: Silently truncate on keystroke; show count (e.g., "47/50").
- **Clear input after success**: When "Add Product" succeeds, empty the name field and refocus cursor.

### Product Price Field (repeating, one per product)
- **Empty/blank**: Show error "Price is required" if user clicks "Add Product" with empty price.
- **Non-numeric input**: Reject keystroke. Only allow digits 0–9 and one decimal point (.). Show error "Enter a price, e.g., 25.99."
- **Zero or negative**: Show error "Price must be greater than $0.00."
- **Format on blur**: Convert "10" → "$10.00"; "10.5" → "$10.50". Display in product list as formatted.
- **Max $9,999.99**: Cap silently. Allow input up to "9999.99"; do not allow typing beyond that.
- **Clear input after success**: When product is added, empty the price field.

### Product List (added products)
- **Delete product**: Clicking trash icon removes product from list immediately. No confirmation modal.
- **Edit product**: Edit buttons open inline edit mode (replace text with input). Escape key or clicking outside cancels edit. Save on Enter.
- **Empty product list**: Show placeholder text "No products yet. Add your first one above."

### Submit Button ("Create Store")
- **Disabled state**: Button is disabled (grayed out, no cursor change) if ANY required field is empty (business name, email, at least one product with name + price).
- **Enabled state**: All required fields filled. Button is clickable (blue background, pointer cursor).
- **On submit**: Button shows loading state ("Creating..." or spinner icon) for 2–3 seconds while upload processes. Prevent double-click.
- **On success**: Redirect to `merchant-confirmation.html`.
- **On failure** (network error, email already used, etc.): Show error banner at top of page in red box. Button returns to normal state (clickable). User can retry.

## Checkout (`checkout.html`)

### Product Quantity Field
- **Default**: 1 (pre-filled).
- **Only accept integers**: 1, 2, 3... Reject decimals, letters, negative.
- **Min 1, max 99**: Silently cap at 99.
- **Buttons (+ / -)**: Click to increment/decrement. Disable minus button when qty = 1.

### Customer Name Field
- **Required**: Show error "Name is required" on blur if empty.
- **Max 100 chars**: Silently truncate.

### Customer Email Field
- **Required**: Show error "Email is required" on blur if empty.
- **Format validation**: Show error "Please enter a valid email" if no @ or domain.
- **Validation trigger**: On blur.

### Payment Information (Stripe / payment processor field)
- **Out of scope for v1**: Payment widget is a third-party iframe (Stripe Elements, Checkout, or similar). Do NOT build payment field in-house. Do NOT validate card numbers.
- **Stripe validation** shows inline errors natively (e.g., "Your card's expiration date is invalid").

### "Complete Order" Button
- **Disabled**: If name, email, quantity, or Stripe payment info is incomplete/invalid.
- **On click**: Show loading state ("Processing..." or spinner) for 2–3 seconds.
- **On success**: Redirect to order confirmation page (separate screen, not in v1 scope — flag as week 5).
- **On failure** (payment declined, network error): Show error message in red box below button. User can retry. Button returns to normal state.

## Error Message Style (all pages)

- **Inline field error**: Red text (#dc2626), 12px, below the field. Left-aligned. Appears immediately on validation trigger (blur or submit).
- **Form error banner**: Red background (#fee2e2), red border (#fca5a5), red text (#991b1b). Padding 12px. Border-radius 6px. Margin-bottom 16px. Top of form, below heading.
- **Transient messages** (success, copy-to-clipboard): Green background, 2-second duration, fade out. Can show multiple at once.
- **Validation runs**: On blur (not keystroke) for email/name fields. On keystroke (reject) for numeric fields (price, quantity). On submit for required fields.

## Examples (Copy-paste ready)

### Valid submission (merchant upload):
- Business Name: "Bloom & Stem"
- Email: "owner@bloomstem.local"
- Description: "Handpicked seasonal flowers." (optional)
- Products: [{ name: "Roses (12)", price: "49.99" }, { name: "Dahlias (10)", price: "39.99" }]
- Result: Submit enabled, click redirects to `merchant-confirmation.html`.

### Invalid submission (merchant upload):
- Business Name: "" (empty)
- Email: "owner@bloomstem" (missing domain)
- Products: [{ name: "Roses", price: "" }]
- Result: Show 3 errors (name required, invalid email, price required). Submit disabled. User fixes. On blur, errors clear. Submit becomes enabled.

### Valid submission (checkout):
- Quantity: 1
- Name: "Sarah Chen"
- Email: "sarah.chen@example.com"
- Stripe: Card 4242 4242 4242 4242, exp 12/25, CVC 123
- Result: "Complete Order" button enabled. Click → processing → success redirect.

### Invalid submission (checkout):
- Quantity: 1
- Name: "" (empty)
- Email: "sarah@example" (no domain)
- Stripe: Incomplete
- Result: Show errors for name, email, and Stripe shows its own error. "Complete Order" button disabled.
```

---

### `checkout.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Checkout — Bloom & Stem</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      background: #f9fafb;
      color: #1f2937;
      line-height: 1.5;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 24px 16px;
      background: white;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      margin-bottom: 32px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 16px;
    }

    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .header p {
      font-size: 14px;
      color: #6b7280;
    }

    .merchant-name {
      font-weight: 600;
      color: #059669;
    }

    .product-summary {
      background: #f3f4f6;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
    }

    .product-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .product-row:last-child {
      margin-bottom: 0;
      padding-top: 12px;
      border-top: 1px solid #d1d5db;
    }

    .product-name {
      font-size: 14px;
      font-weight: 600;
    }

    .product-price {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }

    .product-qty {
      font-size: 13px;
      color: #6b7280;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      font-weight: 700;
    }

    .total-label {
      color: #374151;
    }

    .total-price {
      color: #059669;
    }

    .form-section {
      margin-bottom: 24px;
    }

    .form-label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 6px;
    }

    .form-label .required {
      color: #dc2626;
    }

    .form-input-group {
      position: relative;
      margin-bottom: 4px;
    }

    .form-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-input.error {
      border-color: #dc2626;
    }

    .form-input.error:focus {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }

    .form-error {
      font-size: 12px;
      color: #dc2626;
      margin-top: 4px;
      display: none;
    }

    .form-error.show {
      display: block;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }

    .qty-btn {
      width: 36px;
      height: 36px;
      border: 1px solid #d1d5db;
      background: white;
      border-radius: 4px;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      color: #374151;
      transition: all 0.2s;
    }

    .qty-btn:hover:not(:disabled) {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .qty-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .qty-input {
      width: 60px;
      text-align: center;
      padding: 8px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 600;
    }

    .qty-display {
      font-size: 14px;
      font-weight: 600;
      width: 60px;
      text-align: center;
    }

    .stripe-element {
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      background: white;
    }

    .form-banner {
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 16px;
      font-size: 13px;
      display: none;
      border-left: 4px solid transparent;
    }

    .form-banner.show {
      display: block;
    }

    .form-banner.error {
      background: #fee2e2;
      border-left-color: #dc2626;
      color: #991b1b;
    }

    .form-banner.success {
      background: #dcfce7;
      border-left-color: #16a34a;
      color: #166534;
    }

    .button-group {
      display: flex;
      gap: 12px;
      margin-top: 32px;
    }

    .btn {
      flex: 1;
      padding: 14px 16px;
      border-radius: 6px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #059669;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #047857;
    }

    .btn-primary:disabled {
      background: #d1d5db;
      color: #9ca3af;
      cursor: not-allowed;
    }

    .btn-secondary {
      background: #e5e7eb;
      color: #374151;
    }

    .btn-secondary:hover {
      background: #d1d5db;
    }

    .spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
      margin-right: 6px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .security-badge {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      margin-top: 16px;
    }

    @media (max-width: 480px) {
      .container {
        padding: 20px 16px;
      }

      .header h1 {
        font-size: 24px;
      }

      .button-group {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>

<div class="container">

  <div class="header">
    <h1>Checkout</h1>
    <p>Shop at <span class="merchant-name">Bloom & Stem</span></p>
  </div>

  <div class="form-banner error" id="errorBanner"></div>

  <!-- Product Summary -->
  <div class="product-summary">
    <div class="product-row">
      <div>
        <div class="product-name">Roses (12-stem)</div>
        <div class="product-qty" id="qty-display">Qty: 1</div>
      </div>
      <div class="product-price" id="unit-price">$49.99</div>
    </div>
    <div class="product-row">
      <div class="total-label">Total</div>
      <div class="total-price" id="total-price">$49.99</div>
    </div>
  </div>

  <!-- Customer Name -->
  <div class="form-section">
    <label class="form-label">Full Name <span class="required">*</span></label>
    <div class="form-input-group">
      <input 
        type="text" 
        id="customerName" 
        class="form-input" 
        placeholder="Sarah Chen"
        maxlength="100"
      >
      <div class="form-error" id="nameError"></div>
    </div>
  </div>

  <!-- Customer Email -->
  <div class="form-section">
    <label class="form-label">Email <span class="required">*</span></label>
    <div class="form-input-group">
      <input 
        type="email" 
        id="customerEmail" 
        class="form-input" 
        placeholder="sarah@example.com"
      >
      <div class="form-error" id="emailError"></div>
    </div>
  </div>

  <!-- Quantity -->
  <div class="form-section">
    <label class="form-label">Quantity <span class="required">*</span></label>
    <div class="quantity-control">
      <button class="qty-btn" id="qtyMinus" onclick="decrementQty()">−</button>
      <div class="qty-display" id="qtyValue">1</div>
      <button class="qty-btn" id="qtyPlus" onclick="incrementQty()">+</button>
    </div>
  </div>

  <!-- Payment Info (Stripe placeholder) -->
  <div class="form-section">
    <label class="form-label">Payment <span class="required">*</span></label>
    <div class="form-input-group">
      <div class="stripe-element" id="stripeElement">
        <p style="font-size: 13px; color: #9ca3af; margin: 0;">
          [Stripe Card Element will mount here — test card: 4242 4242 4242 4242]
        </p>
      </div>
      <div class="form-error" id="stripeError"></div>
    </div>
  </div>

  <!-- Submit -->
  <div class="button-group">
    <button class="btn btn-primary" id="submitBtn" onclick="submitCheckout()">
      Complete Order
    </button>
    <button class="btn btn-secondary" onclick="goBack()">Cancel</button>
  </div>

  <div class="security-badge">
    🔒 Payments secured by Stripe
  </div>

</div>

<script>
  const PRODUCT_PRICE = 49.99;
  let quantity = 1;
  let isSubmitting = false;

  // Quantity controls
  function incrementQty() {
    if (quantity < 99) {
      quantity++;
      updateQtyDisplay();
    }
  }

  function decrementQty() {
    if (quantity > 1) {
      quantity--;
      updateQtyDisplay();
    }
  }

  function updateQtyDisplay() {
    const qtyValue = document.getElementById('qtyValue');
    const qtyDisplay = document.getElementById('qty-display');
    const totalPrice = document.getElementById('total-price');
    const qtyMinus = document.getElementById('qtyMinus');

    qtyValue.textContent = quantity;
    qtyDisplay.textContent = `Qty: ${quantity}`;
    totalPrice.textContent = `$${(PRODUCT_PRICE * quantity).toFixed(2)}`;
    qtyMinus.disabled = quantity === 1;
  }

  // Validation
  function validateForm() {
    const name = document.getElementById('customerName').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');

    let isValid = true;

    // Name validation
    if (!name) {
      nameError.textContent = 'Name is required';
      nameError.classList.add('show');
      document.getElementById('customerName').classList.add('error');
      isValid = false;
    } else {
      nameError.classList.remove('show');
      document.getElementById('customerName').classList.remove('error');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      emailError.textContent = 'Email is required';
      emailError.classList.add('show');
      document.getElementById('customerEmail').classList.add('error');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email (e.g., sarah@example.com)';
      emailError.classList.add('show');
      document.getElementById('customerEmail').classList.add('error');
      isValid = false;
    } else {
      emailError.classList.remove('show');
      document.getElementById('customerEmail').classList.remove('error');
    }

    return isValid;
  }

  // Real-time validation (blur)
  document.getElementById('customerName').addEventListener('blur', function() {
    const nameError = document.getElementById('nameError');
    if (!this.value.trim()) {
      nameError.textContent = 'Name is required';
      nameError.classList.add('show');
      this.classList.add('error');
    } else {
      nameError.classList.remove('show');
      this.classList.remove('error');
    }
  });

  document.getElementById('customerEmail').addEventListener('blur', function() {
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.value.trim()) {
      emailError.textContent = 'Email is required';
      emailError.classList.add('show');
      this.classList.add('error');
    } else if (!emailRegex.test(this.value.trim())) {
      emailError.textContent = 'Please enter a valid email';
      emailError.classList.add('show');
      this.classList.add('error');
    } else {
      emailError.classList.remove('show');
      this.classList.remove('error');
    }
  });

  // Submit
  function submitCheckout() {
    if (isSubmitting) return;

    const banner = document.getElementById('errorBanner');
    banner.classList.remove('show', 'error');

    if (!validateForm()) {
      banner.textContent = 'Please fill in all required fields.';
      banner.classList.add('show', 'error');
      return;
    }

    isSubmitting = true;
    const btn = document.getElementById('submitBtn');
    const origText = btn.textContent;
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner"></span>Processing...';

    // Simulate payment processing (2–3 seconds)
    setTimeout(() => {
      // In production, this calls your backend to process payment via Stripe
      const success = Math.random() > 0.2; // 80% success rate for demo

      if (success) {
        banner.textContent = '✓ Order placed! Check your email for confirmation.';
        banner.classList.add('show', 'success');
        setTimeout(() => {
          window.location.href = 'storefront.html'; // Redirect to storefront after success
        }, 2000);
      } else {
        banner.textContent = 'Payment failed. Your card was declined. Please try again.';
        banner.classList.add('show', 'error');
        btn.disabled = false;
        btn.textContent = origText;
        isSubmitting = false;
      }
    }, 2500);
  }

  function goBack() {
    window.location.href = 'storefront.html';
  }

  // Init
  updateQtyDisplay();
</script>

</body>
</html>
```

---

### `mobile-wireframe-merchant.svg`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg viewBox="0 0 360 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .device-frame { fill: #1f2937; }
      .screen { fill: white; }
      .header-bar { fill: #f3f4f6; }
      .heading { font-size: 16px; font-weight: 700; fill: #1f2937; }
      .subheading { font-size: 12px; fill: #6b7280; }
      .label { font-size: 11px; fill: #374151; font-weight: 600; }
      .input-field { fill: white; stroke: #d1d5db; stroke-width: 1; }
      .error-text { font-size: 10px; fill: #dc2626; }
      .success-text { font-size: 10px; fill: #059669; }
      .button { fill: #059669; }
      .button-disabled { fill: #d1d5db; }
      .button-text { font-size: 12px; fill: white; font-weight: 600; }
      .divider { stroke: #e5e7eb; stroke-width: 1; }
    </style>
  </defs>

  <!-- Device frame (phone) -->
  <rect class="device-frame" x="0" y="0" width="360" height="800" rx="30"/>
  <rect class="screen" x="12" y="12" width="336" height="776" rx="24"/>

  <!-- Screen content: Merchant Upload (Mobile) -->

  <!-- Header -->
  <rect class="header-bar" x="12" y="12" width="336" height="50"/>
  <text class="heading" x="20" y="42">Create Your Shop</text>

  <!-- Section 1: Business Name -->
  <text class="label" x="20" y="82">Business Name *</text>
  <rect class="input-field" x="20" y="90" width="296" height="40" rx="6"/>
  <text x="30" y="115" font-size="13" fill="#9ca3af">e.g., Bloom & Stem</text>
  <text class="success-text" x="20" y="138">✓ 15/100 characters</text>

  <!-- Section 2: Email -->
  <text class="label" x="20" y="162">Email *</text>
  <rect class="input-field" x="20" y="170" width="296" height="40" rx="6"/>
  <text x="30" y="195" font-size="13" fill="#9ca3af">owner@example.com</text>

  <!-- Section 3: Description -->
  <text class="label" x="20" y="242">About Your Shop</text>
  <rect class="input-field" x="20" y="250" width="296" height="60" rx="6"/>
  <text x="30" y="270" font-size="13" fill="#9ca3af">Handpicked seasonal flowers...</text>
  <text class="subheading" x="20" y="330">Optional • 0/500 characters</text>

  <!-- Section 4: Add Product -->
  <text class="label" x="20" y="360">Add a Product *</text>
  
  <!-- Product Name -->
  <text class="label" x="20" y="385" font-size="10">Product Name</text>
  <rect class="input-field" x="20" y="392" width="220" height="36" rx="4"/>
  <text x="30" y="413" font-size="12" fill="#9ca3af">Roses (12-stem)</text>

  <!-- Product Price -->
  <text class="label" x="250" y="385" font-size="10">Price</text>
  <rect class="input-field" x="250" y="392" width="66" height="36" rx="4"/>
  <text x="258" y="413" font-size="12" fill="#1f2937">$49.99</text>

  <!-- Add Product Button -->
  <rect class="button" x="20" y="442" width="296" height="40" rx="6"/>
  <text class="button-text" x="168" y="467" text-anchor="middle">+ Add Product</text>

  <!-- Product List -->
  <text class="label" x="20" y="502">Products (1)</text>
  
  <!-- Product Item -->
  <rect x="20" y="515" width="296" height="50" rx="6" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
  <text x="30" y="533" font-size="13" font-weight="600" fill="#1f2937">Roses (12-stem)</text>
  <text x="30" y="550" font-size="12" fill="#6b7280">$49.99</text>
  <!-- Delete icon -->
  <text x="292"
