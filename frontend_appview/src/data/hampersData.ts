export interface InsideItem {
  item: string;
  weight?: string;
  description?: string;
}

export interface CatalogueCategory {
  id: string;
  label: string;
  subtitle?: string;
  intro?: string;
  tagline?: string;
  image: string;
  clipPath: string;
  pastelActive: string;
  pastelHover: string;
}

export interface HamperData {
  _id: string;
  slug: string;
  name: string;
  subCopy: string;
  category: 'gourmet-food' | 'beverages' | 'decor-spiritual' | 'personalisation';
  categoryLabel: string;
  inside_items: InsideItem[];
  packaging_style: string;
  description: string;
  price: number;
  image: string;
  highlights: string[];
  shelfLife?: string;
  dietary?: string;
}

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    id: 'gourmet-food',
    label: 'Gourmet Food',
    subtitle: 'Regional flavours, thoughtfully curated.',
    intro: 'A focused edit of regional favourites selected for taste, story and gifting appeal.',
    tagline: 'Regional flavours, thoughtfully curated.',
    image: '/images/category_food.jpg',
    clipPath: 'polygon(44% 0%, 98% 28%, 78% 100%, 12% 92%, 0% 42%)',
    pastelActive: 'bg-[#F4A896]',
    pastelHover: 'group-hover:bg-[#FADCD5]',
  },
  {
    id: 'beverages',
    label: 'Beverages',
    subtitle: 'Curated for every moment.',
    tagline: 'Curated for every moment.',
    image: '/images/category_beverages.jpg',
    clipPath: 'polygon(18% 0%, 94% 14%, 100% 76%, 66% 100%, 6% 86%, 0% 30%)',
    pastelActive: 'bg-[#98C1A9]',
    pastelHover: 'group-hover:bg-[#D5E8DD]',
  },
  {
    id: 'decor-spiritual',
    label: 'Decor & Spiritual',
    subtitle: 'Thoughtful accents for inspired spaces.',
    tagline: 'Thoughtful accents for inspired spaces.',
    image: '/images/category_decor.jpg',
    clipPath: 'polygon(54% 0%, 96% 22%, 86% 84%, 46% 100%, 8% 88%, 0% 38%, 20% 10%)',
    pastelActive: 'bg-[#DFC299]',
    pastelHover: 'group-hover:bg-[#F3E7D5]',
  },
  {
    id: 'personalisation',
    label: 'Personalisation',
    image: '/images/category_personalisation.jpg',
    clipPath: 'polygon(32% 0%, 92% 16%, 100% 78%, 72% 100%, 14% 96%, 0% 36%)',
    pastelActive: 'bg-[#E8A59E]',
    pastelHover: 'group-hover:bg-[#F8DDD9]',
  },
];

