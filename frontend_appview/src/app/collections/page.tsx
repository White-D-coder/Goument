'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Check,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { HAMPERS_CATALOG, CATALOGUE_CATEGORIES, HamperData } from '@/data/hampersData';
import { useCartStore } from '@/hooks/useCart';

function CollectionsCatalogueContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Default to first category if requested or specific category
  const [selectedCategory, setSelectedCategory] = useState<string>('gourmet-food');

  useEffect(() => {
    if (categoryParam) {
      const exists = CATALOGUE_CATEGORIES.some((c) => c.id === categoryParam);
      if (exists) {
        setSelectedCategory(categoryParam);
      }
    }
  }, [categoryParam]);

  // Filter Products
  const filteredProducts = useMemo(() => {
    let list = HAMPERS_CATALOG;
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }
    return list;
  }, [selectedCategory]);

  const activeCategoryMeta = CATALOGUE_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] pt-18 sm:pt-24 pb-16">
      
      {/* ─── TOP HEADER SECTION: BREADCRUMBS & CENTERED TITLE ─── */}
      <section className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 mb-3 sm:mb-6">
        
        {/* Working Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#8C847B] mb-2 sm:mb-3">
          <Link href="/" className="hover:text-[#1A1A18] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />
          <Link href="/#catalogue" className="hover:text-[#1A1A18] transition-colors">
            Catalogue
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />
          <span className="text-[#1A1A18] font-medium truncate max-w-[160px] sm:max-w-none">
            {activeCategoryMeta?.label || 'All Items'}
          </span>
        </nav>

        {/* Centered Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto py-1">
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {activeCategoryMeta?.label || 'Curated Catalogue'}
          </h1>
          {activeCategoryMeta?.subtitle && (
            <p className="text-xs sm:text-sm text-[#78746D] font-light mt-1 max-w-lg mx-auto leading-relaxed">
              {activeCategoryMeta.subtitle}
            </p>
          )}
        </div>

      </section>

      {/* ─── MOBILE CATEGORY HORIZONTAL SCROLL BAR (CLEAN SQUIRCLE + TEXT, NO ENCLOSING BOX) ─── */}
      <div className="lg:hidden w-full mb-4 py-1">
        <div className="flex gap-3.5 overflow-x-auto px-4 pt-2 pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATALOGUE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex flex-col items-center shrink-0 snap-start transition-all duration-200 cursor-pointer focus:outline-none w-[74px]"
              >
                {/* Compact Squircle Image Frame (Image 2 style) */}
                <div
                  className={`w-14 h-14 rounded-[18px] p-[2px] shrink-0 transition-all duration-300 relative ${
                    isSelected
                      ? `${cat.pastelActive} scale-105 shadow-md ring-2 ring-[#DFC299]`
                      : `bg-[#EAE5DC] ${cat.pastelHover}`
                  }`}
                >
                  <div className="w-full h-full rounded-[15px] bg-[#FAF8F5] overflow-hidden relative">
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                  </div>

                  {/* Active Indicator Badge */}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1A1A18] text-[#DFC299] flex items-center justify-center text-[8px] shadow-xs z-10">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                {/* Category Title Below Image (Image 2 style) */}
                <span
                  className={`text-[9px] font-sans font-semibold uppercase tracking-[0.06em] mt-1.5 text-center leading-[1.25] w-full break-normal transition-colors ${
                    isSelected ? 'text-[#1A1A18] font-bold' : 'text-[#6B655D]'
                  }`}
                >
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── MAIN WORKSPACE: SIDEBAR ON DESKTOP & PRODUCT GRID ─── */}
      <main className="max-w-[1580px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ══════════════════════════════════════════════════════════════════
              DESKTOP SIDEBAR: 2-COLUMN CATEGORIES
              ══════════════════════════════════════════════════════════════════ */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] p-4 sm:p-5 shadow-xs sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#ECE7DE]">
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#1A1A18] font-bold">
                Categories
              </span>
              <span className="text-[10px] text-[#8C847B] font-mono">
                {CATALOGUE_CATEGORIES.length} Divisions
              </span>
            </div>

            {/* 2-COLUMN GRID OF BORDERLESS CATEGORY TILES */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              {CATALOGUE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-300 group cursor-pointer text-center relative focus:outline-none"
                  >
                    {/* Squircle Image Frame */}
                    <div
                      className={`w-16 h-16 sm:w-18 sm:h-18 rounded-[18px] sm:rounded-[20px] p-[2.5px] shrink-0 transition-all duration-300 relative ${
                        isSelected 
                          ? `${cat.pastelActive} scale-110 shadow-md ring-2 ring-[#DFC299]` 
                          : `bg-[#EAE5DC] ${cat.pastelHover} group-hover:scale-105 group-hover:shadow-xs`
                      }`}
                    >
                      <div className="w-full h-full rounded-[15px] sm:rounded-[17px] bg-[#FAF8F5] overflow-hidden relative">
                        <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                      </div>

                      {/* Active Check Badge */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1A1A18] text-[#DFC299] flex items-center justify-center text-[9px] shadow-xs z-10">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>

                    {/* Title Below Image */}
                    <span
                      className={`text-[11px] sm:text-[12px] font-bold uppercase tracking-wider mt-2.5 line-clamp-2 leading-tight transition-colors w-full px-1 ${
                        isSelected ? 'text-[#1A1A18]' : 'text-[#6B655D] group-hover:text-[#1A1A18]'
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* ══════════════════════════════════════════════════════════════════
              MAIN SECTION: RESPONSIVE 2-COLUMN MOBILE / 3-COLUMN DESKTOP GRID
              ══════════════════════════════════════════════════════════════════ */}
          <section className="lg:col-span-8 xl:col-span-9">
            
            {/* ── PRODUCT CARDS GRID ── */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-[#D5CFBF] p-10 sm:p-12 text-center space-y-3">
                <p className="text-sm sm:text-base text-[#7A7268] font-light">
                  No curations found in this category.
                </p>
                <button
                  onClick={() => setSelectedCategory('gourmet-food')}
                  className="text-xs font-bold uppercase tracking-wider text-[#9E7B35] underline cursor-pointer"
                >
                  View Gourmet Food
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-5 md:gap-6">
                {filteredProducts.map((item) => {
                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col justify-between border border-[#EFEAE2] group"
                    >
                      {/* Product Image */}
                      <div className="w-full aspect-[4/3] overflow-hidden bg-[#FAF6F0] relative block">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>

                      {/* Content Body */}
                      <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-xs sm:text-[15px] md:text-[16px] font-semibold text-[#1A1A18] leading-tight line-clamp-1 tracking-tight font-sans">
                            {item.name}
                          </h3>
                          <p className="text-[10.5px] sm:text-xs text-[#7A7268] font-light line-clamp-2 leading-relaxed">
                            {item.subCopy}
                          </p>
                        </div>

                        {/* Direct WhatsApp Enquiry Quick Button */}
                        <div className="pt-2.5 sm:pt-3.5 mt-auto">
                          <a
                            href={`https://wa.me/917021463609?text=${encodeURIComponent(`Hi! I'm interested in "${item.name}" from your ${activeCategoryMeta?.label || 'curated'} collection.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 sm:py-2 px-2.5 bg-[#FAF8F5] hover:bg-[#1A1A18] text-[#1A1A18] hover:text-[#DFC299] border border-[#E0D9CE] hover:border-[#1A1A18] rounded-lg text-[9.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center justify-center gap-1 transition-all duration-200"
                          >
                            <span>ENQUIRE</span>
                            <span className="text-[10px]">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </section>

        </div>
      </main>

    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-xs font-mono tracking-widest text-[#8C847B]">LOADING CATALOGUE...</div>}>
      <CollectionsCatalogueContent />
    </Suspense>
  );
}
