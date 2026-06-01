'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  Settings,
  History,
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

type Props = {
  displayName: string;
  onOpenChange?: (open: boolean) => void;
};

export function UserMenu({ displayName, onOpenChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    onOpenChange?.(open);
  }, [open, onOpenChange]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  const item =
    'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-gray-200 transition hover:bg-white/[0.07] hover:text-white';

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-1.5 pr-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08]"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#b0b0b0] via-[#8a8a8a] to-[#737373] text-sm font-bold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          {displayName.slice(0, 1).toUpperCase()}
        </span>
        <span className="max-w-[120px] truncate text-sm font-medium text-white sm:max-w-[160px]">
          {displayName}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition group-hover:text-white ${open ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-[100] mt-2 w-64 origin-top-right rounded-2xl border border-white/10 bg-[#0a0a12]/90 p-2 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
          >
            <div className="mb-1 border-b border-white/5 px-2 pb-2 pt-1">
              <p className="truncate text-xs text-gray-500">Sesión activa</p>
              <p className="truncate text-sm font-medium text-white">{displayName}</p>
            </div>
            <nav className="flex flex-col gap-0.5 py-1">
              <Link href="/dashboard" className={item} onClick={() => setOpen(false)}>
                <User className="h-4 w-4 text-gray-400" />
                Mi perfil
              </Link>
              <Link href="/planes" className={item} onClick={() => setOpen(false)}>
                <CreditCard className="h-4 w-4 text-cyan-300" />
                Mi suscripción
              </Link>
              <button type="button" className={item} onClick={() => setOpen(false)}>
                <Settings className="h-4 w-4 text-gray-400" />
                Configuración
              </button>
              <button type="button" className={item} onClick={() => setOpen(false)}>
                <History className="h-4 w-4 text-gray-400" />
                Historial
              </button>
            </nav>
            <div className="mt-1 border-t border-white/5 pt-1">
              <button
                type="button"
                className={`${item} text-rose-300 hover:text-rose-200`}
                onClick={() => {
                  setOpen(false);
                  logout();
                  router.push('/auth');
                }}
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
