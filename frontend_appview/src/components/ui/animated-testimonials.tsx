'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { ImageWithShimmer } from '@/shared/ImageWithShimmer';

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000); // 4-second auto-play delay
      return () => clearInterval(interval);
    }
  }, [autoplay, handleNext]);

  const randomRotateY = (index: number) => {
    const rotates = [-8, -4, 0, 4, 8];
    return rotates[index % rotates.length];
  };

  return (
    <div className="w-full bg-[#FAF7F2] py-6 px-4">
      <div className="flex items-center gap-2 mb-4 px-1">
        <Quote className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="font-serif-luxury text-xl font-bold text-[#2A231F]">
          Gourmet Spotted
        </h2>
      </div>

      <div className="relative grid grid-cols-1 gap-6 items-center bg-[#FFFFFF] rounded-3xl border border-[#E8DFC8]/70 p-5 shadow-sm">
        {/* Top 3D Stack Image Container */}
        <div className="relative h-64 w-full flex items-center justify-center">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.src}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotateY(index),
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.7,
                  scale: isActive(index) ? 1 : 0.92,
                  rotate: isActive(index) ? 0 : randomRotateY(index),
                  zIndex: isActive(index)
                    ? 30
                    : testimonials.length + 2 - index,
                  y: isActive(index) ? 0 : 10,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: randomRotateY(index),
                }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-md"
              >
                <ImageWithShimmer
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text & Control Section */}
        <div className="flex flex-col justify-between space-y-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="space-y-2"
          >
            <h3 className="font-serif-luxury text-lg font-bold text-[#2A231F]">
              {testimonials[active].name}
            </h3>
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-xs text-[#6E6259] leading-relaxed italic pt-1">
              &ldquo;{testimonials[active].quote}&rdquo;
            </motion.p>
          </motion.div>

          {/* Navigation Controls & Indicators */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8DFC8]/50">
            {/* Dot Indicators */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    active === idx
                      ? 'w-6 bg-[#D4AF37]'
                      : 'w-1.5 bg-[#E8DFC8]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center text-[#2A231F] hover:text-[#D4AF37] transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DFC8] flex items-center justify-center text-[#2A231F] hover:text-[#D4AF37] transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
