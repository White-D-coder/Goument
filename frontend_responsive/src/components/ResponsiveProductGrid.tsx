'use client';

import React, { useState } from 'react';
import { Heart, SlidersHorizontal } from 'lucide-react';

const SUBCATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'classics', label: 'Classics' },
  { id: 'premium-velvet', label: 'Premium Velvet' },
  { id: 'royale-tin', label: 'Royale Tin Tin' },
  { id: 'candles', label: 'Candles & Decor' },
  { id: 'wooden-trays', label: 'Wooden Trays' },
  { id: 'resin-art', label: 'Resin Art' },
  { id: 'keepsake-boxes', label: 'Keepsake Boxes' },
];

const PRODUCTS = [
  {
    _id: 'cih_1',
    name: 'Velvet-Lined Wooden Keepsake Tray',
    category: 'Classics',
    subCategoryId: 'wooden-trays',
    image: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
  },
  {
    _id: 'cih_2',
    name: 'Hand-Poured Soy Candle 220g',
    category: 'Candles & Decor',
    subCategoryId: 'candles',
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
  },
  {
    _id: 'cih_3',
    name: 'Resin Coaster Set of 2',
    category: 'Resin Art',
    subCategoryId: 'resin-art',
    image: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
  },
  {
    _id: 'cih_4',
    name: 'Velvet-Lined Luxury Chest',
    category: 'Premium Velvet',
    subCategoryId: 'keepsake-boxes',
    image: '/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg',
  },
  {
    _id: 'cih_5',
    name: 'Embossed Keepsake Frame',
    category: 'Candles & Decor',
    subCategoryId: 'candles',
    image: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
  },
  {
    _id: 'cls_1',
    name: 'The Classics Signature Treat Box',
    category: 'Classics',
    subCategoryId: 'classics',
    image: '/images/Category_image/Classics/classic.jpeg',
  },
  {
    _id: 'vel_1',
    name: 'Royal Velvet Keepsake Treasure',
    category: 'Premium Velvet',
    subCategoryId: 'premium-velvet',
    image: '/images/Category_image/premium_velvet/vel1.jpeg',
  },
  {
    _id: 'tin_1',
    name: 'Heirloom Metallic Royale Tin Box',
    category: 'Royale Tin Tin',
    subCategoryId: 'royale-tin',
    image: '/images/Category_image/Royale_tin_tin/tin1.jpeg',
  },
];

export const ResponsiveProductGrid: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.subCategoryId === selectedFilter;
  });

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="catalog-grid" className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#3A2342] tracking-tight">
            Gift Packaging & Catalog
          </h2>
          <p className="text-xs md:text-sm text-[#7A6585] mt-1 font-medium">
            Explore handcrafted gift boxes, candles, wooden trays & luxury confections.
          </p>
        </div>
      </div>

      {/* Subcategory Filter Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-[#E6D9FF]/70">
        <button className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#E6D9FF]/70 text-[#3A2342] shadow-2xs shrink-0">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
        {SUBCATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedFilter;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#3A2342] text-white shadow-md'
                  : 'bg-[#FFFFFF] border border-[#E6D9FF]/70 text-[#7A6585] hover:text-[#3A2342]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Responsive New York Overlay Product Card Grid (4 Columns Desktop, 2 Columns Mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
        {filteredProducts.map((item) => {
          const isLiked = wishlist[item._id];

          return (
            <div
              key={item._id}
              className="w-full h-64 md:h-80 shrink-0 rounded-3xl overflow-hidden relative shadow-lg border border-white/20 group cursor-pointer flex flex-col justify-end p-4 transition-transform bg-[#3A2342]"
            >
              {/* Edge-to-Edge Direct Full-Cover Background Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

              {/* Floating Glass Heart Button */}
              <button
                onClick={(e) => toggleWishlist(item._id, e)}
                aria-label="Add to wishlist"
                className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/25 backdrop-blur-md shadow-xs flex items-center justify-center text-white hover:bg-white/40 active:scale-90 transition-all"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white text-white' : ''}`} />
              </button>

              {/* In-Card Overlay Content */}
              <div className="relative z-20 space-y-1">
                <h3 className="text-white font-sans text-sm md:text-base font-bold leading-snug line-clamp-1 drop-shadow-xs">
                  {item.name}
                </h3>
                <p className="text-white/80 text-[11px] md:text-xs font-normal leading-tight">
                  {item.category}
                </p>

                {/* Full-Width Pill Action Button */}
                <div className="w-full bg-white/95 backdrop-blur-md text-[#3A2342] rounded-full py-2.5 px-4 text-xs font-bold text-center mt-3 shadow-md group-hover:bg-white transition-all">
                  Add to Bag
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
