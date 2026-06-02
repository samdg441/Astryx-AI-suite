'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

type Tab = { href: string; label: string };

const TABS: Tab[] = [
  { href: '/dashboard/perfil', label: 'Mi perfil' },
  { href: '/dashboard/suscripcion', label: 'Mi suscripción' },
];

type Props = {
  title: string;
  subtitle?: string;
  activeHref: string;
  children: React.ReactNode;
};

export function AccountShell({ title, subtitle, activeHref, children }: Props) {
  return (
    <div className="dashboard-shell flex min-h-0 flex-1 flex-col">
      <div className="custom-scrollbar mx-auto w-full max-w-3xl flex-1 overflow-y-auto px-4 py-8 sm:px-6">
        <Link
          href="/dashboard"
          className="text-muted mb-6 inline-flex items-center gap-2 text-sm font-medium transition hover:text-[var(--text-heading)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al espacio de desarrollo
        </Link>

        <nav className="mb-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition',
                activeHref === tab.href
                  ? 'border-[var(--text-heading)] bg-[var(--bg-card)] text-[var(--text-heading)]'
                  : 'border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text-heading)]'
              )}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <header className="mb-8">
          <h1 className="text-heading text-3xl font-bold tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted mt-2 text-base">{subtitle}</p>}
        </header>

        {children}
      </div>
    </div>
  );
}
