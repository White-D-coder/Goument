import HomeFAQ from '@/components/home/HomeFAQ';
import { BrandPhilosophy, CorporateBand, HomeFavouriteCard, HomeHamperCard, HomeHero, PackagingFeature, SectionHeading } from '@/components/home/HomeSections';
import { CURATED_HAMPERS } from '@/lib/curated-hampers';
import { HAMPERS_CATALOG } from '@/lib/catalogue-preview';
import { homeFAQs } from '@/lib/home-content';
import { homeMetadata, homeStructuredData } from '@/lib/home-seo';
import type { Product } from '@/lib/types';
import './home.css';

export const metadata = homeMetadata;
const corporateUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL || 'https://thegourmetgifts.co/';

const favouriteProducts: Product[] = HAMPERS_CATALOG.map(item => ({
  _id: item._id,
  slug: item.slug,
  name: item.name,
  basePrice: item.price * 100,
  currency: 'INR',
  description: { short: item.subCopy, long: item.description },
  inventory: 0,
  images: [{ public_id: item.image, alt: item.name }],
  variants: [],
  categories: [{ name: item.categoryLabel, slug: item.category }],
  categoryLabel: item.categoryLabel,
  giftItemId: item._id,
}));

const hamperCards = [
  { product: CURATED_HAMPERS[0] },
  { product: CURATED_HAMPERS[1], image: CURATED_HAMPERS[1].images[0].public_id, title: 'India Hamper · Burgundy' },
  { product: CURATED_HAMPERS[1], image: CURATED_HAMPERS[1].images[1].public_id, title: 'India Hamper · Lavender' },
];

export default function Home() {
  const structuredData = homeStructuredData([...CURATED_HAMPERS, ...favouriteProducts], homeFAQs);
  return <div className="atelier-home tgg-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

    <HomeHero />

    <section className="tgg-hamper-showcase tgg-section" id="hampers" aria-labelledby="hamper-heading">
      <SectionHeading kicker="Curated hampers" title="Hampers for every occasion" id="hamper-heading" href="/shop/hampers" action="View all hampers" />
      <div className="tgg-hamper-grid">{hamperCards.map((card, index) => <HomeHamperCard key={`${card.product._id}-${card.image || index}`} {...card} />)}</div>
    </section>

    <section className="tgg-favourites tgg-section" aria-labelledby="favourites-heading">
      <SectionHeading kicker="Our favourites" title="Thoughtful picks just for you" id="favourites-heading" href="/shop" action="View all gifts" />
      <div className="tgg-favourite-grid">{HAMPERS_CATALOG.map(product => <HomeFavouriteCard key={product._id} product={product} />)}</div>
    </section>

    <PackagingFeature />
    <BrandPhilosophy />
    <div className="tgg-section tgg-faq-section" id="faqs"><HomeFAQ items={homeFAQs} /></div>
    <CorporateBand href={corporateUrl} />
  </div>;
}
