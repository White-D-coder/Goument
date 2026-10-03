/* eslint-disable @next/next/no-img-element -- Existing local catalogue photography. */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useGiftDraft } from '@/hooks/useGiftDraft';
import QuantityControl from './QuantityControl';
export default function GiftBuilder({selectedBox}:{selectedBox?:string}) {
 const {draft,catalogue,error,busy,change,reload}=useGiftDraft(selectedBox);
 const [search,setSearch]=useState('');const [category,setCategory]=useState('All');
 const total=draft?.items.reduce((n,i)=>n+i.quantity,0)||0;
 const selected=catalogue?.boxes.filter(b=>draft?.boxes.some(row=>row.id===b.id))||[];
 const items=catalogue?.items.filter(i=>(category==='All'||i.category===category)&&`${i.name} ${i.description}`.toLowerCase().includes(search.toLowerCase()))||[];
 return <section className="section gift-builder"><p className="eyebrow">MAKE IT PERSONAL</p><h1>Little things. All their favourites.</h1><p className="section-intro">Select what you love from our master catalogue of gourmet treats, artisanal beverages, stationery, and handcrafted keepsakes.</p>
 {error&&<div className="notice" role="alert">{error} <button className="text-link" onClick={reload}>Retry</button></div>}
 {!draft||!catalogue?<p role="status">{error?'Your selection could not be loaded.':'Loading your gift…'}</p>:<>
 <div className="builder-context"><div><span className="eyebrow">CURATE YOUR GIFTS</span><p>Add your favourite individual master items directly to your gift draft below.</p></div></div>
 <p className="draft-disclosure">Save a gift draft. Prices, stock and online ordering are not available yet.</p>
 <div className="builder-filters"><label>Find something lovely<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search treats, candles, keepsakes…"/></label><label>Collection<select value={category} onChange={e=>setCategory(e.target.value)}>{['All',...new Set(catalogue.items.map(i=>i.category))].map(c=><option key={c}>{c}</option>)}</select></label></div>
 <div className="builder-grid">{items.map(item=>{const quantity=draft.items.find(i=>i.id===item.id)?.quantity||0;return <article className="builder-item" key={item.id}><div className="builder-item-photo"><img src={item.image} alt={item.name} loading="lazy"/></div><h2>{item.name}</h2><p>{item.description}</p><div className="builder-item-action">{quantity?<QuantityControl name={item.name} value={quantity} disabled={busy} onChange={q=>void change('items',item.id,q)}/>:<button className="text-link" disabled={busy} onClick={()=>void change('items',item.id,1)}>Add to gift +</button>}</div></article>;})}</div>
 {!items.length&&<p>No matches. Try another search or collection.</p>}
 <div className="builder-bar"><span aria-live="polite">{busy?'Saving…':`${total} ${total===1?'item':'items'} in your gift`}</span><Link className="button" href="/cart">Review your gift <ArrowRight size={16}/></Link></div>
 </>}
 </section>;
}
