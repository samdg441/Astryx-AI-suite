'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import type { CheckoutPriceTier } from '@/lib/authApi';
import { useMockCheckoutModal } from '@/components/checkout/MockCheckoutContext';
import { buttonLinkClass } from '@/lib/buttonClasses';
import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  priceTier: CheckoutPriceTier;
  destacado?: boolean;
};

export function SubscribePlanButton({ className, priceTier, destacado = false }: Props) {
  const { token, user } = useAuth();
  const router = useRouter();
  const { openCheckout } = useMockCheckoutModal();

  const variant = destacado ? 'primary-violet' : 'secondary';
  const mergedClass = cn(buttonLinkClass(variant, 'w-full'), className);

  return (
    <>
      <button
        type="button"
        className={mergedClass}
        onClick={() => {
          if (!token || !user) {
            router.push(`/auth?redirect=${encodeURIComponent('/planes')}`);
            return;
          }
          openCheckout(priceTier, { redirectTo: '/dashboard' });
        }}
      >
        Suscribirse
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
