'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, UserRound, Menu, X, Search, ChevronDown, ShieldCheck } from 'lucide-react';
import Brand from './Brand';
import ShopNavigation from './ShopNavigation';
import { api } from '@/lib/api';
import { User } from '@/lib/types';
const corporateSiteUrl = process.env.NEXT_PUBLIC_CORPORATE_SITE_URL
 || (process.env.NODE_ENV === 'production' ? 'https://thegourmetgifts.co/' : 'http://localhost:3000/');
export default function Header() {
 const pathname = usePathname();
 const isHome = pathname === '/' || pathname === '/b2c';
 const [count, setCount] = useState(0);
 const [open, setOpen] = useState(false);
 const menuTrigger = useRef<HTMLButtonElement>(null);
 const [isScrolled, setIsScrolled] = useState(false);
 const [isAdmin, setIsAdmin] = useState(false);

 useEffect(() => {
  let active = true;
  let requestId = 0;
  const refresh = () => {
   const currentRequest = ++requestId;
   api<{count:number}>('/auth/gift/count').then(r => {
	if(active && currentRequest === requestId) setCount(r.count);
   }).catch(() => { /* Keep the last confirmed count when the service is unavailable. */ });

   api<{user:User}>('/auth/me').then(r => {
    if(active && currentRequest === requestId) {
      const role = r.user?.role?.toLowerCase();
      setIsAdmin(role === 'admin' || role === 'owner');
    }
   }).catch(() => {
    if(active && currentRequest === requestId) setIsAdmin(false);
   });
  };
  refresh();
  window.addEventListener('b2c-cart-change', refresh);
  return () => {
   active = false;
   window.removeEventListener('b2c-cart-change', refresh);
  };
 }, []);

 useEffect(() => {
  let frame: number | undefined;
  let lastScrolled = false;
  const updateScrollState = () => {
   if (frame === undefined) {
    frame = window.requestAnimationFrame(() => {
     const scrolled = window.scrollY > 40;
     if (scrolled !== lastScrolled) {
      lastScrolled = scrolled;
      setIsScrolled(scrolled);
     }
     frame = undefined;
    });
   }
  };
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
  return () => {
   window.removeEventListener('scroll', updateScrollState);
   if (frame !== undefined) window.cancelAnimationFrame(frame);
  };
 }, []);

 const solidHeader = !isHome || isScrolled;
 const navLeft = isHome
  ? [['Hampers','/b2c#hampers'],['Collections','/shop'],['Corporate',process.env.NEXT_PUBLIC_CORPORATE_SITE_URL || 'https://thegourmetgifts.co/']]
  : [['Hampers','/b2c#hampers'],['Corporate',corporateSiteUrl],['Our Story','/b2c#our-story']];

  return <header className={`header${isHome ? ' home-header home-header--editorial' : ''}${solidHeader ? ' scrolled' : ' hero-transparent'}`}><div className="header-inner"><Brand scrolled={solidHeader}/><nav id="store-navigation" className={open?'nav nav-left open':'nav nav-left'} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);if(isHome)menuTrigger.current?.focus();}}}><ShopNavigation key={pathname} onNavigate={()=>setOpen(false)}/>{navLeft.map(([title,href],i)=><Link key={title} href={href} onClick={()=>setOpen(false)}>{title}{!isHome&&i<2&&<ChevronDown size={12} aria-hidden="true"/>}</Link>)}{isHome&&<Link href="/account" className="home-account-mobile" onClick={()=>setOpen(false)}>Your account</Link>}{isAdmin&&<Link href="/admin" className="admin-nav-mobile" onClick={()=>setOpen(false)}><ShieldCheck size={14} aria-hidden="true"/><span>Admin Operations</span></Link>}</nav><div className="nav-actions">{isAdmin&&<Link className="admin-nav-button" href="/admin" aria-label="Admin Operations Portal" title="Operations Admin Portal"><ShieldCheck size={13} aria-hidden="true"/><span>Admin</span></Link>}<Link className="icon" href="/shop#gift-search" aria-label="Search gifts"><Search size={19}/></Link><Link className="icon account-icon" href="/account" aria-label="Your account"><UserRound size={19}/></Link><Link className="icon bag" href="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={19}/>{count>0&&<span>{count}</span>}</Link><button ref={menuTrigger} className="icon mobile" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="store-navigation" onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div></div></header>;
}
