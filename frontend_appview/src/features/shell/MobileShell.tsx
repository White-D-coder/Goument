'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BottomNav } from './BottomNav';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { CartIcon } from './CartIcon';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { useCartSync } from '@/shared/useCartSync';
import { Toaster } from 'react-hot-toast';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isOnline = useOnlineStatus(() => {
    setShowReconnectedToast(true);
  });

  // Background IndexedDB cart sync on reconnection
  useCartSync(isOnline);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8FC] text-[#3A2342] relative font-sans flex justify-center selection:bg-[#6B427B]/20">
      <div className="w-full max-w-md bg-[#FAF8FC] min-h-screen flex flex-col pb-28 shadow-2xl relative">
        <Toaster position="top-center" />

        <OfflineBanner isOnline={isOnline} />
        <OnlineToast
          shouldTrigger={showReconnectedToast}
          onHandled={() => setShowReconnectedToast(false)}
        />

        {/* Dynamic Scroll Top Header */}
        <header
          className={`sticky top-0 z-40 px-4 py-2 flex items-center justify-between transition-all duration-300 ${
            isScrolled
              ? 'bg-[#FAF8FC]/95 backdrop-blur-md border-b border-[#E6D9FF]/70 shadow-md'
              : 'bg-[#FAF8FC]/75 backdrop-blur-xs border-b border-transparent'
          }`}
        >
          {/* Mint Cream & Deep Plum Luxury Company Logo on Left */}
          <Link href="/" className="flex flex-col items-start group">
            <span
              style={{
                fontFamily: 'TropicalScript, var(--font-tropical-script), cursive',
                WebkitTextStroke: '0.4px #6B427B',
              }}
              className="text-sm font-medium text-[#6B427B] leading-none mb-0.5"
            >
              The
            </span>
            <span
              style={{ fontFamily: 'Pagio, var(--font-pagio), var(--font-playfair), serif' }}
              className="text-lg tracking-[0.14em] font-bold text-[#3A2342] uppercase leading-tight group-hover:text-[#6B427B] transition-colors"
            >
              GOURMET
            </span>
            <span className="text-[7.5px] tracking-[0.32em] font-bold text-[#3E8077] uppercase leading-none mt-0.5">
              GIFTS CO.
            </span>
          </Link>

          {/* Cart Icon on Right */}
          <div className="flex items-center gap-3.5">
            <Link href="/cart" aria-label="View shopping bag" className="p-1 flex items-center justify-center">
              <CartIcon className="w-5.5 h-5.5 text-[#3A2342]" />
            </Link>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};
