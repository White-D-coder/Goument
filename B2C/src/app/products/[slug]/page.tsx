import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyPanel from '@/components/BuyPanel';
import ProductGallery from '@/components/ProductGallery';
import ProductPhoto from '@/components/ProductPhoto';
import GiftNoteRequest from '@/components/GiftNoteRequest';
import { productBySlug } from '@/lib/catalogue';
import { giftingEnquiry, productEditorial } from '@/lib/product-editorial';
import { money, productImage } from '@/lib/types';
import './product-detail.css';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const product = await productBySlug((await params).slug);
  return { title: product?.name || 'Gift not found', description: product ? productEditorial(product).description : undefined };
}

async function RelatedGifts({ slug }: { slug: string }) {
  const slugs = ['ivory-hamper', 'india-hamper', 'shagun-envelopes', 'laddoo-candles'].filter(item => item !== slug).slice(0, 3);
  const products = (await Promise.all(slugs.map(productBySlug))).filter(product => product !== null);
  if (!products.length) return null;
  return <section className="pdp-related pdp-wrap" aria-labelledby="related-heading">
    <div className="pdp-section-heading"><div><p className="pdp-eyebrow">More thoughtful gestures</p><h2 id="related-heading">You may also like</h2></div><Link className="pdp-link" href="/shop">Explore all gifts <span aria-hidden="true">→</span></Link></div>
    <div className="pdp-related-grid">{products.map(product => <article key={product.slug}>
      <Link href={`/products/${product.slug}`} className="pdp-related-photo" aria-label={`View ${product.name}`}>
        <ProductPhoto src={productImage(product)} alt={product.name} sizes="(max-width: 600px) 90vw, 30vw"/>
      </Link>
      <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
      <p>{product.preview ? 'Price on enquiry' : money(product.basePrice, product.currency)}</p>
      <Link className="pdp-link" href={`/products/${product.slug}`}>View gift <span aria-hidden="true">→</span></Link>
    </article>)}</div>
  </section>;
}

