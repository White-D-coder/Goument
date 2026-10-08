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
} as const;

export type ShopCollection = keyof typeof shopCollections;
