# CLAUDE.md — Partner Ecosystem Dashboard

## Who This Is For

Britt Howard, Senior Manager of Platform Partnerships at Housecall Pro (HCP). He manages the full ecosystem of integrated partners, evaluates new partnership opportunities, and owns the public API program. His manager is Roland Ligtenberg (Co-founder). He works closely with Delano (API support), Anna, and Cat. Use he/him/his pronouns.

## What This Project Is

A React/Vite dashboard deployed on Vercel that visualizes HCP's partner ecosystem as a market intelligence tool. It connects to Airtable as its data source and will eventually integrate the Claude API for AI-powered enrichment and natural language queries.

Live URL: https://partner-ecosystem-dashboard.vercel.app/
Auto-deploys from this GitHub repo's main branch.

## Current State (as of February 2026)

The dashboard was built in four commits:
1. Initial Vite/React scaffold with fake data
2. Major restructure to HCP terminology, dark theme, classification framework, pipeline kanban
3. Phase 2: Airtable connection via Vercel serverless proxy, classification-overrides enrichment layer, real partner data
4. Field mapping fix (Company name → App, Date → Added)

The Airtable connection is live. Real partner data flows through. Legacy partners (Yelp, Angi, Google, Thumbtack, Bluon, etc.) have been backfilled into Airtable as Live.

**What needs to happen now:** A layout redesign based on a design review conducted with Britt. The dashboard needs to shift from a pipeline-first layout to a market intelligence-first layout. See the full design review at `docs/dashboard-design-review.md`.

---

## The Design Problem (Why We're Redesigning)

The dashboard was originally built around a pipeline kanban (Evaluating → Onboarding → Active → Declined). This is the wrong primary metaphor because:

- Britt's role is market intelligence, not high-volume BD pipeline management
- ~90% of records sit in "Evaluating" making the kanban one giant column and three nearly empty ones
- The kanban collapses 9 Airtable stages into 4 dashboard statuses, losing meaningful distinctions (Unexplored vs. Initial Call vs. Discovery are all "Evaluating")
- The dataset grows by 5+ companies/month — a kanban that's 90% one column only gets worse
- The questions Britt and Roland actually ask are category-based ("how many CSR AI companies?", "list all marketing agencies") not stage-based

## The Redesigned Layout

### Section 1: Header + KPI Bar

Keep the header with title, subtitle, and date. Revise KPI cards:

| Card | What It Shows |
|---|---|
| **Ecosystem Requests** | Total count from Airtable |
| **Live Integrations** | Count where status = Live |
| **In Pipeline** | Count where status is between Unexplored and Signed Agreements |
| **Categories Represented** | Distinct count of non-empty Category values |
| **Controlled Requests** | Count of Controlled classification |

KPI cards should be clickable — clicking pre-filters the entire dashboard to that segment.

### Section 2: Filter Bar

Current filters: date range, classification, integration type, search.

Add:
- **Status filter** using real Airtable stages (Unexplored, Initial Call, Discovery, Pilot, Signed Agreements, Live, Not Moving Forward, Deactivated Partner, Hidden Partner) — not the collapsed 4
- **Category filter** pulling distinct values from the Airtable Category field

### Section 3: Market Pulse Charts (3-panel grid)

**Panel 1 — Category Distribution.** Replace the request volume area chart. Show what kinds of companies are in the ecosystem grouped by Airtable Category, sized by count. Treemap, grouped bar, or bubble chart. This directly answers "how many CSR AI companies have reached out?"

**Panel 2 — Classification Breakdown.** Keep the donut/pie chart. Shows Core Conflict / Controlled / Open distribution. Clickable to open detail panel with partner list.

**Panel 3 — Status Distribution.** Replace the redundant classification bar chart. Show partner distribution across real Airtable pipeline stages. Horizontal bar or vertical grouped bar.

### Section 4: Analyst Narrative

