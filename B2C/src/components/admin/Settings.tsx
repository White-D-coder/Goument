'use client';
import { FormEvent, useState } from 'react';
import type { AdminDetail } from '@/lib/admin/types';
import { humanize } from '@/lib/admin/format';
import { useAdmin } from './AdminProvider';
import { AdminFailure, AdminForbidden, AdminLoading, useAdminLoad, useAdminMutation } from './shared';

export default function Settings() {
  const { can } = useAdmin();
  return can('settings.read') ? <AuthorizedSettings /> : <AdminForbidden />;
}
function AuthorizedSettings() {
  const { session, can, refreshSession } = useAdmin();
  const [refresh, setRefresh] = useState(0);
  const [validation, setValidation] = useState('');
  const state = useAdminLoad<AdminDetail>('/settings', refresh);
  const { mutate, busy, error } = useAdminMutation();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    try {
      const timezone = String(form.get('timezone')).trim();
      new Intl.DateTimeFormat('en', { timeZone: timezone }).format(new Date());
      setValidation('');
      const result = await mutate('/settings', 'PATCH', { timezone, currency: String(form.get('currency')).trim().toUpperCase(), expectedVersion: state.data?.item.version });
      if (result) refreshSession();
    } catch (failure) { setValidation(failure instanceof Error ? failure.message : 'Check the reporting settings.'); }
  }
  return <><div className="admin-page-heading"><div><p className="admin-kicker">Owner controls</p><h1>Settings & readiness</h1><p>Configure reporting deliberately. Integration secrets are never shown here.</p></div></div><section className="admin-panel"><h2>Reporting defaults</h2>{state.loading ? <AdminLoading /> : state.error ? <AdminFailure error={state.error} retry={() => setRefresh(value => value + 1)} /> : <form className="admin-editor" onSubmit={submit}><fieldset disabled={!can('settings.update') || busy}><legend className="admin-sr-only">Reporting settings</legend><div className="admin-form-grid"><label>Currency code<input name="currency" defaultValue={typeof state.data?.item.currency === 'string' ? state.data.item.currency : ''} required pattern="[A-Za-z]{3}" maxLength={3} placeholder="e.g. INR" /></label><label>Reporting timezone<input name="timezone" defaultValue={typeof state.data?.item.timezone === 'string' ? state.data.item.timezone : ''} required maxLength={80} placeholder="e.g. Asia/Kolkata" /></label></div><p className="admin-field-help">These are report defaults, not exchange-rate, tax, invoice or revenue-recognition rules.</p><button className="admin-button" disabled={!can('settings.update') || busy}>{busy ? 'Saving…' : 'Save reporting defaults'}</button></fieldset>{validation && <p role="alert" className="admin-notice admin-notice-error">{validation}</p>}{!!error && <AdminFailure error={error} />}</form>}</section><section className="admin-panel"><h2>Integrations & workflows</h2><ul className="admin-capabilities">{Object.entries(session.capabilities).map(([name, capability]) => <li key={name}><strong>{humanize(name)} <span>{capability.available ? 'Available' : 'Not enabled'}</span></strong>{capability.reason && <p>{capability.reason}</p>}</li>)}</ul></section></>;
}
