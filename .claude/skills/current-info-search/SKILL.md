---
name: current-info-search
description: >
  Search for real-time information using the Perplexity API (sonar-pro) whenever
  a question touches anything that changes quickly. ALWAYS trigger this skill for:
  AI model releases, pricing, or benchmarks; software versions and changelogs;
  recent news or events; API changes or deprecations; company announcements;
  regulatory changes; pricing for any SaaS/cloud service; anything the user
  prefixes with "latest", "current", "new", "just released", "recently", "as of
  today", "what's new in", or "is X still". ALSO trigger whenever you notice
  your own training data on a topic might be stale — if there's any doubt,
  search. Never answer fast-moving questions from memory alone.
---

# current-info-search

You are wired to Perplexity's sonar-pro model, which searches the live web and
returns cited answers. Use it any time a question could be answered more
accurately with current information than with training data.

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

## How to call Perplexity

Your API key is stored as a Windows User environment variable (`PERPLEXITY_API_KEY`).
Set it once with PowerShell (survives restarts):
```powershell
[System.Environment]::SetEnvironmentVariable("PERPLEXITY_API_KEY", "pplx-...", "User")
```

**PowerShell (Windows):**
```powershell
$key = $env:PERPLEXITY_API_KEY
$body = @{
  model = "sonar-pro"
  messages = @(@{ role = "user"; content = "YOUR QUESTION HERE" })
  return_citations = $true
  search_recency_filter = "month"
} | ConvertTo-Json -Depth 5

Invoke-RestMethod -Uri "https://api.perplexity.ai/chat/completions" `
  -Method Post `
  -Headers @{ Authorization = "Bearer $key"; "Content-Type" = "application/json" } `
  -Body $body
```

**bash / WSL / Mac (if applicable):**
```bash
curl -s https://api.perplexity.ai/chat/completions \
  -H "Authorization: Bearer $PERPLEXITY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "sonar-pro",
    "messages": [
      {
        "role": "system",
        "content": "You are a precise research assistant. Always include the date of each source in your answer. If information conflicts across sources, note the discrepancy and prefer the most recent primary source."
      },
      {
        "role": "user",
        "content": "YOUR QUESTION HERE"
      }
    ],
    "return_citations": true,
    "search_recency_filter": "month"
  }'
```


**Default model:** `sonar-pro` — fast, live-web search with citations.
**Recency filter:** `"month"` by default. Change to `"week"` for breaking news
or `"year"` for broader context.

### Python equivalent (for scripts / agents)

```python
import os, json, subprocess

def perplexity_search(question: str, recency: str = "month") -> dict:
    """Call Perplexity sonar-pro and return the parsed JSON response."""
    api_key = os.environ.get("PERPLEXITY_API_KEY")
    if not api_key:
        raise EnvironmentError(
            "PERPLEXITY_API_KEY not found. "
            "Add it to ~/.env or ~/.zshrc and reload your shell."
        )
    
    payload = {
        "model": "sonar-pro",
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are a precise research assistant. "
                    "Always include the date of each source. "
                    "Prefer the most recent primary source when sources conflict."
                )
            },
            {"role": "user", "content": question}
        ],
        "return_citations": True,
        "search_recency_filter": recency
    }
    
    import urllib.request
    req = urllib.request.Request(
        "https://api.perplexity.ai/chat/completions",
        data=json.dumps(payload).encode(),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())
```

---

## Citation rules

Every answer built from search results MUST include:

1. **Source name + URL** for each factual claim
2. **Date** of the source (publication date or "as of [date]")
3. **Direct quote** (≤15 words) from the source when citing a specific number,
   price, or version

Format citations inline like:
> "sonar-pro costs $3/M input tokens" — [Perplexity pricing page](https://docs.perplexity.ai/docs/pricing), updated June 2025

If a source has no clear date, note it: `(date unknown — verify before use)`.

---

## Search results beat training data

**Hard rule:** When Perplexity's search results contradict your training data,
the search results win. Always.

The reason: your training data has a cutoff. For fast-moving topics — model
releases, software versions, pricing, APIs — search results from the live web
are more reliable than anything you were trained on, even if your training data
feels confident.

Concretely:
- If your training says "GPT-4o costs $X" and sonar-pro returns a source
  saying "$Y as of last month", report $Y and note the discrepancy.
- Never say "according to my training data, X is true, but search says Y" and
  then hedge toward X. Lead with the search result.
- You can note the conflict so the user knows things changed:
  > "Perplexity search (June 2025 source) shows X. Note: this differs from
  > earlier information that may still appear in other AI tools."

---

## Recommended search patterns

| Scenario | Query pattern |
|---|---|
| Version lookup | `"latest stable version of [software] as of [today's date]"` |
| Pricing | `"[service] pricing [year] — official page"` |
| Model release | `"[company] [model name] release date and specs"` |
| API change | `"[API/SDK] breaking changes changelog [year]"` |
| Regulatory | `"[regulation] effective date and current status [year]"` |

Always include the current year in your query to anchor recency.

---

## What NOT to search

Don't call Perplexity for:
- Stable reference knowledge (language syntax, math, established algorithms)
- Tasks where you need to reason or generate (writing, coding, analysis) —
  only search for **facts** you'll then use in that work
