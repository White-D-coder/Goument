export type InsideItem = { name: string; place: string; why: string };
export type ContentsSlide = { name: string; image: string; alt: string; href: string; items: InsideItem[] };
export type Testimonial = { quote: string; name: string; context?: string; logo?: string };

// Regions describe culinary traditions from the supplied brief, not manufacturing certificates.
export const flavourStories = [
  { name: 'Thekua', place: 'A Bihari favourite', image: '/images/pics/thekuap.webp', alt: 'The 1970 Shop Thekua tin and a bowl of thekua', copy: 'A crisp bite, familiar flavours and a little nostalgia.' },
  { name: 'Chilli Cheese Bhujia', place: 'A Mumbai-inspired twist', image: '/images/pics/bhujia.webp', alt: 'Bombay Sweet Shop Chilli Cheese Bhujia', copy: 'A playful savoury note from Bombay Sweet Shop.' },
  { name: 'Tea, worth a pause', place: 'Assam to Hyderabad', image: '/images/pics/blendedtea.webp', alt: 'Café Niloufer blended tea', copy: 'The comfort of a good cup, made for slow conversations.' },
];

// A photo-led preview, not the final contents/quantities contract.
export const ivoryInside: InsideItem[] = [
  { name: 'The 1970 Shop Thekua', place: 'A Bihari favourite', why: 'For a familiar flavour with a little nostalgia.' },
  { name: 'Chilli Cheese Bhujia', place: 'Bombay Sweet Shop', why: 'A playful, savoury counterpoint.' },
  { name: 'Laddoo candles', place: 'The Gourmet Gifts', why: 'A festive favourite, reimagined as a keepsake.' },
  { name: 'Illustrated bookmarks', place: 'Eternal Paper Co.', why: 'A small detail they can come back to.' },
  { name: 'Farmley dry fruits sachet', place: 'Farmley', why: 'Something to open, share and savour.' },
];

// Existing India PDP observations; colour variants share one hamper identity.
const indiaInside: InsideItem[] = [
  ivoryInside[0],
  ivoryInside[1],
  { name: 'Chitale Bakarwadi', place: 'Shown in the photographed curation', why: 'A savoury bite to open and share.' },
  { name: 'Makhana', place: 'Shown in the photographed curation', why: 'A light snack for a little pause.' },
  { name: 'Café Niloufer tea', place: 'Shown in the photographed curation', why: 'For the comfort of a good cup.' },
  ivoryInside[3],
];

export const contentsSlides: ContentsSlide[] = [
  { name: 'Ivory Hamper', image: '/images/brand/ivory_hamper.webp', alt: 'Photographed Ivory Hamper with gourmet treats and keepsakes', href: '/products/ivory-hamper', items: ivoryInside },
  { name: 'India Hamper · Burgundy', image: '/images/brand/burgundy_india_hamper.webp', alt: 'Photographed India Hamper in burgundy', href: '/products/india-hamper', items: indiaInside },
  { name: 'India Hamper · Lavender', image: '/images/brand/lavender_india_hamper.webp', alt: 'Photographed India Hamper in lavender', href: '/products/india-hamper', items: indiaInside },
];

// Populate only with approved endorsements; demo/Unsplash quotes are not customer proof.
export const approvedTestimonials: Testimonial[] = [];

export const homeFAQs = [
  { question: 'What can I find at The Gourmet Gifts?', answer: 'Curated hampers, laddoo candles, Shagun envelopes and thoughtful stationery. Explore our hampers or browse a collection to find your gift.' },
  { question: 'How do I choose a hamper?', answer: 'Start with the person and the occasion. Each hamper page shows the gift, its photographed contents and the available details. Our team can help you choose.' },
  { question: 'Can I include a personal message?', answer: 'Open your chosen gift’s page and use the gift-note enquiry to request a personal message. Our team will confirm the available options and any charges.' },
  { question: 'Why do some hampers show pricing on enquiry?', answer: 'Prices and availability for those curations are confirmed by our team. Open the gift page to request the current details. Gifts with an existing catalogue price show that amount directly.' },
  { question: 'Do you help with corporate gifting?', answer: 'Yes. Use Explore Corporate Gifting to discuss gifts for teams, clients and events, including your quantity, occasion, budget and personalisation needs.' },
  { question: 'How do I check delivery details?', answer: 'Contact our team for availability, timing and charges for your chosen gift and delivery location.' },
];
