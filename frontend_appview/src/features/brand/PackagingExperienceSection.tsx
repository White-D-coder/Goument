'use client';

import React from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from 'framer-motion';

export const ROW_1_BOXES = [
  {
    title: 'The Royal Burgundy Book Box',
    link: '#packaging',
    thumbnail: '/images/packaging/box_burgundy.jpg',
  },
  {
    title: 'The Heirloom Drawer Chest',
    link: '#packaging',
    thumbnail: '/images/packaging/box_drawer.jpg',
  },
  {
    title: 'The Imperial Navy Box',
    link: '#packaging',
    thumbnail: '/images/packaging/box_navy.jpg',
  },
  {
    title: 'The Artisanal Rigid Box',
    link: '#packaging',
    thumbnail: '/images/packaging/ChatGPT Image Sep 2, 2026, 05_38_23 PM.png',
  },
];

export const ROW_2_BOXES = [
  {
    title: 'The Botanical Keepsake Chest',
    link: '#packaging',
    thumbnail: '/images/packaging/ChatGPT Image Sep 2, 2026, 05_40_22 PM.png',
  },
  {
    title: 'The Velvet Crest Trunk',
    link: '#packaging',
    thumbnail: '/images/packaging/ChatGPT Image Sep 2, 2026, 05_57_36 PM.png',
  },
  {
    title: 'The Foil Monogram Hamper',
    link: '#packaging',
    thumbnail: '/images/packaging/ChatGPT Image Sep 2, 2026, 06_07_30 PM.png',
  },
  {
    title: 'The Executive Luxury Box',
    link: '#packaging',
    thumbnail: '/images/packaging/ChatGPT Image Sep 2, 2026, 06_11_26 PM.png',
  },
];

// Seamlessly looped arrays (3x repeat for continuous scroll)
export const ROW_1_LOOP = [
  ...ROW_1_BOXES,
  ...ROW_1_BOXES,
  ...ROW_1_BOXES,
];

export const ROW_2_LOOP = [
  ...ROW_2_BOXES,
  ...ROW_2_BOXES,
  ...ROW_2_BOXES,
];

export const PackagingExperienceSection: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springConfig = { stiffness: 220, damping: 28, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [-160, 220]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [160, -220]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 1], [6, 0, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [0.6, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 1], [6, 0, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.4, 1], [-20, 0, 0]),
    springConfig
  );

  return (
    <div
      ref={ref}
      id="packaging"
      className="pt-6 sm:pt-10 md:pt-14 pb-6 sm:pb-10 md:pb-14 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-[#FAF8F5] text-[#1A1A18] scroll-mt-20"
    >
      <PackagingHeader />
      
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="w-full flex flex-col items-center justify-center"
      >
        {/* Row 1: Looped Cards with Clean Inter-Card Gaps (Slides Right) */}
        <motion.div
          style={{ x: translateX }}
          className="flex flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-4 sm:mb-6 md:mb-8 w-max will-change-transform"
        >
          {ROW_1_LOOP.map((product, idx) => (
            <ProductCard
              product={product}
              key={`row1-${product.title}-${idx}`}
            />
          ))}
        </motion.div>
        
        {/* Row 2: Looped Cards with Clean Inter-Card Gaps (Slides Left) */}
        <motion.div
          style={{ x: translateXReverse }}
          className="flex flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-max will-change-transform"
        >
          {ROW_2_LOOP.map((product, idx) => (
            <ProductCard
              product={product}
              key={`row2-${product.title}-${idx}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const PackagingHeader = () => {
  return (
    <div className="text-center max-w-4xl mx-auto px-2 space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
      <h2
        className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
      >
        Packaging That Completes the Experience
      </h2>
      <p className="text-xs md:text-sm text-[#78746D] font-light max-w-3xl mx-auto leading-normal">
        <span className="inline sm:hidden">
          Handcrafted boxes for luxury unboxings.
        </span>
        <span className="hidden sm:inline">
          Bespoke handcrafted boxes for unforgettable unboxing moments.
        </span>
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate?: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={translate ? { x: translate } : undefined}
      whileHover={{
        y: -14,
      }}
      key={product.title}
      className="group/product w-[150px] xs:w-[185px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[340px] aspect-square relative shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#EAE5DC] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-hover/product:shadow-2xl transition-shadow duration-300"
    >
      <div className="block h-full w-full relative">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 185px, (max-width: 1024px) 280px, 340px"
          className="object-cover object-center absolute h-full w-full inset-0 transition-transform duration-700 group-hover/product:scale-106"
        />
      </div>
    </motion.div>
  );
};
