'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { MockPlanTarget } from '@/services/subscriptionApi';
import { MockPaymentModal } from '@/components/checkout/MockPaymentModal';

type OpenOptions = {
  onSuccess?: () => void;
  redirectTo?: string;
};

type MockCheckoutContextValue = {
  openCheckout: (plan: MockPlanTarget, options?: OpenOptions) => void;
  closeCheckout: () => void;
};

const MockCheckoutContext = createContext<MockCheckoutContextValue | null>(null);

export function MockCheckoutProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<MockPlanTarget>('pro');
  const [options, setOptions] = useState<OpenOptions>({});

  const openCheckout = useCallback((target: MockPlanTarget, opts?: OpenOptions) => {
    setPlan(target);
    setOptions(opts ?? {});
    setOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setOpen(false);
    setOptions({});
  }, []);

  const value = useMemo(
    () => ({ openCheckout, closeCheckout }),
    [openCheckout, closeCheckout]
  );

  return (
    <MockCheckoutContext.Provider value={value}>
      {children}
      <MockPaymentModal
        open={open}
        plan={plan}
        onClose={closeCheckout}
        onSuccess={options.onSuccess}
        redirectTo={options.redirectTo}
      />
    </MockCheckoutContext.Provider>
  );
}

export function useMockCheckoutModal() {
  const ctx = useContext(MockCheckoutContext);
  if (!ctx) {
    throw new Error('useMockCheckoutModal debe usarse dentro de MockCheckoutProvider');
  }
  return ctx;
}
