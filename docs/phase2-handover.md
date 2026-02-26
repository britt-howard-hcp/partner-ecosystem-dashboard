# Phase 2 Handover — Connect Real Airtable Data

## Context

This document was produced in a separate Claude Code session that has full access to the Britt Bot knowledge base (314 files of partner ecosystem tribal knowledge, Airtable exports, strategy docs, and communication context). The analysis below comes from cross-referencing the real Airtable partner directory export against the current dashboard codebase.

The dashboard currently renders 35 fake partners from `src/data/partners.ts`. Phase 2 replaces that fake data with real partner records from Airtable.

---

## What Was Already Done

A new file was created at `src/data/classification-overrides.ts` that contains:

1. **Type definitions** for `Classification`, `IntegrationType`, `PartnershipType`, and `PartnerOverride`
2. **`classificationOverrides`** — A lookup table mapping all 67 real Airtable partners (those with a pipeline status) to placeholder classifications, integration types, and partnership types. Each entry includes an inline comment explaining the classification reasoning.
3. **`statusMapping`** — Maps Airtable pipeline stages to dashboard display statuses:
   - `Live` → `Active`
   - `Initial Call` / `Discovery` / `Unexplored` → `Evaluating`
   - `Pilot` / `Signed Agreements` → `Onboarding`
   - `Not Moving Forward` / `Not Moving forward` / `Deactivated Partner` / `Hidden Partner` → `Declined`
4. **`getOverride(companyName)`** — Returns the override for a company, or a safe default (`Open` / `API` / `Ecosystem Partnership`)
5. **`mapStatus(airtableStatus)`** — Returns the dashboard status, defaulting to `Evaluating`

### Important: Classification Status

The **two-tier model** (Product Partnerships vs Ecosystem Partnerships) is officially approved. The **three-category classification** (Core Conflict / Controlled / Open) is **still pending leadership approval**. The overrides file contains placeholder classifications so the dashboard renders meaningful badges and charts. When classifications are officially approved and added as an Airtable field, delete `classification-overrides.ts` and read classifications directly from the API response.

---

## The Task

Replace the fake partner data with real Airtable records. The architecture is already set up for this — the swap point is clearly marked in `src/services/partner-service.ts`.

### Architecture (already in place)

```
src/services/partner-service.ts  →  exports partnerService.getAll()
                                     Currently returns fake data from partners.ts
                                     Comment says: "SWAP POINT: change to airtablePartnerService"

src/context/DashboardContext.tsx  →  Calls partnerService.getAll() on mount
                                     Feeds allPartners into state
                                     All filters, charts, kanban, detail panel read from state

src/types/partner.ts             →  Partner interface (the shape everything expects)
```

### What Needs to Happen

1. **Create a Vercel serverless function** (API route) that fetches from Airtable
   - Protects the Airtable API key (never expose to frontend)
   - Endpoint: something like `/api/partners`
   - Uses a read-only Airtable personal access token scoped to the partner directory base
   - Filters server-side: only return records that have a non-empty `Status` field (this cuts 372 records down to ~67)

2. **Create an Airtable-to-Partner mapper** that transforms Airtable records into the `Partner` interface
   - Use `classification-overrides.ts` to enrich each record with classification, integration type, and partnership type
   - Use `statusMapping` to convert Airtable stages to dashboard statuses
   - Handle missing/null fields gracefully (see data quality section below)

3. **Create `airtablePartnerService`** implementing the existing `PartnerService` interface
   - Fetches from the Vercel API route
   - Maps response to `Partner[]`
   - Swap the export in `partner-service.ts`

4. **Update the `Partner` interface** in `src/types/partner.ts` if needed
   - Current interface expects `customerCount: number` — Airtable has this as `# Pros` or `Customers` and it's inconsistently filled
   - Current interface expects `mutualCustomers?: number` — Airtable's `Mutual Pros` field mixes numbers and prose text
   - May need to make more fields optional or add string fallbacks

5. **Set up environment variables**
   - `AIRTABLE_API_KEY` or `AIRTABLE_PAT` — the read-only token
   - `AIRTABLE_BASE_ID` — the base containing the partner directory
   - Add to Vercel environment settings and `.env.local` for dev

---

## Airtable Field → Partner Interface Mapping

The Airtable partner directory has ~40 columns. Here's how the relevant ones map to the existing `Partner` interface:

| Partner Interface Field | Airtable Column | Notes |
|---|---|---|
| `id` | Record ID | Airtable provides this automatically |
| `name` | `Company name` | Required. This is the key for `classificationOverrides` lookup — **must match exactly** |
| `website` | `Website` | ~50% filled. Default to `''` if empty |
| `description` | `Description` | ~60% filled. Default to `''` if empty |
| `classification` | **Not in Airtable** | Get from `getOverride(companyName).classification` |
| `partnershipType` | **Not in Airtable** | Get from `getOverride(companyName).partnershipType` |
| `status` | `Status` | Use `mapStatus()` to convert. Only records with status are included |
| `integrationType` | **Not in Airtable** | Get from `getOverride(companyName).integrationType` |
| `requestDate` | `Date` or `Created` | Inconsistently filled. Default to record creation date or `''` |
| `customerCount` | `Customers` or `# Pros` | Inconsistently filled. Parse as number, default to `0` |
| `integrationRequest` | `Proposed Integration` | ~40% filled. Default to `''` |
| `whyIntegrate` | `What does the company do?` or derive from `Description` | May need to combine fields |
| `mutualCustomers` | `Mutual Pros` | **WARNING**: Mixes numbers ("200") and prose ("~25,000 active contractors"). Parse carefully, extract number where possible, default to `undefined` |
| `contactName` | `Name (from Contacts)` | Linked record field |
| `contactEmail` | `Email (from Contacts)` | Linked record field |
| `notes` | `Notes URL` | Google Doc link, not inline text |

