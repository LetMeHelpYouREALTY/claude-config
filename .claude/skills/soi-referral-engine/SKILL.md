---
name: soi-referral-engine
description: >
  Top 1% sphere of influence and referral generation system using the 3-Tier SOI 
  framework. Triggers on ANY request involving: sphere of influence, SOI, referrals,
  past client outreach, client reactivation, "touch my database", relationship nurture,
  client appreciation, pop-by, past client follow-up, "farm my sphere", anniversary
  outreach, closing anniversary, "who should I call", "generate referrals", or 
  Homebot digest triggers. Also triggers when Dr. Jan says "haven't talked to them 
  in a while", "need more referrals", "reactivate my database", or asks about Cloze
  CRM contacts. Use this skill for any SOI/relationship-based business development.
---

# SOI & Referral Engine — Top 1% Framework
**Last Updated:** 2026-05-03
**Sources:** NAR data, Ricky Carruth, 3-Tier SOI Growth Engine

> 82% of all RE transactions come from referrals or repeat business (NAR).
> A well-nurtured inner circle of 25 generates more than a neglected database of 1,000.

---

## The 3-Tier SOI System

### TIER 1: Inner Circle (5-25 people)
**Who:** Closest friends, family, devoted past clients, top referral sources

**The 1-2-4 Rule (annual minimum):**
- **1** genuine phone call (about THEIR life, not real estate)
- **2** handwritten notes (birthday, achievement, "thinking of you")
- **4** personal texts/DMs with relevant shares

**Key:** This is relationship, not marketing. Never pitch. Be genuinely interested in their lives. They already know what you do — your job is to stay close.

**Script for Tier 1 call:**
```
"Hey [name], it's Jan. No real estate reason for calling — just thinking about you and wanted to check in. How's [family member/recent event they mentioned]?"
```
Let the conversation flow naturally. If RE comes up, great. If not, that's the point.

---

### TIER 2: Active Network (50-200 people)
**Who:** Former colleagues, vendors, gym/church/community members, acquaintances, past clients beyond inner circle

**Contact Framework — F.O.R.D. Method:**
- **F**amily: "How are the kids doing?"
- **O**ccupation: "How's work going?"
- **R**ecreation: "Done anything fun lately?"
- **D**reams: "Any big plans coming up?"

**Touchpoint Schedule:**
- Monthly: **IDC Global / Burrow** neighborhood report + newsletter (automated, FUB→Burrow one-way push). Burrow delivers hyperlocal data at scale — no manual send needed per contact.
- Quarterly: F.O.R.D. check-in (call, text, or coffee)
- Annually: client appreciation event (movie screening, seasonal giveaway)
- Ongoing: Homebot monthly digest (auto-sent via Homebot integration)

**Homebot Network (2026):** Homebot's no-cost referral ecosystem — past clients who get your monthly digest can refer their network directly through the platform. Zero extra effort.

**Referral Ask Script (natural, not pushy):**
```
"By the way — my business runs on referrals from people like you. If anyone you know mentions buying, selling, or just has a real estate question, I'd love to be the one they call. No pressure — just keep me in mind."
```

---

### TIER 3: Digital Sphere (1,000+ people)
**Who:** Social media followers, blog readers, GBP reviewers, open house sign-ins

**Strategy:** Attract and educate at scale — convert strangers to Tier 2

**Tactics:**
- Hyper-local content: neighborhood pros/cons, price-point showcases, "moving to Vegas" guides
- Dominate local Facebook groups: answer questions, share data, be the expert
- Weekly GBP posts across all 15 locations (35% more views)
- Video content: 3x weekly Reels/TikTok (see `content-brand-authority` skill)

**Conversion goal:** Move Tier 3 contacts into Tier 2 through value and engagement

---

## Past Client Reactivation Sequence

For contacts you haven't spoken to in 6+ months:

**Day 1 — Text:**
```
"Hi [name], it's Dr. Jan! I was just reviewing my client list and your name popped up. How are you enjoying [address/neighborhood]? Your area has seen some interesting activity lately — happy to share if you're curious. Hope all is well! 702-222-1964"
```

**Day 3 — Email (if no response):**
```
Subject: Your neighborhood just made some news

Hi %contact_first_name%,

Quick update — [X] homes sold in [their neighborhood] last month, with a median of $[amount]. That's [up/down X%] from when you closed.

Curious what this means for your home's value? I can pull a quick snapshot — just reply and I'll send it over.

Always here for you,
Dr. Jan Duffy | BHHS Nevada Properties
702-222-1964
```

**Day 7 — Homebot trigger:**
Add tag `#Homebot_Send-Digest` in FUB to trigger a personalized home value report

**Day 14 — Call (warm, not scripted):**
Use F.O.R.D. method. If voicemail: "Hey [name], it's Dr. Jan — just checking in, no agenda. Give me a ring when you get a chance. 702-222-1964"

---

## Closing Anniversary System

**30 days post-close:** Thank you card + small gift (local restaurant gift card)
**6-month anniversary:** Check-in call — "How's the house treating you?"
**1-year anniversary:** Market update for their area + "Happy home-iversary!" text
**Every year after:** Homebot digest (automated) + annual personal touch

---

## Homebot Integration for SOI Nurture

Homebot's monthly digest has a 0.6% unsubscribe rate — industry best. Use it as your passive Tier 2 nurture:

| Tag | When to Apply |
|-----|---------------|
| `#Seller_Homebot` | Every past client who owns |
| `#Buyer_Homebot` | Active buyers for financial insights |
| `#Homebot_Send-Digest` | Manual trigger for reactivation |

**LTS Score (Likelihood to Sell):** When Homebot flags a high LTS contact, they go to top of call list. 89% accuracy, 9-month prediction window.

---

## Weekly SOI Action Plan

| Day | Action | Volume |
|-----|--------|--------|
| Monday | Tier 1 calls | 3-5 calls |
| Tuesday | Past client reactivation texts | 10 texts |
| Wednesday | F.O.R.D. check-ins (Tier 2) | 5 conversations |
| Thursday | Referral asks (natural, end of conversations) | 3-5 asks |
| Friday | Handwritten notes | 5 notes |
| Weekend | Community events / open houses (Tier 3 growth) | 1-2 events |

**Minimum weekly target:** 25-30 meaningful SOI touches

---

## Tool Integration

| Action | Tool | Connector |
|--------|------|-----------|
| Search past clients (sphere) | Cloze — verified live April 2026 (FUB tasks visible in Cloze agenda, bidirectional sync via FUB API key) | Manual UI |
| Search past clients (leads) | Follow Up Boss | `mcp__19c00846` |
| Send Tier 2 newsletter | IDC Global / Burrow | Manual (no MCP) |
| Trigger Homebot digest | FUB tag | `mcp__19c00846` |
| Check LTS scores | Homebot | `mcp__19c00846` |
| Draft outreach emails | Gmail standalone | `mcp__5e399eca` |
| Schedule follow-ups | Google Calendar | `mcp__5fb31850` |
| Capture relationship intel | Open Brain | `mcp__47488255` |
| Create appreciation materials | Canva | `mcp__1c1e6fa4` |

---

## After Every SOI Interaction
- Update FUB/Cloze with conversation notes
- Capture to Open Brain: relationship updates, life events, referral potential
- If they mention anyone buying/selling: create FUB task for same-day follow-up on the referral
