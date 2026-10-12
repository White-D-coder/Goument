import type { Metadata } from 'next';
import StorefrontChrome from '@/components/admin/StorefrontChrome';
import './globals.css';
import './typography.css';
import './home-fonts.css';
import './storefront.css';
import './product-cards.css';
import './featured-edits.css';
import './surfaces.css';
import './navigation.css';
import './storefront-ui.css';
import './storefront-cards.css';
export const metadata: Metadata = {
  title: { default: 'Gourmet — Thoughtful gifts for every little moment', template: '%s | Gourmet' },
  description: 'Explore gourmet delights, keepsakes and thoughtful gifts for the people who make life special.',
  icons: {
    icon: { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
    shortcut: '/favicon.png',
  },
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip" href="#main">Skip to content</a><StorefrontChrome placement="header"/><main id="main">{children}</main><StorefrontChrome placement="footer"/></body></html>;}
