'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

type Props = {
  open: boolean;
  toolName: string;
  requiredPlan: string;
  onClose: () => void;
};

function planNombreEs(plan: string): string {
  const p = plan.toLowerCase();
  if (p === 'free') return 'Gratuito';
  if (p === 'basico') return 'Básico';
  if (p === 'pro') return 'Pro';
  if (p === 'empresarial') return 'Empresarial';
  return plan;
}

export function PremiumModal({ open, toolName, requiredPlan, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Cerrar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="fixed left-1/2 top-1/2 z-[201] w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-violet-500/25 bg-gradient-to-b from-[#12121c] to-[#08080f] p-6 shadow-[0_0_80px_-20px_rgba(139,92,246,0.55)]"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-gray-500 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-[0_0_28px_rgba(139,92,246,0.5)]">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Desbloquea {toolName}</h2>
            <p className="mt-2 text-sm text-gray-400">
              Esta herramienta requiere como mínimo el plan{' '}
              <span className="font-semibold text-violet-200">{planNombreEs(requiredPlan)}</span>.
              Pasa a Pro o Empresarial para acceso completo, prioridad en cola y modelos premium.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-violet-400">✦</span> Modelos avanzados y contexto extendido
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400">✦</span> Herramientas de negocio y automatización
              </li>
              <li className="flex gap-2">
                <span className="text-violet-400">✦</span> Soporte prioritario
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/planes"
                onClick={onClose}
                className="flex-1 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 py-3 text-center text-sm font-semibold text-white shadow-[0_0_32px_-8px_rgba(139,92,246,0.6)] transition hover:brightness-110"
              >
                Mejorar plan
              </Link>
              <Link
                href={`/checkout/mock?plan=${
                  requiredPlan === 'empresarial'
                    ? 'empresarial'
                    : requiredPlan === 'basico'
                      ? 'basico'
                      : 'pro'
                }`}
                onClick={onClose}
                className="flex-1 rounded-xl border border-white/15 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/[0.06]"
              >
                Simular pago (demo)
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
