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
    <nav className="w-full h-24 px-8 md:px-12 flex justify-between items-center bg-[#0a0a0a] border-b border-[#222] z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer">
        <div className="bg-[#8a8a8a] p-2 rounded-[12px] flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-black" />
        </div>
        <span className="font-bold text-[22px] tracking-tight hover:text-gray-300 transition-colors">Nova IA Suite</span>
      </Link>

      {/* Center Links */}
      <div className="hidden md:flex gap-10 text-gray-400 font-medium text-[15px]">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`relative pb-2 hover:text-white transition-colors ${isActive ? 'text-white' : ''}`}
            >
              {link.name}
              {isActive && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-white rounded-full"></span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Call to action */}
      <div>
        <button className="bg-[#cfcfcf] hover:bg-white text-black font-semibold px-6 py-2.5 rounded-lg transition-colors text-[15px]">
          Comenzar
        </button>
      </div>
    </nav>
  );
}
