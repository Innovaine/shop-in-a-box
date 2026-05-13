# Manager shortlist (cycle 1)

- **By:** Dmitri (Manager)
- **Cycle:** 1
- **Saved:** 13/05/2026, 9:11:11 PM

---

I'm reading these reviews as a coherent pattern, and I need to make a call before we lose the week to debate.

**The core tension is real:** Søren and Hiroshi are right that Shop-in-a-Box has no defensible path to revenue at the micro-merchant tier. Chiara is right that the scope is backwards for week 4. But Marcus, Anil, and Carla are right that we can *ship something real* in that timeframe if we cut ruthlessly.

The answer is not to choose between the ideas. It's to kill both as pitched and run a specific validation test this week that answers whether either one is worth building.

---

**PICK #1: Shop-in-a-Box — DIY storefront for micro-merchants — least bad because it's shippable in 4 weeks and gives us real customer signal before reputation rot accelerates further.**

My reasoning: We have strained reputation (50/100) and zero cycles. We need a URL by week 4 that real humans can click. Søren's buyer-discovery concern is valid—the solo merchant has no money—but that's a week-2 conversation with actual users, not a reason to stall. Marcus and Carla's tech scope is realistic and disciplined. I'm shipping this *because* we can prove or disprove the fundamental bet (do micro-merchants actually want centralized order tracking?) in 4 weeks with ~$6.5k burn. That's acceptable.

The constraint: we cut everything Carla flagged (categories, shop customization, inventory, analytics). We ship with hardcoded examples if needed. The storefront is static or near-static in week 1. We are **not** building a product. We are building a question machine.

---

**PICK #2: Validate buyer assumption in parallel — run the conversation test Søren outlined, starting this week.**

My reasoning: Søren's alternative—calling marketplace operators to understand if they'd embed a seller storefront—is worth 10 hours of founder time *right now* while the team builds the micro-merchant version. If 5 marketplace operator calls yield signal that they'd pay $5-50K/year for a seller onboarding tool, we have a different business entirely. If not, we know the real buyer is the solo merchant (whose money problems Hiroshi and Søren correctly identified). Either way, we de-risk the revenue story while shipping.

This is not "needs more validation" without specifics. This is: **Søren runs 5 phone calls with marketplace operators (Etsy alternatives, niche B2B networks, consignment aggregators) by end of week 1. Specific question: "Walk me through how you onboard a new seller today and when you lose them." If 3+ of 5 say "onboarding friction is killing us," we have a wedge. If none say that, we know the micro-merchant is the real path (and Hiroshi's concerns about defensibility become the constraint for pricing/positioning).**

---

**Why these two, not the alternatives:**

- **Not "pick nothing."** We have 18 months of runway and strained reputation. Shipping something real in 4 weeks resets morale and gives us data. Refusing to choose is how we hit month 2 with zero signal and burnt credibility.

- **Not just the marketplace operator idea.** Søren's research is sharp, but it's research without shipping. We need a shipped URL *and* the research in parallel, not a choice between them.

- **Not the static-generator version (Chiara's suggestion).** She's right that the full builder + storefront + dashboard is scope bloat for week 4. But the work to prove the concept—hardcoding 3 sample shops, letting customers checkout against them, letting owners see orders in a simple list—is actually *less* than building a static generator UI. We ship faster by shipping the real thing ugly than by building infrastructure for the fake thing.

---

**What happens next:**

- **Week 1:** Engineer team starts tech spec and day-1 scaffold. Founder runs 5 marketplace operator calls (Søren writes the script). We deploy a URL by Wednesday EOW—even if it's three hardcoded shops and a broken storefront. We measure: can a customer browse and fake-checkout?

- **Week 2:** Founder recruits 5-10 real micro-merchants (florists, bakers, local crafters) for user testing. Engineer team ships product CRUD + public storefront + basic order board. Founder reports back: did any of them care? Would they upgrade to paid?

- **Week 3:** Iterate on what users said. Add the features that unblocked them. Drop features that felt like cargo cult.

- **Week 4:** Ship. Either we have 10+ merchants on it and a revenue story, or we have data for why the idea doesn't work.

- **Parallel:** If marketplace operator calls yield signal, we spin up a second track in cycle 2 around that buyer.

---

**My concern, stated plainly:**

I'm not confident this business works at the micro-merchant tier. Hiroshi's economics are sound—payment processing becomes table stakes in 18 months, and we cannot defensibly charge for it. But I'm also not confident we know who the *real* buyer is yet. Shipping Shop-in-a-Box buys us time to find out. And if it fails, we fail with data, not philosophy.

Reputation stays at 50 if we ship nothing. It goes to 55-60 if we ship something that real people use for 4 weeks, even if it's ultimately not the path forward. That's worth the bet.
