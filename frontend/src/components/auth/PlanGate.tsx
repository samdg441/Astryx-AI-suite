'use client';

import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { canAccessPlan } from '@/lib/planAccess';

type Props = {
  /** Plan mínimo requerido: free | pro | empresarial */
  minPlan: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
};

/**
 * Contenedor de control de acceso por plan (compara con `user.planType` del contexto).
 * El backend sigue siendo la fuente de verdad; esto solo mejora UX en el cliente.
 */
export function PlanGate({ minPlan, children, fallback }: Props) {
  const { user } = useAuth();
  if (!canAccessPlan(user?.planType, minPlan)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
