'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import Image from 'next/image';

const titleContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// Matches the footer wordmark's restrained rise, blur and ease.
const titleWord: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroTitle() {
  const reduceMotion = useReducedMotion();

  return <motion.div
    className="tgg-hero-title"
    variants={titleContainer}
    initial={reduceMotion ? false : 'hidden'}
    animate={reduceMotion ? 'show' : undefined}
    whileInView={reduceMotion ? undefined : 'show'}
    viewport={{ once: true, margin: '-60px' }}
  >
    <motion.h1 id="hero-title" className="tgg-hero-monogram" aria-label="The Gourmet Gifts" variants={reduceMotion ? { show: { opacity: 1, y: 0, scale: 1, filter: 'none', transition: { duration: 0 } } } : titleWord}>
      <Image src="/images/brand/hero-monogram.png" alt="" aria-hidden="true" width={1494} height={788} sizes="(max-width: 700px) 86vw, (max-width: 878px) 82vw, 720px" preload />
    </motion.h1>
  </motion.div>;
}
