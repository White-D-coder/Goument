'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Plus, Check } from 'lucide-react';
import { useCartStore } from '@/hooks/useCart';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import toast from 'react-hot-toast';

export interface AtelierProduct {
  _id: string;
  name: string;
  series: string;
  guild: string;
  category: 'all' | 'royale-tin' | 'premium-velvet' | 'teak-wood' | 'candles' | 'hampers';
  price: number; // in Rupees
  originalPrice?: number;
  image: string;
  description: string;
  badge?: string;
}

const CATEGORY_POLYGONS = [
  {
    id: 'all',
    label: 'ALL CURATIONS',
    shapeName: 'Asymmetric Octagon',
    image: '/images/Category_image/Classics/classics_hero.png',
    // Asymmetric 7/8-facet cut
    clipPath: 'polygon(38% 0%, 84% 6%, 100% 52%, 76% 96%, 28% 100%, 0% 72%, 8% 24%)',
  },
  {
    id: 'royale-tin',
    label: 'ROYALE TIN',
    shapeName: 'Asymmetric Pentagon',
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    // Asymmetric 5-facet angular cut
    clipPath: 'polygon(44% 0%, 98% 28%, 78% 100%, 12% 92%, 0% 42%)',
  },
  {
    id: 'premium-velvet',
    label: 'PREMIUM VELVET',
    shapeName: 'Asymmetric Hexagon',
    image: '/images/Category_image/premium_velvet/thumb.jpeg',
    // Asymmetric 6-facet emerald cut
    clipPath: 'polygon(18% 0%, 94% 14%, 100% 76%, 66% 100%, 6% 86%, 0% 30%)',
  },
  {
    id: 'teak-wood',
    label: 'TEAK WOOD',
    shapeName: 'Asymmetric Heptagon',
    image: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
    // Asymmetric 7-facet chiseled shard
    clipPath: 'polygon(54% 0%, 96% 22%, 86% 84%, 46% 100%, 8% 88%, 0% 38%, 20% 10%)',
  },
  {
    id: 'candles',
    label: 'CANDLES & DECOR',
    shapeName: 'Asymmetric Crystal',
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
    // Asymmetric 6-facet crystal
    clipPath: 'polygon(46% 0%, 96% 36%, 82% 94%, 16% 100%, 0% 56%, 18% 14%)',
  },
  {
    id: 'hampers',
    label: 'HAMPER SUITES',
    shapeName: 'Asymmetric Facet Block',
    image: '/images/Category_image/Classics/classic.jpeg',
    // Asymmetric 8-facet architectural block
    clipPath: 'polygon(16% 0%, 88% 6%, 100% 46%, 86% 98%, 32% 94%, 0% 78%, 6% 32%)',
  },
];

const ATELIER_PRODUCTS: AtelierProduct[] = [
  {
    _id: 'cih_emerald_vessel',
    name: 'Emerald Botanical Keepsake Vessel',
    series: 'Series 04.1',
    guild: 'Tinplate Guild',
    category: 'royale-tin',
    price: 2299,
    originalPrice: 2699,
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    description: 'Octagonal lacquer with 24k gold filigree',
    badge: 'Bestseller',
  },
  {
    _id: 'cih_frame',
    name: 'Hand-Carved Heritage Teak Frame',
    series: 'Series 04.2',
    guild: 'Joinery Guild',
    category: 'teak-wood',
    price: 799,
    originalPrice: 999,
    image: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
    description: 'Solid reclaimed teak with velvet back',
    badge: 'Handcrafted',
  },
  {
    _id: 'cih_velvet_chest',
    name: 'Heirloom Velvet Memory Chest',
    series: 'Series 04.3',
    guild: 'Atelier Relic',
    category: 'premium-velvet',
    price: 2499,
    originalPrice: 2899,
    image: '/images/Product_images/CRAFTED IN-HOUSE/velvet-lined_box_large.jpg',
    description: 'Carved woodwork with brass hardware latch',
    badge: 'Guild Relic',
  },
  {
    _id: 'cih_candle',
    name: 'Botanical Amber Soy Candle 220g',
    series: 'Series 04.4',
    guild: 'Apothecary Guild',
    category: 'candles',
    price: 999,
    originalPrice: 1199,
    image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
    description: 'Pure organic soy with Himalayan cedar',
  },
  {
    _id: 'cih_tin_suite',
    name: 'Gilded Damask Tinplate Box',
    series: 'Series 04.5',
    guild: 'Tinplate Guild',
    category: 'royale-tin',
    price: 1899,
    originalPrice: 2199,
    image: '/images/Category_image/Royale_tin_tin/tin1.jpeg',
    description: 'Embossed archival green & gold metallic finish',
  },
  {
    _id: 'cih_wooden_tray',
    name: 'Velvet-Lined Wooden Keepsake Tray',
    series: 'Series 04.6',
    guild: 'Joinery Guild',
    category: 'teak-wood',
    price: 1299,
    originalPrice: 1499,
    image: '/images/Product_images/CRAFTED IN-HOUSE/keepsake_small.png',
    description: 'Handcrafted seasoned wood with cushioned lining',
  },
  {
    _id: 'cih_resin_coasters',
    name: 'Marbled Gold Resin Coasters (Set of 2)',
    series: 'Series 04.7',
    guild: 'Resin Atelier',
    category: 'candles',
    price: 599,
    originalPrice: 799,
    image: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
    description: 'Hand-cast artisanal resin with mineral swirls',
  },
  {
    _id: 'cls_signature_hamper',
    name: 'The Classics Signature Treat Box',
    series: 'Series 03.1',
    guild: 'Heritage Guild',
    category: 'hampers',
    price: 1499,
    originalPrice: 1799,
    image: '/images/Category_image/Classics/classic.jpeg',
    description: 'FSC linen gift box with gold foil lettering',
    badge: 'Signature',
  },
];

