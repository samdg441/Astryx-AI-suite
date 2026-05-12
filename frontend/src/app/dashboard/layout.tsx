import type { Metadata } from 'next';
import React from 'react';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Desarrollar | Astryx AI Suite',
  description: 'Espacio de trabajo e IA conversacional Astryx AI Suite',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-black">
      <Navbar />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
