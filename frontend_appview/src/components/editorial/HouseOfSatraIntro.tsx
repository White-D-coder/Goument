'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function HouseOfSatraIntro({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<'visible' | 'zooming' | 'completed'>('visible');

  useEffect(() => {
    // Skip intro if already seen this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('satra-intro-seen')) {
      setStage('completed');
      if (onComplete) onComplete();
      return;
    }

    // Skip for users who prefer reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStage('completed');
      if (onComplete) onComplete();
      return;
    }

    const zoomTimer = setTimeout(() => {
      setStage('zooming');
    }, 2000);

    const completeTimer = setTimeout(() => {
      setStage('completed');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('satra-intro-seen', '1');
      }
      if (onComplete) onComplete();
    }, 4000);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (stage === 'completed') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="satra-intro"
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'zooming' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto select-none"
        style={{ backgroundColor: 'var(--satra-obsidian)' }}
      >
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,9,0.6) 100%)',
        }} />

        {/* Zoom-In Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={
            stage === 'visible'
              ? { scale: 1, opacity: 1 }
              : { scale: 4, opacity: 0 }
          }
          transition={
            stage === 'visible'
              ? { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
              : { duration: 2, ease: [0.4, 0, 0.2, 1] }
          }
          className="relative flex flex-col items-center justify-center text-center px-6 will-change-transform"
        >
          {/* Crest */}
          <div className="relative w-16 h-12 sm:w-20 sm:h-16 mb-5">
            <Image
              src="/images/brand/logo-vector.pdf.png"
              alt="House of Satra"
              fill
              className="object-contain brightness-0 invert"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 4px 24px rgba(255,255,255,0.1))' }}
              priority
            />
          </div>

          {/* Brand Name */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.1em] sm:tracking-[0.14em] uppercase leading-none"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              color: 'var(--satra-ivory)',
            }}
          >
            House of Satra
          </h1>
        </motion.div>

        {/* Skip */}
        <button
          onClick={() => {
            setStage('completed');
            if (typeof window !== 'undefined') sessionStorage.setItem('satra-intro-seen', '1');
            if (onComplete) onComplete();
          }}
          className="absolute bottom-8 text-[10px] uppercase tracking-[0.25em] transition-colors cursor-pointer py-2 px-4"
          style={{ color: 'rgba(255,255,255,0.3)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
