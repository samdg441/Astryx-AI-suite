'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { loginRequest, registerRequest, type AccountKind } from '@/lib/authApi';
import { useAuth } from './AuthContext';

/** Textura opcional: coloca p. ej. `metal-liquid.png` en `/public` y define `NEXT_PUBLIC_AUTH_METAL_BG=/metal-liquid.png` en `.env.local`. Si no hay imagen, solo se usan gradientes (parecido mercurio). */
const METAL_TEXTURE_URL = process.env.NEXT_PUBLIC_AUTH_METAL_BG?.trim() || '';

/** Fondo “metal líquido” sin imagen: pliegues claros + valles oscuros (CSS puro). */
const liquidMetalStyle: React.CSSProperties = {
  backgroundColor: '#101014',
  backgroundImage: `
    radial-gradient(ellipse 100% 58% at 50% -8%, rgba(255,255,255,0.26), transparent 52%),
    radial-gradient(ellipse 52% 40% at 6% 38%, rgba(255,255,255,0.14), transparent 58%),
    radial-gradient(ellipse 48% 38% at 94% 32%, rgba(230,235,245,0.11), transparent 55%),
    radial-gradient(ellipse 130% 95% at 50% 108%, rgba(0,0,0,0.72), transparent 46%),
    linear-gradient(162deg, #15161c 0%, #3a3d46 14%, #6f737d 30%, #2e3138 46%, #9ea4ae 58%, #25262d 76%, #0c0d10 100%)
  `,
};

const primaryCta =
  'mt-auto w-full rounded-lg bg-[#cfcfcf] py-3.5 text-center text-base font-semibold text-black transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60';

/** Sobre metal: negro mate + texto blanco (no se pierde sobre el brillo). */
const overlaySecondaryCta =
  'rounded-lg border border-white/15 bg-black px-8 py-3.5 text-center text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_28px_-8px_rgba(0,0,0,0.75)] transition hover:border-white/25 hover:bg-zinc-950';

const formShellBase =
  'flex h-full min-h-[560px] flex-1 flex-col overflow-hidden bg-[#111] px-8 py-12 text-white sm:px-10 md:px-12';

/** Evita redirecciones abiertas: solo rutas relativas del mismo sitio. */
function safeInternalPath(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const path = decodeURIComponent(raw.trim());
    if (!path.startsWith('/') || path.startsWith('//')) return null;
    if (path.includes('://')) return null;
    return path;
  } catch {
    return null;
  }
}

/**
 * Tras login/registro: `?redirect=` interna; si no, sin plan elegido → /planes;
 * con plan (free o de pago) → /dashboard (experiencia tipo ChatGPT).
 */
function postLoginDestination(planType: string | null | undefined, redirectParam: string | null): string {
  const custom = safeInternalPath(redirectParam);
  if (custom) return custom;
  if (planType === null || planType === undefined || planType === "" || planType === "sin_plan") {
    return "/planes";
  }
  return "/dashboard";
}

function mapError(err: unknown): string {
  if (err instanceof TypeError) {
    return 'No se pudo conectar con el servidor. Comprueba que la API esté en ejecución.';
  }
  if (err instanceof Error) {
    if (err.message === 'Failed to fetch') {
      return 'No se pudo conectar con el servidor. Comprueba que la API esté en ejecución.';
    }
    if (err.message === 'Invalid email or password') {
      return 'Correo o contraseña incorrectos.';
    }
    if (err.message === 'Email already registered') {
      return 'Este correo ya está registrado.';
    }
    return err.message;
  }
  return 'Ha ocurrido un error. Inténtalo de nuevo.';
}

