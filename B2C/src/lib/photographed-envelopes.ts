import type { Product } from './types';

// Photo previews can be saved to the gift draft; selling prices/stock remain pending.
const designs = [
  { number: 1, title: 'Lotus Shagun Envelope', slug: 'lotus-shagun-envelope', description: 'Pink lotus flowers and a scalloped lavender flap.', views: ['ep1_3', 'ep1', 'ep1_1', 'ep1_2'] },
  { number: 2, title: 'Green & Gold Shagun Envelope', slug: 'green-gold-shagun-envelope', description: 'A green and cream design with gold-toned floral details.', views: ['ep2'] },
  { number: 3, title: 'Baraat Shagun Envelope', slug: 'baraat-shagun-envelope', description: 'A festive procession illustration with red and white stripes.', views: ['ep3', 'ep3_1'] },
  { number: 4, title: 'Paisley Shagun Envelope', slug: 'paisley-shagun-envelope', description: 'A cream paisley design paired with a scalloped blue flap.', views: ['ep4'] },
  { number: 5, title: 'Vintage Car Shagun Envelope', slug: 'vintage-car-shagun-envelope', description: 'A vintage car illustration with a classic checked border.', views: ['ep5'] },
  { number: 6, title: 'Botanical Shagun Envelope', slug: 'botanical-shagun-envelope', description: 'Gold-toned botanical illustrations on a deep green background.', views: ['ep6'] },
  { number: 7, title: 'Hearts Shagun Envelope', slug: 'hearts-shagun-envelope', description: 'Pink hearts and stripes for a cheerful little gesture.', views: ['ep7'] },
  { number: 8, title: 'Teddy Bear Shagun Envelope', slug: 'teddy-bear-shagun-envelope', description: 'A pink scalloped design with a playful teddy bear detail.', views: ['ep8'] },
  { number: 9, title: 'Celebration Shagun Envelope', slug: 'celebration-shagun-envelope', description: 'Bright florals and playful illustrations for a celebration.', views: ['ep9'] },
];

export const PHOTOGRAPHED_ENVELOPES: Product[] = designs.map(design => ({
  _id: `preview-envelope-ep${design.number}`,
  giftItemId: `preview-envelope-ep${design.number}`,
  slug: design.slug,
  name: design.title,
  description: { short: design.description },
  categoryLabel: 'Shagun Envelopes',
  categories: [{ name: 'Envelopes', slug: 'envelopes' }],
  basePrice: 0,
  currency: 'INR',
  inventory: 0,
  variants: [],
  preview: true,
  images: design.views.map((view, index) => ({
    public_id: `/images/envelopes/${view}.webp`,
    alt: `${design.title}${index ? ` — detail ${index}` : ''}`,
  })),
}));

export function withEnvelopePhotos(product: Product): Product {
  const envelope = PHOTOGRAPHED_ENVELOPES.find(item => item.slug === product.slug);
  return envelope ? { ...product, giftItemId: envelope.giftItemId, images: envelope.images } : product;
}

export function photographedEnvelopeMatches(search: string): Product[] {
  const words = search.trim().toLowerCase().replace(/envelop(?:e?s)?\b/g, 'envelope').split(/\s+/).filter(Boolean);
  return PHOTOGRAPHED_ENVELOPES.filter(product => {
    const text = `${product.name} ${product.description.short}`.toLowerCase();
    return words.every(word => text.includes(word));
  });
}
