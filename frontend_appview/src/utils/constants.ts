export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

export const GIFT_BOX_TYPES = {
  CLASSICS: {
    type: 'classics',
    name: 'The Classics',
    subtitle: 'Timeless luxury treats in signature packaging',
    surcharge: 0,
    heroImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop',
  },
  PREMIUM_VELVET: {
    type: 'premium-velvet',
    name: 'Premium Velvet',
    subtitle: 'Rich velvet chest with gold embossed details',
    surcharge: 499,
    heroImage: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop',
  },
  ROYALE_TIN: {
    type: 'royale-tin',
    name: 'Royale Tin',
    subtitle: 'Ornate heirloom green & gold metallic tin',
    surcharge: 799,
    heroImage: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop',
  },
};

export const DEMO_BESTSELLERS = [
  {
    _id: 'prod_1',
    name: 'The Classics Gift Box',
    slug: 'the-classics-gift-box',
    description: { short: 'Curated selection of raw truffle honey and chocolate bars.' },
    basePrice: 249900, // in paise = ₹2,499
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    category: 'The Classics',
  },
  {
    _id: 'prod_2',
    name: 'Premium Velvet Gift Box',
    slug: 'premium-velvet-gift-box',
    description: { short: 'Velvet gift box with 4 artisanal roasted nut jars.' },
    basePrice: 499900, // in paise = ₹4,999
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop',
    category: 'Premium Velvet',
  },
  {
    _id: 'prod_3',
    name: 'Royale Tin',
    slug: 'royale-tin',
    description: { short: 'Metallic heritage tin with Iranian saffron and pistachios.' },
    basePrice: 329900, // in paise = ₹3,299
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600&auto=format&fit=crop',
    category: 'Royale Tin',
  },
];
