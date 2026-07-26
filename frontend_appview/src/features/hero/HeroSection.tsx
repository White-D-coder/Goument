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
    <section className="relative w-full h-[540px] md:h-[620px] lg:h-[680px] overflow-hidden rounded-none">
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

          {/* Sleek Animated Underline Luxury CTA */}
          <div className="pt-4 flex justify-center">
            <Link
              href="/gift-boxing"
              className="relative group inline-flex items-center justify-center gap-3 py-2 text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              <span className="font-sans group-hover:text-[#a6bd93] transition-colors duration-300">
                Discover Collection
              </span>
              <ArrowRight className="w-4 h-4 text-[#a6bd93] group-hover:translate-x-2 transition-transform duration-300" />
              {/* Expanding Underline Animation */}
              <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-[#a6bd93] transition-all duration-500 ease-out" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
