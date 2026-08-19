'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface PrivateCatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEdition?: string;
}

export const PrivateCatalogueModal: React.FC<PrivateCatalogueModalProps> = ({
  isOpen,
  onClose,
  initialEdition,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    edition: initialEdition || 'All Collections',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please enter your name and email address.');
      return;
    }
    setSubmitted(true);
    toast.success('Catalogue request received! Our concierge will email you the full collection dossier.', {
      style: { background: '#2C3228', color: '#FAF7F2', border: '1px solid #E4E0D7' },
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-xl bg-[#FAF7F2] border border-[#E4E0D7] text-[#2C3228] p-6 sm:p-10 shadow-2xl z-10 my-8 overflow-hidden font-sans text-left"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-white border border-[#E4E0D7] text-[#2C3228] hover:bg-[#E4E0D7]/40 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-5">
                <CheckCircle2 className="w-12 h-12 text-[#52604D] mx-auto" />
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C3228]">
                    Catalogue Dispatched
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7A8275] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. The digital catalogue has been sent to <strong>{formData.email}</strong>.
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#2C3228] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#434B3E] transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#52604D] font-bold block">
                    Curated Showcase
                  </span>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2C3228]">
                    Request Catalogue
                  </h2>
                  <p className="text-xs text-[#7A8275] leading-relaxed">
                    Receive the complete high-resolution collection lookbook and bespoke concierge details.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#2C3228] font-bold block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full px-4 py-2.5 bg-white border border-[#E4E0D7] text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-[#2C3228] font-bold block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@domain.com"
                        className="w-full px-4 py-2.5 bg-white border border-[#E4E0D7] text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-[#2C3228] font-bold block">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-white border border-[#E4E0D7] text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#2C3228] font-bold block">
                      Collection of Interest
                    </label>
                    <select
                      value={formData.edition}
                      onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-[#E4E0D7] text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                    >
                      <option value="All Collections">All Collections (Full Lookbook)</option>
                      <option value="Royale Tin Tin">The Royale Tin Tin</option>
                      <option value="Premium Velvet">The Velvet Chest Collection</option>
                      <option value="The Classics">The Classics Heritage</option>
                      <option value="Bespoke Inquiries">Bespoke Custom Gifting</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#2C3228] font-bold block">
                      Enquiry Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Occasion, estimated volume, or special requests..."
                      className="w-full px-4 py-2 bg-white border border-[#E4E0D7] text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2C3228] hover:bg-[#434B3E] text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
