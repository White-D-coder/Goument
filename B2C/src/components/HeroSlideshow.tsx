'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const slides = [
 { src: '/images/brand/burgundy_india_hamper.webp', alt: 'Burgundy India gift hamper with gourmet snacks and keepsakes', width: 1448, height: 1086 },
 { src: '/images/pics/hero_slide2.webp', alt: 'Lavender Gourmet Gifts box with savoury snacks, tea, nuts and a floral candle', width: 1448, height: 1086 },
 { src: '/images/brand/burgundy_india_hamper.webp', alt: 'Burgundy India gift hamper with gourmet snacks and keepsakes', width: 1448, height: 1086 },
];

export default function HeroSlideshow() {
 const stage = useRef<HTMLDivElement>(null);
 const [ready, setReady] = useState<number[]>([]);
 const [frame, setFrame] = useState({ current: 0, previous: -1 });
 const { current: activeIndex, previous: previousIndex } = frame;

 useEffect(() => {
  let disposed = false;
  stage.current?.querySelectorAll<HTMLImageElement>('.gift-hero-image').forEach((image, index) => {
   // Decode before displaying the next frame, including cached images on hydration.
   image.decode().then(() => {
    if (!disposed) setReady(current => current.includes(index) ? current : [...current, index]);
   }).catch(() => {
    // A failed secondary photo stays out of the rotation; the current photo remains.
   });
  });
  return () => { disposed = true; };
 }, []);

 useEffect(() => {
  if (previousIndex < 0) return;
  // Reset the outgoing layer even when reduced motion skips transitionend.
  // This also keeps a two-photo rotation smooth if a third photo fails to load.
  const finish = setTimeout(() => setFrame(current => ({ ...current, previous: -1 })), 1700);
  return () => clearTimeout(finish);
 }, [activeIndex, previousIndex]);

 useEffect(() => {
  const hero = stage.current?.closest('section');
  if (!hero || ready.length < 2) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < window.innerHeight;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
   clearTimeout(timer);
   if (motion.matches || document.hidden || !visible) return;
   timer = setTimeout(() => {
    const order = [...ready].sort((a, b) => a - b);
    const next = order.find(index => index > activeIndex) ?? order[0];
    setFrame({ current: next, previous: activeIndex });
   }, 6000);
  };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
  observer.observe(hero);
  motion.addEventListener('change', schedule);
  document.addEventListener('visibilitychange', schedule);
  schedule();
  return () => {
   clearTimeout(timer);
   observer.disconnect();
   motion.removeEventListener('change', schedule);
   document.removeEventListener('visibilitychange', schedule);
  };
 }, [activeIndex, ready]);

 return (
  <div className="hero-slideshow" ref={stage} aria-live="off">
   {slides.map((slide, index) => <div
    className={`hero-slide${index === frame.current ? ' hero-slide--current' : index === frame.previous ? ' hero-slide--previous' : ''}`}
    key={`${slide.src}-${index}`} aria-hidden={index !== frame.current}
   >
    <Image className="gift-hero-image" src={slide.src} alt={slide.alt} fill sizes="100vw"
     preload={index === 0} loading={index === 0 ? undefined : 'eager'}
     fetchPriority={index === 0 ? undefined : 'low'} />
   </div>)}
  </div>
 );
}
