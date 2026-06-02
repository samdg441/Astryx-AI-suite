'use client';

import React, { useEffect, useState } from 'react';
import BackgroundVideo from '@/components/BackgroundVideo';
import { useTheme } from '@/components/theme/ThemeContext';

function useLiteBackground() {
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      '(max-width: 1024px), (prefers-reduced-motion: reduce), (hover: none) and (pointer: coarse)'
    );
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return lite;
}

/** Fondo dinámico: video espacial (oscuro) o nebulosa CSS (claro). */
export function AppBackground() {
  const { theme } = useTheme();
  const lite = useLiteBackground();

  if (theme === 'light') {
    if (lite) {
      return <div className="app-nebula-bg app-nebula-bg--lite" aria-hidden />;
    }
    return (
      <div className="app-nebula-bg" aria-hidden>
        <div className="nebula-stars" />
        <div className="nebula-orbs">
          <div className="nebula-orb nebula-orb--cyan" />
          <div className="nebula-orb nebula-orb--violet" />
          <div className="nebula-orb nebula-orb--lavender nebula-orb--desktop-only" />
          <div className="nebula-orb nebula-orb--cyan-soft nebula-orb--desktop-only" />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-video-layer fixed inset-0 z-0 ${lite ? 'bg-video-layer--lite' : ''}`}>
      {!lite && <BackgroundVideo />}
    </div>
  );
}
