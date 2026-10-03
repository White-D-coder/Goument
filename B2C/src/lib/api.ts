import type { CartItem } from './types';

export class ApiError extends Error {
 constructor(message: string, public readonly status: number) {
  super(message);
  this.name = 'ApiError';
 }
}

export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
 const headers: Record<string, string> = { 'Content-Type': 'application/json' };
 // Auth and gift drafts use HttpOnly cookies, independently of legacy cart storage.
 if (!path.startsWith('/auth/')) {
  let session = localStorage.getItem('gourmet-b2c-session');
  if (!session) { session = crypto.randomUUID(); localStorage.setItem('gourmet-b2c-session', session); }
  headers['X-Session-Id'] = session;
 }
 const response = await fetch(`/api/v1${path}`, { method, credentials: 'include', headers, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(12000) });
 const data = await response.json().catch(() => null);
 if (!response.ok || !data) throw new ApiError(data?.message || data?.errors?.[0]?.message || 'Unable to connect. Please try again.', response.status);
 return data as T;
}
export async function cartMutation(method: string, path: string, body?: unknown) {
 const result = await api<{ data: { items: CartItem[] } }>(path, method, body);
 window.dispatchEvent(new Event('b2c-cart-change'));
 return result;
}
