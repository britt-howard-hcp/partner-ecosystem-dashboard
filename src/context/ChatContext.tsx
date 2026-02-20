import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ChatMessage } from '../types/chat';
import { chatService } from '../services';

interface ChatContextValue {
  messages: ChatMessage[];
  sending: boolean;
  sendMessage: (content: string) => Promise<void>;
}

const ChatCtx = createContext<ChatContextValue | null>(null);

let nextId = 1;

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to Ask the Ecosystem! I can answer questions about HCP\'s partner pipeline — classifications (Core Conflict, Controlled, Open), Product Partnerships, mutual customers, integration types, and trends.',
      timestamp: new Date(),
    },
  ]);
  const [sending, setSending] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${nextId++}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      const reply = await chatService.respond(content);
      const assistantMsg: ChatMessage = {
        id: `msg-${nextId++}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setSending(false);
    }
  }, []);

  return <ChatCtx.Provider value={{ messages, sending, sendMessage }}>{children}</ChatCtx.Provider>;
}

export function useChatContext() {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}
