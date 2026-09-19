# Changelog

## 0.2.0 — 2026-09-19

- Agent: `researcher` — live, dated best-practice lookup for decision points `design-catalog` doesn't cover, wired into `/draftsman:options`
- `surveyor` now checks connected MCP tools for an internal search/catalog/wiki before a design assumes something new must be built, and reports it as "Org tooling"
- `options.md` and the `design-catalog` option shape carry a `Source` field, so live-researched options are always dated and never confused with vetted catalog entries
- Core rules: 2 new rules (org-level "use what exists," citing live research)

## 0.1.0 — 2026-09-16

First release.

- Commands: `start`, `clarify`, `options`, `decide`, `doc`, `review`, `status`
- Right-sizing model: Scale Profile (8 dimensions), tiers T0–T4, complexity budget, unlock conditions, baseline floor
- Agents: `surveyor`, `drafter`, `inspector`
- Templates for requirements, options, ADRs, design, review, and session state
- Adapter builder for Cursor, GitHub Copilot, and generic `AGENTS.md` tools
- Example session: FNOL intake
