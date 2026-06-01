'use client';

import React, { useEffect, useRef } from 'react';

/** Velocidad del fondo (< 1 = más lento, más “cinemático”). */
const PLAYBACK_RATE = 0.62;

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const applyRate = () => {
      try {
        video.playbackRate = PLAYBACK_RATE;
      } catch {
        /* algunos navegadores pueden limitar playbackRate */
      }
    };

    applyRate();
    video.addEventListener('loadeddata', applyRate);
    video.addEventListener('canplay', applyRate);

    return () => {
      video.removeEventListener('loadeddata', applyRate);
      video.removeEventListener('canplay', applyRate);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-60 mix-blend-screen"
      >
        <source src="/Fondo_Astryx.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
