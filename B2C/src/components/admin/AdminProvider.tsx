'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronRight, LogOut, Menu, ShieldCheck } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import { adminApi } from '@/lib/admin/api';
import { navItems } from '@/lib/admin/resources';
import type { AdminSession } from '@/lib/admin/types';

type AdminContextValue = { session: AdminSession; can: (permission: string) => boolean; refreshSession: () => void; handleError: (error: unknown) => void };
const AdminContext = createContext<AdminContextValue | null>(null);
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('Admin context is unavailable.');
  return context;
}

export default function AdminProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [error, setError] = useState<{ status?: number; message: string } | null>(null);
  const [verified, setVerified] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [logoutBusy, setLogoutBusy] = useState(false);
  const request = useRef(0);
  const backgroundRequest = useRef<AbortController | null>(null);
  const checkKey = `${pathname}:${refresh}`;
  const checking = verified !== checkKey;
  const verifyAccess = useCallback(() => {
    backgroundRequest.current?.abort();
    const controller = new AbortController(); backgroundRequest.current = controller;
    const current = request.current;
    // Domain-level403s can be harmless (for example, a protected owner record).
    // Recheck the session before discarding data; changed permissions remount it.
    adminApi<AdminSession>('/session', { signal: controller.signal }).then(result => {
      if (!controller.signal.aborted && current === request.current) { setSession(result); setError(null); }
    }).catch(failure => {
      if (controller.signal.aborted || current !== request.current) return;
      setSession(null);
      if (failure instanceof ApiError && failure.status === 401) router.replace('/account?next=%2Fadmin');
      setError({ status: failure instanceof ApiError ? failure.status : undefined, message: failure instanceof Error ? failure.message : 'Unable to verify operations access.' });
    });
  }, [router]);
  const handleError = useCallback((failure: unknown) => {
    if (failure instanceof ApiError && failure.status === 401) {
      setSession(null);
      router.replace('/account?next=%2Fadmin');
    } else if (failure instanceof ApiError && failure.status === 403) verifyAccess();
  }, [router, verifyAccess]);
  const refreshSession = useCallback(() => setRefresh(value => value + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    const current = ++request.current;
    adminApi<AdminSession>('/session', { signal: controller.signal }).then(result => {
      if (!controller.signal.aborted && current === request.current) { setSession(result); setError(null); }
    }).catch(failure => {
      if (controller.signal.aborted || current !== request.current) return;
      setSession(null);
      if (failure instanceof ApiError && failure.status === 401) { router.replace('/account?next=%2Fadmin'); return; }
      setError({ status: failure instanceof ApiError ? failure.status : undefined, message: failure instanceof Error ? failure.message : 'Unable to check your access.' });
    }).finally(() => { if (!controller.signal.aborted && current === request.current) setVerified(checkKey); });
    return () => controller.abort();
  }, [checkKey, router]);
  useEffect(() => {
    const verify = () => {
      if (document.visibilityState !== 'visible') return;
      // Recheck authority when returning to the tab without discarding an
      // unchanged staff member's unsaved form. Failures hide the private view.
      verifyAccess();
    };
    window.addEventListener('focus', verify);
    document.addEventListener('visibilitychange', verify);
    return () => { backgroundRequest.current?.abort(); window.removeEventListener('focus', verify); document.removeEventListener('visibilitychange', verify); };
  }, [checkKey, verifyAccess]);

  async function logout() {
    if (logoutBusy) return;
    setLogoutBusy(true);
    try { await api('/auth/logout', 'POST', {}); setSession(null); router.replace('/account'); }
    catch (failure) { setError({ message: failure instanceof Error ? failure.message : 'Sign out failed. Please retry.' }); }
    finally { setLogoutBusy(false); }
  }
  if (checking) return <div className="admin-gate"><ShieldCheck size={30} aria-hidden="true" /><p role="status">Checking operations access…</p></div>;
  if (error || !session) return <div className="admin-gate"><ShieldCheck size={30} aria-hidden="true" /><h1>{error?.status === 403 ? 'Access restricted' : 'Operations unavailable'}</h1><p role="alert">{error?.status === 403 ? 'This account does not have permission to use the operations portal.' : error?.message || 'Please sign in to continue.'}</p><div className="admin-actions"><button className="admin-button" onClick={refreshSession}>Check again</button><Link className="admin-button admin-button-secondary" href="/account">Your account</Link><Link className="admin-link" href="/">Back to shop</Link></div></div>;
  const can = (permission: string) => session.permissions.includes(permission);
  const navigation = <>{navItems.filter(item => can(item.permission)).map(item => {
    const href = item.key === 'dashboard' ? '/admin' : `/admin/${item.key}`;
    const active = item.key === 'dashboard' ? pathname === '/admin' || pathname === '/admin/dashboard' : pathname === href || pathname.startsWith(href + '/') || (item.key === 'products' && /^\/admin\/(variants|categories)(\/|$)/.test(pathname));
    return <Link key={item.key} href={href} aria-current={active ? 'page' : undefined}><span>{item.title}</span>{active && <ChevronRight size={14} aria-hidden="true" />}</Link>;
  })}</>;
  return <AdminContext.Provider value={{ session, can, refreshSession, handleError }}><div className="admin-shell">
    <aside className="admin-sidebar"><Link className="admin-wordmark" href="/admin">Gourmet<span>Operations</span></Link><nav aria-label="Operations navigation">{navigation}</nav><Link className="admin-store-link" href="/">Open storefront <ArrowUpRight size={15} aria-hidden="true" /></Link></aside>
    <div className="admin-workspace"><header className="admin-topbar"><details className="admin-mobile-nav" key={pathname}><summary><Menu size={18} aria-hidden="true" /> Menu</summary><nav aria-label="Mobile operations navigation">{navigation}</nav></details><span className="admin-workspace-label">The Gourmet / Operations</span><div className="admin-identity"><span><strong>{session.user.role}</strong><span>{session.user.email}</span></span><button className="admin-icon-button" onClick={() => void logout()} disabled={logoutBusy} aria-label={logoutBusy ? 'Signing out' : 'Sign out'}><LogOut size={18} aria-hidden="true" /></button></div></header><div className="admin-content" key={`${session.user.id}:${session.permissions.join(',')}`}>{children}</div><p className="admin-footer-note">Private operations workspace · {session.reporting?.timezone || 'Dates shown in UTC until reporting is configured'}</p></div>
  </div></AdminContext.Provider>;
}
