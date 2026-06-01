import { AdminShell } from '@/components/admin/AdminShell';
import { AdminUsersPage } from '@/components/admin/AdminUsersPage';

export default function AdminUsersRoute() {
  return (
    <AdminShell>
      <AdminUsersPage />
    </AdminShell>
  );
}
