# Roadmap

## Shipped

### 0.1 — 2026-09-16
- Seven-command workflow with gates and anti-drift rules
- Scale Profile, complexity budget, unlock conditions, baseline floor
- Surveyor, drafter, and inspector agents
- Adapters for Cursor, GitHub Copilot, and generic `AGENTS.md` tools
- Worked example: FNOL intake

### 0.2 — 2026-09-19
- Claude Code plugin and marketplace manifests (`/plugin marketplace add senthil-sekar/draftsman`)
- **Researcher** agent: live, dated best-practice lookup when `design-catalog` has no entry
- **Org tooling** discovery: the surveyor checks connected MCP tools for internal search, catalogs, and wikis before a design assumes a new build

### 0.3 — this release
- **Stack-agnostic catalog**: provider tables in alphabetical order; requirements record a language/runtime and a cloud/hosting preference, and options show only the matching column
- **Frontend** decision (DP-11) with patterns and frameworks across nine ecosystems
- **Evals** (`npm run eval`): five cases from T0 to T4 plus brownfield, run with and without the plugin
- **Insurance domain pack**: scoring hints, floor additions, typical integrations
- **Brownfield mode**: `/draftsman:evolve` starts from the current system's profile and architecture

## Next (0.4)
- **Team defaults** (`.draftsman/defaults.yaml`): approved clouds and languages, banned technologies, and a default domain, used to pre-fill the language/cloud preference and constraints so they aren't asked every session
- **AgentAtlas live topology**: query `atlas-mcp` instead of reading a `SYSTEM.md` snapshot, and check new designs against existing services and contracts
- **More eval coverage**: the researcher path (needs WebSearch mocks), an evolve case with no earlier Draftsman session, and a review case that seeds a known over-engineered design
- **Payments and healthcare domain packs**, built the same way as the insurance pack and covered by evals from the start

## Later
- **Export**: C4 model (Structurizr DSL) and draw.io from `design.md`
- Cost estimation per option using public cloud pricing APIs
- Team-level dashboards of design decisions across repositories
