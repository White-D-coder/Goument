/* eslint-disable @typescript-eslint/no-require-imports -- Node's CommonJS test harness loads transpiled TypeScript in an isolated VM. */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

class ApiError extends Error { constructor(message, status) { super(message); this.status = status; } }
const plain = value => JSON.parse(JSON.stringify(value));
const empty = () => ({ revision: 0, boxes: [], items: [], packing: 'EMPTY', checkoutAvailable: false });
function load(api) {
 const exports = {}, events = [], cartEvents = [];
 const window = { dispatchEvent: e => { events.push(e.type); cartEvents.push(e); } };
 const eventExports = {};
 const eventSource = fs.readFileSync(path.join(__dirname, '../src/lib/gift-cart-events.ts'), 'utf8');
 vm.runInNewContext(ts.transpileModule(eventSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: eventExports, window, CustomEvent });
 const source = fs.readFileSync(path.join(__dirname, '../src/lib/gift-cart.ts'), 'utf8');
 const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
 vm.runInNewContext(compiled, { exports, require: name => { if (name === './gift-cart-events') return eventExports; assert.equal(name, './api'); return { api, ApiError }; }, window, Event });
 return { add: exports.addGiftItem, change: exports.changeGiftItemQuantity, ensure: exports.ensureGiftItem, personalise: exports.saveGiftPersonalisation, read: exports.readGiftDraft, count: exports.readGiftCount, waitForAdditions: exports.waitForGiftCartAdditions, beforeSignIn: exports.waitForGiftCartBeforeSignIn, queueWrite: exports.queueGiftCartWrite, events, cartEvents };
}

test('badge joins a same-mount draft read instead of making a separate count request', async () => {
 const calls = [];
 let release;
 const cart = load(url => { calls.push(url); return new Promise(resolve => { release = resolve; }); });
 const count = cart.count();
 const draft = cart.read();
 await new Promise(resolve => setImmediate(resolve));
 assert.deepEqual(calls, ['/auth/gift/draft']);
 release({ ...empty(), items: [{ id: 'first', quantity: 99 }, { id: 'second', quantity: 2 }] });
 assert.equal((await count).count, 101);
 await draft;
});

test('badge shares a queued draft after an earlier write, not an older selection', async () => {
 let release;
 const hold = new Promise(resolve => { release = resolve; });
 const calls = [], cart = load(async url => { calls.push(url); return { ...empty(), items: [{ id: 'latest', quantity: 7 }] }; });
 const write = cart.queueWrite(() => hold);
 const draft = cart.read(), count = cart.count();
 await new Promise(resolve => setImmediate(resolve));
 assert.equal(calls.length, 0);
 release(); await write;
 assert.equal((await count).count, 7); await draft;
 assert.deepEqual(calls, ['/auth/gift/draft']);
});

test('shopping badge starts one shared read before streamed controls mount', async () => {
 const calls = [];
 let release;
 const cart = load(url => { calls.push(url); return new Promise(resolve => { release = resolve; }); });
 const count = cart.count(true);
 await new Promise(resolve => setImmediate(resolve));
 const draft = cart.read();
 assert.deepEqual(calls, ['/auth/gift/draft']);
 release({ ...empty(), items: [{ id: 'latest', quantity: 3 }] });
 assert.equal((await count).count, 3); await draft;
});

test('badge keeps a fresh count-only fallback without creating or caching draft sessions', async () => {
 const calls = [];
 const cart = load(async url => { calls.push(url); return { count: calls.length }; });
 assert.equal((await cart.count()).count, 1);
 assert.equal((await cart.count()).count, 2);
 assert.deepEqual(calls, ['/auth/gift/count', '/auth/gift/count']);
 assert.deepEqual(cart.events, []);
});

test('badge does not cache settled selections or add a count request after draft failure', async () => {
 const calls = [];
 let fail = true;
 const cart = load(async url => {
  calls.push(url);
  if (url.endsWith('/count')) return { count: 8 };
  if (fail) throw new ApiError('Unavailable', 503);
  return empty();
 });
 const first = cart.read(), count = cart.count();
 const failures = await Promise.allSettled([first, count]);
 assert.ok(failures.every(result => result.status === 'rejected'));
 assert.deepEqual(calls, ['/auth/gift/draft']);
 fail = false;
 await cart.read();
 assert.equal((await cart.count()).count, 8);
 assert.deepEqual(calls, ['/auth/gift/draft', '/auth/gift/draft', '/auth/gift/count']);
});

