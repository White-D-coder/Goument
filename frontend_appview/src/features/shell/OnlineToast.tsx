'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';

interface OnlineToastProps {
  shouldTrigger: boolean;
  onHandled: () => void;
}

export const OnlineToast: React.FC<OnlineToastProps> = ({ shouldTrigger, onHandled }) => {
  useEffect(() => {
    if (shouldTrigger) {
      // Launch confetti particle burst
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.1 },
          colors: ['#D4AF37', '#FAF7F2', '#B8860B'],
        });
      } catch (err) {
        // Fall back gracefully if canvas is blocked
      }

      toast.success('You’re back online.', {
        duration: 3000,
        style: {
          background: '#1A1A1A',
          color: '#FAF7F2',
          border: '1px solid #D4AF37',
          fontSize: '13px',
          fontWeight: 500,
        },
      });

      onHandled();
    }
  }, [shouldTrigger, onHandled]);

  return null;
};
