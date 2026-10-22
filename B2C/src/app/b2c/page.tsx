import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import HomeHero from '@/components/home/HomeHero';
import HomeFAQ from '@/components/home/HomeFAQ';
import { BrandPhilosophy, CorporateBand, HomeCollectionCard, HomeHamperCard, HomeMobileCategories, PackagingFeature, SectionHeading } from '@/components/home/HomeSections';
import { CURATED_HAMPERS } from '@/lib/curated-hampers';
import { homeFAQs } from '@/lib/home-content';
import { homeMetadata, homeStructuredData } from '@/lib/home-seo';
import { PHOTOGRAPHED_ENVELOPES } from '@/lib/photographed-envelopes';
import { money, productImage } from '@/lib/types';
import { BOOKMARK_PHOTOS } from '@/lib/bookmark-photos';
import { sampleProductPriceLabel } from '@/lib/product-pricing';
import { shopCollections } from '@/lib/shop-collections';
import './home.css';

export const metadata = homeMetadata;
const corporateUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL || 'https://thegourmetgifts.co/';
const homeEnvelope = PHOTOGRAPHED_ENVELOPES[0];

const homeCollections = [
  { title: shopCollections.envelopes.title, description: homeEnvelope.description.short || '', image: productImage(homeEnvelope), href: '/shop/envelopes', price: `From ${money(149900, 'INR')}` },
  { title: shopCollections.candles.title, description: 'Festive candles, ready to make a moment feel special.', image: '/images/scented_candle/cn3-supplied.webp', href: '/shop/candles', price: `From ${sampleProductPriceLabel('laddoo-candles')}` },
  { title: shopCollections.stationery.title, description: 'Eternal Paper Co. bookmarks, diaries and stationery.', image: BOOKMARK_PHOTOS[0].public_id, href: '/shop/stationery', price: `From ${sampleProductPriceLabel('bookmarks')}` },
];

const hamperCards = [
  { product: CURATED_HAMPERS[0], mobileDescription: 'A thoughtful gift in ivory.' },
  { product: CURATED_HAMPERS[1], mobileDescription: 'A little taste of India in burgundy.' },
  { product: CURATED_HAMPERS[2], mobileDescription: 'A little taste of India in lavender.' },
];

export default function Home() {
  const structuredData = homeStructuredData(CURATED_HAMPERS, homeFAQs);
  return <div className="atelier-home tgg-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />

    <HomeHero />
    <HomeMobileCategories />

    <section className="tgg-hamper-showcase tgg-section" id="hampers" aria-labelledby="hamper-heading">
      <SectionHeading kicker="Curated hampers" title="Hampers for every occasion" id="hamper-heading" href="/shop/hampers" action="View all hampers" />
      <div className="tgg-hamper-grid">{hamperCards.map(card => <HomeHamperCard key={card.product._id} {...card} />)}</div>
    </section>

    <section className="tgg-favourites tgg-section" aria-labelledby="favourites-heading">
      <SectionHeading kicker="Our favourites" title="Thoughtful picks just for you" id="favourites-heading" href="/shop" action="View all gifts" />
      <div className="tgg-favourite-grid tgg-collection-grid">
        {homeCollections.map(collection => <HomeCollectionCard key={collection.href} {...collection} />)}
        <Link className="tgg-explore-all-card" href="/shop" aria-label="Explore all gifts">
          <span className="tgg-explore-all-title">Explore</span>
          <span>All gifts</span>
          <ArrowRight size={28} aria-hidden="true" />
        </Link>
      </div>
    </section>

    <PackagingFeature />
    <BrandPhilosophy />
    <div className="tgg-section tgg-faq-section" id="faqs"><HomeFAQ items={homeFAQs} /></div>
    <CorporateBand href={corporateUrl} />
  </div>;
}
