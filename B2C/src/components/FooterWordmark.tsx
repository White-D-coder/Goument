'use client';

import Link from 'next/link';
import { useWordReveal } from '@/hooks/useWordReveal';

/** frontend_appview's rise/blur/stagger, with readable static HTML. */
export default function FooterWordmark({ className }: { className: string }) {
  const scope = useWordReveal<HTMLAnchorElement>('span', true);

  return <Link ref={scope} className={className} href="/b2c" aria-label="The Gourmet Gifts home">
    {['THE', 'GOURMET', 'GIFTS'].map(word => <span key={word}>{word}</span>)}
  </Link>;
}
