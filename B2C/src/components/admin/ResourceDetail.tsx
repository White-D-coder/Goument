'use client';
/* eslint-disable @next/next/no-img-element -- Admin previews use approved stored URLs without forwarding them through the storefront image optimizer. */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Pencil } from 'lucide-react';
import { adminApi, queryString } from '@/lib/admin/api';
import { amountValue, humanize, recordTitle, textValue, valueAt } from '@/lib/admin/format';
import { resources } from '@/lib/admin/resources';
import type { AdminDetail, AdminList, AdminRecord, AdminResource, DisplayField } from '@/lib/admin/types';
import { useAdmin } from './AdminProvider';
import { AdminEmpty, AdminFailure, AdminForbidden, AdminLoading, CapabilityNotice, RecordFacts, RecordTable, useAdminLoad, useAdminMutation } from './shared';
import ResourceEditor from './ResourceEditor';

const addressFields: DisplayField[] = [{ key: 'recipientName', label: 'Recipient' }, { key: 'phone', label: 'Phone' }, { key: 'addressLine1', label: 'Address' }, { key: 'addressLine2', label: 'Address line 2' }, { key: 'landmark', label: 'Landmark' }, { key: 'city', label: 'City' }, { key: 'state', label: 'State' }, { key: 'postalCode', label: 'Postal code' }, { key: 'country', label: 'Country' }];
const relationFields: Record<string, DisplayField[]> = {
  addresses: [...addressFields, { key: 'label', label: 'Label' }, { key: 'isDefaultShipping', label: 'Default shipping', kind: 'boolean' }, { key: 'isDefaultBilling', label: 'Default billing', kind: 'boolean' }],
  'coupon-usage': [{ key: 'couponId', label: 'Coupon', link: 'coupons' }, { key: 'orderId', label: 'Order', link: 'orders' }, { key: 'discountMinor', label: 'Discount (recorded minor units)', kind: 'money' }, { key: 'status', label: 'Status', kind: 'status' }, { key: 'createdAt', label: 'Applied', kind: 'date' }, { key: 'reversedAt', label: 'Reversed', kind: 'date' }],
  movements: [{ key: 'sku', label: 'SKU' }, { key: 'type', label: 'Movement' }, { key: 'quantity', label: 'Quantity', kind: 'number' }, { key: 'referenceType', label: 'Reference type' }, { key: 'referenceId', label: 'Reference ID' }, { key: 'actorId', label: 'Actor ID' }, { key: 'reason', label: 'Reason' }, { key: 'createdAt', label: 'Recorded', kind: 'date' }],
};

export default function ResourceDetail({ resource, id }: { resource: AdminResource; id: string }) {
  const { can } = useAdmin();
  return can(resources[resource].permission) ? <AuthorizedDetail resource={resource} id={id} /> : <AdminForbidden />;
}
function AuthorizedDetail({ resource, id }: { resource: AdminResource; id: string }) {
  const config = resources[resource];
  const { can } = useAdmin();
  const [refresh, setRefresh] = useState(0);
  const [editing, setEditing] = useState(false);
  const [success, setSuccess] = useState('');
  const state = useAdminLoad<AdminDetail>(`/${resource}/${id}`, refresh);
  function saved() { setEditing(false); setSuccess('Your change was saved and recorded.'); setRefresh(value => value + 1); }
  if (state.loading) return <AdminLoading />;
  if (state.error) return <><Link className="admin-back" href={`/admin/${resource}`}><ArrowLeft size={15} aria-hidden="true" /> {config.title}</Link><AdminFailure error={state.error} retry={() => setRefresh(value => value + 1)} /></>;
  const { item, related } = state.data!;
  const protectedStaff = resource === 'staff' && (Array.isArray(item.roles) && item.roles.includes('OWNER') || item.status === 'DISABLED');
  const editable = !protectedStaff && (config.edit || resource === 'inventory') && config.writePermission && can(config.writePermission);
  return <><Link className="admin-back" href={`/admin/${resource}`}><ArrowLeft size={15} aria-hidden="true" /> {config.title}</Link><div className="admin-page-heading"><div><p className="admin-kicker">{config.singular}</p><h1>{recordTitle(item)}</h1><p className="admin-record-id">ID {item.id} · Version {item.version ?? 'unavailable'}</p></div>{editable && !editing && <button className="admin-button" onClick={() => setEditing(true)}><Pencil size={15} aria-hidden="true" />{resource === 'inventory' ? 'Adjust stock' : 'Edit record'}</button>}</div>
    {success && <p className="admin-notice admin-notice-success" role="status">{success}</p>}
    <CapabilityNotice name={config.capability} />{protectedStaff && <p className="admin-notice">Owner identities and permanently disabled accounts cannot be edited here.</p>}
    {editing ? <section className="admin-panel"><ResourceEditor resource={resource} item={item} onSaved={saved} onCancel={() => setEditing(false)} /></section> : <section className="admin-panel"><h2>Record details</h2><RecordFacts item={item} fields={config.fields} /></section>}
    {resource === 'orders' && <OrderActions item={item} onSaved={saved} />}
    <Snapshots item={item} resource={resource} />
    {related && Object.entries(related).map(([section, page]) => <RelatedRecords key={`${section}:${refresh}`} resource={resource} id={id} section={section} initial={page} />)}
  </>;
}

