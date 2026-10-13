'use client';

import Link from 'next/link';
import { useWordReveal } from '@/hooks/useWordReveal';
import { ArrowRight, Gift, Heart, Leaf, Feather } from 'lucide-react';
import HomeHeroSlideshow from './HomeHeroSlideshow';

const heroPromises = [
  { Icon: Leaf, label: 'Curated with care' },
  { Icon: Gift, label: 'Beautifully presented' },
  { Icon: Feather, label: 'A personal note' },
  { Icon: Heart, label: 'For every occasion' },
];

export default function HomeHero() {
  const scope = useWordReveal<HTMLDivElement>('[data-hero-word]', false, true);

  return <section className="tgg-hero" aria-labelledby="hero-title">
    <div className="tgg-hero-copy" ref={scope}>
      <p className="tgg-kicker">Thoughtful gifts<br/>for every occasion</p>
      <p className="tgg-hero-brand"><span className="tgg-hero-word" data-hero-word>The</span>{' '}<span className="tgg-hero-word" data-hero-word>Gourmet</span>{' '}<span className="tgg-hero-word" data-hero-word>Gifts</span></p>
      <h1 id="hero-title">
        <span className="tgg-hero-title-desktop">Make everyday<br className="tgg-desktop-break"/> moments special.</span>
        <span className="tgg-hero-title-mobile"><span className="tgg-hero-word" data-hero-word>Fine</span>{' '}<span className="tgg-hero-word" data-hero-word>gifts.</span><span className="tgg-hero-second-line"><span className="tgg-hero-word" data-hero-word>Lasting</span>{' '}<span className="tgg-hero-word" data-hero-word>joy.</span></span></span>
      </h1>
      <p className="tgg-hero-description">Curated hampers and thoughtful finds to celebrate the people and moments that matter.</p>
      <Link className="tgg-button" href="/shop">Shop now <ArrowRight size={17} aria-hidden="true"/></Link>
      <ul className="tgg-hero-promises" aria-label="Our approach to gifting">
        {heroPromises.map(({ Icon, label }) => <li key={label}><span><Icon size={20} strokeWidth={1.4} aria-hidden="true"/></span><small>{label}</small></li>)}
      </ul>
    </div>
    <HomeHeroSlideshow />
  </section>;
}

