'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const ExperienceHighlightsSection: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 md:space-y-24">
        {/* Block 1: Image Left, Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left Wavy Photo: Full stretch fixed without edge box line */}
          <div className="relative lg:col-span-6 bg-transparent border-0 outline-none shadow-none md:border md:border-[#E4E0D7]/80 md:shadow-md md:rounded-3xl md:bg-[#EFECE6] h-[360px] sm:h-[420px] md:h-[480px] w-[calc(100%+2rem)] -ml-4 md:ml-0 md:w-full">
            
            {/* Top Wavy Edge (Mobile Only) */}
            <div className="block md:hidden absolute -top-[2px] left-0 right-0 z-20 pointer-events-none leading-none">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-10 text-[#FAF7F2] fill-current block"
              >
                <path d="M0,0 L1200,0 L1200,40 C1050,90 850,10 600,60 C350,110 150,20 0,70 Z" />
              </svg>
            </div>

            <img
              src="/images/small_anipics/velvet_tray_hero.jpg"
              alt="Delivering the finest gifting experience"
              className="w-full h-full object-cover border-0 outline-none ring-0 block m-0 p-0"
            />

            {/* Bottom Wavy Edge (Mobile Only) */}
            <div className="block md:hidden absolute -bottom-[2px] left-0 right-0 z-20 pointer-events-none leading-none">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-10 text-[#FAF7F2] fill-current block"
              >
                <path d="M0,120 L1200,120 L1200,80 C1050,30 850,110 600,60 C350,10 150,100 0,50 Z" />
              </svg>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#52604D] uppercase block">
              Experience
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3228] leading-[1.15] tracking-tight">
              Delivering the finest gifting experience
            </h2>
            <p className="text-sm md:text-base text-[#7A8275] leading-relaxed max-w-xl font-normal">
              Relax and let us handle everything — each hamper is handcrafted by skilled master artisans who bring expertise, elegance, and unyielding attention to detail for an unforgettable celebration.
            </p>
            <div className="pt-2">
              <Link
                href="/gift-boxing"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7A1C29] hover:bg-[#5C141F] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md active:scale-95"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 text-[#a6bd93]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Block 2: Content Left (Highlights List), Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left Highlights Content */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3228] tracking-tight">
              Why It Feels Different
            </h2>

            <div className="space-y-6">
              {/* Highlight 01 */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full border border-[#E4E0D7] bg-white flex items-center justify-center text-xs font-bold text-[#52604D] shrink-0 shadow-2xs">
                  01
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#2C3228]">
                    Thoughtfully Chosen
                  </h3>
                  <p className="text-xs md:text-sm text-[#7A8275] leading-relaxed font-normal">
                    Every gift is selected around the person, the occasion and what you want them to feel.
                  </p>
                </div>
              </div>

              {/* Highlight 02 */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full border border-[#E4E0D7] bg-white flex items-center justify-center text-xs font-bold text-[#52604D] shrink-0 shadow-2xs">
                  02
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#2C3228]">
                    Made to Be Kept
                  </h3>
                  <p className="text-xs md:text-sm text-[#7A8275] leading-relaxed font-normal">
                    Our tins, velvet chests and keepsake boxes are designed to remain long after the gift has been enjoyed.
                  </p>
                </div>
              </div>

              {/* Highlight 03 */}
              <div className="flex items-start gap-5">
                <div className="w-10 h-10 rounded-full border border-[#E4E0D7] bg-white flex items-center justify-center text-xs font-bold text-[#52604D] shrink-0 shadow-2xs">
                  03
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif-luxury text-xl font-bold text-[#2C3228]">
                    Delivered with Certainty
                  </h3>
                  <p className="text-xs md:text-sm text-[#7A8275] leading-relaxed font-normal">
                    Clear approvals, considered presentation and dependable delivery from the first conversation to the final unboxing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Wavy Photo: Full stretch fixed without edge box line */}
          <div className="relative lg:col-span-6 bg-transparent border-0 outline-none shadow-none md:border md:border-[#E4E0D7]/80 md:shadow-md md:rounded-3xl md:bg-[#EFECE6] h-[380px] sm:h-[440px] md:h-[500px] w-[calc(100%+2rem)] -ml-4 md:ml-0 md:w-full">
            
            {/* Top Wavy Edge (Mobile Only) */}
            <div className="block md:hidden absolute -top-[2px] left-0 right-0 z-20 pointer-events-none leading-none">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-10 text-[#FAF7F2] fill-current block"
              >
                <path d="M0,0 L1200,0 L1200,40 C1050,90 850,10 600,60 C350,110 150,20 0,70 Z" />
              </svg>
            </div>

            <img
              src="/images/Category_image/premium_velvet/thumb.jpeg"
              alt="Our highlights craftsmanship"
              className="w-full h-full object-cover border-0 outline-none ring-0 block m-0 p-0"
            />

            {/* Bottom Wavy Edge (Mobile Only) */}
            <div className="block md:hidden absolute -bottom-[2px] left-0 right-0 z-20 pointer-events-none leading-none">
              <svg
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="w-full h-10 text-[#FAF7F2] fill-current block"
              >
                <path d="M0,120 L1200,120 L1200,80 C1050,30 850,110 600,60 C350,10 150,100 0,50 Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};