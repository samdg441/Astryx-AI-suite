import { apiFetch, apiFetchList } from './apiClient';

export type ContactLead = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  source: string;
  status: 'nuevo' | 'leido' | 'cerrado';
  userId: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ContactLeadInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
  source?: string;
};

type ListResponse = { data: ContactLead[]; meta: import('./apiClient').PaginationMeta };

export function submitContactLead(input: ContactLeadInput): Promise<ContactLead> {
  return apiFetch<ContactLead>('/contact-leads', {
    method: 'POST',
    body: { ...input, source: input.source ?? 'website' },
  });
}

export function listContactLeads(
  token: string,
  params?: { page?: number; limit?: number; status?: ContactLead['status'] }
): Promise<ListResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.status) query.set('status', params.status);
  const qs = query.toString();
  const path = qs ? `/contact-leads?${qs}` : '/contact-leads';
  return apiFetchList<ContactLead>(path, { token, auth: true });
}

export function updateContactLead(
  token: string,
  id: string,
  input: { status?: ContactLead['status']; company?: string | null }
): Promise<ContactLead> {
  return apiFetch<ContactLead>(`/contact-leads/${id}`, {
    method: 'PUT',
    token,
    body: input,
    auth: true,
  });
}

export function deleteContactLead(token: string, id: string): Promise<void> {
  return apiFetch<void>(`/contact-leads/${id}`, { method: 'DELETE', token, auth: true });
}
