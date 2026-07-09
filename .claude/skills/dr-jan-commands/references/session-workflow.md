# Session Management Commands
*Load this file during any long session or when managing conversation state.*

---

## When to Use These

Session commands keep your work organized, prevent context overload, and let you
recover from wrong turns. In real estate AI work, sessions get long fast — a single
FUB automation build or email campaign can fill the context window quickly.

---

## The Core 12

### `/compact [instructions]`
**When:** Context bar is > 60% full. After a long FUB automation build. After deep
market research.
**What it does:** Summarizes the conversation and frees context while preserving
your work.
**Dr. Jan tip:** `/compact keep all FUB tag names and email templates intact`
**Aliases:** none

---

### `/clear`
**When:** Starting a brand new client, new automation, or completely new topic.
**What it does:** Wipes conversation history entirely. Fresh start.
**Dr. Jan tip:** Use at the start of each new client session.
**Aliases:** `/reset`, `/new`

---

### `/context`
**When:** Session feels sluggish or you want to see how much room you have left.
**What it does:** Shows a visual color-coded grid of current context usage, with
optimization tips.
**Dr. Jan tip:** Run this before starting a new FUB automation build to confirm
you have enough space.

---

### `/export [filename]`
**When:** After finishing a client email series, market report, or automation spec.
**What it does:** Saves the entire conversation as plain text. Without a filename,
opens a dialog to clipboard or file.
**Dr. Jan tip:** `/export SummerlinReport_2026-04-01` saves directly to that file.

---

### `/copy [N]`
**When:** Just drafted an email, GBP post, or video script and want to paste it
elsewhere immediately.
**What it does:** Copies the last Claude response to clipboard. If there are code
blocks, shows a picker to select individual blocks.
**Dr. Jan tip:** After `/copy`, use `w` in the picker to write to a file — great for
saving scripts directly.

---

### `/branch [name]`
**When:** Want to try a different tone, different CTA, or different automation
approach without losing current version.
**What it does:** Forks the conversation at this point. Both branches exist
independently.
**Dr. Jan tip:** `/branch seller-version` before rewriting a buyer email as a
seller email — compare both.
**Aliases:** `/fork`

---

### `/rewind`
**When:** Claude went the wrong direction. Bad automation logic. Wrong email tone.
Wrong approach entirely.
**What it does:** Rolls back to a previous point in the conversation. Shows
checkpoints to pick from.
**Dr. Jan tip:** Run before any big automation build so you have a clean checkpoint
to return to.
**Aliases:** `/checkpoint`

---

### `/rename [name]`
**When:** Mid-session you realize this conversation is becoming a permanent
reference (e.g., a specific client workflow).
**What it does:** Names the session. Shows on the prompt bar. Auto-generates
from history if no name given.
**Dr. Jan tip:** `/rename Smith-Buyer-FUB-Automation` keeps sessions findable.

---

### `/resume [session]`
**When:** Need to continue yesterday's client email series or unfinished automation.
**What it does:** Opens session picker or resumes by session name/ID.
**Dr. Jan tip:** Combined with `/rename` above = your session library.
**Aliases:** `/continue`

---

### `/cost`
**When:** End of a heavy session (large automation builds, research) to track usage.
**What it does:** Shows token usage and cost stats for the session.
**Dr. Jan tip:** Run weekly to understand which workflows consume the most tokens.

---

### `/btw <question>`
**When:** Mid-email draft, want to ask a quick question without it becoming part
of the conversation thread.
**What it does:** Asks a side question that doesn't get added to conversation
history. Clean.
**Dr. Jan tip:** `/btw what's the FUB variable for last property viewed?` — quick
answer, no context pollution.

---

### `/plan [description]`
**When:** Starting a complex multi-step task (6-email drip sequence, full
automation build, campaign planning).
**What it does:** Enters plan mode. Claude lays out the approach for approval
before acting.
**Dr. Jan tip:** `/plan build a 5-email FUB drip for Summerlin buyers` — see the
full plan before committing.
