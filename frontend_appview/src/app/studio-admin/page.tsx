'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Download,
  RefreshCw,
  MapPin,
  Clock,
  Users,
  MessageSquare,
  Search,
  LogOut,
  Smartphone,
  Monitor,
  ChevronDown,
  ChevronUp,
  Phone,
  ExternalLink,
  Flame,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface InquiryItem {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  city?: string;
  occasion?: string;
  quantity?: string | number;
  targetDate?: string;
  message?: string;
  boxItem?: any;
  productItems?: Array<{ name: string; quantity: number }>;
  source?: string;
  ip?: string;
  geoCity?: string;
  geoRegion?: string;
  geoCountry?: string;
}

interface TopCity {
  city: string;
  visitors: number;
  inquiries: number;
  region: string;
  country: string;
  totalActivity: number;
}

interface PageHeatmapItem {
  path: string;
  views: number;
  visitors: number;
  totalTimeSec: number;
  avgTimeSec: number;
  heatPercent: number;
}

interface SessionItem {
  id: string;
  firstSeen: string;
  lastSeen: string;
  ip: string;
  geoCity: string;
  geoRegion: string;
  geoCountry: string;
  deviceType: string;
  browser: string;
  os: string;
  landingPage: string;
  referrer: string;
  totalDwellTimeSec: number;
  pagesVisited: string[];
}

interface AnalyticsData {
  summary: {
    totalVisitors: number;
    totalInquiries: number;
    inquiriesToday: number;
    inquiriesThisWeek: number;
    totalPageViews: number;
    avgDwellTimeSec: number;
    lastUpdated: string;
  };
  deviceBreakdown: Record<string, number>;
  topCities: TopCity[];
  pageHeatmap: PageHeatmapItem[];
  inquiries: InquiryItem[];
  recentSessions: SessionItem[];
}

