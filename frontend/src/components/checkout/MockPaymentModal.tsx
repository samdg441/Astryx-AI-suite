'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, Loader2, Lock, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMockCheckout } from '@/hooks/useMockCheckout';
import { PLAN_DETAILS, planLabel } from '@/lib/planCatalog';
import {
  formatCardNumber,
  formatExpiry,
  validateMockPayment,
  type MockPaymentInput,
} from '@/lib/mockCheckout';
import { buttonLinkClass } from '@/lib/buttonClasses';
import { cn } from '@/lib/cn';
import type { MockPlanTarget } from '@/services/subscriptionApi';

const DEMO_CARD: MockPaymentInput = {
  cardNumber: '4242 4242 4242 4242',
  expiry: '12/28',
  cvc: '123',
  holderName: 'Titular Astryx',
};

type Props = {
  open: boolean;
  plan: MockPlanTarget;
  onClose: () => void;
  onSuccess?: () => void;
  redirectTo?: string;
};

export function MockPaymentModal({ open, plan, onClose, onSuccess, redirectTo }: Props) {
  const { token } = useAuth();
  const router = useRouter();
  const { processPayment, processing } = useMockCheckout();
  const [form, setForm] = useState<MockPaymentInput>(DEMO_CARD);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const paidPlan = plan === 'basico' || plan === 'pro' || plan === 'empresarial';
  const details = paidPlan ? PLAN_DETAILS[plan] : null;

  useEffect(() => {
    if (!open) return;
    setFieldError(null);
    setForm(DEMO_CARD);
  }, [open, plan]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !processing) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, processing, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (plan === 'free') return;

    const validation = validateMockPayment(form);
    if (validation) {
      setFieldError(validation);
      return;
    }
    setFieldError(null);

    const result = await processPayment(plan, form, {
      onSuccess: () => {
        onSuccess?.();
        onClose();
      },
      redirectTo,
    });

    if (!result.ok && result.error) {
      setFieldError(result.error);
    }
  }

  function handleClose() {
    if (processing) return;
    onClose();
  }

  if (!paidPlan || !details) return null;

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
            className="payment-modal-overlay fixed inset-0 z-[250]"
            onClick={handleClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="payment-modal-card fixed left-1/2 top-1/2 z-[251] w-[min(94vw,440px)] -translate-x-1/2 -translate-y-1/2"
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={processing}
              className="payment-modal-close absolute right-4 top-4 rounded-full p-1.5 transition disabled:opacity-40"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-5 flex items-start gap-3 pr-8">
              <div className="payment-modal-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <Sparkles className="h-6 w-6" aria-hidden />
              </div>
              <div>
                <p className="payment-modal-eyebrow text-xs font-semibold uppercase tracking-wider">
                  Pago seguro · Simulado
                </p>
                <h2 id="payment-modal-title" className="text-heading text-xl font-bold">
                  Plan {details.label}
                </h2>
                <p className="text-muted mt-0.5 text-sm">{details.tagline}</p>
              </div>
            </div>

            <div className="payment-modal-summary mb-5 flex items-baseline justify-between rounded-xl border px-4 py-3">
              <span className="text-body text-sm">Total a pagar</span>
              <span className="text-heading text-2xl font-bold tracking-tight">
                {details.price}
                <span className="text-muted text-base font-medium">{details.period}</span>
              </span>
            </div>

            {!token ? (
              <div className="space-y-4">
                <p className="text-body text-sm">Inicia sesión para completar la suscripción.</p>
                <button
                  type="button"
                  className={buttonLinkClass('primary', 'w-full py-3')}
                  onClick={() => {
                    onClose();
                    router.push(`/auth?redirect=${encodeURIComponent('/planes')}`);
                  }}
                >
                  Iniciar sesión
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
                <div className="payment-modal-form-block space-y-3 rounded-xl border p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="payment-modal-accent h-4 w-4" />
                    <span className="text-body font-medium">Tarjeta de crédito o débito</span>
                    <Lock className="text-muted ml-auto h-3.5 w-3.5" />
                  </div>

                  <label className="block">
                    <span className="payment-modal-label text-xs font-medium">Número de tarjeta</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="cc-number"
                      disabled={processing}
                      value={form.cardNumber}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))
                      }
                      className="form-input mt-1 font-mono text-base tracking-wide"
                      placeholder="0000 0000 0000 0000"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="payment-modal-label text-xs font-medium">Caducidad</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        disabled={processing}
                        value={form.expiry}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, expiry: formatExpiry(e.target.value) }))
                        }
                        className="form-input mt-1"
                        placeholder="MM/AA"
                      />
                    </label>
                    <label className="block">
                      <span className="payment-modal-label text-xs font-medium">CVC</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        disabled={processing}
                        value={form.cvc}
                        maxLength={4}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            cvc: e.target.value.replace(/\D/g, '').slice(0, 4),
                          }))
                        }
                        className="form-input mt-1"
                        placeholder="123"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="payment-modal-label text-xs font-medium">Titular</span>
                    <input
                      type="text"
                      autoComplete="cc-name"
                      disabled={processing}
                      value={form.holderName}
                      onChange={(e) => setForm((f) => ({ ...f, holderName: e.target.value }))}
                      className="form-input mt-1"
                      placeholder="Nombre en la tarjeta"
                    />
                  </label>
                </div>

                {fieldError && (
                  <p className="payment-modal-error rounded-xl border px-3 py-2 text-sm">{fieldError}</p>
                )}

                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <ShieldCheck className="payment-modal-accent h-4 w-4 shrink-0" />
                  <span>
                    Simulación educativa: no se realiza ningún cargo real. El plan{' '}
                    <strong className="text-heading">{planLabel(plan)}</strong> se activará en tu cuenta.
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className={cn(
                    buttonLinkClass('primary', 'flex w-full items-center justify-center gap-2 py-3.5'),
                    processing && 'pointer-events-none opacity-80'
                  )}
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Procesando pago…
                    </>
                  ) : (
                    <>Confirmar pago · {details.price}{details.period}</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
