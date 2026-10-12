const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(fetch, method = 'catalogue') {
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
  return module('catalogue')[method];
}

test('stationery includes bookmarks and diary sets; envelopes and candles remain separate offline', async () => {
  const catalogue = load(async () => { throw new Error('Offline'); });
  for (const search of ['stationery', 'Premium Stationeries']) {
    const data = await catalogue(search);
    assert.deepEqual(Array.from(data.products.slice(0, 2), product => product._id), ['bookmarks', 'diary_bottle_pen_set']);
    assert.equal(data.total, 4);
    assert.equal(data.products.filter(p => /envelope|shagun/i.test(p.slug+' '+p.name)).length, 0);
  }
  assert.equal((await catalogue('shagun')).products.length, 9);
  assert.ok((await catalogue('shagun')).products.every(p => p.slug !== 'shagun-envelopes'));
  assert.equal((await catalogue('candles')).total, 3);
});

test('merged API results include later pages, deduplicate and sort before pagination', async () => {
  const calls = [];
  const products = Array.from({ length: 14 }, (_, index) => ({ _id: `item-${index}`, name: `Item ${index}`, basePrice: (index + 1) * 100 }));
  const catalogue = load(async url => {
    const query = new URL(url).searchParams;
    const term = query.get('search'), page = Number(query.get('page'));
    calls.push(`${term}:${page}`);
    const rows = term === 'bookmarks' ? products.slice((page - 1) * 12, page * 12) : [products[0], { _id: 'diary', name: 'Diary', basePrice: 2000 }, { _id: 'envelope', slug: 'lotus-shagun-envelope', name: 'Lotus Shagun Envelope' }];
    return { ok: true, json: async () => ({ products: rows, pages: term === 'bookmarks' ? 2 : 1 }) };
  });
  const data = await catalogue('stationery', 'price_desc', 2);
  assert.equal(data.total, 17);
  assert.equal(data.pages, 2);
  assert.deepEqual(Array.from(data.products.slice(0, 3), product => product._id), ['item-2', 'item-1', 'item-0']);
  assert.ok(calls.includes('bookmarks:2'));
  assert.ok(calls.includes('corporate:1'));
});

test('ordinary searches preserve API pagination and a failed merged source uses complete local selection', async () => {
  const catalogue = load(async url => {
    const query = new URL(url).searchParams;
    if (query.get('search') === 'corporate') return { ok: false };
    return { ok: true, json: async () => ({ products: [{ _id: 'envelope', name: 'Envelope' }], pages: 4, total: 40 }) };
  });
  const ordinary = await catalogue('unrelated', 'newest', 3);
  assert.equal(ordinary.total, 40);
  assert.equal(ordinary.pages, 4);
  const merged = await catalogue('stationery', 'price_asc');
  assert.equal(merged.total, 4);
  assert.deepEqual(Array.from(merged.products, product => product._id), ['bookmarks', 'vibrant_art_bookmarks', 'wanderlust_bookmarks', 'diary_bottle_pen_set']);
});

test('outages and missing commercial fields never invent saleable prices or stock',async()=>{
 const offline=await load(async()=>{throw Error('Offline');})('stationery');assert.equal(offline.preview,true);assert.ok(offline.products.every(p=>p.preview&&p.basePrice===0&&p.inventory===0));
 const result=await load(async()=>({ok:true,json:async()=>({products:[{_id:'fixture',name:'Unpriced'}],pages:1,total:1})}))('test');assert.equal(result.products[0].preview,true);assert.equal(result.products[0].basePrice,0);assert.equal(result.products[0].inventory,0);
});
test('stationery requests share one deadline and reject excessive page fanout',async()=>{
 const signals=[];const data=await load(async(_url,options)=>{signals.push(options.signal);return {ok:true,json:async()=>({products:[],pages:99})};})('stationery');assert.equal(data.preview,true);assert.equal(signals.length,2);assert.ok(signals.every(signal=>signal===signals[0]));
});


test('a backend outage has a short public-data cooldown; invalid requests cannot trip it',async()=>{
 let failures=0;const offline=load(async()=>{failures++;throw Error('Backend unavailable');});await offline('shagun');await offline('bookmarks');assert.equal(failures,1);
 let requests=0;const invalid=load(async()=>{requests++;return {ok:false,status:400};});await invalid('invalid');await invalid('shagun');assert.equal(requests,2);
});

