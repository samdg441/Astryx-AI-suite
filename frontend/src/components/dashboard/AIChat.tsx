'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2, Download } from 'lucide-react';
import { useChatSend } from '@/hooks/useChatSend';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/cn';

function buildImageFileName(content: string): string {
  const match = content.match(/«(.+?)»/);
  const base = (match?.[1] ?? 'imagen')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 50);
  return `astryx-${base || 'imagen'}.jpeg`;
}

function ChatBubbleContent({ message }: { message: { content: string; imageUrl?: string; providerLabel?: string; role: string } }) {
  return (
    <>
      {message.role === 'assistant' && message.providerLabel && (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider opacity-60">
          {message.providerLabel}
        </p>
      )}
      <p className="whitespace-pre-wrap break-words">{message.content}</p>
      {message.imageUrl && (
        <div className="group relative mt-3 overflow-hidden rounded-xl border border-[var(--dash-border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={message.imageUrl}
            alt="Imagen generada por IA"
            className="max-h-[min(420px,50vh)] w-full object-contain bg-[var(--dash-surface-elevated)]"
            loading="lazy"
          />
          <a
            href={message.imageUrl}
            download={buildImageFileName(message.content)}
            title="Descargar imagen"
            aria-label="Descargar imagen"
            className="absolute right-2 top-2 inline-flex items-center gap-1.5 rounded-lg bg-black/55 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition hover:bg-black/75 focus:opacity-100 group-hover:opacity-100"
          >
            <Download className="h-3.5 w-3.5" />
            Descargar
          </a>
        </div>
      )}
    </>
  );
}

export function AIChat() {
  const messages = useDashboardStore((s) => s.messages);
  const input = useDashboardStore((s) => s.input);
  const setInput = useDashboardStore((s) => s.setInput);
  const selectedToolName = useDashboardStore((s) => s.selectedToolName);
  const selectedFileName = useDashboardStore((s) => s.selectedFileName);
  const { send, isTyping } = useChatSend();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const placeholder = selectedToolName
    ? `Pregunta a ${selectedToolName}…`
    : 'Describe lo que quieres lograr con Astryx…';

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    void send(input);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4 md:px-6">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={cn(
                'max-w-[min(100%,720px)] rounded-2xl px-4 py-3 text-sm leading-relaxed md:text-[15px]',
                m.role === 'user' ? 'dashboard-bubble-user' : 'dashboard-bubble-ai'
              )}
            >
              <ChatBubbleContent message={m} />
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="dashboard-bubble-typing flex items-center gap-2 rounded-2xl px-4 py-3 text-sm">
              <Loader2 className="h-4 w-4 animate-spin opacity-60" />
              Astryx está pensando…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="dashboard-chat-footer border-t p-3 md:p-4">
        {selectedFileName && (
          <p className="text-muted mx-auto mb-2 max-w-4xl text-xs">
            Archivo adjunto:{' '}
            <span className="text-heading font-medium">{selectedFileName}</span>
          </p>
        )}
        {selectedToolName && (
          <p className="text-muted mx-auto mb-2 max-w-4xl text-xs">
            Herramienta activa: <span className="text-heading font-medium">{selectedToolName}</span>
          </p>
        )}
        <form className="mx-auto flex max-w-4xl gap-2" onSubmit={handleSubmit}>
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            disabled={isTyping}
            className="dashboard-chat-input max-h-40 min-h-[52px] w-full flex-1 resize-none rounded-2xl px-4 py-3.5 text-sm transition disabled:opacity-60 md:text-[15px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!input.trim() || isTyping}
            className="dashboard-send-btn flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl transition disabled:opacity-40"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
