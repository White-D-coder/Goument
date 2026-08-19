import React from 'react';

/**
 * Utility function to format title strings containing parenthesized text.
 * Ensures whatever is inside brackets starts on a new line (as a block element)
 * rather than wrapping awkwardly across lines (e.g. splitting "(Amber" and "Jar)").
 *
 * Example:
 *   Input:  "Hand-Poured Soy Candle 220g (Amber Jar)"
 *   Output: Hand-Poured Soy Candle 220g
 *           (Amber Jar)
 */
export function formatTitleWithBrackets(title: string): React.ReactNode {
  if (!title || typeof title !== 'string') return title;

  // Matches main title, bracketed string e.g. "(Amber Jar)", and any trailing text
  const match = title.match(/^(.*?)\s*(\([^\)]+\))(.*)$/);
  if (!match) return title;

  const [, mainText, bracketText, trailingText] = match;

  return (
    <>
      {mainText}
      <span className="block font-normal text-[0.95em] mt-0.5">{bracketText}{trailingText}</span>
    </>
  );
}
