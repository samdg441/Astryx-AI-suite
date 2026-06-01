'use client';

import React, { FormEvent, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin } from 'lucide-react';
import { buttonLinkClass } from '@/lib/buttonClasses';
import { submitContactLead } from '@/lib/contactApi';
import { toast } from '@/lib/toast';

type FieldErrors = Partial<Record<'nombre' | 'correo' | 'mensaje', string>>;

export default function ContactoPage() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (nombre.trim().length < 2) errors.nombre = 'Indica tu nombre (mínimo 2 caracteres).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      errors.correo = 'Correo no válido.';
    }
    if (mensaje.trim().length < 10) {
      errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }
    return errors;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await submitContactLead({
        name: nombre.trim(),
        email: correo.trim(),
        message: mensaje.trim(),
      });
      toast.success('Mensaje enviado. Te responderemos pronto.');
      setNombre('');
      setCorreo('');
      setMensaje('');
      setFieldErrors({});
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'No se pudo enviar el mensaje');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen w-full flex-1 flex-col bg-transparent">
      <Navbar />

      <div className="flex flex-1 flex-col items-center px-5 pb-16 pt-24 sm:px-8 md:px-10">
        <div className="mb-12 max-w-4xl text-center">
          <h1 className="text-heading mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Contacto
          </h1>
          <p className="text-muted text-lg sm:text-xl md:text-2xl">
            Escríbenos para demos, facturación o soporte. Respondemos en horario laboral.
          </p>
        </div>

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="glass-panel space-y-6 p-8">
            <h2 className="text-heading text-xl font-bold">Datos de contacto</h2>
            <div className="text-body flex gap-4">
              <Mail className="text-muted mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-muted mb-1 text-sm">Correo</p>
                <a
                  href="mailto:contacto@astryx.ai"
                  className="text-heading transition-colors hover:text-[var(--accent-violet)]"
                >
                  contacto@astryx.ai
                </a>
              </div>
            </div>
            <div className="text-body flex gap-4">
              <MapPin className="text-muted mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-muted mb-1 text-sm">Oficina</p>
                <p className="text-sm leading-relaxed">
                  Operaciones remotas con cobertura en Latinoamérica.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-4 p-8">
            <h2 className="text-heading mb-2 text-xl font-bold">Enviar mensaje</h2>
            <label className="text-muted text-sm">
              Nombre
              <input
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                  setFieldErrors((f) => ({ ...f, nombre: undefined }));
                }}
                type="text"
                required
                placeholder="Tu nombre"
                className="form-input"
                aria-invalid={!!fieldErrors.nombre}
              />
              {fieldErrors.nombre && (
                <span className="mt-1 block text-xs text-rose-400">{fieldErrors.nombre}</span>
              )}
            </label>
            <label className="text-muted text-sm">
              Correo
              <input
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value);
                  setFieldErrors((f) => ({ ...f, correo: undefined }));
                }}
                type="email"
                required
                placeholder="tu@correo.com"
                className="form-input"
                aria-invalid={!!fieldErrors.correo}
              />
              {fieldErrors.correo && (
                <span className="mt-1 block text-xs text-rose-400">{fieldErrors.correo}</span>
              )}
            </label>
            <label className="text-muted text-sm">
              Mensaje
              <textarea
                value={mensaje}
                onChange={(e) => {
                  setMensaje(e.target.value);
                  setFieldErrors((f) => ({ ...f, mensaje: undefined }));
                }}
                required
                rows={5}
                placeholder="Cuéntanos en qué podemos ayudarte"
                className="form-input min-h-[120px] resize-y"
                aria-invalid={!!fieldErrors.mensaje}
              />
              {fieldErrors.mensaje && (
                <span className="mt-1 block text-xs text-rose-400">{fieldErrors.mensaje}</span>
              )}
            </label>
            <button
              type="submit"
              disabled={loading}
              className={buttonLinkClass('primary', 'mt-2 py-3 disabled:opacity-60')}
            >
              {loading ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
