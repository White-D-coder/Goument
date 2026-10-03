export interface HamperInsideItem {
  item: string;
  weight?: string;
  description: string;
}

export interface HamperData {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  subCopy: string;
  category: string;
  categoryLabel: string;
  inside_items: HamperInsideItem[];
  packaging_style: string;
  description: string;
  price: number;
  image: string;
  highlights: string[];
}

export interface CatalogueCategory {
  id: string;
  label: string;
  subtitle: string;
  image: string;
  borderRadius: string;
  pastelActive: string;
  pastelHover: string;
}

export const CATALOGUE_CATEGORIES: CatalogueCategory[] = [
  {
    id: 'all',
    label: 'All Gifts',
    subtitle: 'Explore our complete artisanal gifting catalogue.',
    image: '/images/beverages/assam_tea.jpg',
    borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
    pastelActive: 'bg-[#B0BCA4]',
    pastelHover: 'group-hover:bg-[#EAEFE6]',
  },
  {
    id: 'hampers',
    label: 'Gift Hampers',
    subtitle: 'Curated sets of tea, coffee, gourmet treats & childhood nostalgia.',
    image: '/images/hampers/hamper_tea_set.jpg',
    borderRadius: '55% 45% 60% 40% / 50% 55% 45% 50%',
    pastelActive: 'bg-[#B08968]',
    pastelHover: 'group-hover:bg-[#EDE0D4]',
  },
  {
    id: 'beverages',
    label: 'Tea & Coffee',
    subtitle: 'Single-estate tea, filter roast, brassware & cups.',
    image: '/images/beverages/assam_tea.jpg',
    borderRadius: '45% 55% 35% 65% / 60% 40% 60% 40%',
    pastelActive: 'bg-[#C2A649]',
    pastelHover: 'group-hover:bg-[#F2ECD8]',
  },
  {
    id: 'gourmet-food',
    label: 'Gourmet Treats',
    subtitle: 'Artisanal cookies, chocolates, bhujia & sweets.',
    image: '/images/pics/bhujia.png',
    borderRadius: '60% 40% 55% 45% / 45% 60% 40% 55%',
    pastelActive: 'bg-[#E5A87B]',
    pastelHover: 'group-hover:bg-[#FBECE2]',
  },
  {
    id: 'infinity-beyond',
    label: 'Eternal Paper Co.',
    subtitle: 'Handmade journals, bookmarks, shagun envelopes & cards.',
    image: '/images/items/shagun_envelopes.jpg',
    borderRadius: '53% 47% 41% 59% / 68% 66% 34% 32%',
    pastelActive: 'bg-[#F6D07A]',
    pastelHover: 'group-hover:bg-[#FCF0CE]',
  },
  {
    id: '3d-miniatures',
    label: 'Childhood & Nostalgia',
    subtitle: 'Retro games, candies, Hotwheels & toys.',
    image: '/images/items/brick_game.jpg',
    borderRadius: '48% 52% 47% 53% / 58% 46% 54% 42%',
    pastelActive: 'bg-[#CFAFA3]',
    pastelHover: 'group-hover:bg-[#EFE2DC]',
  },
  {
    id: 'decor-spiritual',
    label: 'Home & Wellness',
    subtitle: 'Aromatherapy scented candles & lifestyle accents.',
    image: '/images/items/scented_candles.jpg',
    borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
    pastelActive: 'bg-[#988184]',
    pastelHover: 'group-hover:bg-[#E8E2E3]',
  },
];

