'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { ECOM_HAMPERS, EcomHamper, HAMPER_TIERS, HAMPER_OCCASIONS } from '@/data/hampersEcomData';
import { HamperFilterSidebar, HamperFiltersState, SortOption } from './HamperFilterSidebar';
import { HamperCard } from './HamperCard';
import { HamperUnboxModal } from './HamperUnboxModal';

const INITIAL_FILTERS: HamperFiltersState = {
  search: '',
  tier: 'all',
  occasion: 'all',
  vessel: 'all',
  priceRange: 'all',
  readyToShipOnly: false,
  customizableOnly: false,
};

export default function HampersEcomView() {
  const [filters, setFilters] = useState<HamperFiltersState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedHamperForUnbox, setSelectedHamperForUnbox] = useState<EcomHamper | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Filter Logic
  const filteredHampers = useMemo(() => {
    return ECOM_HAMPERS.filter((hamper) => {
      // 1. Search Query
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = hamper.name.toLowerCase().includes(query);
        const matchesSubtitle = hamper.subtitle.toLowerCase().includes(query);
        const matchesOccasion = hamper.occasionLabel.toLowerCase().includes(query);
        const matchesTier = hamper.tierLabel.toLowerCase().includes(query);
        const matchesContents = hamper.contents.some((c) =>
          c.name.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesSubtitle && !matchesOccasion && !matchesTier && !matchesContents) {
          return false;
        }
      }

      // 2. Recipient Scale / Tier
      if (filters.tier !== 'all' && hamper.tier !== filters.tier) {
        return false;
      }

      // 3. Occasion
      if (filters.occasion !== 'all' && hamper.occasion !== filters.occasion) {
        return false;
      }

      // 4. Vessel
      if (filters.vessel !== 'all' && hamper.vesselType !== filters.vessel) {
        return false;
      }

      // 5. Price Range
      if (filters.priceRange !== 'all') {
        if (filters.priceRange === 'under-2000' && hamper.price >= 2000) return false;
        if (filters.priceRange === '2000-4000' && (hamper.price < 2000 || hamper.price > 4000)) return false;
        if (filters.priceRange === '4000-7000' && (hamper.price < 4000 || hamper.price > 7000)) return false;
        if (filters.priceRange === 'above-7000' && hamper.price < 7000) return false;
      }

      return true;
    });
  }, [filters]);

  // Sort Logic
  const sortedHampers = useMemo(() => {
    const list = [...filteredHampers];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredHampers, sortBy]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] pt-18 sm:pt-24 pb-16">
      
      {/* ─── TOP HEADER SECTION: BREADCRUMB & CENTERED TITLE ─── */}
      <section className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#8C847B] mb-2 sm:mb-3">
          <Link href="/" className="hover:text-[#1A1A18] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#B5AFA6]" />
          <span className="text-[#1A1A18] font-medium">Curated Hampers</span>
        </nav>

        <div className="text-center max-w-2xl mx-auto py-1">
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] tracking-[-0.02em] leading-[1.08] sm:leading-[1.04]"
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontWeight: 300,
            }}
          >
            Curated Gift Hampers
          </h1>
          <p className="text-xs sm:text-sm text-[#78746D] font-light mt-1 max-w-lg mx-auto leading-relaxed">
            Artisanal keepsake boxes and celebratory suites curated for shared moments.
          </p>
        </div>
      </section>

      {/* ─── MOBILE QUICK FILTER HORIZONTAL SCROLL STRIP ─── */}
      <div className="lg:hidden w-full mb-4 py-1">
        <div className="flex gap-2 overflow-x-auto px-4 py-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => setFilters((p) => ({ ...p, tier: 'all', occasion: 'all' }))}
            className={`px-3 py-1.5 rounded-full text-xs shrink-0 font-medium transition-colors ${
              filters.tier === 'all' && filters.occasion === 'all'
                ? 'bg-[#1A1A18] text-[#DFC299]'
                : 'bg-white text-[#423E39] border border-[#E0DDD6]'
            }`}
          >
            All Hampers
          </button>

          {HAMPER_TIERS.filter((t) => t.id !== 'all').map((tier) => {
            const isSelected = filters.tier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    tier: p.tier === tier.id ? 'all' : tier.id,
                  }))
                }
                className={`px-3 py-1.5 rounded-full text-xs shrink-0 font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#3C0B1E] text-[#DFC299]'
                    : 'bg-white text-[#423E39] border border-[#E0DDD6]'
                }`}
              >
                {tier.label}
              </button>
            );
          })}

          {HAMPER_OCCASIONS.filter((o) => o.id !== 'all').map((occ) => {
            const isSelected = filters.occasion === occ.id;
            return (
              <button
                key={occ.id}
                onClick={() =>
                  setFilters((p) => ({
                    ...p,
                    occasion: p.occasion === occ.id ? 'all' : occ.id,
                  }))
                }
                className={`px-3 py-1.5 rounded-full text-xs shrink-0 font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#1A1A18] text-[#DFC299]'
                    : 'bg-white text-[#423E39] border border-[#E0DDD6]'
                }`}
              >
                {occ.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── MAIN WORKSPACE: SIDEBAR ON DESKTOP & PRODUCT GRID ─── */}
      <main className="max-w-[1580px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Desktop Left Sidebar: Starts at top of grid and sticks on scroll */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-24 self-start">
            <HamperFilterSidebar
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalMatches={sortedHampers.length}
              hampers={ECOM_HAMPERS}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Right Product Grid: Aligned with the top of the sidebar container! */}
          <section className="lg:col-span-8 xl:col-span-9 w-full">
            {/* Mobile Only Header Toolbar */}
            <div className="lg:hidden flex items-center justify-between pb-3 mb-3 border-b border-[#ECE7DE]">
              <span className="text-xs font-semibold text-[#1A1A18] font-sans">
                {sortedHampers.length} {sortedHampers.length === 1 ? 'Hamper' : 'Hampers'}
              </span>
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#DDD8CE] text-xs font-medium"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#8C7449]" />
                <span>Filters</span>
              </button>
            </div>

            {/* Product Grid starts at the EXACT same vertical baseline as the filter sidebar */}
            {sortedHampers.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
                {sortedHampers.map((hamper) => (
                  <HamperCard
                    key={hamper.id}
                    hamper={hamper}
                    onOpenUnboxModal={(h) => setSelectedHamperForUnbox(h)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#EFEAE2] p-10 text-center space-y-3">
                <h3 className="text-base font-semibold text-[#1A1A18] font-sans">
                  No Hampers Found
                </h3>
                <p className="text-xs text-[#78746D] font-light max-w-sm mx-auto">
                  Try adjusting your filters or search keywords to find matching curations.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3C0B1E] text-[#DFC299] text-xs font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              </div>
            )}
          </section>

        </div>
      </main>

      {/* ─── MOBILE FILTER BOTTOM DRAWER ─── */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setIsMobileDrawerOpen(false)}
          />

          <div className="relative bg-white rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto z-10 shadow-2xl">
            <HamperFilterSidebar
              filters={filters}
              setFilters={setFilters}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalMatches={sortedHampers.length}
              hampers={ECOM_HAMPERS}
              onReset={handleResetFilters}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
            />

            <div className="pt-3 mt-3 border-t border-[#ECE7DE]">
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl bg-[#3C0B1E] text-[#DFC299] text-xs font-sans font-semibold uppercase tracking-wider text-center cursor-pointer"
              >
                View {sortedHampers.length} Hampers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── INTERACTIVE UNBOXING INSPECT MODAL ─── */}
      <HamperUnboxModal
        hamper={selectedHamperForUnbox}
        onClose={() => setSelectedHamperForUnbox(null)}
      />
    </div>
  );
}
