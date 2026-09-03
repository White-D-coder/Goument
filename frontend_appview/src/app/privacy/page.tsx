import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, ShieldCheck, Lock, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Terms — The Gourmet Gifts',
  description: 'Client confidentiality, data protection, and enterprise gifting terms of service.',
  alternates: {
    canonical: 'https://thegourmetgifts.co/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] pt-24 sm:pt-28 pb-16">
      
      {/* ─── HEADER & BREADCRUMBS ─── */}
      <section className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#8C847B] mb-3 sm:mb-4">
          <Link href="/" className="hover:text-[#1A1A18] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />
          <span className="text-[#1A1A18] font-medium">
            Privacy &amp; Terms
          </span>
        </nav>

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Client Confidentiality &amp; Terms
          </h1>
          <p className="text-xs sm:text-sm text-[#78746D] font-light leading-relaxed">
            How we protect your corporate gifting briefs, employee data, and brand assets.
          </p>
        </div>
      </section>

      {/* ─── EDITORIAL LEGAL CONTENT ─── */}
      <main className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-10 md:p-12 space-y-8 sm:space-y-10 shadow-xs">
          
          {/* Section 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#8C6228]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1A18] tracking-tight">
                1. Corporate Data Protection &amp; NDA Compliance
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-[#5C564E] font-light leading-relaxed pl-7">
              The Gourmet Gifts operates with strict confidentiality regarding corporate client briefs, executive gifting allocations, custom branding guidelines, and proprietary brand assets. We do not sell, license, or disclose client lists or project specifics without explicit prior authorization.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 border-t border-[#F0ECE1] pt-6">
            <div className="flex items-center gap-2.5 text-[#8C6228]">
              <Lock className="w-5 h-5 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1A18] tracking-tight">
                2. Recipient Addresses &amp; Logistics Data
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-[#5C564E] font-light leading-relaxed pl-7">
              Address spreadsheets provided for multi-city doorstep dispatches (such as employee onboarding, dealer distribution, and festival gifting) are encrypted and used solely for courier route fulfillment, live dispatch tracking, and delivery confirmation. Once transit is successfully verified, recipient personal data is purged according to enterprise retention standards.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 border-t border-[#F0ECE1] pt-6">
            <div className="flex items-center gap-2.5 text-[#8C6228]">
              <FileText className="w-5 h-5 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1A18] tracking-tight">
                3. Proposals, Customisation &amp; Invoicing
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-[#5C564E] font-light leading-relaxed pl-7">
              Inquiries submitted through our forms or WhatsApp concierge desk receive tailored curation proposals based on indicated quantity, timeline, and budget. All corporate transactions are accompanied by GST-compliant commercial invoices, explicit quality inspection reports, and agreed transit terms.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 border-t border-[#F0ECE1] pt-6">
            <div className="flex items-center gap-2.5 text-[#8C6228]">
              <Mail className="w-5 h-5 shrink-0" />
              <h2 className="text-base sm:text-lg font-semibold text-[#1A1A18] tracking-tight">
                4. Concierge Desk &amp; Inquiries
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-[#5C564E] font-light leading-relaxed pl-7">
              For queries concerning client privacy, custom NDAs, or enterprise terms, please write directly to our corporate desk at{' '}
              <a href="mailto:hello@thegourmetgifts.co" className="text-[#8C6228] font-medium underline">
                hello@thegourmetgifts.co
              </a>{' '}
              or reach our concierge team in Mumbai, India.
            </p>
          </div>

        </div>
      </main>

    </div>
  );
}
