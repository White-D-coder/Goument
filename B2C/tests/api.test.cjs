const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load({ storage, fetch, onDelay = () => {} }) {
 const exports = {};
 const source = fs.readFileSync(path.join(__dirname, '../src/lib/api.ts'), 'utf8');
 const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
 vm.runInNewContext(compiled, { exports, localStorage: storage, fetch, AbortSignal, setTimeout: (fn, ms) => { onDelay(ms); fn(); }, crypto: { randomUUID: () => 'legacy-guest-id' } });
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

test('persistent database outage stays explicit after one bounded read retry', async () => {
 let requests = 0; const delays = [];
 const { api, ApiError } = load({
  storage: { getItem() { throw new Error('Should not access legacy storage'); } },
  onDelay: ms => delays.push(ms),
  fetch: async () => { requests++; return { ok: false, status: 503, json: async () => ({ message: 'Your cart is temporarily unavailable.' }) }; },
 });
 await assert.rejects(api('/auth/gift/draft'), error => error instanceof ApiError && error.status === 503 && /cart/.test(error.message));
 assert.equal(requests,2); assert.deepEqual(delays,[1000]);
});

test('temporary 503 on allowlisted reads retries once with cookie credentials and server delay', async () => {
 for (const route of ['/auth/gift/draft','/auth/gift/catalogue','/auth/gift/count','/auth/me','/auth/config']) {
  const calls = [], delays = [];
  const { api } = load({
   onDelay: ms => delays.push(ms),
   fetch: async (url, options) => {
    calls.push({url,options});
    return calls.length === 1
     ? {ok:false,status:503,headers:{get:()=> '1'},json:async()=>({message:'Temporary failure'})}
     : {ok:true,status:200,json:async()=>({revision:7})};
   },
  });
  assert.equal((await api(route)).revision,7);
  assert.equal(calls.length,2); assert.deepEqual(delays,[1000]);
  for(const call of calls) { assert.equal(call.options.credentials,'include'); assert.equal(call.options.method,'GET'); }
  assert.notEqual(calls[0].options.signal,calls[1].options.signal);
 }
});

test('mutations, non-bootstrap reads and 401/429 never auto retry', async () => {
 for (const [route,method,status] of [
  ['/auth/gift/draft','PUT',503],['/auth/login','POST',503],['/auth/logout','POST',503],
  ['/auth/gift/order','POST',503],['/auth/gift/address','POST',503],
  ['/auth/orders','GET',503],['/auth/gift/draft','GET',429],['/auth/me','GET',401],
 ]) {
  let calls = 0;
  const { api } = load({onDelay:()=>assert.fail('Unexpected retry'),fetch:async()=>{
   calls++;return {ok:false,status,json:async()=>({message:'Unavailable'})};
  }});
  await assert.rejects(api(route,method,method==='GET'?undefined:{}),{status});assert.equal(calls,1);
 }
});

test('long server cooldown and network failures stay explicit without immediate retry', async () => {
 for(const retryAfter of ['2','invalid']) {
  let calls=0;
  const {api}=load({onDelay:()=>assert.fail('Must respect server cooldown'),fetch:async()=>{
   calls++;return {ok:false,status:503,headers:{get:()=>retryAfter},json:async()=>({message:'Unavailable'})};
  }});
  await assert.rejects(api('/auth/gift/draft'),{status:503});assert.equal(calls,1);
 }
 let calls=0;
 const {api}=load({fetch:async()=>{calls++;throw new TypeError('Network failure');}});
 await assert.rejects(api('/auth/gift/draft'),/Network failure/);assert.equal(calls,1);
});
