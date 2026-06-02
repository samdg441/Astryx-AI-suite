import React, { Suspense } from 'react';
import { MockCheckoutClient } from './MockCheckoutClient';

export default function MockCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="text-muted flex min-h-screen items-center justify-center">Cargando checkout…</div>
      }
    >
      <MockCheckoutClient />
    </Suspense>
  );
}
