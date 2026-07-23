'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { GiftBoxOption } from '@/shared/api/endpoints';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';

interface GiftBoxingCardsProps {
  cards: GiftBoxOption[];
}

export const GiftBoxingCards: React.FC<GiftBoxingCardsProps> = ({ cards }) => {
  return (
    <section id="gift-boxing-cards" className="px-4 py-6 space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-serif-luxury text-xl font-bold text-[#2A231F]">
          Signature Collections
        </h2>
        <span className="text-xs font-semibold text-[#D4AF37]">
          3 Packaging Types
        </span>
      </div>

      <div className="space-y-3.5">
        {cards.map((card, idx) => (
          <motion.div
            key={card.type}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
          >
            <Link
              href={`/gift-boxing/${card.type}`}
              className="block w-full bg-[#FFFFFF] rounded-2xl border border-[#E8DFC8]/70 p-3 shadow-xs hover:border-[#D4AF37] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5">
                {/* Left 40% Image */}
                <div className="w-[38%] h-28 relative rounded-xl overflow-hidden shrink-0">
                  <ImageWithShimmer
                    src={card.heroImage}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right 60% Description */}
                <div className="flex-1 min-w-0 pr-1 flex flex-col justify-between h-28 py-0.5">
                  <div>
                    <h3 className="font-serif-luxury text-base font-bold text-[#2A231F] truncate">
                      {card.name}
                    </h3>
                    <p className="text-[11px] text-[#6E6259] leading-tight line-clamp-2 mt-1">
                      {card.type === 'classics'
                        ? 'Timeless luxury treats in custom signature boxes.'
                        : card.type === 'royale-tin'
                        ? 'Ornate heirloom green & gold metallic keepsake tin.'
                        : 'Rich velvet chest featuring gold embossed details.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-bold tracking-wider text-[#B8860B] uppercase">
                      {card.surcharge > 0 ? `+₹${card.surcharge}` : 'Included'}
                    </span>
                    <span className="text-xs font-semibold text-[#D4AF37] inline-flex items-center gap-1">
                      View Collection <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
