import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useChatContext } from '../../context/ChatContext';
import type { ChatMessage as ChatMsg } from '../../types/chat';

interface AskPanelProps {
  onClose: () => void;
}

const EXAMPLE_QUERIES = [
  'How many CSR AI companies have reached out?',
  'Which Controlled requests are in active pipeline stages?',
  'Give me a breakdown of categories with the most ecosystem requests',
  'What companies have 1000+ mutual customers?',
];

function MessageBubble({ message }: { message: ChatMsg }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-accent-500 text-white'
            : 'bg-surface-700 text-text-primary'
        }`}
      >
        {message.content}
        {message.streaming && !message.content && (
          <span className="inline-flex gap-1 items-center text-text-muted">
            <span className="animate-pulse">Thinking</span>
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
          </span>
        )}
        {message.streaming && message.content && (
          <span className="inline-block w-1.5 h-4 bg-accent-400 ml-0.5 animate-pulse align-text-bottom" />
        )}
      </div>
    </div>
  );
}

export function AskPanel({ onClose }: AskPanelProps) {
  const { messages, sending, sendMessage, messageCount, maxMessages, atLimit } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages or streaming content
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || sending || atLimit) return;
    sendMessage(trimmed);
    setInputValue('');
  }

  function handleExampleClick(query: string) {
    if (sending || atLimit) return;
    sendMessage(query);
  }

  const showExamples = messages.length <= 1; // Only welcome message

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[420px] bg-surface-900 border-l border-border z-50 animate-slide-in flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-base leading-none">✨</span>
            <h2 className="text-base font-semibold text-text-primary">Ask the Ecosystem</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Example queries — shown only before first user message */}
          {showExamples && (
            <div className="mt-4">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Try asking</p>
              <div className="space-y-2">
                {EXAMPLE_QUERIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleExampleClick(q)}
                    disabled={sending}
                    className="w-full text-left text-sm text-text-secondary bg-surface-800 hover:bg-surface-700 rounded-lg px-4 py-2.5 border border-border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-border">
          {atLimit && (
            <div className="px-4 pt-3 text-xs text-amber-400">
              Session limit reached ({maxMessages} questions). Close and reopen to start fresh.
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={atLimit ? 'Session limit reached' : 'Ask about the ecosystem...'}
              disabled={sending || atLimit}
              className="flex-1 bg-surface-800 border border-border rounded-lg px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={sending || atLimit || !inputValue.trim()}
              className="bg-accent-500 hover:bg-accent-400 disabled:opacity-40 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
          <div className="px-4 pb-2 text-xs text-text-muted">
            {messageCount} / {maxMessages} questions this session
          </div>
        </div>
      </div>
    </>
  );
}
