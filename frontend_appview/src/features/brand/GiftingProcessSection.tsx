'use client';

import React from 'react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconImage: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'TELL US THE BRIEF',
    description: 'Occasion, recipient, quantity, budget and deadline.',
    iconImage: '/images/process/step1_brief.png',
  },
  {
    number: '02',
    title: 'WE CURATE THREE DIRECTIONS',
    description: 'Smart, Signature, Statement.',
    iconImage: '/images/process/step2_directions.png',
  },
  {
    number: '03',
    title: 'SEE IT BEFORE WE MAKE IT',
    description: 'Mock-ups and sampling where required.',
    iconImage: '/images/process/step3_preview.png',
  },
  {
    number: '04',
    title: 'WE PRODUCE & PERSONALISE',
    description: 'Products, packaging, branding and QC.',
    iconImage: '/images/process/step4_produce.png',
  },
  {
    number: '05',
    title: 'WE DELIVER',
    description: 'Single location or coordinated delivery across India.',
    iconImage: '/images/process/step5_deliver.png',
  },
];

export const GiftingProcessSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#38493B] text-white overflow-hidden pt-6 sm:pt-10 md:pt-14 pb-6 sm:pb-10 md:pb-14">
      
      {/* ─── CONTENT CONTAINER ─── */}
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

          {/* Right: 5-Step Process */}
          <div className="lg:col-span-8 xl:col-span-9">
            
            {/* ─── MOBILE VIEW: Vertical Stack (No Icons, Number on Left, Title + Context on Right) ─── */}
            <div className="flex flex-col md:hidden divide-y divide-white/10">
              {PROCESS_STEPS.map((step, idx) => (
                <ScrollReveal
                  key={step.number}
                  animation="fadeUp"
                  delay={0.04 * (idx + 1)}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5"
                >
                  {/* Left: Step Number */}
                  <span className="text-sm xs:text-base font-mono font-bold text-[#DFC299] tracking-wider shrink-0 pt-0.5 w-6 text-left">
                    {step.number}
                  </span>

                  {/* Right: Title & Context */}
                  <div className="flex-1 space-y-0.5 text-left">
                    <h3 className="text-xs xs:text-[12.5px] font-bold text-white uppercase tracking-wider leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[11px] xs:text-xs text-white/80 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* ─── DESKTOP VIEW: 5-Column Grid with Icons ─── */}
            <div className="hidden md:grid md:grid-cols-5 gap-3.5 lg:gap-5 items-start">
              {PROCESS_STEPS.map((step, idx) => (
                <ScrollReveal
                  key={step.number}
                  animation="fadeUp"
                  delay={0.06 * (idx + 1)}
                  className="relative z-10 flex flex-col items-center text-center group px-1"
                >
                  {/* Pure Icon Container */}
                  <div className="relative mb-3.5 h-[52px] sm:h-[58px] flex items-center justify-center">
                    <img
                      src={step.iconImage}
                      alt={step.title}
                      className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain brightness-0 invert opacity-95 transition-transform duration-300 group-hover:scale-110 group-hover:opacity-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                    />
                  </div>

                  {/* Step Number */}
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[#DFC299] mb-1.5 uppercase">
                    {step.number}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-xs sm:text-[12.5px] font-bold text-white tracking-wider uppercase mb-1.5 leading-snug max-w-[170px] min-h-[34px] flex items-center justify-center">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-[11px] sm:text-[11.5px] text-white/85 font-light leading-relaxed max-w-[165px]">
                    {step.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
