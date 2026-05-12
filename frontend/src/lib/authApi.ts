import { getApiBaseUrl } from './apiBase';

export type AccountKind = 'PERSONA' | 'EMPRESA';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  globalRole: string;
  planType: string;
  subscriptionStatus: string;
  stripeCustomerId?: string | null;
};

export type AuthSuccess = {
  user: AuthUser;
  token: string;
};

export type CheckoutPriceTier = 'basico' | 'pro' | 'empresarial';

async function parseJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function formatRegisterError(body: { message?: string; issues?: { path: (string | number)[]; message: string }[] } | null): string {
  if (body?.issues?.length) {
    const first = body.issues[0];
    if (first.path.includes('companyName')) {
      return 'Si eliges empresa, indica el nombre de la empresa (mínimo 2 caracteres).';
    }
    return first.message;
  }
  return body?.message ?? 'Error al registrarse';
}

export async function loginRequest(email: string, password: string): Promise<AuthSuccess> {
  const res = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const body = (await parseJson(res)) as { data?: AuthSuccess; message?: string } | null;
  if (!res.ok) {
    throw new Error(body?.message ?? 'Login failed');
  }
  if (!body?.data?.token || !body.data.user) {
    throw new Error('Invalid response');
  }
  return body.data;
}

export async function registerRequest(
  name: string,
  email: string,
  password: string,
  accountKind: AccountKind,
  companyName?: string | null
): Promise<AuthSuccess> {
  const res = await fetch(`${getApiBaseUrl()}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      accountKind,
      companyName: accountKind === 'EMPRESA' ? companyName?.trim() : undefined,
    }),
  });
  const body = (await parseJson(res)) as {
    data?: AuthSuccess;
    message?: string;
    issues?: { path: (string | number)[]; message: string }[];
  } | null;
  if (!res.ok) {
    throw new Error(formatRegisterError(body));
  }
  if (!body?.data?.token || !body.data.user) {
    throw new Error('Invalid response');
  }
  return body.data;
}

/** Estado de suscripción y plan desde el API (fuente de verdad tras login o webhook). */
export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  const res = await fetch(`${getApiBaseUrl()}/user/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = (await parseJson(res)) as { data?: AuthUser; message?: string } | null;
  if (!res.ok) {
    throw new Error(body?.message ?? 'No se pudo cargar el usuario');
  }
  if (!body?.data) {
    throw new Error('Invalid response');
  }
  return body.data;
}

export async function createCheckoutSessionRequest(
  token: string,
  priceTier: CheckoutPriceTier
): Promise<string> {
  const res = await fetch(`${getApiBaseUrl()}/checkout/create-session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ priceTier }),
  });
  const body = (await parseJson(res)) as { data?: { url: string }; message?: string } | null;
  if (!res.ok) {
    throw new Error(body?.message ?? 'No se pudo iniciar el pago');
  }
  if (!body?.data?.url) {
    throw new Error('Invalid checkout response');
  }
  return body.data.url;
}
