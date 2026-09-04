'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let sid = sessionStorage.getItem('__gour_sid');
    if (!sid) {
      sid = `sid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('__gour_sid', sid);
    }
    return sid;
  } catch {
    return `sid_temp_${Date.now()}`;
  }
}

function detectClientEnvironment() {
  if (typeof window === 'undefined') {
    return { deviceType: 'Desktop', browser: 'Unknown', os: 'Unknown' };
  }

  const ua = navigator.userAgent;
  let deviceType = 'Desktop';
  if (/iPad|Tablet|PlayBook/i.test(ua) || (navigator.maxTouchPoints > 1 && window.innerWidth >= 768 && window.innerWidth <= 1024)) {
    deviceType = 'Tablet';
  } else if (/Mobi|Android|iPhone|iPod/i.test(ua) || window.innerWidth < 768) {
    deviceType = 'Mobile';
  }

  let browser = 'Other';
  if (/Edg/i.test(ua)) browser = 'Edge';
  else if (/Chrome/i.test(ua)) browser = 'Chrome';
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
  else if (/Firefox/i.test(ua)) browser = 'Firefox';
  else if (/MSIE|Trident/i.test(ua)) browser = 'Internet Explorer';

  let os = 'Other';
  if (/Win/i.test(ua)) os = 'Windows';
  else if (/Mac/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';

  return { deviceType, browser, os };
}

function sendSilentBeacon(payload: Record<string, any>) {
  if (typeof window === 'undefined') return;
  const url = '/api/telemetry/collect';
  const data = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([data], { type: 'application/json' });
    const queued = navigator.sendBeacon(url, blob);
    if (queued) return;
  }

  // Fallback to fetch keepalive
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
    keepalive: true,
  }).catch(() => {
    // Non-intrusive: silent catch
  });
}

export function useSilentTelemetry() {
  const pathname = usePathname();
  const activeSectionRef = useRef<string>('intro');
  const dwellStartTimeRef = useRef<number>(Date.now());
  const accumulatedDwellRef = useRef<number>(0);
  const isTabActiveRef = useRef<boolean>(true);

  // 1. Flush telemetry on route change or page leave
  const flushTelemetry = (isHeartbeat = false) => {
    if (pathname && pathname.startsWith('/studio-admin')) return; // Do not track admin portal views

    const now = Date.now();
    let currentDwell = 0;
    if (isTabActiveRef.current) {
      currentDwell = Math.floor((now - dwellStartTimeRef.current) / 1000);
    }
    const totalToReport = accumulatedDwellRef.current + currentDwell;

    // Reset counters
    dwellStartTimeRef.current = now;
    accumulatedDwellRef.current = 0;

    const env = detectClientEnvironment();
    sendSilentBeacon({
      type: isHeartbeat ? 'heartbeat' : 'pageview',
      sessionId: getSessionId(),
      pagePath: pathname || '/',
      activeSection: activeSectionRef.current,
      dwellTimeSec: totalToReport,
      deviceType: env.deviceType,
      browser: env.browser,
      os: env.os,
      referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
    });
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (pathname && pathname.startsWith('/studio-admin')) return;

    // Reset timers on page change
    dwellStartTimeRef.current = Date.now();
    accumulatedDwellRef.current = 0;
    isTabActiveRef.current = !document.hidden;

    // Send initial pageview beacon
    flushTelemetry(false);

    // 2. Set up IntersectionObserver to identify the most engaged visible section
    const observer = new IntersectionObserver(
      (entries) => {
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }

        if (bestEntry && bestEntry.target) {
          const id = bestEntry.target.id || bestEntry.target.getAttribute('data-section') || 'content';
          if (id && id !== activeSectionRef.current) {
            activeSectionRef.current = id;
          }
        }
      },
      { threshold: [0.2, 0.5, 0.8] }
    );

    // Observe meaningful sections & major blocks
    const candidateSections = document.querySelectorAll('section, main > div[id], [data-section]');
    candidateSections.forEach((el) => observer.observe(el));

    // 3. Handle tab visibility change (pause timer when tab is hidden)
    const handleVisibilityChange = () => {
      const now = Date.now();
      if (document.hidden) {
        if (isTabActiveRef.current) {
          accumulatedDwellRef.current += Math.floor((now - dwellStartTimeRef.current) / 1000);
        }
        isTabActiveRef.current = false;
        flushTelemetry(true);
      } else {
        isTabActiveRef.current = true;
        dwellStartTimeRef.current = now;
      }
    };

    // 4. Periodic heartbeat every 4 seconds while user is active
    const heartbeatInterval = setInterval(() => {
      if (isTabActiveRef.current) {
        flushTelemetry(true);
      }
    }, 4000);

    // 5. Page unload
    const handleUnload = () => {
      flushTelemetry(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('pagehide', handleUnload);

    return () => {
      flushTelemetry(true);
      clearInterval(heartbeatInterval);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('pagehide', handleUnload);
    };
  }, [pathname]);
}
