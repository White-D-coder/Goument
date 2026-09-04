'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HERO_IMAGES = [
  {
    url: '/images/small_anipics/velvet_tray_hero.jpg',
    alt: 'Luxury Velvet Tray Hero Collection',
  },
  {
    url: '/images/small_anipics/framee.png',
    alt: 'Artisanal Gourmet Luxury Frame',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative w-full h-[540px] md:h-[620px] lg:h-[680px] overflow-hidden rounded-none scroll-mt-24">
      {/* 8K High-Resolution Auto-Sliding Background Images */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={HERO_IMAGES[currentSlide].url}
            src={HERO_IMAGES[currentSlide].url}
            alt={HERO_IMAGES[currentSlide].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </AnimatePresence>

        {/* Dark Vignette Overlay for High Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/40 z-10" />
      </div>

      {/* Hero Content Overlay (Centered Text & Button) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center px-6 md:px-12 py-12">
        <div className="max-w-3xl space-y-6 flex flex-col items-center">
          <div className="space-y-4 flex flex-col items-center text-center">
            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] text-white drop-shadow-lg tracking-tight text-center">
              The Art Of Being Thought Of.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl font-normal leading-relaxed text-center drop-shadow-md">
              Thoughtfully chosen gifts, beautifully presented, for people and moments that matter.
            </p>
          </div>

          {/* Dual High-Converting Luxury CTAs */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            {/* Primary Action: Instant Proposal & Pricing */}
            <Link
              href="/#curation-inquiry"
              onClick={(e) => {
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  e.preventDefault();
                  document.getElementById('curation-inquiry')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#DFC299] via-[#C9AC83] to-[#DFC299] hover:brightness-110 active:scale-[0.98] text-[#141311] text-xs font-mono font-bold uppercase tracking-[0.16em] rounded-sm transition-all duration-200 shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Get Corporate Proposal &amp; Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Secondary Action: Explore Catalogue */}
            <Link
              href="/gift-boxing"
              className="w-full sm:w-auto px-6 py-3.5 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/50 hover:border-white text-xs font-mono uppercase tracking-[0.16em] font-semibold rounded-sm transition-all duration-200 flex items-center justify-center cursor-pointer"
            >
              Explore Keepsake Vessels
            </Link>
          </div>

          {/* Micro-Trust Signals */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 pt-1 text-[11px] sm:text-xs text-white/85 font-mono tracking-wide flex-wrap">
            <span className="flex items-center gap-1.5">⚡ 2-Hour Turnaround</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">📦 Pan-India White Glove</span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1.5">🏷️ Custom Brand Embossing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
