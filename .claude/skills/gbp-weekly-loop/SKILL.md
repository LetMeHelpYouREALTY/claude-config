---
name: gbp-weekly-loop
description: >
  End-to-end orchestration for Dr. Jan's 15 GBP location weekly posting loop.
  Triggers on: "run the GBP loop", "gbp-weekly-loop", "GBP posts due",
  "update my GBPs", "are my GBPs stale", or automatically when any GBP location
  is 5+ days since last post (7-day hard-stale threshold per Google 2026).
  Fires the full pipeline: staleness check → content generation (10 posts) →
  Fair Housing audit → stage via OneUp → host images → write week file →
  notify Dr. Jan with summary table → await "publish" confirmation → go live.
  Human Gate enforced — nothing auto-publishes. Also handles GBP API not-yet-approved
  state by treating batch as staged drafts only.
---

# GBP Weekly Loop — Orchestration Skill
**Last Updated:** 2026-06-19
**Version:** 1.0
**Trigger Keyword:** `gbp-weekly-loop` (or simply say "run the GBP loop")

---

## WHAT THIS SKILL DOES

End-to-end orchestration for Dr. Jan's **15 GBP location weekly posting loop**.
One command fires the full pipeline:

> Staleness check → Content generation (10 posts) → Stage via OneUp → Host images → Write week file → **Notify Dr. Jan (Step 9)** → Await "publish" → Go live

---

## TRIGGER — WHEN TO FIRE

### Staleness Definition (2026 Google Standard)
- **Hard stale:** 7 days since last published post → prominent Map Pack visibility drops (source: Verlua GBP Strategy Guide, April 2026 + Sendible multi-location data 2025)
- **Soft stale / alert threshold: 5 days** — fire this skill with a 2-day buffer so generation + approval can happen before Google demotes the profile
- **"Alive profile" signal (2026):** Google now weighs post activity, photo freshness, and review velocity as a combined freshness signal. A profile dormant >7 days loses the activity edge in position 1 vs position 5 Map Pack comparisons (source: OPositive local ranking research 2026)

### Fire Automatically When ANY of These Are True:
1. **5+ days since last published GBP post** on any of the 15 locations (checked via `get-gbp-posts-tool` for each location)
2. **Today is Thursday** (weekly cadence trigger — gives a 2-day approval window before the weekend, when 46% of local searches happen)
3. **Manual override:** User says "run the GBP loop" or "GBP posts due" or "update my GBPs"

### Do NOT Fire When:
- Posts were published within the last 4 days across all active locations
- Dr. Jan has flagged "pause GBP loop" in FUB or in conversation
- A Google API suspension or verification event is active (check `get-gbp-overview-tool` for warnings)

---

## GOALS

| # | Goal | Target |
|---|---|---|
| G1 | Zero stale GBP locations | All 15 locations have a post ≤7 days old after publish |
| G2 | 10 staged posts ready for one-click approval | 10 posts with hosted images in OneUp queue |
| G3 | Hyperlocal content — no generic "Vegas market" filler | Each post tied to a specific location from the 15-GBP roster |
| G4 | Dr. Jan reviews before anything goes live | Human Gate enforced — no auto-publish without "publish" confirmation |
| G5 | Week file written for audit trail | `GBP_WeeklyLoop_YYYY-MM-DD_v1.0.md` saved to outputs |
| G6 | Fair Housing compliant | Zero protected-class proxies in any post (auto-audit before staging) |

---

## STEPS

### PRE-FLIGHT (Steps 1–3)

**STEP 1 — Check GBP API Access Status**
```
Tool: get-gbp-overview-tool (OneUp MCP, all GBP accounts)
Check: Is the Google Business Profile API approved and active?
  - YES → proceed
  - NO → flag "API NOT APPROVED — these are staged drafts only, not live posts"
            (see SETUP_RUNBOOK.md for approval steps)
            Continue with steps 2–9 but mark every output as DRAFT STATUS.
```

