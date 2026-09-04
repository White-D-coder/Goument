import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Executive Intelligence Portal — The Gourmet Gifts',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function StudioAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
