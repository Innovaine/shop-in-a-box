# HR staffing plan: "Shop-in-a-Box — DIY storefront for micro-merchants"

- **By:** Nalini (HR)
- **Cycle:** 1
- **Saved:** 13/05/2026, 9:11:34 PM

---

I'm staffing this. Chairman's pivot is sound—it kills the scope creep that kills shipping. Here's the team:

---

**OPTION: Extend Product + Engineering (existing team)**

We don't spin up a new department for a 7-day sprint. Product, Design, and Engineering stay bundled. This is one person's worth of scope, not an org chart.

**Roles needed:**

1. **1 full-stack engineer** (can own the whole thing: merchant upload form → product display page → checkout button → email notification). JavaScript/Node or Python. Must have shipped ecommerce-adjacent code before.

2. **1 product manager** (owns merchant workflow design, checkout UX, email template). Can write wireframes in Figma or pen-and-paper. Must be ruthless about cutting scope mid-sprint.

3. **1 designer** (1 landing page, 1 merchant dashboard, 1 customer-facing storefront, 1 checkout page). Figma only—no design system, no brand polish. Wireframes first, visual design second if time allows.

**Why this staffing:**

- 3 people ship faster than 5 because every handoff is a leak.
- No QA hire—the PM and engineer test together on real browsers before deploy.
- No ops or devops—deployment is push-to-Vercel or Heroku. Infrastructure complexity kills week 1.
- No marketing or sales—we don't advertise. We find 1 florist on Instagram who needs this, DM her, and ask her to try the link.

---

**One concern for you to hear:**

The chairman's pivot removed order status tracking and multi-merchant eventually. That's the right call *for shipping*, but it means the product stops being "Shop-in-a-Box" and becomes "One-Merchant Checkout." Real merchants will hit the wall in week 2 when they ask "can I add another product category?" and the answer is no.

**You need to decide NOW:** Is this a 7-day MVP-to-validate or a 7-day proof-of-concept-then-iterate? If it's the former, brief the florist upfront: "This is for one flower type per shop, cash on delivery only. We'll add features if this works." If it's the latter, the engineer needs a small backlog for week 2 (multi-category, multi-merchant auth) so you're not rewriting.

Pick one, tell the team which it is, and we go.
