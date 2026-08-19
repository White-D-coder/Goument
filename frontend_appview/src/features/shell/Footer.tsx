'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FOOTER_NAV = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Collections', href: '/collections' },
      { label: 'Our Story', href: '/story' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Keepsake Vessels', href: '/collections#keepsake-vessels' },
      { label: 'Tactile Velvet Suites', href: '/collections#velvet-suites' },
      { label: 'Heritage Hampers', href: '/collections#heritage-hampers' },
      { label: 'Atelier Accents', href: '/collections#atelier-accents' },
    ],
  },
  {
    title: 'Corporate',
    links: [
      { label: 'Corporate Gifting', href: '/corporate' },
      { label: 'Custom Branding', href: '/corporate' },
      { label: 'Bulk Orders', href: '/corporate' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'concierge@thegourmetgiftsco.com', href: 'mailto:concierge@thegourmetgiftsco.com' },
      { label: '+91 98765 43210', href: 'tel:+919876543210' },
      { label: 'Mumbai & Delhi NCR', href: '/contact' },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A18] text-[#F6F4EF] relative z-30">
      {/* Top — Brand + Descriptor */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-[120px] pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <Link href="/">
              <span
                className="block text-[32px] md:text-[40px] leading-none tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 600 }}
              >
                The Gourmet Gifts Co.
              </span>
            </Link>
            <p className="type-body text-[#B5AFA6] mt-3 max-w-sm text-sm">
              Gifts that mean something.
            </p>
          </div>

          <Link
            href="#"
            className="editorial-link type-meta text-[#B5AFA6] hover:text-[#F6F4EF] inline-flex items-center gap-2"
          >
            <span>Explore House of Sutra</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Middle — 4 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-20 border-b border-white/10">
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h4 className="type-meta text-[#B5AFA6] mb-5">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="type-body text-[#8A8680] hover:text-[#F6F4EF] transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom — Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-10">
          <p className="type-micro text-[#8A8680]/60">
            © {new Date().getFullYear()} The Gourmet Gifts Co. All rights reserved.
          </p>
          <p className="type-micro text-[#8A8680]/40">
            A House of Sutra brand.
          </p>
        </div>
      </div>
    </footer>
  );
};
