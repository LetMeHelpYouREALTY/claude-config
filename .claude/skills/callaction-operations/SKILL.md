---
name: callaction-operations
description: >
  Dr. Jan Duffy's operating rules for CallAction — the call-tracking and
  website-form intake layer that feeds Follow Up Boss. Trigger on ANY request
  involving: CallAction, a tracking number, call tracking, "what phone number
  goes on [site]", provisioning or changing a phone number, GBP NAP phone,
  call logs or call recordings, missed-call automation, a number starting
  702-500 / 702-766 / 702-930, or wiring a new website's contact info. Also
  trigger before publishing ANY phone number on a website, GBP listing, or
  marketing material — the per-site number registry and never-swap rules in
  this skill override improvisation. Encodes the site-phone registry, the
  line-type map (direct vs FUB vs tracking vs marketing), the CallAction→FUB
  integration architecture, and the hard guardrails that protect local SEO
  NAP consistency.
---

# callaction-operations

CallAction (callaction.co) is the call-tracking + website-form intake layer.
Every inbound call/text/form on a tracked number is captured, engaged, and
pushed to **Follow Up Boss — the system of record** — via CallAction's native
FUB API integration. Verified 2026-07-23: CallAction publishes **no MCP server,
no agent skills, and no public API docs** (open API endpoints exist by request
to support). Operate it through its FUB output and the app UI.

## Line-type map (confirmed by Dr. Jan 2026-07-23)

Dr. Jan has THREE kinds of phone lines. Never conflate them:

| Line | Number | Use |
|---|---|---|
| Direct professional line | **702-500-1955** | Person-to-person professional contact. Not a tracking number. |
| FUB-provisioned line | **702-500-1942** | Lives inside FUB ("professional/FUB line" in GOI v2.2). Also duffyrealtyoflasvegas.com's registry number. Never present as her personal line. |
| Marketing / all CTAs | **702-222-1964** | The CTA on all client-facing content unless a site has its own tracking number. |
| CallAction tracking numbers | per-site (below) | One dedicated number per website; doubles as that location's contact number. |

## Site phone registry (CallAction tracking numbers)

These are INTENTIONAL and must NEVER be replaced with 702-222-1964 or each
other. Changing any of them breaks local SEO / NAP consistency.

- drjanduffy.com = **702-500-1064** (repo is under `LetMeHelpYouREALTY` org, not DrJanDuffy)
- duffyrealtyoflasvegas.com = **702-500-1942**
- drjanetduffy.com = **702-766-7668**
- cadencehenderson.com = **702-930-8672** (new builds ONLY)

History: two PowerShell scripts that previously overrode these numbers
(`revert-phone-numbers.ps1`, `update-phone-and-stats.ps1`) were permanently
deleted May 8, 2026. Do not recreate anything that mass-edits phone numbers.

## Hard guardrails

1. **Never swap a number between sites.** Each website keeps its own number.
2. **New tracking number → ALWAYS ask Dr. Jan first.** No exceptions.
3. **Any number not in this registry → ask before using it anywhere.**
4. **Confirm the account before any write.** CallAction is a dual-account
   connector in Cowork (2 accounts) — same rule as Gmail/FUB/Homebot.
5. ⚠️ **OPEN CONFLICT — do not resolve silently (flagged 2026-07-23):**
   CLAUDE.md's Site Phone Registry says each site's CallAction number "also
   serves as the GBP NAP phone for that location," but the GBP Locations
   section says "NAP everywhere: … 702-222-1964." Before editing any GBP
   listing's phone, ask Dr. Jan which rule governs that location.

## Integration architecture

- **CallAction → FUB:** native API integration (see
  help.callaction.co article 615654). Leads land in FUB with full call/text
  context; FUB automations take over from there. FUB always wins on conflicts.
- **CallAction Zapier:** exists but is private-beta (invite link), only two
  triggers (New Contact, New Activity). NOT part of the stack — the Zapier
  decommission program (locked April 2026) does not add new Zaps. The native
  FUB integration covers the data path.
- **Downstream:** once a lead is in FUB, use the FollowUpAce MCP
  (`followupace-fub-mcp` skill) for all reads/writes — never try to write
  back into CallAction programmatically.

## What NOT to do

- Don't look for a CallAction MCP or SDK — none exists (verified 2026-07-23).
- Don't build Zaps against CallAction's private-beta Zapier app.
- Don't put a tracking number in an email signature or colleague email —
  those use 702-500-1955 (see CLAUDE.md contact rules).
- Don't quote call analytics from memory — pull them from the CallAction app
  or the FUB activity log.
