'use client';

/* eslint-disable @next/next/no-img-element -- Keep the full existing photographs visible. */
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const slides = [
 { src: '/images/brand/hero.png', alt: 'The Gourmet Gifts signature boxes in ivory, lavender, burgundy and midnight blue', width: 1770, height: 889 },
 { src: '/images/pics/ChatGPT Image Sep 23, 2026, 09_50_14 PM-1.png', alt: 'Lavender Gourmet Gifts box with savoury snacks, tea, nuts and a floral candle', width: 1448, height: 1086 },
 { src: '/images/small_anipics/framee.png', alt: 'Ivory, forest-green and charcoal gift hampers with gourmet treats by candlelight', width: 1672, height: 941 },
];

export default function HeroSlideshow() {
 const stage = useRef<HTMLDivElement>(null);
 const [ready, setReady] = useState<number[]>([]);
 const [frame, setFrame] = useState({ current: 0, previous: -1 });
 const { current: activeIndex, previous: previousIndex } = frame;
 const [paused, setPaused] = useState(false);

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
  if (!hero || ready.length < 2 || paused) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = hero.getBoundingClientRect().bottom > 0 && hero.getBoundingClientRect().top < window.innerHeight;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
   clearTimeout(timer);
   const focused = hero.contains(document.activeElement) && !document.activeElement?.closest('.hero-slideshow-toggle');
   if (motion.matches || document.hidden || !visible || focused) return;
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
  hero.addEventListener('focusin', schedule);
  hero.addEventListener('focusout', schedule);
  schedule();
  return () => {
   clearTimeout(timer);
   observer.disconnect();
   motion.removeEventListener('change', schedule);
   document.removeEventListener('visibilitychange', schedule);
   hero.removeEventListener('focusin', schedule);
   hero.removeEventListener('focusout', schedule);
  };
 }, [activeIndex, paused, ready]);

 return <>
  <div className="hero-slideshow" ref={stage} aria-live="off">
   {slides.map((slide, index) => <div
    className={`hero-slide${index === frame.current ? ' hero-slide--current' : index === frame.previous ? ' hero-slide--previous' : ''}`}
    key={slide.src} aria-hidden={index !== frame.current}
   >
    {index > 0 && <div className="hero-slide-backdrop" style={{ backgroundImage: `url("${slide.src}")` }} aria-hidden="true"/>}
    <img className="gift-hero-image" src={slide.src} alt={slide.alt} width={slide.width} height={slide.height}
     fetchPriority={index === 0 ? 'high' : 'low'} decoding={index === 0 ? 'auto' : 'async'}/>
   </div>)}
  </div>
  {ready.length > 1 && <button type="button" className="hero-slideshow-toggle"
   onClick={() => setPaused(value => !value)}
   aria-label={paused ? 'Resume hero slideshow' : 'Pause hero slideshow'}
   title={paused ? 'Resume slideshow' : 'Pause slideshow'}>
   {paused ? <Play size={16} aria-hidden="true"/> : <Pause size={16} aria-hidden="true"/>}
  </button>}
 </>;
}
