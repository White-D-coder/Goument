'use client';
import { useEffect, useRef } from 'react';

/** Size an independent scroll list from two real rows, including long names. */
export function useTwoRowScroll(active: boolean, firstRowIds: string, selector: string) {
 const list = useRef<HTMLDivElement>(null);
 useEffect(() => {
  const element = list.current;
  if (!active || !element) return;
  const rows = Array.from(element.querySelectorAll<HTMLElement>(selector)).slice(0, 2);
  const measure = () => {
   if (!rows.length) return;
   const style = getComputedStyle(element);
   const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
   element.style.setProperty('--cart-list-height', `${rows.reduce((sum, row) => sum + row.getBoundingClientRect().height, 0) + padding}px`);
  };
  measure();
  const observer = new ResizeObserver(measure);
  rows.forEach(row => observer.observe(row));
  return () => observer.disconnect();
 }, [active, firstRowIds, selector]);
 return list;
}
