import React from 'react';
import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center text-white">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Pago cancelado</h1>
      <p className="mb-8 max-w-md text-gray-400">
        No se ha cobrado nada. Puedes volver a intentarlo cuando quieras.
      </p>
      <Link
        href="/planes"
        className="rounded-xl border border-gray-600 px-6 py-3 font-semibold text-white hover:bg-white/10"
      >
        Ver planes
      </Link>
    </main>
  );
}
