'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ArrowUpRight } from 'lucide-react';
import EditorialCollage from './EditorialCollage';

export default function EditorialSpread() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F6F4EF] pt-8 pb-10 sm:pt-10 sm:pb-12 md:pt-12 md:pb-14 px-0">
      
      {/* ─── COMPACT EDITORIAL SECTION HEADER ─── */}
      <ScrollReveal animation="fadeUp">
        <div className="mx-auto mb-6 sm:mb-8 max-w-2xl text-center px-4">
          <div className="mb-2 inline-flex items-center justify-center gap-3">
            <span className="h-px w-6 bg-[#B5AFA6]" />
            <span className="type-meta text-[#8A8680] text-[9px] tracking-[0.3em] uppercase">
              The Art of the Keepsake • A House of Satra Brand
            </span>
            <span className="h-px w-6 bg-[#B5AFA6]" />
          </div>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#1A1A18] leading-[1.1] mb-1.5"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            The Gourmet Gifts
          </h2>

          <p className="font-script text-[#8A8680] text-lg sm:text-xl md:text-2xl rotate-[-0.5deg]">
            “Crafted by hand, preserved forever.”
          </p>
        </div>
      </ScrollReveal>

      {/* ─── 100% FULL-BLEED 4-COLUMN KEEPSAKE COLLAGE (EXACT SCREENSHOT LAYOUT) ─── */}
      <ScrollReveal animation="fadeUp" delay={0.05}>
        <div className="w-full">
          <EditorialCollage />
        </div>
      </ScrollReveal>

      {/* ─── COMPACT BOTTOM ARCHIVE LINK ─── */}
      <div className="mt-4 pt-3 flex items-center justify-between px-4 sm:px-8 max-w-[1400px] mx-auto">
        <span className="type-meta text-[9px] uppercase tracking-[0.25em] text-[#8A8680]">
          House of Satra Atelier // Keepsake Series
        </span>
        <Link
          href="/collections#keepsake-vessels"
          className="inline-flex items-center gap-1.5 text-[9.5px] uppercase tracking-[0.25em] font-bold text-[#1A1A18] hover:text-[#7A8B6F] transition-colors"
        >
          <span>Explore Archive</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

    </section>
  );
}