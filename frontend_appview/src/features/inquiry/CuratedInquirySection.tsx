'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Send, 
  CheckCircle2, 
  Package, 
  Trash2, 
  Plus, 
  Minus,
} from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

export default function CuratedInquirySection() {
  const { items: cartItems, updateQuantity, removeItem, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    occasion: 'Festive / Corporate Gifting',
    quantity: '50 - 200 units',
    targetDate: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    name: string;
    email: string;
    itemsList: string[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please provide your name, email, and phone number.');
      return;
    }

    const attachedItemsSummary = cartItems.map(
      (item) => `${item.name} (${item.quantity} units)`
    );

    setSubmittedSnapshot({
      name: formData.name,
      email: formData.email,
      itemsList: attachedItemsSummary,
    });

    setSubmitted(true);

    toast.success('Your Curation Enquiry has been dispatched to our Concierge!', {
      style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #BFA267' },
      duration: 3500,
    });
  };

  return (
    <section id="curation-inquiry" className="pt-4 sm:pt-8 md:pt-12 pb-6 sm:pb-12 px-3 sm:px-6 lg:px-10 relative overflow-hidden bg-[#FAF8F5] text-[#1A1A18] scroll-mt-20">
      
      {/* ── LUXURY SATRA WATERMARK BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden select-none">
        <span
          className="text-[72px] sm:text-[180px] md:text-[280px] lg:text-[360px] font-light tracking-[0.2em] text-[#1A1A18]/[0.03] uppercase whitespace-nowrap"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          SATRA
        </span>
      </div>

      <div className="max-w-[1360px] mx-auto space-y-4 sm:space-y-8 relative z-10">

        {/* ─── SECTION HEADER (CLEAN & MINIMAL) ─── */}
        <div className="text-center max-w-2xl mx-auto py-1 sm:py-2 space-y-1">
          <ScrollReveal animation="fadeUp">
            <h2
              className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Bespoke Curation Enquiry
            </h2>
          </ScrollReveal>
        </div>

        {/* ─── MAIN CONTAINER (RESPONSIVE CORNERS & COMPACT MOBILE SPACING) ─── */}
        <div className="relative rounded-2xl sm:rounded-tl-[40px] sm:rounded-br-[40px] sm:rounded-tr-none sm:rounded-bl-none border border-[#D9D5CC] shadow-none overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white/95 backdrop-blur-md">

          {/* ── LEFT COLUMN: ATTACHED SAMPLES (5 Cols - Compact on Mobile) ── */}
          <div className="lg:col-span-5 bg-[#FAF8F5]/90 p-4 sm:p-7 md:p-9 flex flex-col justify-between space-y-4 sm:space-y-6">
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between pb-0.5">
                <h3
                  className="text-lg sm:text-2xl font-light text-[#1A1A18]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Attached Samples
                </h3>
                <span className="text-[11px] sm:text-xs font-semibold text-[#7A8B6F] bg-[#EBF3E8] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-[#7A8B6F]/20">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              {cartItems.length > 0 ? (
                <div className="space-y-2.5 max-h-[220px] sm:max-h-[340px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-none border-b border-[#E0DDD6] p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-none"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        {item.image && (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-none overflow-hidden bg-[#FAF6F0] relative shrink-0 border border-[#EADBCA]">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="text-left space-y-0.5 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#1A1A18] truncate">
                            {item.name}
                          </h4>
                          <span className="text-[9.5px] sm:text-[10px] text-[#7A8B6F] font-semibold block">
                            Qty: {item.quantity} sample{item.quantity > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            if (item.quantity <= 1) {
                              removeItem(item.id);
                            } else {
                              updateQuantity(item.id, item.quantity - 1);
                            }
                          }}
                          className="w-6 h-6 rounded bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#1A1A18] min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#451B27] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 ml-0.5 flex items-center justify-center text-[#8A8680] hover:text-[#7A1C29] transition-colors"
                          title="Remove sample"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/60 sm:bg-transparent rounded-lg sm:rounded-none p-3 sm:p-6 text-center flex sm:flex-col items-center justify-center gap-2">
                  <Package className="w-4 h-4 sm:w-6 sm:h-6 text-[#BFA267] shrink-0 opacity-70" />
                  <p className="text-[11px] sm:text-xs text-[#78746D]">
                    No samples attached yet.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* ── RIGHT COLUMN: EDITORIAL UNDERLINE FORM (7 Cols) ── */}
          <div className="lg:col-span-7 bg-white/95 p-4 sm:p-8 md:p-10 text-left flex flex-col justify-between">
            
            {submitted && submittedSnapshot ? (
              <div className="space-y-4 sm:space-y-6 py-6 sm:py-8 text-center my-auto">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EBF3E8] border border-[#7A8B6F] flex items-center justify-center mx-auto text-[#7A8B6F]">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <span className="text-[9.5px] sm:text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#7A8B6F]">
                    ENQUIRY DISPATCHED
                  </span>
                  <h3
                    className="text-xl sm:text-3xl font-light text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Thank you, {submittedSnapshot.name}.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78746D] max-w-md mx-auto leading-relaxed">
                    Our team will contact you at <strong>{submittedSnapshot.email}</strong> shortly.
                  </p>
                </div>

                {submittedSnapshot.itemsList.length > 0 && (
                  <div className="bg-[#FAF8F5] p-3.5 border border-[#E0DDD6] max-w-md mx-auto text-left space-y-1">
                    <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#7A8B6F] block font-bold">
                      Attached Samples:
                    </span>
                    <ul className="text-xs text-[#1A1A18] space-y-0.5 list-disc list-inside">
                      {submittedSnapshot.itemsList.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => {
                    setSubmitted(false);
                    clearCart();
                  }}
                  className="px-5 py-2.5 rounded-none bg-[#1A1A18] hover:bg-[#451B27] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Start Another Curation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                <div className="pb-0.5">
                  <h3
                    className="text-xl sm:text-3xl font-light text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Tell Us About Your Project
                  </h3>
                </div>

                {/* Underline Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Full Name"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Company Name"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 Mobile Number"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Estimated Units */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Estimated Units
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option>25 - 50 units</option>
                      <option>50 - 200 units</option>
                      <option>200 - 500 units</option>
                      <option>500+ units (Institutional Scale)</option>
                    </select>
                  </div>

                  {/* Delivery Location */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Delivery Location
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City / State"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Custom Notes */}
                <div className="space-y-1 pt-0.5">
                  <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Specific Requests / Timeline
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any custom branding, diet preferences or timeline requirements..."
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-1.5 sm:py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 sm:py-4 bg-[#1A1A18] hover:bg-[#38332B] text-white text-xs font-mono uppercase tracking-[0.16em] sm:tracking-[0.2em] transition-all shadow-none flex items-center justify-center gap-2 cursor-pointer active:scale-98 rounded-none"
                >
                  <Send className="w-3.5 h-3.5 text-[#DFC299]" />
                  <span>SEND CURATION PROPOSAL</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
