import type { Metadata } from 'next';
import AdminProvider from '@/components/admin/AdminProvider';
import './admin.css';
export const metadata: Metadata = { title: 'Operations', robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noarchive: true } } };
export default function AdminLayout({ children }: { children: React.ReactNode }) { return <AdminProvider>{children}</AdminProvider>; }
