'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './EditorialCollage.css';

export default function EditorialCollage() {
  return (
    <div className="keepsake-collage-wrap">
      <div className="keepsake-collage-grid">
        
        {/* ─── COLUMN 1: 60% Top / 40% Bottom ─── */}
        <div className="collage-col">
          {/* Tile 01: Open Velvet Hamper Suite */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="collage-tile"
            style={{ height: '60%' }}
          >
            <Image
              src="/images/small_anipics/velvet_tray_hero.jpg"
              alt="The Velvet Tray Hamper Suite"
              fill
              priority
              sizes="(max-width: 768px) 50vw, 25vw"
              className="collage-tile-img"
            />
          </motion.div>

          {/* Tile 02: Open Keepsake Watch & Pen Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="collage-tile"
            style={{ height: '40%' }}
          >
            <Image
              src="/images/Category_image/premium_velvet/royale3.jpeg"
              alt="Curated Keepsake Accessories"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="collage-tile-img"
            />
          </motion.div>
        </div>

        {/* ─── COLUMN 2: 44% Top / 56% Bottom ─── */}
        <div className="collage-col">
          {/* Tile 03: Amber Botanical Candle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="collage-tile"
            style={{ height: '44%' }}
          >
            <Image
              src="/images/Product_images/CRAFTED IN-HOUSE/candle_120.png"
              alt="Handcrafted Amber Candle with Brass Lid"
              fill
              sizes="(max-width: 768px) 50vw, 18vw"
              className="collage-tile-img"
            />
          </motion.div>

          {/* Tile 04: Octagonal Satin Ribbon Keepsake Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="collage-tile"
            style={{ height: '56%' }}
          >
            <Image
              src="/images/Category_image/Royale_tin_tin/tinnew1.png"
              alt="Octagonal Emerald Keepsake Box"
              fill
              sizes="(max-width: 768px) 50vw, 18vw"
              className="collage-tile-img"
            />
          </motion.div>
        </div>

        {/* ─── COLUMN 3: 58% Top / 42% Bottom ─── */}
        <div className="collage-col">
          {/* Tile 05: White & Gold Embossed Tinplate Hamper */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="collage-tile"
            style={{ height: '58%' }}
          >
            <Image
              src="/images/Category_image/Royale_tin_tin/tin1.jpeg"
              alt="White and Gold Embossed Tinplate Hamper"
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="collage-tile-img"
            />
          </motion.div>

          {/* Tile 06: Open Wood Box with Brass Latch & Velvet Lining */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="collage-tile"
            style={{ height: '42%' }}
          >
            <Image
              src="/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg"
              alt="Carved Wooden Keepsake Box with Brass Latch"
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="collage-tile-img"
            />
          </motion.div>
        </div>

        {/* ─── COLUMN 4: 100% Full-Height Hero ─── */}
        <div className="collage-col">
          {/* Tile 07: The C-Suite Executive Velvet Suite with Decanter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="collage-tile hero-tile"
            style={{ height: '100%' }}
          >
            <Image
              src="/images/Category_image/premium_velvet/vel2.jpeg"
              alt="The C-Suite Executive Velvet Suite"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="collage-tile-img"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
