'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  Eye, 
  SlidersHorizontal,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';

type BrandDivision = 'all' | 'gourmet-gifts' | 'satra-atelier' | 'satra-living';

interface MaisonProduct {
  id: string;
  name: string;
  brand: 'The Gourmet Gifts' | 'Satra Atelier' | 'Satra Living';
  brandCategory: BrandDivision;
  price: number;
  image: string;
  secondaryImage?: string;
  provenance: string;
  materials: string;
  tag?: string;
  description: string;
}

const MAISON_PRODUCTS: MaisonProduct[] = [
  // ── The Gourmet Gifts Division ──
  {
    id: 'tgg-velvet-suite',
    name: 'The Royal Velvet Keepsake Suite',
    brand: 'The Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 14500,
    image: '/images/small_anipics/velvet_tray_hero.jpg',
    secondaryImage: '/images/Category_image/premium_velvet/vel1.jpeg',
    provenance: 'Jaipur Velvet Guild • Delhi NCR Metalcraft',
    materials: 'Midnight Blue Velvet, Solid Brass Latches, Teak Chassis',
    tag: 'Flagship Edition',
    description: 'A multi-tier bespoke keepsake chest upholstered in deep royal velvet with artisanal tea tins, fine confectionery, and leather journal.',
  },
  {
    id: 'tgg-botanical-tin',
    name: 'The Royale Botanical Keepsake Tin',
    brand: 'The Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 4850,
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    secondaryImage: '/images/Category_image/Royale_tin_tin/tin7.jpeg',
    provenance: 'Delhi NCR Atelier',
    materials: 'Architectural Tinplate, 24k Gold Filigree, Airtight Friction Seal',
    tag: 'Best Seller',
    description: 'Cold-cast architectural tinplate finished in forest-emerald lacquer with hand-screened 24k gold filigree.',
  },
  {
    id: 'tgg-burgundy-chest',
    name: 'The Imperial Burgundy Velvet Chest',
    brand: 'The Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 9800,
    image: '/images/Category_image/premium_velvet/vel1.jpeg',
    secondaryImage: '/images/Category_image/premium_velvet/vel2.jpeg',
    provenance: 'Jaipur Upholstery Guild',
    materials: 'Deep Crimson Velvet, Gold-Plated Hardware, Kiln-Dried Timber',
    description: 'Heirloom jewelry and memory box containing single-origin tea blends, spiced roasted nuts, and velvet-lined compartments.',
  },
  {
    id: 'tgg-heritage-tin-round',
    name: 'Heritage Cylindrical Keepsake',
    brand: 'The Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 3600,
    image: '/images/Category_image/Royale_tin_tin/tin7.jpeg',
    secondaryImage: '/images/Category_image/Royale_tin_tin/tin1.jpeg',
    provenance: 'Delhi NCR Metalcraft',
    materials: 'Heavyweight Tinplate, Hot-Stamped Botanical Relief',
    description: 'Airtight keepsake vessel designed to preserve artisanal loose-leaf teas and treasured personal keepsakes.',
  },

  // ── Satra Atelier Division ──
  {
    id: 'sat-teak-vault',
    name: 'Hand-Carved Teakwood Memory Vault',
    brand: 'Satra Atelier',
    brandCategory: 'satra-atelier',
    price: 18500,
    image: '/images/small_anipics/framee.png',
    secondaryImage: '/images/small_anipics/frame.png',
    provenance: 'Mumbai Master Woodcraft Guild',
    materials: 'Aged Teakwood, Pure Brass Hinges, Silk Velvet Base',
    tag: 'Limited Guild Masterwork',
    description: 'Intricately hand-carved solid teakwood presentation chest, oiled with organic botanical waxes.',
  },
  {
    id: 'sat-brass-keepsake-tray',
    name: 'The Octagonal Emerald Keepsake Tray',
    brand: 'Satra Atelier',
    brandCategory: 'satra-atelier',
    price: 7200,
    image: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
    secondaryImage: '/images/Category_image/premium_velvet/royale2.jpeg',
    provenance: 'Satra Atelier Studio',
    materials: 'Faceted Emerald Lacquer, Solid Brass Rim, Felt Base',
    description: 'Architectural octagonal valet tray designed for luxury desk organization and heirloom display.',
  },
  {
    id: 'sat-teak-portrait-frame',
    name: 'Heritage Artisanal Teak Frame',
    brand: 'Satra Atelier',
    brandCategory: 'satra-atelier',
    price: 5200,
    image: '/images/small_anipics/frame.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
    provenance: 'Mumbai Joinery Guild',
    materials: 'Reclaimed Teak, Hand-Cut Beveled Glass, Brass Fasteners',
    description: 'A museum-grade photographic keepsake frame designed to celebrate and honor family milestones.',
  },

  // ── Satra Living Division ──
  {
    id: 'sl-botanical-amber-candle',
    name: 'Botanical Amber Soy Candle Relic',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 2400,
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
    provenance: 'Himachal Wild Herb Guild',
    materials: 'Hand-Poured Soy Wax, Spiced Amber Essence, Solid Brass Lid',
    tag: 'Artisanal Batch',
    description: 'Slow-burning natural soy candle infused with rare Himalayan cedar, amber resins, and vanilla hazelnut.',
  },
  {
    id: 'sl-resin-duo-coasters',
    name: 'House Signature Marbled Resin Coasters (Set of 2)',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 2100,
    image: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
    provenance: 'Satra Creative Lab',
    materials: 'Food-Grade Resin, Gold Pigment Infusions, Cork Base',
    description: 'Cast by hand with organic flowing pigments inspired by forest emeralds and burnished brass mineral tones.',
  },
  {
    id: 'sl-velvet-lined-chest',
    name: 'The Heirloom Velvet-Lined Memory Chest',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 8900,
    image: '/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg',
    secondaryImage: '/images/Category_image/premium_velvet/royale3.jpeg',
    provenance: 'Pan-India Master Guild',
    materials: 'Solid Hardwood, Midnight Velvet Interior, Brass Vintage Latch',
    description: 'Designed as a permanent keepsake box for personal treasures, letters, and luxury timepieces.',
  },
];

