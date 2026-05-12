import { create } from 'zustand';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type PremiumPayload = { toolName: string; requiredPlan: string };

type DashboardState = {
  messages: ChatMessage[];
  input: string;
  isTyping: boolean;
  selectedToolId: string | null;
  selectedToolName: string | null;
  premiumModal: PremiumPayload | null;
  setInput: (v: string) => void;
  selectTool: (id: string | null, name: string | null) => void;
  appendUserMessage: (content: string) => void;
  appendAssistantMessage: (content: string) => void;
  setTyping: (v: boolean) => void;
  clearMessages: () => void;
  openPremiumModal: (payload: PremiumPayload) => void;
  closePremiumModal: () => void;
  /** Envía mensaje de usuario y simula respuesta (demo). */
  sendUserFlow: (content: string) => void;
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
  messages: [],
  input: '',
  isTyping: false,
  selectedToolId: null,
  selectedToolName: null,
  premiumModal: null,
  setInput: (input) => set({ input }),
  selectTool: (selectedToolId, selectedToolName) => set({ selectedToolId, selectedToolName }),
  appendUserMessage: (content) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { id: crypto.randomUUID(), role: 'user', content },
      ],
    })),
  appendAssistantMessage: (content) =>
    set((s) => ({
      messages: [
        ...s.messages,
        { id: crypto.randomUUID(), role: 'assistant', content },
      ],
    })),
  setTyping: (isTyping) => set({ isTyping }),
  clearMessages: () => set({ messages: [] }),
  openPremiumModal: (premiumModal) => set({ premiumModal }),
  closePremiumModal: () => set({ premiumModal: null }),
  sendUserFlow: (content) => {
    const trimmed = content.trim();
    if (!trimmed) return;
    const tool = get().selectedToolName;
    const final = tool ? `[${tool}] ${trimmed}` : trimmed;
    set((s) => ({
      messages: [...s.messages, { id: crypto.randomUUID(), role: 'user', content: final }],
      input: '',
      isTyping: true,
    }));
    const lower = final.toLowerCase();
    const reply =
      lower.includes('code') ||
      lower.includes('typescript') ||
      lower.includes('código')
        ? 'Aquí tienes un esqueleto tipado con `fetch` y manejo de errores. En producción conectaríamos tu backend Astryx y streaming SSE.'
        : lower.includes('market') ||
            lower.includes('campa') ||
            lower.includes('marketing') ||
            lower.includes('campaña')
          ? 'Propongo 3 ángulos: dolor + prueba social, contraste frente al status quo, y un CTA único medible. ¿Quieres tono más técnico o aspiracional?'
          : lower.includes('document') ||
              lower.includes('summar') ||
              lower.includes('documento') ||
              lower.includes('memo') ||
              lower.includes('riesgo')
            ? 'Resumen ejecutivo: (1) contexto, (2) riesgos, (3) próximos pasos. Puedo profundizar en compliance o finanzas si lo indicas.'
            : lower.includes('startup') ||
                lower.includes('gtm') ||
                lower.includes('estrategia') ||
                lower.includes('semanas')
              ? 'GTM en 12 semanas: semanas 1–4 ICP y mensajes, 5–8 pilots, 9–12 expansión y pricing. ¿B2B self-serve o venta enterprise?'
              : 'Astryx recibió tu mensaje. Este hilo es una simulación premium: conecta el modelo real cuando integres el endpoint de inferencia.';

    window.setTimeout(() => {
      set((s) => ({
        messages: [...s.messages, { id: crypto.randomUUID(), role: 'assistant', content: reply }],
        isTyping: false,
      }));
    }, 900 + Math.floor(Math.random() * 700));
  },
}));
