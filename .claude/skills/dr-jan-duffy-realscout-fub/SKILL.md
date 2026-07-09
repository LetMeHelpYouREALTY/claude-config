---
name: dr-jan-duffy-realscout-fub
description: >
  Dr. Jan Duffy's complete operating system for Las Vegas real estate automation,
  SOPs, and AI session rules. Use this skill at the START of every session with
  Dr. Jan. Triggers on ANY request involving: FUB automations, RealScout tags,
  email templates, FUB merge variables, automation conditions, Smart Lists,
  Homebot tags, CRM workflows, lead follow-up sequences, market data, SEO,
  GBP, domain portfolio, Vercel sites, content calendar, builder inventory,
  or any Dr. Jan Duffy business operation. Also triggers when user says
  "best practices", "what should I do", "build this automation", or
  "add to skill". Always check the Last Updated date — if today's date is
  newer, search for current best practices before proceeding.
---

# Dr. Jan Duffy — Complete Operating System
**Last Updated:** 2026-06-26
**Version:** 3.0.0 (Loop Engineering Edition — detail migrated to references/detail.md)

> ⚠️ CHECK DATE: If today's date is newer than "Last Updated", search for
> current best practices on any technical topic before advising.
>
> 📁 Extended detail: read `references/detail.md` for tech stack, MCP capabilities,
> failure modes, eval criteria, Zapier audit, SEO standards, NAR compliance, and skills index.

---

## 🔍 ALWAYS SEARCH FIRST

Before answering, search for current data on:
- Vegas MLS pricing, inventory, absorption rate
- Builder incentives / rate buydowns
- Current mortgage rates
- RealScout / FUB platform updates → `RealScout FUB [year]`
- Google algorithm / SEO changes
- Any question containing "current", "latest", "recent", "this week"

**Never quote market stats from memory. Always verify.**

---

## 👤 WHO IS DR. JAN

- Las Vegas RE agent, NV #S.0197614.LLC, BHHS Nevada Properties
- 83 years old. 35 years Vegas experience, Brooklyn PhD (Market Research & Consumer Behavior)
- 50+ Vercel websites (son manages dev), Cloudflare, Next.js 15, Cursor AI
- **For deep-dive critical thinking:** invoke `plan-and-review` skill

**Team:**
| Person | Role |
|--------|------|
| Dr. Jan Duffy | Lead Agent, S.0197614.LLC |
| Chance Fuller | Buyer Agent + Content, S.204454 |
| Dr. Gene Boyle | CA Connection, KLB Consultants Managing Director |
| Kelly Lynn Boyle | CA Broker, KLB Consultants President, Family Office |

---

## 📞 PHONE NUMBERS — NEVER SWAP WITHOUT ASKING DR. JAN

| Use | Number |
|-----|--------|
| Primary / Professional | 702-500-1955 |
| Marketing / ALL client CTAs | 702-222-1964 |
| cadencehenderson.com ONLY | 702-930-8672 |
| drjanduffy.com | 702-500-1064 |
| duffyrealtyoflasvegas.com | 702-500-1942 |
| drjanetduffy.com | 702-766-7668 |

⚠️ Each site has a dedicated CallAction tracking number = GBP NAP phone. Swapping any breaks local SEO / GBP NAP consistency. The two PowerShell scripts that previously overrode site numbers have been permanently deleted (commit: May 8, 2026).
⚠️ drjanduffy.com repo is under `LetMeHelpYouREALTY` org (not DrJanDuffy).

---

## 🚧 BUSINESS BOUNDARIES

- **NO cold calling.** All call activity is to existing FUB contacts (RealScout-engaged, Homebot-tagged, sphere, referrals, past clients).
- **NO robocalls / autodialer outreach.**
- **NO unsolicited SMS to strangers.** SMS is to FUB contacts who opted in via lead form, signup, or prior interaction.
- **TCPA framing is IRRELEVANT.** Do not invoke TCPA / CAN-SPAM / Do Not Call concerns when designing automations.
- Speed-to-lead sequences target inbound leads who voluntarily engaged — NOT cold outreach.

---

## 💬 COMMUNICATION RULES

**Voice:** Brooklyn PhD, direct + warm, expert neighbor. 8–15 word sentences.
**Format:** 3-5 sentences max · 3 data points · 1 main point · 1 CTA (702-222-1964)
**Options:** Always A/B/C

**Sign-off by audience:**
| Audience | Sign-off |
|----------|----------|
| Sellers | Maximize your equity, Dr. Jan 💰 |
| Buyers | Ready to help you win, Dr. Jan 🏆 |
| 55+ | Smooth transition, Dr. Jan ☀️ |
| Divorce | Here to support you, Dr. Jan 💙 |
| Investors | Let's maximize returns, Dr. Jan 📈 |
| Market Updates | Always here, Dr. Jan 🏠 |
| Referrals | Grateful for your trust, Dr. Jan ⭐ |

**Never say:** "Delighted to assist" · generic stats · "act now" · announce credentials
**Colleague emails:** `Dear [Name],` → body → `Sincerely, Dr. Duffy` + full license block (702-500-1955)

