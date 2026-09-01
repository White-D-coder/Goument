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
  ArrowRight
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { OccasionPageData } from '@/data/occasionsData';
import { CATALOGUE_CATEGORIES } from '@/data/hampersData';
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
    budget: '₹1,000 - ₹1,500 per set',
    quantity: '50 - 100 sets',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Categories for this specific occasion
  const displayCategories = useMemo(() => {
    if (data.categoryIds && data.categoryIds.length > 0) {
      return data.categoryIds
        .map((id) => CATALOGUE_CATEGORIES.find((c) => c.id === id))
        .filter(Boolean) as typeof CATALOGUE_CATEGORIES;
    }
    return CATALOGUE_CATEGORIES.slice(0, 8);
  }, [data.categoryIds]);

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
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-10 sm:py-14 md:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Headline, Tagline, CTAs & Trust Badges */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            <ScrollReveal animation="fadeUp">
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
                  GET 3 CONCEPTS
                </button>
                
                <button
                  onClick={scrollToConcepts}
                  className="px-6 py-3.5 border border-[#8C6228]/50 hover:border-[#1A1A18] text-[#8C6228] hover:text-[#1A1A18] font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 hover:bg-white/60 cursor-pointer"
                >
                  EXPLORE GIFT BOXES
                </button>
              </div>

              {/* 3 Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 border-t border-[#EAE5DC] text-xs text-[#6B655E] font-medium">
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
          2. WHAT IT SOLVES (4 VALUE PILLAR CARDS)
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
            <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-2xl mx-auto leading-relaxed">
              {data.solvesSubtitle}
            </p>
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
          3. PERFECT FOR EVERY WORKPLACE MOMENT (8 MOMENT PILLS/CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 bg-[#F6F4EF]/60 rounded-3xl sm:rounded-[36px] my-6">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-8 sm:mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              {data.momentsTitle}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-5">
          {data.moments.map((moment, idx) => {
            const Icon = IconMap[moment.iconName] || Heart;
            return (
              <ScrollReveal key={idx} animation="fadeUp" delay={0.03 * (idx + 1)}>
                <div className="bg-white border border-[#E5E0D6] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-2xs hover:shadow-xs transition-all hover:border-[#8C6228]/40">
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
          4. GIFTS FOR EVERY BUDGET (4 TIERED CARDS)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Gifts For Every Budget
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.budgetTiers.map((tier, idx) => {
            const Icon = IconMap[tier.iconName] || Gift;
            return (
              <ScrollReveal key={idx} animation="fadeUp" delay={0.05 * (idx + 1)}>
                <div className="bg-white border border-[#EAE5DC] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2.5 group hover:border-[#8C6228]/50">
                  <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#8C6228] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1A1A18] tracking-tight">
                    {tier.range}
                  </h3>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. RECOMMENDED PRODUCT MIX (8 SQUIRCLE CATEGORIES)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 border-t border-[#EAE5DC]">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Recommended Product Mix
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-[1380px] mx-auto justify-items-center">
          {displayCategories.map((cat, idx) => (
            <ScrollReveal key={cat.id} animation="fadeUp" delay={0.025 * (idx + 1)} className="w-full flex justify-center">
              <Link
                href={`/collections?category=${cat.id}`}
                className="flex flex-col items-center group cursor-pointer w-full max-w-[125px] focus:outline-none transition-all duration-300"
              >
                {/* Outer Prominent Rounded Squircle Frame (Homepage Design) */}
                <div
                  className={`w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-26 lg:h-26 xl:w-28 xl:h-28 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] lg:rounded-[30px] p-[2.5px] sm:p-[3px] transition-all duration-500 bg-[#EAE5DC] ${cat.pastelHover} group-hover:scale-108 group-hover:shadow-[0_16px_32px_rgba(0,0,0,0.12)] group-hover:ring-2 group-hover:ring-[#BFA267]/50`}
                >
                  {/* Inner Rounded Squircle Image Container */}
                  <div className="w-full h-full rounded-[17px] sm:rounded-[21px] md:rounded-[25px] lg:rounded-[27px] bg-[#FAF8F5] overflow-hidden relative shadow-inner">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-112"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-opacity duration-300" />
                  </div>
                </div>

                {/* Category Title Below Image — EXACT Jakarta Sans uppercase tracking-[0.22em] */}
                <span className="text-[10px] sm:text-[10.5px] md:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#1A1A18] mt-2.5 text-center leading-tight transition-colors group-hover:text-[#8C6228] w-full px-0.5">
                  {cat.label}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. CURATED CONCEPTS LOVED BY TEAMS (4 HAMPERS)
          ══════════════════════════════════════════════════════════════════ */}
      <section id="curated-concepts" className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-18 bg-[#F6F4EF]/60 rounded-3xl sm:rounded-[36px] my-6 scroll-mt-20">
        <ScrollReveal animation="fadeUp">
          <div className="text-center space-y-2 mb-10 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Curated Concepts Loved By Teams
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.curatedConcepts.map((concept, idx) => (
            <ScrollReveal key={idx} animation="fadeUp" delay={0.06 * (idx + 1)}>
              <div className="bg-white border border-[#E5E0D6] rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group h-full">
                
                {/* Concept Visual Frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F0]">
                  <Image
                    src={concept.image}
                    alt={concept.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-[#1A1A18] tracking-tight">
                      {concept.name}
                    </h3>
                    <p className="text-xs text-[#6B655E] font-light leading-relaxed">
                      {concept.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F0EBE2]">
                    <button
                      onClick={scrollToInquiry}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.16em] font-semibold text-[#8C6228] hover:text-[#1A1A18] transition-colors cursor-pointer"
                    >
                      <span>EXPLORE CONCEPT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          7. MAKE IT UNIQUELY YOURS (5 CUSTOMIZATION BADGES)
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
                      <option>Under ₹1,000 per set</option>
                      <option>₹1,000 - ₹1,500 per set</option>
                      <option>₹1,500 - ₹2,500 per set</option>
                      <option>₹2,500+ per set</option>
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
