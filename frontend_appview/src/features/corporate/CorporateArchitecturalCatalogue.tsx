'use client';

import React, { useState } from 'react';
import { ArrowRight, Minus, Package, Plus } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import toast from 'react-hot-toast';

export interface CorporateCategory {
  id: string;
  code: string;
  label: string;
  image: string;
  clipPath: string;
  pastelActive: string;
  pastelHover: string;
}

export interface CorporateProduct {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  image: string;
}

export const CORPORATE_CATEGORIES: CorporateCategory[] = [
  {
    id: 'office-travel-bags',
    code: '01',
    label: 'Office & Travel Bags',
    image: '/images/corporate/category_icons/travelss.jpg',
    clipPath: 'polygon(50% 0%, 100% 25%, 85% 100%, 15% 100%, 0% 25%)',
    pastelActive: 'bg-[#D6C2A9]',
    pastelHover: 'group-hover:bg-[#D6C2A9]/50',
  },
  {
    id: 'electronics-audio',
    code: '02',
    label: 'Electronics',
    image: '/images/corporate/category_icons/Electronics.jpg',
    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
    pastelActive: 'bg-[#C7C3B7]',
    pastelHover: 'group-hover:bg-[#C7C3B7]/50',
  },
  {
    id: 'stationery-desk',
    code: '03',
    label: 'Stationery & Desk',
    image: '/images/corporate/category_icons/Stationery & Desk Accessories.jpg',
    clipPath: 'polygon(50% 0%, 95% 35%, 80% 100%, 20% 100%, 5% 35%)',
    pastelActive: 'bg-[#D2C8B8]',
    pastelHover: 'group-hover:bg-[#D2C8B8]/50',
  },
  {
    id: 'corporate-apparel',
    code: '04',
    label: 'Apparel',
    image: '/images/corporate/category_icons/Apparel.jpg',
    clipPath: 'polygon(30% 0%, 70% 0%, 100% 40%, 85% 100%, 15% 100%, 0% 40%)',
    pastelActive: 'bg-[#C5CCC5]',
    pastelHover: 'group-hover:bg-[#C5CCC5]/50',
  },
  {
    id: 'awards-recognition',
    code: '05',
    label: 'Recognition',
    image: '/images/corporate/category_icons/Recognition.jpg',
    clipPath: 'polygon(50% 0%, 100% 30%, 80% 100%, 20% 100%, 0% 30%)',
    pastelActive: 'bg-[#D7CEC2]',
    pastelHover: 'group-hover:bg-[#D7CEC2]/50',
  },
];

