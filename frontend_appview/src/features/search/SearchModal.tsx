'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { getProducts } from '@/shared/api/endpoints';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';
import { useCartStore } from '@/hooks/useCart';
import { DEMO_BESTSELLERS } from '@/utils/constants';
import toast from 'react-hot-toast';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!query.trim()) {
      setResults(DEMO_BESTSELLERS);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await getProducts({ search: query.trim() });
        const items = response?.data?.products || response?.data || DEMO_BESTSELLERS;
        setResults(items);
      } catch (err) {
        // Fallback filter locally if backend is unavailable
        const filtered = DEMO_BESTSELLERS.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleQuickAdd = async (product: any) => {
    await addItem({
      productId: product._id || product.id,
      giftBoxingType: 'classics',
      quantity: 1,
      name: product.name,
      price: product.basePrice || product.price || 249900,
      image: product.image || product.heroImage,
    });

    toast.success(`Added ${product.name} to bag!`, {
      style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-md mx-auto bg-[#FAF7F2] p-4 shadow-2xl z-10 border-b border-[#E8DFC8] space-y-3"
          >
            {/* Search Bar Input */}
            <div className="flex items-center gap-2 bg-[#FFFFFF] border border-[#E8DFC8] rounded-2xl px-3 py-2.5 shadow-xs">
              <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search luxury gift boxes, truffles, chocolates..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-xs font-medium text-[#2A231F] bg-transparent focus:outline-none placeholder:text-[#6E6259]"
              />
              <button
                onClick={onClose}
                className="p-1 text-[#6E6259] hover:text-[#2A231F]"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Title */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold tracking-wider text-[#6E6259] uppercase">
                {query ? `Results for "${query}"` : 'Popular Searches'}
              </span>
              {loading && (
                <span className="text-[10px] font-semibold text-[#D4AF37] animate-pulse">
                  Searching...
                </span>
              )}
            </div>

            {/* Product List */}
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {results.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#6E6259]">
                  No gourmet items match your search query.
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product._id || product.id}
                    className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-2.5 flex items-center justify-between shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 relative rounded-xl overflow-hidden shrink-0">
                        <ImageWithShimmer
                          src={product.image || product.heroImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif-luxury text-xs font-bold text-[#2A231F]">
                          {product.name}
                        </h4>
                        <span className="font-sans text-[11px] font-bold text-[#a6bd93]">
                          Handcrafted
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="p-2 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
