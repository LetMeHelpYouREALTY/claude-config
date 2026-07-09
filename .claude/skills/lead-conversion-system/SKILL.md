---
name: lead-conversion-system
description: >
  Top 1% lead conversion system combining Tom Ferry's script framework, speed-to-lead 
  protocols, and FUB automation for maximum conversion. Triggers on ANY request involving:
  new lead follow-up, lead conversion, speed-to-lead, appointment setting, follow-up 
  sequences, lead scripts, objection handling, "convert this lead", "follow up with",
  "call script", "text script", phone scripts, or when a new inquiry arrives in FUB.
  Also triggers when Dr. Jan says "new lead", "hot lead", "how should I respond to this",
  or pastes a lead notification. Use this skill even for quick lead responses — the 
  conversion framework applies to every first contact.
---

# Lead Conversion System — Top 1% Framework
**Last Updated:** 2026-05-26
**Sources:** Tom Ferry, Sharran Srivatsaa, Ricky Carruth, NAR data

> Speed-to-lead under 60 seconds = 21x more likely to convert.
> This skill turns every new lead into a structured conversion sequence.

### 📊 Current Rate Context (May 2026 — use in buyer conversations)
| Product | Rate | As of |
|---------|------|-------|
| 30-yr fixed | **6.51%** | May 21, 2026 |
| 15-yr fixed | **5.72%** | May 7, 2026 |

Use these to anchor rate objections: "At 6.51%, your payment on a $440K home is roughly $2,700/mo — and builder rate buydowns can knock that down significantly." Always verify current rate before quoting (search: "current mortgage rates today").

---

## The 60-Second Rule

When a new lead arrives (RealScout, Zillow, website, open house):

1. **0-60 seconds:** Send personalized text acknowledging their specific action
2. **1-5 minutes:** Call attempt #1 (if phone available)
3. **5-15 minutes:** Send email with value (not just introduction)
4. **Same day:** Call attempt #2 if no answer
5. **Day 2:** Text + voicemail drop
6. **Day 3-7:** Enter FUB automation drip sequence

FUB connector: `mcp__ed5ee078` (bundled — also carries CallAction, Homebot, kvCORE, RealScout, Gmail). IDs drift: if a call fails, re-list connected tools and match by name. See MCP Connector Reference in dr-jan-duffy-realscout-fub.

---

## Tom Ferry's 3-Skill Conversion Framework

### Skill 1: Build Rapport (first 60 seconds)
- Mirror their communication pace and language
- Use their name within the first sentence
- Reference their specific action: "I saw you saved [address] on RealScout"
- Show genuine curiosity, not sales pitch

### Skill 2: Qualify for Motivation
Ask these in conversation, not as interrogation:
- "Tell me what you'd like to do"
- "What's driving your timeline?"
- "Who else is involved in the decision?"
- "Have you connected with a lender yet?"
- "What matters most to you in choosing an agent?"
- "What's your Plan B if this doesn't work out?"

### Skill 3: Close to Appointment
- "Based on what you've told me, let's set up 15 minutes to [specific value]. Are mornings or afternoons better?"
- "You mentioned [X, Y, Z]. To get you there, the next step is [specific action]. How's [day/time]?"
- Always offer a specific next step, not an open-ended "let me know"

---

## Scripts by Lead Source

### RealScout Showing Request (HIGHEST PRIORITY)
```
Text (immediate): "Hi %contact_first_name%, this is Dr. Jan with BHHS Nevada Properties. I see you'd like to tour [address] — great choice! I know that property well. When works best for a showing — this week or weekend? 702-222-1964"
```

### RealScout Property Saved
```
Text: "Hi %contact_first_name%, I noticed you saved [address]. Smart pick — that [neighborhood] location has been getting strong interest. Want me to pull the full details including what comparable homes just sold for? 702-222-1964"
```

### RealScout HVA (Home Value) Inquiry
```
Text: "Hi %contact_first_name%, I see you're curious about your home's value — great timing. The [neighborhood] market has shifted recently and online estimates are often off by 8-12%. I'd love to share what your neighbors actually sold for this month. Quick call or text? 702-222-1964"
```

### Open House Follow-Up (within 2 hours)
```
Text: "Hi %contact_first_name%, great meeting you at today's open house on [address]! What did you think of the home? I have a few off-market options in that same price range if you're interested. — Dr. Jan 702-222-1964"
```

### Online Lead (Zillow/Website)
```
Text: "Hi %contact_first_name%, this is Dr. Jan — I received your inquiry about [property/area]. I've helped 500+ families find their Vegas home. What's the most important thing you're looking for? 702-222-1964"
```

---

## Objection Handling (Top 5)

### "I'm just looking"
"That's exactly where most of my best clients started. What caught your eye about [property/area]? I can set up alerts so you see new listings before they hit the public sites."

### "I already have an agent"
"Great — having representation is important. If anything changes or you want a second opinion on pricing, I'm always happy to help. Mind if I send you market updates for your area?"

### "I'm not ready yet"
"No rush at all. When the time comes, would it help to know what homes in your price range are selling for right now? I can set that up — zero obligation."

### "I want to sell but need to buy first"
"That's the #1 question I get. I specialize in coordinating both sides — we can structure it so you're not homeless or carrying two mortgages. Want me to walk you through the options?"

### "Your commission is too high"
"I understand. Let me show you the marketing plan and what the numbers look like — most of my sellers net more because of how we position and negotiate. Can I walk you through a recent example?"

---

## FUB Automation Integration

After any lead conversion conversation, create in FUB:

1. **Tag:** intent tag (`hot-buyer`, `potential-seller`, `warm-lead`)
2. **Note:** conversation summary + motivation + timeline + next step
3. **Task:** follow-up action with emoji prefix and due date
4. **Stage update:** move to appropriate pipeline stage

Required conditions on all automations:
- Exclude tag: ARCHIVE
- Exclude stage: Trash
- Exclude stage: Real Estate Agent

---

## Conversion Benchmarks (Top 1% Standards)

| Metric | Target |
|--------|--------|
| Speed-to-lead | Under 60 seconds |
| Text response rate | 53% (with drip combo) |
| Email open rate | 26%+ (personalized subject) |
| Lead-to-appointment | 15-20% |
| Appointment-to-close | 30-40% |
| Daily conversations | 10-25 minimum |

---

## After Every Conversion Interaction
- Update FUB contact record
- Capture client intel to Open Brain (communication style, timeline, motivation)
- If appointment set: create FUB task + calendar event via Google Calendar MCP
