'use client';
import { useState } from 'react';
import Link from 'next/link';
import { cartMutation } from '@/lib/api';
import { Product, money } from '@/lib/types';
import AddGiftToCartButton from './AddGiftToCartButton';
export default function BuyPanel({ product }: { product: Product }) {
 const [sku,setSku]=useState(product.variants[0]?.sku || ''); const [quantity,setQuantity]=useState(1); const [busy,setBusy]=useState(false); const [message,setMessage]=useState(''); const [added,setAdded]=useState(false);
 const variant=product.variants.find(v=>v.sku===sku); const stock=variant?.inventory ?? product.inventory;
 async function add() { setBusy(true);setAdded(false);setMessage('');try{await cartMutation('POST','/cart/items',{productId:product._id,variantSku:sku||undefined,quantity});setAdded(true);setMessage('Added to your bag.');}catch(e){setMessage(e instanceof Error?e.message:'Could not add this gift.');}finally{setBusy(false);} }
 if(product.giftItemId) return <div className="buy-panel"><AddGiftToCartButton itemId={product.giftItemId} name={product.name}/><p className="muted">Choose quantities and gift boxes in your cart. Final pricing is confirmed before payment.</p></div>;
 return <div className="buy-panel">{product.preview?<p className="notice">This is a collection preview. Pricing and shopping are temporarily unavailable.</p>:<><p className="price">{money(variant?.price??product.basePrice,product.currency)}</p>{product.variants.length>0&&<label>Choose an option<select value={sku} onChange={e=>{setSku(e.target.value);setQuantity(1);}}>{product.variants.map(v=><option key={v.sku} value={v.sku}>{v.name}{v.inventory===0?' — Out of stock':''}</option>)}</select></label>}<label>Quantity<input type="number" min={1} max={Math.max(stock,1)} value={quantity} onChange={e=>setQuantity(Math.max(1,Math.min(stock,Number(e.target.value)||1)))}/></label><button className="button" disabled={busy||stock<1} onClick={add}>{busy?'Adding…':stock<1?'Out of stock':'Add to bag'}</button></>}<p aria-live="polite">{message}</p>{added&&<Link className="text-link" href="/cart/store">View your bag →</Link>}</div>;
}
