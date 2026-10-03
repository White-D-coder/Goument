'use client';
import Link from 'next/link';
import { createPermission, resources } from '@/lib/admin/resources';
import type { AdminResource } from '@/lib/admin/types';
import { useAdmin } from './AdminProvider';
import { AdminForbidden } from './shared';
import Dashboard from './Dashboard';
import ResourceList from './ResourceList';
import ResourceDetail from './ResourceDetail';
import ResourceEditor from './ResourceEditor';
import Settings from './Settings';

export default function AdminPage({ section, id }: { section: string; id?: string }) {
  const { can } = useAdmin();
  if (section === 'dashboard' || section === 'analytics') return <Dashboard analytics={section === 'analytics'} />;
  if (section === 'settings') return <Settings />;
  const resource = section as AdminResource;
  if (id === 'new') return can(createPermission(resource)) && resources[resource].create ? <><Link href={`/admin/${resource}`} className="admin-back">← {resources[resource].title}</Link><div className="admin-page-heading"><div><p className="admin-kicker">Catalogue & operations</p><h1>New {resources[resource].singular.toLowerCase()}</h1><p>Create a real record in the operations catalogue.</p></div></div><section className="admin-panel"><ResourceEditor resource={resource} /></section></> : <AdminForbidden />;
  return id ? <ResourceDetail resource={resource} id={id} /> : <ResourceList resource={resource} />;
}
