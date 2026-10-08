import { HAMPERS_CATALOG } from './catalogue-preview';
import type { Product } from './types';

export const giftingEmail = 'hello@thegourmetgifts.co';

export function giftingEnquiry(name: string, request = 'Please share pricing, availability and delivery details.') {
  return `mailto:${giftingEmail}?subject=${encodeURIComponent(`Gifting enquiry — ${name}`)}&body=${encodeURIComponent(`Hello The Gourmet Gifts,\n\nI'm interested in ${name}.\n${request}\n\nQuantity:\nOccasion / required date:\nDelivery city:`)}`;
}

type StoryItem = { title: string; description: string; image?: string; alt?: string };

// Editorial observations from the supplied photos, not a saleable bundle definition.
// Final quantities, substitutions and pack sizes must be confirmed by the team.
const photographedContentsMap: Record<string, StoryItem[]> = {
  'ivory-hamper': [
    { title: 'The 1970 Shop Thekua', description: 'A Bihari favourite. For a familiar flavour with a little nostalgia.', image: '/images/pics/thekuap.webp', alt: 'The 1970 Shop Thekua tin beside a bowl of thekua' },
    { title: 'Chilli Cheese Bhujia', description: 'Bombay Sweet Shop. A playful, savoury counterpoint.', image: '/images/pics/bhujia.webp', alt: 'Bombay Sweet Shop Chilli Cheese Bhujia' },
    { title: 'Laddoo candles', description: 'The Gourmet Gifts. A festive favourite, reimagined as a keepsake.' },
    { title: 'Illustrated bookmarks', description: 'Eternal Paper Co. A small detail they can come back to.' },
    { title: 'Farmley dry fruits sachet', description: 'Farmley. Something to open, share and savour.' },
  ],
  'india-hamper': [
    { title: 'The 1970 Shop Thekua', description: 'A Bihari favourite. For a familiar flavour with a little nostalgia.', image: '/images/pics/thekuap.webp', alt: 'The 1970 Shop Thekua tin beside a bowl of thekua' },
    { title: 'Chilli Cheese Bhujia', description: 'Bombay Sweet Shop. A playful, savoury counterpoint.', image: '/images/pics/bhujia.webp', alt: 'Bombay Sweet Shop Chilli Cheese Bhujia' },
    { title: 'Chitale Bakarwadi', description: 'Shown in the photographed curation. A savoury bite to open and share.' },
    { title: 'Makhana', description: 'Shown in the photographed curation. A light snack for a little pause.' },
    { title: 'Café Niloufer tea', description: 'Shown in the photographed curation. For the comfort of a good cup.' },
    { title: 'Illustrated bookmarks', description: 'Eternal Paper Co. A small detail they can come back to.' },
  ],
};

export function productEditorial(product: Product) {
  const local = HAMPERS_CATALOG.find(item => item.slug === product.slug);
  const isHamper = product.categories?.some(category => category.slug === 'hampers') || false;
  const isPhotographedHamper = ['ivory-hamper', 'india-hamper'].includes(product.slug);
  const short = typeof product.description === 'string' ? product.description : product.description?.short || '';
  const long = typeof product.description === 'string' ? '' : product.description?.long || '';
  const story: StoryItem[] = isPhotographedHamper ? (photographedContentsMap[product.slug] || []) : (local?.inside_items.map((item, index) => ({
    title: item.item,
    description: item.description,
    // Don't illustrate an individual item with a different product's photograph.
    image: local.inside_items.length === 1 && index === 0 ? local.image : undefined,
    alt: item.item,
  })) || []);

  return {
    isHamper,
    isPhotographedHamper,
    eyebrow: isHamper ? 'Curated gift hamper' : product.categoryLabel || 'The gifting collection',
    occasion: isHamper ? 'Festive moments · Thank-yous · Celebrations' : local?.category === 'shagun' ? 'Weddings · Festivities · Family celebrations' : local?.category === 'corporate' ? 'Teams · Clients · Milestones' : 'Little gestures · Lasting memories',
    description: product.slug === 'ivory-hamper'
      ? 'Familiar flavours and little keepsakes, brought together in an ivory box made for a thoughtful gesture.'
      : product.slug === 'india-hamper'
        ? 'A celebration of familiar Indian flavours, in a presentation made to be remembered.'
        : product.giftItemId === 'laddoo_candles' ? 'Hand-poured laddoo candles in an ivory and gold gift box.' : short,
    long,
    story,
    contents: isPhotographedHamper
      ? product.slug === 'ivory-hamper'
        ? 'The photographed curation features Thekua, Chilli Cheese Bhujia, laddoo candles, illustrated bookmarks and a Farmley dry fruits sachet. Confirm the final selection, pack sizes and quantities with our team.'
        : 'The photographed curation features Thekua, Chilli Cheese Bhujia, Chitale Bakarwadi, makhana, Café Niloufer tea and illustrated bookmarks. Confirm the final selection, pack sizes and quantities with our team.'
      : local?.inside_items.map(item => item.item).join(' · ') || long || short,
    packaging: isPhotographedHamper
      ? product.slug === 'ivory-hamper' ? 'Illustrated ivory presentation box.' : 'India presentation box, photographed in burgundy and lavender. Ask us about your preferred colour.'
      : local?.packaging_style,
  };
}
