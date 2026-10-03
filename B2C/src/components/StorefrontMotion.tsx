'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Progressive enhancement: server-rendered content stays visible without JS. */
export default function StorefrontMotion() {
 const pathname=usePathname();
 useEffect(()=>{
  const root=document.getElementById('main');
  if(!root||!('IntersectionObserver' in window)||!Element.prototype.animate)return;
  const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
  const seen=new WeakSet<Element>();
  const animations=new Map<Element,Animation>();
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
    if(!entry.isIntersecting)continue;
    observer.unobserve(entry.target);
    if(preference.matches||entry.target.contains(document.activeElement))continue;
    const element=entry.target as HTMLElement;
    const animation=element.animate([
     {opacity:0,transform:'translateY(18px)'},
     {opacity:1,transform:'translateY(0)'}
    ],{duration:650,delay:element.dataset.revealDelay ? Number(element.dataset.revealDelay) : element.matches('.box-card,.gift-product-card') ? Array.from(element.parentElement?.children||[]).indexOf(element)%3*65 : 0,easing:'cubic-bezier(0.22, 1, 0.36, 1)',fill:'backwards'});
    animations.set(element,animation);
    animation.onfinish=()=>animations.delete(element);
   }
  },{threshold:0.08,rootMargin:'0px 0px -24px 0px'});
  const scan=()=>root.querySelectorAll('[data-reveal]').forEach(element=>{
   if(seen.has(element))return;
   seen.add(element);observer.observe(element);
  });
  const stop=()=>{if(preference.matches){animations.forEach(a=>a.cancel());animations.clear();}};
  const focus=(event:FocusEvent)=>animations.forEach((animation,element)=>{if(element.contains(event.target as Node)){animation.cancel();animations.delete(element);}});
  scan();
  const mutations=new MutationObserver(scan);mutations.observe(root,{childList:true,subtree:true});
  preference.addEventListener('change',stop);root.addEventListener('focusin',focus);
  return()=>{observer.disconnect();mutations.disconnect();animations.forEach(a=>a.cancel());preference.removeEventListener('change',stop);root.removeEventListener('focusin',focus);};
 },[pathname]);
 return null;
}
