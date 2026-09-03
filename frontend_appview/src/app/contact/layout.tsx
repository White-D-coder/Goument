import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Bespoke Curation Concierge — The Gourmet Gifts',
  description: 'Connect with our gifting concierge desk for corporate gifting briefs, custom proposals, and executive support.',
  alternates: {
    canonical: 'https://thegourmetgifts.co/contact',
  },
  openGraph: {
    title: 'Contact & Bespoke Curation Concierge — The Gourmet Gifts',
    description: 'Connect with our gifting concierge desk for corporate gifting briefs, custom proposals, and executive support.',
    url: 'https://thegourmetgifts.co/contact',
    siteName: 'The Gourmet Gifts',
    type: 'website',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
