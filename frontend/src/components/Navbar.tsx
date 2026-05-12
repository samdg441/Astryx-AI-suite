"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Planes', path: '/planes' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="relative z-50 flex h-24 w-full items-center justify-between border-b border-[#222] bg-[#0a0a0a] px-5 sm:px-8 md:px-10 lg:px-12">
      <Link href="/" className="flex cursor-pointer items-center gap-3">
        <div className="flex items-center justify-center rounded-[12px] bg-gradient-to-br from-[#b0b0b0] via-[#8a8a8a] to-[#737373] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          <Sparkles className="h-5 w-5 text-black" />
        </div>
        <span className="text-xl font-bold tracking-tight transition-colors hover:text-gray-300 sm:text-[22px]">
          Astryx AI Suite
        </span>
      </Link>

      <div className="hidden gap-8 text-[15px] font-medium text-gray-400 lg:gap-10 lg:text-base xl:gap-12 md:flex">
        {links.map((link) => {
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

      <div>
        <Link
          href="/auth"
          className="rounded-lg bg-[#cfcfcf] px-6 py-2.5 text-[15px] font-semibold text-black transition-colors hover:bg-white sm:px-7 sm:py-3 sm:text-base"
        >
          Comenzar
        </Link>
      </div>
    </nav>
  );
}
