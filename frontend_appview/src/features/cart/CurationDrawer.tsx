'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, Package, ShoppingBag } from 'lucide-react';
import { useCartStore, isBoxItemKey, BOX_CAPACITIES } from '@/hooks/useCart';
import { usePathname, useRouter } from 'next/navigation';

export const CurationDrawer: React.FC = () => {
  const { 
    items: cartItems, 
    isDrawerOpen, 
    openDrawer,
    closeDrawer, 
    updateQuantity, 
    removeItem, 
    clearCart 
  } = useCartStore();

  const pathname = usePathname();
  const router = useRouter();

  const selectedBoxes = cartItems.filter((i) => isBoxItemKey(i.name, i.productId));
  const totalBoxCapacity = selectedBoxes.reduce((acc, box) => {
    const cap = BOX_CAPACITIES[box.productId] || 4;
    return acc + cap * box.quantity;
  }, 0);

  const totalDelicacies = cartItems
    .filter((i) => !isBoxItemKey(i.name, i.productId))
    .reduce((acc, i) => acc + i.quantity, 0);

  // Close tray on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleProceedToEnquiry = () => {
    closeDrawer();
    if (pathname === '/') {
      const el = document.getElementById('curation-inquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#curation-inquiry');
    }
  };

  return (
    <>
      {/* ── FLOATING SLIDING TAB (VISIBLE WHEN TRAY IS CLOSED & HAS ITEMS) ── */}
      <AnimatePresence>
        {!isDrawerOpen && totalItemCount > 0 && (
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            onClick={openDrawer}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#1A1A18] hover:bg-[#3D5244] text-[#FAF8F5] py-3.5 px-2.5 rounded-l-2xl shadow-2xl border-l border-t border-b border-[#C5A880]/50 flex flex-col items-center gap-2 cursor-pointer transition-colors active:scale-95 group"
            title="Open Curation Tray"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#DFC299] group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-[#DFC299] text-[#1A1A18] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            </div>
            <span 
              className="text-[9.5px] font-mono tracking-[0.2em] uppercase writing-vertical text-white/90 group-hover:text-white"
              style={{ writingMode: 'vertical-rl' }}
            >
              Tray
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── COMPACT RIGHT-CENTER FLOATING TRAY (NON-BLOCKING: USER CAN SELECT ITEMS FREELY) ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300, mass: 0.7 }}
            className="fixed right-2 sm:right-5 top-1/2 -translate-y-1/2 z-40 w-[92vw] max-w-[360px] sm:max-w-[380px] max-h-[78vh] flex flex-col bg-[#FAF8F5] text-[#1A1A18] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-[#E0DDD6] overflow-hidden"
          >
            {/* ── 1. COMPACT HEADER ── */}
            <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[#E8E4DC] flex items-center justify-between bg-white/95 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7A8B6F] animate-pulse" />
                <h3
                  className="text-lg sm:text-xl font-light text-[#1A1A18] tracking-tight"
                  style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                >
                  Curation Tray
                </h3>
                <span className="text-[10px] font-bold text-[#7A8B6F] bg-[#EBF3E8] px-2 py-0.5 rounded-full border border-[#7A8B6F]/20">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                </span>
              </div>

              <button
                onClick={closeDrawer}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#78746D] hover:text-[#1A1A18] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
                aria-label="Close tray"
                title="Minimize Tray"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── 2. SCROLLABLE COMPACT SAMPLES LIST ── */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-2.5 no-scrollbar max-h-[46vh]">
              {/* Box Capacity Status Banner */}
              {totalBoxCapacity > 0 && (
                <div className="bg-[#FAF3E6] border border-[#EADBCA] rounded-xl p-2.5 flex items-center justify-between text-xs shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[#9E7B35] font-medium text-[11px]">
                    <Package className="w-3.5 h-3.5 shrink-0" />
                    <span>Box Capacity:</span>
                  </div>
                  <span className={`font-bold text-[11px] px-2 py-0.5 rounded-md ${
                    totalDelicacies >= totalBoxCapacity 
                      ? 'bg-[#9A2C2C]/10 text-[#9A2C2C]' 
                      : 'bg-[#EBF3E8] text-[#7A8B6F]'
                  }`}>
                    {totalDelicacies} / {totalBoxCapacity} Items {totalDelicacies >= totalBoxCapacity ? '• Full' : ''}
                  </span>
                </div>
              )}

              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="bg-white rounded-xl border border-[#E5E0D8] p-2.5 flex items-center justify-between gap-2.5 shadow-2xs"
                      >
                        {/* Thumbnail & Title */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.image && (
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0 border border-[#EADBCA]">
                              <Image src={item.image} alt={item.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="text-left space-y-0.5 min-w-0">
                            <h4 className="text-xs font-semibold text-[#1A1A18] truncate max-w-[140px] sm:max-w-[170px]">
                              {item.name}
                            </h4>
                            <span className="text-[9.5px] text-[#7A8B6F] font-semibold block">
                              Attached Sample
                            </span>
                          </div>
                        </div>

                        {/* Stepper Controls */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) {
                                removeItem(item.id);
                              } else {
                                updateQuantity(item.id, item.quantity - 1);
                              }
                            }}
                            className="w-5.5 h-5.5 rounded bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-bold text-[#1A1A18] min-w-[16px] text-center select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-5.5 h-5.5 rounded bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#BFA267] transition-colors cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-5.5 h-5.5 ml-0.5 flex items-center justify-center text-[#9E9A92] hover:text-[#9A2C2C] transition-colors cursor-pointer"
                            title="Remove sample"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-1 text-center">
                    <button
                      onClick={clearCart}
                      className="text-[10px] text-[#9E9A92] hover:text-[#9A2C2C] underline transition-colors cursor-pointer"
                    >
                      Clear all samples
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center space-y-2">
                  <div className="w-9 h-9 rounded-full bg-[#EAE5DC] flex items-center justify-center mx-auto text-[#78746D]">
                    <Package className="w-4 h-4" />
                  </div>
                  <h4
                    className="text-base font-light text-[#1A1A18]"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Your Tray is Empty
                  </h4>
                  <p className="text-[11px] text-[#78746D] max-w-[200px] mx-auto leading-relaxed">
                    Select delicacies or signature boxes to attach them.
                  </p>
                </div>
              )}
            </div>

            {/* ── 3. COMPACT FOOTER / PROCEED CTA ── */}
            <div className="p-3.5 sm:p-4 border-t border-[#E8E4DC] bg-white/95 space-y-2 shrink-0">
              <button
                onClick={handleProceedToEnquiry}
                disabled={cartItems.length === 0}
                className="w-full py-2.5 bg-[#1A1A18] hover:bg-[#38332B] disabled:bg-[#D0CBC0] disabled:cursor-not-allowed text-white text-[11px] font-mono uppercase tracking-[0.16em] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 rounded-lg"
              >
                <span>Proceed to Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DFC299]" />
              </button>

              <button
                onClick={closeDrawer}
                className="w-full text-center text-[10.5px] text-[#78746D] hover:text-[#1A1A18] transition-colors py-0.5 cursor-pointer"
              >
                Continue Exploring (Minimize)
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
