const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

class ApiError extends Error { constructor(message, status) { super(message); this.status = status; } }
function load(file, globals = {}) {
  const exports = {};
  const source = fs.readFileSync(path.join(__dirname, '../src/lib/admin', file), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(compiled, { exports, require: name => { assert.equal(name, '@/lib/api'); return { ApiError }; }, Intl, URLSearchParams, AbortSignal, ...globals });
  return exports;
}

test('admin reads stay in the existing cookie namespace, bypass storage and disable caching', async () => {
  const calls = [];
  const storage = new Proxy({}, { get() { throw new Error('Private admin data must not use browser storage'); } });
  const { adminApi } = load('api.ts', { localStorage: storage, fetch: async (url, options) => { calls.push({ url, options }); return { ok: true, json: async () => ({ items: [], next: null }) }; } });
  await adminApi('/orders?limit=20');
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, '/api/v1/auth/admin/orders?limit=20');
  assert.equal(calls[0].options.credentials, 'include');
  assert.equal(calls[0].options.cache, 'no-store');
  assert.equal(calls[0].options.headers.Authorization, undefined);
  assert.equal(calls[0].options.headers['X-Session-Id'], undefined);
});

test('mutations require a caller-owned idempotency key and forward it unchanged', async () => {
  const calls = [];
  const { adminApi } = load('api.ts', { fetch: async (url, options) => { calls.push({ url, options }); return { ok: true, json: async () => ({ id: 'record', version: 2 }) }; } });
  await assert.rejects(adminApi('/inventory/record/adjust', { method: 'POST', body: { quantity: 3 } }), /request key/);
  assert.equal(calls.length, 0);
  await adminApi('/inventory/record/adjust', { method: 'POST', key: 'same-operation', body: { quantity: 3, expectedVersion: 1 } });
  await adminApi('/inventory/record/adjust', { method: 'POST', key: 'same-operation', body: { quantity: 3, expectedVersion: 1 } });
  assert.ok(calls.every(call => call.options.headers['Idempotency-Key'] === 'same-operation'));
  assert.deepEqual(JSON.parse(calls[0].options.body), { quantity: 3, expectedVersion: 1 });
});

test('401,403,409 and503 remain distinguishable and are never converted to empty success', async () => {
  for (const status of [401, 403, 409, 503]) {
    const { adminApi } = load('api.ts', { fetch: async () => ({ ok: false, status, json: async () => ({ message: 'Request rejected' }) }) });
    await assert.rejects(adminApi('/orders'), failure => failure instanceof ApiError && failure.status === status && failure.message === 'Request rejected');
  }
  const { adminApi } = load('api.ts', { fetch: async () => ({ ok: true, status: 200, json: async () => { throw new Error('invalid JSON'); } }) });
  await assert.rejects(adminApi('/orders'), /could not complete/);
});

test('ambiguous transport failure never automatically replays a privileged mutation', async () => {
  let calls = 0;
  const { adminApi } = load('api.ts', { fetch: async () => { calls++; throw new Error('Connection ended after server commit'); } });
  await assert.rejects(adminApi('/coupons', { method: 'POST', key: 'one-key', body: { code: 'TEST' } }), /Connection ended/);
  assert.equal(calls, 1);
});

test('an aborted view propagates its abort signal into fetch', async () => {
  const controller = new AbortController(); controller.abort();
  const { adminApi } = load('api.ts', { fetch: async (_url, options) => { assert.equal(options.signal.aborted, true); throw new Error('aborted'); } });
  await assert.rejects(adminApi('/orders', { signal: controller.signal }), /aborted/);
});

test('missing money stays unknown and valid currencies keep their minor-unit exponent', () => {
  const { amountValue } = load('format.ts');
  assert.equal(amountValue(undefined, 'INR'), 'Not recorded');
  assert.equal(amountValue(NaN, 'INR'), 'Not recorded');
  assert.match(amountValue(12345, 'INR'), /123\.45/);
  assert.match(amountValue(12345, 'JPY'), /12,345/);
  assert.match(amountValue(12345, 'KWD'), /12\.345/);
  assert.equal(amountValue(500, undefined), '500 minor units · currency not recorded');
});

test('private values are rendered only as known scalar fields; absent dates are not fabricated', () => {
  const { textValue, dateValue, valueAt } = load('format.ts');
  assert.equal(textValue({ secret: 'must not render' }), 'Not recorded');
  assert.equal(textValue(0), '0');
  assert.equal(dateValue(undefined), 'Not recorded');
  assert.equal(dateValue('2026-01-01T12:00:00Z'), '2026-01-01 12:00:00 UTC');
  assert.equal(valueAt({ pricing: { grandTotalMinor: 1250 } }, 'pricing.grandTotalMinor'), 1250);
});

test('frontend resources and staff permission choices match authoritative backend contracts', () => {
  const { resources, grantablePermissions } = load('resources.ts');
  const backend = require('../backend/admin/resources').resources;
  const { PERMISSIONS, OWNER_ONLY } = require('../backend/admin/permissions');
  for (const [name, definition] of Object.entries(backend)) {
    assert.equal(resources[name].permission, definition.permission, name);
    if (definition.states) assert.deepEqual([...resources[name].statuses].sort(), [...definition.states].sort(), name);
  }
  assert.deepEqual([...grantablePermissions].sort(), PERMISSIONS.filter(permission => !OWNER_ONLY.includes(permission)).sort());
});
