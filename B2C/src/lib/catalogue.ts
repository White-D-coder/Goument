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
let backendRetryAt = 0;
async function publicCatalogueRequest(url: string, signal: AbortSignal) {
  if (Date.now() < backendRetryAt) throw new Error('Catalogue temporarily unavailable');
  try {
    const response = await fetch(url, { next: { revalidate: 60 }, signal });
    if (response.status >= 500 || response.status === 429) backendRetryAt = Date.now() + 15000;
    return response;
  } catch {
    backendRetryAt = Date.now() + 15000;
    throw new Error('Catalogue temporarily unavailable');
  }
}

async function fetchCatalogue(search: string, sort: string, page: number, signal = AbortSignal.timeout(2500), limit = 12): Promise<CatalogueApiResponse> {
  const query = new URLSearchParams({ search, sort, page: String(page), limit: String(limit) });
  const response = await publicCatalogueRequest(`${backend}/api/v1/products?${query}`, signal);
  if (!response.ok) throw new Error('Catalogue unavailable');
  const data = await response.json() as CatalogueApiResponse;
  if (!Array.isArray(data.products)) throw new Error('Invalid catalogue');
  return data;
}

async function stationeryMatches(search: string, sort: string, signal: AbortSignal): Promise<CatalogueApiProduct[]> {
  const first = await fetchCatalogue(search, sort, 1, signal, 100);
  const pages = first.pages ?? 1;
  if (!Number.isInteger(pages) || pages < 0 || pages > 20) throw new Error('Invalid catalogue pagination');
  const products = [...(first.products || [])];
  for (let page = 2; page <= pages; page += 3) {
    const batch = await Promise.all(Array.from({length: Math.min(3, pages - page + 1)}, (_, index) => fetchCatalogue(search, sort, page + index, signal, 100)));
    for (const data of batch) products.push(...(data.products || []));
  }
  return products;
}

function enrichProduct(prod: CatalogueApiProduct): Product {
  const match = HAMPERS_CATALOG.find(h => h.slug === prod.slug || h._id === prod._id || h.name?.toLowerCase() === prod.name?.toLowerCase());
  const hasPrice = Number.isSafeInteger(prod.basePrice) && (prod.basePrice ?? 0) > 0;
  const hasStock = Number.isSafeInteger(prod.inventory) && (prod.inventory ?? -1) >= 0;
  const price = hasPrice ? prod.basePrice! : 0;
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
    inventory: hasStock ? prod.inventory! : 0,
    variants: prod.variants || [],
    images: [{ public_id: img, alt: prod.name }],
    preview: !hasPrice || !hasStock
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
    const deadline = AbortSignal.timeout(2500);
    const results = await Promise.all(['shagun', 'bookmarks', 'corporate'].map(term => stationeryMatches(term, sort, deadline)));
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
  const products = matches.map(p => ({ _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: 0, currency: 'INR', inventory: 0, variants: [], images: [{ public_id: p.image }], preview: true } as Product));
  const allProducts = withAllGiftHamperPreviews(products, search, page);
  return { products: allProducts.slice((page - 1) * 12, page * 12), pages: Math.ceil(allProducts.length / 12), total: allProducts.length, preview: true };
 }
}
export async function productBySlug(slug: string): Promise<Product | null> {
 const hamper = CURATED_HAMPERS.find(product => product.slug === slug);
 if (hamper) return hamper;
 try {
  const response = await publicCatalogueRequest(`${backend}/api/v1/products/${encodeURIComponent(slug)}`, AbortSignal.timeout(2500));
  if (response.status === 404) return null;
  if (!response.ok) throw new Error('Unavailable');
  const data = await response.json() as CatalogueApiProduct & { data?: CatalogueApiProduct };
  return enrichProduct(data.data || data);
 } catch {
  const p = HAMPERS_CATALOG.find(p => p.slug === slug);
  return p ? { _id: p._id, giftItemId: p._id, slug: p.slug, name: p.name, categoryLabel: p.categoryLabel, description: { short: p.subCopy, long: p.description }, basePrice: 0, currency: 'INR', inventory: 0, variants: [], images: [{ public_id: p.image }], preview: true } : null;
 }
}
