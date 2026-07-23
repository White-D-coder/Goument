import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { MobileShell } from '@/features/shell/MobileShell';
import { QueryProvider } from '@/shared/QueryProvider';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
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
  themeColor: '#FAF7F2',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const deviceType = headersList.get('x-device-type') || 'mobile';

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased bg-[#FAF7F2] selection:bg-[#D4AF37]/30">
        <QueryProvider>
          {deviceType === 'desktop' ? (
            // Mobile viewport container for desktop viewers
            <MobileShell>{children}</MobileShell>
          ) : (
            <MobileShell>{children}</MobileShell>
          )}
        </QueryProvider>
      </body>
    </html>
  );
}
