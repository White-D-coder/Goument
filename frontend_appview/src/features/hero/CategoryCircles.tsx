'use client';

import React from 'react';
import Link from 'next/link';

interface CategoryItem {
  id: string;
  title: string;
  href: string;
  image: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    id: 'royale-tin',
    title: 'Royale Tin Tin',
    href: '/gift-boxing/royale-tin',
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
  },
  {
    id: 'velvet',
    title: 'Velvet',
    href: '/gift-boxing/premium-velvet',
    image: '/images/small_anipics/velvet_tray_hero.jpg',
  },
  {
    id: 'classics',
    title: 'The Classics',
    href: '/gift-boxing/classics',
    image: '/images/Category_image/Classics/classics_hero.png',
  },
];

export const CategoryCircles: React.FC = () => {
  return (
    <section className="relative bg-[#FAF7F2] pt-12 pb-6 md:pt-20 md:pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6 relative z-10">
        {/* Section Header: Increased Font Size (+2px), Compact Padding */}
        <div className="pb-1 text-center flex items-center justify-center">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C3228] tracking-tight text-center">
            Curated Collections
          </h2>
        </div>

        {/* Phone View: Broad Cards. Desktop View: 3-Column Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-7 overflow-x-auto no-scrollbar snap-x snap-mandatory py-2 px-0.5 md:overflow-visible items-stretch">
          {CATEGORY_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative block w-[calc(100vw-2.5rem)] sm:w-[320px] md:w-full shrink-0 snap-start h-[440px] sm:h-[480px] md:h-[520px] overflow-hidden rounded-3xl border border-[#E4E0D7]/80 shadow-2xs hover:shadow-2xl transition-all duration-500 bg-[#EFECE6]"
            >
              {/* Full-Bleed Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-3xl"
              />

              {/* Ambient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 rounded-3xl z-10" />

              {/* Sleek Text Overlay with Underline on Hover (No Oval Box) */}
              <div className="absolute bottom-6 left-6 z-30 flex flex-col items-start text-left">
                <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                  {item.title}
                </span>
                <div className="mt-1.5 w-full">
                  <span className="block w-0 group-hover:w-full h-[2px] bg-white transition-all duration-300 ease-out" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
