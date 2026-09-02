/**
 * ==============================================================================
 *  THE GOURMET GIFTS — MASTER API & ROUTE CONFIGURATION
 * ==============================================================================
 *  Control all API keys, Backend Endpoints, and Frontend Page Routes from here.
 *  - To DISABLE or TURN OFF a page or route, set `enabled: false` or comment it out.
 *  - Middleware will automatically block disabled routes and return 404 Not Found.
 * ==============================================================================
 */

/* ──────────────────────────────────────────────────────────────────────────────
   1. API KEYS & EXTERNAL SERVICE CREDENTIALS
   ────────────────────────────────────────────────────────────────────────────── */
export const API_KEYS_CONFIG = {
  // Backend API Base URL
  BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001',

  // WhatsApp Concierge Number
  WHATSAPP_PHONE: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '917021463609',

  // Email Notification & SMTP Service
  SMTP: {
    HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    PORT: parseInt(process.env.SMTP_PORT || '465', 10),
    SECURE: process.env.SMTP_SECURE !== 'false',
    USER: process.env.SMTP_USER || '',
    PASS: process.env.SMTP_PASS || '',
    RECIPIENT_EMAIL: process.env.INQUIRY_RECIPIENT_EMAIL || 'hello@thegourmetgifts.co',
  },

  // Payment Gateway (Stripe)
  STRIPE: {
    PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY || '',
  },

  // Cloudinary Asset Storage
  CLOUDINARY: {
    CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
  },
};

/* ──────────────────────────────────────────────────────────────────────────────
   2. API ROUTES (INTERNAL & BACKEND SERVICES)
   ────────────────────────────────────────────────────────────────────────────── */
export interface ApiRouteItem {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'ALL';
  path: string;
  description: string;
  enabled: boolean;
}

export const API_ROUTES_CONFIG: Record<string, ApiRouteItem> = {
  // ─── INTERNAL NEXT.JS API ROUTES ───
  SEND_INQUIRY: {
    id: 'send_inquiry',
    name: 'Send Inquiry (Email & Notification)',
    method: 'POST',
    path: '/api/send-inquiry',
    description: 'Submits B2B inquiry form, generates luxury HTML email, and sends via SMTP.',
    enabled: true,
  },

  // ─── BACKEND API ENDPOINTS (v1) ───
  AUTH_SERVICE: {
    id: 'auth_service',
    name: 'Authentication API',
    method: 'ALL',
    path: '/api/v1/auth',
    description: 'User login, registration, OTP, session management.',
    enabled: true,
  },
  CART_SERVICE: {
    id: 'cart_service',
    name: 'Cart & Curation Tray API',
    method: 'ALL',
    path: '/api/v1/cart',
    description: 'Cart persistence, items update, guest cart sync.',
    enabled: true,
  },
  ORDERS_SERVICE: {
    id: 'orders_service',
    name: 'Orders & Webhook API',
    method: 'ALL',
    path: '/api/v1/orders',
    description: 'Order creation, payment tracking, Stripe webhook.',
    enabled: true,
  },
  PRODUCTS_SERVICE: {
    id: 'products_service',
    name: 'Products & Catalogue API',
    method: 'ALL',
    path: '/api/v1/products',
    description: 'Catalogue listing, product details, inventory.',
    enabled: true,
  },
  GIFT_BOXING_SERVICE: {
    id: 'gift_boxing_service',
    name: 'Gift Boxing Vessels API',
    method: 'ALL',
    path: '/api/v1/gift-boxing',
    description: 'Keepsake vessels, custom tins, velvet box options.',
    enabled: true,
  },
  COUPONS_SERVICE: {
    id: 'coupons_service',
    name: 'Coupons & Discounts API',
    method: 'ALL',
    path: '/api/v1/coupons',
    description: 'Discount codes and promotional pricing validation.',
    enabled: true,
  },
  HEALTH_CHECK: {
    id: 'health_check',
    name: 'API Health Check',
    method: 'GET',
    path: '/api/v1/health',
    description: 'Server status and database connection ping.',
    enabled: true,
  },
};

/* ──────────────────────────────────────────────────────────────────────────────
   3. FRONTEND PAGE ROUTES (PAGES & OCCASIONS)
   Set `enabled: false` or comment out any page below to disable/close it!
   ────────────────────────────────────────────────────────────────────────────── */
export interface PageRouteItem {
  id: string;
  name: string;
  path: string;
  description: string;
  enabled: boolean;
}

