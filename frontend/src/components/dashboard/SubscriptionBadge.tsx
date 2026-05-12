'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  planType: string | null;
};

function labelFor(plan: string | null): string {
  if (!plan || plan === 'sin_plan') return 'SIN PLAN';
  if (plan === 'free') return 'PLAN GRATUITO';
  if (plan === 'basico') return 'PLAN BÁSICO';
  if (plan === 'pro') return 'PLAN PRO';
  if (plan === 'empresarial') return 'PLAN EMPRESARIAL';
  return String(plan).toUpperCase();
}

export function SubscriptionBadge({ planType }: Props) {
  const p = planType ?? 'sin_plan';
  const styles =
    p === 'empresarial'
      ? 'border-amber-400/40 bg-gradient-to-r from-amber-500/20 via-cyan-500/15 to-violet-600/20 text-amber-100 shadow-[0_0_24px_-4px_rgba(251,191,36,0.35)]'
      : p === 'pro' || p === 'basico'
        ? 'border-violet-500/35 bg-violet-500/15 text-violet-100 shadow-[0_0_20px_-4px_rgba(139,92,246,0.45)]'
        : 'border-white/10 bg-white/[0.06] text-gray-300';

  return (
    <motion.span
      layout
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] ${styles}`}
    >
      {labelFor(planType)}
    </motion.span>
  );
}
