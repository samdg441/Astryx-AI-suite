import { apiFetch, apiUpload } from './apiClient';

export type UserFileItem = {
  id: string;
  name: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

export function listUserFiles(token: string): Promise<UserFileItem[]> {
  return apiFetch<UserFileItem[]>('/files', { token, auth: true });
}

export function uploadUserFile(token: string, file: File): Promise<UserFileItem> {
  const formData = new FormData();
  formData.append('file', file);
  return apiUpload<UserFileItem>('/files', { token, formData });
}

export function deleteUserFile(token: string, fileId: string): Promise<void> {
  return apiFetch<void>(`/files/${fileId}`, { method: 'DELETE', token, auth: true });
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
