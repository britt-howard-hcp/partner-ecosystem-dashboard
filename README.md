# Partner Ecosystem Dashboard

Market intelligence dashboard for HCP's partner ecosystem. Visualizes Airtable partner data with filtering, classification, and AI-powered natural language queries.

**Live:** https://partner-ecosystem-dashboard.vercel.app/

## Tech Stack

- React 19, TypeScript, Vite 7, Tailwind CSS 4, Recharts 3
- Vercel (hosting + serverless functions)
- Airtable (data source via serverless proxy)
- OpenAI GPT-4o (Ask the Ecosystem AI chat)

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with your keys (see .env.example)
```

## Development

```bash
npm run dev          # Vite dev server (frontend only)
vercel dev           # Full stack (frontend + serverless functions)
npm run build        # Type-check + production build
npm run lint         # ESLint
```

Note: `npm run dev` runs only the Vite frontend. The serverless functions (`api/partners.ts`, `api/ask.ts`) require `vercel dev` or deployment to Vercel.

## Environment Variables

| Variable | Purpose |
|---|---|
| `AIRTABLE_PAT` | Airtable personal access token |
| `AIRTABLE_BASE_ID` | Airtable base ID |
| `AIRTABLE_TABLE_NAME` | Table name (default: "Partner Directory") |
| `VITE_SITE_PASSWORD` | Password gate for dashboard access |
| `OPENAI_API_KEY` | OpenAI API key for Ask the Ecosystem |

Set these in `.env.local` for local dev and in Vercel project settings for production.

## Deployment

Auto-deploys from `main` branch via Vercel. Push to main = live in ~60 seconds.

## Documentation

- `CLAUDE.md` — Full project spec, data model, architecture, and phase history
- `docs/dashboard-design-review.md` — Historical design reasoning (Feb 2026)
