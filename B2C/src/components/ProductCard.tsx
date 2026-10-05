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
 function toggleSaved(){
  setSaveError(false);
  try{
   const current=favourites(),next=current.includes(product._id)?current.filter(id=>id!==product._id):[product._id,...current].slice(0,500);
   localStorage.setItem(favouritesKey,JSON.stringify(next));window.dispatchEvent(new Event(favouritesEvent));
   setMessage(next.includes(product._id)?'Saved on this device.':'Removed from saved items.');
  }catch{setSaveError(true);setMessage('Could not save on this device. Please check your browser storage settings.');}
 }
 return <article data-reveal className={`product-card gift-product-card sculpted-product-card${compact?' shop-product-card':''}`}>
  <Link className="gift-card-photo" href={href} aria-label={`View ${product.name}`} tabIndex={-1}>
   <img src={productImage(product)} alt={(Array.isArray(product.images) && product.images[0]?.alt) || product.name} loading="lazy" decoding="async"/>
   <span className="card-photo-shade" aria-hidden="true"/>
   <svg className="card-photo-curve" viewBox="0 0 500 130" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 34 Q0 14 24 14 H125 C210 14 228 108 365 108 H475 Q500 108 500 130 H0 Z"/></svg>
  </Link>
  <div className="gift-card-content">
   {category&&<p className="gift-card-category">{category}</p>}
   <h3 className="gift-card-title"><Link href={href}>{product.name}</Link></h3>
   <p className="gift-card-description">{typeof product.description === "string" ? product.description : (product.description?.short || "")}</p>
   <div className="card-save-row">
    <span className={`gift-card-price${product.preview?' card-preview-label':''}`}>{product.preview?'Collection preview':money(product.basePrice,product.currency)}</span>
    <button type="button" className="card-save-button" aria-pressed={saved} aria-label={`${saved?'Unsave':'Save'} ${product.name} on this device`} title={saved?'Saved on this device':'Save on this device'} onClick={toggleSaved}><Heart size={20} strokeWidth={1.7} fill={saved?'currentColor':'none'}/></button>
   </div>
   {product.giftItemId?<AddGiftToCartButton itemId={product.giftItemId} name={product.name} className="gift-card-action card-pill-action"/>:<Link className="gift-card-action card-pill-action" href={href}><span>{product.preview?'View details':product.variants?.length?'Choose options':'Shop this item'}</span><ShoppingBag size={18} strokeWidth={1.7} aria-hidden="true"/></Link>}
   <span className={saveError?'card-save-error':'card-feedback'} role="status">{message}</span>
  </div>
 </article>;
}
