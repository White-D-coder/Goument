'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ApiError } from '@/lib/api';
import { adminApi } from '@/lib/admin/api';
import { amountValue, dateValue, humanize, textValue, valueAt } from '@/lib/admin/format';
import { resources } from '@/lib/admin/resources';
import type { AdminRecord, DisplayField, ResourceDefinition } from '@/lib/admin/types';
import { useAdmin } from './AdminProvider';

export function useAdminLoad<T>(path: string, refresh = 0) {
  const [state, setState] = useState<{ key: string; data?: T; error?: unknown; loading: boolean }>({ key: '', loading: true });
  const { handleError } = useAdmin();
  const requestKey = `${path}:${refresh}`;
  useEffect(() => {
    const controller = new AbortController();
    adminApi<T>(path, { signal: controller.signal }).then(data => { if (!controller.signal.aborted) setState({ key: requestKey, data, loading: false }); }).catch(error => { if (!controller.signal.aborted) { handleError(error); setState({ key: requestKey, error, loading: false }); } });
    return () => controller.abort();
  }, [path, requestKey, handleError]);
  return state.key === requestKey ? state : { loading: true, data: undefined, error: undefined };
}

export function useAdminMutation() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const { handleError } = useAdmin();
  const locked = useRef(false);
  const pending = useRef<{ fingerprint: string; key: string } | null>(null);
  const mounted = useRef(true);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  async function mutate<T>(path: string, method: string, body: unknown): Promise<T | undefined> {
    if (locked.current) return;
    locked.current = true; setBusy(true); setError(null);
    const fingerprint = JSON.stringify([path, method, body]);
    if (!pending.current || pending.current.fingerprint !== fingerprint) pending.current = { fingerprint, key: crypto.randomUUID() };
    try {
      const result = await adminApi<T>(path, { method, body, key: pending.current.key });
      pending.current = null;
      return mounted.current ? result : undefined;
    } catch (failure) {
      if (mounted.current) { handleError(failure); setError(failure); }
      return undefined;
    } finally { locked.current = false; if (mounted.current) setBusy(false); }
  }
  return { mutate, busy, error };
}

export function AdminFailure({ error, retry }: { error: unknown; retry?: () => void }) {
  const status = error instanceof ApiError ? error.status : undefined;
  return <div className="admin-notice admin-notice-error" role="alert"><strong>{status === 403 ? 'Permission required' : status === 404 ? 'Record not found' : status === 409 ? 'This record changed' : status === 429 ? 'Please wait before retrying' : 'Request not completed'}</strong><p>{error instanceof Error ? error.message : 'The service is unavailable. Please try again.'}</p>{status === 409 && <p>Refresh the record before making another change. The original history has been preserved.</p>}{retry && <button className="admin-button admin-button-secondary" onClick={retry}>Retry</button>}</div>;
}
export function AdminLoading() { return <p className="admin-loading" role="status">Loading operations data…</p>; }
export function AdminForbidden() { return <div className="admin-notice" role="alert"><h2>Permission required</h2><p>Your account does not have access to this section.</p><Link className="admin-link" href="/admin">Return to overview</Link></div>; }
export function AdminEmpty({ title = 'No records found', message = 'Try a different filter, or return when there is activity to review.' }: { title?: string; message?: string }) { return <div className="admin-empty"><strong>{title}</strong><p>{message}</p></div>; }
export function CapabilityNotice({ name }: { name?: string }) {
  const { session } = useAdmin();
  const capability = name ? session.capabilities[name] : undefined;
  if (!name || capability?.available) return null;
  return <div className="admin-notice"><strong>{humanize(name)} actions unavailable</strong><p>{capability?.reason || 'This workflow is not enabled. Existing records remain available for review.'}</p><button className="admin-button admin-button-secondary" disabled>Action unavailable</button></div>;
}
export function FieldValue({ item, field }: { item: AdminRecord; field: DisplayField }) {
  const { session, can } = useAdmin();
  const value = valueAt(item, field.key);
  if (field.kind === 'money') return <>{amountValue(value, valueAt(item, field.currencyKey || 'currency'))}</>;
  if (field.kind === 'date') return <>{dateValue(value, session.reporting?.timezone)}</>;
  if (field.kind === 'status' && typeof value === 'string') return <span className={`admin-status ${['FAILED', 'BLOCKED', 'OUT_OF_STOCK', 'CANCELLED'].includes(value) ? 'admin-status-attention' : ['ACTIVE', 'PAID', 'CAPTURED', 'DELIVERED', 'COMPLETED', 'SENT'].includes(value) ? 'admin-status-good' : ''}`}>{humanize(value)}</span>;
  if (field.link && typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value) && can(resources[field.link].permission)) return <Link className="admin-link" href={`/admin/${field.link}/${value}`}>{value}</Link>;
  return <>{textValue(value)}</>;
}
export function RecordFacts({ item, fields }: { item: AdminRecord; fields: DisplayField[] }) {
  return <dl className="admin-facts">{fields.filter(field => valueAt(item, field.key) !== undefined).map(field => <div key={field.key}><dt>{field.label}</dt><dd><FieldValue item={item} field={field} /></dd></div>)}</dl>;
}
export function RecordTable({ items, config, caption }: { items: AdminRecord[]; config: ResourceDefinition; caption?: string }) {
  if (!items.length) return <AdminEmpty />;
  const fields = config.columns.map(key => config.fields.find(field => field.key === key)!).filter(Boolean);
  return <div className="admin-table-scroll" role="region" aria-label={caption || config.title} tabIndex={0}><table className="admin-table"><caption className="admin-sr-only">{caption || config.title}</caption><thead><tr>{fields.map(field => <th key={field.key} scope="col">{field.label}</th>)}<th scope="col"><span className="admin-sr-only">Details</span></th></tr></thead><tbody>{items.map(item => <tr key={item.id}>{fields.map(field => <td key={field.key}><FieldValue item={item} field={field} /></td>)}<td><Link className="admin-table-open" href={`/admin/${config.key}/${item.id}`} aria-label={`View ${config.singular.toLowerCase()} ${textValue(item[config.columns[0]])}`}>View <span aria-hidden="true">↗</span></Link></td></tr>)}</tbody></table></div>;
}
