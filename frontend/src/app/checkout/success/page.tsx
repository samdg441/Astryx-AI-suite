'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';

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
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center text-white">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">¡Pago recibido!</h1>
      <p className="mb-2 max-w-md text-gray-400">
        {done
          ? 'Hemos actualizado tu cuenta. Cuando Stripe confirme la suscripción, verás el plan activo aquí y en /planes.'
          : 'Actualizando tu sesión…'}
      </p>
      {sessionId && (
        <p className="mb-8 font-mono text-xs text-gray-600">
          Referencia: {sessionId.slice(0, 24)}…
        </p>
      )}
      <Link
        href="/"
        className="rounded-xl bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
      >
        Volver al inicio
      </Link>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center text-white">Cargando…</main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