function OrderActions({ item, onSaved }: { item: AdminRecord; onSaved: () => void }) {
  const { can } = useAdmin();
  const { mutate, busy, error } = useAdminMutation();
  const [confirm, setConfirm] = useState(false);
  const eligible = item.status === 'CONFIRMED' && item.paymentStatus === 'PAID' && item.fulfillmentStatus === 'UNFULFILLED';
  return <section className="admin-panel"><h2>Order actions</h2>{can('orders.update') && <><p>{eligible ? 'Payment is confirmed. This order can move into processing.' : 'Processing requires a paid, confirmed and unfulfilled order.'}</p>{confirm ? <div className="admin-notice"><p>Move order <strong>{recordTitle(item)}</strong> to processing? This records an order and fulfilment state change.</p><div className="admin-actions"><button className="admin-button" disabled={busy} onClick={async () => { if (!Number.isSafeInteger(item.version)) return; const result = await mutate(`/orders/${item.id}/process`, 'POST', { expectedVersion: item.version }); if (result) onSaved(); }}>{busy ? 'Recording…' : 'Begin processing'}</button><button className="admin-button admin-button-secondary" disabled={busy} onClick={() => setConfirm(false)}>Keep current state</button></div></div> : <button className="admin-button" disabled={!eligible || !Number.isSafeInteger(item.version)} onClick={() => setConfirm(true)}>Review processing action</button>}{!!error && <AdminFailure error={error} />}</>}{can('orders.cancel') && <CapabilityNotice name="cancellation" />}{!can('orders.update') && !can('orders.cancel') && <p className="admin-help">Your access is read-only for this order.</p>}</section>;
}

