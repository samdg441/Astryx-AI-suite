'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import type { CheckoutPriceTier } from '@/lib/authApi';
import { createCheckoutSessionRequest } from '@/lib/authApi';
import { buttonLinkClass } from '@/lib/buttonClasses';
import { cn } from '@/lib/cn';
import { toast } from '@/lib/toast';

type Props = {
  className?: string;
  priceTier: CheckoutPriceTier;
  destacado?: boolean;
};

export function SubscribePlanButton({ className, priceTier, destacado = false }: Props) {
  const { token, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const variant = destacado ? 'primary-violet' : 'secondary';
  const mergedClass = cn(
    buttonLinkClass(variant, 'w-full'),
    className,
    loading && 'pointer-events-none opacity-70'
  );

  const label = loading ? 'Redirigiendo…' : 'Suscribirse';

  return (
    <>
      <button
        type="button"
        disabled={loading}
        className={mergedClass}
        onClick={async () => {
          if (!token || !user) {
            router.push(`/auth?redirect=${encodeURIComponent('/planes')}`);
            return;
          }
          setLoading(true);
          const toastId = toast.loading('Preparando pago seguro…');
          try {
            const url = await createCheckoutSessionRequest(token, priceTier);
            toast.dismiss(toastId);
            toast.success('Redirigiendo a Stripe');
            window.location.href = url;
          } catch (e) {
            toast.dismiss(toastId);
            toast.error(e instanceof Error ? e.message : 'Error al iniciar pago');
            setLoading(false);
          }
        }}
      >
        {label}
      </button>
      {!token && (
        <p className="text-muted mt-2 text-center text-xs">
          ¿Ya tienes cuenta?{' '}
          <Link href="/auth" className="text-heading font-medium underline underline-offset-2">
            Inicia sesión
          </Link>
        </p>
      )}
    </>
  );
}
