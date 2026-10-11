'use client';

import { useEffect, useRef, useState } from 'react';
import ProductPhoto from '@/components/ProductPhoto';

const slides = [
  {
    src: '/images/brand/home-hero-1.webp',
    alt: 'The Gourmet Gifts curated boxes with gourmet treats and keepsakes',
  },
  {
    src: '/images/brand/home-hero-2.webp',
    alt: 'The India Hamper in burgundy with regional treats',
  },
  {
    src: '/images/brand/home-hero-3.webp',
    alt: 'The India Hamper in lavender with thoughtfully selected gifts',
  },
];

export default function HomeHeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ready, setReady] = useState<number[]>([]);
  const [requested, setRequested] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState<number[]>([]);
  const visual = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = true;
    let timer: number | undefined;
    const update = () => {
      window.clearInterval(timer);
      timer = undefined;
      if (visible && !document.hidden && !motionPreference.matches && ready.length > 1 && requested === null) {
        timer = window.setInterval(() => setActiveIndex(index => {
          const order = [...ready].sort((a, b) => a - b);
          return order.find(next => next > index) ?? order[0];
        }), 5200);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {visible=entry.isIntersecting;update();});
    if (visual.current) observer.observe(visual.current);
    motionPreference.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    update();
    return () => {window.clearInterval(timer);observer.disconnect();motionPreference.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
  }, [ready, requested]);

  return (
    <div ref={visual} className="tgg-hero-visual" aria-label="Featured gifts" aria-roledescription="carousel">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`tgg-hero-slide${index === activeIndex ? ' is-active' : ''}`}
          aria-hidden={index !== activeIndex}
        >
          <ProductPhoto
            src={slide.src}
            alt={slide.alt}
            sizes="(max-width: 760px) 100vw, 54vw"
            priority={index === 0 || index === requested}
            onReady={() => {
              setReady(current => current.includes(index) ? current : [...current, index]);
              if (index === requested || unavailable.includes(activeIndex)) { setActiveIndex(index); setRequested(null); }
            }}
            onUnavailable={() => {
              setUnavailable(current => current.includes(index) ? current : [...current, index]);
              setReady(current => current.filter(loaded => loaded !== index));
              if (index === activeIndex && ready.length) setActiveIndex(ready[0]);
              if (index === requested) setRequested(null);
            }}
          />
        </div>
      ))}
      <div className="tgg-hero-dots" role="group" aria-label="Choose a featured gift image">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            aria-label={`Show image ${index + 1}: ${slide.alt}`}
            aria-pressed={index === activeIndex}
            aria-busy={index === requested}
            disabled={unavailable.includes(index)}
            onClick={() => {
              if (ready.includes(index)) { setActiveIndex(index); setRequested(null); }
              else setRequested(index);
            }}
          />
        ))}
      </div>
    </div>
  );
}
