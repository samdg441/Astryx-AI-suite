'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FileText, Loader2, Paperclip, Trash2, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  deleteUserFile,
  formatFileSize,
  listUserFiles,
  uploadUserFile,
  type UserFileItem,
} from '@/lib/filesApi';
import { ApiRequestError } from '@/lib/apiClient';
import { toast } from '@/lib/toast';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/cn';

export function ContextPanel() {
  const { token } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UserFileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const selectedFileId = useDashboardStore((s) => s.selectedFileId);
  const selectedFileName = useDashboardStore((s) => s.selectedFileName);
  const selectFile = useDashboardStore((s) => s.selectFile);
  const clearSelectedFile = useDashboardStore((s) => s.clearSelectedFile);

  const refresh = useCallback(async () => {
    if (!token) {
      setFiles([]);
      setLoading(false);
      return;
    }
    try {
      const data = await listUserFiles(token);
      setFiles(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'No se pudieron cargar archivos';
      toast.error('Error al cargar archivos', { description: message });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function handleUpload(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file || !token || uploading) return;

    setUploading(true);
    try {
      const uploaded = await uploadUserFile(token, file);
      setFiles((prev) => [uploaded, ...prev]);
      selectFile(uploaded.id, uploaded.name);
      toast.success('Archivo subido', { description: uploaded.name });
    } catch (err) {
      const message =
        err instanceof ApiRequestError ? err.message : 'No se pudo subir el archivo';
      toast.error('Error al subir', { description: message });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!token) return;
    try {
      await deleteUserFile(token, id);
      setFiles((prev) => prev.filter((f) => f.id !== id));
      if (selectedFileId === id) clearSelectedFile();
      toast.success('Archivo eliminado', { description: name });
    } catch (err) {
      const message =
        err instanceof ApiRequestError ? err.message : 'No se pudo eliminar';
      toast.error('Error al eliminar', { description: message });
    }
  }

  return (
    <aside className="dashboard-context hidden w-72 shrink-0 border-l p-4 text-xs xl:flex xl:flex-col">
      <p className="mb-1 font-semibold uppercase tracking-wider">Contexto</p>
      <p className="mb-4 leading-relaxed">
        Sube un PDF o TXT, selecciónalo y pregunta en el chat. La IA usará su contenido para
        responderte.
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.md,.csv,text/plain,text/markdown,application/pdf,text/csv"
        className="hidden"
        onChange={(e) => void handleUpload(e.target.files)}
      />

      <button
        type="button"
        disabled={uploading || !token}
        onClick={() => inputRef.current?.click()}
        className="dashboard-context-upload mb-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-3 text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
      >
        {uploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Upload className="h-4 w-4" />
        )}
        {uploading ? 'Subiendo…' : 'Subir archivo'}
      </button>

      {selectedFileName && (
        <div className="dashboard-context-selected mb-4 flex items-start gap-2 rounded-xl border px-3 py-2">
          <Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-70" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60">
              Adjunto activo
            </p>
            <p className="truncate text-sm font-medium">{selectedFileName}</p>
          </div>
          <button
            type="button"
            onClick={clearSelectedFile}
            className="shrink-0 opacity-60 hover:opacity-100"
            aria-label="Quitar adjunto"
          >
            ×
          </button>
        </div>
      )}

      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider opacity-60">
        Mis archivos
      </p>

      <div className="custom-scrollbar min-h-0 flex-1 space-y-2 overflow-y-auto">
        {loading && (
          <div className="flex items-center gap-2 py-4 opacity-60">
            <Loader2 className="h-4 w-4 animate-spin" />
            Cargando…
          </div>
        )}

        {!loading && files.length === 0 && (
          <p className="py-2 leading-relaxed opacity-70">Aún no tienes archivos. Sube un PDF.</p>
        )}

        {files.map((file) => {
          const active = selectedFileId === file.id;
          return (
            <div
              key={file.id}
              className={cn(
                'dashboard-context-file group flex items-start gap-2 rounded-xl border px-3 py-2 transition',
                active && 'dashboard-context-file--active'
              )}
            >
              <button
                type="button"
                onClick={() => selectFile(file.id, file.name)}
                className="flex min-w-0 flex-1 items-start gap-2 text-left"
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="opacity-60">{formatFileSize(file.sizeBytes)}</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => void handleDelete(file.id, file.name)}
                className="shrink-0 opacity-0 transition group-hover:opacity-60 hover:!opacity-100"
                aria-label={`Eliminar ${file.name}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
