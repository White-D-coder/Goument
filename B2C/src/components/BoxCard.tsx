/* eslint-disable @next/next/no-img-element -- Existing local box photography. */
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function BoxCard({box}:{box:{id:string;name:string;subtitle:string;image:string}}) {
 return <Link data-reveal className="box-card" href={`/build?box=${encodeURIComponent(box.id)}`}><div className="box-photo"><img src={box.image} alt={box.name} loading="lazy"/></div><div className="box-card-copy"><div><h3>{box.name}</h3><p>{box.subtitle}</p></div><span className="box-card-arrow" aria-label="Select box"><ArrowUpRight size={20} strokeWidth={1.2}/></span></div></Link>;
}
