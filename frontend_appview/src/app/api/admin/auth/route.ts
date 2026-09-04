import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_PIN,
  ADMIN_COOKIE_NAME,
  createSessionToken,
  verifyAdminRequest,
  checkRateLimit,
  registerFailedAttempt,
  resetRateLimit,
} from '@/lib/security/adminAuth';
import { extractClientIp } from '@/lib/geo/ipGeo';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const isAuth = verifyAdminRequest(req);
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req);

  try {
    const body = await req.json();
    const action = body.action || 'login';

    if (action === 'logout') {
      const response = NextResponse.json({ success: true, message: 'Logged out.' });
      response.cookies.delete(ADMIN_COOKIE_NAME);
      return response;
    }

    if (action === 'login') {
      // 1. Check Rate Limit
      const rateCheck = checkRateLimit(ip);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          {
            success: false,
            error: `Security Alert: Too many failed attempts. Access locked for ${rateCheck.remainingMinutes} minutes.`,
          },
          { status: 429 }
        );
      }

      const pin = (body.pin || '').trim();
      const expectedPin = (process.env.ADMIN_PORTAL_PIN || ADMIN_PIN).trim();

      if (!pin || pin !== expectedPin) {
        const failStatus = registerFailedAttempt(ip);
        if (failStatus.locked) {
          return NextResponse.json(
            {
              success: false,
              error: `Security Alert: 5 consecutive failed attempts. Portal locked for 15 minutes.`,
            },
            { status: 429 }
          );
        }
        return NextResponse.json(
          { success: false, error: 'Invalid security PIN. Access denied.' },
          { status: 401 }
        );
      }

      // Successful login -> reset rate limit
      resetRateLimit(ip);

      const token = createSessionToken();
      const response = NextResponse.json({
        success: true,
        message: 'Authenticated successfully.',
      });

      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Unknown action.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}
