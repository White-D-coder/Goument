'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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

  const isRequestingRef = useRef(false);

  const requestGpsLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    if (isRequestingRef.current) return;
    isRequestingRef.current = true;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        isRequestingRef.current = false;
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
        isRequestingRef.current = false;
        // GPS permission denied or dismissed — IP location remains active
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
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

    // 2. Immediate prompt attempt
    requestGpsLocation();

    // 3. One-time user gesture trigger: modern browsers require a click/tap to allow location prompts
    const handleFirstUserGesture = () => {
      requestGpsLocation();
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
    };

    window.addEventListener('click', handleFirstUserGesture, { once: true });
    window.addEventListener('touchstart', handleFirstUserGesture, { once: true });

    // 4. Listen for location updates across forms/components
    const handleLocationUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserLocationState>;
      if (customEvent.detail) {
        setLocation(customEvent.detail);
      }
    };

    window.addEventListener('gourmet_location_updated', handleLocationUpdate);
    return () => {
      window.removeEventListener('click', handleFirstUserGesture);
      window.removeEventListener('touchstart', handleFirstUserGesture);
      window.removeEventListener('gourmet_location_updated', handleLocationUpdate);
    };
  }, [requestGpsLocation]);

  return {
    ...location,
    requestGpsLocation,
  };
}
