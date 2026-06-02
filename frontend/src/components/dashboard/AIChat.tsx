'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/cn';

export function AIChat() {
  const messages = useDashboardStore((s) => s.messages);
  const input = useDashboardStore((s) => s.input);
  const setInput = useDashboardStore((s) => s.setInput);
  const isTyping = useDashboardStore((s) => s.isTyping);
  const sendUserFlow = useDashboardStore((s) => s.sendUserFlow);
  const selectedToolName = useDashboardStore((s) => s.selectedToolName);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const placeholder = selectedToolName
    ? `Pregunta a ${selectedToolName}…`
    : 'Describe lo que quieres lograr con Astryx…';

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
              {m.content}
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
        <form
          className="mx-auto flex max-w-4xl gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            sendUserFlow(input);
          }}
        >
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="dashboard-chat-input max-h-40 min-h-[52px] w-full flex-1 resize-none rounded-2xl px-4 py-3.5 text-sm transition md:text-[15px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendUserFlow(input);
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