**STEP 2 — Staleness Audit (All 15 Locations)**
```
Tool: get-gbp-posts-tool (OneUp MCP)
Run for each of the 15 GBP locations in parallel (use list-social-accounts-tool 
to get all GBP account IDs first).

For each location, record:
  - Location name
  - Last post date
  - Days since last post
  - Status: FRESH (<5 days) | ALERT (5–6 days) | STALE (7+ days)

Sort: STALE first, ALERT second, FRESH last.
Log this as the "Staleness Report" — it feeds Step 9 summary.
```

**STEP 3 — Research: This Week's Hyper-Local Stats**
```
Tool: Parallel Search MCP (web_search)
Fire 3 parallel searches:
  1. "Las Vegas home sales [current week] Summerlin Henderson closed"
  2. "Las Vegas luxury real estate [current month] 2026 prices"  
  3. "Sun City Summerlin Del Webb active adult community [current month] 2026"

Goal: 3+ data points with address/price/date for use in posts.
Source and date-stamp every stat. UNKNOWN if unverifiable — never fabricate.
```

---

### CONTENT GENERATION (Steps 4–6)

**STEP 4 — Assign Posts to Locations**
```
Priority order (from Step 2 Staleness Report):
  - All STALE locations get a post this batch (mandatory)
  - ALERT locations fill remaining slots up to 10
  - FRESH locations: skip unless batch target not met

Default batch size: 10 posts per weekly loop.
If <10 stale/alert locations: still generate 10 by doubling up on highest-traffic 
locations (Summerlin, Henderson, Sun City Summerlin, Strip High-Rise).
```

**STEP 5 — Generate Post Content (10 posts)**

For each assigned location, generate one post using this structure:

```
STRUCTURE:
  - Line 1 (80 chars max — mobile cutoff): Hyperlocal stat or insider detail
  - Line 2: Connect to buyer/seller/55+ situation
  - Line 3: CTA — "Call/text [SITE PHONE NUMBER]"
  - Post length: 80–300 words
  - Include: 1 question to drive engagement

CONTENT RULES:
  ✅ Geo-target to the EXACT location name (verify against GBP roster)
  ✅ Minimum 3 numbers per post (price, days, percentage, etc.)
  ✅ Use stats sourced from Step 3 — always cite "closed [date]"
  ✅ Phone number = SITE-SPECIFIC CallAction tracking number (see phone registry)
     drjanduffy.com locations = 702-500-1064
     duffyrealtyoflasvegas.com = 702-500-1942
     drjanetduffy.com = 702-766-7668
     All other GBP CTAs = 702-222-1964
  ❌ No "safe neighborhood" / "good schools" / "family-friendly" — Fair Housing audit
  ❌ No generic "Las Vegas market is hot" without address+date proof
  ❌ No Zillow/Redfin mentions
  ❌ No identical posts across locations
  ❌ No stock photo descriptions — real property references only

VOICE: Brooklyn-tough PhD realtor. 8–15 word sentences. Specifics > adjectives.
```

**STEP 6 — Fair Housing Compliance Audit**
```
Before staging ANY post, run the FH audit checklist on each:

FAIL (must rewrite) if post contains:
  - "safe" / "unsafe" (neighborhood safety reference)
  - "good schools" / "top schools" / "school district ranking"
  - "family-friendly" / "great for families"
  - "established community" / "prestigious neighborhood"
  - Any reference to who lives there or who should live there

PASS = post contains only:
  ✅ Property features (sq ft, beds, baths, lot size, upgrades)
  ✅ Amenities (golf course, clubhouse, pool — physical features)
  ✅ School district NAMES only (not rankings)
  ✅ Commute times (objective data)
  ✅ Price + DOM + closed date

Log audit result per post. Any FAIL = rewrite before Stage.
```

---

### STAGING + FILE OUTPUT (Steps 7–8)

