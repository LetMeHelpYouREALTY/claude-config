---
name: vegas-wiki-query
description: >-
  Answer questions from Dr. Jan's Vegas Market Wiki using Karpathy's llm-wiki
  "Query" operation — search-before-read: read wiki/index.md first, open only the
  relevant articles, then answer with a citation on every fact. Completes the
  Ingest (compile) / Lint / Query triad. Trigger when asked an internal-knowledge
  question the wiki can answer — median/price by neighborhood, mortgage-rate
  anchors, builder incentives, months-of-supply method, avatar anchors, "what
  does the wiki say about," "pull from the wiki," "what do we know about
  [neighborhood/builder]." Enforces source+date citations, per-category freshness
  SLAs, UNKNOWN-not-inference, and the hard rule that NO wiki number reaches
  client content without same-day Matrix/search verification. Do NOT trigger for
  general real-estate questions with no wiki basis, or to quote a client a number
  directly — route those through verification first.
---

# Vegas Wiki Query (search-before-read)

The Query leg of the llm-wiki triad. The wiki is compiled, cited knowledge —
read it, don't re-derive from raw, and don't dump every file into context. At the
current ~dozen articles the whole index + a few pages fit in context; no RAG, no
embeddings (see `references/query-mechanics.md` for the retrieval crossover and
the qmd fallback when the wiki passes ~200 pages).

## When this fires
An internal question the wiki plausibly covers (market conditions, neighborhoods,
builders, rates, avatars, methodology). If it's general real-estate trivia with no
wiki basis, answer normally without this skill. If the answer is headed to a
client, see the Client Gate below.

## The flow (search-before-read)
1. **Read `wiki/index.md`.** Use the one-line summaries + dates to pick the 1–4
   relevant articles. Don't open the rest.
2. **Read only those articles.** On each, check the header/"re-verified" date
   against the freshness SLA (`references/query-mechanics.md`).
3. **Answer from the wiki only.** Every fact carries a citation to the article +
   section: `[[article#section]]`. The article already holds the source+date — that
   two-hop chain (answer → wiki page → raw source+date) is the grounding.
4. **Flag the gaps, never fill them:**
   - Not in the wiki, but a live search/Matrix could answer → `[LIVE LOOKUP NEEDED — topic]`
   - Needs original research → `UNKNOWN — needs verification`
   - Never infer a price, date, or deadline from memory.
5. **Freshness caveat.** If a cited page is past its SLA, prepend
   "Data from [[page]] dated YYYY-MM-DD may be stale — verify before use." If past
   2× SLA, don't answer from it: recommend a re-compile or live lookup instead.
6. **Conflict?** If two pages disagree, do NOT pick a side — point to the
   `index.md` "Open Data Conflicts" queue and answer with the flagged range.
7. **Compounding gate** (`references/file-back.md`): if the answer is a reusable,
   multi-article synthesis not already captured, file it back as a new atomic page.
   Trivial lookups are answered and discarded — never filed.

## Hard rules
- **Citation on every fact** — `[[article#section]]`; the page carries source+date.
- **UNKNOWN, not inference.** No memory-based Vegas numbers. (Operating contract.)
- **Client Gate (Dr. Jan's wiki rule):** wiki data NEVER goes into client-facing
  content without a **same-day Matrix/search verification**. For any number bound
  for a client, label it `VERIFY TODAY (Matrix/search) before quoting` — the wiki
  is internal context, not a client quote source. GLVAR Matrix = source of truth
  (`wiki/market-conditions/methodology.md`); portals are context only.
- **File-back is internal** (the LLM maintains the wiki). Publishing, sending, or
  client-facing use is the Human Gate — confirm first.
- **Don't dump the wiki** — index first, then only relevant pages.

## References (load on demand)
- `references/query-mechanics.md` — freshness SLA table by category, the staleness
  actions, retrieval crossover (in-context → grep/qmd → vector), index conventions.
- `references/file-back.md` — the compounding gate, atomic-page template, backlink
  + index + log procedure, and the pre-write verification checklist.

## Integrates with
The weekly **compile** (Ingest) and monthly **lint** (Lint) close the triad with
this Query op · `reader3-deep-read` (documents → wiki) · `methodology.md`
(source hierarchy) · `plan-and-review` + Council review (E) for client-bound output.
Model routing: quick lookup → Sonnet 4.6; multi-article synthesis or client-bound
→ Opus (xhigh).
