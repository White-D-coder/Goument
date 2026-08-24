'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, X, Sparkles, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/hooks/useCart';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

export interface InsideItem {
  item: string;
  weight: string;
}

export interface HamperData {
  _id: string;
  name: string;
  category: 'sweets' | 'snacks' | 'tea-coffee' | 'dry-fruits';
  inside_items: InsideItem[];
  packaging_style: string;
  description: string;
  price: number;
  image: string;
}

const CATEGORY_POLYGONS = [
  {
    id: 'all',
    label: 'ALL HAMPERS',
    shapeName: 'Asymmetric Octagon',
    image: '/images/Category_image/Classics/classics_hero.png',
    clipPath: 'polygon(38% 0%, 84% 6%, 100% 52%, 76% 96%, 28% 100%, 0% 72%, 8% 24%)',
  },
  {
    id: 'sweets',
    label: 'ARTISANAL SWEETS',
    shapeName: 'Asymmetric Pentagon',
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    clipPath: 'polygon(44% 0%, 98% 28%, 78% 100%, 12% 92%, 0% 42%)',
  },
  {
    id: 'snacks',
    label: 'SNACKS & SAVOURIES',
    shapeName: 'Asymmetric Hexagon',
    image: '/images/Category_image/Classics/classic.jpeg',
    clipPath: 'polygon(18% 0%, 94% 14%, 100% 76%, 66% 100%, 6% 86%, 0% 30%)',
  },
  {
    id: 'tea-coffee',
    label: 'TEA & COFFEE SUITES',
    shapeName: 'Asymmetric Heptagon',
    image: '/images/Category_image/premium_velvet/thumb.jpeg',
    clipPath: 'polygon(54% 0%, 96% 22%, 86% 84%, 46% 100%, 8% 88%, 0% 38%, 20% 10%)',
  },
  {
    id: 'dry-fruits',
    label: 'DRY FRUITS & NUTS',
    shapeName: 'Asymmetric Crystal',
    image: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
    clipPath: 'polygon(46% 0%, 96% 36%, 82% 94%, 16% 100%, 0% 56%, 18% 14%)',
  },
];

