'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Check, ArrowRight, ArrowLeft, Sparkles, Heart } from 'lucide-react';
import { GIFT_BOX_TYPES } from '@/utils/constants';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface GiftBoxCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GiftBoxCustomizerModal: React.FC<GiftBoxCustomizerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedBoxType, setSelectedBoxType] = useState<string>('royale-tin');
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'Raw Truffle Honey',
    'Roasted Pistachios',
  ]);
  const [ribbonColor, setRibbonColor] = useState<'gold' | 'burgundy' | 'emerald'>('gold');
  const [cardNote, setCardNote] = useState({
    to: 'Valued Recipient',
    from: 'With Warmest Wishes',
    message: 'May this handcrafted gourmet selection bring joy and delightful moments to your celebration.',
  });

  const matchedBox =
    Object.values(GIFT_BOX_TYPES).find((b) => b.type === selectedBoxType) ||
    GIFT_BOX_TYPES.ROYALE_TIN;

  const basePricePaise = 299900; // ₹2,999 base price
  const totalPricePaise = basePricePaise + matchedBox.surcharge * 100;

  const delicaciesList = [
    { id: 'truffle-honey', name: 'Raw Truffle Honey', category: 'Honey' },
    { id: 'pistachios', name: 'Roasted Pistachios', category: 'Nuts' },
    { id: 'saffron-choco', name: 'Saffron Dark Chocolates', category: 'Confectionery' },
    { id: 'figs', name: 'Artisan Dried Figs', category: 'Dry Fruits' },
  ];

  const toggleItem = (name: string) => {
    if (selectedItems.includes(name)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== name));
      } else {
        toast.error('Select at least 1 delicacy item.', {
          style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
        });
      }
    } else if (selectedItems.length < 3) {
      setSelectedItems([...selectedItems, name]);
    } else {
      toast.error('Maximum 3 delicacies per gift box.', {
        style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
      });
    }
  };

  const handleAddToCart = async () => {
    await addItem({
      productId: `custom_${selectedBoxType}_${Date.now()}`,
      giftBoxingType: selectedBoxType,
      quantity: 1,
      name: `Custom ${matchedBox.name} Box`,
      price: totalPricePaise,
      image: matchedBox.heroImage,
    });

    toast.success('Custom Gift Box added to your bag! 🎁', {
      style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-xs"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-md bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden z-10 border border-[#E8DFC8]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFC8]/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h2 className="font-serif-luxury text-lg font-bold text-[#2A231F]">
                  Custom Gift Box Builder
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[#6E6259] hover:text-[#2A231F]"
                aria-label="Close customizer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Indicator */}
            <div className="flex items-center justify-between py-3 px-2">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      step === s
                        ? 'bg-[#D4AF37] text-white shadow-md'
                        : step > s
                        ? 'bg-[#0F5132] text-white'
                        : 'bg-[#E8DFC8]/60 text-[#6E6259]'
                    }`}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2A231F]">
                    {s === 1 ? 'Box' : s === 2 ? 'Items' : 'Card'}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Content Scrollable */}
            <div className="flex-1 overflow-y-auto py-2 space-y-4 pr-1">
              {step === 1 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6259]">
                    1. Choose Signature Packaging
                  </h3>
                  <div className="space-y-2.5">
                    {Object.values(GIFT_BOX_TYPES).map((box) => (
                      <div
                        key={box.type}
                        onClick={() => setSelectedBoxType(box.type)}
                        className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                          selectedBoxType === box.type
                            ? 'bg-white border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]'
                            : 'bg-white/60 border-[#E8DFC8]/70 hover:bg-white'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] overflow-hidden shrink-0 border border-[#E8DFC8]">
                          <img
                            src={box.heroImage}
                            alt={box.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif-luxury text-sm font-bold text-[#2A231F]">
                            {box.name}
                          </h4>
                          <p className="text-[10px] text-[#6E6259]">{box.subtitle}</p>
                        </div>
                        <span className="text-xs font-bold text-[#D4AF37]">
                          {box.surcharge > 0 ? `+₹${box.surcharge}` : 'Included'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6259]">
                    2. Select Up To 3 Delicacies
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {delicaciesList.map((delicacy) => {
                      const isSelected = selectedItems.includes(delicacy.name);
                      return (
                        <div
                          key={delicacy.id}
                          onClick={() => toggleItem(delicacy.name)}
                          className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-white border-[#D4AF37] shadow-xs ring-1 ring-[#D4AF37]'
                              : 'bg-white/60 border-[#E8DFC8]/70'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-semibold text-[#D4AF37] uppercase">
                              {delicacy.category}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                          </div>
                          <h4 className="font-serif-luxury text-xs font-bold text-[#2A231F] mt-1">
                            {delicacy.name}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#6E6259]">
                    3. Personalize Gift Note & Ribbon
                  </h3>

                  {/* Ribbon selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#2A231F]">
                      Ribbon Color:
                    </span>
                    {(['gold', 'burgundy', 'emerald'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setRibbonColor(color)}
                        className={`w-6 h-6 rounded-full border-2 capitalize text-[9px] font-bold ${
                          color === 'gold'
                            ? 'bg-[#D4AF37] border-white'
                            : color === 'burgundy'
                            ? 'bg-[#6E1A24] border-white'
                            : 'bg-[#0F5132] border-white'
                        } ${ribbonColor === color ? 'ring-2 ring-[#2A231F]' : ''}`}
                        aria-label={`Select ${color} ribbon`}
                      />
                    ))}
                  </div>

                  {/* Live Gift Card Preview */}
                  <div className="bg-[#FFFFFF] border border-[#E8DFC8] rounded-2xl p-4 shadow-sm space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 bg-[#D4AF37]/10 rounded-bl-full flex items-start justify-end p-2 text-[#D4AF37]">
                      <Gift className="w-4 h-4" />
                    </div>

                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="To: (e.g. Deeptanu)"
                        value={cardNote.to}
                        onChange={(e) => setCardNote({ ...cardNote, to: e.target.value })}
                        className="w-full font-serif-luxury text-sm font-bold text-[#2A231F] bg-transparent focus:outline-none border-b border-[#E8DFC8]/60 pb-1"
                      />
                      <textarea
                        rows={3}
                        placeholder="Your custom message..."
                        value={cardNote.message}
                        onChange={(e) => setCardNote({ ...cardNote, message: e.target.value })}
                        className="w-full text-xs text-[#6E6259] bg-transparent focus:outline-none resize-none pt-1"
                      />
                      <input
                        type="text"
                        placeholder="From: (e.g. Antigravity)"
                        value={cardNote.from}
                        onChange={(e) => setCardNote({ ...cardNote, from: e.target.value })}
                        className="w-full text-xs font-semibold text-[#D4AF37] bg-transparent focus:outline-none border-t border-[#E8DFC8]/60 pt-1 text-right"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Navigation */}
            <div className="pt-3 border-t border-[#E8DFC8]/60 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => (s - 1) as any)}
                  className="px-3 py-2 text-xs font-semibold text-[#6E6259] flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={() => setStep((s) => (s + 1) as any)}
                  className="gold-gradient-btn px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <span>NEXT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="gold-gradient-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <span>ADD TO BAG (₹{(totalPricePaise / 100).toLocaleString('en-IN')})</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
