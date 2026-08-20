'use client';

import React from 'react';
import { useParallax } from '@/hooks/useScrollReveal';

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  aspect?: string;
  className?: string;
  priority?: boolean;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  speed = 0.12,
  aspect = 'aspect-[4/5]',
  className = '',
  priority = false,
}) => {
  // Reduce parallax on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveSpeed = isMobile ? speed * 0.5 : speed;
  const ref = useParallax<HTMLDivElement>(effectiveSpeed);

  return (
    <div className={`overflow-hidden ${aspect} ${className}`}>
      <div ref={ref} className="w-full h-[120%] -mt-[10%]">
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
