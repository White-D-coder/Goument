'use client';

import React from 'react';
import {
  Building2,
  Factory,
  Laptop,
  Landmark,
  Users,
  Sparkles
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export interface IndustryItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bulletColor: string;
  points: string[];
}

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'real-estate',
    title: 'Real Estate',
    icon: Building2,
    iconColor: 'text-[#3D5244]', // Heritage Sage
    bulletColor: 'text-[#3D5244]',
    points: [
      'Possession Gifts',
      'Channel Partner',
      'Project Launches',
      'VIP Homeowners',
      'Festive Gifting',
    ],
  },
  {
    id: 'industrial-oem',
    title: 'Industrial / OEM',
    icon: Factory,
    iconColor: 'text-[#A67C46]', // Antique Gold / Ochre
    bulletColor: 'text-[#A67C46]',
    points: [
      'Dealer Conferences',
      'Distributor Gifting',
      'Safety Milestones',
      'Plant Anniversaries',
      'Employee Gifting',
    ],
  },
  {
    id: 'tech-saas',
    title: 'Tech / SaaS',
    icon: Laptop,
    iconColor: 'text-[#3B4C5A]', // Deep Slate
    bulletColor: 'text-[#3B4C5A]',
    points: [
      'Welcome Kits',
      'Remote Employee',
      'Offsites',
      'Milestones',
      'Merchandise',
    ],
  },
  {
    id: 'finance-professional-services',
    title: 'Finance & Professional Services',
    icon: Landmark,
    iconColor: 'text-[#7A1C29]', // Royal Burgundy
    bulletColor: 'text-[#7A1C29]',
    points: [
      'Client Appreciation',
      'Referral Gifting',
      'Leadership Gifting',
      'Festive Programmes',
      'Executive Gifts',
    ],
  },
  {
    id: 'events-agencies',
    title: 'Events & Agencies',
    icon: Users,
    iconColor: 'text-[#5C455B]', // Muted Mulberry / Plum
    bulletColor: 'text-[#5C455B]',
    points: [
      'Conference Kits',
      'Launch Boxes',
      'Delegate Gifts',
      'Speaker Gifts',
      'White-label Service',
    ],
  },
  {
    id: 'weddings-celebrations',
    title: 'Weddings & Celebrations',
    icon: Sparkles,
    iconColor: 'text-[#9B5368]', // Luxury Dusty Rose
    bulletColor: 'text-[#9B5368]',
    points: [
      'Save the Date Favours',
      'Invitation Boxes',
      'Bridesmaid & Grooms',
      'Welcome Hampers',
      'Return Gifting',
    ],
  },
];

export const IndustriesSection: React.FC = () => {
  return (
    <section className="pt-4 sm:pt-8 md:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto space-y-5 sm:space-y-7">

        {/* ─── SECTION TITLE (MATCHING PAGE HEADER HIERARCHY) ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-4xl mx-auto px-2 space-y-1.5 sm:space-y-2">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Industries We Understand
            </h2>

            <p className="text-xs md:text-sm text-[#78746D] font-light max-w-3xl mx-auto leading-normal">
              Specialised gifting programmes tailored to the unique identity, audience, and scale of each industry.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── 6 EQUAL COLUMNS WITH EXACT CORMORANT FONT STYLING ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 sm:gap-x-7 sm:gap-y-10 lg:gap-x-8 lg:gap-y-0 pt-1">
          {INDUSTRIES_DATA.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <ScrollReveal
                key={industry.id}
                animation="fadeUp"
                delay={0.025 * (index + 1)}
                className="w-full"
              >
                <div className="flex flex-col space-y-2.5 group w-full">

                  {/* Refined Luxury Icon */}
                  <div className="h-9 sm:h-10 flex items-start transition-transform duration-300 group-hover:scale-105">
                    <Icon
                      className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.25] ${industry.iconColor} opacity-90 group-hover:opacity-100 transition-opacity`}
                    />
                  </div>

                  {/* Aligned Title — EXACT Jakarta Sans uppercase tracking-[0.22em] */}
                  <div className="h-[44px] sm:h-[48px] flex items-start">
                    <h3 className="text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.22em] text-[#1A1A18] leading-[1.35] max-w-full break-words">
                      {industry.title}
                    </h3>
                  </div>

                  {/* Bullet List */}
                  <ul className="space-y-1 text-xs sm:text-[12px] text-[#6E6A62] font-light leading-relaxed">
                    {industry.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-1.5"
                      >
                        <span
                          className={`${industry.bulletColor} font-bold text-xs leading-none pt-0.5 select-none opacity-80 shrink-0`}
                        >
                          •
                        </span>

                        <span className="whitespace-normal break-words">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
