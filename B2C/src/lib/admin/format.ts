import type { AdminRecord } from './types';

export function valueAt(item: AdminRecord | Record<string, unknown>, key: string): unknown {
  return key.split('.').reduce<unknown>((value, part) => value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>)[part] : undefined, item);
}
export function textValue(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (Array.isArray(value) && value.every(entry => typeof entry === 'string')) return value.join(', ');
  return 'Not recorded';
}
export function humanize(value: string) { return value.replace(/[_-]/g, ' ').replace(/\b\w/g, character => character.toUpperCase()); }
export function dateValue(value: unknown, timezone?: string) {
  if (typeof value !== 'string' || Number.isNaN(Date.parse(value))) return 'Not recorded';
  if (!timezone) return `${new Date(value).toISOString().replace('T', ' ').slice(0, 19)} UTC`;
  try { return new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: timezone }).format(new Date(value)); }
  catch { return 'Invalid reporting timezone'; }
}
export function amountValue(value: unknown, currency: unknown) {
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) return 'Not recorded';
  if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency)) return `${value.toLocaleString('en-IN')} minor units · currency not recorded`;
  // The database stores integer minor units. Respect each currency's exponent.
  try {
    const formatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency });
    const digits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
    return formatter.format(value / 10 ** digits);
  } catch { return `${value.toLocaleString('en-IN')} ${currency} minor units`; }
}
export function recordTitle(item: AdminRecord) {
  for (const key of ['orderNumber', 'invoiceNumber', 'name', 'sku', 'code', 'email', 'trackingNumber', 'action', 'type']) {
    const value = item[key]; if (typeof value === 'string' && value) return value;
  }
  if (typeof item.firstName === 'string') return [item.firstName, item.lastName].filter(Boolean).join(' ');
  return item.id;
}
