'use client';

import React from 'react';

const BRAND_LOGOS = [
  {
    name: 'TATA',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 160 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="900" fontSize="28" letterSpacing="6">TATA</text>
      </svg>
    ),
  },
  {
    name: 'RELIANCE',
    svg: (
      <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 180 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="22" letterSpacing="4">RELIANCE</text>
      </svg>
    ),
  },
  {
    name: 'TAJ HOTELS',
    svg: (
      <svg className="h-8 sm:h-10 w-auto" viewBox="0 0 140 50" fill="currentColor">
        <path d="M70 4L78 20H62L70 4Z" fill="currentColor" opacity="0.9" />
        <text x="50%" y="78%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="600" fontSize="18" letterSpacing="5">TAJ</text>
      </svg>
    ),
  },
  {
    name: 'HDFC BANK',
    svg: (
      <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 180 48" fill="currentColor">
        <rect x="10" y="10" width="28" height="28" rx="4" fill="currentColor" />
        <rect x="16" y="16" width="16" height="16" fill="#FAF8F5" />
        <rect x="22" y="12" width="4" height="24" fill="currentColor" />
        <text x="50" y="62%" dominantBaseline="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="20" letterSpacing="2">HDFC BANK</text>
      </svg>
    ),
  },
  {
    name: 'INFOSYS',
    svg: (
      <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 160 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="700" fontSize="24" letterSpacing="3">Infosys</text>
      </svg>
    ),
  },
  {
    name: 'ADITYA BIRLA',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 210 48" fill="currentColor">
        <circle cx="20" cy="24" r="12" fill="currentColor" opacity="0.85" />
        <text x="42" y="62%" dominantBaseline="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="18" letterSpacing="2.5">ADITYA BIRLA</text>
      </svg>
    ),
  },
  {
    name: 'MAHINDRA',
    svg: (
      <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 170 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="800" fontSize="22" letterSpacing="3">mahindra</text>
      </svg>
    ),
  },
  {
    name: 'OBEROI HOTELS',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 160 48" fill="currentColor">
        <text x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="600" fontSize="20" letterSpacing="3">Oberoi</text>
      </svg>
    ),
  },
  {
    name: 'MCKINSEY',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 200 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="600" fontSize="20" letterSpacing="2">McKinsey &amp; Co.</text>
      </svg>
    ),
  },
  {
    name: 'GODREJ',
    svg: (
      <svg className="h-7 sm:h-9 w-auto" viewBox="0 0 150 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, cursive, serif" fontStyle="italic" fontWeight="700" fontSize="24" letterSpacing="1">Godrej</text>
      </svg>
    ),
  },
  {
    name: 'DLF LUXURY',
    svg: (
      <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 130 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Helvetica Neue', Arial, sans-serif" fontWeight="900" fontSize="26" letterSpacing="4">DLF</text>
      </svg>
    ),
  },
  {
    name: 'GOOGLE',
    svg: (
      <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 150 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Product Sans', -apple-system, sans-serif" fontWeight="700" fontSize="24" letterSpacing="1">Google</text>
      </svg>
    ),
  },
  {
    name: 'ITC LIMITED',
    svg: (
      <svg className="h-6 sm:h-8 w-auto" viewBox="0 0 130 48" fill="currentColor">
        <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="800" fontSize="24" letterSpacing="5">ITC</text>
      </svg>
    ),
  },
];

export const TrustedBusinessesMarquee: React.FC = () => {
  return (
    <section className="py-14 sm:py-18 md:py-22 bg-[#FAF8F5] border-t border-[#EAE5DC] relative overflow-hidden text-[#1A1A18]">
      
      {/* ─── SECTION HEADING (SERIF THEMED & PROMINENT) ─── */}
      <div className="max-w-[1440px] mx-auto px-4 text-center mb-8 sm:mb-12 space-y-2">
        <h3
          className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          Trusted by India&apos;s Leading Enterprises
        </h3>
        <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-md mx-auto">
          Delivering bespoke keepsakes and executive gifting programs across 250+ institutions.
        </p>
      </div>

      {/* Edge Gradient Fades for Smooth Horizon */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Horizontal Marquee (Slower, Smooth 65s Speed) */}
      <div className="flex overflow-hidden select-none py-3">
        <div className="flex items-center gap-12 sm:gap-20 shrink-0 animate-marquee">
          {BRAND_LOGOS.concat(BRAND_LOGOS).map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center text-[#5A554D] hover:text-[#1A1A18] transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105 shrink-0 px-2"
              title={brand.name}
            >
              {brand.svg}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-12 sm:gap-20 shrink-0 animate-marquee" aria-hidden="true">
          {BRAND_LOGOS.concat(BRAND_LOGOS).map((brand, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center justify-center text-[#5A554D] hover:text-[#1A1A18] transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105 shrink-0 px-2"
              title={brand.name}
            >
              {brand.svg}
            </div>
          ))}
        </div>
      </div>

      {/* Smooth CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
