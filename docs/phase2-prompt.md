# Phase 2 Prompt — Paste This Into Your Dashboard Claude Code Session

Copy everything below the line into your other Claude Code session.

---

I'm ready to start Phase 2 — connecting real Airtable data to the dashboard, replacing the fake partners.

Before you do anything, read these files carefully:

1. `docs/phase2-handover.md` — The full handover brief. It covers the Airtable field mapping, data quality warnings, what NOT to change, the classification distribution you should expect, and the suggested file structure.

2. `src/data/classification-overrides.ts` — Already created. This is the enrichment layer that provides placeholder classifications, integration types, and partnership types for all 67 real partners. Every Airtable record gets looked up here by exact company name. If a company isn't found, it defaults to Open / API / Ecosystem Partnership.

3. `src/services/partner-service.ts` — The existing swap point. It currently returns fake data. You'll create an `airtablePartnerService` and swap the export.

4. `src/types/partner.ts` — The Partner interface that every component expects. You'll likely need to make more fields optional since real Airtable data is sparse.

Here's what I need you to build:

**1. Vercel serverless API route** at `api/partners.ts` (project root)
- Fetches from Airtable REST API using a personal access token
- Server-side filter: only return records where the Status field is not empty
- Env vars: `AIRTABLE_PAT` and `AIRTABLE_BASE_ID` (I'll provide the actual values)
- Returns JSON array of Airtable records

**2. Airtable-to-Partner mapper**
- Transforms Airtable field names to our Partner interface
- Uses `getOverride()` from classification-overrides.ts for classification, integrationType, and partnershipType
- Uses `mapStatus()` from classification-overrides.ts for status conversion
- Handles null/empty fields gracefully — many fields will be missing on older records
- Special care with `Mutual Pros` field: it mixes numbers and prose text. Extract a number where possible, otherwise leave as undefined.

**3. Swap partner-service.ts** to use the Airtable implementation

**4. Update Partner interface** in types/partner.ts — make fields optional where Airtable data is sparse (customerCount, integrationRequest, whyIntegrate, mutualCustomers, contactName, contactEmail, notes). Update components that reference these fields to handle undefined gracefully.

**Important constraints:**
- Don't change the dashboard theme, layout, filter behavior, or component structure
- Don't touch the chat service (that's Phase 3)
- The Classification field does NOT exist in Airtable — it comes entirely from classification-overrides.ts
- Only 1 partner will show as Active (Ply) — that's correct
- Most partners will be Evaluating (~61) — that's correct
- No partners will be Core Conflict — that's correct
- Handle the `FieldStockPro Inc,` trailing comma (it's the real Airtable value)
- Keep `src/data/partners.ts` as a fallback for now — don't delete it

Start by reading the handover doc and classification overrides file, then walk me through your plan before writing code.
