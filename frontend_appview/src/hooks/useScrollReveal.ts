'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType =
  | 'fadeUp'
  | 'fadeIn'
  | 'slideLeft'
  | 'slideRight'
  | 'scaleReveal'
  | 'maskReveal';

interface ScrollRevealOptions {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  children?: boolean;
}

const ANIMATION_DEFAULTS: Record<AnimationType, gsap.TweenVars> = {
  fadeUp: { y: 50, opacity: 0 },
  fadeIn: { opacity: 0 },
  slideLeft: { x: -80, opacity: 0 },
  slideRight: { x: 80, opacity: 0 },
  scaleReveal: { scale: 0.92, opacity: 0 },
  maskReveal: { clipPath: 'inset(100% 0% 0% 0%)' },
};

const ANIMATION_TO: Record<AnimationType, gsap.TweenVars> = {
  fadeUp: { y: 0, opacity: 1 },
  fadeIn: { opacity: 1 },
  slideLeft: { x: 0, opacity: 1 },
  slideRight: { x: 0, opacity: 1 },
  scaleReveal: { scale: 1, opacity: 1 },
  maskReveal: { clipPath: 'inset(0% 0% 0% 0%)' },
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    animation = 'fadeUp',
    delay = 0,
    duration = 0.9,
    stagger = 0.12,
    start = 'top 85%',
    end = 'bottom 20%',
    scrub = false,
    once = true,
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const targets = children ? el.children : el;
    const fromVars = ANIMATION_DEFAULTS[animation];
    const toVars = ANIMATION_TO[animation];

    gsap.set(targets, fromVars);

    const tween = gsap.to(targets, {
      ...toVars,
      duration,
      delay,
      stagger: children ? stagger : 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        end,
        scrub,
        once,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [animation, delay, duration, stagger, start, end, scrub, once, children]);

  return ref;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.15
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const tween = gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return ref;
}

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const panels = track.children;
    const totalWidth = (panels.length - 1) * window.innerWidth;

    const tween = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return { containerRef, trackRef };
}
