import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { UAParser } from 'ua-parser-js';

export function proxy(request: NextRequest) {
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
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
