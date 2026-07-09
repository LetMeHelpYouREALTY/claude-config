---
name: realscout-buyer-workflow
description: >
  Full intake workflow for new RealScout buyer inquiries — from property research
  to FUB contact creation to reply email drafting. Triggers on ANY new buyer
  inquiry from RealScout, buyer asking about a specific property, buyer due
  diligence questions (HOA, HVAC, plumbing, assessments), or when Dr. Jan says
  "new RealScout buyer", "buyer inquiry", "process this buyer", "intake this
  lead", or pastes buyer messages with property-specific questions. Also triggers
  when someone asks about Sun City Summerlin, Del Webb, or any 55+ community
  property details. Use this skill even if the user just pastes a buyer's message
  without explicit instructions — the workflow applies whenever a buyer is asking
  about a specific property.
---

# RealScout Buyer Inquiry — Full Intake Workflow
**Last Updated:** 2026-05-26

This skill processes new buyer inquiries from RealScout end-to-end: research the property, set up FUB properly, and draft a reply that matches the buyer's communication style.

The goal is speed and completeness — every new buyer inquiry should result in a fully documented FUB contact with tasks queued and a professional reply ready to send, all in one pass.

---

## Step 1: Identify the Buyer and Property

Extract from the inquiry:
- Buyer name (first + last)
- Property address + zip code
- Community / subdivision / village / sub-HOA
- Buyer's specific questions (list them out)
- Buyer's timeline (closing target, urgency level)
- Buyer's communication style: analytical (data-first), relationship (warm/partnership), anxious (calm confidence), excited (match energy)
- Any offer preferences mentioned (seller concessions, assessments, etc.)

---

## Step 2: Research the Property + Community

Run web searches in parallel for:

**Property search:**
- `"[full address]" listing details [current year]`
- `"[full address]" zillow realtor MLS`

**Community/HOA search:**
- `"[community name]" "[sub-HOA/village]" HOA coverage roof exterior maintenance`
- `"[community name]" attached homes sub-HOA covers stucco landscaping`
- `"[community name]" transfer assessment fee [current year]`

**What to confirm:**
- Property type (attached/detached), beds/baths, sqft, year built
- Sub-HOA vs master HOA: what each covers (roof, exterior, landscaping, insurance, water)
- Transfer/NORA fees: amount, who typically pays, negotiability
- Any pending special assessments
- Active listing status and price

**What you WON'T find online** (flag these for listing agent request):
- HVAC replacement year / date plate
- Water heater age
- Repipe or slab leak history
- Specific pending assessments at sub-HOA level
- Seller's Property Disclosure (SPUDS)

---

## Step 3: Search FUB for Existing Contact

Before creating a new contact, always search FUB:
1. Search by full name
2. Search by last name only (FUB search can be fuzzy)
3. If found → update existing contact (add tags, note, tasks)
4. If not found → create new contact (Step 4)

---

## Step 4: Create or Update FUB Contact

Use `follow_up_boss_create_or_update_contact_without_tr` with:

| Field | Value |
|-------|-------|
| First Name | From inquiry |
| Last Name | From inquiry |
| Email | From RealScout profile (ASK DR. JAN if not available) |
| Phone | From RealScout profile (ASK DR. JAN if not available) |
| Source | `RealScout` |
| Stage | `Hot Buyer` (maps to "A - Hot 1-3 Months") |
| City | `Las Vegas` (or appropriate city) |
| State | `NV` |

**Tags to apply** (comma-separated):
- Community name (e.g., `Sun City Summerlin`)
- `Buyer-Active`
- Age qualification if applicable (e.g., `55+`)
- Property type (e.g., `Attached Home`, `Single Family`)
- Target closing month (e.g., `June Closing`)
- `RealScout`
- Zip code (e.g., `89134`)

**If email/phone is missing:** Flag this immediately. Dr. Jan needs to grab contact info from the RealScout profile. A FUB contact without email or phone is incomplete and won't sync properly.

---

## Step 5: Add Detailed Note to FUB Contact

