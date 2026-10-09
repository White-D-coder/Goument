import HomeFAQ from '@/components/home/HomeFAQ';
import { BrandPhilosophy, CorporateBand, HomeCollectionCard, HomeHamperCard, HomeHero, PackagingFeature, SectionHeading } from '@/components/home/HomeSections';
import { CURATED_HAMPERS } from '@/lib/curated-hampers';
import { homeFAQs } from '@/lib/home-content';
import { homeMetadata, homeStructuredData } from '@/lib/home-seo';
import './home.css';

export const metadata = homeMetadata;
const corporateUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL || 'https://thegourmetgifts.co/';

const homeCollections = [
  { title: 'Luxury Shagun Envelopes', description: 'Thoughtful envelopes for meaningful celebrations.', image: '/images/items/shagun_envelopes.webp', href: '/shop/envelopes' },
  { title: 'Scented Candles', description: 'Festive candles, ready to make a moment feel special.', image: '/images/items/laddoo_candles.webp', href: '/shop/candles' },
  { title: 'Eternal Paper Co.', description: 'Bookmarks, diaries and considered stationery.', image: '/images/items/bookmarks.webp', href: '/shop/stationery' },
];

const hamperCards = [
  { product: CURATED_HAMPERS[0] },
  { product: CURATED_HAMPERS[1], image: CURATED_HAMPERS[1].images[0].public_id },
  { product: CURATED_HAMPERS[1], image: CURATED_HAMPERS[1].images[1].public_id },
];

export default function Home() {
  const structuredData = homeStructuredData(CURATED_HAMPERS, homeFAQs);
  return <div className="atelier-home tgg-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

    <HomeHero />

    <section className="tgg-hamper-showcase tgg-section" id="hampers" aria-labelledby="hamper-heading">
      <SectionHeading kicker="Curated hampers" title="Hampers for every occasion" id="hamper-heading" href="/shop/hampers" action="View all hampers" />
      <div className="tgg-hamper-grid">{hamperCards.map((card, index) => <HomeHamperCard key={`${card.product._id}-${card.image || index}`} {...card} />)}</div>
    </section>

    <section className="tgg-favourites tgg-section" aria-labelledby="favourites-heading">
      <SectionHeading kicker="Our favourites" title="Thoughtful picks just for you" id="favourites-heading" href="/shop" action="View all gifts" />
      <div className="tgg-favourite-grid tgg-collection-grid">{homeCollections.map(collection => <HomeCollectionCard key={collection.href} {...collection} />)}</div>
    </section>

    <PackagingFeature />
    <BrandPhilosophy />
    <div className="tgg-section tgg-faq-section" id="faqs"><HomeFAQ items={homeFAQs} /></div>
    <CorporateBand href={corporateUrl} />
  </div>;
}
