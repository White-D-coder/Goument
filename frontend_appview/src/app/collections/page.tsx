'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ArrowRight, 
  Minus, 
  Plus, 
  Check,
  SlidersHorizontal
} from 'lucide-react';
import { HAMPERS_CATALOG, CATALOGUE_CATEGORIES, HamperData } from '@/data/hampersData';
import { useCartStore } from '@/hooks/useCart';
import { ResponsiveShell } from '@/features/shell/ResponsiveShell';
import toast from 'react-hot-toast';

function CollectionsCatalogueContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Default to first category if requested or specific category
  const [selectedCategory, setSelectedCategory] = useState<string>('gourmet-food');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured');

  useEffect(() => {
    if (categoryParam) {
      const exists = CATALOGUE_CATEGORIES.some((c) => c.id === categoryParam);
      if (exists) {
        setSelectedCategory(categoryParam);
      }
    }
  }, [categoryParam]);

  const { items: cartItems, addItem, updateQuantity, removeItem } = useCartStore();

  const getItemCartEntry = (itemId: string) => {
    return cartItems.find((i) => i.productId === itemId);
  };

  const handleIncrement = async (item: HamperData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = getItemCartEntry(item._id);
    if (existing) {
      updateQuantity(existing.id, existing.quantity + 1);
      toast.success(`Updated ${item.name}`, {
        style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #DFC299' },
        duration: 1200,
      });
    } else {
      await addItem({
        productId: item._id,
        giftBoxingType: item.category,
        quantity: 1,
        name: item.name,
        price: item.price || 0,
        image: item.image,
      });
      toast.success(`Added ${item.name} to Curation Tray`, {
        style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #DFC299' },
        duration: 1200,
      });
    }
  };

  const handleDecrement = (item: HamperData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = getItemCartEntry(item._id);
    if (existing) {
      if (existing.quantity <= 1) {
        removeItem(existing.id);
        toast('Item removed from curation tray', { duration: 1200 });
      } else {
        updateQuantity(existing.id, existing.quantity - 1);
      }
    }
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let list = HAMPERS_CATALOG;

    // Category Filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((item) => item.category === selectedCategory);
    }

    // Sorting
    return [...list].sort((a, b) => {
      if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, sortBy]);

  const activeCategoryMeta = CATALOGUE_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] pt-20 sm:pt-24 pb-16">
      
      {/* ─── TOP HEADER SECTION: CENTERED TITLE ─── */}
      <section className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        
        {/* Centered Title */}
        <div className="text-center max-w-2xl mx-auto py-2">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {activeCategoryMeta?.label || 'Curated Catalogue'}
          </h1>
        </div>

      </section>

      {/* ─── MAIN WORKSPACE: CATEGORIES & PRODUCT GRID TOP-ALIGNED TOGETHER ─── */}
      <main className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ══════════════════════════════════════════════════════════════════
              LEFT SIDEBAR: 2-COLUMN BORDERLESS CATEGORIES (ALIGNED WITH GRID)
              ══════════════════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] p-4 sm:p-5 shadow-xs sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#ECE7DE]">
              <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#1A1A18] font-bold">
                Categories
              </span>
            </div>

            {/* 2-COLUMN GRID OF BORDERLESS CATEGORY TILES (NO ENCLOSING BOXES) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
              {CATALOGUE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="flex flex-col items-center py-2 px-1 rounded-xl transition-all duration-300 group cursor-pointer text-center relative focus:outline-none"
                  >
                    {/* Squircle Image Frame (Highlight on active) */}
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

                      {/* Active Check Badge on Squircle */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1A1A18] text-[#DFC299] flex items-center justify-center text-[9px] shadow-xs z-10">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>

                    {/* Title Below Image (Clean, No enclosing box) */}
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
              RIGHT MAIN SECTION: PRODUCT CARDS GRID (TOP-ALIGNED WITH SIDEBAR)
              ══════════════════════════════════════════════════════════════════ */}
          <section className="lg:col-span-8 xl:col-span-9">
            
            {/* ── PRODUCT CARDS GRID (CLEAN NO TAG OVERLAYS) ── */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-[#D5CFBF] p-12 text-center space-y-3">
                <p className="text-base text-[#7A7268] font-light">
                  No curations found in this category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('gourmet-food');
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-[#9E7B35] underline cursor-pointer"
                >
                  View Gourmet Food
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filteredProducts.map((item) => {
                  const cartEntry = getItemCartEntry(item._id);
                  const currentQty = cartEntry ? cartEntry.quantity : 0;

                  return (
                    <div
                      key={item._id}
                      className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-all duration-300 flex flex-col justify-between border border-[#F0ECE1] group"
                    >
                      {/* Product Image (Clean, No Floating Category Tag) */}
                      <Link href={`/gourmet-gifts/${item.slug}`} className="w-full aspect-[4/3] overflow-hidden bg-[#FAF6F0] relative block cursor-pointer">
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </Link>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <Link href={`/gourmet-gifts/${item.slug}`}>
                            <h3 className="text-base sm:text-[17px] font-semibold text-[#1A1A18] leading-snug line-clamp-1 group-hover:text-[#9E7B35] transition-colors tracking-tight font-sans">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-[#7A7268] font-light line-clamp-2 leading-relaxed">
                            {item.subCopy}
                          </p>
                        </div>

                        {/* Price & Action Button */}
                        <div className="pt-2 border-t border-[#F0ECE1] flex items-center justify-between gap-2">
                          <div>
                            {item.price && item.price > 0 ? (
                              <span className="text-sm font-bold text-[#1A1A18] font-sans">
                                ₹{item.price.toLocaleString('en-IN')}
                              </span>
                            ) : (
                              <span className="text-xs font-sans uppercase tracking-wider text-[#7A8B6F] font-semibold">
                                Bespoke Quote
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/gourmet-gifts/${item.slug}`}
                              className="inline-flex items-center gap-1 border border-[#C5A880] text-[#9E7B35] hover:bg-[#C5A880] hover:text-white rounded-lg px-2.5 py-1 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 font-sans"
                            >
                              <span>View</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>

                            {/* Stepper / Add to Bag */}
                            {currentQty > 0 ? (
                              <div className="flex items-center bg-[#FAF5EC] border border-[#C5A880] rounded-lg p-0.5 shadow-2xs">
                                <button
                                  onClick={(e) => handleDecrement(item, e)}
                                  className="w-5 h-5 rounded flex items-center justify-center text-[#7A1C29] hover:bg-[#C5A880] hover:text-white transition-colors active:scale-90 cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-5 text-center text-xs font-bold text-[#451B27] select-none font-sans">
                                  {currentQty}
                                </span>
                                <button
                                  onClick={(e) => handleIncrement(item, e)}
                                  className="w-5 h-5 rounded flex items-center justify-center text-[#7A1C29] hover:bg-[#C5A880] hover:text-white transition-colors active:scale-90 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => handleIncrement(item, e)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer bg-[#FAF5EC] hover:bg-[#F2E8D7] text-[#9E7B35] border border-[#EADBCA] flex items-center gap-1 active:scale-95 font-sans"
                              >
                                <Plus className="w-3 h-3" />
                                <span>Bag</span>
                              </button>
                            )}
                          </div>
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
    <Suspense fallback={<div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">Loading catalogue...</div>}>
      <CollectionsCatalogueContent />
    </Suspense>
  );
}
