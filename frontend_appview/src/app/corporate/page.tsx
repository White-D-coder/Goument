'use client';

import React from 'react';
import CorporateArchitecturalCatalogue from '@/features/corporate/CorporateArchitecturalCatalogue';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function CorporateAtelierPage() {
  return (
    <main className="w-full min-h-screen bg-[#F1F0EB] text-[#1A1A18] pb-16">
      
      {/* ─── 1. CORPORATE EDITORIAL HERO HEADER ─── */}
      <section className="pt-28 sm:pt-36 md:pt-40 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-10 max-w-[1360px] mx-auto text-center">
        <ScrollReveal animation="fadeUp">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#8A8680] block">
              The Gourmet Gifts • Corporate Atelier
            </span>
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#1A1A18] leading-[1.02]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Curated Corporate Gifting
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#78746D] font-light max-w-2xl mx-auto leading-relaxed">
              Executive gifting systems designed around craftsmanship, fine materials, custom monogramming, and institutional permanence.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── 2. ASYMMETRIC POLYGON CATEGORY NAV & 4-COLUMN PRODUCT GRID ─── */}
      <CorporateArchitecturalCatalogue />

    </main>
  );
}