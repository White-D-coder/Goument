'use client';

import React from 'react';
import GourmetGiftsHomePage from '@/app/gourmet-gifts/page';

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * ROOT LANDING PAGE — THE GOURMET GIFTS
 * ═══════════════════════════════════════════════════════════════════════════════
 * The Gourmet Gifts is the standalone active website.
 * (The House of Satra multi-brand maison codebase is safely preserved below in comments).
 */
export default function Page() {
  return <GourmetGiftsHomePage />;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PRESERVED HOUSE OF SATRA CODEBASE (DO NOT DELETE — COMMENTED FOR ARCHIVE)
   ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ArrowRight, Eye, ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import HouseOfSatraIntro from '@/components/editorial/HouseOfSatraIntro';

type BrandDivision = 'all' | 'gourmet-gifts' | 'satra-atelier' | 'satra-living';

interface MaisonProduct {
  id: string;
  name: string;
  brand: string;
  brandCategory: BrandDivision;
  price: number;
  image: string;
  secondaryImage?: string;
  description: string;
}

const MAISON_PRODUCTS: MaisonProduct[] = [
  {
    id: 'tgg-velvet-suite',
    name: 'Royal Velvet Keepsake Suite',
    brand: 'Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 0,
    image: '/images/small_anipics/velvet_tray_hero.jpg',
    secondaryImage: '/images/Category_image/premium_velvet/vel1.jpeg',
    description: 'Multi-tier bespoke keepsake chest in deep royal velvet.',
  },
  {
    id: 'tgg-botanical-tin',
    name: 'Royale Botanical Keepsake Tin',
    brand: 'Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 0,
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    secondaryImage: '/images/Category_image/Royale_tin_tin/tin7.jpeg',
    description: 'Architectural tinplate with 24k gold filigree.',
  },
  {
    id: 'tgg-burgundy-chest',
    name: 'Imperial Burgundy Velvet Chest',
    brand: 'Gourmet Gifts',
    brandCategory: 'gourmet-gifts',
    price: 0,
    image: '/images/Category_image/premium_velvet/vel1.jpeg',
    secondaryImage: '/images/Category_image/premium_velvet/vel2.jpeg',
    description: 'Heirloom velvet memory box with gold-plated hardware.',
  },
  {
    id: 'sat-octagonal-tray',
    name: 'Heritage Octagonal Valet Tray',
    brand: 'Satra Atelier',
    brandCategory: 'satra-atelier',
    price: 0,
    image: '/images/small_anipics/framee.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
    description: 'Architectural brass and teak desk organizer.',
  },
  {
    id: 'sat-teak-frame',
    name: 'Heritage Artisanal Teak Frame',
    brand: 'Satra Atelier',
    brandCategory: 'satra-atelier',
    price: 0,
    image: '/images/small_anipics/frame.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
    description: 'Museum-grade photographic keepsake frame.',
  },
  {
    id: 'sl-candle',
    name: 'Botanical Amber Soy Candle',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 0,
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
    secondaryImage: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
    description: 'Hand-poured soy candle with Himalayan cedar and amber.',
  },
  {
    id: 'sl-coasters',
    name: 'Marbled Resin Coasters',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 0,
    image: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
    description: 'Hand-cast resin with organic pigment flows.',
  },
  {
    id: 'sl-velvet-chest',
    name: 'Heirloom Velvet Memory Chest',
    brand: 'Satra Living',
    brandCategory: 'satra-living',
    price: 0,
    image: '/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg',
    secondaryImage: '/images/Category_image/premium_velvet/royale3.jpeg',
    description: 'Permanent keepsake box for personal treasures.',
  },
];

function ArchivedHouseOfSatraHomePage() {
  // Original multi-brand Maison implementation preserved here.
}
═══════════════════════════════════════════════════════════════════════════════ */
