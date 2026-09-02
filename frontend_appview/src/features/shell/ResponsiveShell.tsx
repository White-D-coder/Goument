'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { Footer } from './Footer';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { Toaster } from 'react-hot-toast';
import GoldPopperSprinkle from '@/components/effects/GoldPopperSprinkle';
import { InquiryModal } from '@/components/modals/InquiryModal';
import { useInquiryModal } from '@/hooks/useInquiryModal';

/* ── The Gourmet Gifts Nav Links (Single-Word Concise) ── */
const GOURMET_NAV_LINKS = [
  { label: 'Catalogue', href: '/#catalogue' },
  { label: 'Occasions', href: '/#occasions' },
  { label: 'Contact', href: '/contact' },
];

export const ResponsiveShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const { openInquiryModal } = useInquiryModal();
  const [showReconnectedToast, setShowReconnectedToast] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isTransparentHero = pathname === '/' && !isScrolled && !mobileMenuOpen;
  const currentNavLinks = GOURMET_NAV_LINKS;

  const scrollToHeroOrTop = (e: React.MouseEvent) => {
    if (pathname === '/') {
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
                    if (pathname === targetPath || (pathname === '/' && (targetPath === '' || targetPath === '/'))) {
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
              href="/"
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
            {/* Quick Enquire Modal CTA */}
            <button
              type="button"
              onClick={() => openInquiryModal({ source: 'Navbar Enquire Button' })}
              className={`inline-flex items-center px-3.5 py-1.5 text-[10.5px] font-mono font-semibold uppercase tracking-[0.16em] transition-all rounded-sm cursor-pointer ${
                isTransparentHero 
                  ? 'bg-white text-[#1A1A18] hover:bg-white/90 shadow-xs' 
                  : 'bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#38332B]'
              }`}
            >
              ENQUIRE
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden relative w-6 h-4 flex flex-col justify-between items-end cursor-pointer ml-1 ${
                isTransparentHero ? 'text-white' : 'text-[var(--satra-charcoal)]'
              }`}
              aria-label="Toggle navigation menu"
            >
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 7.5, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.2px] bg-current origin-center"
                style={{ width: 24 }}
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-[1.2px] bg-current"
                style={{ width: 16 }}
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -7.5, width: 24 } : { rotate: 0, y: 0, width: 24 }}
                transition={{ duration: 0.3 }}
                className="block h-[1.2px] bg-current origin-center"
                style={{ width: 20 }}
              />
            </button>
          </div>

        </nav>
      </header>

      {/* ═══════════════════════════════════════════════════
          MOBILE MENU OVERLAY
          ═══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: 'var(--satra-silk)' }}
          >
            {/* Spacer */}
            <div className="h-20 shrink-0" />

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {currentNavLinks.map((link, i) => (
                <motion.div
                  key={link.href + link.label}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 + i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.href.includes('#')) {
                        const [targetPath, hash] = link.href.split('#');
                        if (pathname === targetPath || (pathname === '/' && (targetPath === '' || targetPath === '/'))) {
                          e.preventDefault();
                          const element = document.getElementById(hash);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }
                    }}
                    className={`block py-2.5 transition-colors duration-200 ${
                      pathname === link.href
                        ? 'text-[var(--satra-charcoal)] font-semibold'
                        : 'text-[var(--satra-text-secondary)]'
                    }`}
                  >
                    <span
                      className="text-[26px] sm:text-[30px] font-light tracking-tight"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Enquire Button */}
            <div className="px-8 pb-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openInquiryModal({ source: 'Mobile Menu Enquire' });
                }}
                className="w-full py-3.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white text-xs font-mono uppercase tracking-[0.18em] font-bold rounded-lg transition-all cursor-pointer shadow-md"
              >
                ENQUIRE NOW
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="px-8 py-6 border-t flex items-center justify-between" style={{ borderColor: 'var(--satra-linen)' }}>
              <div className="flex items-center gap-5">
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="text-[var(--satra-stone)]" aria-label="Account">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>
              </div>
              <span className="type-micro text-[var(--satra-taupe)]">
                The Gourmet Gifts
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* ═══ FOOTER ═══ */}
      <Footer />

      {/* ═══ GLOBAL INQUIRY POPUP MODAL ═══ */}
      <InquiryModal />
    </div>
  );
};
