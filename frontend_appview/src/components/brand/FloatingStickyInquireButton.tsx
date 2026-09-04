'use client';

import React from 'react';
import Image from 'next/image';
import { useInquiryModal } from '@/hooks/useInquiryModal';

export const FloatingStickyInquireButton: React.FC = () => {
  const { openInquiryModal } = useInquiryModal();

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={() => openInquiryModal({ source: 'Sticky Floating Inquire Button' })}
        aria-label="Open Curation Enquiry"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1A1A18] text-[#DFC299] border-2 border-[#C5A265]/70 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] hover:border-[#DFC299] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-300 group-hover:rotate-6">
          <Image
            src="/icon.svg"
            alt="The Gourmet Gifts"
            fill
            sizes="36px"
            className="object-contain"
          />
        </div>
      </button>
    </div>
  );
};
