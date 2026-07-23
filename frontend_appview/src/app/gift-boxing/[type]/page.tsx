'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { GIFT_BOX_TYPES, DEMO_BESTSELLERS } from '@/utils/constants';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export default function GiftBoxingPage() {
  const params = useParams();
  const router = useRouter();
  const type = (params?.type as string) || 'classics';
  const addItem = useCartStore((state) => state.addItem);

  const matchedType =
    Object.values(GIFT_BOX_TYPES).find((b) => b.type === type) ||
    GIFT_BOX_TYPES.CLASSICS;

  const handleAddToCart = async (item: typeof DEMO_BESTSELLERS[0]) => {
    await addItem({
      productId: item._id,
      giftBoxingType: type,
      quantity: 1,
      name: `${item.name} (${matchedType.name})`,
      price: item.basePrice + matchedType.surcharge * 100,
      image: item.image,
    });
    toast.success(`Added ${matchedType.name} selection to cart!`, {
      style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] p-4 space-y-4">
      {/* Header bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-full bg-[#FFFFFF] border border-[#E8DFC8]/60 text-[#2A231F]"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif-luxury text-xl font-bold text-[#2A231F]">
            {matchedType.name}
          </h1>
          <p className="text-[11px] text-[#6E6259]">{matchedType.subtitle}</p>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="w-full h-44 relative rounded-2xl overflow-hidden border border-[#E8DFC8]/60 shadow-sm">
        <ImageWithShimmer
          src={matchedType.heroImage}
          alt={matchedType.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <span className="text-xs font-bold text-[#FAF7F2] uppercase tracking-widest bg-[#D4AF37]/90 px-3 py-1 rounded-full">
            {matchedType.surcharge > 0 ? `Surcharge +₹${matchedType.surcharge}` : 'Included in base price'}
          </span>
        </div>
      </div>

      {/* Product List */}
      <div className="space-y-3 pt-2">
        <h2 className="font-serif-luxury text-lg font-bold text-[#2A231F]">
          Available Options
        </h2>

        {DEMO_BESTSELLERS.map((item) => (
          <div
            key={item._id}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-3 flex gap-3.5 items-center shadow-xs"
          >
            <div className="w-24 h-24 relative rounded-xl overflow-hidden shrink-0">
              <ImageWithShimmer
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between h-24 py-0.5">
              <div>
                <h3 className="font-serif-luxury text-sm font-bold text-[#2A231F]">
                  {item.name}
                </h3>
                <p className="text-[11px] text-[#6E6259] line-clamp-2 mt-0.5">
                  {item.description.short}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-sans text-sm font-bold text-[#2A231F]">
                  ₹{((item.basePrice + matchedType.surcharge * 100) / 100).toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="gold-gradient-btn px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
