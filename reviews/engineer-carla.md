# Engineer review: "Shop-in-a-Box — DIY storefront for micro-merchants"

- **By:** Carla (Engineer)
- **Cycle:** 1
- **Saved:** 13/05/2026, 9:09:36 PM

---

I'm going to be direct because that's what you hired me for.

**1. How long the first usable version really takes**

Four weeks. Not five, not "four if nothing breaks." Four. But not the four you're imagining.

Here's what ships by end of week 4:
- Owner login (email + password, no OAuth yet)
- Create one shop, add up to 10 items with name + price + image upload
- Public shop page (grid view, no filtering)
- Basic cart (add/remove, total calculation)
- Checkout form (name, email, address, cash-on-delivery only)
- Owner dashboard: list of orders, mark as "received" or "shipped"
- Email notification to owner when order arrives

That's it. That's a usable shop.

What does NOT ship in week 4:
- Category management (single flat list only)
- Inventory tracking
- Multiple payment methods
- Shop customization (colors, themes, branding)
- Customer account history
- Search or filtering
- Analytics
- Shipping cost calculation
- Refund flow

You'll get questions about these starting week 2. Push back. They're week 6+ problems.

**2. Where I hit a wall**

Image upload. That's the brake point.

If we try to host images ourselves, we spend 3 days setting up S3, presigned URLs, image resizing, error handling. That eats into week 1 and bleeds into week 2.

The wall breaks if we use **Cloudinary** (free tier, 25GB storage, on-the-fly resizing, one API call). I lose maybe 4 hours to integration and testing instead of 3 days. That's the difference between a relaxed week 2 and a panic week 2.

Second wall: **payment messaging**. We say "cash on delivery" but micro-merchants will ask "can you add Stripe?" by week 2. We can't. The answer is locked in: "We're shipping the free version first. Stripe is roadmap for v1.1." Say it now, say it in the kickoff, repeat it in standups. Otherwise we're implementing payment processing at 2 AM on week 3, which means something else breaks.

Third wall: **email notifications**. If we try to hand-roll SMTP, we die. **SendGrid's free tier** (100 emails/day) or **Resend** (if we're on Node). One API call per order event. 2 hours to wire up. Non-negotiable.

**3. What I'd cut from the spec**

Categories. Full stop.

The pitch says "adding categories and items"—I'm cutting that. Here's why: categories require a second data model, a second UI component (category editor), a second set of validation rules, and a second cascade delete pattern. That's not one feature, that's three. Micro-merchants don't need categories yet. They have 10 items. They'll put "Chocolate Cupcakes" and "Vanilla Cupcakes" in a single list, and customers will figure it out.

We add categories in week 6 if a user explicitly asks for it. Not before.

I'd also cut:
- **Shop customization** (colors, logos, fonts). Use a fixed, clean template. Same for all shops in v1. No CSS knobs. It's 2 weeks of design work that doesn't move the needle for a baker ordering 3 dozen cupcakes.
- **Shipping cost calculation**. Owners type a fixed shipping fee in settings (or "free"). Done. Real shipping logic is a week-long rabbit hole.
- **Customer accounts**. Customers check out as guests. No sign-up, no password reset, no order history page. Owners get the order in email and their dashboard. That's the signal.

**4. Which existing tools save a month**

Stack I'd choose:

- **Next.js 14** (API routes + React frontend, one deploy). Losing a week to monorepo friction and CI debates.
- **PostgreSQL** + **Drizzle ORM** (not Prisma—smaller, faster, easier to debug). Prisma adds 2 weeks of "why is the query slow?" conversations.
- **Cloudinary** (image upload). Saves 3 days vs. S3.
- **SendGrid or Resend** (email). 2 hours vs. 3 days.
- **Stripe Dashboard webhooks** (mock only for v1—receive webhook shape, log it, don't process yet). Zero integration debt when we add real payments in v1.1.
- **shadcn/ui** (form + table components). Pre-built, accessible, one npm install. Saves a week of button styling.
- **Railway or Render** (one-button deploy, built-in Postgres). Not AWS. Not Vercel + separate database. One platform.
- **Playwright** for tests (one user flow: owner creates shop → customer orders → owner sees it). Not unit tests. Not snapshot tests. Real browser clicks. 3 tests, max. Done in a day.

**The hard truth:**

We can ship a real, living shop in 4 weeks if we stop asking "what if the customer wants X?" We ship what a micro-merchant needs on day 1: sell stuff, get notified, mark it done.

Everything else is a trap.

I'm ready to start architecture review and tech spec as soon as you confirm the spec above is locked. If you want categories in v1, tell me now—that changes the timeline to 5 weeks. If you want to debate Prisma vs. Drizzle for two hours, we've already lost momentum.

What gets locked, and who makes the call?
