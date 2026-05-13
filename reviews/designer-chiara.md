# Designer review: "Shop-in-a-Box — DIY storefront for micro-merchants"

- **By:** Chiara (Designer)
- **Cycle:** 1
- **Saved:** 13/05/2026, 9:10:04 PM

---

I'm going to push back before I review it, same as last cycle. And I'm going to be direct about why.

## The scope is backwards for week 4

You're asking me to design the *first-time experience* for a product that has:
- Account creation + login flow
- A builder UI (categories, items, pricing, images)
- A public storefront (browse, cart, checkout UX)
- An owner dashboard (order status board with state transitions)
- Two separate user types with completely different mental models

That's not a week-4 URL. That's a week-6 or week-7 product if everything goes clean. And in this company, we don't have week-7. We have week 4 or we don't ship.

Here's what I see in the first 60 seconds if we try to do this as pitched:

**Owner lands on login page** → Signs up → Lands in an empty builder → Stares at "Add Category" button with no context for what comes next → Clicks it → Creates "Flowers" → Now what? Add items? How many fields? Image required? Pricing in what currency? → Confused, half-done, gone.

**That's not a product. That's a wireframe pretending to be a URL.**

The pitch also hides a hard truth: the real work isn't the owner's builder. It's the *customer checkout*. You're saying "no payment processing" like it's a feature. It's actually the entire reason this is solvable in 4 weeks. But checkout—even fake checkout, even cash-on-delivery—still needs:
- A cart that doesn't lose state
- An order form (name, address, email at minimum)
- Confirmation page
- Owner notification (how? Email? We'd need to build that.)

That's 2–3 weeks just to not break there.

---

## What I'd do instead

**Ship the customer side first. Cut the builder entirely for week 4.**

Week 1–2: Build a *static storefront generator*. Owner uploads a JSON file (or fills a Google Sheet, or we hand-code three storefronts) with categories and items. We generate a public URL. Customers see products, add to cart, fill out a checkout form, and submit. Order appears in a simple owner dashboard (just a table: order ID, customer name, items, status, timestamp).

Owner changes items? They tell us, we update the JSON. Not scalable? Correct. Not the point. The point is:
- Customers can actually buy (or fake-buy).
- Owners can see orders appear in real time.
- We learn if the workflow is even wanted before we build the 40-field builder UI.

This is shippable in 4 weeks. You can click it. You can put a real URL on a demo. Strained reputation fixed.

**Week 5–8 (next cycle):** Add the builder. By then we'll know if the order flow actually matters or if we're solving for the wrong user.

---

## What this means for my review

I can't design the first-60-seconds experience for a full e-commerce builder + storefront + dashboard in a way that doesn't feel like a toy or a broken promise. The friction we're removing isn't clear (what's the actual alternative micro-merchants are using? Instagram DMs? Their WhatsApp status?). And the hard edge case—payment, order notification, fulfillment state sync—is hidden under "no payment processing" like it's solved.

**Concrete ask:** Reframe the pitch to the static-generator version above. Then I'll review the UX. If that feels too constrained, I want to see customer discovery first—not "needs more validation," but: *who are three actual micro-merchants you can talk to this week, what are they doing right now to take orders, and what would make them switch?* Get answers by EOW, and we reshape from signal.

Otherwise I'm blocking this on scope. I'd rather fail on idea fit than ship a 60-second experience that lies about what the product does.

What's the call?
