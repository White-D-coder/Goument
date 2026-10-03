/* eslint-disable @next/next/no-img-element -- Original local brand artwork. */
import Link from 'next/link';
export default function Brand({ scrolled = false }: { scrolled?: boolean }) {
 return <Link href="/b2c" className={`brand${scrolled ? ' scrolled' : ''}`} aria-label="The Gourmet Gifts home">{scrolled ? <span className="brand-name">The Gourmet Gifts</span> : <img src="/images/brand/LOGOs.svg" width="52" height="52" alt=""/>}</Link>;
}

