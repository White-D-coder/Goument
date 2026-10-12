import { money, type Product } from './types';

// Temporary display prices only; never used for cart totals or checkout.
const temporaryPrices: Partial<Record<string, number>> = {
  'ivory-hamper': 249900,
  'india-hamper': 299900,
};

export function temporaryHamperPriceLabel(product: Pick<Product, 'slug' | 'preview'>): string | null {
  const amount = temporaryPrices[product.slug];
  return product.preview && typeof amount === 'number' ? money(amount, 'INR') : null;
}
