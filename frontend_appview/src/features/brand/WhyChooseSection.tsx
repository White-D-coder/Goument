'use client';

import React from 'react';
import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="pt-4 sm:pt-8 md:pt-10 pb-6 sm:pb-10 px-3 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto">

        {/* ─── 3-COLUMN ASYMMETRIC FLUSH MOSAIC ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 sm:gap-1.5 items-stretch">
          
          {/* ══ COLUMN 1: LEFT (2 STACKED CARDS) (3.5 COLS) ══ */}
          <div className="lg:col-span-3 flex flex-col gap-1 sm:gap-1.5 justify-between">
            
            {/* Box 1: Deep Sage Green (Top Left — Green Block) */}
            <ScrollReveal animation="fadeUp" delay={0.05} className="h-full">
              <div className="bg-[#3D5244] text-white p-6 sm:p-7 rounded-none flex flex-col justify-center h-[210px] sm:h-[235px] border border-[#34473A] space-y-2.5">
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

            {/* Box 2: White / Ivory (Bottom Left — White Block) */}
            <ScrollReveal animation="fadeUp" delay={0.1} className="h-full">
              <div className="bg-white border border-[#E8E2D8] text-[#1A1A18] p-6 sm:p-7 rounded-none flex flex-col justify-center h-[210px] sm:h-[235px] space-y-2.5">
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
          <div className="lg:col-span-4 min-h-[380px] sm:min-h-[475px] rounded-none overflow-hidden relative border border-[#E8E2D8]">
            <Image
              src="/images/brand/why_choose_feature.jpg"
              alt="The Gourmet Gifts Curated Box"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle Overlay & Caption (Centre Image Caption) */}
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

          {/* ══ COLUMN 3: RIGHT (TOP HEADING + 2 SIDE-BY-SIDE BOXES) (5 COLS) ══ */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-1 sm:gap-1.5">
            
            {/* Top Heading Box (Top Right — Main Heading) */}
            <ScrollReveal animation="fadeUp" delay={0.12} className="h-full">
              <div className="bg-white border border-[#E8E2D8] p-6 sm:p-8 md:p-10 rounded-none space-y-3 h-full flex flex-col justify-center">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
              
              {/* Box 3: Sage Green Accent (Bottom Middle — Green Block) */}
              <ScrollReveal animation="fadeUp" delay={0.16}>
                <div className="bg-[#3D5244] text-white p-5 sm:p-6 rounded-none space-y-2 h-[180px] sm:h-[195px] flex flex-col justify-center border border-[#34473A]">
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

              {/* Box 4: Warm Taupe / Cream Tone (Bottom Right — Ivory Block) */}
              <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="bg-[#EFEAE2] border border-[#DDD5C7] text-[#1A1A18] p-5 sm:p-6 rounded-none space-y-2 h-[180px] sm:h-[195px] flex flex-col justify-center">
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
