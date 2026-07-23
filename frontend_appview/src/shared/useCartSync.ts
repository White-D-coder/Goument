import { useEffect } from 'react';
import { get, del } from 'idb-keyval';
import { syncCartAPI, addToCartAPI } from './api/endpoints';
import { useCartStore } from '@/hooks/useCart';

export function useCartSync(isOnline: boolean) {
  const syncWithServer = useCartStore((state) => state.syncWithServer);
  const items = useCartStore((state) => state.items);

  useEffect(() => {
    if (!isOnline) return;

    const processQueue = async () => {
      try {
        const queue = (await get<any[]>('offline_cart_queue')) || [];
        if (queue.length > 0) {
          // Replay mutations
          for (const item of queue) {
            if (item.type === 'ADD' && item.payload) {
              await addToCartAPI({
                productId: item.payload.productId,
                variantId: item.payload.variantId,
                giftBoxingType: item.payload.giftBoxingType,
                quantity: item.payload.quantity,
              });
            }
          }
          await del('offline_cart_queue');
        }

        // Full sync merge post replay
        const formattedItems = items.map((i) => ({
          productId: i.productId,
          variantSku: i.variantId,
          giftBoxingType: i.giftBoxingType,
          quantity: i.quantity,
        }));
        await syncCartAPI(formattedItems, false);
        await syncWithServer();
      } catch (err) {
        // Silently retry on next cycle
      }
    };

    processQueue();
  }, [isOnline, items, syncWithServer]);
}
