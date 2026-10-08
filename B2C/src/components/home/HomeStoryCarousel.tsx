'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function HomeStoryCarousel({ children, action }: { children: ReactNode; action?: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [canMove, setCanMove] = useState({ previous: false, next: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;

    const updateControls = () => setCanMove({
      previous: element.scrollLeft > 2,
      next: element.scrollLeft + element.clientWidth < element.scrollWidth - 2,
    });

    updateControls();
    element.addEventListener('scroll', updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(element);
    return () => {
      element.removeEventListener('scroll', updateControls);
      observer.disconnect();
    };
  }, []);

  const move = (direction: -1 | 1) => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector<HTMLElement>('.tgg-gourmet-story');
    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 24;
    const amount = card ? card.getBoundingClientRect().width + gap : element.clientWidth;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollBy({ left: direction * amount, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return <div className="tgg-story-carousel">
    <div className="tgg-story-carousel-toolbar">
      {action}
      <div className="tgg-story-carousel-controls" role="group" aria-label="Flavour story controls">
      <button type="button" onClick={() => move(-1)} disabled={!canMove.previous} aria-label="Previous flavour story"><ArrowLeft size={17} aria-hidden="true" /></button>
      <button type="button" onClick={() => move(1)} disabled={!canMove.next} aria-label="Next flavour story"><ArrowRight size={17} aria-hidden="true" /></button>
      </div>
    </div>
    <div className="tgg-gourmet-grid" ref={track} role="region" aria-label="Regional flavour stories" tabIndex={0}>
      {children}
    </div>
  </div>;
}
