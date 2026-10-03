export interface HamperContentItem {
  name: string;
  weight?: string;
  description?: string;
}

export type HamperTier =
  | 'gift-for-1'
  | 'gift-for-2'
  | 'gift-for-3'
  | 'gift-for-4'
  | 'team-enterprise';

export type HamperOccasion =
  | 'festive'
  | 'corporate'
  | 'weddings'
  | 'wellness'
  | 'milestones';

export type VesselType =
  | 'Royal Tin'
  | 'Velvet Chest'
  | 'Magnetic Keepsake Box'
  | 'Two-Tier Trunk'
  | 'Artisanal Wooden Box';

export interface EcomHamper {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number; // in Rupees (e.g. 3499)
  originalPrice?: number; // for strike-through discount effect
  image: string;
  gallery: string[];
  tier: HamperTier;
  tierLabel: string;
  tierDescription: string;
  occasion: HamperOccasion;
  occasionLabel: string;
  vesselType: VesselType;
  vesselColor: string;
  contents: HamperContentItem[];
  highlights: string[];
  dimensions?: string;
  readyToShip: boolean;
  isCustomizable: boolean;
  bestseller?: boolean;
  featured?: boolean;
}

export const HAMPER_TIERS = [
  { id: 'all', label: 'All Scales' },
  { id: 'gift-for-1', label: 'Gift for 1', subtitle: 'Solo Executive Keepsake', count: 3 },
  { id: 'gift-for-2', label: 'Gift for 2', subtitle: 'Duo & Couple Suite', count: 3 },
  { id: 'gift-for-3', label: 'Gift for 3', subtitle: 'Trio Indulgence Box', count: 3 },
  { id: 'gift-for-4', label: 'Gift for 4', subtitle: 'Grand Festive Family Trunk', count: 3 },
  { id: 'team-enterprise', label: 'Team & Enterprise', subtitle: 'Multi-piece Corporate Suite', count: 2 },
] as const;

export const HAMPER_OCCASIONS = [
  { id: 'all', label: 'All Events & Festivals', shortLabel: 'All Events' },
  { id: 'festive', label: 'Festive & Diwali', shortLabel: 'Festive & Diwali', badge: 'Popular' },
  { id: 'corporate', label: 'Corporate & Executive', shortLabel: 'Corporate', badge: 'B2B Ready' },
  { id: 'weddings', label: 'Weddings & Celebrations', shortLabel: 'Weddings', badge: 'Luxe' },
  { id: 'milestones', label: 'Milestones & Recognition', shortLabel: 'Milestones', badge: 'VIP' },
  { id: 'wellness', label: 'Wellness & Lifestyle', shortLabel: 'Wellness', badge: 'Calm' },
] as const;

export const HAMPER_VESSELS: VesselType[] = [
  'Royal Tin',
  'Velvet Chest',
  'Magnetic Keepsake Box',
  'Two-Tier Trunk',
  'Artisanal Wooden Box',
];

export const PRICE_RANGES = [
  { id: 'all', label: 'All Budgets', min: 0, max: Infinity },
  { id: 'under-2000', label: 'Under ₹2,000', min: 0, max: 2000 },
  { id: '2000-4000', label: '₹2,000 – ₹4,000', min: 2000, max: 4000 },
  { id: '4000-7000', label: '₹4,000 – ₹7,000', min: 4000, max: 7000 },
  { id: 'above-7000', label: '₹7,000+', min: 7000, max: Infinity },
] as const;

