import ShopCollectionPage, { type CollectionSearchParams } from '@/components/ShopCollectionPage';

export const metadata = {
  title: 'Scented Candles',
  description: 'Discover festive candles for thoughtful gifting.',
};

export default function CandlesPage({ searchParams }: { searchParams: CollectionSearchParams }) {
  return <ShopCollectionPage collection="candles" searchParams={searchParams} />;
}
