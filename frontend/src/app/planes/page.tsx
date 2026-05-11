import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, X, Sparkles, Zap, Building2, type LucideIcon } from 'lucide-react';

type Feature = { text: string; included: boolean };

type Plan = {
  nombre: string;
  subtitulo: string;
  precio: string;
  periodo: string;
  icon: LucideIcon;
  destacado: boolean;
  features: Feature[];
};

const planes: Plan[] = [
  {
    nombre: 'Básico',
    subtitulo: 'Perfecto para emprendedores y freelancers',
    precio: '$19',
    periodo: '/mes',
    icon: Sparkles,
    destacado: false,
    features: [
      { text: 'Acceso a 5 IAs premium', included: true },
      { text: '100 consultas/día', included: true },
      { text: 'Chat IA avanzado', included: true },
      { text: 'Generador de imágenes (50/mes)', included: true },
      { text: 'Asistente de programación básico', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'API access', included: false },
      { text: 'Integraciones empresariales', included: false },
      { text: 'Soporte prioritario 24/7', included: false },
    ],
  },
  {
    nombre: 'Pro',
    subtitulo: 'La opción más popular para profesionales',
    precio: '$49',
    periodo: '/mes',
    icon: Zap,
    destacado: true,
    features: [
      { text: 'Acceso a todas las IAs premium', included: true },
      { text: 'Consultas ilimitadas', included: true },
      { text: 'Chat IA avanzado sin límites', included: true },
      { text: 'Generador de imágenes ilimitado', included: true },
      { text: 'Asistente de programación completo', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'API access', included: true },
      { text: 'Integraciones empresariales', included: false },
      { text: 'Soporte dedicado 24/7', included: false },
    ],
  },
  {
    nombre: 'Empresarial',
    subtitulo: 'Solución completa para equipos y empresas',
    precio: '$149',
    periodo: '/mes',
    icon: Building2,
    destacado: false,
    features: [
      { text: 'Todo lo incluido en Pro', included: true },
      { text: 'Usuarios ilimitados', included: true },
      { text: 'Dashboard de administración', included: true },
      { text: 'Analytics y reportes avanzados', included: true },
      { text: 'Integraciones empresariales', included: true },
      { text: 'Soporte dedicado 24/7', included: true },
      { text: 'API Premium con mayor tasa', included: true },
      { text: 'Entrenamiento personalizado', included: true },
      { text: 'SLA del 99.9%', included: true },
    ],
  },
];

export default function PlanesPage() {
  return (
    <main className="w-full flex-1 flex flex-col min-h-screen bg-transparent text-white relative">
      <Navbar />

      <div className="flex-1 flex flex-col items-center px-4 pt-24 pb-16">
        <div className="text-center max-w-3xl mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Planes</h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Elige el plan que encaje con tu flujo de trabajo. Puedes cambiar o cancelar cuando quieras.
          </p>
        </div>

        <div className="w-full max-w-6xl flex flex-col items-center">
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-gray-700/90 bg-[#111]/95 py-2 pl-2 pr-5 text-sm text-gray-300 shadow-sm backdrop-blur-sm">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center "
              aria-hidden
            >
                      <Sparkles className="w-4 h-4 text-gray-400" />
            </span>
            <span className="pr-0.5 leading-snug">
              Ahorra hasta 70% vs suscripciones individuales
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
            {planes.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.nombre}
                  className={`relative flex flex-col rounded-2xl border p-8 pt-9 ${
                    plan.destacado
                      ? 'border-white/25 bg-[#141414] shadow-[0_0_40px_-12px_rgba(255,255,255,0.12)] md:z-[1] md:scale-[1.02]'
                      : 'border-gray-800 bg-[#121212]'
                  }`}
                >
                  {plan.destacado && (
                    <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-gray-600 bg-black px-3 py-1 text-xs font-semibold tracking-wide text-white">
                      Más Popular
                    </span>
                  )}

                  <div className="mb-6 flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
                        plan.destacado
                          ? 'border-gray-600 bg-[#1c1c1c]'
                          : 'border-gray-700 bg-[#1a1a1a]'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-gray-200" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">{plan.nombre}</h2>
                      <p className="mt-1 text-sm leading-snug text-gray-500">{plan.subtitulo}</p>
                    </div>
                  </div>

                  <div className="mb-6 flex items-baseline gap-0.5">
                    <span className="text-4xl font-bold tracking-tight md:text-[2.5rem]">
                      {plan.precio}
                    </span>
                    <span className="text-base text-gray-500">{plan.periodo}</span>
                  </div>

                  <Link
                    href="/contacto"
                    className={`mb-8 block w-full rounded-xl py-3 text-center text-[15px] font-semibold transition-colors ${
                      plan.destacado
                        ? 'bg-[#e5e7eb] text-black hover:bg-white'
                        : 'border border-gray-700 bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]'
                    }`}
                  >
                    Suscribirse
                  </Link>

                  <ul className="flex flex-1 flex-col gap-3.5">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex gap-3 text-sm leading-snug">
                        {f.included ? (
                          <Check
                            className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gray-200"
                            strokeWidth={2.5}
                          />
                        ) : (
                          <X
                            className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gray-600"
                            strokeWidth={2.5}
                          />
                        )}
                        <span className={f.included ? 'text-gray-300' : 'text-gray-600'}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
