import React, { Suspense } from 'react';
import { MockCheckoutClient } from './MockCheckoutClient';

export default function MockCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#030308] text-gray-500">Cargando checkout…</div>
      }
    >
      <MockCheckoutClient />
    </Suspense>
  );
}
