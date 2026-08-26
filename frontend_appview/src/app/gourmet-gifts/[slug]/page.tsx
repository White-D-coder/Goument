'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Leaf, 
  ShieldCheck, 
  Truck, 
  Gift, 
  PackageCheck, 
  Plus, 
  Minus, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { HAMPERS_CATALOG, getHamperBySlug } from '@/data/hampersData';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export default function HamperDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const hamper = getHamperBySlug(resolvedParams.slug);

  if (!hamper) {
    notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(hamper.image);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  // Gallery items (fallback to main product images)
  const galleryImages = [
    hamper.image,
    '/images/infinity/bookmarks.jpg',
    '/images/personalisation/festive.jpg',
  ];

  const handleAddToCart = async () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2500);

    await addItem({
      productId: hamper._id,
      giftBoxingType: hamper.category,
      quantity: quantity,
      name: hamper.name,
      price: 0,
      image: hamper.image,
    });

    toast.success(`Added ${quantity} × ${hamper.name} to Curation Tray`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      duration: 2000,
    });
  };

  const relatedHampers = HAMPERS_CATALOG.filter(
    (h) => h.category === hamper.category && h._id !== hamper._id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] pt-24 sm:pt-28 pb-20">
      
      {/* ─── BREADCRUMB & BACK NAVIGATION ─── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8">
        <Link
          href="/gourmet-gifts"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#78746D] hover:text-[#1A1A18] transition-colors group font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Curated Hampers</span>
        </Link>
      </div>

      {/* ─── MAIN PRODUCT PRESENTATION (STICKY LEFT COLUMN) ─── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: STICKY GALLERY & THUMBNAILS ── */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            {/* Main Stage Image */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#EADBCA] relative">
              <div className="w-full aspect-[4/3] sm:aspect-[1/1] relative bg-[#F8F5EE]">
                <Image
                  src={selectedImage}
                  alt={hamper.name}
                  fill
                  priority
                  className="object-cover transition-all duration-300"
                />
              </div>

              {/* Floating Dietary Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#451B27] flex items-center gap-1.5 shadow-xs border border-[#EADBCA]">
                <Leaf className="w-3 h-3 text-[#7A8B6F]" />
                <span>{hamper.dietary}</span>
              </div>
            </div>

            {/* Thumbnail Row instead of text box */}
            <div className="flex items-center gap-3 pt-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white relative ${
                    selectedImage === img
                      ? 'border-[#9E7B35] ring-2 ring-[#9E7B35]/25 shadow-sm scale-105'
                      : 'border-[#E0DDD6] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View image thumbnail ${idx + 1}`}
                >
                  <Image src={img} alt={`${hamper.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: DETAILS, CURATED CONTENTS, HIGHLIGHTS & ACTIONS ── */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Category Header */}
            <div className="space-y-1.5">
              <span className="type-meta text-[#7A8B6F] text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold block">
                {hamper.categoryLabel}
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A18] font-light leading-[1.08] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {hamper.name}
              </h1>
              {(hamper.subCopy || hamper.description) && (
                <p className="text-sm sm:text-base text-[#5A564F] leading-relaxed font-light pt-1">
                  {hamper.subCopy || hamper.description}
                </p>
              )}
            </div>

            {/* ── CURATED CONTENTS & HIGHLIGHTS ── */}
            <div className="space-y-3.5">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A1A18] flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-[#9E7B35]" />
                <span>Curated Contents:</span>
              </h2>

              {/* Items Inside Table (Left: Item Name, Right: Quantity) */}
              <div className="border-t border-b border-[#EADBCA] divide-y divide-[#EADBCA]/60">
                {hamper.inside_items.map((it, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10.5px] font-mono text-[#8A8680] uppercase tracking-wider">
                        0{idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#1A1A18]">
                        {it.item}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-mono font-medium text-[#78746D] shrink-0">
                      {it.weight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sensory Highlights List Under Curated Contents */}
              {hamper.highlights && hamper.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {hamper.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-medium text-[#6B655D] bg-[#F2EDE4] px-3 py-1.5 rounded-lg border border-[#E0D9CC]"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ── QUANTITY SELECTOR & CTAS ── */}
            <div className="space-y-4 pt-3 border-t border-[#EADBCA]">
              <div className="flex items-center gap-4">
                {/* Quantity Pill */}
                <div className="inline-flex items-center border border-[#D6D1C7] bg-white rounded-xl p-1 shadow-2xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1A1A18] hover:bg-[#F2EDE4] disabled:opacity-30 cursor-pointer transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-[#1A1A18]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1A1A18] hover:bg-[#F2EDE4] cursor-pointer transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Curation Tray Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 ${
                    isAdded
                      ? 'bg-[#7A8B6F] text-white'
                      : 'bg-[#451B27] hover:bg-[#33141D] text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Curation Tray</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Curation Tray</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bulk / Corporate Gifting Enquire Button */}
              <Link
                href={`/inquire?hamper=${encodeURIComponent(hamper.name)}`}
                className="w-full text-center py-3.5 border border-[#C5A880] text-[#9E7B35] hover:bg-[#C5A880] hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all block shadow-2xs hover:shadow-xs"
              >
                Enquire for Bespoke / Corporate Orders →
              </Link>
            </div>

            {/* ── MAISON ASSURANCES ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#EADBCA]">
              <div className="flex items-center gap-2.5 text-xs text-[#5A564F]">
                <ShieldCheck className="w-4 h-4 text-[#7A8B6F] shrink-0" />
                <span>Small-Batch Artisanal</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#5A564F]">
                <Truck className="w-4 h-4 text-[#7A8B6F] shrink-0" />
                <span>Pan-India Safe Express</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#5A564F]">
                <Gift className="w-4 h-4 text-[#7A8B6F] shrink-0" />
                <span>Wax-Sealed Gift Card</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ─── RELATED HAMPERS SECTION ─── */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 mt-16 sm:mt-24 pt-12 border-t border-[#EADBCA]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="type-meta text-[#7A8B6F] text-[10px] tracking-[0.25em] uppercase font-bold block mb-1">
              You May Also Admire
            </span>
            <h2
              className="text-2xl sm:text-3xl text-[#1A1A18] font-light"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Complementary Hampers
            </h2>
          </div>
          <Link
            href="/gourmet-gifts"
            className="text-xs uppercase font-semibold text-[#9E7B35] hover:text-[#7A1C29] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedHampers.map((rel) => (
            <Link
              key={rel._id}
              href={`/gourmet-gifts/${rel.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-[#EADBCA] shadow-2xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-[4/3] bg-[#FAF6F0] relative overflow-hidden">
                <Image
                  src={rel.image}
                  alt={rel.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    {rel.categoryLabel}
                  </span>
                  <h3
                    className="text-lg font-bold text-[#451B27] group-hover:text-[#7A1C29] transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    {rel.name}
                  </h3>
                  <p className="text-xs text-[#78746D] line-clamp-2 font-light">
                    {rel.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#F0ECE1] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#7A8B6F] uppercase tracking-wider">
                    Bespoke Keepsake
                  </span>
                  <span className="text-xs font-bold text-[#9E7B35] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Discover</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
