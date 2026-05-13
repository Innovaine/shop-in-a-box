# CTO review: "Shop-in-a-Box — DIY storefront for micro-merchants"

- **By:** Marcus (CTO)
- **Cycle:** 1
- **Saved:** 13/05/2026, 9:07:26 PM

---

# AGGRESSIVELY UGLY SCOPE FOR WEEK 7

I'm going to cut this to the **actual floor**, not the "minimum viable." If it doesn't ship in 7 days with a 2-person team, it's out.

---

## 1. BUILD COMPLEXITY — WEEKS TO UGLY WORKING MVP

**Honest timeline: 5 days to deployed, ugly, but real.**

**Day 1–2:** Auth (email + password only, bcrypt, session cookie, no 2FA, no password reset). Single database table: `shops`. One table: `items` (name, price, category string, image URL field pointing to external service or none). Hardcode image uploads to a public bucket with zero auth — we'll regret it later, we'll fix it when we're not dying.

**Day 3–4:** Shop creation form + item CRUD. Shop view page shows items, groups by category (in-memory, no sorting). Add-to-cart (client-side array in localStorage, not database). Checkout form (name, email, phone, address, notes). **No payment gateway.** Submit button POSTs to `/api/orders`, creates row in `orders` table. Done.

**Day 5:** Owner dashboard. Query `orders` WHERE shop_id = current_user.shop_id. Status dropdown (pending, in progress, ready, shipped). Clicking dropdown saves status. That's it. No real-time websockets, no webhooks, no order notifications.

**Day 6:** Deploy to Render or Railway. Smoke test in browser. One shop, three items, place order, mark shipped. No broken links.

**Day 7:** Buffer + fixes + one customer interview.

**Tech stack:** Next.js (API routes + React on same repo, one deploy). PostgreSQL. Prisma ORM. That's it. No message queues, no caching, no CDN, no Stripe.

---

## 2. TEAM / SKILLS NEEDED

**Two people, both full-stack.**

- **One mid-level full-stack engineer** (3–5 years, comfortable with Node/React, can write SQL or ORM queries, won't spend two days debating database normalization). You need someone who ships features end-to-end without waiting for back-end/front-end handoff.
  
- **One junior or mid full-stack engineer** (1–3 years, has shipped at least one small project from nothing, can handle forms, can debug async/await without panic). This person needs to be *fast at small tasks*, not prestigious.

**What you DON'T need:** DevOps person, QA, designer, product manager, infra specialist. The mid-level engineer writes README, does PR review in 30 min, and that's it.

**Why not you (Marcus) writing code?** Because you're the only circuit breaker we have. You're on architecture veto + rigor check, not in the critical path. The moment the team waits on you for code, we slip.

---

## 3. BIGGEST TECHNICAL RISK THAT KILLS US IN PRODUCTION

**Image uploads without auth or cleanup.**

Here's what happens: A micro-merchant creates 500 items with 500 images. Browser uploads to S3 (or Cloudinary) with no signed URL, no size limit, no virus scan. Someone's laptop runs out of space. Or a script hammers the endpoint and we eat the bandwidth bill. Or we get sued because someone uploaded copyright images and we stored them.

**Mitigation (not perfect, but unblocks ship):**
- Don't store images. **Link to external URLs only.** Owner finds image on Google, pastes link. One text field. Browser does `<img src={itemImageUrl} />`. Done.
- If we *must* upload: Use Cloudinary's free tier (50 MB limit, built-in moderation). No custom bucket auth.
- Hard cap: 50 items per shop (hardcode it in validation). If you hit the cap, error message says "upgrade." We'll remove that cap when someone pays for it.

**Second risk: Concurrent order edits.** Two users open the same shop owner dashboard, both change an order status at the same time. Last write wins, second user's change disappears. 

**Mitigation:** Don't solve it. Add a 1-second debounce on the client. If it bites us, we'll add optimistic locking (version column) in week 2. Acceptable breakage for week 1.

---

## 4. THREE FEATURES TO CUT FROM 7-DAY SCOPE

### **CUT: Real payment processing**
Payment gateways (Stripe, Square) require Webhook testing, PCI compliance (even with Stripe), reconciliation logic, and error handling that takes 2–3 days to test safely. We're not a payment company yet.

**Instead:** Checkout form captures order + buyer contact. Owner gets a notification (email, eventually SMS). Owner collects payment manually (cash, Venmo, whatever). We're a *status tracker* for non-digital payment flows, which is actually what our target user needs.

### **CUT: Admin dashboard / seller analytics**
Revenue charts, traffic reports, best-selling items, customer cohort analysis—all prestige plays. No micro-merchant will evaluate us on this in week 4.

**Instead:** Orders list, that's it. Filter by status. Export to CSV button (hardcoded `/api/orders/export` that streams JSON, they paste into Excel). Done.

### **CUT: Customer login / order history**
"Let customers log in and see their past orders" sounds nice. It's not necessary. A customer buys once, gets an order confirmation email with a tracking number. They text the shop owner if they have questions. Real micro-merchants don't have repeat customers yet; they're trying to get *first* customers.

**Instead:** Checkout generates a unique order ID. We email it to the buyer. They screenshot it or lose it. No customer accounts, no login, no forgotten passwords. If this burns us, we'll add it in cycle 2.

---

## WHAT SHIPS ON DAY 7

- **Public storefront:** Browse items, add to cart, checkout. Works in Chrome.
- **Owner dashboard:** View orders, change status.
- **Email:** Order confirmation to buyer + shop owner. That's it.
- **One real customer:** Someone with a real shop has posted a test link. Three people clicked it.

What doesn't ship:
- Analytics, reporting, inventory sync, multi-vendor, API documentation, mobile optimization, dark mode, search, filters, wishlist, reviews, shipping calculator, taxes, payment processing, customer accounts, order tracking link, webhooks.

---

## MY CALL

I'm green-lighting this **if** we staff the two engineers by EOW and we commit: no scope creep, no "wouldn't it be nice if," no investor demos before day 5. We're shipping *visibly broken* by design (image links only, no payments, no repeat orders). The broken parts are our lever to get customer feedback fast.

We're not building a real product. We're building a **question machine** that asks: "Do micro-merchants actually want this?" If the answer is yes and loud, we spend cycles 2–3 making it real.

Reputation's at 50. Shipping something ugly but *working* in 7 days gets us back to 60. Shipping nothing, or shipping it broken because we tried to be clever, gets us to 35 and we're done.

I'm in. What's the blocker?
