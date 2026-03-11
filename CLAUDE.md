# CLAUDE.md — Partner Ecosystem Dashboard

> Read `PROJECT-HUB.md` first every session for status, decisions, and direction. This file is the technical reference — architecture, data model, build rules.

## Session Pre-Flight

1. Read `PROJECT-HUB.md` — check current status, open questions, last session
2. Check the knowledge base (`../../knowledge-base/`) before making assumptions about partners, strategy, terminology, or classifications
3. Don't read every source file — start from this architecture map and read specific files as needed

## Tech Stack

React 19, TypeScript, Vite 7, Tailwind CSS 4, Recharts 3. Deployed on Vercel with serverless functions. Data from Airtable.

**Live URL:** https://partner-ecosystem-dashboard.vercel.app/
**Auto-deploys** from main branch on GitHub.

---

## Architecture

### Component Tree

```
PasswordGate
  └─ DashboardProvider (useReducer — allPartners, filteredPartners, filters, detailPanel)
       ├─ DashboardShell
       │    ├─ Header (title + 5 KPI StatCards)
       │    ├─ FilterBar (search, date, classification, integration, status, category)
       │    ├─ MarketPulse (3-panel chart grid)
       │    ├─ NarrativeBlock (auto-generated analyst paragraph)
       │    └─ PartnerTable (sortable, paginated, default: request date desc)
       ├─ DetailPanel (slide-out, 4 sections)
       └─ AskTheEcosystem (wraps ChatProvider around FAB + AskPanel)
            └─ ChatProvider (partners prop from DashboardContext)
                 ├─ AskFab (✨ button, bottom-right)
                 └─ AskPanel (streaming chat, example queries, rate limit)
```

### Data Flow

```
Airtable → api/partners.ts (serverless, paginated, cached 60s)
  → airtable-partner-service.ts (field mapping, normalization, override merge)
    → DashboardContext (allPartners, filter logic → filteredPartners)
      → hooks (usePartners, useFilters, useChartData, useDetailPanel)
        → components (Header, FilterBar, MarketPulse, PartnerTable, DetailPanel)
```

### Chat Flow (Ask the Ecosystem)

```
User input → ChatContext.sendMessage()
  → serializePartners() (pipe-delimited, ~25K tokens, first message only)
    → claude-chat-service.ts (SSE reader, fetch to /api/ask)
      → api/ask.ts (serverless, OpenAI GPT-4o streaming)
        → SSE chunks normalized to { text: "..." }
          → ChatContext accumulates into streaming message
            → AskPanel renders with blinking cursor
```

### Key Files

| File | Role |
|---|---|
| `api/partners.ts` | Vercel serverless — Airtable proxy with pagination and caching |
| `api/ask.ts` | Vercel serverless — OpenAI GPT-4o streaming, system prompt with HCP terminology |
| `src/context/DashboardContext.tsx` | Main state — partners, filters, detail panel (useReducer) |
| `src/context/ChatContext.tsx` | Chat state — messages, streaming, partner serialization, rate limit |
| `src/services/airtable-partner-service.ts` | Airtable → Partner mapping, normalization, override merge |
| `src/services/claude-chat-service.ts` | Client-side SSE stream reader for `/api/ask` |
| `src/data/classification-overrides.ts` | Enrichment layer (67+ partners) — classification, integration type, partnership type, category fallback |

---

## Data Model

### Partner Interface (`src/types/partner.ts`)

```typescript
export interface Partner {
  id: string;
  name: string;
  website?: string;
  description?: string;
  classification: Classification;       // 'Core Conflict' | 'Controlled' | 'Open'
  partnershipType: PartnershipType;     // 'Product Partnership' | 'Ecosystem Partnership'
  status: Status;                       // 'Evaluating' | 'Onboarding' | 'Active' | 'Declined'
  integrationType: IntegrationType;     // 'API' | 'Webhook' | 'OAuth' | 'Embedded' | 'Data Sync' | 'White Label'
  requestDate?: string;
  customerCount?: number;
  integrationRequest?: string;
  whyIntegrate?: string;
  mutualCustomers?: number;
  contactName?: string;
  contactEmail?: string;
  notes?: string;
  category: string[];       // MULTI-SELECT — always an array, never a string
  airtableStatus: string;   // Raw Airtable stage name (9 stages)
  enrichedFields: string[]; // Field names that came from overrides, not Airtable
}
```

### Category Rules (CRITICAL)

- `category` is always `string[]`, even for single values
- Charts count each tag independently (["AI", "CSR AI"] = 1 for AI + 1 for CSR AI)
- Filtering checks array inclusion, not equality
- Never join to comma-separated strings for display
- Empty arrays display as `["Uncategorized"]`
- Two meta-categories: "Business Ops & Growth" and "Trade Tools" — applied alongside specific tags

