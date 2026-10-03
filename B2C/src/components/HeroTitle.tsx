import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const titleWords = ['Thoughtful', 'gifts', 'for', 'brighter', 'moments.'];

export default function HeroTitle() {
  return (
    <div className="gift-hero-content">
      <h1 id="hero-title" className="hero-editorial-h1">
        {titleWords.map((word, i) => (
          <span
            key={i}
            className="hero-word-reveal"
            style={{ animationDelay: `${0.08 + i * 0.08}s` }}
          >
            {word}&nbsp;
          </span>
        ))}
      </h1>

      <p className="hero-description hero-fade-item" style={{ animationDelay: '0.45s' }}>
        Little luxuries for the people who matter.
      </p>

      <div className="hero-buttons hero-fade-item" style={{ animationDelay: '0.6s' }}>
        <Link href="/shop" className="button light hero-cta-btn">
          Shop the Collection <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link href="#occasions" className="button outline-light hero-sub-btn">
          By Occasion <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
