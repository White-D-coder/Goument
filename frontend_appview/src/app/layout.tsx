import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ResponsiveShell } from '@/features/shell/ResponsiveShell';
import { QueryProvider } from '@/shared/QueryProvider';

export const metadata: Metadata = {
  title: 'The Gourmet Gifts — B2B Gifting, curated around your brand.',
  description: 'Artisanal delicacies, bespoke keepsake vessels, and executive corporate gifting systems.',
  icons: {
    icon: '/images/brand/LOGOs.svg',
    shortcut: '/images/brand/LOGOs.svg',
    apple: '/images/brand/LOGOs.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#F6F4EF',
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
      </head>
      <body>
        <QueryProvider>
          <ResponsiveShell>{children}</ResponsiveShell>
        </QueryProvider>
      </body>
    </html>
  );
}
