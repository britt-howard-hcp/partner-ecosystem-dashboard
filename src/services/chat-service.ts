import { matchChatResponse } from '../data/fake-chat-responses';

export interface ChatService {
  respond(userMessage: string): Promise<string>;
}

// --- Fake implementation (swap this export for Claude API later) ---

const fakeChatService: ChatService = {
  async respond(userMessage: string) {
    // Simulate slight network delay
    await new Promise((r) => setTimeout(r, 400));
    return matchChatResponse(userMessage);
  },
};

// SWAP POINT: change to `claudeChatService` when ready
export const chatService: ChatService = fakeChatService;
