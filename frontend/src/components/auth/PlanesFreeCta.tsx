'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { chooseFreePlanRequest } from '@/lib/authApi';

export function PlanesFreeCta() {
  const { token, user, refreshUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token || !user) return null;
  if (user.planType !== null) return null;

  return (
    <div className="mb-8 w-full max-w-xl rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-center sm:px-6">
      <p className="mb-3 text-sm text-amber-100/95 sm:text-base">
        Aún no has elegido plan. Puedes usar el plan <strong>gratuito</strong> para entrar al gestor, o suscribirte a un plan de pago abajo.
      </p>
      {error && <p className="mb-2 text-sm text-red-300">{error}</p>}
      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          setError(null);
          setLoading(true);
          try {
            await chooseFreePlanRequest(token);
            await refreshUser();
            router.push('/dashboard');
            router.refresh();
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Error');
          } finally {
            setLoading(false);
          }
        }}
        className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-gray-200 disabled:opacity-60"
      >
        {loading ? 'Guardando…' : 'Usar plan gratuito e ir al gestor'}
      </button>
    </div>
  );
}