test('cart listeners receive the saved server selection with no follow-up read', async () => {
 const calls = [];
 const confirmed = { ...empty(), revision: 8, items: [{ id: 'server-confirmed', quantity: 4 }] };
 const { add, cartEvents } = load(async (_url, method) => { calls.push(method || 'GET'); return method ? confirmed : empty(); });
 await add('requested');
 assert.deepEqual(calls, ['GET', 'PUT']);
 assert.deepEqual(plain(cartEvents[0].detail), { items: confirmed.items, draft: confirmed });
});

test('a grid shares one cart read, then refreshes from the latest confirmed write', async () => {
 let state = empty(), reads = 0, writes = 0, release;
 const hold = new Promise(resolve => { release = resolve; });
 const { read, add } = load(async (_url, method, body) => {
  if (!method) { reads++; if (reads === 1) await hold; return plain(state); }
  writes++; state = { ...plain(body), revision: state.revision + 1 }; return plain(state);
 });
 const readers = Array.from({ length: 12 }, () => read());
 await new Promise(resolve => setImmediate(resolve));
 assert.equal(reads, 1); release();
 const values = await Promise.all(readers); assert.ok(values.every(value => value.items.length === 0));
 await add('candles');
 const refreshed = await Promise.all([read(), read()]);
 assert.equal(reads, 3); assert.equal(writes, 1);
 assert.deepEqual(plain(refreshed[0].items), [{ id: 'candles', quantity: 1 }]);
});

test('a rejected shared cart read clears without caching failure or publishing success', async () => {
 let reads = 0;
 const { read, events } = load(async () => { if (++reads === 1) throw new ApiError('Unavailable', 503); return empty(); });
 const results = await Promise.allSettled([read(), read()]);
 assert.ok(results.every(result => result.status === 'rejected')); assert.equal(reads, 1);
 assert.equal((await read()).items.length, 0); assert.equal(reads, 2); assert.deepEqual(events, []);
});

test('buy now saves an absent item once, preserving packaging and other selections', async () => {
 let state = { ...empty(), revision: 3, boxes: [{ id: 'box', quantity: 2 }], items: [{ id: 'other', quantity: 4 }] }, writes = 0;
 const { ensure, events } = load(async (_url, method, body) => {
  if (!method) return plain(state);
  writes++; assert.equal(body.revision, state.revision);
  state = { ...plain(body), revision: state.revision + 1 }; return plain(state);
 });
 await Promise.all([ensure('ivory_hamper'), ensure('ivory_hamper')]);
 assert.equal(writes, 1);
 assert.deepEqual(state.items, [{ id: 'other', quantity: 4 }, { id: 'ivory_hamper', quantity: 1 }]);
 assert.deepEqual(state.boxes, [{ id: 'box', quantity: 2 }]);
 assert.deepEqual(events, ['b2c-cart-change']);
});

test('buy now keeps the latest quantity without an unnecessary write, including at the limit', async () => {
 const state = { ...empty(), items: [{ id: 'ivory_hamper', quantity: 99 }] };
 const { ensure, events } = load(async (_url, method) => {
  assert.equal(method, undefined); return plain(state);
 });
 assert.deepEqual(plain(await ensure('ivory_hamper')), state);
 assert.deepEqual(events, []);
});

test('buy now revision retry keeps a quantity added by another tab instead of adding again', async () => {
 let state = empty(), writes = 0;
 const { ensure, events } = load(async (_url, method) => {
  if (!method) return plain(state);
  writes++;
  state = { ...empty(), revision: 1, items: [{ id: 'ivory_hamper', quantity: 3 }] };
  throw new ApiError('Changed in another tab', 409);
 });
 const result = await ensure('ivory_hamper');
 assert.equal(result.items[0].quantity, 3); assert.equal(writes, 1);
 assert.deepEqual(events, []);
});

test('buy now rejects an unconfirmed save and never retries or announces success', async () => {
 let writes = 0;
 const { ensure, events } = load(async (_url, method) => {
  if (!method) return empty();
  writes++; throw new Error('Response lost');
 });
 await assert.rejects(ensure('ivory_hamper'), /Check your cart/);
 assert.equal(writes, 1); assert.deepEqual(events, []);
});

