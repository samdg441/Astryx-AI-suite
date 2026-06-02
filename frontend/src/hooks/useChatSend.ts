'use client';

import { useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { sendChatMessage } from '@/lib/chatApi';
import { ApiRequestError } from '@/lib/apiClient';
import { toast } from '@/lib/toast';
import { useDashboardStore } from '@/store/useDashboardStore';

export function useChatSend() {
  const { token } = useAuth();
  const selectedToolId = useDashboardStore((s) => s.selectedToolId);
  const selectedToolName = useDashboardStore((s) => s.selectedToolName);
  const selectedFileId = useDashboardStore((s) => s.selectedFileId);
  const selectedFileName = useDashboardStore((s) => s.selectedFileName);
  const isTyping = useDashboardStore((s) => s.isTyping);
  const appendUserMessage = useDashboardStore((s) => s.appendUserMessage);
  const appendAssistantMessage = useDashboardStore((s) => s.appendAssistantMessage);
  const setInput = useDashboardStore((s) => s.setInput);
  const setTyping = useDashboardStore((s) => s.setTyping);

  const send = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed || isTyping) return;

      if (!token) {
        toast.error('Inicia sesión para usar las IAs');
        return;
      }

      const display = [
        selectedToolName ? `[${selectedToolName}]` : null,
        selectedFileName ? `📎 ${selectedFileName}:` : null,
        trimmed,
      ]
        .filter(Boolean)
        .join(' ');

      appendUserMessage(display);
      setInput('');
      setTyping(true);

      try {
        const data = await sendChatMessage(token, trimmed, selectedToolId, selectedFileId);
        appendAssistantMessage(data.content, {
          imageUrl: data.imageUrl,
          providerLabel: data.providerLabel,
        });
      } catch (err) {
        const message =
          err instanceof ApiRequestError
            ? err.message
            : err instanceof Error
              ? err.message
              : 'Error al conectar con la IA';

        if (err instanceof ApiRequestError && err.status === 403) {
          toast.error('Plan insuficiente', { description: message });
        } else {
          toast.error('No se pudo obtener respuesta', { description: message });
        }

        appendAssistantMessage(
          `No pude completar la solicitud: ${message}. Comprueba que el backend esté en marcha y las API keys configuradas.`
        );
      } finally {
        setTyping(false);
      }
    },
    [
      token,
      isTyping,
      selectedToolId,
      selectedToolName,
      selectedFileId,
      selectedFileName,
      appendUserMessage,
      appendAssistantMessage,
      setInput,
      setTyping,
    ]
  );

  return { send, isTyping };
}
