'use client';
import { useEffect,useId,useRef,useState, type ReactNode } from 'react';
import { ArrowLeft,ArrowRight } from 'lucide-react';

export default function ShoppingRail({children,className,label}:{children:ReactNode;className:string;label:string}){
 const id=useId(),track=useRef<HTMLDivElement>(null),progressRef=useRef<HTMLSpanElement>(null);
 const [position,setPosition]=useState({overflow:false,start:true,end:false});
 useEffect(()=>{
  const node=track.current;if(!node)return;
  let ticking=false;
  const update=()=>{
   if(ticking)return;
   ticking=true;
   window.requestAnimationFrame(()=>{
    ticking=false;
    if(!node)return;
    const remaining=node.scrollWidth-node.clientWidth;
    const nextOverflow=remaining>2;
    const nextStart=node.scrollLeft<2;
    const nextEnd=node.scrollLeft>=remaining-2;
    const prog=node.scrollWidth?(node.scrollLeft+node.clientWidth)/node.scrollWidth:1;
    if(progressRef.current){
     progressRef.current.style.transform=`scaleX(${prog})`;
    }
    setPosition(prev=>{
     if(prev.overflow===nextOverflow&&prev.start===nextStart&&prev.end===nextEnd)return prev;
     return {overflow:nextOverflow,start:nextStart,end:nextEnd};
    });
   });
  };
  update();const resize=new ResizeObserver(update);resize.observe(node);
  node.addEventListener('scroll',update,{passive:true});
  return()=>{resize.disconnect();node.removeEventListener('scroll',update);};
 },[]);
 const move=(direction:number)=>{
  const node=track.current;if(!node)return;
  node.scrollBy({left:direction*node.clientWidth*.85,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 };
 return <div className="shopping-rail" data-overflow={position.overflow}>
  <div ref={track} id={id} className={className} aria-label={label} role="region" tabIndex={position.overflow?0:undefined} onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}}}>{children}</div>
  <div className="rail-controls" hidden={!position.overflow}>
   <div className="rail-progress" aria-hidden="true"><span ref={progressRef} style={{transform:'scaleX(0)'}}/></div>
   <button type="button" aria-controls={id} aria-label={`Previous ${label.toLowerCase()}`} disabled={position.start} onClick={()=>move(-1)}><ArrowLeft size={16} strokeWidth={1.4}/></button>
   <button type="button" aria-controls={id} aria-label={`Next ${label.toLowerCase()}`} disabled={position.end} onClick={()=>move(1)}><ArrowRight size={16} strokeWidth={1.4}/></button>
  </div>
 </div>;
}
