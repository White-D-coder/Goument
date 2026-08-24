'use client';

import { motion, Variants } from 'framer-motion';
import React, { memo, useMemo, useState, useEffect } from 'react';

export interface AnimatedHeadingProps {
  lines: string[];
  className?: string;
  blur?: number;
  stagger?: number;
  duration?: number;
  style?: React.CSSProperties;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  lines = [],
  className = '',
  blur = 10,
  stagger = 0.09,
  duration = 0.8,
  style,
}) => {
  // Key ensures full re-animation on every mount/refresh
  const [mountKey, setMountKey] = useState(0);

  useEffect(() => {
    setMountKey((prev) => prev + 1);
  }, []);

  // 🧠 memoize split words (optimization)
  const splitLines = useMemo(
    () => lines.map((line) => line.split(' ')),
    [lines]
  );

  const container: Variants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: stagger, delayChildren: 0.1 },
      },
    }),
    [stagger]
  );

  const word: Variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 28,
        scale: 0.96,
        filter: `blur(${blur}px)`,
      },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
      },
    }),
    [blur, duration]
  );

  return (
    <motion.h1
      key={mountKey}
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      style={style}
    >
      {splitLines.map((line, lineIndex) => (
        <div
          key={lineIndex}
          className="block whitespace-normal md:whitespace-nowrap overflow-visible"
        >
          {line.map((wordText, i) => (
            <motion.span
              key={i}
              variants={word}
              className="inline-block mr-2 sm:mr-3.5 origin-bottom"
            >
              {wordText}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.h1>
  );
};

export default memo(AnimatedHeading);
