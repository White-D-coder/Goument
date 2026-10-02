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
  const [pending, setPending] = useState<number | null>(null);
  const [photoFailed, setPhotoFailed] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const photos = useRef<(HTMLImageElement | null)[]>([]);
  const request = useRef(0);
  useEffect(() => () => { request.current += 1; }, []);

  async function selectEdit(index: number) {
    const selection = ++request.current;
    setPending(index);
    let failed = false;
    try {
      const image = photos.current[index];
      if (!image) throw new Error('Photo unavailable');
      await image.decode();
    } catch { failed = true; }
    if (selection !== request.current) return;
    setActive(index);
    setPhotoFailed(failed);
    setPending(null);
  }
  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % edits.length
      : event.key === 'ArrowLeft' ? (index + edits.length - 1) % edits.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? edits.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    void selectEdit(next);
    tabs.current[next]?.focus();
  }

  return (
    <section className="curated-features" aria-label="Discover our favourites">
      <div className="curated-showcase" data-reveal>
        <div className="curated-showcase-gallery">
          {edits.map((edit, index) => <img key={edit.id} src={edit.image} alt={edit.alt}
            className={`curated-showcase-photo curated-showcase-photo--${edit.id}${active === index && !photoFailed ? ' is-active' : ''}`}
            ref={element => { photos.current[index] = element; }}
            aria-hidden={active !== index} decoding="async" />)}
          {photoFailed && <p className="curated-showcase-photo-error" role="status">Photo unavailable</p>}
        </div>
        <div className="curated-showcase-details">
          <div className="curated-showcase-intro">
            <p className="curated-showcase-eyebrow">The everyday edit</p>
            <div className="curated-showcase-tabs" role="tablist" aria-label="Explore a collection">
              {edits.map((edit, index) => <button key={edit.id} type="button" role="tab"
                id={`feature-${edit.id}-tab`} aria-controls={`feature-${edit.id}-panel`}
                aria-selected={active === index} tabIndex={active === index ? 0 : -1}
                aria-busy={pending === index || undefined}
                ref={element => { tabs.current[index] = element; }}
                onClick={() => void selectEdit(index)} onKeyDown={event => moveTab(event, index)}>
                <span aria-hidden="true">0{index + 1}</span>{edit.label}
              </button>)}
            </div>
          </div>
          {edits.map((edit, index) => <div key={edit.id} role="tabpanel"
            id={`feature-${edit.id}-panel`} aria-labelledby={`feature-${edit.id}-tab`}
            className="curated-feature-panel" hidden={active !== index}>
            <div className="curated-feature-copy">
              <h2>{edit.title}</h2>
              <p className="curated-feature-description">{edit.description}</p>
              <Link className="curated-feature-action" href={edit.href}>
                {edit.action}<ArrowRight size={18} strokeWidth={1.5} aria-hidden="true"/>
              </Link>
            </div>
          </div>)}
        </div>
      </div>
    </section>
  );
}
