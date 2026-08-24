'use client';

import React from 'react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Sparkles, ShieldCheck, Truck, Palette, Award, CheckCircle2 } from 'lucide-react';

const WHY_CHOOSE_PILLARS = [
  {
    icon: Sparkles,
    title: 'Artisanal Provenance',
    description: 'Small-batch gourmet delicacies, roasted makhanas, and regional heritage sweets sourced directly from generational confectioners.',
  },
  {
    icon: Palette,
    title: 'Custom Brand Identity',
    description: 'Executive crest embossing, personalized foil monograms, and custom brand-engraved ribbons for indelible impressions.',
  },
  {
    icon: Award,
    title: 'Heirloom Keepsake Vessels',
    description: 'Reusable crushed velvet chests, botanical tinplates, and keepsake book-boxes designed for lasting tabletop permanence.',
  },
  {
    icon: Truck,
    title: 'White-Glove Pan-India Logistics',
    description: 'Multi-desk corporate dispatches and climate-controlled packaging ensuring pristine freshness across every pin code in India.',
  },
];

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="pt-8 sm:pt-14 md:pt-18 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto space-y-8 sm:space-y-12">

        {/* ─── 1. SECTION HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <ScrollReveal animation="fadeUp">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-bold text-[#7A8B6F] block">
              The Standard of Excellence
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight pt-1"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Why Choose The Gourmet Gifts
            </h2>
            <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-2xl mx-auto leading-relaxed pt-1">
              Elevating festive milestones and executive corporate relationships through curated taste, master craft, and white-glove execution.
            </p>
          </ScrollReveal>
        </div>

        {/* ─── 2. 4 PILLARS OF DISTINCTION GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {WHY_CHOOSE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} animation="fadeUp" delay={0.06 * idx}>
                <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EAE5DC] space-y-3 h-full flex flex-col justify-between shadow-2xs hover:shadow-sm hover:border-[#C5A880]/60 transition-all duration-300 group">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF6F0] border border-[#EADBCA] flex items-center justify-center text-[#9E7B35] group-hover:bg-[#1A1A18] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3
                      className="text-lg sm:text-xl font-light text-[#1A1A18]"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#78746D] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ─── 3. ORDERING GUIDELINES & MOQ BANNER (LUXURY CHARCOAL EDITORIAL) ─── */}
        <ScrollReveal animation="fadeUp" delay={0.15}>
          <div className="bg-[#121211] text-[#FAF8F5] p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[#2D2A26] space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Ambient Gold Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Gifting For Row */}
            <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#DFC299]">
                Gifting For
              </span>
              <p className="text-xs sm:text-sm font-light text-white/90 tracking-wide">
                Clients <span className="text-[#DFC299] mx-1.5">•</span> Employees <span className="text-[#DFC299] mx-1.5">•</span> Festive Celebrations <span className="text-[#DFC299] mx-1.5">•</span> Institutional Events
              </p>
            </div>

            {/* Ordering Guidelines Header */}
            <div className="space-y-4">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] text-[#A69E94] block">
                Ordering Guidelines &amp; MOQs
              </span>

              {/* 3 Columns for MOQs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-1">
                
                {/* MOQ 10 */}
                <div className="md:border-r border-white/10 md:pr-6 space-y-1.5">
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-2xl sm:text-3xl font-light text-[#DFC299]"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      MOQ 10
                    </span>
                  </div>
                  <h4 
                    className="text-sm font-normal text-white"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Ready-to-gift orders
                  </h4>
                  <p className="text-xs text-[#A69E94] leading-relaxed">
                    Without custom branding or personalized monogramming. Immediate dispatch.
                  </p>
                </div>

                {/* MOQ 50 */}
                <div className="md:border-r border-white/10 md:pr-6 space-y-1.5">
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-2xl sm:text-3xl font-light text-[#DFC299]"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      MOQ 50
                    </span>
                  </div>
                  <h4 
                    className="text-sm font-normal text-white"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Printed stationery
                  </h4>
                  <p className="text-xs text-[#A69E94] leading-relaxed">
                    Custom messaging cards and stationery insert printing.
                  </p>
                </div>

                {/* MOQ 100 */}
                <div className="space-y-1.5">
                  <div className="flex items-baseline gap-2">
                    <span 
                      className="text-2xl sm:text-3xl font-light text-[#DFC299]"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      MOQ 100
                    </span>
                  </div>
                  <h4 
                    className="text-sm font-normal text-white"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Branding &amp; personalisation
                  </h4>
                  <p className="text-xs text-[#A69E94] leading-relaxed">
                    Including custom-embossed lids, bespoke box structures, and personalized ribboning.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
