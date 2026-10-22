import { productBySlug } from '@/lib/catalogue';
import { isProductSlug, RECENTLY_VIEWED_REQUEST_LIMIT } from '@/lib/recently-viewed';

// Resolve a bounded list through the same public catalogue as product pages.
// The browser keeps the history; this endpoint does not read identity or store it.
export async function GET(request: Request) {
  const raw = new URL(request.url).searchParams.get('slugs') || '';
  const slugs = raw.split(',');
  const headers = { 'Cache-Control': 'private, no-store' };
  if (raw.length > 1000 || slugs.length > RECENTLY_VIEWED_REQUEST_LIMIT || !slugs.every(isProductSlug)) {
    return Response.json({ message: 'Choose up to six valid product slugs.' }, { status: 400, headers });
  }
  const results = await Promise.allSettled([...new Set(slugs)].map(productBySlug));
  const products = [...new Map(results.flatMap(result => result.status === 'fulfilled' && result.value ? [[result.value.slug, result.value] as const] : [])).values()];
  return Response.json({ products }, { headers });
}
