'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ImageRevealProps {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  direction?: 'bottom' | 'left' | 'right' | 'top';
  duration?: number;
}

const directionMap = {
  bottom: 'maskReveal' as const,
  left: 'maskReveal' as const,
  right: 'maskReveal' as const,
  top: 'maskReveal' as const,
};

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspect = 'aspect-[4/5]',
  className = '',
  priority = false,
  direction = 'bottom',
  duration = 1.0,
}) => {
  const ref = useScrollReveal<HTMLDivElement>({
    animation: directionMap[direction],
    duration,
  });

  return (
    <div ref={ref} className={`overflow-hidden ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
