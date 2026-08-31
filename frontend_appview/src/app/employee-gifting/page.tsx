'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Headphones, 
  Diamond, 
  HeartHandshake, 
  Award, 
  Building2, 
  TrendingUp,
  Calendar,
  Gift,
  Trophy,
  Laptop,
  Cake,
  Crown,
  Users,
  Wallet
} from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function EmployeeGiftingPage() {
  const scrollToInquiry = () => {
    const el = document.getElementById('get-concepts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-[#1A1A18] pt-24 sm:pt-28 pb-16">
      
      {/* ══════════════════════════════════════════════════════════════════
          1. HERO SECTION: EMPLOYEE GIFTING
          ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal animation="fadeUp">
              <div className="space-y-4">
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1A1A18] tracking-tight leading-[1.05]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Employee Gifting
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#1A1A18] tracking-tight leading-snug">
                  Thoughtful gifts. Stronger teams. Lasting impact.
                </h2>
                <p className="text-sm sm:text-base text-[#6B655E] leading-relaxed max-w-xl font-light">
                  Celebrate your people with premium, thoughtful gifts that inspire, engage and make every milestone memorable.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={scrollToInquiry}
                  className="px-7 py-3.5 bg-[#1C2D42] hover:bg-[#121F2F] text-[#FAF8F5] font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  GET 3 CONCEPTS
                </button>
                <Link
                  href="/collections"
                  className="px-7 py-3.5 bg-transparent border border-[#DFC299] text-[#9E7B35] hover:bg-[#FAF5EC] font-sans text-xs uppercase tracking-[0.16em] font-bold rounded-lg transition-all duration-300 active:scale-95 text-center"
                >
                  EXPLORE GIFT BOXES
                </Link>
              </div>

              {/* Trust Row Badges */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-6 border-t border-[#EAE5DC] text-xs text-[#6B655E]">
                <div className="flex items-center gap-2">
                  <Diamond className="w-4 h-4 text-[#9E7B35]" />
                  <span className="font-medium">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#9E7B35]" />
                  <span className="font-medium">On-time Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-[#9E7B35]" />
                  <span className="font-medium">End-to-end Support</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Hero Gift Presentation Photo */}
          <div className="lg:col-span-6">
            <ScrollReveal animation="fadeUp" delay={0.15}>
              <div className="relative aspect-[4/3.2] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#EAE5DC] bg-[#FAF8F5]">
                <Image
                  src="/images/boxes/box_1.png"
                  alt="The Gourmet Gifts - Employee Gifting Hamper"
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
          2. WHAT EMPLOYEE GIFTING SOLVES
          ══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#EAE5DC]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-12">
          
          <div className="max-w-3xl mx-auto space-y-3">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              What Employee Gifting Solves
            </h2>
            <p className="text-xs sm:text-sm text-[#78746D] leading-relaxed font-light">
              Great teams are built on appreciation, recognition and connection. Our employee gifting solutions help you strengthen relationships, boost morale and celebrate every moment that matters.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A18] tracking-tight">Boosts Engagement</h3>
              <p className="text-xs text-[#78746D] leading-relaxed font-light">
                Recognize achievements and inspire your teams to excel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A18] tracking-tight">Builds Loyalty</h3>
              <p className="text-xs text-[#78746D] leading-relaxed font-light">
                Make your people feel genuinely valued, respected and connected.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A18] tracking-tight">Reinforces Culture</h3>
              <p className="text-xs text-[#78746D] leading-relaxed font-light">
                Celebrate company values through meaningful, shared experiences.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1A1A18] tracking-tight">Drives Impact</h3>
              <p className="text-xs text-[#78746D] leading-relaxed font-light">
                Motivated and rewarded teams deliver stronger business outcomes.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. PERFECT FOR EVERY WORKPLACE MOMENT (REDESIGNED LUXURY GALLERY)
          ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5]">
        <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <span className="text-[10.5px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#9E7B35] font-bold block">
              Curated Milestones &amp; Celebrations
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Perfect For Every Workplace Moment
            </h2>
            <p className="text-xs sm:text-sm text-[#78746D] font-light max-w-xl mx-auto leading-relaxed">
              From individual work anniversaries to nationwide festive gifting, explore bespoke curations tailored for every company milestone.
            </p>
          </div>

          {/* 8 Redesigned Editorial Workplace Moment Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              { 
                title: 'Employee Appreciation', 
                tag: 'Recognition',
                desc: 'Inspire daily excellence with artisan gourmet delicacies and personalized desk keepsakes.',
                icon: HeartHandshake,
                accent: 'bg-[#FADCD5]'
              },
              { 
                title: 'Work Anniversaries', 
                tag: 'Loyalty',
                desc: 'Honor years of dedication with engraved timepieces, executive journals and brass artifacts.',
                icon: Calendar,
                accent: 'bg-[#DFC299]'
              },
              { 
                title: 'Milestones & Awards', 
                tag: 'Excellence',
                desc: 'Commemorate extraordinary achievements with high-tier custom crest presentation chests.',
                icon: Trophy,
                accent: 'bg-[#D5E8DD]'
              },
              { 
                title: 'Remote Employee Gifts', 
                tag: 'Distributed Teams',
                desc: 'Seamless pan-India doorstep delivery of premium wellness and curated desk accessories.',
                icon: Laptop,
                accent: 'bg-[#EAE5DC]'
              },
              { 
                title: 'Employee Birthdays', 
                tag: 'Celebration',
                desc: 'Delight team members on their special day with handcrafted confectionery and sweet treats.',
                icon: Cake,
                accent: 'bg-[#F5DCDE]'
              },
              { 
                title: 'Festive Employee Gifting', 
                tag: 'Diwali & New Year',
                desc: 'Elevate seasonal traditions with royal dry fruit trunks and heirloom keepsake vessels.',
                icon: Sparkles,
                accent: 'bg-[#FCF0CE]'
              },
              { 
                title: 'Leadership & Executive', 
                tag: 'Senior Management',
                desc: 'Distinguished gifts for leaders, directors and partners crafted with luxury materials.',
                icon: Crown,
                accent: 'bg-[#E3D8C8]'
              },
              { 
                title: 'Team Celebrations', 
                tag: 'Quarterly Wins',
                desc: 'Celebrate shared project victories and team camaraderie with collaborative hamper suites.',
                icon: Users,
                accent: 'bg-[#D6C2A9]'
              },
            ].map((moment, idx) => {
              const Icon = moment.icon;
              return (
                <div
                  key={idx}
                  onClick={scrollToInquiry}
                  className="bg-white rounded-2xl p-6 border border-[#EAE5DC] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] hover:border-[#C5A880] transition-all duration-400 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                >
                  {/* Subtle Top Accent Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-[#9E7B35] transition-colors duration-400" />

                  <div className="space-y-4">
                    {/* Top Icon & Tag */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl ${moment.accent} flex items-center justify-center text-[#1A1A18] shadow-2xs group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-5 h-5 text-[#3D372F]" />
                      </div>
                      <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8A8680] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#ECE7DE]">
                        {moment.tag}
                      </span>
                    </div>

                    {/* Headline & Description */}
                    <div className="space-y-1.5 pt-1">
                      <h3 className="text-lg font-bold text-[#1A1A18] tracking-tight group-hover:text-[#9E7B35] transition-colors leading-snug">
                        {moment.title}
                      </h3>
                      <p className="text-xs text-[#78746D] leading-relaxed font-light">
                        {moment.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className="pt-5 border-t border-[#F5F2EB] mt-4 flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider text-[#9E7B35] group-hover:text-[#1A1A18] transition-colors">
                    <span>Explore Options</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. GIFTS FOR EVERY BUDGET
          ══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#EAE5DC]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-10">
          
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Gifts For Every Budget
            </h2>
          </div>

          {/* 4 Budget Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 'under-1000',
                title: 'Under ₹1,000',
                desc: 'Thoughtful & delightful gifts that make an impact.',
                icon: Wallet,
              },
              {
                id: '1000-1500',
                title: '₹1,000 – ₹1,500',
                desc: 'Premium picks for everyday appreciation.',
                icon: Gift,
              },
              {
                id: '1500-2500',
                title: '₹1,500 – ₹2,500',
                desc: 'Curated favourites for special moments.',
                icon: Award,
              },
              {
                id: '2500-plus',
                title: '₹2,500+',
                desc: 'Luxury gifting for unforgettable impressions.',
                icon: Diamond,
              },
            ].map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3 text-center hover:shadow-md hover:border-[#DFC299] transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto shadow-2xs group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A18] font-sans">{b.title}</h3>
                  <p className="text-xs text-[#78746D] leading-relaxed font-light">{b.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. RECOMMENDED PRODUCT MIX
          ══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-10">
          
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Recommended Product Mix
            </h2>
          </div>

          {/* 8 Product Mix Category Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Gourmet', image: '/images/category_food.jpg' },
              { name: 'Drinkware', image: '/images/category_beverages.jpg' },
              { name: 'Bags', image: '/images/corporate/OfficeTravelBags/Backpack.jpg' },
              { name: 'Stationery', image: '/images/corporate/category_icons/Stationery & Desk Accessories.jpg' },
              { name: 'Tech', image: '/images/corporate/category_icons/Electronics.jpg' },
              { name: 'Apparel', image: '/images/corporate/category_icons/Apparel.jpg' },
              { name: 'Home & Lifestyle', image: '/images/category_decor.jpg' },
              { name: 'Keepsakes', image: '/images/category_personalisation.jpg' },
            ].map((mix, idx) => (
              <Link
                key={idx}
                href="/collections"
                className="flex flex-col items-center group cursor-pointer space-y-2 p-2 rounded-xl hover:bg-white transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white border border-[#EAE5DC] shadow-2xs group-hover:scale-105 group-hover:shadow-md transition-all duration-300 relative">
                  <img src={mix.image} alt={mix.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-[#5A554D] group-hover:text-[#1A1A18] transition-colors">
                  {mix.name}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. CURATED CONCEPTS LOVED BY TEAMS
          ══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#EAE5DC]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Curated Concepts Loved By Teams
            </h2>
          </div>

          {/* 4 Concepts Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'The Everyday Essential',
                desc: 'Practical, premium and perfect for everyday motivation.',
                image: '/images/boxes/box_1.png',
              },
              {
                title: 'Well Done',
                desc: 'Celebrate achievements with elegance and thoughtfulness.',
                image: '/images/boxes/box_2.png',
              },
              {
                title: 'The Team Box',
                desc: 'Curated for teams to connect, celebrate and thrive together.',
                image: '/images/boxes/box_4.png',
              },
              {
                title: 'Leadership Edition',
                desc: 'Premium gifts for leaders who inspire excellence.',
                image: '/images/boxes/box_3.png',
              },
            ].map((concept, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-2xl overflow-hidden border border-[#ECE7DE] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="w-full aspect-[4/3] overflow-hidden relative bg-white">
                  <img
                    src={concept.image}
                    alt={concept.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-[#1A1A18]">{concept.title}</h3>
                    <p className="text-xs text-[#78746D] leading-relaxed font-light">{concept.desc}</p>
                  </div>
                  <button
                    onClick={scrollToInquiry}
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#9E7B35] group-hover:text-[#1A1A18] transition-colors pt-2 cursor-pointer"
                  >
                    <span>EXPLORE CONCEPT</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          7. MAKE IT UNIQUELY YOURS
          ══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-[#FAF8F5]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Make It Uniquely Yours
            </h2>
          </div>

          {/* 5 Customisation Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'Logo & Branding', desc: 'Add your logo to make it yours.', icon: Award },
              { title: 'Personalised Notes', desc: "Add a personal touch that's remembered.", icon: Sparkles },
              { title: 'Custom Packaging', desc: 'Branded sleeves, belly bands & more.', icon: Gift },
              { title: 'Curated Selections', desc: 'Handpick items that reflect your culture.', icon: Diamond },
              { title: 'Bulk Gifting Support', desc: 'Dedicated support for large scale deliveries.', icon: Headphones },
            ].map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#EAE5DC] space-y-2.5 text-center shadow-2xs hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#DFC299] flex items-center justify-center text-[#9E7B35] mx-auto group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1A1A18]">{c.title}</h3>
                  <p className="text-[11px] text-[#78746D] leading-relaxed font-light">{c.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          8. HASSLE-FREE GIFTING IN 5 SIMPLE STEPS
          ══════════════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-y border-[#EAE5DC]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 text-center space-y-12">
          
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Hassle-free Gifting In 5 Simple Steps
            </h2>
          </div>

          {/* 5 Milestone Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {[
              {
                step: '1',
                title: 'Share Your Requirements',
                desc: 'Tell us your occasion, audience and budget.',
              },
              {
                step: '2',
                title: 'We Curate Concepts',
                desc: 'Receive 3 customised gifting concepts to choose from.',
              },
              {
                step: '3',
                title: 'Approve & Personalise',
                desc: 'Review, personalise and lock your favourite.',
              },
              {
                step: '4',
                title: 'We Prepare & Pack',
                desc: 'Expertly packed with care, on-brand and on-time.',
              },
              {
                step: '5',
                title: 'Delivered With Delight',
                desc: 'We deliver happiness across every location.',
              },
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-3 text-center relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#BFA267] text-white flex items-center justify-center text-sm font-bold font-sans shadow-sm">
                  {s.step}
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1A1A18]">{s.title}</h3>
                <p className="text-[11px] text-[#78746D] leading-relaxed font-light">{s.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          9. BOTTOM BANNER CTA (MIDNIGHT NAVY & GOLD)
          ══════════════════════════════════════════════════════════════════ */}
      <section id="get-concepts" className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 sm:pt-16">
        <div className="bg-[#1C2D42] rounded-3xl p-8 sm:p-12 md:p-14 text-white relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#304866]">
          
          {/* Background Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#28405E] via-[#1C2D42] to-[#121E2C] pointer-events-none" />

          <div className="space-y-3 relative z-10 max-w-xl text-center md:text-left">
            <span className="text-xs font-sans uppercase tracking-[0.24em] text-[#DFC299] font-bold block">
              Ready to make every moment memorable?
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Get 3 Employee Gifting Concepts
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Tell us a bit about your requirements and we&apos;ll curate the perfect options for you.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/corporate#curation-inquiry"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#BFA267] hover:bg-[#D4B67A] text-[#1A1A18] font-sans text-xs uppercase tracking-[0.18em] font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 group cursor-pointer"
            >
              <span>GET 3 CONCEPTS</span>
              <ArrowRight className="w-4 h-4 text-[#1A1A18] group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
