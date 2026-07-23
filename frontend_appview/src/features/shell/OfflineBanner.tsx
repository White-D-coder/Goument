'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';

interface OfflineBannerProps {
  isOnline: boolean;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOnline }) => {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto bg-[#1A1A1A] text-[#FAF7F2] px-4 py-2.5 flex items-center justify-center gap-2 border-b border-[#D4AF37]/40 shadow-lg"
        >
          <WifiOff className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span className="text-xs font-medium tracking-tight">
            You&apos;re offline — your selections are safe with us.
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
