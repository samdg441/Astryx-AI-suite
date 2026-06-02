'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { setUnauthorizedHandler } from '@/lib/apiClient';
import { useLogout } from '@/hooks/useLogout';

export function AuthSessionGuard() {
  const signOut = useLogout();
  const pathname = usePathname();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      signOut(pathname);
    });
    return () => setUnauthorizedHandler(null);
  }, [signOut, pathname]);

  return null;
}
