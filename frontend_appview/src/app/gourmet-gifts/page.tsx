'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { EditorialCTA } from '@/components/editorial/EditorialCTA';
import Scrapbook from '@/components/Scrapbook';
import ImageTypography from '@/components/ImageTypography';
import KeepsakeEcommerceSection from '@/features/ecommerce/KeepsakeEcommerceSection';
import CustomGiftBoxesSection from '@/features/ecommerce/CustomGiftBoxesSection';
import CuratedInquirySection from '@/features/inquiry/CuratedInquirySection';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  /* ─── Hero Animations & Scroll Reset ─── */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Staggered hero text entrance
      if (heroTextRef.current) {
        const children = heroTextRef.current.children;
        gsap.fromTo(
          children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.18,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative bg-[#1A1A18]">

      {/* ═══════════════════════════════════════════════
          SECTION 1 — STATIC HERO BACKGROUND (Sticky / Fixed)
          ═══════════════════════════════════════════════ */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 flex flex-col justify-center items-center">
        {/* Full-bleed static background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroImageRef}
            src="/images/hero/hero_highres_1.png"
            alt="The Gourmet Gifts — Luxury Gifting"
            className="w-full h-full object-cover filter brightness-[0.82]"
          />
        </div>

        {/* Ambient luxury gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/85 via-black/30 to-black/50 pointer-events-none" />

        {/* Hero Content positioned inside the sticky hero — Perfectly Vertically & Horizontally Centered */}
        <div className="relative z-10 px-5 sm:px-8 lg:px-12 max-w-[1280px] mx-auto w-full flex flex-col items-center justify-center text-center">
          <div ref={heroTextRef} className="max-w-3xl space-y-3 sm:space-y-4 flex flex-col items-center text-center mx-auto">
            <span className="type-meta text-[#B5AFA6] block opacity-0 text-[10px] sm:text-[11.5px] tracking-[0.28em] uppercase font-medium">
              Curated Gifting • Haute Curiosités
            </span>
            <h1
              className="text-white leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] opacity-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontWeight: 300,
              }}
            >
              Gifts that mean something.
            </h1>
            <p className="text-white/80 max-w-sm sm:max-w-lg text-xs sm:text-sm md:text-base opacity-0 font-light leading-relaxed mx-auto">
              Crafted for moments of lasting remembrance.
            </p>
            <div className="opacity-0 pt-2 sm:pt-4">
              <a
                href="#content-sheet"
                className="editorial-link type-meta text-white/90 hover:text-white inline-flex items-center justify-center gap-2 transition-colors cursor-pointer text-[10px] sm:text-[11.5px]"
              >
                <span>Discover The Curation</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 2 & BEYOND — THE OVERLAPPING WHITE / IVORY SHEET
          Slides smoothly UP and covers the static background image on scroll
          ═══════════════════════════════════════════════ */}
      <div
        id="content-sheet"
        className="relative z-20 bg-[#F6F4EF] text-[#1A1A18] rounded-t-[36px] md:rounded-t-[56px] shadow-[0_-25px_60px_rgba(0,0,0,0.35)] border-t border-[#E0DDD6]"
      >
        
        {/* ─── PULL BAR / ACCENT INDICATOR ─── */}
        <div className="pt-6 pb-2 flex justify-center">
          <div className="w-12 h-1 bg-[#E0DDD6] rounded-full" />
        </div>

        {/* ─── 1. BRAND MANIFESTO STATEMENT ─── */}
        <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-8 max-w-[960px] mx-auto text-center">
          <span className="type-meta text-[#8A8680] block mb-3 text-[10px] tracking-[0.28em] uppercase">
            Philosophy of Permanence
          </span>
          <TextReveal
            as="h2"
            className="type-serif-body text-[#1A1A18] max-w-[760px] mx-auto leading-relaxed"
            stagger={0.03}
            duration={0.7}
          >
            We don't make disposable gifts. We craft enduring keepsakes meant to be preserved across generations.
          </TextReveal>
        </section>

        {/* ─── IMAGE-FILLED TYPOGRAPHY HERO ─── */}
        <ImageTypography />

        {/* ─── ATELIER LUXURY E-COMMERCE SECTION (7 CATEGORIES) ─── */}
        <KeepsakeEcommerceSection />

        {/* ─── BESPOKE HANDCRAFTED GIFT BOXES SECTION ─── */}
        <CustomGiftBoxesSection />

        {/* ─── 5. THE SCRAPBOOK (Moments, Polaroids, In-View Reveals) ─── */}
        <Scrapbook />

        {/* ─── 6. BESPOKE CURATION & QUOTATION INQUIRY FORM ─── */}
        <CuratedInquirySection />

        {/* ─── 6. PRIVATE CONCIERGE & BESPOKE GIFTING (Clean Seamless Flow) ─── */}
        <section className="pt-4 sm:pt-6 pb-12 sm:pb-16 md:pb-20 px-5 sm:px-8 lg:px-12 text-center bg-[#FAF8F5]">
          <div className="max-w-[720px] mx-auto space-y-5">
            <ScrollReveal animation="fadeUp">
              <span className="type-meta text-[#7A8B6F] text-[9.5px] sm:text-[10.5px] tracking-[0.3em] uppercase font-bold block mb-2">
                Private Concierge
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] tracking-[-0.02em] leading-[1.08]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                For those who give at scale.
              </h2>
              <p className="font-serif italic text-sm sm:text-base text-[#78746D] max-w-md mx-auto">
                Bespoke corporate curations, custom crest monograms, and institutional gifting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <EditorialCTA label="Request Dossier" href="/corporate" />
                <EditorialCTA label="Contact Concierge" href="/contact" />
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  );
}
