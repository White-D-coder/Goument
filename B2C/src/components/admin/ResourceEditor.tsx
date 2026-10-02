'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { queryString } from '@/lib/admin/api';
import { grantablePermissions, resources } from '@/lib/admin/resources';
import { humanize, textValue } from '@/lib/admin/format';
import type { AdminList, AdminRecord, AdminResource } from '@/lib/admin/types';
import { useAdmin } from './AdminProvider';
import { AdminFailure, useAdminLoad, useAdminMutation } from './shared';

type InputProps = { name: string; label: string; initial?: unknown; type?: string; required?: boolean; min?: number; max?: number; maxLength?: number; help?: string; options?: string[]; multiline?: boolean; pattern?: string };
function Input({ name, label, initial, type = 'text', required, min, max, maxLength = 200, help, options, multiline, pattern }: InputProps) {
  const initialValue = typeof initial === 'string' || typeof initial === 'number' ? String(initial) : '';
  const descriptionId = help ? `admin-help-${name}` : undefined;
  return <label className={multiline ? 'admin-form-wide' : ''}>{label}{options ? <select name={name} defaultValue={initialValue} required={required} aria-describedby={descriptionId}><option value="">Select…</option>{options.map(option => <option key={option} value={option}>{humanize(option)}</option>)}</select> : multiline ? <textarea name={name} defaultValue={initialValue} required={required} rows={4} maxLength={maxLength} aria-describedby={descriptionId} /> : <input name={name} type={type} defaultValue={initialValue} required={required} min={min} max={max} step={type === 'number' ? 1 : undefined} maxLength={maxLength} pattern={pattern} aria-describedby={descriptionId} />}{help && <span id={descriptionId} className="admin-field-help">{help}</span>}</label>;
}

function RecordPicker({ resource, name, label, multiple, initial }: { resource: 'categories' | 'products'; name: string; label: string; multiple?: boolean; initial?: unknown }) {
  const initialValues = Array.isArray(initial) ? initial.filter((value): value is string => typeof value === 'string') : typeof initial === 'string' && initial ? [initial] : [];
  const [selected, setSelected] = useState(initialValues);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const state = useAdminLoad<AdminList>(`/${resource}${queryString({ limit: 50, search: query })}`);
  const items = state.data?.items || [];
  return <div className="admin-record-picker"><label>{label}<select name={name} multiple={multiple} size={multiple ? 4 : undefined} required value={multiple ? selected : selected[0] || ''} onChange={event => setSelected([...event.target.selectedOptions].map(option => option.value))}>{!multiple && <option value="">Choose a {resources[resource].singular.toLowerCase()}…</option>}{selected.filter(id => !items.some(item => item.id === id)).map(id => <option value={id} key={id}>{id} (current selection)</option>)}{items.map(item => <option key={item.id} value={item.id}>{textValue(item.name)} · {textValue(item.status)}</option>)}</select></label><div className="admin-picker-search"><input aria-label={`Find ${label.toLowerCase()}`} placeholder="Search by name prefix" maxLength={80} value={search} onChange={event => setSearch(event.target.value)} /><button type="button" className="admin-button admin-button-secondary" onClick={() => setQuery(search.trim())}>Find</button></div>{multiple && <p className="admin-field-help">Choose one or more categories. Hold Ctrl or Command to select multiple options.</p>}{state.loading && <p role="status" className="admin-field-help">Loading choices…</p>}{!!state.error && <AdminFailure error={state.error} />}{state.data?.next && <p className="admin-field-help">First 50 matches shown. Narrow the search to find another record.</p>}</div>;
}