**STEP 7 — Stage Posts via OneUp MCP**
```
Tool: schedule-image-post-tool OR schedule-text-post-tool (OneUp MCP)

For each of the 10 approved posts:
  1. Select correct GBP account ID from list-social-accounts-tool
  2. Stage post with:
     - Text content (from Step 5, FH-cleared in Step 6)
     - Image: Use Google Drive hosted URL if available, or note "IMAGE NEEDED"
       Image specs: JPG/PNG, 720×720px min, 10KB–5MB, no stock photos
     - CTA button: "Call" or "Learn More" (default: "Learn More")
     - Schedule: Set to "pending Dr. Jan approval" (do NOT auto-publish)
  3. Confirm staging — read back staged post ID from OneUp response
  4. Log: Location | Post headline (first 80 chars) | OneUp post ID | Image status

DATA GATE: After staging all 10, call get-scheduled-posts-tool and 
verify 10 posts appear in queue. Actual count must equal 10.
If actual ≠ 10: stop, report exact gap (which locations are missing), do NOT proceed.
```

**STEP 8 — Write Week File**
```
Create file: GBP_WeeklyLoop_YYYY-MM-DD_v1.0.md in outputs folder

File contents:
  - Header: Date, batch #, API status (approved/pending)
  - Staleness Report table (from Step 2)
  - 10 staged posts (location, headline stat, OneUp post ID, image status)
  - Research citations (Step 3 sources + dates)
  - Fair Housing audit log (pass/fail per post)
  - Publish instructions for Dr. Jan

Verify file written and readable before proceeding to Step 9.
```

---

### NOTIFY + GATE (Steps 9–10)

**STEP 9 — Notify Dr. Jan** ← *The step you specified*

Deliver this summary in chat:

```
---
📍 GBP WEEKLY LOOP — BATCH READY [DATE]
---

10 posts staged across [N] locations. Here's your lineup:

| # | Location | Headline Stat (first 80 chars) | Image | OneUp ID |
|---|---|---|---|---|
| 1 | [Location Name] | [stat] | ✅ hosted / ⚠️ needed | [ID] |
| 2 | ... | ... | ... | ... |
[... through 10]

STALENESS STATUS:
  🔴 STALE (7+ days): [list]
  🟡 ALERT (5–6 days): [list]  
  🟢 FRESH (<5 days): [list — not in this batch]

WEEK FILE: ✅ Written → GBP_WeeklyLoop_[DATE]_v1.0.md

IMAGES: [X/10 hosted] | [Y/10 still need an image before publish]
⚠️ Posts marked "IMAGE NEEDED" will publish text-only unless you add 
   an image in OneUp before confirming.

---
GBP API STATUS: 
  [IF APPROVED]: ✅ Live posting enabled. Reply "publish" (or run 
  npm run publish:week / use gbp_publish_week with confirm) to go live.
  
  [IF NOT APPROVED]: ⛔ Google Business Profile API access is not yet 
  approved for this account. These are STAGED DRAFTS ONLY — nothing will 
  post live until API access is granted. See SETUP_RUNBOOK.md for 
  approval steps. Reply "publish" to queue for immediate release once 
  access is approved.
---
```

**STEP 10 — Publish on Confirmation**
```
WAIT for Dr. Jan to reply "publish" (or equivalent: "go", "send it", 
"looks good", "run publish:week", or confirms via gbp_publish_week tool).

On confirmation received:
  Tool: OneUp MCP — edit-post-tool OR schedule-image-post-tool 
        (reschedule each staged post to "now" or next available slot)
  
  For each of the 10 posts:
    1. Trigger publish / move from staged to scheduled-now
    2. Confirm post appears in get-published-posts-tool response
    3. Log: published timestamp + GBP location

DATA GATE: Read back via get-published-posts-tool.
  Intended: 10 posts
  Confirmed: [actual count]
  If actual ≠ intended: report exact gap — which locations failed — 
  do NOT declare "done."

Final report to Dr. Jan: "Published [N]/10 posts. [Locations] are now live."
```

---

## DONE RULES — PASS/FAIL CHECKLIST

