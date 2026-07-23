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
    <section id="gift-boxing-cards" className="px-4 py-6 space-y-4 bg-[#FAF8FC]">
      <div className="flex items-center justify-between px-1">
        <h2 className="font-serif-luxury text-xl font-bold text-[#3A2342]">
          Signature Collections
        </h2>
        <span className="text-xs font-semibold text-[#6B427B]">
          3 Packaging Types
        </span>
      </div>

      <div className="space-y-4">
        {cards.map((card, idx) => {
          const cardName = card.type === 'royale-tin' ? 'Royale Tin Tin' : card.name;

          return (
            <motion.div
              key={card.type}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/gift-boxing/${card.type}`}
                className="block w-full bg-[#FFFFFF] rounded-2xl border border-[#E6D9FF]/70 p-3.5 shadow-xs hover:border-[#6B427B] transition-all active:scale-[0.98] group"
              >
                <div className="flex items-center gap-4">
                  {/* Left 35% Image Thumbnail */}
                  <div className="w-[35%] aspect-square relative rounded-xl overflow-hidden shrink-0 border border-[#E6D9FF]/50 bg-[#FAF8FC]">
                    <ImageWithShimmer
                      src={card.heroImage}
                      alt={cardName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Right 65% Content Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                    <div className="space-y-1">
                      <h3 className="font-serif-luxury text-base font-bold text-[#3A2342] truncate group-hover:text-[#6B427B] transition-colors">
                        {cardName}
                      </h3>
                      <p className="text-xs text-[#7A6585] leading-relaxed line-clamp-2">
                        {card.type === 'classics'
                          ? 'Timeless luxury treats in custom signature boxes.'
                          : card.type === 'royale-tin'
                          ? 'Ornate heirloom green & gold metallic keepsake tin.'
                          : 'Rich velvet chest featuring gold embossed details.'}
                      </p>
                    </div>

                    {/* Dedicated Non-Overlapping Bottom Row */}
                    <div className="flex items-center justify-between pt-2.5 border-t border-[#E6D9FF]/50 mt-2">
                      <span className="text-[10px] font-bold tracking-wider text-[#6B427B] uppercase bg-[#E6D9FF]/40 px-2.5 py-1 rounded-full border border-[#6B427B]/20 shrink-0">
                        {card.surcharge > 0 ? `+₹${card.surcharge}` : 'Included'}
                      </span>
                      <span className="text-xs font-bold text-[#6B427B] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Collection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
