import type { CheckoutPriceTier } from '@/lib/authApi';
import type { MockPlanTarget } from '@/services/subscriptionApi';

export type PaidPlan = CheckoutPriceTier;

export const PLAN_DETAILS: Record<
  PaidPlan,
  { label: string; price: string; period: string; tagline: string }
> = {
  basico: {
    label: 'Básico',
    price: '$19',
    period: '/mes',
    tagline: 'Ideal para emprendedores y freelancers',
  },
  pro: {
    label: 'Pro',
    price: '$49',
    period: '/mes',
    tagline: 'La opción más popular para profesionales',
  },
  empresarial: {
    label: 'Empresarial',
    price: '$149',
    period: '/mes',
    tagline: 'Solución completa para equipos y empresas',
  },
};

export function toMockPlanTarget(tier: CheckoutPriceTier | MockPlanTarget): MockPlanTarget {
  return tier as MockPlanTarget;
}

export function planLabel(plan: string): string {
  const key = plan.toLowerCase() as PaidPlan;
  if (key in PLAN_DETAILS) return PLAN_DETAILS[key].label;
  if (plan === 'free') return 'Gratuito';
  return plan;
}
