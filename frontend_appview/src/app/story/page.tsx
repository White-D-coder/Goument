'use client';

import React from 'react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TextReveal } from '@/components/motion/TextReveal';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { ImageReveal } from '@/components/motion/ImageReveal';

const STORY_SECTIONS = [
  {
    label: 'Origin',
    heading: 'Born from the belief that a gift should outlast the occasion.',
    body: 'The Gourmet Gifts Co. was founded with a singular conviction: that the act of giving deserves the same care, craft, and attention to detail as the finest objects in the world. We set out to create presentations that honour both the giver and the receiver.',
    image: '/images/hero/hero_highres_1.png',
  },
  {
    label: 'Philosophy',
    heading: 'Not packaging. Keepsakes.',
    body: 'Every tin, chest, and box we create is designed with a second life in mind. Our velvet chests become jewellery boxes. Our tins become heirloom vessels. Our frames hold the memories that matter. Nothing is discarded.',
    image: '/images/Category_image/premium_velvet/royale2.jpeg',
  },
  {
    label: 'Craft',
    heading: 'Shaped by hands that understand time.',
    body: 'We work with master artisans across India — metalworkers in Delhi NCR, velvet upholsterers in Jaipur, woodcrafters in Mumbai. Each piece passes through dozens of hands before it reaches yours.',
    image: '/images/Category_image/Royale_tin_tin/tin1.jpeg',
  },
];

export default function StoryPage() {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="pt-[140px] pb-[60px] md:pt-[160px] md:pb-[80px] px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal animation="fadeUp">
            <span className="type-meta text-[#B5AFA6] block mb-4">About</span>
            <h1 className="type-display text-[#1A1A18]" style={{ fontSize: 'clamp(42px, 7vw, 80px)' }}>
              Our Story
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-[80px] md:py-[120px] px-6 lg:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <TextReveal
            as="h2"
            className="type-serif-body text-[#1A1A18]"
            stagger={0.03}
          >
            We believe a gift is not a transaction. It is an expression of how deeply someone matters.
          </TextReveal>
        </div>
      </section>

      {/* Story Sections — Alternating Editorial */}
      {STORY_SECTIONS.map((section, idx) => (
        <section key={idx} className="pb-[100px] md:pb-[140px] px-6 lg:px-10">
          <div className="max-w-[1280px] mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}>
              {/* Image */}
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:col-start-7' : ''}`}>
                {idx % 2 === 0 ? (
                  <ImageReveal
                    src={section.image}
                    alt={section.heading}
                    aspect="aspect-[4/5]"
                  />
                ) : (
                  <ParallaxImage
                    src={section.image}
                    alt={section.heading}
                    aspect="aspect-[4/5]"
                    speed={0.1}
                  />
                )}
              </div>

              {/* Text */}
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <ScrollReveal animation="fadeUp" delay={0.15}>
                  <div className="space-y-5 max-w-md">
                    <span className="type-meta text-[#B5AFA6] block">{section.label}</span>
                    <h2 className="type-heading text-[#1A1A18]" style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}>
                      {section.heading}
                    </h2>
                    <p className="type-body text-[#8A8680] text-sm">
                      {section.body}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Materials */}
      <section className="py-[100px] md:py-[140px] px-6 lg:px-10 bg-[#1A1A18]">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal animation="fadeUp">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="type-meta text-[#B5AFA6] block mb-4">Materials</span>
              <h2 className="type-heading text-[#F6F4EF]">
                Every element is chosen with intention.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal staggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-[960px] mx-auto">
            {[
              { name: 'Tinplate', detail: 'Architectural metalwork with anti-corrosion coating' },
              { name: 'Velvet', detail: 'High-pile royal fabric with solid wood sub-frame' },
              { name: 'Soy Wax', detail: '100% organic botanical soy with essential oils' },
              { name: 'Linen Board', detail: 'FSC-certified 400gsm with gold hot-foil' },
            ].map((material, idx) => (
              <div key={idx} className="text-center">
                <h4 className="type-title text-[#F6F4EF] mb-2">{material.name}</h4>
                <p className="type-micro text-[#8A8680]">{material.detail}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Closing */}
      <section className="py-[120px] md:py-[160px] px-6 lg:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <TextReveal
            as="h2"
            className="type-serif-body text-[#1A1A18]"
            stagger={0.03}
          >
            The art of gifting is the art of attention.
          </TextReveal>
          <ScrollReveal animation="fadeIn" delay={0.5}>
            <div className="w-16 h-px bg-[#E0DDD6] mx-auto mt-12" />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
