import type { CheckoutPriceTier } from '@/lib/authApi';
import type { MockPlanTarget } from '@/services/subscriptionApi';

export type PaidPlan = CheckoutPriceTier;
export type PlanKey = MockPlanTarget | 'sin_plan';

export type PlanFeature = { text: string; included: boolean };

export type PlanInfo = {
  label: string;
  price: string;
  period: string;
  tagline: string;
  features: PlanFeature[];
};

const FREE_FEATURES: PlanFeature[] = [
  { text: 'Herramientas con plan Gratis', included: true },
  { text: 'Chat IA con límite diario', included: true },
  { text: 'Panel de desarrollo', included: true },
  { text: 'IAs premium (Básico en adelante)', included: false },
  { text: 'Consultas ilimitadas', included: false },
  { text: 'API e integraciones', included: false },
];

const SIN_PLAN_FEATURES: PlanFeature[] = [
  { text: 'Elige un plan para desbloquear IAs', included: false },
  { text: 'Acceso al panel de desarrollo', included: true },
  { text: 'Checkout simulado para demos', included: true },
  { text: 'Herramientas premium', included: false },
];

export const PLAN_CATALOG: Record<PlanKey, PlanInfo> = {
  sin_plan: {
    label: 'Sin plan',
    price: '—',
    period: '',
    tagline: 'Selecciona un plan para activar tus herramientas',
    features: SIN_PLAN_FEATURES,
  },
  free: {
    label: 'Gratuito',
    price: '$0',
    period: '',
    tagline: 'Empieza a explorar Astryx sin costo',
    features: FREE_FEATURES,
  },
  basico: {
    label: 'Básico',
    price: '$19',
    period: '/mes',
    tagline: 'Ideal para emprendedores y freelancers',
    features: [
      { text: 'Acceso a 5 IAs premium', included: true },
      { text: '100 consultas/día', included: true },
      { text: 'Chat IA avanzado', included: true },
      { text: 'Generador de imágenes (50/mes)', included: true },
      { text: 'Asistente de programación básico', included: true },
      { text: 'Soporte por email', included: true },
      { text: 'API access', included: false },
      { text: 'Integraciones empresariales', included: false },
    ],
  },
  pro: {
    label: 'Pro',
    price: '$49',
    period: '/mes',
    tagline: 'La opción más popular para profesionales',
    features: [
      { text: 'Acceso a todas las IAs premium', included: true },
      { text: 'Consultas ilimitadas', included: true },
      { text: 'Chat IA avanzado sin límites', included: true },
      { text: 'Generador de imágenes ilimitado', included: true },
      { text: 'Asistente de programación completo', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'API access', included: true },
      { text: 'Integraciones empresariales', included: false },
    ],
  },
  empresarial: {
    label: 'Empresarial',
    price: '$149',
    period: '/mes',
    tagline: 'Solución completa para equipos y empresas',
    features: [
      { text: 'Todo lo incluido en Pro', included: true },
      { text: 'Usuarios ilimitados', included: true },
      { text: 'Panel de administración', included: true },
      { text: 'Analytics y reportes avanzados', included: true },
      { text: 'Integraciones empresariales', included: true },
      { text: 'Soporte dedicado 24/7', included: true },
      { text: 'API Premium con mayor tasa', included: true },
      { text: 'SLA del 99.9%', included: true },
    ],
  },
};

export function normalizePlanKey(plan: string | null | undefined): PlanKey {
  if (!plan || plan === '' || plan === 'sin_plan') return 'sin_plan';
  if (plan in PLAN_CATALOG) return plan as PlanKey;
  return 'sin_plan';
}

export function getPlanInfo(plan: string | null | undefined): PlanInfo {
  return PLAN_CATALOG[normalizePlanKey(plan)];
}

export function toMockPlanTarget(tier: CheckoutPriceTier | MockPlanTarget): MockPlanTarget {
  return tier as MockPlanTarget;
}

export function planLabel(plan: string): string {
  return getPlanInfo(plan).label;
}

export function isPaidPlan(plan: string | null | undefined): boolean {
  const key = normalizePlanKey(plan);
  return key === 'basico' || key === 'pro' || key === 'empresarial';
}
