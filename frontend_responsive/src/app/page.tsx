'use client';

import React from 'react';
import { ResponsiveHero } from '@/components/ResponsiveHero';
import { ResponsiveProductGrid } from '@/components/ResponsiveProductGrid';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-12">
      <ResponsiveHero />
      <ResponsiveProductGrid />
    </div>
  );
}
