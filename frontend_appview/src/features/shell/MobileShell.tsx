'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { CartIcon } from './CartIcon';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { useCartSync } from '@/shared/useCartSync';
import { Toaster } from 'react-hot-toast';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);

  const isOnline = useOnlineStatus(() => {
    setShowReconnectedToast(true);
  });

  // Background IndexedDB cart sync on reconnection
  useCartSync(isOnline);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A231F] relative font-sans flex justify-center selection:bg-[#D4AF37]/30">
      <div className="w-full max-w-md bg-[#FAF7F2] min-h-screen flex flex-col pb-20 shadow-2xl relative">
        <Toaster position="top-center" />

        <OfflineBanner isOnline={isOnline} />
        <OnlineToast
          shouldTrigger={showReconnectedToast}
          onHandled={() => setShowReconnectedToast(false)}
        />

        {/* Top App Header */}
        <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md px-4 py-3 border-b border-[#E8DFC8]/50 flex items-center justify-between">
          <button
            aria-label="Open menu drawer"
            className="p-1 text-[#2A231F] hover:text-[#D4AF37] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo Header matching uploaded screenshot */}
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[10px] tracking-[0.2em] font-bold text-[#D4AF37] uppercase">
              The
            </span>
            <span className="font-serif-luxury text-base tracking-widest font-bold text-[#2A231F] uppercase -mt-0.5">
              GOURMET
            </span>
            <span className="text-[9px] tracking-[0.25em] font-semibold text-[#6E6259] uppercase -mt-0.5">
              GIFTS CO.
            </span>
          </Link>

          <Link href="/cart" aria-label="View shopping bag" className="p-1">
            <CartIcon className="w-5 h-5 text-[#2A231F]" />
          </Link>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Fixed Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};
