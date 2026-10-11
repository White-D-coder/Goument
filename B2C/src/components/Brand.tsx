/* eslint-disable @next/next/no-img-element -- Original local brand artwork. */
import Link from 'next/link';
export default function Brand({ scrolled = false }: { scrolled?: boolean }) {
 return <Link href="/b2c" className={`brand${scrolled ? ' scrolled' : ''}`} aria-label="The Gourmet Gifts home"><img className="brand-logo" src="/images/brand/gg-logo.webp" width="52" height="52" decoding="async" alt=""/>{scrolled && <span className="brand-name">The Gourmet Gifts</span>}</Link>;
}
