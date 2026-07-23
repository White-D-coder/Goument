'use client';

import React from 'react';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';

export const SpottedTestimonialsDemo: React.FC = () => {
  const testimonials = [
    {
      quote:
        'The Royale Tin box was an absolute showstopper for our anniversary dinner. Handcrafted gourmet perfection.',
      name: 'Lady Eleanor Vance',
      designation: 'Gourmet Connoisseur & Collector',
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    },
    {
      quote:
        'The Raw Truffle Honey & Saffron Chocolates are unlike anything I’ve tasted in Europe. Exquisite packaging.',
      name: 'Chef Antoine Laurent',
      designation: 'Michelin Star Culinary Consultant',
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      quote:
        'Unbelievable luxury gifting experience. Arrived in pristine condition with a personalized handwritten card.',
      name: 'Sophia Patel',
      designation: 'Corporate Luxury Director',
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
    },
    {
      quote:
        'Obsessively crafted. Gourmet Gem has redefined luxury gifting with unmatched elegance and taste.',
      name: 'Vikramaditya Roy',
      designation: 'VIP Gourmet Member',
      src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
};
