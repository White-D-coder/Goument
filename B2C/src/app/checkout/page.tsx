import DeliveryCheckout from '@/components/DeliveryCheckout';
import RazorpayCheckout from '@/components/RazorpayCheckout';
export const metadata={title:'Checkout',robots:{index:false,follow:false}};
export default async function Checkout({searchParams}:{searchParams:Promise<{order?:string}>}) {const {order}=await searchParams;return order?<RazorpayCheckout orderId={order}/>:<DeliveryCheckout/>;}
