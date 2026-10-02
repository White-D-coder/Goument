'use client';
import { useEffect,useId,useRef,useState, type ReactNode } from 'react';
import { ArrowLeft,ArrowRight } from 'lucide-react';

export default function ShoppingRail({children,className,label}:{children:ReactNode;className:string;label:string}){
 const id=useId(),track=useRef<HTMLDivElement>(null);
 const [position,setPosition]=useState({overflow:false,start:true,end:false,progress:0});
 useEffect(()=>{
  const node=track.current;if(!node)return;
  const update=()=>{
   const remaining=node.scrollWidth-node.clientWidth;
   setPosition({overflow:remaining>2,start:node.scrollLeft<2,end:node.scrollLeft>=remaining-2,progress:node.scrollWidth?(node.scrollLeft+node.clientWidth)/node.scrollWidth:1});
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
   <div className="rail-progress" aria-hidden="true"><span style={{transform:`scaleX(${position.progress})`}}/></div>
   <button type="button" aria-controls={id} aria-label={`Previous ${label.toLowerCase()}`} disabled={position.start} onClick={()=>move(-1)}><ArrowLeft size={16} strokeWidth={1.4}/></button>
   <button type="button" aria-controls={id} aria-label={`Next ${label.toLowerCase()}`} disabled={position.end} onClick={()=>move(1)}><ArrowRight size={16} strokeWidth={1.4}/></button>
  </div>
 </div>;
}
