import { shopCollections } from './shop-collections';

/** Reuse collection labels while retaining existing navbar/footer search destinations. */
export const shopCategories = Object.values(shopCollections).map(({ title, search }) => ({ title, search }));

export const shopCategoryLinks = shopCategories.map(({ title, search }) =>
  [title, `/shop?search=${encodeURIComponent(search)}`] as const);

export function storefrontNavigation(): [string, string][] {
  const corporateSiteUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL
    || 'https://thegourmetgifts.co/';
  return [['Hampers', '/b2c#hampers'], ['Collections', '/shop'], ['Corporate', corporateSiteUrl]];
}
