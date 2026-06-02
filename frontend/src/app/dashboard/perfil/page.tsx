'use client';

import { AccountShell } from '@/components/account/AccountShell';
import { ProfileView } from '@/components/account/ProfileView';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function PerfilPage() {
  useRequireAuth();

  return (
    <AccountShell
      title="Mi perfil"
      subtitle="Información de tu cuenta en Astryx AI Suite"
      activeHref="/dashboard/perfil"
    >
      <ProfileView />
    </AccountShell>
  );
}
