# CLAUDE.md — Partner Ecosystem Dashboard

## Who This Is For

Britt Howard, Senior Manager of Platform Partnerships at Housecall Pro (HCP). He manages the full ecosystem of integrated partners, evaluates new partnership opportunities, and owns the public API program. His manager is Roland Ligtenberg (Co-founder). He works closely with Delano (API support), Anna, and Cat. Use he/him/his pronouns.

## What This Project Is

A React/Vite dashboard deployed on Vercel that visualizes HCP's partner ecosystem as a market intelligence tool. It connects to Airtable as its data source and will integrate the Claude API for AI-powered enrichment and natural language queries ("Ask the Ecosystem").

This dashboard is Module 5 of a larger agentic ecosystem system. The full system vision includes: Smart Intake & Triage (Slack decision loop), Meeting Prep Package (auto-generated Google Docs), Post-Meeting Enrichment (Granola notes → Airtable), Market Intelligence & Reporting (Google Slides decks, Slack queries), and this Dashboard.

Live URL: https://partner-ecosystem-dashboard.vercel.app/
Auto-deploys from this GitHub repo's main branch.

## Site Protection

### Password Gate
The dashboard is gated behind a simple shared password. Not real auth — just a gate to keep random visitors out. Implementation:
- `src/components/auth/PasswordGate.tsx` wraps the entire app in `App.tsx`
- Password checked against `VITE_SITE_PASSWORD` env var (set in `.env` locally and in Vercel environment variables for production)
- Auth state stored in `sessionStorage` (`hcp-dashboard-auth`) — persists across refreshes within a browser session, clears on close
- Dark-themed, centered form matching the dashboard's visual style
- This is intentionally lightweight — no user management, no OAuth, no login system

### Search Engine Blocking
The dashboard is blocked from search engine crawling and indexing:
- `public/robots.txt` — `Disallow: /` for all user agents
- `index.html` — `<meta name="robots" content="noindex, nofollow" />` meta tag
- Both layers are needed: robots.txt tells crawlers not to visit, the meta tag tells any crawler that does visit not to index or follow links

## Britt Bot Knowledge Base (IMPORTANT — READ THIS)

Britt has a comprehensive AI knowledge base called "Britt Bot" (also spelled "BrittBot", "brittbot", or "britt bot" — he uses voice input so spelling varies). It lives at `../../knowledge-base/` relative to this project folder.

**Before making assumptions about partners, ecosystem strategy, terminology, classification frameworks, API details, or Britt's preferences — check the knowledge base.** It contains 314+ markdown files with full context on every partner, strategy doc, QBR deck, API analysis, meeting notes, Slack threads, and Gmail context Britt works with.

Key files to know:
- `../../knowledge-base/CLAUDE.md` — Full map of the knowledge base and how it's organized
- `../../knowledge-base/BRITT-WRITING-STYLE.md` — Britt's voice and communication style
- `../../knowledge-base/01-partner-ecosystem/` — Everything by partner (220 files)
- `../../knowledge-base/02-api-program/` — API usage data, documentation, developer management

When a knowledge base markdown file references an original source file (spreadsheet, deck, etc.), the originals are at `../../context/`.

If Britt asks you to "check with Britt Bot", "check my knowledge base", "what does brittbot say", or any variation — go to `../../knowledge-base/` and find the answer there.

## Current State (as of late February 2026)

The dashboard has been through a full redesign cycle across 12 commits:

1. Initial Vite/React scaffold with fake data
2. Major restructure to HCP terminology, dark theme, classification framework, pipeline kanban
3. Airtable connection via Vercel serverless proxy, classification-overrides enrichment layer, real partner data
4. Field mapping fix (Company name → App, Date → Added)
5. CLAUDE.md and dashboard design review added
6. **Phase 1A:** Layout redesign — pipeline kanban demoted, market intelligence-first layout, partner table as primary view, KPI bar, Market Pulse charts, narrative block
7. CLAUDE.md updated with Phase 1A results and Phase 1B scope
8. **Phase 1B:** Category intelligence — category chart, clickable KPIs, status/category filter dropdowns, chart click-to-drill, tooltip fixes
9. CLAUDE.md updated with Phase 1B results and 1B-fix scope
10. **Phase 1B-fix:** Multi-select category data model fix, KPI bar reorder/relabel, Market Pulse chart layout, filter consolidation, list-to-profile drill-down
11. **Phase 2:** Visual polish, EnrichedBadge, Ask the Ecosystem UI shell, pagination
12. **Phase 2 fix:** Pipeline labels, pie chart clipping, sparkle icon refinement, tooltip text
13. **Password gate** — `PasswordGate.tsx` wrapping the app, `VITE_SITE_PASSWORD` env var
14. **Search engine blocking** — `robots.txt` disallow all + noindex/nofollow meta tag

**All Phase 1 work is complete.** The dashboard is a functional market intelligence tool with:
- Full-width layout (sidebar/chat removed)
- KPI bar: Ecosystem Requests → Live Integrations → In Pipeline → Controlled Requests → Browse Categories
- Consolidated filter bar: search, date range, classification, integration type, status (real Airtable stages), category (multi-select tags)
- Market Pulse: Category Distribution (left, large), Pipeline Stages (top-right), Classifications (bottom-right)
- Auto-generated analyst narrative
- Sortable/filterable partner table (Ecosystem Directory) as the primary view
- Slide-out detail panel with drill-down from any list view
- Multi-select category handling throughout (data model, charts, filters, table, detail panel)

**Known cosmetic issues (to fix in Phase 2):**
- Chart hover states show full-width white/gray background instead of contained highlight
- Minor spacing/clipping on some chart elements
- Terminology inconsistencies may remain in some tooltips or edge cases

**All Phase 2 work is complete.** The dashboard now includes EnrichedBadge, Ask the Ecosystem UI shell, pagination, password gate, and search engine blocking. **Next up:** Phase 3 — Claude API integration. See Implementation Phases below.

---

## Dashboard Layout (current)

### Section 1: Header + KPI Bar

Header with title, subtitle, and date. Five clickable KPI cards that pre-filter the dashboard:

| Card | What It Shows | Position |
|---|---|---|
| **Ecosystem Requests** | Total count from Airtable | 1st (leftmost) |
| **Live Integrations** | Count where status = Live | 2nd |
| **In Pipeline** | Count where status is Unexplored through Signed Agreements | 3rd |
| **Controlled Requests** | Count of Controlled classification | 4th |
| **Browse Categories** | Distinct count of category tags — opens exploration view, not a filter | 5th (rightmost) |

### Section 2: Filter Bar

One consolidated row below header/KPI bar, above Market Pulse. Contains: Search input, Date range, Classification dropdown, Integration Type dropdown, Status dropdown (real Airtable stages), Category dropdown (multi-select tags).

### Section 3: Market Pulse Charts (3-panel grid)

**Left panel — Category Distribution** (spans full height of both right panels). Horizontal bar chart showing company count per category tag. Multi-select aware — each tag counted independently. "Show all" toggle for 42+ categories.

**Top-right — Pipeline Stages.** Horizontal bars showing distribution across real Airtable stages.

**Bottom-right — Classifications.** Pie/donut chart showing Core Conflict / Controlled / Open distribution.

All charts: hover shows readable tooltip, click opens list in detail panel, cursor pointer on interactive elements.

### Section 4: Analyst Narrative

Auto-generated paragraph referencing: top category by tag count, selectivity rate, classification distribution, pipeline activity. Framed as market intelligence.

### Section 5: Ecosystem Directory (partner table)

Sortable, filterable table. Columns: Company Name, Status (real Airtable stage), Classification, Category (pill badges for multi-select tags), Integration Type, Partnership Type, Customer Count, Mutual Customers, Request Date.