---

## Data Quality Warnings

The Airtable data comes from 3 different ecosystem owners over 6 years. Expect inconsistency.

1. **`Mutual Pros` field is messy** — Some entries are numbers (`200`, `3,497`), some are text (`"~25,000 active contractors on their platform"`, `"They have about 80 mutual customers"`). You need either a number parser that extracts digits, or treat this as a display string.

2. **`Pricing` field mixes formats** — `"Starts at $49/mo"`, `"$1,200/job"`, `"Free tier + enterprise"`, prose descriptions. Do not try to parse into a number. Display as-is or omit.

3. **`Status` field has case variations** — Both `"Not Moving forward"` and `"Not Moving Forward"` exist. The `statusMapping` in `classification-overrides.ts` handles both.

4. **Many fields are empty on older records** — Records from the first two ecosystem owners (pre-2024) often have only Company name, Status, and maybe Description. The dashboard must handle `null`/`undefined`/`''` for every optional field without breaking.

5. **`FieldStockPro Inc,` has a trailing comma** — This is the actual Airtable value. The overrides file matches it exactly. Don't "fix" it unless you also update the override key.

6. **Only 1 record has `Status: Live`** — That's Ply. The other ~20 actually-live integrations (Yelp, Angi, Google, Thumbtack, Bluon, etc.) don't have records in the partner directory because they predate the current tracking system. This is expected — the dashboard will show 1 Active partner. That's accurate to the Airtable data.

---

## What NOT to Change

- Dashboard dark theme and visual style
- Filter reactivity (all filters update charts, KPIs, pipeline, narrative simultaneously)
- Component structure and layout
- KPI bar metrics and framing
- Detail panel structure (Company Overview, Integration Details, Business Case, Relationship)
- Chat interface positioning and concept (it stays stubbed until Phase 3 / Claude API)

---

## Classification Distribution (what the dashboard will show)

From the 67 status'd records with placeholder classifications:

| Classification | Count | Examples |
|---|---|---|
| **Controlled** | ~35 | CSR AI companies, voice agents, lead gen, answering services, booking tools |
| **Open** | ~31 | Marketing, reviews, trade tools, pricebooks, payroll, financing, inventory |
| **Core Conflict** | 0 | None of the status'd records are direct SOR competitors |

| Partnership Type | Count |
|---|---|
| **Product Partnership** | 1 (Ply only) |
| **Ecosystem Partnership** | 66 |

| Dashboard Status | Count | Airtable Stages |
|---|---|---|
| **Evaluating** | ~61 | Initial Call (53) + Discovery (4) + Unexplored (8) |
| **Active** | 1 | Live (Ply) |
| **Declined** | 1 | Not Moving Forward (Stratify AI) |
| **Onboarding** | 0 | No Pilot or Signed Agreements records currently |

---

## Suggested File Structure for Phase 2

```
src/
├── data/
│   ├── partners.ts                    ← Keep as fallback / delete after migration
│   ├── classification-overrides.ts    ← NEW (already created)
│   └── fake-chat-responses.ts         ← Unchanged
├── services/
│   ├── partner-service.ts             ← Swap export to airtable implementation
│   ├── airtable-partner-service.ts    ← NEW: fetch + map Airtable data
│   ├── chart-service.ts               ← Unchanged
│   ├── chat-service.ts                ← Unchanged (Phase 3)
│   └── index.ts                       ← May need to update export
├── types/
│   └── partner.ts                     ← May need to relax required fields
api/                                   ← Vercel serverless functions (project root)
└── partners.ts                        ← NEW: Airtable proxy endpoint
.env.local                             ← NEW: AIRTABLE_PAT, AIRTABLE_BASE_ID
```

---

## Terminal Checklist

- [ ] Get Airtable personal access token (read-only, scoped to partner base)
- [ ] Get Airtable base ID
- [ ] Create `.env.local` with credentials
- [ ] Add env vars to Vercel project settings
- [ ] Create Vercel API route (`/api/partners`)
- [ ] Create Airtable mapper using `classification-overrides.ts`
- [ ] Relax `Partner` interface for optional fields
- [ ] Implement `airtablePartnerService`
- [ ] Swap the export in `partner-service.ts`
- [ ] Test with `npm run dev` — verify all views render with real data
- [ ] Handle empty states (some pipeline columns will be empty)
- [ ] Verify the build passes (`npm run build`) before deploying
- [ ] Add `.env.local` to `.gitignore` if not already there
