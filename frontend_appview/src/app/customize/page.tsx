'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Check, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface BoxOption {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ItemOption {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const BOX_OPTIONS: BoxOption[] = [
  {
    id: 'royale-tin',
    name: 'Royale Tin Keepsake Box',
    price: 1499,
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    description: 'Embossed metallic gold tin with velvet lining',
  },
  {
    id: 'velvet-chest',
    name: 'Velvet Gift Chest',
    price: 2199,
    image: '/images/small_anipics/velvet_tray_hero.jpg',
    description: 'Handcrafted plush velvet box with brass latch clasp',
  },
  {
    id: 'classics-box',
    name: 'Classics Teakwood Tray',
    price: 1899,
    image: '/images/Category_image/Classics/classics_hero.png',
    description: 'Solid teakwood tray with golden filigree engraving',
  },
];

const ITEM_OPTIONS: ItemOption[] = [
  {
    id: 'item-1',
    name: 'Artisanal Almond Truffles',
    category: 'Gourmet Delicacies',
    price: 450,
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
  },
  {
    id: 'item-2',
    name: 'Roasted Saffron Pistachios',
    category: 'Gourmet Delicacies',
    price: 550,
    image: '/images/Category_image/Classics/classics_hero.png',
  },
  {
    id: 'item-3',
    name: 'Hand-poured Scented Candle',
    category: 'Keepsake Relics',
    price: 650,
    image: '/images/small_anipics/velvet_tray_hero.jpg',
  },
  {
    id: 'item-4',
    name: 'Bespoke Golden Calligraphy Card',
    category: 'Customization',
    price: 250,
    image: '/images/Category_image/premium_velvet/thumb.jpeg',
  },
];

export default function CustomizePage() {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedBox, setSelectedBox] = useState<BoxOption>(BOX_OPTIONS[0]);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [customMessage, setCustomMessage] = useState<string>('');

  const toggleItemQuantity = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const itemsPriceTotal = Object.entries(selectedItems).reduce((acc, [itemId, qty]) => {
    const item = ITEM_OPTIONS.find((i) => i.id === itemId);
    return acc + (item ? item.price * qty : 0);
  }, 0);

  const grandTotal = selectedBox.price + itemsPriceTotal;

  const handleAddCustomHamperToBag = async () => {
    const selectedItemListStr = Object.entries(selectedItems)
      .map(([id, qty]) => {
        const item = ITEM_OPTIONS.find((i) => i.id === id);
        return item ? `${item.name} (x${qty})` : '';
      })
      .filter(Boolean)
      .join(', ');

    await addItem({
      productId: `custom-${selectedBox.id}-${Date.now()}`,
      giftBoxingType: selectedBox.id,
      quantity: 1,
      name: `Custom Hamper: ${selectedBox.name}`,
      price: grandTotal,
      image: selectedBox.image,
    });

    toast.success(`Custom Hamper added to your bag!`, {
      style: { background: '#2C3228', color: '#FAF7F2', border: '1px solid #a6bd93' },
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] py-8 md:py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-[0.25em] text-[#52604D] uppercase inline-flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#6B855A]" />
            Bespoke Studio
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3228] tracking-tight">
            Customize Your Gift Box
          </h1>
          <p className="text-sm md:text-base text-[#7A8275] max-w-xl mx-auto font-normal">
            Handpick your base box, add handcrafted artisanal treats, and personalize with custom calligraphy for a truly unforgettable gift.
          </p>
        </div>

        {/* Step 1: Base Box Selection */}
        <div className="space-y-4">
          <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2C3228] flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#2C3228] text-white text-xs font-sans flex items-center justify-center font-bold">1</span>
            Select Base Box
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOX_OPTIONS.map((box) => {
              const isSelected = selectedBox.id === box.id;
              return (
                <div
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  className={`group relative bg-white rounded-3xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#2C3228] ring-2 ring-[#2C3228] shadow-lg scale-[1.02]'
                      : 'border-[#E4E0D7] hover:border-[#a6bd93] shadow-2xs'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F8F6F2]">
                      <img src={box.image} alt={box.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="font-serif-luxury text-lg font-bold text-[#2C3228]">{box.name}</h3>
                      <p className="text-xs text-[#7A8275] leading-relaxed">{box.description}</p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-[#E4E0D7]/60 mt-4">
                    <span className="font-sans text-base font-bold text-[#2C3228]">₹{box.price.toLocaleString()}</span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#2C3228] text-white' : 'border border-[#E4E0D7]'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Add Treats & Fillers */}
        <div className="space-y-4 pt-4">
          <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2C3228] flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#2C3228] text-white text-xs font-sans flex items-center justify-center font-bold">2</span>
            Add Delicacies &amp; Extras
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {ITEM_OPTIONS.map((item) => {
              const qty = selectedItems[item.id] || 0;
              return (
                <div key={item.id} className="bg-white rounded-2xl border border-[#E4E0D7] p-3 flex flex-col justify-between shadow-2xs space-y-3">
                  <div className="space-y-2">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F8F6F2]">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] font-bold text-[#52604D] uppercase">{item.category}</span>
                      <h4 className="font-serif-luxury text-sm font-bold text-[#2C3228] line-clamp-1">{item.name}</h4>
                      <p className="font-sans text-xs font-bold text-[#2C3228] mt-0.5">₹{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#FAF7F2] p-1.5 rounded-xl border border-[#E4E0D7]/60">
                    <button
                      onClick={() => toggleItemQuantity(item.id, -1)}
                      disabled={qty === 0}
                      className="w-7 h-7 rounded-lg bg-white border border-[#E4E0D7] flex items-center justify-center text-[#2C3228] disabled:opacity-40 cursor-pointer active:scale-90"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-[#2C3228] px-2">{qty}</span>
                    <button
                      onClick={() => toggleItemQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-[#2C3228] text-white flex items-center justify-center cursor-pointer active:scale-90"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Calligraphy Note & Total Bar */}
        <div className="bg-white rounded-3xl p-6 border border-[#E4E0D7] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3 text-left">
            <h3 className="font-serif-luxury text-xl font-bold text-[#2C3228]">Personal Gift Note</h3>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Enter message to print on custom calligraphy card..."
              rows={3}
              className="w-full p-4 bg-[#FAF7F2] border border-[#E4E0D7] rounded-2xl text-xs sm:text-sm text-[#2C3228] placeholder:text-[#7A8275] focus:outline-none focus:border-[#2C3228]"
            />
          </div>

          <div className="lg:col-span-5 space-y-4 text-left border-t lg:border-t-0 lg:border-l border-[#E4E0D7] pt-4 lg:pt-0 lg:pl-8">
            <div className="space-y-1.5 text-xs text-[#7A8275]">
              <div className="flex justify-between">
                <span>Base Box ({selectedBox.name})</span>
                <span className="font-bold text-[#2C3228]">₹{selectedBox.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Items ({Object.values(selectedItems).reduce((a, b) => a + b, 0)})</span>
                <span className="font-bold text-[#2C3228]">₹{itemsPriceTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E4E0D7] text-base font-bold text-[#2C3228]">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleAddCustomHamperToBag}
              className="w-full py-4 bg-[#7A1C29] hover:bg-[#5C141F] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-[#a6bd93]" />
              <span>Add Custom Box to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
