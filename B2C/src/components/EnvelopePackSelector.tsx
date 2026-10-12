'use client';
import type { EnvelopePack } from '@/lib/envelope-packs';
import './envelope-packs.css';
export default function EnvelopePackSelector({ value, onChange, disabled = false }: { value: EnvelopePack; onChange: (size: EnvelopePack) => void; disabled?: boolean }) {
  return <div className="envelope-packs" role="group" aria-label="Envelope pack size">{([20, 10] as const).map(size => <button type="button" key={size} aria-pressed={value === size} disabled={disabled} onClick={() => onChange(size)}>{size} pcs</button>)}</div>;
}
