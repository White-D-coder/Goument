import type { Product } from './types';

const designs = [
  { slug: 'floral-jar-candle', name: 'Floral Jar Candle', description: 'An ivory candle in a glass jar, finished with sculpted flowers.', views: ['cn1', 'cn1.1'] },
  { slug: 'himalayan-dusk-candle', name: 'Himalayan Dusk Candle', description: 'Pine, jasmine and amber in a warm amber jar.', views: ['cn2', 'cn2.1'] },
  { slug: 'laddoo-candles', name: 'Artisanal Laddoo Candles', description: 'Laddoo-shaped festive candles in individual white presentation boxes.', views: ['cn3-supplied'], giftItemId: 'laddoo_candles' },
];

// Photo previews can be saved to the gift draft; selling prices/stock remain pending.
export const PHOTOGRAPHED_CANDLES: Product[] = designs.map(design => ({
  _id: design.giftItemId || `preview-candle-${design.slug}`,
  giftItemId: design.giftItemId || `preview-candle-${design.slug}`,
  slug: design.slug,
  name: design.name,
  description: { short: design.description },
  categoryLabel: 'Scented Candles',
  categories: [{ name: 'Candles', slug: 'candles' }],
  basePrice: 0, currency: 'INR', inventory: 0, variants: [], preview: true,
  images: design.views.map((view, index) => ({
    public_id: `/images/scented_candle/${view}.webp`,
    alt: `${design.name}${index ? ` — detail ${index}` : ''}`,
  })),
}));

export function photographedCandleMatches(search: string): Product[] {
  const words = search.trim().toLowerCase().replace(/candles\b/g, 'candle').split(/\s+/).filter(Boolean);
  return PHOTOGRAPHED_CANDLES.filter(product => {
    const text = `${product.name} ${product.categoryLabel} ${product.description.short}`.toLowerCase();
    return words.every(word => text.includes(word));
  });
}

export function withCandlePhotos(product: Product): Product {
  const candle = PHOTOGRAPHED_CANDLES.find(item => item.slug === product.slug || item.giftItemId && item.giftItemId === product.giftItemId);
  return candle ? { ...product, giftItemId: candle.giftItemId, images: candle.images, description: candle.description, categories: product.categories || candle.categories } : product;
}
