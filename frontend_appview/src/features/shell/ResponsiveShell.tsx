'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, User, Home, Package, Menu, X, Sparkles, ShieldCheck, Heart, Truck, Gift } from 'lucide-react';
import { CartIcon } from './CartIcon';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { useCartSync } from '@/shared/useCartSync';
import { Toaster } from 'react-hot-toast';
import { SearchModal } from '@/features/search/SearchModal';

export const ResponsiveShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isOnline = useOnlineStatus(() => {
    setShowReconnectedToast(true);
  });

  useCartSync(isOnline);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop Navigation Links Matching Phone View Exactly
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/gift-boxing' },
    { label: 'Bag', href: '/cart' },
    { label: 'Account', href: '/account' },
  ];

  const mobileTabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Products', href: '/gift-boxing', icon: Package },
    { label: 'Bag', href: '/cart', isBag: true },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#2C3228] relative font-sans flex flex-col justify-between selection:bg-[#5A6B56]/20">
      <Toaster position="top-center" />

      <OfflineBanner isOnline={isOnline} />
      <OnlineToast
        shouldTrigger={showReconnectedToast}
        onHandled={() => setShowReconnectedToast(false)}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* AURA Top Announcement Bar */}
      <div className="bg-[#5A6B56] text-white/95 text-[11px] font-medium py-2 px-4 border-b border-white/10 hidden md:block tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#F7F6F2]" /> Clean Ingredients</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#F7F6F2]" /> Handcrafted Quality</span>
            <span className="flex items-center gap-1.5"><Gift className="w-3.5 h-3.5 text-[#F7F6F2]" /> Made for Real Moments</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#F7F6F2] font-semibold">
            <Truck className="w-3.5 h-3.5" /> Free Express Shipping on Orders Over ₹2000
          </div>
        </div>
      </div>

      {/* Top Main Navigation Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E0D7] shadow-xs py-3'
            : 'bg-[#F7F6F2]/90 backdrop-blur-xs border-b border-[#E4E0D7]/60 py-3.5 md:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Logo on Left */}
          <Link href="/" className="flex flex-col items-start group">
            <span
              style={{
                fontFamily: 'TropicalScript, var(--font-tropical-script), cursive',
                WebkitTextStroke: '0.4px #5A6B56',
              }}
              className="text-sm md:text-base font-medium text-[#5A6B56] leading-none mb-0.5"
            >
              The
            </span>
            <span
              style={{ fontFamily: 'Pagio, var(--font-pagio), var(--font-playfair), serif' }}
              className="text-lg md:text-2xl tracking-[0.16em] font-bold text-[#2C3228] uppercase leading-tight group-hover:text-[#5A6B56] transition-colors"
            >
              GOURMET
            </span>
            <span className="text-[7.5px] md:text-[9px] tracking-[0.34em] font-bold text-[#5A6B56] uppercase leading-none mt-0.5">
              GIFTS CO.
            </span>
          </Link>

          {/* Desktop Mega Navigation Menu Matching Phone Options (Home, Products, Bag, Account) */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive ? 'text-[#5A6B56] font-bold' : 'text-[#7A8275] hover:text-[#2C3228]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5A6B56] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions Bar */}
          <div className="flex items-center gap-3.5 md:gap-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className="p-2 text-[#2C3228] hover:text-[#5A6B56] transition-colors flex items-center gap-2 text-xs font-semibold md:bg-[#FFFFFF] md:border md:border-[#E4E0D7] md:rounded-full md:px-4 md:py-2 shadow-2xs"
            >
              <Search className="w-5 h-5 md:w-4 md:h-4 stroke-[2]" />
              <span className="hidden md:inline">Search gifts...</span>
            </button>

            <Link href="/cart" aria-label="View shopping bag" className="p-1 flex items-center justify-center">
              <CartIcon className="w-5.5 h-5.5 text-[#2C3228]" />
            </Link>

            <Link href="/account" aria-label="Account" className="hidden md:flex p-1 text-[#2C3228] hover:text-[#5A6B56]">
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-[#2C3228]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#F7F6F2] border-b border-[#E4E0D7] px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-[#2C3228] py-1 border-b border-[#E4E0D7]/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 w-full flex flex-col">{children}</main>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 pointer-events-none">
        <nav className="pointer-events-auto relative w-full max-w-md mx-auto bg-[#F7F6F2]/95 backdrop-blur-xl rounded-2xl border border-[#E4E0D7] shadow-xl py-2 px-3 flex items-center justify-around">
          {mobileTabs.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex-1 flex flex-col items-center group py-1"
              >
                <div
                  className={`flex flex-col items-center gap-0.5 transition-colors relative ${
                    isActive ? 'text-[#5A6B56]' : 'text-[#7A8275] group-hover:text-[#2C3228]'
                  }`}
                >
                  {item.isBag ? (
                    <CartIcon className="w-5 h-5" />
                  ) : (
                    item.icon && <item.icon className="w-5 h-5 stroke-[2]" />
                  )}
                  <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-[#5A6B56]' : 'font-semibold'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 w-4 h-0.5 bg-[#5A6B56] rounded-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
