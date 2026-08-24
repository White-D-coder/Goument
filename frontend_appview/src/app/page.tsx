'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ArrowRight, Eye, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import HouseOfSatraIntro from '@/components/editorial/HouseOfSatraIntro';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════
   PRODUCT DATA
   ═══════════════════════════════════════════════ */

type BrandDivision = 'all' | 'gourmet-gifts' | 'satra-atelier' | 'satra-living';

interface MaisonProduct {
  id: string;
  name: string;
  brand: string;
  brandCategory: BrandDivision;
  price: number;
  image: string;
  secondaryImage?: string;
  description: string;
}

const MAISON_PRODUCTS: MaisonProduct[] = [
  {
    id: 'tgg-velvet-suite',
    name: 'Royal Velvet Keepsake Suite',
    brand: 'Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 0,
    image: '/images/small_anipics/velvet_tray_hero.jpg',
    secondaryImage: '/images/Category_image/premium_velvet/vel1.jpeg',
    description: 'Multi-tier bespoke keepsake chest in deep royal velvet.',
  },
  {
    id: 'tgg-botanical-tin',
    name: 'Royale Botanical Keepsake Tin',
    brand: 'Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 0,
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    secondaryImage: '/images/Category_image/Royale_tin_tin/tin7.jpeg',
    description: 'Architectural tinplate with 24k gold filigree.',
  },
  {
    id: 'tgg-burgundy-chest',
    name: 'Imperial Burgundy Velvet Chest',
    brand: 'Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 0,
    image: '/images/Category_image/premium_velvet/vel1.jpeg',
    secondaryImage: '/images/Category_image/premium_velvet/vel2.jpeg',
    description: 'Heirloom velvet memory box with gold-plated hardware.',
  },
  {
    id: 'sat-octagonal-tray',
    name: 'Heritage Octagonal Valet Tray',
    brand: 'Satra Atelier',
    brandCategory: 'satra-atelier',
    price: 0,
    image: '/images/small_anipics/framee.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
    description: 'Architectural brass and teak desk organizer.',
  },
  {
    id: 'sat-teak-frame',
    name: 'Heritage Artisanal Teak Frame',
    brand: 'Satra Atelier',
    brandCategory: 'satra-atelier',
    price: 0,
    image: '/images/small_anipics/frame.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
    description: 'Museum-grade photographic keepsake frame.',
  },
  {
    id: 'sl-candle',
    name: 'Botanical Amber Soy Candle',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 0,
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
    description: 'Hand-poured soy candle with Himalayan cedar and amber.',
  },
  {
    id: 'sl-coasters',
    name: 'Marbled Resin Coasters',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 0,
    image: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
    description: 'Hand-cast resin with organic pigment flows.',
  },
  {
    id: 'sl-velvet-chest',
    name: 'Heirloom Velvet Memory Chest',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 0,
    image: '/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg',
    secondaryImage: '/images/Category_image/premium_velvet/royale3.jpeg',
    description: 'Permanent keepsake box for personal treasures.',
  },
];

/* ═══════════════════════════════════════════════
   HOMEPAGE
   ═══════════════════════════════════════════════ */

