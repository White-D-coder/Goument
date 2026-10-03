'use client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { createPermission, resources } from '@/lib/admin/resources';
import { humanize } from '@/lib/admin/format';
import { queryString } from '@/lib/admin/api';
import type { AdminList, AdminResource } from '@/lib/admin/types';
import { useAdmin } from './AdminProvider';
import { AdminFailure, AdminForbidden, AdminLoading, CapabilityNotice, RecordTable, useAdminLoad } from './shared';

const withCurrency = ['orders', 'payments', 'refunds', 'invoices', 'variants', 'shipping', 'coupons'];
export default function ResourceList({ resource }: { resource: AdminResource }) {
  const config = resources[resource];
  const { can } = useAdmin();
  return can(config.permission) ? <AuthorizedList resource={resource} /> : <AdminForbidden />;
}
function AuthorizedList({ resource }: { resource: AdminResource }) {
  const config = resources[resource];
  const { can } = useAdmin();
  const router = useRouter();
  const params = useSearchParams();
  const [refresh, setRefresh] = useState(0);
  const [previous, setPrevious] = useState<string[]>([]);
  const [validation, setValidation] = useState('');
  const query = params.toString();
  const state = useAdminLoad<AdminList>(`/${resource}${query ? `?${query}` : '?limit=20'}`, refresh);
  function filter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values: Record<string, string> = {};
    try {
      for (const [name, value] of form.entries()) {
        const text = String(value).trim();
        if (!text) continue;
        values[name] = ['from', 'to'].includes(name) ? new Date(text + 'Z').toISOString() : name === 'currency' ? text.toUpperCase() : text;
      }
      if ((values.minAmount || values.maxAmount) && !values.currency) throw new Error('Choose a currency before filtering by amount.');
      setValidation(''); setPrevious([]);
      router.replace(`/admin/${resource}${queryString(values)}`);
    } catch (failure) { setValidation(failure instanceof Error ? failure.message : 'Check your filters.'); }
  }
  function changeCursor(after: string | null) {
    const next = new URLSearchParams(query);
    if (after) next.set('after', after); else next.delete('after');
    router.replace(`/admin/${resource}${next.size ? '?' + next : ''}`);
  }
  const dateDefault = (key: string) => params.get(key)?.slice(0, 16) || '';
  return <><div className="admin-page-heading"><div><p className="admin-kicker">Operations</p><h1>{config.title}</h1><p>{config.description}</p></div>{config.create && can(createPermission(resource)) && <Link className="admin-button" href={`/admin/${resource}/new`}><Plus size={16} aria-hidden="true" /> New {config.singular.toLowerCase()}</Link>}</div>
    {['products', 'variants', 'categories'].includes(resource) && <nav className="admin-subnav" aria-label="Catalogue sections">{(['products', 'variants', 'categories'] as const).map(key => <Link href={`/admin/${key}`} key={key} aria-current={key === resource ? 'page' : undefined}>{resources[key].title}</Link>)}</nav>}
    <CapabilityNotice name={config.capability} />
    <form className="admin-filters" onSubmit={filter} key={`${resource}:${query}`}><div className="admin-filter-primary"><label>Find {config.title.toLowerCase()}<input name="search" placeholder={config.search} defaultValue={params.get('search') || ''} maxLength={80} /></label>{config.statuses && <label>Status<select name="status" defaultValue={params.get('status') || ''}><option value="">All statuses</option>{config.statuses.map(status => <option value={status} key={status}>{humanize(status)}</option>)}</select></label>}<button className="admin-button admin-button-secondary" type="submit">Apply filters</button><button className="admin-text-button" type="button" onClick={() => { setPrevious([]); router.replace(`/admin/${resource}`); }}>Reset</button></div>{resource !== 'staff' && <details><summary><SlidersHorizontal size={14} aria-hidden="true" /> More filters</summary><div className="admin-filter-more"><label>Created from (UTC)<input type="datetime-local" name="from" defaultValue={dateDefault('from')} /></label><label>Created before (UTC)<input type="datetime-local" name="to" defaultValue={dateDefault('to')} /></label><label>Sort<select name="sort" defaultValue={params.get('sort') || 'newest'}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label><label>Page size<select name="limit" defaultValue={params.get('limit') || '20'}>{[10, 20, 50].map(limit => <option key={limit}>{limit}</option>)}</select></label>{withCurrency.includes(resource) && <label>Currency<input name="currency" defaultValue={params.get('currency') || ''} maxLength={3} pattern="[A-Za-z]{3}" placeholder="e.g. INR" /></label>}{resource === 'orders' && <><label>Payment status<select name="paymentStatus" defaultValue={params.get('paymentStatus') || ''}><option value="">All</option>{['PENDING', 'FAILED', 'PAID', 'PARTIALLY_REFUNDED', 'REFUNDED'].map(value => <option value={value} key={value}>{humanize(value)}</option>)}</select></label><label>Fulfilment status<select name="fulfillmentStatus" defaultValue={params.get('fulfillmentStatus') || ''}><option value="">All</option>{['UNFULFILLED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(value => <option value={value} key={value}>{humanize(value)}</option>)}</select></label><label>Customer ID<input name="customerId" pattern="[a-fA-F0-9]{24}" defaultValue={params.get('customerId') || ''} /></label><label>Minimum total (minor units)<input name="minAmount" type="number" min={0} step={1} defaultValue={params.get('minAmount') || ''} /></label><label>Maximum total (minor units)<input name="maxAmount" type="number" min={0} step={1} defaultValue={params.get('maxAmount') || ''} /></label></>}{resource === 'variants' && <label>Product ID<input name="productId" pattern="[a-fA-F0-9]{24}" defaultValue={params.get('productId') || ''} /></label>}</div></details>}{resource === 'staff' && <input type="hidden" name="limit" value="20" />}</form>
    {validation && <p className="admin-notice admin-notice-error" role="alert">{validation}</p>}
    <section className="admin-panel" aria-label={`${config.title} results`} aria-busy={state.loading}>{state.loading ? <AdminLoading /> : state.error ? <AdminFailure error={state.error} retry={() => setRefresh(value => value + 1)} /> : state.data && <><RecordTable items={state.data.items} config={config} /><div className="admin-pagination"><span>{state.data.items.length} record{state.data.items.length === 1 ? '' : 's'} on this page</span><div>{params.get('after') && !previous.length && <button className="admin-button admin-button-secondary" onClick={() => changeCursor(null)}>First page</button>}<button className="admin-button admin-button-secondary" disabled={!previous.length} onClick={() => { const cursor = previous.at(-1) || ''; setPrevious(values => values.slice(0, -1)); changeCursor(cursor); }}>Previous</button><button className="admin-button admin-button-secondary" disabled={!state.data.next} onClick={() => { setPrevious(values => [...values, params.get('after') || '']); changeCursor(state.data!.next); }}>Next</button></div></div></>}</section>
  </>;
}
