'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative z-10 text-[#2C3228] border-t border-[#a6bd93]/40 rounded-none font-sans overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/images/footer_bg_pattern.jpg')" }}
    >
      {/* Top Left to Bottom Right Pastel Gradient Overlay */}
      <div className="bg-gradient-to-br from-[#EAF0E6]/95 via-[#DFE8DB]/90 to-[#EAF0E6]/95 backdrop-blur-[1px] w-full h-full">
        {/* Main Footer Links Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10">
            {/* Brand Info Column */}
            <div className="col-span-2 lg:col-span-2 space-y-3 md:space-y-5 border-b md:border-none border-[#a6bd93]/20 pb-5 md:pb-0">
              <Link href="/" className="inline-flex items-center group">
                <span className="font-serif-luxury text-xl md:text-2xl font-bold text-[#2C3228] tracking-widest uppercase group-hover:text-[#52604D] transition-colors">
                  GOURMET <span className="text-[#6B855A] font-normal">GIFTS CO.</span>
                </span>
              </Link>

              <p className="text-xs text-[#52604D] leading-relaxed font-normal max-w-sm">
                Handcrafted luxury gourmet hampers &amp; bespoke keepsake collections created for life’s most memorable celebrations.
              </p>

              <div className="pt-1 flex items-center gap-4 text-[11px] font-sans text-[#52604D] font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#6B855A]" />
                  Handcrafted Care
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#6B855A]" />
                  Pan-India Express
                </span>
              </div>
            </div>

            {/* Column 1: Collections */}
            <div className="space-y-2 md:space-y-4">
              <h4 className="font-serif-luxury text-xs md:text-sm font-bold text-[#2C3228] uppercase tracking-wider">
                Collections
              </h4>
              <ul className="space-y-1.5 md:space-y-2.5 text-[11px] md:text-xs text-[#52604D] font-medium">
                <li>
                  <Link href="/gift-boxing/classics" className="hover:text-[#2C3228] transition-colors">
                    The Classics Edition
                  </Link>
                </li>
                <li>
                  <Link href="/gift-boxing/premium-velvet" className="hover:text-[#2C3228] transition-colors">
                    Premium Velvet Chests
                  </Link>
                </li>
                <li>
                  <Link href="/gift-boxing/royale-tin" className="hover:text-[#2C3228] transition-colors">
                    Royale Tin Keepsakes
                  </Link>
                </li>
                <li>
                  <Link href="/gift-boxing" className="hover:text-[#2C3228] transition-colors">
                    Wooden Trays &amp; Decor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Client Services */}
            <div className="space-y-2 md:space-y-4">
              <h4 className="font-serif-luxury text-xs md:text-sm font-bold text-[#2C3228] uppercase tracking-wider">
                Client Care
              </h4>
              <ul className="space-y-1.5 md:space-y-2.5 text-[11px] md:text-xs text-[#52604D] font-medium">
                <li>
                  <Link href="/customize" className="hover:text-[#2C3228] transition-colors">
                    Customize Box
                  </Link>
                </li>
                <li>
                  <Link href="/inquire" className="hover:text-[#2C3228] transition-colors">
                    Bulk Enquire
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-[#2C3228] transition-colors">
                    Wedding Favors
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-[#2C3228] transition-colors">
                    Track Order Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Concierge */}
            <div className="col-span-2 lg:col-span-1 space-y-2 md:space-y-4 pt-2 md:pt-0 border-t md:border-none border-[#a6bd93]/20">
              <h4 className="font-serif-luxury text-xs md:text-sm font-bold text-[#2C3228] uppercase tracking-wider">
                Concierge
              </h4>
              <div className="flex flex-row md:flex-col justify-between gap-4 text-[11px] md:text-xs text-[#52604D] font-medium">
                <div>
                  <strong className="text-[#2C3228] block font-sans font-bold text-[10px] uppercase tracking-wider">Email</strong>
                  concierge@gourmetgem.com
                </div>
                <div>
                  <strong className="text-[#2C3228] block font-sans font-bold text-[10px] uppercase tracking-wider">Phone</strong>
                  +91 98765 43210
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="border-t border-[#a6bd93]/30 bg-[#DFE8DB]/90 py-4 md:py-6 px-4 md:px-12 text-[10px] md:text-xs text-[#52604D] font-medium">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 md:gap-4 text-center md:text-left">
            <p>© {new Date().getFullYear()} The Gourmet Gifts Co. All rights reserved.</p>

            <div className="flex items-center gap-4 text-[#52604D]">
              <Link href="/account" className="hover:text-[#2C3228] transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/account" className="hover:text-[#2C3228] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
