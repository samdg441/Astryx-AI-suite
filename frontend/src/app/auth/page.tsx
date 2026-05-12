import type { Metadata } from 'next';
import React from 'react';
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
        <AuthPagePanels />
      </div>
    </main>
  );
}
