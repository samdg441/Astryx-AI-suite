export const AUTH_COOKIE_NAME = 'astryx_auth_token';

function cookieSecureSuffix(): string {
  if (typeof window === 'undefined') return '';
  return window.location.protocol === 'https:' ? '; Secure' : '';
}

export function parseAuthCookieValue(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw).trim();
    return decoded.length > 0 ? decoded : null;
  } catch {
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  }
}

export function isLikelyJwt(token: string): boolean {
  const parts = token.split('.');
  return parts.length === 3 && parts.every((part) => part.length > 0);
}

export function setAuthCookie(token: string) {
  if (typeof document === 'undefined') return;
  const maxAge = 60 * 60 * 24 * 7;
  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax${cookieSecureSuffix()}`;
}

export function clearAuthCookie() {
  if (typeof document === 'undefined') return;
  const secure = cookieSecureSuffix();
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${secure}`;
}
