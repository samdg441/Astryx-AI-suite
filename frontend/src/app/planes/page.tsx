import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SubscribePlanButton } from '@/components/auth/SubscribePlanButton';
import { PlanesFreeCta } from '@/components/auth/PlanesFreeCta';
import { Check, X, Sparkles, Zap, Building2, type LucideIcon } from 'lucide-react';
import type { CheckoutPriceTier } from '@/lib/authApi';

type Feature = { text: string; included: boolean };

type Plan = {
  nombre: string;
  subtitulo: string;
  precio: string;
  periodo: string;
  icon: LucideIcon;
  destacado: boolean;
  priceTier: CheckoutPriceTier;
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
    priceTier: 'basico',
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
    priceTier: 'pro',
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
    priceTier: 'empresarial',
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

      <div className="flex flex-1 flex-col items-center px-5 pb-16 pt-24 sm:px-8 md:px-10">
        <div className="mb-10 max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">Planes</h1>
          <p className="text-lg text-gray-400 sm:text-xl md:text-2xl md:leading-relaxed">
            Elige el plan que encaje con tu flujo de trabajo. Puedes cambiar o cancelar cuando quieras.
          </p>
        </div>

        <div className="flex w-full max-w-[90rem] flex-col items-center">
          <PlanesFreeCta />
          <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-gray-700/90 bg-[#111]/95 py-2.5 pl-2.5 pr-6 text-base text-gray-300 shadow-sm backdrop-blur-sm">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#b0b0b0] via-[#8a8a8a] to-[#737373] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]"
              aria-hidden
            >
              <Sparkles className="h-5 w-5 text-black" />
            </span>
            <span className="pr-0.5 leading-snug">
              Ahorra hasta 70% vs suscripciones individuales
            </span>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch md:gap-8">
            {planes.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.nombre}
                  className={`relative flex flex-col rounded-2xl border p-8 pt-10 sm:p-9 sm:pt-11 md:p-10 md:pt-12 ${
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
                      <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{plan.nombre}</h2>
                      <p className="mt-1 text-sm leading-snug text-gray-500 sm:text-base">{plan.subtitulo}</p>
                    </div>
                  </div>

                  <div className="mb-6 flex items-baseline gap-0.5">
                    <span className="text-4xl font-bold tracking-tight sm:text-5xl md:text-[3rem]">
                      {plan.precio}
                    </span>
                    <span className="text-base text-gray-500 sm:text-lg">{plan.periodo}</span>
                  </div>

                  <SubscribePlanButton
                    priceTier={plan.priceTier}
                    className={`mb-8 block w-full rounded-xl py-3.5 text-center text-base font-semibold transition-colors ${
                      plan.destacado
                        ? 'bg-[#e5e7eb] text-black hover:bg-white'
                        : 'border border-gray-700 bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]'
                    }`}
                  />

                  <ul className="flex flex-1 flex-col gap-3.5 sm:gap-4">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex gap-3 text-sm leading-snug sm:text-base">
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
