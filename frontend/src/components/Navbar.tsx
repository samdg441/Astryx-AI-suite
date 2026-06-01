"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { HeaderAuth } from '@/components/dashboard/HeaderAuth';
import { SubscriptionBadge } from '@/components/dashboard/SubscriptionBadge';
import { useTheme } from '@/components/theme/ThemeContext';
import { isAdmin } from '@/lib/authUtils';
import { buttonLinkClass } from '@/lib/buttonClasses';
import { cn } from '@/lib/cn';

export default function Navbar() {
  const pathname = usePathname();
  const { user, token } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    ...(token ? [{ name: 'Desarrollar', path: '/dashboard' as const }] : []),
    ...(user && isAdmin(user) ? [{ name: 'Admin', path: '/admin' as const }] : []),
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Planes', path: '/planes' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="navbar-glass relative z-50 flex h-24 w-full items-center justify-between px-5 sm:px-8 md:px-10 lg:px-12">
      <Link href="/" className="flex cursor-pointer items-center gap-3">
        <div className="flex items-center justify-center rounded-[12px] bg-gradient-to-br from-[#b0b0b0] via-[#8a8a8a] to-[#737373] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <Sparkles className="h-5 w-5 text-black" />
        </div>
        <span className="text-heading text-xl font-bold tracking-tight transition-colors sm:text-[22px]">
          Astryx AI Suite
        </span>
      </Link>

      <div className="hidden items-center gap-8 text-[15px] font-medium lg:gap-10 lg:text-base xl:gap-12 md:flex">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={cn('nav-link relative pb-2', isActive && 'nav-link--active')}
            >
              {link.name}
              {isActive && (
                <span className="nav-link-indicator absolute bottom-0 left-0 h-[2px] w-full rounded-full" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-lg border border-[var(--border-default)] p-2 text-muted transition-colors hover:text-[var(--text-heading)]"
          aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
          title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        {user && (
          <div className="hidden items-center gap-2 sm:flex md:hidden">
            <SubscriptionBadge planType={user.planType} />
          </div>
        )}
        {user ? (
          <HeaderAuth />
        ) : (
          <Link
            href="/auth"
            className={buttonLinkClass('primary', 'px-5 py-2.5 text-[15px] sm:px-7 sm:py-3 sm:text-base')}
          >
            Comenzar
          </Link>
        )}

        <button
          type="button"
          className="rounded-lg border border-[var(--border-default)] p-2 text-muted md:hidden"
          aria-label="Menú"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="navbar-glass absolute left-0 right-0 top-full border-b border-[var(--border-default)] p-4 shadow-2xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'rounded-lg px-3 py-2 text-base',
                  pathname === link.path
                    ? 'bg-[var(--bg-muted)] text-heading font-medium'
                    : 'text-muted'
                )}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link
                href="/auth"
                onClick={() => setMobileOpen(false)}
                className={buttonLinkClass('primary', 'mt-2 py-3 text-center')}
              >
                Comenzar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
