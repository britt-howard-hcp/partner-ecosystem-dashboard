import type { VercelRequest, VercelResponse } from '@vercel/node';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const MAX_MESSAGES = 20;

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AskRequestBody {
  messages: ConversationMessage[];
  partnerContext?: string;
}

const SYSTEM_PROMPT = `You are the Ecosystem Intelligence Analyst for Housecall Pro (HCP), a field service management platform for home service professionals. You have deep expertise in HCP's partner ecosystem and provide sharp, data-driven analysis.

TERMINOLOGY (use exactly — these are non-negotiable):
- "Ecosystem Requests" not "Partners" (when referring to companies that have approached HCP)
- "Live Integrations" not "Active Partners"
- "Not Moving Forward" not "Declined" or "Rejected"
- "Core Conflict" = competitive with HCP's core system of record (scheduling, invoicing, payments)
- "Controlled" = touches lead intake, customer communication, or job creation (voice/telephony, CSR AI, lead routing, answering services, booking tools)
- "Open" = enhances workflows without controlling core data/revenue (marketing, reviews, GPS, field tools, payroll, financing, inventory, trade tools)
- "HCP" not "Housecall Pro" after first mention

CLASSIFICATION FRAMEWORK:
- Two partnership tiers: Product Partnership (1-2/year, HCP co-builds) and Ecosystem Partnership (self-serve via OAuth 2.0 API)
- Three classifications: Core Conflict (red — these are competitors), Controlled (amber — sensitive, needs guardrails), Open (green — welcome)
- Product Partnerships are the exception, not the rule. Gold/premium treatment.

PIPELINE STAGES (in order):
Unexplored → Initial Call → Discovery → Pilot → Signed Agreements → Live → Not Moving Forward → Deactivated Partner → Hidden Partner

"In Pipeline" = Unexplored through Signed Agreements (the active stages before going Live).

HOW TO RESPOND:
- Be specific. Reference actual company names, counts, classifications, and categories from the dataset.
- When asked about counts or lists, give the exact number and name companies.
- When analyzing trends, reference real pipeline stages, dates, and categories.
- Be direct and analytical. This is an intelligence tool for a partnerships leader, not a customer chatbot.
- If the data doesn't support a conclusion, say so. Don't fabricate.
- Keep responses concise but complete. Bullet lists for multi-item answers. Narrative for analysis.
- When relevant, surface implications or next-move suggestions (e.g., "The 4 CSR AI companies in Controlled suggest this category needs a clear framework decision").`;

function buildContextBlock(partnerContext: string): string {
  return `\n\nPARTNER DATASET (current as of ${new Date().toISOString().slice(0, 10)}):\n${partnerContext}\n\nUse this dataset to answer questions. Every company listed above is a real ecosystem request in HCP's Airtable.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenAI API key' });
  }

  const body = req.body as AskRequestBody;

  if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  if (body.messages.length > MAX_MESSAGES * 2) {
    return res.status(429).json({ error: 'Conversation too long. Start a new session.' });
  }

  const systemContent = body.partnerContext
    ? SYSTEM_PROMPT + buildContextBlock(body.partnerContext)
    : SYSTEM_PROMPT;

  const openaiMessages = [
    { role: 'system' as const, content: systemContent },
    ...body.messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: openaiMessages,
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'OpenAI API error', detail: errorText });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body?.getReader();
    if (!reader) {
      return res.status(500).json({ error: 'Streaming not available' });
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const payload = trimmed.slice(6);
        if (payload === '[DONE]') {
          res.write('data: [DONE]\n\n');
          res.end();
          return;
        }

        try {
          const parsed = JSON.parse(payload);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            // Re-emit in our normalized format
            res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
          }
        } catch {
          // Skip malformed lines
        }
      }
    }

    // Stream ended without [DONE]
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'OpenAI API error', detail: message });
    }
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
    res.end();
  }
}
