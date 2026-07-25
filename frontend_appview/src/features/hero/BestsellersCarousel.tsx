'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';
import { DEMO_BESTSELLERS } from '@/utils/constants';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export const BestsellersCarousel: React.FC = () => {
  const addItem = useCartStore((state) => state.addItem);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Mouse Drag & Touch Swipe Scrolling State
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

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
    <section className="bg-[#FAF7F2] py-6 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        {/* Section Header: Increased Font Size (+2px), Compact Padding */}
        <div className="pb-1 text-center flex items-center justify-center">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3228] tracking-tight text-center">
            Bestsellers
          </h2>
        </div>

        {/* Swipeable / Drag-Scrollable Cards Carousel Track */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-0.5 cursor-grab active:cursor-grabbing select-none"
        >
          {DEMO_BESTSELLERS.map((item) => (
            <div
              key={item._id}
              onClick={(e) => handleQuickAdd(item, e)}
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start relative overflow-hidden rounded-3xl border border-[#E4E0D7]/80 shadow-2xs hover:shadow-2xl transition-all duration-500 bg-[#2C3228] group cursor-pointer flex flex-col justify-between p-4 sm:p-5 text-white"
            >
              {/* Inner Rounded Image Container */}
              <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-[#EFECE6] border border-white/10 shrink-0">
                <ImageWithShimmer
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* In-Card Information */}
              <div className="pt-4 pb-1 space-y-3 flex-1 flex flex-col justify-between text-white">
                <div className="space-y-1.5">
                  <h3 className="font-serif-luxury text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-white/75 font-normal leading-snug line-clamp-1">
                    Handcrafted artisanal luxury delicacy
                  </p>
                </div>

                {/* Centered SHOP NOW! Action Link */}
                <div className="flex items-center justify-center text-center w-full pt-3 border-t border-white/15">
                  <span className="text-xs font-bold uppercase tracking-wider text-white underline underline-offset-4 group-hover:text-[#a6bd93] transition-colors">
                    SHOP NOW!
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
