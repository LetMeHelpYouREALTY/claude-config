---
name: dr-jan-make-skills
description: >
  Creates, audits, and fixes Claude Code SKILL.md files using the official
  Anthropic spec and agentskills.io specification (June 2026). Use when building
  a new skill, fixing a broken SKILL.md, trimming a description over 1024 chars,
  writing YAML frontmatter, structuring references/ files vs inline content,
  packaging a .skill zip, or when Dr. Jan says "how do I make a skill", "write
  a SKILL.md", "what YAML fields", "fix my description", "package a skill",
  "audit this skill", or "my skill isn't triggering". Covers the complete spec:
  name ≤64 chars kebab-case, description ≤1024 chars third-person with trigger
  phrases, progressive disclosure, degrees of freedom, 500-line body limit,
  directory structure, .skill zip packaging, and iterative testing workflow.
metadata:
  version: "1.0"
  updated: "2026-06-26"
  author: "Dr. Jan Duffy"
---

# How to Make Claude Code Skills
**Sources:** platform.claude.com/docs/en/agents-and-tools/agent-skills · agentskills.io/specification · Anthropic blog "Equipping agents for the real world with Agent Skills"
**Last verified:** June 26, 2026

---

## THE SPEC IN ONE PLACE

### Directory structure

```
skill-name/          ← kebab-case, matches name field exactly
├── SKILL.md         ← required; YAML frontmatter + markdown body
├── references/      ← optional; loaded by Claude on demand
├── scripts/         ← optional; executable code
└── assets/          ← optional; templates, images, data
```

One folder, one required file. That's it.

### YAML frontmatter — required fields

```yaml
---
name: my-skill-name
description: What it does and when to use it. Max 1024 chars. Third person.
---
```

### YAML frontmatter — all recognized fields

| Field | Required | Constraints |
|-------|----------|-------------|
| `name` | Yes | Max 64 chars · lowercase + numbers + hyphens only · no `--` · no leading/trailing `-` · no XML tags · no reserved words ("anthropic", "claude") · must match directory name |
| `description` | Yes | 1–1024 chars · no XML tags · include what it does + when to use it · third person · specific trigger phrases |
| `model` | No | Override model for this skill e.g. `claude-sonnet-4-6` |
| `allowed-tools` | No | Space-separated list e.g. `Read Write Edit Bash` |
| `user-invokable` | No | `true` = appears in slash-command menu |
| `argument-hint` | No | Autocomplete hint e.g. `[contact-name]` |
| `disable-model-invocation` | No | `true` = manual `/skill-name` only, no auto-trigger |
| `context` | No | `fork` = runs in isolated subagent |
| `metadata` | No | Free-form key-value e.g. `metadata:\n  version: "1.0"\n  author: "Dr. Jan"` |
| `license` | No | License name |
| `compatibility` | No | Max 500 chars · environment requirements |

---

## WRITING THE DESCRIPTION (most important field)

The description is read at startup for every available skill. It decides whether this skill gets loaded for a given task. It must:

1. **State what it does** — third person, specific verbs
2. **State when to use it** — explicit trigger phrases, user intent keywords
3. **Stay under 1024 chars** — count before saving
4. **Use third person** — "Processes Excel files" not "I can help" or "You can use"
5. **Be pushy about triggers** — explicitly list edge cases where it applies

### Template

```yaml
description: >
  [Verb phrase: what it does]. Use when [specific trigger phrases],
  [domain keywords], or when the user says [quoted phrases]. Also triggers on:
  [additional contexts]. [One sentence on what it encodes/covers].
```

### Good vs bad examples

```yaml
# ✅ GOOD — specific, third person, triggers explicit
description: >
  Extracts text and tables from PDF files, fills forms, merges documents.
  Use when working with PDFs, forms, or document extraction. Also triggers
  on: "fill this form", "merge these PDFs", "extract the table", or any
  mention of .pdf files.

# ❌ BAD — vague, no triggers
description: Helps with documents.

# ❌ BAD — first person
description: I can help you process Excel files and generate reports.

# ❌ BAD — second person
description: You can use this to process Excel files.
```

### Check your char count

```bash
echo -n "your description here" | wc -c
```

Must be ≤ 1024. If over: cut implementation details first, keep trigger phrases.

---

## BODY CONTENT PRINCIPLES

### Concise is key (Anthropic official)

The context window is shared. Once Claude loads SKILL.md, every token competes with conversation history and other tools. Apply this test to every sentence:
- "Does Claude already know this?"
- "Can I assume Claude knows this?"
- If yes → cut it.

