'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StorefrontMotion from '@/components/StorefrontMotion';

export default function StorefrontChrome({ placement }: { placement: 'header' | 'footer' }) {
  const pathname = usePathname();
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;
  const isHome = pathname === '/' || pathname === '/b2c';
  return placement === 'header' ? <Header /> : <><Footer home={isHome} /><StorefrontMotion /></>;
}
