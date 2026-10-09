export const shopCollections = {
  envelopes: {
    title: 'Envelopes',
    href: '/shop/envelopes',
    search: 'envelope',
    description: 'A beautiful beginning to every blessing. Discover our Shagun envelopes for weddings, celebrations and thoughtful gestures.',
    image: '/images/items/shagun_envelopes.webp',
    imageAlt: 'Shagun gift envelopes',
  },
  hampers: {
    title: 'Hampers',
    href: '/shop/hampers',
    search: 'hamper',
    description: 'Thoughtful gifts, beautifully brought together. Explore hampers for celebrations and the people who make them special.',
    image: '/images/brand/ivory_hamper.webp',
    imageAlt: 'Ivory Hamper from The Gourmet Gifts Co.',
  },
  candles: {
    title: 'Scented Candles',
    href: '/shop/candles',
    search: 'candles',
    description: 'Discover festive, hand-finished candles made to bring a little warmth to every occasion.',
    image: '/images/items/laddoo_candles.webp',
    imageAlt: 'Festive motichoor laddoo shaped candles',
  },
  stationery: {
    title: 'Premium Stationery',
    href: '/shop/stationery',
    search: 'stationery',
    description: 'Explore illustrated bookmarks, thoughtful paper details and considered desk gifts from Eternal Paper Co.',
    image: '/images/items/bookmarks.webp',
    imageAlt: 'Illustrated keepsake bookmarks from Eternal Paper Co.',
  },
} as const;

export type ShopCollection = keyof typeof shopCollections;
