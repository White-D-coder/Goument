import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { shopCollections } from '@/lib/shop-collections';
import ProductPhoto from './ProductPhoto';

export default function EmptyGiftCart() {
  return <div className="gift-cart-empty">
    <div className="gift-cart-empty-icon"><ShoppingBag size={28} strokeWidth={1.4} aria-hidden="true" /></div>
    <h2>Your next thoughtful gift starts here.</h2>
    <p role="status">Your bag is empty. Discover a little something they’ll love, or bring together a gift of your own.</p>
    <div className="gift-cart-empty-actions">
      <Link className="button" href="/shop">Browse gifts <ArrowRight size={16} aria-hidden="true" /></Link>
      <Link className="text-link" href="/build">Build your gift <ArrowRight size={15} aria-hidden="true" /></Link>
    </div>
    <nav className="gift-cart-empty-collections" aria-label="Explore gift collections">
      {Object.values(shopCollections).map(collection => <Link key={collection.href} href={collection.href}>
        <span className="gift-cart-empty-photo"><ProductPhoto src={collection.image} alt="" sizes="52px" /></span>
        <span>{collection.title}</span>
      </Link>)}
    </nav>
  </div>;
}
