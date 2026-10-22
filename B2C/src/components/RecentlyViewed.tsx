'use client';

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '@/lib/types';
import { clearRecentlyViewed, parseRecentlyViewed, recentlyViewedSnapshot, RECENTLY_VIEWED_REQUEST_LIMIT, rememberProduct, subscribeRecentlyViewed } from '@/lib/recently-viewed';
import './recently-viewed.css';

export function RememberProduct({ slug }: { slug: string }) {
  useEffect(() => { rememberProduct(slug); }, [slug]);
  return null;
}

const emptySnapshot = () => '[]';
type Result = { key: string; products: Product[]; error: boolean };

export default function RecentlyViewed({ currentSlug, className = '' }: { currentSlug?: string; className?: string }) {
  const snapshot = useSyncExternalStore(subscribeRecentlyViewed, recentlyViewedSnapshot, emptySnapshot);
  const slugs = parseRecentlyViewed(snapshot).filter(slug => slug !== currentSlug).slice(0, RECENTLY_VIEWED_REQUEST_LIMIT);
  const key = slugs.join(',');
  const [result, setResult] = useState<Result | null>(null);
  const [retry, setRetry] = useState(0);
  const [clearError, setClearError] = useState(false);
  const [cleared, setCleared] = useState(false);
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const headingId = useId();
  const loaded = result?.key === key;

  useEffect(() => {
    if (!key || !section.current) return;
    const controller = new AbortController();
    let started = false;
    let active = true;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const load = async () => {
      if (started) return;
      started = true;
      timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch(`/api/recently-viewed?${new URLSearchParams({ slugs: key })}`, { signal: controller.signal, cache: 'no-store' });
        if (!response.ok) throw new Error('Unavailable');
        const data = await response.json() as { products: Product[] };
        if (!Array.isArray(data.products)) throw new Error('Invalid catalogue');
        if (active) setResult({ key, products: data.products.filter(product => product.slug !== currentSlug).slice(0, 4), error: false });
      } catch {
        if (active) setResult({ key, products: [], error: true });
      } finally { clearTimeout(timeout); }
    };
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); void load(); }
    }, { rootMargin: '240px' });
    if (observer) observer.observe(section.current);
    else void load();
    return () => { active = false; controller.abort(); clearTimeout(timeout); observer?.disconnect(); };
  }, [key, currentSlug, retry]);

  function clear() {
    if (!clearRecentlyViewed()) { setClearError(true); return; }
    setClearError(false);
    setCleared(true);
    requestAnimationFrame(() => heading.current?.focus());
  }

  if (!key && !cleared) return null;
  if (key && loaded && !result.error && !result.products.length) return null;
  return <section ref={section} className={`recently-viewed ${className}`} aria-labelledby={headingId}>
    <div className="recently-viewed-heading">
      <div><h2 ref={heading} id={headingId} tabIndex={-1}>Recently viewed</h2><p>Pick up where you left off.</p></div>
      {key && <button type="button" className="text-link" onClick={clear}>Clear history</button>}
    </div>
    {clearError && <p role="alert">History could not be cleared. Check your browser’s storage settings and try again.</p>}
    {!key ? <p role="status">Your recently viewed history is cleared on this device.</p>
      : !loaded ? <p className="recently-viewed-status" role="status">Finding your recently viewed gifts…</p>
        : result.error ? <p className="recently-viewed-status" role="status">Your recently viewed gifts could not be loaded. <button className="text-link" type="button" onClick={() => { setResult(null); setRetry(value => value + 1); }}>Try again</button></p>
          : <div className="recently-viewed-grid">{result.products.map(product => <ProductCard key={product.slug} product={product} compact />)}</div>}
  </section>;
}
