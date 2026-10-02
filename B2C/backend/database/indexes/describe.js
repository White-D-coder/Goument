const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { buildModels } = require('../models');
const { graphs } = require('../models/states');
function fields(schema, prefix = '') {
  const rows = [];
  for (const [key, p] of Object.entries(schema.paths)) {
    if (key.includes('.')) continue;
    const name = prefix + key;
    const options = p.options;
    const ref = options.ref || p.caster?.options?.ref;
    const array = p.instance === 'Array';
    const required = p.isRequired || key === '_id' ? 'required' : 'optional';
    let value = options.default;
    let fallback = value === undefined ? 'none' : typeof value === 'function' ? key === '_id' ? 'new ObjectId' : value === Date.now ? 'now' : 'factory (empty array/map where defined)' : JSON.stringify(value);
    if (key === 'createdAt' || key === 'updatedAt') fallback = 'Mongoose timestamp';
    if (key === '__v' || key === 'version') fallback = '0; optimistic version';
    const details = [ref ? `ref ${ref}` : '', p.enumValues?.length ? `enum ${p.enumValues.join(', ')}` : '', options.min !== undefined ? `min ${options.min}` : '', options.max !== undefined ? `max ${options.max}` : '', options.minlength ? `minLength ${options.minlength}` : '', options.maxlength ? `maxLength ${options.maxlength}` : '', options.match ? `pattern ${options.match.source}` : '', options.lowercase ? 'lowercase' : '', options.uppercase ? 'uppercase' : '', options.select === false ? 'excluded by default projection' : '', options.validate ? 'custom validator; see source/rules' : '', array ? 'bounded array' : ''].filter(Boolean).join('; ');
    rows.push([name, p.schema ? (array ? 'embedded[]' : 'embedded') : array ? `${p.caster?.instance || 'value'}[]` : p.instance, required, fallback, details || 'schema casting/strict types']);
    if (p.schema) rows.push(...fields(p.schema, `${name}${array ? '[]' : ''}.`));
  }
  return rows;
}
const lifecycle = {
 admin_settings: ['Explicit reporting preferences and one-time owner bootstrap guard', 'Configuration', 'Unique operations key; no secrets or payment/tax policy defaults. Revision protects concurrent edits.'],
 admin_commands: ['Actor-scoped idempotent administrative operation receipts', 'Historical / Event', 'Append-only compact resource references and payload hashes; unique actor/key. No request bodies, credentials or customer payloads stored.'],
 admin_rate_limits: ['Shared operations request buckets', 'Temporary', 'Hashed identities and short-lived counts; TTL cleanup. Counter updates are transactionally serialized and fail closed.'],
 gift_drafts: ['Browser-owned gift selections, not orders or reserved stock', 'Mutable draft', 'Opaque cookie ownership; no automatic expiry pending retention policy.'],
 users: ['Authentication identity', 'Transactional', 'Disable; no delete/automatic merge. Phone not unique pending policy.'],
 customers: ['Long-lived commerce identity', 'Transactional + derived caches', 'Deactivate/block; no cascade/history deletion. Email/phone searchable, not automatic identity merge keys.'],
 customer_addresses: ['Customer address book', 'Transactional', 'No deletion repository until privacy policy; updates never affect order copies.'],
 categories: ['Catalogue hierarchy', 'Transactional', 'Deactivate; parent fixed at creation to avoid concurrent reparent cycles.'],
 products: ['Product content and category assignment', 'Transactional', 'Archive; no stock or price authority here.'],
 product_variants: ['Purchasable SKU and current price', 'Transactional', 'Deactivate; SKU/product link immutable.'],
 inventory: ['Only authoritative SKU stock', 'Transactional', 'Disable; opening stock requires movement. No history deletion.'],
 inventory_transactions: ['Stock movement ledger', 'Historical / Event', 'Append-only; corrections require compensating movement.'],
 carts: ['Temporary selections', 'Temporary', 'TTL on explicit expiresAt only; expiry is asynchronous, callers must check dates.'],
 orders: ['Order lifecycle and purchase-time facts', 'Transactional / Historical', 'Never reconstruct snapshots from mutable profiles/products; no deletion API.'],
 payments: ['Payment attempt and verified outcome', 'Transactional / Historical', 'Multiple attempts/order; no deletion. Refund totals remain authoritative in refund rows.'],
 payment_events: ['Provider event dedupe/status', 'Event / operational', 'No TTL, raw payload or automatic discard. Hash binds event content.'],
 coupons: ['Offer constraints and synchronized usage counter', 'Transactional / Derived counter', 'Deactivate/expire; no silent discount rule changes to order history.'],
 coupon_redemptions: ['Coupon application history', 'Historical', 'Reverse status with counter transaction; never delete.'],
 shipments: ['Shipment/tracking lifecycle', 'Transactional / Historical', 'Preserve history; tracking not unique because carrier/reuse policy unknown.'],
 invoices: ['Immutable invoice content and issuance state', 'Historical', 'One invoice/order v1; issue/void preserves content, corrections policy UNKNOWN.'],
 refunds: ['Refund requests/reserved amounts/provider outcomes', 'Transactional / Historical', 'Pending/completed reserve capacity; definite failure/cancellation releases capacity; no deletes.'],
 finance_events: ['Operational money event postings', 'Historical / Event', 'Append-only; reversal is a new opposite-direction linked row. Not formal accounting.'],
 notifications: ['Notification delivery state', 'Operational', 'No auto retention until policy; dedupe unique. Provider send/retry worker not part of DB task.'],
 audit_logs: ['Bounded redacted actor/entity history', 'Historical / Event', 'Append-only, retention/PII anonymization policy UNKNOWN; no secrets.' ]
};
function describe() {
 const connection = mongoose.createConnection(); const models = buildModels(connection);
 const all = Object.values(models); const indexes = all.flatMap(model => model.schema.indexes().map(([keys, options]) => ({ collection: model.collection.name, keys, ...options })));
 const summary = { collections: all.map(m => m.collection.name), totalCollections: all.length, explicitIndexes: indexes.length, explicitUniqueConstraints: indexes.filter(i => i.unique).length, indexesIncludingId: indexes.length + all.length, uniqueIncludingId: indexes.filter(i => i.unique).length + all.length };
 const lines = ['## Generated B2C field/index reference — 2026-10-01', '', 'Source: B2C/backend/database/models and validators. Regenerate with npm run db:describe -- --write-docs. This section describes the new isolated database, not legacy src/features models. Every collection has ObjectId _id; implicit _id unique indexes are reported separately. Mutable records carry createdAt/updatedAt; event records carry createdAt only, plus domain dates. The __v/version field is an optimistic-write guard, not a business identifier.', '', `Collections: ${summary.totalCollections}; explicit indexes: ${summary.explicitIndexes}; explicit unique constraints: ${summary.explicitUniqueConstraints}; with implicit _id indexes: ${summary.indexesIncludingId}/${summary.uniqueIncludingId}.`, ''];
 for (const model of all) {
  const s=model.schema;const [purpose,kind,deletion]=lifecycle[model.collection.name];
  lines.push(`### ${model.collection.name}`, '', `Purpose: ${purpose}. Lifecycle: ${kind}. ${deletion}`, '', `State guards: ${JSON.stringify(s.$design.states || {})}. Initial-state restriction: ${JSON.stringify(s.$design.initial || {})}. Frozen paths: ${(s.$design.frozen || []).join(', ') || 'append-only if event; see invariant rules'}. References below are validated on create/change; MongoDB itself has no cross-collection foreign keys.`, '', '| Field | Type | Required | Default | Constraint/reference |', '| --- | --- | --- | --- | --- |');
  for (const row of fields(s)) lines.push('| '+row.map(v=>String(v).replaceAll('|','\\|')).join(' | ')+' |');
  lines.push('', '| Index / query purpose | Keys | Unique | Sparse / partial / TTL |', '| --- | --- | --- | --- |');
  for (const [keys,o] of s.indexes()) lines.push(`| ${o.name.replaceAll('_',' ')} | ${JSON.stringify(keys)} | ${o.unique ? 'yes' : 'no'} | ${o.partialFilterExpression ? `partial ${JSON.stringify(o.partialFilterExpression)}` : o.expireAfterSeconds !== undefined ? `TTL ${o.expireAfterSeconds}s` : 'non-sparse'} |`);
  lines.push('');
 }
 lines.push('### Central state transition graphs', '', 'Same-state saves are allowed. Transitions not listed are rejected on document save. Graphs constrain persistence, not business permission; repositories implement only selected flows. Inventory status is derived from quantity/explicit threshold unless DISABLED. Finance postings are immutable; REVERSED is a new row referencing the original.', '', '| Graph | Current | Allowed next |','| --- | --- | --- |');
 for(const [name,graph]of Object.entries(graphs))for(const[from,to]of Object.entries(graph))lines.push(`| ${name} | ${from} | ${to.join(', ') || 'terminal'} |`);
 return { summary,indexes,markdown:lines.join('\n')+'\n' };
}
if(require.main===module){const result=describe();if(process.argv.includes('--write-docs')){const file=path.resolve(__dirname,'../../../../docs/DATA_MODELS.md');let old=fs.readFileSync(file,'utf8');old=old.split('## Generated B2C field/index reference')[0];fs.writeFileSync(file,old.trimEnd()+'\n\n'+result.markdown);}console.log(JSON.stringify(result.summary,null,2));}
module.exports={describe};
