'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/components/auth/AuthContext';
import { useDashboardStore } from '@/store/useDashboardStore';

const SUGGESTIONS = [
  {
    label: 'Generar imagen',
    prompt: 'Logo minimalista Astryx AI Suite, plateado y negro, estilo tech premium',
    toolId: 'des-image-gen',
    toolName: 'Generador de imágenes',
  },
  {
    label: 'Generar código',
    prompt: 'Genera TypeScript listo para producción para un cliente REST con manejo de errores.',
    toolId: 'dev-code-assistant',
    toolName: 'Asistente de código',
  },
  {
    label: 'Ideas de marketing',
    prompt: 'Propón 5 ángulos de campaña para el lanzamiento de un SaaS B2B.',
    toolId: 'mkt-ads',
    toolName: 'Creador de anuncios',
  },
  {
    label: 'Redactor SEO',
    prompt: 'Escribe meta title y meta description para una landing de suite de IA.',
    toolId: 'mkt-seo',
    toolName: 'Redactor SEO',
  },
  {
    label: 'Estrategia startup',
    prompt: 'Define un GTM de 12 semanas para una suite de productividad con IA.',
    toolId: 'biz-strategy',
    toolName: 'Estrategia startup',
  },
];

type Props = {
  onPick: (text: string) => void;
};

export function WelcomeHero({ onPick }: Props) {
  const { user } = useAuth();
  const selectTool = useDashboardStore((s) => s.selectTool);
  const first = user?.name?.trim()?.split(/\s+/)?.[0] ?? 'Explorador';

  function handlePick(s: (typeof SUGGESTIONS)[number]) {
    selectTool(s.toolId, s.toolName);
    onPick(s.prompt);
  }

  return (
    <div className="dashboard-hero relative flex flex-col items-center px-4 pb-8 pt-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[1] max-w-3xl text-center"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-[var(--dash-text-faint)]">
          Astryx AI Suite
        </p>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-[var(--dash-text)] sm:text-4xl md:text-5xl">
          Hola de nuevo, {first}
        </h1>
        <p className="mx-auto max-w-xl text-base text-[var(--dash-text-muted)] md:text-lg">
          Elige una herramienta o escribe abajo. Las respuestas vienen del backend con Groq,
          OpenRouter o Cloudflare Workers AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.45 }}
        className="relative z-[1] mt-10 grid w-full max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s.label}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.35 }}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => handlePick(s)}
            className="dashboard-suggestion group rounded-2xl px-4 py-4 text-left transition"
          >
            <span className="block text-sm font-semibold">{s.label}</span>
            <span className="dashboard-suggestion-desc mt-1 block text-xs">{s.toolName}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
