/* eslint-disable @next/next/no-img-element -- Existing local and provider catalogue images. */
'use client';
import Link from 'next/link';
import { useState,useSyncExternalStore } from 'react';
import { Heart,ShoppingBag } from 'lucide-react';
import { Product,money,productImage } from '@/lib/types';
import AddGiftToCartButton from './AddGiftToCartButton';

const favouritesKey='gourmet-b2c-favourite-products';
const favouritesEvent='gourmet-b2c-favourites-change';
function favourites():string[]{
 try{const stored=JSON.parse(localStorage.getItem(favouritesKey)||'[]');return Array.isArray(stored)?stored.filter((id):id is string=>typeof id==='string').slice(0,500):[];}catch{return [];}
}
function subscribe(callback:()=>void){
 window.addEventListener('storage',callback);window.addEventListener(favouritesEvent,callback);
 return()=>{window.removeEventListener('storage',callback);window.removeEventListener(favouritesEvent,callback);};
}
export default function ProductCard({product,compact=false}:{product:Product;compact?:boolean}){
 const saved=useSyncExternalStore(subscribe,()=>favourites().includes(product._id),()=>false);
 const [message,setMessage]=useState('');
 const [saveError,setSaveError]=useState(false);
 const category=product.categoryLabel||product.categories?.[0]?.name;
 const href=`/products/${product.slug}`;
 function toggleSaved(e: React.MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  setSaveError(false);
  try {
   const current = favourites(), next = current.includes(product._id) ? current.filter(id => id !== product._id) : [product._id, ...current].slice(0, 500);
   localStorage.setItem(favouritesKey, JSON.stringify(next));
   window.dispatchEvent(new Event(favouritesEvent));
   setMessage(next.includes(product._id) ? 'Saved in wishlist.' : 'Removed from wishlist.');
  } catch {
   setSaveError(true);
   setMessage('Could not save to wishlist.');
  }
 }
 return <article data-reveal className={`product-card gift-product-card luxury-hamper-card${compact ? ' shop-product-card' : ''}`}>
  <div className="gift-card-media">
   <Link className="gift-card-photo" href={href} aria-label={`View ${product.name}`} tabIndex={-1}>
    <img src={productImage(product)} alt={(Array.isArray(product.images) && product.images[0]?.alt) || product.name} loading="lazy" decoding="async"/>
   </Link>
   {category && <span className="gift-card-badge">{category}</span>}
   <button type="button" className="card-save-floating" aria-pressed={saved} aria-label={`${saved ? 'Unsave' : 'Save'} ${product.name} in wishlist`} title={saved ? 'Saved in wishlist' : 'Save to wishlist'} onClick={toggleSaved}>
    <Heart size={18} strokeWidth={1.8} fill={saved ? '#8E1B32' : 'none'} color={saved ? '#8E1B32' : '#332924'}/>
   </button>
  </div>
  <div className="gift-card-content">
   <h3 className="gift-card-title"><Link href={href}>{product.name}</Link></h3>
   <div className="gift-card-flourish" aria-hidden="true">
    <span className="flourish-line" />
    <span className="flourish-sparkle">✦</span>
    <span className="flourish-line" />
   </div>
   <p className="gift-card-description">{typeof product.description === "string" ? product.description : (product.description?.short || "")}</p>
   <div className="gift-card-bottom-row">
    <div className="gift-card-price-wrap">
     <span className="price-label">Price</span>
     <span className={`gift-card-price${product.preview ? ' card-preview-label' : ''}`}>{product.preview ? 'Collection preview' : money(product.basePrice, product.currency)}</span>
    </div>
    {product.giftItemId ? (
     <AddGiftToCartButton itemId={product.giftItemId} name={product.name} className="card-luxury-btn" />
    ) : (
     <Link className="card-luxury-btn" href={href}>
      <span>{product.preview ? 'Details' : 'Explore'}</span>
      <ShoppingBag size={14} strokeWidth={1.8} aria-hidden="true" />
     </Link>
    )}
   </div>
   <span className={saveError ? 'card-save-error' : 'card-feedback'} role="status">{message}</span>
  </div>
 </article>;
}
