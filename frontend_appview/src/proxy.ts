import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UAParser } from 'ua-parser-js';
import { isPageRouteActive, isApiRouteActive } from '@/config/appRoutes.config';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Enforce API Route Active Status
  if (pathname.startsWith('/api/')) {
    if (!isApiRouteActive(pathname)) {
      return NextResponse.json(
        { success: false, error: 'This API route is currently disabled in appRoutes.config.ts' },
        { status: 503 }
      );
    }
  } else {
    // 2. Enforce Page Route Active Status (Disabled pages return 404)
    if (!isPageRouteActive(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = '/_not-found';
      return NextResponse.rewrite(url);
    }
  }

  const userAgent = request.headers.get('user-agent') || '';
  const parser = new UAParser(userAgent);
  const device = parser.getDevice();

  // Determine if phone/mobile device
  const isMobile = device.type === 'mobile' || /iPhone|Android.*Mobile|Mobile|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-device-type', isMobile ? 'mobile' : 'desktop');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Keep middleware fallback for backwards compatibility
export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files, _next, favicon
     */
    '/((?!_next/static|_next/image|favicon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
