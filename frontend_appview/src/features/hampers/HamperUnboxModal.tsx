'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EcomHamper } from '@/data/hampersEcomData';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface HamperUnboxModalProps {
  hamper: EcomHamper | null;
  onClose: () => void;
}

export const HamperUnboxModal: React.FC<HamperUnboxModalProps> = ({ hamper, onClose }) => {
  const { addItem, items } = useCartStore();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (hamper) {
      setSelectedImage(hamper.gallery[0] || hamper.image);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [hamper]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!hamper) return null;

  const cartItem = items.find((i) => i.productId === hamper.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addItem({
        productId: hamper.id,
        name: hamper.name,
        price: hamper.price * 100, // in paise
        quantity: quantity,
        image: hamper.image,
        giftBoxingType: hamper.vesselType,
      });

      toast.success(
        <div className="flex flex-col">
          <span className="font-semibold text-[#1A1A18]">{quantity}x {hamper.name}</span>
          <span className="text-[11px] text-[#8C7449]">Added to curation tray</span>
        </div>,
        {
          duration: 2500,
          style: {
            background: '#FAF8F5',
            color: '#1A1A18',
            border: '1px solid #E0DDD6',
            borderRadius: '12px',
            fontSize: '13px',
          },
        }
      );
    } catch {
      toast.error('Could not add to tray.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-xl border border-[#DDD8CE] z-10 my-auto flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#1A1A18] shadow-xs transition-colors border border-[#E0DDD6] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* ─── LEFT COLUMN: VISUAL GALLERY ─── */}
        <div className="w-full md:w-1/2 bg-[#FAF8F5] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ECE7DE] overflow-y-auto">
          <div>
            {/* Active Display Image */}
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-[#E0DDD6] bg-white">
              <img
                src={selectedImage || hamper.image}
                alt={hamper.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-2.5 left-2.5 bg-[#3C0B1E] text-[#DFC299] text-[9.5px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded">
                {hamper.tierLabel}
              </div>

              <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-[#F6F4EF] text-[9px] font-mono px-2 py-0.5 rounded">
                {hamper.vesselType}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {hamper.gallery && hamper.gallery.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                {hamper.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#1A1A18] ring-1 ring-[#1A1A18]'
                        : 'border-[#E0DDD6] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="mt-5 pt-3.5 border-t border-[#EAE5DC] space-y-2">
            <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#8C847B] font-bold block">
              Vessel Architecture
            </span>

            <div className="bg-white rounded-lg p-2.5 border border-[#E0DDD6] space-y-1 text-xs">
              <div className="flex justify-between text-[#554F47]">
                <span className="text-[#8A8680]">Finish:</span>
                <span className="font-semibold text-[#1A1A18]">{hamper.vesselColor}</span>
              </div>
              {hamper.dimensions && (
                <div className="flex justify-between text-[#554F47]">
                  <span className="text-[#8A8680]">Dimensions:</span>
                  <span className="font-mono text-[#1A1A18]">{hamper.dimensions}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: CONTENTS & ADD TO TRAY ─── */}
        <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-3.5">
            {/* Header info */}
            <div>
              <span className="text-[10px] font-semibold text-[#8C7449] uppercase tracking-wider font-sans block">
                {hamper.occasionLabel} • {hamper.tierDescription}
              </span>
              <h2
                className="text-xl sm:text-2xl font-semibold text-[#1A1A18] leading-tight font-sans tracking-tight mt-1"
                style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}
              >
                {hamper.name}
              </h2>
              <p className="text-xs text-[#78746D] font-light mt-1 leading-relaxed">
                {hamper.description}
              </p>
            </div>

            {/* Price Block */}
            <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E0DDD6] flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-bold text-[#1A1A18] font-mono tracking-tight">
                    ₹{hamper.price.toLocaleString('en-IN')}
                  </span>
                  {hamper.originalPrice && (
                    <span className="text-xs text-[#A19A8F] line-through font-mono">
                      ₹{hamper.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-[#8C7449]">
                  Taxes and keepsake packaging included
                </span>
              </div>
            </div>

            {/* Inside list */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#8C847B] font-bold block">
                Contents ({hamper.contents.length} Items)
              </span>

              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                {hamper.contents.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-[#FAF8F5] border border-[#EBE6DC] flex items-start justify-between gap-2 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-[#1A1A18] leading-tight">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="text-[10.5px] text-[#78746D] font-light">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.weight && (
                      <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.2 rounded bg-white text-[#8C7449] border border-[#E0DDD6]">
                        {item.weight}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── ACTION BUTTON ─── */}
          <div className="mt-5 pt-3.5 border-t border-[#ECE7DE] space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-[#DDD8CE] rounded-lg bg-[#FAF8F5] overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 text-xs font-bold text-[#6B655D] hover:bg-[#EFEAE2] transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="px-2.5 py-1.5 text-xs font-mono font-bold text-[#1A1A18]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1.5 text-xs font-bold text-[#6B655D] hover:bg-[#EFEAE2] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 py-2 px-4 rounded-lg bg-[#3C0B1E] hover:bg-[#1A1A18] text-[#DFC299] font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs transition-all duration-200 cursor-pointer"
              >
                <span>{inCartQty > 0 ? `ADD MORE (${inCartQty} in tray)` : `ADD TO TRAY • ₹${(hamper.price * quantity).toLocaleString('en-IN')}`}</span>
                <span className="text-[10px]">→</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#78746D]">
              <span>Bulk / Custom Monogramming?</span>
              <a
                href={`https://wa.me/917021463609?text=${encodeURIComponent(
                  `Hi! I'd like to enquire about bulk orders for "${hamper.name}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8C7449] font-medium hover:text-[#3C0B1E] underline"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
