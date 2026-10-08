'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/** Optional decoration only; this component never hides the underlying content. */
export default function HomeMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.atelier-home');
    if (!root || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = root.querySelectorAll<HTMLElement>('[data-home-rule], [data-home-reveal]');
    const seen = new WeakSet<Element>();
    const animations = new Map<HTMLElement, Animation>();
    const sharesFocus = (element: HTMLElement, focused: Node | null) =>
      !!focused && root.contains(focused) && (element.contains(focused) || focused.contains(element));

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        seen.add(element);

        // Do not restart decoration above the reading position or around keyboard focus.
        if (preference.matches || entry.boundingClientRect.top < 0 || sharesFocus(element, document.activeElement)) continue;

        const compact = window.matchMedia('(max-width: 700px)').matches;
        const frames = element.hasAttribute('data-home-rule')
          ? [{ transform: 'scaleX(0)', transformOrigin: 'left' }, { transform: 'scaleX(1)', transformOrigin: 'left' }]
          : [{ clipPath: `inset(0 0 ${compact ? 3 : 5}% 0)` }, { clipPath: 'inset(0)' }];

        const animation = element.animate(frames, {
          duration: compact ? 600 : 900,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        });
        animations.set(element, animation);
        animation.onfinish = animation.oncancel = () => animations.delete(element);
      }
    }, { threshold: 0.05 });

    const cancelAnimations = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };

    const observe = () => {
      observer.disconnect();
      if (preference.matches) {
        cancelAnimations();
        return;
      }
      elements.forEach((element) => {
        if (!seen.has(element)) observer.observe(element);
      });
    };

    const onFocus = (event: FocusEvent) => {
      const focused = event.target instanceof Node ? event.target : null;
      animations.forEach((animation, element) => {
        if (sharesFocus(element, focused)) {
          animation.cancel();
          animations.delete(element);
        }
      });
    };

    observe();
    preference.addEventListener('change', observe);
    root.addEventListener('focusin', onFocus);

    return () => {
      observer.disconnect();
      cancelAnimations();
      preference.removeEventListener('change', observe);
      root.removeEventListener('focusin', onFocus);
    };
  }, [pathname]);

  return null;
}
