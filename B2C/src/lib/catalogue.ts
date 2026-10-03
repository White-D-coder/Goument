import 'server-only';
import { HAMPERS_CATALOG } from './catalogue-preview';
import type { Product } from './types';
const backend = process.env.BACKEND_URL || 'https://backendbtwoc.vercel.app';
export async function catalogue(search = '', sort = 'newest', page = 1) {
 try {
  const query = new URLSearchParams({ search, sort, page: String(page), limit: '12' });
  const response = await fetch(`${backend}/api/v1/products?${query}`, { cache: 'no-store', signal: AbortSignal.timeout(2500) });
  if (!response.ok) throw new Error('Catalogue unavailable');
  const data = await response.json();
  if (!Array.isArray(data.products)) throw new Error('Invalid catalogue');
  return { products: data.products as Product[], pages: data.pages as number, total: data.total as number, preview: false };
 } catch {
  const matches = HAMPERS_CATALOG.filter(p => `${p.name} ${p.categoryLabel} ${p.category} ${p.subCopy}`.toLowerCase().includes(search.toLowerCase()));
  return { products: matches.slice((page - 1) * 12, page * 12).map(p => ({ _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: 0, currency: 'INR', inventory: 0, variants: [], images: [{ public_id: p.image }], preview: true } as Product)), pages: Math.ceil(matches.length / 12), total: matches.length, preview: true };
 }
}
export async function productBySlug(slug: string): Promise<Product | null> {
 try {
  const response = await fetch(`${backend}/api/v1/products/${encodeURIComponent(slug)}`, { cache: 'no-store', signal: AbortSignal.timeout(2500) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unavailable');
  return (await response.json()).data;
 } catch {
  const p = HAMPERS_CATALOG.find(p => p.slug === slug);
  return p ? { _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: 0, currency: 'INR', inventory: 0, variants: [], images: [{ public_id: p.image }], preview: true } : null;
 }
}
