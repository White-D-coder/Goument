'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GOURMET_FOOTER_COLUMNS = [
  {
    title: 'Occasions',
    links: [
      { label: 'Employee Gifting', href: '/employee-gifting' },
      { label: 'Client Gifting', href: '/occasions/client-gifting' },
      { label: 'Festive Gifting', href: '/occasions/festive-gifting' },
      { label: 'Events & Conferences', href: '/occasions/events-conferences' },
      { label: 'Milestones & Recognition', href: '/milestones-recognition' },
      { label: 'Dealer & Partner Gifting', href: '/occasions/dealer-partner-gifting' },
      { label: 'Weddings & Celebrations', href: '/occasions/weddings-celebrations' },
      { label: 'CX Gifting', href: '/occasions/cx-gifting' },
    ],
  },
  {
    title: 'Catalogue Categories',
    links: [
      { label: 'Gourmet Food', href: '/collections?category=gourmet-food' },
      { label: 'Beverages', href: '/collections?category=beverages' },
      { label: 'Decor & Spiritual', href: '/collections?category=decor-spiritual' },
      { label: 'Personalisation', href: '/collections?category=personalisation' },
      { label: 'Wellness & Lifestyle', href: '/collections?category=wellness-lifestyle' },
      { label: 'Office & Travel Bags', href: '/collections?category=office-travel-bags' },
      { label: 'Electronics', href: '/collections?category=electronics-audio' },
      { label: 'Stationery & Desk', href: '/collections?category=stationery-desk' },
      { label: 'Corporate Apparel', href: '/collections?category=corporate-apparel' },
      { label: 'Recognition & Trophies', href: '/collections?category=awards-recognition' },
    ],
  },
  {
    title: 'Quick Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Explore Catalogue', href: '/collections' },
      { label: 'Occasions Showcase', href: '/#occasions' },
      { label: 'Bespoke Enquiry', href: '/contact' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Concierge Direct',
    links: [
      { label: 'hello@thegourmetgifts.co', href: 'mailto:hello@thegourmetgifts.co' },
      { label: '+91 70214 63609', href: 'https://wa.me/917021463609?text=Hi%21%20I%E2%80%99d%20like%20to%20enquire%20about%20bespoke%20corporate%20gifting.' },
      { label: 'Mumbai, India', href: '/contact' },
    ],
  },
];

import { motion, type Variants } from 'framer-motion';

const GOURMET_TITLE_WORDS = ['THE', 'GOURMET', 'GIFTS'];

const footerTitleContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const footerTitleWord: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const footerColumns = GOURMET_FOOTER_COLUMNS;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#')) {
      const [targetPath, hash] = href.split('#');
      if (pathname === targetPath || (pathname === '/' && (targetPath === '' || targetPath === '/'))) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = hash;
        }
      }
    }
  };

  return (
    <footer className="relative overflow-hidden bg-[#ffffff] text-[#000000] border-t border-black/10">

      {/* ─── Top-Left Subtle Warm Glow Gradient ─── */}
      <div 
        className="absolute top-0 left-0 w-[350px] sm:w-[500px] h-[250px] sm:h-[350px] pointer-events-none z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 15% 90%, rgba(212, 175, 55, 0.12) 0%, rgba(181, 175, 166, 0.04) 35%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ─── Compact Sleek Container ─── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6 sm:pb-8">
        
        {/* Top Header: Compact Brand Row */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2.5 sm:gap-4 pb-6 border-b border-black/10">
          <Link href="/" className="inline-flex items-center gap-2.5 group cursor-pointer">
            <motion.h2
              variants={footerTitleContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.01em] uppercase font-light leading-tight text-[#000000] transition-colors group-hover:text-[#8C6228] flex flex-wrap gap-x-2 sm:gap-x-3.5"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 500 }}
            >
              {GOURMET_TITLE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  variants={footerTitleWord}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
          </Link>

          <p className="font-serif italic text-xs sm:text-sm text-[#000000]/75 tracking-wide text-left sm:text-right">
            “Thoughtfully Curated, Beautifully Presented.”
          </p>
        </div>

        {/* Middle: 4 Compact Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 md:gap-8 py-6 sm:py-8 border-b border-black/10">
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-2 sm:space-y-2.5">
              <h4 className="text-[9.5px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[#000000] font-mono font-bold">
                {col.title}
              </h4>
              <ul className="space-y-1.5">
                {col.links.map((link) => {
                  const isExternal = link.href.startsWith('http') || link.href.startsWith('mailto:') || link.href.startsWith('tel:');
                  
                  if (isExternal) {
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-block text-[10.5px] xs:text-[11.5px] sm:text-[12.5px] text-[#4A4742] hover:text-[#8C6228] transition-colors duration-200 cursor-pointer max-w-full truncate xs:overflow-visible"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="inline-block text-[10.5px] xs:text-[11.5px] sm:text-[12.5px] text-[#4A4742] hover:text-[#8C6228] transition-colors duration-200 cursor-pointer"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Compact Meta & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-5 text-[10px] sm:text-[10.5px] text-[#78746D]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} The Gourmet Gifts.</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>All rights reserved.</span>
          </div>

          <span className="text-[#8C847B] uppercase tracking-widest text-[8.5px] sm:text-[9px]">
            Luxury Artisanal Gifting &amp; Curations
          </span>
        </div>

      </div>
    </footer>
  );
};
