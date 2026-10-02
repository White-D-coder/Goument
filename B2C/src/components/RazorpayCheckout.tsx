'use client';
import Link from 'next/link';
import { useEffect,useRef,useState } from 'react';
import { api,ApiError } from '@/lib/api';
import { money } from '@/lib/types';
type PaymentResponse={razorpay_order_id:string;razorpay_payment_id:string;razorpay_signature:string};
type Options={key:string;order_id:string;amount:number;currency:string;name:string;description:string;theme:{color:string};handler:(result:PaymentResponse)=>void;modal:{ondismiss:()=>void}};
type RazorpayInstance={open:()=>void;on:(event:string,callback:()=>void)=>void};
declare global {interface Window{Razorpay?:new(options:Options)=>RazorpayInstance}}
type OrderView={configured:boolean;order:{id:string;number:string;status:string;paymentStatus:string;pricing:{grandTotalMinor:number;currency:string};items:{name:string;quantity:number;totalMinor:number}[]}};
let scriptPromise:Promise<void>|null=null;
function loadRazorpay(){
 if(window.Razorpay)return Promise.resolve();
 if(scriptPromise)return scriptPromise;
 scriptPromise=new Promise<void>((resolve,reject)=>{
  const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.async=true;
  const timeout=setTimeout(()=>{script.remove();scriptPromise=null;reject(new Error('Payment window took too long to load. Please retry.'));},15000);
  script.onload=()=>{clearTimeout(timeout);if(window.Razorpay)resolve();else{scriptPromise=null;reject(new Error('Payment window unavailable.'));}};
  script.onerror=()=>{clearTimeout(timeout);script.remove();scriptPromise=null;reject(new Error('Could not load Razorpay. Please check your connection.'));};document.head.appendChild(script);
 });return scriptPromise;
}
export default function RazorpayCheckout({orderId}:{orderId?:string}) {
 const [view,setView]=useState<OrderView|null>(null);const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);const [retry,setRetry]=useState(0);const locked=useRef(false);
 useEffect(()=>{let active=true;if(orderId)api<OrderView>(`/auth/payments/orders/${encodeURIComponent(orderId)}`).then(data=>{if(active)setView(data);}).catch(e=>{if(active){if(e instanceof ApiError&&e.status===401)window.location.replace('/account?next='+encodeURIComponent('/checkout?order='+orderId));else setMessage(e.message);}});return()=>{active=false;};},[orderId,retry]);
 async function refresh(){if(orderId){const next=await api<OrderView>(`/auth/payments/orders/${encodeURIComponent(orderId)}`);setView(next);return next;}}
 async function pay(){
  if(!orderId||locked.current)return;locked.current=true;setBusy(true);setMessage('');
  const finish=()=>{locked.current=false;setBusy(false);};
  try {
   await loadRazorpay();
   const options=await api<{key:string;order_id:string;amount:number;currency:string}>('/auth/payments/razorpay/order','POST',{orderId});
   if(!window.Razorpay)throw new Error('Payment window unavailable.');
   let verifying=false;
   const instance=new window.Razorpay({...options,name:'The Gourmet Gifts',description:`Order ${view?.order.number||''}`,theme:{color:'#4A0404'},handler:result=>{
    verifying=true;setMessage('Verifying your payment…');
    void api<{status:string;message:string}>('/auth/payments/razorpay/verify','POST',{orderId,...result}).then(async result=>{setMessage(result.message);await refresh();}).catch(()=>setMessage('We could not confirm payment yet. Check payment status before trying to pay again.')).finally(finish);
   },modal:{ondismiss:()=>{if(verifying)return;setMessage('Payment window closed. Check status if an amount was debited.');void refresh().catch(()=>{}).finally(finish);}}});
   instance.on('payment.failed',()=>setMessage('Payment was not completed. You can retry in Razorpay or close the window.'));
   instance.open();
  }catch(e){setMessage(e instanceof Error?e.message:'Payment could not be started.');finish();}
 }
 if(!orderId)return <section className="section empty checkout"><p className="eyebrow">YOUR GIFT, THOUGHTFULLY PREPARED</p><h1>A few finishing touches first.</h1><p>Your gift draft is saved. Confirmed prices, stock and delivery charges<br/>are needed before it becomes a payable order.</p><p>Online payment for gift drafts is not available yet.</p><Link className="button" href="/cart">Return to your gift</Link></section>;
 return <section className="section payment-checkout"><p className="eyebrow">SECURE CHECKOUT</p><h1>The final little step.</h1>{message&&<p className="notice" role="status">{message}</p>}{!view?<><p>{message?'Your order could not be loaded.':'Loading your order…'}</p><button className="text-link" onClick={()=>{setMessage('');setRetry(n=>n+1);}}>Retry</button><p><Link href="/account">Sign in to your account</Link></p></>:<>
 <p>Order {view.order.number}</p><div className="payment-order-lines">{view.order.items.map((item,i)=><div key={i}><span>{item.name} × {item.quantity}</span><span>{money(item.totalMinor,view.order.pricing.currency)}</span></div>)}<div><strong>Total</strong><strong>{money(view.order.pricing.grandTotalMinor,view.order.pricing.currency)}</strong></div></div>
 {['PAID','PARTIALLY_REFUNDED','REFUNDED'].includes(view.order.paymentStatus)?<p role="status">Payment status: {view.order.paymentStatus.replaceAll('_',' ').toLowerCase()}.</p>:<><button className="button" disabled={busy||!view.configured||view.order.status!=='PAYMENT_PENDING'} onClick={()=>void pay()}>{busy?'Payment in progress…':`Pay ${money(view.order.pricing.grandTotalMinor,view.order.pricing.currency)} with Razorpay`}</button>{!view.configured&&<p>Online payment is not available yet.</p>}</>}
 <button className="text-link" disabled={busy} onClick={()=>{setMessage('');void refresh().then(v=>setMessage(v?.order.paymentStatus==='PAID'?'Payment verified. Your order is confirmed.':'Current payment status: '+v?.order.paymentStatus.toLowerCase())).catch(()=>setMessage('Unable to check status. Please retry shortly.'));}}>Check payment status</button><Link className="text-link" href="/account">Your account →</Link>
 </>}</section>;
}
