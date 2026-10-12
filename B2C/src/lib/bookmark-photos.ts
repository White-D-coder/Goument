import type { Product } from './types';

export const BOOKMARK_PHOTOS = [
  { public_id: '/images/bookmarks/six-stories.webp', alt: 'Eternal Paper Co. bookmarks with Indian landscapes, heritage patterns and floral artwork' },
  { public_id: '/images/bookmarks/vibrant-collection.webp', alt: 'Eternal Paper Co. illustrated bookmark collection arranged horizontally' },
];
export const BOOKMARK_SHORT_DESCRIPTION = 'Illustrated bookmarks celebrating Indian landscapes, culture and colour.';
export const BOOKMARK_DESCRIPTION = 'A thoughtful companion for your next chapter. Discover rounded bookmarks with mountain and tea-garden landscapes, riverside scenes, floral artwork and vibrant heritage-inspired patterns from Eternal Paper Co.';

export const BOOKMARK_DESIGNS = [
  { id: 'vibrant_art_bookmarks', slug: 'vibrant-art-bookmarks', name: 'Vibrant Art Bookmarks', description: 'Bold folk-art patterns, a peacock and lotus flowers for your next chapter.', image: '/images/bookmarks/vibrant-art.webp' },
  { id: 'wanderlust_bookmarks', slug: 'wanderlust-bookmarks', name: 'Wanderlust Bookmarks', description: 'Mountain lakes, green tea gardens and riverside evenings between the pages.', image: '/images/bookmarks/wanderlust-desk.webp' },
];

export const PHOTOGRAPHED_BOOKMARKS: Product[] = BOOKMARK_DESIGNS.map(design => ({
  _id: design.id, giftItemId: design.id, slug: design.slug, name: design.name,
  description: { short: design.description }, categoryLabel: 'Premium Stationery',
  categories: [{ name: 'Bookmarks', slug: 'bookmarks' }],
  basePrice: 0, currency: 'INR', inventory: 0, variants: [], preview: true,
  images: [{ public_id: design.image, alt: design.name }],
}));

export function photographedBookmarkMatches(search: string): Product[] {
  const words = search.trim().toLowerCase().replace(/bookmarks\b/g, 'bookmark').split(/\s+/).filter(Boolean);
  return PHOTOGRAPHED_BOOKMARKS.filter(product => {
    const text = `${product.name} ${product.categoryLabel} ${product.description.short}`.toLowerCase();
    return words.every(word => text.includes(word));
  });
}

/** Supplied photography changes presentation, never commercial fields or identity. */
export function withBookmarkPhotos(product: Product): Product {
  const design = PHOTOGRAPHED_BOOKMARKS.find(item => item.slug === product.slug || item.giftItemId === product.giftItemId);
  if (design) return { ...product, giftItemId: design.giftItemId, images: design.images, description: design.description, categories: product.categories || design.categories };
  if (product.slug !== 'bookmarks' && product.giftItemId !== 'bookmarks' && product._id !== 'bookmarks') return product;
  return { ...product, images: BOOKMARK_PHOTOS, description: { ...product.description, short: BOOKMARK_SHORT_DESCRIPTION, long: BOOKMARK_DESCRIPTION } };
}