const HAMPERS_CATALOG: HamperData[] = [
  /* ── 1. ARTISANAL SWEETS & CONFECTIONS ── */
  {
    _id: 'hamper_royal_sweet_box',
    name: 'The Royal Sweet Box',
    category: 'sweets',
    inside_items: [
      { item: 'Pistachio Kaju Katli', weight: '150g' },
      { item: 'Dark Chocolate Almond Bark', weight: '100g' },
      { item: 'Rose & Saffron Peda Bites', weight: '150g' },
      { item: 'Sea Salt Caramel Truffles', weight: '100g' },
    ],
    packaging_style: 'Burgundy Rigid Book-Style Box with Satin Interior',
    description: 'A regal assortment of contemporary mithai and handcrafted chocolate favourites.',
    price: 1499,
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
  },
  {
    _id: 'hamper_mithai_atelier',
    name: 'The Mithai Atelier',
    category: 'sweets',
    inside_items: [
      { item: 'Besan Laddoo Bites', weight: '150g' },
      { item: 'Saffron Peda', weight: '150g' },
      { item: 'Hazelnut Chocolate Fudge', weight: '120g' },
      { item: 'Almond Praline Truffles', weight: '100g' },
    ],
    packaging_style: 'Lavender Linen-Finish Magnetic Box',
    description: 'Classic Indian indulgence reimagined with elegant textures and modern flavours.',
    price: 1290,
    image: '/images/Category_image/Classics/classic_1.png',
  },
  {
    _id: 'hamper_grand_confectionery_chest',
    name: 'The Grand Confectionery Chest',
    category: 'sweets',
    inside_items: [
      { item: 'Premium Kaju Katli', weight: '200g' },
      { item: 'Pistachio & Cranberry Chocolate Bark', weight: '120g' },
      { item: 'Belgian Chocolate Truffles', weight: '120g' },
      { item: 'Salted Caramel Gourmet Fudge', weight: '150g' },
    ],
    packaging_style: 'Royal Velvet Chest with Gold-Foil Detailing',
    description: 'An opulent celebration of fine mithai, chocolate and confectionery craftsmanship.',
    price: 2499,
    image: '/images/Category_image/premium_velvet/thumb.jpeg',
  },

  /* ── 2. SNACKS & SAVOURIES ── */
  {
    _id: 'hamper_snack_attack',
    name: 'Snack Attack Hamper',
    category: 'snacks',
    inside_items: [
      { item: 'Peri-Peri Gourmet Makhana', weight: '80g' },
      { item: 'Black Pepper Cashews', weight: '100g' },
      { item: 'Baked Gujarati Namkeen', weight: '150g' },
      { item: 'Sea Salt Millet Crisps', weight: '100g' },
    ],
    packaging_style: 'Premium Gilded Tinplate Box',
    description: 'A lively edit of crunchy, savoury favourites made for effortless snacking.',
    price: 990,
    image: '/images/Category_image/Classics/classic.jpeg',
  },
  {
    _id: 'hamper_savoury_society',
    name: 'The Savoury Society',
    category: 'snacks',
    inside_items: [
      { item: 'Ghee-Roasted Makhana', weight: '100g' },
      { item: 'Jaggery Chilli Almonds', weight: '100g' },
      { item: 'Baked Bhakarwadi', weight: '150g' },
      { item: 'Rosemary Seed Crisps', weight: '100g' },
    ],
    packaging_style: 'Midnight Blue Rigid Box with Custom Compartments',
    description: 'Refined Indian snacking with bold flavours, premium ingredients and irresistible crunch.',
    price: 1299,
    image: '/images/Category_image/Royale_tin_tin/tin1.jpeg',
  },
  {
    _id: 'hamper_gourmet_crunch_trunk',
    name: 'The Gourmet Crunch Trunk',
    category: 'snacks',
    inside_items: [
      { item: 'Truffle-Flavoured Makhana', weight: '100g' },
      { item: 'Smoked Paprika Cashews', weight: '120g' },
      { item: 'Premium Maharashtra Chivda', weight: '150g' },
      { item: 'Artisanal Multigrain Crisps', weight: '120g' },
    ],
    packaging_style: 'Teakwood-Finish Luxury Tray with Rigid Sleeve',
    description: 'A sophisticated savoury collection for those who appreciate elevated everyday indulgence.',
    price: 1799,
    image: '/images/Category_image/Classics/classics_hero.png',
  },

  /* ── 3. TEA & COFFEE SUITES ── */
  {
    _id: 'hamper_tea_room_collection',
    name: 'The Tea Room Collection',
    category: 'tea-coffee',
    inside_items: [
      { item: 'Single-Estate Assam Tea', weight: '100g' },
      { item: 'Kashmir Acacia Honey', weight: '100g' },
      { item: 'Almond Biscotti', weight: '120g' },
      { item: 'Sandalwood Soy Candle', weight: '100g' },
    ],
    packaging_style: 'Lavender Book-Style Box with Satin Interior',
    description: 'A quiet luxury ritual of fine tea, wild honey, delicate biscotti and warm candlelight.',
    price: 1499,
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
  },
  {
    _id: 'hamper_coffee_connoisseur',
    name: 'The Coffee Connoisseur',
    category: 'tea-coffee',
    inside_items: [
      { item: 'Single-Origin Chikmagalur Coffee', weight: '200g' },
      { item: 'Dark Chocolate Coffee Bark', weight: '100g' },
      { item: 'Nilgiri Wild Honey', weight: '100g' },
      { item: 'Vanilla Bean Soy Candle', weight: '100g' },
    ],
    packaging_style: 'Midnight Blue Magnetic Rigid Box',
    description: 'A beautifully balanced coffee ritual crafted for slow mornings and meaningful pauses.',
    price: 1699,
    image: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
  },
  {
    _id: 'hamper_grand_brew_suite',
    name: 'The Grand Brew Suite',
    category: 'tea-coffee',
    inside_items: [
      { item: 'Premium Irani Chai Blend', weight: '150g' },
      { item: 'Single-Origin Arabica Coffee', weight: '200g' },
      { item: 'Organic Forest Honey', weight: '150g' },
      { item: 'Luxury Amber Scented Candle', weight: '150g' },
    ],
    packaging_style: 'Royal Burgundy Two-Tier Gift Chest',
    description: 'An elevated tea-and-coffee experience created for discerning hosts, clients and connoisseurs.',
    price: 2499,
    image: '/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg',
  },

  /* ── 4. DRY FRUITS & NUTS ── */
  {
    _id: 'hamper_nut_reserve',
    name: 'The Nut Reserve',
    category: 'dry-fruits',
    inside_items: [
      { item: 'Saffron Mamra Almonds', weight: '100g' },
      { item: 'Jumbo Salted Pistachios', weight: '100g' },
      { item: 'Black Pepper Cashews', weight: '100g' },
      { item: 'Medjool Dates', weight: '150g' },
    ],
    packaging_style: 'Gilded Tinplate Dry Fruit Box',
    description: 'A luxurious quartet of premium nuts and dates selected for freshness, size and flavour.',
    price: 1299,
    image: '/images/Category_image/Royale_tin_tin/tin7.jpeg',
  },
  {
    _id: 'hamper_royal_dry_fruit_chest',
    name: 'The Royal Dry Fruit Chest',
    category: 'dry-fruits',
    inside_items: [
      { item: 'Kashmiri Saffron Almonds', weight: '150g' },
      { item: 'Jumbo Iranian Pistachios', weight: '150g' },
      { item: 'Pistachio-Stuffed Medjool Dates', weight: '150g' },
      { item: 'Kashmir Wild Honey', weight: '100g' },
    ],
    packaging_style: 'Burgundy Velvet Chest with Individual Glass Jars',
    description: 'A grand presentation of prized dry fruits, stuffed dates and golden wild honey.',
    price: 2199,
    image: '/images/Category_image/premium_velvet/vel1.jpeg',
  },
  {
    _id: 'hamper_imperial_nut_treasury',
    name: 'The Imperial Nut Treasury',
    category: 'dry-fruits',
    inside_items: [
      { item: 'Mamra Almonds with Saffron', weight: '150g' },
      { item: 'W180 Roasted Cashews', weight: '150g' },
      { item: 'Jumbo Pistachios', weight: '150g' },
      { item: 'Almond-Stuffed Medjool Dates', weight: '200g' },
    ],
    packaging_style: 'Teakwood Tray with Brass-Finish Compartments',
    description: 'A statement dry-fruit collection designed for celebrations, executive gifting and special occasions.',
    price: 2799,
    image: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
  },
];

