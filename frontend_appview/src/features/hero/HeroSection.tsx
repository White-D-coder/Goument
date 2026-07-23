'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Gift } from 'lucide-react';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';

export const HeroSection: React.FC = () => {
  const scrollToGiftBoxes = () => {
    const element = document.getElementById('gift-boxing-cards');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-[#FAF7F2] pt-6 pb-8 px-5 overflow-hidden border-b border-[#E8DFC8]/40">
      <div className="flex flex-col relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-[75%] space-y-2 z-10"
        >
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#2A231F] uppercase block">
            THE ART OF
          </span>

          <h1 className="font-serif-luxury text-3xl font-bold leading-tight text-[#2A231F]">
            Thoughtful <br />
            <span className="inline-flex items-center gap-1">
              Gifting
              <Gift className="w-6 h-6 text-[#D4AF37] inline-block ml-1" />
            </span>
          </h1>

          <p className="text-xs text-[#6E6259] font-normal leading-relaxed pt-1 max-w-[220px]">
            Luxury gourmet gifts, beautifully packaged for every occasion.
          </p>

          <div className="pt-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={scrollToGiftBoxes}
              className="gold-gradient-btn px-5 py-3 rounded-full text-xs font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-lg"
            >
              <span>EXPLORE GIFT BOXES</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Luxury Gift Box Display Image matching screenshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="absolute -right-6 -bottom-4 w-60 h-64 z-0 pointer-events-none"
        >
          <ImageWithShimmer
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop"
            alt="The Gourmet Gifts Co. Luxury Box"
            priority
            className="w-full h-full rounded-2xl object-cover drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};
