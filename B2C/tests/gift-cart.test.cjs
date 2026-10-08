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
 const exports = {}, events = [];
 const source = fs.readFileSync(path.join(__dirname, '../src/lib/gift-cart.ts'), 'utf8');
 const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
 vm.runInNewContext(compiled, { exports, require: name => { assert.equal(name, './api'); return { api, ApiError }; }, window: { dispatchEvent: e => events.push(e.type) }, Event });
 return { add: exports.addGiftItem, change: exports.changeGiftItemQuantity, waitForAdditions: exports.waitForGiftCartAdditions, beforeSignIn: exports.waitForGiftCartBeforeSignIn, queueWrite: exports.queueGiftCartWrite, events };
}

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
 const preview = fs.readFileSync(path.join(__dirname, '../src/lib/catalogue-preview.ts'), 'utf8');
 const ids = [...preview.matchAll(/_id:\s*['"]([^'"]+)['"]/g)].map(match => match[1]);
 const items = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/gifting/items.json'), 'utf8'));
 assert.equal(new Set(ids).size, ids.length);
 assert.deepEqual(ids.sort(), items.map(item => item.id).sort());
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
