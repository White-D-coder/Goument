import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue & Collections — The Gourmet Gifts',
  description: 'Explore our complete artisanal catalogue across gourmet delicacies, beverages, lifestyle, desk essentials, and bespoke keepsakes.',
  alternates: {
    canonical: 'https://thegourmetgifts.co/collections',
  },
  openGraph: {
    title: 'Catalogue & Collections — The Gourmet Gifts',
    description: 'Explore our complete artisanal catalogue across gourmet delicacies, beverages, lifestyle, desk essentials, and bespoke keepsakes.',
    url: 'https://thegourmetgifts.co/collections',
    siteName: 'The Gourmet Gifts',
    type: 'website',
  },
};

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
