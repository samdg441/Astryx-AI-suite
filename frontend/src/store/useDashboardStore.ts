import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  providerLabel?: string;
};

type AssistantMeta = {
  imageUrl?: string;
  providerLabel?: string;
};

type PremiumPayload = { toolName: string; requiredPlan: string };

type DashboardState = {
  messages: ChatMessage[];
  input: string;
  isTyping: boolean;
  selectedToolId: string | null;
  selectedToolName: string | null;
  selectedFileId: string | null;
  selectedFileName: string | null;
  premiumModal: PremiumPayload | null;
  setInput: (v: string) => void;
  selectTool: (id: string | null, name: string | null) => void;
  selectFile: (id: string, name: string) => void;
  clearSelectedFile: () => void;
  appendUserMessage: (content: string) => void;
  appendAssistantMessage: (content: string, meta?: AssistantMeta) => void;
  setTyping: (v: boolean) => void;
  clearMessages: () => void;
  openPremiumModal: (payload: PremiumPayload) => void;
  closePremiumModal: () => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  messages: [],
  input: '',
  isTyping: false,
  selectedToolId: null,
  selectedToolName: null,
  selectedFileId: null,
  selectedFileName: null,
  premiumModal: null,
  setInput: (input) => set({ input }),
  selectTool: (selectedToolId, selectedToolName) => set({ selectedToolId, selectedToolName }),
  selectFile: (selectedFileId, selectedFileName) => set({ selectedFileId, selectedFileName }),
  clearSelectedFile: () => set({ selectedFileId: null, selectedFileName: null }),
  appendUserMessage: (content) =>
    set((s) => ({
      messages: [...s.messages, { id: crypto.randomUUID(), role: 'user', content }],
    })),
  appendAssistantMessage: (content, meta) =>
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content,
          imageUrl: meta?.imageUrl,
          providerLabel: meta?.providerLabel,
        },
      ],
    })),
  setTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ messages: [] }),
  openPremiumModal: (premiumModal) => set({ premiumModal }),
  closePremiumModal: () => set({ premiumModal: null }),
}));
