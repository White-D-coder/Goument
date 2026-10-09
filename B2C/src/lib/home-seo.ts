import type { Metadata } from 'next';
import { giftingEmail } from './product-editorial';
import { productImage, type Product } from './types';

const confirmedOrigin = 'https://b2c-tau-weld.vercel.app';

function siteOrigin() {
  try {
    const configured = new URL(process.env.NEXT_PUBLIC_SITE_URL || confirmedOrigin);
    if (configured.protocol === 'https:' || configured.protocol === 'http:') {
      return new URL(configured.origin);
    }
  } catch {
    // A malformed optional override must not break the public homepage.
  }
  return new URL(confirmedOrigin);
}

const metadataBase = siteOrigin();
const absoluteUrl = (path: string) => new URL(path, metadataBase).href;
const homeUrl = absoluteUrl('/b2c');
const title = 'The Gourmet Gifts — Curated Hampers & Thoughtful Gifting';
const description = 'Discover curated gift hampers, laddoo candles and premium stationery. Thoughtful gifts for celebrations, weddings and the people who matter.';
const hero = {
  url: absoluteUrl('/images/small_anipics/framee_optimized.webp'),
  width: 1672,
  height: 941,
  alt: 'The Gourmet Gifts curated boxes with gourmet treats and keepsakes',
};

export const homeMetadata: Metadata = {
  metadataBase,
  title: { absolute: title },
  description,
  alternates: { canonical: '/b2c' },
  openGraph: {
    title,
    description,
    url: homeUrl,
    siteName: 'The Gourmet Gifts',
    type: 'website',
    locale: 'en_IN',
    images: [hero],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [{ url: hero.url, alt: hero.alt }],
  },
};

/** Describe only the products and questions actually rendered on Home. */
export function homeStructuredData(products: Product[], faqs: { question: string; answer: string }[]): object {
  const organizationId = `${homeUrl}#organization`;
  const websiteId = `${homeUrl}#website`;
  const webpageId = `${homeUrl}#webpage`;
  const productsId = `${homeUrl}#products`;
  const faqId = `${homeUrl}#faq`;
  const visibleProducts = products.filter(product => product.slug?.trim() && product.name?.trim());
  const visibleFAQs = faqs.filter(item => item.question.trim() && item.answer.trim());

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'The Gourmet Gifts',
      url: homeUrl,
      email: giftingEmail,
      logo: absoluteUrl('/images/brand/LOGOs.svg'),
      image: hero.url,
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'The Gourmet Gifts',
      url: homeUrl,
      publisher: { '@id': organizationId },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: homeUrl,
      name: title,
      description,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      inLanguage: 'en-IN',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: hero.url,
        width: hero.width,
        height: hero.height,
        caption: hero.alt,
      },
      ...(visibleProducts.length ? { mainEntity: { '@id': productsId } } : {}),
      ...(visibleFAQs.length ? { hasPart: { '@id': faqId } } : {}),
    },
  ];

  if (visibleProducts.length) {
    graph.push({
      '@type': 'ItemList',
      '@id': productsId,
      numberOfItems: visibleProducts.length,
      itemListElement: visibleProducts.map((product, index) => {
        const url = absoluteUrl(`/products/${encodeURIComponent(product.slug)}`);
        const productDescription = product.description?.short || product.description?.long;
        const hasPrice = !product.preview && Number.isFinite(product.basePrice) && product.basePrice > 0
          && typeof product.currency === 'string' && /^[A-Z]{3}$/.test(product.currency);

        return {
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            '@id': `${url}#product`,
            name: product.name,
            url,
            image: absoluteUrl(productImage(product)),
            ...(productDescription ? { description: productDescription } : {}),
            ...(hasPrice ? {
              offers: {
                '@type': 'Offer',
                url,
                price: (product.basePrice / 100).toFixed(2),
                priceCurrency: product.currency,
                seller: { '@id': organizationId },
              },
            } : {}),
          },
        };
      }),
    });
  }

  if (visibleFAQs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': faqId,
      url: faqId,
      isPartOf: { '@id': webpageId },
      mainEntity: visibleFAQs.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}
