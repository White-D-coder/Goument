import { useState, useEffect } from 'react';
import { checkHealthAPI } from './api/endpoints';

export function useOnlineStatus(onReconnect?: () => void) {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    let wasOffline = false;

    const handleOnline = async () => {
      // Confirm connectivity with server ping
      const healthy = await checkHealthAPI();
      if (healthy) {
        setIsOnline(true);
        if (wasOffline && onReconnect) {
          onReconnect();
        }
        wasOffline = false;
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      wasOffline = true;
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Heartbeat check every 30 seconds
    const interval = setInterval(async () => {
      if (navigator.onLine) {
        const healthy = await checkHealthAPI();
        if (!healthy && isOnline) {
          setIsOnline(false);
          wasOffline = true;
        } else if (healthy && !isOnline) {
          setIsOnline(true);
          if (onReconnect) onReconnect();
        }
      } else if (isOnline) {
        setIsOnline(false);
        wasOffline = true;
      }
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [isOnline, onReconnect]);

  return isOnline;
}
