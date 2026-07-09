# FUB Automation & Tech Workflow Commands
*Updated 2026-06-23 — verified /loop facts + FollowUpAce MCP integration*
*Load when building FUB automations, writing Vercel/Next.js code, managing Cloudflare Workers, reviewing deployments, or working with the domain portfolio.*

---

## The FUB Build Sequence

Every automation build follows this command pattern:

```
/plan → build → /diff (review) → /rewind (if wrong) → /security-review (if code)
→ /export (save spec) → /schedule (if recurring cloud task)
```

---

## Command-by-Command Playbook

### `/plan [description]`
**Always start FUB automation builds in plan mode.**
**Example:** `/plan build RealScout Showing Request automation — 6-step build,
required ARCHIVE/Trash/RE Agent exclusion conditions, %merge_format% variables`
Claude maps every step before writing. Prevents missed conditions.

---

### `/diff`
**Review all code changes before pushing to Vercel or Cloudflare.**
**What it shows:** Interactive viewer with uncommitted git changes + per-turn diffs.
Left/right arrows switch between views. Up/down browse files.
**Dr. Jan rule:** Run `/diff` before ANY commit on the 50 Vercel sites. No
exceptions — catches typos in phone numbers, broken merge variables, broken links.

---

### `/rewind`
**Undo automation logic that went wrong mid-build.**
**Aliases:** `/checkpoint`
**Dr. Jan rule:** Run `/rewind` before starting each new automation so a clean
checkpoint exists. If Claude adds wrong conditions or wrong tag names, rewind
instead of manually editing.

---

### `/security-review`
**Run before every code push to any production site.**
**What it catches:** Injection vulnerabilities, auth issues, data exposure risks,
broken API keys, unsafe merge variable handling.
**Dr. Jan rule:** Required before pushing to any of the 50 Vercel domains.
No security review = no push.

---

### `/hooks`
**View current hook configurations for tool events.**
**Use when:** Checking what automations fire on file saves, git commits,
or other tool events in the current project.
**Example use:** Verify pre-commit hooks are intact before pushing site code.

---

### `/permissions`
**Manage allow/ask/deny rules for tool access.**
**Aliases:** `/allowed-tools`
**Use when:** Locking down which tools Claude can use without asking during a
sensitive automation build. Example: allow Read/Grep but require approval for Write.

---

### `/schedule [description]`
**Create cloud scheduled tasks (Routines) for recurring real estate AI tasks.**
**Minimum interval: 1 hour.** Runs on Anthropic-managed cloud — machine does NOT need to be on.
**Example cloud tasks:**
- Weekly neighborhood market reports (every Monday 7am)
- Monthly Homebot digest check + FUB sync audit
- Weekly GBP post batch generation
- Daily RealScout Scout Score review + FUB Smart List update
**Usage:** `/schedule` — Claude walks you through setup conversationally.
**Alternative:** Create via Desktop app → Routines → New Routine → Cloud.

---

### `/loop [interval] [prompt]`
**Repeat a prompt on a schedule within the current session.**
**Source verified:** code.claude.com/docs/en/scheduled-tasks (fetched 2026-06-23)
**Requires:** Claude Code v2.1.72+ · Session must stay open.

#### Syntax options:
| What you type | What happens |
|---|---|
| `/loop 5m check the deploy` | Fixed interval + your prompt |
| `/loop check the deploy` | Claude chooses interval dynamically (1 min–1 hr) |
| `/loop 15m` | Fixed interval + built-in maintenance prompt |
| `/loop` | Bare — Claude chooses interval + built-in maintenance prompt |
| `/proactive` | Alias for `/loop` (same thing) |
| `/loop 20m /review-pr 1234` | Fixed interval + another skill/command |

#### Real estate use cases:
- `/loop 5m check if the Vercel deployment finished`
- `/loop 10m check RealScout for new Property Saved tags`
- `/loop 1h run the weekly market report skill`
- `/loop 30m check if the FUB automation fired on the test contact`

