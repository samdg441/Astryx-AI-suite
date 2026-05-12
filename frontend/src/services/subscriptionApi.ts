import { getApiBaseUrl } from '@/lib/apiBase';

export type SubscriptionStatusPayload = {
  planType: string | null;
  subscriptionStatus: string;
  stripeCustomerId: string | null;
};

export type MockPlanTarget = 'free' | 'basico' | 'pro' | 'empresarial';

async function parseJson(res: Response): Promise<unknown> {
  const t = await res.text();
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}

export async function fetchSubscriptionStatus(token: string): Promise<SubscriptionStatusPayload> {
  const res = await fetch(`${getApiBaseUrl()}/subscription/status`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = (await parseJson(res)) as { data?: SubscriptionStatusPayload; message?: string } | null;
  if (!res.ok) throw new Error(body?.message ?? 'No se pudo leer la suscripción');
  if (!body?.data) throw new Error('Respuesta inválida');
  return body.data;
}

export type MockActivateResponse = {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    globalRole: string;
    planType: string | null;
    subscriptionStatus: string;
    stripeCustomerId?: string | null;
  };
};

export async function mockActivatePlanRequest(token: string, targetPlan: MockPlanTarget): Promise<MockActivateResponse> {
  const res = await fetch(`${getApiBaseUrl()}/subscription/mock-activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ targetPlan }),
  });
  const body = (await parseJson(res)) as { data?: MockActivateResponse; message?: string } | null;
  if (!res.ok) throw new Error(body?.message ?? 'Mock checkout no disponible');
  if (!body?.data?.token || !body.data.user) throw new Error('Respuesta inválida');
  return body.data;
}
