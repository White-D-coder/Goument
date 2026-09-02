'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { OCCASION_CARDS } from '@/components/OccasionGiftingCarousel';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function OccasionsIndexPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] pt-20 sm:pt-24 md:pt-28 pb-16">
      
      {/* ─── SECTION 1: BREADCRUMBS & HERO HEADER ─── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-6 sm:mb-12">
        
        {/* Working Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs text-[#8C847B] mb-3 sm:mb-4">
          <Link href="/" className="hover:text-[#1A1A18] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />
          <span className="text-[#1A1A18] font-medium">
            Occasions
          </span>
        </nav>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3.5">
          <h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-light text-[#1A1A18] tracking-tight leading-[1.12]"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            For Every Occasion That Matters
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#78746D] font-light max-w-2xl mx-auto leading-relaxed px-2">
            Thoughtfully curated keepsakes designed for corporate milestones, celebrations, and lasting relationships.
          </p>
        </div>

      </section>

      {/* ─── SECTION 2: OCCASIONS PRESENTATION ─── */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 mb-14 sm:mb-20">
        
        {/* ── MOBILE VIEW: LUXURY FULL-WIDTH EDITORIAL CARDS (SM:HIDDEN) ── */}
        <div className="sm:hidden space-y-4">
          {OCCASION_CARDS.map((card, idx) => (
            <ScrollReveal key={card.id} animation="fadeUp" delay={0.03 * (idx + 1)}>
              <Link
                href={card.href}
                className="group relative w-full aspect-[16/10.5] rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] active:scale-[0.98] transition-all duration-300 flex flex-col justify-between p-4.5 block"
              >
                {/* Full-Bleed Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#1A1A18] pointer-events-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="100vw"
                    priority={idx < 2}
                    className="object-cover object-center filter brightness-[0.95]"
                  />
                  {/* High-Contrast Bottom-to-Top Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-black/10" />
                </div>

                {/* Top Row: Index Step & Pill Badge */}
                <div className="relative z-10 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-mono font-semibold tracking-widest text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    0{idx + 1} / 0{OCCASION_CARDS.length}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[#DFC299] shadow-xs">
                    <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                  </span>
                </div>

                {/* Bottom Content: Title, Subtitle, and Direct Link */}
                <div className="relative z-10 w-full pointer-events-none text-left space-y-1">
                  <h2 className="font-sans text-[15px] font-bold text-[#DFC299] uppercase tracking-wider leading-tight drop-shadow-md">
                    {card.title}
                  </h2>
                  <p className="font-sans text-[11.5px] text-[#EDE6DC] font-normal leading-snug drop-shadow-xs line-clamp-2">
                    {card.subtitle}
                  </p>
                  <div className="pt-1 flex items-center gap-1 text-[10.5px] font-mono font-semibold uppercase tracking-[0.16em] text-white">
                    <span>EXPLORE CURATION</span>
                    <span className="text-[#DFC299]">→</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* ── TABLET & DESKTOP VIEW: 4-COLUMN MOSAIC GRID (HIDDEN SM:GRID) ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {OCCASION_CARDS.map((card, idx) => (
            <ScrollReveal key={card.id} animation="fadeUp" delay={0.04 * (idx + 1)}>
              <Link
                href={card.href}
                className="group relative w-full aspect-[3/4.2] rounded-2xl overflow-hidden shadow-[0_6px_22px_rgba(0,0,0,0.09)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.22)] transition-all duration-500 flex flex-col justify-between p-5 md:p-6 block"
              >
                {/* Full-Bleed Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#1A1A18] pointer-events-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-108 filter brightness-[0.96]"
                  />
                  {/* Subtle Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-transparent group-hover:from-black/94 group-hover:via-black/50 transition-all duration-500" />
                </div>

                {/* Top Corner Icon */}
                <div className="relative z-10 flex justify-end pointer-events-none">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white/90 text-[11px] group-hover:bg-[#DFC299] group-hover:text-[#1A1A18] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 w-full pointer-events-none text-left space-y-1.5">
                  <h2 className="font-sans text-base md:text-[17px] font-bold text-[#DFC299] uppercase tracking-wider leading-tight drop-shadow-md">
                    {card.title}
                  </h2>
                  <p className="font-sans text-xs text-[#EDE6DC]/90 font-light leading-snug line-clamp-2 drop-shadow-xs">
                    {card.subtitle}
                  </p>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 text-[10.5px] font-mono font-semibold uppercase tracking-[0.16em] text-white/90 group-hover:text-[#DFC299] transition-colors">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </main>

      {/* ─── SECTION 3: BESPOKE CONCIERGE CALLOUT BLOCK ─── */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#38493B] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 text-center space-y-4 shadow-xl relative overflow-hidden">
          <ScrollReveal animation="fadeUp">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-bold text-[#DFC299] block mb-1">
              Bespoke Curation Service
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-white tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Need a Custom Gifting Concept?
            </h2>
            <p className="text-xs sm:text-sm text-white/85 font-light max-w-lg mx-auto leading-relaxed pt-1">
              From company offsites to executive partner hampers, we curate custom keepsake gifts tailored to your exact milestone, brand identity, and budget.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://wa.me/917021463609?text=Hi%21%20I%E2%80%99d%20like%20to%20enquire%20about%20bespoke%20corporate%20gifting."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#DFC299] hover:bg-white text-[#1A1A18] font-sans text-xs uppercase tracking-[0.18em] font-bold rounded-xl transition-all duration-300 shadow-md cursor-pointer text-center"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-sans text-xs uppercase tracking-[0.18em] font-semibold rounded-xl transition-all duration-300 border border-white/20 text-center"
              >
                Contact Concierge
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
