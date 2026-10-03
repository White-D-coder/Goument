const { Schema } = require('mongoose');
const MAX = Number.MAX_SAFE_INTEGER;
const text = (required = false, maxlength = 250) => ({ type: String, required, trim: true, minlength: 1, maxlength });
const integer = (required = true, min = 0, defaultValue) => ({ type: Number, required, min, max: MAX, ...(defaultValue === undefined ? {} : { default: defaultValue }), validate: { validator: Number.isSafeInteger, message: 'Must be a safe integer' } });
const ref = (name, required = true) => ({ type: Schema.Types.ObjectId, ref: name, required });
const date = (required = false) => ({ type: Date, required });
const currency = () => ({ ...text(true, 3), uppercase: true, match: /^[A-Z]{3}$/ });
const bool = (defaultValue = false) => ({ type: Boolean, default: defaultValue });
const email = () => ({ ...text(true, 254), match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ });
const hash = () => ({ ...text(true, 64), match: /^[a-f0-9]{64}$/ });
const list = (type, max = 100, min = 0) => ({ type: [type], default: [], validate: { validator: v => v.length >= min && v.length <= max, message: `Array length must be ${min}..${max}` } });
const sub = fields => new Schema(fields, { _id: false, strict: 'throw' });
const safeObject = value => {
  const walk = (v, depth = 0) => {
    if (depth > 4) return false;
    if (v == null || ['string', 'number', 'boolean'].includes(typeof v)) return typeof v !== 'number' || Number.isFinite(v);
    if (Array.isArray(v)) return v.length <= 30 && v.every(x => walk(x, depth + 1));
    if (typeof v !== 'object' || Object.keys(v).length > 30) return false;
    return Object.entries(v).every(([k, x]) => !/password|secret|token|authorization|cookie|cardnumber|cvv|encryptionkey/i.test(k) && !k.startsWith('$') && !k.includes('.') && walk(x, depth + 1));
  };
  return value === undefined || (JSON.stringify(value).length <= 4096 && walk(value));
};
const metadata = () => ({ type: Schema.Types.Mixed, validate: { validator: safeObject, message: 'Metadata must be bounded and exclude credentials/payment secrets' } });
const url = () => ({ ...text(false, 2048), match: /^https:\/\// });
const address = sub({ recipientName: text(true), phone: text(), email: { type: String, required: false, trim: true, maxlength: 254, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, addressLine1: text(true), addressLine2: text(), landmark: text(), city: text(true), state: text(true), postalCode: text(true, 20), country: { ...text(true, 2), uppercase: true, match: /^[A-Z]{2}$/ } });
const seo = sub({ title: text(false, 160), description: text(false, 320), keywords: list(String, 30), canonicalUrl: url() });
const media = sub({ url: { ...text(true, 2048), match: /^(https:\/\/|\/)/ }, publicId: text(), alt: text(), type: { type: String, enum: ['IMAGE', 'VIDEO'], default: 'IMAGE' }, sortOrder: integer(true, 0, 0) });
const orderItem = sub({ productId: ref('Product', false), variantId: ref('ProductVariant', false), sku: text(true), productName: text(true), variantName: text(), quantity: integer(true, 1), unitPriceMinor: integer(), discountMinor: integer(true, 0, 0), taxMinor: integer(true, 0, 0), lineTotalMinor: integer(), currency: currency() });
const pricing = sub({ subtotalMinor: integer(), discountMinor: integer(true, 0, 0), shippingMinor: integer(true, 0, 0), taxMinor: integer(true, 0, 0), grandTotalMinor: integer(), currency: currency() });
function assertTotals(items, p, lineKey = 'lineTotalMinor') {
  let subtotal = 0, discount = 0, tax = 0, total = 0;
  for (const i of items) {
    const gross = i.unitPriceMinor * i.quantity;
    if (!Number.isSafeInteger(gross) || i.discountMinor > gross || i[lineKey] !== gross - i.discountMinor + i.taxMinor || (i.currency && i.currency !== p.currency)) throw new Error('Invalid line arithmetic/currency');
    subtotal += gross; discount += i.discountMinor; tax += i.taxMinor; total += i[lineKey];
  }
  if (![subtotal, discount, tax, total, total + p.shippingMinor].every(Number.isSafeInteger) || p.subtotalMinor !== subtotal || p.discountMinor !== discount || p.taxMinor !== tax || p.grandTotalMinor !== total + p.shippingMinor) throw new Error('Invalid pricing totals');
}
module.exports = { MAX, text, integer, ref, date, currency, bool, email, hash, list, sub, metadata, url, address, seo, media, orderItem, pricing, assertTotals };
