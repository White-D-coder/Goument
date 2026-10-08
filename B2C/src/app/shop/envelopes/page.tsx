import ShopCollectionPage, { type CollectionSearchParams } from '@/components/ShopCollectionPage';

export const metadata = {
  title: 'Envelopes',
  description: 'Discover Shagun envelopes for weddings, celebrations and thoughtful gifting.',
};

export default function EnvelopesPage({ searchParams }: { searchParams: CollectionSearchParams }) {
  return <ShopCollectionPage collection="envelopes" searchParams={searchParams} />;
}
