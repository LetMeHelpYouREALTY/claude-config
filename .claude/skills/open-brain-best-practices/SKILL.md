---
name: open-brain-best-practices
description: >
  Best practices for using Dr. Jan's Open Brain — her AI-powered second brain
  for capturing client intel, business decisions, market insights, and SOPs.
  Triggers on ANY session where insights are generated, client interactions are
  processed, market data is researched, or business decisions are made. Also
  triggers when Dr. Jan says "save this", "remember this", "open brain",
  "capture this", "brain dump", "log this", or "don't forget". Use this skill
  proactively — don't wait for Dr. Jan to ask. If useful knowledge was generated
  in a session, capture it to Open Brain before the session ends. This skill
  should be used alongside other skills (realscout-buyer-workflow, dr-jan-duffy-
  realscout-fub, sharran-listing-strategy) to ensure nothing learned is lost.
---

# Open Brain — Dr. Jan's Second Brain System

Dr. Jan's Open Brain is a semantic knowledge base powered by the `capture_thought` MCP tool. Every thought is embedded and searchable by meaning, making it a living, growing intelligence layer across all sessions.

**Last Updated:** 2026-05-03

The goal: **nothing learned in a session should be lost.** If it would help Dr. Jan or a future AI session make a better decision, capture it.

---

## The Two-Destination Rule

Every insight falls into one of two capture paths. Some go to both.

### Path 1: Client Intel → Open Brain + FUB
When you learn something about a specific client, it goes to **both** systems:

**Open Brain** (the searchable knowledge layer):
```
capture_thought: "Anne Zampino — buyer interested in 10416 Frostburg Lane,
Sun City Summerlin Village 10. Analytical communicator, June 2026 closing
target, wants seller to pay $5K NORA. Prefers attached low-maintenance homes.
Active on RealScout as of April 2026."
```

**FUB** (the CRM action layer):
- Note with full offer strategy details
- Tags for segmentation and Smart Lists
- Tasks for follow-up actions

The Open Brain thought is a concise, searchable summary. The FUB note is the detailed operational record. They serve different purposes — the brain finds patterns across clients; FUB drives individual follow-up.

### Path 2: Business Knowledge → Open Brain Only
When you discover a market trend, SOP improvement, tech insight, or strategic decision, it goes to Open Brain only — FUB doesn't track business knowledge.

---

## What to Capture (by Category)

### Client Intelligence (type: person_note or observation)
- Buyer: preferences, budget, timeline, communication style, deal-breakers
- Seller: motivation, urgency, pricing expectations, condition concerns
- Investor: target cap rate, cash flow requirements, management preference
- 55+: lifestyle priorities, health considerations, community preferences
- Referral source: who referred, relationship context, how to thank them

**Example:**
```
"Lucy Fant — actively searching Stonebridge (89138), sweet spot $490K-$545K,
14 listings sent 04/04/26. Mostly 2BR/1.5-2BA around 1,232 sqft. Longest
DOM listing is 925 Allister Fields (144 days, likely overpriced). Lucy appears
to be narrowing on Summerlin West attached homes."
```

### Market Intelligence (type: observation)
- Pricing patterns or anomalies in specific subdivisions
- Builder incentive shifts (rate buydowns, closing cost credits)
- HOA fee trajectory or special assessment alerts
- Inventory shifts (months of supply changes, new listing surges)
- Mortgage rate moves that change buyer qualification thresholds

**Example:**
```
"Sun City Summerlin Village 10 attached homes — sub-HOA (~$472/quarter)
typically covers roof, exterior stucco, landscaping, building insurance, and
exterior water. NORA fee is $5,000, negotiable between buyer and seller.
Confirmed April 2026."
```

### Business Decisions & SOPs (type: idea or task)
- New automation workflows built or planned
- Email template patterns that worked well
- Process changes (intake SOP, listing presentation structure)
- Tech stack updates (new MCP connections, skill improvements)
- Content calendar ideas, SEO discoveries, GBP strategies