The loop is COMPLETE (and only complete) when ALL of the following are true:

| Rule | Check |
|---|---|
| D1 | Step 2 staleness audit run for all 15 locations, results logged |
| D2 | Step 3 research yielded ≥3 verified data points with source + date |
| D3 | All 10 posts generated with ≥3 numbers each and hyperlocal reference |
| D4 | Fair Housing audit: 10/10 posts PASS (zero FH flags) |
| D5 | Step 7 staging verified: get-scheduled-posts confirms 10 posts in queue |
| D6 | All staged posts use site-specific phone numbers (not swapped) |
| D7 | Week file written and readable: GBP_WeeklyLoop_YYYY-MM-DD_v1.0.md |
| D8 | Step 9 notification delivered with full table + API status disclosure |
| D9 | Human Gate respected — nothing published until Dr. Jan says "publish" |
| D10 | On publish: read-back confirms actual published count = 10 (or gap reported) |

**PARTIAL = FAIL.** Never report "done" on a partial batch.
"No error" ≠ "posted." Always read back.

---

## FAILURE MODES — WHAT WRONG LOOKS LIKE

| Failure | Detection | Response |
|---|---|---|
| GBP API not approved | Step 1 check | Flag immediately, continue as DRAFT mode, note in Step 9 notification |
| OneUp can't find a GBP account | list-social-accounts returns no GBP | Stop, report missing account IDs to Dr. Jan |
| Staged post count <10 | D5 gate fails | Report exact gap (which locations missing), do NOT proceed to notify |
| Post contains generic "market is hot" | Step 6 FH audit | Rewrite with specific address+price+date before staging |
| Image missing for a post | Step 7 log shows "IMAGE NEEDED" | Flag in Step 9 summary — Dr. Jan decides: publish text-only or hold |
| Week file write fails | D7 check | Retry write, then paste summary inline in chat as fallback |
| Dr. Jan says "publish" but API not approved | Step 10 check | Queue the publish action, notify: "Staged for immediate release when API access granted" |
| Published count < intended | D10 gate | Report exact locations that failed, do NOT declare success |

---

## LOCATION REFERENCE (15 GBP LOCATIONS)

Verify community name before EVERY post. Never duplicate content across locations.

**Set 1:** Affordable Homes LV (8850 W Sunset #200) · Sun City Summerlin 55+ (9406 Del Webb Blvd) · Summerlin (10777 W Twain #333) · Skye Canyon (10111 W Skye Canyon Park Dr) · Silverstone Ranch (8721 Deering Bay Dr)

**Set 2:** Strip High-Rise (7475 W Sahara #100) · Maravilla/NLV · Henderson (3185 St Rose #101) · Arts District (921 S Main) · Del Webb North Ranch (2290 Beauty Vista NLV) · Centennial Hills (1490 Center Crossing)

**Set 3:** Open House Market Place (11773 Cashmere Mist) · Spanish Trail (5050 Spanish Trail Ln) · Skye Summit (11411 S Highlands #300) · Homestead West (5592 Dapple Gray) · Arroyo@Skyeview (8912 Vanhoy Creek)

**NAP:** Dr. Jan Duffy · BHHS Nevada Properties · [site-specific phone]

---

## RESEARCH SOURCES (BAKED IN — verified 2026-06-19)

| Finding | Source | Date |
|---|---|---|
| Posts lose prominent visibility after 7 days | Verlua GBP Strategy Guide | April 2026 |
| 2–3×/week = optimal frequency | TheStacc GBP Posting Frequency Guide | March 2026 |
| Listings with recent posts get 21% more interactions | Birdeye State of GBP Report | 2025 |
| GBP signals = 32% of Map Pack ranking factors | Whitespark Local Search Ranking Factors | 2025 |
| "Alive profile" signal: post activity + photo freshness + review velocity | OPositive local ranking research | 2026 |
| 5.6× more clicks with real photos vs stock | Wiremo GBP Best Practices | May 2026 |
| Weekly posting = 35% more views | CL