test('confirmed add preserves boxes and unrelated selections and increments the same item', async () => {
 let state = { ...empty(), revision: 4, boxes: [{ id: 'box_maroon_bloom', quantity: 2 }], items: [{ id: 'gourmet_makhana', quantity: 3 }, { id: 'other', quantity: 2 }] };
 const { add, events } = load(async (url, method, body) => {
  assert.equal(url, '/auth/gift/draft');
  if (!method) return plain(state);
  assert.equal(method, 'PUT'); assert.equal(body.revision, state.revision);
  state = { ...plain(body), revision: state.revision + 1 };
  return plain(state);
 });
 await add('gourmet_makhana');
 assert.deepEqual(state.boxes, [{ id: 'box_maroon_bloom', quantity: 2 }]);
 assert.deepEqual(state.items, [{ id: 'gourmet_makhana', quantity: 4 }, { id: 'other', quantity: 2 }]);
 assert.deepEqual(events, ['b2c-cart-change']);
});

test('different cards serialize first-cookie read and write; rapid additions do not lose items', async () => {
 let state = empty(); const calls = [];
 const { add, events } = load(async (_url, method, body) => {
  calls.push(method || 'GET');
  await new Promise(resolve => setTimeout(resolve, 5));
  if (!method) return plain(state);
  assert.equal(body.revision, state.revision);
  state = { ...plain(body), revision: state.revision + 1 }; return plain(state);
 });
 await Promise.all([add('first'), add('second'), add('first')]);
 assert.deepEqual(calls, ['GET', 'PUT', 'GET', 'PUT', 'GET', 'PUT']);
 assert.deepEqual(state.items, [{ id: 'first', quantity: 2 }, { id: 'second', quantity: 1 }]);
 assert.equal(events.length, 3);
});

test('explicit revision conflict rereads and preserves another tab change before one retry', async () => {
 let state = empty(), writes = 0, reads = 0;
 const { add, events } = load(async (_url, method, body) => {
  if (!method) { reads++; return plain(state); }
  if (++writes === 1) {
   state = { ...empty(), revision: 1, boxes: [{ id: 'box', quantity: 2 }], items: [{ id: 'another-tab', quantity: 4 }] };
   throw new ApiError('Changed in another tab', 409);
  }
  assert.equal(body.revision, 1); state = { ...plain(body), revision: 2 }; return state;
 });
 await add('first');
 assert.equal(reads, 2); assert.equal(writes, 2);
 assert.deepEqual(state.boxes, [{ id: 'box', quantity: 2 }]);
 assert.deepEqual(state.items, [{ id: 'another-tab', quantity: 4 }, { id: 'first', quantity: 1 }]);
 assert.equal(events.length, 1);
});

test('conflict retry is bounded and never announces success after rejection', async () => {
 let writes = 0;
 const { add, events } = load(async (_url, method) => { if (!method) return empty(); writes++; throw new ApiError('Changed', 409); });
 await assert.rejects(add('first'), /Changed/);
 assert.equal(writes, 2); assert.equal(events.length, 0);
});

test('99-item guard prevents a write while leaving the queue usable', async () => {
 let writes = 0;
 const { add, events } = load(async (_url, method, body) => { if (!method) return { ...empty(), items: [{ id: 'full', quantity: 99 }] }; writes++; return body; });
 await assert.rejects(add('full'), /99/);
 assert.equal(writes, 0); assert.equal(events.length, 0);
 await add('other'); assert.equal(writes, 1); assert.equal(events.length, 1);
});

test('ambiguous write failure is not retried or reported as success', async () => {
 let writes = 0;
 const { add, events } = load(async (_url, method) => { if (!method) return empty(); writes++; throw new Error('connection dropped after write'); });
 await assert.rejects(add('first'), /Check your cart/);
 assert.equal(writes, 1); assert.equal(events.length, 0);
});

test('server error is visible and does not poison subsequent additions', async () => {
 let writes = 0;
 const { add, events } = load(async (_url, method, body) => { if (!method) return empty(); if (++writes === 1) throw new ApiError('Unavailable', 503); return body; });
 await assert.rejects(add('first'), /Unavailable/);
 assert.equal(events.length, 0); await add('second');
 assert.equal(writes, 2); assert.equal(events.length, 1);
});

