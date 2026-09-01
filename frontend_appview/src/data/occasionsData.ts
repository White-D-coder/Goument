export interface ValuePillar {
  title: string;
  description: string;
  iconName: string;
}

export interface OccasionMoment {
  title: string;
  iconName: string;
}

export interface BudgetTier {
  range: string;
  description: string;
  iconName: string;
}

export interface ProductMixItem {
  name: string;
  image: string;
}

export interface CuratedConcept {
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface CustomizationFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStepItem {
  step: string;
  title: string;
  description: string;
}

export interface OccasionPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;

  // Section 2: What It Solves
  solvesTitle: string;
  solvesSubtitle: string;
  pillars: ValuePillar[];

  // Section 3: Moments Grid
  momentsTitle: string;
  moments: OccasionMoment[];

  // Section 4: Budget Tiers
  budgetTiers: BudgetTier[];

  // Section 5: Recommended Product Mix
  categoryIds?: string[];
  productMix?: ProductMixItem[];

  // Section 6: Curated Concepts
  curatedConcepts: CuratedConcept[];

  // Section 7: Make It Uniquely Yours
  customizationFeatures: CustomizationFeature[];

  // Section 8: Hassle-free 5 Steps
  processSteps: ProcessStepItem[];
}

export const OCCASIONS_DATA: Record<string, OccasionPageData> = {
  'employee-gifting': {
    slug: 'employee-gifting',
    metaTitle: 'Employee Gifting — The Gourmet Gifts',
    metaDescription: 'Celebrate your people with premium, thoughtful corporate gifts that inspire, engage and make every milestone memorable.',
    title: 'Employee Gifting',
    tagline: 'Thoughtful gifts. Stronger teams. Lasting impact.',
    description: 'Celebrate your people with premium, thoughtful gifts that inspire, engage and make every milestone memorable.',
    heroImage: '/cards/employeecard.png',

    solvesTitle: 'What Employee Gifting Solves',
    solvesSubtitle: 'Great teams are built on appreciation, recognition and connection. Our employee gifting solutions help you strengthen relationships, boost morale and celebrate every moment that matters.',
    pillars: [
      {
        title: 'Boosts Engagement',
        description: 'Recognize achievements and inspire your teams to perform at their highest potential.',
        iconName: 'Sparkles',
      },
      {
        title: 'Builds Loyalty',
        description: 'Make your people feel valued, seen, and genuinely connected to the company mission.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Reinforces Culture',
        description: 'Celebrate your core values through authentic, thoughtfully crafted shared experiences.',
        iconName: 'Building',
      },
      {
        title: 'Drives Impact',
        description: 'Motivated, appreciated teams deliver measurable results and stronger business outcomes.',
        iconName: 'TrendingUp',
      },
    ],

    momentsTitle: 'Perfect For Every Workplace Moment',
    moments: [
      { title: 'Employee Appreciation', iconName: 'Heart' },
      { title: 'Work Anniversaries', iconName: 'Calendar' },
      { title: 'Milestones', iconName: 'Trophy' },
      { title: 'Remote Employee Gifts', iconName: 'Home' },
      { title: 'Employee Birthdays', iconName: 'Cake' },
      { title: 'Festive Employee Gifting', iconName: 'Sparkles' },
      { title: 'Leadership Gifting', iconName: 'Crown' },
      { title: 'Team Celebrations', iconName: 'Users' },
    ],

    budgetTiers: [
      {
        range: 'Under ₹999',
        description: 'Thoughtful & delightful gifts that make an immediate impact.',
        iconName: 'Wallet',
      },
      {
        range: '₹999 – ₹1,499',
        description: 'Premium picks for everyday appreciation and high-frequency gifting.',
        iconName: 'Gift',
      },
      {
        range: '₹1,499 – ₹2,499',
        description: 'Curated favourites for special promotions and quarterly awards.',
        iconName: 'Award',
      },
      {
        range: '₹2,499+',
        description: 'Luxury bespoke keepsakes for unforgettable executive impressions.',
        iconName: 'Gem',
      },
    ],

    categoryIds: [
      'office-travel-bags',
      'stationery-desk',
      'electronics-audio',
      'gourmet-food',
      'beverages',
      'corporate-apparel',
      'personalisation',
      'wellness-lifestyle',
    ],

    curatedConcepts: [
      {
        name: 'The Everyday Essential',
        tagline: 'Motivation Redefined',
        description: 'Practical, premium and perfect for everyday workplace motivation.',
        image: '/images/boxes/box_1.png',
      },
      {
        name: 'Well Done',
        tagline: 'Recognition Suite',
        description: 'Celebrate individual and team achievements with elegance and thoughtfulness.',
        image: '/images/boxes/box_2.png',
      },
      {
        name: 'The Team Box',
        tagline: 'Connection & Cheer',
        description: 'Curated for teams to connect, celebrate, and thrive together.',
        image: '/images/boxes/box_3.png',
      },
      {
        name: 'Leadership Edition',
        tagline: 'Executive Calibre',
        description: 'Substantial, heirloom gifts for leaders who inspire excellence.',
        image: '/images/boxes/box_4.png',
      },
    ],

    customizationFeatures: [
      {
        title: 'Logo & Branding',
        description: 'Precision engraving, foil embossing, and screen printing on every gift item.',
        iconName: 'BadgeCheck',
      },
      {
        title: 'Personalised Notes',
        description: 'Custom message cards with handwritten aesthetics on luxury linen cardstock.',
        iconName: 'FileText',
      },
      {
        title: 'Custom Packaging',
        description: 'Bespoke box sleeves, belly bands, ribbon seals, and pantone-matched boxes.',
        iconName: 'Package',
      },
      {
        title: 'Curated Selections',
        description: 'Handpick items that seamlessly reflect your corporate values and theme.',
        iconName: 'Sliders',
      },
      {
        title: 'Bulk Gifting Support',
        description: 'Dedicated concierge managers and multi-city address spreadsheet uploads.',
        iconName: 'Truck',
      },
    ],

    processSteps: [
      {
        step: '1',
        title: 'Share Your Requirements',
        description: 'Tell us your occasion, headcount, budget and required delivery date.',
      },
      {
        step: '2',
        title: 'We Curate Concepts',
        description: 'Receive 3 customized gifting concepts with digital mockups within 24 hours.',
      },
      {
        step: '3',
        title: 'Approve & Personalise',
        description: 'Review physical samples or digital renders and finalize custom branding.',
      },
      {
        step: '4',
        title: 'We Prepare & Pack',
        description: 'Expert hand-assembly, multi-point QC inspections, and secure transit packaging.',
      },
      {
        step: '5',
        title: 'Delivered With Delight',
        description: 'Coordinated door-to-door pan-India delivery with live dispatch tracking.',
      },
    ],
  },

  'onboarding-kits': {
    slug: 'onboarding-kits',
    metaTitle: 'Onboarding Kits — The Gourmet Gifts',
    metaDescription: 'Make Day One feel like Day One with welcoming employee welcome kits.',
    title: 'Onboarding Kits',
    tagline: 'Make Day One feel like Day One.',
    description: 'Transform new hire excitement into long-term belonging with welcome kits that impress from the moment they unbox.',
    heroImage: '/cards/employeecard.png',

    solvesTitle: 'What Welcoming Onboarding Solves',
    solvesSubtitle: 'A memorable first impression accelerates team integration, instills brand pride, and reduces early-stage turnover.',
    pillars: [
      { title: 'Accelerates Belonging', description: 'Make new hires feel warmly welcomed before their first morning meeting.', iconName: 'Sparkles' },
      { title: 'Instills Brand Pride', description: 'High-utility branded gear that employees proudly showcase every day.', iconName: 'Building' },
      { title: 'Simplifies HR Logistics', description: 'Zero-touch packaging and automated remote address dispatch.', iconName: 'Truck' },
      { title: 'Day One Excitement', description: 'Turn unboxing into an Instagram and LinkedIn shareable celebration.', iconName: 'TrendingUp' },
    ],

    momentsTitle: 'Tailored for Every New Team Member',
    moments: [
      { title: 'New Hire Day 1', iconName: 'Calendar' },
      { title: 'Remote Welcome Packs', iconName: 'Home' },
      { title: 'Intern Welcome Kits', iconName: 'Users' },
      { title: 'Executive Induction', iconName: 'Crown' },
      { title: 'Campus Hires', iconName: 'Award' },
      { title: 'Tech Equipment Packs', iconName: 'Laptop' },
      { title: 'Sales Rep Starter Sets', iconName: 'Trophy' },
      { title: 'Global Relocation Packs', iconName: 'Globe' },
    ],

    budgetTiers: [
      { range: 'Under ₹1,199', description: 'Essential stationery & drinkware starter packs.', iconName: 'Wallet' },
      { range: '₹1,199 – ₹1,999', description: 'Complete kits with notebook, bottle & treats.', iconName: 'Gift' },
      { range: '₹1,999 – ₹3,499', description: 'Premium backpacks, tech sleeves & gourmet snacks.', iconName: 'Award' },
      { range: '₹3,499+', description: 'Executive suites with luxury accessories & ANC headphones.', iconName: 'Gem' },
    ],

    categoryIds: [
      'office-travel-bags',
      'stationery-desk',
      'electronics-audio',
      'corporate-apparel',
      'beverages',
      'gourmet-food',
      'personalisation',
      'wellness-lifestyle',
    ],

    curatedConcepts: [
      { name: 'The Day One Classic', tagline: 'Everyday Essentials', description: 'Notebook, matte tumbler, pen, and energizing dark chocolate.', image: '/images/boxes/box_1.png' },
      { name: 'Remote Starter', tagline: 'Home Office Ready', description: 'Noise isolating headset, desk organizer, and specialty drip coffee.', image: '/images/boxes/box_2.png' },
      { name: 'Tech Pioneer', tagline: 'Engineered For Focus', description: 'Wireless charging dock, braided cables, and ergonomic accessories.', image: '/images/boxes/box_3.png' },
      { name: 'Director Suite', tagline: 'C-Level Induction', description: 'Handmade leather folios, brass accents, and rare single estate teas.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Branded Swag', description: 'Logo matching across apparel, bottles, and stationery.', iconName: 'BadgeCheck' },
      { title: 'Welcome Letters', description: 'Personalized letters signed by department leaders.', iconName: 'FileText' },
      { title: 'Custom Boxes', description: 'Rigid magnetic boxes with company motto inside lid.', iconName: 'Package' },
      { title: 'Pre-Packaged Sets', description: 'Ready to ship from our fulfillment centers on demand.', iconName: 'Sliders' },
      { title: 'Remote Logistics', description: 'Single-item dispatch directly to employee residences.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Provide new hire cohorts, headcount, and onboarding schedule.' },
      { step: '2', title: 'We Curate Concepts', description: 'We design tailored kit options with 3D product previews.' },
      { step: '3', title: 'Approve & Personalise', description: 'Confirm branding, custom sleeves, and personal inserts.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Kits are inventoried and assembled with precision quality control.' },
      { step: '5', title: 'Delivered With Delight', description: 'Scheduled dispatch to arrive 2 days before official joining date.' },
    ],
  },

  'client-gifting': {
    slug: 'client-gifting',
    metaTitle: 'Client Gifting — The Gourmet Gifts',
    metaDescription: 'Stay remembered after the meeting with executive client gifts and bespoke packaging.',
    title: 'Client Gifting',
    tagline: 'Stay remembered after the meeting.',
    description: 'Nurture high-value partnerships with luxury keepsake hampers that leave an indelible mark of distinction.',
    heroImage: '/cards/clientcard.png',

    solvesTitle: 'What Client Gifting Solves',
    solvesSubtitle: 'Stand out from generic corporate swag with high-calibre artisanal hampers that reinforce executive relationships.',
    pillars: [
      { title: 'Strengthens Retention', description: 'Keep your firm top-of-mind across decision-making cycles.', iconName: 'HeartHandshake' },
      { title: 'Celebrates Wins', description: 'Commemorate deal closures, annual reviews, and key milestones.', iconName: 'Trophy' },
      { title: 'Demonstrates Taste', description: 'Convey institutional sophistication with rare artisanal selections.', iconName: 'Crown' },
      { title: 'Builds Reciprocity', description: 'Thoughtful appreciation deepens interpersonal trust and collaboration.', iconName: 'TrendingUp' },
    ],

    momentsTitle: 'Curated for Key Relationship Milestones',
    moments: [
      { title: 'Deal Closures', iconName: 'Trophy' },
      { title: 'Annual Retainer Thanks', iconName: 'Calendar' },
      { title: 'Festive Client Greetings', iconName: 'Sparkles' },
      { title: 'Board Appreciations', iconName: 'Crown' },
      { title: 'Quarterly Reviews', iconName: 'TrendingUp' },
      { title: 'VIP Relationship Gifts', iconName: 'Award' },
      { title: 'Apology & Concierge', iconName: 'Heart' },
      { title: 'Executive Welcome', iconName: 'Building' },
    ],

    budgetTiers: [
      { range: 'Under ₹1,499', description: 'Signature confections and premium roast coffee sets.', iconName: 'Wallet' },
      { range: '₹1,499 – ₹2,499', description: 'Handmade leather vessels with imported delicacies.', iconName: 'Gift' },
      { range: '₹2,499 – ₹4,999', description: 'Exclusive wooden chests with heirloom brass keepsakes.', iconName: 'Award' },
      { range: '₹4,999+', description: 'Ultra-luxury bespoke curations for top tier clients.', iconName: 'Gem' },
    ],

    categoryIds: [
      'gourmet-food',
      'beverages',
      'decor-spiritual',
      'office-travel-bags',
      'personalisation',
      'infinity-beyond',
      'wellness-lifestyle',
      'awards-recognition',
    ],

    curatedConcepts: [
      { name: 'The Sovereign Chest', tagline: 'Understated Elegance', description: 'Solid wood keepsake box, roasted saffron nuts, and aged balsamic glaze.', image: '/images/boxes/box_1.png' },
      { name: 'The Diplomat', tagline: 'Executive Distinction', description: 'Hand-stitched vegan leather organizer paired with artisanal Belgian truffles.', image: '/images/boxes/box_2.png' },
      { name: 'Reserve Botanicals', tagline: 'Artisanal Indulgence', description: 'Single-estate loose leaf teas, brass infuser, and wild forest honey.', image: '/images/boxes/box_3.png' },
      { name: 'The Grand Ambassador', tagline: 'Unmatched Grandeur', description: 'Our most expansive celebratory hamper with personalized client initials.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Subtle Monograms', description: 'Discreet gold foil or blind embossed recipient monograms.', iconName: 'BadgeCheck' },
      { title: 'Executive Lettering', description: 'Letterpress printed appreciation notes on handmade deckle paper.', iconName: 'FileText' },
      { title: 'Custom Ribboning', description: 'Satin & grosgrain ribbons woven to your firm’s brand guidelines.', iconName: 'Package' },
      { title: 'Dietary Customization', description: 'Vegetarian, gluten-free, and sugar-conscious curated options.', iconName: 'Sliders' },
      { title: 'Direct Delivery', description: 'White-glove courier delivery straight to CXO office desks.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Tell us client tier sizes, preferred themes, and dispatch dates.' },
      { step: '2', title: 'We Curate Concepts', description: 'Review 3 luxury proposals tailored to your brand standards.' },
      { step: '3', title: 'Approve & Personalise', description: 'Inspect box finish, monogram placement, and personalized cards.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Hand-ribboned, sealed with wax crests, and packaged in protective transit outers.' },
      { step: '5', title: 'Delivered With Delight', description: 'Direct doorstep delivery across Mumbai, Delhi, Bengaluru, and pan-India.' },
    ],
  },
};

