import HeroTitle from '@/components/HeroTitle';
import HeroSlideshow from '@/components/HeroSlideshow';
import HomeMotion from '@/components/home/HomeMotion';
import HomeFAQ from '@/components/home/HomeFAQ';
import { SectionHeading, HomeProductCard, BrandPhilosophy, GourmetStory, CorporateBand } from '@/components/home/HomeSections';
import { flavourStories, homeFAQs } from '@/lib/home-content';
import { CURATED_HAMPERS } from '@/lib/curated-hampers';
import { homeMetadata, homeStructuredData } from '@/lib/home-seo';
import './home.css';

export const metadata = homeMetadata;
const corporateUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL || 'https://thegourmetgifts.co/';

export default function Home() {
  const structuredData = homeStructuredData([], homeFAQs);
  return <div className="atelier-home tgg-home">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <HomeMotion />
    <div className="tgg-home-opening">
      <section className="tgg-hero" aria-labelledby="hero-title">
        <HeroSlideshow />
        <div className="tgg-hero-shade" aria-hidden="true" />
        <div className="tgg-hero-frame" aria-hidden="true" />
        <div className="tgg-hero-copy">
          <HeroTitle />
        </div>
      </section>

      <section className="tgg-hamper-showcase tgg-section" id="hampers" aria-labelledby="hamper-heading">
        <SectionHeading kicker="Curated with care" title="Our Gift Hampers" id="hamper-heading" />
        <div className="tgg-hamper-grid">{CURATED_HAMPERS.map(product => <HomeProductCard key={product._id} product={product} sizes="(max-width: 700px) 88vw, (max-width: 900px) 92vw, (max-width: 1400px) 46vw, 650px" />)}</div>
      </section>
    </div>

    <GourmetStory stories={flavourStories} />
    <BrandPhilosophy />
    <div className="tgg-section"><HomeFAQ items={homeFAQs} /></div>
    <CorporateBand href={corporateUrl} />
  </div>;
}
