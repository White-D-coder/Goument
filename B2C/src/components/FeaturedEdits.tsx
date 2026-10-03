'use client';

/* eslint-disable @next/next/no-img-element -- Preserve the existing catalogue photography. */
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const edits = [
  {
    id: 'gourmet',
    label: 'Gourmet',
    title: 'Gourmet Special',
    description: 'Artisanal treats, made to be savoured.',
    image: '/images/pics/thekuap.png',
    alt: 'Traditional golden thekua treats',
    href: '/shop?search=gourmet',
    action: 'Shop Gourmet',
  },
  {
    id: 'candles',
    label: 'Candles',
    title: 'Scented Candles',
    description: 'A little calm for everyday moments.',
    image: '/images/pics/candles.png',
    alt: 'Scented candle gift collection',
    href: '/shop?search=candles',
    action: 'Explore Candles',
  },
  {
    id: 'paper',
    label: 'Paper',
    title: 'Personalised Paper',
    description: 'Everyday notes, made personal.',
    image: '/images/infinity/Premium_Industry_Notebooks.jpg',
    alt: 'Personalised notebooks and thoughtful stationery',
    href: '/shop?search=stationery',
    action: 'Shop Stationery',
  },
];

export default function FeaturedEdits() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  // Automatically cycle through cards smoothly and slowly (every 4.5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % edits.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  function handleSelect(index: number) {
    setActive(index);
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % edits.length
      : event.key === 'ArrowLeft' ? (index + edits.length - 1) % edits.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? edits.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    handleSelect(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="curated-features" aria-label="Discover our favourites">
      <div className="curated-showcase" data-reveal>
        <div className="curated-showcase-gallery">
          {edits.map((edit, index) => (
            <img
              key={edit.id}
              src={edit.image}
              alt={edit.alt}
              className={`curated-showcase-photo curated-showcase-photo--${edit.id}${active === index ? ' is-active' : ''}`}
              aria-hidden={active !== index}
              loading="eager"
            />
          ))}
        </div>
        <div className="curated-showcase-details">
          <div className="curated-showcase-intro">
            <p className="curated-showcase-eyebrow">The everyday edit</p>
            <div className="curated-showcase-tabs" role="tablist" aria-label="Explore a collection">
              {edits.map((edit, index) => (
                <button
                  key={edit.id}
                  type="button"
                  role="tab"
                  id={`feature-${edit.id}-tab`}
                  aria-controls={`feature-${edit.id}-panel`}
                  aria-selected={active === index}
                  tabIndex={active === index ? 0 : -1}
                  ref={element => { tabs.current[index] = element; }}
                  onClick={() => handleSelect(index)}
                  onKeyDown={event => moveTab(event, index)}
                >
                  <span aria-hidden="true">0{index + 1}</span>{edit.label}
                </button>
              ))}
            </div>
          </div>
          {edits.map((edit, index) => (
            <div
              key={edit.id}
              role="tabpanel"
              id={`feature-${edit.id}-panel`}
              aria-labelledby={`feature-${edit.id}-tab`}
              className="curated-feature-panel"
              hidden={active !== index}
            >
              <div className="curated-feature-copy">
                <h2>{edit.title}</h2>
                <p className="curated-feature-description">{edit.description}</p>
                <Link className="curated-feature-action" href={edit.href}>
                  {edit.action}
                  <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
