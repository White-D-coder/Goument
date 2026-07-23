'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGES = [
  {
    url: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
    alt: 'Luxury Gourmet Gift Box',
  },
  {
    url: '/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg',
    alt: 'Velvet-Lined Luxury Chest',
  },
  {
    url: '/images/small_anipics/velvet_tray_hero.jpg',
    alt: 'Artisanal Velvet Keepsake Tray',
  },
  {
    url: '/images/Category_image/Royale_tin_tin/thumb.jpeg',
    alt: 'Heirloom Metallic Royale Tin',
  },
];

export const ResponsiveHero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[520px] md:h-[600px] lg:h-[650px] overflow-hidden border-b border-[#E6D9FF]/50">
      {/* Auto-Sliding Animated Background Images */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={HERO_IMAGES[currentSlide].url}
            src={HERO_IMAGES[currentSlide].url}
            alt={HERO_IMAGES[currentSlide].alt}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center absolute inset-0"
          />
        </AnimatePresence>

        {/* Dark Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10" />
      </div>

      {/* Hero Content Overlay (Desktop & Mobile Responsive Widths) */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end px-6 pb-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-4 max-w-xl"
        >
          <span
            style={{
              fontFamily: 'TropicalScript, var(--font-tropical-script), cursive',
              WebkitTextStroke: '0.8px #FFF2B3',
            }}
            className="text-3xl sm:text-4xl md:text-5xl tracking-normal text-[#FFF2B3] block drop-shadow-lg"
          >
            The Art of
          </span>

          <h1
            style={{ fontFamily: 'Pagio, var(--font-pagio), var(--font-playfair), serif' }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] text-white drop-shadow-md"
          >
            Thoughtful <br />
            Gifting
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-white/85 font-normal leading-relaxed max-w-md pt-1">
            Luxury gourmet gifts, beautifully packaged for every occasion. Discover signature packaging collections.
          </p>

          <div className="pt-2">
            <motion.a
              href="#catalog-grid"
              whileTap={{ scale: 0.95 }}
              className="gold-gradient-btn px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2.5 shadow-xl"
            >
              <span>EXPLORE GIFT BOXES</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
