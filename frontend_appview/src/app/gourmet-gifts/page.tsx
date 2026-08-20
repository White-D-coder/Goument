'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { ImageReveal } from '@/components/motion/ImageReveal';
import { ProductShowcase } from '@/components/editorial/ProductShowcase';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import { EditorialCTA } from '@/components/editorial/EditorialCTA';
import Scrapbook from '@/components/Scrapbook';
import ImageTypography from '@/components/ImageTypography';
import EditorialSpread from '@/components/editorial/EditorialSpread';

gsap.registerPlugin(ScrollTrigger);

/* ═══ CRAFTSMANSHIP STORIES (No legacy product names) ═══ */
const MATERIAL_STORIES = [
  {
    image: '/images/Category_image/premium_velvet/thumb.jpeg',
    label: 'Materiality',
    title: 'High-Pile Velvet',
    body: 'Upholstered by hand over solid kiln-dried wood chassis with seamless corner tucks and brushed gold-plated fixtures.',
  },
  {
    image: '/images/Category_image/Royale_tin_tin/tin1.jpeg',
    label: 'Metalcraft',
    title: 'Gilded Tinplate',
    body: 'Architectural octagonal vessels embossed with botanical filigree, designed to serve as heirloom chests for generations.',
  },
  {
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
    label: 'Atelier',
    title: 'Botanical Soy Wax',
    body: 'Hand-poured in small batches using pure organic soy and therapeutic essential oil formulations in heavy amber glass.',
  },
];