export default function HouseOfSatraPage() {
  const [selectedDivision, setSelectedDivision] = useState<BrandDivision>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<MaisonProduct | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-[#F6F4EF] text-[#1A1A18] selection:bg-[#1A1A18] selection:text-[#F6F4EF]">
      
      {/* ═════════════════════════════════════════════════════════════════
          1. GRAND MAISON HERO & PROVENANCE
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full pt-32 sm:pt-40 pb-20 md:pb-28 px-6 lg:px-12 border-b border-[#E0DDD6] bg-[#FAF8F5]">
        <div className="max-w-[1360px] mx-auto">
          <ScrollReveal animation="fadeUp">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              
              {/* Sovereign Maison Crest */}
              <div className="relative w-16 h-12 mb-4">
                <Image
                  src="/images/brand/logo-vector.pdf.png"
                  alt="House of Satra"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-px w-8 bg-[#B5AFA6]" />
                <span className="type-meta text-[#7A8B6F] text-[10px] sm:text-xs tracking-[0.32em] uppercase font-semibold">
                  Maison &amp; Parent Ecosystem
                </span>
                <span className="h-px w-8 bg-[#B5AFA6]" />
              </div>

              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-light tracking-[-0.03em] text-[#1A1A18] leading-[1.05] mb-5 uppercase"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 500 }}
              >
                House of Satra
              </h1>

              <p className="font-script text-2xl sm:text-3xl md:text-4xl text-[#78746D] mb-6 rotate-[-0.5deg]">
                “The Sovereign House of Generational Craftsmanship &amp; Modern Luxury.”
              </p>

              <p className="text-sm sm:text-base text-[#6E6B65] max-w-2xl leading-relaxed font-light">
                House of Satra is the parent luxury maison uniting India’s master craft guilds. From curated culinary keepsakes and 24k gilded botanical tins to hand-carved teakwood vaults and bespoke velvet suites — every creation is designed to outlive the occasion.
              </p>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          2. THE HOUSE OF SATRA VERTICALS / BRAND MAISONS
          ═════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 lg:px-12 border-b border-[#E0DDD6]">
        <div className="max-w-[1360px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="type-meta text-[#8A8680] text-[9px] tracking-[0.3em] uppercase block mb-1">
                Portals of the Maison
              </span>
              <h2
                className="text-3xl sm:text-4xl text-[#1A1A18] font-light"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Our Specialized Houses
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#78746D] max-w-md">
              Each division operates with dedicated master artisans, honoring specific materials, techniques, and epicurean rituals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Division 01: The Gourmet Gifts (Flagship) */}
            <div className="group relative bg-[#FAF8F5] border border-[#DDD8CE] p-8 flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#7A8B6F] font-bold">
                    Division 01 // Flagship
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#E8E4DB] rounded-full text-[#1A1A18] font-mono">
                    4 Collections
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl text-[#1A1A18] font-normal uppercase mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600 }}
                >
                  The Gourmet Gifts
                </h3>

                <p className="text-xs text-[#78746D] leading-relaxed mb-6">
                  Curated gourmet keepsakes, royal velvet presentation chests, and 24k gilded botanical tins designed for lasting celebration.
                </p>

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1A18] mb-6">
                  <Image
                    src="/images/small_anipics/velvet_tray_hero.jpg"
                    alt="The Gourmet Gifts Flagship"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <Link
                href="/collections"
                className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E0DDD6] text-xs uppercase tracking-widest font-semibold text-[#1A1A18] group-hover:text-[#7A8B6F] transition-colors"
              >
                <span>Explore Storefront</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Division 02: Satra Atelier */}
            <div className="group relative bg-[#FAF8F5] border border-[#DDD8CE] p-8 flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#7A8B6F] font-bold">
                    Division 02 // Relics
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#E8E4DB] rounded-full text-[#1A1A18] font-mono">
                    Guild Series
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl text-[#1A1A18] font-normal uppercase mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600 }}
                >
                  Satra Atelier
                </h3>

                <p className="text-xs text-[#78746D] leading-relaxed mb-6">
                  Bespoke hand-carved teakwood memory vaults, cast brass joinery, and architectural memory vessels engineered by heritage woodcrafters.
                </p>

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1A18] mb-6">
                  <Image
                    src="/images/small_anipics/framee.png"
                    alt="Satra Atelier Craft"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedDivision('satra-atelier')}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E0DDD6] text-xs uppercase tracking-widest font-semibold text-[#1A1A18] group-hover:text-[#7A8B6F] transition-colors cursor-pointer"
              >
                <span>View Atelier Relics</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Division 03: Satra Living */}
            <div className="group relative bg-[#FAF8F5] border border-[#DDD8CE] p-8 flex flex-col justify-between hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all duration-500">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-[#7A8B6F] font-bold">
                    Division 03 // Homeware
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-[#E8E4DB] rounded-full text-[#1A1A18] font-mono">
                    Artisanal Batch
                  </span>
                </div>

                <h3
                  className="text-2xl sm:text-3xl text-[#1A1A18] font-normal uppercase mb-2"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600 }}
                >
                  Satra Living
                </h3>

                <p className="text-xs text-[#78746D] leading-relaxed mb-6">
                  Hand-poured botanical amber soy candles, marbled resin coasters, and tactile homeware relics designed for mindful spaces.
                </p>

                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1A18] mb-6">
                  <Image
                    src="/images/Product_images/CRAFTED IN-HOUSE/candle_120.png"
                    alt="Satra Living Collection"
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedDivision('satra-living')}
                className="inline-flex items-center justify-between w-full pt-4 border-t border-[#E0DDD6] text-xs uppercase tracking-widest font-semibold text-[#1A1A18] group-hover:text-[#7A8B6F] transition-colors cursor-pointer"
              >
                <span>View Living Series</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          3. MASTER E-COMMERCE CATALOG & MULTI-BRAND STOREFRONT
          ═════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-[#F6F4EF]" id="maison-catalog">
        <div className="max-w-[1360px] mx-auto">
          
          {/* Filter Bar & Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#E0DDD6] mb-10">
            <div>
              <span className="type-meta text-[#8A8680] text-[9px] tracking-[0.3em] uppercase block mb-1">
                Maison Catalog
              </span>
              <h2
                className="text-3xl sm:text-4xl text-[#1A1A18] font-light"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Heirloom Creations
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EBE7DF] rounded-full overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Creations' },
                { id: 'gourmet-gifts', label: 'The Gourmet Gifts' },
                { id: 'satra-atelier', label: 'Satra Atelier' },
                { id: 'satra-living', label: 'Satra Living' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDivision(tab.id as BrandDivision)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-wider font-semibold rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    selectedDivision === tab.id
                      ? 'bg-[#1A1A18] text-[#F6F4EF] shadow-sm'
                      : 'text-[#6E6B65] hover:text-[#1A1A18]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#FAF8F5] border border-[#DDD8CE] flex flex-col justify-between overflow-hidden hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all duration-500"
              >
                <div>
                  {/* Image Container with Badge */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE8E1]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />

                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-[#1A1A18]/90 backdrop-blur-sm text-[#F6F4EF] text-[8.5px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                        {product.tag}
                      </span>
                    )}

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md text-[#1A1A18] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hover:bg-white cursor-pointer shadow-sm"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#7A8B6F] font-bold block mb-1">
                      {product.brand}
                    </span>

                    <h3 className="text-base font-medium text-[#1A1A18] line-clamp-1 mb-1.5 group-hover:text-[#7A8B6F] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#78746D] line-clamp-2 leading-relaxed mb-3">
                      {product.description}
                    </p>

                    <div className="text-[10px] text-[#8A8680] font-mono mb-2 truncate">
                      {product.provenance}
                    </div>
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EAE6DE] mt-auto">
                  <span className="text-base font-semibold text-[#1A1A18]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                      addedId === product.id
                        ? 'bg-[#7A8B6F] text-white'
                        : 'bg-[#1A1A18] text-[#F6F4EF] hover:bg-[#333]'
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          4. ARTISAN GUILD MAP & MAISON STANDARDS
          ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 lg:px-12 bg-[#1A1A18] text-[#F6F4EF]">
        <div className="max-w-[1360px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-8 bg-[#7A8B6F]" />
                <span className="type-meta text-[#7A8B6F] text-[10px] tracking-[0.3em] uppercase">
                  Generational Provenance
                </span>
              </div>

              <h2
                className="text-3xl sm:text-5xl font-light tracking-tight leading-[1.1] text-white"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Master Guilds Across India
              </h2>

              <p className="text-sm text-[#B5AFA6] leading-relaxed font-light">
                House of Satra operates as a decentralized guild network. We do not manufacture mass consumer goods. Each piece passes through specialized generational ateliers:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-white/5 border border-white/10">
                  <h4 className="text-white text-sm font-semibold mb-1">Delhi NCR Metalcraft</h4>
                  <p className="text-xs text-[#8A8680]">Precision architectural tinplate, airtight tooling, and 24k gold screening.</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <h4 className="text-white text-sm font-semibold mb-1">Jaipur Velvet Guild</h4>
                  <p className="text-xs text-[#8A8680]">Hand-stretched royal midnight velvet over solid kiln-dried wood chassis.</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <h4 className="text-white text-sm font-semibold mb-1">Mumbai Teak Guild</h4>
                  <p className="text-xs text-[#8A8680]">Heritage timber joinery, hand-carved relief, and organic wax finishes.</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <h4 className="text-white text-sm font-semibold mb-1">Himalayan Botanicals</h4>
                  <p className="text-xs text-[#8A8680]">Small-batch amber soy waxes, single-origin teas, and artisanal spices.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden border border-white/15">
              <Image
                src="/images/Category_image/premium_velvet/vel2.jpeg"
                alt="House of Satra Guild Craft"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A8B6F] font-bold block mb-1">
                  Atelier Guarantee
                </span>
                <p className="text-lg font-serif italic">
                  “Every object is engineered to be preserved across generations.”
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ─── QUICK VIEW DETAIL MODAL ─── */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#FAF8F5] border border-[#DDD8CE] p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-[#8A8680] hover:text-[#1A1A18] text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="relative aspect-square w-full bg-[#ECE8E1] border border-[#DDD8CE] overflow-hidden">
                  <Image
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A8B6F] font-bold block">
                    {quickViewProduct.brand} • House of Satra
                  </span>

                  <h3
                    className="text-2xl text-[#1A1A18] font-normal"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    {quickViewProduct.name}
                  </h3>

                  <p className="text-xs text-[#6E6B65] leading-relaxed">
                    {quickViewProduct.description}
                  </p>

                  <div className="text-[11px] text-[#8A8680] space-y-1 pt-2 border-t border-[#E0DDD6]">
                    <p><strong className="text-[#1A1A18]">Materials:</strong> {quickViewProduct.materials}</p>
                    <p><strong className="text-[#1A1A18]">Provenance:</strong> {quickViewProduct.provenance}</p>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-[#1A1A18]">
                      ₹{quickViewProduct.price.toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => {
                        handleAddToCart(quickViewProduct);
                        setQuickViewProduct(null);
                      }}
                      className="bg-[#1A1A18] hover:bg-[#333] text-white text-xs uppercase tracking-widest px-5 py-2.5 font-semibold transition-colors cursor-pointer"
                    >
                      Add to Bag
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
