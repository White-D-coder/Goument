import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCart, addToCartAPI, syncCartAPI } from '@/shared/api/endpoints';
import { set, get } from 'idb-keyval';

export interface CartItem {
  id: string; // unique item composite key
  productId: string;
  variantId?: string;
  giftBoxingType?: string;
  quantity: number;
  name: string;
  price: number; // in paise
  image: string;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number; // in paise
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<void>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  syncWithServer: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (setStore, getStore) => ({
      items: [],
      isDrawerOpen: false,
      openDrawer: () => setStore({ isDrawerOpen: true }),
      closeDrawer: () => setStore({ isDrawerOpen: false }),
      toggleDrawer: () => setStore({ isDrawerOpen: !getStore().isDrawerOpen }),

      get totalItems() {
        return getStore().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      get totalAmount() {
        return getStore().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      addItem: async (newItemData) => {
        const compositeId = `${newItemData.productId}_${newItemData.variantId || 'base'}_${newItemData.giftBoxingType || 'none'}`;
        const currentItems = getStore().items;
        const existingIndex = currentItems.findIndex((i) => i.id === compositeId);

        let updatedItems: CartItem[];
        if (existingIndex > -1) {
          updatedItems = [...currentItems];
          updatedItems[existingIndex].quantity += newItemData.quantity;
        } else {
          updatedItems = [...currentItems, { ...newItemData, id: compositeId }];
        }

        // Auto-open sliding door ONLY on the very first item added
        const isFirstItem = currentItems.length === 0;
        setStore({ 
          items: updatedItems, 
          isDrawerOpen: isFirstItem ? true : getStore().isDrawerOpen 
        });

        // Queue action for offline replay if offline, else call API directly
        if (!navigator.onLine) {
          const queue = (await get<any[]>('offline_cart_queue')) || [];
          queue.push({ type: 'ADD', payload: newItemData, timestamp: Date.now() });
          await set('offline_cart_queue', queue);
        } else {
          try {
            await addToCartAPI({
              productId: newItemData.productId,
              variantId: newItemData.variantId,
              giftBoxingType: newItemData.giftBoxingType,
              quantity: newItemData.quantity,
            });
          } catch (err) {
            // Silently fall back to offline queue if request fails
            const queue = (await get<any[]>('offline_cart_queue')) || [];
            queue.push({ type: 'ADD', payload: newItemData, timestamp: Date.now() });
            await set('offline_cart_queue', queue);
          }
        }
      },

      removeItem: (id) => {
        const updated = getStore().items.filter((i) => i.id !== id);
        setStore({ items: updated });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          getStore().removeItem(id);
          return;
        }
        const updated = getStore().items.map((i) => (i.id === id ? { ...i, quantity } : i));
        setStore({ items: updated });
      },

      clearCart: () => {
        setStore({ items: [] });
      },

      syncWithServer: async () => {
        try {
          const serverCart = await getCart();
          if (serverCart && Array.isArray(serverCart.items) && serverCart.items.length > 0) {
            const mappedItems: CartItem[] = serverCart.items.map((i: any) => ({
              id: `${i.productId}_${i.variantSku || 'base'}_${i.giftBoxing?.type || 'none'}`,
              productId: i.productId,
              giftBoxingType: i.giftBoxing?.type,
              quantity: i.quantity,
              name: i.productName || 'Gourmet Gift Item',
              price: i.unitPrice || 0,
              image: i.imagePublicId || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
            }));
            setStore({ items: mappedItems });
          }
        } catch (err) {
          // Keep current local cart on network sync failure
        }
      },
    }),
    {
      name: 'gourmet_cart_storage',
      partialize: (state) => ({ items: state.items }), // don't persist drawer open state across reload
    }
  )
);
