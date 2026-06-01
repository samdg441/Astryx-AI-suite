import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { buttonLinkClass } from '@/lib/buttonClasses';

export default function CheckoutCancelPage() {
  return (
    <main className="page-checkout relative flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <div className="checkout-glass max-w-lg rounded-2xl p-10">
          <h1 className="text-heading mb-4 text-3xl font-bold sm:text-4xl">Pago cancelado</h1>
          <p className="text-muted mb-8 max-w-md">
            No se ha cobrado nada. Puedes volver a intentarlo cuando quieras.
          </p>
          <Link href="/planes" className={buttonLinkClass('secondary', 'px-6 py-3')}>
            Ver planes
          </Link>
        </div>
      </div>
    </main>
  );
}
