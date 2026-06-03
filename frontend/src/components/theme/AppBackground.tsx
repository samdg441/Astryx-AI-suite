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

export function AppBackground() {
  const { theme } = useTheme();
  const lite = useLiteBackground();

  if (theme === 'light') {
    return <div className="app-nebula-bg app-nebula-bg--lite" aria-hidden />;
  }

  return (
    <div className={`bg-video-layer fixed inset-0 z-0 ${lite ? 'bg-video-layer--lite' : ''}`}>
      {!lite && <BackgroundVideo />}
    </div>
  );
}
