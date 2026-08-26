'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Package, 
  Check, 
  Layers, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { HAMPERS_CATALOG, CATALOGUE_CATEGORIES, HamperData } from '@/data/hampersData';
import { useCartStore, isBoxItemKey, BOX_CAPACITIES } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export default function TestLayoutPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('gourmet-food');

  const {
    items: cartItems,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  } = useCartStore();

  const activeCategoryMeta = CATALOGUE_CATEGORIES.find((c) => c.id === selectedCategory);
  const filteredProducts = HAMPERS_CATALOG.filter((item) => item.category === selectedCategory);

  const getItemCartEntry = (itemId: string) => {
    return cartItems.find((i) => i.productId === itemId);
  };

  const handleIncrement = async (item: HamperData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = getItemCartEntry(item._id);
    if (existing) {
      const ok = updateQuantity(existing.id, existing.quantity + 1);
      if (ok) {
        toast.success(`Updated ${item.name}`, {
          style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #DFC299' },
          duration: 1200,
        });
      }
    } else {
      const ok = await addItem({
        productId: item._id,
        giftBoxingType: item.category,
        quantity: 1,
        name: item.name,
        price: item.price || 0,
        image: item.image,
      });
      if (ok) {
        toast.success(`Added ${item.name} to Tray`, {
          style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #DFC299' },
          duration: 1200,
        });
      }
    }
  };

  const handleDecrement = (item: HamperData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = getItemCartEntry(item._id);
    if (!existing) return;

    if (existing.quantity <= 1) {
      removeItem(existing.id);
      toast(`${item.name} removed`, { duration: 1000 });
    } else {
      updateQuantity(existing.id, existing.quantity - 1);
    }
  };

  const selectedBoxes = cartItems.filter((i) => isBoxItemKey(i.name, i.productId));
  const totalBoxCapacity = selectedBoxes.reduce((acc, box) => {
    const cap = BOX_CAPACITIES[box.productId] || 4;
    return acc + cap * box.quantity;
  }, 0);

  const totalDelicacies = cartItems
    .filter((i) => !isBoxItemKey(i.name, i.productId))
    .reduce((acc, i) => acc + i.quantity, 0);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] flex flex-col font-sans">
      
      {/* ─── TOP BAR ─── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E8E4DC] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/gourmet-gifts" 
            className="text-xs font-mono uppercase tracking-[0.15em] text-[#7A8B6F] hover:text-[#1A1A18] transition-colors flex items-center gap-1.5"
          >
            <span>← Return to Main Site</span>
          </Link>
          <span className="text-[#DDD8CE]">|</span>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1A1A18] flex items-center gap-1.5 bg-[#F2EDE4] px-2.5 py-1 rounded-md">
            <Layers className="w-3.5 h-3.5 text-[#9E7B35]" />
            Layout Prototype: 2-Col Left Categories + Center Grid + Right Tray
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5A564F]">
            <span className="w-2 h-2 rounded-full bg-[#7A8B6F] animate-pulse" />
            <span>Tray: {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}</span>
          </div>
        </div>
      </header>

      {/* ─── MAIN 3-PANEL WORKSPACE CONTAINER ─── */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ══════════════════════════════════════════════════════════════════
              LEFT PANEL (COL-SPAN 3): 2-COLUMN CATEGORY PEBBLE SELECTOR
              ══════════════════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E5E0D8] p-4 sm:p-5 shadow-xs sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ECE7DE]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#7A8B6F] font-bold block">
                  Curation Divisions
                </span>
                <h2 
                  className="text-xl font-light text-[#1A1A18]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Categories
                </h2>
              </div>
              <span className="text-[11px] font-mono text-[#8A8680] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EADBCA]">
                {CATALOGUE_CATEGORIES.length}
              </span>
            </div>

            {/* 2-COLUMN GRID OF PEBBLE & GEOMETRIC CATEGORIES */}
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
              {CATALOGUE_CATEGORIES.map((cat, index) => {
                const isSelected = selectedCategory === cat.id;

                // ── Top 3 Custom Geometric Shapes as requested by user ──
                let outerShapeClass = '';
                let innerShapeClass = '';
                let imgTransformClass = isSelected ? 'scale-110' : 'group-hover:scale-110';
                let customStyle: React.CSSProperties = { borderRadius: cat.borderRadius };

                if (index === 0) {
                  // Shape 1: Rounded Squircle
                  outerShapeClass = 'rounded-[24px] sm:rounded-[28px]';
                  innerShapeClass = 'rounded-[21px] sm:rounded-[25px]';
                  customStyle = {};
                } else if (index === 1) {
                  // Shape 2: Perfect Circle
                  outerShapeClass = 'rounded-full';
                  innerShapeClass = 'rounded-full';
                  customStyle = {};
                } else if (index === 2) {
                  // Shape 3: Rounded Diamond / Rhombus
                  outerShapeClass = 'rotate-45 rounded-[18px] sm:rounded-[22px] scale-[0.88] my-1';
                  innerShapeClass = 'rounded-[16px] sm:rounded-[20px]';
                  imgTransformClass = `-rotate-45 scale-[1.42] ${isSelected ? 'scale-[1.48]' : 'group-hover:scale-[1.48]'}`;
                  customStyle = {};
                }

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 group cursor-pointer text-center relative ${
                      isSelected 
                        ? 'bg-[#FAF8F5] shadow-sm border border-[#C5A880]/60 ring-1 ring-[#C5A880]/30' 
                        : 'hover:bg-[#FAF8F5]/70 border border-transparent'
                    }`}
                  >
                    {/* Active Selected Badge */}
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#1A1A18] text-[#DFC299] flex items-center justify-center text-[9px] shadow-xs z-10">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}

                    {/* Category Frame (Squircle / Circle / Diamond / Pebble) */}
                    <div
                      style={customStyle}
                      className={`w-18 h-18 sm:w-20 sm:h-20 p-[2.5px] transition-all duration-500 shrink-0 ${outerShapeClass} ${
                        isSelected
                          ? `${cat.pastelActive} scale-105 shadow-[0_8px_20px_rgba(0,0,0,0.12)] ring-2 ring-[#BFA267]/40`
                          : `bg-[#EAE5DC] ${cat.pastelHover} group-hover:scale-105`
                      }`}
                    >
                      {/* Inner Image Container */}
                      <div 
                        style={customStyle}
                        className={`w-full h-full bg-[#FAF8F5] overflow-hidden relative flex items-center justify-center ${innerShapeClass}`}
                      >
                        <img
                          src={cat.image}
                          alt={cat.label}
                          className={`w-full h-full object-cover transition-transform duration-700 ${imgTransformClass}`}
                        />
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            isSelected ? 'bg-transparent' : 'bg-black/5 group-hover:bg-transparent'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Category Label */}
                    <span
                      className={`text-[11px] sm:text-xs font-bold tracking-tight mt-2.5 leading-tight transition-colors line-clamp-2 ${
                        isSelected
                          ? 'text-[#1A1A18]'
                          : 'text-[#6B655D] group-hover:text-[#1A1A18]'
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
              CENTER PANEL (COL-SPAN 6): ACTIVE PRODUCTS GRID
              ══════════════════════════════════════════════════════════════════ */}
          <section className="lg:col-span-6 space-y-5">
            
            {/* Category Header Banner */}
            <div className="bg-white rounded-2xl border border-[#E5E0D8] p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#7A8B6F] font-bold block">
                  Active Collection
                </span>
                <h1 
                  className="text-2xl sm:text-3xl font-light text-[#1A1A18] tracking-tight"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {activeCategoryMeta?.label}
                </h1>
                {activeCategoryMeta?.subtitle && (
                  <p className="text-xs text-[#78746D] font-light leading-relaxed">
                    {activeCategoryMeta.subtitle}
                  </p>
                )}
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-semibold text-[#1A1A18] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#EADBCA] inline-block">
                  {filteredProducts.length} Items Available
                </span>
              </div>
            </div>

            {/* Products Grid (2 or 3 columns in the middle section) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((item) => {
                const cartEntry = getItemCartEntry(item._id);
                const currentQty = cartEntry ? cartEntry.quantity : 0;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_14px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between border border-[#EADBCA] group text-left"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5] block">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1A1A18] tracking-tight line-clamp-1 group-hover:text-[#9E7B35] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-[#78746D] line-clamp-2 leading-relaxed mt-1 font-light">
                          {item.subCopy || item.description}
                        </p>
                      </div>

                      {/* Card Action Row */}
                      <div className="pt-2 border-t border-[#F2EDE4] flex items-center justify-between gap-2">
                        <Link
                          href={`/gourmet-gifts/${item.slug}`}
                          className="text-[10.5px] font-mono uppercase tracking-[0.1em] text-[#78746D] hover:text-[#1A1A18] transition-colors flex items-center gap-1 py-1"
                        >
                          <span>View</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>

                        {/* Interactive Stepper / Add to Bag */}
                        {currentQty > 0 ? (
                          <div className="flex items-center gap-1 bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg p-0.5">
                            <button
                              onClick={(e) => handleDecrement(item, e)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors cursor-pointer"
                              title="Decrease"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-xs font-bold text-[#1A1A18] min-w-[18px] text-center select-none">
                              {currentQty}
                            </span>
                            <button
                              onClick={(e) => handleIncrement(item, e)}
                              className="w-6 h-6 rounded bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#BFA267] transition-colors cursor-pointer"
                              title="Increase"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => handleIncrement(item, e)}
                            className="text-[10.5px] font-mono uppercase tracking-[0.14em] px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#1A1A18] text-[#1A1A18] hover:text-[#FAF8F5] border border-[#DDD8CE] hover:border-[#1A1A18] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                          >
                            <Plus className="w-3 h-3 text-[#9E7B35]" />
                            <span>Bag</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════════
              RIGHT PANEL (COL-SPAN 3): LIVE CURATION TRAY
              ══════════════════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] shadow-md sticky top-20 overflow-hidden flex flex-col max-h-[calc(100vh-100px)]">
            
            {/* Tray Header */}
            <div className="p-4 sm:p-5 border-b border-[#E8E4DC] bg-[#FAF8F5] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7A8B6F] animate-pulse" />
                <h3 
                  className="text-lg sm:text-xl font-light text-[#1A1A18]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Live Curation Tray
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[#7A8B6F] bg-[#EBF3E8] px-2.5 py-0.5 rounded-full border border-[#7A8B6F]/20">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            {/* Scrollable Tray Item List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 no-scrollbar">
              {/* Box Capacity Status Banner */}
              {totalBoxCapacity > 0 && (
                <div className="bg-[#FAF3E6] border border-[#EADBCA] rounded-xl p-2.5 flex items-center justify-between text-xs shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[#9E7B35] font-medium text-[11px]">
                    <Package className="w-3.5 h-3.5 shrink-0" />
                    <span>Box Capacity:</span>
                  </div>
                  <span className={`font-bold text-[11px] px-2 py-0.5 rounded-md ${
                    totalDelicacies >= totalBoxCapacity 
                      ? 'bg-[#9A2C2C]/10 text-[#9A2C2C]' 
                      : 'bg-[#EBF3E8] text-[#7A8B6F]'
                  }`}>
                    {totalDelicacies} / {totalBoxCapacity} Items
                  </span>
                </div>
              )}

              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#FAF8F5] rounded-xl border border-[#E5E0D8] p-2.5 flex items-center justify-between gap-2.5 shadow-2xs"
                      >
                        {/* Thumbnail & Title */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.image && (
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white relative shrink-0 border border-[#EADBCA]">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="text-left space-y-0.5 min-w-0">
                            <h4 className="text-xs font-semibold text-[#1A1A18] truncate max-w-[120px] sm:max-w-[140px]">
                              {item.name}
                            </h4>
                            <span className="text-[9.5px] text-[#7A8B6F] font-semibold block">
                              Attached Sample
                            </span>
                          </div>
                        </div>

                        {/* Stepper Controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeItem(item.id);
                              } else {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="w-5 h-5 rounded bg-white border border-[#DDD8CE] flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold text-[#1A1A18] min-w-[16px] text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#BFA267] transition-colors cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-5 h-5 ml-0.5 flex items-center justify-center text-[#9E9A92] hover:text-[#9A2C2C] transition-colors cursor-pointer"
                            title="Remove sample"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      onClick={clearCart}
                      className="text-[10.5px] text-[#9E9A92] hover:text-[#9A2C2C] underline transition-colors cursor-pointer"
                    >
                      Clear all samples
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#EADBCA] flex items-center justify-center mx-auto text-[#78746D]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h4
                    className="text-base font-light text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Your Tray is Empty
                  </h4>
                  <p className="text-[11px] text-[#78746D] max-w-[180px] mx-auto leading-relaxed">
                    Click Bag on any item in the center to attach it here.
                  </p>
                </div>
              )}
            </div>

            {/* Tray Footer & Enquiry CTA */}
            <div className="p-4 border-t border-[#E8E4DC] bg-[#FAF8F5] space-y-2.5 shrink-0">
              <div className="flex items-center justify-between text-xs text-[#78746D]">
                <span>Attached Samples:</span>
                <span className="font-bold text-[#1A1A18]">{totalItemCount} items</span>
              </div>

              <Link
                href="/gourmet-gifts#curation-inquiry"
                className="w-full py-2.5 bg-[#1A1A18] hover:bg-[#38332B] text-white text-[11px] font-mono uppercase tracking-[0.16em] transition-all shadow-md flex items-center justify-center gap-1.5 rounded-lg text-center"
              >
                <span>Proceed to Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFC299]" />
              </Link>
            </div>

          </aside>

        </div>
      </main>

    </div>
  );
}
