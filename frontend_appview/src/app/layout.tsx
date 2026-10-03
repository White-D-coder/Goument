import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { ResponsiveShell } from '@/features/shell/ResponsiveShell';
import { QueryProvider } from '@/shared/QueryProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://thegourmetgifts.co'),
  title: 'Corporate Gift Hampers India | The Gourmet Gifts Co.',
  description: 'Bespoke corporate gifting, curated around your people. Artisanal gourmet food, keepsakes and branded packaging for employees, clients and partners.',
  applicationName: 'The Gourmet Gifts',
  keywords: [
    'corporate gifting company',
    'corporate gift hampers',
    'B2B gifting solutions',
    'bespoke corporate gifts',
    'corporate gift curation',
    'luxury corporate gifting',
    'artisanal gift hampers',
    'custom branded corporate gifts',
    'corporate gifting concierge',
    'employee and client gifting',
    'corporate gifting company for employees and clients',
    'bespoke corporate gift boxes for businesses',
    'curated corporate gift hampers for occasions',
    'custom corporate gifting for Indian companies',
    'corporate gift hampers with brand personalisation',
    'end to end corporate gifting execution India',
    'corporate gift vendor India',
    'corporate gifting agency Mumbai',
    'buy corporate gift hampers online',
    'corporate gifting supplier for businesses',
    'hire corporate gifting concierge',
    'how to choose corporate gifts for employees',
    'corporate gifting ideas for businesses',
    'why corporate gifting matters',
    'corporate gifting company Mumbai',
    'corporate gift hampers India',
    'B2B gifting company Bandra Kurla Complex',
    'corporate gifts Mumbai to pan-India delivery',
  ],
  authors: [{ name: 'The Gourmet Gifts' }],
  creator: 'The Gourmet Gifts',
  publisher: 'The Gourmet Gifts',
  openGraph: {
    title: 'Corporate Gift Hampers India | The Gourmet Gifts Co.',
    description: 'Bespoke corporate gifting, curated around your people. Artisanal gourmet food, keepsakes and branded packaging for employees, clients and partners.',
    url: 'https://thegourmetgifts.co',
    siteName: 'The Gourmet Gifts',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://thegourmetgifts.co/meta.png',
        width: 1200,
        height: 1200,
        type: 'image/png',
        alt: 'The Gourmet Gifts — Corporate Gift Hampers India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corporate Gift Hampers India | The Gourmet Gifts Co.',
    description: 'Bespoke corporate gifting, curated around your people. Artisanal gourmet food, keepsakes and branded packaging for employees, clients and partners.',
    images: ['https://thegourmetgifts.co/meta.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/brand/redlogo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://thegourmetgifts.co',
  },
  manifest: '/manifest.webmanifest',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://thegourmetgifts.co/#organization',
      name: 'The Gourmet Gifts',
      legalName: 'House of Satra Pvt Ltd',
      url: 'https://thegourmetgifts.co',
      logo: 'https://thegourmetgifts.co/icon.svg',
      image: 'https://thegourmetgifts.co/meta.png',
      description: 'The Gourmet Gifts is a Mumbai-based B2B corporate gifting company offering bespoke, artisanal gift curation for employees, clients, partners and events across India.',
      email: 'hello@thegourmetgifts.co',
      telephone: '+91-70214-63609',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1702, 17th Floor, INNOV8 Parinee Crescenzo, Crescenzo Building, Opp. MCA Ground, Bandra Kurla Complex, Plot No C-38/39, G Block, Bandra East',
        addressLocality: 'Mumbai',
        addressRegion: 'Maharashtra',
        postalCode: '400051',
        addressCountry: 'IN',
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://thegourmetgifts.co/#website',
      url: 'https://thegourmetgifts.co/',
      name: 'The Gourmet Gifts',
      publisher: {
        '@id': 'https://thegourmetgifts.co/#organization',
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://thegourmetgifts.co/#webpage',
      url: 'https://thegourmetgifts.co/',
      name: 'Corporate Gift Hampers India | The Gourmet Gifts Co.',
      isPartOf: {
        '@id': 'https://thegourmetgifts.co/#website',
      },
      about: {
        '@id': 'https://thegourmetgifts.co/#organization',
      },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ItemList',
      '@id': 'https://thegourmetgifts.co/#occasions-list',
      name: 'Corporate Gifting Occasions',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Employee Gifting',
          url: 'https://thegourmetgifts.co/employee-gifting',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Client Gifting',
          url: 'https://thegourmetgifts.co/occasions/client-gifting',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Festive Gifting',
          url: 'https://thegourmetgifts.co/occasions/festive-gifting',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Events & Conferences',
          url: 'https://thegourmetgifts.co/occasions/events-conferences',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Milestones & Recognition',
          url: 'https://thegourmetgifts.co/milestones-recognition',
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Dealer & Partner Gifting',
          url: 'https://thegourmetgifts.co/occasions/dealer-partner-gifting',
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Celebrations',
          url: 'https://thegourmetgifts.co/occasions/weddings-celebrations',
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'CX Gifting',
          url: 'https://thegourmetgifts.co/occasions/cx-gifting',
        },
      ],
    },
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FAF8F5',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yc2tnq4gqa");
          `}
        </Script>
        <QueryProvider>
          <ResponsiveShell>{children}</ResponsiveShell>
        </QueryProvider>
      </body>
    </html>
  );
}
