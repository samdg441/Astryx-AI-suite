import { apiFetch, apiFetchList, type PaginationMeta } from './apiClient';

export type PlanTier = 'free' | 'basico' | 'pro' | 'empresarial';

export type AiTool = {
  id: number;
  name: string;
  provider: string | null;
  description: string;
  category: string;
  url_api: string | null;
  required_plan: PlanTier;
  isActive: boolean;
  is_premium: boolean;
};

export type AiToolInput = {
  name: string;
  provider?: string | null;
  description: string;
  category: string;
  urlApi?: string | null;
  requiredPlan: PlanTier;
  isActive?: boolean;
};

type ListResponse = { data: AiTool[]; meta: PaginationMeta };

export async function listTools(params?: {
  page?: number;
  limit?: number;
  isActive?: boolean;
  search?: string;
}): Promise<ListResponse> {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  if (params?.isActive !== undefined) query.set('isActive', String(params.isActive));
  if (params?.search) query.set('search', params.search);
  const qs = query.toString();
  const path = qs ? `/tools?${qs}` : '/tools';
  return apiFetchList<AiTool>(path) as Promise<ListResponse>;
}

export function createTool(token: string, input: AiToolInput): Promise<AiTool> {
  return apiFetch<AiTool>('/tools', { method: 'POST', token, body: input, auth: true });
}

export function updateTool(token: string, id: number, input: Partial<AiToolInput>): Promise<AiTool> {
  return apiFetch<AiTool>(`/tools/${id}`, { method: 'PUT', token, body: input, auth: true });
}

export function deleteTool(token: string, id: number): Promise<void> {
  return apiFetch<void>(`/tools/${id}`, { method: 'DELETE', token, auth: true });
}
