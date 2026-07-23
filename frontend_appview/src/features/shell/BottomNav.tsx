'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Store, User } from 'lucide-react';
import { CartIcon } from './CartIcon';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Shop', href: '/gift-boxing/classics', icon: Store },
    { label: 'Cart', href: '/cart', isCart: true },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E8DFC8]/60 px-4 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.label} href={item.href} className="relative py-1 px-3 flex flex-col items-center">
              <motion.div
                whileTap={{ scale: 0.9 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? 'text-[#D4AF37]' : 'text-[#6E6259]'
                }`}
              >
                {item.isCart ? (
                  <CartIcon className="w-5 h-5" />
                ) : (
                  item.icon && <item.icon className="w-5 h-5" />
                )}
                <span className="text-[11px] font-medium tracking-tight">
                  {item.label}
                </span>
              </motion.div>
              {isActive && (
                <motion.div
                  layoutId="activeTabDot"
                  className="absolute bottom-0 w-1 h-1 rounded-full bg-[#D4AF37]"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
