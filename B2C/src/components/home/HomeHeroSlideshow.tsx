'use client';

import { useEffect, useState } from 'react';
import ProductPhoto from '@/components/ProductPhoto';

const slides = [
  {
    src: '/images/brand/Gourmet%20Gifts%20in%20Golden%20Light.png',
    alt: 'The Gourmet Gifts curated boxes with gourmet treats and keepsakes',
  },
  {
    src: '/images/brand/Luxury%20Festive%20Gourmet%20Gift%20Hamper.png',
    alt: 'The India Hamper in burgundy with regional treats',
  },
  {
    src: '/images/brand/Luxury%20Gourmet%20Gift%20Hamper%20Still%20Life.png',
    alt: 'The India Hamper in lavender with thoughtfully selected gifts',
  },
];

export default function HomeHeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % slides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="tgg-hero-visual" aria-label="Featured gifts" aria-roledescription="carousel">
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
            priority={index === 0}
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
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
