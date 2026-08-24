'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Check, Plus, Minus, ShoppingBag, ArrowLeft, Package, Layers } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import { HAMPERS_CATALOG, CATALOGUE_CATEGORIES, HamperData } from '@/data/hampersData';
import { SIGNATURE_BOXES, CustomBoxItem } from '@/features/ecommerce/CustomGiftBoxesSection';
import toast from 'react-hot-toast';

function CustomizeStudioContent() {
  const searchParams = useSearchParams();
  const boxParam = searchParams.get('box');
  const addItem = useCartStore((state) => state.addItem);

  const [selectedBox, setSelectedBox] = useState<CustomBoxItem>(() => {
    if (boxParam) {
      const found = SIGNATURE_BOXES.find((b) => b.id === boxParam);
      if (found) return found;
    }
    return SIGNATURE_BOXES[0];
  });

  const [activeCategory, setActiveCategory] = useState<string>('gourmet-food');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [customMessage, setCustomMessage] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');

  useEffect(() => {
    if (boxParam) {
      const found = SIGNATURE_BOXES.find((b) => b.id === boxParam);
      if (found) setSelectedBox(found);
    }
  }, [boxParam]);

  const totalFilledItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
  const remainingSlots = Math.max(0, selectedBox.capacitySlots - totalFilledItems);
  const isBoxFull = totalFilledItems >= selectedBox.capacitySlots;

  const filteredItems = HAMPERS_CATALOG.filter((h) => h.category === activeCategory);
  const activeCategoryMeta = CATALOGUE_CATEGORIES.find((c) => c.id === activeCategory);

  const handleToggleItem = (item: HamperData, delta: number) => {
    const currentQty = selectedItems[item._id] || 0;

    if (delta > 0 && isBoxFull) {
      toast.error(
        `Your ${selectedBox.name} is full (${selectedBox.capacitySlots}/${selectedBox.capacitySlots} slots filled). Remove an item to add another.`,
        {
          style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        }
      );
      return;
    }

    const nextQty = Math.max(0, currentQty + delta);
    setSelectedItems((prev) => {
      const copy = { ...prev };
      if (nextQty === 0) {
        delete copy[item._id];
      } else {
        copy[item._id] = nextQty;
      }
      return copy;
    });

    if (delta > 0) {
      toast.success(`Added ${item.name} (${totalFilledItems + 1}/${selectedBox.capacitySlots} filled)`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 1000,
      });
    }
  };

  const handleAddCustomHamperToBag = async () => {
    if (totalFilledItems === 0) {
      toast.error('Please select at least 1 delicacy to place inside your custom box.', {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      });
      return;
    }

    await addItem({
      productId: `custom-${selectedBox.id}-${Date.now()}`,
      giftBoxingType: selectedBox.id,
      quantity: 1,
      name: `Custom ${selectedBox.name} (${totalFilledItems}/${selectedBox.capacitySlots} Items)`,
      price: 0,
      image: selectedBox.image,
    });

    toast.success(`Bespoke ${selectedBox.name} added to your curation tray!`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      duration: 2000,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 text-[#1A1A18]">
      <div className="max-w-[1360px] mx-auto space-y-10">

        {/* ─── TOP BREADCRUMB ─── */}
        <div className="flex items-center justify-between">
          <Link
            href="/gourmet-gifts"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#78746D] hover:text-[#1A1A18] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Catalogue</span>
          </Link>

          <span className="text-xs text-[#7A8B6F] font-bold tracking-wider uppercase">
            Bespoke Customizer Studio
          </span>
        </div>

        {/* ─── PAGE HEADER ─── */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Fill Your Custom Keepsake Box
          </h1>
          <p className="text-xs sm:text-sm text-[#78746D] font-light leading-relaxed">
            Select your signature vessel, browse our curated regional delicacies, and customize each slot to your exact preference.
          </p>
        </div>

        {/* ─── STEP 1: CHOOSE BOX FORMAT (Horizontal Scroll) ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl sm:text-2xl font-light text-[#1A1A18]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              1. Selected Box Format
            </h2>
            <span className="text-xs text-[#7A8B6F] font-semibold">
              {selectedBox.capacitySlots} Capacity Slots
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {SIGNATURE_BOXES.map((b) => {
              const isSelected = selectedBox.id === b.id;
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBox(b)}
                  className={`w-[220px] sm:w-[260px] shrink-0 bg-white rounded-2xl p-3.5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1A1A18] ring-2 ring-[#1A1A18] shadow-md'
                      : 'border-[#E0DDD6] hover:border-[#7A8B6F] shadow-2xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF6F0] relative">
                      <Image src={b.image} alt={b.name} fill className="object-cover" />
                      <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {b.capacitySlots} Slots
                      </div>
                    </div>
                    <div className="text-left">
                      <h3
                        className="text-sm sm:text-base font-bold text-[#451B27] line-clamp-1"
                        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                      >
                        {b.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#7A8B6F] mt-0.5">{b.capacitySlots} Capacity Slots</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-black/5 mt-2">
                    <span className="text-[10px] text-[#78746D]">{b.tag}</span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#1A1A18] text-white' : 'border border-[#DDD8CE]'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── LIVE CAPACITY GAUGE & SLOT TRACKER ─── */}
        <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#E0DDD6] shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#E0DDD6] flex items-center justify-center shrink-0">
                <Package className="w-4 h-4 text-[#BFA267]" />
              </div>
              <div className="text-left">
                <h3 className="text-sm sm:text-base font-bold text-[#1A1A18]">
                  {selectedBox.name}
                </h3>
                <p className="text-xs text-[#78746D]">
                  {totalFilledItems} of {selectedBox.capacitySlots} Slots Filled •{' '}
                  <span className={remainingSlots === 0 ? 'text-[#7A8B6F] font-bold' : 'text-[#BFA267] font-semibold'}>
                    {remainingSlots === 0 ? 'Box Complete' : `${remainingSlots} Slots Left`}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isBoxFull ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3E8] border border-[#7A8B6F] text-[#243325] text-xs font-bold">
                  <Check className="w-3.5 h-3.5 text-[#7A8B6F]" />
                  <span>Box Complete</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8EE] border border-[#BFA267] text-[#8C6B28] text-xs font-semibold">
                  <span>Add {remainingSlots} more to complete</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#F0EDE6] h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isBoxFull ? 'bg-[#7A8B6F]' : 'bg-gradient-to-r from-[#DFC299] to-[#F4A896]'
              }`}
              style={{ width: `${Math.min(100, (totalFilledItems / selectedBox.capacitySlots) * 100)}%` }}
            />
          </div>
        </div>

        {/* ─── STEP 2: CATEGORY NAV BUTTONS (Matching Top Catalogue) ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl sm:text-2xl font-light text-[#1A1A18]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              2. Choose Delicacies &amp; Add-ons
            </h2>
          </div>

          <div className="flex items-center justify-start gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-2">
            {CATALOGUE_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1A18] text-white shadow-md'
                      : 'bg-white text-[#5A564F] hover:bg-[#F2ECE1] border border-[#E0DDD6]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* ─── PRODUCT CARDS (Matching KeepsakeEcommerceSection Style) ─── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 pt-2">
            {filteredItems.map((item) => {
              const qty = selectedItems[item._id] || 0;

              return (
                <div
                  key={item._id}
                  className={`bg-white rounded-2xl border p-3.5 flex flex-col justify-between transition-all duration-200 ${
                    qty > 0 ? 'border-[#BFA267] shadow-xs' : 'border-[#E0DDD6] hover:border-[#7A8B6F] shadow-2xs'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#FAF6F0] relative">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      {qty > 0 && (
                        <div className="absolute top-2 right-2 bg-[#1A1A18] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                          {qty}
                        </div>
                      )}
                    </div>

                    <div className="text-left space-y-0.5">
                      <span className="text-[8.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                        {item.categoryLabel}
                      </span>
                      <h4
                        className="text-xs sm:text-sm font-bold text-[#451B27] line-clamp-1"
                        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#78746D] line-clamp-1">
                        {item.packaging_style || 'Curated Delicacy'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2.5">
                    {qty > 0 ? (
                      <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#BFA267] rounded-xl p-1">
                        <button
                          onClick={() => handleToggleItem(item, -1)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded-lg bg-white border border-[#E0DDD6] flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors active:scale-90 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#1A1A18] px-2">{qty}</span>
                        <button
                          onClick={() => handleToggleItem(item, 1)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded-lg bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#451B27] transition-colors active:scale-90 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleToggleItem(item, 1)}
                        disabled={isBoxFull}
                        className={`w-full py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
                          isBoxFull
                            ? 'bg-[#F0EDE6] text-[#8A8680] opacity-50 cursor-not-allowed'
                            : 'bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[#1A1A18] border border-[#E0DDD6] hover:border-[#BFA267] cursor-pointer active:scale-95 shadow-2xs'
                        }`}
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Slot</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── STEP 3: SUMMARY & ATELIER PROPOSAL ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0DDD6] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-3 text-left">
            <h3
              className="text-2xl font-light text-[#1A1A18]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Personalize Calligraphy Gift Card
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#7A8B6F] uppercase tracking-wider block mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Johnathan Sterling or The Sharma Family"
                  className="w-full p-3 bg-[#FAF8F5] border border-[#E0DDD6] rounded-xl text-xs sm:text-sm text-[#1A1A18] focus:outline-none focus:border-[#1A1A18]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#7A8B6F] uppercase tracking-wider block mb-1">
                  Gift Greeting Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Warmest wishes on your festive celebrations..."
                  rows={3}
                  className="w-full p-3 bg-[#FAF8F5] border border-[#E0DDD6] rounded-xl text-xs sm:text-sm text-[#1A1A18] focus:outline-none focus:border-[#1A1A18]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 text-left border-t lg:border-t-0 lg:border-l border-[#E0DDD6] pt-6 lg:pt-0 lg:pl-8">
            <h4
              className="text-lg font-bold text-[#451B27]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Curation Summary
            </h4>

            <div className="space-y-2 text-xs text-[#78746D]">
              <div className="flex justify-between">
                <span>Selected Box</span>
                <span className="font-bold text-[#1A1A18]">{selectedBox.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Delicacies Filled</span>
                <span className="font-bold text-[#1A1A18]">{totalFilledItems} of {selectedBox.capacitySlots} Slots</span>
              </div>
              <div className="flex justify-between">
                <span>Handmade Calligraphy Card</span>
                <span className="font-semibold text-[#7A8B6F]">Included</span>
              </div>
              <div className="flex justify-between">
                <span>Pricing &amp; Lookbook</span>
                <span className="font-semibold text-[#7A8B6F]">Shared on Inquiry</span>
              </div>
            </div>

            <button
              onClick={handleAddCustomHamperToBag}
              className="w-full py-4 bg-[#1A1A18] hover:bg-[#38332B] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-[#EADBCA]" />
              <span>Add Custom Hamper to Curation Tray ({totalFilledItems} Items)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF8F5]">Loading Studio...</div>}>
      <CustomizeStudioContent />
    </Suspense>
  );
}
