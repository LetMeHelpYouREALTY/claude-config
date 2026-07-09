---
name: dr-jan-commands
description: >
  Dr. Jan's complete guide to all 69 Claude built-in commands + bundled skills,
  organized by real estate workflow. Claude proactively suggests the right command
  at the right moment — during FUB automation builds, client email drafting, market
  research sessions, Vercel/Cloudflare deployments, and content creation. Triggers
  whenever Dr. Jan is deep in a workflow and a built-in command would save time,
  prevent errors, or improve output. Also triggers on: "what commands", "what can
  I type", "how do I save this", "start over", "go back", "switch models",
  "schedule this", "check my context", "help", "what skills do I have", "show me
  commands", "what tools", "what can you do", "shortcuts", "how do I", "capabilities",
  "what commands do I have", "what do I have", "/commands", "skill list", "command list".
---

# Dr. Jan's Claude Command Guide
**Version:** 1.0 | **Last Updated:** 2026-04-01
**Source:** code.claude.com/docs/en/commands (69 total: 64 built-in + 5 bundled)

---

## 🎯 HOW CLAUDE USES THIS SKILL

Claude proactively surfaces the right command at the right moment using this format:

> 💡 **Quick tip:** `/command` would [do X] right now — just type it and press Enter.

Never interrupt flow. Suggest once, naturally. One command at a time.

---

## ⚡ PROACTIVE SUGGESTION RULES

Claude watches for these triggers and suggests the matching command:

| When Dr. Jan is... | Suggest |
|---|---|
| Context bar getting long (FUB builds, research) | `/compact` — compress without losing work |
| Finishing a draft email or GBP post | `/copy` — grab it for clipboard |
| Wants to save a conversation/research session | `/export` — saves as plain text |
| Starting a new client or project mid-session | `/branch` — fork and try a different angle |
| Wants to undo Claude's last action | `/rewind` — checkpoints available |
| Switching from quick emails → financial modeling | `/model` → Opus 4.6 for heavier analysis |
| Doing a fast client question | `/fast on` — speed mode for quick answers |
| Building FUB automation or code for Vercel | `/diff` — review changes before committing |
| About to push website code | `/security-review` — catches injection risks |
| Needs Claude to repeat a check every X minutes | `/loop 5m [prompt]` — polling/monitoring |
| Making bulk changes to multiple site files | `/batch [instruction]` — parallel agents |
| Session feels slow or buggy | `/debug` — starts capturing logs |
| After a complex feature build | `/simplify` — runs 3 cleanup agents in parallel |
| Wants to schedule a recurring AI task | `/schedule` — cloud scheduled tasks |
| Needs to check token/cost usage | `/cost` — token stats |
| Wants to check context window status | `/context` — visual grid of context usage |

---

## 📂 WORKFLOW COMMAND GROUPS

Reference files load on demand. Read the relevant file when deep in that workflow.

| Workflow | File | Key Commands |
|---|---|---|
| Session management | [session-workflow.md](references/session-workflow.md) | /clear, /compact, /context, /export, /branch, /rewind |
| Client emails & content | [content-workflow.md](references/content-workflow.md) | /plan, /btw, /copy, /export, /branch |
| FUB automations & tech | [fub-tech-workflow.md](references/fub-tech-workflow.md) | /diff, /security-review, /schedule, /batch, /loop |
| Market research | [research-workflow.md](references/research-workflow.md) | /memory, /insights, /compact, /loop |
| Full command A–Z | [full-reference.md](references/full-reference.md) | All 64 built-in + 5 bundled |

---

## 🔑 THE 10 DR. JAN MUST-KNOW COMMANDS

These 10 commands cover 80% of daily real estate use cases:

```
/compact          → Compress long FUB/research sessions
/branch           → Try alternative email version without losing original
/rewind           → Undo last Claude action (checkpoints)
/copy             → Grab email/post draft for clipboard instantly
/export           → Save full conversation as text file
/memory           → Update CLAUDE.md with new SOPs or market data
/diff             → Review code changes before pushing to Vercel
/schedule         → Create recurring AI tasks (weekly market reports, etc.)
/model            → Switch to Opus 4.6 for financial/investor analysis
/loop 5m [prompt] → Monitor deployments, poll for changes
```

---

## 🏷️ BUNDLED SKILLS (pre-installed, invoke with /)

| Skill | When to Use |
|---|---|
| `/batch <instruction>` | Bulk changes to domain portfolio sites, mass SEO updates |
| `/simplify [focus]` | After building FUB automations or Vercel code — clean it up |
| `/debug [description]` | When a session is producing unexpected results |
| `/loop [interval] <prompt>` | Poll Vercel deployments, watch for MLS changes |
| `/claude-api` | When building on the Claude API or Agent SDK |
| `/security-review` | Before any code push — catches injection, auth, data exposure |

---

## 🚫 COMMANDS TO SKIP IN COWORK

These built-in commands are not available or not applicable in Cowork mode:
- `/terminal-setup` — CLI terminal only
- `/desktop` — Desktop app switcher only
- `/vim` — CLI only
- `/sandbox` — Platform-specific

---

## 📋 QUICK REFERENCE: COMMAND CATEGORIES

Read [full-reference.md](references/full-reference.md) for complete descriptions.

**Session:** /clear · /compact · /context · /copy · /cost · /export · /rename · /resume · /rewind · /branch · /btw · /plan

**FUB/Tech:** /diff · /security-review · /schedule · /hooks · /permissions · /sandbox · /pr-comments · /batch · /loop · /simplify

**Research:** /memory · /insights · /compact · /loop · /claude-api

**Config:** /model · /effort · /fast · /theme · /color · /config · /vim

**Account:** /login · /logout · /usage · /extra-usage · /upgrade · /privacy-settings

**System:** /doctor · /init · /mcp · /ide · /agents · /skills · /plugin · /reload-plugins · /keybindings · /install-github-app · /install-slack-app · /statusline · /debug

**Info:** /help · /status · /stats · /release-notes · /context · /tasks · /feedback

**Other:** /add-dir · /remote-control · /remote-env · /chrome · /mobile · /desktop · /voice · /stickers · /passes
