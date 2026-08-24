'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, User, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { Footer } from './Footer';
import { CartIcon } from './CartIcon';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { Toaster } from 'react-hot-toast';

/* ── House of Satra Nav Links ── */
const SATRA_NAV_LINKS = [
  { label: 'The Gourmet Gifts', href: '/gourmet-gifts' },
  { label: 'Atelier', href: '/collections' },
  { label: 'Living', href: '/story' },
  { label: 'Corporate', href: '/corporate' },
];

/* ── The Gourmet Gifts Nav Links ── */
const GOURMET_NAV_LINKS = [
  { label: 'Collections', href: '/collections' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Our Story', href: '/story' },
  { label: 'Contact', href: '/contact' },
];

export const ResponsiveShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
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
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isGourmetStorefront = pathname.startsWith('/gourmet-gifts') || pathname.startsWith('/gourmet');
  const isGourmetHeroPage = pathname === '/gourmet-gifts' || pathname === '/gourmet';
  const isHomepage = pathname === '/' || pathname === '/house-of-satra';
  const isTransparentHero = (isHomepage || isGourmetHeroPage) && !isScrolled && !mobileMenuOpen;

  const currentNavLinks = isGourmetStorefront ? GOURMET_NAV_LINKS : SATRA_NAV_LINKS;

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: 'var(--satra-ivory)' }}>
      <Toaster
        position="top-center"
        toastOptions={{ style: { fontFamily: 'var(--font-jakarta)', fontSize: '13px' } }}
      />
      <OfflineBanner isOnline={isOnline} />
      <OnlineToast shouldTrigger={showReconnectedToast} onHandled={() => setShowReconnectedToast(false)} />

      {/* ═══════════════════════════════════════════════════
          NAVIGATION BAR — Dynamic Multi-Brand Maison
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
                className={`type-nav transition-colors duration-200 ${
                  isTransparentHero
                    ? 'text-white/75 hover:text-white'
                    : 'text-[var(--satra-warm-gray)] hover:text-[var(--satra-charcoal)]'
                } ${pathname === link.href
                    ? (isTransparentHero ? '!text-white font-semibold' : '!text-[var(--satra-charcoal)] font-semibold')
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ─── Center: Active Brand Identity (Logo on Top -> Text Name on Scroll) ─── */}
          <div className="flex-1 flex justify-start lg:justify-center">
            <Link
              href={isGourmetStorefront ? '/gourmet-gifts' : '/'}
              className="relative flex items-center justify-start lg:justify-center group"
            >
              {/* Mobile View: ONLY the Logo (No text name) */}
              <div className="relative lg:hidden w-10 h-7 flex items-center justify-start">
                <Image
                  src="/images/brand/logo-vector.pdf.png"
                  alt={isGourmetStorefront ? 'The Gourmet Gifts' : 'House of Satra'}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    isTransparentHero ? 'brightness-0 invert' : ''
                  }`}
                  priority
                />
              </div>

              {/* Desktop View: Logo at Top -> Transitions to Text Name on Scroll */}
              <div className="hidden lg:flex items-center justify-center relative min-h-[38px] min-w-[210px]">
                <AnimatePresence mode="wait">
                  {!isScrolled ? (
                    <motion.div
                      key="nav-brand-logo"
                      initial={{ opacity: 0, scale: 0.9, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -4 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-14 h-9 flex items-center justify-center"
                    >
                      <Image
                        src="/images/brand/logo-vector.pdf.png"
                        alt={isGourmetStorefront ? 'The Gourmet Gifts' : 'House of Satra'}
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
                      {isGourmetStorefront ? 'The Gourmet Gifts' : 'House of Satra'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          </div>

          {/* ─── Right: Brand Switcher + Utilities + Mobile Menu ─── */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4 lg:gap-5">
            
            {/* Brand Switcher Link with Smooth Underline Reveal on Hover (Desktop) */}
            <Link
              href={isGourmetStorefront ? '/' : '/gourmet-gifts'}
              className={`hidden sm:inline-flex items-center gap-1.5 relative py-1 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 group ${
                isTransparentHero
                  ? 'text-white/80 hover:text-white'
                  : 'text-[var(--satra-warm-gray)] hover:text-[var(--satra-charcoal)]'
              }`}
              title={isGourmetStorefront ? 'Switch to House of Satra Maison' : 'Switch to The Gourmet Gifts Storefront'}
            >
              <span className="relative">
                {isGourmetStorefront ? 'House of Satra' : 'The Gourmet Gifts'}
                <span
                  className={`absolute left-0 bottom-[-2px] w-0 h-[1.2px] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full ${
                    isTransparentHero ? 'bg-white' : 'bg-[var(--satra-charcoal)]'
                  }`}
                />
              </span>
              <ArrowRight className="w-3 h-3 opacity-60 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
            </Link>

            {/* Search */}
            <button
              className={`hidden lg:flex items-center justify-center transition-colors duration-200 cursor-pointer ${
                isTransparentHero ? 'text-white/75 hover:text-white' : 'text-[var(--satra-stone)] hover:text-[var(--satra-charcoal)]'
              }`}
              aria-label="Search"
            >
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className={`hidden lg:flex items-center justify-center transition-colors duration-200 ${
                isTransparentHero ? 'text-white/75 hover:text-white' : 'text-[var(--satra-stone)] hover:text-[var(--satra-charcoal)]'
              }`}
              aria-label="Account"
            >
              <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>

            {/* Bag */}
            <Link
              href="/cart"
              className={`flex items-center justify-center transition-colors duration-200 ${
                isTransparentHero ? 'text-white/80 hover:text-white' : 'text-[var(--satra-charcoal)] hover:text-[var(--satra-emerald-soft)]'
              }`}
              aria-label="Shopping Bag"
            >
              <CartIcon className="w-[18px] h-[18px]" />
            </Link>

            {/* Mobile Menu Toggle — Refined Hamburger */}
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
            <div className="h-16 shrink-0" />

            {/* Brand Portals Switcher */}
            <div className="px-6 pt-5 pb-5 border-b" style={{ borderColor: 'var(--satra-linen)' }}>
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-3 text-center border transition-all duration-200 ${
                    pathname === '/'
                      ? 'border-[var(--satra-charcoal)] bg-[var(--satra-charcoal)] text-[var(--satra-ivory)]'
                      : 'border-[var(--satra-border)] bg-white text-[var(--satra-charcoal)]'
                  }`}
                >
                  <span className="block text-[8px] uppercase tracking-[0.2em] mb-0.5 opacity-50 font-bold">Maison</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider">House of Satra</span>
                </Link>
                <Link
                  href="/gourmet-gifts"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-3 text-center border transition-all duration-200 ${
                    isGourmetStorefront
                      ? 'border-[var(--satra-charcoal)] bg-[var(--satra-charcoal)] text-[var(--satra-ivory)]'
                      : 'border-[var(--satra-border)] bg-white text-[var(--satra-charcoal)]'
                  }`}
                >
                  <span className="block text-[8px] uppercase tracking-[0.2em] mb-0.5 opacity-50 font-bold">Flagship</span>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider">The Gourmet Gifts</span>
                </Link>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
              {(isGourmetStorefront ? [
                { label: 'Collections', href: '/collections' },
                { label: 'Corporate Gifting', href: '/corporate' },
                { label: 'Our Story', href: '/story' },
                { label: 'Contact Concierge', href: '/contact' },
                { label: 'House of Satra Maison ⟶', href: '/' },
              ] : [
                { label: 'The Gourmet Gifts', href: '/gourmet-gifts' },
                { label: 'Satra Atelier', href: '/collections' },
                { label: 'Satra Living', href: '/story' },
                { label: 'Corporate Gifting', href: '/corporate' },
                { label: 'Our Story', href: '/story' },
                { label: 'Contact', href: '/contact' },
              ]).map((link, i) => (
                <motion.div
                  key={link.href + link.label}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 + i * 0.04, ease: [0.4, 0, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
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

            {/* Bottom Actions */}
            <div className="px-8 py-6 border-t flex items-center justify-between" style={{ borderColor: 'var(--satra-linen)' }}>
              <div className="flex items-center gap-5">
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="text-[var(--satra-stone)]" aria-label="Account">
                  <User className="w-5 h-5" strokeWidth={1.5} />
                </Link>
                <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="text-[var(--satra-stone)]" aria-label="Bag">
                  <CartIcon className="w-5 h-5" />
                </Link>
              </div>
              <span className="type-micro text-[var(--satra-taupe)]">
                {isGourmetStorefront ? 'The Gourmet Gifts Co.' : 'House of Satra'}
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
    </div>
  );
};
