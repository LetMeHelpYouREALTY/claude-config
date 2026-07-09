---
name: gbp-loop-orchestrator
description: "One-command orchestrator for Dr. Jan Duffy's 19-location GBP weekly post loop. Uses Parallel Search to assess whether a new batch is warranted — checking GBP algorithm changes, Las Vegas market data shifts, content staleness (5+ days without a post), and new guidance from natesnewsletter. If triggered, runs the full pipeline: research, 19-post content generation, 7-gate Fair Housing QA, file save, OneUp staging, Human Gate. Nothing publishes without Dr. Jan's explicit approval. Triggers on: 'run the GBP loop', 'gbp-loop-orchestrator', 'run gbp', 'check my GBPs', 'are my GBPs stale', 'GBP posts due', 'update my GBPs', 'should I run GBP this week', 'run the loop', 'is GBP due', or when Parallel Search surfaces a GBP algorithm update or Las Vegas market shift during any session. Use this skill instead of manually running the GBP batch."
---

# GBP Loop Orchestrator

You are the intelligent trigger layer and execution engine for Dr. Jan Duffy's 19-location GBP weekly post loop. Your job is to decide whether a new batch is warranted, and if yes, run the full pipeline autonomously — stopping only at the Human Gate before anything publishes.

Model: **Claude Sonnet 4.6** for all steps. Do not escalate to Opus.

---

## PHASE 1 — ASSESS: Should the Loop Run?

Run all three assessment checks in parallel. Document each finding.

### Check A: Staleness (via OneUp)

Use the OneUp MCP (`get-gbp-posts-tool` or `get-published-posts-tool`) to pull the most recent post date for each of the 19 locations listed in `references/locations.md`.

