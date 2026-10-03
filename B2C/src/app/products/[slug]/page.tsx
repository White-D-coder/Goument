/* eslint-disable @next/next/no-img-element -- Catalogue images support existing local paths and provider URLs. */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyPanel from '@/components/BuyPanel';
import { productBySlug } from '@/lib/catalogue';
import { productImage } from '@/lib/types';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {const p=await productBySlug((await params).slug);return {title:p?.name||'Gift not found',description:p?.description.short};}
export default async function Detail({params}:{params:Promise<{slug:string}>}) {const p=await productBySlug((await params).slug);if(!p)notFound();return <section className="section product-detail-edit"><Link className="text-link" href="/shop">← Back to the collection</Link><div className="detail"><div className="detail-image"><img src={productImage(p)} alt={p.name}/></div><div><p className="eyebrow">A THOUGHTFUL LITTLE FIND</p><h1>{p.name}</h1><p>{p.description.short}</p><BuyPanel product={p}/><details open><summary>About this gift</summary><p>{p.description.long||p.description.short}</p></details></div></div></section>; }
