# Dashboard Design Review — February 2026

**Status:** v3 — Final (pending Britt approval)
**Purpose:** Reassess the dashboard layout and functionality now that real data is connected and the product vision is clearer.

---

## What This Document Is

This is a design review based on an interview with Britt about how the dashboard is actually used, who sees it, and what questions it needs to answer. It identifies what's working, what isn't, and proposes a revised layout. Once approved, this becomes the source of truth that Claude Code works from.

---

## Interview Findings

These are the key things that came out of the conversation:

**Primary audience:** Britt daily, with occasional pull-ups for Roland and leadership. Not a team tool (yet).

**Primary purpose:** Market intelligence, not pipeline management. The dashboard should answer "what is the market telling us?" not "where is each partner in our process?"

**The "wow" for leadership:** Category trends and volume. Roland frequently asks things like "give me a list of all CSR AI companies" or "how many marketing agencies have reached out?" The dashboard should make those answers instant.

**The pipeline problem:** The kanban board collapses 9 Airtable stages into 4 dashboard statuses. The result is one giant Evaluating column (~61 partners), a handful of Declined, almost nothing in Onboarding, and a few in Active. This will only get worse — Britt plans to add 5+ companies per month indefinitely. A kanban that's 90% one column isn't telling anyone anything.

**The Airtable distinction that matters:** "Unexplored" (form submitted, no call) vs. "Initial Call" (had a call, have notes) are strategically different. The current dashboard treats them the same. Additionally, Britt has since backfilled legacy partners (Yelp, Angi, Google, etc.) into Airtable as Live, so the data is now much richer than the Phase 2 handover described.

**Detail panel is essential.** Clicking into a company and seeing the full profile is one of the two features Britt wants to keep no matter what.

**Ask the Ecosystem chat is nice-to-have.** Britt Bot already fills this role. The chat panel takes up sidebar space and doesn't work yet. Deprioritize.

**Classification framework is important but secondary.** Core Conflict / Controlled / Open should be visible and filterable, but it's not the headline. It supports the market signal story.

**Category data already exists in Airtable.** Britt has a structured "Category" field that he fills in after meeting with companies. This is real data, not something we need to derive from overrides. The enrichment layer for category is only needed for records where the field is empty (older/legacy records or pre-meeting entries).

**AI enrichment for missing data is a future goal.** Britt's vision: expand the "Ask the Ecosystem" feature (Claude API integration, Phase 3) to include an AI enrichment layer that fills in best-guess values for sparse records — category, description, customer count, etc. — based on what's known about the company from web presence or Britt Bot context. This isn't Phase 1 work, but the UI should be designed to accommodate it (e.g., a visual indicator distinguishing "confirmed" data from "AI-estimated" data).

---

## What's Working (Keep)

1. **Dark theme and visual style** — looks sharp, don't touch it.
2. **Filter reactivity** — all filters update everything simultaneously. This is well-built.
3. **Detail panel** — the slide-out with Company Overview, Integration Details, Business Case, Relationship sections is solid. Just needs to handle real data gracefully (empty fields, messy text).
4. **KPI stats bar** — right concept, may need different metrics (see below).
5. **Global search with autocomplete** — essential as the dataset grows.
6. **Product Partnership visual distinction** — gold/amber badge and border works well.

## What's Not Working

1. **Pipeline kanban as the primary view.** It's the wrong metaphor for a dataset that's 90% one status and growing by 5/month. It doesn't help answer any of the questions Britt or Roland actually ask.

2. **Two classification charts showing the same data.** The pie chart and bar chart both visualize Core Conflict / Controlled / Open counts. One should be replaced — the project brief already flagged this.

3. **Collapsed pipeline stages.** Mapping 9 Airtable stages to 4 dashboard statuses loses important information (Unexplored vs. Initial Call vs. Discovery are all "Evaluating").

4. **Chat panel taking sidebar space.** It doesn't work, won't until Phase 3, and Britt Bot handles this use case already.

5. **Volume chart may not be meaningful.** The "Request Volume" area chart shows partners by month of request date. With sparse/inconsistent date data from Airtable, this chart may be showing noise rather than signal.

6. **Terminology drift.** Some chart tooltips and empty states still say "Partners" instead of "Companies" or "Ecosystem Requests."

---

## Proposed Revised Layout