const string = (form: FormData, key: string) => String(form.get(key) || '').trim();
function integer(form: FormData, key: string, required = false) {
  const value = string(form, key);
  if (!value && !required) return undefined;
  const parsed = Number(value);
  if (!value || !Number.isSafeInteger(parsed)) throw new Error(`${humanize(key)} must be a whole number.`);
  return parsed;
}
function optionalText(form: FormData, key: string) { const value = string(form, key); return value || undefined; }
function isoDate(form: FormData, key: string) {
  const value = string(form, key);
  if (!value) return undefined;
  // These fields are explicitly labelled UTC; never silently use browser timezone.
  const date = new Date(`${value}Z`);
  if (!Number.isFinite(date.getTime())) throw new Error('Enter a valid UTC date and time.');
  return date.toISOString();
}
function dateInput(value: unknown) { return typeof value === 'string' && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString().slice(0, 16) : ''; }

export default function ResourceEditor({ resource, item, onSaved, onCancel }: { resource: AdminResource; item?: AdminRecord; onSaved?: () => void; onCancel?: () => void }) {
  const router = useRouter();
  const { session } = useAdmin();
  const { mutate, busy, error } = useAdminMutation();
  const [validation, setValidation] = useState('');
  const [discountType, setDiscountType] = useState(typeof item?.discountType === 'string' ? item.discountType : 'PERCENTAGE');
  const initial = item || { id: '' };
  const media = Array.isArray(initial.media) ? initial.media as { url?: string; alt?: string }[] : [];
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    setValidation('');
    try {
      let body: Record<string, unknown> = {};
      let path = `/${resource}${item ? `/${item.id}` : ''}`;
      let method = item ? 'PATCH' : 'POST';
      if (resource === 'products') {
        const categories = form.getAll('categoryIds').map(String).filter(Boolean);
        if (!categories.length) throw new Error('Choose at least one category.');
        body = { name: string(form, 'name'), slug: string(form, 'slug'), categoryIds: categories, shortDescription: optionalText(form, 'shortDescription'), description: optionalText(form, 'description'), brand: optionalText(form, 'brand'), status: string(form, 'status'), tags: string(form, 'tags').split(',').map(tag => tag.trim()).filter(Boolean) };
        const image = string(form, 'imageUrl');
        if (image && (!item || image !== media[0]?.url || string(form, 'imageAlt') !== (media[0]?.alt || ''))) body.media = [{ ...(media[0] || {}), url: image, alt: optionalText(form, 'imageAlt'), type: 'IMAGE', sortOrder: 0 }, ...media.slice(1)];
      } else if (resource === 'categories') body = { name: string(form, 'name'), slug: string(form, 'slug'), description: optionalText(form, 'description'), parentId: optionalText(form, 'parentId'), imageUrl: optionalText(form, 'imageUrl'), status: string(form, 'status'), sortOrder: integer(form, 'sortOrder') };
      else if (resource === 'variants') body = { ...(!item ? { productId: string(form, 'productId'), sku: string(form, 'sku') } : {}), name: optionalText(form, 'name'), priceMinor: integer(form, 'priceMinor', true), compareAtPriceMinor: integer(form, 'compareAtPriceMinor'), currency: string(form, 'currency').toUpperCase(), weightGrams: integer(form, 'weightGrams'), status: string(form, 'status') };
      else if (resource === 'coupons') body = { code: string(form, 'code'), discountType, ...(discountType === 'PERCENTAGE' ? { percentageBps: integer(form, 'percentageBps', true) } : { fixedAmountMinor: integer(form, 'fixedAmountMinor', true), currency: string(form, 'currency').toUpperCase() }), minimumOrderMinor: integer(form, 'minimumOrderMinor'), maximumDiscountMinor: integer(form, 'maximumDiscountMinor'), usageLimit: integer(form, 'usageLimit'), perCustomerLimit: integer(form, 'perCustomerLimit'), startsAt: isoDate(form, 'startsAt'), expiresAt: isoDate(form, 'expiresAt'), status: string(form, 'status') };
      else if (resource === 'inventory') { path += '/adjust'; method = 'POST'; const quantity = integer(form, 'quantity', true); if (!quantity) throw new Error('Enter a nonzero adjustment.'); body = { quantity, reason: string(form, 'reason') }; }
      else if (resource === 'staff') {
        const makeAdmin = form.get('makeAdmin') === 'on';
        if (!makeAdmin && !Array.isArray(initial.roles)) throw new Error('The existing role information is missing. Refresh the record.');
        if (!makeAdmin && !(initial.roles as string[]).includes('ADMIN')) throw new Error('Select the ADMIN role to grant staff access to this account.');
        body = { permissions: makeAdmin ? form.getAll('permissions').map(String) : [], active: form.get('active') === 'on', makeAdmin, reason: string(form, 'reason') };
      }
      else throw new Error('Editing is not available for this record.');
      if (item) {
        if (!Number.isSafeInteger(item.version)) throw new Error('The record version is missing. Refresh before editing.');
        body.expectedVersion = item.version;
      }
      const result = await mutate<{ id: string }>(path, method, body);
      if (result) { if (onSaved) onSaved(); else router.push(`/admin/${resource}/${result.id}`); }
    } catch (failure) { setValidation(failure instanceof Error ? failure.message : 'Please check the form.'); }
  }
  const moneyHelp = 'Integer minor units. For INR, 100 minor units = ₹1. No tax or shipping is added here.';
  return <form className="admin-editor" onSubmit={submit}><fieldset disabled={busy}><legend>{resource === 'inventory' ? 'Adjust stock' : item ? `Edit ${resources[resource].singular.toLowerCase()}` : `Create ${resources[resource].singular.toLowerCase()}`}</legend><div className="admin-form-grid">
    {['products', 'categories'].includes(resource) && <><Input name="name" label="Name" initial={initial.name} required /><Input name="slug" label="URL slug" initial={initial.slug} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" help="Lowercase words separated by hyphens." /><Input name="status" label="Status" initial={initial.status || (resource === 'products' ? 'DRAFT' : 'ACTIVE')} options={resources[resource].statuses} required /><Input name="description" label="Description" multiline maxLength={resource === 'products' ? 10000 : 4000} initial={initial.description} /><Input name="imageUrl" label="Primary image URL" type={resource === 'categories' ? 'url' : 'text'} initial={resource === 'products' ? media[0]?.url : initial.imageUrl} maxLength={2000} help={resource === 'categories' ? 'Use an approved HTTPS image URL. File uploads are not enabled here.' : 'Use an approved HTTPS URL or /images/ path. Leave unchanged to preserve existing imagery.'} /></>}
    {resource === 'products' && <><Input name="imageAlt" label="Image alternative text" initial={media[0]?.alt} maxLength={250} /><Input name="shortDescription" label="Short description" initial={initial.shortDescription} maxLength={500} /><Input name="brand" label="Brand" initial={initial.brand} /><Input name="tags" label="Tags" initial={Array.isArray(initial.tags) ? initial.tags.join(', ') : ''} help="Separate tags with commas. Up to 30 tags." /><RecordPicker resource="categories" name="categoryIds" label="Categories" multiple initial={initial.categoryIds} /></>}
    {resource === 'categories' && <><Input name="parentId" label="Parent category ID (optional)" initial={initial.parentId} pattern="[a-fA-F0-9]{24}" help="Copy an existing category ID. Leave empty for a top-level category." /><Input name="sortOrder" label="Sort order" type="number" min={0} initial={initial.sortOrder ?? 0} /></>}
    {resource === 'variants' && <>{!item && <><RecordPicker resource="products" name="productId" label="Product" /><Input name="sku" label="SKU" required help="Unique SKU. Product and SKU cannot be changed after creation." /></>}<Input name="name" label="Variant name" initial={initial.name} /><Input name="currency" label="Currency code" initial={initial.currency || session.reporting?.currency} required pattern="[A-Za-z]{3}" maxLength={3} /><Input name="priceMinor" label="Price (minor units)" type="number" min={0} initial={initial.priceMinor} required help={moneyHelp} /><Input name="compareAtPriceMinor" label="Compare-at price (minor units, optional)" type="number" min={0} initial={initial.compareAtPriceMinor} /><Input name="weightGrams" label="Weight (grams, optional)" type="number" min={0} initial={initial.weightGrams} /><Input name="status" label="Status" options={resources.variants.statuses} initial={initial.status || 'ACTIVE'} required />{!item && <p className="admin-form-wide admin-field-help">New variants start with zero stock. Add opening stock through an audited inventory adjustment.</p>}</>}
    {resource === 'inventory' && <><Input name="quantity" label="Quantity to add or remove" type="number" required help="Positive adds stock; negative removes available stock. Reserved quantities are protected by the server." /><Input name="reason" label="Reason" required maxLength={500} multiline /></>}
    {resource === 'coupons' && <><Input name="code" label="Coupon code" initial={initial.code} required /><label>Discount type<select name="discountType" value={discountType} disabled={!!item} onChange={event => setDiscountType(event.target.value)}><option value="PERCENTAGE">Percentage</option><option value="FIXED_AMOUNT">Fixed amount</option></select></label>{discountType === 'PERCENTAGE' ? <Input name="percentageBps" label="Discount (basis points)" type="number" min={1} max={10000} initial={initial.percentageBps} required help="100 basis points = 1%; 1,000 = 10%. Maximum 10,000 (100%)." /> : <><Input name="fixedAmountMinor" label="Discount (minor units)" type="number" min={1} initial={initial.fixedAmountMinor} required help={moneyHelp} /><Input name="currency" label="Currency code" initial={initial.currency || session.reporting?.currency} required pattern="[A-Za-z]{3}" maxLength={3} /></>}<Input name="minimumOrderMinor" label="Minimum order (minor units, optional)" type="number" min={0} initial={initial.minimumOrderMinor} /><Input name="maximumDiscountMinor" label="Maximum discount (minor units, optional)" type="number" min={0} initial={initial.maximumDiscountMinor} /><Input name="usageLimit" label="Total usage limit (optional)" type="number" min={1} initial={initial.usageLimit} /><Input name="perCustomerLimit" label="Per-customer limit (optional)" type="number" min={1} initial={initial.perCustomerLimit} /><Input name="startsAt" label="Starts (UTC, optional)" type="datetime-local" initial={dateInput(initial.startsAt)} /><Input name="expiresAt" label="Expires (UTC, optional)" type="datetime-local" initial={dateInput(initial.expiresAt)} /><Input name="status" label="Status" options={resources.coupons.statuses} initial={initial.status || 'INACTIVE'} required /></>}
    {resource === 'staff' && <><label className="admin-checkbox"><input name="active" type="checkbox" defaultChecked={initial.active === true} /> Allow account sign-in</label><label className="admin-checkbox"><input name="makeAdmin" type="checkbox" defaultChecked={Array.isArray(initial.roles) && initial.roles.includes('ADMIN')} /> Staff role (ADMIN)</label><div className="admin-permission-grid admin-form-wide">{grantablePermissions.map(permission => <label className="admin-checkbox" key={permission}><input type="checkbox" name="permissions" value={permission} defaultChecked={Array.isArray(initial.permissions) && initial.permissions.includes(permission)} />{permission}</label>)}</div><Input name="reason" label="Reason for access change" required multiline maxLength={500} /><p className="admin-field-help admin-form-wide">Clearing the ADMIN role removes all operations permissions. Disabling account sign-in also suspends this account’s customer sign-in. Every access change revokes its existing sessions. Owner roles are not assigned here.</p></>}
  </div></fieldset>{validation && <p className="admin-notice admin-notice-error" role="alert">{validation}</p>}{!!error && <AdminFailure error={error} />}<div className="admin-actions"><button className="admin-button" disabled={busy} aria-busy={busy}>{busy ? 'Saving…' : resource === 'inventory' ? 'Record adjustment' : 'Save changes'}</button>{onCancel && <button type="button" className="admin-button admin-button-secondary" disabled={busy} onClick={onCancel}>Cancel</button>}</div><p className="admin-field-help">Changes are checked and recorded by the server. Retrying the same form reuses its request key.</p></form>;
}
