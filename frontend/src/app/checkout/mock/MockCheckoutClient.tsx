'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MockPaymentModal } from '@/components/checkout/MockPaymentModal';
import type { MockPlanTarget } from '@/services/subscriptionApi';

export function MockCheckoutClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const raw = (searchParams.get('plan') ?? 'pro').toLowerCase();
  const plan = (['basico', 'pro', 'empresarial'].includes(raw) ? raw : 'pro') as MockPlanTarget;

  useEffect(() => {
    if (!['basico', 'pro', 'empresarial'].includes(raw)) {
      router.replace('/checkout/mock?plan=pro');
    }
  }, [raw, router]);

  return (
    <MockPaymentModal
      open
      plan={plan}
      onClose={() => router.push('/planes')}
      redirectTo="/dashboard"
    />
  );
}
