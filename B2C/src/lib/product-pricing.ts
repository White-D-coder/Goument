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

// Shared storefront display figures for cards, PDPs and cart arithmetic.
// These do not populate inventory/basePrice or authorize orders/payments.
const samplePrices: Record<string, number> = {
  ...temporaryPrices,
  'shagun-envelopes': 49900,
  bookmarks: 34900,
  'diary-bottle-pen-set': 149900,
  'floral-jar-candle': 34900,
  'himalayan-dusk-candle': 49900,
  'laddoo-candles': 29900,
};
const envelopeSlugs = [
  'lotus-shagun-envelope', 'green-gold-shagun-envelope', 'baraat-shagun-envelope',
  'paisley-shagun-envelope', 'vintage-car-shagun-envelope', 'botanical-shagun-envelope',
  'hearts-shagun-envelope', 'teddy-bear-shagun-envelope', 'celebration-shagun-envelope',
];

export function previewProductPriceMinor(slug: string): number | null {
  return samplePrices[slug] ?? (envelopeSlugs.includes(slug) ? 9900 : null);
}

export function giftDisplayPriceMinor(id: string, slug?: string): number | null {
  const envelope = /^preview-envelope-ep([1-9])$/.exec(id);
  const mappedSlug = envelope ? envelopeSlugs[Number(envelope[1]) - 1]
    : id.startsWith('preview-candle-') ? id.slice('preview-candle-'.length) : id.replaceAll('_', '-');
  return previewProductPriceMinor(slug || mappedSlug);
}

export function sampleProductPriceLabel(slug: string): string {
  const amount = previewProductPriceMinor(slug) ?? (slug.includes('envelope') ? 9900 : 49900);
  return money(amount, 'INR');
}

export function productPriceLabel(product: Pick<Product, 'slug' | 'preview' | 'basePrice' | 'currency'>): string {
  return product.preview ? sampleProductPriceLabel(product.slug) : money(product.basePrice, product.currency);
}
