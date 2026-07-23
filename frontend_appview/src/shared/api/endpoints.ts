import { apiClient } from './client';

export interface GiftBoxOption {
  type: string;
  name: string;
  heroImage: string;
  surcharge: number;
}

export const getGiftBoxing = async (): Promise<GiftBoxOption[]> => {
  try {
    const response: any = await apiClient.get('/gift-boxing');
    return response.data?.data || response.data;
  } catch (err) {
    // Fallback static packaging tiers if backend is starting up
    return [
      {
        type: 'classics',
        name: 'The Classics',
        heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
        surcharge: 0,
      },
      {
        type: 'royale-tin',
        name: 'Royale Tin',
        heroImage: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop',
        surcharge: 799,
      },
      {
        type: 'premium-velvet',
        name: 'Premium Velvet',
        heroImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
        surcharge: 499,
      },
    ];
  }
};

export const getProducts = async (params?: Record<string, any>) => {
  try {
    const response: any = await apiClient.get('/products', { params });
    return response.data;
  } catch (err) {
    return { data: [] };
  }
};

export const getProductBySlug = async (slug: string) => {
  const response: any = await apiClient.get(`/products/${slug}`);
  return response.data?.data || response.data;
};

export const getCart = async () => {
  const response: any = await apiClient.get('/cart');
  return response.data?.data || response.data;
};

export const addToCartAPI = async (item: {
  productId: string;
  variantId?: string;
  giftBoxingType?: string;
  quantity: number;
}) => {
  const response: any = await apiClient.post('/cart/items', item);
  return response.data;
};

export const syncCartAPI = async (items: any[], forceClient = false) => {
  const response: any = await apiClient.post('/cart/sync', { items, forceClient });
  return response.data;
};

export const placeOrderAPI = async (orderPayload: any, idempotencyKey: string) => {
  const response: any = await apiClient.post('/orders', orderPayload, {
    headers: {
      'Idempotency-Key': idempotencyKey,
    },
  });
  return response.data;
};

export const validateCouponAPI = async (code: string) => {
  const response: any = await apiClient.get(`/coupons/validate?code=${encodeURIComponent(code)}`);
  return response.data;
};

export const checkHealthAPI = async (): Promise<boolean> => {
  try {
    const response: any = await apiClient.get('/healthz', { timeout: 3000 });
    return response.status === 200;
  } catch (err) {
    return false;
  }
};
