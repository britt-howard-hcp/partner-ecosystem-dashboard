import { useChatContext } from '../context/ChatContext';

export function useChat() {
  const { messages, sending, sendMessage, messageCount, maxMessages, atLimit } = useChatContext();
  return { messages, sending, sendMessage, messageCount, maxMessages, atLimit };
}
