'use client';

import Link from 'next/link';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Product, money, productImage } from '@/lib/types';
import { temporaryHamperPriceLabel } from '@/lib/product-pricing';
import AddGiftToCartButton from './AddGiftToCartButton';
import ProductPhoto from './ProductPhoto';

export default function ProductCard({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const href = `/products/${product.slug}`;

  const isHamper = product.categories?.some(
    (category) => category.slug === 'hampers'
  );
  const priceLabel = product.preview
    ? temporaryHamperPriceLabel(product) || (isHamper ? 'Price on enquiry' : null)
    : money(product.basePrice, product.currency);

  return (
    <article
      data-reveal
      className={`product-card gift-product-card b2c-product-card${
        compact ? ' shop-product-card' : ''
      }${isHamper ? ' hamper-product-card' : ''}`}
    >
      {/* Product Image */}
      <div className="gift-card-media">
        <Link
          className="gift-card-photo"
          href={href}
          aria-label={`View ${product.name}`}
          tabIndex={-1}
        >
          <ProductPhoto
            src={productImage(product)}
            alt={
              (Array.isArray(product.images) && product.images[0]?.alt) ||
              product.name
            }
            sizes="(max-width: 640px) 46vw, (max-width: 1000px) 45vw, 30vw"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="gift-card-content">
        <h3 className="gift-card-title">
          <Link href={href}>{product.name}</Link>
        </h3>
        {compact && product.description.short && <p className="gift-card-description">{product.description.short}</p>}

        <div className="gift-card-bottom-row">
          {priceLabel && <div className="gift-card-price-wrap">
            <span
              className={`gift-card-price${
                product.preview ? ' card-preview-label' : ''
              }`}
            >
              {priceLabel}
            </span>
          </div>}

          {/* Product Action */}
          {product.giftItemId ? (
            <AddGiftToCartButton
              itemId={product.giftItemId}
              name={product.name}
              className="card-luxury-btn"
              withQuantity
              compact
            />
          ) : (
            <Link className="card-luxury-btn" href={href}>
              <span>
                {isHamper
                  ? 'View Hamper'
                  : product.preview
                    ? 'View Details'
                    : 'View Product'}
              </span>

              {isHamper ? (
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              ) : (
                <ShoppingBag
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              )}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
