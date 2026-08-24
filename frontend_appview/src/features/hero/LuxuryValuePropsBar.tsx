'use client';

import React from 'react';
import { PackageCheck, Gift, ShieldCheck, Truck } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: PackageCheck,
    title: 'Curated Elegance',
  },
  {
    icon: Gift,
    title: 'Signature Personalisation',
  },
  {
    icon: PackageCheck,
    title: 'Artisan Presentation',
  },
  {
    icon: ShieldCheck,
    title: 'Exceptional Quality',
  },
  {
    icon: Truck,
    title: 'Express Pan-India Dispatch',
  },
];

export const LuxuryValuePropsBar: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-10 md:py-14 border-y border-[#E4E0D7]/70">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 items-center justify-center">
          {VALUE_PROPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center space-y-3 group cursor-default"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#E4E0D7] bg-white flex items-center justify-center text-[#2C3228] group-hover:border-[#a6bd93] group-hover:text-[#52604D] transition-all duration-300 shadow-2xs">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 stroke-[1.5]" />
                </div>
                <span className="font-serif-luxury text-sm md:text-base font-semibold tracking-tight text-[#2C3228] leading-tight">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
