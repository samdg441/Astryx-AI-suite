'use client';

import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { canAccessPlan } from '@/lib/planAccess';

type Props = {
  minPlan: string;
  children: React.ReactNode;
  fallback: React.ReactNode;
};

export function PlanGate({ minPlan, children, fallback }: Props) {
  const { user } = useAuth();
  if (!canAccessPlan(user?.planType, minPlan)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
