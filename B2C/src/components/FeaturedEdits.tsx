'use client';

/* eslint-disable @next/next/no-img-element -- Preserve the existing catalogue photography. */
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const edits = [
  {
    id: 'candles',
    label: 'Laddoo Candles',
    title: 'Artisanal Laddoo Candles',
    description: 'Festive motichoor laddoo candles in a gold silk-lined gift box.',
    image: '/images/items/laddoo_candles.webp',
    alt: 'Handcrafted motichoor laddoo shaped candles',
    href: '/products/laddoo-candles',
    action: 'Shop Laddoo Candles',
  },
  {
    id: 'shagun',
    label: 'Shagun Envelopes',
    title: 'Luxury Shagun Envelopes',
    description: 'Gold-foiled festive celebratory envelopes on handmade paper.',
    image: '/images/items/shagun_envelopes.webp',
    alt: 'Luxury shagun envelopes with auspicious motifs',
    href: '/products/shagun-envelopes',
    action: 'Explore Envelopes',
  },
  {
    id: 'corporate',
    label: 'Premium Stationery',
    title: 'Diary, Bottle & Pen Set',
    description: 'Executive journal, insulated bottle & pen with custom logo branding.',
    image: '/images/items/sustainable_diary_bottle_pen.webp',
    alt: 'Executive diary bottle and pen set with custom branding',
    href: '/shop?search=stationery',
    action: 'Explore Stationery',
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
