'use client';

import React from 'react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

interface SectionHeaderProps {
  label?: string;
  heading: string;
  body?: string;
  align?: 'left' | 'center';
  showRule?: boolean;
  dark?: boolean;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  heading,
  body,
  align = 'left',
  showRule = false,
  dark = false,
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const textColor = dark ? 'text-[#F6F4EF]' : 'text-[#1A1A18]';
  const mutedColor = dark ? 'text-[#B5AFA6]' : 'text-[#8A8680]';
  const ruleColor = dark ? 'bg-[#B5AFA6]/30' : 'bg-[#E0DDD6]';

  return (
    <div className={`max-w-[720px] ${alignClass} ${className}`}>
      <ScrollReveal animation="fadeUp" duration={0.7}>
        <div className="space-y-5">
          {label && (
            <span className={`type-meta ${mutedColor} block`}>
              {label}
            </span>
          )}
          <h2 className={`type-heading ${textColor}`}>
            {heading}
          </h2>
          {body && (
            <p className={`type-body ${mutedColor} max-w-[560px] ${align === 'center' ? 'mx-auto' : ''}`}>
              {body}
            </p>
          )}
          {showRule && (
            <div className={`w-16 h-px ${ruleColor} ${align === 'center' ? 'mx-auto' : ''} mt-6`} />
          )}
        </div>
      </ScrollReveal>
    </div>
  );
};
