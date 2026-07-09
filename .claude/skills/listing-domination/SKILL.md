---
name: listing-domination
description: >
  Top 1% listing acquisition system combining Sharran Srivatsaa's Invitation Framework
  with expired/FSBO capture strategies and pre-listing domination tactics. Triggers on
  ANY request involving: expired listings, FSBO prospecting, listing appointment prep,
  pre-listing package, seller objections, pricing presentation, "win this listing",
  "listing pitch", "expired lead", "for sale by owner", seller retention, re-list 
  strategy, or when Dr. Jan is competing for a listing against another agent. Also 
  triggers on "price reduction", "days on market too high", or "why isn't it selling".
  Use this skill alongside sharran-listing-strategy for the complete listing toolkit.
---

# Listing Domination — Top 1% Framework
**Last Updated:** 2026-05-26
**Sources:** Sharran Srivatsaa, Tom Ferry, Tim & Julie Harris

> Correctly-priced homes sell; overpriced homes sit — always pull current days-on-market and absorption data before pricing (never quote from memory).
> The market rewards correct pricing and punishes overpricing severely.

### 📊 Current Market Snapshot (May 2026 — verify before every listing appointment)

| Metric | Las Vegas | Henderson (89134) |
|--------|-----------|-------------------|
| Median sale price | $439K–$449K | $480K |
| YoY price trend | **−4.1%** (5th highest drop nationally) | −1.6% |
| Avg days on market | **70 days** | 80 days |
| Homes selling above asking | ~23% | — |
| 30-yr fixed rate | 6.51% (May 21, 2026) | — |

**Pricing counsel:** Market is transitioning from seller to balanced. Advise sellers to price 5–7% below peak comps to avoid sitting 70+ days. Well-priced, turnkey homes still command premiums. Always search current data before quoting any number.

---

## Sharran's Pricing Matrix (Win the Listing)

The price is NOT a number — it's an **invitation to the market**.

### The 3 Pricing Strategies (present all three to every seller)

**Strategy 1: Market Price** (at comparable sold value)
- "This positions your home competitively with recent sales"
- Expected result: 15-30+ showings in first 2 weeks, multiple offers possible
- Best for: sellers who want speed and certainty

**Strategy 2: Aspirational Price** (5-8% above market)
- "This tests the upper boundary of the market"
- Expected result: fewer showings, longer DOM, may need reduction in 21-30 days
- Best for: sellers with time flexibility, unique features

**Strategy 3: Premium Price** (10%+ above market)
- "This positions your home at the top of the market"
- Expected result: minimal showings, likely reduction needed, risk of becoming stale
- Risk: "The longer a home sits, the less buyers are willing to pay"

### How to Present It
"I don't pick the price — the market does. My job is to show you how each strategy works so you can make the decision that's right for your family. Here's what happened with three similar homes this month..."

Then show real examples from your market at each price point.

---

## Expired Listing Capture

### Script (Tom Ferry framework)
```
"Hi [name], this is Dr. Jan with BHHS Nevada Properties. I noticed your home at [address] is no longer active on the market. I'm not calling to list your home today — I'm calling because I have data on what's actually selling in [neighborhood] right now that might be useful to you. Would 5 minutes be helpful?"
```

### Key Questions for Expired Sellers
1. "What do you think went wrong?"
2. "How many showings did you get in the first 2 weeks?"
3. "Did your agent provide weekly market updates?"
4. "What would need to be different this time?"
5. "If I could show you exactly why it didn't sell and what to change, would that be worth 15 minutes?"

### The Expired Seller Audit (your differentiator)
Offer a free "Why It Didn't Sell" analysis:
- Pull MLS history: original price, reductions, DOM
- Compare to what actually sold nearby during the listing period
- Identify marketing gaps: photo quality, description, showing availability
- Present your 7-day pre-launch blueprint as the alternative

---

## FSBO Capture

### Script
```
"Hi [name], this is Dr. Jan — I saw your home for sale on [source]. Beautiful property. I help a lot of homeowners in [area] and I'm curious — are you open to working with a buyer's agent if they bring a qualified buyer? Most FSBOs are, and it doesn't cost you anything."
```

### FSBO Value Proposition
- "64% of FSBOs eventually list with an agent (NAR data)"
- "Agent-listed homes sell for 23% more on average than FSBO"
- "I handle the paperwork, negotiations, inspections, and liability — you focus on your move"

---

## Pre-Listing Domination Package

Before the listing appointment, send the seller:

1. **Hyper-local CMA** — subdivision-specific, not zip code (use `sharran-listing-strategy` skill)
2. **Marketing preview** — sample of how their home will look (via Canva MCP `mcp__1c1e6fa4`)
3. **Video introduction** — 60-second personal video (BombBomb or text)
4. **Testimonial compilation** — 3 relevant past client stories
5. **The Pricing Matrix** — printed version of the 3 strategies above

### The "Exit Option" Guarantee
Sharran's framework: "If at any point you're not satisfied with my service, you can cancel the listing. No penalties, no hard feelings. I earn your business every day."

This removes the seller's biggest fear (being locked into a bad agent) and demonstrates confidence.

---

## Seller Retention (Prevent Price Reductions)

### Weekly Seller Update Template
```
Subject: Your Home Update — Week [X]

Hi %contact_first_name%,

Here's your weekly snapshot:
- Showings this week: [X]
- Showing feedback themes: [summary]
- New comparable sales: [any relevant]
- Online views: [MLS + portal data]
- Market shift: [any relevant changes]

[Strategy recommendation if applicable]

Let's connect this week to discuss. Best time for a quick call?

Dr. Jan Duffy | BHHS Nevada Properties
702-222-1964
```

---

## Integration with Dr. Jan's Tools

| Action | Tool | Connector |
|--------|------|-----------|
| Create seller contact | Follow Up Boss | `mcp__ed5ee078` |
| Tag as potential seller | FUB tags | `mcp__ed5ee078` |
| Build listing presentation | Gamma MCP | `mcp__34078ea8` |
| Create MLS photo templates | Canva MCP | `mcp__1c1e6fa4` |
| Schedule listing appointment | Google Calendar | `mcp__5fb31850` |
| Pull comp data | Web search | Always search first |
| Capture seller intel | Open Brain | `mcp__47488255` |

---

## After Every Listing Conversation
- Update/create FUB contact with `potential-seller` tag
- Capture to Open Brain: seller motivation, property details, pricing expectations, competition
- If appointment set: invoke `sharran-listing-strategy` skill for full strategy doc
