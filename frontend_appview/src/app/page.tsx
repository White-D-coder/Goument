'use client';

import React from 'react';
import { HeroSection } from '@/features/hero/HeroSection';
import { HeroSkeleton } from '@/features/hero/HeroSkeleton';
import { CategoryCircles } from '@/features/hero/CategoryCircles';
import { BestsellersCarousel } from '@/features/hero/BestsellersCarousel';
import { ExperienceHighlightsSection } from '@/features/hero/ExperienceHighlightsSection';
import { SpottedSection } from '@/features/hero/SpottedSection';
import { useHeroData } from '@/hooks/useHeroData';

export default function HomePage() {
  const { isLoading } = useHeroData();

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2]">
      {isLoading ? <HeroSkeleton /> : <HeroSection />}
      <CategoryCircles />
      <BestsellersCarousel />
      <ExperienceHighlightsSection />
      <SpottedSection />
    </div>
  );
}
