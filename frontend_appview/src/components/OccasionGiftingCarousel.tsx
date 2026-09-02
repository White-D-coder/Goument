'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
    subtitle: 'Make people feel valued from Day One.',
    image: '/cards/employeecard.png',
    href: '/employee-gifting',
  },
  {
    id: 'client-gifting',
    title: 'CLIENT GIFTING',
    subtitle: 'Stay remembered after the meeting.',
    image: '/cards/clientcard.png',
    href: '/occasions/client-gifting',
  },
  {
    id: 'festive-gifting',
    title: 'FESTIVE GIFTING',
    subtitle: 'Celebrate without sending the predictable.',
    image: '/cards/festivecard.png',
    href: '/occasions/festive-gifting',
  },
  {
    id: 'events-conferences',
    title: 'EVENTS & CONFERENCES',
    subtitle: 'Give them something worth taking home.',
    image: '/cards/events.png',
    href: '/occasions/events-conferences',
  },
  {
    id: 'milestones-recognition',
    title: 'MILESTONES & RECOGNITION',
    subtitle: 'Mark the moment properly.',
    image: '/cards/milestones.png',
    href: '/milestones-recognition',
  },
  {
    id: 'cx-gifting',
    title: 'CX GIFTING',
    subtitle: 'Create lasting customer delight at every touchpoint.',
    image: '/cards/cx.png',
    href: '/occasions/cx-gifting',
  },
  {
    id: 'dealer-partner-gifting',
    title: 'DEALER & PARTNER GIFTING',
    subtitle: 'For relationships that drive the business.',
    image: '/cards/dealer.png',
    href: '/occasions/dealer-partner-gifting',
  },
  {
    id: 'weddings-celebrations',
    title: 'CELEBRATIONS',
    subtitle: 'Heirloom favours & celebratory hampers.',
    image: '/cards/wedding.png',
    href: '/occasions/weddings-celebrations',
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
    <section id="occasions" className="pt-6 sm:pt-10 md:pt-14 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden scroll-mt-20">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-4xl mx-auto px-2 space-y-2.5 sm:space-y-3.5 mb-8 sm:mb-10 md:mb-12">
            <h2
              className="text-[28px] xs:text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-[1.15]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              <span className="block xs:inline">For Every Occasion</span>{' '}
              <span className="block xs:inline">That Matters</span>
            </h2>
            <p className="text-xs md:text-sm text-[#78746D] font-light max-w-3xl mx-auto leading-normal pb-[3px]">
              <span className="inline sm:hidden">
                Thoughtful keepsakes for every milestone.
              </span>
              <span className="hidden sm:inline">
                Thoughtfully curated keepsakes designed for corporate milestones, celebrations, and meaningful relationships.
              </span>
            </p>
          </div>
        </ScrollReveal>

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
            className={`flex gap-3.5 sm:gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 px-4 sm:px-0 scroll-smooth select-none ${
              isDragging ? 'cursor-grabbing scroll-auto' : 'cursor-grab'
            } [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
          >
            {OCCASION_CARDS.map((card, idx) => (
              <Link
                key={card.id}
                href={card.href}
                onClick={(e) => {
                  if (hasDragged) {
                    e.preventDefault();
                  }
                }}
                className="relative w-[240px] sm:w-[270px] md:w-[280px] lg:w-[calc((100%-4*1rem)/5.35)] aspect-[3/4.2] shrink-0 snap-start rounded-2xl overflow-hidden transition-all duration-500 flex flex-col justify-between p-5 sm:p-6 group"
              >
                {/* Full-Bleed Image Background */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#1A1A18] pointer-events-none">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    priority={idx < 5}
                    loading={idx < 5 ? 'eager' : 'lazy'}
                    quality={80}
                    sizes="(max-width: 768px) 240px, (max-width: 1200px) 280px, 320px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-108 filter brightness-[0.98]"
                  />
                  {/* Bottom Vignette Gradient (Expands on Hover for High-Contrast Text Legibility) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent group-hover:from-black/92 group-hover:via-black/50 group-hover:to-transparent transition-all duration-500" />
                </div>

                {/* Bottom Center Content */}
                <div className="relative z-10 w-full mt-auto pointer-events-none flex flex-col items-center justify-end text-center">
                  
                  {/* Default State (Desktop Only): White Title that fades on hover */}
                  <div className="hidden sm:block transform transition-all duration-400 ease-out group-hover:opacity-0 group-hover:-translate-y-2 pb-1">
                    <span className="text-[11px] sm:text-[12px] font-sans uppercase tracking-[0.22em] text-white/95 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                      {card.title}
                    </span>
                  </div>

                  {/* Hover State (img 2): Full Detailed Block (Title + Subtitle + Explore) Animating from Bottom to Top */}
                  <div className="space-y-1.5 transform transition-all duration-500 ease-out opacity-100 translate-y-0 sm:absolute sm:bottom-0 sm:left-0 sm:right-0 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 pb-1">
                    <h3 className="font-sans text-base sm:text-lg md:text-[19px] font-bold text-[#DFC299] uppercase tracking-wider leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      {card.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[12.5px] text-[#EDE6DC] font-normal leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] max-w-[215px] mx-auto">
                      {card.subtitle}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-mono uppercase tracking-[0.2em] font-semibold text-white/90 group-hover:text-[#DFC299] transition-colors">
                        <span>EXPLORE</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

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
