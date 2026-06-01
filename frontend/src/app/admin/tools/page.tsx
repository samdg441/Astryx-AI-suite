import { AdminShell } from '@/components/admin/AdminShell';
import { AdminToolsPage } from '@/components/admin/AdminToolsPage';

export default function AdminToolsRoute() {
  return (
    <AdminShell>
      <AdminToolsPage />
    </AdminShell>
  );
}