export default function HouseOfSatraHomePage() {
  const [selectedDivision, setSelectedDivision] = useState<BrandDivision>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<MaisonProduct | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = selectedDivision === 'all'
    ? MAISON_PRODUCTS
    : MAISON_PRODUCTS.filter((p) => p.brandCategory === selectedDivision);

  const handleAddToCart = (product: MaisonProduct) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price * 100,
      image: product.image,
      quantity: 1,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  /* ─── Hero Parallax ─── */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const heroImg = heroRef.current?.querySelector('.hero-img');
      if (heroImg) {
        gsap.fromTo(heroImg,
          { scale: 1.0 },
          { scale: 1.06, duration: 14, ease: 'none', repeat: -1, yoyo: true }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative selection:bg-[var(--satra-charcoal)] selection:text-[var(--satra-ivory)]">
      <HouseOfSatraIntro />

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO — Sovereign Maison Grand Stage (Distinct from Gourmet Gifts)
          ═══════════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full h-screen min-h-[640px] overflow-hidden bg-[#121211]">
        {/* Background Image: Deep Sovereign Executive Atelier */}
        <div className="absolute inset-0">
          <Image
            src="/images/Category_image/premium_velvet/vel2.jpeg"
            alt="House of Satra — Sovereign Luxury Maison"
            fill
            className="hero-img object-cover object-center filter brightness-[0.68] contrast-[1.08]"
            priority
            sizes="100vw"
          />
          {/* Multi-tier Noir Ambient Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121211] via-black/40 to-black/60 pointer-events-none" />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 20%, rgba(10,10,9,0.7) 100%)',
            }}
          />
        </div>

        {/* ─── Architectural Grayscale Diagonal Parallelogram Lens (Desktop) ─── */}
        <div 
          className="hidden lg:block absolute top-0 bottom-0 right-[10%] xl:right-[14%] w-[160px] xl:w-[210px] pointer-events-none z-[5] overflow-hidden"
          style={{
            clipPath: 'polygon(38% 0%, 100% 0%, 62% 100%, 0% 100%)',
            boxShadow: '0 0 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* Grayscale Background Slice */}
          <div className="absolute inset-0 w-[100vw] h-full right-0" style={{ transform: 'translateX(calc(-100vw + 100% + 14vw))' }}>
            <Image
              src="/images/Category_image/premium_velvet/vel2.jpeg"
              alt="House of Satra Monochrome Lens"
              fill
              className="object-cover object-center filter grayscale contrast-[1.25] brightness-[0.88]"
              priority
            />
          </div>

          {/* Frosted Lens Lighting & Hairline Borders */}
          <div className="absolute inset-0 bg-black/10 border-x border-white/20 backdrop-contrast-125" />
          
          {/* Subtle Vertical Guild Caption along the diagonal */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 rotate-[-90deg] origin-center whitespace-nowrap text-[8.5px] uppercase tracking-[0.35em] text-white/50 font-mono">
            Maison Atelier • Monochrome Lens
          </div>
        </div>

        {/* Hero Content — Grand Centered Sovereign Identity */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <ScrollReveal animation="fadeUp">
            <div className="max-w-3xl flex flex-col items-center space-y-4 sm:space-y-5">
              
              {/* Grand Brand Wordmark */}
              <h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.06em] sm:tracking-[0.1em] text-white uppercase leading-[0.92]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                House of Satra
              </h1>

              {/* Poetic Line */}
              <p className="font-serif italic text-base sm:text-lg md:text-xl text-white/75 max-w-lg">
                “Form &amp; Permanence.”
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 sm:pt-5">
                <Link
                  href="#divisions"
                  className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#1A1A18] text-[10.5px] uppercase tracking-[0.25em] font-semibold hover:bg-[#F6F4EF] hover:shadow-[0_8px_25px_rgba(255,255,255,0.15)] transition-all duration-300 group"
                >
                  <span>Explore Divisions</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/gourmet-gifts"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 bg-black/30 backdrop-blur-md text-white text-[10.5px] uppercase tracking-[0.25em] font-semibold hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  <span>The Gourmet Gifts ⟶</span>
                </Link>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. THREE DIVISIONS — Asymmetric Editorial Grid
          ═══════════════════════════════════════════════════════════════ */}
      <section id="divisions" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10" style={{ borderBottom: '1px solid var(--satra-linen)' }}>
        <div className="max-w-[1440px] mx-auto">

          {/* Asymmetric Grid: Gourmet (60%) | Atelier + Living stacked (40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[3px] sm:gap-1">

            {/* Division 01: The Gourmet Gifts — Large */}
            <Link
              href="/gourmet-gifts"
              className="group relative lg:col-span-7 aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:min-h-[640px] overflow-hidden img-grayscale-hover"
            >
              <Image
                src="/images/small_anipics/velvet_tray_hero.jpg"
                alt="The Gourmet Gifts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10 z-10">
                <span className="type-meta text-white/60 block mb-2">Division 01</span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl text-white font-light uppercase tracking-tight mb-3"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  The Gourmet<br />Gifts
                </h2>
                <span className="inline-flex items-center gap-2 text-white/70 group-hover:text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            {/* Right Column: Atelier (top) + Living (bottom) */}
            <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-[3px] sm:gap-1">

              {/* Division 02: Satra Atelier */}
              <Link
                href="/collections"
                className="group relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto lg:min-h-[318px] overflow-hidden img-grayscale-hover"
              >
                <Image
                  src="/images/small_anipics/framee.png"
                  alt="Satra Atelier"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  <span className="type-meta text-white/60 block mb-1.5">Division 02</span>
                  <h3
                    className="text-xl sm:text-2xl lg:text-3xl text-white font-light uppercase tracking-tight mb-2"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Satra Atelier
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-white/60 group-hover:text-white text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>

              {/* Division 03: Satra Living */}
              <Link
                href="/story"
                className="group relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto lg:min-h-[318px] overflow-hidden img-grayscale-hover"
              >
                <Image
                  src="/images/Product_images/CRAFTED IN-HOUSE/candle_120.png"
                  alt="Satra Living"
                  fill
                  className="object-contain p-8 sm:object-cover sm:p-0"
                  style={{ backgroundColor: 'var(--satra-charcoal)' }}
                  sizes="(max-width: 1024px) 50vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10">
                  <span className="type-meta text-white/60 block mb-1.5">Division 03</span>
                  <h3
                    className="text-xl sm:text-2xl lg:text-3xl text-white font-light uppercase tracking-tight mb-2"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Satra Living
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-white/60 group-hover:text-white text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. EDITORIAL MOODBOARD COLLAGE — 7 Tiles
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10" style={{ borderBottom: '1px solid var(--satra-linen)' }}>
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal animation="fadeUp">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight uppercase"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--satra-charcoal)' }}
              >
                The Art of Giving
              </h2>
            </div>
          </ScrollReveal>

          {/* 7-Tile Asymmetric Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-[3px] sm:gap-1 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px]">
            {[
              { src: '/images/collage/01.jpg', hover: '/images/collage/01-hover.jpg', col: 'col-span-2 lg:col-span-4', row: 'row-span-2' },
              { src: '/images/collage/02.jpg', hover: '/images/collage/02-hover.jpg', col: 'col-span-2 lg:col-span-3', row: 'row-span-1' },
              { src: '/images/collage/03.jpg', hover: '/images/collage/03-hover.jpg', col: 'col-span-2 sm:col-span-2 lg:col-span-5', row: 'row-span-2' },
              { src: '/images/collage/04.jpg', hover: '/images/collage/04-hover.jpg', col: 'col-span-2 lg:col-span-3', row: 'row-span-1' },
              { src: '/images/collage/05.jpg', hover: '/images/collage/05-hover.jpg', col: 'col-span-2 lg:col-span-5', row: 'row-span-1' },
              { src: '/images/collage/06.jpg', hover: '/images/collage/06-hover.jpg', col: 'col-span-2 lg:col-span-4', row: 'row-span-1' },
              { src: '/images/collage/07.jpg', hover: '/images/collage/07-hover.jpg', col: 'col-span-2 sm:col-span-2 lg:col-span-3', row: 'row-span-1' },
            ].map((tile, i) => (
              <div
                key={i}
                className={`${tile.col} ${tile.row} relative overflow-hidden img-grayscale-hover group cursor-pointer`}
              >
                <Image
                  src={tile.src}
                  alt={`Editorial ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. PRODUCT CATALOG — Asymmetric Editorial Grid
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10" id="maison-catalog" style={{ borderBottom: '1px solid var(--satra-linen)' }}>
        <div className="max-w-[1440px] mx-auto">

          {/* Header + Filter */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight uppercase"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--satra-charcoal)' }}
            >
              Creations
            </h2>

            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'All' },
                { id: 'gourmet-gifts', label: 'Gourmet Gifts' },
                { id: 'satra-atelier', label: 'Atelier' },
                { id: 'satra-living', label: 'Living' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDivision(tab.id as BrandDivision)}
                  className={`px-3.5 py-2 text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 whitespace-nowrap cursor-pointer border-b-[1.5px] ${
                    selectedDivision === tab.id
                      ? 'border-[var(--satra-charcoal)] text-[var(--satra-charcoal)]'
                      : 'border-transparent text-[var(--satra-stone)] hover:text-[var(--satra-charcoal)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Asymmetric Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-[3px] sm:gap-1">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className={`group bg-[var(--satra-silk)] overflow-hidden cursor-pointer ${
                  i === 0 ? 'col-span-2 lg:col-span-2 row-span-1' : ''
                }`}
                onClick={() => setQuickViewProduct(product)}
              >
                {/* Image Container — Swap on Hover */}
                <div className={`relative w-full overflow-hidden product-card-images ${
                  i === 0 ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[3/4] sm:aspect-[4/5]'
                }`} style={{ backgroundColor: 'var(--satra-linen)' }}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="img-primary object-cover object-center"
                    sizes={i === 0 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 50vw, 33vw'}
                  />
                  {product.secondaryImage && (
                    <Image
                      src={product.secondaryImage}
                      alt={product.name}
                      fill
                      className="img-secondary object-cover object-center"
                      sizes={i === 0 ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 50vw, 33vw'}
                    />
                  )}

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white font-medium bg-black/50 backdrop-blur-sm px-4 py-2">
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Product Info — Minimal */}
                <div className="p-3 sm:p-4">
                  <h3
                    className="text-sm sm:text-base font-medium mb-0.5 line-clamp-1"
                    style={{ color: 'var(--satra-charcoal)' }}
                  >
                    {product.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#7A8B6F] uppercase tracking-wider">
                    Bespoke Keepsake
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. ARTISAN PROVENANCE — Dark Editorial Section
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-10" style={{ backgroundColor: 'var(--satra-obsidian)', color: 'var(--satra-ivory)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left — Image */}
            <ScrollReveal animation="fadeUp">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/Category_image/premium_velvet/vel2.jpeg"
                  alt="Guild Craftsmanship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </ScrollReveal>

            {/* Right — Copy */}
            <ScrollReveal animation="fadeUp">
              <div className="space-y-6 lg:pl-4">
                <span className="type-meta block" style={{ color: 'var(--satra-emerald-soft)' }}>
                  Provenance
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-white uppercase"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Master Guilds<br />Across India
                </h2>
                <p className="text-sm leading-relaxed font-light max-w-md" style={{ color: 'var(--satra-taupe)' }}>
                  Each piece passes through specialized generational ateliers — from Delhi metalcraft to Jaipur velvet upholstery.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  {[
                    { name: 'Delhi NCR Metalcraft', desc: 'Precision tinplate & 24k filigree' },
                    { name: 'Jaipur Velvet Guild', desc: 'Royal velvet over kiln-dried hardwood' },
                    { name: 'Mumbai Teak Guild', desc: 'Heritage timber joinery & relief' },
                    { name: 'Himalayan Botanicals', desc: 'Small-batch soy waxes & teas' },
                  ].map((guild) => (
                    <div key={guild.name} className="p-4 border border-white/8">
                      <h4 className="text-white text-xs font-semibold mb-1">{guild.name}</h4>
                      <p className="text-[11px]" style={{ color: 'var(--satra-stone)' }}>{guild.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. CORPORATE CTA — Minimal Banner
          ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-4 sm:px-6 lg:px-10 text-center" style={{ borderBottom: '1px solid var(--satra-linen)' }}>
        <ScrollReveal animation="fadeUp">
          <div className="max-w-2xl mx-auto">
            <span className="type-meta block mb-4" style={{ color: 'var(--satra-stone)' }}>Corporate</span>
            <h2
              className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight uppercase mb-5"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--satra-charcoal)' }}
            >
              Gifting,<br />made meaningful.
            </h2>
            <Link
              href="/corporate"
              className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 group px-8 py-4 border"
              style={{
                backgroundColor: 'var(--satra-charcoal)',
                color: 'var(--satra-ivory)',
                borderColor: 'var(--satra-charcoal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--satra-charcoal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--satra-charcoal)';
                e.currentTarget.style.color = 'var(--satra-ivory)';
              }}
            >
              <span>Make an Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          QUICK VIEW MODAL
          ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full border shadow-2xl"
              style={{ backgroundColor: 'var(--satra-silk)', borderColor: 'var(--satra-border)' }}
            >
              {/* Close */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-xs font-mono cursor-pointer z-10"
                style={{ color: 'var(--satra-stone)' }}
              >
                
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: 'var(--satra-linen)' }}>
                  <Image
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="type-meta block mb-2" style={{ color: 'var(--satra-emerald-soft)' }}>
                      {quickViewProduct.brand}
                    </span>
                    <h3
                      className="text-xl sm:text-2xl font-normal mb-3"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', color: 'var(--satra-charcoal)' }}
                    >
                      {quickViewProduct.name}
                    </h3>
                    <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--satra-warm-gray)' }}>
                      {quickViewProduct.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--satra-linen)' }}>
                    <span className="text-xs font-semibold text-[#7A8B6F] uppercase tracking-wider">
                      Bespoke Curation
                    </span>
                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setTimeout(() => setQuickViewProduct(null), 600);
                      }}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer"
                      style={{ backgroundColor: 'var(--satra-charcoal)', color: 'var(--satra-ivory)' }}
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
