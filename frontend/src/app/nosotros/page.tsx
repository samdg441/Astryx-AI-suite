import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, TrendingUp, Users } from 'lucide-react';

export default function Nosotros() {
  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col bg-transparent">
      <Navbar />

      <div className="flex flex-1 flex-col items-center px-5 pb-16 pt-24 sm:px-8 md:px-10">
        <div className="mb-16 max-w-4xl text-center">
          <h1 className="text-heading mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Sobre Nosotros
          </h1>
          <p className="text-muted text-lg sm:text-xl md:text-2xl">
            Somos un equipo de visionarios tecnológicos comprometidos con democratizar el acceso a
            la inteligencia artificial más avanzada del mundo.
          </p>
        </div>

        <div className="glass-panel mb-24 w-full max-w-5xl p-8 sm:p-10 md:p-12">
          <h2 className="text-heading mb-8 text-center text-2xl font-bold md:text-3xl">
            Nuestra Historia
          </h2>
          <div className="text-muted space-y-6 text-sm leading-relaxed md:text-base">
            <p>
              Astryx AI Suite nació en 2024 de una necesidad real: las suscripciones a múltiples
              plataformas de IA estaban volviéndose prohibitivamente caras. Profesionales y
              empresas debían elegir entre ChatGPT, Midjourney, GitHub Copilot y docenas de otras
              herramientas, pagando cientos de dólares mensuales.
            </p>
            <p>
              Nuestro equipo fundador, con décadas de experiencia en inteligencia artificial y
              desarrollo de software, vio la oportunidad de crear algo diferente: una plataforma
              unificada que centralizara el acceso a las mejores IAs del mercado bajo una sola
              suscripción asequible.
            </p>
            <p>
              Hoy, Astryx AI Suite sirve a miles de usuarios en toda Latinoamérica, desde
              freelancers hasta grandes corporaciones, democratizando el acceso a tecnología que
              antes era inalcanzable para muchos.
            </p>
          </div>
        </div>

        <div className="w-full max-w-[90rem]">
          <h2 className="text-heading mb-12 text-center text-3xl font-bold md:text-4xl">
            Nuestros Valores
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: Target,
                title: 'Misión',
                text: 'Democratizar el acceso a la inteligencia artificial, eliminando barreras económicas y técnicas para que profesionales y empresas puedan aprovechar todo el potencial de la IA.',
              },
              {
                icon: Eye,
                title: 'Visión',
                text: 'Ser la plataforma líder en integración de inteligencia artificial en Latinoamérica, transformando la forma en que las personas trabajan y crean.',
              },
              {
                icon: TrendingUp,
                title: 'Crecimiento',
                text: 'Expandir continuamente nuestro ecosistema de IAs, incorporando las tecnologías más avanzadas y manteniendo precios accesibles para todos.',
              },
              {
                icon: Users,
                title: 'Comunidad',
                text: 'Construir una comunidad global de usuarios que comparten conocimiento, mejores prácticas y casos de uso innovadores de IA.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="glass-panel glass-panel--interactive p-8">
                <div className="icon-well mb-6">
                  <Icon className="text-muted h-6 w-6" />
                </div>
                <h3 className="text-heading mb-4 text-xl font-bold">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
