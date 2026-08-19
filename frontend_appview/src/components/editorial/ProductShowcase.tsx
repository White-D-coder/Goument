'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ProductShowcaseProps {
  image: string;
  secondaryImage?: string;
  collection: string;
  title: string;
  description?: string;
  href?: string;
  aspect?: string;
  className?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  image,
  secondaryImage,
  collection,
  title,
  description,
  href = '#',
  aspect = 'aspect-[4/3]',
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useScrollReveal<HTMLDivElement>({ animation: 'fadeUp', duration: 0.8 });

  return (
    <div
      ref={ref}
      className={`group text-left ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link href={href} className="block">
        <div className={`overflow-hidden ${aspect} bg-[#EFEDE7] relative`}>
          <img
            src={image}
            alt={title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? 'scale-[1.03]' : 'scale-100'
            }`}
          />
          {/* Secondary image crossfade on hover */}
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${title} detail`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
      </Link>

      {/* Text */}
      <div className="pt-5 space-y-1.5">
        <span className="type-meta text-[#B5AFA6] block">{collection}</span>
        <h3 className="type-title text-[#1A1A18]">{title}</h3>
        {description && (
          <p className="type-body text-[#8A8680] text-sm leading-relaxed max-w-md">
            {description}
          </p>
        )}
        <Link
          href={href}
          className="editorial-link type-meta text-[#1A1A18] pt-2 inline-flex items-center gap-1.5"
        >
          <span>Explore</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};
