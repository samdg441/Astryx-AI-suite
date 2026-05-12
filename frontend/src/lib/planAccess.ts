export type PlanType = 'free' | 'pro' | 'empresarial';

const RANK: Record<string, number> = {
  free: 0,
  pro: 1,
  empresarial: 2,
};

export function planRank(plan: string | undefined | null): number {
  if (!plan) return 0;
  return RANK[plan] ?? 0;
}

/** true si el plan del usuario alcanza el mínimo exigido por la herramienta */
export function canAccessPlan(userPlan: string | undefined | null, requiredPlan: string | undefined | null): boolean {
  const req = requiredPlan ?? 'free';
  return planRank(userPlan) >= planRank(req);
}
