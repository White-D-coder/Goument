'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Scrapbook() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-[#F3EFE6] overflow-hidden border-t border-[#DFD9CE]">
      {/* ─── REALISTIC TEXTURED JOURNAL BACKGROUND & WATERMARKS ─── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Subtle vintage parchment grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(#1A1A18 1px, transparent 1px), linear-gradient(90deg, #1A1A18 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Large Vintage Watermark Typography */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-full text-center opacity-[0.05] whitespace-nowrap pointer-events-none">
          <span 
            className="text-[90px] sm:text-[160px] md:text-[220px] font-serif uppercase tracking-[0.25em] font-black text-[#1A1A18] block leading-none"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            ATELIER ARCHIVE
          </span>
        </div>

        {/* Vintage Circular Postage & Postal Seal Watermark */}
        <div className="absolute top-[8%] right-[6%] md:right-[12%] w-44 h-44 sm:w-56 sm:h-56 rounded-full border-[2px] border-dashed border-[#1A1A18]/[0.07] flex items-center justify-center p-4 rotate-12 pointer-events-none">
          <div className="w-full h-full rounded-full border border-[#1A1A18]/[0.07] flex flex-col items-center justify-center text-center">
            <span className="type-micro text-[#1A1A18]/25 tracking-widest uppercase text-[9px]">THE GOURMET GIFTS</span>
            <span className="text-lg sm:text-xl font-serif text-[#1A1A18]/30 my-0.5 font-bold">EST. 2024</span>
            <span className="type-micro text-[#1A1A18]/25 tracking-wider uppercase text-[8.5px]">ARCHIVE NO. 84</span>
          </div>
        </div>

        {/* Second Postal Cancel Stamp on bottom left */}
        <div className="absolute bottom-[10%] left-[4%] sm:left-[8%] w-36 h-36 rounded-full border border-[#1A1A18]/[0.05] flex items-center justify-center -rotate-12 pointer-events-none">
          <div className="text-center">
            <span className="type-micro text-[#1A1A18]/20 block tracking-widest text-[9px]">CURATED REVERENCE</span>
            <span className="text-base font-serif italic text-[#1A1A18]/25">Verified Edition</span>
          </div>
        </div>
      </div>

      {/* ─── SECTION HEADER ─── */}
      <div className="relative z-10 max-w-[800px] mx-auto text-center mb-8 sm:mb-12 space-y-2">
        <span className="type-meta text-[#7A8B6F] block tracking-widest uppercase text-xs font-bold">
          The Living Archive • Real Stories &amp; Moments
        </span>
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl text-[#1A1A18] tracking-tight leading-[1.08] font-light"
          style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
        >
          The Keepsake Scrapbook
        </h2>
        <p className="text-[#78746D] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-light">
          Candid snapshots, workshop notes, and handwritten memoirs from celebrations across the country.
        </p>
      </div>

      {/* ─── MAIN SCRAPBOOK COLLAGE CANVAS (GPU ACCELERATED & ZERO LAG) ─── */}
      <div className="relative z-10 max-w-[1240px] mx-auto min-h-[1050px] sm:min-h-[1180px] md:min-h-[1100px]">

        {/* ════ ITEM 1: POLAROID WITH TORN PAPER MEMO & WASHI TAPE (Top Left) ════ */}
        <motion.div
          className="absolute top-[20px] left-[2%] sm:left-[5%] md:left-[8%] w-[88%] sm:w-[48%] md:w-[32%] z-20 group cursor-pointer transform-gpu will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="relative bg-[#FCFBF8] p-3 sm:p-4 pb-7 rounded-sm shadow-md border border-[#E5E0D4] transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
            {/* Top Washi Tape Strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip z-30 pointer-events-none -rotate-2" />

            {/* Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE8DF]">
              <Image
                src="/images/spotted/spot1.png"
                alt="Diwali celebration gifting moment"
                fill
                sizes="(max-width: 768px) 90vw, 380px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Attached Torn-Edge Memo Slip */}
            <div className="mt-3 bg-[#FAF6EC] p-3 border-t border-dashed border-[#DFD7C4]">
              <div className="flex items-center justify-between">
                <span className="font-handwriting text-xl text-[#3D3A34] group-hover:text-[#1A1A18] tracking-wide">
                  “Diwali Gala • New Delhi”
                </span>
                <span className="type-micro text-[#A39C90] text-[10px]">OCT 28</span>
              </div>
              <p className="font-script text-base text-[#666055] mt-1 leading-tight">
                Curated with botanical tea canisters &amp; heirloom brass trims.
              </p>
            </div>
          </div>

          {/* Hand-drawn Arrow & Note outside */}
          <div className="hidden lg:block absolute -right-24 top-10 pointer-events-none select-none text-[#5A554A]">
            <span className="font-handwriting text-lg block -rotate-6">⟶ 24k gilded crest</span>
          </div>
        </motion.div>


        {/* ════ ITEM 2: KRAFT NOTE WITH STAMP & POLAROID DETAIL (Top Right) ════ */}
        <motion.div
          className="absolute top-[60px] sm:top-[30px] right-[2%] sm:right-[5%] md:right-[6%] w-[86%] sm:w-[46%] md:w-[34%] z-10 group cursor-pointer transform-gpu will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="relative bg-[#FAF8F2] p-3 sm:p-4 pb-6 rounded-sm shadow-md border border-[#E3DDCF] transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
            {/* Angled Washi Tape on Right */}
            <div className="absolute -top-3 right-4 w-24 h-6 tape-strip z-30 pointer-events-none rotate-6" />

            {/* Vintage Postmark Stamp Badge */}
            <div className="absolute top-5 right-5 z-20 vintage-stamp px-2.5 py-1 rotate-12 shadow-2xs pointer-events-none">
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
                sizes="(max-width: 768px) 90vw, 380px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="pt-2.5 text-center">
              <span className="font-handwriting text-xl text-[#2E2B26] block">
                “Bespoke Monogram Suite”
              </span>
              <span className="type-micro text-[#8A8478] tracking-widest text-[9.5px] uppercase mt-0.5 block">
                Single Batch Run • 120 Units
              </span>
            </div>
          </div>
        </motion.div>


        {/* ════ ITEM 3: CENTERPIECE RIPPED JOURNAL COLLAGE (Center Overlap) ════ */}
        <motion.div
          className="absolute top-[380px] sm:top-[320px] md:top-[280px] left-[4%] sm:left-[16%] md:left-[24%] w-[92%] sm:w-[68%] md:w-[48%] z-30 group cursor-pointer transform-gpu will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="relative bg-[#FCFAF5] p-3 sm:p-5 pb-7 rounded-sm shadow-lg border border-[#E0D8C8] transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
            {/* Top Tape Left & Right */}
            <div className="absolute -top-3 left-8 w-24 h-6 tape-strip z-30 pointer-events-none -rotate-6" />
            <div className="absolute -top-3 right-8 w-24 h-6 tape-strip z-30 pointer-events-none rotate-4" />

            {/* Ripped Edge Top Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E8E2D4]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7A8B6F]" />
                <span className="type-meta text-[#5C564C] text-[10.5px] font-semibold tracking-wider uppercase">
                  Field Notes • Jaipur Atelier
                </span>
              </div>
              <span className="font-script text-base text-[#8A8478]">No. 042</span>
            </div>

            {/* Hero Landscape Photo */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE8DF] rounded-xs">
              <Image
                src="/images/spotted/spot3.png"
                alt="Unwrapping ritual in natural setting"
                fill
                sizes="(max-width: 768px) 95vw, 550px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Handwritten Editorial Story Snippet */}
            <div className="mt-3 bg-[#FAF4E6] p-3">
              <span className="font-handwriting text-xl text-[#2B2823] block leading-snug">
                “A gift is an enduring memory — crafted slowly, cherished forever.”
              </span>
              <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-dashed border-[#D6CDBC]">
                <span className="font-script text-base text-[#6E675B]">
                  Hand-stitched velvet upholstery with solid teak sub-frame.
                </span>
                <span className="type-micro text-[#948C7E] text-[9.5px] uppercase font-bold">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>
        </motion.div>


        {/* ════ ITEM 4: TORN KRAFT MEMO & BOTANICAL STUDY (Mid-Left) ════ */}
        <motion.div
          className="absolute top-[740px] sm:top-[640px] md:top-[570px] left-[2%] sm:left-[4%] md:left-[6%] w-[84%] sm:w-[44%] md:w-[28%] z-20 group cursor-pointer transform-gpu will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.18, ease: 'easeOut' }}
        >
          <div className="relative bg-[#FCFBF8] p-3 pb-6 rounded-sm shadow-md border border-[#E3DCCE] transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
            {/* Center Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 tape-strip z-30 pointer-events-none rotate-2" />

            {/* Photo */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECE8DF]">
              <Image
                src="/images/spotted/spot4.png"
                alt="Keepsake vessel close-up"
                fill
                sizes="(max-width: 768px) 85vw, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Scribble label */}
            <div className="mt-2.5 text-center">
              <span className="font-handwriting text-xl text-[#2C2924] block">
                “Emerald Keepsake Octagon”
              </span>
              <span className="font-script text-sm text-[#756E62] block">
                Cast iron tinplate with friction seal
              </span>
            </div>
          </div>

          {/* Annotation arrow */}
          <div className="hidden lg:block absolute -left-16 bottom-6 pointer-events-none select-none text-[#5A554A]">
            <span className="font-handwriting text-base block rotate-12">permanent vessel ⟵</span>
          </div>
        </motion.div>


        {/* ════ ITEM 5: VELVET TRAY DETAILS (Mid-Right) ════ */}
        <motion.div
          className="absolute top-[780px] sm:top-[680px] md:top-[610px] right-[2%] sm:right-[4%] md:right-[8%] w-[86%] sm:w-[46%] md:w-[30%] z-20 group cursor-pointer transform-gpu will-change-transform"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative bg-[#FCFBF8] p-3 sm:p-4 pb-6 rounded-sm shadow-md border border-[#DFD8CA] transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
            {/* Top Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 tape-strip z-30 pointer-events-none -rotate-3" />

            {/* Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE8DF]">
              <Image
                src="/images/spotted/spot5.png"
                alt="Velvet keepsake tray presentation"
                fill
                sizes="(max-width: 768px) 90vw, 360px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Memo Tag */}
            <div className="mt-2.5 pt-2 border-t border-[#EDE7D9] text-center">
              <span className="font-handwriting text-xl text-[#3D3830] block">
                “Handmade in Udaipur”
              </span>
              <span className="type-micro text-[#8C8476] tracking-widest text-[9.5px] uppercase block mt-0.5">
                Silk-Thread Lined • Gold Foiled
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
