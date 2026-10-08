'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

const shopCategories = [
  { title: 'Envelopes', search: 'envelope' },
  { title: 'Hampers', search: 'hamper' },
  { title: 'Laddoo Candles', search: 'candles' },
  { title: 'Premium Stationery', search: 'stationery' },
] as const;

export default function ShopNavigation({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!expanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [expanded]);

  return (
    <div
      className="shop-navigation"
      ref={container}
      onPointerEnter={event => {
        if (event.pointerType !== 'touch') setExpanded(true);
      }}
      onPointerLeave={event => {
        if (event.pointerType !== 'touch' && !event.currentTarget.contains(document.activeElement)) setExpanded(false);
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
      }}
      onKeyDown={event => {
        if (event.key === 'Escape' && expanded) {
          event.preventDefault();
          event.stopPropagation();
          setExpanded(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="shop-navigation-trigger"
        aria-expanded={expanded}
        aria-controls="shop-collections-navigation"
        onClick={() => setExpanded(value => window.matchMedia('(hover: hover)').matches ? true : !value)}
      >
        Shop <ChevronDown size={12} aria-hidden="true" />
      </button>
      <div id="shop-collections-navigation" className="shop-navigation-panel" hidden={!expanded}>
        {shopCategories.map(category => (
          <Link
            key={category.search}
            href={`/shop?search=${encodeURIComponent(category.search)}`}
            onClick={() => {
              setExpanded(false);
              onNavigate();
            }}
          >
            {category.title} <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  );
}
