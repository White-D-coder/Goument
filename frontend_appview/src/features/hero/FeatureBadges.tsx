'use client';

import React from 'react';
import { Sparkles, Heart, Gift, Award } from 'lucide-react';

export const FeatureBadges: React.FC = () => {
  const badges = [
    { icon: Sparkles, title: 'Premium Ingredients' },
    { icon: Heart, title: 'Handcrafted with Care' },
    { icon: Gift, title: 'Beautifully Packaged' },
    { icon: Award, title: 'Perfect for Every Occasion' },
  ];

  return (
    <section className="px-4 py-5 bg-[#FFFFFF] border-y border-[#E8DFC8]/50 my-2">
      <div className="grid grid-cols-4 gap-2 text-center">
        {badges.map((b) => (
          <div key={b.title} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E8DFC8]/60 flex items-center justify-center text-[#D4AF37] shadow-2xs">
              <b.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold leading-tight text-[#2A231F]">
              {b.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
