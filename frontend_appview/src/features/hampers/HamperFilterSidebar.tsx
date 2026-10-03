'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, RotateCcw, ChevronDown, Check } from 'lucide-react';
import {
  HAMPER_TIERS,
  HAMPER_OCCASIONS,
  PRICE_RANGES,
  EcomHamper,
} from '@/data/hampersEcomData';
import { useInquiryModal } from '@/hooks/useInquiryModal';

export interface HamperFiltersState {
  search: string;
  tier: string;
  occasion: string;
  vessel: string;
  priceRange: string;
  readyToShipOnly: boolean;
  customizableOnly: boolean;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'featured', label: 'Featured Curations' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'name-asc', label: 'Alphabetical' },
];

interface HamperFilterSidebarProps {
  filters: HamperFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<HamperFiltersState>>;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  totalMatches: number;
  hampers: EcomHamper[];
  onReset: () => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const HamperFilterSidebar: React.FC<HamperFilterSidebarProps> = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
  totalMatches,
  hampers,
  onReset,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const { openInquiryModal } = useInquiryModal();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters =
    filters.search !== '' ||
    filters.tier !== 'all' ||
    filters.occasion !== 'all' ||
    filters.priceRange !== 'all';

  const getTierCount = (tierId: string) => {
    if (tierId === 'all') return hampers.length;
    return hampers.filter((h) => h.tier === tierId).length;
  };

  const getOccasionCount = (occId: string) => {
    if (occId === 'all') return hampers.length;
    return hampers.filter((h) => h.occasion === occId).length;
  };

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.id === sortBy)?.label || 'Featured Curations';

  return (
    <div
      className={`bg-white rounded-2xl border border-[#E5E0D8] p-4 sm:p-5 shadow-xs transition-all ${
        isMobileDrawer ? 'w-full' : 'w-full'
      }`}
    >
      {/* ─── HEADER: TITLE, COUNT & RESET ─── */}
      <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#ECE7DE]">
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#1A1A18] font-bold">
          Filters
        </span>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8C847B] font-sans font-medium">
            {totalMatches} {totalMatches === 1 ? 'Hamper' : 'Hampers'}
          </span>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs font-semibold text-[#8C7449] hover:text-[#3C0B1E] flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {isMobileDrawer && onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 rounded-lg text-[#666] hover:bg-[#FAF8F5]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ─── SEARCH INPUT ─── */}
      <div className="relative mb-3.5">
        <Search className="w-3.5 h-3.5 text-[#8A8680] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          placeholder="Search hampers..."
          className="w-full pl-8 pr-7 py-1.5 bg-[#FAF8F5] border border-[#DDD8CE] focus:border-[#1A1A18] focus:bg-white rounded-xl text-xs text-[#1A1A18] placeholder-[#8A8680] focus:outline-none transition-all font-sans"
        />
        {filters.search && (
          <button
            onClick={() => setFilters((prev) => ({ ...prev, search: '' }))}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8680] hover:text-[#1A1A18]"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* ─── SORT ORDER (Unboxed with Hover Underline & Chevron Arrow) ─── */}
        <div className="relative pb-3 border-b border-[#ECE7DE]" ref={sortRef}>
          <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#8C847B] font-bold block mb-1.5">
            Sort Order
          </span>

          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-[#1A1A18] cursor-pointer bg-transparent border-0 p-0 outline-none select-none"
          >
            <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#1A1A18] group-hover:after:w-full after:transition-all after:duration-250">
              {currentSortLabel}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#8C847B] group-hover:text-[#1A1A18] transition-transform duration-200 ${
                isSortOpen ? 'rotate-180 text-[#1A1A18]' : ''
              }`}
            />
          </button>

          {isSortOpen && (
            <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.1)] border border-[#E5E0D8] py-1 z-40 animate-in fade-in zoom-in-95 duration-150">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSortBy(opt.id);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-sans transition-colors cursor-pointer flex items-center justify-between ${
                    sortBy === opt.id
                      ? 'bg-[#FAF8F5] text-[#3C0B1E] font-semibold'
                      : 'text-[#4A4742] hover:bg-[#FAF8F5] hover:text-[#1A1A18]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-[#3C0B1E]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ─── SECTION 1: SCALE / TIERS (Side-by-Side 2-Col Text, No Box) ─── */}
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#8C847B] font-bold block mb-2">
            Recipient Scale
          </span>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {HAMPER_TIERS.map((tier) => {
              const isSelected = filters.tier === tier.id;
              const count = getTierCount(tier.id);

              return (
                <button
                  key={tier.id}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      tier: prev.tier === tier.id ? 'all' : tier.id,
                    }))
                  }
                  className={`group flex items-center justify-between py-1 text-left cursor-pointer font-sans transition-colors ${
                    isSelected
                      ? 'text-[#3C0B1E] font-semibold'
                      : 'text-[#5C564E] hover:text-[#1A1A18]'
                  }`}
                >
                  <span className="text-xs truncate mr-1 flex items-center">
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3C0B1E] mr-1.5 shrink-0" />
                    )}
                    <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A18] group-hover:after:w-full after:transition-all after:duration-200">
                      {tier.label}
                    </span>
                  </span>
                  <span
                    className={`text-[10px] font-sans shrink-0 ${
                      isSelected ? 'text-[#3C0B1E] font-medium' : 'text-[#8C847B]'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── SECTION 2: FESTIVE & OCCASIONS (Side-by-Side 2-Col Text, No Box) ─── */}
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#8C847B] font-bold block mb-2">
            Festive & Occasions
          </span>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {HAMPER_OCCASIONS.map((occ) => {
              const isSelected = filters.occasion === occ.id;
              const count = getOccasionCount(occ.id);

              return (
                <button
                  key={occ.id}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      occasion: prev.occasion === occ.id ? 'all' : occ.id,
                    }))
                  }
                  className={`group flex items-center justify-between py-1 text-left cursor-pointer font-sans transition-colors ${
                    isSelected
                      ? 'text-[#8C7449] font-semibold'
                      : 'text-[#5C564E] hover:text-[#1A1A18]'
                  }`}
                >
                  <span className="text-xs truncate mr-1 flex items-center">
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8C7449] mr-1.5 shrink-0" />
                    )}
                    <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#8C7449] group-hover:after:w-full after:transition-all after:duration-200">
                      {occ.shortLabel}
                    </span>
                  </span>
                  <span
                    className={`text-[10px] font-sans shrink-0 ${
                      isSelected ? 'text-[#8C7449] font-medium' : 'text-[#8C847B]'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── SECTION 3: BUDGET (Side-by-Side 2-Col Text, No Box) ─── */}
        <div>
          <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#8C847B] font-bold block mb-2">
            Budget
          </span>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
            {PRICE_RANGES.map((range) => {
              const isSelected = filters.priceRange === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: prev.priceRange === range.id ? 'all' : range.id,
                    }))
                  }
                  className={`text-left py-1 text-xs font-sans transition-colors cursor-pointer flex items-center ${
                    isSelected
                      ? 'text-[#3C0B1E] font-semibold'
                      : 'text-[#5C564E] hover:text-[#1A1A18]'
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3C0B1E] mr-1.5 shrink-0" />
                  )}
                  <span className="relative pb-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#1A1A18] group-hover:after:w-full after:transition-all after:duration-200">
                    {range.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
