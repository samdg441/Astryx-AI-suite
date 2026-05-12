'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { SubscriptionBadge } from '@/components/dashboard/SubscriptionBadge';
import { UserMenu } from '@/components/dashboard/UserMenu';

export function HeaderAuth() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="hidden flex-col items-end sm:flex">
        <SubscriptionBadge planType={user.planType} />
      </div>
      <UserMenu displayName={user.name} />
      <Link
        href="/"
        className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-2 text-gray-400 transition hover:border-violet-500/30 hover:text-white xl:block"
        aria-label="Ir al sitio público"
      >
        <Sparkles className="h-5 w-5" />
      </Link>
    </div>
  );
}
