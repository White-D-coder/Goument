import { Minus,Plus } from 'lucide-react';
export default function QuantityControl({name,value,onChange,disabled=false}:{name:string;value:number;onChange:(value:number)=>void;disabled?:boolean}) {
 return <div className="gift-counter" aria-label={`${name} quantity`}><button type="button" disabled={disabled||value===0} aria-label={`Remove one ${name}`} onClick={()=>onChange(value-1)}><Minus size={15}/></button><output aria-live="polite">{value}</output><button type="button" disabled={disabled||value>=99} aria-label={`Add one ${name}`} onClick={()=>onChange(value+1)}><Plus size={15}/></button></div>;
}
