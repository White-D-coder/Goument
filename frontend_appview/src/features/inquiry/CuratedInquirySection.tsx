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
  ArrowRight,
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
    quantity: '1 set',
    targetDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    name: string;
    email: string;
    phone: string;
    company?: string;
    quantity: string;
    boxName?: string;
    itemsList: string[];
  } | null>(null);

  // Split into 2 parts: (1) Keepsake Box, (2) Products & Delicacies
  const isBoxItem = (name: string, productId: string) => {
    return (
      name.startsWith('Signature Box:') ||
      productId.startsWith('box_') ||
      productId.startsWith('box-') ||
      productId.startsWith('custom-box')
    );
  };

  const boxItems = cartItems.filter((i) => isBoxItem(i.name, i.productId));
  const productItems = cartItems.filter((i) => !isBoxItem(i.name, i.productId));

  const parsedQtyNumber = parseInt(formData.quantity) || 1;

  const handleQtyChange = (val: number) => {
    const safeVal = Math.max(1, isNaN(val) ? 1 : val);
    setFormData({ ...formData, quantity: `${safeVal} ${safeVal === 1 ? 'set' : 'sets'}` });
  };

  const handleStepQty = (delta: number) => {
    const current = parseInt(formData.quantity) || 1;
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

    const attachedItemsSummary = productItems.map(
      (item) => `${item.name} (${item.quantity} ${item.quantity === 1 ? 'unit' : 'units'})`
    );

    const snapshot = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      quantity: formData.quantity,
      boxName: boxItems[0]?.name,
      itemsList: attachedItemsSummary,
    };

    setSubmittedSnapshot(snapshot);

    try {
      // 1. Send via Nodemailer API to hello@thegourmetgifts.co
      await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          boxItem: boxItems[0] ? { name: boxItems[0].name, image: boxItems[0].image } : null,
          productItems: productItems.map((p) => ({ name: p.name, quantity: p.quantity })),
          source: 'The Gourmet Gifts — Curation Inquiry Form',
        }),
      });

      // 2. Save to localStorage for client-side tracking
      const past = JSON.parse(localStorage.getItem('gourmet_inquiries') || '[]');
      past.unshift({ ...snapshot, date: new Date().toISOString() });
      localStorage.setItem('gourmet_inquiries', JSON.stringify(past));
    } catch (err) {
      console.error('Inquiry dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success('Your Curation Enquiry has been dispatched to hello@thegourmetgifts.co!', {
        style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 4000,
      });
    }
  };

  const scrollToBoxes = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('boxes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="curation-inquiry" className="pt-4 sm:pt-8 md:pt-4 pb-6 sm:pb-12 px-2 sm:px-4 lg:px-6 relative overflow-hidden bg-[#FAF8F5] text-[#1A1A18] scroll-mt-20">
      
      {/* ── LUXURY SATRA WATERMARK BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden select-none">
        <span
          className="text-[72px] sm:text-[180px] md:text-[280px] lg:text-[360px] font-light tracking-[0.2em] text-[#1A1A18]/[0.03] uppercase whitespace-nowrap"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          SATRA
        </span>
      </div>

      <div className="max-w-[1580px] mx-auto space-y-4 sm:space-y-8 relative z-10">

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

        {/* ─── MAIN CONTAINER (RESPONSIVE CORNERS & COMPACT SPACING) ─── */}
        <div className="relative rounded-[40px] border border-[#D9D5CC] shadow-none overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-white/95 backdrop-blur-md">

          {/* ── LEFT COLUMN: 2-PART ATTACHED SAMPLES (Top: Box Selection, Bottom: Products) ── */}
          <div className="lg:col-span-5 bg-[#FAF8F5]/90 p-4 sm:p-6 md:p-8 flex flex-col justify-between space-y-5">
            
            <div className="space-y-5">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-1 border-b border-[#E8E4DC]">
                <h3
                  className="text-lg sm:text-xl font-light text-[#1A1A18]"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Attached Curation
                </h3>
                <span className="text-[11px] font-semibold text-[#7A8B6F] bg-[#EBF3E8] px-2.5 py-0.5 rounded-full border border-[#7A8B6F]/20">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>

              {/* ── PART 1: OPTIONAL KEEPSAKE BOX SELECTION ── */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E7B35] block">
                  1. Keepsake Box (Optional)
                </span>

                {boxItems.length > 0 ? (
                  <div className="space-y-2">
                    {boxItems.map((box) => (
                      <div
                        key={box.id}
                        className="bg-white rounded-xl border border-[#C5A880]/50 p-2.5 sm:p-3 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {box.image && (
                            <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0 border border-[#EADBCA]">
                              <Image src={box.image} alt={box.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="text-left min-w-0">
                            <h4 className="text-xs sm:text-sm font-semibold text-[#1A1A18] truncate">
                              {box.name}
                            </h4>
                            <span className="text-[9.5px] text-[#9E7B35] font-semibold block">
                              Signature Vessel Selected
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => removeItem(box.id)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#9E9A92] hover:text-[#9A2C2C] transition-colors cursor-pointer"
                            title="Remove box"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/70 border border-dashed border-[#DDD8CE] rounded-xl p-3 flex items-center justify-between gap-2 text-left">
                    <div className="flex items-center gap-2 min-w-0">
                      <Package className="w-4 h-4 text-[#9E7B35] shrink-0 opacity-80" />
                      <p className="text-[11px] text-[#78746D] leading-tight truncate">
                        No box selected (Standard packaging)
                      </p>
                    </div>
                    <a
                      href="#boxes"
                      onClick={scrollToBoxes}
                      className="shrink-0 text-[10.5px] font-semibold text-[#9E7B35] hover:text-[#1A1A18] inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Select Box</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>

              {/* ── PART 2: SELECTED DELICACIES & PRODUCTS ── */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8B6F] block">
                  2. Selected Delicacies &amp; Keepsakes
                </span>

                {productItems.length > 0 ? (
                  <div className="space-y-2 max-h-[190px] sm:max-h-[220px] overflow-y-auto pr-1">
                    {productItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl border border-[#E0DDD6] p-2.5 flex items-center justify-between gap-2.5 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.image && (
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0 border border-[#EADBCA]">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="text-left min-w-0">
                            <h4 className="text-xs font-semibold text-[#1A1A18] truncate">
                              {item.name}
                            </h4>
                            <span className="text-[9.5px] text-[#7A8B6F] font-semibold block">
                              Qty: {item.quantity} sample{item.quantity > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeItem(item.id);
                              } else {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="w-5.5 h-5.5 rounded bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold text-[#1A1A18] min-w-[16px] text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5.5 h-5.5 rounded bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#451B27] transition-colors cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-5.5 h-5.5 ml-0.5 flex items-center justify-center text-[#9E9A92] hover:text-[#9A2C2C] transition-colors cursor-pointer"
                            title="Remove sample"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/60 rounded-xl p-3 text-center flex items-center justify-center gap-2">
                    <p className="text-[11px] text-[#78746D]">
                      No individual delicacies attached yet.
                    </p>
                  </div>
                )}
              </div>

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

                {/* Summary Card */}
                <div className="bg-[#FAF8F5] p-4 border border-[#E0DDD6] max-w-md mx-auto text-left space-y-2.5 rounded-xl shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-2 text-xs">
                    <span className="text-[#78746D]">Estimated Gift Sets:</span>
                    <span className="font-bold text-[#1A1A18]">{submittedSnapshot.quantity}</span>
                  </div>
                  
                  {submittedSnapshot.boxName && (
                    <div className="flex items-center justify-between border-b border-[#E8E4DC] pb-2 text-xs">
                      <span className="text-[#78746D]">Signature Vessel:</span>
                      <span className="font-semibold text-[#9E7B35] truncate max-w-[200px]">
                        {submittedSnapshot.boxName}
                      </span>
                    </div>
                  )}

                  {submittedSnapshot.itemsList.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A8B6F] block font-bold">
                        Attached Delicacies &amp; Keepsakes ({submittedSnapshot.itemsList.length}):
                      </span>
                      <ul className="text-xs text-[#1A1A18] space-y-1 list-disc list-inside">
                        {submittedSnapshot.itemsList.map((item, idx) => (
                          <li key={idx} className="truncate">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 max-w-md mx-auto">
                  <a
                    href={`https://api.whatsapp.com/send?phone=919876543210&text=${encodeURIComponent(
                      `Hello The Gourmet Gifts! I would like to enquire about bespoke curation:\n\n• Name: ${submittedSnapshot.name}\n• Phone: ${submittedSnapshot.phone}\n• Email: ${submittedSnapshot.email}\n• Estimated Sets: ${submittedSnapshot.quantity}\n• Box: ${submittedSnapshot.boxName || 'Standard Packaging'}\n• Items: ${submittedSnapshot.itemsList.join(', ')}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#3D5244] hover:bg-[#2F4034] text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 rounded-xl shadow-xs"
                  >
                    <span>Send Copy on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#DFC299]" />
                  </a>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      clearCart();
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 border border-[#DDD5C7] hover:bg-[#EAE5DC] text-[#1A1A18] text-xs font-mono uppercase tracking-wider transition-all cursor-pointer rounded-xl"
                  >
                    Start Another Curation
                  </button>
                </div>
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

                  {/* ESTIMATED GIFT SETS (WITH DIRECT TYPING & STEPPER) */}
                  <div className="space-y-1">
                    <label className="text-[9.5px] sm:text-[10px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      Estimated Gift Sets
                    </label>
                    <div className="flex items-center gap-2 pt-0.5">
                      <div className="inline-flex items-center bg-[#FAF8F5] border border-[#DDD8CE] rounded-lg p-0.5 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleStepQty(-1)}
                          className="w-7 h-7 rounded-md flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors cursor-pointer active:scale-90"
                          title="Decrease gift sets"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Direct Editable Number Input */}
                        <div className="flex items-center px-1">
                          <input
                            type="number"
                            min="1"
                            max="50000"
                            value={parsedQtyNumber}
                            onChange={(e) => handleQtyChange(parseInt(e.target.value))}
                            className="w-12 text-center text-xs sm:text-sm font-semibold text-[#1A1A18] bg-transparent border-0 focus:outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[11px] font-medium text-[#78746D] select-none pr-1">
                            {parsedQtyNumber === 1 ? 'set' : 'sets'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleStepQty(1)}
                          className="w-7 h-7 rounded-md bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#BFA267] transition-colors cursor-pointer active:scale-90"
                          title="Increase gift sets"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    {/* Helper Subtext */}
                    <span className="text-[9.5px] sm:text-[10px] text-[#78746D] block font-light leading-tight pt-0.5">
                      How many complete gift sets would you like to create?
                    </span>
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

                {/* Compact Left-Aligned Submit Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 sm:px-8 py-2.5 sm:py-3 bg-[#1A1A18] hover:bg-[#38332B] text-white text-[11px] sm:text-xs font-mono uppercase tracking-[0.14em] sm:tracking-[0.18em] transition-all shadow-2xs hover:shadow-xs flex sm:inline-flex items-center justify-center gap-2 rounded-none ${
                      isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-95'
                    }`}
                  >
                    <Send className="w-3 h-3 text-[#DFC299]" />
                    <span>{isSubmitting ? 'DISPATCHING TO CONCIERGE...' : 'SEND CURATION ENQUIRY'}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
