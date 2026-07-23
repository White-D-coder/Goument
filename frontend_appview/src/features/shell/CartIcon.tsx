'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/hooks/useCart';

export const CartIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Cart Handle & Basket Outer Frame */}
        <path d="M2 4h3.2l2.3 10.2a2 2 0 0 0 2 1.5h10a2 2 0 0 0 2-1.5L23 6.5H6.2" />
        {/* Trolley Wheels */}
        <circle cx="9.5" cy="20" r="1.5" fill="currentColor" />
        <circle cx="17.5" cy="20" r="1.5" fill="currentColor" />
      </svg>

      {mounted && totalItems > 0 && (
        <span className="absolute -top-1.5 -right-2 bg-[#E07A5F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
          {totalItems}
        </span>
      )}
    </div>
  );
};
