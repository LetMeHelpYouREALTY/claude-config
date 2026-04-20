# claude-config

Versioned mirror of Dr. Jan Duffy's global Claude Code configuration.

Source of truth: `C:\Users\geneb\.claude\` on the operator workstation.

## Contents

- `CLAUDE.md` — global instructions loaded into every Claude Code session
- `commands/` — custom slash commands (e.g. `/init`)

## Restore on a new machine

```bash
git clone git@github.com:DrJanDuffy/claude-config.git ~/claude-config
cp ~/claude-config/CLAUDE.md ~/.claude/CLAUDE.md
cp -r ~/claude-config/commands ~/.claude/commands
```

## What is NOT mirrored (and why)

Session state, transcripts, todos, caches, MCP auth, plugins, and worktrees
are runtime artifacts — see `.gitignore`. They contain conversation history
and credentials and must stay local.

## Update workflow

After editing `~/.claude/CLAUDE.md` or `~/.claude/commands/`:

```bash
cp ~/.claude/CLAUDE.md ~/claude-config/CLAUDE.md
cp -r ~/.claude/commands/* ~/claude-config/commands/
cd ~/claude-config && git add . && git commit -m "chore: sync from workstation" && git push
```
