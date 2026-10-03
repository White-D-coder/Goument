import { Metadata } from 'next';
import HampersEcomView from '@/features/hampers/HampersEcomView';
import { JsonLd } from '@/components/JsonLd';
import { ECOM_HAMPERS } from '@/data/hampersEcomData';

export const metadata: Metadata = {
  title: 'Curated Gift Hampers | Festive, Corporate & Family Suites | The Gourmet Gifts',
  description:
    'Explore our artisanal e-commerce collection of pre-curated and customizable luxury gift hampers. Crafted for festive occasions, Diwali, corporate partnerships, weddings, and family celebrations.',
  openGraph: {
    title: 'Curated Gift Hampers | The Gourmet Gifts',
    description:
      'Artisanal luxury gift hampers, royal tins, and multi-tier trunks curated for festive moments and corporate partnerships.',
    url: 'https://thegourmetgifts.co/hampers',
    images: [
      {
        url: '/images/hampers/hamper_grand_confectionery_chest.jpg',
        width: 1200,
        height: 800,
        alt: 'The Gourmet Gifts Curated Hampers',
      },
    ],
  },
  alternates: {
    canonical: 'https://thegourmetgifts.co/hampers',
  },
};

export default function HampersPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Curated Gift Hampers — The Gourmet Gifts',
    description:
      'Artisanal luxury gift hampers, royal tins, and multi-tier trunks curated for festive moments and corporate partnerships.',
    itemListElement: ECOM_HAMPERS.map((hamper, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: hamper.name,
        description: hamper.subtitle,
        image: `https://thegourmetgifts.co${hamper.image}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: hamper.price,
          availability: hamper.readyToShip
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <HampersEcomView />
    </>
  );
}
