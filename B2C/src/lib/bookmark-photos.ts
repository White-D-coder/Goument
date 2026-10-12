import type { Product } from './types';

export const BOOKMARK_PHOTOS = [
  { public_id: '/images/bookmarks/six-stories.webp', alt: 'Eternal Paper Co. bookmarks with Indian landscapes, heritage patterns and floral artwork' },
  { public_id: '/images/bookmarks/vibrant-collection.webp', alt: 'Eternal Paper Co. illustrated bookmark collection arranged horizontally' },
];
export const BOOKMARK_SHORT_DESCRIPTION = 'Illustrated bookmarks celebrating Indian landscapes, culture and colour.';
export const BOOKMARK_DESCRIPTION = 'A thoughtful companion for your next chapter. Discover rounded bookmarks with mountain and tea-garden landscapes, riverside scenes, floral artwork and vibrant heritage-inspired patterns from Eternal Paper Co.';

/** Supplied photography changes presentation, never commercial fields or identity. */
export function withBookmarkPhotos(product: Product): Product {
  if (product.slug !== 'bookmarks' && product.giftItemId !== 'bookmarks' && product._id !== 'bookmarks') return product;
  return { ...product, images: BOOKMARK_PHOTOS, description: { ...product.description, short: BOOKMARK_SHORT_DESCRIPTION, long: BOOKMARK_DESCRIPTION } };
}
