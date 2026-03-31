import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Astryx AI Suite',
  description: 'Todas las inteligencias en un solo lugar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen flex flex-col items-center bg-black text-white">
        {children}
      </body>
    </html>
  );
}
