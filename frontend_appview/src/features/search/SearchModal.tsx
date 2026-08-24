'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Package } from 'lucide-react';
import { HAMPERS_CATALOG, HamperData } from '@/data/hampersData';
import { SIGNATURE_BOXES, CustomBoxItem } from '@/features/ecommerce/CustomGiftBoxesSection';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<(HamperData | CustomBoxItem)[]>([]);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!query.trim()) {
      setResults(HAMPERS_CATALOG.slice(0, 6));
      return;
    }

    const q = query.toLowerCase().trim();
    const matchedHampers = HAMPERS_CATALOG.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.categoryLabel.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
    );
    const matchedBoxes = SIGNATURE_BOXES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.tagline.toLowerCase().includes(q) ||
        b.tag.toLowerCase().includes(q)
    );

    setResults([...matchedHampers, ...matchedBoxes]);
  }, [query]);

  const handleAddSample = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: item._id || item.id,
      giftBoxingType: item.category || item.id,
      quantity: 1,
      name: item.name,
      price: 0,
      image: item.image,
    });

    toast.success(`Added ${item.name} to Curation Tray`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      duration: 1500,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl bg-[#FAF8F5] border border-[#DDD8CE] shadow-2xl overflow-hidden rounded-2xl flex flex-col max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-[#E0DDD6] flex items-center gap-3 bg-white">
              <Search className="w-5 h-5 text-[#8A8680] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search delicacies, keepsake boxes, flavours..."
                className="w-full bg-transparent text-sm sm:text-base text-[#1A1A18] placeholder-[#9E9A92] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#8A8680] hover:text-[#1A1A18] text-xs"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#F2ECE1] text-[#78746D] hover:text-[#1A1A18] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Container */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8B6F] block mb-2">
                {query.trim() ? `Search Results (${results.length})` : 'Popular Delicacies & Keepsakes'}
              </span>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((item: any) => {
                    const isBox = 'capacitySlots' in item;
                    const href = isBox ? `/gourmet-gifts#boxes` : `/gourmet-gifts/${item.slug}`;

                    return (
                      <Link
                        key={item._id || item.id}
                        href={href}
                        onClick={onClose}
                        className="bg-white p-3 rounded-xl border border-[#E0DDD6] hover:border-[#BFA267] flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="text-left min-w-0">
                            <h4 className="text-xs font-semibold text-[#1A1A18] line-clamp-1 group-hover:text-[#7A1C29] transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-[#7A8B6F] block">
                              {isBox ? `${item.capacitySlots} Slots Keepsake` : item.categoryLabel || 'Bespoke Curation'}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => handleAddSample(item, e)}
                          className="px-2.5 py-1 rounded bg-[#FAF8F5] hover:bg-[#1A1A18] hover:text-white border border-[#E0DDD6] text-[10px] font-bold uppercase tracking-wider text-[#1A1A18] transition-colors shrink-0"
                          title="Add to Curation Tray"
                        >
                          + Select
                        </button>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center space-y-2">
                  <Package className="w-8 h-8 text-[#8A8680] mx-auto opacity-60" />
                  <p className="text-xs text-[#78746D]">No matching items found for &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="p-3 bg-[#FAF8F5] border-t border-[#E0DDD6] text-center">
              <Link
                href="/gourmet-gifts"
                onClick={onClose}
                className="text-xs font-semibold text-[#9E7B35] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse Full Catalogue</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
