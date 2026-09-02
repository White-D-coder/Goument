'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake, 
  Building, 
  TrendingUp,
  Heart,
  Calendar,
  Trophy,
  Home,
  Cake,
  Crown,
  Users,
  Award,
  Wallet,
  Gift,
  Gem,
  BadgeCheck,
  FileText,
  Package,
  Sliders,
  Truck,
  ShieldCheck,
  Clock,
  Headphones,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { OccasionPageData } from '@/data/occasionsData';
import { openWhatsAppInquiry } from '@/lib/whatsapp';
import toast from 'react-hot-toast';

// Dynamic Lucide Icon Mapper
const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  HeartHandshake,
  Building,
  TrendingUp,
  Heart,
  Calendar,
  Trophy,
  Home,
  Cake,
  Crown,
  Users,
  Award,
  Wallet,
  Gift,
  Gem,
  BadgeCheck,
  FileText,
  Package,
  Sliders,
  Truck,
  ShieldCheck,
  Clock,
  Headphones,
};

export const OccasionPageTemplate: React.FC<{ data: OccasionPageData }> = ({ data }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: data.budgetTiers[1] ? `${data.budgetTiers[1].range} per set` : `${data.budgetTiers[0]?.range || '₹1,000 – ₹1,499'} per set`,
    quantity: '50 - 100 sets',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleBudgetClick = (range: string) => {
    const formatted = `${range} per set`;
    setFormData((prev) => ({ ...prev, budget: formatted }));
    const el = document.getElementById('curation-inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please provide your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Send via email API
      await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          occasion: data.title,
          source: `Occasion Page: ${data.title}`,
        }),
      });

      // 2. Open WhatsApp with formatted text
      openWhatsAppInquiry({
        pageName: data.title,
        occasion: data.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        quantity: formData.quantity,
      }, '917021463609');

      setSubmitted(true);
      toast.success('Your enquiry has been dispatched via WhatsApp & Email!');
    } catch {
      // Still open WhatsApp if email API fails
      openWhatsAppInquiry({
        pageName: data.title,
        occasion: data.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        quantity: formData.quantity,
      }, '917021463609');
      setSubmitted(true);
      toast.success('Opening WhatsApp Concierge...');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToInquiry = () => {
    const el = document.getElementById('curation-inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToConcepts = () => {
    const el = document.getElementById('curated-concepts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1A1A18] overflow-hidden">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO SECTION (2-COLUMN EDITORIAL SHOWCASE)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Tagline, CTAs & Trust Badges */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <ScrollReveal animation="fadeUp">
              {/* ─── Working Breadcrumbs ─── */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#8C847B] mb-3 sm:mb-4">
                <Link
                  href="/gourmet-gifts"
                  className="hover:text-[#1A1A18] transition-colors"
                >
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />
                <Link
                  href="/gourmet-gifts#occasions"
                  className="hover:text-[#1A1A18] transition-colors"
                >
                  Occasions
                </Link>
                <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />
                <span className="text-[#1A1A18] font-medium truncate">
                  {data.title}
                </span>
              </nav>

              <div className="space-y-3 sm:space-y-4">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1A1A18] tracking-tight leading-[1.05]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  {data.title}
                </h1>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#1A1A18] tracking-tight leading-snug">
                  {data.tagline}
                </h2>
                
                <p className="text-xs sm:text-sm md:text-base text-[#6B655E] leading-relaxed max-w-xl font-light">
                  {data.description}
                </p>
              </div>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={scrollToInquiry}
                  className="px-7 py-3.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  {data.primaryCta || 'GET 3 CURATED CONCEPTS'}
                </button>
                
                <button
                  onClick={scrollToConcepts}
                  className="px-6 py-3.5 border border-[#8C6228]/50 hover:border-[#1A1A18] text-[#8C6228] hover:text-[#1A1A18] font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 hover:bg-white/60 cursor-pointer"
                >
                  {data.secondaryCta || 'EXPLORE GIFT BOXES'}
                </button>
              </div>

              {/* 3 Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 text-xs text-[#6B655E] font-medium">
                {data.trustPoints && data.trustPoints.length > 0 ? (
                  data.trustPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#8C6228]" />
                      <span>{pt}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#8C6228]" />
                      <span>Premium Quality</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#8C6228]" />
                      <span>On-time Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-[#8C6228]" />
                      <span>End-to-end Support</span>
                    </div>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="lg:col-span-6 relative">
            <ScrollReveal animation="fadeUp" delay={0.15}>
              <div className="relative aspect-[4/3.4] w-full rounded-3xl sm:rounded-[36px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-[#E8E4DC] bg-[#FAF8F5]">
                <Image
                  src={data.heroImage}
                  alt={data.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. WHY THOUGHTFUL GIFTING MATTERS (4 VALUE PILLAR CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 border-t border-[#EAE5DC]">
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-10 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              {data.solvesTitle}
            </h2>
            {data.solvesSubtitle && (
              <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-2xl mx-auto leading-relaxed">
                {data.solvesSubtitle}
              </p>
            )}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {data.pillars.map((pillar, idx) => {
            const Icon = IconMap[pillar.iconName] || Sparkles;
            return (
              <ScrollReveal key={idx} animation="fadeUp" delay={0.05 * (idx + 1)}>
                <div className="bg-white border border-[#EAE5DC] rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-2xs hover:shadow-md transition-shadow h-full flex flex-col justify-start">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#8C6228]">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base sm:text-[17px] font-semibold text-[#1A1A18] tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#6B655E] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. CURATED FOR EVERY MOMENT (8 MOMENT CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-8 sm:mb-10 max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              {data.momentsTitle}
            </h2>
            {data.momentsSubtitle && (
              <p className="text-xs sm:text-sm text-[#78746D] font-light leading-relaxed">
                {data.momentsSubtitle}
              </p>
            )}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
          {data.moments.map((moment, idx) => {
            const Icon = IconMap[moment.iconName] || Heart;
            return (
              <ScrollReveal key={idx} animation="fadeUp" delay={0.03 * (idx + 1)}>
                <div className="bg-white border border-[#EAE5DC] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-all hover:border-[#8C6228]/40">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FAF8F5] flex items-center justify-center shrink-0 text-[#8C6228]">
                    <Icon className="w-4.5 h-4.5 stroke-[1.5]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#1A1A18] leading-tight">
                    {moment.title}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. THOUGHTFULLY CURATED AROUND YOUR BUDGET
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-6 sm:mb-8 max-w-3xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              {data.budgetTitle || 'Thoughtfully Curated Around Your Budget'}
            </h2>
            {data.budgetSubtitle && (
              <p className="text-xs sm:text-sm text-[#78746D] font-light leading-relaxed">
                {data.budgetSubtitle}
              </p>
            )}
          </div>
        </ScrollReveal>

        {/* ── 100% DEAD-CENTERED CIRCULAR PRICE PILLS (2-LINE BOLD WHITE TEXT) ── */}
        <div className="w-full flex items-center justify-center pt-1 pb-2 px-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {data.budgetTiers.map((tier, idx) => {
              const pillTiers = [
                {
                  bg: 'bg-[#FDEBDD]',
                  border: 'border-[#F0DACB]',
                  shadow: 'shadow-[0_8px_22px_rgba(253,235,221,0.5)] hover:shadow-[0_12px_28px_rgba(240,218,203,0.7)]',
                },
                {
                  bg: 'bg-[#D9CDE4]',
                  border: 'border-[#C9BCD6]',
                  shadow: 'shadow-[0_8px_22px_rgba(217,205,228,0.5)] hover:shadow-[0_12px_28px_rgba(201,188,214,0.7)]',
                },
                {
                  bg: 'bg-[#B9E3DD]',
                  border: 'border-[#A6D4CD]',
                  shadow: 'shadow-[0_8px_22px_rgba(185,227,221,0.5)] hover:shadow-[0_12px_28px_rgba(166,212,205,0.7)]',
                },
                {
                  bg: 'bg-[#A6CCE3]',
                  border: 'border-[#93BDD6]',
                  shadow: 'shadow-[0_8px_22px_rgba(166,204,227,0.5)] hover:shadow-[0_12px_28px_rgba(147,189,214,0.7)]',
                },
              ];
              const pill = pillTiers[idx % pillTiers.length];

              // Parse 2-line text cleanly
              const lines = tier.range.includes(' – ') 
                ? [`${tier.range.split(' – ')[0]} –`, tier.range.split(' – ')[1]]
                : tier.range.startsWith('Up to ')
                ? ['Up to', tier.range.replace('Up to ', '')]
                : tier.range.startsWith('Under ')
                ? ['Under', tier.range.replace('Under ', '')]
                : [tier.range];

              return (
                <ScrollReveal key={idx} animation="fadeUp" delay={0.04 * (idx + 1)}>
                  <div
                    onClick={() => handleBudgetClick(tier.range)}
                    className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shrink-0 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-108 cursor-pointer border ${pill.bg} ${pill.border} ${pill.shadow}`}
                  >
                    <div className="text-white space-y-0.5 select-none text-center">
                      {lines.length > 1 ? (
                        <>
                          <span className="block text-xs sm:text-[13px] md:text-sm font-medium opacity-90 leading-tight">
                            {lines[0]}
                          </span>
                          <span className="block text-sm sm:text-base md:text-[17px] font-bold tracking-tight leading-tight">
                            {lines[1]}
                          </span>
                        </>
                      ) : (
                        <span className="block text-sm sm:text-base md:text-[17px] font-bold tracking-tight leading-tight">
                          {lines[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* ── Immediately below the circles: Need something different? ── */}
        <div className="text-center pt-8 sm:pt-10 space-y-3 max-w-xl mx-auto">
          <h3 className="text-lg sm:text-xl font-medium text-[#1A1A18] tracking-tight">
            Need something different?
          </h3>
          <p className="text-xs sm:text-sm text-[#6B655E] font-light">
            Tell us your budget and brief — we&apos;ll curate around it.
          </p>
          <div className="pt-1">
            <button
              onClick={scrollToInquiry}
              className="px-7 py-3.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
            >
              GET 3 CURATED CONCEPTS
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. NOT SURE WHAT TO GIFT? THAT'S WHERE WE COME IN.
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 my-4">
        <ScrollReveal animation="fadeUp">
          <div className="bg-[#F4EFEA] border border-[#E8E1D5] rounded-3xl sm:rounded-[36px] p-8 sm:p-12 md:p-16 text-center space-y-6 max-w-4xl mx-auto shadow-2xs">
            <div className="space-y-3 max-w-2xl mx-auto">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-light text-[#1A1A18] tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Not Sure What to Gift? That’s Where We Come In.
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#6B655E] font-light leading-relaxed">
                Tell us who you’re gifting, the occasion, quantity and budget.
                <br className="hidden sm:inline" /> We’ll come back with 3 thoughtfully curated concepts built around your client and your brand.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToInquiry}
                className="px-8 py-4 bg-[#1A1A18] hover:bg-[#2C241D] text-white font-sans text-xs sm:text-sm uppercase tracking-[0.18em] font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                GET 3 CURATED CONCEPTS
              </button>
            </div>

            <p className="text-[11px] sm:text-xs text-[#8C847B] font-light tracking-wide pt-1">
              No catalogue scrolling. No guesswork. Just thoughtful options curated for you.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. MAKE IT UNIQUELY YOURS (5 CUSTOMIZATION BADGES)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Make It Uniquely Yours
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {data.customizationFeatures.map((feat, idx) => {
            const Icon = IconMap[feat.iconName] || BadgeCheck;
            return (
              <ScrollReveal key={idx} animation="fadeUp" delay={0.04 * (idx + 1)}>
                <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 space-y-3 shadow-2xs text-center flex flex-col items-center h-full">
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#8C6228]">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-bold text-[#1A1A18] tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#6B655E] font-light leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          8. HASSLE-FREE GIFTING IN 5 SIMPLE STEPS (TIMELINE)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-18 border-t border-[#EAE5DC]">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Hassle-free Gifting In 5 Simple Steps
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-7 sm:gap-6 lg:gap-4 items-start">
          
          {/* Connecting Dotted Line (Desktop only) */}
          <div 
            className="hidden lg:block absolute top-[22px] left-[8%] right-[8%] h-px z-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(140, 98, 40, 0.45) 1.5px, transparent 1.5px)',
              backgroundSize: '10px 2px',
            }}
          />

          {data.processSteps.map((step, idx) => (
            <ScrollReveal key={idx} animation="fadeUp" delay={0.06 * (idx + 1)} className="relative z-10 flex flex-col items-center text-center px-1">
              {/* Number Badge Node */}
              <div className="w-11 h-11 rounded-full bg-[#8C6228] text-white font-bold font-mono text-sm flex items-center justify-center shadow-md mb-3.5">
                {step.step}
              </div>
              <h3 className="text-sm font-bold text-[#1A1A18] mb-1.5 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-[#6B655E] font-light leading-relaxed max-w-[190px]">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          9. BESPOKE CURATION INQUIRY SECTION (QUOTATION FORM)
          ══════════════════════════════════════════════════════════════════ */}
      <section id="curation-inquiry" className="pt-6 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-[#F6F4EF]/70 border-t border-[#EAE5DC] scroll-mt-20">
        <div className="max-w-[960px] mx-auto space-y-6 sm:space-y-8">
          
          <ScrollReveal animation="fadeUp">
            <div className="text-center space-y-2">
              <span className="text-[11px] sm:text-[12px] font-sans font-semibold uppercase tracking-[0.22em] text-[#7A8B6F] block">
                PRIVATE CONCIERGE
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Enquire for {data.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-xl mx-auto">
                Share your requirements and our gifting concierge will prepare 3 tailored concepts within 24 hours.
              </p>
            </div>
          </ScrollReveal>

          {/* Centered Clean Card Form */}
          <div className="relative rounded-[28px] sm:rounded-[36px] border border-[#D9D5CC] bg-white p-6 sm:p-10 md:p-12 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#EBF3E8] border border-[#7A8B6F] flex items-center justify-center mx-auto text-[#7A8B6F]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-light text-[#1A1A18]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Thank you, {formData.name}.
                </h3>
                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/917021463609?text=${encodeURIComponent(
                      `✨ *NEW CURATION ENQUIRY* ✨\n📍 *Source / Page:* ${data.title}\n\n👤 *PERSONAL DETAILS*\n• *Name:* ${formData.name}\n• *Email:* ${formData.email}\n• *Phone / WhatsApp:* ${formData.phone}\n\n📦 *REQUIREMENTS*\n• *Estimated Quantity:* ${formData.quantity}\n• *Target Budget:* ${formData.budget}\n\n─────────────\n_Sent via The Gourmet Gifts Concierge_`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white text-xs font-mono uppercase tracking-[0.16em] cursor-pointer shadow-md inline-flex items-center gap-2"
                  >
                    <span>OPEN CHAT ON WHATSAPP</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 border border-[#1A1A18]/30 hover:border-[#1A1A18] text-[#1A1A18] text-xs font-mono uppercase tracking-[0.16em] cursor-pointer"
                  >
                    SEND ANOTHER ENQUIRY
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Verma"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 Mobile number"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Target Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none cursor-pointer"
                    >
                      {data.budgetTiers.map((tier) => (
                        <option key={tier.range} value={`${tier.range} per set`}>
                          {tier.range} per set
                        </option>
                      ))}
                      <option value="Custom / Undecided">Custom / Undecided</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Estimated Quantity
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none cursor-pointer"
                    >
                      <option>25 - 50 sets</option>
                      <option>50 - 100 sets</option>
                      <option>100 - 250 sets</option>
                      <option>250 - 500 sets</option>
                      <option>500+ sets</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between border-[#EFECE6]">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white text-xs font-mono uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 rounded-none shrink-0 ${
                      isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-95'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5 text-[#DFC299]" />
                    <span>{isSubmitting ? 'DISPATCHING TO CONCIERGE...' : 'SEND CURATION ENQUIRY'}</span>
                  </button>

                  <p className="text-xs text-[#78746D] font-light">
                    Direct concierge: <a href="mailto:hello@thegourmetgifts.co" className="text-[#1A1A18] font-medium underline underline-offset-4 hover:text-[#BFA267] transition-colors">hello@thegourmetgifts.co</a>
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
};
