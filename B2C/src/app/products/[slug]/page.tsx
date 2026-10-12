import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyPanel from '@/components/BuyPanel';
import ProductGallery from '@/components/ProductGallery';
import ProductPhoto from '@/components/ProductPhoto';
import { productBySlug } from '@/lib/catalogue';
import { CURATED_HAMPERS } from '@/lib/curated-hampers';
import { PHOTOGRAPHED_ENVELOPES } from '@/lib/photographed-envelopes';
import { productEditorial } from '@/lib/product-editorial';
import { productPriceLabel } from '@/lib/product-pricing';
import { productImage } from '@/lib/types';
import './product-detail.css';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const product = await productBySlug((await params).slug);
  return { title: product?.name || 'Gift not found', description: product ? productEditorial(product).description : undefined };
}

async function RelatedGifts({ slug }: { slug: string }) {
  const slugs = [...CURATED_HAMPERS.map(product => product.slug), 'lotus-shagun-envelope', 'laddoo-candles'].filter(item => item !== slug).slice(0, 3);
  const products = (await Promise.all(slugs.map(productBySlug))).filter(product => product !== null);
  if (!products.length) return null;
  return <section className="pdp-related pdp-wrap" aria-labelledby="related-heading">
    <div className="pdp-section-heading"><div><p className="pdp-eyebrow">More thoughtful gestures</p><h2 id="related-heading">You may also like</h2></div><Link className="pdp-link" href="/shop">Explore all gifts <span aria-hidden="true">→</span></Link></div>
    <div className="pdp-related-grid">{products.map(product => <article key={product.slug}>
      <Link href={`/products/${product.slug}`} className="pdp-related-photo" aria-label={`View ${product.name}`}>
        <ProductPhoto src={productImage(product)} alt={product.name} sizes="(max-width: 600px) 90vw, 30vw"/>
      </Link>
      <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
      <p>{productPriceLabel(product)}</p>
      <Link className="pdp-link" href={`/products/${product.slug}`}>View gift <span aria-hidden="true">→</span></Link>
    </article>)}</div>
  </section>;
}

export default async function Detail({ params }: PageProps) {
  const product = await productBySlug((await params).slug);
  if (!product) notFound();
  const editorial = productEditorial(product);
  const isIvory = product.slug === 'ivory-hamper';
  const isEnvelope = PHOTOGRAPHED_ENVELOPES.some(item => item.slug === product.slug);
  const gallery = product.images.length
    ? product.images.map(image => ({ src: productImage({ ...product, images: [image] }), alt: image.alt || product.name }))
    : [{ src: productImage(product), alt: product.name }];

  return <div className={`product-detail-edit pdp${isIvory ? ' pdp-ivory' : ''}${isEnvelope ? ' pdp-envelope' : ''}`}>
    {isIvory && <Link className="pdp-mobile-back pdp-wrap" href="/shop/hampers"><span aria-hidden="true">←</span> All hampers</Link>}
    <nav className="pdp-breadcrumb pdp-wrap" aria-label="Breadcrumb">
      <Link href="/b2c">Home</Link><span aria-hidden="true">/</span>
      <Link href={editorial.isHamper ? '/shop/hampers' : '/shop'}>{editorial.isHamper ? 'Hampers' : 'Gifts'}</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{product.name}</span>
    </nav>

    <section className="pdp-hero pdp-wrap" aria-labelledby="product-name">
      <div className={`pdp-photography${product.slug.startsWith('india-hamper') ? ' pdp-landscape' : ''}`}>
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
        <p className="pdp-description"><span className="pdp-description-full">{editorial.description}</span>{isIvory && <span className="pdp-description-phone">{product.description.short || editorial.description}</span>}</p>
        {product.slug.startsWith('india-hamper') && <nav className="pdp-colours" aria-label="Choose India Hamper colour">
          {CURATED_HAMPERS.filter(item => item.slug.startsWith('india-hamper')).map(item => <Link key={item.slug} href={`/products/${item.slug}`} aria-current={item.slug === product.slug ? 'page' : undefined}>{item.slug.endsWith('lavender') ? 'Lavender' : 'Burgundy'}</Link>)}
        </nav>}
        <BuyPanel key={`purchase-${product.slug}`} product={product}/>
      </div>
    </section>

    <Suspense fallback={<div className="pdp-wrap pdp-related-loading" role="status">Finding more thoughtful gifts…</div>}><RelatedGifts slug={product.slug}/></Suspense>
  </div>;
}
