'use client';

import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { SectionHeader } from '@/components/editorial/SectionHeader';
import toast from 'react-hot-toast';

const SERVICES = [
  {
    title: 'Custom Branding',
    body: 'Logo embossing, branded sleeves, monogrammed ribbon, and personalised insert cards.',
  },
  {
    title: 'Curated Collections',
    body: 'Select from our catalogue or work with our team to design a bespoke curation.',
  },
  {
    title: 'Event Gifting',
    body: 'Diwali, New Year, weddings, milestones — occasion-specific presentations at scale.',
  },
  {
    title: 'Fulfilment',
    body: 'Pan-India delivery with individual addressing, gift notes, and quality assurance.',
  },
];

export default function CorporatePage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    occasion: 'Corporate Gifting',
    quantity: '50-100',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please provide your name and email.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="pt-[140px] pb-[80px] md:pt-[160px] md:pb-[100px] px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            <ScrollReveal animation="fadeUp">
              <div className="max-w-lg">
                <span className="type-meta text-[#B5AFA6] block mb-4">Corporate & Bespoke</span>
                <h1 className="type-display text-[#1A1A18]" style={{ fontSize: 'clamp(42px, 7vw, 80px)' }}>
                  Corporate Gifting
                </h1>
                <p className="type-body text-[#8A8680] mt-5 text-sm max-w-md">
                  Premium curated collections for organisations that understand the value of a considered, beautifully presented gift.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fadeUp" delay={0.2}>
              <ParallaxImage
                src="/images/hero/hero_highres_2.png"
                alt="Corporate Gifting"
                aspect="aspect-[4/3]"
                speed={0.08}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-[100px] md:py-[140px] px-6 lg:px-10 border-t border-[#E0DDD6]">
        <div className="max-w-[1280px] mx-auto">
          <SectionHeader
            label="Services"
            heading="What We Offer"
            className="mb-16"
          />

          <ScrollReveal staggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="space-y-3">
                <span className="type-micro text-[#B5AFA6] block">0{idx + 1}</span>
                <h3 className="type-title text-[#1A1A18]">{service.title}</h3>
                <p className="type-body text-[#8A8680] text-sm">{service.body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-[100px] md:py-[140px] px-6 lg:px-10 bg-[#EFEDE7]">
        <div className="max-w-[960px] mx-auto">
          <SectionHeader
            label="Enquire"
            heading="Request Corporate Catalogue"
            body="Share your requirements and our corporate concierge team will respond within 24 hours."
            className="mb-12"
          />

          {submitted ? (
            <ScrollReveal animation="fadeUp">
              <div className="py-16 text-center space-y-5">
                <CheckCircle2 className="w-12 h-12 text-[#7A8B6F] mx-auto" />
                <h3 className="type-title text-[#1A1A18]">Enquiry Received</h3>
                <p className="type-body text-[#8A8680] text-sm max-w-md mx-auto">
                  Thank you, {formData.name}. Our corporate concierge team will be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="type-meta text-[#1A1A18] editorial-link inline-flex items-center gap-1.5 mt-4 cursor-pointer"
                >
                  Submit Another <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal animation="fadeUp">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'Full Name', key: 'name', type: 'text', required: true, placeholder: 'Your name' },
                    { label: 'Company', key: 'company', type: 'text', required: false, placeholder: 'Organisation name' },
                    { label: 'Email', key: 'email', type: 'email', required: true, placeholder: 'email@company.com' },
                    { label: 'Phone', key: 'phone', type: 'tel', required: false, placeholder: '+91 98765 43210' },
                  ].map((field) => (
                    <div key={field.key} className="space-y-2">
                      <label className="type-meta text-[#1A1A18] block">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm placeholder:text-[#B5AFA6] focus:outline-none focus:border-[#1A1A18] transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="type-meta text-[#1A1A18] block">Occasion</label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm focus:outline-none focus:border-[#1A1A18] transition-colors cursor-pointer"
                    >
                      <option>Corporate Gifting</option>
                      <option>Wedding Favours</option>
                      <option>Festive — Diwali / New Year</option>
                      <option>Bespoke Customisation</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="type-meta text-[#1A1A18] block">Estimated Quantity</label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm focus:outline-none focus:border-[#1A1A18] transition-colors cursor-pointer"
                    >
                      <option>10–50</option>
                      <option>50–100</option>
                      <option>100–500</option>
                      <option>500+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="type-meta text-[#1A1A18] block">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Event date, budget range, branding requirements, or any specific requests..."
                    className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm placeholder:text-[#B5AFA6] focus:outline-none focus:border-[#1A1A18] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="editorial-link type-meta text-[#1A1A18] inline-flex items-center gap-2 pt-2 cursor-pointer"
                >
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
