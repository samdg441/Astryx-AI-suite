export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover opacity-60 mix-blend-screen"
      >
        <source src="/Fondo_Astryx.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
