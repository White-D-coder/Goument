'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Gift, Heart, Leaf, Gem, Feather } from 'lucide-react';
import ProductPhoto from '@/components/ProductPhoto';
import QuantityControl from '@/components/QuantityControl';
import HomeHeroSlideshow from '@/components/home/HomeHeroSlideshow';
import { productImage, type Product } from '@/lib/types';
import type { Testimonial } from '@/lib/home-content';

export function SectionHeading({ kicker, title, id, href, action }: { kicker: string; title: string; id: string; href?: string; action?: string }) {
  return <div className="tgg-section-heading"><div><p className="tgg-kicker">{kicker}</p><h2 id={id}>{title}</h2></div>
    {href && <Link className="tgg-link" href={href}>{action || 'Explore'} <ArrowRight size={17} aria-hidden="true" /></Link>}
  </div>;
}

const heroPromises = [
  { Icon: Leaf, label: 'Curated with care' },
  { Icon: Gift, label: 'Beautifully presented' },
  { Icon: Feather, label: 'A personal note' },
  { Icon: Heart, label: 'For every occasion' },
];

export function HomeHero() {
  return <section className="tgg-hero" aria-labelledby="hero-title">
    <div className="tgg-hero-copy">
      <p className="tgg-kicker">Thoughtful gifts<br/>for every occasion</p>
      <h1 id="hero-title">Make everyday<br className="tgg-desktop-break"/> moments special.</h1>
      <p className="tgg-hero-description">Curated hampers and thoughtful finds to celebrate the people and moments that matter.</p>
      <Link className="tgg-button" href="/shop">Shop now <ArrowRight size={17} aria-hidden="true"/></Link>
      <ul className="tgg-hero-promises" aria-label="Our approach to gifting">
        {heroPromises.map(({ Icon, label }) => <li key={label}><span><Icon size={20} strokeWidth={1.4} aria-hidden="true"/></span><small>{label}</small></li>)}
      </ul>
    </div>
    <HomeHeroSlideshow />
  </section>;
}

/** Preview hampers keep their enquiry-only status and existing detail destinations. */
export function HomeHamperCard({ product, image, title }: { product: Product; image?: string; title?: string }) {
  const href = `/products/${product.slug}`;
  const cardTitle = title || product.name;
  const cardImage = image || productImage(product);
  const cardAlt = product.images.find(item => item.public_id === cardImage)?.alt || cardTitle;
  const [quantity, setQuantity] = useState(0);

  return <article className="tgg-hamper-card">
    <Link className="tgg-hamper-photo" href={href} aria-label={`View ${cardTitle}`}>
      <ProductPhoto src={cardImage} alt={cardAlt} sizes="(max-width: 700px) 86vw, (max-width: 1100px) 45vw, 30vw" />
    </Link>
    <div className="tgg-hamper-info">
      <h3><Link href={href}>{cardTitle}</Link></h3>
      <p>{product.description.short}</p>
      <div className="tgg-hamper-bottom">
        <div className="tgg-hamper-purchase">
          {quantity === 0 ? (
            <button type="button" className="tgg-hamper-cart-button" onClick={() => setQuantity(1)}>
              Add to cart
            </button>
          ) : (
            <QuantityControl name={cardTitle} value={quantity} onChange={value => setQuantity(Math.max(0, value))} />
          )}
        </div>
      </div>
    </div>
  </article>;
}

/** Home discovery cards route to their complete collection listings. */
export function HomeCollectionCard({ title, description, image, href }: { title: string; description: string; image: string; href: string }) {
  return <article className="tgg-favourite-card tgg-collection-card">
    <Link className="tgg-favourite-photo" href={href} aria-label={`Explore ${title}`}>
      <ProductPhoto src={image} alt={title} sizes="(max-width: 600px) 44vw, (max-width: 1000px) 30vw, 24vw" />
    </Link>
    <div className="tgg-favourite-info">
      <h3><Link href={href}>{title}</Link></h3>
      <p className="tgg-collection-description">{description}</p>
      <Link className="tgg-collection-link" href={href}>Explore collection <ArrowRight size={15} aria-hidden="true" /></Link>
    </div>
  </article>;
}

export function PackagingFeature() {
  return <section className="tgg-packaging" id="packaging" aria-labelledby="packaging-heading">
    <div className="tgg-packaging-visual">
      <ProductPhoto src="/images/brand/cta_1_1.png" alt="An open gift hamper with curated treats nestled in satin" sizes="(max-width: 760px) 100vw, 52vw" />
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
        We bring together flavours, keepsakes and thoughtful details
        so you can spend less time searching, and more time thinking
        of them.
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
