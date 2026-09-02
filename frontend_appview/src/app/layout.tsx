import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { ResponsiveShell } from '@/features/shell/ResponsiveShell';
import { QueryProvider } from '@/shared/QueryProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://thegourmetgifts.co'),
  title: 'The Gourmet Gifts — B2B Gifting, curated around your brand.',
  description: 'Artisanal delicacies, bespoke keepsake vessels, and executive corporate gifting systems.',
  applicationName: 'The Gourmet Gifts',
  keywords: [
    'Corporate Gifting',
    'B2B Gifting',
    'Employee Gifting',
    'Client Gifting',
    'Gourmet Hampers',
    'Festive Gifting',
    'The Gourmet Gifts',
  ],
  authors: [{ name: 'The Gourmet Gifts' }],
  creator: 'The Gourmet Gifts',
  publisher: 'The Gourmet Gifts',
  openGraph: {
    title: 'The Gourmet Gifts — B2B Gifting, curated around your brand.',
    description: 'Artisanal delicacies, bespoke keepsake vessels, and executive corporate gifting systems.',
    url: 'https://thegourmetgifts.co',
    siteName: 'The Gourmet Gifts',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Gourmet Gifts Logo and Bespoke Gifting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Gourmet Gifts — B2B Gifting, curated around your brand.',
    description: 'Artisanal delicacies, bespoke keepsake vessels, and executive corporate gifting systems.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/meta.svg', type: 'image/svg+xml' },
      { url: '/meta.svg', sizes: 'any' },
    ],
    shortcut: '/meta.svg',
    apple: [
      { url: '/meta.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  manifest: '/manifest.webmanifest',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <QueryProvider>
          <ResponsiveShell>{children}</ResponsiveShell>
        </QueryProvider>
      </body>
    </html>
  );
}
