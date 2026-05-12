'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import type { CheckoutPriceTier } from '@/lib/authApi';
import { createCheckoutSessionRequest } from '@/lib/authApi';

type Props = {
  className: string;
  priceTier: CheckoutPriceTier;
};

export function SubscribePlanButton({ className, priceTier }: Props) {
  const { token, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const label = loading ? 'Redirigiendo…' : 'Suscribirse';

  return (
    <>
      <button
        type="button"
        disabled={loading}
        className={className}
        onClick={async () => {
          setError(null);
          if (!token || !user) {
            router.push(`/auth?redirect=${encodeURIComponent('/planes')}`);
            return;
          }
          setLoading(true);
          try {
            const url = await createCheckoutSessionRequest(token, priceTier);
            window.location.href = url;
          } catch (e) {
            setError(e instanceof Error ? e.message : 'Error al iniciar pago');
            setLoading(false);
          }
        }}
      >
        {label}
      </button>
      {error && (
        <p className="mt-2 text-center text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      {!token && (
        <p className="mt-2 text-center text-xs text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth" className="underline hover:text-gray-300">
            Inicia sesión
          </Link>
        </p>
      )}
    </>
  );
}
