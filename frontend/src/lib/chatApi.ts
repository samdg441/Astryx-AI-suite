import { apiFetch } from './apiClient';

export type ChatProviderId = 'cloudflare' | 'openrouter' | 'groq';

export type ChatResponse = {
  provider: ChatProviderId;
  providerLabel: string;
  content: string;
  imageUrl?: string;
  toolId: string | null;
};

export function sendChatMessage(
  token: string,
  message: string,
  toolId?: string | null,
  fileId?: string | null
): Promise<ChatResponse> {
  return apiFetch<ChatResponse>('/chat', {
    method: 'POST',
    token,
    auth: true,
    body: {
      message,
      ...(toolId ? { toolId } : {}),
      ...(fileId ? { fileId } : {}),
    },
  });
}
