/* eslint-disable @next/next/no-img-element -- Existing signature box asset. */
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Search, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { catalogue } from '@/lib/catalogue';
import './shop.css';
export const metadata = { title: 'The collection' };
const edits = [['All gifts',''],['Envelopes','envelope'],['Hampers','hamper'],['Laddoo Candles','candles'],['Premium Stationery','stationery']] as const;
export default async function Shop({searchParams}:{searchParams:Promise<{search?:string;sort?:string;page?:string}>}) {
 const params=await searchParams;
 const search=typeof params.search==='string'?params.search.trim():'';
 const sort=['newest','price_asc','price_desc'].includes(params.sort||'')?params.sort!:'newest';
 const page=Math.max(1,Number.parseInt(params.page||'1',10)||1);
 const data=await catalogue(search,sort,page);
 const href=(p:number)=>`/shop?${new URLSearchParams({search,sort:data.preview?'newest':sort,page:String(p)})}`;
 return <section className="section shop shop-edit">
  <nav className="shop-breadcrumb" aria-label="Breadcrumb"><Link href="/b2c">Home</Link><span>/</span><span aria-current="page">The collection</span></nav>
  <header className="shop-intro" data-reveal>
   <div className="shop-intro-copy">
    <p className="eyebrow">THOUGHTFULLY CHOSEN</p>
    <h1>Small things.<br/><em>Beautifully given.</em></h1>
    <p className="shop-intro-description">Find their favourites. Make a gift that feels like them.</p>
    <Link className="shop-intro-action" href="/build">Build your gift <ArrowRight size={15} aria-hidden="true"/></Link>
   </div>
   <div className="shop-intro-visual">
    <img src="/images/brand/hero-curated-gifts.jpeg" alt="The Gourmet Gifts Co. curated artisanal collection" width={1254} height={1254}/>
   </div>
  </header>
  <div className="shop-catalogue-layout"><aside className="shop-collections"><p className="eyebrow">EXPLORE THE EDIT</p><nav aria-label="Explore collections">{edits.map(([label,query])=><Link key={label} href={query?`/shop?search=${encodeURIComponent(query)}`:'/shop'} aria-current={search===query?'page':undefined}>{label}<ArrowRight size={13}/></Link>)}</nav><Link className="shop-all-boxes" href="/build">Curate your gift <ArrowRight size={14}/></Link></aside>
  <div className="shop-results"><form id="gift-search" className="shop-toolbar" action="/shop"><label className="shop-search"><Search size={17} strokeWidth={1.4}/><span className="shop-sr-only">Search the collection</span><input type="search" name="search" defaultValue={search} placeholder="Find something lovely…"/><button type="submit" aria-label="Search gifts"><ArrowRight size={18}/></button></label>{!data.preview&&<div className="shop-sort"><label htmlFor="shop-sort">Sort by</label><select id="shop-sort" name="sort" defaultValue={data.preview?'newest':sort} disabled={data.preview}><option value="newest">Latest additions</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option></select>{!data.preview&&<button type="submit" className="text-link">Apply</button>}</div>}</form>
  <div className="shop-results-meta"><p>{data.total} {data.total===1?'find':'finds'}{search&&<> for <strong>“{search}”</strong></>}</p>{search&&<Link href="/shop" className="shop-clear">Clear search <X size={13}/></Link>}{data.preview&&<span>Collection preview · pricing coming soon</span>}</div>
  {data.products.length?<div className="product-grid shop-product-grid">{data.products.map(p=><ProductCard key={p._id} product={p} compact/>)}</div>:<div className="shop-empty"><p className="eyebrow">A DIFFERENT LITTLE SOMETHING</p><h2>No matches this time.</h2><p>Try another search, or take a look through the full collection.</p><Link href="/shop" className="text-link">Explore all gifts <ArrowRight size={16}/></Link></div>}
  {data.pages>1&&<nav className="shop-pagination" aria-label="Catalogue pages">{page>1?<Link href={href(page-1)}><ArrowLeft size={16}/> Previous</Link>:<span/>}<span>{page} / {data.pages}</span>{page<data.pages?<Link href={href(page+1)}>Next <ArrowRight size={16}/></Link>:<span/>}</nav>}
  {data.preview&&<p className="shop-preview-note">Browsing for now. You can save a personal gift draft by <Link href="/build">curating your gift</Link>; prices, stock and online ordering are not available yet.</p>}
  </div></div>
 </section>;
}
