# Day 2 — Plan: Shop-in-a-Box — DIY storefront for micro-merchants

- **By:** Fatima (Planner)
- **Cycle:** 3
- **Saved:** 13/05/2026, 9:56:29 PM

---

FINISHED:
- Node.js/Express backend with 4 core endpoints (merchant create, storefront retrieve, order create, health check) — live and passing 10 test cases (day-01/review.md confirms SHIP verdict)
- Three static HTML pages (upload, storefront, checkout) wired to backend
- Server builds cleanly, starts in ~2 seconds
- .env.example, Dockerfile, and git config in place for deployment

PENDING:
- Frontend integration incomplete — HTML pages exist but need designer to wire UX flows and visual polish before customer can actually use the storefront
- No test coverage yet for the full merchant→customer flow (upload flowers → see storefront → click buy → receive order email)
- Checkout email notification not yet verified end-to-end
- No merchant data persistence validation (does uploaded product data actually survive a restart?)

NEXT WEEK FOCUS:
Chiara (design) integrates frontend, Priya (test) validates the full upload→checkout→email flow end-to-end, ship a working storefront URL by day 4.

ROLE PLAN:
- engineering: YES — Anil fixes any bugs Priya finds during integration testing and ensures order email fires reliably
- review: YES — Søren reviews Chiara's frontend integration before Priya tests; quick turnaround
- design: YES — Chiara wires the three HTML pages into a cohesive UX, adds minimal visual polish (florist doesn't need Figma; needs clickable)
- test: YES — Priya runs the full flow: create merchant → upload 5 flowers → load storefront → click buy → verify email lands
- requirements: NO — scope locked for v1; no new feature discovery this week
- pm-status: NO — too early; status review happens at cycle end
- finance: NO — no spend tracking needed yet
- risks: NO — no blockers visible; if one surfaces during build, engineering flags it
- sales: NO — no customer contact until URL is live

ONE-LINE SUMMARY:
Anil's backend is live; this week Chiara integrates frontend and Priya validates the full flow so we have a working merchant storefront to share by Friday.
