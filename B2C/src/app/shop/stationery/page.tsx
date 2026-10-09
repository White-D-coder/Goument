import ShopCollectionPage, { type CollectionSearchParams } from '@/components/ShopCollectionPage';

export const metadata = {
  title: 'Premium Stationery',
  description: 'Explore bookmarks, diaries and considered stationery from Eternal Paper Co.',
};

export default function StationeryPage({ searchParams }: { searchParams: CollectionSearchParams }) {
  return <ShopCollectionPage collection="stationery" searchParams={searchParams} />;
}
