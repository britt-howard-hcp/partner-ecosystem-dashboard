import type { ConversationMessage } from '../types/chat';

interface StreamCallbacks {
  onChunk: (text: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

export async function askEcosystem(
  messages: ConversationMessage[],
  partnerContext: string | undefined,
  callbacks: StreamCallbacks,
): Promise<void> {
  const body: { messages: ConversationMessage[]; partnerContext?: string } = { messages };
  if (partnerContext) {
    body.partnerContext = partnerContext;
  }

  let response: Response;
  try {
    response = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    callbacks.onError('Network error — could not reach the server.');
    return;
  }

  if (!response.ok) {
    const errorBody = await response.text();
    try {
      const parsed = JSON.parse(errorBody);
      callbacks.onError(parsed.error || `Server error (${response.status})`);
    } catch {
      callbacks.onError(`Server error (${response.status})`);
    }
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    callbacks.onError('Streaming not supported by this browser.');
    return;
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      // Keep the last incomplete line in the buffer
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const payload = trimmed.slice(6);
        if (payload === '[DONE]') {
          callbacks.onDone();
          return;
        }

        try {
          const parsed = JSON.parse(payload);
          if (parsed.error) {
            callbacks.onError(parsed.error);
            return;
          }
          if (parsed.text) {
            callbacks.onChunk(parsed.text);
          }
        } catch {
          // Skip malformed SSE lines
        }
      }
    }

    // Stream ended without [DONE] — still complete
    callbacks.onDone();
  } catch (err) {
    callbacks.onError(err instanceof Error ? err.message : 'Stream interrupted.');
  }
}
