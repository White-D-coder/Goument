'use client';

import React from 'react';

export const GiftBoxingCardSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 px-4 my-4">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="w-full h-32 bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-3 flex gap-4 items-center shadow-sm"
        >
          <div className="w-28 h-full bg-[#E8DFC8]/50 animate-shimmer rounded-xl" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-[#E8DFC8]/60 animate-shimmer rounded" />
            <div className="h-3 w-full bg-[#E8DFC8]/40 animate-shimmer rounded" />
            <div className="h-4 w-20 bg-[#E8DFC8]/60 animate-shimmer rounded mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
};
