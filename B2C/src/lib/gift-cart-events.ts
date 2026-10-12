import type { Draft, Selection } from '@/hooks/useGiftDraft';

// Share the just-confirmed response with mounted controls, without retaining a
// private cart cache. Generic events (login/logout/legacy cart) still re-fetch.
export function publishGiftCart(draft: Draft): void {
 window.dispatchEvent(new CustomEvent('b2c-cart-change', { detail: { items: draft.items } }));
}

export function giftCartItemsFromEvent(event?: Event): Selection[] | null {
 if (!event || !('detail' in event)) return null;
 const items: unknown = (event as CustomEvent<{ items?: unknown }>).detail?.items;
 if (!Array.isArray(items) || !items.every(item => item && typeof item.id === 'string' && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99)) return null;
 return items;
}
