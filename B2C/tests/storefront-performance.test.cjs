const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const ts=require('typescript');

function mount(name,{width=1440,reduced=false}={}){
 const effects=[],states=[],events=new Map(),motionEvents=new Map(),timers=new Map(),frames=new Map();
 let id=0;
 const canvas={hidden:true,width:0,height:0,getContext:()=>new Proxy({}, {get:()=>()=>{}})};
 const motion={matches:reduced,addEventListener:(type,fn)=>motionEvents.set(type,fn),removeEventListener:type=>motionEvents.delete(type)};
 const window={innerWidth:width,innerHeight:900,scrollY:0,matchMedia:()=>motion,addEventListener:(type,fn)=>events.set(type,fn),removeEventListener:type=>events.delete(type)};
 const document={hidden:false,addEventListener:(type,fn)=>events.set(type,fn),removeEventListener:type=>events.delete(type)};
 const react={useRef:()=>({current:canvas}),useEffect:fn=>effects.push(fn),useState:initial=>[initial,value=>states.push(value)]};
 const requestAnimationFrame=fn=>{frames.set(++id,fn);return id;};
 window.requestAnimationFrame=requestAnimationFrame;window.cancelAnimationFrame=value=>frames.delete(value);
 const exports={};
 const source=fs.readFileSync(`src/components/${name}.tsx`,'utf8');
 const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 vm.runInNewContext(compiled,{exports,require:name=>name==='react'?react:name==='react/jsx-runtime'?{jsx:()=>null,jsxs:()=>null}:name==='next/navigation'?{usePathname:()=>'/b2c'}:{},window,document,process:{env:{}},setTimeout:fn=>{timers.set(++id,fn);return id;},clearTimeout:value=>timers.delete(value),requestAnimationFrame,cancelAnimationFrame:value=>frames.delete(value)});
 exports.default();
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
