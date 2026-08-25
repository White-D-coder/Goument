'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Plus, ArrowRight } from 'lucide-react';
import { useCartStore, isBoxItemKey, BOX_CAPACITIES } from '@/hooks/useCart';
import { usePathname, useRouter } from 'next/navigation';

export const BoxCapacityModal: React.FC = () => {
  const { 
    items: cartItems, 
    isCapacityModalOpen, 
    closeCapacityModal 
  } = useCartStore();

  const pathname = usePathname();
  const router = useRouter();

  const selectedBoxes = cartItems.filter((i) => isBoxItemKey(i.name, i.productId));
  const latestBox = selectedBoxes[selectedBoxes.length - 1];

  const totalBoxCapacity = selectedBoxes.reduce((acc, box) => {
    const cap = BOX_CAPACITIES[box.productId] || 4;
    return acc + cap * box.quantity;
  }, 0);

  const totalDelicacies = cartItems
    .filter((i) => !isBoxItemKey(i.name, i.productId))
    .reduce((acc, i) => acc + i.quantity, 0);

  const handleAddAnotherBox = () => {
    closeCapacityModal();
    if (pathname === '/' || pathname === '/gourmet-gifts') {
      const el = document.getElementById('boxes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/gourmet-gifts#boxes');
    }
  };

  const handleProceedToEnquiry = () => {
    closeCapacityModal();
    if (pathname === '/' || pathname === '/gourmet-gifts') {
      const el = document.getElementById('curation-inquiry');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push('/gourmet-gifts#curation-inquiry');
    }
  };

  return (
    <AnimatePresence>
      {isCapacityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCapacityModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[460px] bg-[#FAF8F5] text-[#1A1A18] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E0D8C8] z-10 space-y-6 text-center"
          >
            
            {/* Close Button */}
            <button
              onClick={closeCapacityModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white border border-[#E0D8C8] flex items-center justify-center text-[#78746D] hover:text-[#1A1A18] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Icon & Status */}
            <div className="space-y-3 pt-2">
              <div className="w-14 h-14 rounded-2xl bg-[#FAF3E6] border border-[#DFC299] flex items-center justify-center mx-auto text-[#9E7B35] shadow-xs">
                <Package className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] font-bold text-[#9E7B35] block">
                  CAPACITY LIMIT REACHED
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-light text-[#1A1A18] tracking-tight leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Your Box is Perfectly Full!
                </h3>
              </div>
            </div>

            {/* Box Details Card */}
            <div className="bg-white rounded-xl border border-[#E8E2D8] p-4 text-left flex items-center gap-3.5 shadow-2xs">
              {latestBox?.image && (
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0 border border-[#EADBCA]">
                  <Image src={latestBox.image} alt={latestBox.name} fill className="object-cover" />
                </div>
              )}
              <div className="space-y-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-semibold text-[#1A1A18] truncate">
                  {latestBox?.name || 'Selected Keepsake Box'}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] text-[#7A8B6F] font-semibold bg-[#EBF3E8] px-2 py-0.5 rounded-full border border-[#7A8B6F]/20">
                    {totalDelicacies} / {totalBoxCapacity} Slots Filled
                  </span>
                  <span className="text-[10.5px] text-[#9E7B35] font-medium">
                    100% Full
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#78746D] leading-relaxed max-w-sm mx-auto">
              This signature vessel holds a maximum of <strong>{totalBoxCapacity} items</strong>. To include more delicacies, you can add another Signature Box or proceed to send your curation enquiry.
            </p>

            {/* CTAs */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleAddAnotherBox}
                className="w-full py-3.5 bg-[#1A1A18] hover:bg-[#3D5244] text-white text-xs font-mono uppercase tracking-[0.16em] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98 rounded-xl"
              >
                <Plus className="w-4 h-4 text-[#DFC299]" />
                <span>Add Another Signature Box</span>
              </button>

              <button
                onClick={handleProceedToEnquiry}
                className="w-full py-3 bg-white hover:bg-[#F3EFEA] border border-[#DDD5C7] text-[#1A1A18] text-xs font-mono uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 rounded-xl"
              >
                <span>Proceed with Current Box</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9E7B35]" />
              </button>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
};
