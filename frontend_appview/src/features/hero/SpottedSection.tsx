'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Palette, PackageCheck, Award } from 'lucide-react';
import toast from 'react-hot-toast';

const COLUMN_1_IMAGES = [
  '/images/Category_image/Royale_tin_tin/tin7.jpeg',
  '/images/Category_image/Classics/classic_1.png',
  '/images/Category_image/Royale_tin_tin/tin8.jpeg',
  '/images/Category_image/Royale_tin_tin/tin9.jpeg',
];

const COLUMN_2_IMAGES = [
  '/images/small_anipics/velvet_tray_hero.jpg',
  '/images/small_anipics/framee.png',
  '/images/Category_image/Classics/classics_hero.png',
  '/images/Category_image/Royale_tin_tin/tinnew1.png',
];

const COLUMN_3_IMAGES = [
  '/images/Category_image/premium_velvet/thumb.jpeg',
  '/images/Category_image/Royale_tin_tin/tin10.jpeg',
  '/images/Category_image/Royale_tin_tin/tin11.jpeg',
  '/images/Category_image/Royale_tin_tin/tin12.jpeg',
];

const ALL_MOBILE_IMAGES = [
  ...COLUMN_1_IMAGES,
  ...COLUMN_2_IMAGES,
  ...COLUMN_3_IMAGES,
];

interface VerticalMarqueeColumnProps {
  images: string[];
  duration?: number;
  reverse?: boolean;
}

const VerticalMarqueeColumn: React.FC<VerticalMarqueeColumnProps> = ({
  images,
  duration = 20,
  reverse = false,
}) => {
  const duplicated = [...images, ...images];

  return (
    <div className="relative h-[680px] overflow-hidden">
      <motion.div
        initial={{ y: reverse ? '-50%' : '0%' }}
        animate={{ y: reverse ? '0%' : '-50%' }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex flex-col gap-5"
      >
        {duplicated.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className="w-full h-[320px] shrink-0 rounded-2xl overflow-hidden bg-[#EFECE6] border border-[#E4E0D7]/80 shadow-2xs group relative"
          >
            <img
              src={src}
              alt="Gourmet Gifts Celebration"
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const MobileHorizontalMarquee: React.FC<{ images: string[] }> = ({ images }) => {
  const duplicated = [...images, ...images];

  return (
    <div className="relative overflow-hidden w-full py-2 sm:hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 25,
          ease: 'linear',
          repeat: Infinity,
        }}
        className="flex gap-3.5 w-max"
      >
        {duplicated.map((src, idx) => (
          <div
            key={`mobile-spotted-${src}-${idx}`}
            className="w-[200px] h-[260px] shrink-0 rounded-2xl overflow-hidden bg-[#EFECE6] border border-[#E4E0D7]/80 shadow-2xs relative"
          >
            <img
              src={src}
              alt="Gourmet Gifts Celebration"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const SpottedSection: React.FC = () => {
  const [customMessage, setCustomMessage] = useState('');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;
    toast.success('Thank you! Your custom message inquiry has been received.', {
      style: { background: '#2C3228', color: '#FAF7F2', border: '1px solid #a6bd93' },
    });
    setCustomMessage('');
  };

  return (
    <section className="bg-[#FAF7F2] py-10 md:py-16 border-b border-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        
        {/* Minimalist 4-Column Feature Highlight Row (Matching Reference Image) */}
        <div className="pt-2 pb-6 border-b border-[#E4E0D7]/60">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 py-4">
            
            {/* Item 1 */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 group">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] text-[#2C3228] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-sans text-xs sm:text-sm md:text-base font-medium text-[#2C3228] tracking-tight sm:tracking-normal">
                Curated Elegance
              </span>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 group">
              <Palette className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] text-[#2C3228] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-sans text-xs sm:text-sm md:text-base font-medium text-[#2C3228] tracking-tight sm:tracking-normal">
                Signature Personalisation
              </span>
            </div>

            {/* Item 3 */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 group">
              <PackageCheck className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] text-[#2C3228] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-sans text-xs sm:text-sm md:text-base font-medium text-[#2C3228] tracking-tight sm:tracking-normal">
                Artisan Presentation
              </span>
            </div>

            {/* Item 4 */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 group">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] text-[#2C3228] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-sans text-xs sm:text-sm md:text-base font-medium text-[#2C3228] tracking-tight sm:tracking-normal">
                Exceptional Quality
              </span>
            </div>

          </div>
        </div>

        {/* Section Header */}
        <div className="relative border-b border-[#E4E0D7]/60 pb-5 text-center flex flex-col items-center justify-center space-y-1">
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#52604D] uppercase block">
            Real Gifting Moments
          </span>
          <h2 className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl font-bold text-[#2C3228] tracking-tight text-center">
            Made for Moments That Matter
          </h2>
        </div>

        {/* 1. Phone View: Compact Horizontal Auto-Scroll Tape (sm:hidden) */}
        <MobileHorizontalMarquee images={ALL_MOBILE_IMAGES} />

        {/* 2. Desktop View: 3-Column Vertical Infinite Photo Marquee (hidden sm:block) */}
        <div className="hidden sm:block relative overflow-hidden rounded-3xl">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-3 gap-5 md:gap-6">
            <VerticalMarqueeColumn images={COLUMN_1_IMAGES} duration={24} />
            <VerticalMarqueeColumn images={COLUMN_2_IMAGES} duration={18} reverse />
            <VerticalMarqueeColumn images={COLUMN_3_IMAGES} duration={22} />
          </div>
        </div>

        {/* Custom Message Submission Form Box */}
        <div className="max-w-2xl mx-auto pt-4 text-center space-y-3">
          <p className="text-xs sm:text-sm text-[#7A8275] font-medium">
            Have a custom order requirement or bespoke message query?
          </p>

          <form onSubmit={handleMessageSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Type your custom gifting message or inquiry..."
              className="flex-1 px-5 py-3.5 bg-white border border-[#E4E0D7] text-xs sm:text-sm text-[#2C3228] placeholder:text-[#7A8275] rounded-full focus:outline-none focus:border-[#7A1C29] shadow-2xs transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#7A1C29] hover:bg-[#5C141F] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md active:scale-98 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
