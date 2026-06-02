'use client';

import React from 'react';
import Link from 'next/link';
import { Check, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useMockCheckoutModal } from '@/components/checkout/MockCheckoutContext';
import {
  getPlanInfo,
  isPaidPlan,
  normalizePlanKey,
  type PaidPlan,
  type PlanKey,
} from '@/lib/planCatalog';
import { buttonLinkClass } from '@/lib/buttonClasses';
import { cn } from '@/lib/cn';

const UPGRADE_ORDER: PaidPlan[] = ['basico', 'pro', 'empresarial'];

export function SubscriptionView() {
  const { user } = useAuth();
  const { openCheckout } = useMockCheckoutModal();

  if (!user) {
    return <p className="text-muted text-sm">Inicia sesión para ver tu suscripción.</p>;
  }

  const planKey = normalizePlanKey(user.planType);
  const plan = getPlanInfo(user.planType);
  const activePaid = isPaidPlan(user.planType);

  const nextUpgrade = UPGRADE_ORDER.find((tier) => {
    const ranks: Record<PlanKey, number> = {
      sin_plan: 0,
      free: 0,
      basico: 1,
      pro: 2,
      empresarial: 3,
    };
    return ranks[tier] > ranks[planKey];
  });

  return (
    <div className="space-y-6">
      <div className="account-panel p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-muted text-xs font-semibold uppercase tracking-wider">
              Plan actual
            </p>
            <h2 className="text-heading mt-1 text-2xl font-bold">{plan.label}</h2>
            <p className="text-muted mt-1 text-sm">{plan.tagline}</p>
            {plan.price !== '—' && (
              <p className="text-heading mt-3 text-3xl font-bold tracking-tight">
                {plan.price}
                <span className="text-muted text-lg font-medium">{plan.period}</span>
              </p>
            )}
          </div>
          <div className="flex flex-col items-start gap-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] px-4 py-3 text-sm">
            <span className="text-muted text-xs uppercase tracking-wider">Estado</span>
            <span className="text-heading font-semibold capitalize">{user.subscriptionStatus}</span>
            {user.stripeCustomerId?.startsWith('mock_') && (
              <span className="text-muted text-xs">
                Método simulado: {user.stripeCustomerId.replace('mock_', '').replace('_', ' · ')}
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {!activePaid && nextUpgrade && (
            <button
              type="button"
              className={buttonLinkClass('primary', 'px-6 py-2.5')}
              onClick={() => openCheckout(nextUpgrade, { redirectTo: '/dashboard/suscripcion' })}
            >
              Activar {getPlanInfo(nextUpgrade).label}
            </button>
          )}
          {activePaid && nextUpgrade && (
            <button
              type="button"
              className={buttonLinkClass('primary', 'px-6 py-2.5')}
              onClick={() => openCheckout(nextUpgrade, { redirectTo: '/dashboard/suscripcion' })}
            >
              Mejorar a {getPlanInfo(nextUpgrade).label}
            </button>
          )}
          <Link href="/planes" className={buttonLinkClass('secondary', 'px-6 py-2.5')}>
            Comparar planes
          </Link>
        </div>
      </div>

      <div className="account-panel p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="text-muted h-5 w-5" />
          <h3 className="text-heading text-lg font-semibold">Ventajas de tu plan</h3>
        </div>
        <ul className="space-y-3">
          {plan.features.map((f) => (
            <li key={f.text} className="flex gap-3 text-sm">
              {f.included ? (
                <Check className="text-heading mt-0.5 h-5 w-5 shrink-0" strokeWidth={2.5} />
              ) : (
                <X className="mt-0.5 h-5 w-5 shrink-0 text-[var(--text-faint)]" strokeWidth={2.5} />
              )}
              <span className={cn(f.included ? 'text-body' : 'text-[var(--text-faint)]')}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {planKey !== 'empresarial' && (
        <p className="text-muted text-center text-xs">
          Los pagos son simulados para la entrega académica. En producción se conectará Stripe real.
        </p>
      )}
    </div>
  );
}
