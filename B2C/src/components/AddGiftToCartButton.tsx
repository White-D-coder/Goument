'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { addGiftItem, changeGiftItemQuantity, ensureGiftItem, readGiftDraft, saveGiftPersonalisation } from '@/lib/gift-cart';
import QuantityControl from './QuantityControl';
import { giftCartItemsFromEvent } from '@/lib/gift-cart-events';
import { printNameError, type GiftPersonalisation } from '@/lib/gift-personalisation';
import PrintNameField from './PrintNameField';

export default function AddGiftToCartButton({ itemId, name, className = 'button', withQuantity = true, compact = true, showCheckout = false, phoneBuyNow = false, personalise = false }: { itemId: string; name: string; className?: string; withQuantity?: boolean; compact?: boolean; showCheckout?: boolean; phoneBuyNow?: boolean; personalise?: boolean }) {
 const router = useRouter();
 const [status, setStatus] = useState<'idle'|'adding'|'buying'|'added'|'error'>('idle');
 const [message, setMessage] = useState('');
 const locked = useRef(false);
 const [quantity, setQuantity] = useState(0);
 const [printName, setPrintName] = useState('');
 const [nameDirty, setNameDirty] = useState(false);
 const [nameError, setNameError] = useState('');
 const nameEdited = useRef(false);
 const busy = status === 'adding' || status === 'buying';
 useEffect(() => {
  if (!withQuantity) return;
  let active = true;
  let loading = false;
  let generation = 0;
  const refresh = async (event?: Event) => {
   const items = giftCartItemsFromEvent(event);
   if (items) {
    generation++;
    const row = items.find(item => item.id === itemId);
    setQuantity(row?.quantity || 0);
    if (personalise && !nameEdited.current) setPrintName(row?.personalisation?.mode === 'PRINT' ? row.personalisation.name : '');
    return;
   }
   if (loading || locked.current) return;
   loading = true;
   const request = ++generation;
   try {
    const draft = await readGiftDraft();
    if (active && request === generation) {
     const row = draft.items.find(item => item.id === itemId);
     setQuantity(row?.quantity || 0);
     if (personalise && !nameEdited.current) setPrintName(row?.personalisation?.mode === 'PRINT' ? row.personalisation.name : '');
    }
   } catch { /* Keep the last confirmed quantity; adding can retry the cart read. */ }
   finally { loading = false; }
  };
  void refresh();
  window.addEventListener('b2c-cart-change', refresh);
  return () => { active = false; window.removeEventListener('b2c-cart-change', refresh); };
 }, [itemId, withQuantity, personalise]);
 useEffect(() => {
  if (status !== 'added') return;
  const timer = setTimeout(() => setStatus('idle'), 1800);
  return () => clearTimeout(timer);
 }, [status]);
 function nameChoice(): GiftPersonalisation | null | undefined {
  return !personalise || !nameEdited.current ? undefined : printName.trim() ? { mode: 'PRINT', name: printName.trim() } : null;
 }
 function validateName() {
  const error = personalise ? printNameError(printName) : '';
  setNameError(error); return !error;
 }
 async function add(change: 1 | -1 = 1) {
  if (locked.current || (change === 1 && !validateName())) return;
  locked.current = true;
  setStatus('adding'); setMessage('');
  try {
   const draft = await (change === 1 ? addGiftItem(itemId, nameChoice()) : changeGiftItemQuantity(itemId, change));
   setQuantity(draft.items.find(item => item.id === itemId)?.quantity || 0);
   if (change === 1) { nameEdited.current = false; setNameDirty(false); }
   setStatus(withQuantity ? 'idle' : 'added');
   setMessage(withQuantity ? '' : 'Added to your cart.');
  } catch (error) {
   setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to update your cart. Please try again.');
  } finally { locked.current = false; }
 }
 async function buyNow() {
  if (locked.current || !validateName()) return;
  locked.current = true;
  setStatus('buying'); setMessage('');
  try {
   const draft = await ensureGiftItem(itemId, nameChoice());
   setQuantity(draft.items.find(item => item.id === itemId)?.quantity || 0);
   // The existing cart reviews enquiry pricing before allowing checkout.
   router.push('/cart');
   setStatus('idle');
  } catch (error) {
   setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to open your cart. Please try again.');
  } finally { locked.current = false; }
 }
 async function saveName() {
  if (locked.current || !validateName()) return false;
  locked.current = true; setStatus('adding'); setMessage('');
  try {
   await saveGiftPersonalisation(itemId, nameChoice() ?? null);
   nameEdited.current = false; setNameDirty(false); setStatus('idle');
   return true;
  } catch (error) { setStatus('error'); setMessage(error instanceof Error ? error.message : 'Unable to save your name.'); return false; }
  finally { locked.current = false; }
 }
 if (withQuantity) return <div className={`gift-purchase${compact ? ' gift-purchase--compact' : ''}${personalise ? ' gift-purchase--personalised' : ''}`}>
  <div className="gift-purchase-controls">
   {(!compact || quantity === 0) && <button type="button" className={className} disabled={busy || quantity >= 99} aria-busy={busy} aria-label={`Add ${name} to cart`} onClick={() => void add()}>
    <span>{status === 'adding' ? quantity ? 'Updating…' : 'Adding…' : 'Add to Cart'}</span>
    <ShoppingBag size={18} strokeWidth={1.7} aria-hidden="true"/>
   </button>}
  {quantity > 0 && <QuantityControl name={name} value={quantity} disabled={busy} onChange={next => void add(next > quantity ? 1 : -1)}/>}
  </div>
  {personalise && <>
   <PrintNameField value={printName} disabled={busy} error={nameError} onChange={value => { nameEdited.current = true; setNameDirty(true); setPrintName(value); setNameError(''); }} />
   {quantity > 0 && nameDirty && <button type="button" className="text-link envelope-print-save" disabled={busy} onClick={() => void saveName()}>{busy ? 'Saving…' : 'Save name'}</button>}
  </>}
  {phoneBuyNow && <button type="button" className="button gift-purchase-buy-now" disabled={busy} aria-busy={status === 'buying'} onClick={() => void buyNow()}>{status === 'buying' ? 'Opening…' : 'Buy now'} <ArrowRight size={16} aria-hidden="true" /></button>}
  {showCheckout && quantity > 0 && <Link className="button gift-purchase-checkout" href="/cart" onClick={event => { if (personalise && nameEdited.current) { event.preventDefault(); void saveName().then(saved => { if (saved) router.push('/cart'); }); } }}>Proceed to checkout <ArrowRight size={16} aria-hidden="true" /></Link>}
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