export default function StudioAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'locations' | 'heatmap' | 'visitors'>('inquiries');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedInquiryId, setExpandedInquiryId] = useState<string | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth', { cache: 'no-store' });
        const json = await res.json();
        if (json.authenticated) {
          setIsAuthenticated(true);
          loadDashboardData();
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  const loadDashboardData = async (isSilent = false) => {
    if (!isSilent) setIsFetchingData(true);
    try {
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      } else if (!isSilent) {
        toast.error(json.error || 'Failed to refresh data.');
      }
    } catch {
      if (!isSilent) {
        toast.error('Network error loading data.');
      }
    } finally {
      if (!isSilent) setIsFetchingData(false);
    }
  };

  // Real-time dynamic polling every 4 seconds when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      loadDashboardData(true);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    setIsLoadingAuth(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', pin }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        loadDashboardData();
      } else {
        setAuthError(json.error || 'Incorrect passcode.');
        toast.error(json.error || 'Access Denied.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logout' }),
      });
      setIsAuthenticated(false);
      setData(null);
      setPin('');
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleDownloadExcel = async () => {
    setIsDownloading(true);
    const toastId = toast.loading('Exporting Excel report...');
    try {
      const res = await fetch('/api/admin/export');
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      const today = new Date().toISOString().slice(0, 10);
      a.download = `The_Gourmet_Gifts_Report_${today}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      toast.success('Report downloaded.', { id: toastId });
    } catch {
      toast.error('Could not download Excel report.', { id: toastId });
    } finally {
      setIsDownloading(false);
    }
  };

  const formatTimeAgo = (iso?: string) => {
    if (!iso) return 'Just now';
    try {
      const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
      if (diff < 60) return `${diff}s ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      return `${Math.floor(diff / 86400)}d ago`;
    } catch {
      return iso;
    }
  };

  const formatDwell = (sec?: number) => {
    if (!sec || sec <= 0) return '0s';
    if (sec < 60) return `${sec}s`;
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}m ${rem}s`;
  };

  // ══════════════════════════════════════════════════════════════
  // VIEW 1: LOADING
  // ══════════════════════════════════════════════════════════════
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center text-[#736E66]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-[0.16em] font-sans text-[#8C867D]">Connecting...</span>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // VIEW 2: PIN GATE (LIGHT LUXURY)
  // ══════════════════════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white border border-[#EAE5DC] rounded-2xl p-8 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.05)] text-center">
          
          <div className="relative w-14 h-14 mx-auto mb-4">
            <Image
              src="/icon.svg"
              alt="The Gourmet Gifts"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-2xl font-serif text-[#1A1A18] tracking-tight font-medium">
            The Gourmet Gifts
          </h1>
          <p className="text-xs uppercase tracking-[0.14em] text-[#8C7449] font-medium mt-1">
            Admin Portal
          </p>

          <form onSubmit={handleLogin} className="mt-7 space-y-4 text-left">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.12em] font-medium text-[#736E66] mb-1.5">
                Passcode
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter access code"
                autoFocus
                className="w-full bg-[#FAF8F5] border border-[#DDD7CD] focus:border-[#1A1A18] focus:bg-white rounded-lg px-4 py-3 text-center text-lg tracking-[0.25em] text-[#1A1A18] transition-all outline-none placeholder:text-[#A6A095] placeholder:tracking-normal placeholder:text-xs"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md p-2 text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoadingAuth || !pin.trim()}
              className="w-full py-3 bg-[#1A1A18] hover:bg-[#2E2B26] active:scale-[0.99] text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-lg transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingAuth ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // VIEW 3: AUTHENTICATED LIGHT DASHBOARD
  // ══════════════════════════════════════════════════════════════
  const summary = data?.summary;
  const filteredInquiries = (data?.inquiries || []).filter((inq) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      inq.name?.toLowerCase().includes(q) ||
      inq.phone?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.company?.toLowerCase().includes(q) ||
      inq.city?.toLowerCase().includes(q) ||
      inq.geoCity?.toLowerCase().includes(q) ||
      inq.occasion?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#1A1A18]">
      
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EAE5DC] px-4 sm:px-8 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Identity with Authentic Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/icon.svg"
                alt="The Gourmet Gifts"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-serif text-[#1A1A18] font-medium leading-none">
                The Gourmet Gifts
              </h1>
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#8C7449] font-medium block mt-0.5">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#DDD7CD] text-[11px] uppercase tracking-[0.1em] font-medium text-[#59554E]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Updates</span>
            </div>

            <button
              onClick={handleDownloadExcel}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A18] hover:bg-[#2C2924] text-white text-xs uppercase tracking-[0.12em] font-medium rounded-lg transition-all cursor-pointer shadow-xs disabled:opacity-60"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isDownloading ? 'Exporting...' : 'Export Excel Report'}</span>
            </button>

            <button
              onClick={() => loadDashboardData(false)}
              disabled={isFetchingData}
              title="Refresh Data"
              className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#EFECE5] border border-[#DDD7CD] text-[#59554E] hover:text-[#1A1A18] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isFetchingData ? 'animate-spin text-[#8C7449]' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-red-50 border border-[#DDD7CD] hover:border-red-200 text-[#59554E] hover:text-red-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* ── Main Container ── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">

        {/* ═══ 1. KPI CARDS ═══ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Card 1: Total Inquiries */}
          <div className="bg-white border border-[#EAE5DC] rounded-xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-[#8A857C] text-xs font-medium mb-1">
              <span>Inquiries</span>
              <MessageSquare className="w-4 h-4 text-[#8C7449]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#1A1A18] font-normal">
              {summary?.totalInquiries ?? 0}
            </div>
            <div className="mt-2 text-xs text-[#736E66]">
              <span className="text-[#1A1A18] font-semibold">+{summary?.inquiriesToday ?? 0}</span> today • {summary?.inquiriesThisWeek ?? 0} this week
            </div>
          </div>

          {/* Card 2: Total Visitors */}
          <div className="bg-white border border-[#EAE5DC] rounded-xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-[#8A857C] text-xs font-medium mb-1">
              <span>Visitors</span>
              <Users className="w-4 h-4 text-[#8C7449]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#1A1A18] font-normal">
              {summary?.totalVisitors ?? 0}
            </div>
            <div className="mt-2 text-xs text-[#736E66]">
              {summary?.totalPageViews ?? 0} page views recorded
            </div>
          </div>

          {/* Card 3: Top Location */}
          <div className="bg-white border border-[#EAE5DC] rounded-xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-[#8A857C] text-xs font-medium mb-1">
              <span>Top Location</span>
              <MapPin className="w-4 h-4 text-[#8C7449]" />
            </div>
            <div className="text-xl sm:text-2xl font-serif text-[#1A1A18] font-normal truncate">
              {data?.topCities && data.topCities.length > 0 ? data.topCities[0].city : '—'}
            </div>
            <div className="mt-2 text-xs text-[#736E66] truncate">
              {data?.topCities && data.topCities.length > 0
                ? `${data.topCities[0].inquiries} orders • ${data.topCities[0].visitors} visitors`
                : 'Awaiting visitors'}
            </div>
          </div>

          {/* Card 4: Average Time */}
          <div className="bg-white border border-[#EAE5DC] rounded-xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between text-[#8A857C] text-xs font-medium mb-1">
              <span>Avg Time on Site</span>
              <Clock className="w-4 h-4 text-[#8C7449]" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-[#1A1A18] font-normal">
              {formatDwell(summary?.avgDwellTimeSec)}
            </div>
            <div className="mt-2 text-xs text-[#736E66]">
              Active user engagement
            </div>
          </div>

        </div>

        {/* ═══ 2. TABS NAVIGATION ═══ */}
        <div className="flex items-center gap-1.5 border-b border-[#E5DFD4] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'bg-white text-[#1A1A18] border border-[#DDD7CD] shadow-xs font-semibold'
                : 'text-[#736E66] hover:text-[#1A1A18] hover:bg-white/50'
            }`}
          >
            Inquiries &amp; Orders ({data?.inquiries?.length || 0})
          </button>
          
          <button
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'locations'
                ? 'bg-white text-[#1A1A18] border border-[#DDD7CD] shadow-xs font-semibold'
                : 'text-[#736E66] hover:text-[#1A1A18] hover:bg-white/50'
            }`}
          >
            Locations ({data?.topCities?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'heatmap'
                ? 'bg-white text-[#1A1A18] border border-[#DDD7CD] shadow-xs font-semibold'
                : 'text-[#736E66] hover:text-[#1A1A18] hover:bg-white/50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Page Heatmap ({data?.pageHeatmap?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('visitors')}
            className={`px-4 py-2 text-xs uppercase tracking-[0.12em] font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'visitors'
                ? 'bg-white text-[#1A1A18] border border-[#DDD7CD] shadow-xs font-semibold'
                : 'text-[#736E66] hover:text-[#1A1A18] hover:bg-white/50'
            }`}
          >
            Visitors ({data?.recentSessions?.length || 0})
          </button>
        </div>

        {/* ═══ TAB 1: INQUIRIES & ORDERS ═══ */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C867D]" />
                <input
                  type="text"
                  placeholder="Search by name, phone, email, city, company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-[#DDD7CD] focus:border-[#1A1A18] rounded-lg pl-10 pr-4 py-2 text-xs text-[#1A1A18] placeholder:text-[#9E988F] outline-none transition-colors"
                />
              </div>

              <span className="text-xs text-[#8A857C] font-medium self-end sm:self-auto">
                {filteredInquiries.length} {filteredInquiries.length === 1 ? 'record' : 'records'}
              </span>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="bg-white border border-[#EAE5DC] rounded-xl p-12 text-center text-[#736E66]">
                <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center mx-auto mb-3 text-[#8C7449]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-[#1A1A18]">No inquiries recorded yet</p>
                <p className="text-xs text-[#8C867D] mt-1">
                  Customer inquiries submitted via the website will immediately populate here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredInquiries.map((inq) => {
                  const isExpanded = expandedInquiryId === inq.id;
                  const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');

                  return (
                    <div
                      key={inq.id}
                      className="bg-white border border-[#EAE5DC] hover:border-[#D6CEC1] rounded-xl transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)] overflow-hidden"
                    >
                      {/* Summary Row */}
                      <div
                        onClick={() => setExpandedInquiryId(isExpanded ? null : inq.id)}
                        className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none"
                      >
                        {/* Client Identity */}
                        <div className="flex items-start gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-[#F5F2EC] border border-[#E3DCCF] flex items-center justify-center font-serif text-lg text-[#6B001A] shrink-0">
                            {inq.name ? inq.name.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm sm:text-base font-semibold text-[#1A1A18] truncate">
                                {inq.name}
                              </h3>
                              {inq.company && (
                                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-medium bg-[#F5F2EC] border border-[#E3DCCF] text-[#6B001A]">
                                  {inq.company}
                                </span>
                              )}
                              <span className="text-xs text-[#8C867D]">
                                • {formatTimeAgo(inq.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[#59554E] flex-wrap">
                              <span>📞 {inq.phone}</span>
                              <span>✉️ {inq.email}</span>
                            </div>
                          </div>
                        </div>

                        {/* Location & Quantity */}
                        <div className="flex items-center gap-4 self-end md:self-auto shrink-0">
                          <div className="text-right">
                            <div className="inline-flex items-center gap-1 text-xs font-medium text-[#1A1A18] bg-[#F5F2EC] px-2.5 py-1 rounded-md border border-[#E3DCCF]">
                              <MapPin className="w-3.5 h-3.5 text-[#8C7449]" />
                              <span>{inq.geoCity || inq.city || 'India'}</span>
                            </div>
                            <div className="text-[11px] text-[#736E66] mt-0.5">
                              Qty: {inq.quantity || '1'}
                            </div>
                          </div>

                          <div className="p-1 text-[#8C867D]">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details Drawer */}
                      {isExpanded && (
                        <div className="border-t border-[#EAE5DC] bg-[#FAF8F5] p-4 sm:p-6 space-y-4 text-xs">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            
                            {/* Col 1: Location & IP */}
                            <div className="bg-white p-3.5 rounded-lg border border-[#EAE5DC] space-y-1.5">
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C867D] block">
                                Location Details
                              </span>
                              <p><strong className="text-[#736E66]">Stated City:</strong> {inq.city || 'Not specified'}</p>
                              <p><strong className="text-[#736E66]">Detected Location:</strong> {inq.geoCity}, {inq.geoRegion} ({inq.geoCountry})</p>
                              <p><strong className="text-[#736E66]">Source:</strong> {inq.source || 'Website'}</p>
                            </div>

                            {/* Col 2: Event Details */}
                            <div className="bg-white p-3.5 rounded-lg border border-[#EAE5DC] space-y-1.5">
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C867D] block">
                                Requirement Specs
                              </span>
                              <p><strong className="text-[#736E66]">Occasion:</strong> {inq.occasion || 'General'}</p>
                              <p><strong className="text-[#736E66]">Quantity:</strong> {inq.quantity || '1'}</p>
                              <p><strong className="text-[#736E66]">Target Date:</strong> {inq.targetDate || 'Flexible'}</p>
                              <p><strong className="text-[#736E66]">Vessel:</strong> {inq.boxItem?.name || inq.boxItem || 'Not selected'}</p>
                            </div>

                            {/* Col 3: Quick Outreach */}
                            <div className="bg-white p-3.5 rounded-lg border border-[#EAE5DC] flex flex-col justify-between">
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C867D] block mb-2">
                                Contact Client
                              </span>
                              <div className="space-y-2">
                                <a
                                  href={`https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`}?text=${encodeURIComponent(`Hello ${inq.name}, thank you for reaching out to The Gourmet Gifts regarding your inquiry!`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#E7F6EC] hover:bg-[#D4EEDC] border border-[#BDE3CA] text-[#1E6B39] font-medium rounded text-xs transition-colors"
                                >
                                  <span>WhatsApp</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                                <a
                                  href={`tel:${inq.phone}`}
                                  className="w-full flex items-center justify-center gap-2 py-2 bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#DDD7CD] text-[#1A1A18] font-medium rounded text-xs transition-colors"
                                >
                                  <Phone className="w-3 h-3" />
                                  <span>Call {inq.phone}</span>
                                </a>
                              </div>
                            </div>

                          </div>

                          {/* Delicacies */}
                          {Array.isArray(inq.productItems) && inq.productItems.length > 0 && (
                            <div className="bg-white p-3.5 rounded-lg border border-[#EAE5DC]">
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C867D] block mb-2">
                                Selected Items ({inq.productItems.length})
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {inq.productItems.map((prod, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-[#FAF8F5] border border-[#EAE5DC] rounded text-xs text-[#1A1A18]"
                                  >
                                    {prod.name} <span className="text-[#8C867D]">×{prod.quantity || 1}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Message */}
                          {inq.message && (
                            <div className="bg-white p-3.5 rounded-lg border border-[#EAE5DC]">
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C867D] block mb-1">
                                Client Note
                              </span>
                              <p className="text-[#1A1A18] italic text-xs leading-relaxed">
                                &ldquo;{inq.message}&rdquo;
                              </p>
                            </div>
                          )}

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ═══ TAB 2: LOCATIONS ═══ */}
        {activeTab === 'locations' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#EAE5DC] rounded-xl overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 border-b border-[#EAE5DC] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-serif text-[#1A1A18] font-medium">Top Cities &amp; Regions</h2>
                  <p className="text-xs text-[#736E66]">Real visitor locations and conversion tally</p>
                </div>
                <button
                  onClick={handleDownloadExcel}
                  className="text-xs text-[#8C7449] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Sheet</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#736E66] border-b border-[#EAE5DC]">
                    <tr>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider">#</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider">City</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider">State / Region</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-right">Inquiries</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-right">Visitors</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-right">Conversion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5DC]">
                    {(data?.topCities || []).length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-10 text-center text-[#8C867D]">
                          No geographic records yet. Locations will record as users browse or enquire.
                        </td>
                      </tr>
                    ) : (
                      (data?.topCities || []).map((city, idx) => {
                        const conversion = city.visitors > 0 ? ((city.inquiries / city.visitors) * 100).toFixed(1) : '100';
                        return (
                          <tr key={city.city} className="hover:bg-[#FAF8F5] transition-colors">
                            <td className="px-5 py-3.5 text-[#8C867D]">{idx + 1}</td>
                            <td className="px-5 py-3.5 font-medium text-sm text-[#1A1A18]">
                              {city.city}
                            </td>
                            <td className="px-5 py-3.5 text-[#59554E]">{city.region || city.country}</td>
                            <td className="px-5 py-3.5 text-right font-semibold text-[#1E6B39]">
                              {city.inquiries}
                            </td>
                            <td className="px-5 py-3.5 text-right text-[#1A1A18]">
                              {city.visitors}
                            </td>
                            <td className="px-5 py-3.5 text-right font-medium text-[#8C7449]">
                              {conversion}%
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB 3: PAGE HEATMAP ═══ */}
        {activeTab === 'heatmap' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#EAE5DC] rounded-xl overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 border-b border-[#EAE5DC] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-serif text-[#1A1A18] font-medium flex items-center gap-2">
                    <span>Page Traffic &amp; Engagement Heatmap</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF4EB] text-[#8C7449] border border-[#EAE0D1] font-sans font-medium">
                      Real Activity
                    </span>
                  </h2>
                  <p className="text-xs text-[#736E66] mt-0.5">
                    Visual heat intensity based on page views and dwell time
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[#EAE5DC]">
                {(data?.pageHeatmap || []).length === 0 ? (
                  <div className="p-10 text-center text-[#8C867D]">
                    No page visits recorded yet. As visitors navigate the site, page heat levels will display here.
                  </div>
                ) : (
                  (data?.pageHeatmap || []).map((page, idx) => {
                    const isHot = page.heatPercent >= 70;
                    const isWarm = page.heatPercent >= 35 && page.heatPercent < 70;

                    return (
                      <div key={page.path} className="p-4 sm:p-5 hover:bg-[#FAF8F5] transition-colors space-y-2.5">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-[#F5F2EC] border border-[#E3DCCF] flex items-center justify-center text-xs font-semibold text-[#1A1A18]">
                              {idx + 1}
                            </span>
                            <span className="font-mono text-xs sm:text-sm font-semibold text-[#1A1A18]">
                              {page.path}
                            </span>
                            {isHot && (
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#FDF0ED] text-[#A62B17] border border-[#F5C7BE]">
                                High Activity
                              </span>
                            )}
                            {isWarm && (
                              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-medium bg-[#FBF6EE] text-[#8C7449] border border-[#EAE0D1]">
                                Moderate
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-xs text-[#59554E] self-end sm:self-auto">
                            <span><strong>{page.views}</strong> views</span>
                            <span><strong>{page.visitors}</strong> unique users</span>
                            <span>Avg <strong>{formatDwell(page.avgTimeSec)}</strong></span>
                          </div>
                        </div>

                        {/* Visual Heat Bar */}
                        <div className="w-full bg-[#EFECE5] h-2.5 rounded-full overflow-hidden relative">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isHot
                                ? 'bg-gradient-to-r from-[#C5A880] to-[#8C2332]'
                                : isWarm
                                ? 'bg-gradient-to-r from-[#D9C4A7] to-[#C5A880]'
                                : 'bg-[#D6CEBF]'
                            }`}
                            style={{ width: `${Math.max(page.heatPercent, 6)}%` }}
                          />
                        </div>

                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══ TAB 4: VISITORS STREAM ═══ */}
        {activeTab === 'visitors' && (
          <div className="space-y-4">
            <div className="bg-white border border-[#EAE5DC] rounded-xl overflow-hidden shadow-xs">
              <div className="p-4 sm:p-5 border-b border-[#EAE5DC] flex items-center justify-between">
                <div>
                  <h2 className="text-base font-serif text-[#1A1A18] font-medium">Recent Visitor Sessions</h2>
                  <p className="text-xs text-[#736E66]">Real-time visitor devices and active time</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#736E66]">
                  <span className="flex items-center gap-1">
                    <Monitor className="w-3.5 h-3.5" /> Desktop: {data?.deviceBreakdown?.Desktop || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5" /> Mobile: {data?.deviceBreakdown?.Mobile || 0}
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] text-[#736E66] border-b border-[#EAE5DC]">
                    <tr>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider">Active</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider">Location</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider">Device &amp; Browser</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider">Pages Visited</th>
                      <th className="px-5 py-3 font-semibold uppercase tracking-wider text-right">Time Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE5DC]">
                    {(data?.recentSessions || []).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-10 text-center text-[#8C867D]">
                          No active visitor sessions recorded yet.
                        </td>
                      </tr>
                    ) : (
                      (data?.recentSessions || []).map((s) => (
                        <tr key={s.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="px-5 py-3.5 text-[#8C867D]">{formatTimeAgo(s.lastSeen)}</td>
                          <td className="px-5 py-3.5 font-medium text-[#1A1A18]">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#8C7449]" />
                              <span>{s.geoCity}</span>
                              {s.geoCountry && <span className="text-xs text-[#8C867D]">({s.geoCountry})</span>}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 text-[#59554E]">
                            {s.deviceType} • {s.browser} ({s.os})
                          </td>
                          <td className="px-5 py-3.5 text-[#1A1A18]">
                            <span className="font-mono text-xs">{s.landingPage}</span>
                            {s.pagesVisited && s.pagesVisited.length > 1 && (
                              <span className="text-[#8C867D] text-[11px] ml-1">
                                (+{s.pagesVisited.length - 1} more)
                              </span>
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-right font-medium text-[#1A1A18]">
                            {formatDwell(s.totalDwellTimeSec)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