export const HAMPERS_CATALOG: HamperData[] = [
  {
    _id: "tea_set_hamper",
    slug: "tea-set",
    name: "The Connoisseur’s Tea Set",
    brand: 'The Gourmet Gifts',
    subCopy: "Artisanal tea, brass strainer, Japanese cup, brass spoon & sugar packets.",
    category: "hampers",
    categoryLabel: "Gift Hampers",
    inside_items: [
      {
            "item": "Single-Estate Artisanal Tea",
            "weight": "100g",
            "description": "Hand-picked whole leaf tea leaves."
      },
      {
            "item": "Brass Tea Strainer",
            "description": "Fine mesh hand-finished brass strainer."
      },
      {
            "item": "Japanese Ceramic Teacup",
            "description": "Hand-thrown artisanal cup with glazed texture."
      },
      {
            "item": "Heritage Brass Spoon",
            "description": "Handcrafted golden brass stirring spoon."
      },
      {
            "item": "Raw Sugar Packets",
            "weight": "5 Sachets",
            "description": "Organic demerara & unrefined cane sugar."
      }
],
    packaging_style: "Gift Presentation Set",
    description: "An elegant ceremonial gifting set dedicated to the meditative ritual of tea. Features single-estate artisanal tea, an authentic brass strainer, hand-glazed Japanese teacup, hand-forged brass spoon and organic cane sugar packets.",
    price: 0,
    image: "/images/hampers/hamper_tea_set.jpg",
    highlights: ["Single-Estate Tea","Authentic Hand-Forged Brass","Artisanal Japanese Ceramic"],
  },
  {
    _id: "coffee_set_hamper",
    slug: "coffee-set",
    name: "The Artisan Coffee Set",
    brand: 'The Gourmet Gifts',
    subCopy: "Filter coffee (Sleepy Owl / Davidoff), stoneware mug & small brass spoon.",
    category: "hampers",
    categoryLabel: "Gift Hampers",
    inside_items: [
      {
            "item": "Artisanal Filter Coffee (Sleepy Owl / Davidoff)",
            "weight": "150g",
            "description": "Rich, slow-roasted filter coffee blend."
      },
      {
            "item": "Ceramic Stoneware Mug",
            "description": "Matte-glazed comfort grip coffee mug."
      },
      {
            "item": "Small Brass Spoon",
            "description": "Delicate hand-forged brass coffee spoon."
      }
],
    packaging_style: "Gift Presentation Set",
    description: "A comforting morning ritual in a presentation suite. Features rich, aromatic premium filter coffee blend, an artisan ceramic stoneware coffee mug, and a delicate handcrafted brass stirring spoon.",
    price: 0,
    image: "/images/hampers/hamper_coffee_set.jpg",
    highlights: ["Slow-Roasted Filter Coffee","Stoneware Ceramic Mug","Hand-Crafted Brass Spoon"],
  },
  {
    _id: "diwali_celebration_og_hamper",
    slug: "diwali-celebration-og-hamper",
    name: "Diwali Celebration — OG Hamper",
    brand: 'The Gourmet Gifts',
    subCopy: "Crispy bhujia, chocolates, cookies, pure ghee sweets & bookmark envelope.",
    category: "hampers",
    categoryLabel: "Gift Hampers",
    inside_items: [
      {
            "item": "Artisanal Savoury Bhujia",
            "weight": "150g",
            "description": "Crispy spiced savoury crunch."
      },
      {
            "item": "Couverture Handcrafted Chocolates",
            "weight": "120g",
            "description": "Assorted rich milk & dark chocolates."
      },
      {
            "item": "Slow-Baked Butter Cookies",
            "weight": "150g",
            "description": "Melt-in-mouth vanilla butter cookies."
      },
      {
            "item": "Pure Ghee Sweets",
            "weight": "200g",
            "description": "Festive mithai made with pure ingredients."
      },
      {
            "item": "Shagun Envelope & Bookmark",
            "description": "Gold foil deckled-edge cash envelope & bookmark."
      }
],
    packaging_style: "Gift Presentation Set",
    description: "The definitive festive hamper that captures the warmth and grandeur of Diwali. Packed with artisanal crispy bhujia, velvety handcrafted chocolates, buttery cookies, traditional Indian sweets and an auspicious gold-foiled bookmark envelope.",
    price: 0,
    image: "/images/hampers/hamper_diwali_og.jpg",
    highlights: ["Traditional Festive Favourites","Pure Desi Ghee Sweets","Keepsake Gold Foil Envelopes"],
  },
  {
    _id: "generation_set_aesthetic",
    slug: "generation-set-aesthetic",
    name: "Generation Set — Aesthetic",
    brand: 'The Gourmet Gifts',
    subCopy: "Designer copper bottle, eco-friendly journal & good pen.",
    category: "hampers",
    categoryLabel: "Gift Hampers",
    inside_items: [
      {
            "item": "Designer Copper Bottle",
            "weight": "750ml",
            "description": "Pure hammered ayurvedic copper bottle."
      },
      {
            "item": "Eco-Friendly Hardbound Journal",
            "weight": "192 Pages",
            "description": "Unruled cotton rag paper notebook."
      },
      {
            "item": "Executive Minimalist Pen",
            "description": "Matte black metal rollerball pen."
      }
],
    packaging_style: "Gift Presentation Set",
    description: "A contemporary aesthetic curation designed for daily mindful living. Combines a hammered pure copper hydration vessel, an artisanal recycled hardcover journal and an executive minimalist pen.",
    price: 0,
    image: "/images/hampers/hamper_generation_set.jpg",
    highlights: ["Pure Handcrafted Copper","100% Recycled Cotton Paper","Precision Writing Instrument"],
  },
  {
    _id: "childhood_hamper",
    slug: "childhood-hamper",
    name: "The Nostalgic Childhood Hamper",
    brand: 'The Gourmet Gifts',
    subCopy: "Retro video game, brick game, candies, eclairs, Kinder Joy, Hotwheels, RC car, Trimax, diary & iPod player.",
    category: "hampers",
    categoryLabel: "Gift Hampers",
    inside_items: [
      {
            "item": "8-Bit Retro Video Game Console",
            "description": "Handheld color screen retro gaming device."
      },
      {
            "item": "Handheld Brick Game",
            "description": "Vintage block puzzle LCD device."
      },
      {
            "item": "Vintage Orange Candies",
            "weight": "100g",
            "description": "Sweet & tangy sugar-dusted hard candies."
      },
      {
            "item": "Chocolate Eclairs Toffees",
            "weight": "100g",
            "description": "Caramel toffees with molten chocolate core."
      },
      {
            "item": "Kinder Joy Egg",
            "description": "Wafer balls in milky cream with surprise toy."
      },
      {
            "item": "Hotwheels Die-Cast Car",
            "description": "Authentic 1:64 scale metal race car."
      },
      {
            "item": "Mini RC Car",
            "description": "Radio-controlled micro racer with handheld remote."
      },
      {
            "item": "Reynolds Trimax Pen",
            "description": "Classic blue liquid gel precision pen."
      },
      {
            "item": "Pocket Mini Diary",
            "weight": "96 Pages",
            "description": "Compact gilded notebook."
      },
      {
            "item": "Clip-On MP3 Player",
            "description": "Wearable digital audio player with earphones."
      }
],
    packaging_style: "Gift Presentation Set",
    description: "An irresistible treasure chest of pure 90s nostalgia and playful memories. Features a retro handheld console, brick game, classic orange candies, eclairs, Kinder Joy, authentic Hotwheels car, mini remote control vehicle, iconic Reynolds Trimax pen, pocket diary and clip-on MP3 player.",
    price: 0,
    image: "/images/hampers/hamper_childhood.jpg",
    highlights: ["90s Nostalgia Treasure","Playable Retro Gaming","Iconic Childhood Treats"],
  },
  {
    _id: "crockery_set_japanese",
    slug: "crockery-set-japanese",
    name: "Japanese Crockery & Tableware Set",
    brand: 'The Gourmet Gifts',
    subCopy: "Artisanal Japanese ceramic tableware, cup, brass strainer & brass spoon.",
    category: "hampers",
    categoryLabel: "Gift Hampers",
    inside_items: [
      {
            "item": "Japanese Ceramic Teacup",
            "description": "Hand-thrown cup with speckled texture."
      },
      {
            "item": "Brass Tea Strainer",
            "description": "Hand-finished fine mesh tea strainer."
      },
      {
            "item": "Hand-Forged Brass Spoon",
            "description": "Golden brass tableware accent."
      }
],
    packaging_style: "Gift Presentation Set",
    description: "A curated collection of Japanese ceramic tableware designed for serene tablescapes. Finished with organic reactive glazes and earthy stoneware textures for an authentic dining ritual.",
    price: 0,
    image: "/images/hampers/hamper_crockery_set.jpg",
    highlights: ["Handmade Ceramic Stoneware","Earthy Reactive Glazes","Minimalist Zen Tableware"],
  },
  {
    _id: "tea",
    slug: "tea",
    name: "Artisanal Tea",
    brand: 'The Gourmet Gifts',
    subCopy: "Single-estate fragrant tea leaves, full-bodied & soothing.",
    category: "beverages",
    categoryLabel: "Beverages",
    inside_items: [
      {
            "item": "Artisanal Tea Leaves",
            "weight": "100g",
            "description": "Freshly packed single-origin tea."
      }
],
    packaging_style: "Aroma-Seal Tin",
    description: "Whole-leaf tea hand-selected from lush high-altitude estates, delivering notes of malt, floral sweetness and a golden amber liquor.",
    price: 0,
    image: "/images/beverages/assam_tea.jpg",
    highlights: ["100% Whole Leaf","Single Estate Harvest","Rich Antioxidants"],
  },
  {
    _id: "strainer",
    slug: "strainer",
    name: "Brass Tea Strainer",
    brand: 'The Gourmet Gifts',
    subCopy: "Handcrafted pure brass fine mesh tea strainer.",
    category: "decor-spiritual",
    categoryLabel: "Tableware & Crockery",
    inside_items: [
      {
            "item": "Brass Tea Strainer",
            "description": "Hand-forged brass with ergonomic handle."
      }
],
    packaging_style: "Cotton Pouch",
    description: "A timeless heirloom strainer crafted from pure brass with intricate woven mesh, elevating daily tea rituals into an art form.",
    price: 0,
    image: "/images/items/strainer.jpg",
    highlights: ["Pure Solid Brass","Fine Mesh Filtration","Heirloom Handcraft"],
  },
  {
    _id: "japanese_cup",
    slug: "japanese-cup",
    name: "Japanese Ceramic Cup",
    brand: 'The Gourmet Gifts',
    subCopy: "Hand-thrown Japanese ceramic teacup with natural glaze.",
    category: "decor-spiritual",
    categoryLabel: "Tableware & Crockery",
    inside_items: [
      {
            "item": "Japanese Teacup",
            "weight": "180ml",
            "description": "Handcrafted stoneware ceramic cup."
      }
],
    packaging_style: "Protective Gift Sleeve",
    description: "Individually thrown by skilled artisans with tactile wabi-sabi finishes and comfortable hand-feel for tea and warm brews.",
    price: 0,
    image: "/images/items/japanese_cup.jpg",
    highlights: ["Handmade Stoneware","Heat Retentive","Lead-Free Glaze"],
  },
  {
    _id: "brass_spoon",
    slug: "brass-spoon",
    name: "Brass Spoon",
    brand: 'The Gourmet Gifts',
    subCopy: "Traditional hand-beaten brass spoon with heritage detail.",
    category: "decor-spiritual",
    categoryLabel: "Tableware & Crockery",
    inside_items: [
      {
            "item": "Hand-Forged Brass Spoon",
            "description": "15cm solid brass spoon."
      }
],
    packaging_style: "Protective Sleeve",
    description: "A classic golden brass spoon hand-forged with traditional hammer marks and warm, lustrous heirloom charm.",
    price: 0,
    image: "/images/items/brass_spoon.jpg",
    highlights: ["Hand-Beaten Solid Brass","Naturally Anti-Microbial","Heirloom Quality"],
  },
  {
    _id: "sugar_packets",
    slug: "sugar-packets",
    name: "Demerara & Cane Sugar Packets",
    brand: 'The Gourmet Gifts',
    subCopy: "Natural unrefined golden demerara sugar sachets.",
    category: "gourmet-food",
    categoryLabel: "Gourmet Food",
    inside_items: [
      {
            "item": "Demerara Sugar Sachets",
            "weight": "10 Sachets",
            "description": "Natural unrefined sugar portions."
      }
],
    packaging_style: "Individual Portions",
    description: "Unrefined, molasses-rich golden demerara crystals that add subtle caramel notes to tea, coffee and warm infusions.",
    price: 0,
    image: "/images/items/sugar_packets.jpg",
    highlights: ["100% Unrefined","Rich Caramel Flavour","Eco Paper Sachets"],
  },
  {
    _id: "coffee_filter_sleepy_owl_davidoff",
    slug: "coffee-filter-sleepy-owl-davidoff",
    name: "Filter Coffee (Sleepy Owl / Davidoff)",
    brand: 'The Gourmet Gifts',
    subCopy: "Slow-roasted premium filter coffee with rich chocolate undertones.",
    category: "beverages",
    categoryLabel: "Beverages",
    inside_items: [
      {
            "item": "Filter Coffee Blend",
            "weight": "150g",
            "description": "Slow-roasted artisan filter coffee."
      }
],
    packaging_style: "Nitrogen-Flushed Pouch",
    description: "A full-bodied, artisanal dark roast roasted to perfection with notes of toasted hazelnut, cocoa nibs and velvet crema.",
    price: 0,
    image: "/images/beverages/sleepy_owl.jpg",
    highlights: ["100% Arabica & Robusta Blend","Freshly Ground Roast","Intense Aroma"],
  },
  {
    _id: "mug",
    slug: "mug",
    name: "Artisan Ceramic Mug",
    brand: 'The Gourmet Gifts',
    subCopy: "Matte-glazed comfort stoneware coffee mug.",
    category: "decor-spiritual",
    categoryLabel: "Tableware & Crockery",
    inside_items: [
      {
            "item": "Ceramic Coffee Mug",
            "weight": "320ml",
            "description": "Stoneware coffee mug."
      }
],
    packaging_style: "Cushioned Box",
    description: "Heavyweight stoneware ceramic mug designed for slow mornings and quiet contemplation, with an organic earthy rim.",
    price: 0,
    image: "/images/items/mug.jpg",
    highlights: ["Comfort Grip Handle","Microwave & Dishwasher Safe","Hand-Glazed Ceramic"],
  },
  {
    _id: "small_brass_spoon",
    slug: "small-brass-spoon",
    name: "Small Brass Spoon",
    brand: 'The Gourmet Gifts',
    subCopy: "Petite handcrafted brass stirring & dessert spoon.",
    category: "decor-spiritual",
    categoryLabel: "Tableware & Crockery",
    inside_items: [
      {
            "item": "Small Brass Spoon",
            "description": "Petite 11cm solid brass spoon."
      }
],
    packaging_style: "Protective Sleeve",
    description: "A compact hand-finished brass spoon tailored for espresso cups, condiment jars and delicate dessert servings.",
    price: 0,
    image: "/images/items/small_brass_spoon.jpg",
    highlights: ["Solid Golden Brass","Petite 11cm Length","Artisanal Craft"],
  },
  {
    _id: "bhujia",
    slug: "bhujia",
    name: "Artisanal Savoury Bhujia",
    brand: 'The Gourmet Gifts',
    subCopy: "Crispy, crunchy spiced savoury namkeen.",
    category: "gourmet-food",
    categoryLabel: "Gourmet Food",
    inside_items: [
      {
            "item": "Spiced Bhujia",
            "weight": "150g",
            "description": "Crisp traditional bhujia."
      }
],
    packaging_style: "Resealable Foil Pouch",
    description: "Handmade traditional crispy bhujia spun with freshly crushed black pepper, aromatic cloves and moth flour for pure savoury satisfaction.",
    price: 0,
    image: "/images/pics/bhujia.png",
    highlights: ["Cold-Pressed Oil","Authentic Recipe","Zero Artificial Preservatives"],
  },
  {
    _id: "chocolates",
    slug: "chocolates",
    name: "Artisanal Chocolates",
    brand: 'The Gourmet Gifts',
    subCopy: "Handcrafted couverture dark and milk chocolates.",
    category: "gourmet-food",
    categoryLabel: "Gourmet Food",
    inside_items: [
      {
            "item": "Couverture Chocolates Box",
            "weight": "120g",
            "description": "Assorted fine chocolates."
      }
],
    packaging_style: "Golden Foil Box",
    description: "Velvety artisanal chocolate bonbons made from single-origin cacao beans, finished with pure cocoa butter and sea salt crystals.",
    price: 0,
    image: "/images/pics/chikki.png",
    highlights: ["Single-Origin Cacao","Couverture Quality","Zero Palm Oil"],
  },
  {
    _id: "cookies",
    slug: "cookies",
    name: "Butter Vanilla Cookies",
    brand: 'The Gourmet Gifts',
    subCopy: "Slow-baked golden butter cookies with vanilla bean.",
    category: "gourmet-food",
    categoryLabel: "Gourmet Food",
    inside_items: [
      {
            "item": "Butter Cookies",
            "weight": "150g",
            "description": "Slow-baked gourmet cookies."
      }
],
    packaging_style: "Air-Tight Cookie Tin",
    description: "Golden, crumbly tea-time cookies churned with farm-fresh cultured butter and fragrant Madagascar bourbon vanilla.",
    price: 0,
    image: "/images/pics/thekuap.png",
    highlights: ["Cultured Farm Butter","Real Vanilla Bean","Crisp Crumb"],
  },
  {
    _id: "sweets",
    slug: "sweets",
    name: "Traditional Gourmet Sweets",
    brand: 'The Gourmet Gifts',
    subCopy: "Authentic festive mithai prepared with pure desi ghee.",
    category: "gourmet-food",
    categoryLabel: "Gourmet Food",
    inside_items: [
      {
            "item": "Festive Ghee Sweets",
            "weight": "200g",
            "description": "Traditional Indian festive sweets."
      }
],
    packaging_style: "Festive Box",
    description: "Handcrafted heritage confections made with pistachio, saffron, green cardamom and slow-cooked milk solids in pure A2 desi ghee.",
    price: 0,
    image: "/images/items/sweets.jpg",
    highlights: ["Pure Desi Ghee","Saffron & Pistachio","Freshly Prepared"],
  },
  {
    _id: "envelope_bookmarks",
    slug: "envelope-bookmarks",
    name: "Shagun Envelope & Bookmark Set",
    brand: 'The Gourmet Gifts',
    subCopy: "Gold-foiled festive greeting envelopes with artistic bookmarks.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Envelope & Bookmark Pairing",
            "description": "2 Shagun envelopes and 2 matching bookmarks."
      }
],
    packaging_style: "Satin Ribbon Sleeve",
    description: "A harmonious pairing of textured cotton-rag shagun envelopes foil-stamped with auspicious motifs, paired with illustrated book markers.",
    price: 0,
    image: "/images/items/envelope_bookmarks.jpg",
    highlights: ["Handmade Cotton Rag Paper","Gold Leaf Detailing","Matching Bookmarks"],
  },
  {
    _id: "designer_copper_bottle",
    slug: "designer-copper-bottle",
    name: "Designer Copper Bottle",
    brand: 'The Gourmet Gifts',
    subCopy: "Pure handcrafted hammered copper bottle for everyday wellness.",
    category: "wellness-lifestyle",
    categoryLabel: "Wellness & Lifestyle",
    inside_items: [
      {
            "item": "Hammered Copper Bottle",
            "weight": "750ml",
            "description": "Pure copper water bottle."
      }
],
    packaging_style: "Protective Cylinder Case",
    description: "Hand-hammered pure copper water vessel offering ancient Ayurvedic benefits, leak-proof brass cap and a stunning polished exterior.",
    price: 0,
    image: "/images/items/designer_copper_bottle.png",
    highlights: ["100% Pure Copper","Ayurvedic Tamra Jal","Hand-Hammered Texture"],
  },
  {
    _id: "eco_friendly_journal",
    slug: "eco-friendly-journal",
    name: "Eco-Friendly Journal",
    brand: 'The Gourmet Gifts',
    subCopy: "Sustainable recycled cotton paper journal with cloth spine.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Eco Journal",
            "weight": "160 Pages",
            "description": "Handmade cotton journal."
      }
],
    packaging_style: "Craft Box",
    description: "Tree-free unruled diary made from upcycled cotton fabric waste, bound with hand-sewn signatures and a luxurious bookcloth spine.",
    price: 0,
    image: "/images/items/eco_friendly_journal.jpg",
    highlights: ["100% Tree-Free Paper","Lay-Flat Binding","120 GSM Smooth Texture"],
  },
  {
    _id: "good_pen",
    slug: "good-pen",
    name: "Good Pen (Weighted Rollerball)",
    brand: 'The Gourmet Gifts',
    subCopy: "Balanced weighted metal rollerball pen for precision writing.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Weighted Metal Pen",
            "description": "Fine executive writing instrument."
      }
],
    packaging_style: "Sliding Pen Sleeve",
    description: "Engineered with a solid brass core, silky matte finish and smooth German liquid-gel refill for effortless note-taking.",
    price: 0,
    image: "/images/items/good_pen.jpg",
    highlights: ["Solid Brass Core","Balanced Center of Gravity","0.7mm German Gel Cartridge"],
  },
  {
    _id: "video_game_retro_handheld",
    slug: "video-game-retro-handheld",
    name: "Retro 8-Bit Video Game",
    brand: 'The Gourmet Gifts',
    subCopy: "Pocket retro handheld video game with classic 80s & 90s titles.",
    category: "3d-miniatures",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Handheld Retro Console",
            "description": "Electronic game console with charging cable."
      }
],
    packaging_style: "Retro Graphic Box",
    description: "Pocket-sized rechargeable handheld console pre-loaded with timeless pixel-art arcade adventures, colour screen and built-in speaker.",
    price: 0,
    image: "/images/items/video_game_retro_handheld.jpg",
    highlights: ["Colour LCD Display","Classic Arcade Library","Rechargeable Battery"],
  },
  {
    _id: "brick_game",
    slug: "brick-game",
    name: "Classic Brick Game",
    brand: 'The Gourmet Gifts',
    subCopy: "Vintage 99-in-1 pocket brick puzzle console.",
    category: "3d-miniatures",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Brick Game Handheld",
            "description": "Pocket retro electronic brick game."
      }
],
    packaging_style: "Window Gift Box",
    description: "The definitive 90s handheld brick puzzle game featuring iconic falling-block puzzles, retro sound effects and nostalgic clicky buttons.",
    price: 0,
    image: "/images/items/brick_game.jpg",
    highlights: ["Authentic 90s Vintage","99 Game Variations","Battery Operated"],
  },
  {
    _id: "orange_candies",
    slug: "orange-candies",
    name: "Vintage Orange Candies",
    brand: 'The Gourmet Gifts',
    subCopy: "Classic sweet & tangy nostalgic sugar-dusted boiled candies.",
    category: "gourmet-food",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Orange Candies Jar",
            "weight": "120g",
            "description": "Classic hard boiled orange candies."
      }
],
    packaging_style: "Vintage Glass Jar",
    description: "The quintessential sweet-and-sour orange candy segments dusted with fine sugar crystal, taking you back to schoolyard afternoons.",
    price: 0,
    image: "/images/items/orange_candies.jpg",
    highlights: ["Real Citrus Oils","Nostalgic Recipe","Sugar-Dusted Crunch"],
  },
  {
    _id: "eclairs",
    slug: "eclairs",
    name: "Chocolate Eclairs Toffees",
    brand: 'The Gourmet Gifts',
    subCopy: "Chewy golden caramel with luscious chocolate center.",
    category: "gourmet-food",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Chocolate Eclairs",
            "weight": "150g",
            "description": "Individually wrapped caramel chocolate toffees."
      }
],
    packaging_style: "Decorative Pouch",
    description: "Rich, buttery chewy caramel toffees that melt away to reveal a velvety molten chocolate truffle center.",
    price: 0,
    image: "/images/items/eclairs.jpg",
    highlights: ["Chewy Caramel Shell","Rich Chocolate Filling","Festive Treat"],
  },
  {
    _id: "kinder_joy",
    slug: "kinder-joy",
    name: "Kinder Joy Treat & Toy",
    brand: 'The Gourmet Gifts',
    subCopy: "Crispy wafer cocoa bites with an exciting surprise toy inside.",
    category: "gourmet-food",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Kinder Joy Egg",
            "description": "Confectionery egg with toy surprise."
      }
],
    packaging_style: "Collector Egg Packaging",
    description: "Two crispy cocoa wafer balls floating in layered milky cocoa cream on one side, and an interactive collectible surprise toy on the other.",
    price: 0,
    image: "/images/items/kinder_joy.jpg",
    highlights: ["Dual Chamber Pod","Milky Cocoa Cream","Collectible Mystery Toy"],
  },
  {
    _id: "hotwheels",
    slug: "hotwheels",
    name: "Hotwheels Die-Cast Car",
    brand: 'The Gourmet Gifts',
    subCopy: "Original die-cast metal miniature collector race car.",
    category: "3d-miniatures",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Hotwheels Race Car",
            "description": "1:64 scale die-cast model vehicle."
      }
],
    packaging_style: "Blister Pack",
    description: "Authentic miniature high-performance die-cast metal model with aerodynamic styling, rolling wheels and vibrant collector paintwork.",
    price: 0,
    image: "/images/items/hotwheels.jpg",
    highlights: ["Original Die-Cast Metal","Collector Edition","Precision Scaling"],
  },
  {
    _id: "remote_control_car",
    slug: "remote-control-car",
    name: "Mini Remote Control Car",
    brand: 'The Gourmet Gifts',
    subCopy: "High-speed mini RC drift vehicle with wireless controller.",
    category: "3d-miniatures",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Mini RC Car & Controller",
            "description": "Radio-controlled car with handheld remote."
      }
],
    packaging_style: "Display Box",
    description: "Pocket-sized radio-controlled race vehicle capable of rapid acceleration, sharp corner drifts and endless indoor racing fun.",
    price: 0,
    image: "/images/items/remote_control_car.jpg",
    highlights: ["Wireless 2.4GHz Control","High-Torque Motor","Durable Polycarbonate Shell"],
  },
  {
    _id: "reynolds_trimax",
    slug: "reynolds-trimax",
    name: "Reynolds Trimax Gel Pen",
    brand: 'The Gourmet Gifts',
    subCopy: "The legendary smooth liquid-gel precision writing instrument.",
    category: "infinity-beyond",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Reynolds Trimax Pen",
            "description": "0.5mm precision gel roller pen."
      }
],
    packaging_style: "Protective Casing",
    description: "The schoolhouse favourite that defined neat handwriting, featuring precision tip geometry, vibrant dark liquid ink and comfortable ribbed grip.",
    price: 0,
    image: "/images/items/reynolds_trimax.jpg",
    highlights: ["Fluid Ink Flow","Waterproof Gel Formula","Classic Nostalgia"],
  },
  {
    _id: "mini_diary",
    slug: "mini-diary",
    name: "Pocket Mini Diary",
    brand: 'The Gourmet Gifts',
    subCopy: "Pocket companion journal with golden edge-gilded pages.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Mini Pocket Diary",
            "weight": "96 Pages",
            "description": "Compact pocket notebook."
      }
],
    packaging_style: "Satin Sleeve",
    description: "A discreet pocketbook bound in textured tactile board with gold foil titling, ribbon marker and premium smooth unruled stationery leaves.",
    price: 0,
    image: "/images/items/mini_diary.jpg",
    highlights: ["Pocket Portable Size","Gold Edge Foil","Satin Bookmark"],
  },
  {
    _id: "music_player_ipod",
    slug: "music-player-ipod",
    name: "Music Player (iPod Clip Type)",
    brand: 'The Gourmet Gifts',
    subCopy: "Retro portable clip-on digital MP3 music player.",
    category: "wellness-lifestyle",
    categoryLabel: "Childhood & Kids",
    inside_items: [
      {
            "item": "Portable MP3 Player",
            "description": "Clip-on audio device with earphones."
      }
],
    packaging_style: "Aluminium Body Case",
    description: "Minimalist metallic clip-on music player reminiscent of classic early 2000s music devices, complete with tactile physical control buttons.",
    price: 0,
    image: "/images/items/music_player_ipod.jpg",
    highlights: ["Clip-On Wearable Design","Tactile Click Wheel","Hi-Fi Audio Output"],
  },
  {
    _id: "bookmarks",
    slug: "bookmarks",
    name: "Artisan Bookmarks Set",
    brand: 'The Gourmet Gifts',
    subCopy: "Set of botanical & architectural textured cotton bookmarks.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Bookmarks Pack",
            "weight": "Set of 4",
            "description": "Artisanal letterpress bookmarks."
      }
],
    packaging_style: "Glassine Envelope",
    description: "Heavy 350 GSM handmade cotton card bookmarks decorated with delicate letterpress foil impressions and silk tassel accents.",
    price: 0,
    image: "/images/items/bookmarks.jpg",
    highlights: ["Handmade 350 GSM Cotton Card","Letterpress Foil Work","Silk Ribbon Tassel"],
  },
  {
    _id: "shagun_envelopes",
    slug: "shagun-envelopes",
    name: "Luxury Shagun Envelopes",
    brand: 'The Gourmet Gifts',
    subCopy: "Regal gold-embossed celebratory shagun envelopes on handmade paper.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Shagun Envelopes",
            "weight": "Pack of 5",
            "description": "Gold foil auspicious cash envelopes."
      }
],
    packaging_style: "Bespoke Keepsake Pouch",
    description: "Bespoke celebratory cash gift envelopes pressed on deep jewel-toned handmade papers with intricate royal gold foil embellishments.",
    price: 0,
    image: "/images/items/shagun_envelopes.jpg",
    highlights: ["Handmade Deckled Paper","Intricate Foil Motifs","Auspicious Festive Gifting"],
  },
  {
    _id: "thank_you_cards",
    slug: "thank-you-cards",
    name: "Letterpress Thank You Cards",
    brand: 'The Gourmet Gifts',
    subCopy: "Letterpress gratitude note cards with tailored deckled-edge envelopes.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Thank You Cards & Envelopes",
            "weight": "Pack of 6",
            "description": "Luxury gratitude stationery."
      }
],
    packaging_style: "Stationery Gift Box",
    description: "Heavyweight cotton note cards with deep debossed gold typography to express heartfelt appreciation with enduring dignity.",
    price: 0,
    image: "/images/items/thank_you_cards.jpg",
    highlights: ["100% Cotton Paper","Deep Letterpress Impression","Deckled Flap Envelopes"],
  },
  {
    _id: "announcement_cards",
    slug: "announcement-cards",
    name: "Announcement Cards (Boy / Girl)",
    brand: 'The Gourmet Gifts',
    subCopy: "Pastel gold-foiled birth celebration & announcement cards.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Milestone Announcement Cards",
            "weight": "Pack of 6",
            "description": "Baby celebration stationery."
      }
],
    packaging_style: "Pastel Keepsake Box",
    description: "Charming pastel stationery suites created to share joyful milestones, birth announcements and baby welcome celebrations.",
    price: 0,
    image: "/images/items/announcement_cards.jpg",
    highlights: ["Soft Pastel Tones","Gilded Foil Calligraphy","Lined Envelopes"],
  },
  {
    _id: "fridge_magnets",
    slug: "fridge-magnets",
    name: "Artistic Fridge Magnets",
    brand: 'The Gourmet Gifts',
    subCopy: "Laser-cut wooden and resin keepsake decorative fridge magnets.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Fridge Magnets Set",
            "weight": "Set of 3",
            "description": "Artistic keepsake magnets."
      }
],
    packaging_style: "Backing Card",
    description: "Hand-painted wooden and resin magnets with whimsical cultural illustrations and strong magnetic hold for kitchen and board spaces.",
    price: 0,
    image: "/images/items/fridge_magnets.jpg",
    highlights: ["Handmade Resin & Wood","High-Strength Neodymium Magnet","Vibrant Artwork"],
  },
  {
    _id: "diary_pen_customized_set",
    slug: "diary-pen-customized-set",
    name: "Diary & Pen Customized Sets — 3",
    brand: 'The Gourmet Gifts',
    subCopy: "Bespoke tri-pack journal set accompanied by matching luxury pens.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Bespoke Journals (Set of 3)",
            "description": "3 Notebooks in plain, ruled, grid formats."
      },
      {
            "item": "Luxury Pens (Set of 3)",
            "description": "Precision metal rollerball pens."
      }
],
    packaging_style: "Hardcover Slipcase",
    description: "A comprehensive creative stationery wardrobe consisting of three theme-bound journals (ruled, grid, plain) and three smooth-writing executive pens.",
    price: 0,
    image: "/images/items/diary_pen_customized_set.jpg",
    highlights: ["Three Distinct Notebook Layouts","Matching Executive Pens","Luxury Desk Presentation"],
  },
  {
    _id: "cool_stickers",
    slug: "cool-stickers",
    name: "Cool Vinyl Art Stickers",
    brand: 'The Gourmet Gifts',
    subCopy: "Vibrant waterproof vinyl die-cut stickers for journals & tech.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Vinyl Art Sticker Pack",
            "weight": "Pack of 12",
            "description": "Die-cut vinyl illustrated stickers."
      }
],
    packaging_style: "Pocket Foil Pack",
    description: "Durable matte-coated vinyl art stickers with playful retro, quirky and motivational graphics resistant to scratches, water and sun.",
    price: 0,
    image: "/images/items/cool_stickers.jpg",
    highlights: ["Waterproof & UV Resistant","Matte Laminated Vinyl","Residue-Free Adhesive"],
  },
  {
    _id: "sustainable_diary_bottle_pen",
    slug: "sustainable-diary-bottle-pen",
    name: "Sustainable Diary + Bottle + Pen",
    brand: 'The Gourmet Gifts',
    subCopy: "Curated eco-conscious trio: seed-paper diary, copper bottle and pen.",
    category: "infinity-beyond",
    categoryLabel: "Eternal Paper Co.",
    inside_items: [
      {
            "item": "Plantable Seed Paper Diary",
            "description": "Recycled cotton paper embedded with wildflower seeds."
      },
      {
            "item": "Hand-Crafted Copper Bottle",
            "weight": "650ml",
            "description": "Pure hammered copper bottle."
      },
      {
            "item": "Bamboo Precision Pen",
            "description": "Sustainable bamboo rollerball pen."
      }
],
    packaging_style: "Eco Kraft Presentation Trunk",
    description: "A unified earth-first daily companion set featuring a plantable seed-paper journal, pure designer copper hydration bottle and bamboo ballpoint pen.",
    price: 0,
    image: "/images/items/sustainable_diary_bottle_pen.jpg",
    highlights: ["Plantable Seed Paper","Pure Copper Bottle","Zero Plastic Packaging"],
  },
  {
    _id: "scented_candles",
    slug: "scented-candles",
    name: "Artisanal Scented Candles",
    brand: 'The Gourmet Gifts',
    subCopy: "Hand-poured pure soy wax candle infused with calming botanical oils.",
    category: "decor-spiritual",
    categoryLabel: "Home Fragrance",
    inside_items: [
      {
            "item": "Scented Soy Candle",
            "weight": "220g",
            "description": "Aromatic hand-poured glass candle."
      }
],
    packaging_style: "Gold-Foil Cylindrical Box",
    description: "Slow-burning natural soy wax candle poured in heavy frosted glass with lead-free cotton wick, releasing gentle notes of white tea, amber and bergamot.",
    price: 0,
    image: "/images/items/scented_candles.jpg",
    highlights: ["100% Pure Soy Wax","Botanical Essential Oils","45+ Hours Clean Burn"],
  }
];

export function getHamperBySlug(slug: string): HamperData | undefined {
  return HAMPERS_CATALOG.find((h) => h.slug === slug);
}