test('preview product mapping matches the server gift catalogue exactly', () => {
 function catalogueData(file, key) {
  const source = fs.readFileSync(path.join(__dirname, `../src/lib/${file}.ts`), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: name => catalogueData(name.replace('./', '')) });
  return key ? Array.from(exports[key]) : exports;
 }
 const ids = [
  ...catalogueData('catalogue-preview', 'HAMPERS_CATALOG').map(item => item._id),
  ...catalogueData('curated-hampers', 'CURATED_HAMPERS').map(item => item.giftItemId),
  ...catalogueData('photographed-envelopes', 'PHOTOGRAPHED_ENVELOPES').map(item => item.giftItemId),
  ...catalogueData('photographed-candles', 'PHOTOGRAPHED_CANDLES').filter(item => item.giftItemId !== 'laddoo_candles').map(item => item.giftItemId)
 ];
 const items = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/gifting/items.json'), 'utf8'));
 assert.equal(new Set(ids).size, ids.length);
 assert.deepEqual(ids.sort(), items.filter(item => item.id !== 'india_hamper').map(item => item.id).sort());
 assert.ok(items.some(item => item.id === 'india_hamper'), 'legacy selections remain valid without guessing a colour');
});

test('new cart consumers wait until pending card additions have settled', async () => {
 let releaseWrite;
 const write = new Promise(resolve => { releaseWrite = resolve; });
 const { add, waitForAdditions } = load(async (_url, method, body) => { if (!method) return empty(); await write; return body; });
 const adding = add('first');
 let loaded = false;
 const loading = waitForAdditions().then(() => { loaded = true; });
 await new Promise(resolve => setTimeout(resolve, 10));
 assert.equal(loaded, false);
 releaseWrite(); await adding; await loading;
 assert.equal(loaded, true);
});

test('sign-in waits for card additions and later queued box/quantity changes', async () => {
 let release;
 const hold = new Promise(resolve => { release = resolve; });
 const { add, queueWrite, beforeSignIn } = load(async (_url, method, body) => {
  if (!method) return empty();
  await hold; return body;
 });
 const adding = add('first');
 let navigated = false, boxSaved = false;
 const signingIn = beforeSignIn().then(() => { assert.equal(boxSaved, true); navigated = true; });
 const boxChange = queueWrite(async () => { await new Promise(resolve => setTimeout(resolve, 10)); boxSaved = true; });
 await new Promise(resolve => setTimeout(resolve, 10));
 assert.equal(navigated, false);
 release(); await Promise.all([adding, boxChange, signingIn]);
 assert.equal(navigated, true);
});

test('sign-in stops on an unconfirmed write without replaying it, and later reads can recover', async () => {
 let rejectWrite, attempts = 0;
 const hold = new Promise((_resolve, reject) => { rejectWrite = reject; });
 const { add, beforeSignIn, waitForAdditions, events } = load(async (_url, method, body) => {
  if (!method) return empty();
  if (++attempts === 1) await hold;
  return body;
 });
 const failedAdd = assert.rejects(add('first'), /Check your cart/);
 const blockedSignIn = assert.rejects(beforeSignIn(), /Review your cart before continuing/);
 rejectWrite(new Error('response lost after database write'));
 await Promise.all([failedAdd, blockedSignIn]);
 assert.equal(attempts, 1); assert.deepEqual(events, []);
 await waitForAdditions();
 await add('second'); await beforeSignIn();
 assert.equal(attempts, 2); assert.deepEqual(events, ['b2c-cart-change']);
});

test('sign-in also waits for a builder save when there are no product-card additions', async () => {
 let release;
 const hold = new Promise(resolve => { release = resolve; });
 const { queueWrite, beforeSignIn } = load(async () => { throw new Error('No card request expected'); });
 const saving = queueWrite(() => hold);
 let navigated = false;
 const signingIn = beforeSignIn().then(() => { navigated = true; });
 await new Promise(resolve => setTimeout(resolve, 10));
 assert.equal(navigated, false);
 release(); await Promise.all([saving, signingIn]);
 assert.equal(navigated, true);
});

test('counter decrement preserves packaging and other items, and zero removes the item', async () => {
 let state = { ...empty(), revision: 3, boxes: [{ id: 'box', quantity: 1 }], items: [{ id: 'first', quantity: 2 }, { id: 'other', quantity: 4 }] };
 const { change, events } = load(async (_url, method, body) => {
  if (!method) return plain(state);
  assert.equal(body.revision, state.revision);
  state = { ...plain(body), revision: state.revision + 1 }; return plain(state);
 });
 await change('first', -1);
 assert.deepEqual(state.items, [{ id: 'first', quantity: 1 }, { id: 'other', quantity: 4 }]);
 await change('first', -1);
 assert.deepEqual(state.items, [{ id: 'other', quantity: 4 }]);
 assert.deepEqual(state.boxes, [{ id: 'box', quantity: 1 }]);
 assert.equal(events.length, 2);
});

