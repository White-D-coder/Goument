'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    image: '/images/boxes/box_1.png',
    href: '/employee-gifting',
  },
  {
    id: 'onboarding-kits',
    title: 'ONBOARDING KITS',
    subtitle: 'Make Day One feel like Day One.',
    image: '/images/boxes/box_2.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'client-gifting',
    title: 'CLIENT GIFTING',
    subtitle: 'Stay remembered after the meeting.',
    image: '/images/boxes/box_3.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'festive-gifting',
    title: 'FESTIVE GIFTING',
    subtitle: 'Celebrate without sending the predictable.',
    image: '/images/boxes/box_4.png',
    href: '/gourmet-gifts#curation-inquiry',
  },
  {
    id: 'events-conferences',
    title: 'EVENTS & CONFERENCES',
    subtitle: 'Give them something worth taking home.',
    image: '/images/boxes/box_5.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'milestones-recognition',
    title: 'MILESTONES & RECOGNITION',
    subtitle: 'Mark the moment properly.',
    image: '/images/boxes/box_6.png',
    href: '/milestones-recognition',
  },
  {
    id: 'cx-gifting',
    title: 'CX GIFTING',
    subtitle: 'Create lasting customer delight at every touchpoint.',
    image: '/images/boxes/box_7.png',
    href: '/corporate#curation-inquiry',
  },
  {
    id: 'dealer-partner-gifting',
    title: 'DEALER & PARTNER GIFTING',
    subtitle: 'For relationships that drive the business.',
    image: '/images/boxes/box_8.png',
    href: '/corporate#curation-inquiry',
  },
];

export default function OccasionGiftingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    const cardWidth = 320;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(OCCASION_CARDS.length - 1, Math.max(0, index)));
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      }
    }
  };

  return (
    <section className="pt-4 sm:pt-8 md:pt-12 pb-4 sm:pb-8 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1580px] mx-auto px-2 sm:px-4 lg:px-6 space-y-4 sm:space-y-6">
        
        {/* ─── SECTION HEADER (UNIFIED FONT SIZE & CENTERED) ─── */}
        <div className="text-center max-w-4xl mx-auto py-1 sm:py-2">
          <ScrollReveal animation="fadeUp">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              The Art of Gifting
            </h2>
          </ScrollReveal>
        </div>

        {/* ─── 8-CARD FULL-BLEED OCCASIONS CAROUSEL ─── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 pt-1 -mx-3 px-3 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {OCCASION_CARDS.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="relative w-[270px] sm:w-[310px] md:w-[330px] aspect-[3/4.2] shrink-0 snap-start rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.22)] transition-all duration-500 flex flex-col justify-between p-6 sm:p-7 group cursor-pointer border border-black/10"
            >
              {/* Full-Bleed Image Background */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-[#1A1A18]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 768px) 270px, 330px"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-108 filter brightness-[0.92]"
                />
                {/* Contrast Gradient Overlay for Crisp White Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/55 group-hover:via-black/25 transition-colors duration-500" />
              </div>

              {/* Top Text Content (Bold Sans-Serif Font as requested) */}
              <div className="relative z-10 space-y-1.5 text-left">
                <h3 className="font-sans text-lg sm:text-xl md:text-[22px] font-bold text-white uppercase tracking-tight leading-tight drop-shadow-md group-hover:text-[#DFC299] transition-colors">
                  {card.title}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] text-white/90 font-normal leading-relaxed drop-shadow-sm max-w-[240px]">
                  {card.subtitle}
                </p>
              </div>

              {/* Bottom Row: Floating Bottom-Left Circular Arrow CTA */}
              <div className="relative z-10 flex items-center justify-between pt-4">
                <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-white/40 flex items-center justify-center text-[#1A1A18] group-hover:bg-[#1A1A18] group-hover:text-[#DFC299] group-hover:scale-110 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>

                <span className="text-[11px] font-sans uppercase tracking-[0.16em] text-white/70 group-hover:text-white font-medium transition-colors">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ─── DOT SLIDE PAGINATION INDICATORS (BELOW CAROUSEL) ─── */}
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