// Category mapping helper for dynamic occasion pages
const OCCASION_CATEGORY_MAP: Record<string, string[]> = {
  'festive-gifting': ['gourmet-food', 'decor-spiritual', 'beverages', 'personalisation', 'wellness-lifestyle', '3d-miniatures', 'infinity-beyond'],
  'weddings-celebrations': ['decor-spiritual', 'gourmet-food', 'personalisation', '3d-miniatures', 'beverages', 'wellness-lifestyle', 'infinity-beyond'],
  'events-conferences': ['office-travel-bags', 'stationery-desk', 'electronics-audio', 'corporate-apparel', 'gourmet-food', 'beverages', 'personalisation', 'awards-recognition'],
  'milestones-recognition': ['awards-recognition', 'office-travel-bags', 'electronics-audio', 'infinity-beyond', 'personalisation', 'gourmet-food', 'wellness-lifestyle', 'stationery-desk'],
  'cx-gifting': ['gourmet-food', 'beverages', 'personalisation', 'wellness-lifestyle', 'decor-spiritual', 'office-travel-bags'],
  'dealer-partner-gifting': ['awards-recognition', 'electronics-audio', 'office-travel-bags', 'gourmet-food', 'beverages', 'decor-spiritual', 'personalisation'],
};

// Hero image mapping helper for dynamic occasion pages
const OCCASION_HERO_IMAGE_MAP: Record<string, string> = {
  'festive-gifting': '/cards/festivecard.png',
  'weddings-celebrations': '/cards/wedding.png',
  'events-conferences': '/cards/events.png',
  'milestones-recognition': '/cards/milestones.png',
  'cx-gifting': '/cards/cx.png',
  'dealer-partner-gifting': '/cards/dealer.png',
};

