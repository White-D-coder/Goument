'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserLocationState {
  city: string;
  state: string;
  country: string;
  fullLocation: string;
  isAutoDetected: boolean;
  isGps: boolean;
}

const STORAGE_KEY = 'gourmet_user_location';

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocationState>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          return {
            city: parsed.city || '',
            state: parsed.state || '',
            country: parsed.country || 'India',
            fullLocation: parsed.fullLocation || parsed.city || '',
            isAutoDetected: true,
            isGps: !!parsed.isGps,
          };
        }
      } catch {
        // Fallback
      }
    }
    return {
      city: '',
      state: '',
      country: 'India',
      fullLocation: '',
      isAutoDetected: false,
      isGps: false,
    };
  });

  const requestGpsLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          const sid = sessionStorage.getItem('__gour_sid') || '';

          const res = await fetch('/api/geo/detect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lon, sessionId: sid }),
          });

          const data = await res.json();
          if (data.success && data.fullLocation) {
            const newState: UserLocationState = {
              city: data.city || 'Mumbai',
              state: data.state || '',
              country: data.country || 'India',
              fullLocation: data.fullLocation,
              isAutoDetected: true,
              isGps: true,
            };
            setLocation(newState);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            window.dispatchEvent(new CustomEvent('gourmet_location_updated', { detail: newState }));
          }
        } catch (err) {
          console.error('Failed to reverse geocode GPS coordinates:', err);
        }
      },
      (err) => {
        // GPS permission denied or timed out — silently keep IP location
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000,
      }
    );
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Initial IP-based quick detection if no cached location exists
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) {
      fetch('/api/geo/detect')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.fullLocation) {
            const newState: UserLocationState = {
              city: data.city || 'Mumbai',
              state: data.state || '',
              country: data.country || 'India',
              fullLocation: data.fullLocation,
              isAutoDetected: true,
              isGps: false,
            };
            setLocation((prev) => (prev.isGps ? prev : newState));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
          }
        })
        .catch(() => {});
    }

    // 2. Prompt browser geolocation for high precision GPS
    requestGpsLocation();

    // 3. Listen for location updates across forms/components
    const handleLocationUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserLocationState>;
      if (customEvent.detail) {
        setLocation(customEvent.detail);
      }
    };

    window.addEventListener('gourmet_location_updated', handleLocationUpdate);
    return () => {
      window.removeEventListener('gourmet_location_updated', handleLocationUpdate);
    };
  }, [requestGpsLocation]);

  return {
    ...location,
    requestGpsLocation,
  };
}