The core change: shift from a **pipeline-first** layout to a **market intelligence-first** layout. The primary view should answer "what is the market sending us?" and make it trivially easy to filter, slice, and drill into the data.

### Section 1: Header + KPI Bar (keep, refine metrics)

Keep the header with title, subtitle, and date. Revise the KPI cards to tell the market intelligence story:

| Card | What It Shows | Why |
|---|---|---|
| **Ecosystem Requests** | Total count from Airtable | Volume of market interest |
| **Live Integrations** | Count where status = Live | The "approved" number — selectivity story |
| **In Pipeline** | Count where status is anything between Unexplored and Signed Agreements | What's actively in play |
| **Categories Represented** | Distinct count of category/vertical tags | Breadth of market interest |
| **Controlled Requests** | Count of Controlled classification | The sensitive area leadership cares about |

Making KPI cards clickable (pre-filter the dashboard on click) is still a good idea from the original brief.

### Section 2: Filter Bar (keep, enhance)

Current filters: date range, classification, integration type, search.

Add: **Status filter using real Airtable stages** (not the collapsed 4). This lets Britt quickly pull up "show me everything in Initial Call" or "show me all Unexplored." Add a **category filter** pulling from the Airtable Category field (this is real structured data Britt fills in, not derived).

### Section 3: Market Pulse Charts (keep 3-panel grid, change content)

**Panel 1 — Category Heatmap or Treemap.** Replace the request volume area chart with something that shows *what kinds of companies* are in the ecosystem. Group by what they do (CSR AI, Voice/Telephony, Marketing, Lead Gen, Trade Tools, Financing, etc.) and size by count. This directly answers Roland's "how many CSR AI companies have reached out?" question at a glance.

The data for this already exists: Britt fills in a structured "Category" field in Airtable after meeting with companies. The Airtable-to-Partner mapper needs to pull this field through. For records where category is empty (older records, pre-meeting entries), the classification-overrides file can provide a fallback — and in Phase 3, AI enrichment could fill these gaps automatically.

**Panel 2 — Classification Breakdown (keep the donut/pie).** This stays. Shows the Core Conflict / Controlled / Open distribution. Clickable to open detail panel with the list of partners in that classification.

**Panel 3 — Status Distribution.** Replace the redundant bar chart with a view that shows how partners are distributed across the *real* Airtable pipeline stages. This gives Britt and Roland an instant read on how much of the pipeline is untouched (Unexplored) vs. in active conversation (Initial Call, Discovery) vs. further along (Pilot, Signed Agreements) vs. Live vs. exited (Not Moving Forward, Deactivated). A horizontal stacked bar or a vertical bar chart grouped by stage would work well here.

### Section 4: Analyst Narrative (keep, refine)

The auto-generated narrative paragraph is a good concept. It should be updated to reflect the new metrics and tell the market intelligence story rather than the pipeline throughput story. Reference category trends, selectivity rate, and classification distribution.

### Section 5: Partner Table (NEW — replaces kanban as primary partner view)

A **sortable, filterable table** that lists all partners. This is the workhorse view that replaces the kanban. Columns:

| Column | Source |
|---|---|
| Company Name | Airtable `App` field |
| Status | Real Airtable stage (not collapsed) |
| Classification | From overrides |
| Category | Airtable Category field (with override fallback for empty records) |
| Integration Type | From overrides |
| Partnership Type | From overrides |
| Customer Count | Airtable, if available |
| Mutual Customers | Airtable, parsed |
| Request Date | Airtable `Added` or created date |

Features:
- Click any row to open the detail panel (same slide-out as today)
- Sort by any column
- Filter by any column (in addition to the global filter bar)
- Search works across all fields
- Product Partnerships get the gold/amber row highlight
- Pagination or virtual scrolling as the dataset grows past 100+

This answers the "give me all CSR AI companies" question: filter the Category column. "How many marketing agencies?" Sort by category. "Who's been sitting in Unexplored the longest?" Sort by request date within the Unexplored status.

### Section 6: Pipeline Kanban (DEMOTED — optional secondary view)

Don't delete the kanban — move it to a toggle. Let Britt switch between "Table View" and "Board View." The board view would ideally use the real Airtable stages (or at least a smarter grouping than the current 4). But it's no longer the default or the primary way to interact with the data.

