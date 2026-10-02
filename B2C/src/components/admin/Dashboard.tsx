'use client';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowUpRight, CircleAlert } from 'lucide-react';
import { queryString } from '@/lib/admin/api';
import { amountValue, humanize } from '@/lib/admin/format';
import type { AdminReport } from '@/lib/admin/types';
import { useAdmin } from './AdminProvider';
import { AdminEmpty, AdminFailure, AdminForbidden, AdminLoading, useAdminLoad } from './shared';

export default function Dashboard({ analytics = false }: { analytics?: boolean }) {
  const { can } = useAdmin();
  return can(analytics ? 'analytics.read' : 'dashboard.read') ? <AuthorizedDashboard analytics={analytics} /> : <AdminForbidden />;
}
function initialWindow(currency?: string, timezone?: string) {
  const to = new Date(); to.setUTCSeconds(0, 0);
  const from = new Date(to); from.setUTCDate(from.getUTCDate() - 7);
  return { from: from.toISOString(), to: to.toISOString(), currency: currency || '', timezone: timezone || '' };
}
function AuthorizedDashboard({ analytics }: { analytics: boolean }) {
  const { session, can } = useAdmin();
  const [initial] = useState(() => initialWindow(session.reporting?.currency, session.reporting?.timezone));
  const [query, setQuery] = useState(session.reporting ? queryString(initial) : '');
  const [validation, setValidation] = useState('');
  const [refresh, setRefresh] = useState(0);
  function report(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    try {
      const from = new Date(String(form.get('from')) + 'Z'), to = new Date(String(form.get('to')) + 'Z');
      if (!Number.isFinite(from.getTime()) || !Number.isFinite(to.getTime()) || from >= to || to.getTime() - from.getTime() > 93 * 86400000) throw new Error('Choose a valid interval of up to 93 days.');
      const timezone = String(form.get('timezone')).trim(); new Intl.DateTimeFormat('en', { timeZone: timezone }).format(from);
      setQuery(queryString({ from: from.toISOString(), to: to.toISOString(), currency: String(form.get('currency')).toUpperCase(), timezone })); setValidation(''); setRefresh(value => value + 1);
    } catch (failure) { setValidation(failure instanceof Error ? failure.message : 'Check the reporting window.'); }
  }
  return <><div className="admin-page-heading"><div><p className="admin-kicker">The Gourmet operations</p><h1>{analytics ? 'Business activity' : 'Your business, at a glance.'}</h1><p>{analytics ? 'Traceable reporting from recorded orders, payments and refunds.' : 'See what needs attention, then move directly to the record.'}</p></div><span className="admin-role-chip">{humanize(session.user.role)}</span></div>
    {!session.reporting && <div className="admin-notice"><strong>Choose a reporting context</strong><p>No default currency or timezone has been approved. Choose them for this report{can('settings.read') ? ', or configure them in Settings.' : '.'}</p>{can('settings.read') && <Link className="admin-link" href="/admin/settings">Open settings →</Link>}</div>}
    <form className="admin-report-filters" onSubmit={report}><label>From (UTC)<input name="from" type="datetime-local" required defaultValue={initial.from.slice(0, 16)} /></label><label>Before (UTC)<input name="to" type="datetime-local" required defaultValue={initial.to.slice(0, 16)} /></label><label>Currency<input name="currency" defaultValue={initial.currency} required pattern="[A-Za-z]{3}" maxLength={3} placeholder="e.g. INR" /></label><label>Display timezone<input name="timezone" defaultValue={initial.timezone} required maxLength={80} placeholder="e.g. Asia/Kolkata" /></label><button className="admin-button">Update report</button></form>{validation && <p className="admin-notice admin-notice-error" role="alert">{validation}</p>}
    {query ? <ReportResults path={`/${analytics ? 'analytics' : 'dashboard'}${query}`} refresh={refresh} retry={() => setRefresh(value => value + 1)} /> : <AdminEmpty title="Ready when you are" message="Set a currency, timezone and date interval to load real operational data." />}
  </>;
}
function ReportResults({ path, refresh, retry }: { path: string; refresh: number; retry: () => void }) {
  const { can, session } = useAdmin();
  const state = useAdminLoad<AdminReport>(path, refresh);
  if (state.loading) return <AdminLoading />;
  if (state.error) return <AdminFailure error={state.error} retry={retry} />;
  const report = state.data!;
  return <><div className="admin-report-context"><span>{report.window.currency} · {report.window.timezone}</span><span>{report.window.from.replace('T', ' ').slice(0, 16)} to {report.window.to.replace('T', ' ').slice(0, 16)} UTC (end exclusive)</span></div><div className="admin-overview-grid"><section className="admin-panel admin-attention"><div className="admin-panel-heading"><CircleAlert size={19} aria-hidden="true" /><h2>Needs attention</h2></div><p className="admin-help">{report.definitions?.attention || 'Current unresolved exceptions from authoritative records.'}</p>{report.attention.length ? <ul className="admin-attention-list">{report.attention.map(alert => <li key={alert.id}>{/^\/admin\/[a-z-]+\/[a-f0-9]{24}$/i.test(alert.href) ? <Link href={alert.href}><span><strong>{alert.label}</strong><small>{humanize(alert.status)}</small></span><ArrowUpRight size={17} aria-hidden="true" /></Link> : <span>{alert.label}</span>}</li>)}</ul> : <AdminEmpty title="No listed exceptions" message="No matching unresolved records were returned for your permissions." />}</section><section className="admin-metrics" aria-label="Business metrics">{report.metrics.map(metric => <article className="admin-metric" key={metric.key}><p>{metric.label}</p><strong>{metric.value === null ? 'Unavailable' : metric.unit === 'minor' ? amountValue(metric.value, report.window.currency) : metric.value.toLocaleString('en-IN')}</strong><span>{metric.range || 'Selected window'}</span><details><summary>How this is measured</summary><p>{metric.formula}</p><p>Source: {metric.source}</p>{metric.reason && <p>{metric.reason}</p>}</details></article>)}</section></div>
    <div className="admin-bottom-grid"><section className="admin-panel"><h2>Products by units ordered</h2><p className="admin-help">{report.definitions?.topProducts || 'Recorded product quantities in the selected window.'}</p>{report.topProducts.length ? <ol className="admin-ranked-list">{report.topProducts.map((product, index) => <li key={product.productId || index}><span>{product.productId && can('products.read') ? <Link className="admin-link" href={`/admin/products/${product.productId}`}>{product.productName || product.productId}</Link> : product.productName || 'Product not recorded'}</span><strong>{product.quantity.toLocaleString('en-IN')} units</strong></li>)}</ol> : <AdminEmpty title="No product results" message="No matching product results were returned for this window and your permissions." />}</section><section className="admin-panel"><h2>Operational readiness</h2><p className="admin-help">{report.definitions?.revenue || 'Revenue recognition is not configured. Captured payments are not recognized revenue.'}</p><ul className="admin-capabilities">{Object.entries(session.capabilities).map(([name, capability]) => <li key={name}><strong>{humanize(name)} <span>{capability.available ? 'Available' : 'Not enabled'}</span></strong>{!capability.available && <p>{capability.reason}</p>}</li>)}</ul></section></div>
  </>;
}