Features: click row → detail panel, sort by column header, Product Partnerships get gold/amber row highlight, search works across all fields.

### Section 6: Detail Panel (slide-out)

Four sections: Company Overview, Integration Details, Business Case, Relationship. Supports navigation: list view → company profile → back. All category tags displayed.

---

## Data Model

### Partner interface (`src/types/partner.ts`)

```typescript
export interface Partner {
  id: string;
  name: string;
  website?: string;
  description?: string;
  classification: Classification;
  partnershipType: PartnershipType;
  status: Status;
  integrationType: IntegrationType;
  requestDate?: string;
  customerCount?: number;
  integrationRequest?: string;
  whyIntegrate?: string;
  mutualCustomers?: number;
  contactName?: string;
  contactEmail?: string;
  notes?: string;
  category: string[];       // MULTI-SELECT — always an array, never a string
  airtableStatus: string;   // Raw Airtable stage name
  enrichedFields: string[]; // Field names that came from overrides, not Airtable
}
```

### Category: MULTI-SELECT TAGS

The Airtable Category field is a multi-select field. Each company can have 1-3 category tags. The API returns these as an array.

Rules:
- `category` on Partner is always `string[]`
- Charts count each tag independently (company with ["AI", "CSR AI"] = 1 for AI + 1 for CSR AI)
- Filtering by "AI" returns all companies with "AI" in their tags array
- Never show combined strings like "AI, CSR AI" as a single chart entry
- Empty category arrays display as ["Uncategorized"]

### Two meta-categories

Britt applies two broad bucket tags across most companies:
- **Business Ops & Growth** — companies that help pros run/grow their business
- **Trade Tools** — companies specific to the trades

Most companies get one of these PLUS their specific category (e.g., ["CSR AI", "Business Ops & Growth"]).

### All known category tag values

Aggregator, Booking, Call/VOIP, CRM, Finance, Marketing, Productivity, Reviews, Automation, Websites, Checklists/Forms, Time Tracking, Calendar, Postcards, Email, Payroll, Funding, Financing, Payments, Gift Cards, Accounting, Fintech, Service, GPS, Intake, Services, Agency, Pricebook, Visual/AR, Chat, Communication, Lead Gen, Inventory Management, Job Inbox, Insurance, Insurance Exchange, Answering Service, Licensing/verification, Background Checks, Franchise, Route Optimization, Reporting, AI, CSR AI, Fleet Management, Trade Tools, Lead Catcher, Distributor, Purchasing, Last Mile Delivery, Performance Pay, Business Ops & Growth, Smart Thermostat

### Data quality rules on ingest
- Normalize "insurane" → "Insurance"
- Normalize "Not Moving forward" → "Not Moving Forward"
- Keep "Service" / "Services" as-is (known near-duplicate, Britt will consolidate later)
- Display empty category array as ["Uncategorized"]

### Classification overrides (`src/data/classification-overrides.ts`)

Enrichment layer for 67+ partners. Provides classification, integration type, partnership type, and category fallback for records where Airtable fields don't exist yet. The overrides file is designed to shrink over time as Airtable fields get populated.

### Airtable service (`src/services/airtable-partner-service.ts`)

Maps Airtable records to Partner interface. Handles: multi-select category arrays, raw Airtable status passthrough, override fallbacks, enrichedFields tracking, messy data normalization.

### Airtable proxy (`api/partners.ts`)

Vercel serverless function. Paginates through Airtable API. Server-side filter: `NOT({Status}='')`. Uses env vars: `AIRTABLE_PAT`, `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`. 60-second cache with stale-while-revalidate. No changes needed — it already returns all fields.

---

## Ecosystem Strategy Framework

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

