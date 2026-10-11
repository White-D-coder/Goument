const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(fetch) {
  const cache = new Map();
  function module(name) {
    if (name === 'server-only') return {};
    if (cache.has(name)) return cache.get(name);
    const exports = {};
    cache.set(name, exports);
    const source = fs.readFileSync(path.join(__dirname, `../src/lib/${name}.ts`), 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    vm.runInNewContext(compiled, { exports, require: dependency => module(dependency.replace('./', '')), fetch, process: { env: {} }, URLSearchParams, AbortSignal });
    return exports;
  }
  return module('catalogue').catalogue;
}

test('stationery includes envelopes, bookmarks and diary sets; candles remain separate offline', async () => {
  const catalogue = load(async () => { throw new Error('Offline'); });
  for (const search of ['stationery', 'Premium Stationeries']) {
    const data = await catalogue(search);
    assert.deepEqual(Array.from(data.products, product => product._id), ['shagun_envelopes', 'bookmarks', 'diary_bottle_pen_set']);
    assert.equal(data.total, 3);
  }
  assert.deepEqual(Array.from((await catalogue('shagun')).products, product => product._id), ['shagun_envelopes']);
  assert.deepEqual(Array.from((await catalogue('candles')).products, product => product._id), ['laddoo_candles']);
});

test('merged API results include later pages, deduplicate and sort before pagination', async () => {
  const calls = [];
  const products = Array.from({ length: 14 }, (_, index) => ({ _id: `item-${index}`, name: `Item ${index}`, basePrice: (index + 1) * 100 }));
  const catalogue = load(async url => {
    const query = new URL(url).searchParams;
    const term = query.get('search'), page = Number(query.get('page'));
    calls.push(`${term}:${page}`);
    const rows = term === 'shagun' ? products.slice((page - 1) * 12, page * 12) : term === 'bookmarks' ? [products[0]] : [{ _id: 'diary', name: 'Diary', basePrice: 2000 }];
    return { ok: true, json: async () => ({ products: rows, pages: term === 'shagun' ? 2 : 1 }) };
  });
  const data = await catalogue('stationery', 'price_desc', 2);
  assert.equal(data.total, 15);
  assert.equal(data.pages, 2);
  assert.deepEqual(Array.from(data.products, product => product._id), ['item-2', 'item-1', 'item-0']);
  assert.ok(calls.includes('shagun:2'));
  assert.ok(calls.includes('corporate:1'));
});

test('ordinary searches preserve API pagination and a failed merged source uses complete local selection', async () => {
  const catalogue = load(async url => {
    const query = new URL(url).searchParams;
    if (query.get('search') === 'corporate') return { ok: false };
    return { ok: true, json: async () => ({ products: [{ _id: 'envelope', name: 'Envelope' }], pages: 4, total: 40 }) };
  });
  const ordinary = await catalogue('shagun', 'newest', 3);
  assert.equal(ordinary.total, 40);
  assert.equal(ordinary.pages, 4);
  const merged = await catalogue('stationery', 'price_asc');
  assert.equal(merged.total, 3);
  assert.deepEqual(Array.from(merged.products, product => product._id), ['bookmarks', 'shagun_envelopes', 'diary_bottle_pen_set']);
});

test('outages and missing commercial fields never invent saleable prices or stock',async()=>{
 const offline=await load(async()=>{throw Error('Offline');})('stationery');assert.equal(offline.preview,true);assert.ok(offline.products.every(p=>p.preview&&p.basePrice===0&&p.inventory===0));
 const result=await load(async()=>({ok:true,json:async()=>({products:[{_id:'fixture',name:'Unpriced'}],pages:1,total:1})}))('test');assert.equal(result.products[0].preview,true);assert.equal(result.products[0].basePrice,0);assert.equal(result.products[0].inventory,0);
});
test('stationery requests share one deadline and reject excessive page fanout',async()=>{
 const signals=[];const data=await load(async(_url,options)=>{signals.push(options.signal);return {ok:true,json:async()=>({products:[],pages:99})};})('stationery');assert.equal(data.preview,true);assert.equal(signals.length,3);assert.ok(signals.every(signal=>signal===signals[0]));
});


test('a backend outage has a short public-data cooldown; invalid requests cannot trip it',async()=>{
 let failures=0;const offline=load(async()=>{failures++;throw Error('Backend unavailable');});await offline('shagun');await offline('bookmarks');assert.equal(failures,1);
 let requests=0;const invalid=load(async()=>{requests++;return {ok:false,status:400};});await invalid('invalid');await invalid('shagun');assert.equal(requests,2);
});
