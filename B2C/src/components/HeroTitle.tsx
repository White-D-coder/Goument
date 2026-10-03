'use client';

import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const titleWords = ['Thoughtful', 'gifts', 'for', 'brighter', 'moments.'];

const titleContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15,
    },
  },
};

const titleWordVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
    filter: 'blur(12px)',
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const subtitleVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const buttonsVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroTitle() {
  return (
    <div className="gift-hero-content">
      <motion.h1
        id="hero-title"
        variants={titleContainer}
        initial="hidden"
        animate="show"
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            variants={titleWordVariant}
            className="hero-animated-word"
            style={{ display: 'inline-block' }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        className="hero-description"
        variants={subtitleVariant}
        initial="hidden"
        animate="show"
      >
        Little luxuries for the people who matter.
      </motion.p>

      <motion.div
        className="hero-buttons"
        variants={buttonsVariant}
        initial="hidden"
        animate="show"
      >
        <Link href="/shop" className="button light">
          Shop the Collection <ArrowRight size={15} aria-hidden="true" />
        </Link>
        <Link href="#occasions" className="button outline-light">
          By Occasion <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  );
}
