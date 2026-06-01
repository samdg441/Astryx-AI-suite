import { apiFetch } from './apiClient';

export type AccountKind = 'PERSONA' | 'EMPRESA';

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  globalRole: string;
  planType: string | null;
  subscriptionStatus: string;
  stripeCustomerId?: string | null;
};

export type AuthSuccess = {
  user: AuthUser;
  token: string;
};

export type CheckoutPriceTier = 'basico' | 'pro' | 'empresarial';

export function loginRequest(email: string, password: string): Promise<AuthSuccess> {
  return apiFetch<AuthSuccess>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export function registerRequest(
  name: string,
  email: string,
  password: string,
  accountKind: AccountKind,
  companyName?: string | null
): Promise<AuthSuccess> {
  return apiFetch<AuthSuccess>('/auth/register', {
    method: 'POST',
    body: {
      name,
      email,
      password,
      accountKind,
      companyName: accountKind === 'EMPRESA' ? companyName?.trim() : undefined,
    },
  });
}

export function fetchCurrentUser(token: string): Promise<AuthUser> {
  return apiFetch<AuthUser>('/user/me', { token, auth: true });
}

export function createCheckoutSessionRequest(
  token: string,
  priceTier: CheckoutPriceTier
): Promise<string> {
  return apiFetch<{ url: string }>('/checkout/create-session', {
    method: 'POST',
    token,
    body: { priceTier },
    auth: true,
  }).then((data) => data.url);
}

export function chooseFreePlanRequest(token: string): Promise<AuthUser> {
  return apiFetch<AuthUser>('/user/plan/gratis', {
    method: 'POST',
    token,
    auth: true,
  });
}
