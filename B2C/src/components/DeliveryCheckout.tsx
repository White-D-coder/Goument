'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { api, ApiError } from '@/lib/api';

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
  addresses: Address[];
  selection: {
    boxes?: { name: string; quantity: number }[];
    items: { name: string; quantity: number }[];
  };
};

type PlacedOrder = {
  orderNumber: string;
  orderId: string;
  paymentMethod: string;
  deliveryAddress: Address;
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
  const [view, setView] = useState<View | null>(null);
  const [address, setAddress] = useState<Address>(empty);
  const [review, setReview] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'COD'>('UPI');
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
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
      const res = await api<{
        success: boolean;
        orderId: string;
        orderNumber: string;
        paymentMethod: string;
        deliveryAddress: Address;
      }>('/auth/gift/order', 'POST', {
        paymentMethod,
        addressId: address.id
      });
      setPlacedOrder(res);
      window.dispatchEvent(new Event('b2c-cart-change'));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  }

  // If order was successfully placed, render Order Confirmed view
  if (placedOrder) {
    return (
      <section className="section order-confirmed">
        <div className="order-confirmed-card">
          <div className="order-success-icon">
            <Check size={28} />
          </div>
          <p className="eyebrow">ORDER CONFIRMED</p>
          <h1>Thank you for your gift order.</h1>
          <p className="order-ref">
            Order Reference: <strong>#{placedOrder.orderNumber}</strong>
          </p>
          <p className="section-intro">
            We have received your gift order and our artisans are preparing your packaging. Tracking and dispatch details will be sent to your phone and email.
          </p>

          <div className="order-delivery-snapshot">
            <h3>Delivering to:</h3>
            <p>
              <strong>{placedOrder.deliveryAddress.recipientName}</strong><br />
              {placedOrder.deliveryAddress.addressLine1}
              {placedOrder.deliveryAddress.addressLine2 ? `, ${placedOrder.deliveryAddress.addressLine2}` : ''}<br />
              {placedOrder.deliveryAddress.city}, {placedOrder.deliveryAddress.state} {placedOrder.deliveryAddress.postalCode}<br />
              Phone: {placedOrder.deliveryAddress.phone}
              {placedOrder.deliveryAddress.email ? <><br />Email: {placedOrder.deliveryAddress.email}</> : ''}
            </p>
            <p style={{ marginTop: '10px' }}>
              <strong>Payment Method:</strong> {
                placedOrder.paymentMethod === 'UPI' ? 'UPI / QR Code' :
                placedOrder.paymentMethod === 'CARD' ? 'Credit / Debit Card' :
                placedOrder.paymentMethod === 'NETBANKING' ? 'Net Banking' : 'Cash on Delivery (Pay on Delivery)'
              }
            </p>
          </div>

          <div className="order-actions">
            <Link className="button" href="/account">
              View orders in your account <ArrowRight size={15} />
            </Link>
            <Link className="text-link" href="/shop">
              Curate another gift →
            </Link>
          </div>
        </div>
      </section>
    );
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
                  <h2>Select payment option</h2>
                  <div className="payment-methods-list">
                    <label className={`payment-method-item ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                      />
                      <div className="method-info">
                        <strong>UPI / Instant QR</strong>
                        <span>Google Pay, PhonePe, Paytm, BHIM & all UPI apps</span>
                      </div>
                    </label>

                    <label className={`payment-method-item ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="CARD"
                        checked={paymentMethod === 'CARD'}
                        onChange={() => setPaymentMethod('CARD')}
                      />
                      <div className="method-info">
                        <strong>Credit or Debit Card</strong>
                        <span>Visa, Mastercard, RuPay & American Express</span>
                      </div>
                    </label>

                    <label className={`payment-method-item ${paymentMethod === 'NETBANKING' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="NETBANKING"
                        checked={paymentMethod === 'NETBANKING'}
                        onChange={() => setPaymentMethod('NETBANKING')}
                      />
                      <div className="method-info">
                        <strong>Net Banking</strong>
                        <span>HDFC, ICICI, SBI, Axis & all major Indian banks</span>
                      </div>
                    </label>

                    <label className={`payment-method-item ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                      />
                      <div className="method-info">
                        <strong>Cash on Delivery (Pay on Delivery)</strong>
                        <span>Pay comfortably when your gift arrives</span>
                      </div>
                    </label>
                  </div>

                  <button
                    className="button"
                    disabled={busy || placing}
                    onClick={() => void placeOrder()}
                  >
                    {placing ? 'Placing your order…' : 'Place Gift Order'}
                    <ArrowRight size={15} />
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
                <span>{row.name}</span>
                <span>× {row.quantity}</span>
              </div>
            ))}
            <Link className="text-link" href="/cart">Edit your bag →</Link>
            <p className="draft-disclosure">Final total pending confirmation.</p>
          </aside>
        </div>
      )}
    </section>
  );
}

