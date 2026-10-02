'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ShoppingBag } from 'lucide-react';
import { addGiftItem } from '@/lib/gift-cart';

export default function AddGiftToCartButton({ itemId, name, className = 'button' }: { itemId: string; name: string; className?: string }) {
 const [status, setStatus] = useState<'idle'|'adding'|'added'|'error'>('idle');
 const [message, setMessage] = useState('');
 const locked = useRef(false);
 useEffect(() => {
  if (status !== 'added') return;
  const timer = setTimeout(() => setStatus('idle'), 1800);
  return () => clearTimeout(timer);
 }, [status]);
 async function add() {
  if (locked.current) return;
  locked.current = true;
  setStatus('adding'); setMessage('');
  try {
   await addGiftItem(itemId);
   setStatus('added'); setMessage('Added to your cart.');
  } catch (error) {
   setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to add this item. Please try again.');
  } finally { locked.current = false; }
 }
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