export const CORPORATE_PRODUCTS: CorporateProduct[] = [
  // ── 01 OFFICE & TRAVEL BAGS ──
  {
    id: 'corp-office-bag',
    name: 'Office Bag',
    subtitle: 'Structured Full-Grain Leather Briefcase',
    category: 'office-travel-bags',
    categoryLabel: 'Office & Travel Bags',
    image: '/images/corporate/OfficeTravelBags/office_bag.jpg',
  },
  {
    id: 'corp-laptop-bag',
    name: 'Laptop Bag',
    subtitle: 'Espresso Leather Messenger Sleeve',
    category: 'office-travel-bags',
    categoryLabel: 'Office & Travel Bags',
    image: '/images/corporate/OfficeTravelBags/LaptopBag.jpg',
  },
  {
    id: 'corp-luggage',
    name: 'Luggage',
    subtitle: 'Impact-Resistant Ribbed Cabin Case',
    category: 'office-travel-bags',
    categoryLabel: 'Office & Travel Bags',
    image: '/images/corporate/OfficeTravelBags/Luggage.jpg',
  },
  {
    id: 'corp-trolley-bag',
    name: 'Trolley Bag',
    subtitle: 'Executive Wheeled Carry-On Suitcase',
    category: 'office-travel-bags',
    categoryLabel: 'Office & Travel Bags',
    image: '/images/corporate/OfficeTravelBags/TrolleyBag.jpg',
  },
  {
    id: 'corp-duffel-bag',
    name: 'Duffel Bag',
    subtitle: 'Textured Leather Weekender Duffel',
    category: 'office-travel-bags',
    categoryLabel: 'Office & Travel Bags',
    image: '/images/corporate/OfficeTravelBags/Duffel Bag.jpg',
  },
  {
    id: 'corp-backpack',
    name: 'Backpack',
    subtitle: 'Ergonomic Commute Tech Backpack',
    category: 'office-travel-bags',
    categoryLabel: 'Office & Travel Bags',
    image: '/images/corporate/OfficeTravelBags/Backpack.jpg',
  },

  // ── 02 ELECTRONICS ──
  {
    id: 'corp-headphones',
    name: 'Headphones',
    subtitle: 'Active Noise Cancelling Studio Audio',
    category: 'electronics-audio',
    categoryLabel: 'Electronics',
    image: '/images/corporate/electronics/Headphones.jpg',
  },
  {
    id: 'corp-bluetooth-speaker',
    name: 'Bluetooth Speaker',
    subtitle: 'Acoustic Fabric Executive Soundbar',
    category: 'electronics-audio',
    categoryLabel: 'Electronics',
    image: '/images/corporate/electronics/Bluetooth Speaker.jpg',
  },
  {
    id: 'corp-power-bank',
    name: 'Power Bank',
    subtitle: 'Slim 10,000mAh Fast Charging Alloy',
    category: 'electronics-audio',
    categoryLabel: 'Electronics',
    image: '/images/corporate/electronics/powerbank.jpg',
  },
  {
    id: 'corp-tws-earbuds',
    name: 'TWS Earbuds',
    subtitle: 'Low-Latency Wireless In-Ear Acoustics',
    category: 'electronics-audio',
    categoryLabel: 'Electronics',
    image: '/images/corporate/electronics/TWS Earbuds.jpg',
  },
  {
    id: 'corp-wireless-charger',
    name: 'Wireless Charger',
    subtitle: 'Circular Leatherette Fast Induction Pad',
    category: 'electronics-audio',
    categoryLabel: 'Electronics',
    image: '/images/corporate/electronics/Wireless Charger.jpg',
  },
  {
    id: 'corp-desk-gadgets',
    name: 'Desk Gadgets',
    subtitle: '3-in-1 Phone, Watch & Earbud Dock',
    category: 'electronics-audio',
    categoryLabel: 'Electronics',
    image: '/images/corporate/electronics/Desk Gadgets.jpg',
  },

  // ── 03 STATIONERY & DESK ACCESSORIES ──
  {
    id: 'corp-pen-set',
    name: 'Premium Pen Set',
    subtitle: 'Dual Rollerball & Fountain Brass Casing',
    category: 'stationery-desk',
    categoryLabel: 'Stationery & Desk',
    image: '/images/corporate/stationary/Premium Pen Set.jpg',
  },
  {
    id: 'corp-paper-weight',
    name: 'Paper Weight',
    subtitle: 'Faceted Optic Crystal Sphere on Brass',
    category: 'stationery-desk',
    categoryLabel: 'Stationery & Desk',
    image: '/images/corporate/stationary/Paper Weight.jpg',
  },
  {
    id: 'corp-table-clock',
    name: 'Table Clock',
    subtitle: 'Heritage Architectural Desk Timepiece',
    category: 'stationery-desk',
    categoryLabel: 'Stationery & Desk',
    image: '/images/corporate/stationary/Table Clock.jpg',
  },
  {
    id: 'corp-diary-2026',
    name: 'Diary 2026',
    subtitle: 'Midnight Bound Executive Journal',
    category: 'stationery-desk',
    categoryLabel: 'Stationery & Desk',
    image: '/images/corporate/stationary/Diary 2026.jpg',
  },
  {
    id: 'corp-desk-organizer',
    name: 'Desk Organizer',
    subtitle: 'Tiered Full-Grain Leather Utility Caddy',
    category: 'stationery-desk',
    categoryLabel: 'Stationery & Desk',
    image: '/images/corporate/stationary/Desk Organizer.jpg',
  },
  {
    id: 'corp-passport-holder',
    name: 'Passport Holder',
    subtitle: 'Travel Passport & Boarding Wallet',
    category: 'stationery-desk',
    categoryLabel: 'Stationery & Desk',
    image: '/images/corporate/stationary/Passport Holder.jpg',
  },

  // ── 04 APPAREL ──
  {
    id: 'corp-custom-tshirts',
    name: 'Customised T-Shirts',
    subtitle: 'Bio-Washed Organic Cotton Corporate Apparel',
    category: 'corporate-apparel',
    categoryLabel: 'Apparel',
    image: '/images/corporate/customtees/custom.jpg',
  },

  // ── 05 RECOGNITION ──
  {
    id: 'corp-acrylic-trophy',
    name: 'Acrylic Trophy',
    subtitle: 'Custom Commemorative Recognition Award',
    category: 'awards-recognition',
    categoryLabel: 'Recognition',
    image: '/images/corporate/customtees/awards.jpg',
  },
];