### Data Quality (on ingest)

- `"insurane"` → `"Insurance"`
- `"Not Moving forward"` → `"Not Moving Forward"`
- `"Service"` / `"Services"` kept as-is (Britt will consolidate later)

### Classification Overrides (`src/data/classification-overrides.ts`)

Enrichment for 67+ partners. Provides classification, integration type, partnership type, and category fallback. Keyed by exact company name (matches Airtable "App" field). Designed to shrink as Airtable fields get populated. `enrichedFields` on Partner tracks which fields came from overrides.

---

## Ecosystem Framework

### Two Partnership Tiers
- **Product Partnership** (1-2/year) — HCP co-builds. Gold/amber visual treatment everywhere.
- **Ecosystem Partnership** (self-serve) — partner builds via OAuth 2.0 API.

### Three Classifications
| Classification | Definition | Color |
|---|---|---|
| **Core Conflict** | System of record for scheduling, invoicing, or payments | Red |
| **Controlled** | Touches lead intake, customer communication, or job creation | Amber |
| **Open** | Enhances workflows without controlling core data/revenue | Green |

Two-tier model: approved. Three-classification model: pending leadership approval, treated as operational.

### Pipeline Stages (Airtable values)
Unexplored → Initial Call → Discovery → Pilot → Signed Agreements → Live → Not Moving Forward → Deactivated Partner → Hidden Partner

"In Pipeline" = Unexplored through Signed Agreements.

---

## Terminology

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

## Dashboard Layout

**Section 1: Header + KPI Bar** — Title, subtitle, date. Five clickable StatCards: Ecosystem Requests, Live Integrations, In Pipeline, Controlled Requests, Browse Categories. Click pre-filters the dashboard.

**Section 2: Filter Bar** — One row: search, date range, classification, integration type, status (real Airtable stages), category (multi-select).

**Section 3: Market Pulse** — 3-panel grid. Left: Category Distribution (horizontal bars, multi-select aware). Top-right: Pipeline Stages. Bottom-right: Classifications (pie). All clickable → detail panel.

**Section 4: Analyst Narrative** — Auto-generated paragraph: top category, selectivity rate, classification counts, pipeline activity.

**Section 5: Ecosystem Directory** — Sortable/paginated table (25/50/100). Default sort: request date desc. 9 columns. Product Partnerships gold-highlighted. Click row → detail panel.

**Section 6: Detail Panel** — Slide-out, 4 sections: Company Overview, Integration Details, Business Case, Relationship. EnrichedBadge (✨) on override-sourced fields.

**Section 7: Ask the Ecosystem** — ✨ FAB → slide-out chat. Streaming AI responses (GPT-4o). Clickable example queries. 20-question session limit. Currently paused (needs API credits).

---

## Site Protection

**Password Gate:** `PasswordGate.tsx` wraps app. Checks `VITE_SITE_PASSWORD` env var. Auth in `sessionStorage`. Lightweight gate, not real auth.

**SEO Blocking:** `robots.txt` (Disallow all) + `<meta noindex nofollow>`.

---

## Environment Variables

| Variable | Where | Purpose |
|---|---|---|
| `AIRTABLE_PAT` | Vercel + `.env.local` | Airtable personal access token |
| `AIRTABLE_BASE_ID` | Vercel + `.env.local` | Airtable base ID |
| `AIRTABLE_TABLE_NAME` | Vercel + `.env.local` | Table name (default: "Partner Directory") |
| `VITE_SITE_PASSWORD` | Vercel + `.env.local` | Password gate (exposed to client by design) |
| `OPENAI_API_KEY` | Vercel + `.env.local` | OpenAI API key for Ask the Ecosystem (server-side only) |

---

## What NOT to Change

- Dark theme and visual style
- Filter reactivity (all simultaneous)
- Detail panel structure (4 sections)
- Product Partnership gold/amber distinction
- Airtable serverless proxy architecture
- Classification-overrides enrichment pattern
- Multi-select category handling (arrays everywhere)
- KPI card order: Ecosystem Requests → Live → Pipeline → Controlled → Categories
- Password gate and SEO blocking
- Default table sort: request date, newest first
- Ask the Ecosystem streaming architecture (provider-agnostic SSE)

## Execution Rules

- All data in Airtable or `classification-overrides.ts` — never hardcode in components
- All API keys in environment variables — never hardcoded
- Dashboard is read-only — no Airtable writes from the frontend
- Use the terminology table above — no exceptions
- `docs/dashboard-design-review.md` is historical context, not authoritative spec
