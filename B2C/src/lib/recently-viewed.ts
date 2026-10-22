// Device-local navigation history only. Never persist prices, customer or cart data.
export const RECENTLY_VIEWED_KEY = 'gourmet-b2c-recently-viewed';
const changed = 'b2c-recently-viewed-change';
export const RECENTLY_VIEWED_LIMIT = 12;
export const RECENTLY_VIEWED_REQUEST_LIMIT = 6;

export function isProductSlug(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 160 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(value);
}

export function parseRecentlyViewed(raw: string | null): string[] {
  if (!raw || raw.length > 8000) return [];
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? [...new Set(value.filter(isProductSlug))].slice(0, RECENTLY_VIEWED_LIMIT) : [];
  } catch { return []; }
}

export function recentlyViewedSnapshot(): string {
  try { return JSON.stringify(parseRecentlyViewed(window.localStorage.getItem(RECENTLY_VIEWED_KEY))); }
  catch { return '[]'; }
}

export function subscribeRecentlyViewed(notify: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key === RECENTLY_VIEWED_KEY || event.key === null) notify();
  };
  window.addEventListener('storage', storage);
  window.addEventListener(changed, notify);
  return () => {
    window.removeEventListener('storage', storage);
    window.removeEventListener(changed, notify);
  };
}

export function rememberProduct(slug: string) {
  if (!isProductSlug(slug)) return;
  try {
    const previous = parseRecentlyViewed(window.localStorage.getItem(RECENTLY_VIEWED_KEY));
    if (previous[0] === slug) return;
    window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify([slug, ...previous.filter(item => item !== slug)].slice(0, RECENTLY_VIEWED_LIMIT)));
    window.dispatchEvent(new Event(changed));
  } catch { /* Browsing and checkout work when optional local storage is blocked. */ }
}

export function clearRecentlyViewed(): boolean {
  try {
    window.localStorage.removeItem(RECENTLY_VIEWED_KEY);
    window.dispatchEvent(new Event(changed));
    return true;
  } catch { return false; }
}
