import type { ChatMessage as ChatMsg } from '../../types/chat';

export function ChatMessage({ message }: { message: ChatMsg }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-accent-500 text-white'
            : 'bg-surface-700 text-text-primary'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}
