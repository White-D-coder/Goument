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
import OccasionGiftingCarousel from '@/components/OccasionGiftingCarousel';
import { WhyChooseSection } from '@/features/brand/WhyChooseSection';
import { IndustriesSection } from '@/features/brand/IndustriesSection';
import { PackagingExperienceSection } from '@/features/brand/PackagingExperienceSection';
import { GiftingProcessSection } from '@/features/brand/GiftingProcessSection';
import KeepsakeEcommerceSection from '@/features/ecommerce/KeepsakeEcommerceSection';
import CustomGiftBoxesSection from '@/features/ecommerce/CustomGiftBoxesSection';
import CuratedInquirySection from '@/features/inquiry/CuratedInquirySection';
import { useInquiryModal } from '@/hooks/useInquiryModal';
// import { TrustedBusinessesMarquee } from '@/components/brand/TrustedBusinessesMarquee';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const { openInquiryModal } = useInquiryModal();
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

        {/* Hero Content positioned inside the sticky hero — Centered on Mobile, Left-Aligned on Desktop */}
        <div className="relative z-10 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full flex flex-col items-center sm:items-start justify-center text-center sm:text-left">
          <div ref={heroTextRef} className="max-w-3xl space-y-3 sm:space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            
            {/* Title */}
            <h1
              className="text-white leading-[1.05] sm:leading-[1.02] tracking-[-0.02em] opacity-0 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-center sm:text-left"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontWeight: 300,
              }}
            >
              B2B Gifting, curated around your brand and requirements.
            </h1>

            {/* Subtitle */}
            <p
              className="text-[#ffffff] opacity-0 text-base sm:text-2xl md:text-2xl lg:text-[24px] font-normal tracking-tight leading-snug max-w-2xl text-center sm:text-left"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              We don’t start with a catalogue, We start with who you&apos;re gifting to.
            </p>

            {/* Buttons */}
            <div className="opacity-0 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => openInquiryModal({ source: 'Hero Section (Get 3 Concepts)' })}
                className="px-6 sm:px-7 py-3 sm:py-3.5 bg-[#8C6228] hover:bg-[#A37330] text-white font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 shadow-[0_8px_20px_rgba(140,98,40,0.35)] hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                GET 3 GIFTING CONCEPTS
              </button>
              
              <a
                href="#catalogue"
                className="px-6 sm:px-7 py-3 sm:py-3.5 border border-white/60 hover:border-white text-white hover:text-[#DFC299] hover:bg-white/10 font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 backdrop-blur-xs cursor-pointer text-center"
              >
                SEE WHAT WE CAN CURATE
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
        {/* <section className="py-6 sm:py-8 md:py-10 px-6 sm:px-10 text-center">
          <TextReveal
            as="h2"
            className="type-serif-body text-[#1A1A18] max-w-[760px] mx-auto leading-relaxed"
            stagger={0.03}
            duration={0.7}
          >
            We don't make disposable gifts. We craft enduring keepsakes meant to be preserved across generations.
          </TextReveal>
        </section> */}

        {/* ─── 8-CARD OCCASIONS CAROUSEL ─── */}
        <OccasionGiftingCarousel />

        {/* ─── IMAGE-FILLED TYPOGRAPHY HERO (COMMENTED OUT AS REQUESTED) ─── */}
        {/* <ImageTypography /> */}

        {/* ─── INDUSTRIES WE UNDERSTAND SECTION ─── */}
        <IndustriesSection />

        {/* ─── ATELIER LUXURY E-COMMERCE SECTION (WHAT WE CAN CURATE) ─── */}
        <KeepsakeEcommerceSection />

        {/* ─── PACKAGING THAT COMPLETES THE EXPERIENCE ─── */}
        <GiftingProcessSection />
        <PackagingExperienceSection />

        {/* ─── HOW OUR GIFTING PROCESS WORKS ─── */}

        {/* ─── WHY CHOOSE THE GOURMET GIFTS (ABOVE ENQUIRY) ─── */}
        {/* <WhyChooseSection /> */}

        {/* ─── BESPOKE HANDCRAFTED GIFT BOXES SECTION ─── */}
        {/* <CustomGiftBoxesSection /> */}

        {/* ─── BESPOKE CURATION & QUOTATION INQUIRY FORM ─── */}
        {/* <CuratedInquirySection /> */}

        {/* ─── 7. TRUSTED BY BUSINESSES ACROSS INDIA (MARQUEE) ─── */}
        {/* <TrustedBusinessesMarquee /> */}

        {/* ─── 8. PRIVATE CONCIERGE & BESPOKE GIFTING (HERITAGE FOREST GREEN THEME) ─── */}
        <section className="pt-6 sm:pt-10 md:pt-14 pb-7 sm:pb-10 md:pb-12 px-5 sm:px-8 lg:px-12 text-center relative overflow-hidden bg-[#38493B] text-[#FAF8F5]">

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
                <span className="inline sm:hidden">
                  Bespoke corporate gifting at scale.
                </span>
                <span className="hidden sm:inline">
                  Bespoke corporate curations, custom crest monograms, and institutional gifting.
                </span>
              </p>
              <div className="flex items-center justify-center pt-6">
                <EditorialCTA label="Contact" href="https://wa.me/917021463609?text=Hi%21%20I%E2%80%99d%20like%20to%20enquire%20about%20bespoke%20corporate%20gifting%20at%20scale." dark={true} className="text-white hover:text-[#DFC299] transition-colors text-xs font-mono uppercase tracking-[0.18em]" />
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  );
}
