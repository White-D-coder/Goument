'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { stagger, useAnimate, useInView, useReducedMotion } from 'framer-motion';

/** frontend_appview's rise/blur/stagger, with readable static HTML. */
export default function FooterWordmark({ className }: { className: string }) {
  const [scope, animate] = useAnimate<HTMLAnchorElement>();
  const inView = useInView(scope, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const animation = animate('span', {
      opacity: [0, 1], y: [24, 0], scale: [.98, 1], filter: ['blur(10px)', 'blur(0px)'],
    }, { duration: .7, ease: [.22, 1, .36, 1], delay: stagger(.08) });
    return () => animation.cancel();
  }, [animate, inView, reduceMotion]);

  return <Link ref={scope} className={className} href="/b2c" aria-label="The Gourmet Gifts home">
    {['THE', 'GOURMET', 'GIFTS'].map(word => <span key={word}>{word}</span>)}
  </Link>;
}
