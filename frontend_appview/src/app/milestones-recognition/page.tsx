import { Metadata } from 'next';
import { OccasionPageTemplate } from '@/features/occasions/OccasionPageTemplate';
import { getOccasionData } from '@/data/occasionsData';

export const metadata: Metadata = {
  title: 'Milestones & Recognition — The Gourmet Gifts',
  description: 'Honor loyalty, exceptional performance, and company anniversaries with lasting recognition gifts.',
};

export default function MilestonesRecognitionPage() {
  const data = getOccasionData('milestones-recognition');

  return <OccasionPageTemplate data={data} />;
}
