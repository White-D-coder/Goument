'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Package } from 'lucide-react';
import { HAMPERS_CATALOG, HamperData } from '@/data/hampersData';
import { useCartStore } from '@/hooks/useCart';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

const CATEGORY_POLYGONS = [
  {
    id: 'all',
    label: 'ALL HAMPERS',
    shapeName: 'Asymmetric Octagon',
    image: '/images/hampers/hamper_grand_confectionery_chest.jpg',
    clipPath: 'polygon(38% 0%, 84% 6%, 100% 52%, 76% 96%, 28% 100%, 0% 72%, 8% 24%)',
  },
  {
    id: 'sweets',
    label: 'ARTISANAL SWEETS',
    shapeName: 'Asymmetric Pentagon',
    image: '/images/hampers/hamper_royal_sweet_box.jpg',
    clipPath: 'polygon(44% 0%, 98% 28%, 78% 100%, 12% 92%, 0% 42%)',
  },
  {
    id: 'snacks',
    label: 'SNACKS & SAVOURIES',
    shapeName: 'Asymmetric Hexagon',
    image: '/images/hampers/hamper_snack_attack.jpg',
    clipPath: 'polygon(18% 0%, 94% 14%, 100% 76%, 66% 100%, 6% 86%, 0% 30%)',
  },
  {
    id: 'tea-coffee',
    label: 'TEA & COFFEE SUITES',
    shapeName: 'Asymmetric Heptagon',
    image: '/images/hampers/hamper_tea_room_collection.jpg',
    clipPath: 'polygon(54% 0%, 96% 22%, 86% 84%, 46% 100%, 8% 88%, 0% 38%, 20% 10%)',
  },
  {
    id: 'dry-fruits',
    label: 'DRY FRUITS & NUTS',
    shapeName: 'Asymmetric Crystal',
    image: '/images/hampers/hamper_nut_reserve.jpg',
    clipPath: 'polygon(46% 0%, 96% 36%, 82% 94%, 16% 100%, 0% 56%, 18% 14%)',
  },
];

export default function KeepsakeEcommerceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const addItem = useCartStore((state) => state.addItem);

  const filteredHampers = HAMPERS_CATALOG.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleQuickAdd = async (item: HamperData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAddedIds((prev) => ({ ...prev, [item._id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item._id]: false }));
    }, 1200);

    await addItem({
      productId: item._id,
      giftBoxingType: item.category,
      quantity: 1,
      name: item.name,
      price: item.price * 100, // in paise
      image: item.image,
    });

    toast.success(`Added ${item.name} to bag!`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      icon: '🎁',
    });
  };

  return (
    <section className="py-8 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18] border-y border-[#E0DDD6]">
      <div className="max-w-[1360px] mx-auto space-y-6 sm:space-y-12">
        
        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-xl mx-auto px-2">
            <span className="type-meta text-[#7A8B6F] text-[9px] sm:text-[10.5px] tracking-[0.3em] uppercase font-bold block mb-1 sm:mb-2">
              Curated Gift Hampers
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A18] leading-[1.1] tracking-[-0.02em] font-light"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Signature Gifting Hampers
            </h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#78746D] font-light">
              Artisanal delicacies, luxury keepsakes, and bespoke packaging for memorable celebrations.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── ASYMMETRIC FACETED POLYGON CATEGORIES ─── */}
        <div className="pt-1 pb-1">
          <div className="flex items-center justify-start sm:justify-center gap-3.5 sm:gap-7 md:gap-9 overflow-x-auto no-scrollbar py-2 px-1">
            {CATEGORY_POLYGONS.map((cat) => {
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
                    className={`w-15 h-15 sm:w-22 sm:h-22 md:w-24 md:h-24 p-[2px] sm:p-[2.5px] transition-all duration-500 ${
                      isSelected
                        ? 'bg-[#1A1A18] scale-110 shadow-lg -rotate-1'
                        : 'bg-[#D6D1C7] group-hover:bg-[#7A8B6F] group-hover:scale-105 group-hover:rotate-1'
                    }`}
                  >
                    {/* Inner Asymmetric Polygon Image Container */}
                    <div
                      style={{
                        clipPath: cat.clipPath,
                        WebkitClipPath: cat.clipPath,
                      }}
                      className="w-full h-full bg-[#ECE8E1] overflow-hidden relative"
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
                          isSelected ? 'bg-transparent' : 'bg-black/10 group-hover:bg-transparent'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Asymmetric Polygon Label */}
                  <span
                    className={`text-[9px] sm:text-[10.5px] font-bold uppercase tracking-wider mt-3 max-w-[110px] text-center leading-tight transition-colors ${
                      isSelected
                        ? 'text-[#1A1A18]'
                        : 'text-[#8A8680] group-hover:text-[#1A1A18]'
                    }`}
                  >
                    {cat.label}
                  </span>

                  {/* Active Indicator Underline */}
                  <div
                    className={`h-[2px] w-6 mt-1.5 transition-all duration-300 ${
                      isSelected ? 'bg-[#1A1A18]' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE SWIPE HINT / COUNT (MOBILE ONLY) ─── */}
        <div className="flex sm:hidden items-center justify-between text-[11px] text-[#8A8680] font-medium px-1 pt-1">
          <span>{filteredHampers.length} Hampers available</span>
          <span className="text-[#9E7B35] font-semibold">Swipe to explore ⟶</span>
        </div>

        {/* ─── RESPONSIVE HAMPER CARDS: HORIZONTAL SNAP ON PHONE, 4-COL GRID ON DESKTOP ─── */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filteredHampers.map((item) => {
            const isAdded = addedIds[item._id];

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
                    <span>{item.inside_items.length} Items Inside</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div className="space-y-1.5">
                    <h3
                      className="text-base sm:text-xl font-bold text-[#451B27] leading-snug line-clamp-2 group-hover:text-[#7A1C29] transition-colors"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#7A7268] font-normal">
                      from ₹{item.price.toLocaleString('en-IN')} / hamper
                    </p>
                  </div>

                  {/* Golden Enquire / Add Button */}
                  <div className="pt-1 sm:pt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 border border-[#C5A880] text-[#9E7B35] group-hover:bg-[#C5A880] group-hover:text-white rounded-lg px-3.5 sm:px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      aria-label="Add to cart"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isAdded
                          ? 'bg-[#7A8B6F] text-white'
                          : 'bg-[#FAF5EC] hover:bg-[#F2E8D7] text-[#9E7B35] border border-[#EADBCA]'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span>+ Bag</span>
                      )}
                    </button>
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
