---
name: status
description: Show where a Draftsman design session stands and what to do next. Use when the user asks about progress, wants to resume a design session, or has several sessions.
argument-hint: "[slug]"
---

# /draftsman:status

1. Find sessions: `docs/design/*/draftsman.json`. If `$ARGUMENTS` names a slug, use that one.
2. If there are none, say so and suggest `/draftsman:start <idea>`.
3. For each session (or the named one), show:

```
<title> (<slug>)
Phase:     options  [intake ✓ clarify ✓ locked ✓ ▶ options · decided · designed · reviewed]
Profile:   T2 Standard (14) · spikes: D4
Budget:    7 / 10 · overrides: 0
Decisions: 3 recorded (DP-1, DP-2, DP-3) · pending: DP-6
Open:      Q-2 retention period for claim photos
Next:      /draftsman:options DP-6
```

4. Point out anything stale: requirements changed after an ADR was written, or ADRs added after `design.md` was written (compare `updatedAt` values and file modification times).
