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

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, closeDrawer]);

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleProceedToEnquiry = () => {
    closeDrawer();
    if (pathname === '/' || pathname === '/gourmet-gifts') {
      const el = document.getElementById('curation-inquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/gourmet-gifts#curation-inquiry');
    }
  };

  return (
    <>
      {/* ── FLOATING SLIDING DOOR TAB (VISIBLE WHEN TRAY HAS ITEMS & CLOSED) ── */}
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

      {/* ── FULL SLIDING DOOR DRAWER ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* ── BACKDROP BLUR ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/45 backdrop-blur-[3px]"
            />

            {/* ── SLIDE-OUT RIGHT SIDEBAR DRAWER ── */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280, mass: 0.75 }}
              className="relative w-full max-w-[420px] h-full bg-[#FAF8F5] text-[#1A1A18] shadow-2xl flex flex-col justify-between z-10 border-l border-[#E5E0D8]"
            >
              
              {/* ── 1. DRAWER HEADER ── */}
              <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#E8E4DC] flex items-center justify-between bg-white/80 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#7A8B6F] animate-pulse" />
                  <h3
                    className="text-xl sm:text-2xl font-light text-[#1A1A18] tracking-tight"
                    style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                  >
                    Curation Tray
                  </h3>
                  <span className="text-[11px] font-semibold text-[#7A8B6F] bg-[#EBF3E8] px-2.5 py-0.5 rounded-full border border-[#7A8B6F]/20">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <button
                  onClick={closeDrawer}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#78746D] hover:text-[#1A1A18] hover:bg-[#EAE5DC] transition-colors cursor-pointer"
                  aria-label="Close tray"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ── 2. SCROLLABLE SAMPLES LIST ── */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
                {/* Box Capacity Status Banner */}
                {totalBoxCapacity > 0 && (
                  <div className="bg-[#FAF3E6] border border-[#EADBCA] rounded-xl p-3 flex items-center justify-between text-xs shadow-2xs">
                    <div className="flex items-center gap-2 text-[#9E7B35] font-medium">
                      <Package className="w-4 h-4 shrink-0" />
                      <span>Box Capacity:</span>
                    </div>
                    <span className={`font-bold px-2 py-0.5 rounded-md ${
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
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white rounded-xl border border-[#E5E0D8] p-3.5 flex items-center justify-between gap-3 shadow-2xs"
                        >
                          {/* Thumbnail & Title */}
                          <div className="flex items-center gap-3 min-w-0">
                            {item.image && (
                              <div className="w-13 h-13 rounded-lg overflow-hidden bg-[#FAF6F0] relative shrink-0 border border-[#EADBCA]">
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                              </div>
                            )}
                            <div className="text-left space-y-0.5 min-w-0">
                              <h4 className="text-xs sm:text-sm font-semibold text-[#1A1A18] truncate">
                                {item.name}
                              </h4>
                              <span className="text-[10px] text-[#7A8B6F] font-semibold block">
                                Attached Sample
                              </span>
                            </div>
                          </div>

                          {/* Stepper Controls */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => {
                                if (item.quantity <= 1) {
                                  removeItem(item.id);
                                } else {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="w-6 h-6 rounded bg-[#FAF8F5] border border-[#DDD8CE] flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#1A1A18] min-w-[18px] text-center select-none">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#BFA267] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-6 h-6 ml-0.5 flex items-center justify-center text-[#9E9A92] hover:text-[#9A2C2C] transition-colors cursor-pointer"
                              title="Remove sample"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-2 text-center">
                      <button
                        onClick={clearCart}
                        className="text-[11px] text-[#9E9A92] hover:text-[#9A2C2C] underline transition-colors cursor-pointer"
                      >
                        Clear all samples
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#EAE5DC] flex items-center justify-center mx-auto text-[#78746D]">
                      <Package className="w-6 h-6" />
                    </div>
                    <h4
                      className="text-xl font-light text-[#1A1A18]"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      Your Tray is Empty
                    </h4>
                    <p className="text-xs text-[#78746D] max-w-[240px] mx-auto leading-relaxed">
                      Select delicacies, signature boxes, or corporate executive gifts to attach them to your bespoke enquiry.
                    </p>
                  </div>
                )}
              </div>

              {/* ── 3. DRAWER FOOTER / PROCEED CTA ── */}
              <div className="p-5 sm:p-6 border-t border-[#E8E4DC] bg-white/95 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#78746D]">
                  <span>Attached Project Samples:</span>
                  <span className="font-bold text-[#1A1A18]">{totalItemCount} items</span>
                </div>

                <button
                  onClick={handleProceedToEnquiry}
                  disabled={cartItems.length === 0}
                  className="w-full py-3.5 bg-[#1A1A18] hover:bg-[#38332B] disabled:bg-[#D0CBC0] disabled:cursor-not-allowed text-white text-xs font-mono uppercase tracking-[0.18em] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Proceed to Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFC299]" />
                </button>

                <button
                  onClick={closeDrawer}
                  className="w-full text-center text-xs text-[#78746D] hover:text-[#1A1A18] transition-colors py-1 cursor-pointer"
                >
                  Continue Exploring
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
};
