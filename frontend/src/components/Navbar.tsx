"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { HeaderAuth } from '@/components/dashboard/HeaderAuth';
import { SubscriptionBadge } from '@/components/dashboard/SubscriptionBadge';

export default function Navbar() {
  const pathname = usePathname();
  const { user, token } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    ...(token ? [{ name: 'Desarrollar', path: '/dashboard' as const }] : []),
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Planes', path: '/planes' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="relative z-50 flex h-24 w-full items-center justify-between border-b border-[#222] bg-[#0a0a0a]/95 px-5 backdrop-blur-xl sm:px-8 md:px-10 lg:px-12">
      <Link href="/" className="flex cursor-pointer items-center gap-3">
        <div className="flex items-center justify-center rounded-[12px] bg-gradient-to-br from-[#b0b0b0] via-[#8a8a8a] to-[#737373] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <Sparkles className="h-5 w-5 text-black" />
        </div>
        <span className="text-xl font-bold tracking-tight transition-colors hover:text-gray-300 sm:text-[22px]">
          Astryx AI Suite
        </span>
      </Link>

      <div className="hidden items-center gap-8 text-[15px] font-medium text-gray-400 lg:gap-10 lg:text-base xl:gap-12 md:flex">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`relative pb-2 transition-colors hover:text-white ${isActive ? 'text-white' : ''}`}
            >
              {link.name}
              {isActive && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
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
            className="rounded-lg bg-[#cfcfcf] px-5 py-2.5 text-[15px] font-semibold text-black transition-colors hover:bg-white sm:px-7 sm:py-3 sm:text-base"
          >
            Comenzar
          </Link>
        )}

        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-gray-300 md:hidden"
          aria-label="Menú"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-white/10 bg-[#0a0a0a]/98 p-4 shadow-2xl md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-base ${pathname === link.path ? 'bg-white/10 text-white' : 'text-gray-400'}`}
              >
                {link.name}
              </Link>
            ))}
            {!user && (
              <Link
                href="/auth"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-lg bg-[#cfcfcf] py-3 text-center font-semibold text-black"
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
