import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Astryx AI Suite',
  description: 'Todas las inteligencias en un solo lugar',
};

import { AppBackground } from '@/components/theme/AppBackground';
import { AppProviders } from '@/components/providers/AppProviders';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('astryx_theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="relative min-h-screen antialiased text-heading">
        <AppProviders>
          <AppBackground />
          <div className="app-content-layer">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
