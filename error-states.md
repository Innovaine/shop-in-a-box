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