**Good (concise):**
```markdown
## Extract PDF text
Use pdfplumber:
```python
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```

**Bad (verbose):**
```markdown
## Extract PDF text
PDF files are a common file format that contains text, images, and other
content. To extract text, you'll need to use a library. There are many
libraries available, but pdfplumber is recommended because it's easy to
use and handles most cases well. First, install it using pip...
```

### Set the right degree of freedom

| Situation | Freedom | What to write |
|-----------|---------|---------------|
| Multiple valid approaches | High | Step-by-step text instructions, heuristics |
| Preferred pattern exists | Medium | Pseudocode / template with parameters |
| Fragile, exact sequence required | Low | Exact script, "Do not modify" |

### Body length limit

Keep SKILL.md under **500 lines**. If you exceed this:
- Move reference material to `references/topic.md`
- Point to it from SKILL.md: `For X details, see [references/topic.md](references/topic.md)`
- Claude loads referenced files on demand (zero token cost until needed)
- References should be max one level deep — never chain A → B → C

---

## PROGRESSIVE DISCLOSURE

Agents load skills in three stages — design for it:

| Stage | What loads | Token cost | When |
|-------|-----------|-----------|------|
| 1. Metadata | `name` + `description` only (~100 tokens) | Always | Every session startup |
| 2. Instructions | Full SKILL.md body (<5000 tokens recommended) | When triggered | Task matches description |
| 3. Resources | Referenced files only as needed | On demand | Claude decides |

Design implication: put activation triggers in the description, workflow detail in SKILL.md body, deep reference data in `references/`.

---

## STEP-BY-STEP: BUILD A SKILL

```
1. DEFINE scope
   - One workflow, not everything
   - Write one sentence: "This skill does X when Y"

2. WRITE the description (do this first)
   - Third person, ≤1024 chars
   - List all trigger phrases explicitly
   - Count: echo -n "..." | wc -c

3. NAME the skill
   - kebab-case, ≤64 chars, matches directory
   - Use gerund form: "processing-pdfs", "drafting-gbp-posts"

4. WRITE the body
   - Assume Claude is smart — skip basics
   - Use degrees of freedom (high/medium/low)
   - Under 500 lines; references/ for overflow

5. ADD optional files if needed
   - references/topic.md for deep content
   - scripts/ for executable code
   - Keep references max one level deep

6. TEST
   - Ask Claude to do the thing the skill covers
   - If it doesn't trigger: description too vague — add trigger phrases
   - If it triggers wrong: description too broad — narrow the "Use when"

7. ITERATE
   - Observe which sections Claude reads (and ignores)
   - Ignored sections → cut or move to references/
   - Repeated reads of same section → move inline to SKILL.md
```

---

## PACKAGE AS .SKILL FILE

A `.skill` file is a zip archive of the skill directory. The "Save skill" button in Cowork appears only for `.skill` files.

```bash
# From /tmp (not output dir — zip needs write perms)
cp -r /path/to/skill-name /tmp/
cd /tmp
zip -r skill-name.skill skill-name/
cp skill-name.skill /path/to/outputs/
```

Verify before presenting:
```bash
unzip -t skill-name.skill   # must return "No errors detected"
```

Present with `mcp__cowork__present_files` — the card will show "Save skill" button.

---

## COMMON MISTAKES & FIXES

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Description over 1024 chars | Skill fails to load | Count chars; cut implementation details; keep triggers |
| First-person description | Inconsistent triggering | Rewrite to third person |
| Vague description ("helps with docs") | Skill never triggers | Add 3–5 explicit trigger phrases |
| Too-broad description | Triggers on wrong tasks | Add "Use when X" + "Do NOT use for Y" |
| Directory name ≠ name field | Silent load failure | Match exactly, both kebab-case |
| SKILL.md not case-sensitive | Silent load failure | Must be `SKILL.md` not `skill.md` |
| Body over 500 lines | Context bloat | Move overflow to `references/` files |
| Deep reference chaining (A→B→C) | Claude misses content | Keep all refs one level from SKILL.md |
| XML tags in name or description | Validation error | Remove all `<>` from both fields |
| Reserved words in name | Validation error | Remove "anthropic" or "claude" from name |

---

## QUALITY CHECKLIST (before packaging)

- [ ] Description is specific, third-person, includes explicit trigger phrases
- [ ] Description is ≤1024 chars (verified with char count)
- [ ] Name is kebab-case, ≤64 chars, matches directory name exactly
- [ ] No XML tags in name or description
- [ ] No reserved words ("anthropic", "claude") in name
- [ ] SKILL.md body is under 500 lines
- [ ] Deep reference material is in `references/` not inline
- [ ] References are max one level deep from SKILL.md
- [ ] No time-sensitive data embedded (or flagged with "verify before use")
- [ ] Tested: skill triggers on the right prompts and not on wrong ones
- [ ] zip -t passes with no errors

---

## DR. JAN'S SKILL NAMING CONVENTIONS

| Domain | Pattern | Example |
|--------|---------|---------|
| FUB/CRM | `fub-[action]` | `fub-write-guardrails` |
| GBP | `gbp-[action]` | `gbp-loop-orchestrator` |
| Content | `[platform]-[action]` | `content-brand-authority` |
| Buyer/seller | `[audience]-[workflow]` | `realscout-buyer-workflow` |
| Strategy | `[framework]-[deliverable]` | `sharran-listing-strategy` |
| System | `dr-jan-[purpose]` | `dr-jan-loop-engineer` |

---

*v1.0 · 2026-06-26 · Sources: platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices (Anthropic official) · agentskills.io/specification · Anthropic "Equipping agents" blog*
