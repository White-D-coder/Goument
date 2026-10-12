import { BOOKMARK_PHOTOS, BOOKMARK_SHORT_DESCRIPTION, BOOKMARK_DESCRIPTION, BOOKMARK_DESIGNS } from './bookmark-photos';

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
    image: '/images/scented_candle/cn3-supplied.webp',
    borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
    pastelActive: 'bg-[#B0BCA4]',
    pastelHover: 'group-hover:bg-[#EAEFE6]',
  },
  {
    id: 'candles',
    label: 'Laddoo Candles',
    subtitle: 'Hand-sculpted festive motichoor laddoo wax candles.',
    image: '/images/scented_candle/cn3-supplied.webp',
    borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%',
    pastelActive: 'bg-[#E5A87B]',
    pastelHover: 'group-hover:bg-[#FBECE2]',
  },
  {
    id: 'stationery',
    label: 'Premium Stationery',
    subtitle: 'Illustrated bookmarks and considered diary gift sets.',
    image: BOOKMARK_PHOTOS[0].public_id,
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
        item: "Laddoo Candles",
        description: "Orange laddoo-shaped candles with a textured finish."
      }
    ],
    packaging_style: "Individual White Presentation Boxes",
    description: "Laddoo-shaped festive candles, photographed in individual white presentation boxes. Confirm the final quantity and price with our team.",
    price: 799,
    image: "/images/scented_candle/cn3-supplied.webp",
    highlights: ["Laddoo-Inspired Shape", "Textured Finish", "White Presentation Boxes"]
  },
  {
    _id: "bookmarks",
    slug: "bookmarks",
    name: "Handcrafted Artisanal Bookmarks",
    brand: "Eternal Paper Co.",
    subCopy: BOOKMARK_SHORT_DESCRIPTION,
    category: "bookmarks",
    categoryLabel: "Premium Stationery",
    inside_items: [
      {
        item: "Artisanal Keepsake Bookmarks",
        description: BOOKMARK_SHORT_DESCRIPTION
      }
    ],
    packaging_style: "Protective Keepsake Folder",
    description: BOOKMARK_DESCRIPTION,
    price: 349,
    image: BOOKMARK_PHOTOS[0].public_id,
    highlights: ["Rounded Bookmark Shape", "Indian Landscapes", "Heritage-Inspired Patterns", "Floral Artwork"]
  },
  {
    _id: "diary_bottle_pen_set",
    slug: "diary-bottle-pen-set",
    name: "Custom Diary Gift Set",
    brand: "The Gourmet Gifts Bespoke",
    subCopy: "Bespoke corporate gifting trio featuring a vegan leather notebook, insulated bottle, and metal pen with personalized logo branding.",
    category: "corporate",
    categoryLabel: "Premium Stationery",
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
  },
  ...BOOKMARK_DESIGNS.map(design => ({
    _id: design.id, slug: design.slug, name: design.name, brand: 'Eternal Paper Co.',
    subCopy: design.description, category: 'bookmarks', categoryLabel: 'Premium Stationery',
    inside_items: [{ item: design.name, description: design.description }],
    packaging_style: '', description: design.description, price: 349, image: design.image,
    highlights: [],
  })),
];
