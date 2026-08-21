'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Scrapbook() {
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-12 bg-[#F3EFE6] overflow-hidden border-t border-[#DFD9CE]">
      {/* ─── REALISTIC TEXTURED JOURNAL BACKGROUND & WATERMARKS ─── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle vintage parchment grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `linear-gradient(#1A1A18 1px, transparent 1px), linear-gradient(90deg, #1A1A18 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Large Prominent Vintage Watermark Typography */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-full text-center opacity-[0.06] whitespace-nowrap">
          <span 
            className="text-[100px] sm:text-[180px] md:text-[240px] font-serif uppercase tracking-[0.25em] font-black text-[#1A1A18] block leading-none"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            ATELIER ARCHIVE
          </span>
        </div>

        {/* Vintage Circular Postage & Postal Seal Watermark */}
        <div className="absolute top-[8%] right-[6%] md:right-[12%] w-48 h-48 sm:w-64 sm:h-64 rounded-full border-[3px] border-dashed border-[#1A1A18]/[0.08] flex items-center justify-center p-4 rotate-12">
          <div className="w-full h-full rounded-full border border-[#1A1A18]/[0.08] flex flex-col items-center justify-center text-center">
            <span className="type-micro text-[#1A1A18]/25 tracking-widest uppercase">THE GOURMET GIFTS</span>
            <span className="text-xl sm:text-2xl font-serif text-[#1A1A18]/30 my-1 font-bold">EST. 2024</span>
            <span className="type-micro text-[#1A1A18]/25 tracking-wider uppercase">ARCHIVE NO. 84</span>
          </div>
        </div>

        {/* Second Postal Cancel Stamp on bottom left */}
        <div className="absolute bottom-[10%] left-[4%] sm:left-[8%] w-40 h-40 rounded-full border-2 border-[#1A1A18]/[0.06] flex items-center justify-center -rotate-12">
          <div className="text-center">
            <span className="type-micro text-[#1A1A18]/25 block tracking-widest">CURATED REVERENCE</span>
            <span className="text-lg font-serif italic text-[#1A1A18]/30">Verified Edition</span>
          </div>
        </div>
      </div>

      {/* ─── SECTION HEADER ─── */}
      <div className="relative z-10 max-w-[800px] mx-auto text-center mb-8 sm:mb-12 space-y-3">
        <span className="type-meta text-[#8A8680] block tracking-widest uppercase text-xs">
          The Living Archive • Real Stories &amp; Moments
        </span>
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl text-[#1A1A18] tracking-tight leading-[1.05]"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 500 }}
        >
          The Keepsake Scrapbook
        </h2>
        <p className="type-body text-[#78746D] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Candid snapshots, workshop notes, and handwritten memoirs from celebrations across the country.
        </p>
      </div>

      {/* ─── MAIN SCRAPBOOK COLLAGE CANVAS ─── */}
      <div className="relative z-10 max-w-[1240px] mx-auto min-h-[1100px] sm:min-h-[1250px] md:min-h-[1150px]">

        {/* ════ ITEM 1: POLAROID WITH TORN PAPER MEMO & WASHI TAPE (Top Left) ════ */}
        <motion.div
          className="absolute top-[20px] left-[2%] sm:left-[5%] md:left-[8%] w-[88%] sm:w-[48%] md:w-[32%] z-20 group cursor-pointer"
          initial={{ opacity: 0, x: -60, y: 30, rotate: -12 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: -5 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-[#FCFBF8] p-3 sm:p-4 pb-8 rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-[#E5E0D4] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:!rotate-0 group-hover:-translate-y-3 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.22)] group-hover:z-50">
            {/* Top Washi Tape Strip */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 h-7 tape-strip z-30 pointer-events-none -rotate-2" />

            {/* Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE8DF]">
              <Image
                src="/images/spotted/spot1.png"
                alt="Diwali celebration gifting moment"
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
              />
            </div>

            {/* Attached Torn-Edge Memo Slip */}
            <div className="mt-3.5 bg-[#FAF6EC] p-3 rounded-none torn-edge-b border-t border-dashed border-[#DFD7C4]">
              <div className="flex items-center justify-between">
                <span className="font-handwriting text-xl text-[#3D3A34] group-hover:text-[#1A1A18] tracking-wide">
                  “Diwali Gala • New Delhi”
                </span>
                <span className="type-micro text-[#A39C90] text-[10px]">OCT 28</span>
              </div>
              <p className="font-script text-lg text-[#666055] mt-1 leading-tight">
                Curated with the botanical tea canisters &amp; heirloom brass trims.
              </p>
            </div>
          </div>

          {/* Hand-drawn Arrow & Note outside */}
          <div className="hidden lg:block absolute -right-24 top-10 pointer-events-none select-none text-[#5A554A]">
            <span className="font-handwriting text-xl block -rotate-6">⟶ 24k gilded crest</span>
          </div>
        </motion.div>


        {/* ════ ITEM 2: KRAFT NOTE WITH STAMP & POLAROID DETAIL (Top Right) ════ */}
        <motion.div
          className="absolute top-[60px] sm:top-[30px] right-[2%] sm:right-[5%] md:right-[6%] w-[86%] sm:w-[46%] md:w-[34%] z-10 group cursor-pointer"
          initial={{ opacity: 0, x: 60, y: 30, rotate: 14 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-[#FAF8F2] p-3 sm:p-4 pb-7 rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.11)] border border-[#E3DDCF] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:!rotate-0 group-hover:-translate-y-3 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.22)] group-hover:z-50">
            {/* Angled Washi Tape on Right */}
            <div className="absolute -top-3 right-4 w-24 h-7 tape-strip z-30 pointer-events-none rotate-6" />

            {/* Vintage Postmark Stamp Badge */}
            <div className="absolute top-6 right-6 z-20 vintage-stamp px-2.5 py-1 rotate-12 shadow-sm pointer-events-none">
              <span className="type-micro text-[#8C8375] font-bold text-[9px] tracking-wider uppercase block">
                DELHI ATELIER • APPROVED
              </span>
            </div>

            {/* Photo */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#ECE8DF]">
              <Image
                src="/images/spotted/spot2.png"
                alt="Bespoke hand-stamped crest"
                fill
                sizes="(max-width: 768px) 90vw, 400px"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] filter grayscale contrast-[1.06] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
              />
            </div>

            <div className="pt-3 text-center">
              <span className="font-handwriting text-2xl text-[#2E2B26] block">
                “Bespoke Monogram Suite”
              </span>
              <span className="type-micro text-[#8A8478] tracking-widest text-[10px] uppercase mt-0.5 block">
                Single Batch Run • 120 Units
              </span>
            </div>
          </div>
        </motion.div>


        {/* ════ ITEM 3: CENTERPIECE RIPPED JOURNAL COLLAGE (Center Overlap) ════ */}
        <motion.div
          className="absolute top-[400px] sm:top-[340px] md:top-[300px] left-[4%] sm:left-[16%] md:left-[24%] w-[92%] sm:w-[68%] md:w-[48%] z-30 group cursor-pointer"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-[#FCFAF5] p-3 sm:p-5 pb-9 rounded-[3px] shadow-[0_18px_45px_rgba(0,0,0,0.16)] border border-[#E0D8C8] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-hover:-translate-y-3 group-hover:shadow-[0_32px_70px_rgba(0,0,0,0.25)] group-hover:z-50">
            {/* Top Tape Left & Right */}
            <div className="absolute -top-3.5 left-8 w-24 h-6 tape-strip z-30 pointer-events-none -rotate-6" />
            <div className="absolute -top-3.5 right-8 w-24 h-6 tape-strip z-30 pointer-events-none rotate-4" />

            {/* Ripped Edge Top Header Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8E2D4]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7A8B6F]" />
                <span className="type-meta text-[#5C564C] text-[11px] font-semibold tracking-wider uppercase">
                  Field Notes • Jaipur Atelier
                </span>
              </div>
              <span className="font-script text-lg text-[#8A8478]">No. 042</span>
            </div>

            {/* Hero Landscape Photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE8DF] rounded-[1px]">
              <Image
                src="/images/spotted/spot3.png"
                alt="Unwrapping ritual in natural setting"
                fill
                sizes="(max-width: 768px) 95vw, 600px"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] filter grayscale contrast-[1.05] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
              />
            </div>

            {/* Handwritten Editorial Story Snippet */}
            <div className="mt-3.5 bg-[#FAF4E6] p-3.5 torn-edge-b">
              <span className="font-handwriting text-2xl text-[#2B2823] block leading-snug">
                “A gift is an enduring memory — crafted slowly, cherished forever.”
              </span>
              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-dashed border-[#D6CDBC]">
                <span className="font-script text-lg text-[#6E675B]">
                  Hand-stitched velvet upholstery with solid teak sub-frame.
                </span>
                <span className="type-micro text-[#948C7E] text-[10px] uppercase font-bold">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ════ ITEM 4: TORN KRAFT MEMO & BOTANICAL STUDY (Mid-Left) ════ */}
        <motion.div
          className="absolute top-[780px] sm:top-[680px] md:top-[600px] left-[2%] sm:left-[4%] md:left-[6%] w-[84%] sm:w-[44%] md:w-[28%] z-20 group cursor-pointer"
          initial={{ opacity: 0, x: -50, y: 30, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: -4 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-[#FCFBF8] p-3 pb-7 rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-[#E3DCCE] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:!rotate-0 group-hover:-translate-y-3 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.22)] group-hover:z-50">
            {/* Center Washi Tape */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-6 tape-strip z-30 pointer-events-none rotate-2" />

            {/* Photo */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE8DF]">
              <Image
                src="/images/spotted/spot4.png"
                alt="Keepsake vessel close-up"
                fill
                sizes="(max-width: 768px) 85vw, 360px"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
              />
            </div>

            {/* Scribble label */}
            <div className="mt-3 text-center">
              <span className="font-handwriting text-2xl text-[#2C2924] block">
                “Emerald Keepsake Octagon”
              </span>
              <span className="font-script text-base text-[#756E62] block">
                Cast iron tinplate with friction seal
              </span>
            </div>
          </div>

          {/* Annotation arrow */}
          <div className="hidden lg:block absolute -left-16 bottom-6 pointer-events-none select-none text-[#5A554A]">
            <span className="font-handwriting text-xl block rotate-12">permanent vessel ⟵</span>
          </div>
        </motion.div>


        {/* ════ ITEM 5: VELVET TRAY DETAILS (Mid-Right) ════ */}
        <motion.div
          className="absolute top-[820px] sm:top-[720px] md:top-[640px] right-[2%] sm:right-[4%] md:right-[8%] w-[86%] sm:w-[46%] md:w-[30%] z-20 group cursor-pointer"
          initial={{ opacity: 0, x: 50, y: 30, rotate: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 5 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative bg-[#FAF8F3] p-3.5 pb-7 rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-[#E3DDCF] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:!rotate-0 group-hover:-translate-y-3 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.22)] group-hover:z-50">
            {/* Top Tape */}
            <div className="absolute -top-3.5 right-6 w-24 h-6 tape-strip z-30 pointer-events-none -rotate-3" />

            {/* Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE8DF]">
              <Image
                src="/images/small_anipics/velvet_tray_hero.jpg"
                alt="Velvet tray craftsmanship"
                fill
                sizes="(max-width: 768px) 85vw, 360px"
                className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] filter grayscale contrast-[1.08] group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-105"
              />
            </div>

            <div className="mt-3 bg-[#F5EFE2] p-2.5 torn-edge-b">
              <span className="font-handwriting text-2xl text-[#2B2721] block">
                “Forest Emerald Velvet”
              </span>
              <span className="font-script text-base text-[#6E675A] block mt-0.5">
                Brushed brass corners • Hand-stretched fabric
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ─── BOTTOM EDITORIAL MEMO & CALLOUT ─── */}
      <motion.div
        className="relative z-10 mt-16 text-center max-w-[600px] mx-auto space-y-3"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#DDD5C5] shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#7A8B6F] animate-pulse" />
          <span className="type-meta text-[#4D473D] text-xs uppercase tracking-widest font-semibold">
            Every Box Tells A Story
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-[#1A1A18] pt-2">
          <span
            className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A18] tracking-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 500 }}
          >
            Thoughtful gifts.
          </span>
          <span
            className="text-3xl sm:text-4xl md:text-5xl italic text-[#7A8B6F] tracking-tight font-normal"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Real stories.
          </span>
        </div>
      </motion.div>
    </section>
  );
}
