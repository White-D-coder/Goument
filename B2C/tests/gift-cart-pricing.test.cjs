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

test('hamper quantity uses paise, adds 18% GST and keeps internal delivery bounds out of the shopper total', () => {
 const value = estimate([{id:'ivory_hamper',quantity:1}],[]);
 assert.deepEqual(plain(value.subtotal),{min:249900,max:249900});
 assert.deepEqual(plain(value.gst),{min:44982,max:44982});
 assert.deepEqual(plain(value.total),{min:294882,max:294882});
 const doubled = estimate([{id:'ivory_hamper',quantity:2}],[]);
 assert.equal(doubled.subtotal.min,499800); assert.equal(doubled.gst.min,89964);
 assert.equal(doubled.total.min,589764);
});

test('candle range scales with quantity and combines with fixed hamper prices', () => {
 const candles = estimate([{id:'laddoo_candles',quantity:2}],[]);
 assert.deepEqual(plain(candles.subtotal),{min:40000,max:100000});
 assert.deepEqual(plain(candles.gst),{min:7200,max:18000});
 assert.deepEqual(plain(candles.total),{min:47200,max:118000});
 const mixed = estimate([{id:'india_hamper_lavender',quantity:1},{id:'laddoo_candles',quantity:2}],[]);
 assert.equal(mixed.subtotal.min,339900); assert.equal(mixed.subtotal.max,399900);
 assert.equal(mixed.gst.min,61182); assert.equal(mixed.total.min,401082);
});

test('unknown items, invalid quantities and unpriced packaging cannot produce a final total', () => {
 for (const rows of [[{id:'bookmarks',quantity:1}],[{id:'ivory_hamper',quantity:-1}],[{id:'ivory_hamper',quantity:100}],[{id:'ivory_hamper',quantity:1.5}]]) {
  const value=estimate(rows,[]); assert.equal(value.total,null);assert.equal(value.incomplete,true);
 }
 const box=estimate([{id:'ivory_hamper',quantity:1}],[],[{id:'box',quantity:1}]);
 assert.equal(box.total,null);assert.equal(box.packagingPending,true);
});

test('empty selection has no delivery charge and currency ranges stay explicit', () => {
 const value=estimate([],[]);assert.deepEqual(plain(value.total),{min:0,max:0});assert.equal(value.delivery.max,0);
 assert.equal(priceRangeLabel({min:20000,max:50000}),'₹200.00–₹500.00');
 assert.equal(priceRangeLabel({min:44982,max:44982}),'₹449.82');
});
