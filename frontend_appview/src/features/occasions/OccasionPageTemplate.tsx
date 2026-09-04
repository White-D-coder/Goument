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
    budget: data.budgetTiers[1] ? data.budgetTiers[1].range : data.budgetTiers[0]?.range || '₹1,000 – ₹1,499',
    quantity: '50 - 100',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const conceptsAudienceTarget = useMemo(() => {
    switch (data.slug) {
      case 'employee-gifting':
      case 'onboarding-kits':
        return 'built around your people, the occasion and your brand.';
      case 'cx-gifting':
        return 'built around your customer, the journey moment and your brand.';
      case 'dealer-partner-gifting':
        return 'built around the partner tier, the milestone and your brand.';
      case 'events-conferences':
        return 'built around the audience, the event format and your brand.';
      case 'milestones-recognition':
        return 'built around the achievement, the recipient and what the moment represents.';
      case 'festive-gifting':
        return 'built around who you’re gifting to, the festival and your brand.';
      case 'weddings-celebrations':
        return 'built around the people, the celebration, the theme and your budget.';
      default:
        return 'built around your client and your brand.';
    }
  }, [data.slug]);

  const handleBudgetClick = (range: string) => {
    setFormData((prev) => ({ ...prev, budget: range }));
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
      fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          occasion: data.title,
          source: `Occasion Page: ${data.title}`,
        }),
      }).catch((err) => console.error('Email send error:', err));

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
    1. HERO SECTION
    ══════════════════════════════════════════════════════════════════ */}
<section className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28 md:pt-32 pb-10 sm:pb-16">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">

    {/* Left Column: Breadcrumb, Typography, CTAs & Trust Points */}
    <div className="lg:col-span-7">
      <ScrollReveal animation="fadeUp">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[#8C847B] mb-5 sm:mb-7"
        >
          <Link
            href="/"
            className="hover:text-[#1A1A18] transition-colors"
          >
            Home
          </Link>

          <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />

          <Link
            href="/occasions"
            className="hover:text-[#1A1A18] transition-colors"
          >
            Occasions
          </Link>

          <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />

          <span className="text-[#1A1A18] font-medium truncate">
            {data.title}
          </span>
        </nav>

        {/* Main Copy */}
        <div className="max-w-2xl">
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-light text-[#1A1A18] tracking-tight leading-[1.06]"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
            }}
          >
            {data.title}
          </h1>

          <p className="mt-4 sm:mt-5 text-base sm:text-xl md:text-2xl font-normal text-[#8C6228] tracking-tight leading-snug">
            {data.tagline}
          </p>

          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base text-[#6B655E] leading-relaxed font-light max-w-xl">
            {data.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mt-7 sm:mt-9">
          <button
            onClick={scrollToInquiry}
            className="px-7 py-3.5 sm:py-4 bg-[#1A1A18] hover:bg-[#2C241D] text-white font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer text-center"
          >
            {data.primaryCta || 'GET 3 CURATED CONCEPTS'}
          </button>

          <button
            onClick={scrollToConcepts}
            className="px-6 py-3.5 sm:py-4 border border-[#8C6228]/50 hover:border-[#1A1A18] text-[#8C6228] hover:text-[#1A1A18] font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-all duration-300 hover:bg-white/80 cursor-pointer text-center"
          >
            {data.secondaryCta || 'EXPLORE GIFT BOXES'}
          </button>
        </div>

        {/* Trust Points */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#EAE5DC]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-left">
            {data.trustPoints &&
              data.trustPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-[#F0EBE1] flex items-center justify-center shrink-0 text-[#8C6228]">
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[1.8]" />
                  </div>

                  <span className="text-xs text-[#524E48] font-medium leading-tight">
                    {pt}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </ScrollReveal>
    </div>

    {/* Right Column: Premium Hero Image */}
    <div className="lg:col-span-5 relative">
      <ScrollReveal animation="fadeUp" delay={0.12}>
        <div className="relative mx-auto w-full max-w-[560px]">

          {/* Subtle Architectural Frame */}
          <div className="absolute -right-2.5 -bottom-2.5 sm:-right-3 sm:-bottom-3 w-full h-full border border-[#C8B28E]/45 rounded-[20px] pointer-events-none" />

          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] sm:rounded-[20px] border border-[#E8E2D8] bg-[#FAF8F5] shadow-[0_10px_30px_rgba(0,0,0,0.055)]">
            <Image
              src={data.heroImage}
              alt={data.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>

        </div>
      </ScrollReveal>
    </div>

  </div>
</section>


{/* ══════════════════════════════════════════════════════════════════
    2. VALUE PILLARS
    ══════════════════════════════════════════════════════════════════ */}
<section className="pt-10 sm:pt-16 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-10 bg-[#FAF8F5]">
  <div className="max-w-[1280px] mx-auto">

    {/* Section Heading */}
    <ScrollReveal animation="fadeUp">
      <div className="max-w-3xl mb-10 sm:mb-14">
        <h2
          className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
          }}
        >
          {data.solvesTitle}
        </h2>

        {data.solvesSubtitle && (
          <p className="mt-3 text-xs sm:text-sm text-[#78746D] font-light max-w-2xl leading-normal">
            {data.solvesSubtitle}
          </p>
        )}
      </div>
    </ScrollReveal>

    {/* Editorial 2 × 2 Pillar Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2">

      {data.pillars.map((pillar, idx) => {
        const Icon = IconMap[pillar.iconName] || ShieldCheck;

        return (
          <ScrollReveal
            key={idx}
            animation="fadeUp"
            delay={0.05 * (idx + 1)}
            className="h-full"
          >
            <div
              className={[
                "group relative h-full py-7 sm:py-8",
                idx % 2 === 0
                  ? "sm:pr-8 lg:pr-12"
                  : "sm:pl-8 lg:pl-12",
                idx < 2
                  ? "border-b border-[#EAE5DC]"
                  : "",
              ].join(" ")}
            >

              {/* Number + Icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-mono tracking-[0.16em] text-[#B5AFA6]">
                  0{idx + 1}
                </span>

                <div className="text-[#8C6228]">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-[#1A1A18] tracking-tight leading-snug group-hover:text-[#8C6228] transition-colors duration-300">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="mt-3 max-w-lg text-xs sm:text-[13px] text-[#6B655E] font-light leading-relaxed">
                {pillar.description}
              </p>

              {/* Subtle Bottom Rule */}
              <div className="mt-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[#DCD5CA] group-hover:w-12 group-hover:bg-[#8C6228] transition-all duration-300" />
              </div>

            </div>
          </ScrollReveal>
        );
      })}

    </div>
  </div>