export default function CorporateArchitecturalCatalogue() {
  const [selectedCategory, setSelectedCategory] = useState<string>('office-travel-bags');

  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const filteredProducts = CORPORATE_PRODUCTS.filter(
    (item) => item.category === selectedCategory
  );

  const getItemCartEntry = (itemId: string) => {
    return cartItems.find((i) => i.productId === itemId);
  };

  const handleIncrement = async (item: CorporateProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = getItemCartEntry(item.id);
    if (existing) {
      const ok = updateQuantity(existing.id, existing.quantity + 1);
      if (ok) {
        toast.success(`Updated ${item.name} in Curation Tray`, {
          style: { background: '#242321', color: '#FAF8F5', border: '1px solid #BFA267' },
          duration: 1500,
        });
      }
    } else {
      const ok = await addItem({
        productId: item.id,
        giftBoxingType: item.category,
        quantity: 1,
        name: item.name,
        price: 0,
        image: item.image,
      });
      if (ok) {
        toast.success(`Added ${item.name} to Curation Tray`, {
          style: { background: '#242321', color: '#FAF8F5', border: '1px solid #BFA267' },
          duration: 1500,
        });
      }
    }
  };

  const handleDecrement = (item: CorporateProduct, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const existing = getItemCartEntry(item.id);
    if (!existing) return;

    if (existing.quantity <= 1) {
      removeItem(existing.id);
      toast(`${item.name} removed from curation tray`, { duration: 1200 });
    } else {
      updateQuantity(existing.id, existing.quantity - 1);
    }
  };

  return (
    <section className="pt-2 sm:pt-4 pb-6 sm:pb-10 px-3 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18]">
      <div className="max-w-[1360px] mx-auto space-y-2.5 sm:space-y-6">

        {/* ─── ASYMMETRIC FACETED POLYGON CATEGORIES (5 CORPORATE DIVISIONS) ─── */}
        <div className="pt-1 pb-4 sm:pb-6">
          <div className="flex items-center justify-start sm:justify-center gap-3.5 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto no-scrollbar py-1.5 sm:py-3 px-1 sm:px-2">
            {CORPORATE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none transition-all duration-300"
                >
                  {/* Outer Asymmetric Polygon Wrapper Frame */}
                  <div
                    style={{
                      clipPath: cat.clipPath,
                      WebkitClipPath: cat.clipPath,
                    }}
                    className={`w-20 h-20 sm:w-26 sm:h-26 md:w-28 md:h-28 lg:w-32 lg:h-32 p-[2.5px] sm:p-[3.5px] transition-all duration-500 ${
                      isSelected
                        ? `${cat.pastelActive} scale-110 shadow-[0_12px_28px_rgba(0,0,0,0.08)] -rotate-1`
                        : `bg-[#EAE5DC] ${cat.pastelHover} group-hover:scale-105 group-hover:rotate-1`
                    }`}
                  >
                    {/* Inner Asymmetric Polygon Image Container */}
                    <div
                      style={{
                        clipPath: cat.clipPath,
                        WebkitClipPath: cat.clipPath,
                      }}
                      className="w-full h-full bg-[#FAF8F5] overflow-hidden relative flex items-center justify-center"
                    >
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          isSelected ? 'scale-[0.92]' : 'scale-[0.84] group-hover:scale-[0.90]'
                        }`}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isSelected ? 'bg-transparent' : 'bg-black/5 group-hover:bg-transparent'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Asymmetric Polygon Label */}
                  <span
                    className={`text-[9.5px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-wider mt-3 max-w-[120px] text-center leading-tight transition-colors ${
                      isSelected
                        ? 'text-[#2D2A26]'
                        : 'text-[#8A8680] group-hover:text-[#2D2A26]'
                    }`}
                  >
                    {cat.label}
                  </span>

                  {/* Active Indicator Underline */}
                  <div
                    className={`h-0.5 rounded-full mt-1.5 transition-all duration-300 ${
                      isSelected
                        ? 'w-6 bg-[#C5A880]'
                        : 'w-0 bg-transparent group-hover:w-3 group-hover:bg-[#C5A880]/50'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── MOBILE SWIPE HINT / COUNT ─── */}
        <div className="flex sm:hidden items-center justify-between text-[11px] text-[#8A8680] font-medium px-1 pt-1">
          <span>{filteredProducts.length} Corporate Items</span>
          <span className="text-[#9E7B35] font-semibold">Swipe to explore ⟶</span>
        </div>

        {/* ─── 4-COLUMN PRODUCT CARD GRID (MATCHING MAIN SITE CARD DESIGN) ─── */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filteredProducts.map((item) => {
            const cartEntry = getItemCartEntry(item.id);
            const currentQty = cartEntry ? cartEntry.quantity : 0;

            return (
              <div
                key={item.id}
                className="w-[80vw] max-w-[300px] sm:w-auto shrink-0 snap-center bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between border border-[#F0ECE1] group text-left"
              >
                {/* Top Image (Rounded-t-2xl) */}
                <div className="w-full aspect-[4/3] overflow-hidden bg-[#FBF7F0] relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Floating Contents Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Package className="w-3 h-3 text-[#EADBCA]" />
                    <span>Executive Grade</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-bold text-[#7A8B6F] uppercase tracking-wider block font-sans">
                      {item.categoryLabel}
                    </span>
                    <h3 
                      className="text-[17px] sm:text-[19px] font-semibold text-[#1A1A18] leading-snug line-clamp-2 group-hover:text-[#7A1C29] transition-colors tracking-tight font-sans"
                      style={{ fontFamily: 'var(--font-jakarta), system-ui, -apple-system, sans-serif' }}
                    >
                      {item.name}
                    </h3>
                    <p 
                      className="text-xs sm:text-[13px] text-[#7A7268] font-normal line-clamp-1 font-sans"
                      style={{ fontFamily: 'var(--font-jakarta), system-ui, -apple-system, sans-serif' }}
                    >
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Action Buttons: View Link + Bag Stepper */}
                  <div className="pt-1 sm:pt-2 flex items-center justify-between gap-2">
                    <button
                      onClick={async (e) => {
                        if (currentQty === 0) {
                          await handleIncrement(item, e);
                        }
                        window.location.href = '/gourmet-gifts#curation-inquiry';
                      }}
                      className="inline-flex items-center gap-1.5 border border-[#C5A880] text-[#9E7B35] group-hover:bg-[#C5A880] group-hover:text-white rounded-lg px-3 sm:px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Dynamic Quantity Stepper Counter */}
                    {currentQty > 0 ? (
                      <div 
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        className="flex items-center bg-[#FAF5EC] border border-[#C5A880] rounded-lg p-0.5 shadow-xs"
                      >
                        <button
                          onClick={(e) => handleDecrement(item, e)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded flex items-center justify-center text-[#9E7B35] hover:bg-[#C5A880] hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#1A1A18]">
                          {currentQty}
                        </span>
                        <button
                          onClick={(e) => handleIncrement(item, e)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded flex items-center justify-center text-[#9E7B35] hover:bg-[#C5A880] hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleIncrement(item, e)}
                        className="inline-flex items-center gap-1 bg-[#FAF5EC] hover:bg-[#C5A880] text-[#9E7B35] hover:text-white border border-[#EADBCA] hover:border-[#C5A880] rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 shadow-2xs cursor-pointer active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* ─── BOTTOM PROPOSAL ACTION BAR ─── */}
        <div className="pt-6 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 bg-white rounded-2xl border border-[#F0ECE1] shadow-xs text-left">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-semibold text-[#1A1A18]">
              Ready to create your custom corporate gifting package?
            </h4>
            <p className="text-xs text-[#78746D]">
              Selected corporate items above will automatically attach to your tailored curation proposal.
            </p>
          </div>

          <a
            href="/gourmet-gifts#curation-inquiry"
            className="px-6 py-3.5 bg-[#1A1A18] hover:bg-[#38332B] text-white text-xs font-mono uppercase tracking-[0.2em] transition-all shadow-md inline-flex items-center gap-2 cursor-pointer shrink-0 rounded-none"
          >
            <span>Proceed to Curation Inquiry ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DFC299]" />
          </a>
        </div>

      </div>
    </section>
  );
}