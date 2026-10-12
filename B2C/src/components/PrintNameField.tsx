'use client';
import { useId } from 'react';
import './envelope-personalisation.css';

export default function PrintNameField({ value, onChange, disabled = false, error = '' }: { value: string; onChange: (name: string) => void; disabled?: boolean; error?: string }) {
  const id = useId();
  return <div className="envelope-print-field">
    <label htmlFor={id}>Name to print</label>
    <input id={id} type="text" value={value} required maxLength={80} disabled={disabled} autoComplete="off" placeholder="e.g. Riya & Aarav" aria-invalid={Boolean(error)} aria-describedby={`${id}-help${error ? ` ${id}-error` : ''}`} onChange={event => onChange(event.target.value)} />
    <p id={`${id}-help`}>We’ll print this name on your envelopes.</p>
    {error && <p id={`${id}-error`} className="envelope-print-error" role="alert">{error}</p>}
  </div>;
}
