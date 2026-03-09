// Re-export the Claude chat service as the primary chat interface.
// The old fake service lived here — now replaced by claude-chat-service.ts
// which streams responses via the /api/ask serverless function.

export { askEcosystem } from './claude-chat-service';
