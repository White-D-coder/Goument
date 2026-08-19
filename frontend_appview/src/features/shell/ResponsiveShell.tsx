'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { OfflineBanner } from './OfflineBanner';
import { OnlineToast } from './OnlineToast';
import { Footer } from './Footer';
import { useOnlineStatus } from '@/shared/useOnlineStatus';
import { Toaster } from 'react-hot-toast';

const NAV_LINKS = [
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isHomepage = pathname === '/';
  const isTransparent = isHomepage && !isScrolled && !mobileMenuOpen;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: 'var(--font-jakarta)',
            fontSize: '13px',
          },
        }}
      />

      <OfflineBanner isOnline={isOnline} />
      <OnlineToast
        shouldTrigger={showReconnectedToast}
        onHandled={() => setShowReconnectedToast(false)}
      />

      {/* ═══ NAVIGATION ═══ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-[400ms]"
        style={{
          backgroundColor: isTransparent ? 'transparent' : 'rgba(246, 244, 239, 0.97)',
          borderBottom: isTransparent ? '1px solid transparent' : '1px solid #E0DDD6',
          backdropFilter: isTransparent ? 'none' : 'blur(12px)',
        }}
      >
        <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-16 px-6 lg:px-10">
          {/* Left — Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-10 flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`type-nav transition-colors duration-200 ${
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-[#8A8680] hover:text-[#1A1A18]'
                } ${pathname === link.href ? (isTransparent ? 'text-white' : 'text-[#1A1A18]') : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center — Brand Wordmark */}
          <div className="flex-1 flex justify-start lg:justify-center">
            <Link
              href="/"
              className={`transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-[#1A1A18]'
              }`}
            >
              <span
                className="block font-[var(--font-cormorant)] text-[20px] lg:text-[24px] tracking-[-0.01em] leading-none"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600 }}
              >
                The Gourmet Gifts Co.
              </span>
            </Link>
          </div>

          {/* Right — House of Sutra Link + Mobile Toggle */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <Link
              href="#"
              className={`hidden lg:inline-flex editorial-link type-meta items-center gap-1.5 transition-colors duration-200 ${
                isTransparent
                  ? 'text-white/70 hover:text-white'
                  : 'text-[#B5AFA6] hover:text-[#1A1A18]'
              }`}
            >
              <span>Explore House of Sutra</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            {/* Mobile Menu Toggle — Two-line hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden relative w-7 h-5 flex flex-col justify-between items-end cursor-pointer ${
                isTransparent ? 'text-white' : 'text-[#1A1A18]'
              }`}
              aria-label="Toggle menu"
            >
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'w-7 rotate-45 translate-y-[9px]' : 'w-7'
                }`}
              />
              <span
                className={`block h-[1.5px] bg-current transition-all duration-300 ${
                  mobileMenuOpen ? 'w-7 -rotate-45 -translate-y-[9px]' : 'w-5'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ═══ MOBILE MENU OVERLAY ═══ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#F6F4EF] flex flex-col justify-center items-center"
            style={{ paddingTop: 'var(--nav-height-mobile)' }}
          >
            <nav className="flex flex-col items-center gap-1">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-3 text-center transition-colors duration-200 ${
                      pathname === link.href ? 'text-[#1A1A18]' : 'text-[#8A8680]'
                    }`}
                    style={{
                      fontFamily: 'var(--font-cormorant), Georgia, serif',
                      fontWeight: 400,
                      fontSize: '36px',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="mt-10 pt-8 border-t border-[#E0DDD6]"
              >
                <Link
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="editorial-link type-meta text-[#B5AFA6] inline-flex items-center gap-2"
                >
                  <span>Explore House of Sutra</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            </nav>
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
