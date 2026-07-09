# Dr. Jan Duffy — Extended Reference Detail
*Version: 3.0.0 | Updated: 2026-06-26 | Source: CLAUDE.md v3.1.4 backup + v4.0.0 lean core*

---

## TABLE OF CONTENTS

1. [Tech Stack — Full Platform Reference](#tech-stack)
2. [FUB AI Features (March 2026)](#fub-ai)
3. [RealScout Winter 2026 Features](#realscout-features)
4. [Homebot 2026 Features](#homebot)
5. [FUBScouts Architecture](#fubscouts)
6. [Market Specializations](#market-specializations)
7. [SEO & Content Standards](#seo)
8. [NAR Compliance — Buyer Broker Rules](#nar)
9. [Zapier Audit Status](#zapier)
10. [Cowork MCP Capabilities](#mcp)
11. [Failure Modes](#failure-modes)
12. [Eval Criteria](#eval-criteria)
13. [Installed Skills Index](#skills-index)
14. [Backup & Disaster Recovery](#backup)

---

## TECH STACK — FULL PLATFORM REFERENCE {#tech-stack}

### CRM & Leads
| Tool | Role | MCP | Notes |
|------|------|-----|-------|
| **Follow Up Boss** | CRM — system of record | ✅ Full | FUB AI (Mar 2026); Zillow Pro; speed-to-lead <60 sec. ⚠️ 2 connectors — confirm account before modifying contacts |
| **Cloze** | CRM — Sphere (SOI, past clients) | ❌ Manual | Connected to FUB via API key. Syncs bidirectionally. FUB tasks confirmed live in Cloze agenda Apr 29, 2026. NOT a FUB replacement. |
| **BoldTrail / kvCORE** | Enrichment + drip layer | ⚠️ Limited | NOT primary lead source. Enriches FUB contacts (skip-trace, social, behavioral) + drips inactive RealScout users (30+ days). Returns enriched data to FUB. KEEP all FUB↔kvCORE Zaps. |
| **RealScout** | Property search / alerts | ⚠️ Limited | Create client ONLY via MCP; native FUB integration firing (843 contacts tagged HVA Viewed) |
| **Homebot** | Client retention / LTS scoring | ✅ Full | LTS Score (89% accuracy, 9-month). Native FUB integration (Q4 2025) creates contacts source=HOMEBOT. ⚠️ Native does NOT push home address or LTS score back — Zapier `#GetAddresssfromHomeBot` Zap fills that gap. KEEP. |
| **CallAction** | Call tracking + lead capture | ✅ Full | Find, add note, add tag, create contact |
| **IDC Global / Burrow** | Newsletter + neighborhood reports | ❌ Manual | Powers SOI Tier 2 monthly market update. ONE-WAY push: FUB → Burrow. Burrow does NOT push contacts back. |

### Dev & Infrastructure
| Tool | Role | Notes |
|------|------|-------|
| Cursor AI + Next.js 15 | Dev | Primary IDE for website builds |
| Vercel | Hosting | 50+ sites. Son manages dev. |
| GitHub | Version control | Manual commit/push |
| Cloudflare Workers | Edge compute + CDN | 2 accounts |
| Supabase | Database | Confirm project before writes |
| Notion | Command Center | https://www.notion.so/312b8be96dd981269b05c18f07cf5649 |

⚠️ drjanduffy.com repo is under `LetMeHelpYouREALTY` org (not DrJanDuffy).

### Content & Marketing
| Tool | Role | MCP |
|------|------|-----|
| Gamma | ALL client-facing decks | ✅ Full |
| Canva | MLS listing templates (auto-populated Feb 2026) | ✅ Full |
| BombBomb | Video emails | ❌ Manual |
| CloudCMA | CMAs | ❌ Manual |
| Calendly | Scheduling | ✅ Full |
| Otter.ai | Meeting transcription → Notion via Zapier | ❌ Manual |
| Jasper.ai | Brand voice production (10+ pieces) | ❌ Manual |
| Google Drive | File storage (primary) | ✅ Full |

**Never use Box** (rejected). BHHS Document Center = transaction docs only (DocuSign, SkySlope, XpressDocs 360).

**Dual CRM Rule:**
- **FUB** = leads + automation + speed-to-lead
- **Cloze** = sphere of influence + past clients + referral relationships
- They sync bidirectionally via FUB API key in Cloze Settings → Integrations

---

## FUB AI FEATURES — MARCH 2026 {#fub-ai}

All confirmed live as of March 2026:

| Feature | What It Does |
|---------|-------------|
| Call Summaries | AI transcribes and summarizes every logged call |
| Lead History Recaps | One-click summary of full contact history before calling |
| Task Suggestions | AI suggests next-best action based on lead behavior |
| AI Reply Drafts | Draft emails/texts in Dr. Jan's voice from the contact record |
| Auto High-Intent Tags | Auto-applies tags to Zillow buyers and qualified sellers |
| Zillow Pro Integration | Client branding inside Zillow + behavior insights pushed to FUB |
| Speed-to-Lead | Target: under 60 seconds — 21x more likely to convert |

---

## REALSCOUT WINTER 2026 FEATURES {#realscout-features}

Three AI features released February 2026. All confirmed live.

**1. AI Search** — First MLS-aware natural language property search. Creates sophisticated searches in ~30 seconds. Shows every filter and assumption (all editable). AND/OR filtering. Use: convert client wish lists → automatic MLS alerts in under 1 minute.

**2. Scout Score (0–100)** — Engagement score assigned nightly + after major actions. Triggers: survey completion OR significant spike in search activity. Smart List of Scout Score > 70 = call this week.

**3. Contact Enrichment** — Auto-fills: Name · Phone · Address · Owner vs. Renter status · Length of residence. Unlocks Home Value Alerts + Market Activity Alerts for incomplete contacts.

---

## HOMEBOT 2026 FEATURES {#homebot}

| Feature | Details |
|---------|---------|
| Likelihood to Sell (LTS) Score | AI-powered, 89% accuracy, 9-month prediction window |
| Native FUB Integration (Q4 2025) | Add/remove clients, trigger digests, track LTS in FUB |
| Home Search (Buyers) | Financial insights on every listing + Chrome extension |
| Monthly Digest | 0.6% unsubscribe rate — industry best |

---

## FUBSCOUTS ARCHITECTURE {#fubscouts}

**Mental model:** FUB = source of truth for contacts + action plans + ownership. RealScout = listing alerts + home value alerts + engagement tracking.

**Critical Rules:**
- ALL contact edits, imports, and ownership changes MUST happen in FUB — syncs to RealScout
- FUB overrides RealScout contact details (FUB is primary system of record)
- Contacts sync from FUB → RealScout as long as they have an email address
- Contacts pushed from RealScout into FUB receive tag: **`RealScout`**
- Removing a team member from the integration may cause lead loss — use caution

**Integration Setup:** FUB Admin → API → Generate API key → RealScout → realscout.com/agent/marketing/integrations → Enter API key → Connect → "CONNECT TEAM MEMBERS" → Enable "Transfer Leads"

**Data in FUB Contact Record (from RealScout):**
- Right Activity Panel: listing views, saves, dashboard views
- Center Notes: client messages, showing suggestions, high-engagement notes
- Left Custom Fields: alert counts + RealScout alert link
- Tags: engagement-based tags (HVA viewed, etc.)

---

## MARKET SPECIALIZATIONS {#market-specializations}

**Primary:** Summerlin West luxury $800K–$10M+ (The Ridges, The Summit, Red Rock CC, Shelby, Stonebridge)

**55+:** Sun City, Del Webb, Heritage at Stonebridge

**Luxury High-Rise:** Strip condos

**New Construction:** Century, KB, Lennar, Pulte, Toll Brothers

**Sensitive:** Divorce, probate — consultant-first

**Range:** $300K–$5M+

**Coverage:** Skye Canyon, Centennial Hills, The Vistas, Henderson, North Las Vegas

---

## SEO & CONTENT STANDARDS — 2026 {#seo}

**March 2026 Google Core Update** targets scaled AI content abuse. 73% of top-ranking content shows firsthand experience. 44% of LLM citations from first 30% of article.

**E-E-A-T + Hyperlocal > Zillow. Mobile-first (62% traffic).**

**Video:** 3x/week TikTok/Reels, vertical, 15–30 sec, 2-sec hook, captions required (403% more inquiries vs static).

**GBP:** Weekly posts = 35% more views. 100+ photos/location. Respond to all reviews <24 hrs. 50+ reviews per location goal.

**3-5-7 Content Rule:** 3 videos/week · 5 GBP posts/week · 7 social engagements/day.

**Schema — AggregateRating JSON-LD:** `lib/schema/aggregateRating.ts` helper. Set `NEXT_PUBLIC_GBP_AGGREGATE_RATING_VALUE` + `NEXT_PUBLIC_GBP_AGGREGATE_RATING_COUNT` per-site in Vercel once a GBP hits 5+ reviews.

**Sitemap `<lastmod>`:** Frozen per deploy via `BUILD_DATE_ISO`.

**robots.txt:** Explicit `Allow` for 9 AI crawlers + social previews.

---

## NAR COMPLIANCE — BUYER BROKER RULES (POST-AUG 17, 2024) {#nar}

**MUST — before showing ANY home (incl. virtual tours):**
1. Written buyer broker agreement signed. No showings without it.
2. Compensation disclosed — specific amount or rate (not "market rate").
3. "Not set by law, fully negotiable" language in every buyer agreement.
4. No compensation steering.

**Buyer email intake checklist:**
1. Agreement status?
2. If none → schedule buyer consult BEFORE tour
3. Compensation rate in FUB note
4. Log `Buyer-Agreement-Signed` tag

---

## ZAPIER AUDIT STATUS (April 29, 2026 — FINAL) {#zapier}

- **38 Zaps → target 25 active by May 19, 2026**
- **KILL list LOCKED at 13 Zaps:** 5 FUB↔Cloze redundancies + 2 architectural violations (KvCore→Cloze, KvCore→Homebot ID 339362508) + 4 duplicates + 2 stale (Mojo, Letmehelpyourrealtor)
- **KEEP:** Homebot Zaps #6 #7 (fill native address-pull gap) · FUB↔kvCORE Zaps (enrichment + drip) · Curb Hero→kvCORE (open house lead drip)
- **Homebot→FUB bridge:** NOT redundant. Zap pulls home address + LTS score → FUB Automations 73, 74.
- Full runbook: Notion Command Center.

---

## COWORK MCP CAPABILITIES (April 29, 2026) {#mcp}

*Confirm account before ANY write on dual-account MCPs (Gmail/FUB/Homebot/CallAction/Cloudflare).*

### ✅ Full Access
Gmail Full (2 accounts) · Gmail Read-Only · Google Calendar · Google Drive · Notion · Airtable · Vercel · Canva · Gamma · Calendly · Supabase · Cloudflare Workers/D1/KV/R2 (2 accounts) · Open Brain · Scheduled Tasks · Claude in Chrome · Control Chrome · Follow Up Boss (2 accounts) · Homebot (2 accounts) · CallAction (2 accounts) · Parallel Search MCP (web_search + web_fetch)

### ⚠️ Limited
kvCORE (create/update only, no search via MCP) · RealScout (create client only) · Figma (design context only)

### ❌ Not Connected (manual required)
BombBomb · CloudCMA · GitHub (manual commit/push) · Zapier · IDC Global / Burrow · Asana (migrated to Notion)

---

## FAILURE MODES — "WRONG LOOKS LIKE THIS" {#failure-modes}

### Client Emails
❌ Generic stats not tied to their neighborhood · Zillow/Redfin mentions · >1 question · >80 words · ≥2 CTAs · "I" more than twice
✅ Specific address + price + insider detail + their situation + one CTA

### FUB Automation Templates
❌ `{{ }}` / `{ }` merge variables · missing trigger acknowledgment · >80 words · missing ARCHIVE/Trash/RE Agent exclusion conditions
✅ Under 80 words · `%merge%` format · specific trigger reference · one CTA · question at end

### Market Data / CMAs
❌ Memory-based prices · national/statewide stats · range when they need a number
✅ Search → specific address + price + date + insider detail

### GBP Posts
❌ Generic "market is hot" · not geo-targeted · missing 702-222-1964 · <80 or >300 words · no CTA
✅ Hyperlocal stat + specific property + community + 702-222-1964 + question

---

## EVAL CRITERIA {#eval-criteria}

| Output | Pass | Fail |
|--------|------|------|
| Client email | <80 words · specific data · one CTA · sounds like Dr. Jan | >100 words · generic · multiple CTAs |
| FUB automation | 6 steps · `%merge%` · exclusions · tag cleanup | missing conditions · `{{ }}` · no tag removal |
| GBP post | geo-targeted · 702-222-1964 · hyperlocal stat · question | generic · no phone · no location |
| Market analysis | source cited · date · neighborhood-level · address proof | memory · national · no date |
| Video script | 2-sec hook · 15–30 sec vertical · clear CTA | no hook · too long · horizontal |
| Scheduled task | self-contained · produces file · defined output | requires presence · vague |

---

## INSTALLED SKILLS INDEX (Canonical as of June 2026) {#skills-index}

⚠️ Where a skill exists both as unprefixed and `dr-jan-skills-v2:*`, **unprefixed is canonical** (newest content).

| Category | Skill | Purpose |
|----------|-------|---------|
| Core OS | `dr-jan-skills-v2:dr-jan-duffy-realscout-fub` | FUB automations, RealScout tags, Homebot flows, SOPs |
| Command Ref | `dr-jan-skills-v2:dr-jan-commands` | 69-command guide + skill routing |
| Client Decks | `dr-jan-skills-v2:gamma-client-materials` | All client-facing decks → Gamma MCP |
| Listing | `dr-jan-skills-v2:sharran-listing-strategy` | Invitation Framework .docx |
| Listing | `listing-domination` | Expired/FSBO capture, pre-listing, objections |
| Listing | `mls-photo-optimizer` | Photo sequencing for MLS CTR |
| Buyer | `realscout-buyer-workflow` | Buyer intake → FUB → email |
| Buyer | `lead-conversion-system` | Tom Ferry + 60-sec scripts |
| Sphere | `soi-referral-engine` | 3-Tier SOI + anniversary touches |
| Content | `content-brand-authority` | Video, Reels/TikTok, GBP, calendar, blog |
| Memory | `open-brain-best-practices` | Capture session insights |
| GBP | `gbp-loop-orchestrator` | 19-location GBP weekly post loop |
| Critical Think | `plan-and-review:plan-and-review` | 6-gate deep dive for high-stakes work |
| Ops | `schedule` · `setup-cowork` · `skill-creator` · `mcp-builder` | Scheduled tasks, onboarding, skill building |
| Docs | `docx` · `pptx` · `xlsx` · `pdf` | Document creation |

---

## BACKUP & DISASTER RECOVERY {#backup}

- **Backup retention:** Keep last 3 major versions in `.claude/` (`CLAUDE.md.backup-v{N}-YYYY-MM-DD`).
- **Git mirror:** Add CLAUDE.md + `.claude/skills/` to private repo under DrJanDuffy org (`DrJanDuffy/claude-config`). Weekly push.
- **Platform exit plan:** If Cowork fails — core identity + voice + CTAs + FUB tag reference pastes directly into Claude.ai Projects as system prompt.

---

*detail.md v3.0.0 | Updated: 2026-06-26 | Part of dr-jan-duffy-realscout-fub skill v3.0.0*
