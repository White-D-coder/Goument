import { api, ApiError } from './api';
import type { Draft } from '@/hooks/useGiftDraft';

// Serialize the whole read/write operation, including the first cookie handshake.
// Separate cards must not overwrite one another's selection or create competing sessions.
let pending: Promise<unknown> = Promise.resolve();
const inFlight = new Set<Promise<unknown>>();

export function queueGiftCartWrite<T>(write: () => Promise<T>): Promise<T> {
 const task = pending.then(write);
 pending = task.catch(() => undefined);
 inFlight.add(task);
 void task.then(() => inFlight.delete(task), () => inFlight.delete(task));
 return task;
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

export function addGiftItem(id: string): Promise<Draft> {
 return queueGiftCartWrite(async () => {
  for (let attempt = 0; attempt < 2; attempt++) {
   const draft = await api<Draft>('/auth/gift/draft');
   const existing = draft.items.find(item => item.id === id);
   if ((existing?.quantity || 0) >= 99) throw new Error('You already have 99 of this item in your cart.');
   const items = existing
    ? draft.items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...draft.items, { id, quantity: 1 }];
   let saved: Draft;
   try {
    saved = await api<Draft>('/auth/gift/draft', 'PUT', { revision: draft.revision, boxes: draft.boxes, items });
   } catch (error) {
    // A rejected revision can be retried safely. An ambiguous network failure cannot.
    if (error instanceof ApiError && error.status === 409 && attempt === 0) continue;
    if (!(error instanceof ApiError)) throw new Error('Could not confirm the addition. Check your cart before trying again.');
    throw error;
   }
   window.dispatchEvent(new Event('b2c-cart-change'));
   return saved;
  }
  throw new Error('Your cart changed. Please try again.');
 });
}
