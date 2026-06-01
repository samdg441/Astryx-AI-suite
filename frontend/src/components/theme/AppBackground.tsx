'use client';

import React from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import { useTheme } from '@/components/theme/ThemeContext';

/** Fondo dinámico: video espacial (oscuro) o nebulosa CSS (claro). */
export function AppBackground() {
  const { theme } = useTheme();

  if (theme === 'light') {
    return (
      <div className="app-nebula-bg" aria-hidden>
        <div className="nebula-stars" />
        <div className="nebula-orbs">
          <div className="nebula-orb nebula-orb--cyan" />
          <div className="nebula-orb nebula-orb--violet" />
          <div className="nebula-orb nebula-orb--lavender" />
          <div className="nebula-orb nebula-orb--cyan-soft" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-video-layer fixed inset-0 z-0">
      <BackgroundVideo />
    </div>
  );
}
