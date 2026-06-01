'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { setUnauthorizedHandler } from '@/lib/apiClient';
import { useAuth } from './AuthContext';

export function AuthSessionGuard() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      const redirect = encodeURIComponent(pathname);
      router.replace(`/auth?redirect=${redirect}`);
    });
    return () => setUnauthorizedHandler(null);
  }, [logout, router, pathname]);

  return null;
}
