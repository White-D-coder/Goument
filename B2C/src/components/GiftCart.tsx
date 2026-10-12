'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { giftApi, useGiftDraft } from '@/hooks/useGiftDraft';
import { giftingEnquiry } from '@/lib/product-editorial';
import { estimateGiftCart, priceRangeLabel, type PriceRange } from '@/lib/gift-cart-pricing';
import QuantityControl from './QuantityControl';
import ProductPhoto from './ProductPhoto';
import './gift-cart.css';

function PriceAmount({ value }: { value: PriceRange }) {
  return <span className="gift-cart-amount"><span>{priceRangeLabel({ min: value.min, max: value.min })}</span>{value.max !== value.min && <><span>–</span><span>{priceRangeLabel({ min: value.max, max: value.max })}</span></>}</span>;
}

export default function GiftCart() {
  const router = useRouter();
  const { draft, catalogue, error, busy, change, reload } = useGiftDraft();
  const [review, setReview] = useState('');
  const [checking, setChecking] = useState(false);

  async function check() {
    setChecking(true);
    setReview('');
    try {
      await api(`${giftApi}/checkout-check`, 'POST', {});
      router.push('/checkout');
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        router.push('/account?next=%2Fcheckout');
      } else {
        setReview(e instanceof Error ? e.message : 'Unable to check your gift.');
      }
    } finally {
      setChecking(false);
    }
  }

  const totalItems = draft?.items.reduce((n, i) => n + i.quantity, 0) || 0;
  const isReady = (draft?.items.length || 0) > 0;
  const estimate = estimateGiftCart(draft?.items || [], catalogue?.items || [], draft?.boxes || []);
  const enquiryHamper = draft?.items
    .map(row => catalogue?.items.find(item => item.id === row.id))
    .find(item => item?.category === 'Gift Hampers');

  return (
    <section className="section gift-cart">
      <p className="eyebrow">THOUGHTFULLY CHOSEN</p>
      <div className="section-heading">
        <h1><span className="cart-desktop-only">Your gift, coming together.</span><span className="cart-phone-only">Your gift bag</span></h1>
        <Link className="text-link" href="/build">Add more items →</Link>
      </div>

      {error && (
        <div className="notice" role="alert">
          {error} <button className="text-link" onClick={reload}>Retry</button>
        </div>
      )}

      {!draft || !catalogue ? (
        <p role="status">{error ? 'Your gift could not be loaded.' : 'Loading your gift…'}</p>
      ) : (
        <>
          <p className="draft-disclosure">Your selection is saved. Sign in at checkout to add your delivery details.</p>
          <div className="gift-cart-layout">
            <div className="gift-cart-items">
              <h2>Your little favourites</h2>
              {draft.items.length ? (
                draft.items.map(row => {
                  const item = catalogue.items.find(i => i.id === row.id);
                  const line = estimate.lines.find(line => line.id === row.id);
                  return (
                    <article key={row.id} className="gift-cart-row">
                      {item && <div className="gift-cart-photo"><ProductPhoto src={item.image} alt={item.name} sizes="(max-width: 640px) 112px, (max-width: 1000px) 180px, (max-width: 1199px) 220px, 260px" /></div>}
                      <div className="gift-cart-item-info">
                        <h3>{item?.name || 'Item unavailable'}</h3>
                        {item && <p className="gift-cart-category">{item.category}</p>}
                        <p className="gift-cart-price">{line?.unit ? `${priceRangeLabel(line.unit)} each · excl. GST` : 'Price pending confirmation'}</p>
                      </div>
                      <div className="gift-cart-line-price">
                        <p className="gift-cart-price-label">Item total</p>
                        <p className="gift-cart-line-total">{line?.total ? <PriceAmount value={line.total}/> : 'Price pending'}</p>
                        <p className="gift-cart-price-detail">{row.quantity} {row.quantity === 1 ? 'item' : 'items'} · excl. GST</p>
                      </div>
                      <div className="gift-cart-actions">
                        <QuantityControl
                          name={item?.name || 'item'}
                          value={row.quantity}
                          disabled={busy}
                          onChange={q => void change('items', row.id, q)}
                        />
                        <button
                          className="text-link remove-item"
                          disabled={busy}
                          onClick={() => void change('items', row.id, 0)}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p>
                  Your gift is waiting for its favourites. <Link className="text-link" href="/build">Choose items →</Link>
                </p>
              )}
            </div>

            <aside className="gift-review">
              <h2>Order summary</h2>
              <dl className="gift-cart-summary" aria-live="polite" aria-busy={busy}>
                <div><dt>Selected items</dt><dd>{totalItems}</dd></div>
                <div><dt>{estimate.incomplete ? 'Priced items subtotal' : 'Items subtotal'}</dt><dd><PriceAmount value={estimate.subtotal}/></dd></div>
                <div><dt>GST (18% on items)</dt><dd><PriceAmount value={estimate.gst}/></dd></div>
                <div><dt>Delivery</dt><dd>{isReady ? 'To be confirmed' : 'Add items'}</dd></div>
                {estimate.packagingPending && <div><dt>Packaging</dt><dd>Price pending</dd></div>}
                <div className="gift-cart-total"><dt>Total before delivery</dt><dd>{estimate.total ? <PriceAmount value={estimate.total}/> : 'Price pending'}</dd></div>
              </dl>
              <p className="gift-cart-estimate-note">{estimate.incomplete ? 'Some selected prices need confirmation. ' : ''}{isReady ? 'Final pricing and delivery are confirmed before payment.' : 'Add your favourites to get started.'}</p>
              {isReady && <Link className="text-link" href={giftingEnquiry(enquiryHamper?.name || 'my gift selection')}>Confirm final total →</Link>}
              <button
                className="button"
                disabled={busy || checking || !isReady || !draft.checkoutAvailable || Boolean(enquiryHamper)}
                onClick={() => void check()}
              >
                {checking ? 'Checking…' : 'Continue to checkout'}
                <ArrowRight size={15} />
              </button>
              {review && <p role="status">{review}</p>}
            </aside>
          </div>
        </>
      )}
    </section>
  );
}
