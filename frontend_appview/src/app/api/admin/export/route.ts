import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { verifyAdminRequest } from '@/lib/security/adminAuth';
import { readVaultData, SessionRecord, InquiryRecord } from '@/lib/security/vault';

export const dynamic = 'force-dynamic';

function formatDateTimeIST(isoStr?: string) {
  if (!isoStr) return { date: '—', time: '—', full: '—' };
  try {
    const d = new Date(isoStr);
    const date = d.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const time = d.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    return { date, time, full: `${date} at ${time} IST` };
  } catch {
    return { date: isoStr || '—', time: '', full: isoStr || '—' };
  }
}

function getCatalogSectionName(path: string): string {
  const clean = (path || '/').split('?')[0].split('#')[0] || '/';
  if (clean === '/' || clean === '') return 'Homepage & Luxury Atelier';
  if (clean.includes('builder') || clean.includes('bespoke') || clean.includes('hamper')) return 'Bespoke Hamper Builder';
  if (clean.includes('curated') || clean.includes('boxes')) return 'Curated Luxury Collections';
  if (clean.includes('corporate') || clean.includes('b2b')) return 'Corporate Gifting Suite';
  if (clean.includes('diwali')) return 'Diwali Festive Catalog';
  if (clean.includes('wedding')) return 'Wedding & Celebrations Suite';
  if (clean.includes('delicacies') || clean.includes('products')) return 'Gourmet Delicacies Pantry';
  if (clean.includes('about')) return 'Brand Heritage & Atelier';
  if (clean.includes('contact') || clean.includes('inquiry')) return 'Concierge Inquiry Contact';
  
  // Clean fallback
  return clean
    .replace(/^\//, '')
    .replace(/[-_/]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase()) || 'General Route';
}

function getVerificationStatus(statedCity?: string, detectedCity?: string, detectedRegion?: string): string {
  const stated = (statedCity || '').trim().toLowerCase();
  const detected = (detectedCity || '').trim().toLowerCase();
  const region = (detectedRegion || '').trim().toLowerCase();

  if (!stated && !detected) return 'Unspecified Location';
  if (stated && detected && (stated.includes(detected) || detected.includes(stated) || region.includes(stated))) {
    return `Verified Match (${detectedCity || statedCity}) ✅`;
  }
  if (stated && detected) {
    return `Cross-City (Client: ${statedCity} | Detected: ${detectedCity}) 🌐`;
  }
  if (stated) return `Stated: ${statedCity} (IP Pending)`;
  return `Detected: ${detectedCity} (Auto-filled)`;
}

export async function GET(req: NextRequest) {
  if (!verifyAdminRequest(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const vault = await readVaultData();
    const sessions = Object.values(vault.sessions || {}) as SessionRecord[];
    const inquiries = vault.inquiries || [];
    const nowIST = formatDateTimeIST(new Date().toISOString());

    // Sort inquiries newest first
    const sortedInquiries = [...inquiries].sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );

    // Sort sessions newest first
    const sortedSessions = [...sessions].sort(
      (a, b) => new Date(b.lastSeen || 0).getTime() - new Date(a.lastSeen || 0).getTime()
    );

    // Calculate Active Sessions (within last 5 minutes)
    const activeThresholdMs = 5 * 60 * 1000;
    const nowMs = Date.now();
    const activeSessionsCount = sessions.filter(
      (s) => nowMs - new Date(s.lastSeen || 0).getTime() < activeThresholdMs
    ).length;

    // Aggregate City Demand
    const cityMap: Record<string, { city: string; region: string; country: string; visitors: number; inquiries: number }> = {};
    sessions.forEach((s) => {
      const city = s.geoCity || 'Unknown City';
      if (!cityMap[city]) {
        cityMap[city] = { city, region: s.geoRegion || '', country: s.geoCountry || 'India', visitors: 0, inquiries: 0 };
      }
      cityMap[city].visitors += 1;
    });
    inquiries.forEach((inq) => {
      const city = inq.geoCity || inq.city || 'Unknown City';
      if (!cityMap[city]) {
        cityMap[city] = { city, region: inq.geoRegion || '', country: inq.geoCountry || 'India', visitors: 0, inquiries: 0 };
      }
      cityMap[city].inquiries += 1;
    });

    const topCitiesList = Object.values(cityMap).sort(
      (a, b) => b.inquiries * 3 + b.visitors - (a.inquiries * 3 + a.visitors)
    );

    // Aggregate Page Heatmap & Engagement
    const pageStats: Record<string, { path: string; name: string; views: number; visitors: Set<string>; totalTimeSec: number }> = {};
    sessions.forEach((s) => {
      const pages = s.pagesVisited?.length ? s.pagesVisited : [s.landingPage || '/'];
      const timePer = pages.length > 0 ? Math.round((s.totalDwellTimeSec || 0) / pages.length) : 0;
      pages.forEach((p) => {
        const cleanPath = p.split('?')[0].split('#')[0] || '/';
        if (!pageStats[cleanPath]) {
          pageStats[cleanPath] = {
            path: cleanPath,
            name: getCatalogSectionName(cleanPath),
            views: 1,
            visitors: new Set([s.id]),
            totalTimeSec: timePer,
          };
        } else {
          pageStats[cleanPath].views += 1;
          pageStats[cleanPath].visitors.add(s.id);
          pageStats[cleanPath].totalTimeSec += timePer;
        }
      });
    });

    const heatmapList = Object.values(pageStats).sort((a, b) => b.views - a.views);

    // Calculate Average Dwell Time across sessions
    const totalDwellAll = sessions.reduce((acc, s) => acc + (s.totalDwellTimeSec || 0), 0);
    const avgDwellSecAll = sessions.length > 0 ? Math.round(totalDwellAll / sessions.length) : 0;
    const avgDwellFormatted = `${Math.floor(avgDwellSecAll / 60)}m ${avgDwellSecAll % 60}s`;

    // Initialize Workbook
    const workbook = XLSX.utils.book_new();

    // =========================================================================
    // SHEET 1: EXECUTIVE OVERVIEW & KPI SUMMARY
    // =========================================================================
    const topCitiesSummary = topCitiesList.slice(0, 3).map((c) => c.city).join(', ') || 'National (Pan-India)';
    const mostEngagingRoute = heatmapList[0] ? `${heatmapList[0].name} (${heatmapList[0].path})` : 'Homepage & Atelier (/)';

    const summaryAoa: any[][] = [
      ['THE GOURMET GIFTS — EXECUTIVE INTELLIGENCE & INQUIRY REPORT'],
      ['Confidential Document | Prepared for Senior Leadership & B2B Concierge Operations'],
      [`Report Generated: ${nowIST.full} | Time Zone: Asia/Kolkata (IST) | Security: AES-256 Vault Verified`],
      [],
      ['1. KEY PERFORMANCE INDICATORS (KPIs)', '', '', ''],
      ['Metric Name', 'Current Value', 'Operational Context / Detail', 'System Status'],
      ['Total B2B Inquiries & Leads Received', inquiries.length, 'Direct corporate gifting, bespoke hampers, and catalog inquiries', 'Active Pipeline ✅'],
      ['Total Tracked Corporate Visitor Sessions', sessions.length, 'Distinct corporate buyer browser sessions recorded', 'Synchronized ✅'],
      ['Live Active Corporate Sessions', activeSessionsCount, 'Corporate buyers actively browsing the catalog in last 5 minutes', '🟢 Real-time Active'],
      ['Top Regional Demand Hubs', topCitiesSummary, 'Metros driving the highest inquiry submissions & session traffic', 'Strategic Target'],
      ['Most Visited Catalog Experience', mostEngagingRoute, 'Catalog section capturing the highest corporate dwell time', 'High Interest 🔥'],
      ['Average Buyer Dwell Time', avgDwellFormatted, 'Mean attention duration across all corporate sessions', 'High Engagement'],
      [],
      ['2. TOP CORPORATE HUBS & GEOGRAPHIC DEMAND', '', '', '', '', ''],
      ['City / Metro', 'State / Region', 'Country', 'Visitor Sessions', 'Inquiries Filed', 'Conversion Activity Index'],
      ...(topCitiesList.length > 0
        ? topCitiesList.slice(0, 15).map((c) => [
            c.city,
            c.region || '—',
            c.country || 'India',
            c.visitors,
            c.inquiries,
            c.visitors > 0 ? `${((c.inquiries / c.visitors) * 100).toFixed(1)}%` : '—',
          ])
        : [['No city sessions recorded yet', '—', '—', 0, 0, '—']]),
      [],
      ['3. CATALOG ATTENTION & ENGAGEMENT SUMMARY', '', '', '', '', ''],
      ['Catalog Experience / Section', 'Route URL', 'Total Page Views', 'Unique Visitors', 'Total Attention (Min)', 'Avg Attention (Sec)'],
      ...(heatmapList.length > 0
        ? heatmapList.slice(0, 15).map((h) => [
            h.name,
            h.path,
            h.views,
            h.visitors.size,
            (h.totalTimeSec / 60).toFixed(1),
            h.views > 0 ? Math.round(h.totalTimeSec / h.views) : 0,
          ])
        : [['Homepage & Luxury Atelier', '/', 0, 0, '0.0', 0]]),
    ];

    const wsSummary = XLSX.utils.aoa_to_sheet(summaryAoa);
    wsSummary['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 5 } },
      { s: { r: 4, c: 0 }, e: { r: 4, c: 3 } },
      { s: { r: 13, c: 0 }, e: { r: 13, c: 5 } },
      { s: { r: topCitiesList.length + 16, c: 0 }, e: { r: topCitiesList.length + 16, c: 5 } },
    ];
    wsSummary['!cols'] = [
      { wch: 38 }, // Metric / City / Catalog Name
      { wch: 28 }, // Value / State / Route
      { wch: 36 }, // Context / Country / Views
      { wch: 22 }, // Status / Visitors
      { wch: 22 }, // Inquiries / Total Min
      { wch: 26 }, // Conversion / Avg Sec
    ];

    // =========================================================================
    // SHEET 2: INQUIRIES & CLIENT LEADS (19 Columns, Full Professional Layout)
    // =========================================================================
    const inquiryHeaders = [
      'Sl No.',
      'Inquiry Reference ID',
      'Date (IST)',
      'Time (IST)',
      'Client Full Name',
      'Company / Organization',
      'Contact Number',
      'Official Email',
      'Stated Delivery City',
      'Detected Physical Location',
      'Location Verification Status',
      'Gifting Occasion / Purpose',
      'Order Quantity (Units)',
      'Target Delivery Date',
      'Selected Vessel / Packaging',
      'Curated Delicacies & Items',
      'Client Instructions & Notes',
      'Acquisition Touchpoint',
      'Lead Pipeline Status',
    ];

    const inquiryRows: any[][] = sortedInquiries.map((inq, idx) => {
      const dt = formatDateTimeIST(inq.createdAt);
      const boxName = inq.boxItem?.name || (typeof inq.boxItem === 'string' ? inq.boxItem : 'Standard Luxury Presentation');
      const itemsList = Array.isArray(inq.productItems) && inq.productItems.length > 0
        ? inq.productItems.map((p) => `${p.name} (Qty: ${p.quantity || 1})`).join('; ')
        : 'Custom Concierge Selection';

      const detectedLocation = [inq.geoCity, inq.geoRegion, inq.geoCountry]
        .filter(Boolean)
        .join(', ') || 'Pending Verification';

      const verification = getVerificationStatus(inq.city, inq.geoCity, inq.geoRegion);
      const quantityDisplay = inq.quantity ? `${inq.quantity} Hampers / Units` : 'Custom Curation';

      return [
        idx + 1,
        inq.id || `INQ-${(idx + 1).toString().padStart(4, '0')}`,
        dt.date,
        dt.time,
        inq.name || 'Private Client',
        inq.company || 'Private Client / Not Disclosed',
        inq.phone || '—',
        inq.email || '—',
        inq.city || 'Not Specified',
        detectedLocation,
        verification,
        inq.occasion || 'Corporate Gifting',
        quantityDisplay,
        inq.targetDate || 'Flexible / Urgent',
        boxName,
        itemsList,
        inq.message || 'None provided',
        inq.source || 'Website Concierge Form',
        'New Lead — Awaiting Concierge Outreach',
      ];
    });

    const inquiriesAoa: any[][] = [
      ['THE GOURMET GIFTS — CLIENT INQUIRIES & CORPORATE LEAD REGISTRY'],
      ['Classification: STRICTLY CONFIDENTIAL | Inbound B2B Inquiries & Custom Hamper Commissions'],
      [`Total Recorded Leads: ${sortedInquiries.length} | Generated: ${nowIST.full} | Currency: INR (₹)`],
      [],
      inquiryHeaders,
      ...(inquiryRows.length > 0
        ? inquiryRows
        : [[
            1,
            'NO-LEADS-YET',
            nowIST.date,
            nowIST.time,
            'No corporate inquiries submitted in vault yet',
            '—',
            '—',
            '—',
            '—',
            '—',
            'Ready for Submissions',
            '—',
            '—',
            '—',
            '—',
            '—',
            'Inquiries submitted via website forms will automatically populate this sheet',
            'Website Listener Active',
            'Ready',
          ]]),
    ];

    const wsInquiries = XLSX.utils.aoa_to_sheet(inquiriesAoa);
    wsInquiries['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: inquiryHeaders.length - 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: inquiryHeaders.length - 1 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: inquiryHeaders.length - 1 } },
    ];
    wsInquiries['!cols'] = [
      { wch: 8 },  // Sl No.
      { wch: 22 }, // Inquiry Reference ID
      { wch: 16 }, // Date (IST)
      { wch: 14 }, // Time (IST)
      { wch: 26 }, // Client Full Name
      { wch: 28 }, // Company / Organization
      { wch: 20 }, // Contact Number
      { wch: 32 }, // Official Email
      { wch: 22 }, // Stated Delivery City
      { wch: 28 }, // Detected Physical Location
      { wch: 34 }, // Location Verification Status
      { wch: 26 }, // Gifting Occasion / Purpose
      { wch: 22 }, // Order Quantity (Units)
      { wch: 20 }, // Target Delivery Date
      { wch: 30 }, // Selected Vessel / Packaging
      { wch: 48 }, // Curated Delicacies & Items
      { wch: 52 }, // Client Instructions & Notes
      { wch: 28 }, // Acquisition Touchpoint
      { wch: 28 }, // Lead Pipeline Status
    ];

    // =========================================================================
    // SHEET 3: GEOGRAPHIC TRAFFIC & SESSIONS (17 Columns)
    // =========================================================================
    const sessionHeaders = [
      'Sl No.',
      'Session ID',
      'First Visit Date (IST)',
      'First Visit Time (IST)',
      'Last Active (IST)',
      'Detected City',
      'State / Region',
      'Country',
      'Device Type',
      'Browser',
      'Operating System',
      'Initial Entry Page',
      'Browsing Journey (All Routes)',
      'Total Pages Visited',
      'Total Dwell Time (Min)',
      'Total Dwell Time (Sec)',
      'Traffic Source / Referrer',
      'Session Status',
    ];

    const sessionRows: any[][] = sortedSessions.map((s, idx) => {
      const firstDt = formatDateTimeIST(s.firstSeen);
      const lastDt = formatDateTimeIST(s.lastSeen);
      const pages = s.pagesVisited?.length ? s.pagesVisited : [s.landingPage || '/'];
      const isLive = nowMs - new Date(s.lastSeen || 0).getTime() < activeThresholdMs;

      return [
        idx + 1,
        s.id,
        firstDt.date,
        firstDt.time,
        lastDt.time,
        s.geoCity || 'Unknown City',
        s.geoRegion || '—',
        s.geoCountry || 'India',
        s.deviceType === 'Mobile' ? 'Mobile 📱' : s.deviceType === 'Tablet' ? 'Tablet 📱' : 'Desktop 💻',
        s.browser || 'Browser',
        s.os || 'OS',
        s.landingPage || '/',
        pages.join(' → '),
        pages.length,
        ((s.totalDwellTimeSec || 0) / 60).toFixed(1),
        s.totalDwellTimeSec || 0,
        s.referrer || 'Direct / Bookmark',
        isLive ? '🟢 Active Now (<5m)' : '⚪ Completed Session',
      ];
    });

    const sessionsAoa: any[][] = [
      ['THE GOURMET GIFTS — VISITOR SESSIONS & GEOGRAPHIC INTELLIGENCE'],
      ['Dual-Layer Geolocation Log (Client GPS Reverse-Geocoding + Fallback IP Intelligence)'],
      [`Total Recorded Sessions: ${sortedSessions.length} | Generated: ${nowIST.full} | Real-Time Log`],
      [],
      sessionHeaders,
      ...(sessionRows.length > 0
        ? sessionRows
        : [[
            1,
            'NO-SESSIONS-YET',
            nowIST.date,
            nowIST.time,
            nowIST.time,
            '—',
            '—',
            'India',
            'Desktop 💻',
            'Chrome',
            'macOS',
            '/',
            '/',
            1,
            '0.0',
            0,
            'Direct',
            'Ready',
          ]]),
    ];

    const wsSessions = XLSX.utils.aoa_to_sheet(sessionsAoa);
    wsSessions['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: sessionHeaders.length - 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: sessionHeaders.length - 1 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: sessionHeaders.length - 1 } },
    ];
    wsSessions['!cols'] = [
      { wch: 8 },  // Sl No.
      { wch: 22 }, // Session ID
      { wch: 18 }, // First Visit Date
      { wch: 16 }, // First Visit Time
      { wch: 16 }, // Last Active Time
      { wch: 22 }, // City
      { wch: 22 }, // Region
      { wch: 16 }, // Country
      { wch: 16 }, // Device
      { wch: 20 }, // Browser
      { wch: 18 }, // OS
      { wch: 28 }, // Initial Page
      { wch: 52 }, // Browsing Journey
      { wch: 18 }, // Pages Count
      { wch: 20 }, // Dwell Min
      { wch: 20 }, // Dwell Sec
      { wch: 28 }, // Referrer
      { wch: 22 }, // Status
    ];

    // =========================================================================
    // SHEET 4: PAGE HEATMAP & ENGAGEMENT (9 Columns)
    // =========================================================================
    const heatmapHeaders = [
      'Rank',
      'Catalog / Section Name',
      'Route URL',
      'Total Page Views',
      'Unique Corporate Visitors',
      'Total Time Spent (Min)',
      'Total Time Spent (Sec)',
      'Avg Attention Time / Visitor (Sec)',
      'Engagement Heat Intensity',
    ];

    const maxViews = heatmapList.length > 0 ? Math.max(...heatmapList.map((h) => h.views), 1) : 1;

    const heatmapRows: any[][] = heatmapList.map((h, idx) => {
      const avgSec = h.views > 0 ? Math.round(h.totalTimeSec / h.views) : 0;
      const viewRatio = h.views / maxViews;
      let heatLabel = '☕ Casual Browse (Standard)';
      if (viewRatio >= 0.6 || avgSec > 60) {
        heatLabel = '🔥 High Demand (Top Interest)';
      } else if (viewRatio >= 0.25 || avgSec > 25) {
        heatLabel = '⚡ Moderate Corporate Interest';
      }

      return [
        idx + 1,
        h.name,
        h.path,
        h.views,
        h.visitors.size,
        (h.totalTimeSec / 60).toFixed(1),
        h.totalTimeSec,
        avgSec,
        heatLabel,
      ];
    });

    const heatmapAoa: any[][] = [
      ['THE GOURMET GIFTS — CATALOG ROUTE HEATMAP & ATTENTION METRICS'],
      ['Route Dwell Times, Visitor Density, and Corporate Catalog Heat Intensity'],
      [`Total Routes Analyzed: ${heatmapList.length} | Generated: ${nowIST.full} | Ordered by Highest Engagement`],
      [],
      heatmapHeaders,
      ...(heatmapRows.length > 0
        ? heatmapRows
        : [[
            1,
            'Homepage & Luxury Atelier',
            '/',
            1,
            1,
            '0.5',
            30,
            30,
            '🔥 High Demand (Top Interest)',
          ]]),
    ];

    const wsHeatmap = XLSX.utils.aoa_to_sheet(heatmapAoa);
    wsHeatmap['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: heatmapHeaders.length - 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: heatmapHeaders.length - 1 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: heatmapHeaders.length - 1 } },
    ];
    wsHeatmap['!cols'] = [
      { wch: 8 },  // Rank
      { wch: 36 }, // Catalog Name
      { wch: 30 }, // Route URL
      { wch: 18 }, // Views
      { wch: 24 }, // Unique Visitors
      { wch: 22 }, // Total Time Min
      { wch: 22 }, // Total Time Sec
      { wch: 28 }, // Avg Attention Sec
      { wch: 30 }, // Heat Intensity
    ];

    // Append sheets in optimal executive sequence
    XLSX.utils.book_append_sheet(workbook, wsSummary, 'Executive Overview');
    XLSX.utils.book_append_sheet(workbook, wsInquiries, 'Client Inquiries & Leads');
    XLSX.utils.book_append_sheet(workbook, wsSessions, 'Geographic Sessions');
    XLSX.utils.book_append_sheet(workbook, wsHeatmap, 'Catalog Heatmap');

    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const today = new Date().toISOString().slice(0, 10);
    const fileName = `The_Gourmet_Gifts_Executive_Report_${today}.xlsx`;

    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error: any) {
    console.error('[EXPORT] Failed to generate Excel report:', error);
    return NextResponse.json({ success: false, error: 'Failed to generate Excel report.' }, { status: 500 });
  }
}