### Sidebar: Chat Panel (REMOVED for now)

Remove the sidebar and chat panel from the layout. The dashboard goes full-width. If/when Claude API integration happens in Phase 3, the chat can come back — but it doesn't need to occupy permanent real estate while it's non-functional.

---

## Data Layer: Category + AI Enrichment

### Category (ready now)

Britt already maintains a structured "Category" field in Airtable. This field is filled in after initial meetings and contains values like CSR AI, Voice/Telephony, Marketing, Lead Gen, etc. The dashboard needs to:

1. **Pull the Category field from the Airtable API response** — add it to the mapper in `airtable-partner-service.ts`
2. **Add `category` to the `Partner` interface** in `types/partner.ts`
3. **Add a fallback in `classification-overrides.ts`** — for records where the Airtable Category field is empty, the overrides file can provide a best-guess category (derived from the existing inline comments that already describe what each company does)
4. **Surface it everywhere** — table column, filter dropdown, chart, detail panel

### AI Enrichment (Phase 3 — design for it now, build later)

Britt's vision: when the Claude API is integrated, the system should be able to look at a partner record with sparse data and fill in intelligent estimates for missing fields — category, description, customer count, what the integration would look like, competitive context. This is the "Ask the Ecosystem" feature evolving from a chat box into an active intelligence layer.

**What this means for Phase 1 design:**

The UI should distinguish between confirmed data and estimated data from the start. The approach: a small badge with an AI sparkle icon displayed inline next to any enriched/fallback value. Not hidden behind a hover — visible at a glance so anyone looking at the dashboard can tell what's confirmed vs. estimated. A tooltip on hover provides detail (e.g., "AI-estimated based on company profile"). This keeps the door open for Phase 3 without requiring any redesign.

In the data model, this means the `Partner` interface could carry a `dataConfidence` or `enrichedFields` property — a set of field names that were filled by fallback/AI rather than Airtable. Components can check this to decide how to render.

### What stays the same

The classification-overrides pattern continues to work as the enrichment layer for classification, integration type, and partnership type — fields that don't yet exist in Airtable. When any of these move to Airtable as official fields, the override for that field gets retired and the API response becomes the source of truth. The overrides file is designed to shrink over time, not grow.

---

## What This Means for the Codebase

These changes don't require a rewrite. The architecture is solid — context provider, filter state, services layer, component composition. The main work is:

1. **New component:** `PartnerTable.tsx` — the sortable/filterable table
2. **New component:** `CategoryChart.tsx` — treemap or grouped bar for category distribution
3. **New component:** `StatusDistribution.tsx` — real Airtable stages visualization
4. **Modified:** `classification-overrides.ts` — add `category` fallback field to each entry (for records where Airtable Category is empty)
5. **Modified:** `partner.ts` type — add `category`, `airtableStatus` (raw stage), and `enrichedFields` (set of field names filled by fallback/AI) fields
6. **Modified:** `airtable-partner-service.ts` — pull Category field from Airtable, pass through the raw Airtable status, track which fields came from overrides vs. Airtable
7. **Modified:** `App.tsx` / `DashboardShell.tsx` — remove sidebar, go full-width, add view toggle
8. **Modified:** `FilterBar.tsx` — add status and category filters
9. **Modified:** `StatsRow.tsx` / `Header.tsx` — updated KPI metrics
10. **Modified:** `NarrativeBlock.tsx` — updated narrative logic
11. **Kept as-is:** `DetailPanel.tsx`, `Badge.tsx`, `SearchBar.tsx`, `DashboardContext.tsx` (mostly), all services except partner mapping

The kanban components (`PipelineBoard`, `PipelineColumn`, `PartnerCard`) stay but become the secondary "Board View" behind a toggle.

---

## Phasing Suggestion

**Phase 1A (layout restructure + data layer):**
- Remove sidebar/chat, go full-width
- Pull Category field from Airtable API into the Partner data model
- Add `airtableStatus` (raw stage) and `enrichedFields` tracking to Partner interface
- Add category fallback to classification-overrides for records missing the Airtable Category field
- Build partner table as the primary view with sortable columns
- Replace redundant classification bar chart with Airtable status distribution chart
- Update KPI cards to new metrics

