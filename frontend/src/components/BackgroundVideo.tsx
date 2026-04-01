import React from 'react';

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-black">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover opacity-80"
      >
        <source src="/Fondo_Astryx.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
