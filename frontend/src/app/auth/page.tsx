import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import { AuthPagePanels } from '@/components/auth/AuthPagePanels';

export const metadata: Metadata = {
  title: 'Cuenta | Nova IA Suite',
  description: 'Inicia sesión o crea tu cuenta en Nova IA Suite',
};

export default function AuthPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col bg-transparent text-white">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-8 md:px-10 md:py-16">
        <Suspense fallback={<div className="min-h-[560px] w-full max-w-[min(98vw,1280px)] animate-pulse rounded-2xl bg-white/5" />}>
          <AuthPagePanels />
        </Suspense>
      </div>
    </main>
  );
}
