'use client';

import { AccountShell } from '@/components/account/AccountShell';
import { SubscriptionView } from '@/components/account/SubscriptionView';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function SuscripcionPage() {
  useRequireAuth();

  return (
    <AccountShell
      title="Mi suscripción"
      subtitle="Plan activo, estado de facturación y beneficios incluidos"
      activeHref="/dashboard/suscripcion"
    >
      <SubscriptionView />
    </AccountShell>
  );
}
