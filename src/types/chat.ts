export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}
