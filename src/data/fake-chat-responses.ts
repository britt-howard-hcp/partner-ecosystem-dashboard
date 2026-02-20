interface ChatRule {
  keywords: string[];
  response: string;
}

const rules: ChatRule[] = [
  {
    keywords: ['how many', 'total', 'count', 'number of'],
    response:
      'HCP\'s ecosystem has processed 35 partner requests. 12 are Active (live integrations), 8 are in Evaluation, 3 are Onboarding, and 12 have been Declined.',
  },
  {
    keywords: ['classification', 'classifications', 'breakdown', 'core conflict', 'controlled', 'open'],
    response:
      'Classification breakdown: 8 Core Conflict (competitive with HCP core), 12 Controlled (competitive-adjacent, strategic approval needed), and 15 Open (complementary, ROI-dependent). Open classifications make up the largest group.',
  },
  {
    keywords: ['active', 'live', 'launched', 'integration'],
    response:
      'There are 12 live integrations: 5 Product Partnerships (ReviewBridge, PartsNow, ComplianceHub, SafeHire, GreenFlag Insurance) and 7 Ecosystem Partnerships. They collectively serve 37,100 mutual HCP customers.',
  },
  {
    keywords: ['evaluating', 'evaluate', 'pipeline', 'evaluation'],
    response:
      'The evaluation pipeline has 8 partners. Notable: HomeBase Ops is flagged as Core Conflict (under review), while PayField, CustomerVault, and ChatLeads are Controlled classifications requiring strategic approval. Four Open requests round out the pipeline.',
  },
  {
    keywords: ['onboarding', 'onboard'],
    response:
      '3 partners are currently onboarding: SmartEstimate (Controlled, API), FleetWorks (Controlled, Webhook), and MaterialSync (Open, API). SmartEstimate and FleetWorks required strategic approval due to feature overlap.',
  },
  {
    keywords: ['declined', 'reject', 'rejected'],
    response:
      '12 partners have been declined. 7 were Core Conflict (directly competitive FSM, scheduling, or CRM platforms). 3 were Controlled (insufficient business case). 2 were Open but declined for pricing or maturity reasons.',
  },
  {
    keywords: ['product partnership', 'product', 'strategic'],
    response:
      'There are 5 Product Partnerships — all Active: ReviewBridge (reputation), PartsNow (parts ordering), ComplianceHub (licensing), SafeHire (background checks), and GreenFlag Insurance (COI verification). These are co-developed strategic integrations.',
  },
  {
    keywords: ['conflict', 'competitive', 'competitor'],
    response:
      '8 Core Conflict requests identified — companies with products directly competitive with HCP\'s core scheduling, dispatch, invoicing, or CRM features. 7 have been declined; 1 (HomeBase Ops) is under evaluation review.',
  },
  {
    keywords: ['mutual', 'customer', 'customers', 'overlap'],
    response:
      'Active integrations serve 37,100 mutual HCP customers. Top overlap: PartsNow (5,100), ComplianceHub (4,800), LocalBoost Ads (4,200), GreenFlag Insurance (3,800), and FleetPulse GPS (3,400).',
  },
  {
    keywords: ['trend', 'growth', 'volume', 'over time', 'quarter'],
    response:
      'Partner request volume spans 2021–2025. The program saw steady inbound from 2023 onward, with Q4 2025 showing the highest intake. HCP maintains a highly selective acceptance rate — only 12 of 35 requests have resulted in live integrations.',
  },
  {
    keywords: ['type', 'api', 'webhook', 'oauth'],
    response:
      'Integration types: API (11), Webhook (6), OAuth (4), Embedded (5), Data Sync (5), White Label (4). API is the dominant pattern, reflecting HCP\'s API-first integration strategy.',
  },
  {
    keywords: ['recent', 'newest', 'latest'],
    response:
      'Most recent requests: EcoReport (Dec 22, 2025), SkillBadge (Dec 18, 2025), and FundIt Capital (Dec 15, 2025) — all Open classification, currently in Evaluation.',
  },
  {
    keywords: ['help', 'what can', 'commands'],
    response:
      'I can answer questions about HCP\'s partner ecosystem. Try asking about:\n- Partner counts and totals\n- Classification breakdown (Core Conflict / Controlled / Open)\n- Pipeline stages (evaluating, onboarding, active, declined)\n- Product Partnerships vs Ecosystem Partnerships\n- Integration types\n- Mutual customer overlap\n- Trends and volume',
  },
];

const fallback =
  "I'm not sure about that. Try asking about partner counts, classifications (Core Conflict, Controlled, Open), pipeline stages, Product Partnerships, integration types, or mutual customer overlap.";

export function matchChatResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return fallback;
}
