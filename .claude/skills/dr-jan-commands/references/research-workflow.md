# Market Research Workflow Commands
*Load when pulling MLS data, analyzing builder inventory, researching SEO/Google
updates, tracking mortgage rates, or doing competitive analysis.*

---

## The Research Session Pattern

```
/compact (start fresh) → research → /memory (save findings) → /export (save report)
→ /loop (if polling) → /insights (session review)
```

---

## Command-by-Command Playbook

### `/memory`
**Save new market data, SOPs, and insights directly to CLAUDE.md.**
**What it does:** Opens CLAUDE.md editor. You can add new data, update rules,
or enable auto-memory to capture facts automatically.
**Dr. Jan use cases:**
- Save new Summerlin median price after verifying current sales
- Add new FUB tag discovered during RealScout update
- Update builder incentive rates after a KB/Pulte conversation
- Record a new 55+ community opening or Del Webb release
**Rule:** After any research session where you confirm new market data, run
`/memory` to lock it into CLAUDE.md before closing.

---

### `/compact [focus]`
**Keep research sessions running without losing key findings.**
**Example:** `/compact keep all verified MLS prices, builder names, and data
sources intact`
Run when: context bar hits ~60% during a long research session. All verified
data and sources are preserved in the summary.

---

### `/export [filename]`
**Save completed market reports as text files.**
**File naming format:** `Neighborhood_MarketReport_YYYY-MM-DD_v1.0`
**Examples:**
- `/export Summerlin_MarketReport_2026-04-01_v1.0`
- `/export SunCity_55Plus_Analysis_2026-04-01_v1.0`
- `/export BuilderInventory_CenturyCommunities_2026-04-01_v1.0`

---

### `/loop [interval] <prompt>`
**Poll for real-time data during active research sessions.**
**Real estate use cases:**
- `/loop 30m search for new Summerlin MLS listings priced $800K-$1.2M`
- `/loop 1h check for RealScout platform updates or new feature releases`
- `/loop 15m monitor Vercel build — report when deploy completes`
**Stops** when you end the session.

---

### `/insights`
**Generate a report analyzing your Claude Code sessions.**
**What it shows:** Project areas, interaction patterns, friction points, model
preferences.
**Dr. Jan use:** Run weekly or monthly to see which research workflows are most
efficient and where time is being spent.

---

### `/model claude-opus-4-6`
**Switch to Opus 4.6 for complex financial/investment research.**
**Use for:**
- KLB Consultants family office analysis
- Investor ROI calculations, waterfall distributions, tiered promote structures
- Complex cap rate and cash flow modeling across multiple properties
- Deep competitive market analysis requiring multi-step reasoning
**Switch back:** `/model claude-sonnet-4-6` after financial work completes.

---

### `/effort high`
**Increase thinking depth for complex research tasks.**
**Use for:** Multi-neighborhood competitive analysis, investment deal underwriting,
Google core update impact assessment on 50 Vercel sites.
**Reset:** `/effort` (without argument) to see current level, or `/effort medium`
to return to default.

---

### `/btw <question>`
**Quick fact-check mid-research without polluting context.**
**Examples:**
- `/btw is the March 2026 Google core update done rolling out?`
- `/btw what's the current FHA loan limit for Clark County?`
- `/btw does Homebot have a new FUB integration update?`
Returns a clean answer. Doesn't add to the research thread.

---

### `/plan [description]`
**Map out multi-part research projects before executing.**
**Example:** `/plan research all 15 GBP locations for Dr. Jan — pull recent sales,
current inventory, days on market, and price per sqft for each`
Claude breaks it into manageable research units. Approve before running.

---

## Research Quality Rules (Always Apply)

Before reporting any market data:
1. **Search first** — never quote stats from memory
2. **Cite source + date** — every number needs a source
3. **Neighborhood-level** — never use national or statewide averages as local proof
4. **Specific address as proof** — "Prices are up" requires an actual closed address + date
5. **Flag stale data** — if data is older than 60 days, say so explicitly before using
