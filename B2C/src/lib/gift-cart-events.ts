import type { Draft, Selection } from '@/hooks/useGiftDraft';

// Share the just-confirmed response with mounted controls, without retaining a
// private cart cache. Generic events (login/logout/legacy cart) still re-fetch.
export function publishGiftCart(draft: Draft): void {
 window.dispatchEvent(new CustomEvent('b2c-cart-change', { detail: { items: draft.items, draft } }));
}

export type CartAddition = { source: 'gift'; draft: Draft } | { source: 'store' };

export function announceCartAddition(addition: CartAddition): void {
 window.dispatchEvent(new CustomEvent('b2c-cart-added', { detail: addition }));
}

export function cartAdditionFromEvent(event: Event): CartAddition | null {
 const value = (event as CustomEvent<CartAddition>).detail;
 if (value?.source === 'store') return value;
 if (value?.source !== 'gift' || !value.draft || !Number.isSafeInteger(value.draft.revision) || value.draft.revision < 0 || !Array.isArray(value.draft.boxes)) return null;
 return giftCartItemsFromEvent(new CustomEvent('b2c-cart-change', { detail: { items: value.draft.items } })) ? value : null;
}

export function giftCartItemsFromEvent(event?: Event): Selection[] | null {
 if (!event || !('detail' in event)) return null;
 const items: unknown = (event as CustomEvent<{ items?: unknown }>).detail?.items;
 if (!Array.isArray(items) || !items.every(item => item && typeof item.id === 'string' && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99)) return null;
 return items;
}

export function giftCartDraftFromEvent(event: Event): Draft | null {
 const draft = (event as CustomEvent<{ draft?: Draft }>).detail?.draft;
 return draft && Number.isSafeInteger(draft.revision) && draft.revision >= 0 && Array.isArray(draft.boxes)
  && giftCartItemsFromEvent(event) && draft.items === (event as CustomEvent).detail.items ? draft : null;
}
