'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Plus, Minus, ArrowRight, Package } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export interface CustomBoxItem {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  capacitySlots: number;
  image: string;
  tag: string;
}

export const SIGNATURE_BOXES: CustomBoxItem[] = [
  {
    id: 'box_maroon_bloom',
    name: 'Maroon Bloom Book-Style Box',
    subtitle: 'Magnetic Book-Style Keepsake Box',
    tagline: 'Crushed silk bedding with handcrafted botanical gold foiling.',
    capacitySlots: 4,
    image: '/images/boxes/box_1.png',
    tag: 'Signature Series',
  },
  {
    id: 'box_midnight_bloom',
    name: 'Midnight Bloom Book-Style Box',
    subtitle: 'Textured Navy Blue Satin Keepsake',
    tagline: 'Deep royal blue satin with intricate gold botanical foiling.',
    capacitySlots: 5,
    image: '/images/boxes/box_2.png',
    tag: 'Signature Series',
  },
  {
    id: 'box_lavender_bloom',
    name: 'Lavender Bloom Book-Style Box',
    subtitle: 'Pastel Lilac Suede Keepsake',
    tagline: 'Delicate pastel lilac textured box with soft-touch suede interior.',
    capacitySlots: 4,
    image: '/images/boxes/box_3.png',
    tag: 'Signature Series',
  },
  {
    id: 'box_two_tier_luxe',
    name: 'Two-Tier Luxe Box',
    subtitle: 'Sliding Dual-Tier Sovereign Trunk',
    tagline: 'Double the luxury, double the impact.',
    capacitySlots: 8,
    image: '/images/boxes/box_4.png',
    tag: 'Grand Scale',
  },
  {
    id: 'box_magnetic_top_lid',
    name: 'Magnetic Top-Lid Box',
    subtitle: 'Rigid Presentation Gift Box',
    tagline: 'Secure closure. Seamless experience.',
    capacitySlots: 6,
    image: '/images/boxes/box_5.png',
    tag: 'Seamless Seal',
  },
  {
    id: 'box_corrugated',
    name: 'Corrugated Box',
    subtitle: 'Heavyweight Protective Courier Box',
    tagline: 'Durable, lightweight and perfect for shipping.',
    capacitySlots: 4,
    image: '/images/boxes/box_6.png',
    tag: 'Shipping Grade',
  },
  {
    id: 'box_tin',
    name: 'Tin Box',
    subtitle: 'Embossed Navy & Gold Keepsake Tin',
    tagline: 'Reusable keepsake. Lasting memories.',
    capacitySlots: 4,
    image: '/images/boxes/box_7.png',
    tag: 'Reusable Tin',
  },
  {
    id: 'box_premium_hamper_tray',
    name: 'Premium Hamper Tray',
    subtitle: 'Open Display Tray with Cutout Handles',
    tagline: 'Elegant presentation for curated hampers.',
    capacitySlots: 6,
    image: '/images/boxes/box_8.png',
    tag: 'Display Tray',
  },
];