export default async function Detail({ params }: PageProps) {
  const product = await productBySlug((await params).slug);
  if (!product) notFound();
  const editorial = productEditorial(product);
  const enquiry = giftingEnquiry(product.name);
  const bulkEnquiry = giftingEnquiry(product.name, 'I am planning gifts for a team, event or celebration. Please share the personalisation options, pricing and lead time.');
  const gallery = product.images.length
    ? product.images.map(image => ({ src: productImage({ ...product, images: [image] }), alt: image.alt || product.name }))
    : [{ src: productImage(product), alt: product.name }];
  const details = [
    { title: "What's included", text: editorial.contents || 'Please contact our gifting team for the complete selection.' },
    { title: 'Presentation & dimensions', text: `${editorial.packaging ? `${editorial.packaging} ` : ''}For exact product and packaging dimensions, please ask our team.` },
    { title: 'Personalisation', text: 'Tell us about your occasion, message or branding. Our team can discuss the options and confirm availability and any additional costs before you order.' },
    { title: 'Delivery & lead time', text: 'Share your delivery city, quantity and required date. Our team will confirm availability, delivery charges and the schedule for your gift.' },
    { title: editorial.isHamper ? 'Shelf life & storage' : 'Care & storage', text: editorial.isHamper ? 'Refer to each food pack for ingredients, allergens, storage instructions and best-before dates. Ask our team for the product-specific details before ordering.' : 'Please follow the care instructions supplied with the product. Contact our team for material-specific guidance.' },
    { title: 'Corporate & bulk gifting', text: 'Planning gifts for a team, clients, a wedding or an event? Share your quantity, budget and occasion with our gifting team to discuss a curation.' },
    { title: 'Returns & replacement', text: 'Please ask our team about the terms for your selection before ordering. For an existing order, email us with your order reference and a description of the issue.' },
  ];

  return <div className="product-detail-edit pdp">
    <nav className="pdp-breadcrumb pdp-wrap" aria-label="Breadcrumb">
      <Link href="/b2c">Home</Link><span aria-hidden="true">/</span>
      <Link href={editorial.isHamper ? '/shop/hampers' : '/shop'}>{editorial.isHamper ? 'Hampers' : 'Gifts'}</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{product.name}</span>
    </nav>

    <section className="pdp-hero pdp-wrap" aria-labelledby="product-name">
      <div className={`pdp-photography${product.slug === 'india-hamper' ? ' pdp-landscape' : ''}`}>
        <ProductGallery key={product.slug} images={gallery} name={product.name} contain/>
        {editorial.isPhotographedHamper && <div className="pdp-gallery-details">
          {editorial.story.slice(0, 2).map(item => <figure key={item.title}>
            <div className="pdp-detail-photo"><ProductPhoto src={item.image!} alt={item.alt!} sizes="(max-width: 600px) 45vw, 28vw"/></div>
            <figcaption>{item.title}</figcaption>
          </figure>)}
        </div>}
        <p className="pdp-photo-caption">{editorial.isPhotographedHamper ? 'A closer look at the photographed curation.' : 'The details make the gesture.'}</p>
      </div>

      <div className="pdp-purchase">
        <p className="pdp-eyebrow">{editorial.eyebrow}</p>
        <h1 id="product-name">{product.name}</h1>
        <p className="pdp-occasion">{editorial.occasion}</p>
        <p className="pdp-description">{editorial.description}</p>
        <BuyPanel key={`purchase-${product.slug}`} product={product}/>
        <div className="pdp-purchase-meta">
          <p>For delivery dates, <a href={enquiry}>check with our team</a>.</p>
          <a className="pdp-link" href={bulkEnquiry}>Ordering 10+ gifts? Talk to us <span aria-hidden="true">→</span></a>
        </div>
        <GiftNoteRequest key={`note-${product.slug}`} name={product.name}/>
      </div>
    </section>

    <section className="pdp-editorial pdp-wrap" aria-labelledby="philosophy-heading">
      <figure className="pdp-lifestyle">
        <ProductPhoto src="/images/small_anipics/framee_optimized.webp" alt="The Gourmet Gifts presentation boxes arranged by candlelight" sizes="(max-width: 900px) 100vw, 58vw"/>
      </figure>
      <div className="pdp-philosophy">
        <p className="pdp-eyebrow">The art of giving</p>
        <h2 id="philosophy-heading">Thoughtfully curated.<br/>Beautifully presented.</h2>
        <p>Every element is selected to make the gift feel considered —<br className="pdp-desktop-break"/> from what goes inside to the moment it is opened.</p>
      </div>
    </section>

    <section className="pdp-details pdp-wrap" id="gift-details" aria-labelledby="details-heading">
      <div><p className="pdp-eyebrow">Good to know</p><h2 id="details-heading">The finer details.</h2><p>A little more about your gift.</p><a className="pdp-link" href={enquiry}>Ask us a question <span aria-hidden="true">→</span></a></div>
      <div className="pdp-accordions">
        {details.map(detail => <details key={detail.title} name="gift-details"><summary>{detail.title}<span aria-hidden="true"/></summary><div className="pdp-accordion-content"><p>{detail.text}</p>{detail.title === 'Returns & replacement' && <a className="pdp-link" href={enquiry}>Contact our team <span aria-hidden="true">→</span></a>}</div></details>)}
        {editorial.long && !editorial.story.length && <details name="gift-details"><summary>About this gift<span aria-hidden="true"/></summary><div className="pdp-accordion-content"><p>{editorial.long}</p></div></details>}
      </div>
    </section>

    <Suspense fallback={<div className="pdp-wrap pdp-related-loading" role="status">Finding more thoughtful gifts…</div>}><RelatedGifts slug={product.slug}/></Suspense>

    <section className="pdp-corporate" aria-labelledby="corporate-heading"><div className="pdp-wrap">
      <div><p className="pdp-eyebrow">Let’s make it memorable</p><h2 id="corporate-heading">Gifting for a team,<br/>event or celebration?</h2><p>From personal touches to curated quantities,<br className="pdp-desktop-break"/> let’s find the right gift together.</p></div>
      <a className="button" href={bulkEnquiry}>Talk to us <span aria-hidden="true">↗</span></a>
    </div></section>
  </div>;
}