Keep the auto-generated paragraph. Update logic to reference: category trends (top category by count), selectivity rate, classification distribution, pipeline activity. Frame as market intelligence, not pipeline throughput.

### Section 5: Partner Table (NEW — primary partner view)

A sortable, filterable table replacing the kanban as the default view. Columns:

| Column | Source |
|---|---|
| Company Name | Airtable `App` field |
| Status | Real Airtable stage (cleaned up for display) |
| Classification | From classification-overrides |
| Category | Airtable Category field (fallback from overrides for empty records, display "Uncategorized" if neither exists) |
| Integration Type | From classification-overrides |
| Partnership Type | From classification-overrides |
| Customer Count | Airtable, if available |
| Mutual Customers | Airtable `Mutual Pros`, parsed |
| Request Date | Airtable `Added` or record created date |

Features:
- Click any row → open detail panel (same slide-out)
- Sort by any column header
- Search works across all visible fields
- Product Partnerships get gold/amber row highlight
- Pagination or virtual scrolling as dataset grows past 100+

### Section 6: Pipeline Kanban (optional secondary view)

Demote to a toggle: "Table View" (default) / "Board View." Keep existing kanban components but wire them to a view toggle. Ideally update the board to use real Airtable stages or a smarter grouping (Inbox / In Conversation / Advanced / Live / Exited).

### Sidebar: Chat Panel

Remove from layout entirely. Dashboard goes full-width. Chat components stay in the codebase but are not rendered. Revisit in Phase 3 when Claude API is integrated.

---

## Data Model Changes

### Partner interface (`src/types/partner.ts`)

Add these fields:
- `category?: string` — from Airtable Category field, with override fallback
- `airtableStatus: string` — raw Airtable stage name (e.g., "Initial Call", "Live", "Not Moving Forward")
- `enrichedFields: Set<string>` (or `string[]`) — names of fields that came from classification-overrides rather than Airtable. Used by components to render the AI enrichment badge.

The existing `status` field (the collapsed 4-value type) can be kept for backward compatibility with chart-service and other code that groups by broad status, but `airtableStatus` is what the table and status filter use.

### Classification overrides (`src/data/classification-overrides.ts`)

Add `category` to the `PartnerOverride` interface as an optional fallback. Only used when the Airtable Category field is empty for a given record. Populate from the existing inline comments.

### Airtable service (`src/services/airtable-partner-service.ts`)

Update `mapRecord` to:
- Pull the `Category` field from Airtable
- Store the raw Airtable status in `airtableStatus`
- Track which fields came from overrides vs. Airtable in `enrichedFields`
- Use override `category` as fallback only when Airtable Category is empty

### Airtable API route (`api/partners.ts`)

No changes needed — it already returns all fields.

---

## AI Enrichment Badge

Any field value that came from classification-overrides rather than directly from Airtable should display an inline badge with an AI sparkle icon. This is visible at a glance (not hover-only). Tooltip on hover says "AI-estimated based on company profile" or similar.

This applies now to fields from the overrides file (classification, integration type, partnership type, category fallback). In Phase 3 when Claude API enrichment is added, the same badge component is reused for AI-generated values.

Create a reusable `<EnrichedBadge />` component.

---

## Airtable Category Taxonomy

These are the exact values in the Airtable Category field. Display as-is:

Aggregator, Booking, Call/VOIP, CRM, Finance, Marketing, Productivity, Reviews, Automation, Websites, Checklists/Forms, Time Tracking, Calendar, Postcards, Email, Payroll, Funding, Financing, Payments, Gift Cards, Accounting, Fintech, Service, GPS, Intake, Services, Agency, Pricebook, Visual/AR, Chat, Communication, Lead Gen, Inventory Management, Job Inbox, Insurance, Insurance Exchange, Answering Service, Licensing/verification, Background Checks, Franchise, Route Optimization, Reporting, AI, CSR AI, Fleet Management, Trade Tools, Lead Catcher, Distributor, Purchasing, Last Mile Delivery, Performance Pay, Business Ops & Growth, Smart Thermostat

