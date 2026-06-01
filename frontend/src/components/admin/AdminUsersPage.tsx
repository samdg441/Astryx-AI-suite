'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { listAdminUsers, type AdminUser } from '@/lib/usersApi';
import { toast } from '@/lib/toast';

function planLabel(plan: string | null) {
  if (!plan) return 'Sin plan';
  return plan;
}

export function AdminUsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await listAdminUsers(token, { page: 1, limit: 100 });
      setUsers(res.data);
      setTotal(res.meta.total);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const byPlan = useMemo(() => {
    const map: Record<string, number> = {};
    for (const u of users) {
      const key = planLabel(u.planType);
      map[key] = (map[key] ?? 0) + 1;
    }
    return map;
  }, [users]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="glass-panel flex items-center gap-3 px-5 py-4">
          <Users className="h-8 w-8 text-[var(--accent-violet)]" />
          <div>
            <p className="text-muted text-sm">Usuarios registrados</p>
            <p className="text-heading text-2xl font-bold">{loading ? '…' : total}</p>
          </div>
        </div>
        {!loading &&
          Object.entries(byPlan).map(([plan, count]) => (
            <div key={plan} className="glass-panel px-4 py-3">
              <p className="text-muted text-xs">{plan}</p>
              <p className="text-heading text-lg font-semibold">{count}</p>
            </div>
          ))}
      </div>

      <div className="glass-panel overflow-x-auto">
        {loading ? (
          <p className="text-muted p-6">Cargando…</p>
        ) : users.length === 0 ? (
          <p className="text-muted p-6">No hay usuarios registrados aún.</p>
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-muted border-b border-[var(--border-default)]">
                <th className="p-4 font-medium">Nombre</th>
                <th className="p-4 font-medium">Correo</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Suscripción</th>
                <th className="p-4 font-medium">Rol</th>
                <th className="p-4 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border-default)]/60">
                  <td className="text-heading p-4 font-medium">{u.name}</td>
                  <td className="text-body p-4">{u.email}</td>
                  <td className="p-4 capitalize">{planLabel(u.planType)}</td>
                  <td className="p-4 capitalize">{u.subscriptionStatus}</td>
                  <td className="p-4 capitalize">{u.globalRole}</td>
                  <td className="p-4">{u.isActive ? 'Activo' : 'Inactivo'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
