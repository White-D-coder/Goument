'use client';

import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ArrowUpRight } from 'lucide-react';
import EditorialCollage from './EditorialCollage';

export default function EditorialSpread() {
  return (
    <section className="relative w-full overflow-hidden bg-[#F6F4EF] pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 px-0">
      
      {/* ─── SPACIOUS MINIMAL EDITORIAL SECTION HEADER ─── */}
      <ScrollReveal animation="fadeUp">
        <div className="mx-auto mb-10 sm:mb-14 md:mb-16 max-w-xl text-center px-6">
          <span className="type-meta text-[#8A8680] text-[9.5px] sm:text-[10.5px] tracking-[0.32em] uppercase font-semibold block mb-3">
            Keepsake Archive
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.02em] text-[#1A1A18] leading-[1.05]"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            The Art of the Keepsake
          </h2>
        </div>
      </ScrollReveal>

      {/* ─── 100% FULL-BLEED 4-COLUMN KEEPSAKE COLLAGE ─── */}
      <ScrollReveal animation="fadeUp" delay={0.05}>
        <div className="w-full">
          <EditorialCollage />
        </div>
      </ScrollReveal>

      {/* ─── COMPACT BOTTOM ARCHIVE LINK ─── */}
      <div className="mt-5 pt-4 flex items-center justify-between px-5 sm:px-10 max-w-[1440px] mx-auto">
        <span className="type-meta text-[9px] uppercase tracking-[0.25em] text-[#8A8680]">
          Series 01 &amp; 02 // Heirloom Suite
        </span>
        <Link
          href="/collections#keepsake-vessels"
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-[#1A1A18] hover:text-[#7A8B6F] transition-colors"
        >
          <span>Explore Archive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </section>
  );
}