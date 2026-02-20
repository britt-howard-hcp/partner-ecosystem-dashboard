interface ChatRule {
  keywords: string[];
  response: string;
}

const rules: ChatRule[] = [
  {
    keywords: ['how many', 'total', 'count', 'number of partners'],
    response:
      'There are currently 28 partners in the ecosystem. 10 are in Evaluating, 4 in Onboarding, 4 Active, and 10 Declined.',
  },
  {
    keywords: ['category', 'categories', 'breakdown'],
    response:
      'Category breakdown: AI & Automation Tools (6), Customer Communication Tools (5), Marketing Platforms (6), Scheduling & Dispatch Tools (6), Other Trade-Specific Platforms (5). Marketing and Scheduling are tied for the largest groups.',
  },
  {
    keywords: ['active', 'live', 'launched'],
    response:
      'There are 4 active partners with live integrations: ServiceWire CRM (API), BookLocal Ads (Data Sync), AutoInvoice Pro (OAuth), and FieldChat (White Label). The earliest went live in June 2024.',
  },
  {
    keywords: ['evaluating', 'evaluate', 'pipeline'],
    response:
      'The evaluation pipeline has 10 partners. Recent additions include SmartQuote Builder (White Label), HomeRank SEO (API), and PipeBot Analytics (Embedded). Most evaluating partners joined in late 2025.',
  },
  {
    keywords: ['onboarding', 'onboard'],
    response:
      '4 partners are currently onboarding: TechRoute Scheduler (OAuth), ReviewSurge (Embedded), BotAssist AI (API), and ProNotify (Webhook). All are expected to go live in early 2026.',
  },
  {
    keywords: ['declined', 'reject', 'rejected'],
    response:
      '10 partners have been declined, including QuoteMaster360, InspectBot, and MapRoute Fleet. Common reasons include incompatible tech stacks, budget constraints, and prolonged evaluations.',
  },
  {
    keywords: ['ai', 'automation', 'artificial intelligence'],
    response:
      'There are 6 AI & Automation partners: FieldPulse AI and PipeBot Analytics (Evaluating), BotAssist AI (Onboarding), AutoInvoice Pro (Active), and InspectBot and PriceSync Tools (Declined). AI tools are the fastest-growing category.',
  },
  {
    keywords: ['communication', 'messaging', 'sms', 'chat'],
    response:
      '5 Customer Communication Tools in the ecosystem: CrewLine Messenger and CallTrack Pro (Evaluating), ProNotify (Onboarding), FieldChat (Active), and ChatBridge SMS (Declined).',
  },
  {
    keywords: ['marketing', 'ads', 'seo', 'reviews'],
    response:
      '6 Marketing Platforms: TradeBoost Marketing and HomeRank SEO (Evaluating), ReviewSurge (Onboarding), BookLocal Ads (Active), and AdLocal Express and LeadSpark CRM (Declined).',
  },
  {
    keywords: ['scheduling', 'dispatch', 'route', 'fleet'],
    response:
      '6 Scheduling & Dispatch Tools: DispatchGrid Pro and FleetPing GPS (Evaluating), TechRoute Scheduler (Onboarding), and VoiceFlow Dispatch, AutoSchedule HQ, and MapRoute Fleet (Declined). None are currently active — a gap worth watching.',
  },
  {
    keywords: ['trend', 'growth', 'volume', 'over time', 'quarter'],
    response:
      'Partner request volume shows a clear upward trend from mid-2024 through late 2025. Q4 2025 had the highest intake with 8 new partners entering the pipeline. AI & Automation and Scheduling tools are the fastest-growing categories.',
  },
  {
    keywords: ['integration', 'type', 'api', 'webhook', 'oauth'],
    response:
      'Integration types across the ecosystem: API (8), Webhook (5), OAuth (4), Embedded (4), Data Sync (4), and White Label (3). API remains the most common integration pattern.',
  },
  {
    keywords: ['recent', 'newest', 'latest'],
    response:
      'The most recent partners added are SmartQuote Builder (Dec 22, 2025), HomeRank SEO (Dec 15, 2025), and PipeBot Analytics (Dec 10, 2025) — all currently in the Evaluating stage.',
  },
  {
    keywords: ['customer', 'customers', 'base', 'size', 'largest'],
    response:
      'By customer base, the largest partners are BookLocal Ads (22,500), ServiceWire CRM (18,000), ProNotify (15,300), and FieldChat (13,600) — all either Active or Onboarding. Active partners serve a combined 63,000+ customers.',
  },
  {
    keywords: ['help', 'what can', 'commands'],
    response:
      'I can answer questions about the partner ecosystem! Try asking about:\n- Partner counts and totals\n- Category breakdowns (AI, Communication, Marketing, Scheduling, Other)\n- Pipeline stages (evaluating, onboarding, active, declined)\n- Integration types\n- Trends and growth\n- Customer base sizes\n- Recent partners',
  },
];

const fallback =
  "I'm not sure about that. Try asking about partner counts, categories, pipeline stages, integration types, customer bases, or recent activity in the ecosystem.";

export function matchChatResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.response;
    }
  }
  return fallback;
}
