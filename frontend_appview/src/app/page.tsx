'use client';

import React from 'react';
import { HeroSection } from '@/features/hero/HeroSection';
import { HeroSkeleton } from '@/features/hero/HeroSkeleton';
import { FeatureBadges } from '@/features/hero/FeatureBadges';
import { BestsellersCarousel } from '@/features/hero/BestsellersCarousel';
import { GiftBoxingCards } from '@/features/hero/GiftBoxingCards';
import { GiftBoxingCardSkeleton } from '@/features/hero/GiftBoxingCardSkeleton';
import { useHeroData } from '@/hooks/useHeroData';

export default function HomePage() {
  const { data: cards, isLoading } = useHeroData();

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading ? <HeroSkeleton /> : <HeroSection />}
      <FeatureBadges />
      <BestsellersCarousel />
      {isLoading || !cards ? (
        <GiftBoxingCardSkeleton />
      ) : (
        <GiftBoxingCards cards={cards} />
      )}
    </div>
  );
}
