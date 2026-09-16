---
name: review
description: Run Draftsman's right-size review on a design, flagging over-engineering, under-engineering, and drift against locked requirements and ADRs. Use when the user asks to review, check, or critique a system design, including designs not created with Draftsman.
argument-hint: "[slug or path to a design document]"
---

# /draftsman:review

Read `${CLAUDE_PLUGIN_ROOT}/rules/core-rules.md`.

## Two modes

- **Session mode:** `$ARGUMENTS` is a slug, or there is an active session with `phase` `designed` or later. Review `docs/design/<slug>/design.md`.
- **External mode:** `$ARGUMENTS` is a path to any design document. There are no locked requirements, so first extract the requirements the document states or implies, score a provisional Scale Profile, and label every finding as provisional.

## Steps

1. **Delegate to the `inspector` agent** with paths to the design, the requirements, all ADRs, and `${CLAUDE_PLUGIN_ROOT}/templates/review.md`. The inspector works in its own context so it doesn't grade its own homework.
2. **Verify the inspector's findings** against the documents. Drop any finding you can't point to in the text.
3. **Write** `docs/design/<slug>/review.md` (in external mode, write next to the reviewed document as `<name>.review.md`).
4. **Present** the verdict, the budget line, and the top findings (High severity first).
5. **Offer fixes.** For each High finding, propose a concrete change. Apply changes only after the user agrees:
   - Changes to decisions go through `/draftsman:decide` (supersede).
   - Changes to requirements go through `/draftsman:clarify` (change request).
   - Other changes: regenerate the affected design sections.
6. **Update `draftsman.json`:** `phase: "reviewed"` when the verdict is RIGHT-SIZED, otherwise leave `phase` as `designed`.
