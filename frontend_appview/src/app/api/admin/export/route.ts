import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
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

    const formatDateTime = (isoStr?: string) => {
      if (!isoStr) return '';
      try {
        const d = new Date(isoStr);
        return d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      } catch {
        return isoStr;
      }
    };

    // ── Sheet 1: Inquiries & Orders ──
    const inquiryRows = inquiries.map((inq, idx) => {
      const boxName = inq.boxItem?.name || (typeof inq.boxItem === 'string' ? inq.boxItem : 'None');
      const itemsList = Array.isArray(inq.productItems)
        ? inq.productItems.map((p) => `${p.name} (Qty: ${p.quantity || 1})`).join(', ')
        : 'General Curation';

      const detectedLocation = [inq.geoCity, inq.geoRegion, inq.geoCountry]
        .filter(Boolean)
        .join(', ') || inq.city || 'India';

      return {
        'Index': idx + 1,
        'Date & Time': formatDateTime(inq.createdAt),
        'Client Name': inq.name || '',
        'Company': inq.company || '',
        'Phone Number': inq.phone || '',
        'Email Address': inq.email || '',
        'Client Stated City': inq.city || '',
        'Detected Location': detectedLocation,
        'Occasion': inq.occasion || 'General Gifting',
        'Quantity': inq.quantity || '',
        'Target Date': inq.targetDate || '',
        'Selected Vessel': boxName,
        'Attached Products': itemsList,
        'Notes & Message': inq.message || '',
        'Source Page': inq.source || 'Website',
      };
    });

    // ── Sheet 2: Locations & Traffic ──
    const sessionRows = sessions.map((s, idx) => ({
      'Index': idx + 1,
      'First Seen': formatDateTime(s.firstSeen),
      'Last Active': formatDateTime(s.lastSeen),
      'City': s.geoCity || 'Unknown',
      'Region': s.geoRegion || '',
      'Country': s.geoCountry || 'India',
      'Device': s.deviceType || 'Desktop',
      'Browser': s.browser || '',
      'OS': s.os || '',
      'Landing Page': s.landingPage || '/',
      'Pages Visited': (s.pagesVisited || []).join(', '),
      'Time Spent (Seconds)': s.totalDwellTimeSec || 0,
      'Time Spent (Minutes)': ((s.totalDwellTimeSec || 0) / 60).toFixed(1),
      'Referrer': s.referrer || 'Direct',
    }));

    // ── Sheet 3: Page Heatmap & Activity ──
    const pageStats: Record<string, { path: string; views: number; visitors: Set<string>; totalTimeSec: number }> = {};
    sessions.forEach((s) => {
      const pages = s.pagesVisited?.length ? s.pagesVisited : [s.landingPage || '/'];
      const timePer = pages.length > 0 ? Math.round((s.totalDwellTimeSec || 0) / pages.length) : 0;
      pages.forEach((p) => {
        const cleanPath = p.split('?')[0].split('#')[0] || '/';
        if (!pageStats[cleanPath]) {
          pageStats[cleanPath] = { path: cleanPath, views: 1, visitors: new Set([s.id]), totalTimeSec: timePer };
        } else {
          pageStats[cleanPath].views += 1;
          pageStats[cleanPath].visitors.add(s.id);
          pageStats[cleanPath].totalTimeSec += timePer;
        }
      });
    });

    const heatmapRows = Object.values(pageStats)
      .sort((a, b) => b.views - a.views)
      .map((p, idx) => ({
        'Index': idx + 1,
        'Page Route': p.path,
        'Total Views': p.views,
        'Unique Visitors': p.visitors.size,
        'Total Time Spent (Min)': (p.totalTimeSec / 60).toFixed(1),
        'Avg Time per User (Sec)': p.views > 0 ? Math.round(p.totalTimeSec / p.views) : 0,
      }));

    // Build multi-sheet Excel Workbook
    const workbook = XLSX.utils.book_new();

    const ws1 = XLSX.utils.json_to_sheet(inquiryRows.length > 0 ? inquiryRows : [{ Notice: 'No inquiries recorded yet.' }]);
    const ws2 = XLSX.utils.json_to_sheet(sessionRows.length > 0 ? sessionRows : [{ Notice: 'No traffic sessions recorded yet.' }]);
    const ws3 = XLSX.utils.json_to_sheet(heatmapRows.length > 0 ? heatmapRows : [{ Notice: 'No page activity recorded yet.' }]);

    [ws1, ws2, ws3].forEach((ws) => {
      ws['!cols'] = [
        { wch: 8 },
        { wch: 22 },
        { wch: 22 },
        { wch: 24 },
        { wch: 18 },
        { wch: 26 },
        { wch: 20 },
        { wch: 24 },
        { wch: 22 },
        { wch: 16 },
        { wch: 16 },
        { wch: 26 },
        { wch: 35 },
        { wch: 40 },
        { wch: 24 },
      ];
    });

    XLSX.utils.book_append_sheet(workbook, ws1, 'Inquiries & Orders');
    XLSX.utils.book_append_sheet(workbook, ws2, 'Locations & Traffic');
    XLSX.utils.book_append_sheet(workbook, ws3, 'Page Heatmap');

    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const today = new Date().toISOString().slice(0, 10);
    const fileName = `Gourmet_Gifts_Report_${today}.xlsx`;

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Failed to generate Excel report:', error);
    return NextResponse.json({ success: false, error: 'Failed to build Excel.' }, { status: 500 });
  }
}