---

## 🤖 MODEL COST ROUTING

| Task Type | Model |
|-----------|-------|
| Client emails · GBP posts · FUB templates · quick lookups | **Sonnet 4.6** |
| Listing strategy · investor waterfall · long agentic builds · coding | **Opus 4.8** |
| Long-horizon agentic (multi-file audits, SEO migration, CMA from scratch) | **Advisor Tool** (Sonnet + Opus pairing) |
| Photo scoring · vision tasks | **Opus 4.8** |

Default = Sonnet. Escalate to Opus only when Sonnet draft fails QA.

---

## 🏗️ FUB AUTOMATION ARCHITECTURE

### Rule: Every automation = 2 parts (Trigger + Actions)

```
Tag Added → [Conditions] → Run Automation (Actions)
                ↓
         Manual Trigger → all steps live here
```

### ⚠️ Required conditions on ALL trigger automations (no exceptions):
| Condition | Setting |
|-----------|---------|
| Tags | exclude any of: **ARCHIVE** |
| Stage | excludes any of: **Trash** |
| Stage | excludes any of: **Real Estate Agent** |

Note: ARCHIVE is a TAG not a stage in FUB.

### Build Order for Each Automation (Actions):
1. Add Tag → intent tag (`hot-buyer` or `potential-seller`)
2. Create Task → urgent call task with emoji prefix
3. Send Email → template (immediate, no delay)
4. Time Delay → 2 days (buyers) / 3 days (sellers)
5. Create Task → text follow-up if no response
6. Remove Tag → original RealScout tag (cleanup)

---

## ⚡ AUTOMATION LIBRARY — 11 LIVE (April 18, 2026)

| Automation | Trigger ID | Action ID |
|------------|-----------|-----------|
| RS Showing Request | 64 | 63 |
| RealScout Property Saved | 40 | 41 |
| RS Market Activity Viewed | 38 | 39 |
| RealScout Property Viewed 3+ | 36 | 37 |
| RealScout HVA Viewed | 34 | 35 |
| RS Message Sent | 67 | 66 |
| RS HVA Valuation Message | 69 | 68 |
| RS Open House Info Viewed | 71 | 70 |
| RS Auto-Archive | 72 | — |
| Homebot Highly Likely to Sell | 73 | — |
| Homebot Likely to Sell Nurture | 74 | — |

✅ Legacy cleanup complete: Likely.AI, Ylopo+LCA Drip, KCM Playbooks all disabled.
Full templates + merge variables → Notion: https://www.notion.so/312b8be96dd981269b05c18f07cf5649

---

## 📧 EMAIL MERGE VARIABLES

**FUB uses % format ONLY. Never use {{ }} or { }.**

| Variable | Output |
|----------|--------|
| `%contact_first_name%` | First name |
| `%contact_name%` | Full name |
| `%greeting_time%` | morning / afternoon / evening |
| `%agent_name%` | Agent full name |
| `%sender_phone%` | Agent phone |
| `%viewed_address%` | Property address |
| `%last_5_preview%` | Last 5 properties viewed |

**Email best practices 2026:** Under 80 words · personalized subject · single CTA · end with question · specific trigger acknowledgment.

---

## 🏷️ REALSCOUT TAG REFERENCE

### Hand-Raising Tags (call immediately 🔴):
`RealScout Showing Request Message` · `RealScout Message Sent` · `RealScout HVA Valuation Message`

### High Intent Tags (🟡 priority follow-up):
`RealScout Property Saved` · `RealScout Property Viewed 3+` · `RealScout HVA Viewed` · `RealScout Market Activity Viewed` · `RealScout Open House Info Viewed`

### System Tags (fix or route — do NOT trigger outreach):
`RealScout Email Validation Failed` · `RealScout Email Rejected` · `RealScout Email Spam Reported` · `RealScout`

### FUB → RealScout Control Tags:
`RealScout Archive Contact` · `RealScout Disable All Alerts` · `RealScout Disable Listing Alerts`

### Homebot FUB Tags:
`#Seller_Homebot` · `#Buyer_Homebot` · `#Homebot_Send-Digest` · `#Homebot_Remove-Client` · `#Homebot_Remove-Home` · `#Homebot_Remove-Both`

**Scout Score >70 = call this week. LTS High = create FUB task immediately.**

**Tag rules:** Case-insensitive. RealScout checks tags once/hour. FUB→RS tags add 20-60 min delay. Bulk simultaneous tagging = spam risk.

---

## 🚿 AUTO NURTURE

Auto Nurture creates alerts in RealScout from FUB contact data. Outcome by data available:

| Outcome | Trigger Condition |
|---------|-----------------|
| **Listing Alert** | Contact interacted with "Popular Homes in Your Area" |
| **Home Value Alert (HVA)** | First address in FUB |
| **Market Activity Alert** | Fallback — zip-level listing activity |
| **Monthly Popular Homes** | Email-only contacts |

---