test('counter conflict retries the decrement against the latest quantity', async () => {
 let state = { ...empty(), items: [{ id: 'first', quantity: 2 }] }, writes = 0;
 const { change } = load(async (_url, method, body) => {
  if (!method) return plain(state);
  if (++writes === 1) {
   state = { ...empty(), revision: 1, items: [{ id: 'first', quantity: 5 }, { id: 'other', quantity: 3 }] };
   throw new ApiError('Changed', 409);
  }
  assert.equal(body.revision, 1); state = { ...plain(body), revision: 2 }; return plain(state);
 });
 await change('first', -1);
 assert.deepEqual(state.items, [{ id: 'first', quantity: 4 }, { id: 'other', quantity: 3 }]);
 assert.equal(writes, 2);
});

test('counter failures do not publish success or retry ambiguous writes', async () => {
 let writes = 0;
 const { change, events } = load(async (_url, method) => {
  if (!method) return { ...empty(), items: [{ id: 'first', quantity: 2 }] };
  writes++; throw new Error('Response lost');
 });
 await assert.rejects(change('first', -1), /Check your cart/);
 assert.equal(writes, 1); assert.equal(events.length, 0);
});

test('decrementing an absent item does not write or create a zero quantity', async () => {
 let writes = 0;
 const { change, events } = load(async (_url, method) => { if (!method) return empty(); writes++; });
 const result = await change('first', -1);
 assert.equal(result.items.length, 0); assert.equal(writes, 0); assert.equal(events.length, 0);
});

test('India colour additions, Buy now and removals never combine colours or rewrite legacy selections', async () => {
 let state = { ...empty(), items: [{id: 'india_hamper', quantity: 4}] };
 const cart = load(async (_url, method, body) => {
  if (!method) return plain(state);
  assert.equal(body.revision, state.revision);
  state = { ...plain(body), revision: state.revision + 1 }; return plain(state);
 });
 await Promise.all([cart.add('india_hamper_burgundy'), cart.add('india_hamper_lavender')]);
 await cart.add('india_hamper_burgundy');
 await cart.ensure('india_hamper_lavender');
 assert.deepEqual(state.items, [{id:'india_hamper',quantity:4},{id:'india_hamper_burgundy',quantity:2},{id:'india_hamper_lavender',quantity:1}]);
 await cart.change('india_hamper_lavender', -1);
 assert.deepEqual(state.items, [{id:'india_hamper',quantity:4},{id:'india_hamper_burgundy',quantity:2}]);
});

test('print names survive generic Add/counter/Buy now and other selections without changing line identity',async()=>{
 const name={mode:'PRINT',name:'Example & Name'};
 let state={...empty(),items:[{id:'preview-envelope-ep1',quantity:2,personalisation:name},{id:'other',quantity:3}]};
 const cart=load(async(_url,method,body)=>{if(!method)return plain(state);state={...plain(body),revision:state.revision+1};return plain(state);});
 await cart.add('preview-envelope-ep1');await cart.change('preview-envelope-ep1',-1);await cart.ensure('preview-envelope-ep1');await cart.add('other');
 assert.deepEqual(state.items,[{id:'preview-envelope-ep1',quantity:2,personalisation:name},{id:'other',quantity:4}]);
 await cart.personalise('preview-envelope-ep1',{mode:'PRINT',name:'Updated Name'});assert.equal(state.items[0].quantity,2);assert.deepEqual(state.items[0].personalisation,{mode:'PRINT',name:'Updated Name'});
 await cart.add('preview-envelope-ep1');assert.deepEqual(state.items[0].personalisation,{mode:'PRINT',name:'Updated Name'});
});

test('name-only edits and Buy now at max quantity save without adding units; clearing resets the choice',async()=>{
 let state={...empty(),items:[{id:'preview-envelope-ep1',quantity:99}]},writes=0;
 const cart=load(async(_url,method,body)=>{if(!method)return plain(state);writes++;state={...plain(body),revision:state.revision+1};return plain(state);});
 await cart.ensure('preview-envelope-ep1',{mode:'PRINT',name:'First Name'});
 assert.equal(state.items[0].quantity,99);assert.equal(state.items[0].personalisation.name,'First Name');
 await cart.personalise('preview-envelope-ep1',{mode:'PRINT',name:'Updated Name'});assert.equal(state.items[0].quantity,99);
 await cart.personalise('preview-envelope-ep1',null);assert.equal(state.items[0].personalisation,undefined);assert.equal(writes,3);
});

