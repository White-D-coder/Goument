/* eslint-disable @next/next/no-img-element -- Existing local catalogue photography. */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight,Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api,ApiError } from '@/lib/api';
import { giftApi,useGiftDraft } from '@/hooks/useGiftDraft';
import QuantityControl from './QuantityControl';
export default function GiftCart() {
 const router=useRouter();
 const {draft,catalogue,error,busy,change,save,reload}=useGiftDraft();
 const [review,setReview]=useState('');const [checking,setChecking]=useState(false);
 async function check(){setChecking(true);setReview('');try{await api(`${giftApi}/checkout-check`,'POST',{});router.push('/checkout');}catch(e){if(e instanceof ApiError&&e.status===401)router.push('/account?next=%2Fcheckout');else setReview(e instanceof Error?e.message:'Unable to check your gift.');}finally{setChecking(false);}}
 const needsBoxes=draft?.packing==='NEEDS_BOXES'||draft?.packing==='CHOOSE_BOX';
 return <section className="section gift-cart"><p className="eyebrow">THOUGHTFULLY CHOSEN</p><div className="section-heading"><h1>Your gift, coming together.</h1><Link className="text-link" href="/build">Add more items →</Link></div>
 {error&&<div className="notice" role="alert">{error} <button className="text-link" onClick={reload}>Retry</button></div>}
 {!draft||!catalogue?<p role="status">{error?'Your gift could not be loaded.':'Loading your gift…'}</p>:<>
 <p className="draft-disclosure">Your selection is saved. Sign in at checkout to add your delivery details.</p>
 <div className="gift-cart-layout"><div><h2>Your little favourites</h2>{draft.items.length?draft.items.map(row=>{const item=catalogue.items.find(i=>i.id===row.id);return <article key={row.id} className="gift-cart-row">{item&&<img src={item.image} alt=""/>}<div><h3>{item?.name||'Item unavailable'}</h3><button className="text-link remove-item" disabled={busy} onClick={()=>void change('items',row.id,0)}>Remove</button></div><QuantityControl name={item?.name||'item'} value={row.quantity} disabled={busy} onChange={q=>void change('items',row.id,q)}/></article>;}):<p>Your box is waiting for its favourites. <Link className="text-link" href="/build">Choose items →</Link></p>}</div>
 <aside className="gift-review"><h2>The finishing touch</h2><p aria-live="polite">{needsBoxes?'Your favourites need a little more room. Add another box or choose a different style below.':draft.packing==='READY'?'Your box selection fits your favourites.':'Choose a box and add your favourites to get started.'}</p><p>{draft.items.reduce((n,i)=>n+i.quantity,0)} items · {draft.boxes.reduce((n,i)=>n+i.quantity,0)} boxes</p><button className="button" disabled={busy||checking||draft.packing!=='READY'} onClick={()=>void check()}>{checking?'Checking…':'Continue to checkout'}<ArrowRight size={15}/></button>{needsBoxes&&<a className="text-link" href="#gift-box-options">Choose your boxes ↓</a>}<p className="draft-disclosure">Delivery details come next. Final pricing must be confirmed before payment.</p>{review&&<p role="status">{review}</p>}</aside></div>
 <section id="gift-box-options" className="gift-box-options"><h2>{needsBoxes?'A little more room for your gift.':'Want a different box?'}</h2><p className="section-intro">Choose a different style, or use + and − to add more boxes. Your items stay right here.</p><div className="cart-box-grid">{catalogue.boxes.map(box=>{const quantity=draft.boxes.find(b=>b.id===box.id)?.quantity||0;return <article key={box.id} className={`cart-box${quantity?' selected':''}`}><img src={box.image} alt={box.name} loading="lazy"/><h3>{box.name}</h3><QuantityControl name={box.name} value={quantity} disabled={busy} onChange={q=>{setReview('');void change('boxes',box.id,q);}}/>{quantity?<span className="box-selected"><Check size={13}/> Selected</span>:<button className="text-link" disabled={busy} onClick={()=>{setReview('');void save([{id:box.id,quantity:1}],draft.items);}}>Use this box instead</button>}</article>;})}</div></section>
 </>}
 </section>;
}
