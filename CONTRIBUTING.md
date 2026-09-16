# Contributing

Thanks for helping make agent-generated designs better.

## Ground rules

- **Keep the model consistent.** Costs and unlock conditions live in `skills/rightsizing/references/complexity-budget.md`. If you add a pattern to `design-catalog`, add its cost there too.
- **Keep commands short.** Command skills describe the workflow; knowledge goes in `rightsizing` or `design-catalog` references so it loads only when needed.
- **Every rule needs a reason.** If a rule doesn't prevent drift or mis-sizing, it probably doesn't belong in `rules/core-rules.md`.

## Before opening a PR

```bash
npm run validate
npm run build:adapters
claude plugin validate . --strict   # if you have Claude Code installed
```

Then try your change with `claude --plugin-dir .` on a real idea, and describe what you tested in the PR.

## Adding a stack or pattern

1. Add a row to `patterns.md` or `stacks.md` with cost, when to use, when to avoid, pros, and cons.
2. Add the cost and unlock condition to `complexity-budget.md`.
3. If it introduces a new safety need, add it to `baseline-floor.md`.
