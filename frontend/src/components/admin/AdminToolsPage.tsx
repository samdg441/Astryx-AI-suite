'use client';

import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import {
  createTool,
  deleteTool,
  listTools,
  updateTool,
  type AiTool,
  type AiToolInput,
  type PlanTier,
} from '@/lib/toolsApi';
import { toast } from '@/lib/toast';
import { buttonLinkClass } from '@/lib/buttonClasses';

const emptyForm: AiToolInput = {
  name: '',
  provider: '',
  description: '',
  category: 'texto',
  urlApi: '',
  requiredPlan: 'free',
  isActive: true,
};

const plans: PlanTier[] = ['free', 'basico', 'pro', 'empresarial'];

export function AdminToolsPage() {
  const { token } = useAuth();
  const [tools, setTools] = useState<AiTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<AiToolInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listTools({ page: 1, limit: 100 });
      setTools(res.data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(tool: AiTool) {
    setEditingId(tool.id);
    setForm({
      name: tool.name,
      provider: tool.provider ?? '',
      description: tool.description,
      category: tool.category,
      urlApi: tool.url_api ?? '',
      requiredPlan: tool.required_plan,
      isActive: tool.isActive,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      const payload: AiToolInput = {
        ...form,
        provider: form.provider?.trim() || null,
        urlApi: form.urlApi?.trim() || null,
      };
      if (editingId) {
        await updateTool(token, editingId, payload);
        toast.success('Herramienta actualizada');
      } else {
        await createTool(token, payload);
        toast.success('Herramienta creada');
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!token) return;
    if (!window.confirm(`¿Eliminar "${name}"?`)) return;
    try {
      await deleteTool(token, id);
      toast.success('Eliminada');
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-heading text-xl font-semibold">Herramientas IA</h2>
        <button type="button" onClick={openCreate} className={buttonLinkClass('primary', 'inline-flex items-center gap-2 px-4 py-2.5 text-sm')}>
          <Plus className="h-4 w-4" />
          Nueva herramienta
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-panel grid gap-4 p-6 sm:grid-cols-2">
          <h3 className="text-heading sm:col-span-2 text-lg font-medium">
            {editingId ? 'Editar herramienta' : 'Nueva herramienta'}
          </h3>
          {(['name', 'provider', 'category'] as const).map((field) => (
            <label key={field} className="text-muted text-sm capitalize">
              {field === 'name' ? 'Nombre' : field === 'provider' ? 'Proveedor' : 'Categoría'}
              <input
                className="form-input"
                value={form[field] ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                required={field === 'name' || field === 'category'}
              />
            </label>
          ))}
          <label className="text-muted text-sm sm:col-span-2">
            Descripción
            <textarea
              className="form-input min-h-[88px]"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
              minLength={10}
            />
          </label>
          <label className="text-muted text-sm sm:col-span-2">
            URL API
            <input
              className="form-input"
              type="url"
              value={form.urlApi ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, urlApi: e.target.value }))}
            />
          </label>
          <label className="text-muted text-sm">
            Plan mínimo
            <select
              className="form-input"
              value={form.requiredPlan}
              onChange={(e) => setForm((f) => ({ ...f, requiredPlan: e.target.value as PlanTier }))}
            >
              {plans.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="text-muted flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive ?? true}
              onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
            />
            Activa
          </label>
          <div className="flex gap-2 sm:col-span-2">
            <button type="submit" disabled={saving} className={buttonLinkClass('primary', 'px-5 py-2.5 text-sm')}>
              {saving ? 'Guardando…' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className={buttonLinkClass('secondary', 'px-5 py-2.5 text-sm')}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="glass-panel overflow-x-auto">
        {loading ? (
          <p className="text-muted p-6">Cargando…</p>
        ) : tools.length === 0 ? (
          <p className="text-muted p-6">No hay herramientas. Crea la primera o ejecuta el seed en el backend.</p>
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-muted border-b border-[var(--border-default)]">
                <th className="p-4 font-medium">Nombre</th>
                <th className="p-4 font-medium">Categoría</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Estado</th>
                <th className="p-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool) => (
                <tr key={tool.id} className="border-b border-[var(--border-default)]/60">
                  <td className="text-heading p-4 font-medium">{tool.name}</td>
                  <td className="text-body p-4">{tool.category}</td>
                  <td className="text-body p-4">{tool.required_plan}</td>
                  <td className="p-4">{tool.isActive ? 'Activa' : 'Inactiva'}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button type="button" aria-label="Editar" onClick={() => openEdit(tool)} className="rounded-lg border border-[var(--border-default)] p-2 hover:text-[var(--accent-violet)]">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button type="button" aria-label="Eliminar" onClick={() => void handleDelete(tool.id, tool.name)} className="rounded-lg border border-[var(--border-default)] p-2 hover:text-rose-400">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
