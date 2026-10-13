/* eslint-disable @next/next/no-img-element -- Existing decorative SVG artwork. */
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Gift, Heart, Leaf, Gem } from 'lucide-react';
import ProductPhoto from '@/components/ProductPhoto';
import AddGiftToCartButton from '@/components/AddGiftToCartButton';
import { productImage, type Product } from '@/lib/types';
import { productPriceLabel } from '@/lib/product-pricing';
import { PHOTOGRAPHED_ENVELOPES } from '@/lib/photographed-envelopes';
import type { Testimonial } from '@/lib/home-content';
import { BOOKMARK_PHOTOS } from '@/lib/bookmark-photos';
import { HOME_FESTIVE_PHOTO } from '@/lib/home-photos';

export function SectionHeading({ kicker, title, id, href, action }: { kicker: string; title: string; id: string; href?: string; action?: string }) {
  return <div className="tgg-section-heading"><div><p className="tgg-kicker">{kicker}</p><h2 id={id}>{title}</h2></div>
    {href && <Link className="tgg-link" href={href}>{action || 'Explore'} <ArrowRight size={17} aria-hidden="true" /></Link>}
  </div>;
}

const mobileCategories = [
  { title: 'Envelopes', image: productImage(PHOTOGRAPHED_ENVELOPES[0]), href: '/shop/envelopes' },
  { title: 'Hampers', image: '/images/brand/ivory_hamper.webp', href: '/shop/hampers' },
  { title: 'Candles', image: '/images/scented_candle/cn3-supplied.webp', href: '/shop/candles' },
  { title: 'Stationery', image: BOOKMARK_PHOTOS[0].public_id, href: '/shop/stationery' },
];

export function HomeMobileCategories() {
  return <nav className="tgg-mobile-categories" aria-label="Gift collections">
    {mobileCategories.map(item => <Link key={item.href} href={item.href}>
      <ProductPhoto src={item.image} alt="" sizes="42px" />
      <span>{item.title}</span>
    </Link>)}
  </nav>;
}

/** Preview hampers can be saved to the gift bag; their prices remain enquiry-only. */
export function HomeHamperCard({ product, image, title, mobileDescription }: { product: Product; image?: string; title?: string; mobileDescription?: string }) {
  const href = `/products/${product.slug}`;
  const cardTitle = title || product.name;
  const cardImage = image || productImage(product);
  const cardAlt = product.images.find(item => item.public_id === cardImage)?.alt || cardTitle;
  const price = productPriceLabel(product);
  return <article className="tgg-hamper-card">
    <Link className="tgg-hamper-photo" href={href} aria-label={`View ${cardTitle}`}>
      <ProductPhoto src={cardImage} alt={cardAlt} sizes="(max-width: 700px) 86vw, (max-width: 1100px) 45vw, 30vw" />
    </Link>
    <div className="tgg-hamper-info">
      <h3><Link href={href}>{cardTitle}</Link></h3>
      <p><span className="tgg-hamper-description-desktop">{product.description.short}</span><span className="tgg-hamper-description-mobile">{mobileDescription || product.description.short}</span></p>
      {price && <p className="tgg-hamper-price">{price}</p>}
      <div className="tgg-hamper-bottom">
        {product.giftItemId && <AddGiftToCartButton itemId={product.giftItemId} name={cardTitle} withQuantity compact />}
      </div>
    </div>
  </article>;
}

/** Shared photo-first Home discovery cards link to a product or collection. */
export function HomeCollectionCard({ title, description, image, href, price, giftItemId }: { title: string; description: string; image: string; href: string; price: string; giftItemId?: string }) {
  return <article className="tgg-hamper-card tgg-collection-card phone-gift-card">
    <Link className="tgg-hamper-photo" href={href} aria-label={`Explore ${title}`}>
      <ProductPhoto src={image} alt={title} sizes="(max-width: 600px) 44vw, (max-width: 1000px) 30vw, 24vw" />
    </Link>
    <div className="tgg-hamper-info">
      <h3><Link href={href}>{title}</Link></h3>
      <p className="tgg-collection-description">{description}</p>
      <p className="tgg-hamper-price tgg-collection-price">{price.startsWith('From ') ? <><span className="tgg-collection-price-prefix">From</span>{price.slice(5)}</> : price}</p>
      <div className="tgg-hamper-bottom">
        {giftItemId ? <AddGiftToCartButton itemId={giftItemId} name={title} className="button" withQuantity compact /> : <Link className="tgg-collection-link" href={href} aria-label={`Shop ${title}`}><span className="tgg-collection-action-desktop">Shop now</span><span className="tgg-collection-action-mobile">Explore</span><ArrowRight size={15} aria-hidden="true" /></Link>}
      </div>
    </div>
  </article>;
}