function FloatingField({
  id,
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  disabled,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer block w-full appearance-none rounded-lg border border-gray-800 bg-[#0a0a0a] px-3 pb-3 pt-7 text-base text-white outline-none transition focus:border-gray-600 focus:ring-0 disabled:opacity-60"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-2.5 z-10 origin-[0] -translate-y-3 scale-75 transform text-sm text-gray-400 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}

function SocialRow() {
  return (
    <div className="mb-7 flex justify-center gap-3">
      {[
        { label: 'Facebook', char: 'f' },
        { label: 'Google', char: 'G' },
        { label: 'LinkedIn', char: 'in' },
      ].map((s) => (
        <button
          key={s.label}
          type="button"
          aria-label={s.label}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-800 bg-gradient-to-br from-[#9a9a9a] to-[#6a6a6a] text-sm font-semibold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition hover:brightness-110"
        >
          {s.char}
        </button>
      ))}
    </div>
  );
}

/** Panel lateral: metal líquido (CSS) + textura opcional + vineta para legibilidad. */
function LiquidMetalPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-[560px] flex-1 flex-col items-stretch justify-stretch overflow-hidden"
      style={liquidMetalStyle}
    >
      {METAL_TEXTURE_URL ? (
        <img
          alt=""
          aria-hidden
          src={METAL_TEXTURE_URL}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.32] mix-blend-soft-light"
        />
      ) : null}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/45" aria-hidden />
      <div className="relative z-10 flex min-h-[560px] flex-1 flex-col items-center justify-center px-8 py-14 text-center sm:px-10 md:px-12">
        {children}
      </div>
    </div>
  );
}

export function AuthPagePanels() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpAccountKind, setSignUpAccountKind] = useState<AccountKind>('PERSONA');
  const [signUpCompanyName, setSignUpCompanyName] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await loginRequest(signInEmail, signInPassword);
      setSession(data);
      setSignInPassword('');
      router.push(postLoginDestination(data.user.planType, searchParams.get('redirect')));
      router.refresh();
    } catch (err) {
      setError(mapError(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await registerRequest(
        signUpName,
        signUpEmail,
        signUpPassword,
        signUpAccountKind,
        signUpAccountKind === 'EMPRESA' ? signUpCompanyName : null
      );
      setSession(data);
      setSignUpPassword('');
      setSignUpCompanyName('');
      router.push(postLoginDestination(data.user.planType, searchParams.get('redirect')));
      router.refresh();
    } catch (err) {
      setError(mapError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full max-w-[min(98vw,1280px)] flex-col items-stretch gap-5">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-base text-gray-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <div
        className="relative w-full overflow-hidden rounded-2xl border border-gray-800 bg-[#111] shadow-none"
        role="region"
        aria-label="Cuenta Astryx AI Suite"
      >
        {error && (
          <div className="absolute left-1/2 top-3 z-30 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 rounded-lg border border-gray-700 bg-[#161616] px-3 py-2 text-center text-xs text-gray-200">
            {error}
          </div>
        )}

        <div className={`relative w-full overflow-hidden ${error ? 'pt-14 md:pt-16' : ''}`}>
          <motion.div
            className="flex w-[200%] bg-[#111]"
            animate={{ x: isSignUp ? '-50%' : '0%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            {/* Vista: iniciar sesión */}
            <div className="flex w-1/2 min-w-[50%] flex-col md:flex-row">
              <div className={`${formShellBase} border-b border-gray-800 md:border-b-0 md:border-r md:border-gray-800`}>
                <h2 className="mb-3 text-center text-3xl font-bold text-white sm:text-4xl">Iniciar sesión</h2>
                <SocialRow />
                <p className="mb-7 text-center text-sm text-gray-500">o usa tu cuenta</p>
                <form onSubmit={handleSignIn} className="flex flex-1 flex-col gap-5">
                  <FloatingField
                    id="signin-email"
                    label="Correo electrónico"
                    type="email"
                    autoComplete="email"
                    value={signInEmail}
                    onChange={setSignInEmail}
                    disabled={loading}
                  />
                  <FloatingField
                    id="signin-password"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    value={signInPassword}
                    onChange={setSignInPassword}
                    disabled={loading}
                  />
                  <a
                    href="#"
                    className="text-sm text-gray-500 underline-offset-2 hover:text-gray-300 hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                  <button type="submit" disabled={loading} className={primaryCta}>
                    Iniciar sesión
                  </button>
                </form>
              </div>
              <LiquidMetalPanel>
                <h3 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">¡Hola, amigo!</h3>
                <p className="mb-10 max-w-sm text-base leading-relaxed text-gray-200">
                  Introduce tus datos y comienza tu viaje con nosotros
                </p>
                <button
                  type="button"
                  className={overlaySecondaryCta}
                  onClick={() => {
                    setError(null);
                    setSignUpAccountKind('PERSONA');
                    setSignUpCompanyName('');
                    setIsSignUp(true);
                  }}
                >
                  Crear cuenta
                </button>
              </LiquidMetalPanel>
            </div>

            {/* Vista: registro */}
            <div className="flex w-1/2 min-w-[50%] flex-col md:flex-row">
              <LiquidMetalPanel>
                <h3 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">¡Bienvenido de nuevo!</h3>
                <p className="mb-10 max-w-sm text-base leading-relaxed text-gray-200">
                  Para mantenerte conectado, inicia sesión con tu información personal
                </p>
                <button
                  type="button"
                  className={overlaySecondaryCta}
                  onClick={() => {
                    setError(null);
                    setIsSignUp(false);
                  }}
                >
                  Iniciar sesión
                </button>
              </LiquidMetalPanel>
              <div className={`${formShellBase} border-t border-gray-800 md:border-l md:border-t-0 md:border-gray-800`}>
                <h2 className="mb-3 text-center text-3xl font-bold text-white sm:text-4xl">Crear cuenta</h2>
                <p className="mb-4 text-center text-sm text-gray-500">Elige cómo usarás Astryx AI Suite</p>
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setSignUpAccountKind('PERSONA');
                      setSignUpCompanyName('');
                      setError(null);
                    }}
                    className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                      signUpAccountKind === 'PERSONA'
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-gray-700 bg-[#0a0a0a] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Persona
                    <span className="mt-1 block text-[11px] font-normal text-gray-500">Freelancer o particular</span>
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setSignUpAccountKind('EMPRESA')}
                    className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${
                      signUpAccountKind === 'EMPRESA'
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-gray-700 bg-[#0a0a0a] text-gray-400 hover:border-gray-600'
                    }`}
                  >
                    Empresa
                    <span className="mt-1 block text-[11px] font-normal text-gray-500">Equipo u organización</span>
                  </button>
                </div>
                <SocialRow />
                <p className="mb-7 text-center text-sm text-gray-500">o usa tu correo para registrarte</p>
                <form onSubmit={handleSignUp} className="flex flex-1 flex-col gap-5">
                  {signUpAccountKind === 'EMPRESA' && (
                    <FloatingField
                      id="signup-company"
                      label="Nombre de la empresa"
                      type="text"
                      autoComplete="organization"
                      value={signUpCompanyName}
                      onChange={setSignUpCompanyName}
                      disabled={loading}
                    />
                  )}
                  <FloatingField
                    id="signup-name"
                    label="Nombre"
                    type="text"
                    autoComplete="name"
                    value={signUpName}
                    onChange={setSignUpName}
                    disabled={loading}
                  />
                  <FloatingField
                    id="signup-email"
                    label="Correo electrónico"
                    type="email"
                    autoComplete="email"
                    value={signUpEmail}
                    onChange={setSignUpEmail}
                    disabled={loading}
                  />
                  <FloatingField
                    id="signup-password"
                    label="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    value={signUpPassword}
                    onChange={setSignUpPassword}
                    disabled={loading}
                  />
                  <button type="submit" disabled={loading} className={primaryCta}>
                    Registrarse
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
