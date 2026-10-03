import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import AdminPage from '@/components/admin/AdminPage';
import { resources } from '@/lib/admin/resources';

// No customer or operations data is serialized by this server route. The
// existing path-scoped cookie reaches the authorized Express API from the client.
export default async function Operations({ params }: { params: Promise<{ segments?: string[] }> }) {
  const { segments = [] } = await params;
  const [section = 'dashboard', id] = segments;
  if (segments.length > 2 || (!['dashboard', 'analytics', 'settings'].includes(section) && !Object.hasOwn(resources, section)) || (id && (['dashboard', 'analytics', 'settings'].includes(section) || (id !== 'new' && !/^[a-f0-9]{24}$/i.test(id))))) notFound();
  return <Suspense fallback={<p role="status">Loading operations…</p>}><AdminPage key={`${section}:${id || ''}`} section={section} id={id} /></Suspense>;
}
