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
    <section className="relative w-full bg-[#38493B] md:bg-transparent text-white overflow-hidden pt-6 sm:pt-10 md:pt-14 pb-6 sm:pb-10 md:pb-14">

      <div className="relative z-10 max-w-[1580px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ─── SECTION HEADER (DESKTOP) ─── */}
        <div className="hidden md:block text-center max-w-4xl mx-auto px-2 mb-3 sm:mb-5 md:mb-6">
          <ScrollReveal animation="fadeUp">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              How It Comes Together
            </h2>
          </ScrollReveal>
        </div>

        {/* ─────────────────────────────────────────
            DESKTOP VIEW — SLEEK ROUNDED CAPSULE BOX
        ───────────────────────────────────────── */}
        <div className="hidden md:block">
          <ScrollReveal animation="fadeUp" delay={0.08}>
            <div className="w-full max-w-[1440px] mx-auto grid grid-cols-5 divide-x divide-white/10 bg-[#273629] rounded-full border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.3)] px-6 lg:px-10 py-5 lg:py-6 items-center">
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center justify-start px-3 lg:px-5 min-w-0"
                >
                  {/* Circled Gold Number */}
                  <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-full border border-[#DFC299]/75 flex items-center justify-center shrink-0 font-sans text-sm lg:text-base text-[#DFC299]">
                    {step.number.replace(/^0/, '')}
                  </div>

                  {/* Title + Full Paragraph Description */}
                  <div className="flex-1 min-w-0 pl-3 lg:pl-4 text-left">
                    <h3 className="text-xs lg:text-[13px] font-sans font-bold uppercase tracking-wider text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-[10px] lg:text-[11px] text-[#A6B2A3] font-light leading-snug mt-1 whitespace-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>


        {/* ─────────────────────────────────────────
            MOBILE VIEW — ORIGINAL UNCHANGED
        ───────────────────────────────────────── */}
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

      </div>
    </section>
  );
};