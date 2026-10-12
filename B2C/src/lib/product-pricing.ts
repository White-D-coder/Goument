import { money, type Product } from './types';

// Display amounts only; never authority for order creation or payment.
const temporaryPrices: Partial<Record<string, number>> = {
  'ivory-hamper': 249900,
  'india-hamper': 299900,
  'india-hamper-burgundy': 299900,
  'india-hamper-lavender': 299900,
};

export function hamperDisplayPriceMinor(slug: string): number | null {
  return temporaryPrices[slug] ?? null;
}

export const candleEstimateMinor = { min: 20000, max: 50000 } as const;

// User-requested sample figures for preview cards. These do not populate basePrice,
// cart calculations, inventory or server-owned quotes. Exact selling prices remain pending.
const samplePrices: Record<string, number> = {
  ...temporaryPrices,
  'shagun-envelopes': 49900,
  bookmarks: 34900,
  'diary-bottle-pen-set': 149900,
  'floral-jar-candle': 34900,
  'himalayan-dusk-candle': 49900,
  'laddoo-candles': 29900,
};

export function sampleProductPriceLabel(slug: string): string {
  const amount = samplePrices[slug] ?? (slug.includes('envelope') ? 9900 : 49900);
  return money(amount, 'INR');
}

export function productPriceLabel(product: Pick<Product, 'slug' | 'preview' | 'basePrice' | 'currency'>): string {
  return product.preview ? sampleProductPriceLabel(product.slug) : money(product.basePrice, product.currency);
}
