'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useMockCheckoutModal } from '@/components/checkout/MockCheckoutContext';
import { planLabel } from '@/lib/planCatalog';
import type { MockPlanTarget } from '@/services/subscriptionApi';

type Props = {
  open: boolean;
  toolName: string;
  requiredPlan: string;
  onClose: () => void;
};

function resolveCheckoutPlan(requiredPlan: string): MockPlanTarget {
  const p = requiredPlan.toLowerCase();
  if (p === 'empresarial') return 'empresarial';
  if (p === 'basico') return 'basico';
  return 'pro';
}

export function PremiumModal({ open, toolName, requiredPlan, onClose }: Props) {
  const { openCheckout } = useMockCheckoutModal();
  const checkoutPlan = resolveCheckoutPlan(requiredPlan);

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
            className="payment-modal-overlay fixed inset-0 z-[200]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="payment-modal-card premium-unlock-card fixed left-1/2 top-1/2 z-[201] w-[min(92vw,440px)] -translate-x-1/2 -translate-y-1/2 p-6"
          >
            <button
              type="button"
              onClick={onClose}
              className="payment-modal-close absolute right-4 top-4 rounded-full p-1 transition"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="payment-modal-icon mb-4 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Sparkles className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-heading text-xl font-bold">Desbloquea {toolName}</h2>
            <p className="text-muted mt-2 text-sm">
              Esta herramienta requiere como mínimo el plan{' '}
              <span className="text-heading font-semibold">{planLabel(requiredPlan)}</span>. Suscríbete
              para acceder al instante.
            </p>
            <ul className="text-body mt-4 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="payment-modal-accent">✦</span> Modelos avanzados y contexto extendido
              </li>
              <li className="flex gap-2">
                <span className="payment-modal-accent">✦</span> Herramientas de negocio y automatización
              </li>
              <li className="flex gap-2">
                <span className="payment-modal-accent">✦</span> Soporte prioritario
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openCheckout(checkoutPlan, {
                    redirectTo: '/dashboard',
                    onSuccess: onClose,
                  });
                }}
                className="btn-primary flex-1 rounded-xl py-3 text-center text-sm font-semibold"
              >
                Suscribirse ahora
              </button>
              <Link
                href="/planes"
                onClick={onClose}
                className="btn-secondary flex-1 rounded-xl py-3 text-center text-sm font-semibold"
              >
                Ver planes
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
