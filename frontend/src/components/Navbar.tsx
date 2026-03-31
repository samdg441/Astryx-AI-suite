import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full h-20 px-8 flex justify-between items-center text-sm border-b border-gray-900 bg-[#0a0a0a]">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-gray-800 p-2 rounded-md">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-lg hover:text-gray-300">Nova IA Suite</span>
      </div>

      {/* Center Links */}
      <div className="hidden md:flex gap-8 text-gray-400 font-medium">
        <a href="#" className="text-white border-b-2 border-white pb-1">Inicio</a>
        <a href="#" className="hover:text-white transition-colors">Nosotros</a>
        <a href="#" className="hover:text-white transition-colors">Planes</a>
        <a href="#" className="hover:text-white transition-colors">Contacto</a>
      </div>

      {/* Call to action */}
      <div>
        <button className="bg-gray-200 hover:bg-white text-black font-semibold px-4 py-2 rounded-md transition-colors">
          Comenzar
        </button>
      </div>
    </nav>
  );
}
