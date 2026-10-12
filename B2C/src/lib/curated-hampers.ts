import type { Product } from './types';

// Photographed colour selections have distinct gift draft identities.
// These previews do not establish saleable inventory or authoritative prices.
export const CURATED_HAMPERS: Product[] = [
  {
    _id: 'preview-ivory-hamper',
    slug: 'ivory-hamper',
    name: 'Ivory Hamper',
    description: { short: 'A thoughtful gift in ivory.' },
    categoryLabel: 'Hampers',
    categories: [{ name: 'Hampers', slug: 'hampers' }],
    basePrice: 0,
    currency: 'INR',
    inventory: 0,
    variants: [],
    preview: true,
    giftItemId: 'ivory_hamper',
    images: [{ public_id: '/images/brand/ivory_hamper.webp', alt: 'Ivory Hamper' }],
  },
  {
    _id: 'preview-india-hamper-burgundy',
    slug: 'india-hamper-burgundy',
    name: 'India Hamper · Burgundy',
    description: { short: 'Our India Hamper, presented in a burgundy box.' },
    categoryLabel: 'Hampers',
    categories: [{ name: 'Hampers', slug: 'hampers' }],
    basePrice: 0,
    currency: 'INR',
    inventory: 0,
    variants: [],
    preview: true,
    giftItemId: 'india_hamper_burgundy',
    images: [{ public_id: '/images/brand/burgundy_india_hamper.webp', alt: 'India Hamper in burgundy' }],
  },
  {
    _id: 'preview-india-hamper-lavender',
    slug: 'india-hamper-lavender',
    name: 'India Hamper · Lavender',
    description: { short: 'Our India Hamper, presented in a lavender box.' },
    categoryLabel: 'Hampers',
    categories: [{ name: 'Hampers', slug: 'hampers' }],
    basePrice: 0,
    currency: 'INR',
    inventory: 0,
    variants: [],
    preview: true,
    giftItemId: 'india_hamper_lavender',
    images: [{ public_id: '/images/brand/lavender_india_hamper.webp', alt: 'India Hamper in lavender' }],
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
