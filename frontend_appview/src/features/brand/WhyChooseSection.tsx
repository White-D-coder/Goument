'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="pt-4 sm:pt-8 md:pt-12 pb-6 sm:pb-10 px-2 sm:px-4 lg:px-6 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1580px] mx-auto">

        {/* ══════════════════════════════════════════════════════════════════
            MOBILE / TABLET VIEW (INTERLEAVED SEQUENCE: HEADING -> 2 CARDS -> IMAGE -> 2 CARDS)
            ══════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col gap-2 lg:hidden">
          
          {/* 1. Main Heading Box */}
          <ScrollReveal animation="fadeUp" delay={0.04}>
            <div className="bg-white border border-[#E8E2D8] p-6 sm:p-8 rounded-2xl space-y-2.5">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-bold text-[#7A8B6F] block">
                THE GOURMET GIFTS STANDARD
              </span>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#1A1A18] tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Why Choose The Gourmet Gifts?
              </h2>
              <p className="text-xs sm:text-sm text-[#78746D] leading-relaxed font-light pt-1">
                We bring together thoughtful curation, beautiful presentation and effortless execution to create gifts people genuinely remember.
              </p>
            </div>
          </ScrollReveal>

          {/* 2. Card 1: Deep Sage Green */}
          <ScrollReveal animation="fadeUp" delay={0.06}>
            <div className="bg-[#3D5244] text-white p-5 sm:p-6 rounded-2xl space-y-2 border border-[#34473A]">
              <h3
                className="text-lg sm:text-xl font-medium tracking-tight text-white leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Curated Beyond the Ordinary
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                From regional gourmet discoveries and elegant keepsakes to useful everyday objects, every gift is selected to feel thoughtful, relevant and memorable.
              </p>
            </div>
          </ScrollReveal>

          {/* 3. Card 2: White / Ivory */}
          <ScrollReveal animation="fadeUp" delay={0.08}>
            <div className="bg-white border border-[#E8E2D8] text-[#1A1A18] p-5 sm:p-6 rounded-2xl space-y-2">
              <h3
                className="text-lg sm:text-xl font-medium tracking-tight text-[#1A1A18] leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Made to Work Beautifully at Scale
              </h3>
              <p className="text-xs text-[#78746D] leading-relaxed font-light">
                From intimate gifting requirements to large corporate programmes, we manage sourcing, customisation, packaging and pan-India delivery with equal attention to detail.
              </p>
            </div>
          </ScrollReveal>

          {/* 4. Center Feature Image (Placed Right in the Middle on Mobile) */}
          <ScrollReveal animation="fadeUp" delay={0.1}>
            <div className="h-[280px] sm:h-[340px] rounded-2xl overflow-hidden relative border border-[#E8E2D8] my-1">
              <Image
                src="/images/brand/why_choose_feature.jpg"
                alt="The Gourmet Gifts Curated Box"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/80 via-transparent to-black/20" />
              <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                <span className="text-[9.5px] uppercase tracking-[0.24em] font-bold text-[#DFC299] block">
                  CURATED WITH INTENT
                </span>
                <p 
                  className="text-base sm:text-lg font-light text-white leading-snug drop-shadow-sm"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  More than a box of products. Every hamper is built around the recipient, the occasion and the story you want your gift to tell.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* 5. Card 3: Sage Green Accent */}
          <ScrollReveal animation="fadeUp" delay={0.12}>
            <div className="bg-[#3D5244] text-white p-5 sm:p-6 rounded-2xl space-y-2 border border-[#34473A]">
              <h3
                className="text-lg sm:text-xl font-medium text-white leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Bespoke to Your Brand
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Custom boxes, branded merchandise, personalised stationery, apparel, bags, keepsakes, festive elements and more — tailored around your identity, audience and budget.
              </p>
            </div>
          </ScrollReveal>

          {/* 6. Card 4: Warm Taupe / Cream Tone */}
          <ScrollReveal animation="fadeUp" delay={0.14}>
            <div className="bg-[#EFEAE2] border border-[#DDD5C7] text-[#1A1A18] p-5 sm:p-6 rounded-2xl space-y-2">
              <h3
                className="text-lg sm:text-xl font-medium text-[#1A1A18] leading-snug"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                One Partner. Endless Possibilities.
              </h3>
              <p className="text-xs text-[#6B665E] leading-relaxed font-light">
                Corporate gifting, festive hampers, employee rewards, client gifts, wedding gifting and bespoke occasions — thoughtfully managed from concept to delivery.
              </p>
            </div>
          </ScrollReveal>

        </div>

        {/* ══════════════════════════════════════════════════════════════════
            DESKTOP VIEW: 3-COLUMN ASYMMETRIC FLUSH MOSAIC (100% PRESERVED)
            ══════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:grid grid-cols-12 gap-1.5 items-stretch">
          
          {/* ══ COLUMN 1: LEFT (2 STACKED CARDS) (3 COLS) ══ */}
          <div className="col-span-3 flex flex-col gap-1.5 justify-between">
            
            {/* Box 1: Deep Sage Green */}
            <ScrollReveal animation="fadeUp" delay={0.05} className="h-full">
              <div className="bg-[#3D5244] text-white p-6 sm:p-7 rounded-tl-3xl flex flex-col justify-center h-[235px] border border-[#34473A] space-y-2.5">
                <h3
                  className="text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug line-clamp-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Curated Beyond the Ordinary
                </h3>
                <p className="text-xs text-white/80 leading-relaxed font-light line-clamp-3">
                  From regional gourmet discoveries and elegant keepsakes to useful everyday objects, every gift is selected to feel thoughtful, relevant and memorable.
                </p>
              </div>
            </ScrollReveal>

            {/* Box 2: White / Ivory */}
            <ScrollReveal animation="fadeUp" delay={0.1} className="h-full">
              <div className="bg-white border border-[#E8E2D8] text-[#1A1A18] p-6 sm:p-7 rounded-bl-3xl flex flex-col justify-center h-[235px] space-y-2.5">
                <h3
                  className="text-xl sm:text-2xl font-medium tracking-tight text-[#1A1A18] leading-snug line-clamp-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Made to Work Beautifully at Scale
                </h3>
                <p className="text-xs text-[#78746D] leading-relaxed font-light line-clamp-3">
                  From intimate gifting requirements to large corporate programmes, we manage sourcing, customisation, packaging and pan-India delivery with equal attention to detail.
                </p>
              </div>
            </ScrollReveal>

          </div>

          {/* ══ COLUMN 2: CENTER (TALL VERTICAL FEATURE PHOTO) (4 COLS) ══ */}
          <ScrollReveal animation="fadeUp" delay={0.08} className="col-span-4 h-full">
            <div className="h-full min-h-[475px] rounded-none overflow-hidden relative border border-[#E8E2D8]">
              <Image
                src="/images/brand/why_choose_feature.jpg"
                alt="The Gourmet Gifts Curated Box"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/70 via-transparent to-black/20" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[9.5px] uppercase tracking-[0.24em] font-bold text-[#DFC299] block">
                  CURATED WITH INTENT
                </span>
                <p 
                  className="text-lg sm:text-xl font-light text-white leading-snug drop-shadow-sm"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  More than a box of products. Every hamper is built around the recipient, the occasion and the story you want your gift to tell.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* ══ COLUMN 3: RIGHT (TOP HEADING + 2 SIDE-BY-SIDE BOXES) (5 COLS) ══ */}
          <div className="col-span-5 flex flex-col justify-between gap-1.5">
            
            {/* Top Heading Box */}
            <ScrollReveal animation="fadeUp" delay={0.12} className="h-full">
              <div className="bg-white border border-[#E8E2D8] p-6 sm:p-8 md:p-10 rounded-tr-3xl space-y-3 h-full flex flex-col justify-center">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-bold text-[#7A8B6F] block">
                  THE GOURMET GIFTS STANDARD
                </span>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#1A1A18] tracking-tight leading-[1.06]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Why Choose <br className="hidden sm:inline" />
                  The Gourmet Gifts?
                </h2>
                <p className="text-xs sm:text-sm text-[#78746D] leading-relaxed font-light pt-1">
                  We bring together thoughtful curation, beautiful presentation and effortless execution to create gifts people genuinely remember.
                </p>
              </div>
            </ScrollReveal>

            {/* Bottom 2 Side-by-Side Boxes */}
            <div className="grid grid-cols-2 gap-1.5">
              
              {/* Box 3: Sage Green Accent */}
              <ScrollReveal animation="fadeUp" delay={0.16}>
                <div className="bg-[#3D5244] text-white p-5 sm:p-6 rounded-none space-y-2 h-[195px] flex flex-col justify-center border border-[#34473A]">
                  <h3
                    className="text-lg sm:text-xl font-medium text-white leading-snug line-clamp-2"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Bespoke to Your Brand
                  </h3>
                  <p className="text-[11px] text-white/80 leading-relaxed font-light line-clamp-3">
                    Custom boxes, branded merchandise, personalised stationery, apparel, bags, keepsakes, festive elements and more — tailored around your identity, audience and budget.
                  </p>
                </div>
              </ScrollReveal>

              {/* Box 4: Warm Taupe / Cream Tone */}
              <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="bg-[#EFEAE2] border border-[#DDD5C7] text-[#1A1A18] p-5 sm:p-6 rounded-br-3xl space-y-2 h-[195px] flex flex-col justify-center">
                  <h3
                    className="text-lg sm:text-xl font-medium text-[#1A1A18] leading-snug line-clamp-2"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    One Partner. Endless Possibilities.
                  </h3>
                  <p className="text-[11px] text-[#6B665E] leading-relaxed font-light line-clamp-3">
                    Corporate gifting, festive hampers, employee rewards, client gifts, wedding gifting and bespoke occasions — thoughtfully managed from concept to delivery.
                  </p>
                </div>
              </ScrollReveal>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
