'use client';

import React, { useState } from 'react';
import { EcomHamper } from '@/data/hampersEcomData';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

interface HamperCardProps {
  hamper: EcomHamper;
  onOpenUnboxModal: (hamper: EcomHamper) => void;
}

export const HamperCard: React.FC<HamperCardProps> = ({ hamper, onOpenUnboxModal }) => {
  const { addItem, items } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find((i) => i.productId === hamper.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const primaryImage = hamper.image;
  const secondaryImage =
    hamper.gallery && hamper.gallery.length > 1 && hamper.gallery[1] !== primaryImage
      ? hamper.gallery[1]
      : null;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);

    try {
      await addItem({
        productId: hamper.id,
        name: hamper.name,
        price: hamper.price * 100, // in paise
        quantity: 1,
        image: hamper.image,
        giftBoxingType: hamper.vesselType,
      });

      toast.success(
        <div className="flex flex-col">
          <span className="font-semibold text-[#1A1A18] font-sans">{hamper.name}</span>
          <span className="text-xs text-[#8C7449] font-sans">Added to curation tray</span>
        </div>,
        {
          duration: 2500,
          style: {
            background: '#FAF8F5',
            color: '#1A1A18',
            border: '1px solid #E0DDD6',
            borderRadius: '12px',
            fontSize: '13px',
            fontFamily: 'var(--font-jakarta), system-ui, sans-serif',
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
    <div
      onClick={() => onOpenUnboxModal(hamper)}
      className="bg-white rounded-2xl overflow-hidden border border-[#E5E0D8] hover:border-[#DDD8CE] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer text-left"
    >
      {/* ─── IMAGE CONTAINER (Taller & Elegant with Smooth Hover Crossfade) ─── */}
      <div className="w-full aspect-[4/4.5] bg-[#FAF6F0] relative overflow-hidden block">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={hamper.name}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
            secondaryImage
              ? 'opacity-100 group-hover:opacity-0 group-hover:scale-105'
              : 'group-hover:scale-105'
          }`}
        />

        {/* Secondary / Alternate View Image (Cross-fades on hover) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${hamper.name} packaging`}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 scale-100 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}
      </div>

      {/* ─── CARD BODY: PURE SIMPLICITY (Title, Occasion, Price with Generous Proportion) ─── */}
      <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3
            className="text-base sm:text-[17px] font-medium text-[#1A1A18] group-hover:text-[#8C7449] transition-colors line-clamp-1 leading-snug tracking-tight font-sans"
            style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}
          >
            {hamper.name}
          </h3>

          <p
            className="text-xs sm:text-sm text-[#78746D] font-normal mt-1.5 line-clamp-1 font-sans"
            style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}
          >
            {hamper.occasionLabel}
          </p>
        </div>

        {/* Price Row with Subtle Hover Add Action */}
        <div className="mt-3.5 sm:mt-4 pt-1 flex items-center justify-between">
          <span
            className="text-base sm:text-lg font-bold text-[#1A1A18] font-sans tracking-tight"
            style={{ fontFamily: 'var(--font-jakarta), system-ui, sans-serif' }}
          >
            ₹ {hamper.price.toLocaleString('en-IN')}
          </span>

          {inCartQty > 0 ? (
            <button
              onClick={handleAddToCart}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-[#3C0B1E] text-[#DFC299] font-sans cursor-pointer"
            >
              In Tray ({inCartQty})
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              aria-label={`Add ${hamper.name} to tray`}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#DDD8CE] hover:border-[#1A1A18] hover:bg-[#1A1A18] hover:text-white bg-white text-[#1A1A18] font-sans cursor-pointer shadow-xs"
            >
              Add +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
