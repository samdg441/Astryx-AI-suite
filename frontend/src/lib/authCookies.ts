/** Cookie espejo del token (para middleware de Next.js; localStorage sigue siendo la fuente en cliente). */
export const AUTH_COOKIE_NAME = 'astryx_auth_token';

export function setAuthCookie(token: string) {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 7; // 7 días
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearAuthCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
