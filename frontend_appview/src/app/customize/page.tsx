'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, Plus, Minus, ShoppingBag, ArrowRight, Package, AlertCircle, Sparkle } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import { HAMPERS_CATALOG } from '@/data/hampersData';
import toast from 'react-hot-toast';

interface CustomBoxFormat {
  id: string;
  name: string;
  capacity: number; // Max delicacies / items that fit
  price: number;
  image: string;
  dimensions: string;
  description: string;
  accentColor: string;
}

const CUSTOM_BOX_FORMATS: CustomBoxFormat[] = [
  {
    id: 'maroon-bloom-4',
    name: 'Maroon Bloom Magnetic Box',
    capacity: 4,
    price: 1450,
    image: '/images/catalogue_items/maroon_bloom_box.jpg',
    dimensions: '4 Compartments • Crushed Satin Bedding',
    description: 'Rich florals and deep burgundy tones with magnetic closure. Holds up to 4 gourmet delicacies.',
    accentColor: '#F4A896',
  },
  {
    id: 'heritage-chest-6',
    name: 'Heritage Six-Katori Keepsake Chest',
    capacity: 6,
    price: 1850,
    image: '/images/catalogue_items/gourmet_food_hero_box.jpg',
    dimensions: '6 Gold Katoris • Brass Clasp Lock',
    description: 'Royal presentation chest fitted with 6 individual golden katoris for regional gourmet treats.',
    accentColor: '#DFC299',
  },
  {
    id: 'midnight-bloom-5',
    name: 'Midnight Bloom Designer Box',
    capacity: 5,
    price: 1550,
    image: '/images/catalogue_items/midnight_bloom_box.jpg',
    dimensions: '5 Velvet Compartments • Gold Botanical Foil',
    description: 'Bold navy textured finish with royal blue silk interior. Houses 5 curated delights.',
    accentColor: '#98C1A9',
  },
  {
    id: 'two-tier-luxe-8',
    name: 'Two-Tier Grand Luxe Chest',
    capacity: 8,
    price: 2450,
    image: '/images/catalogue_items/two_tier_luxe_box.jpg',
    dimensions: '8 Items • Two Sliding Velvet Drawers',
    description: 'Double the luxury with sliding drawer compartments holding up to 8 signature treats & relics.',
    accentColor: '#E3A8BC',
  },
];

// Available items to fill into custom box
const CUSTOMIZABLE_ITEMS = HAMPERS_CATALOG.map((item) => ({
  id: item._id,
  name: item.name,
  category: item.categoryLabel,
  price: item.price,
  image: item.image,
  weight: item.inside_items[0]?.weight || 'Standard',
}));

