# Full Claude Commands Reference — A to Z
*All 64 built-in commands + 5 bundled skills. Source: code.claude.com/docs/en/commands*
*Last verified: April 2026*

---

## Built-in Commands (64)

| Command | What It Does | Dr. Jan Use Case |
|---|---|---|
| `/add-dir <path>` | Add a working directory for file access in the current session | Add a client folder or domain portfolio folder mid-session |
| `/agents` | Manage subagent configurations | Set up Explore/Plan agents for FUB automation research |
| `/btw <question>` | Ask a quick side question without adding to conversation | Quick MLS fact-check mid-email draft |
| `/branch [name]` | Fork conversation at this point (alias: `/fork`) | Create buyer vs. seller version of same email |
| `/chrome` | Configure Claude in Chrome settings | Set up Chrome browsing agent |
| `/clear` | Clear conversation history (aliases: `/reset`, `/new`) | Start fresh for new client session |
| `/color [color]` | Set prompt bar color for current session | Color-code sessions by workflow type |
| `/compact [instructions]` | Compress conversation while preserving work | Extend long FUB build sessions |
| `/config` | Open Settings interface (alias: `/settings`) | Change theme, model, output style |
| `/context` | Visual context usage grid with optimization tips | Check before starting large automation build |
| `/copy [N]` | Copy last response to clipboard; picker for code blocks | Grab email draft for FUB template editor |
| `/cost` | Show token usage statistics | Track costs after heavy research sessions |
| `/desktop` | Continue session in Claude Code Desktop (alias: `/app`) | Switch to desktop for extended work |
| `/diff` | Interactive diff viewer for uncommitted changes | Review Vercel site code before committing |
| `/doctor` | Diagnose Claude Code installation and settings | Troubleshoot connection issues |
| `/effort [level]` | Set model effort: low/medium/high/max/auto | `high` for investor analysis, `low` for quick emails |
| `/exit` | Exit the CLI (alias: `/quit`) | End session cleanly |
| `/export [filename]` | Export conversation as plain text | Save completed email series or market reports |
| `/extra-usage` | Configure extra usage when rate limits are hit | Keep working through heavy sessions |
| `/fast [on\|off]` | Toggle fast mode | Quick client email checks, rapid Q&A |
| `/feedback [report]` | Submit feedback (alias: `/bug`) | Report Claude issues |
| `/help` | Show help and available commands | Discover new commands |
| `/hooks` | View hook configurations for tool events | Check pre-commit hooks before Vercel push |
| `/ide` | Manage IDE integrations and show status | Cursor IDE setup |
| `/init` | Initialize project with CLAUDE.md guide | Set up new domain project |
| `/insights` | Report analyzing your Claude Code sessions | Weekly workflow efficiency review |
| `/install-github-app` | Set up Claude GitHub Actions app | Automate code reviews on domain repos |
| `/install-slack-app` | Install Claude Slack app | Team notifications for deployment alerts |
| `/keybindings` | Open or create keybindings configuration file | Customize keyboard shortcuts |
| `/login` | Sign in to Anthropic account | Authentication |
| `/logout` | Sign out from Anthropic account | Switch accounts |
| `/mcp` | Manage MCP server connections and OAuth | Check FUB, Notion, Vercel MCP connections |
| `/memory` | Edit CLAUDE.md files, enable auto-memory | Save new market data and SOPs |
| `/mobile` | Show QR code for Claude mobile app (aliases: `/ios`, `/android`) | Get Claude on phone |
| `/model [model]` | Select or change AI model | Opus 4.6 for financial, Sonnet 4.6 for standard |
| `/passes` | Share a free week of Claude Code | Give to team members |
| `/permissions` | Manage allow/ask/deny tool rules (alias: `/allowed-tools`) | Lock down tools during sensitive builds |
| `/plan [description]` | Enter plan mode | Map out complex automation builds |
| `/plugin` | Manage Claude Code plugins | Install/update Cowork plugins |
| `/pr-comments [PR]` | Fetch GitHub PR comments | Review son's dev team comments |
| `/privacy-settings` | View/update privacy settings (Pro/Max only) | Control data settings |
| `/release-notes` | View full changelog | Check what's new in Claude Code |
| `/reload-plugins` | Reload all active plugins without restarting | Apply plugin updates mid-session |
| `/remote-control` | Make session available for remote control (alias: `/rc`) | Allow remote session access |
| `/remote-env` | Configure default remote environment | Web session environment setup |
| `/rename [name]` | Rename current session | Name by client or project for easy resume |
| `/resume [session]` | Resume a previous session (alias: `/continue`) | Continue yesterday's campaign build |
| `/rewind` | Rewind to previous checkpoint (alias: `/checkpoint`) | Undo wrong automation logic |
| `/sandbox` | Toggle sandbox mode | Test automations without touching live contacts |
| `/schedule [description]` | Create/manage cloud scheduled tasks | Weekly market reports, monthly audits |
| `/security-review` | Analyze pending changes for vulnerabilities | Required before every Vercel push |
| `/skills` | List available skills | See all Dr. Jan custom skills |
| `/stats` | Visualize daily usage, streaks, model preferences | Track weekly Claude usage patterns |
| `/status` | Settings interface — version, model, account, connectivity | Quick health check |
| `/statusline` | Configure Claude Code status line | Shell prompt integration |
| `/stickers` | Order Claude Code stickers | 🎰 |
| `/tasks` | List and manage background tasks (alias: `/bashes`) | Monitor running parallel agents |
| `/terminal-setup` | Configure terminal keybindings | VS Code / Warp / Alacritty setup |
| `/theme` | Change color theme | Light/dark/colorblind/ANSI themes |
| `/upgrade` | Open upgrade page (Pro/Max) | Upgrade plan |
| `/usage` | Show plan usage limits and rate limit status | Check remaining quota |
| `/vim` | Toggle Vim editing mode | CLI power users |
| `/voice` | Toggle push-to-talk voice dictation | Hands-free input |

