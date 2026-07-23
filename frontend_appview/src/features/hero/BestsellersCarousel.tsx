'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
      giftBoxingType: product.category.toLowerCase().replace(' ', '-'),
      quantity: 1,
      name: product.name,
      price: product.basePrice,
      image: product.image,
    });
    toast.success(`Added ${product.name} to bag!`, {
      style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
    });
  };

  return (
    <section className="px-4 py-4 space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-serif-luxury text-xl font-bold text-[#2A231F]">
          Bestsellers
        </h2>
        <Link
          href="/gift-boxing/classics"
          className="text-xs font-bold text-[#D4AF37] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
        {DEMO_BESTSELLERS.map((item) => (
          <motion.div
            key={item._id}
            whileTap={{ scale: 0.97 }}
            className="w-[145px] shrink-0 bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-2.5 shadow-xs flex flex-col justify-between"
          >
            <Link href={`/gift-boxing/${item.slug}`} className="block space-y-2">
              <div className="w-full h-32 relative rounded-xl overflow-hidden bg-[#FAF7F2]">
                <ImageWithShimmer
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-0.5 min-h-[48px]">
                <h3 className="font-sans text-xs font-semibold text-[#2A231F] line-clamp-2 leading-tight">
                  {item.name}
                </h3>
              </div>
            </Link>

            <div className="pt-2 flex items-center justify-between border-t border-[#E8DFC8]/40 mt-1">
              <span className="font-sans text-xs font-bold text-[#2A231F]">
                ₹{(item.basePrice / 100).toLocaleString('en-IN')}
              </span>
              <button
                onClick={(e) => handleQuickAdd(item, e)}
                className="bg-[#FAF7F2] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#FFFFFF] border border-[#D4AF37]/40 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-colors"
                aria-label={`Add ${item.name} to cart`}
              >
                +
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