### Phase 1A — Layout Restructure + Data Layer ✅ COMPLETE
- Remove sidebar/chat, go full-width
- Pull Category field from Airtable API into Partner data model
- Add `airtableStatus` and `enrichedFields` to Partner interface
- Add category fallback to classification-overrides
- Build `PartnerTable.tsx` as primary view with sortable columns
- Replace redundant classification bar chart with status distribution chart
- Update KPI cards to new metrics

### Phase 1B — Category Intelligence + Interactivity ✅ COMPLETE
- Clickable KPIs, category chart, status/category filter dropdowns
- Chart click-to-drill, tooltip fixes
- Category and status filters with real Airtable values

### Phase 1B-fix — Multi-Select + Polish ✅ COMPLETE
- Fixed category data model (multi-select array handling throughout)
- KPI bar reordered and relabeled (Browse Categories)
- Market Pulse chart layout balanced
- Filters consolidated to one row
- List-to-profile drill-down in detail panel

### Phase 2 — Visual Polish + AI Foundation ✅ COMPLETE
- Fixed chart hover states, spacing/clipping, pipeline labels, pie chart clipping
- Built `EnrichedBadge` component (sparkle icon + tooltip for fields from overrides)
- Applied EnrichedBadge to all override-sourced fields in table and detail panel
- Built "Ask the Ecosystem" UI shell — floating action button + slide-out chat panel with placeholder state ("Claude API coming in Phase 3")
- Added pagination to Ecosystem Directory table (25/50/100 rows per page)
- Final terminology pass across all components
- Added password gate (`PasswordGate.tsx`, `VITE_SITE_PASSWORD` env var)
- Added search engine blocking (`robots.txt` + noindex/nofollow meta tag)

### Phase 3 — Claude API Integration (next)
- Wire Claude API (`claude-sonnet-4-6`) to Ask the Ecosystem chat panel
- Give Claude access to partner dataset as context
- AI-powered record enrichment — Claude fills sparse fields (category, description, integration assessment)
- Dynamic narrative block that reasons about the data
- EnrichedBadge reused for AI-generated values (same component, new source)
- "Enrich this record" action in detail panel

### Phase 4 — Agentic Modules (future)
- Module 1: Smart Intake & Triage — form → Claude classifies → Slack notification → emoji reaction → auto-email → Airtable update
- Module 2: Meeting Prep Package — auto-generated Google Doc with partner info and prep brief
- Module 3: Post-Meeting Enrichment — Granola notes → Claude extracts structured data → Airtable
- Module 4A: One-click Google Slides ecosystem deck
- Module 4B: Natural language Slack query layer

### Dropped from scope
- ~~Table/Board view toggle~~ — kanban is the wrong metaphor for this data. If needed later, it's a one-prompt add.
- ~~Kanban with real Airtable stages~~ — same reason. Table view is the primary and only view.

---

## What NOT to Change

- Dark theme and visual style
- Filter reactivity (all filters update charts, KPIs, table, narrative simultaneously)
- Detail panel structure (Company Overview, Integration Details, Business Case, Relationship)
- Product Partnership gold/amber visual distinction
- Global search with autocomplete
- Airtable serverless proxy architecture (`api/partners.ts`)
- Classification-overrides enrichment pattern
- Multi-select category handling (arrays throughout the entire data flow)
- KPI card order: Ecosystem Requests → Live Integrations → In Pipeline → Controlled Requests → Browse Categories
- Password gate (`PasswordGate.tsx` wrapping the app)
- Search engine blocking (`robots.txt` + noindex meta tag)

## Execution Rules

- All data lives in Airtable or `src/data/classification-overrides.ts` — never hardcode data in components
- Use `claude-sonnet-4-6` as the Claude API model (Phase 3)
- Keep all API keys in environment variables, never hardcoded
- Dashboard is read-only — no write operations to Airtable from the frontend
- When in doubt on terminology, refer to the terminology table above
- Read `docs/dashboard-design-review.md` for the full reasoning behind design decisions