---

## Bundled Skills (5)
*Pre-installed. Invoke with `/` like any command.*

| Skill | Arguments | What It Does | Dr. Jan Use Case |
|---|---|---|---|
| `/batch` | `<instruction>` | Parallel agents for large-scale codebase changes | Bulk update phone numbers or schema across 50 sites |
| `/claude-api` | none | Load Claude API reference for your project's language | Building on Anthropic API or Agent SDK |
| `/debug` | `[description]` | Enable debug logging + analyze session debug log | Troubleshoot broken automation or unexpected output |
| `/loop` | `[interval] <prompt>` | Repeat a prompt on an interval while session is open | Monitor Vercel deploys, poll for MLS changes |
| `/simplify` | `[focus]` | 3 parallel review agents (reuse, quality, efficiency) + apply fixes | Clean up FUB automation specs or Vercel components |

---

## Deprecated Commands

| Command | Status | Replacement |
|---|---|---|
| `/review` | ❌ Deprecated | Install `code-review` plugin: `claude plugin install code-review@claude-plugins-official` |

---

## Aliases Quick Reference

| Alias | Primary Command |
|---|---|
| `/reset`, `/new` | `/clear` |
| `/settings` | `/config` |
| `/app` | `/desktop` |
| `/quit` | `/exit` |
| `/bug` | `/feedback` |
| `/fork` | `/branch` |
| `/ios`, `/android` | `/mobile` |
| `/allowed-tools` | `/permissions` |
| `/rc` | `/remote-control` |
| `/continue` | `/resume` |
| `/checkpoint` | `/rewind` |
| `/bashes` | `/tasks` |

**Total including aliases: ~76 slash entry points**
**Plus MCP server prompts** (format: `/mcp__<server>__<prompt>`) add additional commands based on your connected MCPs.

---

## Dr. Jan's Connected MCPs (Commands Available)

Your connected MCPs expose additional `/mcp__` prompts:
- Gmail → `/mcp__gmail__*`
- Google Calendar → `/mcp__gcal__*`
- Notion → `/mcp__notion__*`
- Vercel → `/mcp__vercel__*`
- Airtable → `/mcp__airtable__*`
- ClickUp → `/mcp__clickup__*`
- Asana → `/mcp__asana__*`

Type `/` in Claude Code to see the full dynamic list from your connected MCPs.