Create a note with subject: `Buyer Preferences — [property address], [community]`

Note body template:
```
PROPERTY OF INTEREST: [address, city state zip] ([community, village/sub-HOA — property type])

TARGET CLOSING: [month year]

OFFER STRATEGY NOTES:
• [Buyer's specific preferences — seller pays NORA/assessments, etc.]
• Buyer chooses title company — default Equity Title of Nevada (Taci Granlund)
• 3% buyer broker commission — non-negotiable
• [Buyer communication style — analytical/relationship/anxious/excited]

DILIGENCE ITEMS PENDING (awaiting listing agent response):
• [List each item the buyer asked about that requires listing agent confirmation]

SOURCE: RealScout — [any relevant details about how buyer found the property]
```

The 3% commission and Equity Title of Nevada are non-negotiable defaults on all buyer transactions. Always include them.

---

## Step 6: Create FUB Tasks

**Task 1 — Due TODAY:**
Name: `Request [specific items] from listing agent — [property address]`
Type: to-do

Items to request from listing agent typically include:
- HVAC age / replacement year
- Water heater age
- Plumbing history (repipe, slab leak)
- Sub-HOA CC&Rs
- Pending special assessments
- Seller's Property Disclosure (SPUDS)

**Task 2 — Due within 2 days:**
Name: `Pull [property type] comps on [street/area] for [buyer name]'s offer prep`
Type: to-do

---

## Step 7: Draft Reply Email

Match the buyer's communication style:

**Analytical buyer** (asks detailed questions, lists items, uses specific terms):
- Lead with data and specific answers
- Acknowledge each question directly
- Provide what you've confirmed vs what's pending
- Include timeline for getting remaining answers

**Relationship buyer** (warm, mentions feelings about the home):
- Lead with partnership language
- Acknowledge their excitement or connection to the property
- Weave in data naturally, not as a list

**Anxious buyer** (lots of "what if" questions, cautious):
- Lead with calm confidence
- Reference your experience (500+ Vegas families)
- Provide structure and clear next steps

**55+ community buyers** — always use sign-off: `Here to make your transition smooth, Dr. Jan ☀️`

**Reply structure:**
1. Greet by name + acknowledge their specific questions
2. Share what you've confirmed (HOA coverage, NORA details, property specs)
3. List what you're requesting from listing agent (with timeline)
4. Address any offer strategy preferences (NORA payment, etc.)
5. Offer to pull comps / next step
6. Sign-off matching buyer type + `Call/text 702-222-1964`

---

## 💡 Quick-Share Listing Links (RealScout — April 2026)

RealScout now supports copying listing links directly to paste into texts, emails, or social posts. Use this for fast follow-up:
- Inside RealScout, open any listing → copy the shareable link
- Paste into a text or Gmail draft for immediate buyer delivery
- Bypasses email alerts that buyers may ignore
- Best use: follow up on "I'm just looking" leads with a specific property link within 60 seconds

Add to FUB note when used: `Sent RealScout quick-link for [address] via text [date]`

---

## Step 8: Offer FUB Actions + Gmail Draft

After completing research and FUB setup, present Dr. Jan with options:

```
Want me to:
A) Execute FUB actions now (tags, note, tasks, stage)
B) Send this email as a Gmail draft
C) Both — FUB updates + Gmail draft
D) Adjust the email tone or content first
```

---

## Checklist — Never Skip These

- [ ] Searched FUB before creating new contact
- [ ] Flagged missing email/phone for Dr. Jan to grab from RealScout
- [ ] 3% buyer broker commission noted in FUB note (non-negotiable)
- [ ] Equity Title of Nevada (Taci Granlund) noted as default escrow
- [ ] All buyer-specific diligence items captured in both the note AND the listing agent task
- [ ] Comps task created with 2-day deadline
- [ ] Reply email matches buyer's communication style
- [ ] Sign-off matches buyer type (55+, competitive, divorce, investor, etc.)
- [ ] CTA includes `Call/text 702-222-1964`
