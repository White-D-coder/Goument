import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { OccasionPageTemplate } from '@/features/occasions/OccasionPageTemplate';
import { OCCASIONS_DATA, getOccasionData } from '@/data/occasionsData';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'employee-gifting' },
    { slug: 'onboarding-kits' },
    { slug: 'client-gifting' },
    { slug: 'festive-gifting' },
    { slug: 'weddings-celebrations' },
    { slug: 'events-conferences' },
    { slug: 'milestones-recognition' },
    { slug: 'cx-gifting' },
    { slug: 'dealer-partner-gifting' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getOccasionData(slug);

  return {
    title: data.metaTitle,
    description: data.metaDescription,
  };
}

export default async function OccasionDynamicPage({ params }: Props) {
  const { slug } = await params;
  const data = getOccasionData(slug);

  return <OccasionPageTemplate data={data} />;
}
