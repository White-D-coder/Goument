'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import { validateCouponAPI } from '@/shared/api/endpoints';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotalPaise = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountPaise = Math.round(subtotalPaise * (discountPercent / 100));
  const estimatedTaxPaise = Math.round((subtotalPaise - discountPaise) * 0.05); // 5% tax
  const totalPaise = subtotalPaise - discountPaise + estimatedTaxPaise;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    try {
      const response = await validateCouponAPI(couponCode.trim());
      const discount = response?.discountPercent || 10;
      setDiscountPercent(discount);
      toast.success(`Coupon ${couponCode.toUpperCase()} applied! ${discount}% discount added.`, {
        style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
      });
    } catch (err) {
      if (
        couponCode.trim().toUpperCase() === 'LUXURY10' ||
        couponCode.trim().toUpperCase() === 'GOURMET10'
      ) {
        setDiscountPercent(10);
        toast.success('Coupon LUXURY10 applied! 10% discount added.', {
          style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
        });
      } else {
        toast.error('Invalid coupon code. Try "LUXURY10"', {
          style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #6E1A24' },
        });
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-serif-luxury text-2xl font-bold text-[#2A231F]">
          Your Gourmet Bag
        </h1>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-[#6E1A24] font-semibold hover:underline"
          >
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 my-12">
          <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#E8DFC8] flex items-center justify-center text-[#D4AF37]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif-luxury text-lg font-bold text-[#2A231F]">
              Your Bag is Empty
            </h2>
            <p className="text-xs text-[#6E6259]">
              Explore our luxury handcrafted gift box collections.
            </p>
          </div>
          <Link
            href="/"
            className="gold-gradient-btn px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider inline-block"
          >
            EXPLORE COLLECTIONS
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Item List */}
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-3 flex gap-3 items-center shadow-xs"
              >
                <div className="w-20 h-20 relative rounded-xl overflow-hidden shrink-0">
                  <ImageWithShimmer
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between h-20 py-0.5">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-serif-luxury text-xs font-bold text-[#2A231F] truncate">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#6E6259] hover:text-[#6E1A24] p-0.5"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-[#a6bd93]">
                      Handcrafted Selection
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DFC8] rounded-full px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-[#2A231F] hover:text-[#D4AF37]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#2A231F] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-[#2A231F] hover:text-[#D4AF37]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary (No Monetary Price Displayed) */}
          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#6E6259]">
              <span>Selected Items</span>
              <span className="font-bold text-[#2A231F]">{items.reduce((sum, i) => sum + i.quantity, 0)} Items</span>
            </div>
            <div className="flex justify-between text-[#6E6259]">
              <span>Express Shipping</span>
              <span className="font-semibold text-[#a6bd93]">Complimentary</span>
            </div>
            <div className="border-t border-[#E8DFC8]/50 pt-2 flex justify-between text-sm font-bold text-[#2A231F]">
              <span>Gift Selection</span>
              <span className="text-[#a6bd93]">Ready For Dispatch</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => router.push('/checkout')}
            className="w-full gold-gradient-btn py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
          >
            <span>PROCEED TO CHECKOUT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
