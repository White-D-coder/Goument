'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, X } from 'lucide-react';
import { useUserLocation } from '@/hooks/useUserLocation';

export const LocationPromptBar: React.FC = () => {
  const { isGps, isAutoDetected, fullLocation, requestGpsLocation } = useUserLocation();
  const [dismissed, setDismissed] = useState(false);
  const [permissionState, setPermissionState] = useState<string>('prompt');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check navigator permissions state
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((res) => {
          setPermissionState(res.state);
          res.onchange = () => setPermissionState(res.state);
        })
        .catch(() => {});
    }

    const isDismissed = sessionStorage.getItem('gour_loc_bar_dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  // Auto-dismiss once high accuracy GPS is granted
  useEffect(() => {
    if (isGps && fullLocation) {
      const timer = setTimeout(() => {
        setDismissed(true);
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isGps, fullLocation]);

  if (dismissed || permissionState === 'granted') {
    return null;
  }

  const handleAllowClick = () => {
    requestGpsLocation();
    // Also re-check permission
    setTimeout(() => {
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions.query({ name: 'geolocation' })
          .then((res) => setPermissionState(res.state))
          .catch(() => {});
      }
    }, 1500);
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('gour_loc_bar_dismissed', 'true');
  };

  return (
    <aside
      aria-label="Location preference"
      className="w-full bg-[#1A1A18] text-[#FAF8F5] border-b border-[#38332B] px-3 sm:px-6 py-2 transition-all duration-300 relative z-30"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 text-[11px] sm:text-xs font-sans">
        
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#DFC299] shrink-0 animate-bounce" />
          <span>
            {isAutoDetected && fullLocation ? (
              <>
                Detected near <strong className="text-[#DFC299]">{fullLocation}</strong>. Allow location for exact delivery timelines &amp; form auto-fill.
              </>
            ) : (
              <>
                Allow location to check bespoke delivery timelines &amp; auto-fill your delivery city.
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
          <button
            type="button"
            onClick={handleAllowClick}
            className="px-3 py-1 bg-[#DFC299] hover:bg-[#C9AC83] text-[#141311] font-mono font-bold uppercase tracking-wider text-[10px] rounded-sm transition-colors cursor-pointer active:scale-95"
          >
            Allow Location
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            title="Dismiss"
            className="p-1 text-[#8C867D] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </aside>
  );
};
