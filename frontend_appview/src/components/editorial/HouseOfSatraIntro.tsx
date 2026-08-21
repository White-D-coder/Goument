'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function HouseOfSatraIntro({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<'visible' | 'zooming' | 'completed'>('visible');

  useEffect(() => {
    // Skip only for users who explicitly prefer reduced motion in OS
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage('completed');
      if (onComplete) onComplete();
      return;
    }

    // Stage 1 -> Stage 2: Begin Slow Cinematic Zoom-In after graceful hold
    const zoomTimer = setTimeout(() => {
      setStage('zooming');
    }, 2000);

    // Stage 2 -> Complete: Dissolve overlay and reveal main page
    const completeTimer = setTimeout(() => {
      setStage('completed');
      if (onComplete) onComplete();
    }, 4500);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (stage === 'completed') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="satra-intro-splash"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'zooming' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none bg-[#141413]"
      >
        {/* Subtle Ambient Radial Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,9,0.7) 100%)',
          }} 
        />

        {/* Centered Zoom-In Emblem & Grand Typography Container */}
        <motion.div
          initial={{ scale: 0.90, opacity: 0, y: 14 }}
          animate={
            stage === 'visible'
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 5.4, opacity: 0, y: -25 }
          }
          transition={
            stage === 'visible'
              ? { duration: 1.6, ease: [0.16, 1, 0.3, 1] }
              : { duration: 2.5, ease: [0.4, 0, 0.2, 1] }
          }
          className="relative flex flex-col items-center justify-center text-center px-6 will-change-transform"
        >
          {/* House of Satra Vector Crest */}
          <div className="relative w-16 h-12 sm:w-22 sm:h-16 mb-4">
            <Image
              src="/images/brand/logo-vector.pdf.png"
              alt="House of Satra"
              fill
              className="object-contain brightness-0 invert"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 4px 28px rgba(255,255,255,0.18))' }}
              priority
            />
          </div>

          {/* Sub-Brand Eyebrow */}
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.34em' }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-[9px] sm:text-[11px] uppercase text-[#B5AFA6] font-mono font-semibold mb-2"
          >
            Maison &amp; Sovereign Guild
          </motion.span>

          {/* Grand Brand Name */}
          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.08em] sm:tracking-[0.14em] text-[#F6F4EF] uppercase leading-none drop-shadow-md"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            House of Satra
          </h1>

          {/* Poetic Provenance Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif italic text-xs sm:text-base text-[#8A8680] mt-3"
          >
            Generational Craftsmanship &amp; Luxury Gifting
          </motion.p>
        </motion.div>

        {/* Minimalist Skip Button */}
        <button
          onClick={() => {
            setStage('completed');
            if (onComplete) onComplete();
          }}
          className="absolute bottom-8 text-[10px] uppercase tracking-[0.25em] text-white/40 hover:text-white/80 transition-colors cursor-pointer py-2 px-4"
        >
          Skip Intro ⟶
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
