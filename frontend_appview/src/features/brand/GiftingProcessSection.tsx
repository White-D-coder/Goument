'use client';

import React from 'react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

/* ─── Exact Vector Icons Matching the Reference Design ─── */

// 01. Tell Us The Brief: Arch-top Tag with Fleur-de-lis / Staff Motif
const BriefTagIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className={className}>
    <path 
      d="M17 19c0-4.2 3.1-7.5 7-7.5s7 3.3 7 7.5v15c0 1.1-.9 2-2 2H19c-1.1 0-2-.9-2-2V19z" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M24 15.5v16" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M21.2 20.5h5.6" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M22 24.5h4" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="24" cy="28.5" r="1.2" fill="currentColor" />
  </svg>
);

// 02. We Curate Three Directions: Heraldic Scalloped Crest with Center Ring & Crossed Leaves
const ShieldCrestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className={className}>
    <path 
      d="M14.5 14c3.5 1 5.5-.8 9.5-.8s6 1.8 9.5.8c-.8 4.5.8 8.5 0 13.5-3.5 2-7 4.5-9.5 5.5-2.5-1-6-3.5-9.5-5.5-.8-5 .8-9 0-13.5z" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <circle cx="24" cy="21.5" r="2.8" strokeWidth="1.6" />
    <path d="M19 29.5c2.2-1.2 5-1.5 5-1.5s2.8.3 5 1.5" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M21 32.5c2.5-1.8 3-4.5 3-4.5s.5 2.7 3 4.5" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// 03. See It Before We Make It: Architectural Drafting Base & Pointer Arrow
const DraftingArrowIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className={className}>
    <path 
      d="M13.5 32.5h21M13.5 32.5c0-3.5 2.5-6.5 6-6.5h6.5" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M21.5 27.5l11-13.5M32.5 14v5.5M32.5 14H27" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M23.5 18.5l4.5 4.5" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M21 16.5l3.5 1.8" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// 04. We Produce & Personalise: Keepsake Portfolio with V-Cord Hanging Pendant
const PendantBagIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className={className}>
    <rect x="15" y="14" width="18" height="20" rx="1.5" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M15 18h18" strokeWidth="1.6" />
    <path d="M19.5 14l4.5 8 4.5-8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 22c-1.6 1.4-2 2.8-1.5 4.2.5 1.2 1.5 1.4 1.5 1.4s1-.2 1.5-1.4c.5-1.4.1-2.8-1.5-4.2z" strokeWidth="1.6" fill="none" />
  </svg>
);

// 05. We Deliver: Keepsake Carton with Folded Corner & Center Wax Seal Eyelet
const SealCartonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" className={className}>
    <path 
      d="M15 14h13l6 6v10l-4 4H15a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2z" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path d="M28 14v6h6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M30 34l4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="23" cy="24" r="3.2" strokeWidth="1.6" />
    <circle cx="23" cy="24" r="1.1" fill="currentColor" />
  </svg>
);

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'TELL US THE BRIEF',
    description: 'Occasion, recipient, quantity, budget and deadline.',
    icon: BriefTagIcon,
  },
  {
    number: '02',
    title: 'WE CURATE THREE DIRECTIONS',
    description: 'Smart, Signature, Statement.',
    icon: ShieldCrestIcon,
  },
  {
    number: '03',
    title: 'SEE IT BEFORE WE MAKE IT',
    description: 'Mock-ups and sampling where required.',
    icon: DraftingArrowIcon,
  },
  {
    number: '04',
    title: 'WE PRODUCE & PERSONALISE',
    description: 'Products, packaging, branding and QC.',
    icon: PendantBagIcon,
  },
  {
    number: '05',
    title: 'WE DELIVER',
    description: 'Single location or coordinated delivery across India.',
    icon: SealCartonIcon,
  },
];

export const GiftingProcessSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#38493B] text-white overflow-hidden py-14 sm:py-18 lg:py-20">
      
      {/* ─── CONTENT CONTAINER (CLEAN FULL-WIDTH WITH NO BACKGROUND PHOTO) ─── */}
      <div className="relative z-10 max-w-[1580px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left: Main Heading in Pure White (Strictly 2 Lines) */}
          <div className="lg:col-span-4 xl:col-span-3">
            <ScrollReveal animation="fadeUp">
              <h2
                className="text-2xl sm:text-3xl md:text-[32px] lg:text-[30px] xl:text-[36px] font-light uppercase tracking-[0.05em] text-white leading-[1.18]"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                <span className="block whitespace-nowrap">HOW OUR GIFTING</span>
                <span className="block whitespace-nowrap">PROCESS WORKS</span>
              </h2>
            </ScrollReveal>
          </div>

          {/* Right: 5-Step Connected Timeline (Horizontal Scroll on Mobile, 5-col Grid on Desktop) */}
          <div className="lg:col-span-8 xl:col-span-9">
            
            <div className="relative flex md:grid md:grid-cols-5 gap-5 sm:gap-6 md:gap-3.5 items-start overflow-x-auto md:overflow-visible pb-4 md:pb-0 px-1 sm:px-0 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              
              {/* Connected Dotted Line (Desktop only) */}
              <div 
                className="hidden md:block absolute top-[30px] left-[8%] right-[8%] h-px z-0 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.45) 1.5px, transparent 1.5px)',
                  backgroundSize: '10px 2px',
                }}
              />

              {PROCESS_STEPS.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal
                    key={step.number}
                    animation="fadeUp"
                    delay={0.06 * (idx + 1)}
                    className="relative z-10 flex flex-col items-center text-center group px-1 w-[200px] sm:w-[220px] md:w-auto shrink-0 snap-start"
                  >
                    {/* Deep Heritage Node with White Icon & Florette Accent */}
                    <div className="relative mb-3.5">
                      <div className="w-[62px] h-[62px] rounded-full border border-white/30 bg-[#28382C] shadow-[0_8px_24px_rgba(0,0,0,0.25)] flex items-center justify-center transition-all duration-400 group-hover:scale-108 group-hover:border-white/70 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
                        <Icon className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-105" />
                      </div>

                      {/* Bottom Decorative Scallop Florette Motif */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 flex items-center justify-center pointer-events-none">
                        <svg viewBox="0 0 16 8" fill="currentColor" className="w-3 h-1.5 text-white/70">
                          <path d="M8 8C5 8 2 5 0 2c3-1 5 0 8 3 3-3 5-4 8-3-2 3-5 6-8 6z" />
                        </svg>
                      </div>
                    </div>

                    {/* Step Number */}
                    <span className="text-[11px] font-mono font-bold tracking-widest text-white/75 mb-1.5 uppercase">
                      {step.number}
                    </span>

                    {/* Step Title (Pure White, Crisp & Bold) */}
                    <h3 className="text-xs sm:text-[12.5px] font-bold text-white tracking-wider uppercase mb-1.5 leading-snug max-w-[170px] min-h-[34px] flex items-center justify-center">
                      {step.title}
                    </h3>

                    {/* Step Description (Pure White / Soft Linen, 100% Readable) */}
                    <p className="text-[11px] sm:text-[11.5px] text-white/85 font-light leading-relaxed max-w-[165px]">
                      {step.description}
                    </p>
                  </ScrollReveal>
                );
              })}

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