test('India colours have separate listing identities, matching photos and working legacy links', async () => {
 const offline = async () => { throw Error('Offline'); };
 const catalogue = load(offline), productBySlug = load(offline, 'productBySlug');
 const colours = (await catalogue('India hamper')).products;
 assert.deepEqual(Array.from(colours, p => p.giftItemId), ['india_hamper_burgundy','india_hamper_lavender']);
 assert.equal((await catalogue('hampers')).total, 3);
 for (const colour of ['burgundy','lavender']) {
  const listed = (await catalogue(colour)).products;
  assert.equal(listed.length, 1);
  const product = await productBySlug(`india-hamper-${colour}`);
  assert.equal(product.giftItemId, `india_hamper_${colour}`);
  assert.equal(product.images.length, 1);
  assert.equal(product.images[0].public_id, `/images/brand/${colour}_india_hamper.webp`);
  assert.equal(product.preview, true); assert.equal(product.basePrice, 0);
 }
 assert.equal((await productBySlug('india-hamper')).giftItemId, 'india_hamper_burgundy');
});

test('supplied envelope designs list once, preserve galleries and map distinct draft selections', async () => {
 const offline = async () => { throw Error('Offline'); };
 const catalogue = load(offline), productBySlug = load(offline, 'productBySlug');
 const collection = await catalogue('envelope');
 const designs = collection.products.filter(p => p._id.startsWith('preview-envelope-'));
 assert.equal(designs.length, 9); assert.equal(collection.total, 9);
 assert.equal(new Set(designs.map(p => p.slug)).size, 9);
 const photos = [];
 for (const design of designs) {
  const detail = await productBySlug(design.slug);
  assert.equal(detail.preview, true); assert.equal(detail.basePrice, 0); assert.equal(detail.inventory, 0); assert.equal(detail.giftItemId, detail._id);
  const entry = require('../backend/gifting/items.json').find(item => item.id === detail.giftItemId);
  assert.equal(entry?.slug, detail.slug); assert.equal(entry?.image, detail.images[0].public_id);
  for (const image of detail.images) {
   assert.ok(fs.existsSync(path.join(__dirname, '../public', image.public_id)));
   photos.push(image.public_id);
  }
 }
 assert.equal(photos.length, 13); assert.equal(new Set(photos).size, 13);
 assert.deepEqual(Array.from((await productBySlug('lotus-shagun-envelope')).images, i => i.public_id), ['/images/envelopes/ep1_3.webp','/images/envelopes/ep1.webp','/images/envelopes/ep1_1.webp','/images/envelopes/ep1_2.webp']);
 assert.equal((await productBySlug('baraat-shagun-envelope')).images.length, 2);
 assert.equal((await catalogue('teddy bear')).products[0].slug, 'teddy-bear-shagun-envelope');
 const first = await catalogue(), second = await catalogue('', 'newest', 2);
 assert.equal(first.total, 19); assert.equal(first.products.length, 12); assert.equal(second.products.length, 7);
 assert.equal(new Set([...first.products, ...second.products].map(p => p.slug)).size, 19);
});

test('live catalogue merging preserves remote entries and paginates new photo previews without duplicates', async () => {
 const remote = [{_id:'remote',slug:'existing-remote-gift',name:'Existing Gift'}, {_id:'remote-envelope',slug:'lotus-shagun-envelope',name:'Lotus Shagun Envelope'}];
 const catalogue = load(async () => ({ok:true,json:async()=>({products:remote,pages:1,total:2})}));
 const first=await catalogue(), second=await catalogue('', 'newest', 2);
 const all=[...first.products,...second.products];
 assert.equal(first.total,18);assert.equal(first.products.length,12);assert.equal(second.products.length,6);
 assert.equal(all.filter(p=>p.slug==='lotus-shagun-envelope').length,1);
 assert.ok(all.some(p=>p.slug==='existing-remote-gift'));
});

test('retired generic envelope card stays out of API and fallback listings while its direct URL remains valid', async () => {
 const remote={_id:'shagun_envelopes',slug:'shagun-envelopes',name:'Luxury Shagun Envelopes'};
 const fetch=async()=>({ok:true,json:async()=>({products:[remote],pages:1,total:1})});
 const catalogue=load(fetch);
 for(const search of ['', 'envelope', 'stationery', 'Luxury']) {
  const result=await catalogue(search);
  assert.ok(result.products.every(p=>p.slug!=='shagun-envelopes'));
 }
 const detail=await load(async()=>{throw Error('Offline');},'productBySlug')('shagun-envelopes');
 assert.equal(detail.giftItemId,'shagun_envelopes');
});


