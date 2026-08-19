'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Heart, Plus } from 'lucide-react';
import { GIFT_BOX_TYPES, CATALOG_PRODUCTS } from '@/utils/constants';
import { formatTitleWithBrackets } from '@/utils/format';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

const CATEGORY_CIRCLES = [
  { id: 'classics', label: 'THE CLASSICS', image: '/images/Category_image/Classics/classics_hero.png' },
  { id: 'royale-tin', label: 'ROYALE TIN TIN', image: '/images/Category_image/Royale_tin_tin/tinnew1.png' },
  { id: 'premium-velvet', label: 'VELVET', image: '/images/Category_image/premium_velvet/thumb.jpeg' },
];

export default function GiftBoxingPage() {
  const params = useParams();
  const router = useRouter();
  const type = (params?.type as string) || 'classics';
  const addItem = useCartStore((state) => state.addItem);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [selectedFilter, setSelectedFilter] = useState<string>(type);

  const matchedType =
    Object.values(GIFT_BOX_TYPES).find((b) => b.type === type) ||
    GIFT_BOX_TYPES.CLASSICS;

  const filteredProducts = CATALOG_PRODUCTS.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.subCategoryId === selectedFilter || item.segmentId === selectedFilter;
  });

  const handleAddToCart = async (item: typeof CATALOG_PRODUCTS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    await addItem({
      productId: item._id,
      giftBoxingType: type,
      quantity: 1,
      name: `${item.name} (${matchedType.name})`,
      price: item.basePrice,
      image: item.image,
    });
    toast.success(`Added ${item.name} to bag!`, {
      style: { background: '#2C3228', color: '#FAF7F2', border: '1px solid #a6bd93' },
    });
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#FAF7F2] pb-28 md:pb-20 font-sans">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 pt-4 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2.5 rounded-none bg-white border border-[#E4E0D7] text-[#2C3228] hover:bg-[#E4E0D7]/50 transition-colors shadow-2xs cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-xl md:text-2xl font-bold text-[#2C3228]">
            {matchedType.name}
          </h1>
          <p className="text-[11px] text-[#7A8275] font-medium">{matchedType.subtitle}</p>
        </div>
      </div>

      {/* 1. Category Story Circles Header (CIRCULAR AGAIN) */}
      <section className="pt-6 pb-6 px-4 md:px-8 border-b border-[#E4E0D7]/60">
        <div className="max-w-7xl mx-auto space-y-5 text-center">
          <h2 className="font-serif-luxury text-xl md:text-3xl font-bold tracking-wider uppercase text-[#2C3228]">
            ALL THINGS GIFTING
          </h2>

          <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto no-scrollbar py-2 px-2">
            {CATEGORY_CIRCLES.map((cat) => {
              const isSelected = cat.id === selectedFilter;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    if (['classics', 'premium-velvet', 'royale-tin'].includes(cat.id)) {
                      router.push(`/gift-boxing/${cat.id}`);
                    } else {
                      setSelectedFilter(cat.id);
                    }
                  }}
                  className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none"
                >
                  <div
                    className={`w-18 h-18 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden p-0.5 transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-[#2C3228] ring-offset-2 ring-offset-[#FAF7F2] scale-105'
                        : 'border border-[#E4E0D7] group-hover:border-[#a6bd93]'
                    }`}
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-2.5 max-w-[100px] sm:max-w-[110px] text-center leading-tight transition-colors ${
                      isSelected ? 'text-[#2C3228]' : 'text-[#7A8275] group-hover:text-[#2C3228]'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Sharp-Cornered Product Cards Grid */}
      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 md:px-8 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {filteredProducts.map((item) => {
            const isLiked = wishlist[item._id];

            return (
              <div
                key={item._id}
                onClick={(e) => handleAddToCart(item, e)}
                className="group relative bg-white rounded-none border border-[#E4E0D7] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-300 cursor-pointer text-left overflow-hidden"
              >
                {/* Full-Bleed Top Image Section */}
                <div className="w-full aspect-[4/5] sm:aspect-square relative bg-[#F8F6F2] overflow-hidden rounded-none">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Sharp Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleWishlist(item._id, e)}
                    aria-label="Add to wishlist"
                    className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-white/90 border border-[#E4E0D7]/60 shadow-2xs flex items-center justify-center text-[#2C3228] hover:bg-white active:scale-90 transition-all cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLiked ? 'fill-[#2C3228] text-[#2C3228]' : ''}`} />
                  </button>
                </div>

                {/* Content Section At Bottom */}
                <div className="p-3 sm:p-4 space-y-2 flex-1 flex flex-col justify-between bg-white rounded-none">
                  <div className="space-y-1">
                    <p className="text-[9px] sm:text-[10px] font-bold text-[#52604D] uppercase tracking-wider">
                      {matchedType.name}
                    </p>
                    <h3 className="font-serif-luxury text-xs sm:text-sm md:text-base font-bold text-[#2C3228] line-clamp-2 leading-snug">
                      {formatTitleWithBrackets(item.name)}
                    </h3>
                  </div>

                  {/* Bottom Action Row: Price & Oxblood Plus Add Button */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#E4E0D7]/50 mt-2">
                    <span className="font-sans text-xs sm:text-sm font-bold text-[#2C3228]">
                      ₹{item.basePrice ? item.basePrice.toLocaleString() : '1,299'}
                    </span>

                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      aria-label="Quick add to bag"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-none bg-[#7A1C29] hover:bg-[#5C141F] text-white flex items-center justify-center font-bold shadow-2xs active:scale-90 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
