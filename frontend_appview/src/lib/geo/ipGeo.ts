import { NextRequest } from 'next/server';

interface GeoLocationInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
}

const geoCache = new Map<string, GeoLocationInfo>();

export function extractClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map((ip) => ip.trim());
    if (ips[0]) return ips[0];
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  return '127.0.0.1';
}

export async function resolveClientGeo(req: NextRequest): Promise<GeoLocationInfo> {
  const ip = extractClientIp(req);

  // 1. Check CDN edge geolocation headers
  const vercelCity = req.headers.get('x-vercel-ip-city');
  const vercelRegion = req.headers.get('x-vercel-ip-country-region');
  const vercelCountry = req.headers.get('x-vercel-ip-country');

  const cfCity = req.headers.get('cf-ipcity');
  const cfCountry = req.headers.get('cf-ipcountry');

  if (vercelCity || cfCity) {
    return {
      ip,
      city: vercelCity ? decodeURIComponent(vercelCity) : cfCity || 'Unknown City',
      region: vercelRegion ? decodeURIComponent(vercelRegion) : '',
      country: vercelCountry || cfCountry || 'India',
    };
  }

  // 2. Local / Private network fallback
  const isPrivate =
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('192.168.') ||
    ip.startsWith('10.') ||
    ip === 'localhost';

  if (isPrivate) {
    return {
      ip: '127.0.0.1 (Local Dev)',
      city: 'Mumbai',
      region: 'Maharashtra',
      country: 'India',
    };
  }

  // 3. Cache lookup
  if (geoCache.has(ip)) {
    return geoCache.get(ip)!;
  }

  // 4. Resolve via fast IP Geolocation API with a strict 1.8s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,regionName,country`, {
      signal: controller.signal,
      cache: 'force-cache',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.status === 'success') {
        const geoInfo: GeoLocationInfo = {
          ip,
          city: data.city || 'Unknown City',
          region: data.regionName || '',
          country: data.country || 'India',
        };
        geoCache.set(ip, geoInfo);
        if (geoCache.size > 2000) geoCache.clear();
        return geoInfo;
      }
    }
  } catch {
    // Graceful fallback on network/timeout error
  }

  const fallback: GeoLocationInfo = {
    ip,
    city: 'India Region',
    region: '',
    country: 'India',
  };
  geoCache.set(ip, fallback);
  return fallback;
}
