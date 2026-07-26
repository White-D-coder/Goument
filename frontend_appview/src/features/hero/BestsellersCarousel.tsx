'use client';

import React from 'react';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';
import { DEMO_BESTSELLERS } from '@/utils/constants';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export const BestsellersCarousel: React.FC = () => {
  const addItem = useCartStore((state) => state.addItem);

  const handleQuickAdd = async (product: typeof DEMO_BESTSELLERS[0], e: React.MouseEvent) => {
    e.preventDefault();
    await addItem({
      productId: product._id,
      giftBoxingType: product.segmentId || 'classics',
      quantity: 1,
      name: product.name,
      price: product.basePrice,
      image: product.image,
    });
    toast.success(`Added ${product.name} to bag!`, {
      style: { background: '#2C3228', color: '#FAF7F2', border: '1px solid #a6bd93' },
    });
  };

  return (
    <section className="bg-[#FAF7F2] pt-4 pb-12 md:pt-6 md:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3228] tracking-tight text-center">
            Bestsellers
          </h2>
        </div>

        {/* Minimalist Frameless 5-Item Bestsellers Grid */}
        <div className="space-y-6 sm:space-y-10 md:space-y-12">
          {/* Row 1: Top 2 Large Frameless Feature Items */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3.5 sm:gap-8 md:gap-12">
            {DEMO_BESTSELLERS.slice(0, 2).map((item) => (
              <div
                key={item._id}
                onClick={(e) => handleQuickAdd(item, e)}
                className="group cursor-pointer flex flex-col items-center text-center space-y-2 sm:space-y-3"
              >
                {/* Frameless Image Container */}
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#EFECE6] rounded-none">
                  <ImageWithShimmer
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Minimalist Serif Title */}
                <h3 className="font-serif-luxury text-xs sm:text-xl md:text-2xl font-bold text-[#2C3228] tracking-wide pt-1 group-hover:text-[#7A1C29] transition-colors line-clamp-2">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Row 2: Bottom 3 Frameless Items */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-8 md:gap-10">
            {DEMO_BESTSELLERS.slice(2, 5).map((item) => (
              <div
                key={item._id}
                onClick={(e) => handleQuickAdd(item, e)}
                className="group cursor-pointer flex flex-col items-center text-center space-y-2 sm:space-y-3"
              >
                {/* Frameless Image Container */}
                <div className="w-full aspect-[4/3] relative overflow-hidden bg-[#EFECE6] rounded-none">
                  <ImageWithShimmer
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Minimalist Serif Title */}
                <h3 className="font-serif-luxury text-xs sm:text-lg md:text-xl font-semibold text-[#2C3228] tracking-wide pt-1 group-hover:text-[#7A1C29] transition-colors line-clamp-2">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const BestsellersBento = BestsellersCarousel;