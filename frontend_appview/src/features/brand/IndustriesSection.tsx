'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Factory, 
  Laptop, 
  Landmark, 
  Users 
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export interface IndustryItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bulletColor: string;
  points: string[];
  href: string;
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
    href: '/corporate#curation-inquiry',
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
    href: '/corporate#curation-inquiry',
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
    href: '/corporate#curation-inquiry',
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
      'Premium Executive Gifts',
    ],
    href: '/corporate#curation-inquiry',
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
      'White-label Fulfillment',
    ],
    href: '/corporate#curation-inquiry',
  },
];

export const IndustriesSection: React.FC = () => {
  return (
    <section className="pt-6 sm:pt-10 md:pt-14 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-12 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1260px] mx-auto space-y-8 sm:space-y-12">
        
        {/* ─── SECTION TITLE (MATCHING PAGE HEADER HIERARCHY) ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-4xl mx-auto py-1 sm:py-2 space-y-1.5">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Industries We Understand
            </h2>
          </div>
        </ScrollReveal>

        {/* ─── 5-COLUMN HARMONIOUS BRAND GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 pt-2">
          {INDUSTRIES_DATA.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <ScrollReveal
                key={industry.id}
                animation="fadeUp"
                delay={0.05 * (index + 1)}
                className="h-full"
              >
                <div className="flex flex-col justify-between h-full space-y-5 group">
                  
                  {/* Top: Icon + Title + Bullet Points */}
                  <div className="space-y-4">
                    
                    {/* Refined Luxury Icon */}
                    <div className="transition-transform duration-300 group-hover:scale-105 inline-flex items-center">
                      <Icon className={`w-8 h-8 sm:w-9 sm:h-9 stroke-[1.25] ${industry.iconColor} opacity-90 group-hover:opacity-100 transition-opacity`} />
                    </div>

                    {/* Title (Cormorant Garamond, Elegant Font) */}
                    <h3
                      className="text-lg sm:text-xl font-medium text-[#1A1A18] tracking-tight leading-snug"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {industry.title}
                    </h3>

                    {/* Bullet List (Muted Luxury Charcoal & Subtle Dots) */}
                    <ul className="space-y-2 text-xs sm:text-[13px] text-[#6E6A62] font-light leading-relaxed">
                      {industry.points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className={`${industry.bulletColor} font-bold text-xs leading-none pt-0.5 select-none opacity-80`}>•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore CTA Link (Brand Bronze-Gold Style) */}
                  <div className="pt-1">
                    <Link
                      href={industry.href}
                      className="inline-flex items-center gap-1.5 text-[10.5px] font-sans uppercase tracking-[0.2em] font-medium text-[#8C6228] hover:text-[#5C3F16] transition-colors group/cta"
                    >
                      <span>EXPLORE</span>
                      <span className="transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
                    </Link>
                  </div>

                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
