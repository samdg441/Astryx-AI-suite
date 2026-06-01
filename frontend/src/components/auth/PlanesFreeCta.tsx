'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { chooseFreePlanRequest } from '@/lib/authApi';
import { buttonLinkClass } from '@/lib/buttonClasses';

export function PlanesFreeCta() {
  const { token, user, refreshUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token || !user) return null;
  if (user.planType !== null) return null;

  return (
    <div className="plan-free-cta mb-8 w-full max-w-xl rounded-xl border px-5 py-4 text-center sm:px-6">
      <p className="text-body mb-3 text-sm sm:text-base">
        Aún no has elegido plan. Puedes usar el plan <strong>gratuito</strong> para entrar al
        gestor, o suscribirte a un plan de pago abajo.
      </p>
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
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
        className={buttonLinkClass('primary', 'px-5 py-2.5 text-sm disabled:opacity-60')}
      >
        {loading ? 'Guardando…' : 'Usar plan gratuito e ir al gestor'}
      </button>
    </div>
  );
}