test('name writes do not resurrect removed items or replay uncertain saves; explicit revision retry preserves newer quantities',async()=>{
 let writes=0;
 const absent=load(async(_url,method)=>{if(!method)return empty();writes++;});
 await assert.rejects(absent.personalise('preview-envelope-ep1',{mode:'PRINT',name:'Example'}),/no longer in your bag/);assert.equal(writes,0);
 let state={...empty(),items:[{id:'preview-envelope-ep1',quantity:2}]};
 const failing=load(async(_url,method)=>{if(!method)return plain(state);writes++;throw new Error('Response lost');});
 await assert.rejects(failing.personalise('preview-envelope-ep1',{mode:'PRINT',name:'Unconfirmed'}),/Check your cart/);assert.equal(writes,1);assert.equal(failing.events.length,0);
 writes=0;
 const conflict=load(async(_url,method,body)=>{if(!method)return plain(state);writes++;if(writes===1){state={...state,revision:1,items:[{id:'preview-envelope-ep1',quantity:4},{id:'other',quantity:1}]};throw new ApiError('Conflict',409);}assert.equal(body.revision,1);state={...plain(body),revision:2};return plain(state);});
 await conflict.personalise('preview-envelope-ep1',{mode:'PRINT',name:'Confirmed'});assert.equal(writes,2);assert.equal(state.items[0].quantity,4);assert.equal(state.items[0].personalisation.name,'Confirmed');assert.deepEqual(state.items[1],{id:'other',quantity:1});
});

test('confirmed card saves with one request and preserves boxes and other print names', async () => {
 const snapshot = { ...empty(), revision: 7, boxes: [{ id: 'box', quantity: 1 }], items: [{ id: 'envelope', quantity: 2, personalisation: { mode: 'PRINT', name: 'Example' } }] };
 const calls = [];
 const { add, events } = load(async (_url, method, body) => {
  calls.push(method || 'GET'); assert.equal(method, 'PUT'); assert.equal(body.revision, 7);
  assert.deepEqual(plain(body.boxes), snapshot.boxes); assert.deepEqual(plain(body.items[0]), snapshot.items[0]);
  return { ...plain(body), revision: 8 };
 });
 const result = await add('candles', undefined, snapshot);
 assert.deepEqual(calls, ['PUT']); assert.deepEqual(plain(result.items), [...snapshot.items, { id: 'candles', quantity: 1 }]);
 assert.equal(snapshot.items.length, 1); assert.deepEqual(events, ['b2c-cart-change']);
});

test('concurrent confirmed revisions recover without losing or doubling items', async () => {
 let state = empty(); const calls = [];
 const { add } = load(async (_url, method, body) => {
  calls.push(method || 'GET'); if (!method) return plain(state);
  if (body.revision !== state.revision) throw new ApiError('Revision changed', 409);
  state = { ...plain(body), revision: state.revision + 1 }; return plain(state);
 });
 const snapshot = plain(state);
 await Promise.all([add('first', undefined, snapshot), add('second', undefined, snapshot)]);
 assert.deepEqual(calls, ['PUT', 'PUT', 'GET', 'PUT']);
 assert.deepEqual(state.items, [{ id: 'first', quantity: 1 }, { id: 'second', quantity: 1 }]);
});

test('confirmed snapshot never retries an ambiguous save or fabricates success', async () => {
 const calls = [];
 const { add, events } = load(async (_url, method) => { calls.push(method); throw new Error('Response lost'); });
 await assert.rejects(add('first', undefined, empty()), /Check your cart/);
 assert.deepEqual(calls, ['PUT']); assert.deepEqual(events, []);
});

test('stale confirmed selection retries against the other tab latest quantity and name', async () => {
 const stale = { ...empty(), revision: 1, items: [{ id: 'envelope', quantity: 1 }] };
 const latest = { ...empty(), revision: 2, items: [{ id: 'envelope', quantity: 4, personalisation: { mode: 'PRINT', name: 'Latest' } }] };
 const calls = [];
 const { change } = load(async (_url, method, body) => {
  calls.push(method || 'GET'); if (!method) return latest;
  if (body.revision === 1) throw new ApiError('Changed', 409);
  return { ...plain(body), revision: 3 };
 });
 const result = await change('envelope', -1, stale);
 assert.deepEqual(calls, ['PUT', 'GET', 'PUT']);
 assert.deepEqual(plain(result.items), [{ ...latest.items[0], quantity: 3 }]);
});
