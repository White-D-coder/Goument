'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, UserRound, Menu, X, Search, ShieldCheck, House, LayoutGrid } from 'lucide-react';
import Brand from './Brand';
import ShopNavigation from './ShopNavigation';
import { api } from '@/lib/api';
import { User } from '@/lib/types';
import { storefrontNavigation } from '@/lib/storefront-navigation';
import { giftCartItemsFromEvent } from '@/lib/gift-cart-events';
import { readGiftCount } from '@/lib/gift-cart';
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
  let authRequestId = 0;
  const refresh = (event?: Event) => {
   const currentRequest = ++requestId;
   const items = giftCartItemsFromEvent(event);
   if (items) {
    setCount(items.reduce((total, item) => total + item.quantity, 0));
    return;
   }
   // Start the shared read before streamed shopping controls hydrate. Pages
   // without those controls keep the smaller, non-cookie-creating count read.
   const shoppingPage = /^(?:\/$|\/b2c\/?$|\/shop(?:\/|$)|\/products\/)/.test(window.location.pathname);
   readGiftCount(shoppingPage).then(r => {
	if(active && currentRequest === requestId) setCount(r.count);
   }).catch(() => { /* Keep the last confirmed count when the service is unavailable. */ });

  };
  const refreshAuth = () => {
   const currentRequest = ++authRequestId;
   api<{user:User}>('/auth/me').then(r => {
    if(active && currentRequest === authRequestId) {
      const role = r.user?.role?.toLowerCase();
      setIsAdmin(role === 'admin' || role === 'owner');
    }
   }).catch(() => {
    if(active && currentRequest === authRequestId) setIsAdmin(false);
   });
  };
  refresh();
  refreshAuth();
  window.addEventListener('b2c-cart-change', refresh);
  window.addEventListener('b2c-auth-change', refreshAuth);
  return () => {
   active = false;
   window.removeEventListener('b2c-cart-change', refresh);
   window.removeEventListener('b2c-auth-change', refreshAuth);
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
 const navLeft = storefrontNavigation();

  return <><header className={`header${isHome ? ' home-header home-header--editorial' : ''}${solidHeader ? ' scrolled' : ' hero-transparent'}`}><div className="header-inner"><Brand scrolled={solidHeader}/><nav aria-label="Main navigation" id="store-navigation" className={open?'nav nav-left open':'nav nav-left'} onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);menuTrigger.current?.focus();}}}><Link className="mobile-home-link" href="/b2c" aria-current={isHome ? 'page' : undefined} onClick={()=>setOpen(false)}>Home</Link><ShopNavigation key={pathname} onNavigate={()=>setOpen(false)}/>{navLeft.map(([title,href])=><Link key={title} href={href} onClick={()=>setOpen(false)}>{title}</Link>)}<Link href="/account" className="home-account-mobile" onClick={()=>setOpen(false)}>Your account</Link>{isAdmin&&<Link href="/admin" className="admin-nav-mobile" onClick={()=>setOpen(false)}><ShieldCheck size={14} aria-hidden="true"/><span>Admin Operations</span></Link>}</nav><div className="nav-actions">{isAdmin&&<Link className="admin-nav-button" href="/admin" aria-label="Admin Operations Portal" title="Operations Admin Portal"><ShieldCheck size={13} aria-hidden="true"/><span>Admin</span></Link>}<Link className="icon" href="/shop#gift-search" aria-label="Search gifts"><Search size={19}/></Link><Link className="icon account-icon" href="/account" aria-label="Your account"><UserRound size={19}/></Link><Link className="icon bag" href="/cart" aria-label={`Shopping bag, ${count} items`}><ShoppingBag size={19}/>{count>0&&<span>{count}</span>}</Link><button ref={menuTrigger} className="icon mobile" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="store-navigation" onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></div></div></header>
  <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
    <Link href="/b2c" aria-current={isHome ? 'page' : undefined} onClick={()=>setOpen(false)}>
      <span className="mobile-bottom-nav-icon"><House size={21} aria-hidden="true"/></span><span>Home</span>
    </Link>
    <Link href="/shop" aria-current={pathname === '/shop' || pathname.startsWith('/shop/') || pathname.startsWith('/products/') ? 'page' : undefined} onClick={()=>setOpen(false)}>
      <span className="mobile-bottom-nav-icon"><LayoutGrid size={21} aria-hidden="true"/></span><span>Shop</span>
    </Link>
    <Link href="/cart" aria-current={pathname === '/cart' || pathname.startsWith('/cart/') || pathname === '/checkout' ? 'page' : undefined} aria-label={`Cart, ${count} items`} onClick={()=>setOpen(false)}>
      <span className="mobile-bottom-nav-icon"><ShoppingBag size={21} aria-hidden="true"/>{count > 0 && <span className="mobile-bottom-nav-count" aria-hidden="true">{count > 99 ? '99+' : count}</span>}</span><span>Cart</span>
    </Link>
    <Link href="/account" aria-current={pathname === '/account' || pathname.startsWith('/account/') ? 'page' : undefined} onClick={()=>setOpen(false)}>
      <span className="mobile-bottom-nav-icon"><UserRound size={21} aria-hidden="true"/></span><span>Account</span>
    </Link>
  </nav></>;
}
