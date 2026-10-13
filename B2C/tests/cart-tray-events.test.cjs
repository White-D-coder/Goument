const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm'), ts = require('typescript');
function load() {
 const exports = {}, events = [];
 const compiled = ts.transpileModule(fs.readFileSync('src/lib/gift-cart-events.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 vm.runInNewContext(compiled,{exports,CustomEvent,window:{dispatchEvent:event=>events.push(event)}});
 return { ...exports, events };
}
const draft = () => ({revision:4,boxes:[],items:[{id:'preview-envelope-ep1-pack-10',quantity:2,personalisation:{mode:'PRINT',name:'Example Name'}}],packing:'READY',checkoutAvailable:false});

test('confirmed snapshots update mounted views without opening a tray on cart reads or name-only saves',()=>{
 const api=load(), saved=draft();
 api.publishGiftCart(saved);
 assert.deepEqual(api.events.map(event=>event.type),['b2c-cart-change']);
 assert.equal(api.giftCartDraftFromEvent(api.events[0]),saved);
 assert.equal(api.giftCartDraftFromEvent(api.events[0]).revision,4);
 assert.equal(api.giftCartDraftFromEvent(api.events[0]).items[0].personalisation.name,'Example Name');
 assert.equal(api.giftCartDraftFromEvent(new CustomEvent('b2c-cart-change',{detail:{items:saved.items}})),null);
});

test('only explicit supported additions open a tray, with the confirmed independent pack identity',()=>{
 const api=load(), saved=draft();
 api.announceCartAddition({source:'gift',draft:saved});
 assert.equal(api.events[0].type,'b2c-cart-added');
 assert.equal(api.cartAdditionFromEvent(api.events[0]).draft,saved);
 api.announceCartAddition({source:'store'});
 assert.equal(api.cartAdditionFromEvent(api.events[1]).source,'store');
 for(const detail of [null,{}, {source:'unknown'}, {source:'gift'}, {source:'gift',draft:{...saved,revision:-1}}, {source:'gift',draft:{...saved,items:[{id:'x',quantity:100}]}}]){
  assert.equal(api.cartAdditionFromEvent(new CustomEvent('b2c-cart-added',{detail})),null);
 }
});

test('incomplete or mismatched cart snapshots cannot replace a mounted editable draft revision',()=>{
 const api=load(), saved=draft();
 for(const value of [{...saved,revision:-1},{...saved,revision:0.5},{...saved,boxes:null},{...saved,items:[]}]){
  assert.equal(api.giftCartDraftFromEvent(new CustomEvent('b2c-cart-change',{detail:{items:saved.items,draft:value}})),null);
 }
});
