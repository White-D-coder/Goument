'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, PackageCheck, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function InquirePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    event: 'Corporate Gifting',
    quantity: '50-100 hampers',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in your name, email, and phone number.');
      return;
    }
    setSubmitted(true);
    toast.success('Inquiry submitted! Our concierge team will contact you within 2 hours.', {
      style: { background: '#2C3228', color: '#FAF7F2', border: '1px solid #a6bd93' },
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] py-8 md:py-16 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-[#52604D] uppercase inline-flex items-center gap-1.5">
            <PackageCheck className="w-4 h-4 text-[#6B855A]" />
            Bespoke Concierge
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3228] tracking-tight">
            Enquire for Bulk Orders
          </h1>
          <p className="text-sm md:text-base text-[#7A8275] max-w-xl mx-auto font-normal">
            Whether for high-profile corporate celebrations, luxury wedding favors, or curated private events, connect with our master gifting team.
          </p>
        </div>

        {/* Form & Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Panel */}
          <div className="lg:col-span-5 bg-[#2C3228] text-white rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl text-left">
            <div className="space-y-2">
              <h2 className="font-serif-luxury text-2xl font-bold text-white">Direct Concierge</h2>
              <p className="text-xs text-white/70 leading-relaxed font-normal">
                Our bespoke team assists with custom logo branding, personalized sleeve wraps, and express Pan-India shipping.
              </p>
            </div>

            <div className="space-y-5 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-full bg-white/10 text-[#a6bd93] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold uppercase tracking-wider text-[10px]">Email Concierge</strong>
                  concierge@gourmetgem.com
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-full bg-white/10 text-[#a6bd93] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold uppercase tracking-wider text-[10px]">Phone Inquiry</strong>
                  +91 98765 43210
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-full bg-white/10 text-[#a6bd93] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-bold uppercase tracking-wider text-[10px]">Atelier Studio</strong>
                  Mumbai &amp; Delhi NCR, India
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 text-[11px] text-white/60">
              Response time: Under 2 hours during business hours (9 AM - 8 PM IST).
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E4E0D7] shadow-md text-left">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#6B855A] mx-auto" />
                <h3 className="font-serif-luxury text-2xl font-bold text-[#2C3228]">Inquiry Received</h3>
                <p className="text-sm text-[#7A8275] max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our concierge specialist has received your inquiry for <strong>{formData.event}</strong> and will reach out shortly via phone or email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-[#2C3228] text-white text-xs font-bold uppercase tracking-wider rounded-full"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-serif-luxury text-xl font-bold text-[#2C3228]">Send an Inquiry</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2C3228] uppercase tracking-wider">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Sharma"
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E4E0D7] rounded-xl text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2C3228] uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ananya@company.com"
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E4E0D7] rounded-xl text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2C3228] uppercase tracking-wider">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E4E0D7] rounded-xl text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#2C3228] uppercase tracking-wider">Occasion / Event</label>
                    <select
                      value={formData.event}
                      onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E4E0D7] rounded-xl text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                    >
                      <option value="Corporate Gifting">Corporate Gifting</option>
                      <option value="Wedding Favors">Wedding Favors &amp; Celebrations</option>
                      <option value="Festive Hampers">Festive Hampers (Diwali / New Year)</option>
                      <option value="Bespoke Customization">Bespoke Customization</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#2C3228] uppercase tracking-wider">Estimated Quantity</label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E4E0D7] rounded-xl text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                  >
                    <option value="10-50 hampers">10 - 50 hampers</option>
                    <option value="50-100 hampers">50 - 100 hampers</option>
                    <option value="100-500 hampers">100 - 500 hampers</option>
                    <option value="500+ hampers">500+ bulk hampers</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-[#2C3228] uppercase tracking-wider">Inquiry Details</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide event date, budget preference, or custom logo branding requirements..."
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E4E0D7] rounded-xl text-xs text-[#2C3228] focus:outline-none focus:border-[#2C3228]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#7A1C29] hover:bg-[#5C141F] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Submit Inquiry</span>
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
