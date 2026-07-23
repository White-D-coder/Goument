import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ResponsiveShell } from '@/features/shell/ResponsiveShell';
import { QueryProvider } from '@/shared/QueryProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const pagio = localFont({
  src: '../../public/fonts/Pagio.woff',
  variable: '--font-pagio',
  display: 'swap',
});

const avocalipss = localFont({
  src: '../../public/fonts/Avocalipss-Regular.woff2',
  variable: '--font-avocalipss',
  display: 'swap',
});

const dreamAlways = localFont({
  src: '../../public/fonts/DreamAlways.otf',
  variable: '--font-dream-always',
  display: 'swap',
});

const tropicalScript = localFont({
  src: '../../public/fonts/TropicalScript.otf',
  variable: '--font-tropical-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Gourmet Gifts Co. | Luxury Gourmet Gifts',
  description: 'Luxury gourmet gifts, beautifully packaged for every occasion.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FAF8FC',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const deviceType = headersList.get('x-device-type') || 'mobile';

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${jakarta.variable} ${pagio.variable} ${avocalipss.variable} ${dreamAlways.variable} ${tropicalScript.variable}`}
    >
      <body className="antialiased bg-[#FAF8FC] text-[#3A2342] selection:bg-[#6B427B]/20 font-sans min-h-screen flex flex-col">
        <QueryProvider>
          <ResponsiveShell>{children}</ResponsiveShell>
        </QueryProvider>
      </body>
    </html>
  );
}
