# Day 1 — Plan: Shop-in-a-Box — DIY storefront for micro-merchants

- **By:** Fatima (Planner)
- **Cycle:** 2
- **Saved:** 13/05/2026, 9:30:26 PM

---

FINISHED:
- Idea approved by chairman (decisions/chairman-rajesh.md)
- CEO decision documented (decisions/ceo-amara.md)
- Staffing skeleton in place (execution/staffing-nalini.md)
- Initial outreach list compiled (execution/outreach-tom-s.md)
- Tech stack & deployment config committed (.qadar-git.json, .qadar-appetize.json)

PENDING:
- No working URL yet — nothing loads in a browser
- No schema, no database, no API endpoints written
- No merchant upload flow specified
- No checkout flow specified
- No payment integration decision made

NEXT WEEK FOCUS:
Ship a loadable URL by end of day 2 that accepts one merchant's 5 products and renders them, even if checkout is fake.

ROLE PLAN:
- requirements: YES — Kenji locks the exact merchant upload schema (single JSON file or form?) and checkout wire today; we ship with that or nothing.
- design: YES — Chiara sketches the two screens (upload → public storefront) as clickable HTML; no pixel-perfect, fast iteration on layout.
- engineering: YES — Anil builds database schema for products, merchant link generation, and public view; deploys skeleton app by EOD day 1.
- review: YES — Søren checks first commit loads without 500 errors; merchant can POST a product; link is shareable and public.
- test: YES — Priya writes the merchant flow test (upload 5 flowers → get link → visit link → see flowers) by day 2; runs it every deploy.
- pm-status: NO — Too early; Dmitri runs status from day 4 onward once we know what's broken.
- finance: NO — No spend questions yet; Svetlana reviews if we need paid services by mid-week.
- risks: NO — Hiroshi watches from day 3; first week is execution, not betting on what could go wrong.
- sales: YES — Tomás identifies 3 micro-merchants (florist, baker, jeweler) who will test live upload and checkout by day 5; secures one commit to use the link.

ONE-LINE SUMMARY:
Five people ship a working storefront shell this week—one merchant, five products, one public link—and two real testers validate the upload and checkout flow by Friday.
