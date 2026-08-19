'use client';

import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ImageRevealProps {
  src: string;
  alt: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspect = 'aspect-[4/5]',
  className = '',
  priority = false,
}) => {
  const ref = useScrollReveal<HTMLDivElement>({
    animation: 'maskReveal',
    duration: 1.1,
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
