'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { EditorialCTA } from '@/components/editorial/EditorialCTA';
import Image from 'next/image';
import ImageTypography from '@/components/ImageTypography';
import { WhyChooseSection } from '@/features/brand/WhyChooseSection';
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
      <div id="hero" className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 flex flex-col justify-center items-center">
        {/* Full-bleed cover background image (No blank margins) */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroImageRef}
            src="/images/hero/hero_main.jpg"
            alt="The Gourmet Gifts — Luxury Gifting"
            className="w-full h-full object-cover object-center filter brightness-[0.88]"
          />
        </div>

        {/* Ambient luxury gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/85 via-black/30 to-black/50 pointer-events-none" />

        {/* Hero Content positioned inside the sticky hero — Perfectly Vertically & Horizontally Centered */}
        <div className="relative z-10 px-5 sm:px-8 lg:px-12 max-w-[1280px] mx-auto w-full flex flex-col items-center justify-center text-center">
          <div ref={heroTextRef} className="max-w-3xl space-y-3 sm:space-y-4 flex flex-col items-center text-center mx-auto">
            
            <h1
              className="text-white leading-[1.02] sm:leading-[0.95] tracking-[-0.02em] opacity-0 text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-light"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontWeight: 300,
              }}
            >
              Thoughtful Gifts. Beautifully Curated.
            </h1>
            <div className="opacity-0 pt-2 sm:pt-4">
              <a
                href="#catalogue"
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
          SECTION 2 & REST — SCROLLS OVER THE HERO
          ═══════════════════════════════════════════════ */}
      <div className="relative z-10 bg-[#FAF8F5] shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">

        {/* ─── EDITORIAL STATEMENT STRIP ─── */}
        <section className="py-12 sm:py-16 md:py-20 px-6 sm:px-10 text-center border-b border-[#EAE5DC]">
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

        {/* ─── 5. BESPOKE CURATION & QUOTATION INQUIRY FORM ─── */}
        <CuratedInquirySection />

        {/* ─── 6. WHY CHOOSE THE GOURMET GIFTS (BELOW ENQUIRY) ─── */}
        <WhyChooseSection />

        {/* ─── 7. PRIVATE CONCIERGE & BESPOKE GIFTING (#6B001A THEME) ─── */}
        <section className="py-20 sm:py-24 md:py-32 px-5 sm:px-8 lg:px-12 text-center relative overflow-hidden bg-[#6B001A] text-[#FAF8F5]">
          
          {/* Rich #6B001A Radial Depth Aura */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#850126] via-[#6B001A] to-[#45000F]" />

          <div className="max-w-[760px] mx-auto space-y-5 relative z-10">
            <ScrollReveal animation="fadeUp">
              <span className="type-meta text-[#DFC299] text-[10.5px] sm:text-[11.5px] tracking-[0.32em] uppercase font-bold block mb-2.5">
                Private Concierge
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-[-0.02em] leading-[1.08]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                For those who give at scale.
              </h2>
              <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#EDE6DC]/90 max-w-lg mx-auto leading-relaxed">
                Bespoke corporate curations, custom crest monograms, and institutional gifting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 pt-6">
                <EditorialCTA label="Request Dossier" href="/corporate" dark={true} className="text-white hover:text-[#DFC299] transition-colors text-xs font-mono uppercase tracking-[0.18em]" />
                <EditorialCTA label="Contact Concierge" href="/contact" dark={true} className="text-white hover:text-[#DFC299] transition-colors text-xs font-mono uppercase tracking-[0.18em]" />
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  );
}
