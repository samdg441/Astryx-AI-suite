export type JwtPayloadClaims = {
  sub?: number;
  email?: string;
  planType?: string;
  globalRole?: string;
  exp?: number;
};

export function decodeJwtPayload(token: string): JwtPayloadClaims | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const json =
      typeof atob === 'function'
        ? atob(padded)
        : Buffer.from(padded, 'base64').toString('utf8');
    return JSON.parse(json) as JwtPayloadClaims;
  } catch {
    return null;
  }
}

export function isAdminRole(claims: JwtPayloadClaims | null): boolean {
  return claims?.globalRole === 'admin';
}
