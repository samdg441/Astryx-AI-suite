'use client';

import React, { FormEvent, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin } from 'lucide-react';

export default function ContactoPage() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta desde la web — ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`
    );
    window.location.href = `mailto:contacto@astryx.ai?subject=${subject}&body=${body}`;
  }

  return (
    <main className="w-full flex-1 flex flex-col min-h-screen bg-transparent text-white relative">
      <Navbar />

      <div className="flex flex-1 flex-col items-center px-5 pb-16 pt-24 sm:px-8 md:px-10">
        <div className="mb-12 max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">Contacto</h1>
          <p className="text-lg text-gray-400 sm:text-xl md:text-2xl">
            Escríbenos para demos, facturación o soporte. Respondemos en horario laboral.
          </p>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Datos de contacto</h2>
            <div className="flex gap-4 text-gray-300">
              <Mail className="w-5 h-5 shrink-0 mt-0.5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Correo</p>
                <a href="mailto:contacto@astryx.ai" className="hover:text-white transition-colors">
                  contacto@astryx.ai
                </a>
              </div>
            </div>
            <div className="flex gap-4 text-gray-300">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500 mb-1">Oficina</p>
                <p className="text-sm leading-relaxed">
                  Operaciones remotas con cobertura en Latinoamérica.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#111] border border-gray-800 rounded-2xl p-8 flex flex-col gap-4"
          >
            <h2 className="text-xl font-bold mb-2">Enviar mensaje</h2>
            <label className="text-sm text-gray-400">
              Nombre
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                required
                placeholder="Tu nombre"
                className="mt-1 w-full rounded-lg bg-[#0a0a0a] border border-gray-800 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-600"
              />
            </label>
            <label className="text-sm text-gray-400">
              Correo
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                type="email"
                required
                placeholder="tu@correo.com"
                className="mt-1 w-full rounded-lg bg-[#0a0a0a] border border-gray-800 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-600"
              />
            </label>
            <label className="text-sm text-gray-400">
              Mensaje
              <textarea
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
                rows={5}
                placeholder="Cuéntanos en qué podemos ayudarte"
                className="mt-1 w-full rounded-lg bg-[#0a0a0a] border border-gray-800 px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-600 resize-y min-h-[120px]"
              />
            </label>
            <button
              type="submit"
              className="mt-2 bg-[#cfcfcf] hover:bg-white text-black font-semibold py-3 rounded-lg transition-colors"
            >
              Abrir cliente de correo
            </button>
            <p className="text-xs text-gray-500">
              Se abrirá tu aplicación de correo con el mensaje. Si prefieres, escribe directamente a{' '}
              <a href="mailto:contacto@astryx.ai" className="text-gray-300 hover:text-white underline">
                contacto@astryx.ai
              </a>
              .
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
