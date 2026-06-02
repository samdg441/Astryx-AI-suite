'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export function useLogout() {
  const { logout } = useAuth();
  const router = useRouter();

  return useCallback(
    (redirectAfterLogin?: string) => {
      logout();
      router.refresh();
      if (redirectAfterLogin) {
        router.replace(`/auth?redirect=${encodeURIComponent(redirectAfterLogin)}`);
      } else {
        router.replace('/auth');
      }
    },
    [logout, router]
  );
}
