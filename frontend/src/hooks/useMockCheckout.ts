'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { getPlanInfo, planLabel } from '@/lib/planCatalog';
import {
  MOCK_CHECKOUT_DELAY_MS,
  parsePaymentMethod,
  sleep,
  type MockPaymentInput,
} from '@/lib/mockCheckout';
import { toast } from '@/lib/toast';
import {
  mockActivatePlanRequest,
  type MockPlanTarget,
} from '@/services/subscriptionApi';

type ProcessOptions = {
  redirectTo?: string;
  onSuccess?: () => void;
};

export function useMockCheckout() {
  const { token, setSession } = useAuth();
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const processPayment = useCallback(
    async (plan: MockPlanTarget, payment: MockPaymentInput, options?: ProcessOptions) => {
      if (!token) {
        router.push(`/auth?redirect=${encodeURIComponent('/planes')}`);
        return { ok: false as const, error: 'Debes iniciar sesión.' };
      }

      const method = parsePaymentMethod(payment);
      if (!method) {
        return { ok: false as const, error: 'No se pudo leer la tarjeta.' };
      }

      setProcessing(true);
      const toastId = toast.loading('Procesando pago seguro…');

      try {
        await sleep(MOCK_CHECKOUT_DELAY_MS);
        const { token: newToken, user } = await mockActivatePlanRequest(token, plan, method);
        setSession({ token: newToken, user });
        toast.dismiss(toastId);

        const label = plan === 'free' ? planLabel(plan) : getPlanInfo(plan).label;
        toast.success('¡Pago confirmado!', {
          description: `Plan ${label} activado. Tus herramientas premium ya están disponibles.`,
        });

        options?.onSuccess?.();
        const dest = options?.redirectTo ?? '/dashboard';
        router.push(dest);
        router.refresh();

        return { ok: true as const };
      } catch (e) {
        toast.dismiss(toastId);
        const message = e instanceof Error ? e.message : 'No se pudo completar el pago';
        toast.error('Error en el pago', { description: message });
        return { ok: false as const, error: message };
      } finally {
        setProcessing(false);
      }
    },
    [token, setSession, router]
  );

  return { processPayment, processing };
}
