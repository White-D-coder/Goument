'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="pt-[140px] pb-[80px] md:pt-[160px] md:pb-[100px] px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <ScrollReveal animation="fadeUp">
            <div className="max-w-lg">
              <span className="type-meta text-[#B5AFA6] block mb-4">Get in Touch</span>
              <h1 className="type-display text-[#1A1A18]" style={{ fontSize: 'clamp(42px, 7vw, 80px)' }}>
                Contact
              </h1>
              <p className="type-body text-[#8A8680] mt-5 text-sm">
                For enquiries, collaborations, or corporate gifting requests.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Two-Column Layout */}
      <section className="pb-[120px] md:pb-[160px] px-6 lg:px-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left — Form */}
            <div className="lg:col-span-7">
              <ScrollReveal animation="fadeUp">
                {submitted ? (
                  <div className="py-16 space-y-5">
                    <CheckCircle2 className="w-10 h-10 text-[#7A8B6F]" />
                    <h3 className="type-title text-[#1A1A18]">Message Sent</h3>
                    <p className="type-body text-[#8A8680] text-sm max-w-md">
                      Thank you, {formData.name}. We'll respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="editorial-link type-meta text-[#1A1A18] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Send Another</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="type-meta text-[#1A1A18] block">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm placeholder:text-[#B5AFA6] focus:outline-none focus:border-[#1A1A18] transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="type-meta text-[#1A1A18] block">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@domain.com"
                          className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm placeholder:text-[#B5AFA6] focus:outline-none focus:border-[#1A1A18] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="type-meta text-[#1A1A18] block">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm focus:outline-none focus:border-[#1A1A18] transition-colors cursor-pointer"
                      >
                        <option>General Enquiry</option>
                        <option>Corporate Gifting</option>
                        <option>Custom Order</option>
                        <option>Collaboration</option>
                        <option>Press & Media</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="type-meta text-[#1A1A18] block">Message</label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm placeholder:text-[#B5AFA6] focus:outline-none focus:border-[#1A1A18] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="editorial-link type-meta text-[#1A1A18] inline-flex items-center gap-2 pt-2 cursor-pointer"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Right — Contact Details */}
            <div className="lg:col-span-5">
              <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="space-y-12 lg:pt-2">
                  <div className="space-y-2">
                    <span className="type-meta text-[#B5AFA6] block">Email</span>
                    <a
                      href="mailto:hello@thegourmetgifts.co"
                      className="type-body text-[#1A1A18] text-sm hover:text-[#8A8680] transition-colors"
                    >
                      hello@thegourmetgifts.co
                    </a>
                  </div>

                  <div className="space-y-2">
                    <span className="type-meta text-[#B5AFA6] block">Studio</span>
                    <p className="type-body text-[#1A1A18] text-sm">
                      Mumbai & Delhi NCR, India
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="type-meta text-[#B5AFA6] block">Hours</span>
                    <p className="type-body text-[#1A1A18] text-sm">
                      Monday – Saturday<br />
                      10:00 AM – 7:00 PM IST
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E0DDD6]">
                    <p className="type-micro text-[#B5AFA6]">
                      For corporate enquiries of 50+ units, please visit our{' '}
                      <a href="/corporate" className="text-[#1A1A18] hover:underline">corporate page</a>.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
