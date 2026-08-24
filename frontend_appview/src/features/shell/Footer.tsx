'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SATRA_FOOTER_COLUMNS = [
  {
    title: 'Maison & Divisions',
    links: [
      { label: 'Satra Atelier', href: '/collections' },
      { label: 'Satra Living', href: '/story' },
      { label: 'Our Story & Guilds', href: '/story' },
    ],
  },
  {
    title: 'Corporate Curation',
    links: [
      { label: 'Private Concierge', href: '/corporate' },
      { label: 'Custom Crest Embossing', href: '/corporate' },
      { label: 'Institutional Orders', href: '/corporate' },
      { label: 'Corporate Dossier', href: '/corporate' },
    ],
  },
  {
    title: 'Client Services',
    links: [
      { label: 'Bespoke Inquiries', href: '/contact' },
      { label: 'Artisanal Gift Boxing', href: '/gift-boxing' },
      { label: 'Pan-India Dispatch', href: '/contact' },
    ],
  },
  {
    title: 'Concierge Direct',
    links: [
      { label: 'concierge@houseofsatra.com', href: 'mailto:concierge@houseofsatra.com' },
      { label: '+91 98765 43210', href: 'tel:+919876543210' },
      { label: 'Delhi NCR • Mumbai • Jaipur', href: '/contact' },
    ],
  },
];

const GOURMET_FOOTER_COLUMNS = [
  {
    title: 'Gourmet Curations',
    links: [
      { label: 'Master Catalogue', href: '/gourmet-gifts' },
      { label: 'Corporate Gifting', href: '/corporate' },
      { label: 'Artisanal Gift Boxing', href: '/gift-boxing' },
      { label: 'Our Heritage Story', href: '/story' },
    ],
  },
  {
    title: 'Corporate & Bulk',
    links: [
      { label: 'Custom Brand QR Solutions', href: '/gourmet-gifts' },
      { label: '3D Miniature Milestone Sets', href: '/gourmet-gifts' },
      { label: 'Bespoke Packaging Design', href: '/corporate' },
      { label: 'Direct Corporate Enquiries', href: '/inquire' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'Pan-India Temperature Logistics', href: '/contact' },
      { label: 'Freshness & Shelf Life Guarantee', href: '/contact' },
      { label: 'Corporate Concierge', href: '/inquire' },
    ],
  },
  {
    title: 'Concierge Direct',
    links: [
      { label: 'concierge@thegourmetgifts.com', href: 'mailto:concierge@thegourmetgifts.com' },
      { label: '+91 98765 43210', href: 'tel:+919876543210' },
      { label: 'Pan-India Delivery & Corporate Bulk', href: '/contact' },
    ],
  },
];

export const Footer: React.FC = () => {
  const footerColumns = GOURMET_FOOTER_COLUMNS;

  return (
    <footer className="relative overflow-hidden bg-[#121211] text-[#F6F4EF] border-t border-white/10">

      {/* ─── Background Texture Image ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] mix-blend-luminosity">
        <Image
          src="/images/footer_bg_pattern.jpg"
          alt="Background Texture"
          fill
          className="object-cover object-center filter grayscale"
        />
      </div>

      {/* ─── Top-Left Atmospheric Glow Gradient ─── */}
      <div 
        className="absolute top-0 left-0 w-[350px] sm:w-[500px] h-[250px] sm:h-[350px] pointer-events-none z-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 15% 90%, rgba(212, 175, 55, 0.16) 0%, rgba(181, 175, 166, 0.06) 35%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* ─── Ambient Vignette ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* ─── Compact Sleek Container ─── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-6 sm:pb-8">
        
        {/* Top Header: Compact Brand Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-6 border-b border-white/10">
          <Link href="/gourmet-gifts" className="inline-flex items-center gap-2.5 group">
            <div className="relative w-7 h-5 sm:w-8 sm:h-6 transition-transform group-hover:scale-105 duration-300">
              <Image
                src="/images/brand/logo-vector.pdf.png"
                alt="The Gourmet Gifts"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <span
              className="text-xl sm:text-2xl tracking-[-0.01em] uppercase font-light leading-none text-[#F6F4EF]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 500 }}
            >
              The Gourmet Gifts
            </span>
          </Link>

          <p className="font-serif italic text-xs sm:text-sm text-[#C7C3BB]/80 tracking-wide">
            “Thoughtfully Curated, Beautifully Presented.”
          </p>
        </div>

        {/* Middle: 4 Compact Nav Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-6 sm:py-8 border-b border-white/10">
          {footerColumns.map((col) => (
            <div key={col.title} className="space-y-2.5">
              <h4 className="text-[9.5px] sm:text-[10px] uppercase tracking-[0.22em] text-[#7A8B6F] font-mono font-bold">
                {col.title}
              </h4>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-xs sm:text-[12.5px] text-[#A6A29A] hover:text-[#FFFFFF] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Compact Meta & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-5 text-[10px] text-[#8A8680]">
          <div className="flex items-center gap-2.5">
            <span>© {new Date().getFullYear()} The Gourmet Gifts.</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>All rights reserved.</span>
          </div>

          <span className="text-[#B5AFA6]/60 uppercase tracking-widest text-[8.5px]">
            Luxury Artisanal Gifting &amp; Curations
          </span>
        </div>

      </div>
    </footer>
  );
};
