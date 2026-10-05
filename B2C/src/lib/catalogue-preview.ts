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
    subtitle: 'Explore our complete curated gifting collection.',
    image: '/images/items/laddoo_candles.webp',
    borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
    pastelActive: 'bg-[#B0BCA4]',
    pastelHover: 'group-hover:bg-[#EAEFE6]',
  },
  {
    id: 'shagun',
    label: 'Shagun Envelopes',
    subtitle: 'Gold-foiled festive envelopes on handmade paper.',
    image: '/images/items/shagun_envelopes.webp',
    borderRadius: '53% 47% 41% 59% / 68% 66% 34% 32%',
    pastelActive: 'bg-[#F6D07A]',
    pastelHover: 'group-hover:bg-[#FCF0CE]',
  },
  {
    id: 'candles',
    label: 'Laddoo Candles',
    subtitle: 'Hand-sculpted festive motichoor laddoo wax candles.',
    image: '/images/items/laddoo_candles.webp',
    borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
    pastelActive: 'bg-[#E5A87B]',
    pastelHover: 'group-hover:bg-[#FBECE2]',
  },
  {
    id: 'bookmarks',
    label: 'Bookmarks',
    subtitle: 'Artisanal illustrated keepsake bookmarks with silk tassels.',
    image: '/images/items/bookmarks.webp',
    borderRadius: '48% 52% 47% 53% / 58% 46% 54% 42%',
    pastelActive: 'bg-[#988184]',
    pastelHover: 'group-hover:bg-[#E8E2E3]',
  },
  {
    id: 'corporate',
    label: 'Diary & Pen Sets',
    subtitle: 'Executive journal, insulated flask & pen with custom branding.',
    image: '/images/items/sustainable_diary_bottle_pen.webp',
    borderRadius: '55% 45% 60% 40% / 50% 55% 45% 50%',
    pastelActive: 'bg-[#B08968]',
    pastelHover: 'group-hover:bg-[#EDE0D4]',
  },
];

export const HAMPERS_CATALOG: HamperData[] = [
  {
    _id: "shagun_envelopes",
    slug: "shagun-envelopes",
    name: "Luxury Shagun Envelopes",
    brand: "Eternal Paper Co.",
    subCopy: "Regal gold-embossed celebratory shagun envelopes on textured handmade paper.",
    category: "shagun",
    categoryLabel: "Shagun Envelopes",
    inside_items: [
      {
        item: "Gold Foil Shagun Envelopes",
        description: "Handcrafted celebratory envelopes with auspicious foil motifs and elegant string closures."
      }
    ],
    packaging_style: "Artisanal Paper Sleeve with Gilded Ribbon",
    description: "Handcrafted with meticulous care on archival textured cotton-rag paper with gold foil stamping and elegant closures. Perfect for weddings, festive shagun, and cherished family celebrations.",
    price: 499,
    image: "/images/items/shagun_envelopes.webp",
    highlights: ["Gold Foil Detailing", "Textured Cotton-Rag Paper", "Artisanal Handcrafting", "Set of Festive Envelopes"]
  },
  {
    _id: "laddoo_candles",
    slug: "laddoo-candles",
    name: "Artisanal Laddoo Candles",
    brand: "The Gourmet Gifts",
    subCopy: "Hand-poured festive wax candles sculpted like traditional golden motichoor laddoos.",
    category: "candles",
    categoryLabel: "Laddoo Candles",
    inside_items: [
      {
        item: "Motichoor Laddoo Candles (Set of 9)",
        description: "Meticulously sculpted festive candles with realistic boondi texture, pistachio bits, and silver foil accents."
      }
    ],
    packaging_style: "Rigid Ivory & Gold Silk-Lined Gift Box with Tassel",
    description: "Capturing the warmth and delight of Indian festivities, these whimsical yet regal candles are sculpted to look like freshly made golden motichoor laddoos, complete with silver vark accents and delicate wicks. Presented in an ivory and gold silk-lined gift box.",
    price: 799,
    image: "/images/items/laddoo_candles.webp",
    highlights: ["Pure Soy Wax Blend", "Realistic Motichoor Texture", "Festive Gift Box Packaging", "Subtle Festive Fragrance"]
  },
  {
    _id: "bookmarks",
    slug: "bookmarks",
    name: "Handcrafted Artisanal Bookmarks",
    brand: "Eternal Paper Co.",
    subCopy: "Intricately illustrated keepsake bookmarks with silk tassels and gold foil details.",
    category: "bookmarks",
    categoryLabel: "Bookmarks",
    inside_items: [
      {
        item: "Artisanal Keepsake Bookmarks",
        description: "Illustrated foil-stamped bookmarks with braided silk tassels."
      }
    ],
    packaging_style: "Protective Keepsake Folder",
    description: "A thoughtful companion for avid readers and thinkers. Handcrafted on heavy archival paper with heritage motifs, gilded edges, and braided silk tassels.",
    price: 349,
    image: "/images/items/bookmarks.webp",
    highlights: ["Archival Textured Board", "Handmade Silk Tassel", "Gold Gilded Accents", "Collector's Gift Edition"]
  },
  {
    _id: "diary_bottle_pen_set",
    slug: "diary-bottle-pen-set",
    name: "Diary, Bottle & Pen Set (With Custom Branding)",
    brand: "The Gourmet Gifts Bespoke",
    subCopy: "Bespoke corporate gifting trio featuring a vegan leather notebook, insulated bottle, and metal pen with personalized logo branding.",
    category: "corporate",
    categoryLabel: "Executive Sets",
    inside_items: [
      {
        item: "Executive Hardcover Diary",
        description: "Premium lined journal with bookmark ribbon and elastic band."
      },
      {
        item: "Insulated Temperature Bottle",
        description: "Matte stainless steel flask with precision laser-engraved branding."
      },
      {
        item: "Precision Metal Pen",
        description: "Weighted metal ballpoint pen in brushed matte finish."
      }
    ],
    packaging_style: "Matte Black & Gold Executive Gift Box with Custom Foam Inlay",
    description: "An executive gift collection tailored for corporate milestones, esteemed clients, and personal gifting. Includes a hardcover executive notebook diary, a sleek matte temperature-retaining bottle, and a precision brass metal pen—all customizable with your company logo or personalized name engraving.",
    price: 1499,
    image: "/images/items/sustainable_diary_bottle_pen.webp",
    highlights: ["Custom Logo Branding Available", "Matte Insulated Steel Bottle", "Hardcover Executive Journal", "Precision Metal Pen", "Luxury Gift Box Presentation"]
  }
];