function Snapshots({ item, resource }: { item: AdminRecord; resource: AdminResource }) {
  const items = Array.isArray(item.items) ? item.items as Record<string, unknown>[] : [];
  const currency = valueAt(item, 'pricing.currency') || item.currency;
  const address = (key: string, title: string) => {
    const value = valueAt(item, key);
    return value && typeof value === 'object' && !Array.isArray(value) ? <section className="admin-panel" key={key}><h2>{title}</h2><RecordFacts item={{ ...value, id: item.id }} fields={addressFields} /></section> : null;
  };
  const media = Array.isArray(item.media) ? item.media as Record<string, unknown>[] : [];
  const attributes = item.attributes && typeof item.attributes === 'object' && !Array.isArray(item.attributes) ? item.attributes as Record<string, unknown> : null;
  return <>
    {items.length > 0 && <section className="admin-panel"><h2>{resource === 'invoices' ? 'Invoice line snapshots' : 'Purchased item snapshots'}</h2><p className="admin-help">These recorded details stay independent of later catalogue changes.</p><div className="admin-table-scroll" role="region" aria-label="Purchased items" tabIndex={0}><table className="admin-table"><caption className="admin-sr-only">Recorded items</caption><thead><tr><th scope="col">Item</th><th scope="col">Quantity</th><th scope="col">Unit price</th><th scope="col">Line total</th></tr></thead><tbody>{items.map((line, index) => <tr key={index}><td><strong>{textValue(line.productName || line.description)}</strong><small>{textValue(line.sku)}{line.variantName ? ` · ${textValue(line.variantName)}` : ''}</small></td><td>{textValue(line.quantity)}</td><td>{amountValue(line.unitPriceMinor, line.currency || currency)}</td><td>{amountValue(line.lineTotalMinor ?? line.totalMinor, line.currency || currency)}</td></tr>)}</tbody></table></div></section>}
    {['orders', 'invoices'].includes(resource) && <div className="admin-bottom-grid">{address('shippingAddressSnapshot', 'Shipping address snapshot')}{address('billingAddressSnapshot', 'Billing address snapshot')}{address('customerSnapshot.billingAddress', 'Billing address snapshot')}{!!item.customerSnapshot && <section className="admin-panel"><h2>Customer snapshot</h2><RecordFacts item={item} fields={[{ key: 'customerSnapshot.name', label: 'Name' }, { key: 'customerSnapshot.email', label: 'Email' }, { key: 'customerSnapshot.phone', label: 'Phone' }]} /></section>}{!!item.sellerSnapshot && <section className="admin-panel"><h2>Seller snapshot</h2><RecordFacts item={item} fields={[{ key: 'sellerSnapshot.name', label: 'Seller' }, { key: 'sellerSnapshot.address', label: 'Address' }, { key: 'sellerSnapshot.email', label: 'Email' }, { key: 'sellerSnapshot.phone', label: 'Phone' }, { key: 'sellerSnapshot.taxId', label: 'Tax ID' }]} /></section>}</div>}
    {!!item.coupon && <section className="admin-panel"><h2>Coupon snapshot</h2><RecordFacts item={item} fields={[{ key: 'coupon.code', label: 'Code' }, { key: 'coupon.discountMinor', label: 'Applied discount', kind: 'money', currencyKey: 'pricing.currency' }]} /></section>}
    {media.length > 0 && <section className="admin-panel"><h2>Product imagery</h2><div className="admin-media">{media.map((photo, index) => typeof photo.url === 'string' && (/^https?:\/\//.test(photo.url) || photo.url.startsWith('/images/')) && photo.type !== 'VIDEO' ? <figure key={index}><img src={photo.url} alt={typeof photo.alt === 'string' ? photo.alt : ''} loading="lazy" referrerPolicy="no-referrer" /><figcaption>{typeof photo.alt === 'string' && photo.alt ? photo.alt : 'Alternative text not recorded'}</figcaption></figure> : null)}</div></section>}
    {!!item.refundBalance && <section className="admin-panel"><h2>Refund balance snapshot</h2><p className="admin-help">For investigation only. Amounts can change after this snapshot; no refund is initiated here.</p><RecordFacts item={item} fields={[{ key: 'refundBalance.paidMinor', label: 'Captured amount', kind: 'money', currencyKey: 'refundBalance.currency' }, { key: 'refundBalance.completedMinor', label: 'Completed refunds', kind: 'money', currencyKey: 'refundBalance.currency' }, { key: 'refundBalance.reservedMinor', label: 'Reserved for pending refunds', kind: 'money', currencyKey: 'refundBalance.currency' }, { key: 'refundBalance.availableMinor', label: 'Available balance', kind: 'money', currencyKey: 'refundBalance.currency' }]} /></section>}
    {attributes && Object.keys(attributes).length > 0 && <section className="admin-panel"><h2>Variant attributes</h2><dl className="admin-facts">{Object.entries(attributes).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{textValue(value)}</dd></div>)}</dl></section>}
    {!!item.dimensions && <section className="admin-panel"><h2>Dimensions</h2><RecordFacts item={item} fields={['lengthCm', 'widthCm', 'heightCm'].map(key => ({ key: `dimensions.${key}`, label: `${humanize(key.replace('Cm', ''))} (cm)`, kind: 'number' }))} /></section>}
    {!!item.seo && <section className="admin-panel"><h2>Search presentation</h2><RecordFacts item={item} fields={[{ key: 'seo.title', label: 'Title' }, { key: 'seo.description', label: 'Description' }, { key: 'seo.keywords', label: 'Keywords' }, { key: 'seo.canonicalUrl', label: 'Canonical URL' }]} /></section>}
  </>;
}

function RelatedRecords({ resource, id, section, initial }: { resource: AdminResource; id: string; section: string; initial: AdminList }) {
  const { handleError } = useAdmin();
  const [page, setPage] = useState(initial);
  const [after, setAfter] = useState('');
  const [previous, setPrevious] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);
  async function load(cursor: string, direction: 'next' | 'previous') {
    if (busy) return;
    const controller = new AbortController(); request.current = controller;
    setBusy(true); setError(null);
    try {
      const result = await adminApi<AdminList>(`/${resource}/${id}/related/${section}${queryString({ limit: 5, after: cursor })}`, { signal: controller.signal });
      if (controller.signal.aborted) return;
      setPrevious(values => direction === 'next' ? [...values, after] : values.slice(0, -1)); setAfter(cursor); setPage(result);
    } catch (failure) { if (!controller.signal.aborted) { handleError(failure); setError(failure); } }
    finally { if (!controller.signal.aborted) setBusy(false); }
  }
  const config = Object.hasOwn(resources, section) ? resources[section as AdminResource] : null;
  const fields = relationFields[section];
  return <section className="admin-panel" aria-busy={busy}><h2>{humanize(section === 'movements' ? 'Stock movements' : section)}</h2>{config ? <RecordTable items={page.items} config={config} caption={`${humanize(section)} related to this ${resources[resource].singular.toLowerCase()}`} /> : fields ? page.items.length ? <div className="admin-related-cards">{page.items.map(item => <article key={item.id}><RecordFacts item={item} fields={fields} /></article>)}</div> : <AdminEmpty /> : <p className="admin-help">This related record type is not available in this view.</p>}{!!error && <AdminFailure error={error} />}<div className="admin-pagination"><span>{busy ? 'Loading page…' : `${page.items.length} related records`}</span><div><button className="admin-button admin-button-secondary" disabled={busy || !previous.length} onClick={() => void load(previous.at(-1) || '', 'previous')}>Previous</button><button className="admin-button admin-button-secondary" disabled={busy || !page.next} onClick={() => void load(page.next || '', 'next')}>Next</button></div></div></section>;
}