export default function KeepsakeEcommerceSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const addItem = useCartStore((state) => state.addItem);

  const filteredProducts = ATELIER_PRODUCTS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const toggleWishlist = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowLiked = !wishlist[id];
    setWishlist((prev) => ({ ...prev, [id]: isNowLiked }));
    if (isNowLiked) {
      toast.success(`Saved ${name} to wishlist`, {
        style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #7A8B6F' },
      });
    }
  };

  const handleAddToCart = async (item: AtelierProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setAddedIds((prev) => ({ ...prev, [item._id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [item._id]: false }));
    }, 1200);

    await addItem({
      productId: item._id,
      giftBoxingType: item.category === 'all' ? 'classics' : item.category,
      quantity: 1,
      name: item.name,
      price: item.price * 100, // in paise
      image: item.image,
    });

    toast.success(`Added ${item.name} to bag!`, {
      style: { background: '#1A1A18', color: '#FAF8F5', border: '1px solid #7A8B6F' },
      icon: '🛍️',
    });
  };

  return (
    <section className="py-14 sm:py-18 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] text-[#1A1A18] border-y border-[#E0DDD6]">
      <div className="max-w-[1280px] mx-auto space-y-10 sm:space-y-12">
        
        {/* ─── SECTION HEADER ─── */}
        <ScrollReveal animation="fadeUp">
          <div className="text-center max-w-xl mx-auto px-4">
            <span className="type-meta text-[#7A8B6F] text-[9.5px] sm:text-[10.5px] tracking-[0.3em] uppercase font-bold block mb-2">
              Series 04 • In-House Atelier
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1A1A18] leading-[1.1] tracking-[-0.02em] font-light"
              style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
            >
              Objects Made by Hand,<br className="hidden sm:inline" /> Meant to Remain
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#78746D] font-light">
              Explore authentic handcrafted keepsake chests, botanical tins, frames &amp; decor.
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
                      {/* Subtle dark tint for unselected items */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isSelected ? 'bg-transparent' : 'bg-black/10 group-hover:bg-transparent'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Asymmetric Polygon Label */}
                  <span
                    className={`text-[9px] sm:text-[10.5px] font-bold uppercase tracking-wider mt-3 max-w-[105px] text-center leading-tight transition-colors ${
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

        {/* ─── PRODUCT CARDS GRID (2 cols Mobile, 3 cols Tablet, 4 cols Desktop) ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
          {filteredProducts.map((item) => {
            const isLiked = wishlist[item._id];
            const isAdded = addedIds[item._id];

            return (
              <div
                key={item._id}
                onClick={(e) => handleAddToCart(item, e)}
                className="group relative bg-white border border-[#DDD8CE] hover:border-[#7A8B6F] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)] flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden text-left"
              >
                {/* Full-Bleed Top Image Container */}
                <div className="w-full aspect-[4/5] sm:aspect-square relative bg-[#ECE8E1] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top-Left Badge */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
                    <span className="bg-[#1A1A18]/85 backdrop-blur-md px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-widest text-[#F6F4EF] font-bold">
                      {item.guild}
                    </span>
                    {item.badge && (
                      <span className="bg-[#7A8B6F] text-white px-2 py-0.5 text-[7.5px] sm:text-[8px] uppercase tracking-wider font-semibold self-start">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => toggleWishlist(item._id, item.name, e)}
                    aria-label="Add to wishlist"
                    className="absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 border border-[#DDD8CE]/60 flex items-center justify-center text-[#1A1A18] hover:bg-white active:scale-90 transition-all cursor-pointer"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                        isLiked ? 'fill-[#7A1C29] text-[#7A1C29]' : 'text-[#1A1A18]'
                      }`}
                    />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-3 sm:p-4.5 space-y-2 flex-1 flex flex-col justify-between bg-white">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#7A8B6F] font-bold block">
                      {item.series}
                    </span>
                    <h3
                      className="text-sm sm:text-base md:text-lg text-[#1A1A18] group-hover:text-[#7A8B6F] font-medium leading-snug line-clamp-1 transition-colors"
                      style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
                    >
                      {item.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#78746D] line-clamp-1 font-light">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Add to Bag Row */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-[#EAE6DD] mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-sans text-sm sm:text-base font-bold text-[#1A1A18]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[10px] sm:text-xs text-[#9E9A91] line-through font-light">
                          ₹{item.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      aria-label="Add to bag"
                      className={`h-7 px-2.5 sm:h-8 sm:px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all duration-200 active:scale-95 cursor-pointer ${
                        isAdded
                          ? 'bg-[#7A8B6F] text-white'
                          : 'bg-[#7A1C29] hover:bg-[#5C141F] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span className="hidden sm:inline">Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── BOTTOM VIEW ALL COLLECTIONS LINK ─── */}
        <div className="text-center pt-2">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[#1A1A18] hover:text-[#7A8B6F] transition-colors border-b border-[#1A1A18] pb-1 hover:border-[#7A8B6F]"
          >
            <span>Explore All Atelier Collections</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
