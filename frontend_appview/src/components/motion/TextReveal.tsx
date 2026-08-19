'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  splitBy?: 'words' | 'lines';
  stagger?: number;
  duration?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  as: Component = 'h2',
  splitBy = 'words',
  stagger = 0.04,
  duration = 0.7,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // Split text into spans
    const text = el.textContent || '';
    let parts: string[];

    if (splitBy === 'words') {
      parts = text.split(/\s+/);
      el.innerHTML = parts
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="text-reveal-word" style="display:inline-block;transform:translateY(100%);opacity:0;">${word}</span></span>`
        )
        .join(' ');
    } else {
      // Line split — wrap each word, let browser handle wrapping
      parts = text.split(/\s+/);
      el.innerHTML = parts
        .map(
          (word) =>
            `<span style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="text-reveal-word" style="display:inline-block;transform:translateY(100%);opacity:0;">${word}</span></span>`
        )
        .join(' ');
    }

    const wordSpans = el.querySelectorAll('.text-reveal-word');

    const tween = gsap.to(wordSpans, {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      // Restore original text
      el.textContent = text;
    };
  }, [children, splitBy, stagger, duration]);

  return (
    <Component ref={containerRef as React.RefObject<HTMLHeadingElement>} className={className}>
      {children}
    </Component>
  );
};