export default function CustomizePage() {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedBox, setSelectedBox] = useState<CustomBoxFormat>(CUSTOM_BOX_FORMATS[1]); // Default 6-katori chest
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [customMessage, setCustomMessage] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');

  const totalFilledItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
  const remainingSlots = Math.max(0, selectedBox.capacity - totalFilledItems);
  const isBoxFull = totalFilledItems >= selectedBox.capacity;

  const handleToggleItem = (itemId: string, delta: number) => {
    const currentQty = selectedItems[itemId] || 0;
    const itemMeta = CUSTOMIZABLE_ITEMS.find((i) => i.id === itemId);

    if (delta > 0 && isBoxFull) {
      toast.error(
        `Your ${selectedBox.name} is full (${selectedBox.capacity}/${selectedBox.capacity} slots filled). Remove an item or upgrade box size to add more.`,
        {
          style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
          icon: '⚠️',
        }
      );
      return;
    }

    const nextQty = Math.max(0, currentQty + delta);
    setSelectedItems((prev) => {
      const copy = { ...prev };
      if (nextQty === 0) {
        delete copy[itemId];
      } else {
        copy[itemId] = nextQty;
      }
      return copy;
    });

    if (delta > 0 && itemMeta) {
      toast.success(`Added ${itemMeta.name} (${totalFilledItems + 1}/${selectedBox.capacity} slots filled)`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        icon: '✨',
        duration: 1200,
      });
    }
  };

  const itemsPriceTotal = Object.entries(selectedItems).reduce((acc, [itemId, qty]) => {
    const item = CUSTOMIZABLE_ITEMS.find((i) => i.id === itemId);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const grandTotal = selectedBox.price + itemsPriceTotal;

  const handleAddCustomHamperToBag = async () => {
    if (totalFilledItems === 0) {
      toast.error('Please select at least 1 delicacy to place inside your gift box.', {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      });
      return;
    }

    const selectedItemList = Object.entries(selectedItems)
      .map(([id, qty]) => {
        const item = CUSTOMIZABLE_ITEMS.find((i) => i.id === id);
        return item ? `${item.name} (x${qty})` : '';
      })
      .filter(Boolean)
      .join(', ');

    await addItem({
      productId: `custom-${selectedBox.id}-${Date.now()}`,
      giftBoxingType: selectedBox.id,
      quantity: 1,
      name: `Bespoke ${selectedBox.name} (${totalFilledItems}/${selectedBox.capacity} Items)`,
      price: grandTotal * 100, // in paise
      image: selectedBox.image,
    });

    toast.success(`Bespoke ${selectedBox.name} added to your bag! 🎁`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      duration: 2000,
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] py-8 md:py-16 px-4 sm:px-6 lg:px-8 text-[#1A1A18]">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ─── PAGE HEADER ─── */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#7A8B6F] uppercase inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#BFA267]" />
            Bespoke Studio &amp; Customizer
          </span>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Design Your Custom Gift Box
          </h1>
          <p className="text-xs sm:text-sm text-[#78746D] font-light leading-relaxed">
            Select a handcrafted designer box, pick your favourite regional delicacies &amp; accessories, and watch your curation come to life in real-time.
          </p>
        </div>

        {/* ─── STEP 1: SELECT GIFT BOX FORMAT ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl sm:text-2xl font-medium text-[#1A1A18] flex items-center gap-2.5"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              <span className="w-6 h-6 rounded-full bg-[#1A1A18] text-white text-[11px] font-sans flex items-center justify-center font-bold">1</span>
              <span>Step 1: Choose Your Box Format</span>
            </h2>
            <span className="text-xs text-[#7A8B6F] font-semibold">
              Selected: {selectedBox.capacity} Slots Capacity
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {CUSTOM_BOX_FORMATS.map((box) => {
              const isSelected = selectedBox.id === box.id;
              return (
                <div
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  className={`group relative bg-white rounded-2xl p-4 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#1A1A18] ring-2 ring-[#1A1A18] shadow-lg scale-[1.02]'
                      : 'border-[#E0DDD6] hover:border-[#7A8B6F] shadow-2xs hover:shadow-xs'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#FBF7F0] relative">
                      <img src={box.image} alt={box.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Package className="w-3 h-3 text-[#BFA267]" />
                        <span>{box.capacity} Slots</span>
                      </div>
                    </div>
                    <div className="space-y-1 text-left">
                      <span className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                        {box.dimensions}
                      </span>
                      <h3
                        className="text-base font-bold text-[#451B27] leading-snug"
                        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                      >
                        {box.name}
                      </h3>
                      <p className="text-[11.5px] text-[#78746D] leading-relaxed line-clamp-2">{box.description}</p>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-[#E0DDD6]/70 mt-3">
                    <span className="text-sm font-bold text-[#1A1A18]">₹{box.price.toLocaleString('en-IN')}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? 'bg-[#1A1A18] text-white' : 'border border-[#DDD8CE] text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── DYNAMIC CAPACITY GAUGE & SLOT TRACKER ─── */}
        <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#E0DDD6] shadow-md space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#E0DDD6] flex items-center justify-center shrink-0">
                <Package className="w-5 h-5 text-[#BFA267]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#1A1A18]">
                  {selectedBox.name} Capacity
                </h3>
                <p className="text-xs text-[#78746D]">
                  {totalFilledItems} of {selectedBox.capacity} Items Added •{' '}
                  <span className={remainingSlots === 0 ? 'text-[#7A8B6F] font-bold' : 'text-[#BFA267] font-semibold'}>
                    {remainingSlots === 0 ? 'Box is Full' : `${remainingSlots} Slots Left`}
                  </span>
                </p>
              </div>
            </div>

            {/* Dynamic Status Pill */}
            <div className="flex items-center gap-2">
              {isBoxFull ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBF3E8] border border-[#7A8B6F] text-[#243325] text-xs font-bold">
                  <Check className="w-3.5 h-3.5 text-[#7A8B6F]" />
                  <span>Box Complete ({selectedBox.capacity}/{selectedBox.capacity})</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8EE] border border-[#BFA267] text-[#8C6B28] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#BFA267]" />
                  <span>Add {remainingSlots} more to complete</span>
                </div>
              )}
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="w-full bg-[#F0EDE6] h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-out rounded-full ${
                isBoxFull ? 'bg-[#7A8B6F]' : 'bg-gradient-to-r from-[#DFC299] to-[#F4A896]'
              }`}
              style={{ width: `${Math.min(100, (totalFilledItems / selectedBox.capacity) * 100)}%` }}
            />
          </div>

          {/* Interactive Visual Slot Tray */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {Array.from({ length: selectedBox.capacity }).map((_, idx) => {
              // Map index to a filled item if exists
              let currentCount = 0;
              let itemInSlot: (typeof CUSTOMIZABLE_ITEMS)[0] | null = null;

              for (const [id, qty] of Object.entries(selectedItems)) {
                if (idx >= currentCount && idx < currentCount + qty) {
                  itemInSlot = CUSTOMIZABLE_ITEMS.find((i) => i.id === id) || null;
                  break;
                }
                currentCount += qty;
              }

              if (itemInSlot) {
                return (
                  <div
                    key={`slot-${idx}`}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DFC299] text-[#1A1A18] text-[11px] shrink-0 font-medium shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#7A8B6F]" />
                    <span className="truncate max-w-[120px]">{itemInSlot.name}</span>
                  </div>
                );
              }

              return (
                <div
                  key={`slot-${idx}`}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-dashed border-[#DDD8CE] text-[#8A8680] text-[11px] shrink-0 bg-transparent"
                >
                  <span className="w-2 h-2 rounded-full border border-[#DDD8CE]" />
                  <span>Slot {idx + 1} (Empty)</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── STEP 2: CHOOSE DELICACIES & ITEMS ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-xl sm:text-2xl font-medium text-[#1A1A18] flex items-center gap-2.5"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              <span className="w-6 h-6 rounded-full bg-[#1A1A18] text-white text-[11px] font-sans flex items-center justify-center font-bold">2</span>
              <span>Step 2: Fill Your Box with Delicacies</span>
            </h2>
            <span className="text-xs text-[#78746D]">
              Select up to {selectedBox.capacity} items
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {CUSTOMIZABLE_ITEMS.map((item) => {
              const qty = selectedItems[item.id] || 0;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl border p-3 sm:p-4 flex flex-col justify-between shadow-2xs transition-all duration-200 ${
                    qty > 0 ? 'border-[#BFA267] ring-1 ring-[#BFA267] shadow-xs' : 'border-[#E0DDD6] hover:border-[#7A8B6F]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#FBF7F0] relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      {qty > 0 && (
                        <div className="absolute top-2 right-2 bg-[#1A1A18] text-white text-[11px] font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                          {qty}
                        </div>
                      )}
                    </div>

                    <div className="text-left space-y-0.5">
                      <span className="text-[8.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                        {item.category}
                      </span>
                      <h4
                        className="text-xs sm:text-sm font-bold text-[#451B27] line-clamp-1"
                        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                      >
                        {item.name}
                      </h4>
                      <p className="text-xs font-bold text-[#1A1A18]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper for each item */}
                  <div className="pt-2.5">
                    {qty > 0 ? (
                      <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#BFA267] rounded-xl p-1">
                        <button
                          onClick={() => handleToggleItem(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded-lg bg-white border border-[#E0DDD6] flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors active:scale-90 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#1A1A18] px-2">{qty}</span>
                        <button
                          onClick={() => handleToggleItem(item.id, 1)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded-lg bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#451B27] transition-colors active:scale-90 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleToggleItem(item.id, 1)}
                        disabled={isBoxFull}
                        className={`w-full py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
                          isBoxFull
                            ? 'bg-[#F0EDE6] text-[#8A8680] border border-[#E0DDD6] opacity-60 cursor-not-allowed'
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

        {/* ─── STEP 3: RECIPIENT NOTE & SUMMARY CHECKOUT ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E0DDD6] shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4 text-left">
            <h3
              className="text-2xl font-light text-[#1A1A18]"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Personalise Your Gift Card
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
                  Custom Calligraphy Greeting Message
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Warmest wishes on your festive celebrations. Handcrafted especially for you..."
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
                <span>Box Format ({selectedBox.name})</span>
                <span className="font-bold text-[#1A1A18]">₹{selectedBox.price.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Delicacies Filled ({totalFilledItems} of {selectedBox.capacity})
                </span>
                <span className="font-bold text-[#1A1A18]">₹{itemsPriceTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Handmade Calligraphy Card</span>
                <span className="font-semibold text-[#7A8B6F]">Complimentary</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#E0DDD6] text-base font-bold text-[#1A1A18]">
                <span>Total Investment</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={handleAddCustomHamperToBag}
              className="w-full py-4 bg-[#7A1C29] hover:bg-[#5C141F] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-[#EADBCA]" />
              <span>Add Custom Hamper to Bag (₹{grandTotal.toLocaleString('en-IN')})</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
