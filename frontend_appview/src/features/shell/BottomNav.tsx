'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Package, User } from 'lucide-react';
import { CartIcon } from './CartIcon';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Gourmet', href: '/gourmet-gifts', icon: Home },
    { label: 'Customizer', href: '/customize', icon: Package },
    { label: 'Curation Tray', href: '/cart', isBag: true },
    { label: 'Account', href: '/account', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto px-4 pb-3 pointer-events-none">
      <nav className="pointer-events-auto relative w-full bg-[#FAF8FC]/95 backdrop-blur-xl rounded-2xl border border-[#E6D9FF]/70 shadow-2xl py-2 px-3 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex-1 flex flex-col items-center group py-1"
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`flex flex-col items-center gap-0.5 transition-colors relative ${
                  isActive ? 'text-[#6B427B]' : 'text-[#7A6585] group-hover:text-[#3A2342]'
                }`}
              >
                {item.isBag ? (
                  <CartIcon className="w-5 h-5" />
                ) : (
                  item.icon && <item.icon className="w-5 h-5 stroke-[2]" />
                )}
                <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold text-[#6B427B]' : 'font-semibold'}`}>
                  {item.label}
                </span>

                {/* Sleek Active Indicator Line */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute -bottom-1 w-4 h-0.5 bg-[#6B427B] rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
