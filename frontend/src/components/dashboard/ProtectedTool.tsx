'use client';

import React from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { canAccessPlan } from '@/lib/planAccess';
import { useDashboardStore } from '@/store/useDashboardStore';
import type { ToolMinPlan } from '@/lib/dashboard/sidebarCatalog';

type Props = {
  minPlan: ToolMinPlan;
  toolName: string;
  children: React.ReactNode;
};

export function ProtectedTool({ minPlan, toolName, children }: Props) {
  const { user } = useAuth();
  const openPremium = useDashboardStore((s) => s.openPremiumModal);

  return (
    <div
      role="presentation"
      onClickCapture={(e) => {
        if (!canAccessPlan(user?.planType, minPlan)) {
          e.preventDefault();
          e.stopPropagation();
          openPremium({ toolName, requiredPlan: minPlan });
        }
      }}
    >
      {children}
    </div>
  );
}
