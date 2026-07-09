# File-Back — The Compounding Step (Memex / zettelkasten)

A query answer becomes a durable wiki page only when it earns it. This keeps the
wiki lean enough for in-context retrieval and prevents orphan/bloat pages the lint
would later have to clean up.

## Compounding gate — file back ONLY if ALL are true
1. **Multi-article synthesis** — the answer connects 2+ existing articles into a
   relationship not already captured (e.g., "buydown NPV vs. resale math" pulling
   from `new-construction-incentives` + `mortgage-rates` + a neighborhood page).
2. **Reusable** — a future query (or a client prep) would need this same analysis
   again. Not a one-off lookup.
3. **No existing page** — the index scan shows nothing already covers this concept.
4. **Verification checklist passes** (below).

Trivial lookups ("median in 89135?") are answered and discarded — never filed.
A new page is a commitment the lint must maintain; spend it carefully.

## Atomic-page template (one concept per page)
```markdown
# <Single-concept title>
*Filed 2026-MM-DD from a query synthesis. Source pages carry their own source+date.*

<the synthesized content; every fact cited [[source-article#section]]>

## Related
[[source-article-1]] · [[source-article-2]]
```
One concept per page. If it spans two ideas, it's two pages.

## Backlink + index + log procedure (do all four)
1. Create the page under the right `wiki/` folder.
2. Add a `## Related` block linking every source article (≥2 backlinks required).
3. Add a one-line entry to `wiki/index.md` under the matching category (link +
   summary + date) so search-before-read can find it.
4. Append a one-line entry to `wiki/log.md` (date · what was filed · why).

## Pre-write verification checklist (gate — revise or abort if any fail)
- [ ] **Coverage:** every claim in the new page traces to a cited wiki article.
- [ ] **Freshness:** no cited article is past its SLA (`query-mechanics.md`).
- [ ] **No duplication:** index confirms no existing page on this concept.
- [ ] **Atomicity:** one concept only.
- [ ] **Backlinks:** ≥2 inbound links from existing articles.
- [ ] **Fair housing:** no protected-class proxies introduced (school *names* not
      rankings; no "safe"/"family-friendly"/"good schools"). Don't import proxy
      wording from sources (methodology ledger flags NREG for this).
- [ ] **Conflicts:** if the synthesis surfaces a data conflict, it goes to the
      `index.md` "Open Data Conflicts" queue — never silently resolved.

## Note in the answer
If a page was filed: "Saved to [[new-page]] for next time." Filing is internal
wiki maintenance; any client-facing use still needs same-day Matrix/search
verification (the Client Gate in SKILL.md).
