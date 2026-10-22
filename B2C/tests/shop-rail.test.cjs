const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function railModule() {
  let current, effect;
  const exports = {};
  const source = ts.transpileModule(fs.readFileSync('src/components/ShopCollectionRail.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(source, { exports, require: name => {
    if (name === 'react') return { useRef: () => ({ current }), useLayoutEffect: fn => { effect = fn; } };
    if (name === 'react/jsx-runtime') return { jsx: () => null };
    throw Error(`Unexpected dependency ${name}`);
  } });
  return (key, selectedLeft = 20) => {
    const listeners = new Map();
    current = {
      scrollLeft: 0,
      getBoundingClientRect: () => ({ left: 20, right: 355, width: 335 }),
      querySelector: () => ({ getBoundingClientRect: () => ({ left: selectedLeft, right: selectedLeft + 86, width: 86 }) }),
      addEventListener: (name, fn, options) => { assert.equal(options.passive, true); listeners.set(name, fn); },
      removeEventListener: name => listeners.delete(name),
    };
    exports.default({ cacheKey: key, children: null });
    const element = current, cleanup = effect();
    return { element, cleanup, listeners, scroll: left => { element.scrollLeft = left; listeners.get('scroll')(); } };
  };
}

test('returning to the same query restores the rail without sharing other filters, sorts or pages', () => {
  const mount = railModule();
  const original = mount('/shop?search=stationery&sort=price_desc&page=1');
  original.scroll(167); original.cleanup();
  assert.equal(original.listeners.size, 0);
  const otherPage = mount('/shop?search=stationery&sort=price_desc&page=2');
  assert.equal(otherPage.element.scrollLeft, 0); otherPage.cleanup();
  const returned = mount('/shop?search=stationery&sort=price_desc&page=1');
  assert.equal(returned.element.scrollLeft, 167); returned.cleanup();
});

test('a fresh offscreen selection is brought into the rail while visible selections stay put', () => {
  const mount = railModule();
  const visible = mount('/shop', 25);
  assert.equal(visible.element.scrollLeft, 0); visible.cleanup();
  const offscreen = mount('/shop/stationery', 440);
  assert.ok(offscreen.element.scrollLeft > 0); offscreen.cleanup();
});

test('many searches release old rail positions instead of retaining unbounded tab history', () => {
  const mount = railModule();
  const first = mount('/shop?search=first'); first.scroll(150); first.cleanup();
  for (let index = 0; index < 20; index++) { const next = mount('/shop?search=gift-' + index); next.cleanup(); }
  const evicted = mount('/shop?search=first');
  assert.equal(evicted.element.scrollLeft, 0); evicted.cleanup();
});
