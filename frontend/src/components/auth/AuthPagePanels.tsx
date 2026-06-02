'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { loginRequest, registerRequest, type AccountKind } from '@/lib/authApi';
import { ApiRequestError } from '@/lib/apiClient';
import {
  mapSignInIssues,
  mapSignUpIssues,
  validateSignInClient,
  validateSignUpClient,
  type SignInFieldErrors,
  type SignUpFieldErrors,
} from '@/lib/authFieldErrors';
import { useAuth } from '@/hooks/useAuth';
import { buttonLinkClass } from '@/lib/buttonClasses';

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

function postLoginDestination(planType: string | null | undefined, redirectParam: string | null): string {
  const custom = safeInternalPath(redirectParam);
  if (custom) return custom;
  if (planType === null || planType === undefined || planType === '' || planType === 'sin_plan') {
    return '/planes';
  }
  return '/dashboard';
}

function mapNetworkError(err: unknown): string {
  if (err instanceof TypeError) {
    return 'No se pudo conectar con el servidor. Comprueba que la API esté en ejecución.';
  }
  if (err instanceof Error) {
    if (err.message === 'Failed to fetch') {
      return 'No se pudo conectar con el servidor. Comprueba que la API esté en ejecución.';
    }
    if (err instanceof ApiRequestError) {
      if (err.message === 'Invalid email or password') {
        return 'Correo o contraseña incorrectos.';
      }
      if (err.message === 'Email already registered') {
        return 'Este correo ya está registrado.';
      }
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
  error,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  error?: string;
}) {
  return (
    <div className="auth-field-wrap">
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={`auth-field ${error ? 'border-rose-400/70 ring-1 ring-rose-400/30' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id} className="auth-field-label">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-400" role="alert">
          {error}
        </p>
      )}
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
        <button key={s.label} type="button" aria-label={s.label} className="auth-social-btn">
          {s.char}
        </button>
      ))}
    </div>
  );
}

function PromoPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-promo-panel">
      <div className="auth-promo-inner">{children}</div>
    </div>
  );
}

export function AuthPagePanels() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession, token, user, isHydrated } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [signInErrors, setSignInErrors] = useState<SignInFieldErrors>({});
  const [signUpErrors, setSignUpErrors] = useState<SignUpFieldErrors>({});

  useEffect(() => {
    if (!isHydrated || !token || !user) return;
    router.replace(postLoginDestination(user.planType, searchParams.get('redirect')));
    router.refresh();
  }, [isHydrated, token, user, router, searchParams]);

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpAccountKind, setSignUpAccountKind] = useState<AccountKind>('PERSONA');
  const [signUpCompanyName, setSignUpCompanyName] = useState('');

  function clearSignInField(key: keyof SignInFieldErrors) {
    setSignInErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function clearSignUpField(key: keyof SignUpFieldErrors) {
    setSignUpErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const clientErrors = validateSignInClient(signInEmail, signInPassword);
    setSignInErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setLoading(true);
    try {
      const data = await loginRequest(signInEmail, signInPassword);
      setSession(data);
      setSignInPassword('');
      setSignInErrors({});
      router.push(postLoginDestination(data.user.planType, searchParams.get('redirect')));
      router.refresh();
    } catch (err) {
      if (err instanceof ApiRequestError && err.issues?.length) {
        setSignInErrors(mapSignInIssues(err.issues));
      } else if (err instanceof ApiRequestError && err.status === 401) {
        setSignInErrors({
          email: 'Correo o contraseña incorrectos.',
          password: 'Correo o contraseña incorrectos.',
        });
      } else {
        setFormError(mapNetworkError(err));
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const clientErrors = validateSignUpClient(
      signUpName,
      signUpEmail,
      signUpPassword,
      signUpAccountKind,
      signUpCompanyName
    );
    setSignUpErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

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
      setSignUpErrors({});
      router.push(postLoginDestination(data.user.planType, searchParams.get('redirect')));
      router.refresh();
    } catch (err) {
      if (err instanceof ApiRequestError && err.issues?.length) {
        setSignUpErrors(mapSignUpIssues(err.issues));
      } else if (err instanceof ApiRequestError && err.status === 409) {
        setSignUpErrors({ email: 'Este correo ya está registrado.' });
      } else {
        setFormError(mapNetworkError(err));
      }
    } finally {
      setLoading(false);
    }
  }

  const promoCtaClass = buttonLinkClass('secondary', 'auth-promo-cta px-8 py-3.5 text-base');
  const hasBanner = Boolean(formError);

  return (
    <div className="flex w-full max-w-[min(98vw,1280px)] flex-col items-stretch gap-5">
      <Link href="/" className="auth-back-link inline-flex w-fit items-center gap-2 text-base">
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </Link>

      <div className="auth-card" role="region" aria-label="Cuenta Astryx AI Suite">
        {formError && <div className="auth-error-banner">{formError}</div>}

        <div className={`relative w-full overflow-hidden ${hasBanner ? 'pt-14 md:pt-16' : ''}`}>
          <motion.div
            className="auth-slider-track"
            animate={{ x: isSignUp ? '-50%' : '0%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            <div className="flex w-1/2 min-w-[50%] flex-col md:flex-row">
              <div className="auth-form-panel border-b border-[var(--border-default)] md:border-b-0 md:border-r">
                <h2 className="auth-form-title">Iniciar sesión</h2>
                <SocialRow />
                <p className="auth-form-sub">o usa tu cuenta</p>
                <form onSubmit={handleSignIn} className="flex flex-1 flex-col gap-5" noValidate>
                  <FloatingField
                    id="signin-email"
                    label="Correo electrónico"
                    type="email"
                    autoComplete="email"
                    value={signInEmail}
                    onChange={(v) => {
                      setSignInEmail(v);
                      clearSignInField('email');
                    }}
                    disabled={loading}
                    error={signInErrors.email}
                  />
                  <FloatingField
                    id="signin-password"
                    label="Contraseña"
                    type="password"
                    autoComplete="current-password"
                    value={signInPassword}
                    onChange={(v) => {
                      setSignInPassword(v);
                      clearSignInField('password');
                    }}
                    disabled={loading}
                    error={signInErrors.password}
                  />
                  <a
                    href="#"
                    className="text-sm text-[var(--text-muted)] underline-offset-2 hover:text-[var(--text-heading)] hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                  <button
                    type="submit"
                    disabled={loading}
                    className={buttonLinkClass('primary', 'mt-auto w-full py-3.5 text-base')}
                  >
                    Iniciar sesión
                  </button>
                </form>
              </div>
              <PromoPanel>
                <h3 className="auth-promo-title">¡Hola, amigo!</h3>
                <p className="auth-promo-text">
                  Introduce tus datos y comienza tu viaje con nosotros
                </p>
                <button
                  type="button"
                  className={promoCtaClass}
                  onClick={() => {
                    setFormError(null);
                    setSignInErrors({});
                    setSignUpAccountKind('PERSONA');
                    setSignUpCompanyName('');
                    setIsSignUp(true);
                  }}
                >
                  Crear cuenta
                </button>
              </PromoPanel>
            </div>

            <div className="flex w-1/2 min-w-[50%] flex-col md:flex-row">
              <PromoPanel>
                <h3 className="auth-promo-title">¡Bienvenido de nuevo!</h3>
                <p className="auth-promo-text">
                  Para mantenerte conectado, inicia sesión con tu información personal
                </p>
                <button
                  type="button"
                  className={promoCtaClass}
                  onClick={() => {
                    setFormError(null);
                    setSignUpErrors({});
                    setIsSignUp(false);
                  }}
                >
                  Iniciar sesión
                </button>
              </PromoPanel>
              <div className="auth-form-panel border-t border-[var(--border-default)] md:border-l md:border-t-0">
                <h2 className="auth-form-title">Crear cuenta</h2>
                <p className="auth-form-sub">Elige cómo usarás Astryx AI Suite</p>
                <div className="mb-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setSignUpAccountKind('PERSONA');
                      setSignUpCompanyName('');
                      setFormError(null);
                      clearSignUpField('companyName');
                    }}
                    className={`auth-segment-btn ${
                      signUpAccountKind === 'PERSONA'
                        ? 'auth-segment-btn--active'
                        : 'auth-segment-btn--idle'
                    }`}
                  >
                    Persona
                    <span className="mt-1 block text-[11px] font-normal opacity-80">
                      Freelancer o particular
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setSignUpAccountKind('EMPRESA')}
                    className={`auth-segment-btn ${
                      signUpAccountKind === 'EMPRESA'
                        ? 'auth-segment-btn--active'
                        : 'auth-segment-btn--idle'
                    }`}
                  >
                    Empresa
                    <span className="mt-1 block text-[11px] font-normal opacity-80">
                      Equipo u organización
                    </span>
                  </button>
                </div>
                <SocialRow />
                <p className="auth-form-sub">o usa tu correo para registrarte</p>
                <form onSubmit={handleSignUp} className="flex flex-1 flex-col gap-5" noValidate>
                  {signUpAccountKind === 'EMPRESA' && (
                    <FloatingField
                      id="signup-company"
                      label="Nombre de la empresa"
                      type="text"
                      autoComplete="organization"
                      value={signUpCompanyName}
                      onChange={(v) => {
                        setSignUpCompanyName(v);
                        clearSignUpField('companyName');
                      }}
                      disabled={loading}
                      error={signUpErrors.companyName}
                    />
                  )}
                  <FloatingField
                    id="signup-name"
                    label="Nombre"
                    type="text"
                    autoComplete="name"
                    value={signUpName}
                    onChange={(v) => {
                      setSignUpName(v);
                      clearSignUpField('name');
                    }}
                    disabled={loading}
                    error={signUpErrors.name}
                  />
                  <FloatingField
                    id="signup-email"
                    label="Correo electrónico"
                    type="email"
                    autoComplete="email"
                    value={signUpEmail}
                    onChange={(v) => {
                      setSignUpEmail(v);
                      clearSignUpField('email');
                    }}
                    disabled={loading}
                    error={signUpErrors.email}
                  />
                  <FloatingField
                    id="signup-password"
                    label="Contraseña"
                    type="password"
                    autoComplete="new-password"
                    value={signUpPassword}
                    onChange={(v) => {
                      setSignUpPassword(v);
                      clearSignUpField('password');
                    }}
                    disabled={loading}
                    error={signUpErrors.password}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={buttonLinkClass('primary', 'mt-auto w-full py-3.5 text-base')}
                  >
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
