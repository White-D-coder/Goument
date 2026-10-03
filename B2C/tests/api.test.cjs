const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load({ storage, fetch }) {
 const exports = {};
 const source = fs.readFileSync(path.join(__dirname, '../src/lib/api.ts'), 'utf8');
 const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
 vm.runInNewContext(compiled, { exports, localStorage: storage, fetch, AbortSignal, crypto: { randomUUID: () => 'legacy-guest-id' } });
 return exports;
}

test('cookie-owned guest cart and sign-in still reach the API when localStorage is denied', async () => {
 const requests = [];
 const { api } = load({
  storage: { getItem() { throw new Error('Storage denied'); }, setItem() { throw new Error('Storage denied'); } },
  fetch: async (url, options) => { requests.push({ url, options }); return { ok: true, json: async () => ({ success: true }) }; },
 });
 for (const [route, method] of [['/auth/gift/draft', 'GET'], ['/auth/gift/draft', 'PUT'], ['/auth/gift/count', 'GET'], ['/auth/login', 'POST'], ['/auth/register', 'POST'], ['/auth/me', 'GET']]) {
  await api(route, method, method === 'GET' ? undefined : {});
 }
 assert.equal(requests.length, 6);
 for (const { options } of requests) {
  assert.equal(options.credentials, 'include');
  assert.equal(options.headers['X-Session-Id'], undefined);
  assert.equal(options.headers['Content-Type'], 'application/json');
 }
});

test('legacy cart keeps its existing guest identifier across requests', async () => {
 const values = new Map(), sessions = [];
 const { api } = load({
  storage: { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) },
  fetch: async (_url, options) => { sessions.push(options.headers['X-Session-Id']); return { ok: true, json: async () => ({ items: [] }) }; },
 });
 await api('/cart'); await api('/cart/items', 'POST', { quantity: 1 });
 assert.deepEqual(sessions, ['legacy-guest-id', 'legacy-guest-id']);
});

test('database outage remains an explicit error for cookie-owned cart requests', async () => {
 const { api, ApiError } = load({
  storage: { getItem() { throw new Error('Should not access legacy storage'); } },
  fetch: async () => ({ ok: false, status: 503, json: async () => ({ message: 'Your cart is temporarily unavailable.' }) }),
 });
 await assert.rejects(api('/auth/gift/draft'), error => error instanceof ApiError && error.status === 503 && /cart/.test(error.message));
});
