import { api, ApiError } from './api';
import type { Draft } from '@/hooks/useGiftDraft';
import { publishGiftCart } from './gift-cart-events';
import type { GiftPersonalisation } from './gift-personalisation';

// Serialize the whole read/write operation, including the first cookie handshake.
// Separate cards must not overwrite one another's selection or create competing sessions.
let pending: Promise<unknown> = Promise.resolve();
const inFlight = new Set<Promise<unknown>>();
let draftRead: Promise<Draft> | null = null;

export function queueGiftCartWrite<T>(write: () => Promise<T>): Promise<T> {
 const task = pending.then(write);
 pending = task.catch(() => undefined);
 inFlight.add(task);
 void task.then(() => inFlight.delete(task), () => inFlight.delete(task));
 return task;
}

// Cards share an in-flight read, never a cached cart snapshot. Keep cookie creation
// in the same queue as writes so mounting a grid cannot create competing carts.
export function readGiftDraft(): Promise<Draft> {
 if (draftRead) return draftRead;
 const task = queueGiftCartWrite(() => api<Draft>('/auth/gift/draft'));
 draftRead = task;
 const clear = () => { if (draftRead === task) draftRead = null; };
 void task.then(clear, clear);
 return task;
}

// Let cards mounted in the same effect flush register their existing draft read.
// Reuse only a pending response; never retain a shopper's settled cart in memory.
export async function readGiftCount(preferDraft = false): Promise<{ count: number }> {
 await Promise.resolve();
 const shared = draftRead || (preferDraft ? readGiftDraft() : null);
 if (shared) {
  const draft = await shared;
  return { count: draft.items.reduce((total, item) => total + item.quantity, 0) };
 }
 return api<{ count: number }>('/auth/gift/count');
}

async function settleGiftCartWrites(): Promise<boolean> {
 let failed = false;
 // Include writes queued while waiting, not only the initial snapshot.
 while (inFlight.size) {
  const results = await Promise.allSettled([...inFlight]);
  failed ||= results.some(result => result.status === 'rejected');
 }
 return !failed;
}

export async function waitForGiftCartAdditions(): Promise<void> {
 await settleGiftCartWrites();
}

export async function waitForGiftCartBeforeSignIn(): Promise<void> {
 if (!await settleGiftCartWrites()) {
  throw new Error('We could not confirm your latest cart change. Review your cart before continuing to sign in.');
 }
}

export function addGiftItem(id: string, personalisation?: GiftPersonalisation | null): Promise<Draft> {
 return updateGiftItem(id, 1, personalisation);
}

export function changeGiftItemQuantity(id: string, change: 1 | -1): Promise<Draft> {
 return updateGiftItem(id, change);
}

// Buy now keeps the selected quantity, adding one only when it is absent.
export function ensureGiftItem(id: string, personalisation?: GiftPersonalisation | null): Promise<Draft> {
 return updateGiftItem(id, 'ensure', personalisation);
}

export function saveGiftPersonalisation(id: string, personalisation: GiftPersonalisation | null): Promise<Draft> {
 return updateGiftItem(id, 'personalise', personalisation);
}

function updateGiftItem(id: string, change: 1 | -1 | 'ensure' | 'personalise', personalisation?: GiftPersonalisation | null): Promise<Draft> {
 return queueGiftCartWrite(async () => {
  if (change !== 1 && change !== -1 && change !== 'ensure' && change !== 'personalise') throw new Error('Invalid quantity change.');
  for (let attempt = 0; attempt < 2; attempt++) {
   const draft = await api<Draft>('/auth/gift/draft');
   const existing = draft.items.find(item => item.id === id);
   if (change === 'personalise' && !existing) throw new Error('This item is no longer in your bag. Add it again before saving a name.');
   if (change === 'ensure' && existing?.quantity && personalisation === undefined) return draft;
   const quantity = change === 'personalise' || (change === 'ensure' && existing)
    ? existing!.quantity : (existing?.quantity || 0) + (change === -1 ? -1 : 1);
   if (quantity > 99) throw new Error('You already have 99 of this item in your cart.');
   if (quantity < 0) return draft;
   const row = { ...existing, id, quantity };
   if (personalisation === null) delete row.personalisation;
   else if (personalisation !== undefined) row.personalisation = personalisation;
   const items = existing
    ? draft.items.flatMap(item => item.id !== id ? [item] : quantity ? [row] : [])
    : [...draft.items, row];
   let saved: Draft;
   try {
    saved = await api<Draft>('/auth/gift/draft', 'PUT', { revision: draft.revision, boxes: draft.boxes, items });
   } catch (error) {
    // A rejected revision can be retried safely. An ambiguous network failure cannot.
    if (error instanceof ApiError && error.status === 409 && attempt === 0) continue;
    if (!(error instanceof ApiError)) throw new Error('Could not confirm the cart change. Check your cart before trying again.');
    throw error;
   }
   publishGiftCart(saved);
   return saved;
  }
  throw new Error('Your cart changed. Please try again.');
 });
}
