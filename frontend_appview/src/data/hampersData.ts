export interface InsideItem {
  item: string;
  weight: string;
}

export interface HamperData {
  _id: string;
  slug: string;
  name: string;
  category: 'sweets' | 'snacks' | 'tea-coffee' | 'dry-fruits';
  categoryLabel: string;
  inside_items: InsideItem[];
  packaging_style: string;
  description: string;
  price: number;
  image: string;
  highlights: string[];
  shelfLife: string;
  dietary: string;
}

export const HAMPERS_CATALOG: HamperData[] = [
  /* ── 1. ARTISANAL SWEETS & CONFECTIONS ── */
  {
    _id: 'hamper_royal_sweet_box',
    slug: 'the-royal-sweet-box',
    name: 'The Royal Sweet Box',
    category: 'sweets',
    categoryLabel: 'Artisanal Sweets & Confections',
    inside_items: [
      { item: 'Pistachio Kaju Katli', weight: '150g' },
      { item: 'Dark Chocolate Almond Bark', weight: '100g' },
      { item: 'Rose & Saffron Peda Bites', weight: '150g' },
      { item: 'Sea Salt Caramel Truffles', weight: '100g' },
    ],
    packaging_style: 'Burgundy Rigid Book-Style Box with Satin Interior',
    description: 'A regal assortment of contemporary mithai and handcrafted chocolate favourites, curated for grand celebrations.',
    price: 1499,
    image: '/images/hampers/hamper_royal_sweet_box.jpg',
    highlights: ['Pure Ghee Mithai', 'Single-Origin Chocolate', 'Artisanal Batch'],
    shelfLife: '30 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_mithai_atelier',
    slug: 'the-mithai-atelier',
    name: 'The Mithai Atelier',
    category: 'sweets',
    categoryLabel: 'Artisanal Sweets & Confections',
    inside_items: [
      { item: 'Besan Laddoo Bites', weight: '150g' },
      { item: 'Saffron Peda', weight: '150g' },
      { item: 'Hazelnut Chocolate Fudge', weight: '120g' },
      { item: 'Almond Praline Truffles', weight: '100g' },
    ],
    packaging_style: 'Lavender Linen-Finish Magnetic Box',
    description: 'Classic Indian indulgence reimagined with elegant textures and modern flavours in a tactile linen presentation.',
    price: 1290,
    image: '/images/hampers/hamper_mithai_atelier.jpg',
    highlights: ['Traditional Handcrafting', 'Rich Saffron & Nut Blend', 'Magnetic Keepsake Box'],
    shelfLife: '25 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_grand_confectionery_chest',
    slug: 'the-grand-confectionery-chest',
    name: 'The Grand Confectionery Chest',
    category: 'sweets',
    categoryLabel: 'Artisanal Sweets & Confections',
    inside_items: [
      { item: 'Premium Kaju Katli', weight: '200g' },
      { item: 'Pistachio & Cranberry Chocolate Bark', weight: '120g' },
      { item: 'Belgian Chocolate Truffles', weight: '120g' },
      { item: 'Salted Caramel Gourmet Fudge', weight: '150g' },
    ],
    packaging_style: 'Royal Velvet Chest with Gold-Foil Detailing',
    description: 'An opulent celebration of fine mithai, chocolate and confectionery craftsmanship housed in archival high-pile velvet.',
    price: 2499,
    image: '/images/hampers/hamper_grand_confectionery_chest.jpg',
    highlights: ['Archival Velvet Chest', '24k-Inspired Gold Detailing', 'Multi-Tier Epicurean Curation'],
    shelfLife: '30 Days from dispatch',
    dietary: '100% Vegetarian',
  },

  /* ── 2. SNACKS & SAVOURIES ── */
  {
    _id: 'hamper_snack_attack',
    slug: 'snack-attack-hamper',
    name: 'Snack Attack Hamper',
    category: 'snacks',
    categoryLabel: 'Snacks & Savouries',
    inside_items: [
      { item: 'Peri-Peri Gourmet Makhana', weight: '80g' },
      { item: 'Black Pepper Cashews', weight: '100g' },
      { item: 'Baked Gujarati Namkeen', weight: '150g' },
      { item: 'Sea Salt Millet Crisps', weight: '100g' },
    ],
    packaging_style: 'Premium Gilded Tinplate Box',
    description: 'A lively edit of crunchy, savoury favourites made for effortless snacking and high-tea gatherings.',
    price: 990,
    image: '/images/hampers/hamper_snack_attack.jpg',
    highlights: ['Airtight Gilded Tin', 'Slow-Roasted Crunchy Snacks', 'Zero Trans-Fat'],
    shelfLife: '90 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_savoury_society',
    slug: 'the-savoury-society',
    name: 'The Savoury Society',
    category: 'snacks',
    categoryLabel: 'Snacks & Savouries',
    inside_items: [
      { item: 'Ghee-Roasted Makhana', weight: '100g' },
      { item: 'Jaggery Chilli Almonds', weight: '100g' },
      { item: 'Baked Bhakarwadi', weight: '150g' },
      { item: 'Rosemary Seed Crisps', weight: '100g' },
    ],
    packaging_style: 'Midnight Blue Rigid Box with Custom Compartments',
    description: 'Refined Indian snacking with bold flavours, premium ingredients and irresistible crunch.',
    price: 1299,
    image: '/images/hampers/hamper_savoury_society.jpg',
    highlights: ['Cold-Pressed Spices', 'Baked & Healthy Crunch', 'Midnight Blue Keepsake'],
    shelfLife: '60 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_gourmet_crunch_trunk',
    slug: 'the-gourmet-crunch-trunk',
    name: 'The Gourmet Crunch Trunk',
    category: 'snacks',
    categoryLabel: 'Snacks & Savouries',
    inside_items: [
      { item: 'Truffle-Flavoured Makhana', weight: '100g' },
      { item: 'Smoked Paprika Cashews', weight: '120g' },
      { item: 'Premium Maharashtra Chivda', weight: '150g' },
      { item: 'Artisanal Multigrain Crisps', weight: '120g' },
    ],
    packaging_style: 'Teakwood-Finish Luxury Tray with Rigid Sleeve',
    description: 'A sophisticated savoury collection for those who appreciate elevated everyday indulgence and artisanal spices.',
    price: 1799,
    image: '/images/hampers/hamper_gourmet_crunch_trunk.jpg',
    highlights: ['Handcrafted Teak Finish', 'Smoked & Truffle Seasonings', 'Signature Velvet Sleeve'],
    shelfLife: '60 Days from dispatch',
    dietary: '100% Vegetarian',
  },

  /* ── 3. TEA & COFFEE SUITES ── */
  {
    _id: 'hamper_tea_room_collection',
    slug: 'the-tea-room-collection',
    name: 'The Tea Room Collection',
    category: 'tea-coffee',
    categoryLabel: 'Tea & Coffee Suites',
    inside_items: [
      { item: 'Single-Estate Assam Tea', weight: '100g' },
      { item: 'Kashmir Acacia Honey', weight: '100g' },
      { item: 'Almond Biscotti', weight: '120g' },
      { item: 'Sandalwood Soy Candle', weight: '100g' },
    ],
    packaging_style: 'Lavender Book-Style Box with Satin Interior',
    description: 'A quiet luxury ritual of fine tea, wild honey, delicate biscotti and warm calming candlelight.',
    price: 1499,
    image: '/images/hampers/hamper_tea_room_collection.jpg',
    highlights: ['Single-Estate Tea Leaves', 'Raw Wild Forest Honey', 'Pure Soy Wax Candle'],
    shelfLife: '120 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_coffee_connoisseur',
    slug: 'the-coffee-connoisseur',
    name: 'The Coffee Connoisseur',
    category: 'tea-coffee',
    categoryLabel: 'Tea & Coffee Suites',
    inside_items: [
      { item: 'Single-Origin Chikmagalur Coffee', weight: '200g' },
      { item: 'Dark Chocolate Coffee Bark', weight: '100g' },
      { item: 'Nilgiri Wild Honey', weight: '100g' },
      { item: 'Vanilla Bean Soy Candle', weight: '100g' },
    ],
    packaging_style: 'Midnight Blue Magnetic Rigid Box',
    description: 'A beautifully balanced coffee ritual crafted for slow mornings and meaningful pauses.',
    price: 1699,
    image: '/images/hampers/hamper_coffee_connoisseur.jpg',
    highlights: ['Artisan Medium Roast', 'Real Vanilla Infusion', 'Dark Roasted Coffee Beans'],
    shelfLife: '90 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_grand_brew_suite',
    slug: 'the-grand-brew-suite',
    name: 'The Grand Brew Suite',
    category: 'tea-coffee',
    categoryLabel: 'Tea & Coffee Suites',
    inside_items: [
      { item: 'Premium Irani Chai Blend', weight: '150g' },
      { item: 'Single-Origin Arabica Coffee', weight: '200g' },
      { item: 'Organic Forest Honey', weight: '150g' },
      { item: 'Luxury Amber Scented Candle', weight: '150g' },
    ],
    packaging_style: 'Royal Burgundy Two-Tier Gift Chest',
    description: 'An elevated tea-and-coffee experience created for discerning hosts, clients and connoisseurs.',
    price: 2499,
    image: '/images/hampers/hamper_grand_brew_suite.jpg',
    highlights: ['Two-Tier Presentation', 'Artisanal Brew Pairings', 'Amber Glass Jar Candle'],
    shelfLife: '120 Days from dispatch',
    dietary: '100% Vegetarian',
  },

  /* ── 4. DRY FRUITS & NUTS ── */
  {
    _id: 'hamper_nut_reserve',
    slug: 'the-nut-reserve',
    name: 'The Nut Reserve',
    category: 'dry-fruits',
    categoryLabel: 'Dry Fruits & Nuts',
    inside_items: [
      { item: 'Saffron Mamra Almonds', weight: '100g' },
      { item: 'Jumbo Salted Pistachios', weight: '100g' },
      { item: 'Black Pepper Cashews', weight: '100g' },
      { item: 'Medjool Dates', weight: '150g' },
    ],
    packaging_style: 'Gilded Tinplate Dry Fruit Box',
    description: 'A luxurious quartet of premium nuts and dates selected for freshness, size and flavour.',
    price: 1299,
    image: '/images/hampers/hamper_nut_reserve.jpg',
    highlights: ['Kashmiri Mamra Almonds', 'Giant Medjool Dates', 'Airtight Compartment Tin'],
    shelfLife: '180 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_royal_dry_fruit_chest',
    slug: 'the-royal-dry-fruit-chest',
    name: 'The Royal Dry Fruit Chest',
    category: 'dry-fruits',
    categoryLabel: 'Dry Fruits & Nuts',
    inside_items: [
      { item: 'Kashmiri Saffron Almonds', weight: '150g' },
      { item: 'Jumbo Iranian Pistachios', weight: '150g' },
      { item: 'Pistachio-Stuffed Medjool Dates', weight: '150g' },
      { item: 'Kashmir Wild Honey', weight: '100g' },
    ],
    packaging_style: 'Burgundy Velvet Chest with Individual Glass Jars',
    description: 'A grand presentation of prized dry fruits, stuffed dates and golden wild honey in reusable glass jars.',
    price: 2199,
    image: '/images/hampers/hamper_royal_dry_fruit_chest.jpg',
    highlights: ['Individual Glass Jars', 'Hand-Stuffed Dates', 'Burgundy Velvet Chest'],
    shelfLife: '180 Days from dispatch',
    dietary: '100% Vegetarian',
  },
  {
    _id: 'hamper_imperial_nut_treasury',
    slug: 'the-imperial-nut-treasury',
    name: 'The Imperial Nut Treasury',
    category: 'dry-fruits',
    categoryLabel: 'Dry Fruits & Nuts',
    inside_items: [
      { item: 'Mamra Almonds with Saffron', weight: '150g' },
      { item: 'W180 Roasted Cashews', weight: '150g' },
      { item: 'Jumbo Pistachios', weight: '150g' },
      { item: 'Almond-Stuffed Medjool Dates', weight: '200g' },
    ],
    packaging_style: 'Teakwood Tray with Brass-Finish Compartments',
    description: 'A statement dry-fruit collection designed for celebrations, executive gifting and special occasions.',
    price: 2799,
    image: '/images/hampers/hamper_imperial_nut_treasury.jpg',
    highlights: ['Solid Teak Construction', 'Brass-Finished Latch', 'W180 Royal Grade Cashews'],
    shelfLife: '180 Days from dispatch',
    dietary: '100% Vegetarian',
  },
];

export function getHamperBySlug(slug: string): HamperData | undefined {
  return HAMPERS_CATALOG.find((h) => h.slug === slug);
}
