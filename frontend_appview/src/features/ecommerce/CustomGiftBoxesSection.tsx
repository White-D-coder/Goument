'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Sparkles, ArrowRight, ChevronLeft, ChevronRight, Plus, Minus, Layers, Magnet, Box as BoxIcon, Archive, Gift } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export interface CustomBoxItem {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  capacity: string;
  capacitySlots: number;
  price: number;
  dimensions: string;
  material: string;
  image: string;
  tag: string;
  iconType?: string;
}

export const SIGNATURE_BOXES: CustomBoxItem[] = [
  {
    id: 'box_maroon_bloom',
    name: 'Maroon Bloom Book-Style Box',
    subtitle: 'Magnetic Book-Style Keepsake Box',
    tagline: 'Crushed silk bedding with handcrafted botanical gold foiling.',
    capacity: '4 Gourmet Delicacy Slots',
    capacitySlots: 4,
    price: 1450,
    dimensions: '28 × 22 × 8 cm',
    material: 'Crushed Satin Bedding • Rich Floral Gold Foiling',
    image: '/images/catalogue_items/maroon_bloom_box.jpg',
    tag: 'Signature Series',
  },
  {
    id: 'box_midnight_bloom',
    name: 'Midnight Bloom Book-Style Box',
    subtitle: 'Textured Navy Blue Satin Keepsake',
    tagline: 'Deep royal blue satin with intricate gold botanical foiling.',
    capacity: '5 Curated Compartments',
    capacitySlots: 5,
    price: 1550,
    dimensions: '30 × 24 × 8.5 cm',
    material: 'Royal Blue Velvet Lining • Metallic Foil Crest',
    image: '/images/catalogue_items/midnight_bloom_box.jpg',
    tag: 'Signature Series',
  },
  {
    id: 'box_lavender_bloom',
    name: 'Lavender Bloom Book-Style Box',
    subtitle: 'Pastel Lilac Suede Keepsake',
    tagline: 'Delicate pastel lilac textured box with soft-touch suede interior.',
    capacity: '4 Delicacy Slots + Card Sleeve',
    capacitySlots: 4,
    price: 1450,
    dimensions: '26 × 20 × 7.5 cm',
    material: 'Pastel Lilac Suede • Grosgrain Ribbon Bow',
    image: '/images/catalogue_items/lavender_bloom_box.jpg',
    tag: 'Signature Series',
  },
  {
    id: 'box_two_tier_luxe',
    name: 'Two-Tier Luxe Box',
    subtitle: 'Sliding Dual-Tier Sovereign Trunk',
    tagline: 'Double the luxury, double the impact.',
    capacity: '8 Signature Delicacy Slots',
    capacitySlots: 8,
    price: 2450,
    dimensions: '32 × 24 × 16 cm',
    material: 'Two Sliding Velvet Drawers • Brass Pull Handles',
    image: '/images/catalogue_items/two_tier_luxe_box.jpg',
    tag: 'Grand Scale',
  },
  {
    id: 'box_magnetic_top_lid',
    name: 'Magnetic Top-Lid Box',
    subtitle: 'Rigid Presentation Gift Box',
    tagline: 'Secure closure. Seamless experience.',
    capacity: '6 Multi-Format Slots',
    capacitySlots: 6,
    price: 1350,
    dimensions: '30 × 22 × 8 cm',
    material: 'Heavy Rigid Kraft • Metallic Gold Stamping',
    image: '/images/catalogue_items/magnetic_top_lid_box.jpg',
    tag: 'Seamless Seal',
  },
  {
    id: 'box_corrugated',
    name: 'Corrugated Box',
    subtitle: 'Heavyweight Protective Courier Box',
    tagline: 'Durable, lightweight and perfect for shipping.',
    capacity: '4 Standard Slots',
    capacitySlots: 4,
    price: 850,
    dimensions: '26 × 18 × 9 cm',
    material: 'Reinforced Kraft • Gold Crest Stamp',
    image: '/images/catalogue_items/corrugated_box.jpg',
    tag: 'Shipping Grade',
  },
  {
    id: 'box_tin',
    name: 'Tin Box',
    subtitle: 'Embossed Navy & Gold Keepsake Tin',
    tagline: 'Reusable keepsake. Lasting memories.',
    capacity: '4 Keepsake Compartments',
    capacitySlots: 4,
    price: 1150,
    dimensions: '24 × 18 × 8 cm',
    material: 'Matte Gilded Tinplate • Hinged Lid',
    image: '/images/catalogue_items/tin_box_keepsake.jpg',
    tag: 'Reusable Tin',
  },
  {
    id: 'box_premium_hamper_tray',
    name: 'Premium Hamper Tray',
    subtitle: 'Open Display Tray with Cutout Handles',
    tagline: 'Elegant presentation for curated hampers.',
    capacity: '6 Display Slots',
    capacitySlots: 6,
    price: 1250,
    dimensions: '32 × 26 × 10 cm',
    material: 'Botanical Lilac Board • Die-Cut Handle Grips',
    image: '/images/catalogue_items/premium_hamper_tray.jpg',
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

  const handleIncrement = (box: CustomBoxItem) => {
    const existing = cartItems.find((i) => i.productId === box.id);
    if (existing) {
      updateQuantity(existing.id, existing.quantity + 1);
      toast.success(`Updated ${box.name} (${existing.quantity + 1} in Bag) 🎁`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 1200,
      });
    } else {
      addItem({
        productId: box.id,
        giftBoxingType: box.id,
        quantity: 1,
        name: `Signature Box: ${box.name}`,
        price: box.price * 100, // in paise
        image: box.image,
      });
      toast.success(`Added ${box.name} to Bag! 🎁`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 1200,
      });
    }
  };

  const handleDecrement = (box: CustomBoxItem) => {
    const existing = cartItems.find((i) => i.productId === box.id);
    if (!existing) return;
    if (existing.quantity <= 1) {
      removeItem(existing.id);
      toast.success(`Removed ${box.name} from Bag`, {
        style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
        duration: 1200,
      });
    } else {
      updateQuantity(existing.id, existing.quantity - 1);
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#F6F4EF] text-[#1A1A18] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-10">

        {/* ─── SECTION HEADER & APPLE CAROUSEL ARROWS ─── */}
        <div className="px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl text-left">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-[#7A8B6F] uppercase inline-flex items-center gap-2">
              <Package className="w-3.5 h-3.5 text-[#BFA267]" />
              Bespoke Box Formats
            </span>

            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#1A1A18] tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Designed to delight. <br className="hidden sm:block" />Made to impress.
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#78746D] font-light leading-relaxed max-w-xl">
              Our signature collection of designer gift boxes crafted to elevate every gifting experience.
            </p>
          </div>

          {/* Apple Style Nav Arrows */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous Box"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                canScrollLeft
                  ? 'bg-white text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white shadow-md active:scale-90'
                  : 'bg-black/5 text-[#B5AFA6] opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next Box"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                canScrollRight
                  ? 'bg-white text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white shadow-md active:scale-90'
                  : 'bg-black/5 text-[#B5AFA6] opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ─── SINGLE-LINE HORIZONTAL APPLE CAROUSEL TRACK ─── */}
        <div
          ref={carouselRef}
          className="flex gap-5 sm:gap-7 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar px-5 sm:px-8 lg:px-12 pb-6 pt-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {SIGNATURE_BOXES.map((box) => {
            const inCart = cartItems.find((i) => i.productId === box.id);
            const currentQty = inCart ? inCart.quantity : 0;

            return (
              <div
                key={box.id}
                className="w-[290px] sm:w-[340px] md:w-[380px] shrink-0 snap-start bg-white rounded-[28px] p-5 sm:p-6 flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.12)] transition-all duration-500 group relative select-none"
              >
                
                {/* Visual Image Banner & Floating Badges */}
                <div className="space-y-4">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FBF7F0] relative">
                    <Image
                      src={box.image}
                      alt={box.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                    
                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-black/75 backdrop-blur-md text-[#F6F4EF] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
                        {box.tag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-[#1A1A18]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                      <Layers className="w-3 h-3 text-[#BFA267]" />
                      <span>{box.capacitySlots} Slots</span>
                    </div>

                    {/* Dimensions Pill Bottom */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#1A1A18] text-[9.5px] font-mono px-2.5 py-0.5 rounded-md shadow-2xs">
                      {box.dimensions}
                    </div>
                  </div>

                  {/* Metadata & Title */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-[9.5px] font-bold text-[#7A8B6F] uppercase tracking-wider block">
                      {box.capacity}
                    </span>
                    <h3
                      className="text-lg sm:text-xl md:text-2xl font-bold text-[#451B27] leading-snug group-hover:text-[#1A1A18] transition-colors"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {box.name}
                    </h3>
                    <p className="font-serif italic text-xs sm:text-[13px] text-[#78746D] leading-relaxed">
                      “{box.tagline}”
                    </p>
                    <p className="text-[10.5px] text-[#8A8680] font-light pt-0.5">
                      {box.material}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="pt-5 mt-5 flex items-center justify-between gap-3 border-t border-black/5">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#8A8680] block font-bold">
                      Base Box Only
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-[#1A1A18]">
                      ₹{box.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Customize Button */}
                    <Link
                      href="/customize"
                      className="px-3.5 py-2 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE1] text-[11px] font-semibold text-[#1A1A18] transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-2xs"
                      title="Customize with delicacies"
                    >
                      <Sparkles className="w-3 h-3 text-[#BFA267]" />
                      <span>Fill Box</span>
                    </Link>

                    {/* Bag / Dynamic Quantity Counter Stepper */}
                    {currentQty > 0 ? (
                      <div
                        className="flex items-center bg-[#FAF8F5] rounded-full p-0.5 shadow-xs"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => handleDecrement(box)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#1A1A18] hover:bg-[#BFA267] hover:text-white transition-colors active:scale-90 cursor-pointer shadow-2xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#1A1A18] px-2 min-w-[20px] text-center">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => handleIncrement(box)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded-full bg-[#1A1A18] text-white flex items-center justify-center hover:bg-[#451B27] transition-colors active:scale-90 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleIncrement(box)}
                        className="px-4 py-2 rounded-full bg-[#1A1A18] hover:bg-[#451B27] text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3 h-3 text-[#EADBCA]" />
                        <span>+ Bag</span>
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
