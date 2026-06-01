'use client';

import { Toaster as SonnerToaster } from 'sonner';
import { useTheme } from '@/components/theme/ThemeContext';

export function Toaster() {
  const { theme } = useTheme();

  return (
    <SonnerToaster
      theme={theme}
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: 'font-sans text-sm shadow-lg border',
        },
      }}
    />
  );
}