#### Key technical facts (verified, corrects common myths):
- **Expiry: 7 days** — NOT 3 days. Recurring tasks auto-delete after 7 days.
- **Minimum interval: 1 minute** — use `/schedule` for hourly+ cloud tasks.
- **Jitter: up to 30 minutes late** (NOT "10%"). Or up to half-interval if running more than hourly. Derived from task ID (deterministic — same task, same offset every time). One-shot tasks at :00/:30 fire up to 90 sec early. To skip jitter: pick non-:00/:30 minute (e.g., `3 9 * * *`).
- **Stop a loop:** Press `Esc` while Claude is idle between iterations.
- **Disable all loops:** Set env var `CLAUDE_CODE_DISABLE_CRON=1` (NOT a `--disable-cron` flag — that doesn't exist).
- **Resume:** `claude --resume` restores unexpired loops (if <7 days old).
- **Dynamic interval:** When no interval given, Claude picks 1 min–1 hr based on what it observes — shorter when build is active, longer when quiet.

#### loop.md customization:
Create `.claude/loop.md` to replace the built-in maintenance prompt. Max 25,000 bytes. Takes effect on next iteration. Example:
```markdown
Check the RealScout dashboard. If any contact has a Scout Score >70, 
create a FUB task: "Call [name] — Scout Score spike." If nothing new, 
say so in one line.
```

---

### `/batch <instruction>`
**Orchestrate large-scale parallel changes across the domain portfolio.**
**What it does:** Decomposes work into 5-30 units, spawns one agent per unit in
isolated git worktrees, each opens a PR. Requires a git repo.
**Dr. Jan use cases:**
- `/batch update phone number from 702-XXX to 702-222-1964 across all 50 sites`
- `/batch add RealScout widget to every neighborhood page`
- `/batch update schema markup on all community pages`
⚠️ Preview the plan before approving — this runs parallel changes across ALL files.

---

### `/simplify [focus]`
**Clean up code after any FUB automation spec or Vercel component build.**
**What it does:** Spawns 3 review agents in parallel (code reuse, quality,
efficiency), aggregates findings, applies fixes.
**Dr. Jan tip:** `/simplify focus on removing duplicate conditions` after a
complex FUB automation build.

---

### `/pr-comments [PR]`
**Fetch and display comments from a GitHub pull request.**
**Requires:** `gh` CLI.
**Use when:** Dev team has left comments on a Vercel site PR that need review or response.

---

### `/sandbox`
**Toggle sandbox mode for safe testing of automation logic.**
**Use when:** Testing a new FUB automation sequence or Cloudflare Worker without
risking live contact data.
**Note:** Available on supported platforms only.

---

### `/debug [description]`
**Enable debug logging when a session produces unexpected automation results.**
**Example:** `/debug FUB merge variables not rendering correctly in email template`
Starts capturing logs from that point forward. Read the session debug log for clues.

---

### `/agents`
**Manage subagent configurations.**
**Use when:** Setting up or reviewing which agents are available for parallel
automation builds (Explore, Plan, general-purpose).

---

## FollowUpAce MCP — FUB Build Integration
*From followupace-fub-mcp skill (verified 2026-06-04). All FUB writes go through FollowUpAce (`0ba77316`).*

### Before any FUB automation build:
1. `fetch_me` — confirm MCP OAuth is live
2. `list_all_tags` — confirm trigger tags exist
3. `fetch_stages` — confirm stages (Hot Buyer, Trash, etc.) are accurate
4. `fetch_action_plans_people` — confirm action plans exist (NOT `fetch_action_plans` — it's bugged, MOO-4864)

### 3-Tier tool permission model (memorize):
| Tier | Examples | Gate |
|---|---|---|
| 🟢 Auto-allow | `fetch_*`, `list_*`, `search_*`, `generate_ai_message` (draft only), `merge_*` (preview only) | Fire freely |
| 🟡 Ask once | `create_person`, `create_note`, `create_task`, `addTagsToPerson`, `apply_action_plan` | State exact values, get yes, then run |
| 🔴 Confirm every call | `send_email_direct`, `send_sms_direct`, `edit_person`, `edit_*`, `delete_*` | Explicit per-call — never batch |

### FUB automation build checklist:
1. `%merge%` variables — NEVER `{{ }}` or `{ }`
2. Exclusion conditions on EVERY automation: ARCHIVE (tag) · Trash (stage) · Real Estate Agent (stage)
3. Under 80 words per email · single CTA only · end with question
4. Test with ONE contact before enabling at scale
5. ARCHIVE is a TAG not a stage — don't mix these up

### Known bugs — don't retry:
- `fetch_action_plans` → "Validation error" (MOO-4864 — use `fetch_action_plans_people` instead)
- `list_automations` → `spa_session_required` (needs FUB SPA session via Ace AI panel, NOT an MCP reconnect)

---

## FUB Build Safety Rules (Always Apply)

Before any automation goes live:
1. `%merge_format%` — never `{{ }}` or `{ }`
2. Required conditions: exclude ARCHIVE tag, Trash stage, Real Estate Agent stage
3. Under 80 words per email
4. Single CTA only
5. Test with one contact before mass apply
6. Capture the spec to Open Brain before ending the session

---

*Updated 2026-06-23 · Sources: code.claude.com/docs/en/scheduled-tasks (live fetch) · followupace-fub-mcp SKILL.md v1.0 (2026-06-04) · raw CHANGELOG.md on GitHub (full search, 4526 lines)*