export function PackagingFeature() {
  return <section className="tgg-packaging" id="packaging" aria-labelledby="packaging-heading">
    <div className="tgg-packaging-visual">
      <ProductPhoto src={HOME_FESTIVE_PHOTO} alt="An open gift hamper with curated treats nestled in satin" sizes="(max-width: 760px) 100vw, 52vw" />
    </div>
    <div className="tgg-packaging-copy">
      <p className="tgg-kicker">Because every gift tells a story</p>
      <h2 id="packaging-heading">Beautifully packaged.<br/>Thoughtfully curated.</h2>
      <p>From considered selections to the joy of unwrapping, discover gifts made for meaningful moments.</p>
      <Link className="tgg-button" href="/shop">Shop gifts <ArrowRight size={17} aria-hidden="true"/></Link>
    </div>
  </section>;
}

const approach = [
  { Icon: Gem, name: 'Considered details', copy: 'The little things, chosen well.' },
  { Icon: Gift, name: 'Beautiful presentation', copy: 'Made for the joy of unwrapping.' },
  { Icon: Leaf, name: 'Small indulgences', copy: 'A moment to savour.' },
  { Icon: Heart, name: 'A personal thought', copy: 'For someone who matters.' },
];


export function BrandPhilosophy() {
  return (
    <section
      className="tgg-philosophy tgg-section"
      id="our-story"
      aria-labelledby="philosophy-heading"
    >
      <p className="tgg-kicker">Why we do this</p>

      <div className="tgg-philosophy-title">
        <img
          className="tgg-philosophy-title__art tgg-philosophy-title__art--left"
          src="/images/brand/gift-sketch-right.svg"
          alt=""
          aria-hidden="true"
        />

        <h2 id="philosophy-heading">
          Gifting made easy.
        </h2>

        <img
          className="tgg-philosophy-title__art"
          src="/images/brand/gift-sketch-right.svg"
          alt=""
          aria-hidden="true"
        />
      </div>

      <p className="tgg-philosophy-copy">
        Thoughtful gifts, chosen with care.
      </p>

      <div className="tgg-approach">
        {approach.map(({ Icon, name, copy }) => (
          <div key={name}>
            <Icon
              size={24}
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <h3>{name}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


export function CorporateBand({ href }: { href: string }) {
  return (
    <section
      className="tgg-corporate"
      aria-labelledby="corporate-heading"
    >
      <div className="tgg-section">
        <div>
          <p className="tgg-kicker">Thoughtful gifting, thoughtfully done</p>

          <h2 id="corporate-heading">Make every gesture</h2>
        </div>

        <div>
          <p>
            From client appreciation to team celebrations, discover thoughtfully
            curated gifts designed to leave a lasting impression.
          </p>

          <Link
            className="tgg-button tgg-button--light"
            href={href}
          >
            Explore Corporate Gifting
            <ArrowUpRight
              size={18}
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TestimonialStrip({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;
  return <section className="tgg-testimonials tgg-section" aria-labelledby="testimonials-heading">
    <p className="tgg-kicker">A few kind words</p><h2 id="testimonials-heading">Gifts that meant something.</h2>
    <div>{testimonials.map(testimonial => <figure key={`${testimonial.name}-${testimonial.quote}`}><blockquote>{testimonial.quote}</blockquote><figcaption>{testimonial.name}{testimonial.context && <span>{testimonial.context}</span>}</figcaption></figure>)}</div>
  </section>;
}
