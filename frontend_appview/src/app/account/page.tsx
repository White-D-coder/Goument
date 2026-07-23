'use client';

import React from 'react';
import { User, Package, MapPin, ShieldCheck, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const user = {
    name: 'Jane Customer',
    email: 'customer@gourmetgem.com',
    phone: '+91 98765 43210',
  };

  const orders = [
    {
      id: 'ORD_98231',
      date: '2026-07-18',
      total: 329900,
      status: 'Confirmed',
      items: 'Royale Tin Gift Box',
    },
    {
      id: 'ORD_94102',
      date: '2026-07-02',
      total: 499900,
      status: 'Delivered',
      items: 'Premium Velvet Gift Box',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] p-4 space-y-4">
      <h1 className="font-serif-luxury text-2xl font-bold text-[#2A231F]">
        My Account
      </h1>

      {/* User Info Card */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-4 flex items-center gap-3.5 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0 font-serif-luxury text-lg font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="font-serif-luxury text-base font-bold text-[#2A231F]">
            {user.name}
          </h2>
          <p className="text-xs text-[#6E6259]">{user.email}</p>
          <span className="text-[10px] font-bold text-[#0F5132] bg-[#0F5132]/10 px-2 py-0.5 rounded-full inline-block mt-1">
            VIP Gourmet Club Member
          </span>
        </div>
      </div>

      {/* Order History */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-[#2A231F] px-1">
          <Package className="w-4 h-4 text-[#D4AF37]" />
          <h2 className="font-serif-luxury text-sm font-bold">
            Recent Orders
          </h2>
        </div>

        <div className="space-y-2">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 p-3.5 flex items-center justify-between text-xs shadow-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#2A231F]">{ord.id}</span>
                  <span className="text-[10px] font-semibold text-[#0F5132] bg-[#0F5132]/10 px-2 py-0.5 rounded-full">
                    {ord.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#6E6259]">{ord.items}</p>
                <p className="text-[10px] text-[#6E6259]">{ord.date}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-[#D4AF37]">
                  ₹{(ord.total / 100).toLocaleString('en-IN')}
                </span>
                <ChevronRight className="w-4 h-4 text-[#6E6259]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Settings */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/60 divide-y divide-[#E8DFC8]/40 shadow-xs text-xs">
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium text-[#2A231F]">Saved Delivery Addresses</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6259]" />
        </div>

        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-medium text-[#2A231F]">Security & Authentication</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#6E6259]" />
        </div>
      </div>
    </div>
  );
}
