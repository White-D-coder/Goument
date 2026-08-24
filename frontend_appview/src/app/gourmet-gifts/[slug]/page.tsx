'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Package, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  Leaf, 
  Minus, 
  Plus, 
  Gift 
} from 'lucide-react';
import { getHamperBySlug, HAMPERS_CATALOG, HamperData } from '@/data/hampersData';
import { useCartStore } from '@/hooks/useCart';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

export default function HamperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const hamper = getHamperBySlug(resolvedParams.slug);

  if (!hamper) {
    notFound();
  }

  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const relatedHampers = HAMPERS_CATALOG.filter(
    (h) => h.slug !== hamper.slug && (h.category === hamper.category || true)
  ).slice(0, 4);

  const handleAddToCart = async () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);

    await addItem({
      productId: hamper._id,
      giftBoxingType: hamper.category,
      quantity: quantity,
      name: hamper.name,
      price: hamper.price * 100, // in paise
      image: hamper.image,
    });

    toast.success(`Added ${quantity} × ${hamper.name} to bag!`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      icon: '🎁',
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] pt-24 sm:pt-28 pb-20">
      
      {/* ─── BREADCRUMB & BACK NAVIGATION ─── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 mb-6 sm:mb-10">
        <Link
          href="/gourmet-gifts"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#78746D] hover:text-[#1A1A18] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Curated Hampers</span>
        </Link>
      </div>

      {/* ─── MAIN PRODUCT PRESENTATION ─── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* ── LEFT COLUMN: HIGH-RES PRODUCT GALLERY & PACKAGING BADGE ── */}
          <div className="lg:col-span-6 space-y-5 sticky lg:top-28">
            <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#EADBCA] relative">
              <div className="w-full aspect-[4/3] sm:aspect-[1/1] relative bg-[#F8F5EE]">
                <img
                  src={hamper.image}
                  alt={hamper.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Dietary Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-[#451B27] flex items-center gap-1.5 shadow-xs border border-[#EADBCA]">
                <Leaf className="w-3 h-3 text-[#7A8B6F]" />
                <span>{hamper.dietary}</span>
              </div>
            </div>

            {/* Packaging Highlight Banner */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F0ECE1] shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF5EC] border border-[#EADBCA] flex items-center justify-center shrink-0">
                <Package className="w-6 h-6 text-[#9E7B35]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8B6F] block">
                  Keepsake Packaging Style
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#451B27]">
                  {hamper.packaging_style}
                </p>
              </div>
            </div>

            {/* Highlights List */}
            <div className="flex flex-wrap gap-2 pt-1">
              {hamper.highlights.map((h, i) => (
                <span
                  key={i}
                  className="text-[11px] font-medium text-[#78746D] bg-[#F2EDE4] px-3 py-1 rounded-lg border border-[#E0D9CC]"
                >
                  ✦ {h}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: DETAILS, CONTENTS, ADD TO BAG & ENQUIRY ── */}
          <div className="lg:col-span-6 space-y-7">
            
            {/* Title & Category Header */}
            <div className="space-y-2">
              <span className="type-meta text-[#7A8B6F] text-[10px] sm:text-[11px] tracking-[0.25em] uppercase font-bold block">
                {hamper.categoryLabel}
              </span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A18] font-light leading-[1.08] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {hamper.name}
              </h1>
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-semibold text-[#451B27]">
                  ₹{hamper.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#78746D]">
                  / curated keepsake hamper
                </span>
              </div>
              <p className="text-[11px] text-[#8A8680]">
                Inclusive of all luxury gift presentation, personalized wax-sealed note card & taxes.
              </p>
            </div>

            {/* Narrative Editorial Description */}
            <p className="text-sm sm:text-base text-[#5A564F] leading-relaxed font-light border-y border-[#EADBCA] py-4">
              {hamper.description}
            </p>

            {/* ── WHAT'S INSIDE / CURATED SPECIFICATIONS ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1A1A18] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#9E7B35]" />
                  <span>Curated Contents ({hamper.inside_items.length} Delicacies):</span>
                </h2>
                <span className="text-[11px] text-[#7A8B6F] font-semibold">
                  Shelf Life: {hamper.shelfLife}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {hamper.inside_items.map((it, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3.5 rounded-xl border border-[#F0ECE1] shadow-2xs flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[9.5px] font-bold text-[#8A8680] uppercase tracking-wider block">
                        Item 0{idx + 1}
                      </span>
                      <p className="text-xs font-semibold text-[#451B27]">
                        {it.item}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-[#9E7B35] bg-[#FAF5EC] px-2.5 py-1 rounded-md border border-[#EADBCA]">
                      {it.weight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── QUANTITY SELECTOR & CTAS ── */}
            <div className="space-y-4 pt-2">
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

                {/* Add to Bag Button */}
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
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span>•</span>
                      <span>₹{(hamper.price * quantity).toLocaleString('en-IN')}</span>
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
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10 mt-20 sm:mt-28 pt-12 border-t border-[#EADBCA]">
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
            className="text-xs font-semibold text-[#9E7B35] hover:text-[#451B27] inline-flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedHampers.map((item) => (
            <Link
              key={item._id}
              href={`/gourmet-gifts/${item.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between border border-[#F0ECE1] group"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-[#FBF7F0]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3
                    className="text-base font-bold text-[#451B27] leading-snug line-clamp-1 group-hover:text-[#7A1C29] transition-colors"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#7A7268]">
                    from ₹{item.price.toLocaleString('en-IN')} / hamper
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#9E7B35] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
