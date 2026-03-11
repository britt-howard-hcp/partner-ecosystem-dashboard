# PROJECT-HUB.md — Partner Ecosystem Dashboard

> Read this file first every session. It is the living source of truth for project status, decisions, and direction. See `CLAUDE.md` for technical architecture and build rules.

## Charter

**What:** A market intelligence dashboard for HCP's partner ecosystem. Visualizes Airtable partner data with filtering, classification, charts, and company profiles.

**Who it's for:** Britt (daily), Roland and leadership (occasional screenshare/pull-up).

**What problem it solves:** Makes Roland's questions instant — "how many CSR AI companies?", "what's in the pipeline?", "show me Controlled requests" — without Britt manually querying Airtable. Frames the ecosystem as market intelligence, not a pipeline spreadsheet.

**What it is NOT:** A pipeline management tool, a CRM, or a replacement for Airtable. Britt still does his work in Airtable. The dashboard is the presentation and intelligence layer on top of it.

**Live URL:** https://partner-ecosystem-dashboard.vercel.app/
**Password:** hcp2026
**GitHub:** britt-howard-hcp/partner-ecosystem-dashboard (auto-deploys from main)

---

## Current Status

**Core dashboard: Complete and live.** Market Pulse charts, KPI cards, filterable partner table, slide-out detail panel, analyst narrative. All working against real Airtable data.

**Ask the Ecosystem (AI chat): Frontend complete, API paused.** The streaming chat UI is built and deployed. Backend calls OpenAI GPT-4o. Blocked on OpenAI API credits — add $5 at platform.openai.com and it goes live instantly.

**Next direction: Under review.** The dashboard needs to decide its identity — is it a leadership presentation tool (mostly done) or a daily command center (needs write-back, intake queue, activity feed)? See Open Questions below.

---

## Roadmap

### Phase 1 — Core Dashboard ✅ COMPLETE
- 1A: Layout restructure, Airtable connection, partner table, KPI bar
- 1B: Category intelligence, clickable KPIs, filter dropdowns, chart drill-down
- 1B-fix: Multi-select array model, KPI reorder, filter consolidation

### Phase 2 — Visual Polish ✅ COMPLETE
- EnrichedBadge (✨), pagination, chart fixes, terminology pass
- Password gate, search engine blocking

### Phase 3 — Ask the Ecosystem ✅ FRONTEND COMPLETE (API paused)
- Streaming chat UI, OpenAI GPT-4o backend, partner context serialization
- 20-question session limit, conversation history sliding window
- Graceful degradation when API unavailable
- **Blocker:** OpenAI API credits not loaded

### Phase 3 Remaining (deferred)
- AI record enrichment ("Enrich this record" button in detail panel)
- Dynamic narrative block powered by AI
- EnrichedBadge reused for AI-generated values

### Phase 4+ — Not yet scoped
Two possible directions under consideration (see Open Questions):
- **Direction A (Leadership Window):** Export/snapshot features, report generation, screenshare-optimized views
- **Direction B (Command Center):** Write-back to Airtable, intake queue, activity feed, meeting prep, quick actions

---

## Decision Log

