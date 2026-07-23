'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, SlidersHorizontal } from 'lucide-react';
import { CATALOG_PRODUCTS, SUBCATEGORIES } from '@/utils/constants';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export default function AllGiftBoxingPage() {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const filteredProducts = CATALOG_PRODUCTS.filter((item) => {
    if (selectedFilter === 'all') return true;
    return (
      item.subCategoryId === selectedFilter ||
      item.segmentId === selectedFilter
    );
  });

  const handleAddToCart = async (item: typeof CATALOG_PRODUCTS[0], e: React.MouseEvent) => {
    e.stopPropagation();
    await addItem({
      productId: item._id,
      giftBoxingType: selectedFilter === 'all' ? 'classics' : selectedFilter,
      quantity: 1,
      name: item.name,
      price: item.basePrice,
      image: item.image,
    });
    toast.success(`Added ${item.name} to bag!`, {
      style: { background: '#2C3228', color: '#F7F6F2', border: '1px solid #5A6B56' },
    });
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col min-h-screen bg-[#F7F6F2] p-4 md:p-8 space-y-6 pb-28 md:pb-16 rounded-none">
      {/* Header Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-none bg-[#FFFFFF] border border-[#E4E0D7] text-[#2C3228] hover:bg-[#E4E0D7]/50 transition-colors shadow-2xs"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-xl md:text-3xl font-bold text-[#2C3228]">
            Gift Packaging & Products
          </h1>
          <p className="text-[11px] md:text-xs text-[#7A8275] font-medium">
            Explore handcrafted gift boxes, candles & decor
          </p>
        </div>
      </div>

      {/* Subcategory Filter Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 border-b border-[#E4E0D7]">
        <button className="p-2 rounded-none bg-[#FFFFFF] border border-[#E4E0D7] text-[#2C3228] shadow-2xs shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        {SUBCATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedFilter;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 rounded-none text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#5A6B56] text-white shadow-md'
                  : 'bg-[#FFFFFF] border border-[#E4E0D7] text-[#7A8275] hover:text-[#2C3228]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Sharp Rectangle Product Cards (Zero Round Corners) */}
      <div className="space-y-3 pt-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((item) => {
            const isLiked = wishlist[item._id];

            return (
              <div
                key={item._id}
                onClick={(e) => handleAddToCart(item, e)}
                className="w-full h-64 md:h-80 shrink-0 rounded-none overflow-hidden relative shadow-lg border border-white/20 group cursor-pointer flex flex-col justify-end p-3.5 md:p-4 transition-transform bg-[#2C3228]"
              >
                {/* Edge-to-Edge Direct Full-Cover Background Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500 rounded-none"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

                {/* Floating Glass Heart Button */}
                <button
                  onClick={(e) => toggleWishlist(item._id, e)}
                  aria-label="Add to wishlist"
                  className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-none bg-white/25 backdrop-blur-md shadow-xs flex items-center justify-center text-white hover:bg-white/40 active:scale-90 transition-all"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-white text-white' : ''}`} />
                </button>

                {/* In-Card Overlay Content */}
                <div className="relative z-20 space-y-1">
                  <h3 className="text-white font-sans text-sm md:text-base font-bold leading-snug line-clamp-1 drop-shadow-xs">
                    {item.name}
                  </h3>
                  <p className="text-white/80 text-[11px] md:text-xs font-normal leading-tight capitalize">
                    {item.segmentName || 'Gourmet Gift'}
                  </p>

                  {/* Sharp Rectangle Action Button */}
                  <div className="w-full bg-[#5A6B56] text-white rounded-none py-2.5 px-3 text-xs font-bold text-center mt-2.5 shadow-md group-hover:bg-[#455342] transition-all">
                    Add to Bag
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
