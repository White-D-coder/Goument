import { money, type Product } from './types';

import { envelopePackPrice } from './envelope-packs';
import inclusivePrices from '../../backend/gifting/prices.json';

// Offline display fallback; payable quotes always read the mapped Mongo SKU.
const samplePrices: Partial<Record<string, number>> = inclusivePrices;
export function hamperDisplayPriceMinor(slug: string): number | null {
  return ['ivory-hamper', 'india-hamper', 'india-hamper-burgundy', 'india-hamper-lavender'].includes(slug) ? samplePrices[slug] ?? null : null;
}

const envelopeSlugs = [
  'lotus-shagun-envelope', 'green-gold-shagun-envelope', 'baraat-shagun-envelope',
  'paisley-shagun-envelope', 'vintage-car-shagun-envelope', 'botanical-shagun-envelope',
  'hearts-shagun-envelope', 'teddy-bear-shagun-envelope', 'celebration-shagun-envelope',
];

export function previewProductPriceMinor(slug: string): number | null {
  return samplePrices[slug] ?? (envelopeSlugs.includes(slug) ? 249900 : null);
}

export function giftDisplayPriceMinor(id: string, slug?: string): number | null {
  const envelope = /^preview-envelope-ep([1-9])(?:-pack-10)?$/.exec(id);
  if (envelope) return envelopePackPrice(id.endsWith('-pack-10') ? 10 : 20);
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
