---
name: followupace-fub-mcp
description: >
  Dr. Jan Duffy's operating layer for the FollowUpAce MCP — the 111-tool agentic
  interface to Follow Up Boss (system of record for all FUB writes). Use this skill
  for ANY FollowUpAce or Follow Up Boss MCP work: creating/editing contacts, tags,
  notes, tasks, calls, deals, appointments; applying action plans; reading/auditing
  Automations 2.0, Lead Flows, Smart Lists; sending email/SMS through FUB; generating
  AI messages; pulling FollowUpAce real-estate economic data; or wiring voice-command
  ("Hey Ace") tag automations. Also triggers on: "FollowUpAce", "Ace AI", "FUB MCP",
  "spa_session", "Ace Pro", "fetch_me", "list_automations", "which tool", "is it safe
  to run this tool", "tool permissions", or building a FUB agentic workflow. Encodes
  the 3-tier tool permission model, auth/known-bug map, Opus 4.8 / Sonnet 4.6 model
  routing, and Nate B. Jones's four prompting disciplines for autonomous CRM work.
  Always check Last Updated — if today is newer, verify platform facts before acting.
---

# FollowUpAce + Follow Up Boss — MCP Operating Layer
**Last Updated:** 2026-06-04
**Version:** 1.0
**Server ID (Cowork):** `0ba77316-6896-44fb-a61a-01424b75e6ab`
**Endpoint:** https://followupace.com/mcp  ·  **Vendor:** Moon Sherpa Labs (Ace AI)

> ⚠️ CHECK DATE: If today is newer than "Last Updated," verify FUB/FollowUpAce
> platform facts (auth model, tool list, known bugs, pricing) before acting.
> Operational facts go stale — confirm against a live `fetch_me` / vendor page first.

---

## 0. WHAT THIS SKILL IS

FollowUpAce is the **primary write path and system of record** for Follow Up Boss.
It exposes 111 MCP tools — far deeper than the legacy Zapier `follow_up_boss_*`
connector (`ed5ee078`), which is now **read-only fallback to avoid dual-write**.

**One rule above all others:** all FUB writes go through FollowUpAce (`0ba77316`).
Never write to FUB through two connectors in the same task.

This skill governs three things:
1. **Which tool, and is it safe to run** — the 3-tier permission model (§3).
2. **How to think about autonomous CRM work** — Nate B. Jones's four disciplines (§4).
3. **Which model runs it** — Opus 4.8 / Sonnet 4.6 routing (§5).

---

## 1. AUTH MODEL — TWO LAYERS (memorize this)

FollowUpAce has **two independent auth layers.** Most "why doesn't this tool work"
confusion traces to one of them.

| Layer | What it unlocks | How to establish |
|---|---|---|
| **MCP OAuth** (Claude ↔ FollowUpAce) | All REST-backed tools: `fetch_me`, `fetch_people`, `list_all_tags`, `fetch_stages`, templates, notes, tasks, market data | Add connector at https://followupace.com/mcp → sign in → 6-digit code. Persists until revoked. |
| **FUB SPA session** ("FUB Connect") | SPA-backed tools only: `list_automations`, `get_automation_detail`, `list_lead_flows` | Open FUB in browser → open any contact → open the **Ace AI panel** on the right → complete sign-in. NOT fixable by reconnecting the MCP connector. |

**Sign-in identity (confirmed 2026-05-31):** the official Ace flow says sign in with the
**FUB login** (`DrDuffy@bhhsnv.com`) and enter the code emailed there. A support note once
said use the Ace account email (`janet.duffy@bhhsnv.com`) — try the FUB email first.

**Verify connection at session start:** call `fetch_me`. If it returns identity, MCP OAuth is live.

