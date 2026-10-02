import { ApiError } from '@/lib/api';

// The existing HttpOnly session is scoped to /api/v1/auth. Admin requests must
// stay in that namespace, bypass legacy cart storage and never cache private DTOs.
export async function adminApi<T>(path: string, options: { method?: string; body?: unknown; key?: string; signal?: AbortSignal } = {}): Promise<T> {
  const method = options.method || 'GET';
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Invalid admin request.');
  if (method !== 'GET' && !options.key) throw new Error('A request key is required for this action.');
  const response = await fetch(`/api/v1/auth/admin${path}`, {
    method,
    credentials: 'include',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json', ...(options.key ? { 'Idempotency-Key': options.key } : {}) },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal ? AbortSignal.any([options.signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data) throw new ApiError(data?.message || data?.errors?.[0]?.message || 'The operations service could not complete this request.', response.status);
  return data as T;
}

export function queryString(values: Record<string, string | number | undefined | null>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) if (value !== undefined && value !== null && value !== '') query.set(key, String(value));
  return query.size ? `?${query}` : '';
}
