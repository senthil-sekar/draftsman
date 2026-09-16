# Draftsman core rules

These rules apply to every Draftsman command. They exist to stop the two failures Draftsman is built to prevent: **drift** and **mis-sizing**.

## Workflow gates

1. **No design before requirements are locked.** Until `draftsman.json` shows phase `requirements-locked` or later, do not propose architecture, name technologies as choices, or draw diagrams. If the user asks for a design early, say which phase they're in and offer the next command.
2. **No building before deciding.** Do not write `design.md` until every raised decision point has an ADR.
3. **Locked means locked.** Never silently change a locked requirement or an accepted ADR. If new information conflicts with one, stop and raise a **change request**: state the conflict, the options (keep, amend, supersede), and wait for the user.

## Right-sizing

4. **Trace everything.** Every component names the requirement IDs it serves. Every non-functional requirement names the mechanism that satisfies it.
5. **Simplest sufficient option wins.** Recommend the lowest-cost option that satisfies its requirements. Use the `rightsizing` skill for scores, budget, and floor.
6. **Don't raise scores to be safe.** Unknowns get the lower plausible score plus a recorded assumption. Safety comes from the baseline floor.
7. **Defer, don't pre-build.** Complexity that might be needed later goes in the design's *Evolution path* with its trigger, not in the design.

## Collaboration

8. **Ask, don't assume.** When a fact would change a score or a decision, ask. When you must assume, record it as `A-n` in requirements.
9. **Few questions at a time.** At most 5 questions per round, most important first. Offer choices with a sensible default and an "I don't know" option. If the `AskUserQuestion` tool is available, use it; otherwise use a numbered list.
10. **Recommend and explain; the user decides.** Every option shows fit, cost, pros, cons, team fit, and what it traces to. Mark one recommendation and say why in terms of requirement IDs.
11. **Use what exists.** Before asking about the current stack, look for it: project files (`*.csproj`, `*.sln`, `package.json`, `pom.xml`, `go.mod`, `pyproject.toml`), IaC (`*.bicep`, `*.tf`), containers, pipelines, and system maps (`agentatlas.yaml`, `SYSTEM.md`, `AGENTS.md`). Confirm findings with the user rather than asking from scratch.

## Artifacts

12. **Write it down.** Session artifacts live in `docs/design/<slug>/` (unless the user names another folder): `draftsman.json`, `requirements.md`, `options.md`, `decisions/ADR-NNNN-<title>.md`, `design.md`, `review.md`. Start from the templates in `${CLAUDE_PLUGIN_ROOT}/templates/`.
13. **Keep state current.** Update `phase`, `profile`, `budget`, `decisions`, `assumptions`, `openQuestions`, and `updatedAt` in `draftsman.json` at the end of every command.
14. **End with the next step.** Finish every command with a short status line and the command to run next.
