'use client';

import React from 'react';
import Link from 'next/link';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';
import { ArrowRight, PackageCheck } from 'lucide-react';

interface OtherProductItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
}

const OTHER_PRODUCTS: OtherProductItem[] = [
  {
    id: 'op-1',
    title: 'Botanical Soy Candles',
    category: 'Aromatics & Decor',
    description: 'Hand-poured pure soy wax infused with clean botanical oils in heavy amber glass.',
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
    href: '/gift-boxing',
  },
  {
    id: 'op-2',
    title: 'Raw Truffle Honey & Nuts',
    category: 'Artisanal Delicacies',
    description: 'Pure wildflower truffle honey paired with dry-roasted saffron pistachios.',
    image: '/images/Category_image/Classics/thumb.jpeg',
    href: '/gift-boxing/classics',
  },
  {
    id: 'op-3',
    title: 'Wooden Keepsake Trays',
    category: 'Heirloom Accessories',
    description: 'Handcrafted solid teakwood trays lined with soft burgundy velvet lining.',
    image: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
    href: '/gift-boxing',
  },
];

export const OtherProductsSection: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-20 border-b border-transparent rounded-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E0D7]/60 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#a6bd93] uppercase block">
              Bespoke Additions
            </span>
            <h2 className="font-serif-luxury text-3xl md:text-4xl font-bold text-[#2C3228] tracking-tight">
              Other Products
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#7A8275] max-w-md font-normal leading-relaxed">
            Elevate your hamper with our handcrafted aromatics, raw delicacies, and artisanal decor accessories.
          </p>
        </div>

        {/* 3-Column Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OTHER_PRODUCTS.map((prod) => (
            <Link
              key={prod.id}
              href={prod.href}
              className="bg-white border border-[#E4E0D7] rounded-none overflow-hidden shadow-2xs hover:shadow-xl hover:border-[#a6bd93] transition-all duration-500 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Image Container */}
                <div className="w-full aspect-[4/3] relative bg-[#EFECE6] overflow-hidden rounded-none">
                  <ImageWithShimmer
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 rounded-none"
                  />
                  <div className="absolute top-3 left-3 bg-[#2C3228] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-none shadow-xs">
                    {prod.category}
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 space-y-2">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#2C3228] group-hover:text-[#a6bd93] transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[#7A8275] font-normal leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Bottom Explore Button */}
              <div className="px-6 py-4 mt-6 border-t border-[#E4E0D7]/60 flex items-center justify-between bg-[#FDFCF9]">
                <span className="relative text-xs font-bold text-[#a6bd93] uppercase tracking-wider inline-flex items-center gap-1.5 group-hover:text-[#2C3228] transition-colors">
                  <span>Explore Product</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-[#a6bd93] transition-all duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
