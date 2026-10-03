/* eslint-disable @next/next/no-img-element -- Original local brand artwork. */
import Link from 'next/link';

export default function Brand({ scrolled = false }: { scrolled?: boolean }) {
  return (
    <Link href="/b2c" className={`brand${scrolled ? ' scrolled' : ''}`} aria-label="The Gourmet Gifts home">
      <img src="/images/brand/LOGOs.svg" width="48" height="48" alt="The Gourmet Gifts logo" className="brand-logo-img" />
      <span className="brand-name">The Gourmet Gifts</span>
    </Link>
  );
}
