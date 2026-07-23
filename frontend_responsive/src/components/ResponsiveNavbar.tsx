'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Heart, User, Home, Package, Menu, X } from 'lucide-react';

export const ResponsiveNavbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Classics', href: '/gift-boxing/classics' },
    { label: 'Premium Velvet', href: '/gift-boxing/premium-velvet' },
    { label: 'Royale Tin Tin', href: '/gift-boxing/royale-tin' },
    { label: 'All Products', href: '/gift-boxing' },
  ];

  const mobileTabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Products', href: '/gift-boxing', icon: Package },
    { label: 'Bag', href: '/cart', icon: ShoppingBag },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <>
      {/* Desktop Navigation Bar (Hidden on Mobile, Visible on md:flex) */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8FC]/95 backdrop-blur-md border-b border-[#E6D9FF]/70 shadow-md py-3'
            : 'bg-[#FAF8FC]/80 backdrop-blur-xs border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/" className="flex flex-col items-start group">
            <span
              style={{
                fontFamily: 'TropicalScript, var(--font-tropical-script), cursive',
                WebkitTextStroke: '0.4px #6B427B',
              }}
              className="text-base font-medium text-[#6B427B] leading-none mb-0.5"
            >
              The
            </span>
            <span
              style={{ fontFamily: 'Pagio, var(--font-pagio), var(--font-playfair), serif' }}
              className="text-xl md:text-2xl tracking-[0.16em] font-bold text-[#3A2342] uppercase leading-tight group-hover:text-[#6B427B] transition-colors"
            >
              GOURMET
            </span>
            <span className="text-[8px] md:text-[9px] tracking-[0.34em] font-bold text-[#3E8077] uppercase leading-none mt-0.5">
              GIFTS CO.
            </span>
          </Link>

          {/* Desktop Mega Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors relative py-1 ${
                    isActive ? 'text-[#6B427B]' : 'text-[#7A6585] hover:text-[#3A2342]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6B427B] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions Right Column */}
          <div className="hidden md:flex items-center gap-5">
            <button className="p-2 text-[#3A2342] hover:text-[#6B427B] transition-colors flex items-center gap-2 text-xs font-semibold bg-[#FFFFFF] border border-[#E6D9FF]/70 rounded-full px-4 py-2 shadow-xs">
              <Search className="w-4 h-4 stroke-[2]" />
              <span>Search products...</span>
            </button>

            <Link href="/cart" className="p-2 text-[#3A2342] hover:text-[#6B427B] transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#6B427B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            <Link href="/account" className="p-2 text-[#3A2342] hover:text-[#6B427B] transition-colors">
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link href="/cart" className="p-1 text-[#3A2342] relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#6B427B] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[#3A2342]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FAF8FC] border-b border-[#E6D9FF]/70 px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-semibold text-[#3A2342] py-1 border-b border-[#E6D9FF]/40"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (Visible on Mobile, Hidden on Desktop) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 pointer-events-none">
        <nav className="pointer-events-auto relative w-full max-w-md mx-auto bg-[#FAF8FC]/95 backdrop-blur-xl rounded-2xl border border-[#E6D9FF]/70 shadow-2xl py-2 px-3 flex items-center justify-around">
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
                    isActive ? 'text-[#6B427B]' : 'text-[#7A6585] group-hover:text-[#3A2342]'
                  }`}
                >
                  <item.icon className="w-5 h-5 stroke-[2]" />
                  <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-[#6B427B]' : 'font-semibold'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-1 w-4 h-0.5 bg-[#6B427B] rounded-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};
