import { NextRequest, NextResponse } from 'next/server';
import { resolveClientGeo } from '@/lib/geo/ipGeo';
import { recordTelemetryInVault, TelemetryPayload } from '@/lib/security/vault';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const geo = await resolveClientGeo(req);
    let body: Partial<TelemetryPayload> = {};

    try {
      body = await req.json();
    } catch {
      // Ignore JSON parse errors for empty beacon pings
    }

    const payload: TelemetryPayload = {
      type: body.type === 'heartbeat' ? 'heartbeat' : 'pageview',
      sessionId: typeof body.sessionId === 'string' ? body.sessionId.slice(0, 64) : '',
      pagePath: typeof body.pagePath === 'string' ? body.pagePath.slice(0, 256) : '/',
      activeSection: typeof body.activeSection === 'string' ? body.activeSection.slice(0, 100) : undefined,
      dwellTimeSec: typeof body.dwellTimeSec === 'number' && body.dwellTimeSec > 0 && body.dwellTimeSec <= 600
        ? Math.round(body.dwellTimeSec)
        : undefined,
      deviceType: typeof body.deviceType === 'string' ? body.deviceType.slice(0, 32) : undefined,
      browser: typeof body.browser === 'string' ? body.browser.slice(0, 64) : undefined,
      os: typeof body.os === 'string' ? body.os.slice(0, 64) : undefined,
      referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : undefined,
    };

    // Asynchronously record into encrypted vault
    await recordTelemetryInVault(payload, geo);

    return NextResponse.json({ ok: true });
  } catch (error) {
    // Non-blocking, return 200 so clients never see errors or interruptions
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
