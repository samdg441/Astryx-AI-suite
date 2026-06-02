'use client';

import React from 'react';
import { Mail, Shield, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SubscriptionBadge } from '@/components/dashboard/SubscriptionBadge';
import { getPlanInfo } from '@/lib/planCatalog';
import { isAdmin } from '@/lib/authUtils';

export function ProfileView() {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-muted text-sm">Inicia sesión para ver tu perfil.</p>
    );
  }

  const plan = getPlanInfo(user.planType);

  return (
    <div className="space-y-6">
      <div className="account-panel flex flex-col items-center gap-4 p-8 sm:flex-row sm:items-start">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#b0b0b0] via-[#8a8a8a] to-[#737373] text-3xl font-bold text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
          {user.name.slice(0, 1).toUpperCase()}
        </span>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-heading text-2xl font-bold">{user.name}</h2>
          <p className="text-muted mt-1 text-sm">{user.email}</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <SubscriptionBadge planType={user.planType} />
            {isAdmin(user) && (
              <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-muted)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Admin
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="account-stat p-4">
          <div className="text-muted mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <User className="h-4 w-4" />
            Cuenta
          </div>
          <p className="text-heading text-sm font-medium">{user.name}</p>
          <p className="text-muted mt-1 text-xs">Nombre visible en la plataforma</p>
        </div>
        <div className="account-stat p-4">
          <div className="text-muted mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Mail className="h-4 w-4" />
            Correo
          </div>
          <p className="text-heading text-sm font-medium">{user.email}</p>
          <p className="text-muted mt-1 text-xs">Usado para acceso y notificaciones</p>
        </div>
        <div className="account-stat p-4">
          <div className="text-muted mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <Shield className="h-4 w-4" />
            Rol
          </div>
          <p className="text-heading text-sm font-medium capitalize">{user.globalRole}</p>
        </div>
        <div className="account-stat p-4">
          <div className="text-muted mb-2 text-xs font-semibold uppercase tracking-wider">
            Suscripción
          </div>
          <p className="text-heading text-sm font-medium">{plan.label}</p>
          <p className="text-muted mt-1 text-xs capitalize">
            Estado: {user.subscriptionStatus}
          </p>
        </div>
      </div>
    </div>
  );
}
