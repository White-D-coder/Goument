'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Heart, ShieldCheck, Gift } from 'lucide-react';
import Link from 'next/link';

const HERO_IMAGES = [
  {
    url: '/images/hero/hero_highres_1.png',
    alt: 'Luxury Gourmet Gift Box Collection',
  },
  {
    url: '/images/hero/hero_highres_2.png',
    alt: 'Artisanal Gourmet Luxury Hamper',
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

  const valueProps = [
    { icon: Sparkles, title: 'Clean Ingredients' },
    { icon: Heart, title: 'Visible Quality' },
    { icon: ShieldCheck, title: 'Handcrafted Care' },
    { icon: Gift, title: 'Sustainable Packaging' },
  ];

  return (
    <section className="relative w-full h-[540px] md:h-[620px] lg:h-[680px] overflow-hidden border-b border-[#E4E0D7] rounded-none">
      {/* 8K High-Resolution Auto-Sliding Background Images (Zero Over-Zooming) */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 z-10" />
      </div>

      {/* Hero Content Overlay (Sharp Rectangle Edges, Zero Round Corners) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-6 md:px-12 py-12">
        <div className="max-w-2xl space-y-6">
          <div className="space-y-3">
            <span
              style={{
                fontFamily: 'TropicalScript, var(--font-tropical-script), cursive',
                WebkitTextStroke: '0.8px #FFF2B3',
              }}
              className="text-3xl md:text-4xl text-[#FFF2B3] block drop-shadow-md"
            >
              Gourmet Luxury
            </span>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white drop-shadow-lg tracking-tight">
              L&apos;essentiel, en harmonie <br />
              avec vos moments.
            </h1>

            <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-lg pt-1 font-normal drop-shadow-xs">
              Des produits naturels, concentrés en actifs gourmands, pour révéler l&apos;équilibre et l&apos;éclat de vos cadeaux.
            </p>
          </div>

          {/* Sharp Rectangle Dual CTA Buttons */}
          <div className="flex items-center gap-5 pt-2">
            <Link
              href="/gift-boxing"
              className="aura-sage-btn px-8 py-4 rounded-none text-xs md:text-sm font-bold tracking-wider uppercase inline-flex items-center justify-center shadow-2xl active:scale-95 transition-transform"
            >
              Découvrir La Boutique
            </Link>
            <Link
              href="/gift-boxing/classics"
              className="text-xs md:text-sm font-bold text-white hover:text-[#FFF2B3] inline-flex items-center gap-2 group transition-colors drop-shadow-xs"
            >
              <span>Découvrir Toute La Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 4 Icon Value Props Grid */}
          <div className="grid grid-cols-4 gap-4 pt-8 border-t border-white/20 max-w-xl">
            {valueProps.map((vp) => (
              <div key={vp.title} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-none bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs">
                  <vp.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] md:text-[11px] font-semibold text-white/95 leading-tight uppercase tracking-wider drop-shadow-xs">
                  {vp.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
