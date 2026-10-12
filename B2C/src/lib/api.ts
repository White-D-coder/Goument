import type { CartItem } from './types';

export class ApiError extends Error {
 constructor(message: string, public readonly status: number) {
  super(message);
  this.name = 'ApiError';
 }
}

// Coalesce simultaneous bootstrap reads (including development Strict Mode).
// No settled response is cached; draft reads/writes retain their cart queue.
const bootstrapReads = new Map<string, Promise<unknown>>();
export function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
 if (method !== 'GET') bootstrapReads.clear();
 const share = typeof window !== 'undefined' && method === 'GET' && body === undefined && ['/auth/me', '/auth/gift/count', '/auth/config'].includes(path);
 if (!share) return request<T>(path, method, body);
 const existing = bootstrapReads.get(path);
 if (existing) return existing as Promise<T>;
 const task = request<T>(path, method, body);
 bootstrapReads.set(path, task);
 const clear = () => { if (bootstrapReads.get(path) === task) bootstrapReads.delete(path); };
 void task.then(clear, clear);
 return task;
}
async function request<T>(path: string, method: string, body?: unknown): Promise<T> {
 const headers: Record<string, string> = { 'Content-Type': 'application/json' };
 // Auth and gift drafts use HttpOnly cookies, independently of legacy cart storage.
 if (!path.startsWith('/auth/')) {
  let session = localStorage.getItem('gourmet-b2c-session');
  if (!session) { session = crypto.randomUUID(); localStorage.setItem('gourmet-b2c-session', session); }
  headers['X-Session-Id'] = session;
 }
 const retryableRead = method === 'GET' && body === undefined && ['/auth/me', '/auth/config', '/auth/gift/count', '/auth/gift/catalogue', '/auth/gift/draft'].includes(path);
 for (let attempt = 0; ; attempt++) {
  const response = await fetch(`/api/v1${path}`, { method, credentials: 'include', headers, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(12000) });
  const data = await response.json().catch(() => null);
  if (retryableRead && attempt === 0 && response.status === 503) {
   const retryAfter = response.headers?.get('Retry-After');
   const delay = retryAfter == null ? 1000 : /^\d+$/.test(retryAfter) ? Number(retryAfter) * 1000 : Date.parse(retryAfter) - Date.now();
   // One bounded retry for a temporary startup/dependency failure. Longer server
   // cooldowns stay explicit errors; never replay an ambiguous cart/auth write.
   if (Number.isFinite(delay) && delay <= 1000) {
    await new Promise(resolve => setTimeout(resolve, Math.max(0, delay)));
    continue;
   }
  }
  if (!response.ok || !data) throw new ApiError(data?.message || data?.errors?.[0]?.message || 'Unable to connect. Please try again.', response.status);
  return data as T;
 }
}
export async function cartMutation(method: string, path: string, body?: unknown) {
 const result = await api<{ data: { items: CartItem[] } }>(path, method, body);
 window.dispatchEvent(new Event('b2c-cart-change'));
 return result;
}
