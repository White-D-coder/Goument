'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export interface OccasionCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
}

export const OCCASION_CARDS: OccasionCard[] = [
  {
    id: 'employee-gifting',
    title: 'EMPLOYEE GIFTING',
    subtitle: 'Make people feel valued.',
    image: '/images/occasions/occasion_1.png',
    href: '/employee-gifting',
  },
  {
    id: 'onboarding-kits',
    title: 'ONBOARDING KITS',
    subtitle: 'Make Day One feel like Day One.',
    image: '/images/occasions/occasion_2.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'client-gifting',
    title: 'CLIENT GIFTING',
    subtitle: 'Stay remembered after the meeting.',
    image: '/images/occasions/occasion_3.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'festive-gifting',
    title: 'FESTIVE GIFTING',
    subtitle: 'Celebrate without sending the predictable.',
    image: '/images/occasions/occasion_4.png',
    href: '/gourmet-gifts#curation-inquiry',
  },
  {
    id: 'events-conferences',
    title: 'EVENTS & CONFERENCES',
    subtitle: 'Give them something worth taking home.',
    image: '/images/occasions/occasion_5.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'milestones-recognition',
    title: 'MILESTONES & RECOGNITION',
    subtitle: 'Mark the moment properly.',
    image: '/images/occasions/occasion_6.png',
    href: '/milestones-recognition',
  },
  {
    id: 'cx-gifting',
    title: 'CX GIFTING',
    subtitle: 'Create lasting customer delight at every touchpoint.',
    image: '/images/occasions/occasion_7.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'dealer-partner-gifting',
    title: 'DEALER & PARTNER GIFTING',
    subtitle: 'For relationships that drive the business.',
    image: '/images/occasions/occasion_8.png',
    href: '/corporate#curation-inquiry',
  },
];

export default function OccasionGiftingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const firstChild = scrollRef.current.children[0] as HTMLElement;
    const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 280;
    const maxScroll = scrollWidth - clientWidth;
    
    if (maxScroll > 0 && scrollLeft >= maxScroll - 15) {
      setActiveIndex(OCCASION_CARDS.length - 1);
    } else {
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(OCCASION_CARDS.length - 1, Math.max(0, index)));
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index] as HTMLElement;
      if (card) {
        scrollRef.current.scrollTo({
          left: card.offsetLeft - scrollRef.current.offsetLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 280;
      scrollRef.current.scrollBy({
        left: -cardWidth * 1.5,
        behavior: 'smooth',
      });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = firstChild ? firstChild.offsetWidth + 16 : 280;
      scrollRef.current.scrollBy({
        left: cardWidth * 1.5,
        behavior: 'smooth',
      });
    }
  };

  /* ─── Mouse Drag to Scroll ─── */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.4;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="pt-4 sm:pt-8 md:pt-12 pb-4 sm:pb-8 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1580px] mx-auto px-2 sm:px-4 lg:px-6 space-y-4 sm:space-y-6">
        
        {/* ─── SECTION HEADER ─── */}
        <div className="text-center max-w-4xl mx-auto py-1 sm:py-2">
          <ScrollReveal animation="fadeUp">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              For Every Occasion That Matters
            </h2>
          </ScrollReveal>
        </div>

        {/* ─── CAROUSEL WRAPPER WITH NAVIGATION BUTTONS ─── */}
        <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={scrollPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1A1A18] shadow-lg border border-[#E8E2D8] items-center justify-center -ml-3 lg:-ml-5 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={scrollNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#1A1A18] shadow-lg border border-[#E8E2D8] items-center justify-center -mr-3 lg:-mr-5 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* ─── 8-CARD OCCASIONS CAROUSEL ─── */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            className={`flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth select-none ${
              isDragging ? 'cursor-grabbing scroll-auto' : 'cursor-grab'
            } [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
          >
            {OCCASION_CARDS.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                onClick={(e) => {
                  if (hasDragged) {
                    e.preventDefault();
                  }
                }}
                className="relative w-[240px] sm:w-[270px] md:w-[280px] lg:w-[calc((100%-4*1rem)/5.35)] aspect-[3/4.2] shrink-0 snap-start rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 group border border-black/10"
              >
                {/* Full-Bleed Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#1A1A18] pointer-events-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 240px, (max-width: 1200px) 280px, 320px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-108 filter brightness-[0.98]"
                  />
                  {/* Subtle Contrast Gradient Overlay (Lightened for vibrant image clarity) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/40 group-hover:from-black/50 group-hover:via-transparent group-hover:to-black/30 transition-colors duration-500" />
                </div>

                {/* Top Text Content (Centered Title and Subtitle) */}
                <div className="relative z-10 space-y-1.5 text-center flex flex-col items-center justify-start w-full pointer-events-none">
                  <h3 className="font-sans text-base sm:text-lg md:text-[19px] font-bold text-white uppercase tracking-tight leading-tight drop-shadow-md group-hover:text-[#DFC299] transition-colors">
                    {card.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-white/90 font-normal leading-relaxed drop-shadow-sm max-w-[220px] mx-auto">
                    {card.subtitle}
                  </p>
                </div>

                {/* Bottom Row: Centered Explore CTA */}
                <div className="relative z-10 flex items-center justify-center pt-4 pointer-events-none">
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-white/75 group-hover:text-[#DFC299] font-semibold transition-colors">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* ─── 8 DOT SLIDE PAGINATION INDICATORS ─── */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {OCCASION_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                activeIndex === idx 
                  ? 'w-7 bg-[#1A1A18]' 
                  : 'w-2 bg-[#D5CFBF] hover:bg-[#A39E93]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
