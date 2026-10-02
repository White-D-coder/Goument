'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShoppingBag, UserRound, Menu, X, Search, ChevronDown } from 'lucide-react';
import Brand from './Brand';
import { api } from '@/lib/api';
const corporateSiteUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL
 || (process.env.NODE_ENV === 'production' ? 'https://thegourmetgifts.co/' : 'http://localhost:3000/');
export default function Header() {
 const isHome = usePathname() === '/';
 const [count, setCount] = useState(0);
 const [open, setOpen] = useState(false);
 const [isScrolled, setIsScrolled] = useState(false);

 useEffect(() => {
  let active = true;
  let requestId = 0;
  const refresh = () => {
   const currentRequest = ++requestId;
   api<{count:number}>('/auth/gift/count').then(r => {
	if(active && currentRequest === requestId) setCount(r.count);
   }).catch(() => { /* Keep the last confirmed count when the service is unavailable. */ });
  };
  refresh();
  window.addEventListener('b2c-cart-change', refresh);
  return () => {
   active = false;
   window.removeEventListener('b2c-cart-change', refresh);
  };
 }, []);

 useEffect(() => {
  const updateScrollState = () => setIsScrolled(window.scrollY > 40);
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
  return () => window.removeEventListener('scroll', updateScrollState);
 }, []);

 const solidHeader = !isHome || isScrolled;
 const navLeft = [['Shop','/shop'],['Occasions','/#occasions'],['Kids','/shop?search=kids'],['Corporate',corporateSiteUrl],['Our Story','/#our-story']] as const;

 return <><div className="announcement"><div className="announcement-track"><div className="announcement-group"><span>Thoughtfully Curated. Beautifully Presented.</span><span>Good food. Brighter moments.</span></div><div className="announcement-group" aria-hidden="true"><span>Thoughtfully Curated. Beautifully Presented.</span><span>Good food. Brighter moments.</span></div></div></div><header className={`header${isHome ? ' home-header' : ''}${solidHeader ? ' scrolled' : ' hero-transparent'}`}><div className="header-inner"><Brand scrolled={solidHeader}/><nav id="store-navigation" className={open?'nav nav-left open':'nav nav-left'} onKeyDown={e=>{if(e.key==='Escape')setOpen(false);}}>{navLeft.map(([title,href],i)=><Link key={title} href={href} className={title==='Kids'?'nav-kids':undefined} aria-label={title==='Kids'?'Kids':undefined} onClick={()=>setOpen(false)}>{title==='Kids'?<span className="kids-nav-label" aria-hidden="true">{['K','i','d','s'].map(letter=><span key={letter}>{letter}</span>)}</span>:title}{i<4&&<ChevronDown size={12} aria-hidden="true"/>}</Link>)}</nav><div className="nav-actions"><Link className="icon" href="/shop#gift-search" aria-label="Search gifts"><Search size={19}/></Link><Link className="icon" href="/account" aria-label="Your account"><UserRound size={19}/></Link><Link className="icon bag" href="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={19}/>{count>0&&<span>{count}</span>}</Link><button className="icon mobile" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="store-navigation" onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div></div></header></>;
}
