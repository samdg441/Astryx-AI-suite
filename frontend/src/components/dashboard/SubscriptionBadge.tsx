'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getPlanInfo, normalizePlanKey } from '@/lib/planCatalog';
import { cn } from '@/lib/cn';

type Props = {
  planType: string | null;
};

export function SubscriptionBadge({ planType }: Props) {
  const key = normalizePlanKey(planType);
  const info = getPlanInfo(planType);

  return (
    <motion.span
      layout
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'plan-badge inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]',
        (key === 'pro' || key === 'basico' || key === 'empresarial') && 'plan-badge--paid',
        key === 'pro' && 'plan-badge--pro',
        key === 'basico' && 'plan-badge--basico',
        key === 'empresarial' && 'plan-badge--empresarial'
      )}
    >
      {info.label.toUpperCase()}
    </motion.span>
  );
}
