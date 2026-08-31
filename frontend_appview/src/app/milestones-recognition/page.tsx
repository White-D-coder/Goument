'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Trophy, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Armchair, 
  Briefcase, 
  CheckCircle2, 
  PartyPopper,
  Wallet,
  Gift,
  Diamond,
  Crown,
  PenTool,
  Scroll,
  BookOpen,
  Sparkles,
  HeartHandshake,
  Clock,
  Compass
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function MilestonesRecognitionPage() {
  const scrollToInquiry = () => {
    const el = document.getElementById('milestone-inquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1A1A18] pt-24 sm:pt-28 pb-16">
        
        {/* ══════════════════════════════════════════════════════════════════
            1. HERO SECTION: MILESTONES & RECOGNITION
            ══════════════════════════════════════════════════════════════════ */}
        <section className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Headline & Editorial Copy */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal animation="fadeUp">
                <div className="space-y-4">
                  <h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1A1A18] tracking-tight leading-[1.05]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Milestones &amp; <br />
                    Recognition
                  </h1>
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl font-light italic text-[#9E7B35] tracking-tight leading-snug"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Mark the moment properly
                  </h2>
                  <p className="text-sm sm:text-base text-[#6B655E] leading-relaxed max-w-xl font-light">
                    Celebrate achievements, service and career moments with thoughtful gifts that honour contribution, build loyalty and inspire what&apos;s next.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={scrollToInquiry}
                    className="px-7 py-3.5 bg-[#1C2D42] hover:bg-[#121F2F] text-[#FAF8F5] font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                  >
                    PLAN RECOGNITION GIFTS
                  </button>
                  <Link
                    href="/collections"
                    className="px-7 py-3.5 bg-transparent border border-[#DFC299] text-[#9E7B35] hover:bg-[#FAF5EC] font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 active:scale-95 text-center"
                  >
                    EXPLORE TROPHIES &amp; BOXES
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Hero Presentation Photo */}
            <div className="lg:col-span-6">
              <ScrollReveal animation="fadeUp" delay={0.15}>
                <div className="relative aspect-[4/3.2] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#EAE5DC] bg-[#FAF8F5]">
                  <Image
                    src="/images/boxes/box_6.png"
                    alt="The Gourmet Gifts - Milestones and Recognition Suite"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            2. PERFECT FOR EVERY ACHIEVEMENT
            ══════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-white border-y border-[#EAE5DC]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-12">
            
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Perfect for every achievement
              </h2>
            </div>

            {/* 8 Achievement Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Work Anniversaries',
                  desc: 'Celebrate years of dedication and commitment.',
                  icon: Award,
                },
                {
                  title: 'Employee Recognition',
                  desc: 'Appreciate performance, behaviour and values.',
                  icon: Sparkles,
                },
                {
                  title: 'Sales Achievements',
                  desc: 'Reward results that drive growth and impact.',
                  icon: TrendingUp,
                },
                {
                  title: 'Safety Milestones',
                  desc: 'Recognize teams that prioritize safety.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Retirement',
                  desc: 'Honour a legacy of service and wisdom.',
                  icon: Armchair,
                },
                {
                  title: 'Promotion',
                  desc: 'Celebrate new roles and bigger responsibilities.',
                  icon: Compass,
                },
                {
                  title: 'Project Completion',
                  desc: 'Acknowledge teamwork and successful delivery.',
                  icon: CheckCircle2,
                },
                {
                  title: 'Company Anniversary',
                  desc: 'Mark milestones that shape your journey.',
                  icon: PartyPopper,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3 text-center hover:shadow-md hover:border-[#DFC299] transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A18] tracking-tight">{item.title}</h3>
                    <p className="text-xs text-[#78746D] leading-relaxed font-light">{item.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            3. BUDGET BANDS TO SUIT EVERY PLAN
            ══════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-[#FAF8F5]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-10">
            
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Budget bands to suit every plan
              </h2>
            </div>

            {/* 4 Budget Cards (Last one is Dark Navy Premium Card) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#F5EFEB] border border-[#E2DDD2] space-y-3 text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1A1A18] font-sans">₹750 – ₹1,250</h3>
                <p className="text-xs text-[#78746D] leading-relaxed font-light">Thoughtful &amp; Well-Curated</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5EFEB] border border-[#E2DDD2] space-y-3 text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs">
                  <Gift className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1A1A18] font-sans">₹1,500 – ₹2,500</h3>
                <p className="text-xs text-[#78746D] leading-relaxed font-light">Premium &amp; Impressive</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5EFEB] border border-[#E2DDD2] space-y-3 text-center hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs">
                  <Diamond className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-[#1A1A18] font-sans">₹2,500 – ₹5,000</h3>
                <p className="text-xs text-[#78746D] leading-relaxed font-light">Luxurious &amp; Memorable</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0F1D2E] text-white border border-[#1E344F] space-y-3 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#1C2D42] border border-[#DFC299]/40 flex items-center justify-center text-[#DFC299] mx-auto shadow-2xs">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-sans">₹5,000+</h3>
                <p className="text-xs text-white/80 leading-relaxed font-light">Iconic &amp; Extraordinary</p>
              </div>

            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            4. RECOMMENDED PRODUCT MIX
            ══════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-white border-y border-[#EAE5DC]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-10">
            
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Recommended product mix
              </h2>
            </div>

            {/* 9 Circular Category Badges */}
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 sm:gap-6 justify-items-center">
              {[
                { title: 'Trophies', icon: Trophy },
                { title: 'Plaques', icon: Award },
                { title: 'Premium Pens', icon: PenTool },
                { title: 'Desk Accessories', icon: Clock },
                { title: 'Leather Goods', icon: Briefcase },
                { title: 'Travel Products', icon: Compass },
                { title: 'Gourmet', icon: Gift },
                { title: 'Personalized Books', icon: BookOpen },
                { title: 'Custom Keepsakes', icon: Diamond },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href="/collections"
                    className="flex flex-col items-center space-y-2 group cursor-pointer"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF8F5] border border-[#DFC299] flex items-center justify-center text-[#9E7B35] shadow-2xs group-hover:scale-110 group-hover:bg-[#FAF5EC] group-hover:shadow-md transition-all duration-300">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-xs font-bold text-[#5A554D] group-hover:text-[#1A1A18] text-center transition-colors">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            5. FEATURED CONCEPTS (4 DARK LUXURY CARDS)
            ══════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-[#FAF8F5]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
            
            <div className="text-center max-w-2xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Featured concepts
              </h2>
            </div>

            {/* 4 Dark Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Thank You',
                  desc: 'Gratitude that leaves a lasting impression.',
                  image: '/images/boxes/box_1.png',
                },
                {
                  title: 'Milestone',
                  desc: 'Celebrate achievements that matter.',
                  image: '/images/boxes/box_6.png',
                },
                {
                  title: 'Legacy',
                  desc: 'Honour the impact. Inspire the future.',
                  image: '/images/boxes/box_5.png',
                },
                {
                  title: 'Career Honour',
                  desc: 'Recognize the journey. Celebrate the growth.',
                  image: '/images/boxes/box_3.png',
                },
              ].map((concept, idx) => (
                <div
                  key={idx}
                  className="bg-[#111110] text-white rounded-2xl overflow-hidden border border-black/20 shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden relative bg-[#1A1A18]">
                    <img
                      src={concept.image}
                      alt={concept.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white tracking-tight">{concept.title}</h3>
                    <p className="text-xs text-white/70 leading-relaxed font-light">{concept.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            6. RECOGNITION THAT TELLS THE RIGHT STORY
            ══════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-white border-y border-[#EAE5DC]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Heading & 4 Feature Pillars */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Recognition that tells <br />
                    the right story
                  </h2>
                  <p className="text-xs sm:text-sm text-[#78746D] leading-relaxed font-light max-w-lg">
                    From custom messages to branded details, we personalize every element to reflect the achievement and your culture.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DFC299] flex items-center justify-center text-[#9E7B35]">
                      <PenTool className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1A18]">Personalized Engravings</h3>
                    <p className="text-xs text-[#78746D] leading-relaxed font-light">
                      Names, dates and meaningful messages laser-engraved.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DFC299] flex items-center justify-center text-[#9E7B35]">
                      <Gift className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1A18]">Branded Packaging</h3>
                    <p className="text-xs text-[#78746D] leading-relaxed font-light">
                      Elevate the unboxing experience with bespoke presentation.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DFC299] flex items-center justify-center text-[#9E7B35]">
                      <Scroll className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1A18]">Custom Messaging</h3>
                    <p className="text-xs text-[#78746D] leading-relaxed font-light">
                      Your words, beautifully presented on metallic crest stationery.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#DFC299] flex items-center justify-center text-[#9E7B35]">
                      <Award className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-[#1A1A18]">Meaningful Keepsakes</h3>
                    <p className="text-xs text-[#78746D] leading-relaxed font-light">
                      Gifts they&apos;ll cherish, display and remember for years.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: High-End Presentation Photo */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-[#EAE5DC]">
                  <Image
                    src="/images/boxes/box_7.png"
                    alt="Personalized milestone presentation box"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            7. OUR 5-STEP PROCESS
            ══════════════════════════════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 bg-[#FAF8F5]">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-12">
            
            <div className="max-w-2xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Our 5-step process
              </h2>
            </div>

            {/* 5 Process Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  step: '1',
                  title: 'Understand',
                  desc: 'We learn your goals, audience and recognition moments.',
                  icon: Compass,
                },
                {
                  step: '2',
                  title: 'Curate',
                  desc: 'We suggest the right concepts and product mix.',
                  icon: Gift,
                },
                {
                  step: '3',
                  title: 'Personalize',
                  desc: 'We customize with branding, messaging and packaging.',
                  icon: PenTool,
                },
                {
                  step: '4',
                  title: 'Deliver',
                  desc: 'On-time, anywhere, with care.',
                  icon: Clock,
                },
                {
                  step: '5',
                  title: 'Delight',
                  desc: 'Create memorable moments that drive engagement.',
                  icon: Sparkles,
                },
              ].map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="flex flex-col items-center space-y-3 text-center">
                    <div className="w-8 h-8 rounded-full bg-[#1C2D42] text-[#DFC299] flex items-center justify-center text-xs font-bold font-sans shadow-xs">
                      {p.step}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1A1A18]">{p.title}</h3>
                    <p className="text-[11px] text-[#78746D] leading-relaxed font-light">{p.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            8. BOTTOM BANNER CTA (MIDNIGHT NAVY & GOLD)
            ══════════════════════════════════════════════════════════════════ */}
        <section id="milestone-inquiry" className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 pt-6 sm:pt-10">
          <div className="bg-[#1C2D42] rounded-3xl p-8 sm:p-12 md:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#304866]">
            
            <div className="space-y-3 relative z-10 max-w-xl text-center md:text-left">
              <span className="text-xs font-sans uppercase tracking-[0.24em] text-[#DFC299] font-bold block">
                Honour every achievement
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight"
                style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
              >
                Plan Your Recognition Program
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                Connect with our concierge to curate custom-engraved awards, executive hampers, and milestone presentations.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <Link
                href="/corporate#curation-inquiry"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#BFA267] hover:bg-[#D4B67A] text-[#1A1A18] font-sans text-xs uppercase tracking-[0.18em] font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group cursor-pointer"
              >
                <span>REQUEST PROPOSAL</span>
                <ArrowRight className="w-4 h-4 text-[#1A1A18] group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

          </div>
        </section>

      </div>
  );
}
