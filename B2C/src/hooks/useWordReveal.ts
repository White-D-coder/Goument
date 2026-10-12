'use client';

import { useEffect, useRef } from 'react';

/** Preserve the existing rise/blur/stagger using bounded browser animations. */
export function useWordReveal<T extends HTMLElement>(selector: string, whenVisible = false, phoneOnly = false) {
 const scope = useRef<T>(null);
 useEffect(() => {
  const root = scope.current;
  if (!root || !root.animate || (phoneOnly && !window.matchMedia('(max-width: 640px)').matches)) return;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set<Animation>();
  let revealed = false;
  let observer: IntersectionObserver | undefined;
  const cancel = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
  const reveal = () => {
   if (revealed || preference.matches) return;
   revealed = true;
   observer?.disconnect();
   root.querySelectorAll<HTMLElement>(selector).forEach((word, index) => {
    const animation = word.animate([
     { opacity: 0, transform: 'translateY(24px) scale(.98)', filter: 'blur(10px)' },
     { opacity: 1, transform: 'translateY(0) scale(1)', filter: 'blur(0px)' },
    ], { duration: 700, delay: index * 80, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' });
    animations.add(animation);
    animation.onfinish = animation.oncancel = () => animations.delete(animation);
   });
  };
  const observe = () => {
   if (preference.matches) { cancel(); return; }
   if (revealed) return;
   if (whenVisible && observer) observer.observe(root);
   else reveal();
  };
  if (whenVisible && 'IntersectionObserver' in window) {
   observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) reveal(); }, { rootMargin: '-60px' });
  }
  observe();
  preference.addEventListener('change', observe);
  return () => { observer?.disconnect(); cancel(); preference.removeEventListener('change', observe); };
 }, [selector, whenVisible, phoneOnly]);
 return scope;
}
