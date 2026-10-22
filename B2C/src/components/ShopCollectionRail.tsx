'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';

// Tab-local UI positions only. The framework owns URL and page-scroll restoration.
const positions = new Map<string, number>();
const limit = 20;

export default function ShopCollectionRail({ cacheKey, children }: { cacheKey: string; children: ReactNode }) {
  const rail = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const element = rail.current;
    if (!element) return;
    const saved = positions.get(cacheKey);
    if (saved !== undefined) element.scrollLeft = saved;
    else {
      const active = element.querySelector<HTMLElement>('a[aria-current="page"]');
      if (active) {
        const bounds = element.getBoundingClientRect();
        const selected = active.getBoundingClientRect();
        if (selected.left < bounds.left || selected.right > bounds.right) {
          element.scrollLeft += selected.left - bounds.left - (bounds.width - selected.width) / 2;
        }
      }
    }
    const save = () => {
      positions.delete(cacheKey);
      positions.set(cacheKey, element.scrollLeft);
      if (positions.size > limit) positions.delete(positions.keys().next().value!);
    };
    element.addEventListener('scroll', save, { passive: true });
    return () => { save(); element.removeEventListener('scroll', save); };
  }, [cacheKey]);
  return <nav ref={rail} aria-label="Explore collections">{children}</nav>;
}
