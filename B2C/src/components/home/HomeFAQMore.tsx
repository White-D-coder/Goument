'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

/** Keep the questions server-rendered; enhance only the extra-question disclosure. */
export default function HomeFAQMore({ children }: { children: ReactNode }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const openedByClick = useRef(false);

  useEffect(() => {
    const element = disclosure.current;
    if (!element) return;
    const phone = window.matchMedia('(max-width: 640px)');
    let lastY = Math.max(0, window.scrollY);
    let frame: number | undefined;
    let nearby = !('IntersectionObserver' in window);
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => { nearby = entry.isIntersecting; }) : null;
    observer?.observe(element);

    const update = () => {
      frame = undefined;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      lastY = y;
      if (!phone.matches || !nearby) return;
      const top = element.getBoundingClientRect().top;
      // Change height below the reading position, avoiding a jump mid-answer.
      if (top < 0 || top > window.innerHeight) return;
      if (delta > 0 && top <= window.innerHeight * .75 && !element.open) {
        const summaryFocused = document.activeElement === element.querySelector('summary');
        openedByClick.current = false;
        element.open = true;
        if (summaryFocused) element.querySelector<HTMLElement>('.tgg-faq-item > summary')?.focus({ preventScroll: true });
      } else if (delta < 0 && element.open) {
        const restoreFocus = element.contains(document.activeElement);
        element.open = false;
        if (restoreFocus) element.querySelector('summary')?.focus({ preventScroll: true });
      }
    };
    const scroll = () => { if (frame === undefined) frame = window.requestAnimationFrame(update); };
    const configure = () => {
      window.removeEventListener('scroll', scroll);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      lastY = Math.max(0, window.scrollY);
      if (phone.matches) window.addEventListener('scroll', scroll, { passive: true });
    };
    configure();
    phone.addEventListener('change', configure);
    return () => {
      window.removeEventListener('scroll', scroll);
      phone.removeEventListener('change', configure);
      observer?.disconnect();
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <details ref={disclosure} className="tgg-faq-more" onToggle={event => {
    if (event.target !== event.currentTarget) return;
    if (event.currentTarget.open && openedByClick.current) {
      event.currentTarget.querySelector<HTMLElement>('.tgg-faq-item > summary')?.focus({ preventScroll: true });
    }
    openedByClick.current = false;
  }}>
    <summary className="tgg-faq-more-summary" onClick={() => { openedByClick.current = !disclosure.current?.open; }}>
      <span>More questions</span><ChevronDown size={18} aria-hidden="true" />
    </summary>
    {children}
  </details>;
}
