'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

/**
 * Redirige a /auth si no hay token (complementa middleware + cookie).
 */
export function useRequireAuth() {
  const { token, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      router.replace(`/auth?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [token, router, pathname]);

  return { token, user, isReady: Boolean(token && user) };
}
