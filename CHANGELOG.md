# Changelog

## 0.4.0 — 2026-10-14

**Trusted sources for live research**
- `trusted-sources.md` lists the only sources live research may use: official vendor and project docs (only for facts about their own products), cloud architecture centers, standards bodies, regulators, and three curated pattern references. It also has a never-use list (blogs, forums, video, listicles, vendor "X vs Y" pages, Wikipedia, law-firm summaries). Projects can add or remove domains in `.draftsman/trusted-sources.md`.
- `researcher` passes `allowed_domains` on every search, fetches only listed domains, verifies licenses from the source, and drops claims or options with no trusted source. `options` re-checks every URL, and core rule 14 makes a trusted source mandatory.

**Catalog**
- Every `stacks.md` table gains **Open source** (OSI-approved only) and **Commercial / SaaS** columns. New tables: API management and integration, identity and secrets.
- Corrected labels: SQL Server and MongoDB are no longer listed as open source. Terraform and Vault are marked BSL, with the OpenTofu and OpenBao forks; Redpanda as BSL; ScyllaDB as source-available. Camunda 7 CE is dropped (end of life). MinIO is dropped (archived). MassTransit v9+ is marked commercial.
- Dated **licensing notes**, each verified on the maker's or the OSI's own site.
- New decision points with patterns, costs, and unlock conditions: **DP-15 Analytics and reporting** (operational reporting 0–1 → BI 1 → warehouse 3 → lakehouse 5) and **DP-16 AI and ML** (hosted model 1 → RAG 2 → agent 3 → ML platform 3 → self-hosted model 5).
- Baseline floor gains **capability-raised** items: analytical stores, LLM use, retrieval over untrusted content, and AI in decisions about people. The insurance pack adds NAIC AI Model Bulletin items.
- Options carry a `License:` line. `clarify` asks which tools the organization already licenses, and the recommendation rules prefer existing licenses.

**Evals**
- New cases: `thin-claims-reporting` and `thin-fraud-detection` (one-line briefs) and `research-handbook-assistant` (the live research path with the trusted-domain checks). Eval scripts now allow `WebSearch` and `WebFetch`.

## 0.3.0 — 2026-10-14

**Brownfield**
- Command: `/draftsman:evolve` plans a change to an existing system. It starts from an earlier session or a survey of the code, records the as-is system in `current-state.md`, re-scores only the dimensions the change moves, counts existing components against the budget, and makes "extend what exists" option A. Designs mark components Existing/Changed/New and include a rollout plan.
- `start` hands off to `evolve` when the idea extends a system already in the repo. `drafter`, `inspector`, `doc`, and `status` understand evolve mode.

**Domain packs**
- Skill: `domain-insurance` adds scoring hints, zero-cost floor items (effective dating, reproducible rating, FCRA/DPPA handling, claims deadlines, OFAC screening, regulator notification, PCI scope reduction), and typical integrations. `clarify` sets `domain` in `draftsman.json`, and `drafter`, `inspector`, and `doc` enforce the pack's floor.

**Evals**
- `evals/`: five `claude plugin eval` cases (T0, T1 with no stack given, T2 insurance, T4 insurance payments, brownfield evolve). Each case's facts sit mid-band for its tier. Graders cover tier, over- and under-engineering, floor coverage, stack adherence, and ADRs.
- `npm run eval` and `npm run eval:quick`. `validate.mjs` checks eval structure, grader types, and regex syntax.

**Stack-agnostic catalog**
- `design-catalog`: a Frontend decision (DP-11) in `patterns.md` and `stacks.md` (static/MPA, SPA, SSR/meta-framework, micro-frontends) across nine ecosystems (added Ruby, PHP, Rust).
- `stacks.md`: provider tables are now alphabetical (AWS/Azure/GCP/OSS). Before, they were implicitly Azure-first.
- Requirements record a **Language/runtime** and **Cloud/hosting** preference (found, stated, or "open"). `options` step 0 shows only the matching column(s), or the best cross-ecosystem options when the preference is open.
- Core rules: new rule 8, "stay platform-agnostic until told otherwise".
- Session template gains `mode`, `baseline`, and `domain`.

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