export const PAGE_ROUTES_CONFIG: Record<string, PageRouteItem> = {
  // ─── CORE PAGES ───
  HOME: {
    id: 'home',
    name: 'Home Page',
    path: '/',
    description: 'Main editorial landing page, Hero section, Occasions, Categories, Story.',
    enabled: true,
  },
  GOURMET_GIFTS: {
    id: 'gourmet_gifts',
    name: 'Gourmet Gifts Showcase',
    path: '/gourmet-gifts',
    description: 'Primary product & occasion showcase homepage view.',
    enabled: true,
  },
  COLLECTIONS: {
    id: 'collections',
    name: 'Catalogue & Collections',
    path: '/collections',
    description: 'Complete 8-category catalogue, live filtering, Curation Tray additions.',
    enabled: true,
  },
  STORY: {
    id: 'story',
    name: 'Brand Story',
    path: '/story',
    description: 'Our philosophy, artisan craft, keepsake vessel narrative.',
    enabled: false,
  },
  CART: {
    id: 'cart',
    name: 'Curation Tray / Cart',
    path: '/cart',
    description: 'Tray view with selected signature hampers and products.',
    enabled: false,
  },
  CHECKOUT: {
    id: 'checkout',
    name: 'Checkout & Inquiry Flow',
    path: '/checkout',
    description: 'Corporate quotation and order inquiry finalisation.',
    enabled: false,
  },
  CONTACT: {
    id: 'contact',
    name: 'Contact & Concierge',
    path: '/contact',
    description: 'Direct contact info, WhatsApp concierge, corporate office details.',
    enabled: true,
  },
  CORPORATE: {
    id: 'corporate',
    name: 'Corporate Gifting Solutions',
    path: '/corporate',
    description: 'Bulk enterprise procurement, bespoke branding, executive gifting.',
    enabled: false,
  },
  INQUIRE: {
    id: 'inquire',
    name: 'Inquiry Studio',
    path: '/inquire',
    description: 'Dedicated bespoke gifting inquiry submission form.',
    enabled: false,
  },
  ACCOUNT: {
    id: 'account',
    name: 'User Account Dashboard',
    path: '/account',
    description: 'User profile, past corporate curations, preferences.',
    enabled: false,
  },
  CUSTOMIZE: {
    id: 'customize',
    name: 'Box Customization Studio',
    path: '/customize',
    description: '3D interactive box customizer and ribbon selector.',
    enabled: true,
  },

  // ─── OCCASION PAGES (/occasions/[slug]) ───
  OCCASION_EMPLOYEE_GIFTING: {
    id: 'occasion_employee_gifting',
    name: 'Employee Gifting',
    path: '/occasions/employee-gifting',
    description: 'Employee welcome kits, appreciation and team gifts.',
    enabled: true,
  },
  OCCASION_CLIENT_GIFTING: {
    id: 'occasion_client_gifting',
    name: 'Client Gifting',
    path: '/occasions/client-gifting',
    description: 'High-touch client retention and executive hampers.',
    enabled: true,
  },
  OCCASION_FESTIVE_GIFTING: {
    id: 'occasion_festive_gifting',
    name: 'Festive & Diwali Gifting',
    path: '/occasions/festive-gifting',
    description: 'Festive celebrations, Diwali, New Year luxury curations.',
    enabled: true,
  },
  OCCASION_EVENTS_CONFERENCES: {
    id: 'occasion_events_conferences',
    name: 'Events & Conferences',
    path: '/occasions/events-conferences',
    description: 'Conference attendee hampers, keynote speaker gifts.',
    enabled: true,
  },
  OCCASION_MILESTONES_RECOGNITION: {
    id: 'occasion_milestones_recognition',
    name: 'Milestones & Recognition',
    path: '/occasions/milestones-recognition',
    description: 'Work anniversaries, leadership awards, milestone celebrations.',
    enabled: true,
  },
  OCCASION_CX_GIFTING: {
    id: 'occasion_cx_gifting',
    name: 'CX & Customer Experience',
    path: '/occasions/cx-gifting',
    description: 'Delight programs, VIP loyalty, onboarding hampers.',
    enabled: true,
  },
  OCCASION_DEALER_PARTNER: {
    id: 'occasion_dealer_partner',
    name: 'Dealer & Partner Gifting',
    path: '/occasions/dealer-partner-gifting',
    description: 'Distributor networks, channel partners, annual meet hampers.',
    enabled: true,
  },
  OCCASION_WEDDINGS_CELEBRATIONS: {
    id: 'occasion_weddings_celebrations',
    name: 'Weddings & Celebrations',
    path: '/occasions/weddings-celebrations',
    description: 'Luxury wedding invitations, return gifts, bespoke sweets.',
    enabled: true,
  },
  OCCASION_ONBOARDING_KITS: {
    id: 'occasion_onboarding_kits',
    name: 'Onboarding Kits',
    path: '/occasions/onboarding-kits',
    description: 'New hire welcome hampers, premium brand merch.',
    enabled: true,
  },
};

/* ──────────────────────────────────────────────────────────────────────────────
   4. HELPER UTILITIES: CHECK IF A ROUTE IS ACTIVE OR DISABLED
   ────────────────────────────────────────────────────────────────────────────── */

/**
 * Check if a given page path is currently enabled.
 * Returns false if the route was disabled or commented out in config.
 */
export function isPageRouteActive(pathname: string): boolean {
  if (!pathname) return true;
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  // Exact match
  for (const key in PAGE_ROUTES_CONFIG) {
    const route = PAGE_ROUTES_CONFIG[key];
    if (route && route.path === cleanPath) {
      return route.enabled === true;
    }
  }

  // Dynamic /occasions/ check
  if (cleanPath.startsWith('/occasions/')) {
    for (const key in PAGE_ROUTES_CONFIG) {
      const route = PAGE_ROUTES_CONFIG[key];
      if (route && route.path === cleanPath) {
        return route.enabled === true;
      }
    }
  }

  return true;
}

/**
 * Check if a given API endpoint path is currently enabled.
 */
export function isApiRouteActive(pathname: string): boolean {
  if (!pathname) return true;
  const cleanPath = pathname.replace(/\/$/, '');

  for (const key in API_ROUTES_CONFIG) {
    const route = API_ROUTES_CONFIG[key];
    if (route && cleanPath.startsWith(route.path)) {
      return route.enabled === true;
    }
  }

  return true;
}
