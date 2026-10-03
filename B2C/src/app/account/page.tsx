'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { ShieldCheck, ArrowRight, Sparkles, Gift } from 'lucide-react';
import { api } from '@/lib/api';
import { waitForGiftCartBeforeSignIn } from '@/lib/gift-cart';
import { User, money } from '@/lib/types';
function checkoutReturn(){const next=new URLSearchParams(window.location.search).get('next');return next&&(next==='/admin'||/^\/checkout(?:\?order=[a-f0-9]{24})?$/.test(next))?next:null;}
type Order = {
  _id: string;
  orderNumber?: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
};

export default function Account(){
 const signInLocked=useRef(false);
 const mounted=useRef(false);
 useEffect(()=>{mounted.current=true;return()=>{mounted.current=false;};},[]);
 const [savingCart,setSavingCart]=useState(false);
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const [signup,setSignup]=useState(false);const [error,setError]=useState('');const [busy,setBusy]=useState(false);const [orders,setOrders]=useState<Order[]>([]);const [page,setPage]=useState(1);const [cursors,setCursors]=useState<(string|null)[]>([null]);const [nextCursor,setNextCursor]=useState<string|null>(null);const [googleEnabled,setGoogleEnabled]=useState(false);const [historyError,setHistoryError]=useState('');
 useEffect(()=>{const errors:Record<string,string>={unavailable:'Google sign-in is not configured yet.',expired:'Sign-in expired. Please try again.',cancelled:'Google sign-in was cancelled.',existing:'This email already has an account. Use your existing sign-in method.',failed:'Google sign-in could not be completed. Please try again.',busy:'Sign-in is busy. Please try again shortly.'};const code=new URLSearchParams(window.location.search).get('authError');if(code){const next=checkoutReturn();window.history.replaceState({},'', '/account'+(next?'?next='+encodeURIComponent(next):''));}let active=true;api<{googleEnabled:boolean}>('/auth/config').then(r=>{if(active)setGoogleEnabled(r.googleEnabled);}).catch(()=>{}).finally(()=>{if(active&&code)setError(errors[code]||'Unable to sign in.');});return()=>{active=false;};},[]);
 useEffect(()=>{let active=true;api<{user:User}>('/auth/me').then(async r=>{
  if(!active)return;
  setUser(r.user);
  const next=checkoutReturn();
  if(next){
   try{await waitForGiftCartBeforeSignIn();if(active)window.location.replace(next);}
   catch(e){if(active)setError(e instanceof Error?e.message:'Please review your cart before continuing.');}
  }
 }).catch(()=>{}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);
 useEffect(()=>{if(!user)return;let active=true;api<{orders:Order[];next:string|null}>(`/auth/orders${cursors[page-1]?'?after='+encodeURIComponent(cursors[page-1]!):''}`).then(r=>{if(active){setOrders(r.orders);setNextCursor(r.next);setHistoryError('');}}).catch(e=>{if(active)setHistoryError(e.message);});return()=>{active=false;};},[user,page,cursors]);
 async function prepareSignIn(){setSavingCart(true);try{await waitForGiftCartBeforeSignIn();}finally{if(mounted.current)setSavingCart(false);}}
 async function googleSignIn(){
  if(signInLocked.current)return;
  signInLocked.current=true;setError('');setBusy(true);
  try{await prepareSignIn();if(!mounted.current)return;const next=checkoutReturn();window.location.assign('/api/v1/auth/google'+(next?'?next='+encodeURIComponent(next):''));}
  catch(e){if(mounted.current){setError(e instanceof Error?e.message:'Unable to start sign-in.');setBusy(false);}signInLocked.current=false;}
 }
 async function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();if(signInLocked.current)return;signInLocked.current=true;setError('');setBusy(true);const form=new FormData(e.currentTarget);try{await prepareSignIn();if(!mounted.current)return;await api(signup?'/auth/register':'/auth/login','POST',{email:form.get('email'),password:form.get('password'),...(signup?{name:form.get('name')}:{})});const profile=await api<{user:User}>('/auth/me');if(!mounted.current)return;const next=checkoutReturn();if(next){await waitForGiftCartBeforeSignIn();if(mounted.current)window.location.assign(next);return;}setUser(profile.user);window.dispatchEvent(new Event('b2c-cart-change'));}catch(e){if(mounted.current)setError(e instanceof Error?e.message:'Unable to sign in.');}finally{if(mounted.current)setBusy(false);signInLocked.current=false;}}
 async function logout(){setBusy(true);setError('');try{await api('/auth/logout','POST',{});setUser(null);setOrders([]);setPage(1);setCursors([null]);setNextCursor(null);window.dispatchEvent(new Event('b2c-cart-change'));}catch(e){setError(e instanceof Error?e.message:'Unable to sign out.');}finally{setBusy(false);}}
 const isPrivileged = Boolean(user && ['admin', 'owner'].includes(user.role?.toLowerCase()));
 if(loading)return <section className="section empty" role="status">Loading your account…</section>;
 return <section className="section account-page">{user?<><div className="section-heading"><div><p className="eyebrow">YOUR GOURMET ACCOUNT</p><h1>Hello, {user.name}.</h1><p>{user.email}</p>{isPrivileged&&<div className="admin-account-badge"><ShieldCheck size={13} aria-hidden="true"/><span>Operations Staff ({user.role.toUpperCase()})</span></div>}</div><div className="account-heading-actions"><Link href="/shop" className="account-explore-cta"><Sparkles size={13} aria-hidden="true"/><span>Explore Gifts</span></Link>{isPrivileged&&<Link href="/admin" className="button button-admin-panel" id="admin-panel-link"><ShieldCheck size={15} aria-hidden="true"/><span>Admin Portal →</span></Link>}<button className="text-link account-signout" disabled={busy} onClick={logout}>Sign out</button></div></div>{error&&<p role="alert" className="notice">{error}</p>}<h2>Your orders</h2>{historyError?<p role="alert" className="notice">{historyError}</p>:orders.length?<>
  <div className="orders-table">
    <div className="orders-table-header" role="row">
      <span>Order #</span>
      <span>Date</span>
      <span>Status</span>
      <span>Total</span>
      <span>Action</span>
    </div>
    <div className="orders-table-body">
      {orders.map(order => (
        <article key={order._id} className="orders-table-row" role="row">
          <div className="order-cell order-ref" data-label="Order #">
            <strong>{order.orderNumber || `#${order._id.slice(-8).toUpperCase()}`}</strong>
          </div>
          <div className="order-cell order-date" data-label="Date">
            <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div className="order-cell order-status" data-label="Status">
            <span className={`status-badge status-${order.status.toLowerCase().replace(/_/g, '-')}`}>
              {order.status === 'PAYMENT_PENDING' ? 'Payment Pending' :
               order.status === 'CONFIRMED' ? 'Confirmed' :
               order.status === 'PROCESSING' ? 'Processing' :
               order.status === 'SHIPPED' ? 'Shipped' :
               order.status === 'DELIVERED' ? 'Delivered' :
               order.status.replace(/_/g, ' ')}
            </span>
          </div>
          <div className="order-cell order-total" data-label="Total">
            <strong>{money(order.total, order.currency)}</strong>
          </div>
          <div className="order-cell order-action" data-label="Action">
            {order.status === 'PAYMENT_PENDING' ? (
              <Link className="order-cta-btn order-cta-pay" href={`/checkout?order=${order._id}`}>
                <span>Review & Pay</span>
                <ArrowRight size={13} className="cta-arrow" aria-hidden="true" />
              </Link>
            ) : (
              <Link className="order-cta-btn order-cta-view" href={`/checkout?order=${order._id}`}>
                <span>View Details</span>
                <ArrowRight size={13} className="cta-arrow" aria-hidden="true" />
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  </div>
  <div className="pagination"><button disabled={page<=1} onClick={()=>setPage(page-1)}>Previous</button><span>Page {page}</span><button disabled={!nextCursor} onClick={()=>{setCursors(prev=>[...prev.slice(0,page),nextCursor]);setPage(page+1);}}>Next</button></div>
 </>:<div className="account-empty-state"><div className="empty-state-badge"><Gift size={24} strokeWidth={1.5} aria-hidden="true"/></div><h3>Your gift journey begins here</h3><p>You haven’t placed any gift orders yet. Discover our artisanal delicacies, bespoke celebration hampers, and handcrafted keepsakes.</p><Link href="/shop" className="button button-empty-cta"><span>Browse Gift Collection</span><ArrowRight size={14} aria-hidden="true"/></Link></div>}</>:<div className="auth-layout"><div className="auth-intro-text"><p className="eyebrow">A LITTLE MORE PERSONAL</p><h1>Your gifts.<br/><em>Your little corner.</em></h1><p>Sign in to keep your order history close.</p></div><form className="auth-form" onSubmit={submit}><h2>{signup?'Create your account':'Welcome back'}</h2><button type="button" className="google-signin" disabled={!googleEnabled||busy} aria-busy={busy} onClick={()=>void googleSignIn()}><svg aria-hidden="true" width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.78-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>{savingCart?'Saving your cart…':'Continue with Google'}</button>{!googleEnabled&&<p className="auth-help">Google sign-in is currently unavailable. You can use email below.</p>}<div className="auth-divider"><span>or continue with email</span></div>{signup&&<label>Your name<input name="name" autoComplete="name" required maxLength={100}/></label>}<label>Email address<input name="email" type="email" autoComplete="email" required/></label><label>Password<input name="password" type="password" autoComplete={signup?'new-password':'current-password'} minLength={signup?12:1} required/></label>{error&&<p role="alert" className="notice">{error}</p>}<button className="button" disabled={busy}>{savingCart?'Saving your cart…':busy?'Please wait…':signup?'Create account':'Sign in'}</button><button type="button" className="text-link" disabled={busy} onClick={()=>{setSignup(!signup);setError('');}}>{signup?'Already have an account? Sign in':'New here? Create an account'}</button></form></div>}</section>;
}

