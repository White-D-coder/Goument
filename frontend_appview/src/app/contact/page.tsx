'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || 'Not Provided',
          occasion: formData.subject,
          message: formData.message.trim(),
          source: 'Website Contact Page',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        toast.success('Your enquiry has been dispatched to our team!');
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Inquiry Submission Error:', err);
      toast.error('Network error. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
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
                      Thank you, {formData.name}. Our concierge team has received your enquiry and will respond within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
                      }}
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
                        <label className="type-meta text-[#1A1A18] block">Name *</label>
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
                        <label className="type-meta text-[#1A1A18] block">Email *</label>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="type-meta text-[#1A1A18] block">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-0 py-3 bg-transparent border-b border-[#E0DDD6] type-body text-[#1A1A18] text-sm placeholder:text-[#B5AFA6] focus:outline-none focus:border-[#1A1A18] transition-colors"
                        />
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
                          <option>Press &amp; Media</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="type-meta text-[#1A1A18] block">Message *</label>
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
                      disabled={isSubmitting}
                      className="editorial-link type-meta text-[#1A1A18] inline-flex items-center gap-2 pt-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </form>
                )}
              </ScrollReveal>
            </div>

            {/* Right — Contact Details & Locations */}
            <div className="lg:col-span-5">
              <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="space-y-7 lg:pt-2">
                  
                  {/* Email */}
                  <div className="space-y-1">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] font-medium text-[#8C6228] block">
                      Email
                    </span>
                    <a
                      href="mailto:hello@thegourmetgifts.co"
                      className="text-xs sm:text-[13.5px] font-light text-[#3A3833] hover:text-[#8C6228] transition-colors leading-relaxed block"
                    >
                      hello@thegourmetgifts.co
                    </a>
                  </div>

                  {/* Studio */}
                  <div className="space-y-1">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] font-medium text-[#8C6228] block">
                      Studio
                    </span>
                    <p className="text-xs sm:text-[13.5px] font-light text-[#3A3833] leading-relaxed">
                      Mumbai, India
                    </p>
                  </div>

                  {/* Corporate Office */}
                  <div className="space-y-1">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] font-medium text-[#8C6228] block">
                      Corporate Office
                    </span>
                    <p className="text-xs sm:text-[13.5px] font-light text-[#3A3833] leading-relaxed">
                      1702, 17th floor, INNOV8 PARINEE CRESCENZO, CRESCENZO BUILDING, OPPO. MCA GROUND, BANDRA KURLA COMPLEX, PLOT NO C-38/39, G BLOCK, BANDRA EAST, MUMBAI - 400051
                    </p>
                  </div>

                  {/* Warehouse */}
                  <div className="space-y-1">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] font-medium text-[#8C6228] block">
                      Warehouse
                    </span>
                    <p className="text-xs sm:text-[13.5px] font-light text-[#3A3833] leading-relaxed">
                      Sharda Bhavan, Opposite Gala Provision Store, Fatak Road/Narayan Joshi Road, Kandivali West, Mumbai – 400067
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
