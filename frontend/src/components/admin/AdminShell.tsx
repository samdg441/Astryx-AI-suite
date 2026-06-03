'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { isAdmin } from '@/lib/authUtils';
import { cn } from '@/lib/cn';

const links = [
  { href: '/admin/users', label: 'Usuarios' },
  { href: '/admin/tools', label: 'Herramientas IA' },
  { href: '/admin/contact-leads', label: 'Contactos' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      router.replace(`/auth?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (user && !isAdmin(user)) {
      router.replace('/dashboard');
    }
  }, [token, user, router, pathname]);

  if (!token || (user && !isAdmin(user))) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted">Verificando permisos…</p>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 pb-16 pt-28 sm:px-8">
        <div className="mb-8">
          <h1 className="text-heading text-3xl font-bold sm:text-4xl">Panel de administración</h1>
          <p className="text-muted">
            Usuarios, herramientas IA y contactos.
          </p>
        </div>
        <nav className="mb-8 flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-xl border px-4 py-2 text-sm font-medium transition',
                pathname === link.href
                  ? 'border-[var(--accent-violet)] bg-[var(--accent-violet)]/10 text-[var(--text-heading)]'
                  : 'border-[var(--border-default)] text-muted hover:text-[var(--text-heading)]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
      <Footer />
    </main>
  );
}
