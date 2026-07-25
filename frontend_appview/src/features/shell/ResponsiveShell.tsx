'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, User, Home, Package, Menu, X, ShoppingBag } from 'lucide-react';
import { CartIcon } from './CartIcon';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { Footer } from './Footer';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { useCartSync } from '@/shared/useCartSync';
import { useCartStore } from '@/hooks/useCart';
import { Toaster } from 'react-hot-toast';
import { SearchModal } from '@/features/search/SearchModal';

export const ResponsiveShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItems = useCartStore((state) => state.items);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

  const isHomepage = pathname === '/';
  const showSolidHeader = !isHomepage || isScrolled;

  // Navigation Links Aligned Left
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/gift-boxing' },
    { label: 'Customize', href: '/customize' },
    { label: 'Bulk Enquire', href: '/inquire' },
  ];

  const mobileTabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Collections', href: '/gift-boxing', icon: Package },
    { label: 'Bag', href: '/cart', isBag: true },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C3228] relative font-sans flex flex-col justify-between selection:bg-[#a6bd93]/30">
      <Toaster position="top-center" />

      <OfflineBanner isOnline={isOnline} />
      <OnlineToast
        shouldTrigger={showReconnectedToast}
        onHandled={() => setShowReconnectedToast(false)}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Navigation Header (Transparent on top of Homepage Hero, Visible Solid on scroll or other pages) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
          showSolidHeader
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E4E0D7] py-3 text-[#2C3228] shadow-xs'
            : 'bg-transparent border-b border-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* 1. LEFT SIDE: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-start">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-medium transition-all duration-300 relative py-1 ${
                    isActive
                      ? showSolidHeader ? 'text-[#52604D] font-bold' : 'text-[#a6bd93] font-bold'
                      : showSolidHeader ? 'text-[#52604D]/80 hover:text-[#2C3228]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavUnderline"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        showSolidHeader ? 'bg-[#52604D]' : 'bg-[#a6bd93]'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 2. CENTER: Serif Luxury Brand Logo */}
          <div className="flex-1 flex justify-start md:justify-center">
            <Link href="/" className="group inline-flex items-center py-0.5">
              <span
                className={`font-serif-luxury text-xl md:text-2xl lg:text-3xl font-bold tracking-tight transition-colors ${
                  showSolidHeader ? 'text-[#2C3228] group-hover:text-[#52604D]' : 'text-white group-hover:text-[#a6bd93]'
                }`}
              >
                Gourmet Gifts.
              </span>
            </Link>
          </div>

          {/* 3. RIGHT SIDE: Action Items (Search, Cart (0), Account/Login) */}
          <div className="flex-1 flex items-center justify-end gap-5 md:gap-7">
            {/* Search Action */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
              className={`text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 ${
                showSolidHeader ? 'text-[#2C3228] hover:text-[#52604D]' : 'text-white/90 hover:text-[#a6bd93]'
              }`}
            >
              <Search className={`w-4 h-4 ${showSolidHeader ? 'text-[#52604D]' : 'text-[#a6bd93]'}`} />
              <span className="hidden sm:inline">Search</span>
            </button>

            {/* Cart Action: ShoppingBag Icon on Mobile, Text on Desktop */}
            <Link
              href="/cart"
              aria-label="View Shopping Cart"
              className={`text-xs uppercase tracking-wider font-medium transition-colors flex items-center gap-1.5 relative whitespace-nowrap ${
                showSolidHeader ? 'text-[#2C3228] hover:text-[#52604D]' : 'text-white/90 hover:text-[#a6bd93]'
              }`}
            >
              {/* Phone View: ShoppingBag Icon + Counter Badge */}
              <div className="relative flex items-center justify-center sm:hidden">
                <ShoppingBag className={`w-5 h-5 ${showSolidHeader ? 'text-[#2C3228]' : 'text-white'}`} />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#a6bd93] text-[#2C3228] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-2xs">
                    {totalCartCount}
                  </span>
                )}
              </div>

              {/* Desktop View: Text */}
              <span className="hidden sm:inline">Cart ( {totalCartCount} )</span>
            </Link>

            {/* Account / Login Action with Underline */}
            <Link
              href="/account"
              className={`text-xs uppercase tracking-wider font-bold underline underline-offset-4 transition-colors hidden sm:inline-block ${
                showSolidHeader ? 'text-[#2C3228] hover:text-[#52604D]' : 'text-white hover:text-[#a6bd93]'
              }`}
            >
              Account
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-1 ${showSolidHeader ? 'text-[#2C3228]' : 'text-white'}`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF7F2] border-b border-[#E4E0D7] px-6 py-4 space-y-3 text-[#2C3228]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-[#2C3228] py-1 border-b border-[#E4E0D7]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Page Content (Padded at top for non-homepage pages to prevent header overlap) */}
      <main className={`flex-1 w-full flex flex-col ${isHomepage ? '' : 'pt-20 md:pt-24'}`}>
        {children}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 pointer-events-none">
        <nav className="pointer-events-auto relative w-full max-w-md mx-auto bg-[#FAF7F2]/95 backdrop-blur-xl rounded-2xl border border-[#E4E0D7] shadow-xl py-2 px-3 flex items-center justify-around text-[#2C3228]">
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
                    isActive ? 'text-[#52604D]' : 'text-[#7A8275] group-hover:text-[#2C3228]'
                  }`}
                >
                  {item.isBag ? (
                    <CartIcon className="w-5 h-5 text-current" />
                  ) : (
                    item.icon && <item.icon className="w-5 h-5 stroke-[2]" />
                  )}
                  <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-[#52604D]' : 'font-semibold'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 w-4 h-0.5 bg-[#52604D] rounded-full" />
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
