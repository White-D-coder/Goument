'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { openWhatsAppInquiry } from '@/lib/whatsapp';
import toast from 'react-hot-toast';

export const BUDGET_OPTIONS = [
  '₹500 – ₹999',
  '₹1,000 – ₹1,499',
  '₹1,500 – ₹2,499',
  '₹2,500 – ₹4,999',
  '₹5,000+',
  'Custom / Undecided',
];

export const QUANTITY_OPTIONS = [
  '25 - 50',
  '50 - 100',
  '100 - 250',
  '250 - 500',
  '500+',
];

export const InquiryModal: React.FC = () => {
  const { isOpen, options, closeInquiryModal } = useInquiryModal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: options.defaultBudget || '₹1,000 – ₹1,499',
    quantity: options.defaultQuantity || '50 - 100',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default options when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        budget: options.defaultBudget || prev.budget || '₹1,000 – ₹1,499',
        quantity: options.defaultQuantity || prev.quantity || '50 - 100',
      }));
    }
  }, [isOpen, options]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in your Name, Email, and Phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Send inquiry to email endpoint
      fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          occasion: options.occasion || 'General Curation',
          source: options.source || 'Inquiry Pop-up Modal',
        }),
      }).catch((err) => console.error('Email inquiry trigger error:', err));

      // 2. Open WhatsApp with structured inquiry message
      openWhatsAppInquiry({
        pageName: options.source || 'The Gourmet Gifts Website',
        occasion: options.occasion || 'General Curation',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        quantity: formData.quantity,
      });

      toast.success('Enquiry initiated via WhatsApp concierge!');
      closeInquiryModal();
    } catch (error) {
      console.error('Inquiry submission error:', error);
      toast.error('Failed to submit. Opening WhatsApp concierge directly...');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeInquiryModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl sm:rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#EAE5DC] text-[#1A1A18] z-10"
          >
            {/* Close Button */}
            <button
              onClick={closeInquiryModal}
              className="absolute top-5 right-5 p-2 rounded-full text-[#78746D] hover:text-[#1A1A18] hover:bg-[#FAF8F5] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7 pt-2">
              {/* Row 1: Name, Email, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                {/* Your Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 text-xs sm:text-sm text-[#1A1A18] placeholder-[#A09A90] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 text-xs sm:text-sm text-[#1A1A18] placeholder-[#A09A90] focus:outline-none transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 text-xs sm:text-sm text-[#1A1A18] placeholder-[#A09A90] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Target Budget & Estimated Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                {/* Target Budget */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 text-xs sm:text-sm text-[#1A1A18] focus:outline-none cursor-pointer"
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimated Quantity */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Estimated Quantity
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 text-xs sm:text-sm text-[#1A1A18] focus:outline-none cursor-pointer"
                  >
                    {QUANTITY_OPTIONS.map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Submit Button & Direct Concierge Note */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-7 py-3.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white text-xs font-mono uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 rounded-lg shrink-0 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#DFC299]" />
                  <span>{isSubmitting ? 'SENDING...' : 'SEND CURATION ENQUIRY'}</span>
                </button>

                <div className="text-xs text-[#78746D] font-light text-left sm:text-right">
                  Direct concierge:{' '}
                  <a
                    href="mailto:hello@thegourmetgifts.co"
                    className="text-[#1A1A18] font-normal underline hover:text-[#8C6228] transition-colors"
                  >
                    hello@thegourmetgifts.co
                  </a>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
