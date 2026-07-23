'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const CategoryCircles: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('classics');

  const filterTabs = [
    { id: 'classics', label: 'Classics' },
    { id: 'velvet', label: 'Premium Velvet' },
    { id: 'royale-tin', label: 'Royale Tin Tin' },
  ];

  const baseCategories = [
    {
      id: 'classics',
      name: 'NETTOYER',
      subtitle: 'The Classics • Signature Treats',
      href: '/gift-boxing/classics',
      image: '/images/Category_image/Classics/thumb.png',
    },
    {
      id: 'velvet',
      name: 'ÉQUILIBRER',
      subtitle: 'Premium Velvet • Rich Chest',
      href: '/gift-boxing/premium-velvet',
      image: '/images/Category_image/premium_velvet/thumb.jpeg',
    },
    {
      id: 'royale-tin',
      name: 'HYDRATER',
      subtitle: 'Royale Tin Tin • Heirloom Tin',
      href: '/gift-boxing/royale-tin',
      image: '/images/Category_image/Royale_tin_tin/thumb.jpeg',
    },
    {
      id: 'custom',
      name: 'TRAITER',
      subtitle: 'Keepsake Boxes • Custom Decor',
      href: '/gift-boxing',
      image: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
    },
  ];

  return (
    <section className="bg-[#F7F6F2] py-12 border-b border-[#E4E0D7] rounded-none">
      {/* Desktop Shop by Category Layout (Sharp Rectangles) */}
      <div className="hidden md:block max-w-7xl mx-auto px-8 py-4">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Left 4 Columns Text Header Column */}
          <div className="col-span-4 space-y-4 pt-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#7A8275] uppercase">
              Des Soins Adaptés
            </span>
            <h2 className="font-serif-luxury text-3xl lg:text-4xl font-bold text-[#2C3228] tracking-tight leading-tight">
              à chaque besoin.
            </h2>
            <p className="text-sm text-[#7A8275] leading-relaxed font-medium max-w-xs">
              Everything you need for your best gifting moments. Handcrafted luxury packages.
            </p>
            <div className="pt-2">
              <Link
                href="/gift-boxing"
                className="text-xs font-bold text-[#5A6B56] uppercase tracking-wider inline-flex items-center gap-2 group transition-all"
              >
                <span>Découvrir Toute La Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right 8 Columns 4 Sharp Rectangle Cards */}
          <div className="col-span-8 grid grid-cols-4 gap-4">
            {baseCategories.map((cat) => (
              <Link key={cat.id} href={cat.href} className="group flex flex-col overflow-hidden rounded-none border border-[#E4E0D7] bg-[#FFFFFF] shadow-2xs hover:shadow-md transition-all">
                <div className="w-full aspect-[3/4] overflow-hidden relative bg-[#EFECE6] rounded-none">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
                  />
                </div>
                <div className="p-4 bg-[#8A9587]/30 text-center space-y-1 rounded-none">
                  <h3 className="font-sans text-xs font-bold tracking-wider text-[#2C3228] uppercase">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] text-[#7A8275] font-medium leading-tight">
                    {cat.subtitle}
                  </p>
                  <div className="pt-1 text-[10px] font-bold text-[#5A6B56] uppercase tracking-wider group-hover:underline">
                    DÉCOUVRIR
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Category Cards */}
      <div className="md:hidden px-4 space-y-3">
        <div className="px-1">
          <h2 className="font-serif-luxury text-xl font-bold text-[#2C3228]">
            Category
          </h2>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 px-1 border-b border-[#E4E0D7]">
          {filterTabs.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`relative pb-2 text-xs transition-colors shrink-0 rounded-none ${
                  isSelected ? 'font-bold text-[#2C3228]' : 'font-semibold text-[#7A8275]'
                }`}
              >
                <span>{tab.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="categoryUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5A6B56] rounded-none"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 pt-1 px-0.5">
          {baseCategories.map((cat) => (
            <Link key={cat.id} href={cat.href}>
              <div className="w-44 h-64 shrink-0 rounded-none overflow-hidden relative shadow-lg border border-[#E4E0D7] group cursor-pointer flex flex-col justify-end p-3.5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover absolute inset-0 z-0 rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
                <div className="relative z-20 space-y-1">
                  <h3 className="text-white font-serif-luxury text-base font-bold leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-[10px] font-medium leading-tight mb-2.5">
                    {cat.subtitle}
                  </p>
                  <div className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-none py-2 px-3 flex items-center justify-between text-xs font-bold">
                    <span>Explore Now</span>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