**Phase 1B (category intelligence + filters):**
- Add category chart (treemap or grouped bar) replacing the volume area chart
- Add category and real-status filters to filter bar
- Update narrative block to reference categories and market signal story
- Make KPI cards clickable (pre-filter the dashboard)

**Phase 1C (view toggle + polish):**
- Add Table/Board view toggle
- Update kanban to use real Airtable stages (or smarter grouping like Inbox / In Conversation / Advanced / Live / Exited)
- Final terminology pass across all components
- Sort controls on table columns
- Pagination or virtual scroll for table as dataset grows

**Phase 3 hook (design now, build later):**
- Add AI sparkle badge component for enriched/fallback field values (visible inline, tooltip on hover with detail)
- Apply badge to any field where data came from classification-overrides rather than Airtable
- Reserve UI space or entry point for AI enrichment actions (e.g., "Enrich this record" button in detail panel)
- These are CSS/component prep only — no Claude API calls until Phase 3

---

## Resolved Questions

1. **Categories — confirmed from Airtable.** Show all in table and filters. See "Airtable Category Taxonomy" appendix below.

2. **"Not Moving Forward" visibility.** Keep them visible in the main table by default. Not a priority concern right now.

3. **Raw Airtable stage names.** Clean up for display (normalize casing, e.g., "Not Moving Forward" always capitalized), store the raw value internally for mapping. Nice-to-know, not critical.

4. **Volume chart (partners over time).** Keep it somewhere — it's a nice-to-know for trend visibility. The caveat is that dates before the intake form was implemented aren't reliable, so the chart may show noise for older records. Consider adding a note or limiting the date range to post-form-implementation. Could be a fourth chart below the main three or an expandable section.

5. **AI enrichment visual indicator.** Use a small badge with an AI sparkle icon next to enriched values, not just a hover-only dot. Should be noticeable enough that Britt (and anyone looking over his shoulder) can tell at a glance what's confirmed vs. estimated. Tooltip on hover provides detail ("AI-estimated based on company profile").

---

## Appendix: Airtable Category Taxonomy

These are the exact values currently in the Airtable Category field. The dashboard should use these as-is for filtering, charting, and display.

Aggregator, Booking, Call/VOIP, CRM, Finance, Marketing, Productivity, Reviews, Automation, Websites, Checklists/Forms, Time Tracking, Calendar, Postcards, Email, Payroll, Funding, Financing, Payments, Gift Cards, Accounting, Fintech, Service, GPS, Intake, Services, Agency, Pricebook, Visual/AR, Chat, Communication, Lead Gen, Inventory Management, Job Inbox, Insurance, Insurance Exchange, Answering Service, Licensing/verification, Background Checks, Franchise, Route Optimization, Reporting, AI, CSR AI, Fleet Management, Trade Tools, Lead Catcher, Distributor, Purchasing, Last Mile Delivery, Performance Pay, Business Ops & Growth, Smart Thermostat

### Data quality notes for implementers

The category list has organic inconsistencies that the dashboard should handle:

- **Typo:** "insurane" exists as a value — should be normalized to "Insurance" on ingest
- **Near-duplicates:** "Insurance" / "Insurance Exchange" are intentionally distinct (keep both). "Service" / "Services" should be normalized to one value (confirm with Britt which to keep). "Intake" and "Job Inbox" and "Lead Gen" and "Lead Catcher" are conceptually adjacent but intentionally separate categories in Airtable — keep all as-is.
- **Potential future consolidation:** As the dataset grows, some low-frequency categories may benefit from grouping (e.g., "Postcards" and "Email" could roll up into "Marketing" or "Communication"). This is a Britt decision, not a dashboard decision — the dashboard should display whatever Airtable has.
- **Empty values:** Some records won't have a category (pre-meeting entries, legacy records). Display as "Uncategorized" in the table and charts. In Phase 3, AI enrichment can suggest a category for these.

---

## How This Document Gets Used

Once Britt approves (with edits), this becomes the basis for:
1. A `CLAUDE.md` in the GitHub repo that Claude Code reads on every session
2. Updated `docs/PRD.md` with the revised layout spec
3. Execution prompts for Claude Code to implement each phase

The project brief in the Britt Bot folder (`agentic-ecosystem-project-brief_1.md`) gets updated to reflect the new direction but stays as the big-picture context document. The repo's `CLAUDE.md` stays focused on execution instructions.
