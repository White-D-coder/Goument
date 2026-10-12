'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import { queueGiftCartWrite } from '@/lib/gift-cart';
import { publishGiftCart } from '@/lib/gift-cart-events';
import type { GiftPersonalisation } from '@/lib/gift-personalisation';
export type Selection = {id:string;quantity:number;personalisation?:GiftPersonalisation};
export type Draft = {revision:number;boxes:Selection[];items:Selection[];packing:'EMPTY'|'CHOOSE_BOX'|'NEEDS_BOXES'|'READY';checkoutAvailable:boolean};
export type GiftBox = {id:string;name:string;subtitle:string;image:string};
export type GiftItem = {id:string;slug?:string;name:string;image:string;description:string;category:string;packSize?:10|20;unitPriceMinor?:number};
export type GiftCatalogue = {boxes:GiftBox[];items:GiftItem[]};
export const giftApi = '/auth/gift';
export function useGiftDraft(selectedBox?:string) {
 const [draft,setDraft]=useState<Draft|null>(null);
 const [catalogue,setCatalogue]=useState<GiftCatalogue|null>(null);
 const [error,setError]=useState('');const [busy,setBusy]=useState(false);const [retry,setRetry]=useState(0);
 const locked=useRef(false);const current=useRef<Draft|null>(null);
 const publish=useCallback((value:Draft)=>{current.current=value;setDraft(value);publishGiftCart(value);},[]);
 useEffect(()=>{
  let active=true;
  async function load() {
   try {
    // Serialize the cookie-creating read as well as the optional box write.
    // A late response from an old page must not replace a newer cart cookie.
    await queueGiftCartWrite(async()=>{
     if(!active)return;
     const [data,choices]=await Promise.all([api<Draft>(`${giftApi}/draft`),api<GiftCatalogue>(`${giftApi}/catalogue`)]);
     if(!active)return;
     setCatalogue(choices);
     if(selectedBox&&!choices.boxes.some(b=>b.id===selectedBox)){publish(data);setError('This box is no longer available. Choose another box.');return;}
     if(selectedBox&&!data.boxes.some(b=>b.id===selectedBox)) {
      // Picking another style keeps the items and replaces the current packaging choice.
      const next=await api<Draft>(`${giftApi}/draft`,'PUT',{revision:data.revision,boxes:[{id:selectedBox,quantity:1}],items:data.items});
      if(active)publish(next);
     } else publish(data);
    });
   }catch(e){if(active)setError(e instanceof Error?e.message:'Unable to load your gift.');}
  }
  void load();return()=>{active=false;};
 },[selectedBox,retry,publish]);
 const save=async(boxes:Selection[],items:Selection[])=>{
  if(locked.current||!current.current)return;
  locked.current=true;setBusy(true);setError('');
  const revision=current.current.revision;
  try {const saved=await queueGiftCartWrite(()=>api<Draft>(`${giftApi}/draft`,'PUT',{revision,boxes,items}));publish(saved);return saved;}
  catch(e){setError(e instanceof Error?e.message:'Unable to save. Please retry.');if(e instanceof ApiError&&e.status===409){try{publish(await queueGiftCartWrite(()=>api<Draft>(`${giftApi}/draft`)));}catch{/* keep last confirmed state */}}}
  finally{locked.current=false;setBusy(false);}
 };
 const change=(kind:'boxes'|'items',id:string,quantity:number)=>{
  const value=current.current;if(!value||locked.current)return;
  // Keep the row under the shopper's finger when its quantity changes.
  const rows=value[kind].flatMap(row=>row.id!==id?[row]:quantity>0?[{...row,quantity}]:[]);
  if(quantity>0&&!value[kind].some(row=>row.id===id))rows.push({id,quantity});
  return save(kind==='boxes'?rows:value.boxes,kind==='items'?rows:value.items);
 };
 const personalise=(id:string,personalisation:GiftPersonalisation)=>{
  const value=current.current;if(!value||!value.items.some(row=>row.id===id))return Promise.resolve(undefined);
  return save(value.boxes,value.items.map(row=>row.id===id?{...row,personalisation}:row));
 };
 return {draft,catalogue,error,busy,change,save,personalise,reload:()=>{setError('');setRetry(n=>n+1);}};
}
