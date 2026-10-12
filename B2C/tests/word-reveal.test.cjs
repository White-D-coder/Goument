const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function mount({ reduced = false, phone = true, visible = false, supported = true } = {}) {
 const animations = [], effects = [], listeners = new Map(), observed = new Set();
 let intersection, disconnects = 0;
 const words = Array.from({ length: 3 }, () => ({ animate: (frames, options) => {
  const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true; this.oncancel?.(); } };
  animations.push(animation); return animation;
 } }));
 const root = { animate: supported, querySelectorAll: () => words };
 const preference = { matches: reduced, addEventListener: (type, fn) => listeners.set(type, fn), removeEventListener: type => listeners.delete(type) };
 class IntersectionObserver {
  constructor(callback) { intersection = callback; }
  observe(element) { observed.add(element); }
  disconnect() { disconnects++; observed.clear(); }
 }
 const exports = {};
 const source = fs.readFileSync('src/hooks/useWordReveal.ts', 'utf8');
 vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
  exports, require: () => ({ useEffect: fn => effects.push(fn), useRef: () => ({ current: root }) }),
  window: { matchMedia: query => query.includes('reduced-motion') ? preference : { matches: phone }, IntersectionObserver }, IntersectionObserver,
 });
 exports.useWordReveal('span', visible, !visible);
 const cleanup = effects[0]();
 return { animations, preference, listeners, observed, cleanup, intersect: () => intersection([{ isIntersecting: true }]), disconnects: () => disconnects };
}

test('phone word reveal retains stagger/easing and cleans unfinished browser animations', () => {
 const app = mount();assert.equal(app.animations.length, 3);
 assert.deepEqual(app.animations.map(a => a.options.delay), [0, 80, 160]);
 assert.ok(app.animations.every(a => a.options.duration === 700 && a.options.easing === 'cubic-bezier(.22, 1, .36, 1)'));
 app.animations[0].onfinish();app.cleanup();
 assert.equal(app.animations[0].cancelled, false);
 assert.ok(app.animations.slice(1).every(a => a.cancelled));assert.equal(app.listeners.size, 0);
});

test('footer reveals only when visible, once per mount, and releases its observer', () => {
 const app = mount({ visible: true });assert.equal(app.animations.length, 0);assert.equal(app.observed.size, 1);
 app.intersect();app.intersect();assert.equal(app.animations.length, 3);assert.equal(app.observed.size, 0);
 app.cleanup();assert.ok(app.disconnects() >= 2);
 const reload = mount({ visible: true });reload.intersect();assert.equal(reload.animations.length, 3);reload.cleanup();
});

test('reduced motion skips decoration and cancels an active reveal when changed', () => {
 const app = mount({ reduced: true });assert.equal(app.animations.length, 0);
 app.preference.matches = false;app.listeners.get('change')();assert.equal(app.animations.length, 3);
 app.preference.matches = true;app.listeners.get('change')();assert.ok(app.animations.every(a => a.cancelled));
 app.preference.matches = false;app.listeners.get('change')();assert.equal(app.animations.length, 3);app.cleanup();
});

test('desktop hero and unsupported animation environments retain static text', () => {
 for (const options of [{ phone: false }, { supported: false }]) {
  const app = mount(options);assert.equal(app.animations.length, 0);assert.equal(app.observed.size, 0);assert.equal(app.listeners.size, 0);
 }
});
