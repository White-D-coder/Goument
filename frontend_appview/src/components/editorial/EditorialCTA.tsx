'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface EditorialCTAProps {
  label: string;
  href: string;
  dark?: boolean;
  className?: string;
}

export const EditorialCTA: React.FC<EditorialCTAProps> = ({
  label,
  href,
  dark = false,
  className = '',
}) => {
  const color = dark ? 'text-[#F6F4EF]' : 'text-[#1A1A18]';

  return (
    <Link
      href={href}
      className={`editorial-link type-meta ${color} inline-flex items-center gap-2 ${className}`}
    >
      <span>{label}</span>
      <ArrowRight className="w-3 h-3" />
    </Link>
  );
};
