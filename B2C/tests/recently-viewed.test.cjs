const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function compile(file, context) {
  const exports = {};
  const source = fs.readFileSync(path.join(__dirname, '../src', file), 'utf8');
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(compiled, { exports, ...context });
  return exports;
}

function store() {
  const data = new Map(), events = new EventTarget();
  let blocked = false;
  const storage = {
    getItem(key) { if (blocked) throw Error('Storage blocked'); return data.get(key) || null; },
    setItem(key, value) { if (blocked) throw Error('Storage blocked'); data.set(key, value); },
    removeItem(key) { if (blocked) throw Error('Storage blocked'); data.delete(key); },
  };
  const api = compile('lib/recently-viewed.ts', { Event, window: {
    localStorage: storage,
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    dispatchEvent: events.dispatchEvent.bind(events),
  } });
  return { api, data, events, block: () => { blocked = true; } };
}

test('device history is bounded, newest first, deduplicated and contains only slugs', () => {
  const { api, data } = store();
  for (let index = 0; index < 15; index++) api.rememberProduct(`gift-${index}`);
  api.rememberProduct('gift-8');
  const history = JSON.parse(api.recentlyViewedSnapshot());
  assert.equal(history.length, 12);
  assert.equal(history[0], 'gift-8');
  assert.equal(history[1], 'gift-14');
  assert.equal(history.filter(slug => slug === 'gift-8').length, 1);
  assert.deepEqual([...data.keys()], [api.RECENTLY_VIEWED_KEY]);
  assert.ok(history.every(slug => typeof slug === 'string'));
});

test('corrupt, oversized and hostile stored values never become product destinations', () => {
  const { api, data } = store();
  for (const raw of ['{', '{}', 'null', 'x'.repeat(8001)]) {
    data.set(api.RECENTLY_VIEWED_KEY, raw);
    assert.equal(api.recentlyViewedSnapshot(), '[]');
  }
  data.set(api.RECENTLY_VIEWED_KEY, JSON.stringify(['ivory-hamper', 'ivory-hamper', '../account', 'https://example.test', 'javascript:alert(1)', { slug: 'lotus' }, null, 'x'.repeat(161)]));
  assert.deepEqual(JSON.parse(api.recentlyViewedSnapshot()), ['ivory-hamper']);
  api.rememberProduct('../checkout');
  assert.deepEqual(JSON.parse(api.recentlyViewedSnapshot()), ['ivory-hamper']);
});

test('updates and cross-tab clears notify subscribers; unsubscribe and blocked storage are safe', () => {
  const { api, events, block } = store();
  let notifications = 0;
  const unsubscribe = api.subscribeRecentlyViewed(() => { notifications++; });
  api.rememberProduct('ivory-hamper');
  api.rememberProduct('ivory-hamper');
  assert.equal(notifications, 1);
  for (const key of ['other-key', api.RECENTLY_VIEWED_KEY, null]) {
    const event = new Event('storage'); Object.defineProperty(event, 'key', { value: key }); events.dispatchEvent(event);
  }
  assert.equal(notifications, 3);
  assert.equal(api.clearRecentlyViewed(), true);
  assert.equal(api.recentlyViewedSnapshot(), '[]');
  unsubscribe();
  api.rememberProduct('lotus-shagun-envelope');
  assert.equal(notifications, 4);
  block();
  assert.doesNotThrow(() => api.rememberProduct('ivory-hamper'));
  assert.equal(api.recentlyViewedSnapshot(), '[]');
  assert.equal(api.clearRecentlyViewed(), false);
});

function route(productBySlug) {
  const api = compile('lib/recently-viewed.ts', {});
  return compile('app/api/recently-viewed/route.ts', { URL, Response, require: name => {
    if (name === '@/lib/catalogue') return { productBySlug };
    if (name === '@/lib/recently-viewed') return api;
    throw Error(`Unexpected dependency: ${name}`);
  } }).GET;
}

test('public history lookup rejects invalid lists before catalogue access', async () => {
  let calls = 0;
  const get = route(async () => { calls++; return null; });
  for (const slugs of ['', '../account', 'gift?query', 'x'.repeat(161), Array.from({ length: 7 }, (_, i) => `gift-${i}`).join(',')]) {
    const response = await get(new Request(`https://store.test/api/recently-viewed?${new URLSearchParams({ slugs })}`));
    assert.equal(response.status, 400);
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
  }
  assert.equal(calls, 0);
});

test('lookup keeps viewing order, drops unavailable entries, deduplicates aliases and preserves public data', async () => {
  const calls = [];
  const get = route(async slug => {
    calls.push(slug);
    if (slug === 'removed') return null;
    if (slug === 'failed') throw Error('Unavailable');
    return { slug: slug === 'india-hamper' ? 'india-hamper-burgundy' : slug, basePrice: 123400, preview: false };
  });
  const response = await get(new Request('https://store.test/api/recently-viewed?slugs=ivory-hamper,removed,ivory-hamper,failed,india-hamper,india-hamper-burgundy'));
  assert.equal(response.status, 200);
  const { products } = await response.json();
  assert.deepEqual(products.map(product => product.slug), ['ivory-hamper', 'india-hamper-burgundy']);
  assert.equal(calls.length, 5);
  assert.equal(products[0].basePrice, 123400);
  assert.equal(products[0].preview, false);
  assert.equal(response.headers.get('cache-control'), 'private, no-store');
});
