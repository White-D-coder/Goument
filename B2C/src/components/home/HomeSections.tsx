import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Gift, Heart, Leaf, Gem } from 'lucide-react';
import ProductPhoto from '@/components/ProductPhoto';
import AddGiftToCartButton from '@/components/AddGiftToCartButton';
import HomeStoryCarousel from '@/components/home/HomeStoryCarousel';
import { money, productImage, type Product } from '@/lib/types';
import type { Testimonial } from '@/lib/home-content';

export function SectionHeading({ kicker, title, id, href, action }: { kicker: string; title: string; id: string; href?: string; action?: string }) {
  return <div className="tgg-section-heading"><div><p className="tgg-kicker">{kicker}</p><h2 id={id}>{title}</h2></div>
    {href && <Link className="tgg-link" href={href}>{action || 'Explore'} <ArrowRight size={17} aria-hidden="true" /></Link>}
  </div>;
}

/** Uses the existing gift-cart control. Preview curations only link to their details. */
export function HomeProductCard({ product, sizes }: { product: Product; sizes?: string }) {
  const href = `/products/${product.slug}`;
  return <article className="tgg-product">
    <Link className="tgg-product-image" href={href} tabIndex={-1} aria-label={`View ${product.name}`} data-home-reveal>
      <ProductPhoto src={productImage(product)} alt={product.images[0]?.alt || product.name} sizes={sizes || "(max-width: 700px) 46vw, (max-width: 1100px) 43vw, (max-width: 1400px) 23vw, 290px"} />
    </Link>
    <div className="tgg-product-info">
      <h3><Link href={href}>{product.name}</Link></h3>
      <p>{product.description.short}</p>
      {!product.preview && <span className="tgg-product-price">{money(product.basePrice, product.currency)}</span>}
      {product.giftItemId && !product.preview
        ? <AddGiftToCartButton itemId={product.giftItemId} name={product.name} className="tgg-product-button" withQuantity />
        : <Link className="tgg-product-button" href={href}>{product.preview ? 'Explore hamper' : 'View gift'} <ArrowUpRight size={16} aria-hidden="true" /></Link>}
    </div>
  </article>;
}

const approach = [
  { Icon: Gem, name: 'Considered details', copy: 'The little things, chosen well.' },
  { Icon: Gift, name: 'Beautiful presentation', copy: 'Made for the joy of unwrapping.' },
  { Icon: Leaf, name: 'Small indulgences', copy: 'A moment to savour.' },
  { Icon: Heart, name: 'A personal thought', copy: 'For someone who matters.' },
];

export function BrandPhilosophy() {
  return <section className="tgg-philosophy tgg-section" id="our-story" aria-labelledby="philosophy-heading">
    <p className="tgg-kicker">Why we do this</p><h2 id="philosophy-heading">Gifting made easy.</h2>
    <p className="tgg-philosophy-copy">We bring together flavours, keepsakes and thoughtful details so you can spend less time searching, and more time thinking of them.</p>
    <div className="tgg-approach">{approach.map(({ Icon, name, copy }) => <div key={name}><Icon size={24} strokeWidth={1.25} aria-hidden="true" /><h3>{name}</h3><p>{copy}</p></div>)}</div>
  </section>;
}

export function GourmetStory({ stories }: { stories: { name: string; place: string; image: string; alt: string; copy: string }[] }) {
  return <section className="tgg-gourmet tgg-section" aria-labelledby="gourmet-heading">
    <header className="tgg-gourmet-header">
      <div><p className="tgg-kicker">Familiar flavours. Fresh discoveries.</p><h2 id="gourmet-heading">A little taste of home.</h2></div>
      <div className="tgg-gourmet-intro"><p>From Assam’s tea tables and Hyderabad’s cafés to Mumbai’s playful snacks, Bihar’s thekua and Kutch’s sweet traditions. Indian flavours with a story.</p></div>
    </header>
    <HomeStoryCarousel action={<Link className="tgg-link" href="/shop/hampers">Explore gourmet hampers <ArrowRight size={17} aria-hidden="true" /></Link>}>{stories.map(story => <article className="tgg-gourmet-story" key={story.name}>
      <div className="tgg-gourmet-image" data-home-reveal><ProductPhoto src={story.image} alt={story.alt} sizes="(max-width: 700px) 84vw, (max-width: 900px) 82vw, (max-width: 1400px) 40vw, 490px" /></div>
      <div className="tgg-gourmet-caption"><p className="tgg-place">{story.place}</p><h3>{story.name}</h3><p className="tgg-gourmet-copy">{story.copy}</p></div>
    </article>)}</HomeStoryCarousel>
  </section>;
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
