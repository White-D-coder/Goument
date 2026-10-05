import 'server-only';
import { HAMPERS_CATALOG } from './catalogue-preview';
import type { Product } from './types';
const backend = process.env.BACKEND_URL || 'https://backendbtwoc.vercel.app';
function enrichProduct(prod: any): Product {
  const match = HAMPERS_CATALOG.find(h => h.slug === prod.slug || h._id === prod._id || h.name?.toLowerCase() === prod.name?.toLowerCase());
  const price = typeof prod.basePrice === 'number' && prod.basePrice > 0 ? prod.basePrice : ((match?.price || 499) * 100);
  const img = prod.media?.[0]?.url || prod.images?.[0]?.public_id || prod.images?.[0]?.url || match?.image || '/images/brand/hero.png';
  return {
    _id: prod._id,
    giftItemId: match?._id || prod.giftItemId || prod._id,
    slug: prod.slug || match?.slug || '',
    name: prod.name || match?.name || '',
    categoryLabel: match?.categoryLabel || prod.categoryLabel || 'Curated Hamper',
    description: typeof prod.description === 'object' && prod.description !== null ? prod.description : { short: prod.shortDescription || match?.subCopy, long: typeof prod.description === 'string' ? prod.description : match?.description },
    basePrice: price,
    currency: prod.currency || 'INR',
    inventory: typeof prod.inventory === 'number' ? prod.inventory : 50,
    variants: prod.variants || [],
    images: [{ public_id: img, alt: prod.name }],
    preview: false
  };
}

export async function catalogue(search = '', sort = 'newest', page = 1) {
 try {
  const query = new URLSearchParams({ search, sort, page: String(page), limit: '12' });
  const response = await fetch(`${backend}/api/v1/products?${query}`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('Catalogue unavailable');
  const data = await response.json();
  return { products: (data.products as any[]).map(enrichProduct) as Product[], pages: data.pages as number, total: data.total as number, preview: false };
 } catch {
  const matches = HAMPERS_CATALOG.filter(p => `${p.name} ${p.categoryLabel} ${p.category} ${p.subCopy}`.toLowerCase().includes(search.toLowerCase()));
  return { products: matches.slice((page - 1) * 12, page * 12).map(p => ({ _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: p.price * 100, currency: 'INR', inventory: 50, variants: [], images: [{ public_id: p.image }], preview: false } as Product)), pages: Math.ceil(matches.length / 12), total: matches.length, preview: false };
 }
}
export async function productBySlug(slug: string): Promise<Product | null> {
 try {
  const response = await fetch(`${backend}/api/v1/products/${encodeURIComponent(slug)}`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unavailable');
  const data = await response.json();
  return enrichProduct(data.data || data);
 } catch {
  const p = HAMPERS_CATALOG.find(p => p.slug === slug);
  return p ? { _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: p.price * 100, currency: 'INR', inventory: 50, variants: [], images: [{ public_id: p.image }], preview: false } : null;
 }
}
