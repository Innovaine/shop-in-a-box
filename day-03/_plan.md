# Day 3 — Plan: Shop-in-a-Box — DIY storefront for micro-merchants

- **By:** Fatima (Planner)
- **Cycle:** 4
- **Saved:** 13/05/2026, 10:38:56 PM

---

FINISHED:
- day-01/ folder with design.md, engineering.md, requirements.md, test.md, review.md documenting initial scope and constraints
- checkout.html and storefront frontend code shipped (Anil's work, day 2)
- API backend functional per code review (Søren confirmed build succeeds)
- .env.example, Dockerfile, README.md, and repo structure in place
- Day 2 code review completed with specific bug identified: smart quotes in JavaScript preventing frontend execution

PENDING:
- Smart quote replacement in checkout.html and storefront.html — entire frontend fails to parse due to U+2019, U+201C, U+201D characters in JavaScript string literals (identified day 2, not yet fixed)
- Frontend tests cannot pass until smart quote bug is resolved
- day-02/_index.md incomplete (code review plan item p4 not finished)

NEXT WEEK FOCUS:
Fix smart quote bug in both HTML files, re-run tests to confirm JavaScript parses, then validate the full checkout flow (upload → buy → email) works end-to-end.

ROLE PLAN:
- engineering: YES — Anil must fix smart quotes in checkout.html and storefront.html immediately, then ship corrected code so tests can run
- review: YES — Søren reviews the corrected code to confirm JavaScript now parses and no other blockers exist
- test: YES — Priya runs Playwright tests against corrected frontend to confirm storefront loads and checkout button fires
- requirements: NO — scope is locked (one merchant, one category, one product, simple checkout); no new requirements work until current build unblocks
- design: NO — design direction is set in day-01/design.md; no new design work until frontend actually renders
- pm-status: YES — Dmitri writes day-03 status noting the smart quote bug, fix in progress, and ETA for unblocked tests
- finance: NO — no budget or runway decisions needed this week
- risks: NO — no systemic risks beyond execution delay; smart quote fix is a known, contained blocker
- sales: NO — no customer contact or pipeline work until there is a working URL to demo

ONE-LINE SUMMARY:
Fix the smart quote parse error blocking frontend execution, re-test, and unblock the checkout flow validation.
