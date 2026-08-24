'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Minus, Package, Plus } from 'lucide-react';
import { HAMPERS_CATALOG, CATALOGUE_CATEGORIES, HamperData } from '@/data/hampersData';
import { useCartStore } from '@/hooks/useCart';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

export default function KeepsakeEcommerceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('gourmet-food');

  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const filteredHampers = HAMPERS_CATALOG.filter(
    (item) => item.category === selectedCategory
  );

  const activeCategoryMeta = CATALOGUE_CATEGORIES.find((c) => c.id === selectedCategory);

  const getItemCartEntry = (itemId: string) => {
    return cartItems.find((i) => i.productId === itemId);
  };

  const handleIncrement = async (item: HamperData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = getItemCartEntry(item._id);
    if (existing) {
      updateQuantity(existing.id, existing.quantity + 1);
    } else {
      await addItem({
        productId: item._id,
        giftBoxingType: item.category,
        quantity: 1,
        name: item.name,
        price: 0,
        image: item.image,
      });
    }

    toast.success(`Added ${item.name} to Curation Tray`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      duration: 1500,
    });
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

  return (
    <section className="pt-2 sm:pt-8 md:pt-12 pb-2 sm:pb-6 px-3 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18]">
      <div className="max-w-[1360px] mx-auto space-y-2.5 sm:space-y-6">
        
        {/* ─── SECTION HEADER (CLEAN & COMPACT WITH +10PX DESKTOP PADDING) ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-4xl mx-auto px-2 py-2 sm:py-5 md:py-6 space-y-1.5 sm:space-y-2">
            <h2
              className="text-lg sm:text-3xl md:text-4xl lg:text-[44px] text-[#1A1A18] leading-tight tracking-tight font-light whitespace-normal md:whitespace-nowrap"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              <span className="sm:hidden">Curated Keepsakes</span>
              <span className="hidden sm:inline">Curated Gifting</span>
            </h2>
            <p className="hidden sm:block text-xs md:text-sm text-[#78746D] font-light max-w-3xl mx-auto leading-normal whitespace-normal md:whitespace-nowrap">
              Luxury gifting thoughtfully crafted for clients, festive celebrations and meaningful occasions.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── ASYMMETRIC FACETED POLYGON CATEGORIES (OFFICIAL CATALOGUE TAXONOMY) (+10px bottom padding) ─── */}
        <div className="pt-1 pb-4 sm:pb-6">
          <div className="flex items-center justify-start sm:justify-center gap-3.5 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto no-scrollbar py-1.5 sm:py-3 px-1 sm:px-2">
            {CATALOGUE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none transition-all duration-300"
                >
                  {/* Outer Asymmetric Polygon Wrapper Frame */}
                  <div
                    style={{
                      clipPath: cat.clipPath,
                      WebkitClipPath: cat.clipPath,
                    }}
                    className={`w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 lg:w-32 lg:h-32 p-[2.5px] sm:p-[3.5px] transition-all duration-500 ${
                      isSelected
                        ? `${cat.pastelActive} scale-110 shadow-[0_12px_28px_rgba(0,0,0,0.08)] -rotate-1`
                        : `bg-[#EAE5DC] ${cat.pastelHover} group-hover:scale-105 group-hover:rotate-1`
                    }`}
                  >
                    {/* Inner Asymmetric Polygon Image Container */}
                    <div
                      style={{
                        clipPath: cat.clipPath,
                        WebkitClipPath: cat.clipPath,
                      }}
                      className="w-full h-full bg-[#FAF8F5] overflow-hidden relative"
                    >
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isSelected ? 'scale-115' : 'group-hover:scale-115'
                        }`}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isSelected ? 'bg-transparent' : 'bg-black/5 group-hover:bg-transparent'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Asymmetric Polygon Label */}
                  <span
                    className={`text-[9.5px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-wider mt-3 max-w-[120px] text-center leading-tight transition-colors ${
                      isSelected
                        ? 'text-[#2D2A26]'
                        : 'text-[#8A8680] group-hover:text-[#2D2A26]'
                    }`}
                  >
                    {cat.label}
                  </span>

                  {/* Active Indicator Underline */}
                  <div
                    className={`h-[2.5px] w-7 mt-1.5 transition-all duration-300 ${
                      isSelected ? cat.pastelActive : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE SWIPE HINT / COUNT (MOBILE ONLY) ─── */}
        <div className="flex sm:hidden items-center justify-between text-[11px] text-[#8A8680] font-medium px-1 pt-1">
          <span>{filteredHampers.length} Curated Items</span>
          <span className="text-[#9E7B35] font-semibold">Swipe to explore ⟶</span>
        </div>

        {/* ─── RESPONSIVE HAMPER CARDS: HORIZONTAL SNAP ON PHONE, 4-COL GRID ON DESKTOP ─── */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filteredHampers.map((item) => {
            return (
              <Link
                key={item._id}
                href={`/gourmet-gifts/${item.slug}`}
                className="w-[80vw] max-w-[300px] sm:w-auto shrink-0 snap-center bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between border border-[#F0ECE1] group cursor-pointer"
              >
                {/* Top Image (Rounded-t-2xl) */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-[#FBF7F0] relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Floating Contents Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Package className="w-3 h-3 text-[#EADBCA]" />
                    <span>{item.inside_items.length} Delicacies Inside</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-[#7A8B6F] uppercase tracking-wider block font-sans">
                      {item.categoryLabel}
                    </span>
                    <h3 
                      className="text-[17px] sm:text-[19px] font-semibold text-[#1A1A18] leading-snug line-clamp-2 group-hover:text-[#7A1C29] transition-colors tracking-tight font-sans"
                      style={{ fontFamily: 'var(--font-jakarta), system-ui, -apple-system, sans-serif' }}
                    >
                      {item.name}
                    </h3>
                    <p 
                      className="text-xs sm:text-[13px] text-[#7A7268] font-normal line-clamp-1 font-sans"
                      style={{ fontFamily: 'var(--font-jakarta), system-ui, -apple-system, sans-serif' }}
                    >
                      {item.packaging_style || 'Bespoke Keepsake'}
                    </p>
                  </div>

                  {/* Golden Enquire / Add Button or Dynamic Stepper */}
                  <div className="pt-1 sm:pt-2 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 border border-[#C5A880] text-[#9E7B35] group-hover:bg-[#C5A880] group-hover:text-white rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95">
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>

                    {/* Dynamic Quantity Stepper Counter */}
                    {(() => {
                      const cartEntry = getItemCartEntry(item._id);
                      const currentQty = cartEntry ? cartEntry.quantity : 0;

                      if (currentQty > 0) {
                        return (
                          <div 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                            className="flex items-center bg-[#FAF5EC] border border-[#C5A880] rounded-lg p-0.5 shadow-xs"
                          >
                            <button
                              onClick={(e) => handleDecrement(item, e)}
                              aria-label="Decrease quantity"
                              className="w-6 h-6 rounded flex items-center justify-center text-[#7A1C29] hover:bg-[#C5A880] hover:text-white transition-colors active:scale-90 cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-[#451B27] select-none">
                              {currentQty}
                            </span>
                            <button
                              onClick={(e) => handleIncrement(item, e)}
                              aria-label="Increase quantity"
                              className="w-6 h-6 rounded flex items-center justify-center text-[#7A1C29] hover:bg-[#C5A880] hover:text-white transition-colors active:scale-90 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      }

                      return (
                        <button
                          onClick={(e) => handleIncrement(item, e)}
                          aria-label="Add to cart"
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer bg-[#FAF5EC] hover:bg-[#F2E8D7] text-[#9E7B35] border border-[#EADBCA] flex items-center gap-1 active:scale-95 shadow-2xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Bag</span>
                        </button>
                      );
                    })()}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
