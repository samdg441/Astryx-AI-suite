import { AdminShell } from '@/components/admin/AdminShell';
import { AdminContactLeadsPage } from '@/components/admin/AdminContactLeadsPage';

export default function AdminContactLeadsRoute() {
  return (
    <AdminShell>
      <AdminContactLeadsPage />
    </AdminShell>
  );
}
