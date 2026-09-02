'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { Footer } from './Footer';
import { SearchModal } from '@/features/search/SearchModal';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { Toaster } from 'react-hot-toast';
import GoldPopperSprinkle from '@/components/effects/GoldPopperSprinkle';

/* ── The Gourmet Gifts Nav Links (Single-Word Concise) ── */
const GOURMET_NAV_LINKS = [
  { label: 'Catalogue', href: '/gourmet-gifts#catalogue' },
  { label: 'Occasions', href: '/gourmet-gifts#occasions' },
  { label: 'Contact', href: '/contact' },
];

export const ResponsiveShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isOnline = useOnlineStatus(() => {
    setShowReconnectedToast(true);
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isGourmetRoute = 
    pathname === '/' || 
    pathname.startsWith('/gourmet-gifts') || 
    pathname.startsWith('/gift-boxing') || 
    pathname.startsWith('/collections') ||
    pathname.startsWith('/cart') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/account') ||
    pathname.startsWith('/corporate');

  const isTransparentHero = (pathname === '/' || pathname === '/gourmet-gifts') && !isScrolled && !mobileMenuOpen;
  const currentNavLinks = GOURMET_NAV_LINKS;

  const scrollToHeroOrTop = (e: React.MouseEvent) => {
    if (pathname === '/' || pathname === '/gourmet-gifts') {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: 'var(--satra-ivory)' }}>
      {/* ─── TOP-MID GOLD POPPER & FALLING GOLDEN LEAF SPRINKLE (ON EVERY REFRESH) ─── */}
      <GoldPopperSprinkle />

      <Toaster
        position="top-center"
        toastOptions={{ style: { fontFamily: 'var(--font-jakarta)', fontSize: '13px' } }}
      />
      <OfflineBanner isOnline={isOnline} />
      <OnlineToast shouldTrigger={showReconnectedToast} onHandled={() => setShowReconnectedToast(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ═══════════════════════════════════════════════════
          NAVIGATION BAR — The Gourmet Gifts
          ═══════════════════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          backgroundColor: isTransparentHero ? 'transparent' : 'rgba(246, 244, 239, 0.96)',
          borderBottom: isTransparentHero ? '1px solid transparent' : '1px solid var(--satra-border)',
          backdropFilter: isTransparentHero ? 'none' : 'blur(20px)',
          transition: 'background-color 400ms cubic-bezier(0.4,0,0.2,1), border-color 400ms cubic-bezier(0.4,0,0.2,1), backdrop-filter 400ms cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <nav className="max-w-[1440px] mx-auto flex items-center justify-between h-16 lg:h-[68px] px-4 sm:px-6 lg:px-10">
          
          {/* ─── Left: Navigation Links (Desktop) ─── */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8 flex-1">
            {currentNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (link.href.includes('#')) {
                    const [targetPath, hash] = link.href.split('#');
                    if (pathname === targetPath || (pathname === '/' && targetPath === '/gourmet-gifts')) {
                      e.preventDefault();
                      const element = document.getElementById(hash);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }
                }}
                className={`text-[11.5px] uppercase tracking-[0.16em] font-medium transition-all duration-200 cursor-pointer ${
                  pathname === link.href
                    ? isTransparentHero
                      ? 'text-white font-semibold border-b border-white'
                      : 'text-[var(--satra-charcoal)] font-semibold border-b border-[var(--satra-charcoal)]'
                    : isTransparentHero
                      ? 'text-white/85 hover:text-white'
                      : 'text-[var(--satra-stone)] hover:text-[var(--satra-charcoal)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── Center: Brand Identity / Monogram ─── */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link
              href="/gourmet-gifts"
              onClick={scrollToHeroOrTop}
              className="flex items-center gap-2 sm:gap-3 group py-1 cursor-pointer"
              aria-label="The Gourmet Gifts Home"
            >
              <div className="relative flex items-center h-9 sm:h-10">
                <AnimatePresence mode="wait">
                  {!isScrolled ? (
                    <motion.div
                      key="nav-monogram-img"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-9 h-9 sm:w-10 sm:h-10"
                    >
                      <Image
                        src="/images/brand/logo-vector.pdf.png"
                        alt="The Gourmet Gifts"
                        fill
                        className={`object-contain transition-all duration-300 ${
                          isTransparentHero ? 'brightness-0 invert' : ''
                        }`}
                        priority
                      />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="nav-brand-text"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className={`text-[16px] sm:text-[18px] lg:text-[20px] uppercase tracking-[0.04em] font-medium leading-none whitespace-nowrap transition-colors duration-300 ${
                        isTransparentHero ? 'text-white' : 'text-[var(--satra-charcoal)]'
                      }`}
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      The Gourmet Gifts
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          </div>

          {/* ─── Right: Utilities + Mobile Menu (Quick Enquire, Menu) ─── */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4 lg:gap-5">
            {/* Quick Enquire WhatsApp CTA */}
            <a
              href="https://wa.me/917021463609?text=Hi%21%20I%E2%80%99d%20like%20to%20enquire%20about%20bespoke%20corporate%20gifting."
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center px-3.5 py-1.5 text-[10.5px] font-mono font-semibold uppercase tracking-[0.16em] transition-all rounded-sm ${
                isTransparentHero 
                  ? 'bg-white text-[#1A1A18] hover:bg-white/90 shadow-xs' 
                  : 'bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#38332B]'
              }`}
            >
              ENQUIRE
            </a>

            {/* Universal Working Hamburger Menu Toggle (Desktop + Tablet + Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-all cursor-pointer select-none group ${
                isTransparentHero 
                  ? 'text-white hover:bg-white/10' 
                  : 'text-[#1A1A18] hover:bg-black/5'
              }`}
              aria-label="Toggle navigation menu"
            >
              <span className="text-[11px] font-mono font-bold tracking-[0.16em] uppercase hidden sm:inline-block">
                MENU
              </span>
              <div className="relative w-5 h-3.5 flex flex-col justify-between items-end">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 6, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                  transition={{ duration: 0.25 }}
                  className="block h-[1.5px] bg-current origin-center rounded-full"
                  style={{ width: 20 }}
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                  className="block h-[1.5px] bg-current rounded-full"
                  style={{ width: 14 }}
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -6, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                  transition={{ duration: 0.25 }}
                  className="block h-[1.5px] bg-current origin-center rounded-full"
                  style={{ width: 17 }}
                />
              </div>
            </button>
          </div>

        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════
          LUXURY WORKING DRAWER MENU (DESKTOP & MOBILE)
          ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[420px] bg-[#FAF8F5] text-[#1A1A18] shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-[#E5E0D6]"
            >
              {/* Top Header of Drawer */}
              <div className="flex items-center justify-between p-6 border-b border-[#E8E2D6] shrink-0">
                <Link
                  href="/gourmet-gifts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <div className="relative w-7 h-7">
                    <Image
                      src="/images/brand/logo-vector.pdf.png"
                      alt="The Gourmet Gifts"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className="text-lg font-light tracking-tight text-[#1A1A18] uppercase"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600 }}
                  >
                    The Gourmet Gifts
                  </span>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#1A1A18] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* Main Navigation Links Content */}
              <div className="flex-1 px-6 py-6 space-y-7 overflow-y-auto">
                {/* Occasions Direct Links */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#8C6228] block">
                    Occasions Gifting
                  </span>
                  <div className="flex flex-col space-y-2">
                    {[
                      { label: 'Employee Gifting', href: '/employee-gifting' },
                      { label: 'Client Gifting', href: '/occasions/client-gifting' },
                      { label: 'Festive Gifting', href: '/occasions/festive-gifting' },
                      { label: 'Events & Conferences', href: '/occasions/events-conferences' },
                      { label: 'Milestones & Recognition', href: '/milestones-recognition' },
                      { label: 'CX Gifting', href: '/occasions/cx-gifting' },
                      { label: 'Dealer & Partner Gifting', href: '/occasions/dealer-partner-gifting' },
                      { label: 'Weddings & Celebrations', href: '/occasions/weddings-celebrations' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-medium text-[#2C2925] hover:text-[#8C6228] hover:translate-x-1 transition-all py-1"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Quick Navigation */}
                <div className="space-y-3 pt-3 border-t border-[#E8E2D6]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-[#8C6228] block">
                    Explore &amp; Connect
                  </span>
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/collections"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-[#2C2925] hover:text-[#8C6228] transition-colors py-1"
                    >
                      Complete Catalogue
                    </Link>
                    <Link
                      href="/gourmet-gifts#curation-inquiry"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-[#2C2925] hover:text-[#8C6228] transition-colors py-1"
                    >
                      Bespoke Curation Enquiry
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-[#2C2925] hover:text-[#8C6228] transition-colors py-1"
                    >
                      Contact Concierge
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Concierge Action Box */}
              <div className="p-6 bg-[#F4EFEA] border-t border-[#E8E2D6] space-y-3 shrink-0">
                <a
                  href="https://wa.me/917021463609?text=Hi%21%20I%E2%80%99d%20like%20to%20enquire%20about%20bespoke%20corporate%20gifting."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#1A1A18] hover:bg-[#2C241D] text-white text-xs font-mono uppercase tracking-[0.16em] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <span>CHAT ON WHATSAPP</span>
                </a>

                <div className="text-center pt-1">
                  <p className="text-[11px] text-[#78746D] font-light">
                    hello@thegourmetgifts.co • Mumbai, India
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
};
