'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { WifiOff, RefreshCw, Gift } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OfflinePage() {
  const router = useRouter();

  const handleRetry = () => {
    if (typeof navigator !== 'undefined' && navigator.onLine) {
      toast.success('Reconnected! Redirecting to home...', {
        style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #D4AF37' },
      });
      router.push('/');
    } else {
      toast.error('Still offline. Please check your connection.', {
        style: { background: '#1A1A1A', color: '#FAF7F2', border: '1px solid #6E1A24' },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-6 flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-[#FFFFFF] border-2 border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-xl animate-bounce">
        <Gift className="w-12 h-12" />
      </div>

      <div className="space-y-2 max-w-xs">
        <div className="flex items-center justify-center gap-2 text-[#6E1A24]">
          <WifiOff className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Offline Mode
          </span>
        </div>
        <h1 className="font-serif-luxury text-2xl font-bold text-[#2A231F]">
          No Internet Connection
        </h1>
        <p className="text-xs text-[#6E6259] leading-relaxed pt-1">
          Don&apos;t worry, your selections are safe with us. Reconnect to sync your luxury bag.
        </p>
      </div>

      <button
        onClick={handleRetry}
        className="gold-gradient-btn px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg"
      >
        <RefreshCw className="w-4 h-4" />
        <span>RETRY CONNECTION</span>
      </button>
    </div>
  );
}