export const ECOM_HAMPERS: EcomHamper[] = [
  /* ═══════════════════════════════════════════════════════
     1. GIFT FOR 4 / FAMILY & GRAND CELEBRATIONS
     ═══════════════════════════════════════════════════════ */
  {
    id: 'hamper-grand-confectionery-chest',
    slug: 'grand-confectionery-chest',
    name: 'The Grand Confectionery Chest',
    subtitle: 'Heirloom Celebratory Suite with Hand-Poured Sweets & Nuts',
    description: 'An expansive family-scale keepsake chest designed for sharing among 4 or more. Features royal botanical confectionery, roasted dry fruits, and gold filigree accents.',
    price: 6499,
    originalPrice: 7499,
    image: '/images/luxury_hampers/hamper_grand_confectionery_chest.jpg',
    gallery: [
      '/images/luxury_hampers/hamper_grand_confectionery_chest.jpg',
      '/images/luxury_hampers/hamper_grand_confectionery_chest_alt.jpg',
    ],
    tier: 'gift-for-4',
    tierLabel: 'Gift for 4',
    tierDescription: 'Grand Family & Multi-Person Suite',
    occasion: 'festive',
    occasionLabel: 'Festive & Diwali',
    vesselType: 'Two-Tier Trunk',
    vesselColor: 'Midnight Gold & Deep Forest Emerald',
    contents: [
      { name: 'Kashmiri Saffron Almond Brittles', weight: '200g', description: 'Caramelized almond crumbles with pure saffron strands' },
      { name: 'Mithai Atelier Pistachio Baklava Cones', weight: '220g', description: 'Layered handcrafted pastry drenched in raw floral honey' },
      { name: 'Roasted Salted Jumbo Cashews', weight: '180g', description: 'Single-estate Goan cashews roasted in pink rock salt' },
      { name: 'Smoked California Almonds', weight: '180g', description: 'Wood-smoked crunchy whole almonds' },
      { name: 'Hand-Cast Brass Diya Set of 2', weight: '1 Pair', description: 'Solid bell-metal brass lamps with embossed detailing' },
      { name: 'Organic Royal Tisane Infusion Jar', weight: '100g', description: 'Sun-dried chamomile, rose petals, and Darjeeling leaves' },
    ],
    highlights: ['Two-Tier Sliding Compartments', 'Crushed Silk Bedding', 'Feeds 4-6 Persons', 'Wax-Sealed Card Included'],
    dimensions: '340mm × 260mm × 180mm',
    readyToShip: true,
    isCustomizable: true,
    bestseller: true,
    featured: true,
  },
  {
    id: 'hamper-royal-dry-fruit-chest',
    slug: 'royal-dry-fruit-chest',
    name: 'The Royal Dry Fruit & Saffron Chest',
    subtitle: 'Imperial Octagonal Keepsake for Festive Entertaining',
    description: 'A lavish quad-assortment curated for four recipients or an extended household. Includes premium royal nuts, Medjool dates, and single-origin saffron.',
    price: 5899,
    originalPrice: 6500,
    image: '/images/luxury_hampers/hamper_royal_dry_fruit_chest.jpg',
    gallery: [
      '/images/luxury_hampers/hamper_royal_dry_fruit_chest.jpg',
      '/images/luxury_hampers/hamper_royal_dry_fruit_chest_alt.png',
    ],
    tier: 'gift-for-4',
    tierLabel: 'Gift for 4',
    tierDescription: 'Generous Household & Festive Sharing',
    occasion: 'festive',
    occasionLabel: 'Festive & Diwali',
    vesselType: 'Royal Tin',
    vesselColor: 'Imperial Emerald & 24k Gold Filigree',
    contents: [
      { name: 'Stuffed Jordan Almond Medjool Dates', weight: '250g', description: 'Soft dates stuffed with roasted almond and orange zest' },
      { name: 'Persian Saffron Roasted Pistachios', weight: '200g', description: 'Slow-roasted kernels glazed in Kashmiri saffron' },
      { name: 'Caramelized Pecan & Fig Clusters', weight: '180g', description: 'Crunchy nut clusters infused with organic fig paste' },
      { name: 'Gilded Brass Serving Spoon', weight: '1 Piece', description: 'Cast brass with antique botanical crest' },
      { name: 'Pure Brass Incense Burner', weight: '1 Unit', description: 'Solid metalcraft keepsake burner' },
    ],
    highlights: ['Airtight Friction Tin Keepsake', 'Food-Safe Gold Coating', 'Ideal for 4+ Guests'],
    dimensions: '290mm × 290mm × 140mm',
    readyToShip: true,
    isCustomizable: true,
    bestseller: true,
  },
  {
    id: 'hamper-gourmet-crunch-trunk',
    slug: 'gourmet-crunch-trunk',
    name: 'The Grand Savoury & Crunch Trunk',
    subtitle: 'Regional Epicurean Bites & Artisanal Crunch Suite',
    description: 'Four curated artisanal snack canisters paired with brass coasters and gourmet crisps for team or family gatherings.',
    price: 4999,
    originalPrice: 5600,
    image: '/images/luxury_hampers/hamper_gourmet_crunch_trunk.png',
    gallery: [
      '/images/luxury_hampers/hamper_gourmet_crunch_trunk.png',
      '/images/luxury_hampers/hamper_gourmet_crunch_trunk_alt.png',
    ],
    tier: 'gift-for-4',
    tierLabel: 'Gift for 4',
    tierDescription: 'Party & Group Nibbles for 4',
    occasion: 'corporate',
    occasionLabel: 'Corporate & Executive',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Maroon Bloom with Gold Edge Stamping',
    contents: [
      { name: 'Truffle Herb Makhana Canister', weight: '120g', description: 'Slow-roasted foxnuts with French black truffle essence' },
      { name: 'Gujarat Methi Crunch Crisps', weight: '180g', description: 'Heritage spiced savory wafers' },
      { name: 'Peri-Peri Spiced Cashews', weight: '160g', description: 'Fiery roasted whole cashews' },
      { name: 'Smoked Paprika Seed Blend', weight: '150g', description: 'Pumpkin, sunflower, and flax seed crunch' },
    ],
    highlights: ['Rigid Gift Presentation', 'Zero-Sog Sealed Tins', 'Group Gathering Favorite'],
    dimensions: '320mm × 240mm × 120mm',
    readyToShip: true,
    isCustomizable: true,
  },

  /* ═══════════════════════════════════════════════════════
     2. GIFT FOR 3 / TRIO INDULGENCE SUITES
     ═══════════════════════════════════════════════════════ */
  {
    id: 'hamper-imperial-nut-treasury',
    slug: 'imperial-nut-treasury',
    name: 'The Imperial Nut Treasury',
    subtitle: 'Trio Compartment Heirloom Tin with 3 Royal Reserves',
    description: 'Engineered specifically as a Gift for 3 recipients or a triple delight experience. Three segmented gourmet compartments with individual velvet-pull lids.',
    price: 3899,
    originalPrice: 4499,
    image: '/images/luxury_hampers/hamper_imperial_nut_treasury.png',
    gallery: [
      '/images/luxury_hampers/hamper_imperial_nut_treasury.png',
      '/images/luxury_hampers/hamper_imperial_nut_treasury_alt.png',
    ],
    tier: 'gift-for-3',
    tierLabel: 'Gift for 3',
    tierDescription: 'Triple-Curated Delight & Shared Moments',
    occasion: 'festive',
    occasionLabel: 'Festive & Diwali',
    vesselType: 'Royal Tin',
    vesselColor: 'Regal Navy & Gold Filigree',
    contents: [
      { name: 'Reserve 01: Saffron Roasted Almonds', weight: '160g', description: 'Kashmiri saffron slow roasted nuts' },
      { name: 'Reserve 02: Smoked Black Salt Cashews', weight: '160g', description: 'Crisp cashews with mountain salt' },
      { name: 'Reserve 03: Turkish Pistachio Kernels', weight: '160g', description: 'Unsalted buttery green pistachios' },
      { name: 'Solid Brass Tasting Spoon', weight: '1 Unit', description: 'Handcrafted accessory' },
    ],
    highlights: ['Triple Compartment Core', 'Reusable Heritage Tin', 'Signature Luxury Box Ribbon'],
    dimensions: '260mm × 260mm × 110mm',
    readyToShip: true,
    isCustomizable: true,
    bestseller: true,
    featured: true,
  },
  {
    id: 'hamper-grand-brew-suite',
    slug: 'grand-brew-suite',
    name: 'The Grand Brew & Confection Suite',
    subtitle: 'Three Artisanal Brew Canisters with Handcrafted Biscotti',
    description: 'Perfect for three partners, colleagues, or tea-coffee aficionados. Three distinct regional brews accompanied by almond biscotti.',
    price: 3699,
    originalPrice: 4200,
    image: '/images/luxury_hampers/hamper_grand_brew_suite.png',
    gallery: [
      '/images/luxury_hampers/hamper_grand_brew_suite.png',
      '/images/luxury_hampers/hamper_grand_brew_suite_alt.jpg',
    ],
    tier: 'gift-for-3',
    tierLabel: 'Gift for 3',
    tierDescription: 'Trio Coffee & Tea Tasting Experience',
    occasion: 'corporate',
    occasionLabel: 'Corporate & Executive',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Pastel Lilac Suede & Brushed Brass',
    contents: [
      { name: 'Coorg Dark Roast Coffee Bean Vial', weight: '120g', description: 'Arabica beans from shade-grown estates' },
      { name: 'Silver Needle White Tea Tin', weight: '80g', description: 'First-flush hand-picked delicate buds' },
      { name: 'Spiced Kashmiri Kahwa Canister', weight: '100g', description: 'Green tea with whole saffron, cinnamon, and cardamom' },
      { name: 'Double-Baked Almond Biscotti Pack', weight: '150g', description: 'Crunchy Italian style biscuits for dipping' },
    ],
    highlights: ['Magnetic Book-Style Lid', 'Suede Interior Lining', 'Triple Brew Selection'],
    dimensions: '300mm × 220mm × 100mm',
    readyToShip: true,
    isCustomizable: true,
  },
  {
    id: 'hamper-mithai-atelier',
    slug: 'mithai-atelier',
    name: 'The Mithai Atelier Trilogy',
    subtitle: 'Three Artisanal Gourmet Sweet Compositions',
    description: 'Modern confectionery meeting royal culinary craft. Three bespoke varieties packaged in individual sealed golden keepsake compartments.',
    price: 3299,
    originalPrice: 3800,
    image: '/images/luxury_hampers/hamper_mithai_atelier.png',
    gallery: [
      '/images/luxury_hampers/hamper_mithai_atelier.png',
      '/images/luxury_hampers/hamper_mithai_atelier_alt.png',
    ],
    tier: 'gift-for-3',
    tierLabel: 'Gift for 3',
    tierDescription: 'Three-Part Sweet Celebration',
    occasion: 'weddings',
    occasionLabel: 'Weddings & Celebrations',
    vesselType: 'Velvet Chest',
    vesselColor: 'Royal Crimson Velvet with Gold Latch',
    contents: [
      { name: 'Artisan 01: Saffron Mango Peda Bar', weight: '150g', description: 'Hand-shaped sweet milk curd with Alphonso essence' },
      { name: 'Artisan 02: Dark Chocolate Dry Fruit Bites', weight: '150g', description: 'Calicutt dates, figs, and Belgian cocoa' },
      { name: 'Artisan 03: Hazelnut Nut Fudge Bites', weight: '150g', description: 'Crushed hazelnuts folded into golden caramel' },
    ],
    highlights: ['Hand-Upholstered Velvet', 'Brass Hardware Fastener', 'Preserved Freshness'],
    dimensions: '280mm × 200mm × 90mm',
    readyToShip: true,
    isCustomizable: false,
  },

  /* ═══════════════════════════════════════════════════════
     3. GIFT FOR 2 / DUO & COUPLE SUITES
     ═══════════════════════════════════════════════════════ */
  {
    id: 'hamper-royal-sweet-box',
    slug: 'royal-sweet-box',
    name: 'The Royal Sovereign Duo Box',
    subtitle: 'Twin Gold Keepsakes with Gourmet Confectionery',
    description: 'Designed as a bespoke gift for two. Includes twin handcrafted brass containers filled with decadent confections, paired with soy scented candles.',
    price: 2899,
    originalPrice: 3400,
    image: '/images/luxury_hampers/hamper_royal_sweet_box.jpg',
    gallery: [
      '/images/luxury_hampers/hamper_royal_sweet_box.jpg',
      '/images/luxury_hampers/hamper_royal_sweet_box_alt.png',
    ],
    tier: 'gift-for-2',
    tierLabel: 'Gift for 2',
    tierDescription: 'Couple, Partner or Duo Delight',
    occasion: 'weddings',
    occasionLabel: 'Weddings & Celebrations',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Maroon Bloom Silk',
    contents: [
      { name: 'Twin Jar A: Caramelized Almond Rocks', weight: '150g', description: 'Belgian chocolate coated nuts' },
      { name: 'Twin Jar B: Rose Pistachio Nougat', weight: '150g', description: 'Chewy Mediterranean style nougat' },
      { name: 'Amber Glow Soy Wax Candle', weight: '120g', description: 'Notes of oudh and cedarwood' },
    ],
    highlights: ['Two Person Sharing', 'Textured Silk Cover', 'Includes Custom Name Card'],
    dimensions: '250mm × 200mm × 85mm',
    readyToShip: true,
    isCustomizable: true,
    bestseller: true,
  },
  {
    id: 'hamper-coffee-connoisseur',
    slug: 'coffee-connoisseur',
    name: 'The Coffee Connoisseur Duo',
    subtitle: 'Single-Estate Coffee with Twin Ceramic Tumblers',
    description: 'A morning ritual crafted for two. Two handmade speckle ceramic mugs accompanied by estate ground coffee and dark chocolate bark.',
    price: 2799,
    originalPrice: 3200,
    image: '/images/luxury_hampers/hamper_coffee_connoisseur.jpg',
    gallery: [
      '/images/luxury_hampers/hamper_coffee_connoisseur.jpg',
      '/images/luxury_hampers/hamper_coffee_connoisseur_alt.png',
    ],
    tier: 'gift-for-2',
    tierLabel: 'Gift for 2',
    tierDescription: 'Twin Morning Ritual for 2',
    occasion: 'wellness',
    occasionLabel: 'Wellness & Lifestyle',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Midnight Navy Blue',
    contents: [
      { name: 'Single-Estate Arabica Ground Coffee', weight: '200g', description: 'Medium roast with chocolate & berry notes' },
      { name: 'Studio Ceramic Coffee Tumbler (x2)', weight: 'Set of 2', description: 'Hand-thrown stoneware with matte glaze' },
      { name: 'Sea Salt Dark Chocolate Slab', weight: '90g', description: '70% single-origin Kerala cacao' },
    ],
    highlights: ['Twin Stoneware Mugs', 'Aroma Lock Packaging', 'Eco-friendly Shredded Fill'],
    dimensions: '260mm × 220mm × 110mm',
    readyToShip: true,
    isCustomizable: true,
  },
  {
    id: 'hamper-nut-reserve',
    slug: 'nut-reserve',
    name: 'The Twin Nut Reserve',
    subtitle: 'Dual Airtight Jars of Roasted Jumbo Dry Fruits',
    description: 'Compact duo pairing high-grade California almonds and giant Goan cashews in twin presentation canisters.',
    price: 2199,
    originalPrice: 2599,
    image: '/images/luxury_hampers/hamper_nut_reserve.png',
    gallery: [
      '/images/luxury_hampers/hamper_nut_reserve.png',
      '/images/luxury_hampers/hamper_nut_reserve_alt.png',
    ],
    tier: 'gift-for-2',
    tierLabel: 'Gift for 2',
    tierDescription: 'Classic Dual Gourmet Gift',
    occasion: 'festive',
    occasionLabel: 'Festive & Diwali',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Soft Champagne Gold',
    contents: [
      { name: 'Roasted Salted Cashews', weight: '180g', description: 'Crisp oven roasted' },
      { name: 'Smoked California Almonds', weight: '180g', description: 'Hickory wood smoked' },
    ],
    highlights: ['Two-Canister Minimalist Luxury', 'Budget-Friendly Elegance', 'Ready to Ship'],
    dimensions: '220mm × 160mm × 80mm',
    readyToShip: true,
    isCustomizable: true,
  },

  /* ═══════════════════════════════════════════════════════
     4. GIFT FOR 1 / SOLO EXECUTIVE & PERSONAL KEEPSAKES
     ═══════════════════════════════════════════════════════ */
  {
    id: 'hamper-tea-room-collection',
    slug: 'tea-room-collection',
    name: 'The Solitary Tea Room Keepsake',
    subtitle: 'Private Reserve Darjeeling Infusion with Brass Strainer',
    description: 'An intimate self-care and solo ritual gift. Single estate whole-leaf tea accompanied by a cast brass infuser and raw wild honey jar.',
    price: 1899,
    originalPrice: 2200,
    image: '/images/luxury_hampers/hamper_tea_room_collection.png',
    gallery: [
      '/images/luxury_hampers/hamper_tea_room_collection.png',
      '/images/luxury_hampers/hamper_tea_room_collection_alt.png',
    ],
    tier: 'gift-for-1',
    tierLabel: 'Gift for 1',
    tierDescription: 'Individual Self-Care & Mindful Luxury',
    occasion: 'wellness',
    occasionLabel: 'Wellness & Lifestyle',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Pastel Lilac & Soft Suede',
    contents: [
      { name: 'Muscatel Second Flush Darjeeling Tea', weight: '90g', description: 'Whole leaf orthodox loose tea' },
      { name: 'Hand-Carved Brass Teaspoon & Infuser', weight: '1 Unit', description: 'Perforated brass tea ball' },
      { name: 'Raw Forest Honey Jar', weight: '120g', description: 'Unprocessed natural multiflora honey' },
    ],
    highlights: ['Individual Wellness Ritual', 'Handcrafted Metal Strainer', 'Compact Luxury Footprint'],
    dimensions: '210mm × 150mm × 75mm',
    readyToShip: true,
    isCustomizable: false,
    bestseller: true,
  },
  {
    id: 'hamper-savoury-society',
    slug: 'savoury-society',
    name: 'The Executive Solo Snack Box',
    subtitle: 'Healthy Gourmet Munchies for the Modern Desk',
    description: 'Tailored for an individual professional. Light, satisfying roasted nuts and crunchy makhana with zero refined sugar.',
    price: 1599,
    originalPrice: 1899,
    image: '/images/luxury_hampers/hamper_savoury_society.png',
    gallery: [
      '/images/luxury_hampers/hamper_savoury_society.png',
      '/images/luxury_hampers/hamper_savoury_society_alt.png',
    ],
    tier: 'gift-for-1',
    tierLabel: 'Gift for 1',
    tierDescription: 'Solo Desk Essentials & Healthy Treats',
    occasion: 'corporate',
    occasionLabel: 'Corporate & Executive',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Midnight Bound Texture',
    contents: [
      { name: 'Smoked Makhana Tub', weight: '80g', description: 'Herb infused roasted water lily pops' },
      { name: 'Rosemary Roasted Nut Mix', weight: '120g', description: 'Almonds, cashews, and pecans' },
      { name: 'Dark Chocolate Almond Biscotti Bar', weight: '50g', description: 'Handmade single bar' },
    ],
    highlights: ['Health Focused', 'Desk Companion', 'Corporate Onboarding Favorite'],
    dimensions: '200mm × 140mm × 70mm',
    readyToShip: true,
    isCustomizable: true,
  },
  {
    id: 'hamper-snack-attack',
    slug: 'snack-attack',
    name: 'The Artisanal Gourmet Petite Box',
    subtitle: 'Handmade Chikki & Regional Confectionery Trio',
    description: 'A delightful small gesture for birthdays, thank-you notes, or corporate tokens of gratitude.',
    price: 1299,
    originalPrice: 1499,
    image: '/images/luxury_hampers/hamper_snack_attack.png',
    gallery: [
      '/images/luxury_hampers/hamper_snack_attack.png',
      '/images/luxury_hampers/hamper_snack_attack_alt.png',
    ],
    tier: 'gift-for-1',
    tierLabel: 'Gift for 1',
    tierDescription: 'Compact Token of Gratitude',
    occasion: 'milestones',
    occasionLabel: 'Milestones & Recognition',
    vesselType: 'Magnetic Keepsake Box',
    vesselColor: 'Maroon Bloom',
    contents: [
      { name: 'Crushed Peanut Jaggery Chikki', weight: '100g', description: 'Traditional crunchy brittles' },
      { name: 'Roasted Salted Seeds Pod', weight: '100g', description: 'Flax and pumpkin seeds' },
      { name: 'Honey Glazed Cashew Pouch', weight: '90g', description: 'Slow baked sweet nut crunch' },
    ],
    highlights: ['Under ₹1,500 Accessible Luxury', 'Fast Dispatch', 'Individual Treat'],
    dimensions: '190mm × 130mm × 65mm',
    readyToShip: true,
    isCustomizable: false,
  },

  /* ═══════════════════════════════════════════════════════
     5. TEAM & ENTERPRISE / MULTI-PIECE BESPOKE
     ═══════════════════════════════════════════════════════ */
  {
    id: 'hamper-the-grand-ambassador',
    slug: 'the-grand-ambassador',
    name: 'The Grand Ambassador Sovereign Trunk',
    subtitle: 'Bespoke Double-Decker Wooden Trunk for VIP Partnerships',
    description: 'Our most expansive celebratory suite engineered for VIP partnerships, board members, and grand corporate delegations. Multi-tiered with custom brass monograms.',
    price: 9999,
    originalPrice: 11999,
    image: '/images/luxury_hampers/hamper_the_grand_ambassador.png',
    gallery: [
      '/images/luxury_hampers/hamper_the_grand_ambassador.png',
      '/images/luxury_hampers/hamper_the_grand_ambassador_alt.jpg',
    ],
    tier: 'team-enterprise',
    tierLabel: 'Team & Enterprise',
    tierDescription: 'VIP Multi-Person & Leadership Gifting',
    occasion: 'corporate',
    occasionLabel: 'Corporate & Executive',
    vesselType: 'Two-Tier Trunk',
    vesselColor: 'Hand-Stained Walnut Wood & Antique Brass',
    contents: [
      { name: 'Tier 1: Saffron, Pistachio & Cashew Royal Trio', weight: '450g Total', description: 'Three airtight metal tins with estate dry fruits' },
      { name: 'Tier 1: Artisanal Belgian Chocolate Bonbons', weight: '12 Pcs', description: 'Assorted pralines and truffles' },
      { name: 'Tier 2: Architectural Brass Desk Pen & Clock Set', weight: 'Set of 2', description: 'Heavyweight brass executive desk accessories' },
      { name: 'Tier 2: Single-Origin Coorg Coffee & Brass Filter', weight: '1 Set', description: 'Traditional brass drip coffee maker and roast' },
      { name: 'Wax-Sealed Leather Folio with Certificate', weight: '1 Unit', description: 'Hand-stitched full grain leather keepsake' },
    ],
    highlights: ['Double Sliding Trays', 'Brass Hardware & Hinges', 'Monogram Engraving Available', 'White Glove Delivery'],
    dimensions: '380mm × 300mm × 220mm',
    readyToShip: false,
    isCustomizable: true,
    bestseller: true,
    featured: true,
  },
  {
    id: 'hamper-heritage-velvet-sovereign',
    slug: 'heritage-velvet-sovereign',
    name: 'The Heritage Velvet Sovereign Chest',
    subtitle: 'Hand-Upholstered Royal Velvet Trunk with Brass Fixtures',
    description: 'A tactile masterpiece wrapped in rich jewel-toned velvet with brushed gold fixtures. Designed for milestone recognitions, anniversary summits, and royal ceremonies.',
    price: 8499,
    originalPrice: 9500,
    image: '/images/luxury_hampers/hamper_heritage_velvet_sovereign.png',
    gallery: [
      '/images/luxury_hampers/hamper_heritage_velvet_sovereign.png',
      '/images/luxury_hampers/hamper_heritage_velvet_sovereign_alt.png',
    ],
    tier: 'team-enterprise',
    tierLabel: 'Team & Enterprise',
    tierDescription: 'Royal Occasions & Milestone Awards',
    occasion: 'milestones',
    occasionLabel: 'Milestones & Recognition',
    vesselType: 'Velvet Chest',
    vesselColor: 'Royal Sapphire Velvet & Brushed Gold',
    contents: [
      { name: 'Four Reserve Royal Confectionery Boxes', weight: '600g Total', description: 'Dry fruits, artisanal sweets, and spiced nuts' },
      { name: 'Hand-Poured Amber & Oud Soy Candle', weight: '220g', description: 'Heavy brass lid jar' },
      { name: 'Solid Brass Bookmark & Card Holder', weight: 'Set of 2', description: 'Architectural desk keepsake' },
    ],
    highlights: ['Silk Velvet Exterior', 'Solid Kiln-Dried Wooden Chassis', 'Custom Foil Monogram'],
    dimensions: '360mm × 260mm × 140mm',
    readyToShip: true,
    isCustomizable: true,
    featured: true,
  },
];

