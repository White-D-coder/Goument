'use client';

import React from 'react';

export const HeroSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[520px] bg-[#FAF7F2] p-6 flex flex-col justify-between overflow-hidden">
      <div className="space-y-4 pt-6 max-w-[65%]">
        <div className="h-4 w-24 bg-[#E8DFC8]/60 animate-shimmer rounded" />
        <div className="h-10 w-full bg-[#E8DFC8]/60 animate-shimmer rounded" />
        <div className="h-10 w-3/4 bg-[#E8DFC8]/60 animate-shimmer rounded" />
        <div className="h-4 w-full bg-[#E8DFC8]/60 animate-shimmer rounded" />
        <div className="h-10 w-44 bg-[#E8DFC8]/80 animate-shimmer rounded-full mt-4" />
      </div>
      <div className="absolute right-2 bottom-4 w-48 h-56 bg-[#E8DFC8]/50 animate-shimmer rounded-2xl" />
    </div>
  );
};