## 📊 SMART LISTS TO BUILD IN FUB

| List Name | Tags to Filter | Purpose |
|-----------|---------------|---------|
| 🚨 Hand Raisers | `RealScout Message Sent` + `RealScout HVA Valuation Message` | Respond IMMEDIATELY |
| 🔥 High Intent Activity | `RealScout HVA Viewed` + `RealScout Property Saved` + `RealScout Property Viewed 3+` + `RealScout Showing Request Message` | Priority follow-up |
| 🔥 Hot Buyers Today | Tag: `hot-buyer` + Last Activity < 7 days | Active engaged buyers |
| 🏠 Potential Sellers | Tag: `potential-seller` + Stage ≠ Closed | Seller pipeline |
| 📈 Scout Score High | Scout Score > 70 | Heating up — call this week |
| 📈 LTS High (Homebot) | Homebot LTS Score high | Likely to list in 9 months |

**Rule:** Remove tags via FUB Action Plans after 14-15 days. Contacts re-enter on re-engagement.

---

## 🏡 BUYER TRANSACTION DEFAULTS

- Buyer Broker Commission: **3%** (note in every FUB buyer record)
- Default Escrow: **Equity Title of Nevada — Taci Granlund**
- FUB Source: `RealScout` for all RealScout-origin buyers
- Default Stage: `Hot Buyer` ("A - Hot 1–3 Months")
- Intake Tags: community · `Buyer-Active` · age qualifier (55+ if applicable) · property type · target close month · `RealScout` · zip
- **NAR rule (post-Aug 17, 2024):** Written buyer broker agreement BEFORE any showing. No exceptions. Log `Buyer-Agreement-Signed` tag in FUB.

---

## 📍 MARKET AVATARS (Always search for current data)

| Avatar | Budget | Target Area | Driver |
|--------|--------|-------------|--------|
| CA Equity Buyer | $500K equity → $800K–$1.5M | Summerlin / Henderson | Equity migration |
| WA Wealth Migration | $2M–$4M | Henderson luxury | Tax optimization |
| 55+ Downsizer | $500K–$700K single-story | Sun City / Del Webb / Heritage | Lifestyle |
| Luxury | $3M–$10M+ guard-gated | Ridges / Summit / RRCC | Privacy + prestige |
| Divorce Client | Market value, fast | Staying local | Speed + privacy |
| Move-Up Vegas | Current equity | Summerlin West / Skye Canyon | Equity leverage |
| Investor | $400K–$600K | NLV / Henderson | Cap rate / ROI |

---

## 🏗️ BUILDER RELATIONSHIPS

Century Communities · KB Home · Lennar · Pulte · Toll Brothers

Always search current incentives + buydowns before advising.
cadencehenderson.com = new build only, builder pays fee, FREE.

---

## 📍 GBP LOCATIONS (15 total)

NAP everywhere: Dr. Jan Duffy · BHHS Nevada Properties · 702-222-1964.

**Set 1:** Affordable Homes LV (8850 W Sunset #200) · Sun City Summerlin 55+ (9406 Del Webb Blvd) · Summerlin (10777 W Twain #333) · Skye Canyon (10111 W Skye Canyon Park Dr) · Silverstone Ranch (8721 Deering Bay Dr)

**Set 2:** Strip High-Rise (7475 W Sahara #100) · Maravilla/NLV · Henderson (3185 St Rose #101) · Arts District (921 S Main) · Del Webb North Ranch (2290 Beauty Vista NLV) · Centennial Hills (1490 Center Crossing)

**Set 3:** Open House Market Place (11773 Cashmere Mist) · Spanish Trail (5050 Spanish Trail Ln) · Skye Summit (11411 S Highlands #300) · Homestead West (5592 Dapple Gray) · Arroyo@Skyeview (8912 Vanhoy Creek)

Weekly posts = 35% more views · 100+ photos = 520% more calls · Respond ALL reviews <24 hrs.
⚠️ Verify community name before every post. Never duplicate across locations.

---

## 📧 EMAIL SIGNATURE

```
Dr. Jan Duffy | Las Vegas Real Estate Expert 🎰
Berkshire Hathaway HomeServices Nevada Properties
NV License #S.0197614.LLC
702-222-1964
```

---

## 🔄 NOTION COMMAND CENTER

All SOPs, automation details, email templates, and market data:
→ https://www.notion.so/312b8be96dd981269b05c18f07cf5649

Update Notion whenever a new automation is built or changed.

---

## ✅ SESSION CHECKLIST

Before every session:
1. ✅ Read this SKILL.md
2. ✅ Check Last Updated — search for updates if date is stale
3. ✅ Search for market data before quoting any prices
4. ✅ Check Notion for current priorities
5. ✅ For high-stakes work → invoke `plan-and-review` skill
6. ✅ For extended detail (tech stack, MCP capabilities, failure modes, eval criteria) → read `references/detail.md`

---

*v3.0.0 | Updated: 2026-06-26 | Loop Engineering Edition | Detail → references/detail.md + Notion Command Center*