test('supplied candle photos form three designs with matching details and preserved Laddoo identity', async () => {
 const offline = async () => { throw Error('Offline'); };
 const catalogue = load(offline), detail = load(offline, 'productBySlug');
 const candles = await catalogue('candles');
 assert.equal(candles.total, 3);
 assert.equal(new Set(candles.products.map(p => p.slug)).size, 3);
 for (const [slug, views] of [['floral-jar-candle',['cn1','cn1.1']],['himalayan-dusk-candle',['cn2','cn2.1']],['laddoo-candles',['cn3-supplied']]]) {
  const product = await detail(slug);
  assert.equal(product.preview, true); assert.equal(product.basePrice, 0);
  assert.deepEqual(Array.from(product.images, i => i.public_id), views.map(view => `/images/scented_candle/${view}.webp`));
  for (const photo of product.images) assert.ok(fs.existsSync(path.join(__dirname, '../public', photo.public_id)));
  assert.equal(product.giftItemId, slug === 'laddoo-candles' ? 'laddoo_candles' : `preview-candle-${slug}`);
  const entry = require('../backend/gifting/items.json').find(item => item.id === product.giftItemId);
  assert.equal(entry?.slug, slug); assert.equal(entry?.image, product.images[0].public_id);
 }
 assert.equal((await catalogue('Himalayan')).products[0].slug,'himalayan-dusk-candle');
});

test('Laddoo photos update online without replacing existing commercial fields', async () => {
 const remote = {_id:'remote-laddoo',slug:'laddoo-candles',name:'Artisanal Laddoo Candles',basePrice:45000,inventory:8};
 const fetch = async () => ({ok:true,json:async()=>({products:[remote],...remote,pages:1,total:1})});
 const collection = await load(fetch)('candles');
 assert.equal(collection.total, 3);
 const product = await load(fetch,'productBySlug')('laddoo-candles');
 assert.equal(product.giftItemId,'laddoo_candles');assert.equal(product.basePrice,45000);assert.equal(product.inventory,8);assert.equal(product.preview,false);
 assert.equal(product.images[0].public_id,'/images/scented_candle/cn3-supplied.webp');
});


test('new bookmark designs are distinct cards in stationery/search/all gifts and retain online prices', async () => {
 const offline=async()=>{throw Error('Offline');};
 const collection=load(offline), detail=load(offline,'productBySlug');
 const stationery=await collection('stationery');
 assert.equal(stationery.total,4);
 for(const [slug,id,image] of [['vibrant-art-bookmarks','vibrant_art_bookmarks','vibrant-art.webp'],['wanderlust-bookmarks','wanderlust_bookmarks','wanderlust-desk.webp']]) {
  assert.equal(stationery.products.filter(p=>p.slug===slug).length,1);
  const p=await detail(slug); assert.equal(p.giftItemId,id);assert.equal(p.images[0].public_id,'/images/bookmarks/'+image);
  assert.ok(fs.existsSync(path.join(__dirname,'../public',p.images[0].public_id)));
  assert.equal((await collection(slug.split('-')[0])).products[0].slug,slug);
  const remote={_id:'remote-'+id,slug,name:p.name,basePrice:42000,inventory:7};
  const online=await load(async()=>({ok:true,json:async()=>({data:remote})}),'productBySlug')(slug);
  assert.equal(online.basePrice,42000);assert.equal(online.inventory,7);assert.equal(online.preview,false);assert.equal(online.images[0].public_id,p.images[0].public_id);
 }
 const remote={_id:'remote-vibrant',slug:'vibrant-art-bookmarks',name:'Vibrant Art Bookmarks',basePrice:42000,inventory:7};
 const online=await load(async()=>({ok:true,json:async()=>({products:[remote],pages:1,total:1})}))('stationery');
 assert.equal(online.products.filter(p=>p.slug===remote.slug).length,1);
 assert.equal(online.products.find(p=>p.slug===remote.slug).basePrice,42000);
 assert.ok(online.products.some(p=>p.slug==='wanderlust-bookmarks'));
});
