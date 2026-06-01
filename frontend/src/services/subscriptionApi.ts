import { apiFetch } from '@/lib/apiClient';

export type SubscriptionStatusPayload = {
  planType: string | null;
  subscriptionStatus: string;
  stripeCustomerId: string | null;
};

export type MockPlanTarget = 'free' | 'basico' | 'pro' | 'empresarial';

export function fetchSubscriptionStatus(token: string): Promise<SubscriptionStatusPayload> {
  return apiFetch<SubscriptionStatusPayload>('/subscription/status', { token, auth: true });
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

export function mockActivatePlanRequest(
  token: string,
  targetPlan: MockPlanTarget
): Promise<MockActivateResponse> {
  return apiFetch<MockActivateResponse>('/subscription/mock-activate', {
    method: 'POST',
    token,
    body: { targetPlan },
    auth: true,
  });
}
