import 'server-only';
import { HAMPERS_CATALOG } from './catalogue-preview';
import { CURATED_HAMPERS, curatedHamperMatches } from './curated-hampers';
import type { Product } from './types';
const backend = process.env.BACKEND_URL || 'https://backendbtwoc.vercel.app';
const isStationerySearch = (search: string) => /^(?:premium\s+)?stationer(?:y|ies)$/i.test(search.trim());
type CatalogueApiProduct = {
  _id?: string;
  slug?: string;
  name?: string;
  basePrice?: number;
  media?: { url?: string }[];
  images?: { public_id?: string; url?: string }[];
  giftItemId?: string;
  categoryLabel?: string;
  description?: Product['description'] | string;
  shortDescription?: string;
  currency?: string;
  inventory?: number;
  createdAt?: string;
  variants?: Product['variants'];
};
type CatalogueApiResponse = { products?: CatalogueApiProduct[]; pages?: number; total?: number };

async function fetchCatalogue(search: string, sort: string, page: number): Promise<CatalogueApiResponse> {
  const query = new URLSearchParams({ search, sort, page: String(page), limit: '12' });
  const response = await fetch(`${backend}/api/v1/products?${query}`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error('Catalogue unavailable');
  return await response.json() as CatalogueApiResponse;
}

async function stationeryMatches(search: string, sort: string): Promise<CatalogueApiProduct[]> {
  const first = await fetchCatalogue(search, sort, 1);
  const pages = first.pages ?? 1;
  if (!Number.isInteger(pages) || pages < 0 || pages > 100) throw new Error('Invalid catalogue pagination');
  const products = [...(first.products || [])];
  for (let page = 2; page <= pages; page++) {
    const data = await fetchCatalogue(search, sort, page);
    products.push(...(data.products || []));
  }
  return products;
}

function enrichProduct(prod: CatalogueApiProduct): Product {
  const match = HAMPERS_CATALOG.find(h => h.slug === prod.slug || h._id === prod._id || h.name?.toLowerCase() === prod.name?.toLowerCase());
  const price = typeof prod.basePrice === 'number' && prod.basePrice > 0 ? prod.basePrice : ((match?.price || 499) * 100);
  const img = prod.media?.[0]?.url || prod.images?.[0]?.public_id || prod.images?.[0]?.url || match?.image || '/images/brand/hero.png';
  return {
    _id: prod._id || match?._id || prod.slug || '',
    giftItemId: match?._id || prod.giftItemId || prod._id || '',
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

function withAllGiftHamperPreviews(products: Product[], search: string, page: number) {
 if (search || page !== 1) return products;
 const existingSlugs = new Set(products.map(product => product.slug));
 return [...products, ...CURATED_HAMPERS.filter(product => !existingSlugs.has(product.slug))];
}

export async function catalogue(search = '', sort = 'newest', page = 1) {
 const hampers = curatedHamperMatches(search);
 if (hampers !== null) {
  return { products: hampers.slice((page - 1) * 12, page * 12), pages: Math.ceil(hampers.length / 12), total: hampers.length, preview: true };
 }
 try {
  const stationerySearch = isStationerySearch(search);
  if (stationerySearch) {
    const results = await Promise.all(['shagun', 'bookmarks', 'corporate'].map(term => stationeryMatches(term, sort)));
    const matches = [...new Map(results.flat().map(product => [product._id || product.slug || product.name || '', product])).values()];
    if (sort === 'newest') matches.sort((a, b) => (Date.parse(b.createdAt || '') || 0) - (Date.parse(a.createdAt || '') || 0));
    const products = matches.map(enrichProduct);
    if (sort === 'price_asc' || sort === 'price_desc') products.sort((a, b) => (sort === 'price_asc' ? 1 : -1) * (a.basePrice - b.basePrice));
   const total = products.length;
   return { products: products.slice((page - 1) * 12, page * 12), pages: Math.ceil(total / 12), total, preview: false };
  }
  const data = await fetchCatalogue(search, sort, page);
    const sourceProducts = data.products || [];
    const products = withAllGiftHamperPreviews(sourceProducts.map(enrichProduct), search, page);
    const added = products.length - sourceProducts.length;
    return { products, pages: data.pages || 1, total: (data.total ?? (data.products || []).length) + added, preview: false };
 } catch {
  const matches = HAMPERS_CATALOG.filter(p => isStationerySearch(search)
   ? ['shagun', 'bookmarks', 'corporate'].includes(p.category)
   : `${p.name} ${p.categoryLabel} ${p.category} ${p.subCopy}`.toLowerCase().includes(search.toLowerCase()));
  if (isStationerySearch(search) && (sort === 'price_asc' || sort === 'price_desc')) matches.sort((a, b) => (sort === 'price_asc' ? 1 : -1) * (a.price - b.price));
  const products = matches.map(p => ({ _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: p.price * 100, currency: 'INR', inventory: 50, variants: [], images: [{ public_id: p.image }], preview: false } as Product));
  const allProducts = withAllGiftHamperPreviews(products, search, page);
  return { products: allProducts.slice((page - 1) * 12, page * 12), pages: Math.ceil(allProducts.length / 12), total: allProducts.length, preview: false };
 }
}
export async function productBySlug(slug: string): Promise<Product | null> {
 const hamper = CURATED_HAMPERS.find(product => product.slug === slug);
 if (hamper) return hamper;
 try {
  const response = await fetch(`${backend}/api/v1/products/${encodeURIComponent(slug)}`, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unavailable');
  const data = await response.json() as CatalogueApiProduct & { data?: CatalogueApiProduct };
  return enrichProduct(data.data || data);
 } catch {
  const p = HAMPERS_CATALOG.find(p => p.slug === slug);
  return p ? { _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: p.price * 100, currency: 'INR', inventory: 50, variants: [], images: [{ public_id: p.image }], preview: false } : null;
 }
}
