import ShopCollectionPage, { type CollectionSearchParams } from '@/components/ShopCollectionPage';

export const metadata = {
  title: 'Hampers',
  description: 'Explore thoughtful gift hampers for celebrations and special occasions.',
};

export default function HampersPage({ searchParams }: { searchParams: CollectionSearchParams }) {
  return <ShopCollectionPage collection="hampers" searchParams={searchParams} />;
}
