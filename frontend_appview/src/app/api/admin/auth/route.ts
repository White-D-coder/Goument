import { NextRequest, NextResponse } from 'next/server';
import {
  isAdminAuthConfigured,
  verifyAdminPin,
  ADMIN_COOKIE_NAME,
  createSessionToken,
  verifyAdminRequest,
  checkRateLimit,
  registerFailedAttempt,
  resetRateLimit,
} from '@/lib/security/adminAuth';
import { extractClientIp } from '@/lib/geo/ipGeo';

export const dynamic = 'force-dynamic';

const privateJson = (body: unknown, status = 200) => NextResponse.json(body, {
  status,
  headers: { 'Cache-Control': 'private, no-store' },
});

export async function GET(req: NextRequest) {
  const isAuth = verifyAdminRequest(req);
  return privateJson({ authenticated: isAuth });
}

export async function POST(req: NextRequest) {
  const ip = extractClientIp(req);

  try {
    const body = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body) ||
        (body.action !== undefined && typeof body.action !== 'string') ||
        (body.pin !== undefined && typeof body.pin !== 'string')) {
      return privateJson({ success: false, error: 'Invalid authentication request.' }, 400);
    }
    const action = body.action || 'login';

    if (action === 'logout') {
      const response = privateJson({ success: true, message: 'Logged out.' });
      response.cookies.delete(ADMIN_COOKIE_NAME);
      return response;
    }

    if (action === 'login') {
      if (!isAdminAuthConfigured()) {
        return privateJson({ success: false, error: 'Admin authentication unavailable.' }, 503);
      }
      // 1. Check Rate Limit
      const rateCheck = checkRateLimit(ip);
      if (!rateCheck.allowed) {
        return privateJson(
          {
            success: false,
            error: `Security Alert: Too many failed attempts. Access locked for ${rateCheck.remainingMinutes} minutes.`,
          },
          429
        );
      }

      const pin = (body.pin || '').trim();

      if (!pin || !verifyAdminPin(pin)) {
        const failStatus = registerFailedAttempt(ip);
        if (failStatus.locked) {
          return privateJson(
            {
              success: false,
              error: `Security Alert: 5 consecutive failed attempts. Portal locked for 15 minutes.`,
            },
            429
          );
        }
        return privateJson(
          { success: false, error: 'Invalid security PIN. Access denied.' },
          401
        );
      }

      // Successful login -> reset rate limit
      resetRateLimit(ip);

      const token = createSessionToken();
      const response = privateJson({
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

    return privateJson({ success: false, error: 'Unknown action.' }, 400);
  } catch {
    return privateJson({ success: false, error: 'Invalid authentication request.' }, 400);
  }
}
