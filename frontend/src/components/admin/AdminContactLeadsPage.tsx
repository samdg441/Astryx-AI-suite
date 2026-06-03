'use client';

import { useCallback, useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import {
  deleteContactLead,
  listContactLeads,
  updateContactLead,
  type ContactLead,
} from '@/lib/contactApi';
import { toast } from '@/lib/toast';

const statuses: ContactLead['status'][] = ['nuevo', 'leido', 'cerrado'];

export function AdminContactLeadsPage() {
  const { token } = useAuth();
  const [leads, setLeads] = useState<ContactLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ContactLead['status'] | 'all'>('all');

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await listContactLeads(token, {
        page: 1,
        limit: 50,
        status: filter === 'all' ? undefined : filter,
      });
      setLeads(res.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al cargar contactos');
    } finally {
      setLoading(false);
    }
  }, [token, filter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function changeStatus(id: string, status: ContactLead['status']) {
    if (!token) return;
    try {
      await updateContactLead(token, id, { status });
      toast.success('Estado actualizado');
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al actualizar');
    }
  }

  async function handleDelete(id: string) {
    if (!token) return;
    if (!window.confirm('¿Eliminar este mensaje?')) return;
    try {
      await deleteContactLead(token, id);
      toast.success('Eliminado');
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-heading text-xl font-semibold">Mensajes de contacto</h2>
        <select
          className="form-input w-auto min-w-[140px]"
          value={filter}
          onChange={(e) => setFilter(e.target.value as ContactLead['status'] | 'all')}
        >
          <option value="all">Todos</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {loading ? (
          <p className="text-muted glass-panel p-6">Cargando…</p>
        ) : leads.length === 0 ? (
          <p className="text-muted glass-panel p-6">
            No hay mensajes.
          </p>
        ) : (
          leads.map((lead) => (
            <article key={lead.id} className="glass-panel space-y-3 p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-heading font-semibold">{lead.name}</p>
                  <p className="text-muted text-sm">{lead.email}</p>
                  {lead.company && <p className="text-muted text-sm">{lead.company}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    className="form-input w-auto text-sm"
                    value={lead.status}
                    onChange={(e) => void changeStatus(lead.id, e.target.value as ContactLead['status'])}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    aria-label="Eliminar"
                    onClick={() => void handleDelete(lead.id)}
                    className="rounded-lg border border-[var(--border-default)] p-2 hover:text-rose-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-body whitespace-pre-wrap text-sm leading-relaxed">{lead.message}</p>
              <p className="text-muted text-xs">
                {new Date(lead.createdAt).toLocaleString('es')} · {lead.source}
              </p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
