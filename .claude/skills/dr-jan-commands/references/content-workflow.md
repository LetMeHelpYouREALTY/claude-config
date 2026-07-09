# Content & Email Workflow Commands
*Load when drafting client emails, GBP posts, video scripts, market reports,
or any content for Dr. Jan's real estate business.*

---

## The Content Creation Loop

Every piece of content follows this command sequence:

```
/plan → draft → /btw (quick checks) → /branch (alt versions) → /copy → /export
```

---

## Command-by-Command Playbook

### `/plan [description]`
**Start here for any multi-piece content batch.**
**Example:** `/plan create 4 GBP posts for Summerlin, Henderson, Sun City, and
Skye Canyon — each unique, hyperlocal, under 300 words, with 702-222-1964`
Claude maps out every post before writing. Approve plan, then execute.

---

### `/btw <question>`
**Use mid-draft for quick fact checks — no context pollution.**
**Examples:**
- `/btw what's the current median in Summerlin?`
- `/btw does 702-222-1964 go in the GBP post or 702-500-1955?`
- `/btw what's the sign-off emoji for investor emails?`
Never interrupts the draft flow. Answer comes back clean.

---

### `/branch [name]`
**Create parallel versions of the same email for A/B testing.**
**Example:** At the end of a buyer email draft:
`/branch seller-version` — rewrite the same market insight for a seller audience.
Both exist independently. Compare, pick the winner.

**Real estate use cases:**
- Buyer vs. seller version of same market update
- Luxury vs. mass-market tone for same neighborhood
- Short (SMS-style) vs. longer email version
- Dr. Jan voice vs. team-member voice (when applicable)

---

### `/copy [N]`
**Grab any draft instantly after Claude writes it.**
**Shortcuts:**
- `/copy` — copies last response
- `/copy 2` — copies second-to-last (if you need the version before a revision)
- In the picker: press `w` to write directly to a file

**Best for:** Pasting into FUB email template editor, Google Docs, BombBomb
script card, or social media scheduler.

---

### `/export [filename]`
**Save full email series or content batch as a single text file.**
**Example:** `/export Summerlin_GBP_Posts_2026-04-01`
Use when: finishing a 5-email drip sequence, a content calendar month, a full
market report, or a complete automation spec.

---

### `/compact [focus instructions]`
**When a long content session fills up context.**
**Example:** `/compact keep all email templates, FUB tags, and CTAs intact`
Safe to run mid-session. Work is preserved. Context freed.

---

### `/effort [level]`
**Adjust Claude's thinking depth based on content complexity.**
- `high` → investor analysis emails, market reports with real data
- `medium` → standard client emails, GBP posts (default)
- `low` → quick subject line options, SMS text variations, short replies

---

### `/model [model]`
**Switch models for different content types.**
- **Sonnet 4.6** (default) → all standard content: emails, GBP, video scripts
- **Opus 4.6** → complex financial analysis, investor ROI emails, multi-layered
  campaigns requiring deep strategic thinking
**Example:** `/model claude-opus-4-6` before building KLB family office content.

---

## Content QA Checklist (Run Before Every Publish)

After drafting any content, verify these 5 gates:

1. **Voice** — Brooklyn PhD, direct + warm, not corporate
2. **Platform** — correct duration/hook for TikTok vs. email vs. GBP
3. **Data** — ≥3 specific numbers included
4. **CTA** — 702-222-1964 placed naturally
5. **Framework** — matches target audience (buyer/seller/55+/investor/divorce)

Use `/btw does this pass all 5 content QA gates?` for a quick check.
