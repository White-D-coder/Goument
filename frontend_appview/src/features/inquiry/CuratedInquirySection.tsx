'use client';

import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ExternalLink,
} from 'lucide-react';
import { openWhatsAppInquiry } from '@/lib/whatsapp';
import toast from 'react-hot-toast';
import { useUserLocation } from '@/hooks/useUserLocation';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export default function CuratedInquirySection() {
  const userLoc = useUserLocation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    occasion: 'Festive / Corporate Gifting',
    quantity: '50 sets',
    targetDate: '',
    message: '',
  });

  // Auto-fill delivery location from detected user location
  React.useEffect(() => {
    if (userLoc.fullLocation && !formData.city) {
      setFormData((prev) => ({ ...prev, city: userLoc.fullLocation }));
    }
  }, [userLoc.fullLocation]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    name: string;
    email: string;
    phone: string;
    company?: string;
    quantity: string;
  } | null>(null);

  const parsedQtyNumber = parseInt(formData.quantity) || 50;

  const handleQtyChange = (val: number) => {
    const safeVal = Math.max(1, isNaN(val) ? 1 : val);
    setFormData({ ...formData, quantity: `${safeVal} ${safeVal === 1 ? 'set' : 'sets'}` });
  };

  const handleStepQty = (delta: number) => {
    const current = parseInt(formData.quantity) || 50;
    const next = Math.max(1, current + delta);
    setFormData({ ...formData, quantity: `${next} ${next === 1 ? 'set' : 'sets'}` });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please provide your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);

    const snapshot = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      quantity: formData.quantity,
    };

    setSubmittedSnapshot(snapshot);

    try {
      // 1. Send via Nodemailer API to hello@thegourmetgifts.co
      await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'The Gourmet Gifts — Bespoke Curation Inquiry Form',
        }),
      });

      // 2. Save to localStorage for client-side tracking
      const past = JSON.parse(localStorage.getItem('gourmet_inquiries') || '[]');
      past.unshift({ ...snapshot, date: new Date().toISOString() });
      localStorage.setItem('gourmet_inquiries', JSON.stringify(past));

      // 3. Open WhatsApp with structured format
      openWhatsAppInquiry({
        pageName: 'Bespoke Curation Concierge',
        occasion: formData.occasion,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        quantity: formData.quantity,
      }, '917021463609');

    } catch (err) {
      console.error('Inquiry dispatch error:', err);
      // Still open WhatsApp if email API fails
      openWhatsAppInquiry({
        pageName: 'Bespoke Curation Concierge',
        occasion: formData.occasion,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        quantity: formData.quantity,
      }, '917021463609');
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Your Curation Enquiry has been dispatched via WhatsApp & Email!', {
        style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 4000,
      });
    }
  };

  return (
    <section id="curation-inquiry" className="pt-4 sm:pt-8 md:pt-12 pb-8 sm:pb-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#FAF8F5] text-[#1A1A18] scroll-mt-20">
      
      {/* ── LUXURY WATERMARK BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden select-none">
        <span
          className="text-[72px] sm:text-[180px] md:text-[280px] lg:text-[340px] font-light tracking-[0.2em] text-[#1A1A18]/[0.03] uppercase whitespace-nowrap"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          GOURMET
        </span>
      </div>

      <div className="max-w-[1000px] mx-auto space-y-6 sm:space-y-8 relative z-10">

        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-3xl mx-auto px-2 space-y-1.5 sm:space-y-2">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Bespoke Curation Enquiry
            </h2>
            <p className="text-xs md:text-sm text-[#78746D] font-light max-w-2xl mx-auto leading-normal">
              Share your gifting vision and our concierge team will prepare a tailored proposal within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── CENTERED CLEAN LUXURY FORM CARD ─── */}
        <div className="relative rounded-[28px] sm:rounded-[36px] border border-[#D9D5CC] bg-white/95 backdrop-blur-md p-6 sm:p-10 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          
          {submitted && submittedSnapshot ? (
            <div className="space-y-4 sm:space-y-6 py-8 sm:py-12 text-center my-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EBF3E8] border border-[#7A8B6F] flex items-center justify-center mx-auto text-[#7A8B6F]">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#7A8B6F]">
                  ENQUIRY DISPATCHED
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-light text-[#1A1A18]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Thank you, {submittedSnapshot.name}.
                </h3>
                <p className="text-xs sm:text-sm text-[#78746D] max-w-md mx-auto leading-relaxed">
                  Our concierge team will review your requirements and reach out to you at <strong>{submittedSnapshot.email}</strong> shortly.
                </p>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#1A1A18] hover:bg-[#38332B] text-white text-[11px] font-mono uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  SEND ANOTHER ENQUIRY
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Row 1: Client Name & Organization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company or Family Office"
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
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
                    placeholder="+91 Mobile Number"
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Occasion, Sets & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                
                {/* Occasion / Theme */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Occasion / Theme
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none cursor-pointer"
                  >
                    <option>Corporate / Client Gifting</option>
                    <option>Employee Onboarding</option>
                    <option>Festive &amp; Diwali</option>
                    <option>Weddings &amp; Celebrations</option>
                    <option>Events &amp; Conferences</option>
                    <option>Milestone Recognition</option>
                    <option>VIP / Executive Hampers</option>
                  </select>
                </div>

                {/* Estimated Gift Sets */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Estimated Gift Sets
                  </label>
                  <div className="flex items-center gap-2 pt-0.5">
                    <div className="inline-flex items-center bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleStepQty(-10)}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors cursor-pointer active:scale-90"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={parsedQtyNumber}
                        onChange={(e) => handleQtyChange(parseInt(e.target.value))}
                        className="w-14 text-center font-bold text-xs sm:text-sm text-[#1A1A18] bg-transparent border-none focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleStepQty(10)}
                        className="w-7 h-7 rounded-md bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#451B27] transition-colors cursor-pointer active:scale-90"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-[#78746D] font-light">sets</span>
                  </div>
                </div>

                {/* Delivery Location */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Delivery Location
                    </label>
                    {userLoc.isAutoDetected && formData.city && (
                      <span className="text-[9.5px] text-[#8C7449] font-medium flex items-center gap-0.5">
                        <span>📍 Auto-detected</span>
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Mumbai, Delhi, Bengaluru"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors pr-14"
                    />
                    {formData.city && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, city: '' })}
                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-[#8C867D] hover:text-[#1A1A18] px-1 py-0.5 underline cursor-pointer"
                      >
                        Change
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8C867D] block pt-0.5">
                    Pre-filled from your location. Edit if delivering to another city.
                  </span>
                </div>

              </div>

              {/* Row 4: Custom Notes */}
              <div className="space-y-1 pt-1">
                <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                  Specific Requests / Timeline
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Any custom branding, packaging preferences, diet requirements or delivery timeline..."
                  className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button & Direct Concierge Action */}
              <div className="pt-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-t border-[#EFECE6]">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3.5 bg-gradient-to-r from-[#1A1A18] via-[#2D2821] to-[#1A1A18] hover:brightness-125 text-white text-xs font-mono uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2 rounded-sm shrink-0 shadow-md ${
                      isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-98'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5 text-[#DFC299]" />
                    <span>{isSubmitting ? 'PREPARING YOUR PROPOSAL...' : 'REQUEST BESPOKE PROPOSAL & PRICING →'}</span>
                  </button>

                  <a
                    href="https://wa.me/917021463609?text=Hello%2C%20I%20would%20like%20to%20get%20an%20instant%20corporate%20gifting%20estimate%20and%20catalogue."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 bg-[#E7F6EC] hover:bg-[#D4EEDC] text-[#1E6B39] border border-[#BDE3CA] text-xs font-mono uppercase tracking-[0.14em] font-semibold flex items-center justify-center gap-2 rounded-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>WhatsApp Quote (1 Min)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-[11px] text-[#78746D] font-mono">
                    ⚡ Concierge response within 2 hours
                  </p>
                  <p className="text-[10px] text-[#A39E95] mt-0.5">
                    3D Digital Mockup &amp; Sample Kit available
                  </p>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
