'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleReveal' | 'maskReveal';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: React.ElementType;
  staggerChildren?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.9,
  stagger = 0.12,
  className = '',
  as: Component = 'div',
  staggerChildren = false,
}) => {
  const ref = useScrollReveal<HTMLDivElement>({
    animation,
    delay,
    duration,
    stagger,
    children: staggerChildren,
  });

  return (
    <Component ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Component>
  );
};
