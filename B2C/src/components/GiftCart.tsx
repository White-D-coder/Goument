/* eslint-disable @next/next/no-img-element -- Existing local catalogue photography. */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { giftApi, useGiftDraft } from '@/hooks/useGiftDraft';
import QuantityControl from './QuantityControl';

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

  return (
    <section className="section gift-cart">
      <p className="eyebrow">THOUGHTFULLY CHOSEN</p>
      <div className="section-heading">
        <h1>Your gift, coming together.</h1>
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
            <div>
              <h2>Your little favourites</h2>
              {draft.items.length ? (
                draft.items.map(row => {
                  const item = catalogue.items.find(i => i.id === row.id);
                  return (
                    <article key={row.id} className="gift-cart-row">
                      {item && <img src={item.image} alt="" />}
                      <div>
                        <h3>{item?.name || 'Item unavailable'}</h3>
                        <button
                          className="text-link remove-item"
                          disabled={busy}
                          onClick={() => void change('items', row.id, 0)}
                        >
                          Remove
                        </button>
                      </div>
                      <QuantityControl
                        name={item?.name || 'item'}
                        value={row.quantity}
                        disabled={busy}
                        onChange={q => void change('items', row.id, q)}
                      />
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
              <h2>The finishing touch</h2>
              <p aria-live="polite">
                {isReady ? 'Your gift selection is ready for checkout.' : 'Add your favourites to get started.'}
              </p>
              <p>{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
              <button
                className="button"
                disabled={busy || checking || !isReady}
                onClick={() => void check()}
              >
                {checking ? 'Checking…' : 'Continue to checkout'}
                <ArrowRight size={15} />
              </button>
              <p className="draft-disclosure">
                Delivery details come next. Final pricing must be confirmed before payment.
              </p>
              {review && <p role="status">{review}</p>}
            </aside>
          </div>
        </>
      )}
    </section>
  );
}

