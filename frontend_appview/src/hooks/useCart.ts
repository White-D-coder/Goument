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

export const BOX_CAPACITIES: Record<string, number> = {
  box_maroon_bloom: 4,
  box_midnight_bloom: 5,
  box_lavender_bloom: 4,
  box_two_tier_luxe: 8,
  box_magnetic_top_lid: 6,
  box_corrugated: 4,
  box_tin: 4,
  box_premium_hamper_tray: 6,
};

export const isBoxItemKey = (name: string, productId: string) => {
  return (
    name.startsWith('Signature Box:') ||
    productId.startsWith('box_') ||
    productId.startsWith('box-') ||
    productId.startsWith('custom-box')
  );
};

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number; // in paise
  isDrawerOpen: boolean;
  isCapacityModalOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  openCapacityModal: () => void;
  closeCapacityModal: () => void;
  addItem: (item: Omit<CartItem, 'id'>) => Promise<boolean>;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => boolean;
  clearCart: () => void;
  syncWithServer: () => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (setStore, getStore) => ({
      items: [],
      isDrawerOpen: false,
      isCapacityModalOpen: false,
      openDrawer: () => setStore({ isDrawerOpen: true }),
      closeDrawer: () => setStore({ isDrawerOpen: false }),
      toggleDrawer: () => setStore({ isDrawerOpen: !getStore().isDrawerOpen }),
      openCapacityModal: () => setStore({ isCapacityModalOpen: true }),
      closeCapacityModal: () => setStore({ isCapacityModalOpen: false }),

      get totalItems() {
        return getStore().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      get totalAmount() {
        return getStore().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      addItem: async (newItemData) => {
        const currentItems = getStore().items;
        const isAddingBox = isBoxItemKey(newItemData.name, newItemData.productId);

        // If adding delicacy, check if box capacity is reached
        if (!isAddingBox) {
          const selectedBoxes = currentItems.filter((i) => isBoxItemKey(i.name, i.productId));
          const totalBoxCapacity = selectedBoxes.reduce((acc, box) => {
            const cap = BOX_CAPACITIES[box.productId] || 4;
            return acc + cap * box.quantity;
          }, 0);

          if (totalBoxCapacity > 0) {
            const totalDelicacies = currentItems
              .filter((i) => !isBoxItemKey(i.name, i.productId))
              .reduce((acc, i) => acc + i.quantity, 0);

            if (totalDelicacies + newItemData.quantity > totalBoxCapacity) {
              setStore({ isCapacityModalOpen: true });
              return false; // capacity reached
            }
          }
        }

        const compositeId = `${newItemData.productId}_${newItemData.variantId || 'base'}_${newItemData.giftBoxingType || 'none'}`;
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
            const queue = (await get<any[]>('offline_cart_queue')) || [];
            queue.push({ type: 'ADD', payload: newItemData, timestamp: Date.now() });
            await set('offline_cart_queue', queue);
          }
        }

        return true;
      },

      removeItem: (id) => {
        const updated = getStore().items.filter((i) => i.id !== id);
        setStore({ items: updated });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          getStore().removeItem(id);
          return true;
        }

        const currentItems = getStore().items;
        const targetItem = currentItems.find((i) => i.id === id);
        if (!targetItem) return false;

        const isBox = isBoxItemKey(targetItem.name, targetItem.productId);

        if (!isBox) {
          const selectedBoxes = currentItems.filter((i) => isBoxItemKey(i.name, i.productId));
          const totalBoxCapacity = selectedBoxes.reduce((acc, box) => {
            const cap = BOX_CAPACITIES[box.productId] || 4;
            return acc + cap * box.quantity;
          }, 0);

          if (totalBoxCapacity > 0) {
            const otherDelicacies = currentItems
              .filter((i) => !isBoxItemKey(i.name, i.productId) && i.id !== id)
              .reduce((acc, i) => acc + i.quantity, 0);

            if (otherDelicacies + quantity > totalBoxCapacity) {
              setStore({ isCapacityModalOpen: true });
              return false;
            }
          }
        }

        const updated = currentItems.map((i) => (i.id === id ? { ...i, quantity } : i));
        setStore({ items: updated });
        return true;
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
      partialize: (state) => ({ items: state.items }),
    }
  )
);
