'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { ChatLayout } from '@/components/dashboard/ChatLayout';

export default function DashboardPage() {
  const { token, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace('/auth?redirect=/dashboard');
    }
  }, [token, router]);

  useEffect(() => {
    if (user && (user.planType === null || user.planType === undefined || user.planType === '')) {
      router.replace('/planes');
    }
  }, [user, router]);

  if (!token || !user) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-black text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white/60" />
          <p className="text-sm">Cargando Astryx…</p>
        </div>
      </div>
    );
  }

  if (user.planType === null || user.planType === undefined || user.planType === '') {
    return null;
  }

  return <ChatLayout />;
}
