'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ShoppingBag, X } from 'lucide-react';
import { api } from '@/lib/api';
import { cartAdditionFromEvent, giftCartDraftFromEvent, giftCartItemsFromEvent } from '@/lib/gift-cart-events';
import { changeGiftItemQuantity } from '@/lib/gift-cart';
import { estimateGiftCart, priceRangeLabel } from '@/lib/gift-cart-pricing';
import { envelopePack, isEnvelopeGift } from '@/lib/envelope-packs';
import { money, type CartItem } from '@/lib/types';
import type { Draft, GiftCatalogue, GiftItem } from '@/hooks/useGiftDraft';
import { useTwoRowScroll } from '@/hooks/useTwoRowScroll';
import photographedItems from '../../backend/gifting/items.json';
import ProductPhoto from './ProductPhoto';
import QuantityControl from './QuantityControl';
import './cart-tray.css';

// Same photographed identities and price resolver as the full cart. Public
// catalogue prices refresh once on first opening; this is never a payment quote.
const fallbackItems: GiftItem[] = photographedItems.flatMap(item => isEnvelopeGift(item.id)
  ? [{ ...item, packSize: 20 as const }, { ...item, id: `${item.id}-pack-10`, packSize: 10 as const }]
  : [item]);
type StoreItem = CartItem & { name: string; slug?: string; variantName?: string; unitPrice: number | null; currency: string; available: boolean };

