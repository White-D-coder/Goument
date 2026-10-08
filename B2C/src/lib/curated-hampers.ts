import type { Product } from './types';

// Supplied photography defines two display products, not saleable inventory.
// Prices and backend gift/variant mappings have not been supplied.
export const CURATED_HAMPERS: Product[] = [
  {
    _id: 'preview-ivory-hamper',
    slug: 'ivory-hamper',
    name: 'Ivory Hamper',
    description: { short: 'A thoughtful gift, presented in our ivory hamper box.' },
    categoryLabel: 'Hampers',
    categories: [{ name: 'Hampers', slug: 'hampers' }],
    basePrice: 0,
    currency: 'INR',
    inventory: 0,
    variants: [],
    preview: true,
    images: [{ public_id: '/images/brand/ivory_hamper.webp', alt: 'Ivory Hamper' }],
  },
  {
    _id: 'preview-india-hamper',
    slug: 'india-hamper',
    name: 'India Hamper',
    description: { short: 'Our India Hamper, shown in burgundy and lavender.' },
    categoryLabel: 'Hampers',
    categories: [{ name: 'Hampers', slug: 'hampers' }],
    basePrice: 0,
    currency: 'INR',
    inventory: 0,
    variants: [],
    preview: true,
    images: [
      { public_id: '/images/brand/burgundy_india_hamper.webp', alt: 'India Hamper in burgundy' },
      { public_id: '/images/brand/lavender_india_hamper.webp', alt: 'India Hamper in lavender' },
    ],
  },
];

export function curatedHamperMatches(search: string): Product[] | null {
  const query = search.trim().toLowerCase();
  if (!/\b(?:hampers?|ivory|india|burgundy|lavender)\b/.test(query)) return null;
  const words = query.replace(/hampers\b/g, 'hamper').split(/\s+/);
  return CURATED_HAMPERS.filter(product => {
    const text = `${product.name} ${product.description.short}`.toLowerCase();
    return words.every(word => text.includes(word));
  });
}