export default function CustomGiftBoxesSection() {
  const { items: cartItems, addItem, updateQuantity, removeItem } = useCartStore();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    checkScrollability();
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleIncrement = (box: CustomBoxItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const existing = cartItems.find((i) => i.productId === box.id);
    if (existing) {
      updateQuantity(existing.id, existing.quantity + 1);
      toast.success(`Updated ${box.name} in Curation Tray`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 1200,
      });
    } else {
      addItem({
        productId: box.id,
        giftBoxingType: box.id,
        quantity: 1,
        name: `Signature Box: ${box.name}`,
        price: 0,
        image: box.image,
      });
      toast.success(`Added ${box.name} to Curation Tray`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 1200,
      });
    }
  };

  const handleDecrement = (box: CustomBoxItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const existing = cartItems.find((i) => i.productId === box.id);
    if (!existing) return;
    if (existing.quantity <= 1) {
      removeItem(existing.id);
      toast.success(`Removed ${box.name} from Curation Tray`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 1200,
      });
    } else {
      updateQuantity(existing.id, existing.quantity - 1);
    }
  };

  return (
    <section id="boxes" className="pt-2 sm:pt-8 md:pt-12 pb-10 sm:pb-14 md:pb-16 px-2 sm:px-4 lg:px-6 bg-[#FAF8F5] text-[#1A1A18] relative overflow-hidden scroll-mt-20">
      <div className="max-w-[1580px] mx-auto space-y-5 sm:space-y-7">

        {/* ─── SECTION HEADER (CENTERED TITLE + BALANCED SUBTITLE) ─── */}
        <div className="px-4 sm:px-6 lg:px-8 py-2 sm:py-4 flex flex-col items-center text-center relative max-w-4xl mx-auto space-y-1.5 sm:space-y-2">
          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-light text-[#1A1A18] tracking-tight leading-tight whitespace-normal md:whitespace-nowrap"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            Designed to Delight, Made to Impress.
          </h2>

          <p className="text-xs sm:text-sm text-[#78746D] font-light leading-relaxed max-w-xl mx-auto whitespace-normal md:whitespace-nowrap">
            Our signature collection of designer gift boxes crafted to elevate every gifting experience.
          </p>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2.5 justify-center pt-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous Box"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                canScrollLeft
                  ? 'bg-white text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white shadow-md active:scale-90'
                  : 'bg-black/5 text-[#B5AFA6] opacity-35 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next Box"
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                canScrollRight
                  ? 'bg-white text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white shadow-md active:scale-90'
                  : 'bg-black/5 text-[#B5AFA6] opacity-35 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ─── SINGLE-LINE HORIZONTAL APPLE CAROUSEL TRACK (EXACT REFERENCE CARD DESIGN) ─── */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-4 sm:px-6 lg:px-8 pb-4 pt-1"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {SIGNATURE_BOXES.map((box) => {
            const inCart = cartItems.find((i) => i.productId === box.id);
            const currentQty = inCart ? inCart.quantity : 0;

            return (
              <div
                key={box.id}
                className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between border border-[#F0ECE1] group select-none relative"
              >
                
                {/* Top Image: 65% Card Height Frame (10% Taller with Full Top Bleed) */}
                <div className="w-full aspect-[4/3.8] overflow-hidden bg-[#FBF7F0] relative">
                  <Image
                    src={box.image}
                    alt={box.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Subtle Floating Contents Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] text-white flex items-center gap-1">
                    <Package className="w-3 h-3 text-[#EADBCA]" />
                    <span>{box.capacitySlots} Slots Capacity</span>
                  </div>
                </div>

                {/* Body Content (Matching Exact Reference Screenshot) */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-[#7A8B6F] uppercase tracking-wider block font-sans">
                      Keepsake Vessel
                    </span>
                    <h3 
                      className="text-[17px] sm:text-[19px] font-semibold text-[#1A1A18] leading-snug line-clamp-1 group-hover:text-[#7A1C29] transition-colors tracking-tight font-sans"
                      style={{ fontFamily: 'var(--font-jakarta), system-ui, -apple-system, sans-serif' }}
                    >
                      {box.name}
                    </h3>
                    <p 
                      className="text-xs text-[#7A7268] font-normal line-clamp-1 font-sans"
                      style={{ fontFamily: 'var(--font-jakarta), system-ui, -apple-system, sans-serif' }}
                    >
                      {box.tagline}
                    </p>
                  </div>

                  {/* Enquire Box Button + Dynamic Stepper */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        handleIncrement(box);
                        const el = document.getElementById('curation-inquiry');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 border border-[#C5A880] text-[#9E7B35] hover:bg-[#C5A880] hover:text-white rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                    >
                      <span>Enquire Box</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Dynamic Quantity Stepper Counter */}
                    {currentQty > 0 ? (
                      <div 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="flex items-center bg-[#FAF5EC] border border-[#C5A880] rounded-lg p-0.5 shadow-xs"
                      >
                        <button
                          onClick={(e) => handleDecrement(box, e)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded flex items-center justify-center text-[#7A1C29] hover:bg-[#C5A880] hover:text-white transition-colors active:scale-90 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#451B27] select-none">
                          {currentQty}
                        </span>
                        <button
                          onClick={(e) => handleIncrement(box, e)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded flex items-center justify-center text-[#7A1C29] hover:bg-[#C5A880] hover:text-white transition-colors active:scale-90 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleIncrement(box, e)}
                        aria-label="Add to curation"
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer bg-[#FAF5EC] hover:bg-[#F2E8D7] text-[#9E7B35] border border-[#EADBCA] flex items-center gap-1 active:scale-95 shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Bag</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
