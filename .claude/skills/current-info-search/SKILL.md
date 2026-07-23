---
name: current-info-search
description: >
  Search for real-time information using the Parallel Search MCP (web_search /
  web_fetch) whenever a question touches anything that changes quickly. ALWAYS
  trigger this skill for: AI model releases, pricing, or benchmarks; software
  versions and changelogs; recent news or events; API changes or deprecations;
  company announcements; regulatory changes; pricing for any SaaS/cloud service;
  anything the user prefixes with "latest", "current", "new", "just released",
  "recently", "as of today", "what's new in", or "is X still". ALSO trigger
  whenever you notice your own training data on a topic might be stale — if
  there's any doubt, search. Never answer fast-moving questions from memory alone.
---

# current-info-search

You are wired to Parallel Search — a live-web search layer that returns ranked
results with dated excerpts. Use it any time a question could be answered more
accurately with current information than with training data. You synthesize the
answer from the excerpts and cite every source.

> Migrated from Perplexity sonar-pro on 2026-07-23 (v2.0). The
> `PERPLEXITY_API_KEY` Windows user env var is no longer used by this skill and
> may be removed by the operator.

---

## When to trigger (trigger conditions)

Trigger this skill when the question involves ANY of the following:

- **AI / ML ecosystem** — model releases, pricing, API changes, benchmark
  scores, new providers, deprecations (e.g. "What models does Anthropic offer
  now?", "What's the current price of GPT-4o?")
- **Software versions** — "What's the latest version of Node.js / Python /
  Next.js / [anything]?"
- **Recent news or events** — anything that happened after your training cutoff
  or that you're not confident about
- **APIs and developer tools** — endpoint changes, new SDKs, breaking changes,
  rate limits
- **Pricing** — cloud, SaaS, LLM tokens, domain registration, any commercial
  service
- **Regulatory / legal changes** — laws, compliance rules, platform policies
- **Time-cued phrasing** — user says "latest", "current", "new", "just
  released", "recently", "as of today", "what's new in X", "has X changed"
- **Self-doubt** — you feel uncertain about whether your training data is
  current on a topic; when in doubt, search

When any of these apply, **search first, then answer**. Do not answer from
memory and then offer to search — search before forming your answer.

---

## How to search — Parallel Search MCP (primary, no API key needed)

Call the `web_search` tool on the Parallel Search MCP (registered as
`Parallel-Search-MCP`, endpoint `https://search.parallel.ai/mcp`):

- **`objective`** — one self-contained sentence stating the research goal and
  the freshness you need. Example: `"Find the current stable version of
  Next.js as of July 2026; prefer sources from the last month."` Put soft
  freshness preferences here (this replaces Perplexity's old
  `search_recency_filter`: say "last week" for breaking news, "last month" by
  default, "this year" for broader context).
- **`search_queries`** — 2–3 diverse keyword probes, each anchored with the
  current year (e.g. `["Next.js latest stable version 2026", "Next.js release
  changelog 2026"]`). These are retrieval probes, not sentences.

The response is a ranked `results` list with `url`, optional `title`, optional
`publish_date`, and an `excerpts` array. **There is no synthesized answer** —
you write the answer from the excerpts and cite each source with its
`publish_date`. Excerpts are usually answer-ready; do not fetch every result.

Use **`web_fetch`** when you need full content or exact wording from a specific
URL (one the user gave you, or one surfaced by `web_search` whose excerpt is
insufficient). Pass the URL(s) plus the same `objective`.

---

## Script / automation fallback (REST, key required)

For scripts, n8n, or environments without the MCP, call the Search API
directly. The key lives in the `PARALLEL_API_KEY` Windows user env var — check
it is present; never print it.

**PowerShell (Windows):**
```powershell
$body = @{
  objective      = "YOUR RESEARCH GOAL HERE; prefer sources from the last month"
  search_queries = @("keyword probe one 2026", "keyword probe two 2026")
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "https://api.parallel.ai/v1/search" `
  -Method Post `
  -Headers @{ "x-api-key" = $env:PARALLEL_API_KEY; "Content-Type" = "application/json" } `
  -Body $body
```

**bash / WSL / Mac:**
```bash
curl -s https://api.parallel.ai/v1/search \
  -H "x-api-key: $PARALLEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "objective": "YOUR RESEARCH GOAL HERE; prefer sources from the last month",
    "search_queries": ["keyword probe one 2026", "keyword probe two 2026"]
  }'
```

**Python (for scripts / agents):**
```python
import json, os, urllib.request

def parallel_search(objective: str, search_queries: list[str]) -> dict:
    """Call the Parallel Search API and return the parsed JSON response."""
    api_key = os.environ.get("PARALLEL_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "PARALLEL_API_KEY not found. Set it as a user environment "
            "variable, or use the Parallel Search MCP (keyless) instead."
        )

    payload = {"objective": objective, "search_queries": search_queries}
    req = urllib.request.Request(
        "https://api.parallel.ai/v1/search",
        data=json.dumps(payload).encode(),
        headers={"x-api-key": api_key, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())
```

---

## Citation rules

Every answer built from search results MUST include:

1. **Source name + URL** for each factual claim
2. **Date** of the source (the result's `publish_date`, or "as of [date]")
3. **Direct quote** (≤15 words) from the excerpt when citing a specific number,
   price, or version

Format citations inline like:
> "Next.js 16.2.10 is the latest stable release" — [nextjs.org release notes](https://nextjs.org/blog), published 2026-07-01

If a result has no `publish_date`, note it: `(date unknown — verify before
use)` — and prefer a dated source for any number that reaches a client.

---

## Search results beat training data

**Hard rule:** When live search results contradict your training data, the
search results win. Always.

The reason: your training data has a cutoff. For fast-moving topics — model
releases, software versions, pricing, APIs — search results from the live web
are more reliable than anything you were trained on, even if your training data
feels confident.

Concretely:
- If your training says "GPT-4o costs $X" and a dated search excerpt says
  "$Y as of last month", report $Y and note the discrepancy.
- Never say "according to my training data, X is true, but search says Y" and
  then hedge toward X. Lead with the search result.
- You can note the conflict so the user knows things changed:
  > "Live search (July 2026 source) shows X. Note: this differs from earlier
  > information that may still appear in other AI tools."

---

## Recommended search patterns

| Scenario | Query pattern (use as `search_queries` probes) |
|---|---|
| Version lookup | `"latest stable version of [software] [year]"` |
| Pricing | `"[service] pricing [year] official"` |
| Model release | `"[company] [model name] release date specs"` |
| API change | `"[API/SDK] breaking changes changelog [year]"` |
| Regulatory | `"[regulation] effective date status [year]"` |

Always include the current year in your probes to anchor recency, and state
the freshness preference in the `objective`.

---

## What NOT to search

Don't call Parallel Search for:
- Stable reference knowledge (language syntax, math, established algorithms)
- Tasks where you need to reason or generate (writing, coding, analysis) —
  only search for **facts** you'll then use in that work
