'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const enPlanes = pathname === '/planes';

  return (
    <footer className="w-full flex flex-col items-center mt-24">
      {/* Call to Action Section */}
      <div className="w-full max-w-4xl mx-auto py-24 px-4 flex flex-col items-center text-center bg-[#111] rounded-3xl border border-gray-800 mb-24">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Comienza tu transformación con IA
        </h2>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Únete a miles de profesionales y empresas que ya están potenciando su
          productividad con Nova IA Suite.
        </p>
        <Link
          href={enPlanes ? '/contacto' : '/planes'}
          className="inline-flex items-center gap-2 bg-gray-200 hover:bg-white text-black font-semibold px-6 py-3 rounded-md transition-colors"
        >
          {enPlanes ? 'Comenzar' : 'Ver planes y precios'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Main Footer Content */}
      <div className="w-full bg-[#111] pt-16 pb-8 px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between mb-16 px-4">
          
          {/* Brand Info */}
          <div className="mb-12 md:mb-0 max-w-xs">
            <h3 className="text-lg font-bold mb-4">Nova IA Suite</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Todas las inteligencias artificiales en un solo lugar.
              La plataforma líder en integración de IA.
            </p>
          </div>

          {/* Links and Social */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-32">
            
            {/* Links Grid */}
            <div className="flex gap-16 md:gap-24">
              {/* Navigation */}
              <div>
                <h4 className="font-semibold text-white mb-6 text-sm">Navegación</h4>
                <ul className="flex flex-col gap-4 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Nosotros</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Planes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold text-white mb-6 text-sm">Legal</h4>
                <ul className="flex flex-col gap-4 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Términos de uso</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 md:mt-0">
               <h4 className="font-semibold text-white mb-6 text-sm">Síguenos</h4>
               <div className="flex gap-3 mb-6">
                 <a href="#" className="w-10 h-10 rounded-md bg-[#222] border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors group">
                   <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.96 3.63 9.08 8.4 9.82v-6.95h-2.53v-2.87h2.53V9.82c0-2.5 1.48-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.87h-2.34v6.95c4.77-.74 8.4-4.86 8.4-9.82.02-5.5-4.44-9.96-9.94-9.96z"/></svg>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-md bg-[#222] border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors group">
                   <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.1.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-md bg-[#222] border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors group">
                   <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                 </a>
                 <a href="#" className="w-10 h-10 rounded-md bg-[#222] border border-gray-800 flex items-center justify-center hover:bg-gray-800 transition-colors group">
                   <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                 </a>
               </div>
               <div className="flex items-center gap-2 text-sm text-gray-400">
                 <Mail className="w-4 h-4" />
                 <a href="mailto:contacto@novaai.com" className="hover:text-white transition-colors">contacto@novaai.com</a>
               </div>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 max-w-6xl mx-auto border-t border-gray-800/60 pt-8">
          © 2026 Nova IA Suite. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
