import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="mx-auto mt-20 mb-16 flex w-full max-w-[90rem] flex-col items-center px-5 text-center sm:mt-24 sm:px-8 md:px-10">
      <div className="mb-8 flex items-center gap-2 rounded-full border border-gray-800 bg-black/50 px-5 py-2.5 text-base backdrop-blur-sm">
        <Sparkles className="h-5 w-5 shrink-0 text-gray-300" />
        <span className="text-gray-400">La revolución de la IA está aquí</span>
      </div>

      <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
        Todas las inteligencias
        <br />
        en un solo lugar
      </h1>

      <p className="mb-10 max-w-3xl text-lg leading-relaxed text-gray-400 sm:text-xl md:text-2xl md:leading-relaxed">
        Astryx AI Suite centraliza el acceso a las mejores inteligencias
        <br />
        artificiales del mercado. Una sola suscripción, infinitas posibilidades.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/auth"
          className="flex items-center gap-2 rounded-lg bg-[#cfcfcf] px-8 py-3.5 text-base font-semibold text-black transition-colors hover:bg-white"
        >
          Comenzar <ArrowRight className="h-5 w-5" />
        </Link>
        <Link
          href="/planes"
          className="rounded-lg border border-gray-800 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-gray-900"
        >
          Explorar planes
        </Link>
      </div>
    </div>
  );
}
