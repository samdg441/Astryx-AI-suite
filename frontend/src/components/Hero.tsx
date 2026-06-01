import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { buttonLinkClass } from '@/lib/buttonClasses';

export default function Hero() {
  return (
    <div className="mx-auto mb-16 mt-20 flex w-full max-w-[90rem] flex-col items-center px-5 text-center sm:mt-24 sm:px-8 md:px-10">
      <div className="promo-strip mb-8 flex items-center gap-2 rounded-full px-5 py-2.5 text-base">
        <Sparkles className="h-5 w-5 shrink-0 text-muted" />
        <span className="text-muted">La revolución de la IA está aquí</span>
      </div>

      <h1 className="text-heading mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        Todas las inteligencias
        <br />
        en un solo lugar
      </h1>

      <p className="text-muted mx-auto mb-10 max-w-3xl text-lg leading-relaxed sm:text-xl md:text-2xl md:leading-relaxed">
        Astryx AI Suite centraliza el acceso a las mejores inteligencias
        <br />
        artificiales del mercado. Una sola suscripción, infinitas posibilidades.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/auth"
          className={buttonLinkClass('primary', 'px-8 py-3.5 text-base')}
        >
          Comenzar <ArrowRight className="h-5 w-5" />
        </Link>
        <Link
          href="/planes"
          className={buttonLinkClass('secondary', 'px-8 py-3.5 text-base')}
        >
          Explorar planes
        </Link>
      </div>
    </div>
  );
}
