'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail } from 'lucide-react';
import { buttonLinkClass } from '@/lib/buttonClasses';

export default function Footer() {
  const pathname = usePathname();
  const enPlanes = pathname === '/planes';

  return (
    <footer className="mt-24 flex w-full flex-col items-center">
      <div className="footer-cta-box mx-auto mb-24 flex w-full max-w-5xl flex-col items-center rounded-3xl px-5 py-24 text-center sm:px-8">
        <h2 className="text-heading mb-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          Comienza tu transformación con IA
        </h2>
        <p className="text-muted mx-auto mb-10 max-w-3xl text-lg sm:text-xl">
          Únete a miles de profesionales y empresas que ya están potenciando su productividad con
          Astryx AI Suite.
        </p>
        <Link
          href={enPlanes ? '/auth' : '/planes'}
          className={buttonLinkClass('primary', 'px-8 py-3.5 text-base')}
        >
          {enPlanes ? 'Comenzar' : 'Ver planes y precios'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="footer-shell w-full px-8 pb-8 pt-16">
        <div className="mx-auto mb-16 flex max-w-[90rem] flex-col justify-between px-5 sm:px-8 md:flex-row md:px-10">
          <div className="mb-12 max-w-xs md:mb-0">
            <h3 className="text-heading mb-4 text-lg font-bold">Astryx AI Suite</h3>
            <p className="text-muted text-sm leading-relaxed">
              Todas las inteligencias artificiales en un solo lugar. La plataforma líder en
              integración de IA.
            </p>
          </div>

          <div className="flex flex-col gap-16 md:flex-row md:gap-32">
            <div className="flex gap-16 md:gap-24">
              <div>
                <h4 className="text-heading mb-6 text-sm font-semibold">Navegación</h4>
                <ul className="text-muted flex flex-col gap-4 text-sm">
                  <li>
                    <Link href="/" className="hover:text-[var(--text-heading)] transition-colors">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/nosotros" className="hover:text-[var(--text-heading)] transition-colors">
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/planes" className="hover:text-[var(--text-heading)] transition-colors">
                      Planes
                    </Link>
                  </li>
                  <li>
                    <Link href="/contacto" className="hover:text-[var(--text-heading)] transition-colors">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-heading mb-6 text-sm font-semibold">Legal</h4>
                <ul className="text-muted flex flex-col gap-4 text-sm">
                  <li>
                    <a href="#" className="hover:text-[var(--text-heading)] transition-colors">
                      Términos de uso
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--text-heading)] transition-colors">
                      Privacidad
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--text-heading)] transition-colors">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 md:mt-0">
              <h4 className="text-heading mb-6 text-sm font-semibold">Síguenos</h4>
              <div className="mb-6 flex gap-3">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((network) => (
                  <a
                    key={network}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-muted)] transition-colors hover:border-[var(--border-strong)]"
                    aria-label={network}
                  >
                    <span className="text-muted text-xs font-bold uppercase">
                      {network.slice(0, 2)}
                    </span>
                  </a>
                ))}
              </div>
              <div className="text-muted flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:contacto@astryx.ai"
                  className="hover:text-[var(--text-heading)] transition-colors"
                >
                  contacto@astryx.ai
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-muted mx-auto max-w-[90rem] border-t border-[var(--footer-border)] px-5 pt-8 text-center text-xs sm:px-8 md:px-10">
          © 2026 Astryx AI Suite. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
