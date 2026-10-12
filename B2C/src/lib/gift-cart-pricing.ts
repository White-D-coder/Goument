import { giftDisplayPriceMinor } from './product-pricing';

export type PriceRange = { min: number; max: number };
type Row = { id: string; quantity: number };
type Item = { id: string; category: string; slug?: string };
const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });

export function giftUnitEstimate(id: string, item?: Item): PriceRange | null {
  const price = giftDisplayPriceMinor(id, item?.slug);
  if (price !== null) return { min: price, max: price };
  return null;
}

export function priceRangeLabel(value: PriceRange): string {
  return value.min === value.max ? inr.format(value.min / 100) : `${inr.format(value.min / 100)}–${inr.format(value.max / 100)}`;
}

// Current business instruction: listed prices include GST and delivery.
// Reuse each card/PDP's display price. This calculation is not an order quote.
export function estimateGiftCart(rows: Row[], items: Item[], boxes: Row[] = []) {
  const lines = rows.map(row => {
    const valid = Number.isInteger(row.quantity) && row.quantity >= 1 && row.quantity <= 99;
    const unit = valid ? giftUnitEstimate(row.id, items.find(item => item.id === row.id)) : null;
    return { id: row.id, unit, total: unit ? { min: unit.min * row.quantity, max: unit.max * row.quantity } : null };
  });
  const incomplete = lines.some(line => !line.total) || boxes.some(box => box.quantity > 0);
  const subtotal = lines.reduce((sum, line) => ({ min: sum.min + (line.total?.min || 0), max: sum.max + (line.total?.max || 0) }), { min: 0, max: 0 });
  // Sum inclusive item prices in paise; never add another tax or delivery fee.
  const total = incomplete ? null : { ...subtotal };
  return { lines, subtotal, total, incomplete, packagingPending: boxes.some(box => box.quantity > 0) };
}
