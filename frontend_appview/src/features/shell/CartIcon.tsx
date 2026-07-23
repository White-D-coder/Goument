'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';

export const CartIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center">
      <ShoppingBag className={className} />
      {mounted && totalItems > 0 && (
        <span className="absolute -top-1.5 -right-2 bg-[#D4AF37] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-pulse">
          {totalItems}
        </span>
      )}
    </div>
  );
};
