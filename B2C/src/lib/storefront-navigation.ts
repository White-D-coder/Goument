/** Public storefront destinations shared by the navbar and footer. */
export const shopCategories = [
  { title: 'Envelopes', search: 'envelope' },
  { title: 'Hampers', search: 'hamper' },
  { title: 'Laddoo Candles', search: 'candles' },
  { title: 'Premium Stationery', search: 'stationery' },
] as const;

export const shopCategoryLinks = shopCategories.map(({ title, search }) =>
  [title, `/shop?search=${encodeURIComponent(search)}`] as const);

export function storefrontNavigation(home: boolean): [string, string][] {
  const corporateSiteUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL
    || (home || process.env.NODE_ENV === 'production' ? 'https://thegourmetgifts.co/' : 'http://localhost:3000/');
  return home
    ? [['Hampers', '/b2c#hampers'], ['Collections', '/shop'], ['Corporate', corporateSiteUrl]]
    : [['Hampers', '/b2c#hampers'], ['Corporate', corporateSiteUrl], ['Our Story', '/b2c#our-story']];
}
