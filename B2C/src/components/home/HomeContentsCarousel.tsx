'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import ProductPhoto from '@/components/ProductPhoto';
import type { ContentsSlide } from '@/lib/home-content';

export default function HomeContentsCarousel({ slides }: { slides: ContentsSlide[] }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = root.current;
    if (!section || slides.length < 2 || interacting || reduceMotion) return;
    let visible = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false;
    const schedule = () => {
      clearTimeout(timer);
      if (!visible || document.hidden) return;
      timer = setTimeout(async () => {
        const next = (active + 1) % slides.length;
        const image = section.querySelectorAll<HTMLImageElement>('.tgg-inside-image img')[next];
        try {
          if (image) image.loading = 'eager';
          await image?.decode();
          if (!disposed && visible && !document.hidden) setActive(next);
        } catch {
          // Keep the current photo and its matching text when a secondary image fails.
        }
      }, 6000);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: .15 });
    observer.observe(section);
    document.addEventListener('visibilitychange', schedule);
    return () => {
      disposed = true;
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', schedule);
    };
  }, [active, interacting, reduceMotion, slides.length]);

  if (!slides.length) return null;
  const move = (direction: -1 | 1) => setActive(index => (index + direction + slides.length) % slides.length);

  return <section className="tgg-contents tgg-section" ref={root} aria-label="What’s inside matters" aria-roledescription="carousel"
    onMouseEnter={() => setInteracting(true)} onMouseLeave={event => setInteracting(event.currentTarget.contains(document.activeElement))}
    onFocusCapture={() => setInteracting(true)} onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(event.currentTarget.matches(':hover'));
    }}>
    <div className="tgg-contents-controls" role="group" aria-label="Hamper contents controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous hamper"><ArrowLeft size={17} aria-hidden="true" /></button>
      <button type="button" onClick={() => move(1)} aria-label="Next hamper"><ArrowRight size={17} aria-hidden="true" /></button>
    </div>
    <div className="tgg-contents-stage">
      {slides.map((slide, index) => <div key={slide.image} className={`tgg-inside tgg-inside-slide${index === active ? ' is-active' : ''}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slides.length}: ${slide.name}`} aria-hidden={index !== active} inert={index !== active}>
        <div className="tgg-inside-image"><ProductPhoto src={slide.image} alt={slide.alt} sizes="(max-width: 700px) 88vw, (max-width: 1400px) 45vw, 600px" /></div>
        <div className="tgg-inside-copy"><p className="tgg-kicker">Shown in the {slide.name}</p><h2>What’s inside matters.</h2>
          <div className="tgg-inside-items">{slide.items.map(item => <div key={item.name}><h3>{item.name}</h3><span>{item.place}</span><p>{item.why}</p></div>)}</div>
          <p className="tgg-small-note">A look at our photographed curation. Confirm the final selection and quantities on enquiry.</p>
          <Link className="tgg-link" href={slide.href}>View the {slide.name.split(' · ')[0]} <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>)}
    </div>
  </section>;
}
