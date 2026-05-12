import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, TrendingUp, Users } from 'lucide-react';

export default function Nosotros() {
  return (
    <main className="w-full flex-1 flex flex-col min-h-screen bg-transparent text-white relative">
      <Navbar />
      
      <div className="flex flex-1 flex-col items-center px-5 pb-16 pt-24 sm:px-8 md:px-10">
        {/* Encabezado */}
        <div className="mb-16 max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">Sobre Nosotros</h1>
          <p className="text-lg text-gray-400 sm:text-xl md:text-2xl">
            Somos un equipo de visionarios tecnológicos comprometidos con democratizar
            el acceso a la inteligencia artificial más avanzada del mundo.
          </p>
        </div>

        {/* Nuestra Historia */}
        <div className="mb-24 w-full max-w-5xl rounded-2xl border border-gray-800 bg-[#111] p-8 sm:p-10 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Nuestra Historia</h2>
          <div className="space-y-6 text-gray-400 leading-relaxed text-sm md:text-base">
            <p>
              Nova IA Suite nació en 2024 de una necesidad real: las suscripciones a múltiples plataformas de IA estaban volviéndose prohibitivamente caras. Profesionales y empresas debían elegir entre ChatGPT, Midjourney, GitHub Copilot y docenas de otras herramientas, pagando cientos de dólares mensuales.
            </p>
            <p>
              Nuestro equipo fundador, con décadas de experiencia en inteligencia artificial y desarrollo de software, vio la oportunidad de crear algo diferente: una plataforma unificada que centralizara el acceso a las mejores IAs del mercado bajo una sola suscripción asequible.
            </p>
            <p>
              Hoy, Nova IA Suite sirve a miles de usuarios en toda Latinoamérica, desde freelancers hasta grandes corporaciones, democratizando el acceso a tecnología que antes era inalcanzable para muchos.
            </p>
          </div>
        </div>

        {/* Nuestros Valores */}
        <div className="w-full max-w-[90rem]">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Mission */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:bg-[#161616] transition-colors">
              <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center mb-6 border border-gray-700">
                <Target className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold mb-4">Misión</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Democratizar el acceso a la inteligencia artificial, eliminando barreras económicas y técnicas para que profesionales y empresas puedan aprovechar todo el potencial de la IA.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:bg-[#161616] transition-colors">
              <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center mb-6 border border-gray-700">
                <Eye className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold mb-4">Visión</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Ser la plataforma líder en integración de inteligencia artificial en Latinoamérica, transformando la forma en que las personas trabajan y crean.
              </p>
            </div>

            {/* Growth */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:bg-[#161616] transition-colors">
              <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center mb-6 border border-gray-700">
                <TrendingUp className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold mb-4">Crecimiento</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Expandir continuamente nuestro ecosistema de IAs, incorporando las tecnologías más avanzadas y manteniendo precios accesibles para todos.
              </p>
            </div>

            {/* Community */}
            <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 hover:bg-[#161616] transition-colors">
              <div className="w-12 h-12 bg-[#222] rounded-xl flex items-center justify-center mb-6 border border-gray-700">
                <Users className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold mb-4">Comunidad</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Construir una comunidad global de usuarios que comparten conocimiento, mejores prácticas y casos de uso innovadores de IA.
              </p>
            </div>

          </div>
        </div>

      </div>
      
      <Footer />
    </main>
  );
}
