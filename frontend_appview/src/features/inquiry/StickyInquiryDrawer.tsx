'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export const StickyInquiryDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    occasion: 'Corporate / Client Gifting',
    quantity: '50-100',
    city: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        company: formData.company || 'Not Specified',
        email: formData.email,
        phone: formData.phone || 'Not Specified',
        occasion: formData.occasion,
        quantity: formData.quantity,
        city: formData.city || 'Pan-India',
        message: formData.message,
        source: 'Sticky Quick Inquiry Drawer',
      };

      const res = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Could not submit inquiry');
      }

      setSubmitted(true);
      toast.success('Your curation enquiry has been dispatched to our concierge!');
    } catch {
      toast.error('Could not submit enquiry. Please email hello@thegourmetgifts.co directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ─── STICKY BOTTOM RIGHT CORNER TRIGGER BUTTON ─── */}
      <div className="fixed right-5 sm:right-7 bottom-5 sm:bottom-7 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 bg-[#1A1A18] hover:bg-[#2C241D] text-[#FAF8F5] px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-[#DFC299]/40 hover:border-[#DFC299] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Open Bespoke Enquiry Drawer"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DFC299] group-hover:rotate-12 transition-transform" />
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] font-semibold text-white group-hover:text-[#DFC299] transition-colors">
            ENQUIRE NOW
          </span>
        </button>
      </div>

      {/* ─── SLIDE-IN POPUP DRAWER MODAL ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity"
            />

            {/* Right Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#FAF8F5] text-[#1A1A18] z-50 shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#D9D5CC]"
            >
              {/* Top Header */}
              <div className="p-5 sm:p-6 border-b border-[#E8E4DC] flex items-center justify-between bg-white">
                <div className="space-y-0.5">
                  <span className="text-[9.5px] font-mono font-bold uppercase tracking-[0.22em] text-[#7A8B6F]">
                    PRIVATE CONCIERGE
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-light text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Bespoke Curation Enquiry
                  </h3>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#78746D] hover:text-[#1A1A18] hover:bg-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#EBF3E8] border border-[#7A8B6F] flex items-center justify-center mx-auto text-[#7A8B6F]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1.5">
                      <h4
                        className="text-2xl font-light text-[#1A1A18]"
                        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                      >
                        Thank you, {formData.name}.
                      </h4>
                      <p className="text-xs sm:text-sm text-[#78746D] leading-relaxed">
                        Our gifting concierge will review your brief and share a customized proposal within 24 hours.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setIsOpen(false);
                      }}
                      className="mt-4 px-6 py-2.5 bg-[#1A1A18] text-white text-xs font-mono uppercase tracking-widest cursor-pointer"
                    >
                      CLOSE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-xs text-[#78746D] font-light leading-relaxed">
                      Tell us about your gifting requirement and our team will craft a bespoke proposal.
                    </p>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aditi Sharma"
                        className="w-full bg-white border border-[#D0CBC0] focus:border-[#1A1A18] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Company */}
                    <div className="space-y-1">
                      <label className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company name"
                        className="w-full bg-white border border-[#D0CBC0] focus:border-[#1A1A18] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@company.com"
                          className="w-full bg-white border border-[#D0CBC0] focus:border-[#1A1A18] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                          Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 Mobile number"
                          className="w-full bg-white border border-[#D0CBC0] focus:border-[#1A1A18] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Occasion & Quantity Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                          Occasion
                        </label>
                        <select
                          value={formData.occasion}
                          onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                          className="w-full bg-white border border-[#D0CBC0] focus:border-[#1A1A18] rounded-lg px-2.5 py-2 text-xs text-[#1A1A18] focus:outline-none"
                        >
                          <option>Corporate / Client Gifting</option>
                          <option>Employee Onboarding</option>
                          <option>Festive & Diwali</option>
                          <option>Weddings & Celebrations</option>
                          <option>Events & Conferences</option>
                          <option>Milestone Recognition</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                          Estimated Quantity
                        </label>
                        <select
                          value={formData.quantity}
                          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                          className="w-full bg-white border border-[#D0CBC0] focus:border-[#1A1A18] rounded-lg px-2.5 py-2 text-xs text-[#1A1A18] focus:outline-none"
                        >
                          <option>25 - 50</option>
                          <option>50 - 100</option>
                          <option>100 - 250</option>
                          <option>250 - 500</option>
                          <option>500+</option>
                        </select>
                      </div>
                    </div>

                    {/* Message / Brief */}
                    <div className="space-y-1">
                      <label className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                        Brief / Requirements
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about branding, packaging preferences, delivery timeline..."
                        className="w-full bg-white border border-[#D0CBC0] focus:border-[#1A1A18] rounded-lg px-3 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-[#1A1A18] hover:bg-[#2E2822] text-white text-xs font-mono uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 rounded-lg cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-[#DFC299]" />
                        <span>{isSubmitting ? 'DISPATCHING...' : 'SEND INQUIRY'}</span>
                      </button>
                    </div>

                    <p className="text-[10.5px] text-[#78746D] text-center pt-1 font-light">
                      Direct Concierge: <a href="mailto:hello@thegourmetgifts.co" className="underline font-medium text-[#1A1A18]">hello@thegourmetgifts.co</a>
                    </p>
                  </form>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
