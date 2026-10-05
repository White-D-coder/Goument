/* eslint-disable @next/next/no-page-custom-font -- App Router root layout is shared by every page. */
import type { Metadata } from 'next';
import StorefrontChrome from '@/components/admin/StorefrontChrome';
import './globals.css';
import './typography.css';
import './storefront.css';
import './product-cards.css';
import './featured-edits.css';
import './surfaces.css';
export const metadata: Metadata = { title: { default: 'Gourmet — Thoughtful gifts for every little moment', template: '%s | Gourmet' }, description: 'Explore gourmet delights, keepsakes and thoughtful gifts for the people who make life special.' };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/></head><body><a className="skip" href="#main">Skip to content</a><StorefrontChrome placement="header"/><main id="main">{children}</main><StorefrontChrome placement="footer"/></body></html>;}
