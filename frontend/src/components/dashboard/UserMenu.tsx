'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  Settings,
  History,
} from 'lucide-react';
import { useLogout } from '@/hooks/useLogout';

type Props = {
  displayName: string;
  onOpenChange?: (open: boolean) => void;
};

export function UserMenu({ displayName, onOpenChange }: Props) {
  const [open, setOpen] = React.useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const signOut = useLogout();

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
    'user-menu-item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition';

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((v) => !v)}
        className="user-menu-trigger group flex items-center gap-2 rounded-2xl px-2 py-1.5 pr-3 transition"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#b0b0b0] via-[#8a8a8a] to-[#737373] text-sm font-bold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          {displayName.slice(0, 1).toUpperCase()}
        </span>
        <span className="text-heading max-w-[120px] truncate text-sm font-medium sm:max-w-[160px]">
          {displayName}
        </span>
        <ChevronDown
          className={`text-muted h-4 w-4 transition group-hover:text-[var(--text-heading)] ${open ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="user-menu-dropdown absolute right-0 z-[100] mt-2 w-64 origin-top-right rounded-2xl p-2"
          >
            <div className="user-menu-divider mb-1 border-b px-2 pb-2 pt-1">
              <p className="text-muted truncate text-xs">Sesión activa</p>
              <p className="text-heading truncate text-sm font-medium">{displayName}</p>
            </div>
            <nav className="flex flex-col gap-0.5 py-1">
              <Link href="/dashboard/perfil" className={item} onClick={() => setOpen(false)}>
                <User className="user-menu-item-icon h-4 w-4" />
                Mi perfil
              </Link>
              <Link href="/dashboard/suscripcion" className={item} onClick={() => setOpen(false)}>
                <CreditCard className="user-menu-item-icon h-4 w-4" />
                Mi suscripción
              </Link>
              <button type="button" className={item} onClick={() => setOpen(false)}>
                <Settings className="user-menu-item-icon h-4 w-4" />
                Configuración
              </button>
              <button type="button" className={item} onClick={() => setOpen(false)}>
                <History className="user-menu-item-icon h-4 w-4" />
                Historial
              </button>
            </nav>
            <div className="user-menu-divider mt-1 border-t pt-1">
              <button
                type="button"
                className={`${item} user-menu-logout`}
                onClick={() => {
                  setOpen(false);
                  signOut();
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
