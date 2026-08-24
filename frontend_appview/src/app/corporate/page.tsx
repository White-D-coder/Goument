'use client';

import React from 'react';
import CorporateArchitecturalCatalogue from '@/features/corporate/CorporateArchitecturalCatalogue';
import AnimatedHeading from '@/components/motion/AnimatedHeading';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function CorporateAtelierPage() {
  return (
    <main className="w-full min-h-screen bg-[#FAF8F5] text-[#1A1A18] pb-16">
      
      {/* ─── 1. CORPORATE EDITORIAL HERO HEADER (1/4th REDUCED PADDING + LARGER FONT) ─── */}
      <section className="pt-16 sm:pt-20 md:pt-24 pb-2 sm:pb-3 px-4 sm:px-6 lg:px-10 max-w-[1360px] mx-auto text-center">
        <div className="max-w-4xl mx-auto space-y-2.5">
          <AnimatedHeading
            lines={['Curated Corporate Gifting']}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[94px] font-light tracking-tight text-[#1A1A18] leading-[1.02]"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            stagger={0.08}
            duration={0.75}
            blur={8}
          />
          <ScrollReveal animation="fadeUp" delay={0.12}>
            <p className="text-xs sm:text-sm md:text-base text-[#78746D] font-light max-w-2xl mx-auto leading-relaxed">
              Executive gifting systems designed around craftsmanship, fine materials, custom monogramming, and institutional permanence.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── 2. ASYMMETRIC POLYGON CATEGORY NAV & 4-COLUMN PRODUCT GRID ─── */}
      <CorporateArchitecturalCatalogue />

    </main>
  );
}