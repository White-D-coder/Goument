const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');

const eventExports={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/gift-cart-events.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:eventExports});

function mount(name,{width=1440,reduced=false,api,cart,props={}}={}){
 const effects=[],states=[],events=new Map(),motionEvents=new Map(),timers=new Map(),frames=new Map();
 let id=0;
 const canvas={hidden:true,width:0,height:0,getContext:()=>new Proxy({}, {get:()=>()=>{}})};
 const motion={matches:reduced,addEventListener:(type,fn)=>motionEvents.set(type,fn),removeEventListener:type=>motionEvents.delete(type)};
 const window={innerWidth:width,innerHeight:900,scrollY:0,matchMedia:()=>motion,addEventListener:(type,fn)=>events.set(type,fn),removeEventListener:type=>events.delete(type)};
 const document={hidden:false,addEventListener:(type,fn)=>events.set(type,fn),removeEventListener:type=>events.delete(type)};
 const react={useRef:initial=>({current:initial===null?canvas:initial}),useEffect:fn=>effects.push(fn),useState:initial=>[initial,value=>states.push(value)]};
 const requestAnimationFrame=fn=>{frames.set(++id,fn);return id;};
 window.requestAnimationFrame=requestAnimationFrame;window.cancelAnimationFrame=value=>frames.delete(value);
 const exports={};
 const source=fs.readFileSync(`src/components/${name}.tsx`,'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(compiled,{exports,require:name=>name==='react'?react:name==='react/jsx-runtime'?{jsx:()=>null,jsxs:()=>null}:name.includes('storefront-navigation')?{storefrontNavigation:()=>[]}:name==='@/lib/api'?{api}:name==='@/lib/gift-cart-events'?eventExports:name==='@/lib/gift-cart'?cart:name==='next/navigation'?{usePathname:()=>'/b2c',useRouter:()=>({})}:{},window,document,process:{env:{}},setTimeout:fn=>{timers.set(++id,fn);return id;},clearTimeout:value=>timers.delete(value),requestAnimationFrame,cancelAnimationFrame:value=>frames.delete(value)});
 exports.default(props);
 return {effects,states,events,motion,motionEvents,window,canvas,timers,frames,flush:()=>{const queued=[...frames.values()];frames.clear();queued.forEach(fn=>fn());}};
}

test('header only sets React scroll state when crossing the threshold and cancels queued work',()=>{
 const app=mount('Header');const cleanup=app.effects[1]();app.flush();
 assert.equal(app.states.length,0);
 app.window.scrollY=80;
 for(let count=0;count<30;count++){app.events.get('scroll')();app.flush();}
 assert.deepEqual(app.states,[true]);
 app.window.scrollY=0;app.events.get('scroll')();app.flush();
 assert.deepEqual(app.states,[true,false]);
 app.events.get('scroll')();cleanup();
 assert.equal(app.frames.size,0);assert.equal(app.events.has('scroll'),false);
});

test('cart changes refresh the badge without repeating auth checks; sign-in/out still refresh access',async()=>{
 const requests=[];
 let role='owner';
 const app=mount('Header',{api:async path=>{
  requests.push(path);
  if(path==='/auth/me') { if(!role)throw new Error('Signed out');return {user:{role}}; }
  return {count:3};
 }});
 const cleanup=app.effects[0]();
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(requests.filter(path=>path==='/auth/me').length,1);
 assert.ok(app.states.includes(true));
 for(let i=0;i<5;i++)app.events.get('b2c-cart-change')();
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(requests.filter(path=>path==='/auth/me').length,1);
 assert.equal(requests.filter(path=>path==='/auth/gift/count').length,6);
 role=null;app.events.get('b2c-auth-change')();
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(requests.filter(path=>path==='/auth/me').length,2);
 assert.equal(app.states.at(-1),false);
 cleanup();
 assert.equal(app.events.has('b2c-auth-change'),false);
 assert.equal(app.events.has('b2c-cart-change'),false);
});

test('confirmed cart event updates the badge without fetching and supersedes an older count response',async()=>{
 let release;const requests=[];
 const app=mount('Header',{api:path=>{requests.push(path);return path.endsWith('/count')?new Promise(resolve=>{release=resolve;}):Promise.resolve({user:null});}});
 const cleanup=app.effects[0]();
 app.events.get('b2c-cart-change')(new CustomEvent('b2c-cart-change',{detail:{items:[{id:'ivory',quantity:4},{id:'india',quantity:2}]}}));
 assert.equal(app.states.at(-1),6);
 release({count:0});await new Promise(resolve=>setImmediate(resolve));
 assert.equal(app.states.filter(value=>typeof value==='number').at(-1),6);
 assert.equal(requests.filter(path=>path.endsWith('/count')).length,1);
 app.events.get('b2c-cart-change')(new CustomEvent('b2c-cart-change',{detail:{items:[]}}));
 assert.equal(app.states.at(-1),0);cleanup();
});

test('mounted purchase control consumes confirmed selections and ignores a stale initial read',async()=>{
 let release,reads=0;
 const app=mount('AddGiftToCartButton',{props:{itemId:'ivory',name:'Ivory'},cart:{readGiftDraft:()=>{reads++;return new Promise(resolve=>{release=resolve;});}}});
 const cleanup=app.effects[0]();
 app.events.get('b2c-cart-change')(new CustomEvent('b2c-cart-change',{detail:{items:[{id:'ivory',quantity:3},{id:'india',quantity:2}]}}));
 assert.equal(app.states.at(-1),3);
 release({items:[]});await new Promise(resolve=>setImmediate(resolve));
 assert.equal(app.states.at(-1),3);assert.equal(reads,1);
 app.events.get('b2c-cart-change')(new CustomEvent('b2c-cart-change',{detail:{items:[]}}));
 assert.equal(app.states.at(-1),0);
 app.events.get('b2c-cart-change')(new Event('b2c-cart-change'));assert.equal(reads,2);
 cleanup();release({items:[{id:'ivory',quantity:8}]});await new Promise(resolve=>setImmediate(resolve));assert.equal(app.states.at(-1),0);
});

test('malformed cart event detail falls back to a server refresh',async()=>{
 const requests=[];const app=mount('Header',{api:async path=>{requests.push(path);return path.endsWith('/count')?{count:0}:{user:null};}});
 const cleanup=app.effects[0]();
 for(const items of [null,[{id:'ivory',quantity:-1}],[{id:'ivory',quantity:100}],[{id:'ivory',quantity:1.5}]])app.events.get('b2c-cart-change')(new CustomEvent('b2c-cart-change',{detail:{items}}));
 await new Promise(resolve=>setImmediate(resolve));assert.equal(requests.filter(path=>path.endsWith('/count')).length,5);cleanup();
});

test('desktop sprinkle releases canvas memory and animation work after its timer',()=>{
 const app=mount('GoldPopperSprinkle');const cleanup=app.effects[0]();
 assert.equal(app.canvas.hidden,false);assert.equal(app.canvas.width,1440);assert.ok(app.frames.size>0);
 [...app.timers.values()][0]();
 assert.equal(app.canvas.hidden,true);assert.equal(app.canvas.width,0);assert.equal(app.canvas.height,0);assert.equal(app.frames.size,0);
 cleanup();assert.equal(app.motionEvents.size,0);assert.equal(app.events.size,0);
});

test('mobile and reduced-motion sprinkle do not allocate a canvas or start animation',()=>{
 for(const options of [{width:390},{reduced:true}]){
  const app=mount('GoldPopperSprinkle',options);app.effects[0]();
  assert.equal(app.canvas.hidden,true);assert.equal(app.canvas.width,0);assert.equal(app.frames.size,0);assert.equal(app.timers.size,0);
 }
});

test('changing reduced-motion preference stops an active sprinkle',()=>{
 const app=mount('GoldPopperSprinkle');const cleanup=app.effects[0]();
 app.motion.matches=true;app.motionEvents.get('change')();
 assert.equal(app.canvas.hidden,true);assert.equal(app.canvas.width,0);assert.equal(app.frames.size,0);cleanup();
});
