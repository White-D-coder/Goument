'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { money } from '@/lib/types';
import type { GiftPersonalisation } from '@/lib/gift-personalisation';
import './envelope-personalisation.css';

type Address = {
  id?: string;
  recipientName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type View = {
  revision: number;
  pricing: { grandTotalMinor: number; currency: string };
  paymentAvailable: boolean;
  addresses: Address[];
  selection: {
    boxes?: { name: string; quantity: number; personalisation?: never; packSize?: never }[];
    items: { name: string; quantity: number; packSize?: 10|20; personalisation?: GiftPersonalisation }[];
  };
};

const empty: Address = {
  recipientName: '',
  phone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  landmark: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'IN'
};

const fields: {
  key: keyof Address;
  label: string;
  auto: string;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}[] = [
  { key: 'recipientName', label: 'Recipient name', auto: 'shipping name' },
  { key: 'phone', label: 'Phone number', auto: 'shipping tel', type: 'tel', placeholder: '98765 43210 (default +91)', maxLength: 25 },
  { key: 'email', label: 'Email address (optional)', auto: 'shipping email', optional: true, type: 'email', placeholder: 'name@example.com', maxLength: 254 },
  { key: 'addressLine1', label: 'House / flat number and street', auto: 'shipping address-line1' },
  { key: 'addressLine2', label: 'Apartment / area (optional)', auto: 'shipping address-line2', optional: true },
  { key: 'landmark', label: 'Landmark (optional)', auto: 'off', optional: true },
  { key: 'city', label: 'City', auto: 'shipping address-level2' },
  { key: 'state', label: 'State / region', auto: 'shipping address-level1' },
  { key: 'postalCode', label: 'PIN / postal code', auto: 'shipping postal-code' },
  { key: 'country', label: 'Country code (e.g. IN)', auto: 'shipping country', maxLength: 2 }
];

export default function DeliveryCheckout() {
  const router = useRouter();
  const [view, setView] = useState<View | null>(null);
  const [address, setAddress] = useState<Address>(empty);
  const [review, setReview] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [retry, setRetry] = useState(0);

  function failure(e: unknown) {
    if (e instanceof ApiError && e.status === 401) {
      window.location.replace('/account?next=%2Fcheckout');
      return;
    }
    setError(e instanceof Error ? e.message : 'Unable to load checkout. Please retry.');
  }

  useEffect(() => {
    let active = true;
    api<View>('/auth/gift/checkout')
      .then(v => {
        if (active) {
          setView(v);
          if (v.addresses[0]) setAddress(v.addresses[0]);
        }
      })
      .catch(e => {
        if (active) failure(e);
      });
    return () => { active = false; };
  }, [retry]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const latest = await api<View>('/auth/gift/checkout');
      setView(latest);

      // Auto-attach default +91 if omitted
      let formattedPhone = (address.phone || '').trim().replace(/[ ()-]/g, '');
      if (formattedPhone && !formattedPhone.startsWith('+')) {
        formattedPhone = `+91${formattedPhone.replace(/^0+/, '')}`;
      }

      const payloadToSend = {
        ...address,
        phone: formattedPhone,
        email: address.email?.trim() || undefined
      };

      const result = await api<{ address: Address }>('/auth/gift/address', 'POST', payloadToSend);
      setAddress(result.address);
      setReview(true);
    } catch (e) {
      failure(e);
    } finally {
      setBusy(false);
    }
  }

  async function placeOrder() {
    setPlacing(true);
    setError('');
    try {
      if (!view) return;
      const res = await api<{ orderId: string }>('/auth/gift/order', 'POST', {
        addressId: address.id, revision: view.revision, expectedTotalMinor: view.pricing.grandTotalMinor
      });
      router.push(`/checkout?order=${encodeURIComponent(res.orderId)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  }

  return (
    <section className="section delivery-checkout">
      <p className="eyebrow">YOUR GIFT, ALMOST THERE</p>
      <h1>{review ? 'Review & payment' : 'Where should we send it?'}</h1>
      <p className="checkout-steps">
        1. Signed in <span>→</span> 2. Delivery <span>→</span> 3. Review & payment
      </p>

      {error && (
        <div className="notice" role="alert">
          {error} <button className="text-link" onClick={() => { setError(''); setRetry(n => n + 1); }}>Retry</button>
        </div>
      )}

      {!view ? (
        <p role="status">
          {error ? 'Checkout could not be loaded.' : 'Checking your account and gift…'} <Link href="/cart">Back to bag</Link>
        </p>
      ) : (
        <div className="delivery-layout">
          <div>
            {review ? (
              <>
                <h2>Delivery details</h2>
                <address>
                  {address.recipientName}<br />
                  {address.addressLine1}<br />
                  {address.addressLine2 && <>{address.addressLine2}<br /></>}
                  {address.landmark && <>{address.landmark}<br /></>}
                  {address.city}, {address.state} {address.postalCode}<br />
                  {address.country}<br />
                  Phone: {address.phone}
                  {address.email && <><br />Email: {address.email}</>}
                </address>
                <button className="text-link" onClick={() => setReview(false)}>
                  Edit delivery details
                </button>

                <div className="payment-options-section">
                  <h2>Secure payment</h2>
                  <p>UPI, cards and net banking through Razorpay.</p>
                  <p>GST and delivery included. Stock is held for 5 minutes once you continue.</p>
                  {!view.paymentAvailable && <p role="status">Online payment is not configured yet. Your bag is saved.</p>}
                  <button className="button" disabled={busy || placing || !view.paymentAvailable} onClick={() => void placeOrder()}>
                    {placing ? 'Reserving your gifts…' : `Continue to payment · ${money(view.pricing.grandTotalMinor, view.pricing.currency)}`}<ArrowRight size={15} />
                  </button>
                </div>
              </>
            ) : (
              <form className="delivery-form" onSubmit={submit}>
                <h2>Delivery details</h2>
                {view.addresses.length > 0 && (
                  <label>
                    Saved address
                    <select
                      value={address.id || ''}
                      onChange={e => setAddress(view.addresses.find(a => a.id === e.target.value) || empty)}
                    >
                      <option value="">Add a new address</option>
                      {view.addresses.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.recipientName} — {a.city}, {a.postalCode}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                <div className="delivery-fields">
                  {fields.map(f => (
                    <label key={f.key}>
                      {f.label}
                      <input
                        name={f.key}
                        value={address[f.key] || ''}
                        onChange={e => setAddress({ ...address, [f.key]: e.target.value })}
                        autoComplete={f.auto}
                        required={!f.optional}
                        maxLength={f.maxLength ?? (f.key === 'country' ? 2 : f.key === 'phone' ? 25 : 250)}
                        type={f.type ?? 'text'}
                        placeholder={f.placeholder}
                      />
                    </label>
                  ))}
                </div>
                <p className="draft-disclosure">
                  We save this address to your account for checkout. Delivery availability is confirmed with the final order.
                </p>
                <button className="button" disabled={busy}>
                  {busy ? 'Saving…' : 'Save & review gift →'}
                </button>
              </form>
            )}
          </div>

          <aside className="delivery-summary">
            <h2>Your selection</h2>
            {[...(view.selection.boxes || []), ...(view.selection.items || [])].map((row, i) => (
              <div key={i}>
                <span>{row.name}{row.packSize ? ` · ${row.packSize} pcs` : ''}{row.personalisation?.mode === 'PRINT' && <small className="delivery-print-name">Name to print: {row.personalisation.name}</small>}</span>
                <span>× {row.quantity}</span>
              </div>
            ))}
            <Link className="text-link" href="/cart">Edit your bag →</Link>
            <div><strong>Total</strong><strong>{money(view.pricing.grandTotalMinor, view.pricing.currency)}</strong></div><p className="draft-disclosure">GST and delivery included.</p>
          </aside>
        </div>
      )}
    </section>
  );
}

