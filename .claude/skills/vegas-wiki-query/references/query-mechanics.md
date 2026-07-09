# Query Mechanics — Freshness SLAs, Staleness, Retrieval

## Per-category freshness SLAs
Tuned to the wiki's data cadence + CLAUDE.md Constraint C (">60 days → flag").
Check the article's header date (or the figure's inline date) at read time.

| Category | Article(s) | Fresh ≤ | Stale > (2× → don't answer from it) | Why |
|---|---|---|---|---|
| Mortgage rates | `market-conditions/mortgage-rates.md` | 7 days | 14 days | PMMS releases weekly (Thu) |
| Market median / LVR headline | `market-conditions/las-vegas-market.md` | 35 days | 60 days | LVR releases monthly (~8th) |
| Active inventory / months-supply | `las-vegas-market.md`, `luxury-1M-plus.md` | 30 days | 60 days | Moves weekly–monthly |
| Builder pricing / incentives | `builders/new-construction-incentives.md` | 30 days | 60 days | Programs shift monthly |
| Neighborhood profiles | `neighborhoods/*` | 90 days | 180 days | Slow-moving character + bands |
| Avatar anchors | `avatars/market-avatars.md` | 90 days | 180 days | Re-stamped each compile |
| Methodology / source ledger | `market-conditions/methodology.md` | stable | — | Reference, not time-series |

## Staleness actions (Step 5)
- **Fresh (≤ SLA):** cite normally.
- **Aging (SLA → 2× SLA):** answer, but prepend "Data from [[page]] dated
  YYYY-MM-DD may be stale — verify before use."
- **Stale (> 2× SLA):** do NOT answer from the page. Return: "Wiki data for
  [topic] is stale (last updated YYYY-MM-DD). Re-run the compile or do a live
  lookup." Anything >60 days that would touch a client = hard stop → verify.

## Retrieval crossover (why no RAG now)
- **In-context index + pages — current default.** At ~a dozen articles, `index.md`
  + the 1–4 relevant pages fit easily in context. High recall (index shows every
  topic); the model does the semantic filtering. No embeddings, no vector DB.
- **Lexical (grep/ripgrep/qmd/SQLite FTS5) — add at ~200+ pages,** when the index
  no longer fits comfortably. This is roadmap item **H (qmd)** — deferred until the
  wiki crosses ~25 articles, upgraded to a real search layer nearer ~200.
- **Vector RAG — not justified** for a solo agent's KB; lexical wins until corpora
  reach hundreds of GB. Don't build it.

## Index conventions that make search-before-read reliable
Each `index.md` entry = link + one-line summary + key figure + a date stamp, under
a category that maps to the folder. The date is what powers the freshness check —
keep it current every compile. Categories: Market Conditions · Neighborhoods ·
Builders · Avatars · Lead Patterns · Ops.
