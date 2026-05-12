/**
 * Base URL del API (Astryx-AI-suite-Back). Por defecto coincide con env.PORT=4000 y API_PREFIX=/api/v1
 */
export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, '');
  }
  return 'http://localhost:4000/api/v1';
}