// Fallback generator for other categories ensuring seamless support
const DEFAULT_OCCASION = OCCASIONS_DATA['employee-gifting'];

export const getOccasionData = (slug: string): OccasionPageData => {
  if (OCCASIONS_DATA[slug]) {
    return OCCASIONS_DATA[slug];
  }

  const titles: Record<string, string> = {
    'festive-gifting': 'Festive Gifting',
    'weddings-celebrations': 'Weddings & Celebrations',
    'events-conferences': 'Events & Conferences',
    'milestones-recognition': 'Milestones & Recognition',
    'cx-gifting': 'CX Gifting',
    'dealer-partner-gifting': 'Dealer & Partner Gifting',
  };

  const name = titles[slug] || slug.replace(/-/g, ' ').toUpperCase();

  return {
    ...DEFAULT_OCCASION,
    slug,
    metaTitle: `${name} — The Gourmet Gifts`,
    metaDescription: `Bespoke ${name} solutions with artisanal curations and luxury packaging.`,
    title: name,
    tagline: `Thoughtfully curated ${name.toLowerCase()} for meaningful impact.`,
    description: `Elevate your ${name.toLowerCase()} with bespoke keepsake boxes, gourmet delicacies, and white-glove corporate fulfillment.`,
    heroImage: OCCASION_HERO_IMAGE_MAP[slug] || DEFAULT_OCCASION.heroImage,
    categoryIds: OCCASION_CATEGORY_MAP[slug] || DEFAULT_OCCASION.categoryIds,
  };
};
