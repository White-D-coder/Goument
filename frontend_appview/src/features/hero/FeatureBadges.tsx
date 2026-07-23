'use client';

import React from 'react';
import { Sparkles, Heart, Gift, Award } from 'lucide-react';

export const FeatureBadges: React.FC = () => {
  const badges = [
    { icon: Sparkles, title: 'Premium Ingredients', bg: 'bg-[#FFF6D6]', border: 'border-[#F4D9A6]', color: 'text-[#D98A2B]' },
    { icon: Heart, title: 'Handcrafted with Care', bg: 'bg-[#FFB5A7]/40', border: 'border-[#FFB5A7]', color: 'text-[#E07A5F]' },
    { icon: Gift, title: 'Beautifully Packaged', bg: 'bg-[#B7DCD6]/40', border: 'border-[#B7DCD6]', color: 'text-[#3E8077]' },
    { icon: Award, title: 'Perfect for Every Occasion', bg: 'bg-[#D6E4FA]/60', border: 'border-[#D6E4FA]', color: 'text-[#3B6DB0]' },
  ];

  return (
    <section className="px-4 py-5 bg-[#FFFCF5] border-y border-[#F4D9A6]/50 my-2">
      <div className="grid grid-cols-4 gap-2 text-center">
        {badges.map((b) => (
          <div key={b.title} className="flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full ${b.bg} border ${b.border} flex items-center justify-center ${b.color} shadow-2xs`}>
              <b.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-semibold leading-tight text-[#2A1E1A]">
              {b.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