</section>


{/* ══════════════════════════════════════════════════════════════════
    3. CURATED FOR EVERY MOMENT
    ══════════════════════════════════════════════════════════════════ */}
<section className="pt-10 sm:pt-16 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-10 bg-[#FAF8F5]">
  <div className="max-w-[1280px] mx-auto">

    {/* Heading */}
    <ScrollReveal animation="fadeUp">
      <div className="max-w-4xl mb-10 sm:mb-14">
        <h2
          className="text-3xl sm:text-5xl md:text-6xl font-light text-[#1A1A18] tracking-tight leading-[1.02]"
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
          }}
        >
          {data.momentsTitle}
        </h2>

        {data.momentsSubtitle && (
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#78746D] font-light max-w-2xl leading-normal">
            {data.momentsSubtitle}
          </p>
        )}
      </div>
    </ScrollReveal>

    {/* Large Editorial Composition */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start">

      {/* Left: Visual Anchor (Sticky on desktop so it stays pinned while scrolling through moments) */}
      <div className="lg:col-span-5 lg:sticky lg:top-28">
        <ScrollReveal animation="fadeUp" delay={0.08}>
          <div className="relative max-w-[500px] mx-auto lg:mx-0">

            {/* Subtle Offset Frame */}
            <div className="absolute -left-2.5 -bottom-2.5 sm:-left-3 sm:-bottom-3 w-full h-full border border-[#C8B28E]/35 rounded-[18px] pointer-events-none" />

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] sm:rounded-[20px] border border-[#E8E2D8] bg-white shadow-[0_8px_26px_rgba(0,0,0,0.045)]">
              <Image
                src={data.heroImage}
                alt={data.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>

          </div>
        </ScrollReveal>
      </div>

      {/* Right: Editorial Moments List */}
      <div className="lg:col-span-7">
        <div className="border-t border-[#DCD5CA]">

          {data.moments.map((moment, idx) => {
            const Icon = IconMap[moment.iconName] || Heart;

            return (
              <ScrollReveal
                key={idx}
                animation="fadeUp"
                delay={0.035 * (idx + 1)}
              >
                <div className="group border-b border-[#DCD5CA] py-5 sm:py-6 lg:py-7 transition-transform duration-300 ease-out hover:-translate-y-1">
                  <div className="flex items-center gap-4 sm:gap-5">

                    {/* Icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center text-[#8C6228] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-5 h-5 sm:w-[21px] sm:h-[21px] stroke-[1.45]" />
                    </div>

                    {/* Title */}
                    <span className="flex-1 text-sm sm:text-base md:text-lg font-medium text-[#1A1A18] group-hover:text-[#8C6228] transition-colors duration-300 leading-snug">
                      {moment.title}
                    </span>

                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 shrink-0 text-[#B5AFA6] group-hover:text-[#8C6228] group-hover:translate-x-1.5 transition-all duration-300" />

                  </div>
                </div>
              </ScrollReveal>
            );
          })}

        </div>
      </div>

    </div>
  </div>
</section>

      {/* ══════════════════════════════════════════════════════════════════
          4. THOUGHTFULLY CURATED AROUND YOUR BUDGET
          ══════════════════════════════════════════════════════════════════ */}
      <section className="pt-6 sm:pt-10 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-10 bg-[#FAF8F5]">
        <div className="max-w-[1480px] mx-auto space-y-8 sm:space-y-10">
          
          <ScrollReveal animation="fadeUp">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <h2
                className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                {data.budgetTitle || 'Thoughtfully Curated Around Your Budget'}
              </h2>
              {data.budgetSubtitle && (
                <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-2xl mx-auto leading-normal">
                  {data.budgetSubtitle}
                </p>
              )}
            </div>
          </ScrollReveal>

          {/* User's Original Circular Price Pills */}
          <div className="w-full flex items-center justify-center pt-2 pb-2 px-4 sm:px-8">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {data.budgetTiers.map((tier, idx) => {
                const pillTiers = [
                  {
                    bg: 'bg-[#154230]', // Emerald Green
                    border: 'border-[#0F3023]',
                    shadow: 'shadow-[0_8px_24px_rgba(21,66,48,0.35)] hover:shadow-[0_12px_32px_rgba(21,66,48,0.5)]',
                  },
                  {
                    bg: 'bg-[#5D1E21]', // Deep Burgundy
                    border: 'border-[#481719]',
                    shadow: 'shadow-[0_8px_24px_rgba(93,30,33,0.35)] hover:shadow-[0_12px_32px_rgba(93,30,33,0.5)]',
                  },
                  {
                    bg: 'bg-[#101111]', // Charcoal Black
                    border: 'border-[#000000]',
                    shadow: 'shadow-[0_8px_24px_rgba(16,17,17,0.35)] hover:shadow-[0_12px_32px_rgba(16,17,17,0.5)]',
                  },
                  {
                    bg: 'bg-[#A6824A]', // Antique Gold
                    border: 'border-[#8F6F3D]',
                    shadow: 'shadow-[0_8px_24px_rgba(166,130,74,0.35)] hover:shadow-[0_12px_32px_rgba(166,130,74,0.5)]',
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
                      className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shrink-0 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-105 cursor-pointer border ${pill.bg} ${pill.border} ${pill.shadow}`}
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

          {/* Need something different? Minimal clean callout below */}
          <div className="text-center pt-6 sm:pt-8 space-y-3 max-w-xl mx-auto">
            <h3 className="text-base sm:text-lg font-medium text-[#1A1A18] tracking-tight">
              Need something different?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B655E] font-light">
              Tell us your budget and brief — we&apos;ll curate around it.
            </p>
            <div className="pt-2">
              <button
                onClick={scrollToInquiry}
                className="px-7 py-3.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                GET 3 CURATED CONCEPTS
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. NOT SURE WHAT TO GIFT? THAT'S WHERE WE COME IN
          ══════════════════════════════════════════════════════════════════ */}
      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-10 bg-[#FAF8F5]">
        <div className="max-w-[1480px] mx-auto">
          <ScrollReveal animation="fadeUp">
            <div className="bg-[#F5EFEB] border border-[#E6DDCF] rounded-3xl p-8 sm:p-12 md:p-16 text-center space-y-6 max-w-4xl mx-auto shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              <div className="space-y-3 max-w-2xl mx-auto">
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Not Sure What to Gift? That’s Where We Come In.
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-[#6B655E] font-light leading-relaxed">
                  Tell us who you’re gifting, the occasion, quantity and budget.
                  <br className="hidden sm:inline" /> We’ll come back with 3 thoughtfully curated concepts {conceptsAudienceTarget}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={scrollToInquiry}
                  className="px-8 py-4 bg-[#1A1A18] hover:bg-[#2C241D] text-white font-sans text-xs uppercase tracking-[0.18em] font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  GET 3 CURATED CONCEPTS
                </button>
              </div>

              <p className="text-[11px] sm:text-xs text-[#8C847B] font-light tracking-wide pt-1">
                No catalogue scrolling. No guesswork. Just thoughtful options curated for you.
              </p>
            </div>
          </ScrollReveal>
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
                <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-md mx-auto">
                  Your curation brief has been delivered to <span className="text-[#1A1A18] font-medium">hello@thegourmetgifts.co</span>. Our team will get back to you shortly.
                </p>
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
                        <option key={tier.range} value={tier.range}>
                          {tier.range}
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
                      <option>25 - 50</option>
                      <option>50 - 100</option>
                      <option>100 - 250</option>
                      <option>250 - 500</option>
                      <option>500+</option>
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
