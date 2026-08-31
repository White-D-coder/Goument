'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATALOGUE_CATEGORIES } from '@/data/hampersData';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function KeepsakeEcommerceSection() {
  return (
    <section id="catalogue" className="pt-4 sm:pt-8 md:pt-12 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-10 bg-[#FAF8F5] text-[#1A1A18] scroll-mt-20">
      <div className="max-w-[1580px] mx-auto space-y-6 sm:space-y-10">
        
        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-4xl mx-auto px-2 space-y-1.5 sm:space-y-2">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              What We Can Curate
            </h2>
            <p className="text-xs md:text-sm text-[#78746D] font-light max-w-3xl mx-auto leading-normal">
              Select any division below to explore our full artisanal catalogue and bespoke gift boxes.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── 12 CATEGORIES FULL GRID (NO HORIZONTAL SCROLL - VISIBLE AT ONCE) ─── */}
        <div className="pt-1 pb-2">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 sm:gap-6 md:gap-7 lg:gap-8 justify-items-center">
            {CATALOGUE_CATEGORIES.map((cat) => {
              return (
                <Link
                  key={cat.id}
                  href={`/collections?category=${cat.id}`}
                  className="flex flex-col items-center group cursor-pointer w-full max-w-[170px] focus:outline-none transition-all duration-300"
                >
                  {/* Outer Prominent Rounded Squircle Frame (Bigger Size) */}
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-[26px] sm:rounded-[30px] md:rounded-[34px] lg:rounded-[38px] p-[3px] sm:p-[4px] transition-all duration-500 bg-[#EAE5DC] ${cat.pastelHover} group-hover:scale-108 group-hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)] group-hover:ring-2 group-hover:ring-[#BFA267]/50`}
                  >
                    {/* Inner Rounded Squircle Image Container */}
                    <div className="w-full h-full rounded-[23px] sm:rounded-[26px] md:rounded-[30px] lg:rounded-[34px] bg-[#FAF8F5] overflow-hidden relative shadow-inner">
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-112"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-opacity duration-300" />
                    </div>
                  </div>

                  {/* Category Title Below Image */}
                  <span className="text-[11px] sm:text-xs md:text-[13px] font-bold uppercase tracking-wider mt-3 max-w-[140px] text-center leading-tight transition-colors text-[#5A554D] group-hover:text-[#1A1A18]">
                    {cat.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── ELEGANT UNDERLINE ANIMATED LINK (NO BLACK BUTTON, NO SPARKLE) ─── */}
        <div className="text-center pt-2 sm:pt-4">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 group text-[#1A1A18] font-sans text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase relative py-1 cursor-pointer transition-colors"
          >
            <span>Explore Complete Catalogue</span>
            <ArrowRight className="w-4 h-4 text-[#9E7B35] group-hover:translate-x-1.5 transition-transform duration-300" />
            
            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1A1A18] scale-x-100 group-hover:bg-[#9E7B35] group-hover:h-[2px] transition-all duration-300 origin-left" />
          </Link>
        </div>

      </div>
    </section>
  );
}
