'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ShoppingBag } from 'lucide-react';
import { addGiftItem, changeGiftItemQuantity, queueGiftCartWrite } from '@/lib/gift-cart';
import { api } from '@/lib/api';
import type { Draft } from '@/hooks/useGiftDraft';
import QuantityControl from './QuantityControl';

export default function AddGiftToCartButton({ itemId, name, className = 'button', withQuantity = false }: { itemId: string; name: string; className?: string; withQuantity?: boolean }) {
 const [status, setStatus] = useState<'idle'|'adding'|'added'|'error'>('idle');
 const [message, setMessage] = useState('');
 const locked = useRef(false);
 const [quantity, setQuantity] = useState(0);
 useEffect(() => {
  if (!withQuantity) return;
  let active = true;
  let loading = false;
  const refresh = async () => {
   if (loading || locked.current) return;
   loading = true;
   try {
    const draft = await queueGiftCartWrite(() => api<Draft>('/auth/gift/draft'));
    if (active) setQuantity(draft.items.find(item => item.id === itemId)?.quantity || 0);
   } catch { /* Keep the last confirmed quantity; adding can retry the cart read. */ }
   finally { loading = false; }
  };
  void refresh();
  window.addEventListener('b2c-cart-change', refresh);
  return () => { active = false; window.removeEventListener('b2c-cart-change', refresh); };
 }, [itemId, withQuantity]);
 useEffect(() => {
  if (status !== 'added') return;
  const timer = setTimeout(() => setStatus('idle'), 1800);
  return () => clearTimeout(timer);
 }, [status]);
 async function add(change: 1 | -1 = 1) {
  if (locked.current) return;
  locked.current = true;
  setStatus('adding'); setMessage('');
  try {
   const draft = await (change === 1 ? addGiftItem(itemId) : changeGiftItemQuantity(itemId, change));
   setQuantity(draft.items.find(item => item.id === itemId)?.quantity || 0);
   setStatus(withQuantity ? 'idle' : 'added');
   setMessage(withQuantity ? '' : 'Added to your cart.');
  } catch (error) {
   setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to update your cart. Please try again.');
  } finally { locked.current = false; }
 }
 if (withQuantity) return <div className="gift-purchase">
  <div className="gift-purchase-controls">
   <button type="button" className={className} disabled={status === 'adding' || quantity >= 99} aria-busy={status === 'adding'} aria-label={`Add ${name} to cart`} onClick={() => void add()}>
    <span>{status === 'adding' ? quantity ? 'Updating…' : 'Adding…' : 'Add to Cart'}</span>
    <ShoppingBag size={18} strokeWidth={1.7} aria-hidden="true"/>
   </button>
   {quantity > 0 && <QuantityControl name={name} value={quantity} disabled={status === 'adding'} onChange={next => void add(next > quantity ? 1 : -1)}/>}
  </div>
  {status === 'error' && <p className="cart-add-error" role="alert">{message}</p>}
 </div>;
 return <>
  <button type="button" className={className} disabled={status === 'adding'} aria-busy={status === 'adding'} aria-label={status === 'adding' ? `Adding ${name} to cart` : `Add ${name} to cart`} onClick={() => void add()}>
   <span>{status === 'adding' ? 'Adding…' : status === 'added' ? 'Added to cart' : 'Add to Cart'}</span>
   {status === 'added' ? <Check size={18} aria-hidden="true" /> : <ShoppingBag size={18} strokeWidth={1.7} aria-hidden="true" />}
  </button>
  <div className={`cart-add-feedback${status === 'error' ? ' cart-add-error' : ''}`} role="status" aria-live="polite">
   {message && <>{message} <Link href="/cart">View cart</Link></>}
  </div>
 </>;
}
