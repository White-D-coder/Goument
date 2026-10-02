import GiftCart from '@/components/GiftCart';
import Link from 'next/link';
export default function Cart(){return <><GiftCart/><p className="legacy-cart-link"><Link href="/cart/store">View store product bag →</Link></p></>;}
