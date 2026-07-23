'use client';

import React from 'react';
import Link from 'next/link';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';
import { DEMO_BESTSELLERS } from '@/utils/constants';
import { useCartStore } from '@/hooks/useCart';
import { Star, Plus, ArrowRight } from 'lucide-react';
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
      style: { background: '#2C3228', color: '#F7F6F2', border: '1px solid #5A6B56' },
    });
  };

  return (
    <section className="bg-[#F7F6F2] py-12 border-b border-[#E4E0D7] rounded-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#2C3228] tracking-tight">
              Bestsellers
            </h2>
            <p className="text-xs md:text-sm text-[#7A8275] mt-0.5 font-medium hidden md:block">
              Our most loved handcrafted gourmet gift collections.
            </p>
          </div>
          <Link
            href="/gift-boxing"
            className="text-xs md:text-sm font-bold text-[#5A6B56] uppercase tracking-wider inline-flex items-center gap-1.5 hover:translate-x-1 transition-transform"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bestsellers Sharp Rectangle Grid (Zero Round Corners) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {DEMO_BESTSELLERS.map((item) => (
            <div
              key={item._id}
              className="bg-[#FFFFFF] rounded-none border border-[#E4E0D7] p-3.5 shadow-2xs hover:shadow-md hover:border-[#5A6B56] transition-all flex flex-col justify-between group"
            >
              <Link href="/gift-boxing/classics" className="block space-y-3">
                {/* Image Container */}
                <div className="w-full aspect-square relative rounded-none overflow-hidden bg-[#EFECE6] border border-[#E4E0D7]/60">
                  <ImageWithShimmer
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#5A6B56] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-none shadow-xs">
                    Bestseller
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1">
                  <h3 className="font-sans text-xs md:text-sm font-bold text-[#2C3228] line-clamp-1 leading-snug group-hover:text-[#5A6B56] transition-colors">
                    {item.name}
                  </h3>

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 pt-0.5">
                    <div className="flex items-center text-[#5A6B56]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#7A8275] font-semibold">(4.9)</span>
                  </div>
                </div>
              </Link>

              {/* Bottom Price & Square Add Button Row */}
              <div className="pt-3 flex items-center justify-between border-t border-[#E4E0D7]/70 mt-2">
                <span className="font-sans text-sm md:text-base font-bold text-[#2C3228]">
                  ₹{(item.basePrice / 100).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={(e) => handleQuickAdd(item, e)}
                  className="bg-[#5A6B56] text-white hover:bg-[#455342] w-8 h-8 rounded-none flex items-center justify-center font-bold text-xs shadow-sm active:scale-90 transition-all"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