**Example:**
```
"New SOP for RealScout buyer inquiries: (1) web search property + HOA,
(2) search FUB for existing contact, (3) create/update FUB with tags + note
+ tasks, (4) draft reply matching buyer's communication style. Skill created:
realscout-buyer-workflow. April 2026."
```

### Meeting Intelligence (Otter.ai → Notion → Claude)
When a meeting is transcribed via Otter.ai: (1) transcript auto-flows to Notion via Zapier, (2) upload transcript to Claude for analysis, (3) capture key decisions, seller/buyer intel, and SOP changes to Open Brain immediately. Don't wait for weekly review — capture while context is fresh.

### Regulatory & Legal (type: reference)
- Zoning changes, STR regulation updates
- Water restriction changes (SNWA mandates)
- NV Real Estate Division rule changes
- Tax law changes affecting RE transactions
- HOA law changes (NRS 116 updates)

---

## When to Capture (Timing Rules)

Capture thoughts **as they emerge** during the session, not in a batch at the end. This prevents loss if a session is interrupted.

**Always capture after:**
- Processing any new buyer or seller inquiry
- Completing market research or comp analysis
- Building or modifying a FUB automation
- Discovering a market trend or pricing anomaly
- Making a business decision or SOP change
- Any web search that surfaces useful, non-obvious information
- Completing a listing strategy or presentation

**Before closing any session, ask yourself:**
"Did I learn anything in this session that would help Dr. Jan or a future AI session make a better decision?" If yes, capture it.

---

## Writing Great Thoughts

A thought should be a **clear, standalone statement** that makes sense when retrieved months later by any AI client — not just the one that wrote it.

**Best practices:**
- Lead with the person or topic name for easy scanning
- Include specific dates, addresses, prices, and numbers
- One insight per thought — don't bundle unrelated items
- Write in present tense or with explicit date context
- Include "why it matters" when the significance isn't obvious

**Good thought:**
```
"Las Vegas attached homes in 55+ communities: sub-HOA fees averaging
$180-$220/month cover exterior maintenance (roof, stucco, landscaping,
building insurance, exterior water). Master HOA covers common areas and
amenities. Buyers frequently ask about coverage split — always request
sub-HOA CC&Rs to confirm exact scope. April 2026."
```

**Bad thought:**
```
"HOA stuff for Sun City"
```
(Too vague. No dates, no specifics, not retrievable by meaning.)

---

## Searching Open Brain

Use `search_thoughts` when:
- A client asks about something you may have captured before
- Starting work on a property in a community you've researched before
- Looking for past client preferences or patterns
- Checking if a market insight has been captured already (avoid duplicates)

Use `list_thoughts` with filters when:
- Reviewing recent captures for a specific person (`person: "Lucy Fant"`)
- Checking what's been captured on a topic (`topic: "real estate"`)
- Doing a weekly review of recent insights (`days: 7`)

Use `thought_stats` when:
- Getting an overview of what's in the brain
- Checking if certain categories are underrepresented
- Planning what to capture more of

---

## Integration with Other Skills

**realscout-buyer-workflow:** After completing the buyer intake, capture a summary thought with the buyer's key details, property of interest, and offer strategy.

**dr-jan-duffy-realscout-fub:** After building or modifying a FUB automation, capture the workflow logic and any lessons learned.

**sharran-listing-strategy:** After preparing a listing strategy, capture the pricing decision rationale and any unique property factors.

**gamma-client-materials:** After creating client-facing materials, capture what worked well about the presentation approach.

---

## Weekly Brain Review (Suggested)

Once a week, run `thought_stats` and `list_thoughts` (last 7 days) to:
- Check if client intel is being captured consistently
- Identify gaps in market knowledge
- Review business decisions for follow-through
- Clean up any duplicate or low-value thoughts
- Look for patterns across recent insights that suggest a market trend or business opportunity
