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
  Check
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
    company: string;
    itemCount: number;
    itemsList: string[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please provide your name, email, and phone number.', {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      });
      return;
    }

    const itemsSummary = cartItems.map((i) => `${i.name} (x${i.quantity})`);

    setSubmittedSnapshot({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      itemCount: cartItems.reduce((acc, i) => acc + i.quantity, 0),
      itemsList: itemsSummary,
    });

    setSubmitted(true);
    toast.success('Your Curation Inquiry has been dispatched to our Private Concierge!', {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      duration: 3500,
    });
  };

  return (
    <section id="curation-inquiry" className="pt-2 sm:pt-8 md:pt-12 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-10 relative overflow-hidden text-[#1A1A18]">
      
      {/* ── ARCHITECTURAL HERITAGE BACKGROUND FOR THE ENTIRE SECTION ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/small_anipics/pexels-monurblc-38696026.jpg"
          alt="Architectural Heritage Background"
          fill
          priority
          className="object-cover object-center filter brightness-[0.99]"
        />
        {/* Soft Warm Limestone Veil for Crisp Contrast */}
        <div className="absolute inset-0 bg-[#F1F0EB]/5 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-[1360px] mx-auto space-y-6 sm:space-y-8 relative z-10">

        {/* ─── SECTION HEADER (3-WORD TITLE & 1-LINE SUBTITLE) ─── */}
        <div className="text-center max-w-3xl mx-auto py-2 sm:py-5 md:py-6 space-y-2">
          <ScrollReveal animation="fadeUp">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-light text-[#ffffff] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Bespoke Curation Inquiry
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.08}>
            <p className="text-xs sm:text-sm md:text-base text-[#ffffff] font-light max-w-3xl mx-auto leading-normal whitespace-normal md:whitespace-nowrap">
              Selected keepsake items above will automatically attach to this tailored inquiry.
            </p>
          </ScrollReveal>
        </div>

        {/* ─── MAIN ASYMMETRIC CONTAINER (DIAGONAL 0px CORNERS + NO SHADOW) ─── */}
        <div className="relative rounded-tl-3xl sm:rounded-tl-[40px] rounded-br-3xl sm:rounded-br-[40px] rounded-tr-none rounded-bl-none border border-[#D9D5CC] shadow-none overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white/95 backdrop-blur-md">

          {/* ── LEFT COLUMN: ATTACHED CURATION SAMPLES (5 Cols) ── */}
          <div className="lg:col-span-5 bg-[#FAF8F5]/90 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-[#E0DDD6] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E0DDD6]">
                <h3
                  className="text-xl sm:text-2xl font-light text-[#1A1A18]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Attached Curation Samples
                </h3>
                <span className="text-xs font-semibold text-[#7A8B6F] bg-[#EBF3E8] px-3 py-1 rounded-full border border-[#7A8B6F]/20">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>

              {/* Items List */}
              {cartItems.length > 0 ? (
                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-none border-b border-[#E0DDD6] p-3 flex items-center justify-between gap-3 shadow-none"
                    >
                      <div className="flex items-center gap-3">
                        {item.image && (
                          <div className="w-12 h-12 rounded-none overflow-hidden bg-[#FAF6F0] relative shrink-0 border border-[#EADBCA]">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                        )}
                        <div className="text-left space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-semibold text-[#1A1A18] line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-[#7A8B6F] font-semibold block">
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
                          className="w-6 h-6 ml-1 flex items-center justify-center text-[#8A8680] hover:text-[#7A1C29] transition-colors"
                          title="Remove sample"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/70 rounded-none p-6 border border-dashed border-[#DDD8CE] text-center space-y-2">
                  <Package className="w-7 h-7 text-[#BFA267] mx-auto opacity-70" />
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1A18]">No Specific Samples Attached Yet</h4>
                  <p className="text-xs text-[#78746D] leading-relaxed">
                    You can still submit your general inquiry, or select any box or delicacy above to attach it.
                  </p>
                </div>
              )}
            </div>

            {/* Atelier Guarantees */}
            <div className="pt-4 border-t border-[#E0DDD6] space-y-2 text-left text-xs text-[#78746D]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#7A8B6F] shrink-0" />
                <span>Custom Corporate Logo &amp; Monogramming Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#7A8B6F] shrink-0" />
                <span>Multi-City Direct Pan-India Desk Fulfillment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#7A8B6F] shrink-0" />
                <span>Dedicated Relationship Concierge &amp; Sample Kits</span>
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: EDITORIAL UNDERLINE FORM / CONFIRMATION (7 Cols) ── */}
          <div className="lg:col-span-7 bg-white/95 p-6 sm:p-10 md:p-12 text-left flex flex-col justify-between">
            
            {submitted && submittedSnapshot ? (
              <div className="space-y-6 py-8 text-center my-auto">
                <div className="w-14 h-14 rounded-full bg-[#EBF3E8] border border-[#7A8B6F] flex items-center justify-center mx-auto text-[#7A8B6F]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#7A8B6F]">
                    INQUIRY DISPATCHED
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-light text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    We will connect with you shortly, {submittedSnapshot.name}.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78746D] max-w-md mx-auto leading-relaxed">
                    A dedicated gifting director will review your project parameters and contact you at <strong>{submittedSnapshot.email}</strong> within 2 business hours with a tailored lookbook and pricing proposal.
                  </p>
                </div>

                {submittedSnapshot.itemsList.length > 0 && (
                  <div className="bg-[#FAF8F5] p-4 border border-[#E0DDD6] max-w-md mx-auto text-left space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A8B6F] block font-bold">
                      Attached Project Samples:
                    </span>
                    <ul className="text-xs text-[#1A1A18] space-y-1 list-disc list-inside">
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
                  className="px-6 py-2.5 rounded-none bg-[#1A1A18] hover:bg-[#451B27] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  Start Another Curation
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                
                <div className="border-b border-[#E0DDD6] pb-3">
                  <h3
                    className="text-2xl sm:text-3xl font-light text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Tell Us About Your Project
                  </h3>
                  <p className="text-xs text-[#78746D] mt-1">
                    Bespoke curations for corporate gifting, festive occasions, and private milestones.
                  </p>
                </div>

                {/* Underline Form Fields with Breathable Spacing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Singhania"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company / Organization */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Axis Capital or Private Family"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ananya@company.com"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Estimated Units */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Estimated Units
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] focus:outline-none transition-colors cursor-pointer"
                    >
                      <option>25 - 50 units</option>
                      <option>50 - 200 units</option>
                      <option>200 - 500 units</option>
                      <option>500+ units (Institutional Scale)</option>
                    </select>
                  </div>

                  {/* Delivery Location */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Delivery City / Location
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Mumbai, Delhi, Bengaluru"
                      className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Custom Notes */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                    Special Customization Notes / Timeline
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mention custom crest engraving, timeline deadline, diet requirements or specific branding requests..."
                    className="w-full bg-transparent border-0 border-b border-[#D0CBC0] focus:border-[#1A1A18] rounded-none px-0 py-2 text-xs sm:text-sm text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A18] hover:bg-[#38332B] text-white text-xs font-mono uppercase tracking-[0.2em] transition-all shadow-none flex items-center justify-center gap-2 cursor-pointer active:scale-98 rounded-none"
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
