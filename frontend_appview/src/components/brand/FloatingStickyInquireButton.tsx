'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { Sparkles, ExternalLink, X } from 'lucide-react';

export const FloatingStickyInquireButton: React.FC = () => {
  const { openInquiryModal } = useInquiryModal();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Quick Action Flyout */}
      {showOptions && (
        <div className="bg-white/95 backdrop-blur-md border border-[#EAE5DC] rounded-xl p-2.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] flex flex-col gap-1.5 w-64 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between px-2 py-1 border-b border-[#F0EBE1]">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C7449] font-semibold">
              Corporate Concierge
            </span>
            <button
              onClick={() => setShowOptions(false)}
              className="p-1 text-[#8C867D] hover:text-[#1A1A18] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setShowOptions(false);
              openInquiryModal({ source: 'Floating Pill - Form' });
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium text-[#1A1A18] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer text-left border border-transparent hover:border-[#EAE5DC]"
          >
            <span>Request Custom Proposal</span>
            <Sparkles className="w-3.5 h-3.5 text-[#8C7449]" />
          </button>

          <a
            href="https://wa.me/917021463609?text=Hello%2C%20I%20would%20like%20to%20get%20an%20instant%20corporate%20gifting%20estimate%20and%20catalogue."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowOptions(false)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium bg-[#E7F6EC] hover:bg-[#D4EEDC] text-[#1E6B39] border border-[#BDE3CA] rounded-lg transition-colors cursor-pointer"
          >
            <span>WhatsApp Quote (1 Min)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Main Luxury Floating Pill */}
      <button
        onClick={() => setShowOptions((prev) => !prev)}
        aria-label="Get Corporate Estimate"
        className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-[#1A1A18] hover:bg-[#2C2924] text-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-[#DFC299]/60 hover:border-[#DFC299] transition-all duration-300 active:scale-95 cursor-pointer"
      >
        <div className="relative w-5 h-5 shrink-0 invert brightness-200 group-hover:rotate-6 transition-transform">
          <Image
            src="/images/brand/logo-vector.pdf.png"
            alt="The Gourmet Gifts"
            fill
            className="object-contain"
          />
        </div>
        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] font-semibold text-[#FAF8F5]">
          Quick Estimate <span className="text-[#DFC299]">• 1 Min</span>
        </span>
      </button>
    </div>
  );
};