export default function CartTray() {
 const pathname = usePathname();
 const [open, setOpen] = useState(false);
 const [source, setSource] = useState<'gift' | 'store'>('gift');
 const [draft, setDraft] = useState<Draft | null>(null);
 const [catalogue, setCatalogue] = useState(fallbackItems);
 const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const [busy, setBusy] = useState<string | null>(null);
 const panel = useRef<HTMLElement>(null);
 const trigger = useRef<HTMLElement | null>(null);
 const triggerArea = useRef<Element | null>(null);
 const sourceRef = useRef<'gift' | 'store'>('gift');
 const shown = useRef(false);
 const catalogueLoaded = useRef(false);
 const storeRead = useRef<Promise<void> | null>(null);
 const locked = useRef(false);
 const visible = open && !/^\/(?:admin|cart|checkout|account)(?:\/|$)/.test(pathname);
 const itemList = useTwoRowScroll(visible, source === 'gift'
  ? (draft?.items || []).slice(0, 2).map(row => row.id).join('|')
  : storeItems.slice(0, 2).map(row => `${row.productId}:${row.variantSku || ''}`).join('|'), '.cart-tray-item');

 const close = useCallback(() => {
  if (panel.current?.contains(document.activeElement)) {
   const target = trigger.current?.isConnected && trigger.current.matches('a[href], button:not([disabled]), input:not([disabled]), [tabindex]') ? trigger.current
    : triggerArea.current?.querySelector<HTMLElement>('button:not([disabled])') || document.querySelector<HTMLElement>('.header .bag');
   target?.focus({ preventScroll: true });
  }
  setOpen(false);
 }, []);

 useEffect(() => {
  let active = true;
  const loadStore = () => {
   if (storeRead.current) return;
   setLoading(true); setError('');
   const task = api<{ data: { items: StoreItem[] } }>('/cart').then(result => {
    if (active) setStoreItems(result.data.items);
   }).catch(reason => { if (active && sourceRef.current === 'store') setError(reason instanceof Error ? reason.message : 'Unable to load your bag.'); })
    .finally(() => { storeRead.current = null; if (active) setLoading(false); });
   storeRead.current = task;
  };
  const added = (event: Event) => {
   const addition = cartAdditionFromEvent(event);
   if (!addition) return;
   if (!panel.current?.contains(document.activeElement)) {
    trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    triggerArea.current = trigger.current?.closest('.gift-purchase, .builder-item-action, .buy-panel') || null;
   }
   sourceRef.current = addition.source;
   setSource(addition.source); setError(''); setOpen(true);
   if (addition.source === 'gift') {
    setDraft(addition.draft);
    if (!catalogueLoaded.current) {
     catalogueLoaded.current = true;
     void api<GiftCatalogue>('/auth/gift/catalogue').then(result => { if (active) setCatalogue(result.items); })
      .catch(() => { /* Keep card display fallback; the full cart/checkout refreshes prices. */ });
    }
   } else loadStore();
  };
  const changed = (event: Event) => {
   const items = giftCartItemsFromEvent(event);
   const confirmed = giftCartDraftFromEvent(event);
   if (confirmed) setDraft(confirmed);
   else if (items) setDraft(current => current ? { ...current, items } : null);
   else if (shown.current && sourceRef.current === 'store') loadStore();
  };
  const key = (event: KeyboardEvent) => {
   if (event.key === 'Escape' && shown.current && !event.defaultPrevented && !document.querySelector('dialog[open]')) close();
  };
  window.addEventListener('b2c-cart-added', added);
  window.addEventListener('b2c-cart-change', changed);
  window.addEventListener('keydown', key);
  return () => {
   active = false;
   window.removeEventListener('b2c-cart-added', added);
   window.removeEventListener('b2c-cart-change', changed);
   window.removeEventListener('keydown', key);
  };
 }, [close]);

 useEffect(() => {
  shown.current = visible;
  if (visible) document.body.dataset.cartTrayOpen = 'true';
  else delete document.body.dataset.cartTrayOpen;
  return () => { delete document.body.dataset.cartTrayOpen; };
 }, [visible]);

 async function change(id: string, amount: 1 | -1) {
  if (locked.current) return;
  locked.current = true; setBusy(id); setError('');
  try { setDraft(await changeGiftItemQuantity(id, amount)); }
  catch (reason) { if (sourceRef.current === 'gift') setError(reason instanceof Error ? reason.message : 'Unable to update your bag.'); }
  finally { locked.current = false; setBusy(null); }
 }

 const rows = draft?.items || [];
 const estimate = estimateGiftCart(rows, catalogue, draft?.boxes || []);
 const count = source === 'gift' ? rows.reduce((sum, row) => sum + row.quantity, 0) : storeItems.reduce((sum, row) => sum + row.quantity, 0);
 const storeTotal = storeItems.every(item => item.unitPrice !== null && item.currency === 'INR')
  ? storeItems.reduce((sum, item) => sum + item.unitPrice! * item.quantity, 0) : null;
 const total = source === 'gift' ? estimate.total && priceRangeLabel(estimate.total) : storeTotal !== null ? money(storeTotal) : null;
 const cartHref = source === 'gift' ? '/cart' : '/cart/store';

 return <aside ref={panel} className="cart-tray" data-open={visible} aria-labelledby="cart-tray-title" aria-hidden={!visible} inert={!visible}>
  <div className="cart-tray-heading">
   <div><p>Your thoughtful picks</p><h2 id="cart-tray-title">Your bag <span>{count}</span></h2></div>
   <button type="button" className="cart-tray-close" aria-label="Close cart tray" onClick={close}><X size={21} aria-hidden="true" /></button>
  </div>
  {visible && <>
   <p className="cart-tray-announcement" role="status">{count} {count === 1 ? 'item' : 'items'} in your bag. You can keep shopping.</p>
   <div ref={itemList} className="cart-tray-items" aria-busy={(source === 'store' && loading) || busy !== null}>
    {error && <p className="cart-tray-error" role="alert">{error}</p>}
    {source === 'store' && loading && <p role="status">Loading your bag…</p>}
    {source === 'gift' ? rows.map(row => {
     const item = catalogue.find(item => item.id === row.id);
     const line = estimate.lines.find(line => line.id === row.id);
     return <article className="cart-tray-item" key={row.id}>
      <div className="cart-tray-photo">{item ? <ProductPhoto src={item.image} alt={item.name} sizes="80px" /> : <ShoppingBag size={24} aria-hidden="true" />}</div>
      <div className="cart-tray-copy">
       <h3>{item?.slug ? <Link href={`/products/${item.slug}`}>{item.name}</Link> : item?.name || 'Gift unavailable'}</h3>
       {isEnvelopeGift(row.id) && <p>Pack of {envelopePack(row.id)}</p>}
       {row.personalisation?.mode === 'PRINT' && <p>Name: {row.personalisation.name}</p>}
       <strong>{line?.total ? priceRangeLabel(line.total) : 'Price unavailable'}</strong>
       <QuantityControl name={item?.name || 'gift'} value={row.quantity} disabled={busy !== null} onChange={next => void change(row.id, next > row.quantity ? 1 : -1)} />
      </div>
     </article>;
    }) : storeItems.map(item => <article className="cart-tray-item" key={`${item.productId}:${item.variantSku || ''}`}>
     <div className="cart-tray-photo"><ShoppingBag size={24} aria-hidden="true" /></div>
     <div className="cart-tray-copy"><h3>{item.slug ? <Link href={`/products/${item.slug}`}>{item.name}</Link> : item.name}</h3>
      <p>{item.variantName ? `${item.variantName} · ` : ''}Quantity: {item.quantity}</p>
      <strong>{item.unitPrice === null ? 'Price unavailable' : money(item.unitPrice * item.quantity, item.currency)}</strong>
     </div>
    </article>)}
    {!count && !loading && <p className="cart-tray-empty">Your bag is empty. Find something thoughtful.</p>}
   </div>
   <div className="cart-tray-summary">
    <p className="cart-tray-total"><span>Subtotal</span><strong>{total || 'Price unavailable'}</strong></p>
    {source === 'gift' && <p className="cart-tray-included">GST and delivery included.</p>}
    <Link className="button cart-tray-review" href={cartHref} onClick={close}>View cart <ArrowRight size={17} aria-hidden="true" /></Link>
   </div>
  </>}
 </aside>;
}
