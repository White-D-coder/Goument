/** Public storefront destinations shared by the navbar and footer. */
export const shopCategories = [
  { title: 'Envelopes', search: 'envelope' },
  { title: 'Hampers', search: 'hamper' },
  { title: 'Laddoo Candles', search: 'candles' },
  { title: 'Premium Stationery', search: 'stationery' },
] as const;

export const shopCategoryLinks = shopCategories.map(({ title, search }) =>
  [title, `/shop?search=${encodeURIComponent(search)}`] as const);

export function storefrontNavigation(): [string, string][] {
  const corporateSiteUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL
    || 'https://thegourmetgifts.co/';
  return [['Hampers', '/b2c#hampers'], ['Collections', '/shop'], ['Corporate', corporateSiteUrl]];
}
