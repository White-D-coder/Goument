'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { cartMutation } from '@/lib/api';
import { Product, money } from '@/lib/types';
import { giftingEnquiry } from '@/lib/product-editorial';
import AddGiftToCartButton from './AddGiftToCartButton';

export default function BuyPanel({ product }: { product: Product }) {
  const [sku, setSku] = useState(product.variants[0]?.sku || '');
  const [quantity, setQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [added, setAdded] = useState(false);
  const optionId = useId();
  const variant = product.variants.find(item => item.sku === sku);
  const stock = variant?.inventory ?? product.inventory;

  async function add() {
    if (busy || stock < 1) return;
    setBusy(true); setAdded(false); setMessage('');
    try {
      await cartMutation('POST', '/cart/items', { productId: product._id, variantSku: sku || undefined, quantity });
      setAdded(true); setMessage('Added to your bag.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not add this gift.');
    } finally { setBusy(false); }
  }

  if (product.preview) return <div className="buy-panel pdp-preview">
    <p className="pdp-quote">Price on enquiry</p>
    <p className="pdp-purchase-help">Enquire for the final selection, availability and pricing.</p>
    {product.giftItemId
      ? <AddGiftToCartButton itemId={product.giftItemId} name={product.name} withQuantity compact showCheckout />
      : <a className="button" href={giftingEnquiry(product.name)}>Enquire about this gift <span aria-hidden="true">↗</span></a>}
  </div>;

  if (product.giftItemId) return <div className="buy-panel">
    <p className="price">{money(product.basePrice, product.currency)}</p>
    <AddGiftToCartButton itemId={product.giftItemId} name={product.name} withQuantity compact showCheckout />
  </div>;

  return <div className="buy-panel">
    <p className="price">{money(variant?.price ?? product.basePrice, product.currency)}</p>
    {product.variants.length > 0 && <fieldset className="pdp-options" disabled={busy}>
      <legend>Choose an option</legend>
      <div>{product.variants.map(option => <label key={option.sku}>
        <input type="radio" name={optionId} value={option.sku} checked={sku === option.sku}
          onChange={() => { setSku(option.sku); setQuantity(1); setAdded(false); setMessage(''); }}/>
        <span>{option.name}{option.inventory === 0 ? ' · Sold out' : ''}</span>
      </label>)}</div>
    </fieldset>}
    <div className="pdp-quantity-row">
      <span>Quantity</span>
      <div className="gift-counter" role="group" aria-label={`${product.name} quantity`}>
        <button type="button" disabled={busy || quantity <= 1} aria-label="Decrease quantity" onClick={() => setQuantity(value => value - 1)}><Minus size={16}/></button>
        <output aria-live="polite">{quantity}</output>
        <button type="button" disabled={busy || quantity >= Math.min(99, stock)} aria-label="Increase quantity" onClick={() => setQuantity(value => value + 1)}><Plus size={16}/></button>
      </div>
    </div>
    <button type="button" className="button" disabled={busy || stock < 1} aria-busy={busy} onClick={add}>{busy ? 'Adding…' : stock < 1 ? 'Out of stock' : 'Add to cart'}</button>
    {message && <p role={added ? 'status' : 'alert'} className="pdp-purchase-help">{message}</p>}
    {added && <Link className="pdp-link" href="/cart/store">View your bag <span aria-hidden="true">→</span></Link>}
  </div>;
}
