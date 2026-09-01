import { Metadata } from 'next';
import { OccasionPageTemplate } from '@/features/occasions/OccasionPageTemplate';
import { OCCASIONS_DATA } from '@/data/occasionsData';

export const metadata: Metadata = {
  title: 'Employee Gifting — The Gourmet Gifts',
  description: 'Celebrate your people with premium, thoughtful corporate gifts that inspire, engage and make every milestone memorable.',
};

export default function EmployeeGiftingPage() {
  const data = OCCASIONS_DATA['employee-gifting'];

  return <OccasionPageTemplate data={data} />;
}
