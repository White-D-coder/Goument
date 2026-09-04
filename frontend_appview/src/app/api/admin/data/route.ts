import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/security/adminAuth';
import { readVaultData, SessionRecord } from '@/lib/security/vault';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const vault = await readVaultData();
    const sessions = Object.values(vault.sessions || {}) as SessionRecord[];
    const inquiries = vault.inquiries || [];

    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const inquiriesToday = inquiries.filter((i) => i.createdAt && i.createdAt.startsWith(todayStr)).length;
    const inquiriesThisWeek = inquiries.filter((i) => i.createdAt && new Date(i.createdAt) >= sevenDaysAgo).length;

    // Aggregations from genuine sessions
    let totalPageViews = 0;
    let totalDwellTimeSec = 0;
    const deviceCount: Record<string, number> = { Desktop: 0, Mobile: 0, Tablet: 0 };
    const cityCount: Record<string, { visitors: number; inquiries: number; region: string; country: string }> = {};

    // Page-level heatmap tracking
    const pageStats: Record<string, { path: string; views: number; uniqueVisitors: Set<string>; totalTimeSec: number }> = {};

    sessions.forEach((s) => {
      totalPageViews += (s.pagesVisited?.length || 1);
      totalDwellTimeSec += (s.totalDwellTimeSec || 0);

      const dev = s.deviceType || 'Desktop';
      deviceCount[dev] = (deviceCount[dev] || 0) + 1;

      // Location breakdown
      const city = s.geoCity && s.geoCity !== 'Unknown' ? s.geoCity : null;
      if (city) {
        if (!cityCount[city]) {
          cityCount[city] = {
            visitors: 1,
            inquiries: 0,
            region: s.geoRegion || '',
            country: s.geoCountry || 'India',
          };
        } else {
          cityCount[city].visitors += 1;
        }
      }

      // Track pages for heatmap
      const pages = Array.isArray(s.pagesVisited) && s.pagesVisited.length > 0 ? s.pagesVisited : [s.landingPage || '/'];
      const dwellPerVisit = pages.length > 0 ? Math.round((s.totalDwellTimeSec || 0) / pages.length) : 0;

      pages.forEach((p) => {
        const cleanPath = p.split('?')[0].split('#')[0] || '/';
        if (!pageStats[cleanPath]) {
          pageStats[cleanPath] = {
            path: cleanPath,
            views: 1,
            uniqueVisitors: new Set([s.id]),
            totalTimeSec: dwellPerVisit,
          };
        } else {
          pageStats[cleanPath].views += 1;
          pageStats[cleanPath].uniqueVisitors.add(s.id);
          pageStats[cleanPath].totalTimeSec += dwellPerVisit;
        }
      });
    });

    // Tally inquiries into city count
    inquiries.forEach((inq) => {
      const city = inq.geoCity || inq.city;
      if (city && city !== 'Unknown') {
        if (!cityCount[city]) {
          cityCount[city] = {
            visitors: 0,
            inquiries: 1,
            region: inq.geoRegion || '',
            country: inq.geoCountry || 'India',
          };
        } else {
          cityCount[city].inquiries += 1;
        }
      }
    });

    // Rank cities by total interactions
    const topCities = Object.entries(cityCount)
      .map(([city, data]) => ({
        city,
        visitors: data.visitors,
        inquiries: data.inquiries,
        region: data.region,
        country: data.country,
        totalActivity: data.inquiries * 2 + data.visitors,
      }))
      .sort((a, b) => b.totalActivity - a.totalActivity)
      .slice(0, 25);

    // Calculate Page Heatmap with relative heat intensity (0 to 100%)
    const rawPageList = Object.values(pageStats).map((item) => ({
      path: item.path,
      views: item.views,
      visitors: item.uniqueVisitors.size,
      totalTimeSec: item.totalTimeSec,
      avgTimeSec: item.views > 0 ? Math.round(item.totalTimeSec / item.views) : 0,
    }));

    const maxViews = Math.max(...rawPageList.map((p) => p.views), 1);
    const pageHeatmap = rawPageList
      .map((p) => ({
        ...p,
        heatPercent: Math.min(Math.round((p.views / maxViews) * 100), 100),
      }))
      .sort((a, b) => b.views - a.views);

    const avgDwellTimeSec = sessions.length > 0 ? Math.round(totalDwellTimeSec / sessions.length) : 0;

    const recentSessions = sessions
      .sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime())
      .slice(0, 50);

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalVisitors: sessions.length,
          totalInquiries: inquiries.length,
          inquiriesToday,
          inquiriesThisWeek,
          totalPageViews,
          avgDwellTimeSec,
          lastUpdated: vault.lastUpdated,
        },
        deviceBreakdown: deviceCount,
        topCities,
        pageHeatmap,
        inquiries,
        recentSessions,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to retrieve analytics.' },
      { status: 500 }
    );
  }
}