export default function HomePage() {
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  /* ─── Hero Animations ─── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Ken Burns slow atmospheric zoom on hero image
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.0 },
          { scale: 1.08, duration: 16, ease: 'none', repeat: -1, yoyo: true }
        );
      }

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
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-0 flex flex-col justify-end">
        {/* Full-bleed background image with slow Ken Burns effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroImageRef}
            src="/images/hero/hero_highres_1.png"
            alt="The Gourmet Gifts — Luxury Gifting"
            className="w-full h-full object-cover will-change-transform filter brightness-[0.82]"
          />
        </div>

        {/* Ambient luxury gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/95 via-[#1A1A18]/30 to-black/40 pointer-events-none" />

        {/* Hero Content positioned inside the sticky hero */}
        <div className="relative z-10 pb-24 md:pb-32 px-6 lg:px-12 max-w-[1280px] mx-auto w-full">
          <div ref={heroTextRef} className="max-w-2xl space-y-4 text-left">
            <span className="type-meta text-[#B5AFA6] block opacity-0">
              Curated Gifting • Maison de Haute Curiosités
            </span>
            <h1
              className="text-white leading-[0.95] tracking-[-0.03em] opacity-0"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(44px, 8.5vw, 96px)',
              }}
            >
              Gifts that mean something.
            </h1>
            <p className="type-body text-white/70 max-w-md text-sm md:text-base opacity-0 font-light leading-relaxed">
              Objects of permanence, crafted in limited artisanal editions for moments of lasting remembrance.
            </p>
            <div className="opacity-0 pt-4">
              <a
                href="#content-sheet"
                className="editorial-link type-meta text-white/80 hover:text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
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
        <section className="py-[90px] md:py-[130px] px-6 lg:px-12 max-w-[960px] mx-auto text-center">
          <span className="type-meta text-[#8A8680] block mb-5">
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

        {/* ─── 2. EDITORIAL FASHION SPREAD (Magazine Asymmetric Collage for Series 01 & 02) ─── */}
        <EditorialSpread />

        {/* Chapter B — Heritage Hamper: Reversed Asymmetric Layout */}
        <section className="py-[100px] md:py-[140px] px-6 lg:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
              {/* Left — Editorial Copy (takes less space, offset down) */}
              <div className="lg:col-span-4 lg:pr-12 order-2 lg:order-1">
                <ScrollReveal animation="fadeUp">
                  <div className="space-y-5 max-w-sm">
                    <span className="type-meta text-[#8A8680] block">Series 03 • Heritage Botanicals</span>
                    <h2 
                      className="text-[#1A1A18] leading-[1.05] tracking-[-0.02em]"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 500, fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                    >
                      Epicurean Hampers
                    </h2>
                    <p className="type-body text-[#8A8680] text-sm leading-relaxed">
                      400gsm Italian linen wrap with gold foil typography. Inside: single-origin Darjeeling, artisanal confitures, hand-roasted nuts, and botanical tea canisters — each item chosen for provenance and character.
                    </p>
                    <div className="pt-3 space-y-2.5 border-t border-[#E0DDD6]">
                      <div className="flex justify-between">
                        <span className="type-micro text-[#B5AFA6]">Materials</span>
                        <span className="type-micro text-[#1A1A18]">FSC Linen, Gold Foil</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="type-micro text-[#B5AFA6]">Origin</span>
                        <span className="type-micro text-[#1A1A18]">Pan-India Guild</span>
                      </div>
                    </div>
                    <EditorialCTA label="Explore Heritage" href="/collections#heritage-hampers" />
                  </div>
                </ScrollReveal>
              </div>

              {/* Right — Stacked/Overlapping Dual Image Composition */}
              <div className="lg:col-span-8 relative order-1 lg:order-2">
                <ScrollReveal animation="fadeUp">
                  <div className="relative">
                    {/* Primary Large Image */}
                    <div className="overflow-hidden aspect-[4/3] bg-[#EFEDE7]">
                      <img
                        src="/images/Category_image/Classics/classics_hero.png"
                        alt="Heritage Hamper Collection"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Overlapping Detail Image (Visible on mobile & desktop) */}
                    <div className="absolute -bottom-5 -left-3 sm:-bottom-10 sm:-left-8 w-[48%] max-w-[200px] sm:w-[45%] aspect-[3/4] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.15)] border-2 sm:border-4 border-white z-10">
                      <img
                        src="/images/Category_image/Classics/classic.jpeg"
                        alt="Heritage Hamper Detail"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter C — Atelier Accents: Triptych with Editorial Overlay */}
        <section className="py-[80px] md:py-[120px] px-6 lg:px-12 bg-[#1A1A18]">
          <div className="max-w-[1280px] mx-auto">
            <ScrollReveal animation="fadeUp">
              <div className="text-center mb-14 md:mb-20">
                <span className="type-meta text-[#B5AFA6] block mb-4">Series 04 • In-House Atelier</span>
                <h2 
                  className="text-[#F6F4EF] leading-[1.05] tracking-[-0.02em] max-w-lg mx-auto"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 500, fontSize: 'clamp(28px, 4vw, 48px)' }}
                >
                  Objects Made by Hand, Meant to Remain
                </h2>
              </div>
            </ScrollReveal>

            {/* Triptych — Three varied aspect ratios, no uniform grid */}
            <div className="grid grid-cols-12 gap-4 md:gap-6 items-end">
              {/* Tall portrait */}
              <ScrollReveal animation="fadeUp" className="col-span-12 sm:col-span-4">
                <Link href="/collections#atelier-accents" className="block group">
                  <div className="overflow-hidden aspect-[3/4] bg-[#2C2B28]">
                    <img
                      src="/images/Category_image/Royale_tin_tin/tin7.jpeg"
                      alt="Emerald Botanical Vessel"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="type-title text-[#F6F4EF] group-hover:text-white transition-colors">Emerald Botanical Vessel</h3>
                    <span className="type-micro text-[#8A8680] mt-1 block">Airtight friction seal with embossed crest</span>
                  </div>
                </Link>
              </ScrollReveal>

              {/* Wide landscape — offset higher */}
              <ScrollReveal animation="fadeUp" delay={0.15} className="col-span-12 sm:col-span-5">
                <Link href="/collections#atelier-accents" className="block group sm:-mt-16">
                  <div className="overflow-hidden aspect-[5/4] bg-[#2C2B28]">
                    <img
                      src="/images/small_anipics/framee.png"
                      alt="Hand-Carved Teak Frame"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="type-title text-[#F6F4EF] group-hover:text-white transition-colors">Hand-Carved Teak Frame</h3>
                    <span className="type-micro text-[#8A8680] mt-1 block">Solid reclaimed teak, velvet-backed</span>
                  </div>
                </Link>
              </ScrollReveal>

              {/* Square — sits flush at bottom */}
              <ScrollReveal animation="fadeUp" delay={0.3} className="col-span-12 sm:col-span-3">
                <Link href="/collections#atelier-accents" className="block group">
                  <div className="overflow-hidden aspect-square bg-[#2C2B28]">
                    <img
                      src="/images/Product_images/CRAFTED IN-HOUSE/candle_120.png"
                      alt="Botanical Amber Soy Candle"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pt-4">
                    <h3 className="type-title text-[#F6F4EF] group-hover:text-white transition-colors">Botanical Soy Candle</h3>
                    <span className="type-micro text-[#8A8680] mt-1 block">Pure essential oils, amber glass</span>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── 4. MATERIALITY & CRAFTSMANSHIP GRID ─── */}
        <section className="py-[100px] md:py-[140px] px-6 lg:px-12 bg-white border-y border-[#E0DDD6]">
          <div className="max-w-[1280px] mx-auto space-y-14">
            <SectionHeader
              label="Provenance"
              heading="The Anatomy of Materiality"
              body="Every element is chosen for tactile excellence and multi-generational longevity."
              align="center"
              className="max-w-none flex flex-col items-center"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10">
              {MATERIAL_STORIES.map((story, idx) => (
                <div key={idx} className="space-y-4 text-left">
                  <ParallaxImage
                    src={story.image}
                    alt={story.title}
                    aspect="aspect-[4/5]"
                    speed={0.08}
                  />
                  <div className="space-y-1.5 pt-2">
                    <span className="type-meta text-[#8A8680] block">{story.label}</span>
                    <h3 className="type-title text-[#1A1A18]">{story.title}</h3>
                    <p className="type-body text-[#8A8680] text-sm leading-relaxed">{story.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 5. THE SCRAPBOOK (Moments, Polaroids, In-View Reveals) ─── */}
        <Scrapbook />

        {/* ─── 6. BRAND VALUES (Dark Contrast Section) ─── */}
        <section className="bg-[#1A1A18] text-[#F6F4EF] py-[100px] md:py-[140px] px-6 lg:px-12">
          <div className="max-w-[1280px] mx-auto">
            <SectionHeader
              label="Our Commitment"
              heading="Made to Be Kept"
              body="We honour the ritual of gifting through uncompromising artisanal integrity."
              align="center"
              dark
              className="mb-16 max-w-none flex flex-col items-center"
            />

            <ScrollReveal staggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 max-w-[960px] mx-auto text-center md:text-left">
              {[
                {
                  title: 'Generational Craft',
                  body: 'Crafted by master fabricators, upholsterers, and woodworkers across India.',
                },
                {
                  title: 'Epicurean Distinction',
                  body: 'Single-origin Darjeeling teas, artisanal confitures, and hand-roasted nuts.',
                },
                {
                  title: 'Second Life Utility',
                  body: 'Every packaging vessel is engineered to serve as keepsake home decor for decades.',
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="type-title text-[#F6F4EF]">{item.title}</h4>
                  <p className="type-body text-[#B5AFA6] text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </section>

        {/* ─── 6. CORPORATE & CONCIERGE CTA ─── */}
        <section className="py-[110px] md:py-[150px] px-6 lg:px-12 text-center">
          <div className="max-w-[720px] mx-auto space-y-6">
            <ScrollReveal animation="fadeUp">
              <span className="type-meta text-[#8A8680] block">Private Concierge</span>
              <h2 className="type-heading text-[#1A1A18]">
                For those who give at scale.
              </h2>
              <p className="type-body text-[#8A8680] text-sm max-w-md mx-auto leading-relaxed">
                Bespoke corporate gifting, custom crest monograms, and curated presentations for institutions that value meaningful relationships.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <EditorialCTA label="Request Corporate Dossier" href="/corporate" />
                <EditorialCTA label="Contact Concierge" href="/contact" />
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>
    </div>
  );
}
