'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthContext';
import { mockActivatePlanRequest, type MockPlanTarget } from '@/services/subscriptionApi';

const PLAN_LABEL: Record<string, string> = {
  basico: 'Básico',
  pro: 'Pro',
  empresarial: 'Empresarial',
};

export function MockCheckoutClient() {
  const searchParams = useSearchParams();
  const raw = (searchParams.get('plan') ?? 'pro').toLowerCase();
  const plan = (['basico', 'pro', 'empresarial'].includes(raw) ? raw : 'pro') as MockPlanTarget;
  const { token, setSession } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function complete() {
    if (!token) {
      router.push('/auth?redirect=/checkout/mock');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const { token: newToken, user } = await mockActivatePlanRequest(token, plan);
      setSession({ token: newToken, user });
      router.push('/dashboard');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#030308] px-4 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.2),_transparent_55%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-[1] w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_80px_-24px_rgba(139,92,246,0.45)] backdrop-blur-2xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-300">Checkout simulado</p>
            <h1 className="text-xl font-bold">Astryx · {PLAN_LABEL[plan] ?? plan}</h1>
          </div>
        </div>
        <p className="mb-6 text-sm text-gray-400">
          Flujo mock para demos. En producción desactiva <code className="text-violet-200">MOCK_CHECKOUT_ENABLED</code> y usa
          Stripe real. El botón inferior aplicará el plan en tu base de datos (solo si el mock está habilitado en el API).
        </p>
        <div className="mb-6 space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <CreditCard className="h-4 w-4 text-cyan-300" />
            Tarjeta ·••• 4242
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Lock className="h-4 w-4 text-violet-300" />
            Pago seguro (simulado)
          </div>
        </div>
        {error && (
          <p className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">{error}</p>
        )}
        <motion.button
          type="button"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          onClick={() => void complete()}
          className="mb-3 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_32px_-8px_rgba(139,92,246,0.55)] transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? 'Procesando…' : 'Completar pago (demo)'}
        </motion.button>
        <Link href="/planes" className="block text-center text-sm text-gray-500 underline-offset-2 hover:text-gray-300 hover:underline">
          Volver a planes
        </Link>
      </motion.div>
    </main>
  );
}
