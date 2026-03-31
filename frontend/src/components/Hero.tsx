import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center mt-24 mb-16 px-4">
      {/* Top pill */}
      <div className="flex items-center gap-2 rounded-full border border-gray-800 bg-black/50 backdrop-blur-sm px-4 py-2 mb-8">
        <Sparkles className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400 text-sm">La revolución de la IA está aquí</span>
      </div>

      {/* Main Title */}
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
        Todas las inteligencias<br/>en un solo lugar
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
        Nova IA Suite centraliza el acceso a las mejores inteligencias<br/>
        artificiales del mercado. Una sola suscripción, infinitas posibilidades.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-gray-200 hover:bg-white text-black font-semibold px-6 py-3 rounded-md transition-colors">
          Explorar planes <ArrowRight className="w-4 h-4" />
        </button>
        <button className="bg-transparent border border-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-md transition-colors">
          Conocer más
        </button>
      </div>
    </div>
  );
}
