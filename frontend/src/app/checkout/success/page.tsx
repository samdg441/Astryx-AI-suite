'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/auth/AuthContext';
import { buttonLinkClass } from '@/lib/buttonClasses';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { refreshUser } = useAuth();
  const [done, setDone] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        await refreshUser();
      } finally {
        setDone(true);
      }
    })();
  }, [refreshUser]);

  return (
    <main className="page-checkout relative flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="checkout-glass max-w-lg rounded-2xl p-10">
          <h1 className="text-heading mb-4 text-3xl font-bold sm:text-4xl">¡Pago recibido!</h1>
          <p className="text-muted mb-2 max-w-md">
            {done
              ? 'Hemos actualizado tu cuenta. Cuando Stripe confirme la suscripción, verás el plan activo aquí y en /planes.'
              : 'Actualizando tu sesión…'}
          </p>
          {sessionId && (
            <p className="text-faint mb-8 font-mono text-xs">
              Referencia: {sessionId.slice(0, 24)}…
            </p>
          )}
          <Link href="/dashboard" className={buttonLinkClass('primary', 'px-6 py-3')}>
            Ir a Desarrollar
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="page-checkout flex min-h-screen items-center justify-center">
          <p className="text-muted">Cargando…</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
