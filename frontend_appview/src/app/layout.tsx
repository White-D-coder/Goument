import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Geist } from 'next/font/google';
import './globals.css';
import { ResponsiveShell } from '@/features/shell/ResponsiveShell';
import { QueryProvider } from '@/shared/QueryProvider';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Gourmet Gifts Co.',
  description: 'Gifts that mean something.',
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
    <html
      lang="en"
      className={`${geist.variable} ${cormorant.variable} ${jakarta.variable}`}
    >
      <body>
        <QueryProvider>
          <ResponsiveShell>{children}</ResponsiveShell>
        </QueryProvider>
      </body>
    </html>
  );
}