**Write/automation access requires an Ace Pro seat (USD 55/mo).** Read/fetch tools work on the
base connector. If automation tools return `spa_session_required` AND the account shows 0 Ace Pro
seats, the seat — not the email — is the blocker. **Upgrading a seat is a billing decision =
Human Gate (Dr. Jan's action only). Never click upgrade.**

### Known bugs — do not retry blindly
| Tool | Symptom | Status |
|---|---|---|
| `fetch_action_plans` | "Validation error: Invalid input" on every call | Server-side bug **MOO-4864** (defined in spec, not wired to handler). No client workaround. |
| `search_knowledge_base` | "not available or not properly registered" | Same bug class (MOO-4864). |
| `create_person` | intermittent failure | Tracked under MOO-4864. Use `follow_up_boss_create_or_update_contact_without_tr` (read-fallback connector) ONLY if FollowUpAce create fails AND Dr. Jan confirms — otherwise wait for fix. |
| `list_automations` / `get_automation_detail` / `list_lead_flows` | `spa_session_required` | NOT a bug — needs the FUB SPA session (above). |

If a tool hits a known bug, say so and stop — don't burn calls retrying.

---

## 2. MODEL ROUTING — OPUS 4.8 / SONNET 4.6 (current as of 2026-06-04)

> Verify model availability if Anthropic has shipped a newer release since Last Updated.

**Claude Opus 4.8** (`claude-opus-4-8`, released 2026-05-28): default effort is now **`high`**
(was `xhigh` on 4.7) and spends ~same tokens while scoring higher. ~**4× more honest** — catches
its own mistakes, says "I'm not sure," pushes back on unsound plans instead of declaring victory.
SWE-bench Pro 69.2%, OSWorld-Verified ~87%. 1M context, 128K max output. Same price: USD 5 input / USD 25 output per 1M tokens.
**`/fast` mode** = 2.5× faster, 3× cheaper than prior gen. **Dynamic Workflows** (research preview)
fans a task across up to ~1,000 parallel subagents that refute each other before reporting.

**Claude Sonnet 4.6** (`claude-sonnet-4-6`, released 2026-02-17): default in Cowork. Full upgrade
on coding, computer use, long-context, agent planning. Often preferred over old Opus 4.5. 1M context
(beta). Price: USD 3 input / USD 15 output per 1M tokens.

| FUB task | Model | Why |
|---|---|---|
| Client emails · SMS · GBP-style copy · single tool lookups · tag adds · template merges | **Sonnet 4.6** | Fast + cheap (~27% of Opus cost). Default. |
| Multi-step CRM builds · automation/action-plan design · investor/ROI from market data · auditing 11 live automations · batch enrichment | **Opus 4.8** (`high`) | Sharper judgment, self-verifies, pushes back. |
| Codebase-scale / fan-out audits (e.g. de-dupe 240 templates, reconcile 90 orphaned tags across the whole DB) | **Opus 4.8 + Dynamic Workflows** | Parallel subagents converge faster. Research preview. |
| High-volume routine writes where speed matters and stakes are low | **Opus 4.8 `/fast`** | 2.5× faster, 3× cheaper. |

Default = Sonnet 4.6. Escalate to Opus 4.8 only when a Sonnet draft fails QA or the task is
high-stakes (anything sent to a client, any live CRM write batch, any financial figure).

---

## 3. THE 111-TOOL PERMISSION MODEL — 3 TIERS

Every FollowUpAce tool falls into one tier. This is the **Human Gate** in practice.
When unsure which tier a tool is in, treat it as the **more restrictive** one.

### 🟢 TIER 1 — AUTO-ALLOW (~75 tools) · read-only, no confirmation
Reads, lists, searches, fetches, market data, dry-run merges/generation. Safe to fire freely
(including in parallel) — they change nothing in FUB.

- **Identity/contacts:** `fetch_me`, `fetch_identity`, `fetch_users`, `fetch_people`, `fetch_person_by_id`, `fetch_people_relationships`, `check_duplicate_person`, `search_crm_globally`, `switchToPersonContext`
- **CRM structure:** `list_all_tags`, `fetch_stages`, `fetch_pipelines`, `fetch_custom_fields`, `fetch_deal_custom_fields`
- **Records:** `fetch_deals`, `fetch_deal_by_id`, `fetch_tasks`, `fetch_task_by_id`, `fetch_notes`, `fetch_note_by_id`, `fetch_calls`, `fetch_call_by_id`, `fetch_appointments`, `fetch_appointment_by_id`, `fetch_appointment_types`, `fetch_appointment_type_by_id`, `fetch_appointment_outcomes`, `fetch_appointment_outcome_by_id`
- **Templates (read):** `fetch_templates`, `fetch_template_by_id`, `fetch_text_message_templates`, `fetch_text_message_template_by_id`, `merge_email_template`, `merge_text_message_template` (preview only — does NOT send)
- **Events/intel:** `fetch_events`, `fetch_event_by_id`, `fetch_em_events`, `get_ai_timeline_summary`, `get_call_transcript`, `read_email_full`, `fetch_knowledge_graph`, `fetch_knowledge_graph_neighbors`
- **Automations (SPA, read):** `list_automations`, `get_automation_detail`, `list_lead_flows`, `fetch_action_plans_people`
- **AI dry-run:** `generate_ai_message` (drafts only — review before any send)
- **Market data (all read):** `fetchMortgageRates`, `fetchHousingMarketData`, `fetchHousingAffordabilityIndex`, `fetchMarketTimingIndicators`, `fetchRealEstateInvestmentMetrics`, `fetchRegionalEconomicData`, `fetchPopulationMigrationData`, `fetchInflationData`, `fetchEmploymentData`, `fetchEconomicForecast`, `fetchEconomicIndicators`, `fetchCreditAvailabilityIndex`, `fetchFinancialStressIndex`, `searchEconomicSeries`

> ⚠️ Market data caveat: FollowUpAce economic series are national/regional. They are NOT a
> substitute for Vegas MLS comps. For a client number, still verify with a live MLS/comp search
> and cite an address + date. Use these for macro context (rate trend, affordability, migration), not list prices.

### 🟡 TIER 2 — ASK EACH TIME (~16 tools) · creates new records / applies plans
Creates a new object or attaches a plan/tag to a live contact. State the exact values, get a yes, then run one.

- `create_person`, `create_note`, `create_task`, `create_call`, `create_deal`, `create_appointment`
- `create_template`, `create_text_message_template`, `create_appointment_type`, `create_appointment_outcome`
- `addTagsToPerson`, `apply_action_plan`
- `record_contact_memory_fact`, `record_user_memory_fact`

### 🔴 TIER 3 — CONFIRM ONLY (~24 tools) · sends, edits live records, deletes
Irreversible or client-facing. **Explicit confirmation required for every single call** — never batch.

- **Sends (client-facing):** `send_email_direct`, `sendEmail`, `send_sms_direct`
- **Edits live records:** `edit_person`, `edit_note`, `edit_task`, `edit_call`, `edit_appointment`, `update_deal`, `update_template`, `update_text_message_template`, `update_action_plan_status`, `update_appointment_outcome`, `update_appointment_type`, `removeTagsFromPerson`
- **Deletes:** `delete_person`, `delete_note`, `delete_task`, `delete_deal`, `delete_appointment`, `delete_template`, `delete_text_message_template`, `delete_appointment_type`, `delete_appointment_outcome`

**Stage changes** (via `update_deal` / action plan) always escalate — confirm the exact transition first.

---

## 4. NATE B. JONES OPERATING FRAME — applied to FUB

Prompting has split into **four cumulative disciplines** (Nate B. Jones, 2026). For autonomous CRM
work the gap between using all four and using only the first is ~10×. Skipping a layer produces
the failures you see at scale (the Klarna case: 2.3M conversations resolved fast, optimized for the
wrong thing). Run every non-trivial FUB task through this stack.

1. **Prompt Craft** — clear instruction, exact tool, exact values, output format. Table stakes.
2. **Context Engineering** — this skill + CLAUDE.md + Open Brain ARE the context. **Search Open Brain
   first** for prior decisions on this contact/automation; capture new intel back before the session ends.
   Your 200-token request is 0.02% of the picture — the rest is engineered context.
3. **Intent Engineering** — encode what the work is *for*, not just what to do. A FUB automation that
   maximizes "tags applied" or "emails sent" is a Klarna error. The intent is **booked appointments and
   protected client relationships.** When a metric and the relationship conflict, the relationship wins.
4. **Specification Engineering** — for any multi-step build, write it as a spec the agent executes against.

### Five Specification Primitives — the template for every FUB build
Before building an automation, action plan, batch edit, or multi-contact workflow, write:
1. **Self-contained problem statement** — enough context to act without re-asking ("Wire a tag→action-plan
   so 'Hot Buyer' applied via Ace starts the 7-email buyer nurture, excluding ARCHIVE/Trash/RE-Agent").
2. **Acceptance criteria** — "done" an independent observer can verify ("Automation fires on tag add;
   skips the 3 exclusions; one test contact receives email #1 within 5 min").
3. **Constraint architecture** — MUSTs / MUST-NOTs / PREFERENCES / ESCALATION (see §6). CLAUDE.md is this.
4. **Task decomposition** — subtasks each independently verifiable: (a) confirm tag exists via
   `list_all_tags`, (b) build trigger, (c) build actions, (d) test with one contact, (e) enable.
5. **Evaluation design** — 3–5 known-good test cases run before delivery (see §8). The only thing between
   "unusable" and "ship it."

---

## 5. FUB 2026 PLATFORM REFERENCE

- **Owned by Zillow.** **Zillow Pro (2026)** is built on FUB as its CRM backbone — invite contacts from
  FUB to connect on Zillow, keep your branding, get real-time buyer/seller behavior signals. Watch for
  Zillow Pro behavioral events surfacing as FUB events to trigger on.
- **FUB AI** — call summaries, lead history, one-click task suggestions, AI reply drafts, auto high-intent
  tags. The MCP surfaces this via `get_ai_timeline_summary`, `get_call_transcript`, `generate_ai_message`.
- **Automations 2.0** — trigger (e.g. *Tag Added*, *Stage Changed*, lead activity) → optional conditions →
  actions. Two action plans on one source = add a unique tag in plan #1 that triggers an automation applying plan #2.
- **Action Plans** can: send drip emails, assign tasks, change stage, add/remove collaborators, add a note
  (+notify), add/remove tags, pause other running plans. Enable "pause when lead responds."
- **Lead Flow** routes new leads by source; one action plan per source natively.
- **Smart Lists / Ponds** — saved segments and shared lead pools; the backbone of follow-up cadence.
- **Merge variables: always `%variable%`.** Never `{{ }}` or `{ }`.

---

## 6. CONSTRAINT ARCHITECTURE (the Human Gate, in rules)

**MUST**
- Route all FUB writes through FollowUpAce (`0ba77316`); use `ed5ee078` only as read-only fallback.
- Confirm the live `fetch_me` identity before any write batch.
- Confirm a tag/stage/plan EXISTS (`list_all_tags`, `fetch_stages`, `fetch_action_plans_people`) before referencing it.
- Use `%merge%` variables; include ARCHIVE(tag)/Trash(stage)/RE-Agent(stage) exclusions on every automation.
- Tier-2 → ask once with exact values. Tier-3 → confirm every single call.

**MUST NOT**
- Send email/SMS, edit a live record, or delete anything without explicit per-call confirmation.
- Dual-write across both FUB connectors in one task.
- Click the Ace Pro upgrade (billing = Dr. Jan only).
- Guess contact data. No confirmed source → tag **UNKNOWN — needs verification** and stop.
- Treat ARCHIVE as a stage — it is a TAG.
- Put any Fair-Housing proxy in client-facing copy generated here ("safe", "good schools",
  "family-friendly", "established"). Property features, sqft, amenities, district *names*, commute times only.

**PREFER**
- Build trigger and actions separately; test with one contact before enabling.
- Email + text combo (53% response vs 27% email-only).
- Search Open Brain first; capture decisions/intel back before ending.

**ESCALATE (confirm framing first)**
- Any stage change · divorce/probate/legal-dispute contacts · anything client-facing · market data older than 60 days.

---

## 7. CORE WORKFLOWS (each is a runnable spec)

**New lead intake** → `check_duplicate_person` → if new, `create_person` (Tier 2, confirm) with
Source=`RealScout` (or actual source), Stage=`Hot Buyer`/"A - Hot 1–3 Months", intake tags (community ·
`Buyer-Active` · 55+ if applicable · property type · target close month · zip) → `create_note` with the
3% buyer-broker + Equity Title (Taci Granlund) defaults → draft first-touch with `generate_ai_message`
(review) → send only on confirmation. Speed-to-lead < 60 sec.

**Voice-tag → automation (the Ace pattern)** → Ace is the voice/chat front end; it applies an EXISTING
FUB tag ("Hey Ace, tag this Hot Buyer"). Design clean, voice-friendly trigger tags, build the FUB
automation on *Tag Added*, then Dr. Jan voice-applies it. FollowUpAce does NOT create its own tag prefix —
you design the intentional trigger tags.

**Apply an action plan** → confirm plan exists → `apply_action_plan` (Tier 2, confirm) → verify via
`fetch_action_plans_people`. (Note `fetch_action_plans` is bugged — use the people-scoped read.)

**Audit live automations** → ensure FUB SPA session is live → `list_automations` → `get_automation_detail`
per id → check each has the 3 exclusions and `%merge%` vars. Read-only; no confirmation needed.

**Create a deal** → `fetch_pipelines` + `fetch_stages` → `create_deal` (Tier 2, confirm) with 3% commission noted.

**Send (Tier 3)** → draft → show Dr. Jan the exact recipient + body → on explicit yes, one `send_email_direct`
/ `send_sms_direct` call. Client emails: <80 words, one CTA (702-222-1964), end with a question, no Zillow mentions.

---

## 8. EVALUATION DESIGN (run before delivering any build)

3–5 known-good checks (spec primitive #5):
1. **Tier check** — every tool I'm about to call: is it Tier 1/2/3, and did I get the right confirmation?
2. **Existence check** — every tag/stage/plan/template referenced returns from a live fetch.
3. **Exclusion check** — automation skips ARCHIVE/Trash/RE-Agent; uses `%merge%` not `{{ }}`.
4. **Test-of-one** — one test contact produces the expected result before enabling at scale.
5. **Voice + compliance check** — client copy sounds like Dr. Jan, < 80 words, one CTA, zero Fair-Housing proxies.

If any check fails, fix and re-run before delivery — don't ship 80% and clean up later.

---

## 9. QUICK TOOL INDEX BY JOB

| I need to… | Tool | Tier |
|---|---|---|
| Confirm I'm connected | `fetch_me` | 🟢 |
| Find a contact | `search_crm_globally` / `fetch_people` | 🟢 |
| See all tags / stages / pipelines | `list_all_tags` / `fetch_stages` / `fetch_pipelines` | 🟢 |
| Read AI summary / call transcript | `get_ai_timeline_summary` / `get_call_transcript` | 🟢 |
| Preview a template merge (no send) | `merge_email_template` / `merge_text_message_template` | 🟢 |
| Draft an AI message (no send) | `generate_ai_message` | 🟢 |
| Pull rates / affordability / migration | `fetchMortgageRates` / `fetchHousingAffordabilityIndex` / `fetchPopulationMigrationData` | 🟢 |
| Audit a live automation | `list_automations` → `get_automation_detail` | 🟢 (needs SPA session) |
| Add a contact | `create_person` | 🟡 |
| Add a tag / apply a plan | `addTagsToPerson` / `apply_action_plan` | 🟡 |
| Log a note / task / call / deal | `create_note` / `create_task` / `create_call` / `create_deal` | 🟡 |
| Send an email / text | `send_email_direct` / `send_sms_direct` | 🔴 |
| Edit a live record | `edit_person` / `update_deal` / `removeTagsFromPerson` | 🔴 |
| Delete anything | `delete_*` | 🔴 |

---

## 10. SESSION RITUAL

1. `fetch_me` to confirm connection (and `list_automations` if you'll audit — confirms SPA session).
2. Search Open Brain for prior decisions on this contact/automation/cleanup.
3. For any multi-step build, write the 5 spec primitives (§4) first.
4. Route model: Sonnet 4.6 default; Opus 4.8 for judgment-heavy or high-stakes; `/fast` for routine volume; Dynamic Workflows for codebase-scale.
5. Respect the 3 tiers (§3) and Human Gate (§6) on every write.
6. Capture decisions/intel back to Open Brain before ending.

*FollowUpAce + FUB MCP Operating Layer v1.0 · 2026-06-04 · system of record: FollowUpAce 0ba77316*