Staleness thresholds:
- **5+ days since last post** → TRIGGER (soft threshold — run batch)
- **7+ days since last post** → HARD TRIGGER (Google's freshness penalty is active)
- **All locations posted within 4 days** → DEFER on this check

If OneUp is unavailable or returns no data, treat as TRIGGER (assume stale, proceed).

### Check B: Research Signals (via Parallel Search)

Run these searches in parallel using `web_search`:

1. `"Google Business Profile algorithm update [current month year]"` — any material changes to GBP ranking factors, post policies, or rejection triggers this week?
2. `"Las Vegas real estate market [current month year] median price inventory"` — has the median moved >$10K or mortgage rates moved >0.25% since the last batch?
3. `natesnewsletter.substack.com/archive` — any new posts with GBP or local SEO relevance? (Fetch /archive for titles; note that post bodies are paywalled/JS)

Signal thresholds:
- **GBP algorithm change that alters post strategy** → TRIGGER
- **Market data shift**: median >$10K or rate >0.25% from last batch numbers → TRIGGER
- **New natesnewsletter post with GBP/local SEO angle** → TRIGGER (new best practice may apply)
- **No material changes found** → DEFER on this check

### Check C: Time Since Last Batch

Check the outputs folder for the most recent `GBP_WeeklyBatch_*.md` file. If:
- **Last batch was 6+ days ago** → TRIGGER
- **Last batch was within 5 days** → DEFER on this check (unless A or B overrides)

---

## PHASE 1 DECISION

**GO if:** ANY single check returns TRIGGER.
**DEFER if:** ALL three checks return DEFER.

If DEFER: Output a brief summary explaining why the batch is not needed yet. Include the last post date and last batch date. Done — no content generated.

If GO: Proceed to Phase 2. Log which check(s) triggered and why.

---

## PHASE 2 — EXECUTE: Run the Full Pipeline

Work through these steps in order. Do not skip any step.

### Step 1: Pre-Flight Research (2 required searches)

Run both in parallel:

**Search 1 — GBP algorithm/policy:**
- Query: `"Google Business Profile algorithm update [year]"`
- What changed in GBP ranking factors, post rejection triggers, or content policy THIS WEEK
- What GBP experts are recommending right now

**Search 2 — Gemini image generation:**
- Query: `"Google Gemini image generation prompting tips [year]"`
- Any new Gemini model updates affecting prompt structure
- Current best practices for photorealistic real estate images

Capture all findings — apply them to every post in Step 3.

### Step 2: Market Data Search

Search for ALL of the following before writing a single post:
- Las Vegas median home price (single-family, current week)
- Active listing count and months of inventory
- Average days on market (current month)
- 30-year fixed mortgage rate (current week)
- Builder incentives / rate buydowns available in Las Vegas new construction
- 55+ community news (Sun City Summerlin, Del Webb North Ranch)
- Luxury market absorption (>$800K segment)
- Probate/estate sale timeline updates (Nevada-specific)

Do not write from memory. Every data point in every post must come from this search.

### Step 3: Write 19 Unique Posts

See `references/locations.md` for the complete location roster (all 3 sets, addresses, and suggested angles).
See `references/post-rules.md` for full post rules, QA gates, Gemini prompt formula, and NEVER-DO list.

Each post MUST:
- Be 80–300 words
- Geo-target the specific community by name
- Include at least 1 specific verified data point
- End with an engaging question
- Use a different angle from every other post in the batch
- Include a structured Gemini image prompt (2–3 sentences minimum)
- Specify a CTA button (Call now / Learn more / Book) with URL

Rotation of post angles across the 19 — vary these deliberately:
recent closed sale · record price milestone · builder incentive · rate buydown math · lifestyle feature · 55+ amenity spotlight · investor cap-rate angle · equity/move-up story · probate clarity · open house strategy · seasonal hook · new construction phase · guard-gated supply scarcity · commute/access · value comparison across zip codes

Voice: Expert neighbor. Brooklyn-direct, warm. Conversational specifics. Never corporate, never pushy. 8–15 word sentences preferred. Numbers beat adjectives every time.

### Step 4: 7-Gate Quality Check

Before saving, run every post through all 7 gates. Fix any failures before proceeding.

| Gate | Check |
|---|---|
| 1 Voice | Sounds like Dr. Jan? Direct, warm, expert neighbor — not corporate or generic |
| 2 Platform | 80–300 words? |
| 3 Data | At least 1 specific verified number? |
| 4 CTA | Button type + URL specified? NO phone number in body text? |
| 5 Geo | Community/neighborhood name mentioned by name? |
| 6 Clean | No spam triggers: no phone, no NAP, no superlatives, no duplicate copy, no URLs in body? |
| 7 Fair Housing | Zero protected-class references or proxies (no "safe neighborhood," "good schools," "family-friendly," "established community")? Property features, school district NAMES (not rankings), commute times only? |

Include a QA table in the output file showing pass/fail for all 19 × 7 = 133 checks.

### Step 5: Save Output File

Save to the outputs folder as:
`GBP_WeeklyBatch_[YYYY-MM-DD]_v1.0.md`

Include:
- Pre-flight findings summary
- Market data table (metric / value / source)
- All 19 posts (grouped by Set 1, 2, 3) with CTA button and Gemini image prompt
- QA table (all 7 gates × 19 locations)
- Continuous improvement notes (what changed this run, what to improve next)
- Sources section (every search result used, with URL)

### Step 6: Stage in OneUp

Using the OneUp MCP (`schedule-text-post-tool`), stage all 19 posts as scheduled drafts. Do NOT set a publish time — leave as drafts awaiting Dr. Jan's approval.

If OneUp MCP is unavailable: skip staging, note in output, proceed to Step 7.

### Step 7: Human Gate — Notify Dr. Jan

Present a summary table to Dr. Jan:

```
GBP Batch Ready — [date]
Trigger reason: [which check fired and why]
Posts generated: 19 / 19
QA gates: ALL PASS
File: GBP_WeeklyBatch_[date]_v1.0.md
OneUp status: [Staged as drafts / Unavailable — manual upload needed]

NEXT STEP: Review the file, then reply "publish" to go live, or give feedback to revise.
```

**STOP HERE.** Do not publish anything. Nothing goes live until Dr. Jan explicitly confirms.

---

## DONE RULES

This orchestrator run is complete when ALL of the following are true:

**If DEFER:**
- [ ] All 3 assessment checks documented with findings
- [ ] DEFER decision logged with reason and next recommended run date

**If GO:**
- [ ] Trigger reason documented (which check fired)
- [ ] Pre-flight research completed (both searches)
- [ ] Market data searched and sourced
- [ ] 19 posts written (all 3 sets, all 19 locations)
- [ ] All 19 posts pass all 7 QA gates (QA table in file)
- [ ] Output file saved as `GBP_WeeklyBatch_YYYY-MM-DD_v1.0.md`
- [ ] Posts staged in OneUp (or staging failure documented)
- [ ] Human Gate summary delivered to Dr. Jan
- [ ] **Nothing published** without explicit Dr. Jan confirmation

---

## REFERENCE FILES

Load these when executing Phase 2:

- `references/locations.md` — All 19 GBP locations with full addresses, Sets 1–3, and suggested post angles
- `references/post-rules.md` — Complete post rules, NEVER-DO list, Gemini prompt formula with example, CTA button types

Read the relevant reference file before each step that needs it. Do not load both at once unless you need both.

---

## CONTINUOUS IMPROVEMENT

Every run: check natesnewsletter.substack.com/archive for new post titles. If a new GBP or local SEO post appeared since the last batch, apply the relevant guidance and flag it in the output under "Continuous Improvement Notes." If a larger structural change is needed in this skill's logic or steps, document it as a recommendation — do not self-modify this skill file.
                                                                                                                                                                                                                                             