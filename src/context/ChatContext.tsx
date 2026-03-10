import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import type { ChatMessage, ConversationMessage } from '../types/chat';
import type { Partner } from '../types/partner';
import { askEcosystem } from '../services/chat-service';

const MAX_MESSAGES_PER_SESSION = 20;
const HISTORY_WINDOW = 10; // Only send last N messages to API

interface ChatContextValue {
  messages: ChatMessage[];
  sending: boolean;
  sendMessage: (content: string) => void;
  messageCount: number;
  maxMessages: number;
  atLimit: boolean;
}

const ChatCtx = createContext<ChatContextValue | null>(null);

let nextId = 1;

function serializePartners(partners: Partner[]): string {
  const header = 'NAME | STATUS | CLASSIFICATION | CATEGORIES | INT_TYPE | PARTNERSHIP | CUSTOMERS | MUTUAL | DATE';
  const rows = partners.map((p) => {
    const cats = p.category.join(', ');
    const cust = p.customerCount ?? '—';
    const mutual = p.mutualCustomers ?? '—';
    const date = p.requestDate ?? '—';
    return `${p.name} | ${p.airtableStatus} | ${p.classification} | ${cats} | ${p.integrationType} | ${p.partnershipType} | ${cust} | ${mutual} | ${date}`;
  });
  return [header, ...rows].join('\n');
}

interface ChatProviderProps {
  children: ReactNode;
  partners: Partner[];
}

export function ChatProvider({ children, partners }: ChatProviderProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Welcome to Ask the Ecosystem. I have access to HCP's full partner dataset — ask me about classifications, categories, pipeline stages, specific companies, trends, or anything in the ecosystem.",
      timestamp: new Date(),
    },
  ]);
  const [sending, setSending] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const partnerContextRef = useRef<string | null>(null);
  const isFirstMessageRef = useRef(true);

  const sendMessage = useCallback(
    (content: string) => {
      if (sending || messageCount >= MAX_MESSAGES_PER_SESSION) return;

      const userMsg: ChatMessage = {
        id: `msg-${nextId++}`,
        role: 'user',
        content,
        timestamp: new Date(),
      };

      const assistantMsgId = `msg-${nextId++}`;
      const assistantMsg: ChatMessage = {
        id: assistantMsgId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setSending(true);
      setMessageCount((c) => c + 1);

      // Build conversation history for API (sliding window)
      const allMessages = [...messages.filter((m) => m.id !== 'welcome'), userMsg];
      const recentMessages = allMessages.slice(-HISTORY_WINDOW);
      const conversationHistory: ConversationMessage[] = recentMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Serialize partner context on first message only
      let partnerContext: string | undefined;
      if (isFirstMessageRef.current) {
        partnerContext = serializePartners(partners);
        partnerContextRef.current = partnerContext;
        isFirstMessageRef.current = false;
      }

      askEcosystem(conversationHistory, partnerContext, {
        onChunk: (text) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, content: m.content + text } : m,
            ),
          );
        },
        onDone: () => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, streaming: false } : m,
            ),
          );
          setSending(false);
        },
        onError: (error) => {
          const isQuotaError = error.toLowerCase().includes('quota') || error.toLowerCase().includes('billing') || error.toLowerCase().includes('exceeded');
          const friendlyMessage = isQuotaError
            ? 'Ask the Ecosystem is currently unavailable. The AI service needs to be activated — reach out to Britt if you need this feature.'
            : `Something went wrong. Please try again in a moment.`;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, content: friendlyMessage, streaming: false }
                : m,
            ),
          );
          setSending(false);
        },
      });
    },
    [sending, messageCount, messages, partners],
  );

  const atLimit = messageCount >= MAX_MESSAGES_PER_SESSION;

  return (
    <ChatCtx.Provider value={{ messages, sending, sendMessage, messageCount, maxMessages: MAX_MESSAGES_PER_SESSION, atLimit }}>
      {children}
    </ChatCtx.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}