export const HAMPERS_CATALOG: HamperData[] = [
  /* ═══════════════════════════════════════════════
     1. GOURMET FOOD
     ═══════════════════════════════════════════════ */
  {
    _id: 'gourmet_makhana',
    slug: 'makhana',
    name: 'Makhana',
    subCopy: 'Light, crunchy & wholesome fox nuts, perfectly roasted.',
    category: 'gourmet-food',
    categoryLabel: 'Gourmet Food',
    inside_items: [
      { item: 'Roasted Fox Nuts (Makhana)', weight: '100g' },
    ],
    packaging_style: 'Light, crunchy & wholesome fox nuts, perfectly roasted.',
    description: 'Light, crunchy & wholesome fox nuts, perfectly roasted.',
    price: 0,
    image: '/images/catalogue_items/makhana.jpg',
    highlights: ['Zero Trans-Fat', 'Superfood Protein Snack', 'Gluten-Free'],
    shelfLife: '90 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'gourmet_artisanal_chikki',
    slug: 'artisanal-chikki',
    name: 'Artisanal Chikki',
    subCopy: 'Handcrafted nut brittles with traditional jaggery sweetness.',
    category: 'gourmet-food',
    categoryLabel: 'Gourmet Food',
    inside_items: [
      { item: 'Handcrafted Nut Brittle', weight: '150g' },
    ],
    packaging_style: 'Handcrafted nut brittles with traditional jaggery sweetness.',
    description: 'Handcrafted nut brittles with traditional jaggery sweetness.',
    price: 0,
    image: '/images/catalogue_items/artisanal_chikki.jpg',
    highlights: ['Traditional Jaggery Sweetness', 'No Refined Sugar', 'Crisp Texture'],
    shelfLife: '60 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'gourmet_exotic_dry_fruits',
    slug: 'exotic-dry-fruits',
    name: 'Exotic Dry Fruits',
    subCopy: 'A premium selection of nature’s finest, rich in nutrition.',
    category: 'gourmet-food',
    categoryLabel: 'Gourmet Food',
    inside_items: [
      { item: 'Selected Premium Dry Fruits', weight: '200g' },
    ],
    packaging_style: 'A premium selection of nature’s finest, rich in nutrition.',
    description: 'A premium selection of nature’s finest, rich in nutrition.',
    price: 0,
    image: '/images/catalogue_items/exotic_dry_fruits.jpg',
    highlights: ['Export Grade Quality', 'Hand-Sorted Premium Nuts', 'Airtight Freshness'],
    shelfLife: '180 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'gourmet_gujarat_namkeen',
    slug: 'gujarats-namkeen',
    name: 'Gujarat’s Namkeen',
    subCopy: 'Authentic Gujarati snacks, savoury and irresistible.',
    category: 'gourmet-food',
    categoryLabel: 'Gourmet Food',
    inside_items: [
      { item: 'Authentic Gujarati Savoury Namkeen', weight: '150g' },
    ],
    packaging_style: 'Authentic Gujarati snacks, savoury and irresistible.',
    description: 'Authentic Gujarati snacks, savoury and irresistible.',
    price: 0,
    image: '/images/catalogue_items/gujarat_namkeen.jpg',
    highlights: ['Authentic Regional Spices', 'Crunchy & Savoury', 'Perfect Chai Companion'],
    shelfLife: '90 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'gourmet_indian_sweets',
    slug: 'indian-gourmet-sweets',
    name: 'Indian Gourmet Sweets',
    subCopy: 'Traditional favourites made with pure ingredients.',
    category: 'gourmet-food',
    categoryLabel: 'Gourmet Food',
    inside_items: [
      { item: 'Artisanal Indian Gourmet Sweets', weight: '150g' },
    ],
    packaging_style: 'Traditional favourites made with pure ingredients.',
    description: 'Traditional favourites made with pure ingredients.',
    price: 0,
    image: '/images/catalogue_items/indian_gourmet_sweets.jpg',
    highlights: ['100% Desi Ghee', 'No Preservatives', 'Fresh Handcrafted Batch'],
    shelfLife: '25 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'gourmet_roasted_nuts_seeds',
    slug: 'roasted-nuts-seeds',
    name: 'Roasted Nuts & Seeds',
    subCopy: 'Perfectly roasted for a wholesome and satisfying crunch.',
    category: 'gourmet-food',
    categoryLabel: 'Gourmet Food',
    inside_items: [
      { item: 'Roasted Nuts & Seeds Blend', weight: '120g' },
    ],
    packaging_style: 'Perfectly roasted for a wholesome and satisfying crunch.',
    description: 'Perfectly roasted for a wholesome and satisfying crunch.',
    price: 0,
    image: '/images/catalogue_items/roasted_nuts_seeds.jpg',
    highlights: ['High Protein & Fiber', 'Low Sodium Roasted', 'Wholesome Crunch'],
    shelfLife: '120 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'gourmet_bihar_thekua',
    slug: 'bihars-thekua',
    name: 'Bihar’s Thekua',
    subCopy: 'Classic Bihari thekua, crisp outside, soft inside, timeless taste.',
    category: 'gourmet-food',
    categoryLabel: 'Gourmet Food',
    inside_items: [
      { item: 'Handcrafted Bihari Thekua', weight: '200g' },
    ],
    packaging_style: 'Classic Bihari thekua, crisp outside, soft inside, timeless taste.',
    description: 'Classic Bihari thekua, crisp outside, soft inside, timeless taste.',
    price: 0,
    image: '/images/catalogue_items/bihar_thekua.jpg',
    highlights: ['Generational Heritage Recipe', 'Stone-Ground Whole Wheat', 'Pure Desi Ghee'],
    shelfLife: '45 Days',
    dietary: '100% Vegetarian',
  },

  /* ═══════════════════════════════════════════════
     2. BEVERAGES
     ═══════════════════════════════════════════════ */
  {
    _id: 'beverage_sleepy_owl_coffee',
    slug: 'sleepy-owl-coffee',
    name: 'Sleepy Owl Coffee',
    subCopy: 'Smooth, balanced & perfectly aromatic.',
    category: 'beverages',
    categoryLabel: 'Beverages',
    inside_items: [
      { item: 'Sleepy Owl Coffee Canister', weight: '150g' },
    ],
    packaging_style: 'Smooth, balanced & perfectly aromatic.',
    description: 'Smooth, balanced & perfectly aromatic.',
    price: 0,
    image: '/images/beverages/sleepy_owl.jpg',
    highlights: ['100% Arabica', 'Microground Aromas', 'Instant Dissolve'],
    shelfLife: '365 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'beverage_niloufer_irani_chai',
    slug: 'cafe-niloufer-irani-chai-premix',
    name: 'Café Niloufer Irani Chai Premix',
    subCopy: 'Classic Hyderabadi chai, instantly yours.',
    category: 'beverages',
    categoryLabel: 'Beverages',
    inside_items: [
      { item: 'Café Niloufer Irani Chai Premix', weight: '200g' },
    ],
    packaging_style: 'Classic Hyderabadi chai, instantly yours.',
    description: 'Classic Hyderabadi chai, instantly yours.',
    price: 0,
    image: '/images/beverages/irani_chai.jpg',
    highlights: ['Historic 1920 Recipe', 'Just Add Hot Water', 'Creamy Kadak Flavour'],
    shelfLife: '180 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'beverage_halmari_assam_tea',
    slug: 'halmari-assam-tea',
    name: 'Halmari Assam Tea',
    subCopy: 'Rich, malty & full-bodied Assam goodness.',
    category: 'beverages',
    categoryLabel: 'Beverages',
    inside_items: [
      { item: 'Halmari Single-Estate Assam Tea', weight: '150g' },
    ],
    packaging_style: 'Rich, malty & full-bodied Assam goodness.',
    description: 'Rich, malty & full-bodied Assam goodness.',
    price: 0,
    image: '/images/beverages/assam_tea.jpg',
    highlights: ['Single-Estate Provenance', 'Golden Tips First Flush', 'Award-Winning Flavour'],
    shelfLife: '730 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'beverage_coorg_coffee',
    slug: 'coorg-chikmagalur-coffee',
    name: 'Coorg / Chikmagalur Coffee',
    subCopy: 'Bold, earthy & exceptionally satisfying.',
    category: 'beverages',
    categoryLabel: 'Beverages',
    inside_items: [
      { item: 'Coorg / Chikmagalur Ground Coffee', weight: '200g' },
    ],
    packaging_style: 'Bold, earthy & exceptionally satisfying.',
    description: 'Bold, earthy & exceptionally satisfying.',
    price: 0,
    image: '/images/beverages/coffee.jpg',
    highlights: ['Single-Estate Harvest', 'Bold Earthy Notes', 'Freshly Roasted Beans'],
    shelfLife: '180 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'beverage_masala_chai_premix',
    slug: 'masala-chai-premix',
    name: 'Masala Chai Premix',
    subCopy: 'Spiced just right for the perfect cup.',
    category: 'beverages',
    categoryLabel: 'Beverages',
    inside_items: [
      { item: 'Spiced Masala Chai Premix', weight: '150g' },
    ],
    packaging_style: 'Spiced just right for the perfect cup.',
    description: 'Spiced just right for the perfect cup.',
    price: 0,
    image: '/images/beverages/masala_chai.jpg',
    highlights: ['Crushed Whole Spices', 'Zero Artificial Essence', 'Invigorating Aroma'],
    shelfLife: '180 Days',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'beverage_dry_fruit_shake_mix',
    slug: 'dry-fruit-shake-mix',
    name: 'Dry Fruit Shake Mix',
    subCopy: 'Creamy, wholesome & naturally delicious.',
    category: 'beverages',
    categoryLabel: 'Beverages',
    inside_items: [
      { item: 'Dry Fruit Shake Premix Powder', weight: '200g' },
    ],
    packaging_style: 'Creamy, wholesome & naturally delicious.',
    description: 'Creamy, wholesome & naturally delicious.',
    price: 0,
    image: '/images/beverages/dry_fruit_premix.jpg',
    highlights: ['Real Nut Flakes', 'Kashmiri Saffron Infusion', 'Wholesome Nutrition'],
    shelfLife: '180 Days',
    dietary: '100% Vegetarian',
  },

  /* ═══════════════════════════════════════════════
     3. DECOR & SPIRITUAL
     ═══════════════════════════════════════════════ */
  {
    _id: 'decor_brass_diyas',
    slug: 'brass-diyas',
    name: 'Brass Diyas',
    subCopy: 'Timeless radiance for sacred spaces.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Handcrafted Brass Diya', weight: 'Set' },
    ],
    packaging_style: 'Timeless radiance for sacred spaces.',
    description: 'Timeless radiance for sacred spaces.',
    price: 0,
    image: '/images/decor/brass_diya.jpg',
    highlights: ['Pure Solid Brass', 'Heirloom Polish', 'Tarnish-Resistant Finish'],
    dietary: 'Sacred Decor',
  },
  {
    _id: 'decor_phool_incense',
    slug: 'phool-incense',
    name: 'Phool Incense',
    subCopy: 'Handcrafted aromas rooted in tradition.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Phool Organic Temple Flower Incense', weight: 'Pack' },
    ],
    packaging_style: 'Handcrafted aromas rooted in tradition.',
    description: 'Handcrafted aromas rooted in tradition.',
    price: 0,
    image: '/images/decor/phool_incense.jpg',
    highlights: ['100% Charcoal-Free', 'Eco-Conscious Temple Flowers', 'Calming Fragrance'],
    dietary: 'Eco-Friendly',
  },
  {
    _id: 'decor_scented_soy_candles',
    slug: 'scented-soy-candles',
    name: 'Scented Soy Candles',
    subCopy: 'Pure, calming & crafted for every mood.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Hand-Poured Scented Soy Candle', weight: '160g' },
    ],
    packaging_style: 'Pure, calming & crafted for every mood.',
    description: 'Pure, calming & crafted for every mood.',
    price: 0,
    image: '/images/decor/candles.jpg',
    highlights: ['35+ Hours Burn Time', 'Clean Toxin-Free Soy Wax', 'Therapeutic Scent'],
    dietary: 'Clean Living',
  },
  {
    _id: 'decor_coasters',
    slug: 'coasters',
    name: 'Coasters',
    subCopy: 'Elegant accents for every surface.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Laser-Etched Accent Coasters', weight: 'Set of 4' },
    ],
    packaging_style: 'Elegant accents for every surface.',
    description: 'Elegant accents for every surface.',
    price: 0,
    image: '/images/decor/coasters.jpg',
    highlights: ['Etched Mandala Design', 'Heat Resistant', 'Surface Protective'],
    dietary: 'Home Decor',
  },
  {
    _id: 'decor_mini_planters',
    slug: 'mini-planters',
    name: 'Mini Planters',
    subCopy: 'Green touches for beautiful corners.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Textured Ceramic Mini Planter', weight: '1 Piece' },
    ],
    packaging_style: 'Green touches for beautiful corners.',
    description: 'Green touches for beautiful corners.',
    price: 0,
    image: '/images/decor/mini_planters.jpg',
    highlights: ['Textured Artisan Ceramic', 'Low Maintenance Plant', 'Air Purifying Desk Decor'],
    dietary: 'Botanical Living',
  },
  {
    _id: 'decor_brass_tree',
    slug: 'brass-tree',
    name: 'Brass Tree',
    subCopy: 'Symbol of prosperity and abundance.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Solid Cast Brass Kalpavriksha Tree', weight: '1 Piece' },
    ],
    packaging_style: 'Symbol of prosperity and abundance.',
    description: 'Symbol of prosperity and abundance.',
    price: 0,
    image: '/images/decor/brass_tree.jpg',
    highlights: ['Kalpavriksha Wish-Fulfilling Motif', 'Solid Cast Metal', 'Auspicious Milestone Gift'],
    dietary: 'Sacred Art',
  },
  {
    _id: 'decor_crystal_tree',
    slug: 'crystal-tree',
    name: 'Crystal Tree',
    subCopy: 'Energy, balance & positive vibes.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Natural Gemstone Crystal Tree', weight: '1 Piece' },
    ],
    packaging_style: 'Energy, balance & positive vibes.',
    description: 'Energy, balance & positive vibes.',
    price: 0,
    image: '/images/decor/crystal_tree.jpg',
    highlights: ['Natural Healing Crystals', 'Flexible Golden Branches', 'Positive Energy Accent'],
    dietary: 'Spiritual Wellness',
  },
  {
    _id: 'decor_artisanal_soaps',
    slug: 'artisanal-soaps',
    name: 'Artisanal Soaps',
    subCopy: 'Handmade with care, naturally indulgent.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Cold-Pressed Botanical Soap Bar', weight: '125g' },
    ],
    packaging_style: 'Handmade with care, naturally indulgent.',
    description: 'Handmade with care, naturally indulgent.',
    price: 0,
    image: '/images/decor/soaps.jpg',
    highlights: ['Cold-Pressed Plant Oils', 'Sulphate & Paraben Free', 'Gentle Exfoliation'],
    dietary: 'Natural Self-Care',
  },
  {
    _id: 'decor_brass_bottle',
    slug: 'brass-bottle',
    name: 'Brass Bottle',
    subCopy: 'Pure, elegant & built to last.',
    category: 'decor-spiritual',
    categoryLabel: 'Decor & Spiritual',
    inside_items: [
      { item: 'Pure Hammered Brass Bottle', weight: '750ml' },
    ],
    packaging_style: 'Pure, elegant & built to last.',
    description: 'Pure, elegant & built to last.',
    price: 0,
    image: '/images/decor/brass_bottle.jpg',
    highlights: ['100% Solid Brass', 'Hand-Hammered Dimple Finish', 'Ayurvedic Health Properties'],
    dietary: 'Heirloom Grade',
  },

  /* ═══════════════════════════════════════════════
     4. PERSONALISATION
     ═══════════════════════════════════════════════ */
  {
    _id: 'personalisation_visiting_card_qr',
    slug: 'company-visiting-card-qr',
    name: 'Company Visiting Card QR',
    subCopy: 'Share your details instantly with a smart QR solution.',
    category: 'personalisation',
    categoryLabel: 'Personalisation',
    inside_items: [
      { item: 'Smart Visiting Card with Dynamic QR', weight: 'Custom' },
    ],
    packaging_style: 'Share your details instantly with a smart QR solution.',
    description: 'Share your details instantly with a smart QR solution.',
    price: 0,
    image: '/images/personalisation/personal_QR_card.jpg',
    highlights: ['Instant One-Tap Contact Save', 'Dynamic Cloud Link Updates', 'Gold Hot-Foil Stamping'],
    dietary: 'Smart Digital Solution',
  },
  {
    _id: 'personalisation_leadership_greeting_qr',
    slug: 'festive-greeting-qr-from-leadership',
    name: 'Festive Greeting QR from Leadership',
    subCopy: 'Send warm festive wishes directly from leadership.',
    category: 'personalisation',
    categoryLabel: 'Personalisation',
    inside_items: [
      { item: 'Festive Greeting Card with Leadership Video QR', weight: 'Custom' },
    ],
    packaging_style: 'Send warm festive wishes directly from leadership.',
    description: 'Send warm festive wishes directly from leadership.',
    price: 0,
    image: '/images/personalisation/festive.jpg',
    highlights: ['Personalised Video Streaming', 'Handmade Deckle-Edge Paper', 'Gold Wax-Sealed Presentation'],
    dietary: 'Interactive Video Greeting',
  },
];

export function getHamperBySlug(slug: string): HamperData | undefined {
  return HAMPERS_CATALOG.find((h) => h.slug === slug);
}