export default function KeepsakeEcommerceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalHamper, setActiveModalHamper] = useState<HamperData | null>(null);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const addItem = useCartStore((state) => state.addItem);

  const filteredHampers = HAMPERS_CATALOG.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const handleQuickAdd = async (item: HamperData, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    setAddedIds((prev) => ({ ...prev, [item._id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item._id]: false }));
    }, 1200);

    await addItem({
      productId: item._id,
      giftBoxingType: item.category,
      quantity: 1,
      name: item.name,
      price: item.price * 100, // in paise
      image: item.image,
    });

    toast.success(`Added ${item.name} to bag!`, {
      style: { background: '#2C1820', color: '#FAF8F5', border: '1px solid #BFA267' },
      icon: '🎁',
    });
  };

  return (
    <section className="py-14 sm:py-18 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18] border-y border-[#E0DDD6]">
      <div className="max-w-[1360px] mx-auto space-y-10 sm:space-y-12">
        
        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-xl mx-auto px-4">
            <span className="type-meta text-[#7A8B6F] text-[9.5px] sm:text-[10.5px] tracking-[0.3em] uppercase font-bold block mb-2">
              Curated Gift Hampers
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A18] leading-[1.1] tracking-[-0.02em] font-light"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Signature Gifting Hampers
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#78746D] font-light">
              Artisanal delicacies, luxury keepsakes, and bespoke packaging for memorable celebrations.
            </p>
          </div>
        </ScrollReveal>

        {/* ─── ASYMMETRIC FACETED POLYGON CATEGORIES ─── */}
        <div className="pt-2 pb-2">
          <div className="flex items-center justify-start sm:justify-center gap-5 sm:gap-7 md:gap-9 overflow-x-auto no-scrollbar py-3 px-2">
            {CATEGORY_POLYGONS.map((cat) => {
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
                    className={`w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 p-[2.5px] transition-all duration-500 ${
                      isSelected
                        ? 'bg-[#1A1A18] scale-110 shadow-lg -rotate-1'
                        : 'bg-[#D6D1C7] group-hover:bg-[#7A8B6F] group-hover:scale-105 group-hover:rotate-1'
                    }`}
                  >
                    {/* Inner Asymmetric Polygon Image Container */}
                    <div
                      style={{
                        clipPath: cat.clipPath,
                        WebkitClipPath: cat.clipPath,
                      }}
                      className="w-full h-full bg-[#ECE8E1] overflow-hidden relative"
                    >
                      <img
                        src={cat.image}
                        alt={cat.label}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isSelected ? 'scale-115' : 'group-hover:scale-115'
                        }`}
                      />
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isSelected ? 'bg-transparent' : 'bg-black/10 group-hover:bg-transparent'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Asymmetric Polygon Label */}
                  <span
                    className={`text-[9px] sm:text-[10.5px] font-bold uppercase tracking-wider mt-3 max-w-[110px] text-center leading-tight transition-colors ${
                      isSelected
                        ? 'text-[#1A1A18]'
                        : 'text-[#8A8680] group-hover:text-[#1A1A18]'
                    }`}
                  >
                    {cat.label}
                  </span>

                  {/* Active Indicator Underline */}
                  <div
                    className={`h-[2px] w-6 mt-1.5 transition-all duration-300 ${
                      isSelected ? 'bg-[#1A1A18]' : 'bg-transparent'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── EXACT BOMBAY SWEET SHOP STYLE 4-COLUMN HAMPER CARDS GRID ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
          {filteredHampers.map((item) => {
            const isAdded = addedIds[item._id];

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between border border-[#F0ECE1] group"
              >
                {/* Top Image (Rounded-t-2xl) */}
                <div 
                  onClick={() => setActiveModalHamper(item)}
                  className="w-full aspect-[4/3] overflow-hidden bg-[#FBF7F0] relative cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle Floating Contents Pill */}
                  <div className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9.5px] text-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Package className="w-3 h-3 text-[#EADBCA]" />
                    <span>{item.inside_items.length} Items Inside</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3
                      onClick={() => setActiveModalHamper(item)}
                      className="text-lg sm:text-xl font-bold text-[#451B27] leading-snug line-clamp-2 cursor-pointer hover:text-[#7A1C29] transition-colors"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#7A7268] font-normal">
                      from ₹{item.price.toLocaleString('en-IN')} / hamper
                    </p>
                  </div>

                  {/* Golden Enquire / Add Button */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setActiveModalHamper(item)}
                      className="inline-flex items-center gap-1.5 border border-[#C5A880] text-[#9E7B35] hover:bg-[#C5A880] hover:text-white rounded-lg px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                    >
                      <span>Enquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(item, e)}
                      aria-label="Add to cart"
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                        isAdded
                          ? 'bg-[#7A8B6F] text-white'
                          : 'bg-[#FAF5EC] hover:bg-[#F2E8D7] text-[#9E7B35] border border-[#EADBCA]'
                      }`}
                    >
                      {isAdded ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span>+ Bag</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ═══════════════════════════════════════════════
          HAMPER DETAILS & INSIDE ITEMS MODAL
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeModalHamper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalHamper(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-xs"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row border border-[#EADBCA]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalHamper(null)}
                className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/90 text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Column Image */}
              <div className="w-full md:w-5/12 bg-[#FBF7F0] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#F0ECE1]">
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xs">
                  <img
                    src={activeModalHamper.image}
                    alt={activeModalHamper.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8B6F] block">
                    Packaging Style
                  </span>
                  <p className="text-xs font-medium text-[#451B27] mt-0.5">
                    {activeModalHamper.packaging_style}
                  </p>
                </div>
              </div>

              {/* Right Column: Contents & Action */}
              <div className="w-full md:w-7/12 p-6 sm:p-7 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div>
                    <h3
                      className="text-2xl font-bold text-[#451B27] leading-tight"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {activeModalHamper.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#9E7B35] mt-1">
                      From ₹{activeModalHamper.price.toLocaleString('en-IN')} / hamper
                    </p>
                  </div>

                  <p className="text-xs text-[#7A7268] leading-relaxed">
                    {activeModalHamper.description}
                  </p>

                  {/* Inside Items List */}
                  <div className="pt-2 border-t border-[#F0ECE1] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A18] block">
                      What's Inside ({activeModalHamper.inside_items.length} Curated Items):
                    </span>
                    <div className="space-y-1.5">
                      {activeModalHamper.inside_items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs bg-[#FAF8F5] px-3 py-1.5 rounded-lg border border-[#F0ECE1]"
                        >
                          <span className="font-medium text-[#451B27]">• {it.item}</span>
                          <span className="text-[11px] font-bold text-[#7A8B6F] bg-white px-2 py-0.5 rounded border border-[#EADBCA]">
                            {it.weight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#F0ECE1] flex items-center gap-3">
                  <Link
                    href="/inquire"
                    onClick={() => setActiveModalHamper(null)}
                    className="flex-1 text-center py-2.5 bg-[#C5A880] hover:bg-[#B59567] text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    Send Hamper Enquiry
                  </Link>

                  <button
                    onClick={() => {
                      handleQuickAdd(activeModalHamper);
                      setActiveModalHamper(null);
                    }}
                    className="py-2.5 px-4 bg-[#451B27] hover:bg-[#33141D] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