| # | Date | Decision | Rationale |
|---|---|---|---|
| 1 | Feb 2026 | Kill kanban, table-first layout | Kanban was 90% one column (Evaluating). Table answers real questions. Kanban is the wrong metaphor for a growing dataset. |
| 2 | Feb 2026 | Market intelligence framing, not pipeline management | Matches how Britt and Roland actually use the data — "what is the market sending us?" not "where is each partner in our process?" |
| 3 | Feb 2026 | Full-width layout, remove sidebar/chat | Chat panel was non-functional and took permanent real estate. Go full-width, add chat back as an overlay when ready. |
| 4 | Feb 2026 | Use real Airtable stages, not collapsed statuses | Original 4-status model (Evaluating/Onboarding/Active/Declined) lost important distinctions. Raw 9-stage passthrough preserves Unexplored vs. Initial Call vs. Discovery. |
| 5 | Feb 2026 | Classification overrides as shrinking bridge layer | Airtable doesn't have classification/integration-type/partnership-type fields yet. Overrides file provides these until Airtable catches up. Designed to shrink, not grow. |
| 6 | Feb 2026 | Multi-select category arrays throughout | Airtable Category is multi-select. Every component handles arrays — charts count tags independently, filters check inclusion, never join to strings. |
| 7 | Mar 2026 | Password gate over real auth | Internal tool, low traffic. `VITE_SITE_PASSWORD` in client bundle is intentional — gate, not security. No user management overhead. |
| 8 | Mar 2026 | OpenAI GPT-4o instead of Claude API | Britt has existing OpenAI API key. No Anthropic API account. Pragmatic choice — the frontend is provider-agnostic (normalized SSE format), so swapping later is trivial. |
| 9 | Mar 2026 | Provider-agnostic streaming architecture | `api/ask.ts` translates provider-specific events to `{ text: "..." }`. Frontend never knows which AI provider is behind it. Future-proofs for any swap. |
| 10 | Mar 2026 | Default sort: request date, newest first | Most useful view on load — see what's new. Previously sorted by name (alphabetical), which buried recent activity. |
| 11 | Mar 2026 | Pause AI chat, re-evaluate direction without AI dependency | AI chat requires API credits and introduces external dependency. Dashboard should be valuable without it. Strategic planning session to determine non-AI scope. |

---

## Open Questions

1. **Identity: Leadership Window vs. Daily Command Center?** The dashboard is close to done as a presentation tool (Identity A). Becoming a daily work tool (Identity B) requires write-back, intake queue, activity feed — significant new work. Which direction? Can it be both? Does it need to be?

2. **Has Roland seen it?** The single highest-value action is a screenshare with Roland. His reaction tells us more about what to build next than any planning session. Has this happened?

3. **Classification framework approval?** The three-tier model (Core Conflict / Controlled / Open) is pending leadership approval. The dashboard treats it as operational. When does this get formalized? Should it move to an Airtable field?

4. **AI chat: activate or shelve?** Needs $5 in OpenAI credits. Is it worth activating now, or is the feature deprioritized? The frontend is deployed and ready.

5. **"Service" vs. "Services" category?** Known near-duplicate in Airtable. Britt to consolidate when ready. Dashboard displays as-is.

6. **Classification overrides → Airtable field?** The overrides file (67+ entries) requires code deploys to update. Moving classification to an Airtable single-select field would eliminate this maintenance. When/if to do this?

---

## KB References

These knowledge base files are relevant when working on the dashboard:

| File | What it provides |
|---|---|
| `01-partner-ecosystem/` (220 files) | Per-partner context for detail panel, classification decisions |
| `02-api-program/api-usage-by-org.md` | API request data (29,443 orgs) — informs integration type classification |
| `02-api-program/api-surface-audit.md` | Endpoint inventory, auth model — informs integration type options |
| `03-reporting-and-data/qbr-decks/` | QBR decks (Jan 2025–Feb 2026) — ecosystem metrics, partner counts |
| `01-partner-ecosystem/partner-directory/` | Airtable export context, category taxonomy, status definitions |

---

## Session Log

| Date | Session | What happened |
|---|---|---|
| Feb 2026 | Initial build | Phases 1A through 2 — full dashboard build from scaffold to production. Design review interview → CLAUDE.md → phased execution. |
| Mar 4, 2026 | Security + polish | Added password gate, search engine blocking. Phase 2 fixes (pipeline labels, pie clipping, sparkle icon). |
| Mar 11, 2026 | Phase 3 + strategic review | Built Ask the Ecosystem AI chat (OpenAI GPT-4o, streaming). Pivoted from Claude API to OpenAI (existing key). API paused (needs credits). Full strategic review of project direction. Docs restructured: created PROJECT-HUB.md, slimmed CLAUDE.md, updated MEMORY.md. Identified Identity A vs B as the key open question. |
