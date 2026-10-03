import { redirect } from 'next/navigation';
export const metadata = { title: 'Make your gift' };
export default function Boxes() {
  redirect('/build');
}

