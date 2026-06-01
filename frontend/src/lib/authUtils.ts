import type { AuthUser } from './authApi';

export function isAdmin(user: AuthUser | null | undefined): boolean {
  return user?.globalRole?.toLowerCase() === 'admin';
}
