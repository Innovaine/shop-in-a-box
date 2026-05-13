# Engineer review: "Shop-in-a-Box — DIY storefront for micro-merchants"

- **By:** Anil (Engineer)
- **Cycle:** 1
- **Saved:** 13/05/2026, 9:08:50 PM

---

I'm looking at this spec and I see a ship in 3-4 weeks. Not a stretch. But I also see exactly where I'll hit a wall, and I want to be clear about what has to die.

## Real timeline: 3 weeks to usable. Week 4 is buffer or polish.

**Week 1:** Auth (email + password, no social), shop creation (name + description), item CRUD (title, description, price, image upload to S3), category assignment. Deploy a barebones owner dashboard. **You can curl it. Shop owner can log in, add one item, see it live.**

**Week 2:** Public storefront (browse by category, view item detail, add to cart, persist cart in localStorage). Checkout form (name, email, address, order notes). Orders table in owner dashboard showing what came in. Send a confirmation email to the customer and owner. **A real person can buy something. Owner sees it happened.**

**Week 3:** Order status board (4 buttons: pending → in progress → ready → shipped). Owner marks progress, customer sees status on a simple order-tracking page (email link). Refine the UX until it doesn't feel janky. Test with 2-3 actual micro-merchants (baker, Etsy crafter, local florist). **Real users. Real feedback. Real orders.**

**Week 4 is contingency.** Image resizing if S3 uploads are blurry. Email template polish. A "copy shop link to clipboard" button. Bug fixes from week 3 user testing.

---

## Where I hit the wall: Payment processing.

The spec says "no payment processing," which is correct for v1 and keeps us alive. But the wall isn't payment—it's **the moment a customer actually wants to buy something and there's no integration to Stripe, Square, or even a Gumroad embed.** 

Cash-on-delivery works for exactly three use cases: local pickup, neighborhood delivery, or someone you already trust. Beyond that, you lose 90% of potential orders because customers won't wire money to a stranger's bank account.

**This isn't a blocker for ship.** But it IS the reason we'll get to week 6-7 and realize every micro-merchant on our platform is asking "how do I actually get paid?" If we can't answer that in a way that takes 10 minutes to set up, we plateau hard.

I'd rather ship the order tracker now and bolt on Stripe in cycle 2 than pretend we have product-market fit when all our users are saying "this would be perfect if I could accept cards."

---

## What I'm cutting:

1. **Inventory management.** Don't track stock. Don't prevent oversells. If a baker runs out of croissants mid-day, they'll delete the item or tell customers "out of stock" in email. Cost to implement: 2 days. Value to v1 user: zero. Bring it back in cycle 2 if someone's screaming for it.

2. **Order history / analytics.** No dashboard charts, no "total revenue," no "top items." Owner can see the status board and count with their eyes. We're not competing on insights yet. Cost: 1 day. Cut it.

3. **Discounts / coupons.** Delete this from the spec entirely. A micro-merchant's first need is "can someone buy from me." Promotions are a week-5 problem.

4. **Multiple payment method UI.** The spec probably implies "select your payment method (cash, Venmo, etc.)." Don't do that. Just have one checkout flow. Add a text field: "How would you like to pay? (e.g., cash on delivery, bank transfer details in confirmation email)." Costs 20 minutes. The owner types their Venmo handle or bank info in the order notes.

5. **Image optimization on upload.** Resize images server-side? Skip it for now. S3 + CloudFront caching + lazy-load on the storefront. If images are huge, customers' browsers will tell us. We'll add imagemin in cycle 2.

6. **Abandoned cart emails.** Don't chase customers who add to cart and leave. That's a retention problem. We're still in "do people want this at all" land.

---

## Tools that save a month:

- **Supabase** (not Firebase—better SQL, better for an order-tracking app). Auth + PostgreSQL + realtime subscriptions for the status board. You flip a status button on the owner side, the customer's tracking page updates without a refresh. Saves you building a custom WebSocket layer. Cost: familiarity curve is two days max. Saves: a week of building auth + database from scratch, plus the realtime polling headaches.

- **Next.js + Vercel.** One repo, one deploy, no API/frontend split. Pages for shop, storefront, status board, tracking link. API routes for form submissions. Deploy on day one. Vercel handles the ops tax. (You said "front-end + back-end live in one repo"—this is what you meant.) Saves: infrastructure complexity, env variable hell, two separate deploys.

- **Resend** for email. Three lines of code to send a transactional email. No SMTP setup, no email template debugging on your infra. Costs $0.10 per hundred emails under 1K/month. Saves: a day of email template wrangling.

- **Stripe File Upload API + Presigned URLs to S3.** Don't build image compression yourself. S3 client-side upload with presigned URLs. Stripe's free tier covers storage. No server upload bottleneck. Saves: a week of debugging multipart form issues and server CPU.

- **shadcn/ui or Headless UI.** Pick one, don't argue. A cart, a status badge, a form with validation. Copy-paste components. Saves: two days of "should we use Tailwind or CSS Modules." We're shipping, not architecture-debating.

---

## What could kill us:

1. **Scope creep during week 1.** Someone will say "shouldn't we support multiple currencies?" or "what about bulk uploads?" No. Strangle it immediately. One currency (USD). One item at a time. If the founder pushes back, I will push back hard, because this is where the last three weeks get eaten.

2. **Payment processing mid-cycle.** Do NOT let someone convince us to integrate Stripe before week 3 user testing. We don't know if anyone actually wants this yet. Stripe can wait four weeks.

3. **Image upload reliability.** If S3 uploads are flaky, the entire shop creation flow breaks. Test this on day 2. If it's janky, revert to base64 or a simpler image picker (Unsplash API for free stock images, or just don't allow images until week 2).

4. **Email delivery.** Resend needs a domain SPF/DKIM setup. Do this on day one, before you write any code. Test a confirmation email to yourself immediately. Don't discover email is broken on day 10.

---

## My honest read:

This is shippable. The constraints are actually helpful—no payment processing means we don't get tangled in PCI compliance or Stripe API debates. The persona is tight (micro-merchants, not Shopify competitors). The value prop is real (fast, free, works for cash-first businesses).

**Risk: We ship a beautiful order tracker and no one actually tries to sell anything on it because there's no payment method.** That's not a failure. That's a test result. We'll know by week 5.

The one thing I need from leadership: commit to "we don't touch Stripe until cycle 2." If that changes mid-week, all the time estimates above get longer, because we'll be context-switching between order tracking and payment debugging.

I can start on Monday. What's the actual ship date you're targeting?
