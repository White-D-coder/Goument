'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useInquiryModal } from '@/hooks/useInquiryModal';
import { openWhatsAppInquiry } from '@/lib/whatsapp';
import toast from 'react-hot-toast';
import { useUserLocation } from '@/hooks/useUserLocation';

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
  const userLoc = useUserLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    budget: options.defaultBudget || '₹1,000 – ₹1,499',
    quantity: options.defaultQuantity || '50 - 100',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync default options and location when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        city: prev.city || userLoc.fullLocation || '',
        budget: options.defaultBudget || prev.budget || '₹1,000 – ₹1,499',
        quantity: options.defaultQuantity || prev.quantity || '50 - 100',
      }));
    }
  }, [isOpen, options, userLoc.fullLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error('Please fill in your Name, Email, and Phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Send inquiry to email endpoint (dispatches email to hello@thegourmetgifts.co)
      fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          occasion: options.occasion || 'General Curation',
          source: options.source || 'Floating Enquire Widget',
        }),
      }).catch((err) => console.error('Email dispatch error:', err));

      // 2. Open WhatsApp with pre-filled structured inquiry
      openWhatsAppInquiry({
        pageName: options.source || 'The Gourmet Gifts Website',
        occasion: options.occasion || 'General Curation',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        quantity: formData.quantity,
      });

      toast.success('Enquiry initiated via WhatsApp & Email dispatched!');
      // Reset & close
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        budget: options.defaultBudget || '₹1,000 – ₹1,499',
        quantity: options.defaultQuantity || '50 - 100',
      });
      closeInquiryModal();
    } catch (error) {
      console.error('Inquiry submission error:', error);
      openWhatsAppInquiry({
        pageName: options.source || 'The Gourmet Gifts Website',
        occasion: options.occasion || 'General Curation',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        budget: formData.budget,
        quantity: formData.quantity,
      });
      closeInquiryModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 pointer-events-auto">
          {/* Floating Card right above the bottom-right button - NO dark backdrop, NO blur, background page remains clickable and scrollable */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="w-[calc(100vw-2rem)] sm:w-[480px] max-h-[82vh] overflow-y-auto bg-white rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.22)] border border-[#EAE5DC] text-[#1A1A18] relative"
          >
            {/* Header: Title + Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0ECE1] mb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#8C6228] uppercase font-semibold block">
                  Bespoke Curation
                </span>
                <h3
                  className="text-xl sm:text-2xl font-light text-[#1A1A18] leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Quick Curation Enquiry
                </h3>
              </div>
              <button
                onClick={closeInquiryModal}
                className="p-1.5 rounded-full text-[#78746D] hover:text-[#1A1A18] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Close form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

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

              {/* Delivery Location Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Delivery Location / City
                  </label>
                  {userLoc.isAutoDetected && formData.city && (
                    <span className="text-[9.5px] text-[#8C7449] font-medium">
                      📍 Auto-detected
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai, Delhi, Bengaluru"
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 text-xs sm:text-sm text-[#1A1A18] placeholder-[#A09A90] focus:outline-none transition-colors pr-14"
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

              {/* Row 3: Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#1A1A18] hover:bg-[#2C241D] text-white text-xs font-mono uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2.5 rounded-xl cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 active:scale-[0.99]"
                >
                  <Send className="w-3.5 h-3.5 text-[#DFC299]" />
                  <span>{isSubmitting ? 'SENDING...' : 'SEND CURATION ENQUIRY'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
