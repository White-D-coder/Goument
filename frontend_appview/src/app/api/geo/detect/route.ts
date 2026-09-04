import { NextRequest, NextResponse } from 'next/server';
import { resolveClientGeo } from '@/lib/geo/ipGeo';
import { readVaultData, writeVaultData } from '@/lib/security/vault';

export const dynamic = 'force-dynamic';

async function reverseGeocodeCoords(lat: number, lon: number): Promise<{ city: string; state: string; country: string } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const city = data.city || data.locality || data.principalSubdivision || 'Mumbai';
      const state = data.principalSubdivision || '';
      const country = data.countryName || 'India';
      return { city, state, country };
    }
  } catch {
    // Fallback to Nominatim
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`,
        { headers: { 'User-Agent': 'TheGourmetGifts/1.0' } }
      );
      if (res.ok) {
        const data = await res.json();
        const addr = data.address || {};
        const city = addr.city || addr.town || addr.village || addr.suburb || addr.city_district || 'Mumbai';
        const state = addr.state || '';
        const country = addr.country || 'India';
        return { city, state, country };
      }
    } catch {
      // Ignore
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const geo = await resolveClientGeo(req);
    const fullLocation = geo.region ? `${geo.city}, ${geo.region}` : geo.city;

    return NextResponse.json({
      success: true,
      city: geo.city,
      state: geo.region,
      country: geo.country,
      fullLocation,
      isGps: false,
    });
  } catch {
    return NextResponse.json({
      success: true,
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      fullLocation: 'Mumbai, Maharashtra',
      isGps: false,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lat, lon, sessionId } = body;

    let city = 'Mumbai';
    let state = 'Maharashtra';
    let country = 'India';

    if (typeof lat === 'number' && typeof lon === 'number') {
      const resolved = await reverseGeocodeCoords(lat, lon);
      if (resolved) {
        city = resolved.city;
        state = resolved.state;
        country = resolved.country;
      }
    } else {
      const ipGeo = await resolveClientGeo(req);
      city = ipGeo.city;
      state = ipGeo.region;
      country = ipGeo.country;
    }

    const fullLocation = state ? `${city}, ${state}` : city;

    // If visitor session exists in vault, update it with verified GPS location immediately!
    if (sessionId) {
      try {
        const vault = await readVaultData();
        if (vault.sessions && vault.sessions[sessionId]) {
          vault.sessions[sessionId].geoCity = city;
          vault.sessions[sessionId].geoRegion = state;
          vault.sessions[sessionId].geoCountry = country;
          await writeVaultData(vault);
        }
      } catch (err) {
        console.error('Failed to update session location in vault:', err);
      }
    }

    return NextResponse.json({
      success: true,
      city,
      state,
      country,
      fullLocation,
      isGps: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Geocoding failed',
    }, { status: 500 });
  }
}
