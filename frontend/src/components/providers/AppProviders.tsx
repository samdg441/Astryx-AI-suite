'use client';

import React from 'react';
import { AuthProvider } from '@/components/auth/AuthContext';
import { AuthSessionGuard } from '@/components/auth/AuthSessionGuard';
import { MockCheckoutProvider } from '@/components/checkout/MockCheckoutContext';
import { ThemeProvider } from '@/components/theme/ThemeContext';
import { Toaster } from '@/components/ui/Toaster';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MockCheckoutProvider>
          <AuthSessionGuard />
          {children}
          <Toaster />
        </MockCheckoutProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
