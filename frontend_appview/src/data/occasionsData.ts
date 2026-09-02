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
  primaryCta?: string;
  secondaryCta?: string;
  trustPoints?: string[];

  // Section 2: Why Thoughtful Gifting Matters
  solvesTitle: string;
  solvesSubtitle?: string;
  pillars: ValuePillar[];

  // Section 3: Moments Grid
  momentsTitle: string;
  momentsSubtitle?: string;
  moments: OccasionMoment[];

  // Section 4: Budget Tiers
  budgetTitle?: string;
  budgetSubtitle?: string;
  budgetTiers: BudgetTier[];

  // Section 5: Not Sure What to Gift
  notSureTitle?: string;
  notSureDescription?: string;

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
    tagline: 'For the people who make the company what it is.',
    description: 'Onboarding. Milestones. Recognition. Festivals. Everyday appreciation. We thoughtfully curate each gifting experience around the recipient, the occasion and your brand — so it feels personal, useful and worth remembering.',
    heroImage: '/cards/employeecard.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE EMPLOYEE GIFTING',
    trustPoints: ['Thoughtful Curation', 'Brand Personalisation', 'End-to-End Execution'],

    solvesTitle: 'Why Thoughtful Employee Gifting Matters',
    solvesSubtitle: '',
    pillars: [
      {
        title: 'Makes People Feel Valued',
        description: 'Celebrate contributions, milestones and everyday wins with gifts that feel considered — not obligatory.',
        iconName: 'Heart',
      },
      {
        title: 'Builds Genuine Connection',
        description: 'Thoughtful gifting creates warmer relationships between employees, teams and the organisation they are part of.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Brings Culture to Life',
        description: 'Turn your values into something tangible through gifting experiences curated around your people and your brand.',
        iconName: 'Building',
      },
      {
        title: 'Makes Moments Memorable',
        description: 'From a first day to a five-year milestone, the right gift can turn an ordinary company moment into one people remember.',
        iconName: 'Sparkles',
      },
    ],

    momentsTitle: 'Curated For Every Employee Moment',
    momentsSubtitle: '',
    moments: [
      { title: 'Welcome & Onboarding', iconName: 'Users' },
      { title: 'Employee Appreciation', iconName: 'Heart' },
      { title: 'Work Anniversaries', iconName: 'Calendar' },
      { title: 'Milestones & Achievements', iconName: 'Trophy' },
      { title: 'Birthdays & Personal Moments', iconName: 'Cake' },
      { title: 'Festive Gifting', iconName: 'Sparkles' },
      { title: 'Leadership/Executive Gifting', iconName: 'Crown' },
      { title: 'Team Celebrations', iconName: 'Users' },
    ],

    budgetTitle: 'Thoughtfully Curated Around Your Budget',
    budgetSubtitle: '',
    budgetTiers: [
      {
        range: 'Up to ₹999',
        description: 'Thoughtful essentials & everyday appreciation',
        iconName: 'Wallet',
      },
      {
        range: '₹1,000 – ₹1,499',
        description: 'Elevated employee gifting',
        iconName: 'Gift',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Premium curated experiences',
        iconName: 'Award',
      },
      {
        range: '₹2,500+',
        description: 'Signature & bespoke gifting',
        iconName: 'Gem',
      },
    ],

    curatedConcepts: [
      { name: 'The Everyday Essential', tagline: 'Motivation Redefined', description: 'Practical, premium and perfect for everyday workplace motivation.', image: '/images/boxes/box_1.png' },
      { name: 'Well Done', tagline: 'Recognition Suite', description: 'Celebrate individual and team achievements with elegance and thoughtfulness.', image: '/images/boxes/box_2.png' },
      { name: 'The Team Box', tagline: 'Connection & Cheer', description: 'Curated for teams to connect, celebrate, and thrive together.', image: '/images/boxes/box_3.png' },
      { name: 'Leadership Edition', tagline: 'Executive Calibre', description: 'Substantial, heirloom gifts for leaders who inspire excellence.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Logo & Branding', description: 'Precision engraving, foil embossing, and screen printing on every gift item.', iconName: 'BadgeCheck' },
      { title: 'Personalised Notes', description: 'Custom message cards with handwritten aesthetics on luxury linen cardstock.', iconName: 'FileText' },
      { title: 'Custom Packaging', description: 'Bespoke box sleeves, belly bands, ribbon seals, and pantone-matched boxes.', iconName: 'Package' },
      { title: 'Curated Selections', description: 'Handpick items that seamlessly reflect your corporate values and theme.', iconName: 'Sliders' },
      { title: 'Bulk Gifting Support', description: 'Dedicated concierge managers and multi-city address spreadsheet uploads.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Tell us your occasion, headcount, budget and required delivery date.' },
      { step: '2', title: 'We Curate Concepts', description: 'Receive 3 customized gifting concepts with digital mockups within 24 hours.' },
      { step: '3', title: 'Approve & Personalise', description: 'Review physical samples or digital renders and finalize custom branding.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Expert hand-assembly, multi-point QC inspections, and secure transit packaging.' },
      { step: '5', title: 'Delivered With Delight', description: 'Coordinated door-to-door pan-India delivery with live dispatch tracking.' },
    ],
  },

  'client-gifting': {
    slug: 'client-gifting',
    metaTitle: 'Client Gifting — The Gourmet Gifts',
    metaDescription: 'Be remembered for more than the business you do. Thoughtfully curated gifting for clients, partners and key relationships.',
    title: 'Client Gifting',
    tagline: 'Be remembered for more than the business you do.',
    description: 'Thoughtfully curated gifting for clients, partners and key relationships — designed around who you\'re gifting to, why you\'re gifting and what you want your brand to leave behind.',
    heroImage: '/cards/clientcard.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE CLIENT GIFTING',
    trustPoints: ['Curated Around the Recipient', 'Customised to Your Brand', 'Handled End-to-End'],

    solvesTitle: 'Why Thoughtful Client Gifting Matters',
    solvesSubtitle: 'The right gift can strengthen a relationship, mark an important moment and say what a routine email cannot. We curate around who the client is, the occasion, your relationship and your brand — so every gesture feels considered.',
    pillars: [
      {
        title: 'Strengthens Relationships',
        description: 'Show appreciation in a way that feels personal, relevant and genuinely considered.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Marks Important Moments',
        description: 'Celebrate new partnerships, milestones, achievements and shared successes with intention.',
        iconName: 'Trophy',
      },
      {
        title: 'Reflects Your Brand',
        description: 'Every detail — from the products to the packaging — can express the quality and thought behind your business.',
        iconName: 'Building',
      },
      {
        title: 'Keeps You Remembered',
        description: 'A well-curated gift creates a lasting impression without feeling promotional or transactional.',
        iconName: 'Sparkles',
      },
    ],

    momentsTitle: 'Curated For Every Client Moment',
    momentsSubtitle: 'From the first conversation to years of partnership, every relationship gives you a different reason to gift.',
    moments: [
      { title: 'New Client Welcomes', iconName: 'Users' },
      { title: 'Deal Closures & Wins', iconName: 'Trophy' },
      { title: 'Client Milestones', iconName: 'Calendar' },
      { title: 'Festive Gifting', iconName: 'Sparkles' },
      { title: 'Thank You & Appreciation', iconName: 'Heart' },
      { title: 'VIP & Key Relationships', iconName: 'Award' },
      { title: 'Events & Special Occasions', iconName: 'Crown' },
      { title: 'Leadership & Executive Gifting', iconName: 'Building' },
    ],

    budgetTitle: 'Curated Around Your Budget',
    budgetSubtitle: 'Whether it’s a thoughtful gesture for 50 clients or a signature experience for your most important relationships, we curate to make every budget feel intentional.',
    budgetTiers: [
      {
        range: 'Up to ₹1,499',
        description: 'Thoughtful gestures for key client accounts & partners',
        iconName: 'Wallet',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Elevated artisanal sets & executive delights',
        iconName: 'Gift',
      },
      {
        range: '₹2,500 – ₹4,999',
        description: 'Premium curated experiences & signature boxes',
        iconName: 'Award',
      },
      {
        range: '₹5,000+',
        description: 'Ultra-bespoke executive hampers for VIP partnerships',
        iconName: 'Gem',
      },
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

  'festive-gifting': {
    slug: 'festive-gifting',
    metaTitle: 'Festive Gifting — The Gourmet Gifts',
    metaDescription: 'Celebrate the season. Make every gesture feel personal. Thoughtfully curated festive gifting for teams, clients, friends and families.',
    title: 'Festive Gifting',
    tagline: 'Celebrate the season. Make every gesture feel personal.',
    description: 'From teams and clients to families, friends and loved ones, we curate festive gifts around who you’re gifting, the occasion and the feeling you want to create — thoughtfully chosen, beautifully presented and made to be remembered.',
    heroImage: '/cards/festivecard.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE FESTIVE GIFTING',
    trustPoints: ['Thoughtfully Curated', 'Personalised Your Way', 'Delivered End-to-End'],

    solvesTitle: 'Why Thoughtful Festive Gifting Matters',
    solvesSubtitle: 'Festivals are about connection, gratitude and shared moments. The right gift makes those moments feel more personal — whether you\'re celebrating your team, your clients, your family or someone close to you.',
    pillars: [
      {
        title: 'Makes It Personal',
        description: 'A thoughtfully chosen gift feels made for the recipient, rather than picked simply because the occasion demands one.',
        iconName: 'Heart',
      },
      {
        title: 'Strengthens Connections',
        description: 'Festive gifting is a simple way to express appreciation, gratitude and warmth across both personal and professional relationships.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Makes the Occasion Memorable',
        description: 'Thoughtful details, meaningful products and beautiful presentation turn a festive gesture into something worth remembering.',
        iconName: 'Sparkles',
      },
      {
        title: 'Reflects Who You Are',
        description: 'Whether it\'s from a company or a family, the gift can reflect your personality, values, traditions and the sentiment behind it.',
        iconName: 'Building',
      },
    ],

    momentsTitle: 'Curated For Everyone You Celebrate',
    momentsSubtitle: 'One festive season. Many relationships. We curate differently depending on who it\'s for and what you want the gesture to say.',
    moments: [
      { title: 'Employee & Team Gifting', iconName: 'Users' },
      { title: 'Client & Partner Gifting', iconName: 'HeartHandshake' },
      { title: 'Family & Loved Ones', iconName: 'Heart' },
      { title: 'Friends & Personal Gifting', iconName: 'Sparkles' },
      { title: 'Festive Home Visits', iconName: 'Home' },
      { title: 'Hosts & Housewarming Gifts', iconName: 'Gift' },
      { title: 'Premium & VIP Gifting', iconName: 'Crown' },
      { title: 'Large Celebrations & Bulk Gifting', iconName: 'Building' },
    ],

    budgetTitle: 'Thoughtfully Curated Around Your Budget',
    budgetSubtitle: '',
    budgetTiers: [
      {
        range: 'Up to ₹999',
        description: 'Artisanal mithai & celebratory treats',
        iconName: 'Wallet',
      },
      {
        range: '₹1,000 – ₹1,499',
        description: 'Elevated festive boxes with brass diyas & sweets',
        iconName: 'Gift',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Premium curated dry fruit & gourmet hampers',
        iconName: 'Award',
      },
      {
        range: '₹2,500+',
        description: 'Luxury festive trunk & bespoke celebratory crates',
        iconName: 'Gem',
      },
    ],

    curatedConcepts: [
      { name: 'Diwali Splendour', tagline: 'Warmth & Tradition', description: 'Handmade brass diyas, saffron infused sweets, and premium dry fruit selection.', image: '/images/boxes/box_1.png' },
      { name: 'Royal Mithai Box', tagline: 'Gourmet Delicacies', description: 'Artisanal fusion sweets crafted with organic nuts, silver vark and rose petals.', image: '/images/boxes/box_2.png' },
      { name: 'The Celebratory Trunk', tagline: 'Grandeur & Joy', description: 'Luxury vegan leather keepsake chest with gourmet confectionery and festive decor.', image: '/images/boxes/box_3.png' },
      { name: 'The Heritage Hamper', tagline: 'Heirloom Elegance', description: 'Rare origin teas, hand-cast incense holders, and pure wild honey jars.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Festive Sleeves', description: 'Custom foil-stamped holiday bands with your personal greeting.', iconName: 'BadgeCheck' },
      { title: 'Greeting Inserts', description: 'Personalized festival cards customized with recipient names.', iconName: 'FileText' },
      { title: 'Traditional Packaging', description: 'Silk brocade trims, floral garnishes, and brass seal accents.', iconName: 'Package' },
      { title: 'Dietary Selections', description: 'Sugar-free, keto, and vegan festive confections available.', iconName: 'Sliders' },
      { title: 'Pan-India Delivery', description: 'Timely home delivery to families and offices across 500+ cities.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Provide recipient lists, festive occasion, and target delivery dates.' },
      { step: '2', title: 'We Curate Concepts', description: 'Choose from 3 customized concepts tailored to your festive theme.' },
      { step: '3', title: 'Approve & Personalise', description: 'Finalize personal greetings, packaging colors, and custom additions.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Careful batch preparation with freshness sealing and protective transit boxing.' },
      { step: '5', title: 'Delivered With Delight', description: 'Direct doorstep dispatch right on time before the festival begins.' },
    ],
  },

  'events-conferences': {
    slug: 'events-conferences',
    metaTitle: 'Events & Conferences — The Gourmet Gifts',
    metaDescription: 'Make the event memorable beyond the venue. Welcome kits, speaker gifts, attendee keepsakes and event merchandise.',
    title: 'Events & Conferences',
    tagline: 'Make the event memorable beyond the venue.',
    description: 'From welcome kits and speaker gifts to attendee keepsakes and event merchandise, we curate every detail around your audience, event and brand — so the gifting feels like part of the experience, not an afterthought.',
    heroImage: '/cards/events.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE EVENT GIFTING',
    trustPoints: ['Thoughtfully Curated', 'Event-Ready Customisation', 'End-to-End Execution'],

    solvesTitle: 'Why Thoughtful Event Gifting Matters',
    solvesSubtitle: 'The right event gift does more than fill a welcome bag. It becomes part of the experience — something useful, relevant and memorable that continues to represent your event after it ends.',
    pillars: [
      {
        title: 'Creates a Strong First Impression',
        description: 'Thoughtfully curated welcome kits and event essentials set the tone from the moment guests arrive.',
        iconName: 'Sparkles',
      },
      {
        title: 'Keeps Your Brand Remembered',
        description: 'Useful, well-designed gifts continue to create recall long after the event or conference is over.',
        iconName: 'Building',
      },
      {
        title: 'Enhances the Experience',
        description: 'From check-in to take-home, considered gifting makes attendees, speakers and partners feel looked after.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Brings the Event to Life',
        description: 'Products, packaging and personalisation can be curated around your theme, audience and brand story.',
        iconName: 'Trophy',
      },
    ],

    momentsTitle: 'Curated For Every Event Moment',
    momentsSubtitle: 'From the first welcome to the final takeaway, we curate gifts for every audience and touchpoint across your event.',
    moments: [
      { title: 'Attendee Welcome Kits', iconName: 'Users' },
      { title: 'Conference & Delegate Kits', iconName: 'FileText' },
      { title: 'Speaker & Guest Gifting', iconName: 'Award' },
      { title: 'VIP & Leadership Gifts', iconName: 'Crown' },
      { title: 'Exhibitions & Trade Shows', iconName: 'Building' },
      { title: 'Product & Brand Launches', iconName: 'Sparkles' },
      { title: 'Offsites & Corporate Retreats', iconName: 'Home' },
      { title: 'Awards, Galas & Celebrations', iconName: 'Trophy' },
    ],

    budgetTitle: 'Thoughtfully Curated Around Your Budget',
    budgetSubtitle: '',
    budgetTiers: [
      {
        range: 'Up to ₹999',
        description: 'Attendee delegate essentials & welcome bags',
        iconName: 'Wallet',
      },
      {
        range: '₹1,000 – ₹1,499',
        description: 'Elevated kits with notebook, bottle & tech accessories',
        iconName: 'Gift',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Premium speaker & sponsor appreciation sets',
        iconName: 'Award',
      },
      {
        range: '₹2,500+',
        description: 'Signature VIP keepsake boxes & executive hampers',
        iconName: 'Gem',
      },
    ],

    curatedConcepts: [
      { name: 'Delegate Essentials', tagline: 'Conference Ready', description: 'Hardcover journal, premium stylus pen, metal tumbler, and power bank.', image: '/images/boxes/box_1.png' },
      { name: 'Keynote Speaker Box', tagline: 'Distinguished Honour', description: 'Hand-crafted brass keepsake, artisan dry fruits, and custom gratitude plaque.', image: '/images/boxes/box_2.png' },
      { name: 'Summit VIP Hamper', tagline: 'Executive Impact', description: 'Noise-cancelling earbuds, leather folio, and single-origin coffee drip bags.', image: '/images/boxes/box_3.png' },
      { name: 'Retreat Welcome Set', tagline: 'Relax & Connect', description: 'Aroma candle, organic herbal tea, wellness pouch, and personalized tote bag.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Event Theme Branding', description: 'Coordinated colors, event hashtags, and logo placement across all items.', iconName: 'BadgeCheck' },
      { title: 'Lanyard & Badge Pairing', description: 'Integrated packaging suited for quick registration desk distribution.', iconName: 'FileText' },
      { title: 'Speaker Monograms', description: 'Custom name personalization for keynote speakers and panelists.', iconName: 'Package' },
      { title: 'Venue Direct Delivery', description: 'Direct scheduled freight dispatch to hotel convention centers and auditoriums.', iconName: 'Truck' },
      { title: 'Sustainable Materials', description: 'Eco-friendly kraft boxes, seed paper notepads, and recyclable packaging.', iconName: 'Sliders' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Tell us event date, venue location, attendee count, and theme brief.' },
      { step: '2', title: 'We Curate Concepts', description: 'We design 3 event-ready concept options with digital 3D mockups.' },
      { step: '3', title: 'Approve & Personalise', description: 'Confirm kit items, branding guidelines, and insert cards.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Assembly, count verification, and secure palletization for transit.' },
      { step: '5', title: 'Delivered With Delight', description: 'Guaranteed venue delivery 24-48 hours before the event doors open.' },
    ],
  },

  'milestones-recognition': {
    slug: 'milestones-recognition',
    metaTitle: 'Milestones & Recognition — The Gourmet Gifts',
    metaDescription: 'Some achievements deserve more than a message. Curating recognition experiences around the achievement, the person and the moment.',
    title: 'Milestones & Recognition',
    tagline: 'Some achievements deserve more than a message.',
    description: 'From personal milestones to extraordinary contributions, we curate recognition experiences around the achievement, the person and what the moment represents — creating something they’ll be proud to receive and remember.',
    heroImage: '/cards/milestones.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE RECOGNITION GIFTING',
    trustPoints: ['Thoughtfully Curated', 'Personalised for the Moment', 'End-to-End Execution'],

    solvesTitle: 'Why Thoughtful Recognition Matters',
    solvesSubtitle: 'Recognition feels most meaningful when it reflects what someone achieved and why it mattered. We help turn appreciation into something tangible, personal and worth keeping.',
    pillars: [
      {
        title: 'Makes People Feel Seen',
        description: 'Recognise the effort, contribution and story behind the achievement — not just the milestone itself.',
        iconName: 'Heart',
      },
      {
        title: 'Makes Achievement Memorable',
        description: 'Turn important wins into moments people can look back on with pride.',
        iconName: 'Trophy',
      },
      {
        title: 'Strengthens Belonging',
        description: 'Thoughtful recognition shows people that their contribution has been noticed and genuinely valued.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Reflects Your Culture',
        description: 'The way you celebrate people says a lot about the organisation you are building.',
        iconName: 'Building',
      },
    ],

    momentsTitle: 'Curated For Moments Worth Recognising',
    momentsSubtitle: 'Every achievement has a different story. The recognition should feel different too.',
    moments: [
      { title: 'Years of Service', iconName: 'Calendar' },
      { title: 'Promotions & Career Milestones', iconName: 'TrendingUp' },
      { title: 'Performance & Achievement Awards', iconName: 'Award' },
      { title: 'Leadership Recognition', iconName: 'Crown' },
      { title: 'Team & Project Wins', iconName: 'Users' },
      { title: 'Retirement & Farewells', iconName: 'Heart' },
      { title: 'Partner & Channel Recognition', iconName: 'HeartHandshake' },
      { title: 'Company Milestones & Celebrations', iconName: 'Sparkles' },
    ],

    budgetTitle: 'Thoughtfully Curated Around Your Budget',
    budgetSubtitle: '',
    budgetTiers: [
      {
        range: 'Up to ₹999',
        description: 'Thoughtful tokens of appreciation & everyday recognition',
        iconName: 'Wallet',
      },
      {
        range: '₹1,000 – ₹1,499',
        description: 'Elevated award keepsakes & certificate pairings',
        iconName: 'Gift',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Premium recognition suites & artisanal trophies',
        iconName: 'Award',
      },
      {
        range: '₹2,500+',
        description: 'Signature luxury heirloom awards & milestone hampers',
        iconName: 'Gem',
      },
    ],

    curatedConcepts: [
      { name: 'The Milestone Keepsake', tagline: 'Lasting Pride', description: 'Crystal citation award paired with single estate tea and fine confections.', image: '/images/boxes/box_1.png' },
      { name: 'Excellence in Action', tagline: 'Top Performer', description: 'Leather desk accessories, brass stationery, and handcrafted truffles.', image: '/images/boxes/box_2.png' },
      { name: 'Veteran Honours', tagline: 'Loyalty & Gratitude', description: 'Bespoke wooden watch box, engraved pen, and vintage roast coffee.', image: '/images/boxes/box_3.png' },
      { name: 'Pinnacle Achievement', tagline: 'Heirloom Distinction', description: 'Solid bronze engraved plaque in handcrafted satin lined keepsake chest.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Name & Tenure Engraving', description: 'Laser engraved names, milestone years, and achievement dates on trophies.', iconName: 'BadgeCheck' },
      { title: 'Founder Gratitude Notes', description: 'Deckle-edge certificate cards signed by executive leadership.', iconName: 'FileText' },
      { title: 'Commemorative Packaging', description: 'Heirloom wooden boxes, velvet interior padding, and gold crest embossing.', iconName: 'Package' },
      { title: 'Bespoke Trophies', description: 'Precision fabricated crystal, brass, and teakwood recognition awards.', iconName: 'Sliders' },
      { title: 'White-Glove Dispatch', description: 'Discreet and celebratory home or stage delivery on award nights.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Provide milestone cohorts, recipient names, and award dates.' },
      { step: '2', title: 'We Curate Concepts', description: 'Review 3 custom award hamper concepts with personalized digital proofs.' },
      { step: '3', title: 'Approve & Personalise', description: 'Finalize name spellings, citation text, and trophy dimensions.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Precision laser engraving, velvet lining assembly, and multi-point QC.' },
      { step: '5', title: 'Delivered With Delight', description: 'Dispatched to arrive ahead of your company awards ceremony.' },
    ],
  },

  'cx-gifting': {
    slug: 'cx-gifting',
    metaTitle: 'Customer Experience Gifting — The Gourmet Gifts',
    metaDescription: 'Turn customer moments into relationships worth remembering. Curated gifts for first purchases, onboarding, renewals and milestones.',
    title: 'Customer Experience Gifting',
    tagline: 'Turn customer moments into relationships worth remembering.',
    description: 'From first purchases and onboarding to loyalty milestones, renewals and special moments, we curate gifts around the customer, the journey and the experience you want your brand to create.',
    heroImage: '/cards/cx.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE CX GIFTING',
    trustPoints: ['Thoughtfully Curated', 'Personalised to Your Brand', 'Delivered End-to-End'],

    solvesTitle: 'Why Thoughtful Customer Gifting Matters',
    solvesSubtitle: 'Great customer experiences are built through small moments of thoughtfulness. The right gift can make customers feel recognised, appreciated and more connected to the brand behind the experience.',
    pillars: [
      {
        title: 'Makes Customers Feel Valued',
        description: 'Create moments of appreciation that feel personal rather than automated or transactional.',
        iconName: 'Heart',
      },
      {
        title: 'Strengthens Brand Connection',
        description: 'Thoughtful gifting gives customers another reason to feel emotionally connected to your brand.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Makes Key Moments Memorable',
        description: 'Turn onboarding, milestones, renewals and celebrations into experiences customers remember.',
        iconName: 'Sparkles',
      },
      {
        title: 'Extends the Experience',
        description: 'A well-curated gift continues the brand experience even after the transaction or interaction is complete.',
        iconName: 'Building',
      },
    ],

    momentsTitle: 'Curated Across the Customer Journey',
    momentsSubtitle: 'Different customer moments call for different gestures. We curate each one around where the customer is in the relationship and what the moment means.',
    moments: [
      { title: 'New Customer Welcomes', iconName: 'Users' },
      { title: 'First Purchase & Onboarding', iconName: 'Gift' },
      { title: 'Loyalty & Membership Milestones', iconName: 'Crown' },
      { title: 'Renewals & Retention', iconName: 'TrendingUp' },
      { title: 'Customer Birthdays & Celebrations', iconName: 'Cake' },
      { title: 'Thank You & Appreciation', iconName: 'Heart' },
      { title: 'VIP & High-Value Customers', iconName: 'Award' },
      { title: 'Service Recovery & Care', iconName: 'HeartHandshake' },
    ],

    budgetTitle: 'Thoughtfully Curated Around Your Budget',
    budgetSubtitle: '',
    budgetTiers: [
      {
        range: 'Up to ₹999',
        description: 'Delightful customer thank you treats & welcome tokens',
        iconName: 'Wallet',
      },
      {
        range: '₹1,000 – ₹1,499',
        description: 'Elevated membership celebration & onboarding packs',
        iconName: 'Gift',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Premium retention hampers & loyalty milestone boxes',
        iconName: 'Award',
      },
      {
        range: '₹2,500+',
        description: 'VIP customer suites & executive brand experience hampers',
        iconName: 'Gem',
      },
    ],

    curatedConcepts: [
      { name: 'The Warm Welcome', tagline: 'Day 1 Delight', description: 'Artisanal cookies, custom travel tumbler, and welcome voucher card.', image: '/images/boxes/box_1.png' },
      { name: 'Loyalty Celebration', tagline: 'Tier Upgrade', description: 'Single-origin coffee beans, stainless steel mug, and gourmet chocolate.', image: '/images/boxes/box_2.png' },
      { name: 'Client Delight Suite', tagline: 'VIP Relationship', description: 'Rare loose leaf teas, honey jar, scented candle, and luxury linen box.', image: '/images/boxes/box_3.png' },
      { name: 'Resolution & Care', tagline: 'Concierge Touch', description: 'Relaxing wellness tea, aroma diffuser, and personalized apology/care note.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Brand Story Packaging', description: 'Pantone matched box outers, custom tissue paper, and branded seal stickers.', iconName: 'BadgeCheck' },
      { title: 'Dynamic QR Inserts', description: 'Personalized thank-you cards linking to exclusive member rewards or videos.', iconName: 'FileText' },
      { title: 'Automated CRM Triggers', description: 'API integration ready for automatic dispatch on milestone completions.', iconName: 'Package' },
      { title: 'Dietary Variations', description: 'Nut-free, vegan, and sugar-conscious options for diverse customers.', iconName: 'Sliders' },
      { title: 'Pan-India Fulfillment', description: 'Reliable express home delivery with customer live delivery SMS updates.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Tell us customer journey triggers, monthly volume, and budget tier.' },
      { step: '2', title: 'We Curate Concepts', description: 'Receive 3 customer journey concepts designed for maximum delight.' },
      { step: '3', title: 'Approve & Personalise', description: 'Confirm unboxing elements, message cards, and custom packaging sleeves.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Batch assembly or on-demand inventory stocking in our fulfillment centers.' },
      { step: '5', title: 'Delivered With Delight', description: 'Direct doorstep dispatch upon customer milestone or anniversary.' },
    ],
  },

  'dealer-partner-gifting': {
    slug: 'dealer-partner-gifting',
    metaTitle: 'Dealer & Partner Gifting — The Gourmet Gifts',
    metaDescription: 'Celebrate the partnerships that move business forward. Curated gifts for dealer onboarding, festive appreciation and target milestones.',
    title: 'Dealer & Partner Gifting',
    tagline: 'Celebrate the partnerships that move business forward.',
    description: 'From onboarding and festive appreciation to performance milestones and long-term partnerships, we curate gifts around the relationship, the occasion and your brand — so every gesture feels considered and commercially relevant without feeling transactional.',
    heroImage: '/cards/dealer.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE PARTNER GIFTING',
    trustPoints: ['Thoughtfully Curated', 'Customised to Your Brand', 'Executed End-to-End'],

    solvesTitle: 'Why Thoughtful Partner Gifting Matters',
    solvesSubtitle: 'Great partnerships are built over time. Thoughtful gifting helps you recognise contribution, celebrate shared success and show appreciation beyond the transaction.',
    pillars: [
      {
        title: 'Strengthens Relationships',
        description: 'Show partners that the relationship matters beyond targets, orders and transactions.',
        iconName: 'HeartHandshake',
      },
      {
        title: 'Recognises Contribution',
        description: 'Celebrate the people and partners who help your business grow, reach new markets and serve customers better.',
        iconName: 'Award',
      },
      {
        title: 'Marks Shared Success',
        description: 'Turn milestones, achievements and business wins into moments worth celebrating together.',
        iconName: 'Trophy',
      },
      {
        title: 'Keeps Your Brand Close',
        description: 'Useful, thoughtfully curated gifts create positive brand recall without feeling like promotional merchandise.',
        iconName: 'Building',
      },
    ],

    momentsTitle: 'Curated For Every Partnership Moment',
    momentsSubtitle: 'From the beginning of a relationship to years of shared growth, we curate differently for every stage and reason to celebrate.',
    moments: [
      { title: 'New Partner Onboarding', iconName: 'Users' },
      { title: 'Dealer & Distributor Appreciation', iconName: 'Heart' },
      { title: 'Performance & Target Milestones', iconName: 'Trophy' },
      { title: 'Festive Partner Gifting', iconName: 'Sparkles' },
      { title: 'Channel Partner Recognition', iconName: 'Award' },
      { title: 'Annual Meets & Conferences', iconName: 'Building' },
      { title: 'VIP & Top-Performer Gifting', iconName: 'Crown' },
      { title: 'Long-Term Partnership Milestones', iconName: 'Calendar' },
    ],

    budgetTitle: 'Thoughtfully Curated Around Your Budget',
    budgetSubtitle: '',
    budgetTiers: [
      {
        range: 'Up to ₹999',
        description: 'Partner welcome essentials & distributor tokens',
        iconName: 'Wallet',
      },
      {
        range: '₹1,000 – ₹1,499',
        description: 'Elevated festival greeting & meet hampers',
        iconName: 'Gift',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Performance milestone & incentive reward sets',
        iconName: 'Award',
      },
      {
        range: '₹2,500+',
        description: 'Signature VIP partner trophies & executive suites',
        iconName: 'Gem',
      },
    ],

    curatedConcepts: [
      { name: 'Channel Champion', tagline: 'Target Achiever', description: 'Hardcover partner planner, executive brass pen, and specialty coffee.', image: '/images/boxes/box_1.png' },
      { name: 'Annual Meet Hamper', tagline: 'Dealer Summit', description: 'Bluetooth speaker, matte flask, dry fruit selection, and welcome folio.', image: '/images/boxes/box_2.png' },
      { name: 'The Milestone Crest', tagline: '5-Year Partnership', description: 'Solid wood keepsake chest, roasted saffron nuts, and custom plaque.', image: '/images/boxes/box_3.png' },
      { name: 'Top Dealer Suite', tagline: 'Excellence in Distribution', description: 'Noise-cancelling headphones, leather briefcase, and imported confectionery.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Co-Branded Merchandise', description: 'Dual branding with your brand alongside the dealer/distributor logo.', iconName: 'BadgeCheck' },
      { title: 'Custom Target Trophies', description: 'Brass, glass, and wood commemorative plaques for sales milestones.', iconName: 'FileText' },
      { title: 'Annual Meet Kits', description: 'Pre-assembled event boxes ready for delegate handoff at partner conferences.', iconName: 'Package' },
      { title: 'Tiered Rewarding', description: 'Gold, Silver, Platinum tiered hampers mapped to dealer performance levels.', iconName: 'Sliders' },
      { title: 'Bulk Warehouse Dispatch', description: 'Direct freight shipping to regional distributor depots pan-India.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Provide partner tier counts, meet dates, and preferred gift categories.' },
      { step: '2', title: 'We Curate Concepts', description: 'Review 3 tailored dealer curation options with full digital renders.' },
      { step: '3', title: 'Approve & Personalise', description: 'Finalize partner name embossing, achievement plaques, and custom boxes.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Assembly, count verification, and secure transit packaging.' },
      { step: '5', title: 'Delivered With Delight', description: 'Direct depot delivery or doorstep dispatch to partner stores.' },
    ],
  },

  'weddings-celebrations': {
    slug: 'weddings-celebrations',
    metaTitle: 'Celebrations — The Gourmet Gifts',
    metaDescription: 'Make every celebration feel more thoughtful. Bespoke wedding welcome gifts, guest favours, and celebratory hampers.',
    title: 'Celebrations',
    tagline: 'Make every celebration feel more thoughtful.',
    description: 'From wedding gifting and guest favours to family celebrations and special occasions, we curate gifts around the people, the moment and the experience you want to create — so every gesture feels personal, beautiful and worth remembering.',
    heroImage: '/cards/wedding.png',
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: 'EXPLORE WEDDING GIFTING',
    trustPoints: ['Thoughtfully Curated', 'Personalised for the Occasion', 'Delivered End-to-End'],

    solvesTitle: 'Why Thoughtful Celebration Gifting Matters',
    solvesSubtitle: 'The best gifts don’t just mark the occasion — they become part of the memory. Thoughtful curation helps every celebration feel more personal, more intentional and more memorable for the people receiving it.',
    pillars: [
      {
        title: 'Makes the Occasion Feel Personal',
        description: 'A well-curated gift reflects the people, the mood and the story behind the celebration.',
        iconName: 'Heart',
      },
      {
        title: 'Creates Memorable Guest Experiences',
        description: 'From welcome moments to take-home keepsakes, gifting adds warmth and meaning to the experience.',
        iconName: 'Sparkles',
      },
      {
        title: 'Adds Beauty to the Celebration',
        description: 'Thoughtful products, personalisation and presentation make the gifting feel like part of the event itself.',
        iconName: 'Crown',
      },
      {
        title: 'Leaves a Lasting Impression',
        description: 'Long after the celebration is over, a meaningful gift helps the moment stay with people.',
        iconName: 'Building',
      },
    ],

    momentsTitle: 'Curated For Every Celebration Moment',
    momentsSubtitle: 'Every celebration has a different emotion behind it. We curate accordingly.',
    moments: [
      { title: 'Wedding Welcome Gifts', iconName: 'Users' },
      { title: 'Guest Favours & Return Gifts', iconName: 'Gift' },
      { title: 'Family Wedding Gifting', iconName: 'Heart' },
      { title: 'Bridesmaid & Groomsmen Gifts', iconName: 'Sparkles' },
      { title: 'Engagements & Pre-Wedding Celebrations', iconName: 'HeartHandshake' },
      { title: 'Birthdays & Personal Celebrations', iconName: 'Cake' },
      { title: 'Housewarmings & Home Visits', iconName: 'Home' },
      { title: 'Baby Showers & Special Milestones', iconName: 'Award' },
    ],

    budgetTitle: 'Thoughtfully Curated Around Your Budget',
    budgetSubtitle: '',
    budgetTiers: [
      {
        range: 'Up to ₹999',
        description: 'Delightful wedding favours & celebratory tokens',
        iconName: 'Wallet',
      },
      {
        range: '₹1,000 – ₹1,499',
        description: 'Elevated guest welcome boxes & return gifts',
        iconName: 'Gift',
      },
      {
        range: '₹1,500 – ₹2,499',
        description: 'Premium bridesmaid, groomsmen & family gift sets',
        iconName: 'Award',
      },
      {
        range: '₹2,500+',
        description: 'Signature bespoke luxury trunks & keepsake chests',
        iconName: 'Gem',
      },
    ],

    curatedConcepts: [
      { name: 'The Royale Welcome', tagline: 'Warmest Hospitality', description: 'Artisanal sweets, scented candle, raw wild honey, and custom name card.', image: '/images/boxes/box_1.png' },
      { name: 'Celebration Favours', tagline: 'Gratitude Keepsake', description: 'Handcrafted brass diya, roasted gourmet nuts, and personalized wax-sealed note.', image: '/images/boxes/box_2.png' },
      { name: 'Bridal Party Luxe', tagline: 'Special Bond', description: 'Personalized silk robe, organic body care, and artisanal Belgian truffles.', image: '/images/boxes/box_3.png' },
      { name: 'Heritage Family Chest', tagline: 'Generational Joy', description: 'Solid wood keepsake trunk filled with single estate teas and luxury treats.', image: '/images/boxes/box_4.png' },
    ],

    customizationFeatures: [
      { title: 'Monogrammed Keepsakes', description: 'Couple initials, wedding hashtag, and date gold-foiled across boxes.', iconName: 'BadgeCheck' },
      { title: 'Handmade Deckle Cards', description: 'Personalized calligraphy appreciation notes for every esteemed guest.', iconName: 'FileText' },
      { title: 'Theme Matched Packaging', description: 'Custom silk ribbons, wax seals, and palette-matched rigid boxes.', iconName: 'Package' },
      { title: 'Dietary Selections', description: 'Pure vegetarian, Jain, sugar-free, and gluten-conscious gourmet treats.', iconName: 'Sliders' },
      { title: 'Venue Room Delivery', description: 'Scheduled logistics directly to destination hotel guest rooms pan-India.', iconName: 'Truck' },
    ],

    processSteps: [
      { step: '1', title: 'Share Your Requirements', description: 'Tell us event dates, destination venue, guest count, and theme aesthetic.' },
      { step: '2', title: 'We Curate Concepts', description: 'Receive 3 customized wedding curation options with packaging mockups.' },
      { step: '3', title: 'Approve & Personalise', description: 'Finalize personalized monograms, ribbon shades, and gift contents.' },
      { step: '4', title: 'We Prepare & Pack', description: 'Careful batch assembly, freshness sealing, and luxury gift wrapping.' },
      { step: '5', title: 'Delivered With Delight', description: 'Direct scheduled delivery to your destination resort or residence.' },
    ],
  },
};

// Fallback generator for other categories ensuring seamless support
const DEFAULT_OCCASION = OCCASIONS_DATA['employee-gifting'];

export const getOccasionData = (slug: string): OccasionPageData => {
  if (OCCASIONS_DATA[slug]) {
    return OCCASIONS_DATA[slug];
  }

  const titles: Record<string, string> = {
    'onboarding-kits': 'Onboarding Kits',
    'weddings-celebrations': 'Celebrations',
    'milestones-recognition': 'Milestones & Recognition',
    'cx-gifting': 'Customer Experience Gifting',
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
    solvesTitle: `Why Thoughtful ${name} Matters`,
    solvesSubtitle: `Elevate your ${name.toLowerCase()} relationships with bespoke keepsakes and curated luxury gifting.`,
    heroImage: DEFAULT_OCCASION.heroImage,
    primaryCta: 'GET 3 CURATED CONCEPTS',
    secondaryCta: `EXPLORE ${name.toUpperCase()}`,
    trustPoints: ['Thoughtfully Curated', 'Customised to Your Brand', 'Handled End-to-End'],
  };
};
