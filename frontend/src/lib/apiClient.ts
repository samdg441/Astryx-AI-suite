import { getApiBaseUrl } from './apiBase';

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ApiErrorBody = {
  message?: string;
  issues?: { path: (string | number)[]; message: string }[];
};

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

async function parseJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export function getErrorMessage(body: ApiErrorBody | null, fallback: string): string {
  if (body?.issues?.length) {
    return body.issues[0]?.message ?? fallback;
  }
  return body?.message ?? fallback;
}

type ApiFetchOptions = {
  method?: string;
  token?: string | null;
  body?: unknown;
  auth?: boolean;
};

export async function apiFetch<T>(
  path: string,
  { method = 'GET', token, body, auth = false }: ApiFetchOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }
  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && auth) {
    unauthorizedHandler?.();
    throw new Error('Sesión expirada. Inicia sesión de nuevo.');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const parsed = (await parseJson(response)) as ApiErrorBody & { data?: T } | null;

  if (!response.ok) {
    throw new Error(getErrorMessage(parsed, `Error ${response.status}`));
  }

  if (parsed && typeof parsed === 'object' && 'data' in parsed) {
    return parsed.data as T;
  }

  return parsed as T;
}

export async function apiFetchList<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<{ data: T[]; meta: PaginationMeta }> {
  const headers: Record<string, string> = {};
  if (options.auth && options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (response.status === 401 && options.auth) {
    unauthorizedHandler?.();
    throw new Error('Sesión expirada. Inicia sesión de nuevo.');
  }

  const parsed = (await parseJson(response)) as ApiErrorBody & {
    data?: T[];
    meta?: PaginationMeta;
  } | null;

  if (!response.ok) {
    throw new Error(getErrorMessage(parsed, `Error ${response.status}`));
  }

  return {
    data: parsed?.data ?? [],
    meta: parsed?.meta ?? { page: 1, limit: 10, total: 0, totalPages: 0 },
  };
}
