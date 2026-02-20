import { useChatContext } from '../context/ChatContext';

export function useChat() {
  const { messages, sending, sendMessage } = useChatContext();
  return { messages, sending, sendMessage };
}
