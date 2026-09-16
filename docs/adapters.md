# Using Draftsman outside Claude Code

Claude Code is the reference platform. The adapter builder ports the same source to other tools, and a few things behave differently.

| Capability | Claude Code | Cursor / Copilot / generic |
|---|---|---|
| Slash commands | `/draftsman:start` | `/draftsman-start` (Cursor, Copilot), or open the prompt file (generic) |
| Subagents | `surveyor`, `drafter`, `inspector` run in separate contexts | The agent is told to do a "separate, focused pass" using the agent file. Same instructions, but the pass shares the main context, so the review is less independent. For a stronger review, run `/draftsman-review` in a **new chat**. |
| Background knowledge | Loaded on demand as skills | Plain files under the target root, read when a command points to them |
| Structured questions | `AskUserQuestion` tool when available | Numbered lists |
| Paths | `${CLAUDE_PLUGIN_ROOT}` | Rewritten to `.cursor/draftsman`, `.github/draftsman`, or `.draftsman` |

## Updating

Re-run the build command after pulling a new Draftsman version. It overwrites only files under the target root and the command/rule files it generated. Your `docs/design/` sessions are never touched.

## Committing the generated files

Commit them if your whole team should get the same commands. Otherwise add the target root to `.gitignore`.
