import { candleEstimateMinor, hamperDisplayPriceMinor } from './product-pricing';

export type PriceRange = { min: number; max: number };
type Row = { id: string; quantity: number };
type Item = { id: string; category: string };
const hamperSlugs: Record<string, string> = {
  ivory_hamper: 'ivory-hamper', india_hamper: 'india-hamper',
  india_hamper_burgundy: 'india-hamper-burgundy', india_hamper_lavender: 'india-hamper-lavender',
};
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

export function giftUnitEstimate(id: string, item?: Item): PriceRange | null {
  const price = hamperDisplayPriceMinor(hamperSlugs[id] || '');
  if (price !== null) return { min: price, max: price };
  if (id === 'laddoo_candles' || item?.category === 'Candles') return { ...candleEstimateMinor };
  return null;
}

export function priceRangeLabel(value: PriceRange): string {
  return value.min === value.max ? inr.format(value.min / 100) : `${inr.format(value.min / 100)}–${inr.format(value.max / 100)}`;
}

// Business instruction 2026-10-12: 18% extra on item prices; delivery varies
// ₹100–300. Candle prices vary ₹200–500. This is a display estimate, not a quote.
export function estimateGiftCart(rows: Row[], items: Item[], boxes: Row[] = []) {
  const lines = rows.map(row => {
    const valid = Number.isInteger(row.quantity) && row.quantity >= 1 && row.quantity <= 99;
    const unit = valid ? giftUnitEstimate(row.id, items.find(item => item.id === row.id)) : null;
    return { id: row.id, unit, total: unit ? { min: unit.min * row.quantity, max: unit.max * row.quantity } : null };
  });
  const incomplete = lines.some(line => !line.total) || boxes.some(box => box.quantity > 0);
  const subtotal = lines.reduce((sum, line) => ({ min: sum.min + (line.total?.min || 0), max: sum.max + (line.total?.max || 0) }), { min: 0, max: 0 });
  // Round each aggregate bound to the nearest paise; never calculate in rupees.
  const gst = { min: Math.round(subtotal.min * 18 / 100), max: Math.round(subtotal.max * 18 / 100) };
  const delivery = rows.length ? { min: 10000, max: 30000 } : { min: 0, max: 0 };
  // Delivery bounds are internal planning data. Shopper totals exclude delivery
  // until an actual delivery charge is confirmed; never display a guessed fee.
  const total = incomplete ? null : { min: subtotal.min + gst.min, max: subtotal.max + gst.max };
  return { lines, subtotal, gst, delivery, total, incomplete, packagingPending: boxes.some(box => box.quantity > 0) };
}
