import { apiFetchList } from './apiClient';

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  globalRole: string;
  planType: string | null;
  subscriptionStatus: string;
  isActive: boolean;
  createdAt: string;
};

export function listAdminUsers(
  token: string,
  params?: { page?: number; limit?: number }
) {
  const query = new URLSearchParams();
  if (params?.page) query.set('page', String(params.page));
  if (params?.limit) query.set('limit', String(params.limit));
  const qs = query.toString();
  const path = qs ? `/users?${qs}` : '/users';
  return apiFetchList<AdminUser>(path, { token, auth: true });
}