**Data quality rules on ingest:**
- Normalize "insurane" → "Insurance" (typo in Airtable)
- Normalize "Not Moving forward" → "Not Moving Forward" (case consistency on status)
- Keep "Service" / "Services" as-is for now (known near-duplicate, Britt will consolidate later)
- Display empty category as "Uncategorized"

---

## Ecosystem Strategy Framework (reference)

### Two Partnership Tiers
- **Product Partnerships** (1-2/year, exception not rule) — HCP builds or co-builds the integration. Gold/amber badge and visual treatment everywhere.
- **Ecosystem Partnerships** (self-serve, scalable) — partner builds to HCP using OAuth 2.0.

### Three Category Classifications
| Classification | Definition | Visual |
|---|---|---|
| **Core Conflict** | System of record for scheduling, invoicing, or payments | Red |
| **Controlled** | Touches lead intake, customer communication, or job creation | Amber |
| **Open** | Enhances workflows but doesn't control core data/revenue | Green |

The two-tier model is officially approved. The three-category classification is pending leadership approval but treated as operational in the dashboard.

### Pipeline Stages (exact Airtable values)
Unexplored → Initial Call → Discovery → Pilot → Signed Agreements → Live → Not Moving Forward → Deactivated Partner → Hidden Partner

---

## Terminology (use exactly)

| Wrong | Right |
|---|---|
| Partners | Companies or Ecosystem Requests |
| Active Partners | Live Integrations |
| Declined | Not Moving Forward |
| Hard No | Core Conflict |
| Strategic Maybe | Controlled |
| Business Case Required | Open |
| Total Partners | Ecosystem Requests |
| Your platform | HCP |
| Partner Assistant | Ask the Ecosystem |

---

## Implementation Phases

### Phase 1A — Layout Restructure + Data Layer
- Remove sidebar/chat, go full-width
- Pull Category field from Airtable API into Partner data model
- Add `airtableStatus` and `enrichedFields` to Partner interface
- Add category fallback to classification-overrides
- Build `PartnerTable.tsx` as primary view with sortable columns
- Replace redundant classification bar chart with status distribution chart
- Update KPI cards to new metrics

### Phase 1B — Category Intelligence + Filters
- Add category chart (treemap or grouped bar) replacing the volume area chart
- Add category and real-status filter dropdowns to filter bar
- Update narrative block to reference categories and market signal story
- Make KPI cards clickable (pre-filter dashboard)

### Phase 1C — View Toggle + Polish
- Add Table/Board view toggle
- Update kanban to use real Airtable stages or smarter grouping
- Final terminology pass across all components
- Sort controls on table columns
- Pagination or virtual scroll for growing dataset

### Phase 3 Hook — Design Now, Build Later
- Create `EnrichedBadge` component (AI sparkle icon + tooltip)
- Apply to any field where data came from classification-overrides
- Reserve entry point for "Enrich this record" in detail panel
- CSS/component prep only — no Claude API calls until Phase 3

---

## What NOT to Change

- Dark theme and visual style
- Filter reactivity (all filters update charts, KPIs, table, narrative simultaneously)
- Detail panel structure (Company Overview, Integration Details, Business Case, Relationship)
- Product Partnership gold/amber visual distinction
- Global search with autocomplete
- Airtable serverless proxy architecture (`api/partners.ts`)
- Classification-overrides enrichment pattern

## Execution Rules

- All data lives in Airtable or `src/data/classification-overrides.ts` — never hardcode data in components
- Use `claude-sonnet-4-6` as the Claude API model (Phase 3)
- Keep all API keys in environment variables, never hardcoded
- Dashboard is read-only — no write operations to Airtable from the frontend
- When in doubt on terminology, refer to the terminology table above
- Read `docs/dashboard-design-review.md` for the full reasoning behind these decisions
