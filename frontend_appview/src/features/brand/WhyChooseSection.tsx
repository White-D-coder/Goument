'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="pt-4 sm:pt-8 md:pt-10 pb-6 sm:pb-10 px-3 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto space-y-2 sm:space-y-3">

        {/* ─── 3-COLUMN ASYMMETRIC FLUSH MOSAIC (NO ICONS, NO NUMBER BADGES, TIGHT GAP) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 sm:gap-1.5 items-stretch">
          
          {/* ══ COLUMN 1: LEFT (2 STACKED CARDS) (3.5 COLS) ══ */}
          <div className="lg:col-span-3 flex flex-col gap-1 sm:gap-1.5 justify-between">
            
            {/* Box 1: Deep Sage Green */}
            <ScrollReveal animation="fadeUp" delay={0.05} className="h-full">
              <div className="bg-[#3D5244] text-white p-6 sm:p-7 rounded-none flex flex-col justify-center h-[210px] sm:h-[235px] border border-[#34473A] space-y-2.5">
                <h3
                  className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug line-clamp-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Artisanal Provenance &amp; Generational Craft
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-light line-clamp-3">
                  Small-batch regional delicacies, roasted makhanas, and signature treats sourced directly from master confectioners.
                </p>
              </div>
            </ScrollReveal>

            {/* Box 2: White / Ivory */}
            <ScrollReveal animation="fadeUp" delay={0.1} className="h-full">
              <div className="bg-white border border-[#E8E2D8] text-[#1A1A18] p-6 sm:p-7 rounded-none flex flex-col justify-center h-[210px] sm:h-[235px] space-y-2.5">
                <h3
                  className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A18] leading-snug line-clamp-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  On-Time Pan-India Dispatch &amp; Cold-Chain
                </h3>
                <p className="text-xs text-[#78746D] leading-relaxed font-light line-clamp-3">
                  Climate-controlled multi-desk corporate deliveries ensuring 100% fresh arrival across all pin codes.
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* ══ COLUMN 2: CENTER (TALL VERTICAL FEATURE PHOTO WITH USER-SELECTED IMAGE) (4 COLS) ══ */}
          <div className="lg:col-span-4 min-h-[380px] sm:min-h-[475px] rounded-none overflow-hidden relative border border-[#E8E2D8]">
            <Image
              src="/images/brand/why_choose_feature.jpg"
              alt="The Gourmet Gifts Curated Box"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle Overlay & Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/70 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[9.5px] uppercase tracking-[0.24em] font-bold text-[#DFC299] block">
                Curated With Care
              </span>
              <p 
                className="text-lg sm:text-xl font-light text-white leading-snug drop-shadow-sm"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Permanence over disposability. Keepsakes made to be cherished.
              </p>
            </div>
          </div>

          {/* ══ COLUMN 3: RIGHT (TOP HEADING + 2 SIDE-BY-SIDE BOXES) (5 COLS) ══ */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-1 sm:gap-1.5">
            
            {/* Top Heading Box (BOLD AND LARGE HEADING) */}
            <ScrollReveal animation="fadeUp" delay={0.12} className="h-full">
              <div className="bg-white border border-[#E8E2D8] p-6 sm:p-8 md:p-10 rounded-none space-y-3 h-full flex flex-col justify-center">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-bold text-[#7A8B6F] block">
                  The Gold Standard
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#1A1A18] tracking-tight leading-[1.06]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Why Choose <br className="hidden sm:inline" />
                  The Gourmet Gifts?
                </h2>
                <p className="text-xs sm:text-sm text-[#78746D] leading-relaxed font-light pt-1">
                  Every day we work to make gifting seamless, meaningful, and unforgettable for our corporate clients and patrons across India.
                </p>
              </div>
            </ScrollReveal>

            {/* Bottom 2 Side-by-Side Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
              
              {/* Box 3: Sage Green Accent */}
              <ScrollReveal animation="fadeUp" delay={0.16}>
                <div className="bg-[#3D5244] text-white p-5 sm:p-6 rounded-none space-y-2 h-[180px] sm:h-[195px] flex flex-col justify-center border border-[#34473A]">
                  <h3
                    className="text-lg sm:text-xl font-medium text-white leading-snug line-clamp-2"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Bespoke Branding &amp; Monogramming
                  </h3>
                  <p className="text-[11px] text-white/80 leading-relaxed font-light line-clamp-3">
                    Hot foil crest stamping, custom message inserts, and brand-engraved satin ribbons.
                  </p>
                </div>
              </ScrollReveal>

              {/* Box 4: Warm Taupe / Cream Tone */}
              <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="bg-[#EFEAE2] border border-[#DDD5C7] text-[#1A1A18] p-5 sm:p-6 rounded-none space-y-2 h-[180px] sm:h-[195px] flex flex-col justify-center">
                  <h3
                    className="text-lg sm:text-xl font-medium text-[#1A1A18] leading-snug line-clamp-2"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Heirloom Keepsake Vessels
                  </h3>
                  <p className="text-[11px] text-[#6B665E] leading-relaxed font-light line-clamp-3">
                    Botanical tinplates, teak organizers, and crushed velvet memory chests.
                  </p>
                </div>
              </ScrollReveal>

            </div>

          </div>

        </div>

        {/* ─── 4. ORDERING GUIDELINES & MOQ BANNER (SLEEK, REFINED, SUBTLE DELICATE SEPARATORS) ─── */}
        <ScrollReveal animation="fadeUp" delay={0.22}>
          <div className="bg-[#F8F5EE] text-[#1A1A18] p-5 sm:p-7 md:p-8 rounded-none border border-[#E2DDD3] space-y-4">
            
            {/* Top Row: Gifting For (Subtle, sleek, non-intrusive) */}
            <div className="border-b border-[#E2DDD3] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9E7B35]">
                Gifting For
              </span>
              <p className="text-xs text-[#6B665E] font-normal tracking-wide flex items-center flex-wrap gap-x-2 gap-y-1">
                <span>Clients</span>
                <span className="text-[#C5A880]/60 font-light">•</span>
                <span>Employees</span>
                <span className="text-[#C5A880]/60 font-light">•</span>
                <span>Festive Celebrations</span>
                <span className="text-[#C5A880]/60 font-light">•</span>
                <span>Events</span>
              </p>
            </div>

            {/* Ordering Guidelines */}
            <div className="space-y-2">
              <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.22em] text-[#7A8B6F] font-bold block">
                ORDERING GUIDELINES
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-0.5">
                
                {/* MOQ 10 */}
                <div className="md:border-r border-[#E2DDD3] md:pr-4 space-y-0.5">
                  <span 
                    className="text-2xl sm:text-[26px] font-light text-[#9E7B35]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    MOQ 10
                  </span>
                  <h4 
                    className="text-xs sm:text-sm font-semibold text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Ready-to-gift orders
                  </h4>
                  <p className="text-[11px] text-[#78746D] leading-relaxed">
                    Without custom branding or personalization.
                  </p>
                </div>

                {/* MOQ 50 */}
                <div className="md:border-r border-[#E2DDD3] md:pr-4 space-y-0.5">
                  <span 
                    className="text-2xl sm:text-[26px] font-light text-[#9E7B35]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    MOQ 50
                  </span>
                  <h4 
                    className="text-xs sm:text-sm font-semibold text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Printed stationery
                  </h4>
                  <p className="text-[11px] text-[#78746D] leading-relaxed">
                    Custom printing for stationery items &amp; cards.
                  </p>
                </div>

                {/* MOQ 100 */}
                <div className="space-y-0.5">
                  <span 
                    className="text-2xl sm:text-[26px] font-light text-[#9E7B35]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    MOQ 100
                  </span>
                  <h4 
                    className="text-xs sm:text-sm font-semibold text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Branding &amp; personalisation
                  </h4>
                  <p className="text-[11px] text-[#78746D] leading-relaxed">
                    Including custom / personalised keepsake boxes.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
