const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const cache = new Map();
function load(name) {
 if (cache.has(name)) return cache.get(name);
 const exports = {}; cache.set(name, exports);
 const source = fs.readFileSync(path.join(__dirname, `../src/lib/${name}.ts`), 'utf8');
 vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
  { exports, require: dependency => load(dependency.replace('./','')), process: {env:{}}, Intl });
 return exports;
}
const { estimateGiftCart: estimate, priceRangeLabel } = load('gift-cart-pricing');
const plain = value => JSON.parse(JSON.stringify(value));

test('hamper prices include GST and delivery without added charges at any quantity', () => {
 const value = estimate([{id:'ivory_hamper',quantity:1}],[]);
 assert.deepEqual(plain(value.subtotal),{min:249900,max:249900});
 assert.equal('gst' in value,false); assert.equal('delivery' in value,false);
 assert.deepEqual(plain(value.total),{min:249900,max:249900});
 const doubled = estimate([{id:'ivory_hamper',quantity:2}],[]);
 assert.equal(doubled.subtotal.min,499800); assert.equal(doubled.total.min,499800);
 assert.equal(estimate([{id:'ivory_hamper',quantity:99}],[]).total.min,24740100);
});

test('card candle prices scale with quantity and combine with inclusive hamper prices', () => {
 const candles = estimate([{id:'laddoo_candles',quantity:2}],[]);
 assert.deepEqual(plain(candles.subtotal),{min:59800,max:59800});
 assert.deepEqual(plain(candles.total),{min:59800,max:59800});
 const mixed = estimate([{id:'india_hamper_lavender',quantity:1},{id:'laddoo_candles',quantity:2}],[]);
 assert.equal(mixed.subtotal.min,359700); assert.equal(mixed.subtotal.max,359700);
 assert.deepEqual(plain(mixed.total),{min:359700,max:359700});
});

test('unknown items, invalid quantities and unpriced packaging cannot produce a final total', () => {
 for (const rows of [[{id:'unregistered-item',quantity:1}],[{id:'ivory_hamper',quantity:-1}],[{id:'ivory_hamper',quantity:100}],[{id:'ivory_hamper',quantity:1.5}]]) {
  const value=estimate(rows,[]); assert.equal(value.total,null);assert.equal(value.incomplete,true);
 }
 const box=estimate([{id:'ivory_hamper',quantity:1}],[],[{id:'box',quantity:1}]);
 assert.equal(box.total,null);assert.equal(box.packagingPending,true);
});

test('every registered gift retains its card price in cart totals and quantity edits', () => {
 const items = JSON.parse(fs.readFileSync(path.join(__dirname,'../backend/gifting/items.json'),'utf8'));
 const { productPriceLabel } = load('product-pricing');
 for (const item of items) {
  for (const quantity of [1,2,99]) {
   const value=estimate([{id:item.id,quantity}],items),line=value.lines[0];
   assert.ok(line.unit,item.id);assert.equal(line.unit.min,line.unit.max);
   assert.equal(priceRangeLabel(line.unit),productPriceLabel({slug:item.slug,preview:true,basePrice:0,currency:'INR'}),item.slug);
   assert.equal(line.total.min,line.unit.min*quantity);assert.equal(value.total.min,line.total.min);assert.equal(value.incomplete,false);
   assert.deepEqual(plain(estimate([{id:item.id,quantity}],[]).total),plain(value.total),item.id+' ID fallback');
  }
 }
 const mixed=estimate([{id:'preview-envelope-ep1',quantity:2,personalisation:{mode:'PRINT',name:'Example'}},{id:'laddoo_candles',quantity:1},{id:'bookmarks',quantity:1}],items);
 assert.deepEqual(plain(mixed.total),{min:84600,max:84600});
});

test('empty selection totals zero and inclusive currency ranges stay explicit', () => {
 const value=estimate([],[]);assert.deepEqual(plain(value.total),{min:0,max:0});assert.equal('delivery' in value,false);
 assert.equal(priceRangeLabel({min:20000,max:50000}),'₹200.00–₹500.00');
 assert.equal(priceRangeLabel({min:44982,max:44982}),'₹449.82');
});
